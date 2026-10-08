"use strict";
/**
 * Yuksek trafikli ama lead getirmeyen bloglara satis kutusu (CTA) ekler.
 * GA4 (90 gun, 2026-10-08): bu bloglar trafik aliyor, generate_lead = 0.
 *
 * - Orta kutu (kompakt): makaledeki 2. <h2>'den hemen once
 * - Son kutu (fiyatli): GEO-AUTHOR-SOURCES-V1 isaretinden hemen once
 * Idempotent: BLOG-CTA-V1 isareti olan dosyayi atlar.
 *
 * Kullanim: node build/add-blog-cta.js
 */
const fs = require("fs");
const path = require("path");

const BLOG = path.join(__dirname, "..", "blog");
const MARK = "<!-- BLOG-CTA-V1 -->";
const WA = "https://wa.me/908507771145?text=";
const SITE_PREFIX = "Merhaba, eimzasatinal.com.tr sitesinden yazıyorum. ";

const PRICES = `<div class="blog-cta__prices"><span>1 Yıl 3.000 TL</span><span>2 Yıl 3.500 TL</span><span>3 Yıl 4.000 TL</span><span>KDV dahil</span></div>`;

const posts = {
  "e-imza-tarayici-eklentisi-kurulumu": {
    msg: "E-imza kurulumu için destek almak istiyorum.",
    mid: { title: "Eklenti kurulumunda takıldınız mı?", desc: "Ayyıldız e-imza müşterilerimizin kurulumunu uzaktan bağlantıyla birlikte yapıyoruz." , btn: "Kurulum Desteği Al" },
    end: { eyebrow: "Uzaktan Kurulum", title: "E-imzanız yoksa ya da süresi dolduysa, kurulumu dahil teslim edelim", desc: "Ayyıldız e-imzanızı WhatsApp üzerinden başlatın. Kart elinize ulaştığında sürücü, eklenti ve tarayıcı ayarlarını uzaktan birlikte kuruyoruz.", btn: "WhatsApp ile Yaz", prices: true }
  },
  "e-imza-kurulumu-nasil-yapilir": {
    msg: "E-imza kurulumu için destek almak istiyorum.",
    mid: { title: "Adımları kendiniz yapmak zorunda değilsiniz", desc: "Ayyıldız e-imza müşterilerimizin kurulumunu uzaktan bağlantıyla birlikte yapıyoruz.", btn: "Kurulum Desteği Al" },
    end: { eyebrow: "Uzaktan Kurulum", title: "E-imzanızı alın, kurulumu biz yapalım", desc: "Ayyıldız e-imza başvurunuz WhatsApp üzerinden başlar, kartınız 1-3 iş gününde elinize ulaşır. Sürücü ve Java dahil kurulumu uzaktan birlikte tamamlıyoruz.", btn: "WhatsApp ile Yaz", prices: true }
  },
  "vekaletle-e-imza-alinabilir-mi": {
    msg: "E-imza başvurusu yapmak istiyorum.",
    mid: { title: "Vekalete gerek kalmadan, evden başvurun", desc: "Başvuru kimlik fotoğrafınızla WhatsApp üzerinden başlar, fiziksel evrak gönderilmez.", btn: "Başvuruyu Başlat" },
    end: { eyebrow: "Evden Başvuru", title: "E-imzanızı kendi adınıza 1-3 iş gününde alın", desc: "E-imza kişiye özeldir; en hızlı yol kendi adınıza başvurmaktır. Evraklarınızı WhatsApp'tan iletin, Ayyıldız e-imzanız adresinize gelsin.", btn: "WhatsApp ile Başvur", prices: true }
  },
  "kep-nedir-kimler-almak-zorunda": {
    msg: "KEP adresi almak istiyorum.",
    mid: { title: "KEP adresi almanız mı gerekiyor?", desc: "Şahıs, şirket ve meslek mensupları için Ayyıldız KEP başvurusunu WhatsApp üzerinden başlatın.", btn: "KEP Başvurusu" },
    end: { eyebrow: "Ayyıldız KEP", title: "KEP adresinizi online başvuruyla açalım", desc: "Belgelerinizi WhatsApp'tan iletin, başvurunuzu Ayyıldız yetkili bayisi olarak biz takip edelim. KEP ile birlikte e-imza ihtiyacınız varsa tek seferde planlayalım.", btn: "WhatsApp ile Yaz", ghost: { href: "../kep", text: "KEP Paketleri" } }
  },
  "doktorlar-icin-e-imza-e-recete": {
    msg: "Doktor olarak e-imza almak istiyorum.",
    mid: { title: "E-Reçete için e-imzanız hazır mı?", desc: "Hekimler için Ayyıldız e-imza başvurusu WhatsApp üzerinden, evrak gönderimi online.", btn: "Hemen Başvur" },
    end: { eyebrow: "Hekimler İçin", title: "E-Reçete, MEDULA ve e-Rapor için Ayyıldız e-imza", desc: "Başvurunuzu WhatsApp'tan başlatın, kartınız 1-3 iş gününde elinize ulaşsın. Kurulumu uzaktan birlikte yapalım, muayenehanede zaman kaybetmeyin.", btn: "WhatsApp ile Başvur", prices: true }
  },
  "e-imza-ile-e-devlete-giris": {
    msg: "E-imza başvurusu yapmak istiyorum.",
    mid: { title: "E-Devlet girişi için e-imzanız yok mu?", desc: "Ayyıldız e-imza başvurusu WhatsApp üzerinden, kart 1-3 iş gününde elinizde.", btn: "Başvuruyu Başlat" },
    end: { eyebrow: "Ayyıldız E-İmza", title: "Şifresiz, güvenli e-Devlet girişi için e-imzanızı alın", desc: "Evraklarınızı WhatsApp'tan iletin, e-imzanız adresinize gelsin. Kurulumu uzaktan birlikte yapıyoruz.", btn: "WhatsApp ile Başvur", prices: true }
  },
  "e-imza-mobil-imza-farki": {
    msg: "E-imza fiyatı hakkında bilgi almak istiyorum.",
    mid: { title: "Hangisi size uygun, karar veremediniz mi?", desc: "Kullanım alanınızı yazın, size uygun e-imza paketini önerelim.", btn: "Danış" },
    end: { eyebrow: "Ayyıldız E-İmza", title: "Kart tipi e-imzada karar verdiyseniz", desc: "Operatör değiştirseniz de geçerliliğini koruyan Ayyıldız e-imzanızı WhatsApp üzerinden başlatın. Kartınız 1-3 iş gününde elinizde.", btn: "WhatsApp ile Yaz", prices: true }
  }
};

