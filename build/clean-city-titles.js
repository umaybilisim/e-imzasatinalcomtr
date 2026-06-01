"use strict";
const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");
const ILLER = path.join(ROOT, "iller");

const files = fs.readdirSync(ILLER).filter(f => f.endsWith(".html"));
let updated = 0;

for (const name of files) {
  const file = path.join(ILLER, name);
  let html = fs.readFileSync(file, "utf8");

  const orig = html;

  // Title temizle: "X E-İmza ... | İl" → "X E-İmza ..."
  // Pattern: " | <CityName>" sonda
  html = html.replace(/<title>([^<]+?)\s*\|\s*([A-ZÇĞİÖŞÜa-zçğıöşü]+)<\/title>/u, (m, content, lastWord) => {
    // Check if lastWord appears at start of content (would indicate duplicate)
    if (content.trim().startsWith(lastWord)) {
      return `<title>${content.trim()}</title>`;
    }
    return m;
  });

  // OG title also
  html = html.replace(/<meta property="og:title" content="([^"]+?)\s*\|\s*([A-ZÇĞİÖŞÜa-zçğıöşü]+)">/u, (m, content, lastWord) => {
    if (content.trim().startsWith(lastWord)) {
      return `<meta property="og:title" content="${content.trim()}">`;
    }
    return m;
  });

  // Twitter title also
  html = html.replace(/<meta name="twitter:title" content="([^"]+?)\s*\|\s*([A-ZÇĞİÖŞÜa-zçğıöşü]+)">/u, (m, content, lastWord) => {
    if (content.trim().startsWith(lastWord)) {
      return `<meta name="twitter:title" content="${content.trim()}">`;
    }
    return m;
  });

  if (html !== orig) {
    fs.writeFileSync(file, html, "utf8");
    updated++;
  }
}

console.log(`Done — ${updated} city titles cleaned.`);
