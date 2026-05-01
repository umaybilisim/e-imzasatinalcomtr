const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');

// TL price replacements (old → new)
const tlReplacements = [
  ['2.899 TL', '2.750 TL'],
  ['3.799 TL', '3.099 TL'],
  ['4.599 TL', '3.750 TL'],
  // JSON-LD ve metin içi varyantlar
  ['2.899 - 4.599 TL (1-3 yıl)', '2.750 - 3.750 TL (1-3 yıl)'],
  ['1 yıllık 2.899 TL + KDV, 2 yıllık 3.799 TL + KDV, 3 yıllık 4.599 TL + KDV',
   '1 yıllık 2.750 TL + KDV, 2 yıllık 3.099 TL + KDV, 3 yıllık 3.750 TL + KDV'],
];

// Euro replacements — sadece e-imza.html
const euroReplacements = [
  ['115 €', '70 €'],
  ['135 €', '80 €'],
  ['165 €', '95 €'],
];

function replaceAll(content, pairs) {
  let result = content;
  for (const [from, to] of pairs) {
    result = result.split(from).join(to);
  }
  return result;
}

function walkHtml(dir, callback) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (!['node_modules', '.git', '.playwright-mcp'].includes(entry.name)) {
        walkHtml(full, callback);
      }
    } else if (entry.name.endsWith('.html')) {
      callback(full);
    }
  }
}

let updated = 0;
let skipped = 0;

walkHtml(ROOT, (filePath) => {
  let content = fs.readFileSync(filePath, 'utf8');
  let next = replaceAll(content, tlReplacements);

  // Euro sadece e-imza.html
  if (filePath.endsWith('e-imza.html')) {
    next = replaceAll(next, euroReplacements);
  }

  if (next !== content) {
    fs.writeFileSync(filePath, next, 'utf8');
    console.log('UPDATED:', path.relative(ROOT, filePath));
    updated++;
  } else {
    skipped++;
  }
});

console.log(`\nToplam: ${updated} güncellendi, ${skipped} değişmedi.`);