function waLink(msg) {
  return WA + encodeURIComponent(SITE_PREFIX + msg);
}

function midBox(c, msg) {
  return `      ${MARK}
      <aside class="blog-cta blog-cta--compact" aria-label="E-imza başvurusu">
        <div class="blog-cta__text">
          <span class="blog-cta__title">${c.title}</span>
          <p class="blog-cta__desc">${c.desc}</p>
        </div>
        <div class="blog-cta__actions">
          <a href="${waLink(msg)}" class="btn btn--wa" target="_blank" rel="noopener">${c.btn}</a>
        </div>
      </aside>

`;
}

function endBox(c, msg) {
  const ghost = c.ghost || { href: "../e-imza", text: "E-İmza Paketleri" };
  return `      ${MARK}
      <aside class="blog-cta" aria-label="E-imza başvurusu">
        <div class="blog-cta__text">
          <span class="blog-cta__eyebrow">${c.eyebrow}</span>
          <span class="blog-cta__title">${c.title}</span>
          <p class="blog-cta__desc">${c.desc}</p>
          ${c.prices ? PRICES : ""}
        </div>
        <div class="blog-cta__actions">
          <a href="${waLink(msg)}" class="btn btn--wa" target="_blank" rel="noopener">${c.btn}</a>
          <a href="${ghost.href}" class="btn btn--ghost">${ghost.text}</a>
        </div>
      </aside>

`;
}

let changed = 0;
for (const [slug, cfg] of Object.entries(posts)) {
  const file = path.join(BLOG, `${slug}.html`);
  let html = fs.readFileSync(file, "utf8");
  if (html.includes(MARK)) { console.log(`- skip (var): ${slug}`); continue; }

  // Makale icindeki 2. <h2> (prose icinde)
  const proseStart = html.indexOf('<article class="prose">');
  const first = html.indexOf("<h2", proseStart);
  const second = html.indexOf("<h2", first + 3);
  const endMark = html.indexOf("<!-- GEO-AUTHOR-SOURCES-V1 -->");
  if (proseStart < 0 || first < 0 || second < 0 || endMark < 0 || second > endMark) {
    console.log(`! isaret bulunamadi: ${slug}`); continue;
  }
  const lineStart = html.lastIndexOf("\n", second) + 1;
  const endLineStart = html.lastIndexOf("\n", endMark) + 1;

  html = html.slice(0, lineStart) + midBox(cfg.mid, cfg.msg) + html.slice(lineStart, endLineStart)
       + endBox(cfg.end, cfg.msg) + html.slice(endLineStart);
  fs.writeFileSync(file, html, "utf8");
  console.log(`✓ ${slug}`);
  changed++;
}
console.log(`\nToplam: ${changed} blog`);
