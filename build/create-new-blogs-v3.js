"use strict";
/**
 * Blog sprint 2026-10-08: GSC/GA4 verisine gore secilen 2 satis odakli yazi.
 * Icerik: build/blogs-v3-data.js — sablon create-new-blogs-v2.js'ten alindi,
 * FAQPage schema + gorunur SSS + satis kutusu (BLOG-CTA-V1) + WhatsApp popup eklendi.
 */
const fs = require("fs");
const path = require("path");

const BLOG = path.join(__dirname, "..", "blog");
const SITE = "https://www.e-imzasatinal.com.tr";
const DATE_PUBLISHED = "2026-10-08";
const DATE_MODIFIED = "2026-10-08";
const DATE_TEXT = "8 Ekim 2026";

// Kullanim: node build/create-new-blogs-v3.js [veri-dosyasi]  (varsayilan: blogs-v3-data.js)
const blogs = require(process.argv[2] ? path.resolve(process.argv[2]) : "./blogs-v3-data");
const { cta } = require("./blogs-v3-data");

function renderHead(b) {
  const url = `${SITE}/blog/${b.slug}`;
  const articleSchema = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": b.title,
    "description": b.description,
    "image": `${SITE}/assets/img/blog/${b.svg}`,
    "datePublished": DATE_PUBLISHED,
    "dateModified": DATE_MODIFIED,
    "author": {
      "@type": "Organization",
      "name": "UMAY TÜM BİLİŞİM Editör Ekibi",
      "url": `${SITE}/hakkimizda`
    },
    "publisher": {
      "@type": "Organization",
      "name": "UMAY TÜM BİLİŞİM LTD.ŞTİ.",
      "logo": { "@type": "ImageObject", "url": `${SITE}/assets/img/blog/${b.svg}` }
    },
    "mainEntityOfPage": url
  });
  const breadcrumb = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Anasayfa", "item": `${SITE}/` },
      { "@type": "ListItem", "position": 2, "name": "Blog", "item": `${SITE}/blog` },
      { "@type": "ListItem", "position": 3, "name": b.h1 }
    ]
  }, null, 2);
  const webpage = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${url}#webpage`,
    "url": url,
    "name": b.title,
    "isPartOf": { "@id": `${SITE}/#website` },
    "about": { "@id": `${SITE}/#organization` },
    "inLanguage": "tr-TR",
    "dateModified": DATE_MODIFIED,
    "speakable": {
      "@type": "SpeakableSpecification",
      "cssSelector": [".page-hero h1", ".tldr-box p", "h2", "h3"]
    }
  }, null, 2);
  const techArticle = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "TechArticle",
    "@id": `${url}#techarticle`,
    "headline": b.title,
    "url": url,
    "datePublished": DATE_PUBLISHED,
    "dateModified": DATE_MODIFIED,
    "inLanguage": "tr-TR",
    "wordCount": b.wordCount,
    "articleSection": b.section,
    "keywords": b.keywords.join(", "),
    "isPartOf": { "@id": `${SITE}/#website` },
    "publisher": { "@id": `${SITE}/#organization` },
    "author": {
      "@type": "Organization",
      "@id": `${SITE}/#editorialteam`,
      "name": "UMAY TÜM BİLİŞİM Editör Ekibi",
      "url": `${SITE}/hakkimizda`,
      "description": "Ayyıldız e-imza ve KEP konusunda 5+ yıl deneyimli, yetkili bayi uzmanlarından oluşan editör ekibi.",
      "knowsAbout": ["Elektronik İmza", "KEP", "Dijital Güven", "5070 sayılı Kanun", "6102 sayılı TTK"]
    },
    "citation": b.citations.map(c => ({ "@type": "CreativeWork", "name": c.name, "url": c.url })),
    "mentions": b.mentions.map(m => ({ "@type": "DefinedTerm", "name": m.toUpperCase(), "inDefinedTermSet": `${SITE}/#glossary` })),
    "mainEntityOfPage": { "@id": `${url}#webpage` }
  }, null, 2);
  return `<!DOCTYPE html>
<html lang="tr">
<head>

<meta charset="UTF-8">
<meta name="yandex-verification" content="75d11aafa4214159">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>${b.title} | UMAY TÜM BİLİŞİM</title>
<meta name="description" content="${b.description}">
<meta name="keywords" content="${b.keywords.join(", ")}">
<link rel="canonical" href="${url}">
<meta property="og:type" content="article">
<meta property="og:url" content="${url}">
<meta property="og:title" content="${b.ogTitle}">
<meta property="og:description" content="${b.ogDescription}">
<meta property="og:image" content="${SITE}/assets/img/og-image.png">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:image:alt" content="UMAY TÜM BİLİŞİM — Ayyıldız E-İmza ve KEP Yetkili Satıcısı">
<meta property="og:image:type" content="image/png">
<meta property="og:locale" content="tr_TR">
<meta property="og:site_name" content="UMAY TÜM BİLİŞİM LTD.ŞTİ.">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${b.ogTitle}">
<meta name="twitter:description" content="${b.ogDescription}">
<link rel="stylesheet" href="../assets/css/style.css?v=20261008">
<link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' rx='22' fill='%230a2540'/%3E%3Ctext x='50' y='72' font-size='68' text-anchor='middle' fill='%23e63946'%3E%E2%98%85%3C/text%3E%3C/svg%3E">
<script type="application/ld+json">
${articleSchema}
</script>
<script type="application/ld+json">
${breadcrumb}
</script>
<!-- GEO-BLOG-SCHEMA-V1 -->
<script type="application/ld+json">
${webpage}
</script>
<script type="application/ld+json">
${techArticle}
</script>
</head>`;
}

