// Some WordPress fields return unformatted editor text rather than rendered HTML.
export function withParagraphs(content: string): string {
  const text = content.replace(/\r\n?/g, "\n").trim();
  if (!text) return "";
  // Keep existing block markup intact, including lists and embedded content.
  if (/<\/?(?:p|div|h[1-6]|ul|ol|li|blockquote|figure|table|pre|section|iframe)\b/i.test(text)) {
    return text;
  }
  return text.split(/\n\s*\n/)
    .map((paragraph) => `<p>${paragraph.trim().replace(/\n/g, "<br />")}</p>`)
    .join("\n");
}
