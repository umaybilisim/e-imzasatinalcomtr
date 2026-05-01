const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');

// TL fiyat kartı: <small ...>+ KDV</small></div> → </div> + KDV Dahil satırı
// Variant 1: font-weight:600 olan (e-imza.html, city-template, il sayfaları)
const TL_SMALL_1 = ' <small style="font-size:.75rem;font-weight:600;color:var(--gray)">+ KDV</small></div>';
const TL_REPLACE_1 = '</div>\n          <div style="font-size:.8rem;color:var(--text-muted);margin-top:2px">KDV Dahil</div>';

// Variant 2: font-weight olmayan (blog yazıları)
const TL_SMALL_2 = ' <small style="font-size:.75rem;color:var(--gray)">+ KDV</small></div>';
const TL_REPLACE_2 = '</div>\n          <div style="font-size:.8rem;color:var(--text-muted);margin-top:2px">KDV Dahil</div>';

// Euro fiyat kartı: <small ...>+ KDV</small></div> → sadece </div>
const EUR_SMALL = ' <small style="font-size:.75rem;font-weight:600;color:var(--gray)">+ KDV</small></div>';
// Not: Euro kartları için aynı pattern, ama sadece e-imza.html'de işlenecek

// Alt not: "Fiyatlara KDV dahil değildir."
const OLD_NOTE = 'Fiyatlara KDV dahil değildir.';
const NEW_NOTE = 'Fiyatlarımıza KDV dahildir.';

// JSON-LD içindeki TL + KDV metinleri
const jsonldReplacements = [
  ['(3.750 TL + KDV)', '(3.750 TL, KDV Dahil)'],
  ['(2.750 TL + KDV)', '(2.750 TL, KDV Dahil)'],
  ['1 yıllık 2.750 TL + KDV, 2 yıllık 3.099 TL + KDV, 3 yıllık 3.750 TL + KDV',
   '1 yıllık 2.750 TL, 2 yıllık 3.099 TL, 3 yıllık 3.750 TL (KDV Dahil)'],
];

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
  let next = content;

  const isEimza = filePath.endsWith('e-imza.html');

  if (isEimza) {
    // e-imza.html: önce Euro kartlarını işle (aynı pattern, sadece </div> ile bırak)
    // Euro fiyatları: 70 €, 80 €, 95 € — bunlar € ile biten
    // TL fiyatları: 2.750 TL, 3.099 TL, 3.750 TL — bunlar TL ile biten
    // İkisi de aynı <small> pattern'ini kullanıyor, ayırt etmek için context gerekiyor
    // Satır bazlı işleyelim
    const lines = next.split('\n');
    const out = [];
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      if (line.includes(TL_SMALL_1)) {
        if (line.includes('TL ')) {
          // TL fiyat — KDV Dahil ekle
          out.push(line.replace(TL_SMALL_1, TL_REPLACE_1));
        } else if (line.includes('€ ')) {
          // Euro fiyat — sadece <small> kaldır
          out.push(line.replace(TL_SMALL_1, '</div>'));
        } else {
          out.push(line);
        }
      } else {
        out.push(line);
      }
    }
    next = out.join('\n');
  } else {
    // Diğer dosyalar: sadece TL fiyatları
    next = next.split(TL_SMALL_1).join(TL_REPLACE_1);
    next = next.split(TL_SMALL_2).join(TL_REPLACE_2);
  }

  // Alt not güncelle
  next = next.split(OLD_NOTE).join(NEW_NOTE);

  // JSON-LD metin güncellemeleri
  for (const [from, to] of jsonldReplacements) {
    next = next.split(from).join(to);
  }

  if (next !== content) {
    fs.writeFileSync(filePath, next, 'utf8');
    console.log('UPDATED:', path.relative(ROOT, filePath));
    updated++;
  }
});

console.log(`\nToplam: ${updated} dosya güncellendi.`);
