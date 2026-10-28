import assert from "node:assert/strict";
import test from "node:test";

const base = new URL(process.env.UX_BASE_URL || "http://127.0.0.1:3000");
const text = value => value.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();

async function page(path) {
  const response = await fetch(new URL(path, base), {
    redirect: "manual", signal: AbortSignal.timeout(20_000),
  });
  const html = await response.text();
  const markup = html.replace(/<(script|style)\b[^>]*>[\s\S]*?<\/\1>/gi, "");
  // Matched dynamic routes can deliver the 404 UI through React's recovery
  // payload. Decode JSON data only; never execute the embedded scripts.
  const flight = [...html.matchAll(/<script\b[^>]*>self\.__next_f\.push\((\[[\s\S]*?\])\)<\/script>/g)]
    .map(match => {
      const chunk = JSON.parse(match[1]);
      return typeof chunk[1] === "string" ? chunk[1] : "";
    }).join("");
  // Next.js can stream a redirect after the loading boundary has committed.
  const refresh = markup.match(/<meta\b[^>]*http-equiv="refresh"[^>]*>/i)?.[0];
  const redirect = response.headers.get("location") || refresh?.match(/content="[^;]*;url=([^"]+)"/i)?.[1];
  const links = [...markup.matchAll(/<a\b[^>]*href="([^"]*)"[^>]*>([\s\S]*?)<\/a>/g)]
    .map(match => ({ href: match[1].replaceAll("&amp;", "&"), text: text(match[2]) }));
  return { response, markup, flight, links, redirect: redirect?.replaceAll("&amp;", "&") };
}

test("Home has complete headings, the two hero actions, and all preserved profile content", async () => {
  const home = await page("/");
  assert.equal(home.response.status, 200);
  assert.match(home.markup, /<h1\b/);
  assert.match(home.markup, /I ship, build, and optimize/);
  assert.ok(home.links.some(link => link.href === "#projects" && link.text === "View projects"));
  assert.ok(home.links.some(link => link.href === "/about" && link.text === "About me"));
  assert.ok(home.links.some(link => link.href === "/projects" && link.text.includes("View all projects")));
  assert.doesNotMatch(home.markup, /id="contact"|ESTABLISH_CONN/);
  for (const value of ["45+", "100%", "150K", "99.9%"]) assert.ok(home.markup.includes(value));
  const partners = home.markup.match(/<section id="partners"[\s\S]*?<\/section>/)?.[0];
  assert.ok(partners);
  assert.equal([...partners.matchAll(/<h3\b/g)].length, 7);
  assert.match(home.markup, /line-clamp-2/);
});

test("About owns contact, keeps biography before metadata, and names the social links", async () => {
  const about = await page("/about");
  assert.equal(about.response.status, 200);
  assert.equal([...about.markup.matchAll(/id="contact"/g)].length, 1);
  assert.ok(about.markup.indexOf("Hi! My name is") < about.markup.indexOf("FULL_NAME"));
  assert.ok(about.links.some(link => link.href === "#contact" && link.text === "Get in touch"));
  assert.ok(about.links.some(link => link.href === "/about#contact" && link.text.includes("Contact")));
  for (const channel of ["Threads", "GitHub", "Instagram"]) {
    assert.ok(about.links.some(link => link.text === channel), channel);
  }
  assert.match(about.markup, /aria-expanded="false"/);
  assert.match(about.markup, /aria-current="page"/);
});

test("invalid and oversized page parameters recover to a valid listing", async () => {
  const first = await page("/projects");
  assert.equal(first.response.status, 200);
  const lastPage = Number(text(first.markup).match(/Page 1 of (\d+)/)?.[1] || 1);
  for (const value of ["abc", "0", "-1", "1.5", "9007199254740992", "1&page=2"]) {
    const result = await page(`/projects?page=${value}`);
    assert.ok(result.response.status < 400, value);
    assert.equal(result.redirect, "/projects", value);
  }
  for (const value of ["999", "9007199254740991"]) {
    const result = await page(`/projects?page=${value}`);
    assert.ok(result.response.status < 400, value);
    assert.equal(result.redirect, lastPage > 1 ? `/projects?page=${lastPage}` : "/projects", value);
  }
});

test("detail back links preserve page two and safely fall back for direct visits", async context => {
  const listing = await page("/projects?page=2");
  if (listing.redirect) return context.skip("A second project page is not available");
  const project = listing.links.find(link => /^\/projects\/[^?]+\?fromPage=2$/.test(link.href));
  assert.ok(project, "second-page cards must carry their return page");
  const detail = await page(project.href);
  assert.equal(detail.response.status, 200);
  assert.equal(detail.links.find(link => link.text.includes("Back to projects"))?.href, "/projects?page=2");
  const direct = await page(project.href.split("?")[0]);
  assert.equal(direct.links.find(link => link.text.includes("Back to projects"))?.href, "/projects");
});

test("404 responses include branded recovery HTML or a Next.js recovery payload", async () => {
  for (const path of ["/ux-audit-missing-page", "/projects/ux-audit-missing-project"]) {
    const result = await page(path);
    assert.equal(result.response.status, 404, path);
    assert.ok(`${result.markup}${result.flight}`.includes("This page isn’t here"), path);
    assert.ok(
      result.links.some(link => link.href === "/projects" && link.text === "View projects") ||
      (result.flight.includes('"href":"/projects"') && result.flight.includes("View projects") && result.flight.includes("Back to Home")),
      `${path} must include recovery actions`,
    );
    assert.doesNotMatch(result.markup, /Create Next App/);
  }
});

test("configured storage thumbnails are served by the image optimizer", async context => {
  const listing = await page("/projects");
  const src = [...listing.markup.matchAll(/<img\b[^>]*src="([^"]+)"/g)]
    .map(match => match[1].replaceAll("&amp;", "&"))
    .find(value => value.startsWith("/_next/image?"));
  if (!src) return context.skip("No configured-host thumbnails are currently published");
  const response = await fetch(new URL(src, base), { signal: AbortSignal.timeout(20_000) });
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type"), /^image\//);
});
