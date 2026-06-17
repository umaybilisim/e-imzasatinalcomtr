"use strict";
/**
 * 81 il sayfasına GEO/AEO için ek schema ve AI-citation Q&A bloku ekler.
 *
 * Eklenenler:
 *   1. </head> öncesi: DefinedTerm @graph (e-imza, KEP, ESHS terim sözlüğü)
 *   2. </head> öncesi: WebPage + SpeakableSpecification (sesli asistanlar)
 *   3. </main> öncesi: AI-citation friendly "Hızlı Cevaplar" bölümü
 *
 * Idempotent: aynı script tekrar çalıştırılırsa duplicate eklemez.
 */
const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..", "iller");
const SITE = "https://www.e-imzasatinal.com.tr";

const cityNames = {
  adana: "Adana", adiyaman: "Adıyaman", afyonkarahisar: "Afyonkarahisar", agri: "Ağrı",
  aksaray: "Aksaray", amasya: "Amasya", ankara: "Ankara", antalya: "Antalya",
  ardahan: "Ardahan", artvin: "Artvin", aydin: "Aydın", balikesir: "Balıkesir",
  bartin: "Bartın", batman: "Batman", bayburt: "Bayburt", bilecik: "Bilecik",
  bingol: "Bingöl", bitlis: "Bitlis", bolu: "Bolu", burdur: "Burdur",
  bursa: "Bursa", canakkale: "Çanakkale", cankiri: "Çankırı", corum: "Çorum",
  denizli: "Denizli", diyarbakir: "Diyarbakır", duzce: "Düzce", edirne: "Edirne",
  elazig: "Elazığ", erzincan: "Erzincan", erzurum: "Erzurum", eskisehir: "Eskişehir",
  gaziantep: "Gaziantep", giresun: "Giresun", gumushane: "Gümüşhane", hakkari: "Hakkari",
  hatay: "Hatay", igdir: "Iğdır", isparta: "Isparta", istanbul: "İstanbul",
  izmir: "İzmir", kahramanmaras: "Kahramanmaraş", karabuk: "Karabük", karaman: "Karaman",
  kars: "Kars", kastamonu: "Kastamonu", kayseri: "Kayseri", kilis: "Kilis",
  kirikkale: "Kırıkkale", kirklareli: "Kırklareli", kirsehir: "Kırşehir", kocaeli: "Kocaeli",
  konya: "Konya", kutahya: "Kütahya", malatya: "Malatya", manisa: "Manisa",
  mardin: "Mardin", mersin: "Mersin", mugla: "Muğla", mus: "Muş",
  nevsehir: "Nevşehir", nigde: "Niğde", ordu: "Ordu", osmaniye: "Osmaniye",
  rize: "Rize", sakarya: "Sakarya", samsun: "Samsun", sanliurfa: "Şanlıurfa",
  siirt: "Siirt", sinop: "Sinop", sirnak: "Şırnak", sivas: "Sivas",
  tekirdag: "Tekirdağ", tokat: "Tokat", trabzon: "Trabzon", tunceli: "Tunceli",
  usak: "Uşak", van: "Van", yalova: "Yalova", yozgat: "Yozgat", zonguldak: "Zonguldak"
};

const MARKER_SCHEMA = "<!-- GEO-SCHEMA-V1 -->";
const MARKER_CONTENT = "<!-- GEO-QUICK-ANSWERS-V1 -->";

