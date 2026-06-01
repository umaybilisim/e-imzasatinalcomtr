"use strict";
const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");
const ILLER = path.join(ROOT, "iller");

// Türkiye'deki tüm 81 ilin komşuları
const neighbors = {
  adana: ["mersin", "osmaniye", "hatay", "kahramanmaras", "kayseri", "nigde"],
  adiyaman: ["malatya", "sanliurfa", "gaziantep", "kahramanmaras", "diyarbakir"],
  afyonkarahisar: ["kutahya", "eskisehir", "konya", "isparta", "burdur", "denizli", "usak"],
  agri: ["kars", "erzurum", "bitlis", "mus", "van", "igdir"],
  aksaray: ["nigde", "konya", "ankara", "kirsehir", "nevsehir"],
  amasya: ["samsun", "tokat", "yozgat", "corum"],
  ankara: ["bolu", "cankiri", "corum", "kirsehir", "aksaray", "konya", "eskisehir", "bilecik"],
  antalya: ["mugla", "burdur", "isparta", "konya", "karaman", "mersin"],
  ardahan: ["artvin", "erzurum", "kars"],
  artvin: ["rize", "erzurum", "ardahan"],
  aydin: ["izmir", "manisa", "denizli", "mugla"],
  balikesir: ["canakkale", "bursa", "kutahya", "manisa", "izmir"],
  bartin: ["zonguldak", "karabuk", "kastamonu"],
  batman: ["diyarbakir", "siirt", "bitlis", "mus", "mardin"],
  bayburt: ["trabzon", "rize", "erzurum", "gumushane"],
  bilecik: ["bursa", "kocaeli", "sakarya", "bolu", "eskisehir", "kutahya"],
  bingol: ["mus", "diyarbakir", "elazig", "erzincan", "erzurum"],
  bitlis: ["agri", "mus", "siirt", "batman", "van"],
  bolu: ["zonguldak", "karabuk", "cankiri", "ankara", "eskisehir", "bilecik", "sakarya", "duzce"],
  burdur: ["mugla", "denizli", "afyonkarahisar", "isparta", "antalya"],
  bursa: ["balikesir", "kutahya", "bilecik", "sakarya", "kocaeli", "yalova"],
  canakkale: ["edirne", "tekirdag", "balikesir"],
  cankiri: ["karabuk", "kastamonu", "corum", "yozgat", "kirikkale", "ankara", "bolu"],
  corum: ["sinop", "kastamonu", "cankiri", "yozgat", "tokat", "amasya", "samsun"],
  denizli: ["mugla", "aydin", "manisa", "usak", "afyonkarahisar", "burdur"],
  diyarbakir: ["batman", "siirt", "bingol", "mus", "elazig", "sanliurfa", "mardin", "adiyaman"],
  duzce: ["zonguldak", "bolu", "sakarya"],
  edirne: ["kirklareli", "tekirdag", "canakkale"],
  elazig: ["malatya", "tunceli", "bingol", "diyarbakir"],
  erzincan: ["bayburt", "gumushane", "giresun", "sivas", "tunceli", "erzurum", "bingol"],
  erzurum: ["artvin", "ardahan", "kars", "agri", "bingol", "erzincan", "bayburt", "rize"],
  eskisehir: ["bilecik", "bolu", "ankara", "konya", "afyonkarahisar", "kutahya"],
  gaziantep: ["sanliurfa", "adiyaman", "kahramanmaras", "osmaniye", "kilis"],
  giresun: ["trabzon", "gumushane", "erzincan", "sivas", "ordu"],
  gumushane: ["trabzon", "bayburt", "erzincan", "giresun"],
  hakkari: ["van", "sirnak"],
  hatay: ["osmaniye", "adana"],
  igdir: ["kars", "agri"],
  isparta: ["afyonkarahisar", "konya", "antalya", "burdur"],
  istanbul: ["tekirdag", "kocaeli"],
  izmir: ["balikesir", "manisa", "aydin"],
  kahramanmaras: ["adana", "osmaniye", "gaziantep", "adiyaman", "malatya", "kayseri"],
  karabuk: ["zonguldak", "bartin", "kastamonu", "cankiri", "bolu"],
  karaman: ["konya", "mersin", "antalya"],
  kars: ["ardahan", "erzurum", "agri", "igdir"],
  kastamonu: ["sinop", "corum", "cankiri", "karabuk", "bartin"],
  kayseri: ["sivas", "yozgat", "nevsehir", "nigde", "adana", "kahramanmaras"],
  kilis: ["gaziantep"],
  kirikkale: ["cankiri", "corum", "yozgat", "kirsehir", "ankara"],
  kirklareli: ["istanbul", "tekirdag", "edirne"],
  kirsehir: ["ankara", "kirikkale", "yozgat", "nevsehir", "aksaray"],
  kocaeli: ["istanbul", "sakarya", "bursa", "yalova"],
  konya: ["aksaray", "nigde", "karaman", "antalya", "isparta", "afyonkarahisar", "eskisehir", "ankara", "mersin"],
  kutahya: ["bursa", "bilecik", "eskisehir", "afyonkarahisar", "usak", "manisa", "balikesir"],
  malatya: ["sivas", "erzincan", "tunceli", "elazig", "diyarbakir", "adiyaman", "kahramanmaras"],
  manisa: ["balikesir", "izmir", "aydin", "denizli", "usak", "kutahya"],
  mardin: ["sanliurfa", "diyarbakir", "batman", "siirt", "sirnak"],
  mersin: ["antalya", "karaman", "konya", "nigde", "adana"],
  mugla: ["aydin", "denizli", "burdur", "antalya"],
  mus: ["agri", "bitlis", "siirt", "batman", "diyarbakir", "bingol"],
  nevsehir: ["kayseri", "yozgat", "kirsehir", "aksaray", "nigde"],
  nigde: ["aksaray", "konya", "mersin", "adana", "kayseri", "nevsehir"],
  ordu: ["giresun", "samsun", "tokat", "sivas"],
  osmaniye: ["adana", "hatay", "gaziantep", "kahramanmaras"],
  rize: ["trabzon", "erzurum", "artvin", "bayburt"],
  sakarya: ["istanbul", "kocaeli", "bursa", "bilecik", "bolu", "duzce"],
  samsun: ["sinop", "corum", "amasya", "tokat", "ordu"],
  sanliurfa: ["gaziantep", "adiyaman", "diyarbakir", "mardin"],
  siirt: ["batman", "mus", "bitlis", "sirnak", "mardin"],
  sinop: ["kastamonu", "corum", "samsun"],
  sirnak: ["mardin", "siirt", "hakkari"],
  sivas: ["yozgat", "tokat", "ordu", "giresun", "erzincan", "malatya", "kayseri"],
  tekirdag: ["istanbul", "kirklareli", "edirne", "canakkale"],
  tokat: ["amasya", "samsun", "ordu", "sivas", "yozgat"],
  trabzon: ["rize", "bayburt", "gumushane", "giresun"],
  tunceli: ["erzincan", "bingol", "elazig", "malatya"],
  usak: ["manisa", "kutahya", "afyonkarahisar", "denizli"],
  van: ["agri", "bitlis", "hakkari"],
  yalova: ["bursa", "kocaeli"],
  yozgat: ["corum", "amasya", "tokat", "sivas", "kayseri", "nevsehir", "kirsehir", "kirikkale", "cankiri"],
  zonguldak: ["bartin", "karabuk", "bolu", "duzce"]
};

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

