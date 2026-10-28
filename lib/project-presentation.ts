export interface ProjectPreview {
  id: string;
  projectName: string;
  slug: string;
  thumbnail: string;
  type: "open_source" | "close_source";
  createdAt: Date;
  excerpt: string;
}

const entities: Record<string, string> = {
  amp: "&", lt: "<", gt: ">", quot: '"', apos: "'", nbsp: " ",
  mdash: "—", ndash: "–", hellip: "…", rsquo: "’", lsquo: "‘",
  rdquo: "”", ldquo: "“", bull: "•", middot: "·", copy: "©", reg: "®", trade: "™",
};

// This produces text for React to escape, never HTML for dangerouslySetInnerHTML.
export function projectExcerpt(html: string): string {
  const content = html.replace(/<!--[\s\S]*?-->|<(script|style|pre)\b[^>]*>[\s\S]*?<\/\1>/gi, " ");
  const paragraphs = [...content.matchAll(/<p\b[^>]*>([\s\S]*?)<\/p>/gi)].map(match => match[1]);
  const toText = (value: string) => value.replace(/<[^>]*>/g, " ")
    .replace(/&(#x[\da-f]+|#\d+|[a-z]+);/gi, (match, entity: string) => {
      if (!entity.startsWith("#")) return entities[entity.toLowerCase()] ?? match;
      const point = entity[1].toLowerCase() === "x" ? parseInt(entity.slice(2), 16) : Number(entity.slice(1));
      return point > 0 && point <= 0x10ffff && !(point >= 0xd800 && point <= 0xdfff) ? String.fromCodePoint(point) : "�";
    }).replace(/\s+/g, " ").trim();
  const text = paragraphs.map(toText).find(Boolean) || toText(content);
  if (text.length <= 180) return text;
  const shortened = text.slice(0, 180).replace(/\s+\S*$/, "");
  return `${shortened || text.slice(0, 180)}…`;
}

export function parsePublicPage(value: string | string[] | undefined): number {
  if (typeof value !== "string" || !/^[1-9]\d*$/.test(value)) return 1;
  const page = Number(value);
  return Number.isSafeInteger(page) ? page : 1;
}

export function projectsPageHref(page: number): string {
  return page > 1 ? `/projects?page=${page}` : "/projects";
}