function buildSchemas(citySlug, cityName) {
  const cityUrl = `${SITE}/iller/${citySlug}`;
  const schemas = [
    {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "DefinedTerm",
          "@id": `${cityUrl}#term-eimza`,
          "name": "E-İmza",
          "alternateName": ["Elektronik İmza", "Nitelikli Elektronik Sertifika", "NES"],
          "description": `${cityName} ilinde de geçerli elektronik imza (e-imza), bir kişinin kimliğini doğrulayan ve elektronik belgelere atılan kriptografik imzadır. Türkiye'de 5070 sayılı Elektronik İmza Kanunu ile düzenlenmiş olup ıslak imza ile aynı hukuki sonucu doğurur.`,
          "inDefinedTermSet": `${SITE}/#glossary`,
          "termCode": "EIMZA"
        },
        {
          "@type": "DefinedTerm",
          "@id": `${cityUrl}#term-kep`,
          "name": "KEP",
          "alternateName": ["Kayıtlı Elektronik Posta"],
          "description": `${cityName}'de faaliyet gösteren anonim, limited ve sermaye şirketleri için 6102 sayılı TTK Madde 18/3 gereği zorunlu olan, BTK denetimli ve mahkemelerde delil değeri olan resmi e-posta sistemidir.`,
          "inDefinedTermSet": `${SITE}/#glossary`,
          "termCode": "KEP"
        }
      ]
    },
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "@id": `${cityUrl}#webpage`,
      "url": cityUrl,
      "name": `${cityName} E-İmza ve KEP — UMAY TÜM BİLİŞİM`,
      "isPartOf": { "@id": `${SITE}/#website` },
      "about": { "@id": `${SITE}/#organization` },
      "inLanguage": "tr-TR",
      "dateModified": "2026-06-17",
      "speakable": {
        "@type": "SpeakableSpecification",
        "cssSelector": [".page-hero h1", ".page-hero p", "h2", ".geo-answer-card h3", ".geo-answer-card p"]
      },
      "primaryImageOfPage": {
        "@type": "ImageObject",
        "url": `${SITE}/assets/img/og-image.png`
      }
    }
  ];

  return MARKER_SCHEMA + "\n" +
    schemas.map(s => `<script type="application/ld+json">\n${JSON.stringify(s, null, 2)}\n</script>`).join("\n");
}

