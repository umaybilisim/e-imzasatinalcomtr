"use strict";
const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");
const BLOG = path.join(ROOT, "blog");

// Better author setup using Organization (we don't have individual authors)
// But we'll enrich it with Editor info and add a visible "Yazan:" byline
const editorBio = "UMAY TÜM BİLİŞİM Editör Ekibi";

const files = fs.readdirSync(BLOG).filter(f => f.endsWith(".html"));
let updated = 0;

for (const name of files) {
  const file = path.join(BLOG, name);
  let html = fs.readFileSync(file, "utf8");
  const orig = html;

  // 1. Article schema'sını zenginleştir — author'a EditorialOrganization detayı ekle
  html = html.replace(
    /"author":\{"@type":"Organization","name":"UMAY TÜM BİLİŞİM LTD\.ŞTİ\.","url":"https:\/\/www\.e-imzasatinal\.com\.tr"\}/g,
    '"author":{"@type":"Organization","name":"UMAY TÜM BİLİŞİM Editör Ekibi","url":"https://www.e-imzasatinal.com.tr/hakkimizda","description":"Ayyıldız e-imza ve KEP konusunda 5+ yıl deneyimli, yetkili bayi uzmanlarından oluşan editör ekibi."}'
  );

  // 2. Visible byline ekle — <h1> sonrası
  if (!html.includes('class="post-meta"')) {
    // Date info from Article schema
    const dateMatch = html.match(/"datePublished":"(\d{4}-\d{2}-\d{2})"/);
    const dateMod = html.match(/"dateModified":"(\d{4}-\d{2}-\d{2})"/);
    const datePublished = dateMatch ? dateMatch[1] : "";
    const dateModified = dateMod ? dateMod[1] : "";

    const dateFormatted = datePublished ? new Date(datePublished).toLocaleDateString("tr-TR", { year: "numeric", month: "long", day: "numeric" }) : "";
    const modFormatted = dateModified && dateModified !== datePublished ? new Date(dateModified).toLocaleDateString("tr-TR", { year: "numeric", month: "long", day: "numeric" }) : "";

    const bylineHTML = `
<div class="post-meta" style="display:flex;align-items:center;gap:12px;padding:16px 0;border-bottom:1px solid var(--border);margin-bottom:24px;font-size:.9rem;color:#475569">
  <div style="width:40px;height:40px;border-radius:50%;background:var(--navy);color:#fff;display:flex;align-items:center;justify-content:center;font-weight:700">U</div>
  <div>
    <div style="font-weight:600;color:var(--navy)">UMAY TÜM BİLİŞİM Editör Ekibi</div>
    <div style="font-size:.85rem">${dateFormatted ? `Yayınlanma: ${dateFormatted}` : ""}${modFormatted ? ` · Güncelleme: ${modFormatted}` : ""}</div>
  </div>
</div>`;

    // Insert after <article class="prose"> opener and before first picture/h2
    html = html.replace(/(<article class="prose">\s*)/, '$1' + bylineHTML + '\n');
  }

  if (html !== orig) {
    fs.writeFileSync(file, html, "utf8");
    updated++;
  }
}

console.log(`Done — ${updated} blog posts enriched with author byline.`);
