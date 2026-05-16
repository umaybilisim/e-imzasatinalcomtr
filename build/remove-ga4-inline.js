const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const EXTS = ['.html'];

// GA4 inline code pattern to remove
const GA4_PATTERN = /<!-- Google tag \(gtag\.js\) -->\s*<script async src="https:\/\/www\.googletagmanager\.com\/gtag\/js\?id=G-XTGNCVEKBV"><\/script>\s*<script>\s*window\.dataLayer[\s\S]*?<\/script>/g;

function walkFiles(dir, callback) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (!['node_modules', '.git', '.playwright-mcp'].includes(entry.name)) {
        walkFiles(full, callback);
      }
    } else if (EXTS.includes(path.extname(entry.name))) {
      callback(full);
    }
  }
}

let updated = 0;

walkFiles(ROOT, (filePath) => {
  let content = fs.readFileSync(filePath, 'utf8');
  let next = content.replace(GA4_PATTERN, '');
  if (next !== content) {
    fs.writeFileSync(filePath, next, 'utf8');
    console.log('UPDATED:', path.relative(ROOT, filePath));
    updated++;
  }
});

console.log(`\nToplam: ${updated} dosya güncellendi.`);