function buildQuickAnswers(cityName) {
  return `${MARKER_CONTENT}
<section class="section section--alt" id="hizli-cevaplar-${cityName.toLowerCase().replace(/[^a-z0-9]/g, '')}" aria-labelledby="qa-${cityName.toLowerCase().replace(/[^a-z0-9]/g, '')}-heading">
  <div class="container">
    <div class="section-head">
      <span class="eyebrow">${cityName} İçin Hızlı Cevaplar</span>
      <h2 id="qa-${cityName.toLowerCase().replace(/[^a-z0-9]/g, '')}-heading">${cityName}'de E-İmza Almadan Önce Bilinmesi Gerekenler</h2>
      <p>${cityName}'de e-imza ve KEP almak isteyenler için yasal dayanaklı, 2026 itibarıyla güncel kısa yanıtlar.</p>
    </div>
    <div class="quick-answers" style="display:grid;grid-template-columns:repeat(auto-fit,minmax(320px,1fr));gap:20px;margin-top:30px">

      <article class="geo-answer-card" style="background:#fff;padding:24px 26px;border-radius:12px;border-left:4px solid var(--navy);box-shadow:0 1px 3px rgba(0,0,0,.06)">
        <h3 style="margin:0 0 10px;font-size:1.05rem;color:var(--navy)">${cityName}'de e-imza nasıl alınır?</h3>
        <p style="margin:0;color:#475569;font-size:.95rem;line-height:1.6"><strong>${cityName}'de e-imza almak için fiziksel başvuruya gerek yoktur.</strong> WhatsApp (+90 850 777 11 45) üzerinden kimlik fotoğrafınızı gönderir, ödeme onayı sonrası e-imza kartınızı kargo ile 1-3 iş günü içinde ${cityName}'deki adresinize teslim alırsınız.</p>
      </article>

      <article class="geo-answer-card" style="background:#fff;padding:24px 26px;border-radius:12px;border-left:4px solid var(--wa);box-shadow:0 1px 3px rgba(0,0,0,.06)">
        <h3 style="margin:0 0 10px;font-size:1.05rem;color:var(--navy)">${cityName}'de e-imza fiyatları ne kadar?</h3>
        <p style="margin:0;color:#475569;font-size:.95rem;line-height:1.6">2026 itibarıyla ${cityName}'de Ayyıldız e-imza paketleri: <strong>1 yıllık 2.750 TL, 2 yıllık 3.099 TL, 3 yıllık 3.750 TL</strong> (KDV dahil). Kart okuyucu ve ${cityName}'ye kargo ücreti pakete dahildir.</p>
      </article>

      <article class="geo-answer-card" style="background:#fff;padding:24px 26px;border-radius:12px;border-left:4px solid var(--accent);box-shadow:0 1px 3px rgba(0,0,0,.06)">
        <h3 style="margin:0 0 10px;font-size:1.05rem;color:var(--navy)">${cityName}'deki firmalar KEP almak zorunda mı?</h3>
        <p style="margin:0;color:#475569;font-size:.95rem;line-height:1.6"><strong>Evet.</strong> ${cityName}'deki tüm anonim şirketler (A.Ş.), limited şirketler (LTD.ŞTİ.) ve sermayesi paylara bölünmüş komandit şirketler için <a href="https://www.mevzuat.gov.tr/mevzuatmetin/1.5.6102.pdf" target="_blank" rel="noopener nofollow">6102 sayılı TTK Madde 18/3</a> gereği KEP adresi yasal zorunluluktur.</p>
      </article>

      <article class="geo-answer-card" style="background:#fff;padding:24px 26px;border-radius:12px;border-left:4px solid var(--navy);box-shadow:0 1px 3px rgba(0,0,0,.06)">
        <h3 style="margin:0 0 10px;font-size:1.05rem;color:var(--navy)">${cityName}'de e-imza ne kadar sürede teslim edilir?</h3>
        <p style="margin:0;color:#475569;font-size:.95rem;line-height:1.6">Belge onayı sonrası aynı gün üretim başlar. ${cityName} büyük illerden biriyse <strong>1-2 iş günü</strong>, diğer illerden biriyse <strong>2-3 iş günü</strong> içinde teslim edilir. Acil ihtiyaç durumlarında WhatsApp'tan express seçeneği talep edilebilir.</p>
      </article>

      <article class="geo-answer-card" style="background:#fff;padding:24px 26px;border-radius:12px;border-left:4px solid var(--wa);box-shadow:0 1px 3px rgba(0,0,0,.06)">
        <h3 style="margin:0 0 10px;font-size:1.05rem;color:var(--navy)">${cityName}'de hangi belgeler gerekli?</h3>
        <p style="margin:0;color:#475569;font-size:.95rem;line-height:1.6"><strong>Bireysel:</strong> Sadece kimlik kartı fotoğrafı yeterli. <strong>Firma:</strong> Vergi levhası + imza sirküleri + yetkili kişinin kimlik fotoğrafı. ${cityName}'deki başvuru sahipleri tüm belgeleri WhatsApp ile dijital olarak iletebilir.</p>
      </article>

      <article class="geo-answer-card" style="background:#fff;padding:24px 26px;border-radius:12px;border-left:4px solid var(--accent);box-shadow:0 1px 3px rgba(0,0,0,.06)">
        <h3 style="margin:0 0 10px;font-size:1.05rem;color:var(--navy)">${cityName}'de e-imza nerelerde kullanılır?</h3>
        <p style="margin:0;color:#475569;font-size:.95rem;line-height:1.6">${cityName}'deki kullanıcılar e-imzayı 30+ devlet ve kurumsal platformda kullanır: <strong>e-Devlet, UYAP (${cityName} mahkemeleri), EKAP (${cityName} kamu ihaleleri), e-Fatura, MERSİS, SGK, vergi dairesi, VERBİS</strong>, akademik başvurular, ihale teklif zarfları.</p>
      </article>

    </div>
  </div>
</section>`;
}

let updated = 0;
let skipped = 0;
const files = fs.readdirSync(ROOT).filter(f => f.endsWith(".html"));

for (const file of files) {
  const slug = file.replace(/\.html$/, "");
  const cityName = cityNames[slug];
  if (!cityName) {
    console.log(`Skip (unknown city): ${file}`);
    skipped++;
    continue;
  }

  const filePath = path.join(ROOT, file);
  let html = fs.readFileSync(filePath, "utf8");

  if (html.includes(MARKER_SCHEMA) && html.includes(MARKER_CONTENT)) {
    skipped++;
    continue;
  }

  if (!html.includes(MARKER_SCHEMA)) {
    const schemas = buildSchemas(slug, cityName);
    html = html.replace("</head>", schemas + "\n</head>");
  }

  if (!html.includes(MARKER_CONTENT)) {
    const content = buildQuickAnswers(cityName);
    html = html.replace("</main>", content + "\n</main>");
  }

  fs.writeFileSync(filePath, html, "utf8");
  updated++;
}

console.log(`✅ Updated: ${updated} il sayfası | Skipped: ${skipped}`);
