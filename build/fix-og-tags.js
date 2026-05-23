"use strict";
const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");

function getAllHtmlFiles(dir, acc = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (["build", "node_modules", ".git"].includes(entry.name)) continue;
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
  let changed = false;

  // ── 1. og:image:width/height/alt/type ──────────────────────────────────
  if (html.includes('property="og:image"') && !html.includes('og:image:width')) {
    // Detect image URL and type
    const imgMatch = html.match(/property="og:image"\s+content="([^"]+)"/);
    if (imgMatch) {
      const imgUrl = imgMatch[1];
      const isJpg = imgUrl.endsWith(".jpg") || imgUrl.endsWith(".jpeg");
      const isPng = imgUrl.endsWith(".png");
      const isBlogImg = imgUrl.includes("/blog/");

      const width  = isBlogImg ? "1200" : "1200";
      const height = isBlogImg ? "630"  : "630";
      const type   = isJpg ? "image/jpeg" : "image/png";

      // Blog images are 1024x1024 square — override
      const w = isBlogImg ? "1024" : "1200";
      const h = isBlogImg ? "1024" : "630";

      const newTags = [
        `<meta property="og:image:width" content="${w}">`,
        `<meta property="og:image:height" content="${h}">`,
        `<meta property="og:image:alt" content="UMAY TÜM BİLİŞİM — Ayyıldız E-İmza ve KEP Yetkili Satıcısı">`,
        `<meta property="og:image:type" content="${type}">`,
      ].join("\n");

      html = html.replace(
        /(<meta property="og:image"[^>]+>)/,
        `$1\n${newTags}`
      );
      changed = true;
    }
  }

  // ── 2. og:locale if missing ─────────────────────────────────────────────
  if (!html.includes('og:locale') && html.includes('property="og:image"')) {
    html = html.replace(
      /(<meta property="og:image"[^>]+>)/,
      `$1\n<meta property="og:locale" content="tr_TR">`
    );
    changed = true;
  }

  // ── 3. og:site_name if missing ──────────────────────────────────────────
  if (!html.includes('og:site_name') && html.includes('property="og:image"')) {
    html = html.replace(
      /(<meta property="og:image"[^>]+>)/,
      `$1\n<meta property="og:site_name" content="UMAY TÜM BİLİŞİM LTD.ŞTİ.">`
    );
    changed = true;
  }

  // ── 4. twitter:card if missing ─────────────────────────────────────────
  if (!html.includes('twitter:card') && html.includes('property="og:image"')) {
    // Insert after last og: meta before </head>
    const twitterBlock = [
      `<meta name="twitter:card" content="summary_large_image">`,
      `<meta name="twitter:image" content="https://www.e-imzasatinal.com.tr/assets/img/og-image.png">`,
    ].join("\n");

    // Place after og:site_name or og:locale (whichever is last)
    const insertAfter = html.includes('og:site_name')
      ? /(<meta property="og:site_name"[^>]+>)/
      : /(<meta property="og:locale"[^>]+>)/;

    html = html.replace(insertAfter, `$1\n${twitterBlock}`);
    changed = true;
  }

  // ── 5. twitter:title / twitter:description from og if missing ──────────
  if (html.includes('twitter:card') && !html.includes('twitter:title')) {
    const ogTitleMatch = html.match(/property="og:title"\s+content="([^"]+)"/);
    const ogDescMatch  = html.match(/property="og:description"\s+content="([^"]+)"/);
    if (ogTitleMatch && ogDescMatch) {
      const twitterMeta = [
        `<meta name="twitter:title" content="${ogTitleMatch[1]}">`,
        `<meta name="twitter:description" content="${ogDescMatch[1]}">`,
      ].join("\n");

      html = html.replace(
        /(<meta name="twitter:card"[^>]+>)/,
        `$1\n${twitterMeta}`
      );
      changed = true;
    }
  }

  if (changed) {
    fs.writeFileSync(file, html, "utf8");
    updated++;
    console.log("Updated:", path.relative(ROOT, file));
  }
}

console.log(`\nDone — ${updated} files updated.`);
