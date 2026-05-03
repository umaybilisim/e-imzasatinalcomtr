const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const OLD = 'https://www.e-imzasatinal.com.tr';
const NEW = 'https://www.e-imzasatinal.com.tr';

const EXTS = ['.html', '.xml', '.txt', '.js'];

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
  let next = content.split(OLD).join(NEW);
  if (next !== content) {
    fs.writeFileSync(filePath, next, 'utf8');
    console.log('UPDATED:', path.relative(ROOT, filePath));
    updated++;
  }
});

console.log(`\nToplam: ${updated} dosya güncellendi.`);
