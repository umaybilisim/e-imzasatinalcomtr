"use strict";
const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const ROOT = path.join(__dirname, "..");

async function convertAll(dir) {
  let count = 0;
  let saved = 0;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      const sub = await convertAll(full);
      count += sub.count;
      saved += sub.saved;
    } else if (/\.(jpe?g|png)$/i.test(entry.name) && !entry.name.endsWith(".webp")) {
      const webpPath = full.replace(/\.(jpe?g|png)$/i, ".webp");
      if (fs.existsSync(webpPath)) continue;
      const origSize = fs.statSync(full).size;
      try {
        await sharp(full)
          .webp({ quality: 85, effort: 6 })
          .toFile(webpPath);
        const webpSize = fs.statSync(webpPath).size;
        const savedBytes = origSize - webpSize;
        saved += savedBytes;
        count++;
        const pct = ((savedBytes / origSize) * 100).toFixed(1);
        console.log(`${path.relative(ROOT, full)}: ${(origSize/1024).toFixed(1)}KB → ${(webpSize/1024).toFixed(1)}KB (-${pct}%)`);
      } catch(e) {
        console.error(`Failed: ${full}: ${e.message}`);
      }
    }
  }
  return { count, saved };
}

(async () => {
  const imgDir = path.join(ROOT, "assets", "img");
  const r = await convertAll(imgDir);
  console.log(`\nTotal: ${r.count} images, ${(r.saved/1024).toFixed(1)}KB saved`);
})();
