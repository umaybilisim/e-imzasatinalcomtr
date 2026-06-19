"use strict";
/**
 * Blog yazılarındaki sözlük terimlerini /sozluk#X anchor link'leriyle zenginleştirir.
 *
 * Strateji: Her terim için article.prose içindeki ILK GEÇEN occurrence'ı linkler.
 * Headings, mevcut <a> tag içeriği, schema (JSON-LD), strong/em içeriği değiştirilmez.
 *
 * Idempotent: zaten linklenmiş terim tekrar linklenmez.
 *
 * Çalışır: blog/*.html
 */
const fs = require("fs");
const path = require("path");

const BLOG = path.join(__dirname, "..", "blog");

// Sözlük terimleri ve anchor mapping
// Her terim için: regex (kelime sınırlı), anchor URL
const terms = [
  { regex: /(?<![\w-])ESHS(?![\w-])/, url: "/sozluk#eshs" },
  { regex: /(?<![\w-])KEPHS(?![\w-])/, url: "/sozluk#kephs" },
  { regex: /(?<![\w-])BTK(?![\w-])/, url: "/sozluk#btk" },
  { regex: /(?<![\w-])NES(?![\w-])/, url: "/sozluk#nes" },
  { regex: /(?<![\w-])UYAP(?![\w-])/, url: "/sozluk#uyap" },
  { regex: /(?<![\w-])EKAP(?![\w-])/, url: "/sozluk#ekap" },
  { regex: /(?<![\w-])MERSİS(?![\w-])/, url: "/sozluk#mersis" },
  { regex: /(?<![\w-])VERBİS(?![\w-])/, url: "/sozluk#verbis" },
  { regex: /(?<![\w-])ETBİS(?![\w-])/, url: "/sozluk#etbis" },
  { regex: /(?<![\w-])AKİS(?![\w-])/, url: "/sozluk#akis" },
  { regex: /(?<![\w-])KVKK(?![\w-])/, url: "/sozluk#kvkk" },
  { regex: /(?<![\w-])TÜBİTAK(?![\w-])/, url: "/sozluk#tubitak" },
  { regex: /(?<![\w-])Kamu SM(?![\w-])/, url: "/sozluk#kamu-sm" },
  { regex: /(?<![\w-])HSM(?![\w-])/, url: "/sozluk#hsm" },
  { regex: /(?<![\w-])PKI(?![\w-])/, url: "/sozluk#pki" },
  { regex: /(?<![\w-])OCSP(?![\w-])/, url: "/sozluk#ocsp" },
  { regex: /(?<![\w-])SHA-256(?![\w-])/, url: "/sozluk#sha256" },
  { regex: /(?<![\w-])X\.509(?![\w-])/, url: "/sozluk#x509" }
];

const PROTECTED_PATTERNS = [
  /<a\s+[^>]*>[^<]*$/i,        // inside an open <a>
  /<h[1-6][^>]*>[^<]*$/i,       // inside heading
  /<script[\s\S]*$/i,           // inside script
  /<style[\s\S]*$/i             // inside style
];

function enrichSection(html, sectionStart, sectionEnd) {
  const before = html.substring(0, sectionStart);
  let section = html.substring(sectionStart, sectionEnd);
  const after = html.substring(sectionEnd);

  // Track which terms already used in this article
  const used = new Set();
  // Also count already-linked terms (so we don't double-link if anchor exists)
  for (const t of terms) {
    if (new RegExp(`href="[^"]*sozluk#${t.url.split('#')[1]}"`, 'i').test(section)) {
      used.add(t.url);
    }
  }

  for (const t of terms) {
    if (used.has(t.url)) continue;
    // Find first occurrence outside of: <a>, <h1-6>, <script>, <style>, JSON
    const re = new RegExp(t.regex.source, 'g');
    let m;
    while ((m = re.exec(section)) !== null) {
      const matchStart = m.index;
      const matched = m[0];
      // Check context BEFORE this match (last 200 chars) to see if we're inside protected tag
      const ctxBefore = section.substring(Math.max(0, matchStart - 200), matchStart);
      const ctxAfterStart = matchStart + matched.length;
      const ctxAfter = section.substring(ctxAfterStart, Math.min(section.length, ctxAfterStart + 50));

      // Inside open <a>? (look for last <a or </a)
      const lastOpenA = ctxBefore.lastIndexOf('<a ');
      const lastCloseA = ctxBefore.lastIndexOf('</a>');
      if (lastOpenA > lastCloseA) continue;

      // Inside heading?
      const lastH = ctxBefore.match(/<h[1-6][^>]*>[^<]*$/);
      if (lastH) continue;

      // Inside script?
      const lastScript = ctxBefore.lastIndexOf('<script');
      const lastScriptClose = ctxBefore.lastIndexOf('</script>');
      if (lastScript > lastScriptClose) continue;

      // Inside style?
      const lastStyle = ctxBefore.lastIndexOf('<style');
      const lastStyleClose = ctxBefore.lastIndexOf('</style>');
      if (lastStyle > lastStyleClose) continue;

      // Inside attribute? Check for unclosed tag (<... without >)
      const lastOpen = ctxBefore.lastIndexOf('<');
      const lastClose = ctxBefore.lastIndexOf('>');
      if (lastOpen > lastClose) continue;

      // Good! Inject link
      const link = `<a href="${t.url}" class="term-link">${matched}</a>`;
      section = section.substring(0, matchStart) + link + section.substring(matchStart + matched.length);
      used.add(t.url);
      break;
    }
  }

  return before + section + after;
}

function processBlogFile(filePath) {
  let html = fs.readFileSync(filePath, "utf8");

  // Find article.prose section bounds — only enrich within the actual content
  const proseStart = html.indexOf('<article class="prose">');
  const proseEnd = html.indexOf('</article>', proseStart);
  if (proseStart === -1 || proseEnd === -1) return false;

  // Also avoid the GEO-TLDR aside section
  const tldrEnd = html.indexOf('</aside>', proseStart);
  const startAfterTldr = tldrEnd > -1 && tldrEnd < proseEnd ? tldrEnd + '</aside>'.length : proseStart + '<article class="prose">'.length;

  // Stop before GEO-AUTHOR-SOURCES section
  const footerStart = html.indexOf('<!-- GEO-AUTHOR-SOURCES-V1 -->', startAfterTldr);
  const endBeforeFooter = footerStart > -1 ? footerStart : proseEnd;

  const before = html.length;
  const enriched = enrichSection(html, startAfterTldr, endBeforeFooter);
  return { html: enriched, changed: enriched !== html };
}

let updated = 0;
const files = fs.readdirSync(BLOG).filter(f => f.endsWith(".html"));
for (const file of files) {
  const filePath = path.join(BLOG, file);
  const result = processBlogFile(filePath);
  if (result && result.changed) {
    fs.writeFileSync(filePath, result.html, "utf8");
    console.log(`✓ ${file}`);
    updated++;
  }
}

console.log(`\n✅ Enriched: ${updated} blog yazısı`);
