import assert from "node:assert/strict";
import test from "node:test";
import { readFile } from "node:fs/promises";
import { parsePublicPage, projectExcerpt, projectsPageHref } from "../lib/project-presentation.ts";
import { projectImageBase, shouldOptimizeProjectImage } from "../lib/project-images.ts";

test("invalid pagination cannot reach a database query as NaN or an unsafe offset", () => {
  for (const value of [undefined, "", "abc", "2abc", "0", "-1", "1.5", "1e3", "Infinity", "9007199254740992", ["1", "2"]]) {
    assert.equal(parsePublicPage(value), 1, String(value));
  }
  assert.equal(parsePublicPage("2"), 2);
  assert.equal(parsePublicPage("999"), 999);
});

test("project return links preserve the list page with a home-page fallback", () => {
  assert.equal(projectsPageHref(parsePublicPage("2")), "/projects?page=2");
  assert.equal(projectsPageHref(parsePublicPage("javascript:alert(1)")), "/projects");
  assert.equal(projectsPageHref(parsePublicPage(undefined)), "/projects");
});

test("previews use the first readable paragraph, excluding editor formatting and code blocks", () => {
  const html = '<h2>Introduction</h2><pre><p>const secret = 1;</p></pre><p>&nbsp;</p><p>A <strong>scanner</strong><br>for Windows.</p><p>More details.</p>';
  assert.equal(projectExcerpt(html), "A scanner for Windows.");
});

test("previews decode named and numeric entities as plain text", () => {
  assert.equal(projectExcerpt('<p>Go &amp; React &mdash; &#8220;fast&#8221; &#x1f680;</p>'), "Go & React — “fast” 🚀");
  assert.equal(projectExcerpt('<p>Use &lt;script&gt; as text.</p>'), "Use <script> as text.");
  assert.equal(projectExcerpt('<p>&#999999999;</p>'), "�");
});

test("empty and non-paragraph content have usable preview fallbacks", () => {
  assert.equal(projectExcerpt(""), "");
  assert.equal(projectExcerpt('<script>ignored()</script><style>.hidden{}</style><p>&nbsp;</p>'), "");
  assert.equal(projectExcerpt('<div>A desktop application.</div>'), "A desktop application.");
});

test("long previews end at a word boundary and do not return the whole article", () => {
  const excerpt = projectExcerpt(`<p>${"Useful software for people. ".repeat(40)}</p>`);
  assert.ok(excerpt.length <= 181);
  assert.ok(excerpt.endsWith("…"));
  assert.match(excerpt, /(?:Useful|software|for|people\.)…$/);
});

test("image optimization only proxies local assets and the configured storage prefix", () => {
  const allowed = new URL(`${projectImageBase.pathname.replace(/\/$/, "")}/projects/images/preview.png`, projectImageBase);
  assert.equal(shouldOptimizeProjectImage(allowed.href), true);
  assert.equal(shouldOptimizeProjectImage("/ai/claude.webp"), true);
  assert.equal(shouldOptimizeProjectImage("https://unrelated.example/preview.png"), false);
  assert.equal(shouldOptimizeProjectImage("//unrelated.example/preview.png"), false);
  assert.equal(shouldOptimizeProjectImage(`${allowed.href}?token=test`), false);
  assert.equal(shouldOptimizeProjectImage("not a URL"), false);
});

test("public text colors keep 4.5:1 contrast on cards, badges, and terminal hover states", async () => {
  const css = await readFile(new URL("../app/globals.css", import.meta.url), "utf8");
  const over = (foreground, background, alpha) => foreground.map((value, index) => value * alpha + background[index] * (1 - alpha));
  const luminance = color => color.map(value => value / 255)
    .map(value => value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4)
    .reduce((sum, value, index) => sum + value * [0.2126, 0.7152, 0.0722][index], 0);
  const contrast = (a, b) => (Math.max(luminance(a), luminance(b)) + 0.05) / (Math.min(luminance(a), luminance(b)) + 0.05);
  for (const selector of [":root {", ":root.light {"]) {
    const block = css.slice(css.indexOf(selector)).split("}")[0];
    const tokens = Object.fromEntries([...block.matchAll(/--([\w-]+):\s*([^;]+);/g)].map(match => [match[1], match[2].trim()]));
    const color = (name, background = [0, 0, 0]) => {
      const value = tokens[name];
      if (value.startsWith("#")) return value.slice(1).match(/\w\w/g).map(channel => parseInt(channel, 16));
      const [r, g, b, alpha] = value.match(/[\d.]+/g).map(Number);
      return over([r, g, b], background, alpha);
    };
    const background = color("background");
    const card = color("card", background);
    const presets = color("terminal-presets", background);
    assert.ok(contrast(color("muted"), card) >= 4.5, `${selector} muted card text`);
    for (const name of ["cyber-cyan", "cyber-orange", "cyber-green"]) {
      const accent = color(name);
      for (const alpha of [0.05, 0.2]) {
        assert.ok(contrast(accent, over(accent, presets, alpha)) >= 4.5, `${selector} ${name} terminal state ${alpha}`);
      }
    }
    const pink = color("cyber-pink");
    assert.ok(contrast(pink, over(pink, card, 0.1)) >= 4.5, `${selector} closed-source badge`);
  }
});
