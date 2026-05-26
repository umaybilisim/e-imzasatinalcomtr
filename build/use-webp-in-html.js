"use strict";
const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");

function getAllHtmlFiles(dir, acc = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (["build", "node_modules", ".git", ".github", ".claude", ".playwright-mcp"].includes(entry.name)) continue;
      getAllHtmlFiles(full, acc);
    } else if (entry.isFile() && entry.name.endsWith(".html") && !entry.name.startsWith("google")) {
      acc.push(full);
    }
  }
  return acc;
}

// Replace <img src="...blog-X.jpg" ...> with <picture><source srcset="...blog-X.webp" type="image/webp"><img ...></picture>
function transform(html) {
  // Match <img tags whose src ends with .jpg or .jpeg or .png in assets/img/blog/
  const imgPattern = /<img\s+([^>]*?)src=["']([^"']*assets\/img\/blog\/[^"']+\.(?:jpe?g|png))["']([^>]*?)>/gi;
  let changed = false;
  const newHtml = html.replace(imgPattern, (match, before, src, after) => {
    if (match.includes("type=\"image/webp\"")) return match;
    const webp = src.replace(/\.(jpe?g|png)$/i, ".webp");
    changed = true;
    return `<picture><source srcset="${webp}" type="image/webp"><img ${before}src="${src}"${after}></picture>`;
  });
  return { html: newHtml, changed };
}

const files = getAllHtmlFiles(ROOT);
let updated = 0;
for (const file of files) {
  const orig = fs.readFileSync(file, "utf8");
  const { html, changed } = transform(orig);
  if (changed) {
    fs.writeFileSync(file, html, "utf8");
    updated++;
    console.log("Updated:", path.relative(ROOT, file));
  }
}
console.log(`\nDone — ${updated} files updated.`);
