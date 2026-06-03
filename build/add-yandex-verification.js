"use strict";
const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");
const VERIFICATION_CODE = "75d11aafa4214159";
const META_TAG = `<meta name="yandex-verification" content="${VERIFICATION_CODE}">`;

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

const files = getAllHtmlFiles(ROOT);
let updated = 0, skipped = 0;

for (const file of files) {
  let html = fs.readFileSync(file, "utf8");
  if (html.includes("yandex-verification")) {
    skipped++;
    continue;
  }
  if (!html.includes('<meta charset="UTF-8">')) continue;
  // Insert right after charset meta tag
  html = html.replace(
    '<meta charset="UTF-8">',
    `<meta charset="UTF-8">\n${META_TAG}`
  );
  fs.writeFileSync(file, html, "utf8");
  updated++;
}

console.log(`Done — ${updated} files updated, ${skipped} already had verification.`);
