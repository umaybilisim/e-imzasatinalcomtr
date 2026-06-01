"use strict";
const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");
const SITE = "https://www.e-imzasatinal.com.tr";

function getAllHtmlFiles(dir, acc = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (["build", "node_modules", ".git", ".github", ".claude", ".playwright-mcp"].includes(entry.name)) continue;
      getAllHtmlFiles(full, acc);
    } else if (entry.isFile() && entry.name.endsWith(".html") && !entry.name.startsWith("google") && entry.name !== "index.html" && entry.name !== "404.html") {
      acc.push(full);
    }
  }
  return acc;
}

function makeBreadcrumb(items) {
  const list = items.map((it, i) => ({
    "@type": "ListItem",
    "position": i + 1,
    "name": it.name,
    ...(it.url ? { "item": it.url } : {})
  }));
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": list
  };
}

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
  usak: "Uşak", van: "Van", yalova: "Yalova", yozgat: "Yozgat",
  zonguldak: "Zonguldak"
};

const blogTitles = {
  "e-imza-nedir-nasil-alinir": "E-İmza Nedir, Nasıl Alınır?",
  "e-imza-kurulumu-nasil-yapilir": "E-İmza Kurulumu Nasıl Yapılır?",
  "e-imza-mobil-imza-farki": "E-İmza ile Mobil İmza Farkı",
  "e-imza-nerelerde-kullanilir": "E-İmza Nerelerde Kullanılır?",
  "e-imza-suresi-doldu-ne-yapilmali": "E-İmza Süresi Doldu Ne Yapılmalı?",
  "e-ticaret-icin-e-imza": "E-Ticaret İçin E-İmza",
  "kep-nedir-kimler-almak-zorunda": "KEP Nedir, Kimler Almak Zorunda?",
  "e-fatura-gecis-zorunlulugu-2026": "E-Fatura Geçiş Zorunluluğu 2026"
};

const pageNames = {
  "e-imza": "E-İmza",
  "kep": "KEP",
  "hizmetler": "Hizmetler",
  "sss": "Sık Sorulan Sorular",
  "hakkimizda": "Hakkımızda",
  "iletisim": "İletişim",
  "blog": "Blog",
  "cerez-politikasi": "Çerez Politikası",
  "aydinlatma-metni": "KVKK Aydınlatma Metni",
  "sertifika-ilkeleri": "Sertifika İlkeleri",
  "ilgili-kurum-linkleri": "İlgili Kurum Linkleri"
};

function getBreadcrumbForFile(file) {
  const rel = path.relative(ROOT, file).replace(/\\/g, "/");
  const baseName = path.basename(file, ".html");

  // City pages: iller/<name>.html
  if (rel.startsWith("iller/")) {
    const cityName = cityNames[baseName] || baseName;
    return makeBreadcrumb([
      { name: "Anasayfa", url: SITE + "/" },
      { name: "İller", url: SITE + "/#iller" },
      { name: cityName + " E-İmza ve KEP" }
    ]);
  }

  // Blog posts: blog/<slug>.html
  if (rel.startsWith("blog/")) {
    const title = blogTitles[baseName] || baseName;
    return makeBreadcrumb([
      { name: "Anasayfa", url: SITE + "/" },
      { name: "Blog", url: SITE + "/blog" },
      { name: title }
    ]);
  }

  // Top-level pages
  const name = pageNames[baseName] || baseName;
  return makeBreadcrumb([
    { name: "Anasayfa", url: SITE + "/" },
    { name: name }
  ]);
}

const files = getAllHtmlFiles(ROOT);
let updated = 0, skipped = 0;

for (const file of files) {
  let html = fs.readFileSync(file, "utf8");
  if (html.includes('"BreadcrumbList"')) {
    skipped++;
    continue;
  }
  if (!html.includes("</head>")) continue;

  const bc = getBreadcrumbForFile(file);
  const snippet = `<script type="application/ld+json">\n${JSON.stringify(bc, null, 2)}\n</script>\n</head>`;
  html = html.replace("</head>", snippet);
  fs.writeFileSync(file, html, "utf8");
  updated++;
}

console.log(`Done — ${updated} files updated, ${skipped} already had BreadcrumbList.`);
