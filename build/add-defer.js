const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const EXTS = ['.html'];

function walkFiles(dir, callback) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (!['node_modules', '.git', '.playwright-mcp', 'build'].includes(entry.name)) {
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
  let next = content
    .replace(/<script src="assets\/js\/main\.js"><\/script>/g,
      '<script defer src="assets/js/main.js"></script>')
    .replace(/<script src="\.\.\/assets\/js\/main\.js"><\/script>/g,
      '<script defer src="../assets/js/main.js"></script>');
  if (next !== content) {
    fs.writeFileSync(filePath, next, 'utf8');
    console.log('UPDATED:', path.relative(ROOT, filePath));
    updated++;
  }
});

console.log(`\nToplam: ${updated} dosya güncellendi.`);
