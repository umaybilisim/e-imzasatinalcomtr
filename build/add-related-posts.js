"use strict";
const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");
const BLOG = path.join(ROOT, "blog");

const posts = {
  "e-imza-nedir-nasil-alinir": {
    title: "E-İmza Nedir, Nasıl Alınır?",
    related: ["e-imza-kurulumu-nasil-yapilir", "e-imza-nerelerde-kullanilir", "e-imza-mobil-imza-farki"]
  },
  "e-imza-kurulumu-nasil-yapilir": {
    title: "E-İmza Kurulumu Nasıl Yapılır?",
    related: ["e-imza-nedir-nasil-alinir", "e-imza-suresi-doldu-ne-yapilmali", "e-imza-nerelerde-kullanilir"]
  },
  "e-imza-mobil-imza-farki": {
    title: "E-İmza mı, Mobil İmza mı?",
    related: ["e-imza-nedir-nasil-alinir", "e-imza-nerelerde-kullanilir", "e-imza-suresi-doldu-ne-yapilmali"]
  },
  "e-imza-nerelerde-kullanilir": {
    title: "E-İmza Nerelerde Kullanılır?",
    related: ["e-imza-nedir-nasil-alinir", "e-ticaret-icin-e-imza", "kep-nedir-kimler-almak-zorunda"]
  },
  "e-imza-suresi-doldu-ne-yapilmali": {
    title: "E-İmza Süresi Doldu Ne Yapılmalı?",
    related: ["e-imza-kurulumu-nasil-yapilir", "e-imza-nedir-nasil-alinir", "e-imza-mobil-imza-farki"]
  },
  "e-ticaret-icin-e-imza": {
    title: "E-Ticarette E-İmza",
    related: ["e-fatura-gecis-zorunlulugu-2026", "e-imza-nerelerde-kullanilir", "kep-nedir-kimler-almak-zorunda"]
  },
  "kep-nedir-kimler-almak-zorunda": {
    title: "KEP Nedir, Kimler Almak Zorunda?",
    related: ["e-imza-nedir-nasil-alinir", "e-fatura-gecis-zorunlulugu-2026", "e-ticaret-icin-e-imza"]
  },
  "e-fatura-gecis-zorunlulugu-2026": {
    title: "E-Faturaya Geçiş 2026",
    related: ["kep-nedir-kimler-almak-zorunda", "e-ticaret-icin-e-imza", "e-imza-nedir-nasil-alinir"]
  }
};

function buildRelatedSection(relatedSlugs) {
  const cards = relatedSlugs.map(slug => {
    const title = posts[slug]?.title || slug;
    const imgName = "blog-" + (slug.startsWith("e-imza-") ? slug.replace("e-imza-", "e-imza-").replace("nasil-yapilir", "kurulumu").replace("nedir-nasil-alinir", "nedir").replace("nerelerde-kullanilir", "nerelerde").replace("mobil-imza-farki", "mobil-imza").replace("suresi-doldu-ne-yapilmali", "suresi") :
      slug.startsWith("kep") ? "kep-nedir" :
      slug.startsWith("e-fatura") ? "e-fatura-gecis" :
      slug.startsWith("e-ticaret") ? "e-ticaret-eimza" :
      slug);
    return `      <a href="${slug}" class="blog-card" style="display:flex;flex-direction:column;text-decoration:none;color:inherit;background:#fff;border:1px solid var(--border);border-radius:12px;overflow:hidden;transition:transform .2s,box-shadow .2s">
        <picture><source srcset="../assets/img/blog/${imgName}.webp" type="image/webp"><img src="../assets/img/blog/${imgName}.jpg" alt="${title}" loading="lazy" style="width:100%;height:160px;object-fit:cover"></picture>
        <div style="padding:16px"><h3 style="margin:0;font-size:1rem;color:var(--navy);font-weight:700">${title}</h3></div>
      </a>`;
  }).join("\n");

  return `\n<section class="section section--alt">
  <div class="container">
    <div class="section-head">
      <span class="eyebrow">İlgili Yazılar</span>
      <h2>Bunlar da İlginizi Çekebilir</h2>
    </div>
    <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:20px">
${cards}
    </div>
  </div>
</section>
`;
}

let updated = 0;

for (const slug of Object.keys(posts)) {
  const file = path.join(BLOG, slug + ".html");
  if (!fs.existsSync(file)) {
    console.log("Missing:", slug);
    continue;
  }
  let html = fs.readFileSync(file, "utf8");
  if (html.includes("İlgili Yazılar")) {
    console.log("Skip (already has):", slug);
    continue;
  }
  const section = buildRelatedSection(posts[slug].related);
  // Insert before "Türkiye'nin 81 İlinde" section or before </main>
  const target = '<section class="section section--alt">\n  <div class="container">\n    <div class="section-head">\n      <span class="eyebrow">İlinizde Hizmet</span>';
  if (html.includes(target)) {
    html = html.replace(target, section.trim() + "\n\n" + target);
  } else {
    html = html.replace("</main>", section + "</main>");
  }
  fs.writeFileSync(file, html, "utf8");
  updated++;
}

console.log(`Done — ${updated} posts now have Related Posts.`);
