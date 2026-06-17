"use strict";
/**
 * Blog yazılarına GEO/AEO + E-E-A-T sinyalleri ekler.
 *
 * Eklenenler:
 *   1. <head>: Ek JSON-LD schemalar
 *      - Article schema genişletilmiş (mevcut Article ile birlikte)
 *      - WebPage + SpeakableSpecification
 *      - Author Person/Organization profili
 *   2. <article class="prose"> başı: TL;DR (Özet) bilgi kutusu
 *   3. <article class="prose"> sonu: Yasal Kaynaklar + Genişletilmiş Yazar Bio
 *
 * Idempotent (marker-based).
 */
const fs = require("fs");
const path = require("path");

const BLOG = path.join(__dirname, "..", "blog");
const SITE = "https://www.e-imzasatinal.com.tr";
const TODAY = "2026-06-17";

const MARKER_SCHEMA = "<!-- GEO-BLOG-SCHEMA-V1 -->";
const MARKER_TLDR = "<!-- GEO-TLDR-V1 -->";
const MARKER_FOOTER = "<!-- GEO-AUTHOR-SOURCES-V1 -->";

const blogConfig = {
  "e-imza-nedir-nasil-alinir": {
    title: "E-İmza Nedir? Nasıl Alınır?",
    keywords: ["e-imza", "elektronik imza", "NES", "nitelikli elektronik sertifika", "e-imza nasıl alınır", "Ayyıldız e-imza"],
    section: "E-İmza Rehberi",
    tldr: "<strong>E-imza nedir?</strong> Bir kişinin kimliğini doğrulayan ve elektronik belgelere atılan kriptografik imzadır. Türkiye'de <strong>5070 sayılı Elektronik İmza Kanunu</strong> ile düzenlenmiş, ıslak imza ile aynı hukuki sonucu doğurur. <strong>Nasıl alınır?</strong> BTK lisanslı 5 ESHS'den birinden veya yetkili bayisinden alınır. UMAY TÜM BİLİŞİM Ayyıldız yetkili bayisi olarak 81 ile WhatsApp tabanlı 1-3 iş günü teslimat sunar.",
    citations: [
      { name: "5070 sayılı Elektronik İmza Kanunu", url: "https://www.mevzuat.gov.tr/mevzuatmetin/1.5.5070.pdf" },
      { name: "BTK — Elektronik Sertifika Hizmet Sağlayıcıları Listesi", url: "https://www.btk.gov.tr" },
      { name: "e-Devlet Kapısı", url: "https://www.turkiye.gov.tr" }
    ],
    mentions: ["e-imza", "kep", "eshs", "ayyildiz", "nes"],
    wordCount: 1800
  },
  "e-imza-kurulumu-nasil-yapilir": {
    title: "E-İmza Kurulumu Nasıl Yapılır?",
    keywords: ["e-imza kurulumu", "AKİS", "AKIS sürücüsü", "e-imza tarayıcı eklentisi", "USB token kurulum", "e-imza Java"],
    section: "Teknik Rehber",
    tldr: "<strong>E-imza kurulumu 5 adımda tamamlanır:</strong> (1) <strong>AKİS</strong> kart sürücüsü kurulur. (2) USB token bilgisayara takılır. (3) <strong>PIN kodu</strong> ile aktivasyon yapılır. (4) Tarayıcı eklentisi (Chrome/Edge için) kurulur. (5) Test imzası ile doğrulama yapılır. UMAY TÜM BİLİŞİM <strong>AnyDesk üzerinden ücretsiz uzaktan kurulum desteği</strong> sunar.",
    citations: [
      { name: "Ayyıldız Bilgi Güvenliği — Sürücü İndirme", url: "https://www.ayyildiz.com.tr" },
      { name: "AKİS Kart İzleme Sistemi", url: "https://www.akis.com.tr" }
    ],
    mentions: ["e-imza", "akis", "usb token"],
    wordCount: 1600
  },
  "e-imza-mobil-imza-farki": {
    title: "E-İmza vs Mobil İmza: Farklar ve Karşılaştırma",
    keywords: ["e-imza mobil imza farkı", "mobil imza", "Turkcell mobil imza", "Vodafone mobil imza", "hangisi daha iyi"],
    section: "Karşılaştırma Rehberi",
    tldr: "<strong>E-imza</strong> akıllı kart + USB token ile çalışır, <strong>tek seferlik 1-3 yıllık ödemeyle</strong> alınır, tüm devlet sistemlerinde geçerlidir. <strong>Mobil imza</strong> SIM kart üzerinden çalışır, <strong>aylık abonelikle</strong> ödenir, bazı sistemlerde sınırlıdır. Yoğun kullanıcılar için e-imza, ara sıra kullanım için mobil imza önerilir.",
    citations: [
      { name: "5070 sayılı Elektronik İmza Kanunu", url: "https://www.mevzuat.gov.tr/mevzuatmetin/1.5.5070.pdf" },
      { name: "Turkcell Mobil İmza", url: "https://www.turkcell.com.tr" },
      { name: "Vodafone Mobil İmza", url: "https://www.vodafone.com.tr" }
    ],
    mentions: ["e-imza", "mobil imza", "nes"],
    wordCount: 1500
  },
  "e-imza-suresi-doldu-ne-yapilmali": {
    title: "E-İmza Süresi Doldu — Yenileme Rehberi",
    keywords: ["e-imza süresi doldu", "e-imza yenileme", "PIN unutuldu", "PUK kodu", "e-imza süresini uzatma"],
    section: "Yenileme Rehberi",
    tldr: "<strong>E-imza süresi bitmeden 2 hafta önce yenileme önerilir.</strong> Süre dolmadan yenilenirse mevcut karta yeni sertifika yüklenir (yenileme — hızlı). Süre dolduktan sonra yeni başvuru gerekir; bazen yeni kart da gerekebilir. <strong>PIN unutulduysa</strong> PUK kodu ile açılabilir; <strong>PUK 5 hatalı denendiyse</strong> kart kalıcı kilitlenir.",
    citations: [
      { name: "5070 sayılı Elektronik İmza Kanunu", url: "https://www.mevzuat.gov.tr/mevzuatmetin/1.5.5070.pdf" },
      { name: "Ayyıldız — Yenileme Süreci", url: "https://www.ayyildiz.com.tr" }
    ],
    mentions: ["e-imza", "akis", "nes"],
    wordCount: 1400
  },
  "e-imza-nerelerde-kullanilir": {
    title: "E-İmza Nerelerde Kullanılır? (30+ Alan)",
    keywords: ["e-imza nerelerde kullanılır", "e-Devlet", "UYAP", "EKAP", "e-Fatura", "MERSİS", "VERBİS", "SGK"],
    section: "Kullanım Rehberi",
    tldr: "<strong>E-imza 30+ devlet ve kurumsal platformda kullanılır:</strong> <strong>e-Devlet</strong>, <strong>UYAP</strong> (mahkeme), <strong>EKAP</strong> (kamu ihale), <strong>e-Fatura</strong>, <strong>e-Defter</strong>, <strong>MERSİS</strong>, <strong>SGK</strong>, vergi dairesi, <strong>VERBİS</strong> (KVKK), akademik başvurular, ihale teklif zarfları, dijital sözleşmeler.",
    citations: [
      { name: "e-Devlet Kapısı", url: "https://www.turkiye.gov.tr" },
      { name: "EKAP — Kamu İhale Kurumu", url: "https://ekap.kik.gov.tr" },
      { name: "GİB e-Fatura", url: "https://www.gib.gov.tr" },
      { name: "MERSİS Ticaret Sicil", url: "https://mersis.gtb.gov.tr" }
    ],
    mentions: ["e-imza", "kep", "e-devlet", "uyap", "ekap", "e-fatura", "verbis"],
    wordCount: 1700
  },
  "e-fatura-gecis-zorunlulugu-2026": {
    title: "E-Fatura Geçiş Zorunluluğu 2026 Rehberi",
    keywords: ["e-fatura 2026", "e-fatura zorunluluğu", "e-arşiv fatura", "e-defter", "GİB e-fatura başvurusu", "mali mühür"],
    section: "Mevzuat Güncel",
    tldr: "<strong>2026 itibarıyla e-fatura zorunluluğu kapsamı genişledi.</strong> Brüt satış hasılatı belirli eşiklerin üzerinde olan tüm mükellefler e-Fatura, e-Arşiv ve e-Defter kullanmak zorunda. <strong>Geçiş için gerekli:</strong> mali mühür (e-mühür) veya e-imza, GİB başvurusu, entegratör veya GİB portal seçimi.",
    citations: [
      { name: "GİB — e-Fatura Uygulama Kılavuzu", url: "https://www.gib.gov.tr" },
      { name: "509 sıra No.lu VUK Genel Tebliği", url: "https://www.mevzuat.gov.tr" },
      { name: "535 sıra No.lu VUK Genel Tebliği", url: "https://www.mevzuat.gov.tr" }
    ],
    mentions: ["e-imza", "e-fatura", "e-mühür", "mali mühür"],
    wordCount: 1900
  },
  "e-ticaret-icin-e-imza": {
    title: "E-Ticaret İçin E-İmza Zorunluluğu",
    keywords: ["e-ticaret e-imza", "ETBİS", "e-ticaret KEP", "pazaryeri e-imza", "online satış e-fatura"],
    section: "E-Ticaret Rehberi",
    tldr: "<strong>E-ticaret yapan tüm şirketlerin e-imzaya ihtiyacı vardır.</strong> Kullanım alanları: <strong>ETBİS</strong> (E-Ticaret Bilgi Sistemi) başvurusu, e-Fatura, e-Arşiv, KEP adresi, marka tescil, pazaryeri (Trendyol, Hepsiburada, Amazon) sözleşmeleri, e-imzalı KVKK sözleşmeleri.",
    citations: [
      { name: "ETBİS — Ticaret Bakanlığı", url: "https://etbis.gtb.gov.tr" },
      { name: "6563 sayılı Elektronik Ticaretin Düzenlenmesi Hakkında Kanun", url: "https://www.mevzuat.gov.tr/mevzuatmetin/1.5.6563.pdf" },
      { name: "Ticaret Bakanlığı — E-Ticaret", url: "https://www.ticaret.gov.tr" }
    ],
    mentions: ["e-imza", "kep", "e-fatura", "etbis"],
    wordCount: 1700
  },
  "kep-nedir-kimler-almak-zorunda": {
    title: "KEP Nedir? Kimler Almak Zorunda?",
    keywords: ["KEP nedir", "KEP zorunluluk", "TTK 18/3", "kayıtlı elektronik posta", "şirket KEP", "elektronik tebligat"],
    section: "Mevzuat",
    tldr: "<strong>KEP (Kayıtlı Elektronik Posta)</strong>, gönderici ve alıcı kimliği doğrulanmış, gönderim zamanı ve içerik bütünlüğü garantili, mahkemelerde delil değeri olan e-posta sistemidir. <strong>Zorunlu kullananlar:</strong> Anonim şirketler (A.Ş.), limited şirketler (LTD.ŞTİ.), sermayesi paylara bölünmüş komandit şirketler — <strong>6102 sayılı TTK Madde 18/3</strong> gereği.",
    citations: [
      { name: "6102 sayılı Türk Ticaret Kanunu", url: "https://www.mevzuat.gov.tr/mevzuatmetin/1.5.6102.pdf" },
      { name: "Elektronik Tebligat Yönetmeliği", url: "https://www.mevzuat.gov.tr" },
      { name: "7201 sayılı Tebligat Kanunu", url: "https://www.mevzuat.gov.tr/mevzuatmetin/1.4.7201.pdf" },
      { name: "PTT KEP", url: "https://www.pttkep.gov.tr" }
    ],
    mentions: ["kep", "ttk", "elektronik tebligat"],
    wordCount: 1800
  }
};

