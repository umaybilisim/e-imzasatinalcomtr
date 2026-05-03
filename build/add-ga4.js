const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const GA_ID = 'G-XTGNCVEKBV';

const GA_SNIPPET = `<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=${GA_ID}"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', '${GA_ID}');
</script>`;

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

walkHtml(ROOT, (filePath) => {
  let content = fs.readFileSync(filePath, 'utf8');

  // Zaten eklenmiş mi?
  if (content.includes(GA_ID)) return;

  // <head> tagından hemen sonra ekle
  const next = content.replace('<head>', '<head>\n' + GA_SNIPPET);

  if (next !== content) {
    fs.writeFileSync(filePath, next, 'utf8');
    console.log('UPDATED:', path.relative(ROOT, filePath));
    updated++;
  }
});

console.log(`\nToplam: ${updated} dosya güncellendi.`);