function renderBody(b) {
  const sources = b.citations.map(c => `    <li><a href="${c.url}" target="_blank" rel="noopener nofollow">${c.name}</a></li>`).join("\n");
  const related = b.related.map(r => `      <a href="${r.slug}" class="blog-card" style="display:flex;flex-direction:column;text-decoration:none;color:inherit;background:#fff;border:1px solid var(--border);border-radius:12px;overflow:hidden;transition:transform .2s,box-shadow .2s">
        <div style="padding:18px"><h3 style="margin:0;font-size:1rem;color:var(--navy);font-weight:700">${r.title}</h3></div>
      </a>`).join("\n");

  return `<body>
<header class="site-header">
  <div class="container">
    <a href="/" class="brand"><span class="brand-mark" aria-hidden="true"></span><span>UMAY TÜM BİLİŞİM LTD.ŞTİ.</span></a>
    <button class="nav-toggle" aria-label="Menü" aria-expanded="false"><span></span><span></span><span></span></button>
    <nav class="nav">
      <a href="/">Anasayfa</a>
      <a href="../e-imza">E-İmza</a>
      <a href="../kep">KEP</a>
      <a href="../hizmetler">Hizmetler</a>
      <a href="../blog">Blog</a>
      <a href="../sss">SSS</a>
      <a href="../iletisim">İletişim</a>
      <a href="https://odeme.umaybilisim.com.tr/" class="btn btn--pay btn--sm nav-cta" target="_blank" rel="noopener">Online Tahsilat</a>
      <a href="https://wa.me/908507771145" class="btn btn--wa btn--sm nav-cta" target="_blank" rel="noopener">WhatsApp</a>
    </nav>
  </div>
</header>

<main>

<section class="page-hero">
  <div class="container">
    <span class="eyebrow">${b.eyebrow}</span>
    <h1>${b.h1}</h1>
    <p>${b.description}</p>
  </div>
</section>

<nav class="breadcrumb"><div class="container"><a href="/">Anasayfa</a><span>/</span><a href="../blog">Blog</a><span>/</span>${b.h1.substring(0, 40)}</div></nav>

<section class="section">
  <div class="container">
    <article class="prose">

      <div class="post-meta" style="display:flex;align-items:center;gap:12px;padding:16px 0;border-bottom:1px solid var(--border);margin-bottom:24px;font-size:.9rem;color:#475569">
        <div style="width:40px;height:40px;border-radius:50%;background:var(--navy);color:#fff;display:flex;align-items:center;justify-content:center;font-weight:700">U</div>
        <div>
          <div style="font-weight:600;color:var(--navy)">UMAY TÜM BİLİŞİM Editör Ekibi</div>
          <div style="font-size:.85rem">Yayınlanma: ${DATE_TEXT} · Güncelleme: ${DATE_TEXT}</div>
        </div>
      </div>
      <img src="../assets/img/blog/${b.svg}" alt="${b.h1}" style="width:100%;border-radius:12px;margin-bottom:28px;aspect-ratio:1200/630;object-fit:cover" loading="eager">

      <!-- GEO-TLDR-V1 -->
      <aside class="tldr-box" style="background:linear-gradient(135deg,#f0f4ff 0%,#e8f5f0 100%);border-left:4px solid var(--wa);border-radius:12px;padding:22px 26px;margin:24px 0 32px">
        <div style="display:flex;align-items:center;gap:10px;margin-bottom:12px">
          <span style="background:var(--wa);color:#fff;font-size:.7rem;font-weight:800;letter-spacing:.5px;padding:4px 10px;border-radius:999px">📌 ÖZET</span>
          <span style="font-size:.85rem;color:#475569">2026 itibarıyla güncel · UMAY TÜM BİLİŞİM Editör Ekibi tarafından doğrulanmıştır</span>
        </div>
        <p style="margin:0;color:#0f172a;font-size:1rem;line-height:1.65">${b.tldr}</p>
      </aside>
${b.body}
      <!-- GEO-AUTHOR-SOURCES-V1 -->
      <section class="article-footer" style="margin-top:48px;padding-top:32px;border-top:2px solid var(--border)">

        <div class="author-bio" style="display:flex;gap:20px;background:var(--bg-alt);padding:24px 26px;border-radius:12px;margin-bottom:24px;align-items:flex-start">
          <div style="flex-shrink:0;width:64px;height:64px;border-radius:50%;background:var(--navy);color:#fff;display:flex;align-items:center;justify-content:center;font-weight:800;font-size:1.5rem">U</div>
          <div>
            <h3 style="margin:0 0 6px;font-size:1.05rem;color:var(--navy)">UMAY TÜM BİLİŞİM Editör Ekibi</h3>
            <p style="margin:0 0 10px;font-size:.9rem;color:#475569;line-height:1.55">Ayyıldız Bilgi Güvenliği A.Ş. yetkili bayisi olarak <strong>5+ yıllık sektörel deneyime</strong> sahip, BTK mevzuatı, 5070 sayılı Elektronik İmza Kanunu ve 6102 sayılı TTK üzerinde uzmanlaşmış uzmanlardan oluşan editör ekibimiz. Tüm içerikler güncel mevzuat ve uygulamaya uygunluk açısından gözden geçirilir.</p>
            <div style="display:flex;gap:12px;flex-wrap:wrap;font-size:.82rem">
              <span style="color:#64748b">✓ Ayyıldız Yetkili Bayi</span>
              <span style="color:#64748b">✓ 5+ Yıl Deneyim</span>
              <span style="color:#64748b">✓ 81 İl Hizmet</span>
              <span style="color:#64748b">✓ BTK Mevzuat Uyumlu</span>
            </div>
          </div>
        </div>

        <details class="article-sources" style="background:#fff;border:1px solid var(--border);border-radius:10px;padding:18px 22px;margin-bottom:18px">
          <summary style="font-weight:700;cursor:pointer;color:var(--navy);font-size:1rem">📚 Bu Makalede Kullanılan Kaynaklar ve Yasal Dayanaklar</summary>
          <ul style="margin:14px 0 0;padding-left:20px;color:#475569;font-size:.92rem;line-height:1.7">
${sources}
          </ul>
          <p style="margin:14px 0 0;font-size:.82rem;color:#64748b;font-style:italic">Tüm kaynaklar resmi devlet kurumları veya ilgili düzenleyici otoritelerin yayınladığı belgeler ile birinci derece kaynak şirketlerin web sitelerinden alınmıştır.</p>
        </details>

        <div class="last-updated" style="text-align:center;padding:14px;background:#f0f9f4;border-radius:8px;font-size:.88rem;color:#16745b">
          🔄 Bu içerik en son <strong>${DATE_TEXT}</strong> tarihinde gözden geçirildi ve güncel mevzuata uygunluğu teyit edildi.
        </div>

      </section>
    </article>
    <div class="center" style="margin-top:32px">
      <a href="https://wa.me/908507771145?text=Merhaba%2C%20eimzasatinal.com.tr%20sitesinden%20yazıyorum.%20E-imza%20başvurusu%20yapmak%20istiyorum." class="btn btn--wa btn--lg" target="_blank" rel="noopener">WhatsApp ile Başvur</a>
      <a href="../blog" class="btn btn--ghost btn--lg" style="margin-left:12px">Tüm Yazılar</a>
    </div>
  </div>
</section>

<section class="section section--alt">
  <div class="container">
    <div class="section-head">
      <span class="eyebrow">İlgili Yazılar</span>
      <h2>Bunlar da İlginizi Çekebilir</h2>
    </div>
    <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:20px">
${related}
    </div>
  </div>
</section>
</main>

<footer class="site-footer">
  <div class="container">
    <div class="cols">
      <div class="about"><div class="brand"><span class="brand-mark" aria-hidden="true"></span><span>UMAY TÜM BİLİŞİM LTD.ŞTİ.</span></div><p>Türkiye'nin 81 ilinde Ayyıldız e-imza, KEP ve dijital güven çözümlerinde yetkili satıcınız.</p></div>
      <div><h3>Hizmetler</h3><ul><li><a href="../e-imza">E-İmza</a></li><li><a href="../kep">KEP</a></li><li><a href="../hizmetler">Hizmetler</a></li></ul></div>
      <div><h3>Kurumsal</h3><ul><li><a href="../hakkimizda">Hakkımızda</a></li><li><a href="../blog">Blog</a></li><li><a href="../sss">SSS</a></li><li><a href="../sozluk">Sözlük</a></li><li><a href="../karsilastir">Karşılaştırma</a></li><li><a href="../iletisim">İletişim</a></li></ul></div>
      <div><h3>İletişim</h3><ul><li><a href="tel:+908507771145">0 850 777 11 45</a></li><li><a href="tel:+902647771145">0 264 777 11 45</a></li><li><a href="https://wa.me/908507771145" target="_blank" rel="noopener">WhatsApp</a></li><li><a href="mailto:bilgi@umaybilisim.com.tr">bilgi@umaybilisim.com.tr</a></li><li>Sakarya / Erenler</li></ul></div>
    </div>
    <div class="footer-bottom">© 2026 <a href="https://www.umaybilisim.com.tr" target="_blank" rel="noopener" style="color:inherit;text-decoration:underline">UMAY TÜM BİLİŞİM LTD.ŞTİ.</a> Tüm hakları saklıdır.</div>
  </div>
</footer>
<div class="wa-popup" id="waPopup">
  <div class="wa-popup__bubble">
    <button class="wa-popup__close" id="waPopupClose" aria-label="Kapat">&times;</button>
    <strong>Merhaba!</strong>
    Size nasıl yardımcı olabiliriz? E-imza alımı, yenileme ya da fiyat hakkında sorularınızı hemen yanıtlayalım.
  </div>
</div>
<a href="https://wa.me/908507771145" class="fab-wa" target="_blank" rel="noopener" aria-label="WhatsApp">✆</a>
<script defer src="../assets/js/main.js?v=20261008"></script>
</body>
</html>`;
}

function renderFaq(b) {
  const items = b.faq.map(f => `      <div class="faq-item"><button class="faq-q" type="button">${f.q}</button><div class="faq-a"><div>${f.a}</div></div></div>`).join("\n");
  return `      <div class="faq">\n${items}\n      </div>\n`;
}

function faqSchema(b) {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": b.faq.map(f => ({ "@type": "Question", "name": f.q, "acceptedAnswer": { "@type": "Answer", "text": f.a } }))
  }, null, 2);
}

let created = 0;
for (const b of blogs) {
  const filePath = path.join(BLOG, `${b.slug}.html`);
  if (fs.existsSync(filePath)) {
    console.log(`✗ Skip (exists): ${b.slug}.html`);
    continue;
  }
  const full = Object.assign({}, b, { body: b.body + renderFaq(b) + cta(b.endCta) });
  let html = renderHead(full).replace("</head>", `<script type="application/ld+json">\n${faqSchema(b)}\n</script>\n</head>`) + "\n" + renderBody(full);
  fs.writeFileSync(filePath, html, "utf8");
  console.log(`✓ ${b.slug}.html (${b.wordCount} kelime)`);
  created++;
}

console.log(`\n✅ Created: ${created} new blog posts`);