function buildExtraSchemas(slug, cfg) {
  const url = `${SITE}/blog/${slug}`;
  const schemas = [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "@id": `${url}#webpage`,
      "url": url,
      "name": cfg.title,
      "isPartOf": { "@id": `${SITE}/#website` },
      "about": { "@id": `${SITE}/#organization` },
      "inLanguage": "tr-TR",
      "dateModified": TODAY,
      "speakable": {
        "@type": "SpeakableSpecification",
        "cssSelector": [".page-hero h1", ".tldr-box p", "h2", "h3"]
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "TechArticle",
      "@id": `${url}#techarticle`,
      "headline": cfg.title,
      "url": url,
      "datePublished": "2026-04-15",
      "dateModified": TODAY,
      "inLanguage": "tr-TR",
      "wordCount": cfg.wordCount,
      "articleSection": cfg.section,
      "keywords": cfg.keywords.join(", "),
      "isPartOf": { "@id": `${SITE}/#website` },
      "publisher": { "@id": `${SITE}/#organization` },
      "author": {
        "@type": "Organization",
        "@id": `${SITE}/#editorialteam`,
        "name": "UMAY TÜM BİLİŞİM Editör Ekibi",
        "url": `${SITE}/hakkimizda`,
        "description": "Ayyıldız e-imza ve KEP konusunda 5+ yıl deneyimli, yetkili bayi uzmanlarından oluşan editör ekibi. Tüm içerikler yasal mevzuata uygunluk açısından gözden geçirilir.",
        "knowsAbout": ["Elektronik İmza", "KEP", "Dijital Güven", "5070 sayılı Kanun", "6102 sayılı TTK"],
        "memberOf": { "@id": `${SITE}/#organization` }
      },
      "citation": cfg.citations.map(c => ({
        "@type": "CreativeWork",
        "name": c.name,
        "url": c.url
      })),
      "mentions": cfg.mentions.map(m => ({
        "@type": "DefinedTerm",
        "name": m.toUpperCase(),
        "inDefinedTermSet": `${SITE}/#glossary`
      })),
      "mainEntityOfPage": { "@id": `${url}#webpage` }
    }
  ];

  return MARKER_SCHEMA + "\n" +
    schemas.map(s => `<script type="application/ld+json">\n${JSON.stringify(s, null, 2)}\n</script>`).join("\n");
}