function buildNeighborSection(citySlug) {
  const ns = neighbors[citySlug];
  if (!ns || ns.length === 0) return null;
  const cityName = cityNames[citySlug];
  const cards = ns.map(n => {
    return `      <a href="${n}" class="btn btn--ghost btn--sm" style="text-align:center">${cityNames[n]}</a>`;
  }).join("\n");
  return `
<section class="section section--alt">
  <div class="container">
    <div class="section-head">
      <span class="eyebrow">Komşu İller</span>
      <h2>${cityName}'a Komşu İllerde E-İmza</h2>
      <p>${cityName}'a sınır il(ler)de de e-imza ve KEP hizmetimizden faydalanabilirsiniz.</p>
    </div>
    <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(120px,1fr));gap:10px;max-width:800px;margin:0 auto">
${cards}
    </div>
  </div>
</section>
`;
}

const files = fs.readdirSync(ILLER).filter(f => f.endsWith(".html"));
let updated = 0;

for (const name of files) {
  const slug = name.replace(/\.html$/, "");
  if (!neighbors[slug]) {
    console.log("No neighbor data for:", slug);
    continue;
  }

  const file = path.join(ILLER, name);
  let html = fs.readFileSync(file, "utf8");
  if (html.includes("Komşu İller") || html.includes("Komşu İllerde")) {
    continue;
  }

  const section = buildNeighborSection(slug);
  if (!section) continue;

  // Insert before </main>
  html = html.replace("</main>", section + "</main>");
  fs.writeFileSync(file, html, "utf8");
  updated++;
}

console.log(`Done — ${updated} city pages now have neighbor city links.`);
