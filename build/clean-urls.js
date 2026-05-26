"use strict";
const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");
const SITE = "https://www.e-imzasatinal.com.tr";

// 1. Update sitemap.xml — remove .html extension
const sitemapPath = path.join(ROOT, "sitemap.xml");
let sitemap = fs.readFileSync(sitemapPath, "utf8");
const today = new Date().toISOString().slice(0, 10);
sitemap = sitemap.replace(/(<loc>https:\/\/www\.e-imzasatinal\.com\.tr\/[^<]*?)\.html(<\/loc>)/g, "$1$2");
sitemap = sitemap.replace(/<lastmod>[^<]+<\/lastmod>/g, `<lastmod>${today}</lastmod>`);
fs.writeFileSync(sitemapPath, sitemap, "utf8");
console.log("✓ sitemap.xml cleaned");

// 2. Update canonical tags + internal links in all HTML files
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

for (const file of files) {
  let html = fs.readFileSync(file, "utf8");
  const orig = html;

  // 2a. Canonical: strip .html from href
  html = html.replace(/(<link rel="canonical" href="https:\/\/www\.e-imzasatinal\.com\.tr\/[^"]*?)\.html(")/g, "$1$2");

  // 2b. OG URL: strip .html
  html = html.replace(/(<meta property="og:url" content="https:\/\/www\.e-imzasatinal\.com\.tr\/[^"]*?)\.html(")/g, "$1$2");

  // 2c. Internal links: href="...html" → href="..." (but skip external, .pdf, .css, .js, .png, etc)
  // Match href="X.html" or href="X.html#anchor" or href="X.html?query" where X is relative or starts with /
  html = html.replace(/href="((?!https?:\/\/|mailto:|tel:|#)[^"]*?)\.html((?:[#?][^"]*)?)"/g, 'href="$1$2"');

  if (html !== orig) {
    fs.writeFileSync(file, html, "utf8");
    updated++;
  }
}

console.log(`✓ ${updated} HTML files cleaned`);
console.log("\nDone. All .html extensions removed from sitemap, canonical, OG URL, and internal links.");