function buildTldr(cfg) {
  return `${MARKER_TLDR}
<aside class="tldr-box" style="background:linear-gradient(135deg,#f0f4ff 0%,#e8f5f0 100%);border-left:4px solid var(--wa);border-radius:12px;padding:22px 26px;margin:24px 0 32px">
  <div style="display:flex;align-items:center;gap:10px;margin-bottom:12px">
    <span style="background:var(--wa);color:#fff;font-size:.7rem;font-weight:800;letter-spacing:.5px;padding:4px 10px;border-radius:999px">📌 ÖZET</span>
    <span style="font-size:.85rem;color:#475569">2026 itibarıyla güncel · UMAY TÜM BİLİŞİM Editör Ekibi tarafından doğrulanmıştır</span>
  </div>
  <p style="margin:0;color:#0f172a;font-size:1rem;line-height:1.65">${cfg.tldr}</p>
</aside>`;
}

function buildFooter(cfg) {
  const sources = cfg.citations
    .map(c => `    <li><a href="${c.url}" target="_blank" rel="noopener nofollow">${c.name}</a></li>`)
    .join("\n");

  return `${MARKER_FOOTER}
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
    🔄 Bu içerik en son <strong>17 Haziran 2026</strong> tarihinde gözden geçirildi ve güncel mevzuata uygunluğu teyit edildi.
  </div>

</section>`;
}

