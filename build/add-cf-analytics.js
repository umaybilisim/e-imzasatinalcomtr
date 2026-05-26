"use strict";
const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");
const TOKEN = "b317fc46f6ac41bd9167fb15efa43400";
const SNIPPET = `<!-- Cloudflare Web Analytics -->\n<script defer src="https://static.cloudflareinsights.com/beacon.min.js" data-cf-beacon='{"token": "${TOKEN}"}'></script>\n<!-- End Cloudflare Web Analytics -->\n</body>`;

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
let updated = 0;
let skipped = 0;

for (const file of files) {
  let html = fs.readFileSync(file, "utf8");
  if (html.includes("cloudflareinsights.com")) {
    skipped++;
    continue;
  }
  if (!html.includes("</body>")) {
    console.log("No </body> in:", path.relative(ROOT, file));
    continue;
  }
  html = html.replace("</body>", SNIPPET);
  fs.writeFileSync(file, html, "utf8");
  updated++;
}

console.log(`Done — ${updated} files updated, ${skipped} already had snippet.`);