let updated = 0;
let skipped = 0;
const files = fs.readdirSync(BLOG).filter(f => f.endsWith(".html"));

for (const file of files) {
  const slug = file.replace(/\.html$/, "");
  const cfg = blogConfig[slug];
  if (!cfg) {
    console.log(`Skip (no config): ${file}`);
    skipped++;
    continue;
  }

  const filePath = path.join(BLOG, file);
  let html = fs.readFileSync(filePath, "utf8");

  if (html.includes(MARKER_SCHEMA) && html.includes(MARKER_TLDR) && html.includes(MARKER_FOOTER)) {
    skipped++;
    continue;
  }

  if (!html.includes(MARKER_SCHEMA)) {
    const extra = buildExtraSchemas(slug, cfg);
    html = html.replace("</head>", extra + "\n</head>");
  }

  // TL;DR: after <article class="prose"> opening tag and after .post-meta div
  if (!html.includes(MARKER_TLDR)) {
    const tldr = buildTldr(cfg);
    // Insert after picture> tag (after hero image)
    if (html.includes("</picture>")) {
      html = html.replace("</picture>", "</picture>\n" + tldr);
    } else {
      // Fallback: after post-meta div
      html = html.replace(/(<div class="post-meta"[\s\S]*?<\/div>\s*<\/div>)/, "$1\n" + tldr);
    }
  }

  // Footer: before </article>
  if (!html.includes(MARKER_FOOTER)) {
    const footer = buildFooter(cfg);
    html = html.replace("</article>", footer + "\n    </article>");
  }

  fs.writeFileSync(filePath, html, "utf8");
  updated++;
  console.log(`✓ ${file}`);
}

console.log(`\n✅ Updated: ${updated} blog | Skipped: ${skipped}`);
