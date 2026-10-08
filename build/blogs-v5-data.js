"use strict";
/**
 * Blog (2026-10-08, 3. tur): e-SIM ve mobil imza.
 * GSC: "e sim mobil imza destekler mi" 37 gosterim + benzer sorgular.
 * Arastirma (2026-10-08):
 *  - Turkcell resmi: "Mobil Imza sadece 128K SIM Kart'larda kullanilabilmektedir,
 *    E-SIM'lerde Mobil Imza kullanilamamaktadir." Ucret 62 TL/ay.
 *    Sertifika SIM'de, tasinamaz; SIM degisikliginde mobil imza iptal olur.
 *  - Vodafone resmi: "Mobil Imza'ya uyumlu" SIM sarti; e-SIM icin acik ifade yok.
 *  - Turk Telekom: resmi ifade bulunamadi.
 * Uretim: node build/create-new-blogs-v3.js build/blogs-v5-data.js
 */
const { cta } = require("./blogs-v3-data");

module.exports = [
  {
    slug: "e-sim-mobil-imza",
    svg: "blog-e-sim-mobil-imza.svg",
    title: "E-SIM ile Mobil İmza Olur mu? Operatörlere Göre Durum (2026)",
    h1: "E-SIM ile Mobil İmza Olur mu?",
    description: "E-SIM'e geçerseniz mobil imzanız ne olur? Turkcell, Vodafone ve Türk Telekom'da durum, 128K SIM şartı, iptal riski ve telefondan bağımsız kart tipi e-imza alternatifi.",
    ogTitle: "E-SIM ile Mobil İmza Olur mu? 2026 Operatör Durumu",
    ogDescription: "E-SIM'e geçmeden önce bilmeniz gerekenler: 128K SIM şartı, iptal riski ve kart tipi e-imza.",
    eyebrow: "Mobil İmza Rehberi",
    section: "Mobil İmza",
    keywords: ["e-sim mobil imza", "esim mobil imza destekler mi", "e-sim ile mobil imza olur mu", "mobil imza 128k sim", "esime geçince mobil imza", "mobil imza e-imza farkı"],
    wordCount: 820,
    tldr: "<strong>Turkcell resmi olarak e-SIM'de mobil imzanın kullanılamadığını belirtiyor;</strong> mobil imza yalnızca 128K fiziksel SIM kartta çalışıyor. Vodafone da mobil imza için \"uyumlu SIM kart\" şartı koyuyor; Türk Telekom için resmi bir e-SIM desteği duyurusu bulamadık (Ekim 2026). Sertifika SIM kartın içinde saklandığı için <strong>SIM değiştirmek (e-SIM'e geçmek dahil) mobil imzayı iptal eder.</strong> E-SIM kullanmak ve imza ihtiyacını telefondan ayırmak istiyorsanız <strong>kart tipi e-imza</strong> bu sorunu ortadan kaldırır.",
    citations: [
      { name: "Turkcell — Mobil İmza servis sayfası", url: "https://www.turkcell.com.tr/servisler/bilgi/turkcell-mobil-imza" },
      { name: "Turkcell — İptal olan Mobil İmzamı tekrar nasıl aktiflerim?", url: "https://www.turkcell.com.tr/kurumsal/destek/servisler/mobil-imza/iptal-olan-mobil-imzami-tekrar-nasil-aktiflerim" },
      { name: "Vodafone — Mobil İmza", url: "https://www.vodafone.com.tr/mobil-imza" },
      { name: "5070 sayılı Elektronik İmza Kanunu", url: "https://www.mevzuat.gov.tr/mevzuatmetin/1.5.5070.pdf" }
    ],
    mentions: ["e-imza", "mobil-imza", "nes", "esim"],
    faq: [
      { q: "E-SIM ile mobil imza kullanılabilir mi?", a: "Turkcell, mobil imzanın yalnızca 128K SIM kartlarda kullanılabildiğini ve e-SIM'lerde kullanılamadığını resmi olarak belirtiyor. Vodafone mobil imza için uyumlu SIM kart şartı koyuyor; Türk Telekom için Ekim 2026 itibarıyla resmi bir e-SIM desteği duyurusu bulunmuyor." },
      { q: "E-SIM'e geçersem mobil imzam iptal olur mu?", a: "Evet, büyük olasılıkla. Mobil imza sertifikası SIM kartın içinde saklanır ve başka bir karta taşınamaz; Turkcell, SIM kart değişikliğinde mobil imzanın iptal olduğunu belirtiyor. E-SIM'e geçmek de bir SIM değişikliğidir." },
      { q: "Mobil imza neden 128K SIM kart istiyor?", a: "Mobil imzada nitelikli elektronik sertifika ve şifreleme işlemleri SIM kartın güvenli alanında tutulur. BTK düzenlemesiyle 2015'ten itibaren mobil imza yalnızca güncel şifreleme algoritmasını destekleyen 128K SIM kartlarda sunulmaktadır." },
      { q: "E-SIM kullanıyorum, imza için ne yapmalıyım?", a: "İki seçeneğiniz var: mobil imza için fiziksel 128K SIM'e geri dönmek ya da telefondan ve SIM'den bağımsız çalışan kart tipi e-imza almak. Kart tipi e-imza operatör veya telefon değişikliğinden etkilenmez." },
      { q: "Mobil imza ile kart tipi e-imza aynı hukuki değere sahip mi?", a: "Evet. İkisi de 5070 sayılı Elektronik İmza Kanunu kapsamında nitelikli elektronik imzadır ve güvenli elektronik imza olarak elle atılan imzayla aynı hukukî sonucu doğurur (kanundaki istisnalar hariç). Fark, sertifikanın nerede saklandığı ve hangi cihazla kullanıldığıdır." }
    ],
    body: `
      <h2>Kısa Cevap: Şu An İçin Hayır</h2>
      <p>Mobil imzada nitelikli elektronik sertifikanız <strong>SIM kartın içindeki güvenli alanda</strong> saklanır. Bu yüzden mobil imza, belirli teknik özelliklere sahip fiziksel SIM kartlara bağlıdır. Ekim 2026 itibarıyla operatörlerin resmi açıklamalarında durum şöyle:</p>
      <table class="price-table">
        <thead><tr><th>Operatör</th><th>Resmi bilgi</th><th>E-SIM'de mobil imza</th></tr></thead>
        <tbody>
          <tr><td>Turkcell</td><td>"Mobil İmza sadece 128K SIM Kart'larda kullanılabilmektedir, E-SIM'lerde Mobil İmza kullanılamamaktadır."</td><td>Kullanılamıyor</td></tr>
          <tr><td>Vodafone</td><td>Başvuruda SIM kartın "Mobil İmza'ya uyumlu" olması gerekiyor</td><td>Resmi destek duyurusu yok</td></tr>
          <tr><td>Türk Telekom</td><td>Resmi açıklama bulunamadı; basında mobil imza için SIM kart değişikliği yapıldığı aktarılıyor</td><td>Resmi destek duyurusu yok</td></tr>
        </tbody>
      </table>
      <p>Operatörler bu politikayı ileride değiştirebilir. E-SIM'e geçmeden önce kendi operatörünüzün müşteri hizmetlerinden güncel durumu teyit edin.</p>
${cta({ compact: true, title: "E-SIM'e geçtiniz, imzanız mı gitti?", desc: "Telefondan ve SIM'den bağımsız kart tipi e-imzayla imzanızı geri kazanın.", msg: "E-SIM'e geçtim, mobil imza yerine e-imza almak istiyorum.", btn: "Bilgi Al" })}
      <h2>E-SIM'e Geçince Mobil İmzanıza Ne Olur?</h2>
      <p>Turkcell'in kendi açıklamasına göre mobil imza sertifikası SIM kartta bulunur ve <strong>"hem yasal hem de teknik olarak başka bir sim karta taşınması mümkün değildir."</strong> Aynı sayfada <strong>SIM kart değişikliğinde mobil imzanın iptal olduğu</strong> ve SIM değiştirilecek tüm durumlarda önce servisin iptal edilmesi gerektiği yazıyor.</p>
      <p>E-SIM'e geçmek teknik olarak bir SIM değişikliğidir. Yani:</p>
      <ul>
        <li>Fiziksel SIM'den e-SIM'e geçtiğinizde mevcut mobil imzanız <strong>çalışmaz hale gelir</strong>.</li>
        <li>Sertifika yeni karta aktarılamaz; mobil imza için <strong>yeniden başvuru</strong> ve uyumlu fiziksel SIM gerekir.</li>
        <li>Telefon değiştirip SIM'i yeni telefona takarsanız sorun olmaz; sorun SIM kartın kendisinin değişmesidir.</li>
      </ul>
      <div class="callout">
        <strong>Uyarı:</strong> Beyanname, ihale veya dava gibi süreli bir işiniz varsa e-SIM'e geçişi bu işlerden sonraya bırakın ya da geçmeden önce alternatif imza aracınızı hazırlayın.
      </div>

      <h2>Neden 128K SIM Kart Şart?</h2>
      <p>Turkcell'in sayfasında belirtildiği üzere, BTK'nın elektronik imzada kullanılan SIM kartların şifreleme algoritmasına ilişkin düzenlemesiyle <strong>1 Ocak 2015'ten itibaren</strong> mobil imza yalnızca 128K SIM kartlarda kullanılabiliyor. Sertifika ve imza anahtarı bu kartın güvenli bölümünde üretilir ve dışarı çıkarılamaz. Operatörlerin resmi sayfalarında e-SIM üzerinde mobil imza hizmeti sunulduğuna dair bir duyuru bulunmuyor.</p>

      <h2>E-SIM Kullanıyorsanız Seçenekleriniz</h2>
      <div class="steps">
        <div class="step"><h3>1. Fiziksel 128K SIM'e dönün</h3><p>Mobil imzadan vazgeçmek istemiyorsanız operatörünüzden mobil imza uyumlu fiziksel SIM alıp mobil imza başvurusunu yeniden yaparsınız. E-SIM avantajlarından (çift hat, kolay cihaz değişimi) vazgeçmeniz gerekebilir.</p></div>
        <div class="step"><h3>2. Kart tipi e-imza alın</h3><p>Sertifika telefonunuzda değil, bilgisayara takılan <strong>akıllı kart veya USB token</strong>'da durur. E-SIM'e geçmek, operatör ya da telefon değiştirmek imzanızı etkilemez.</p></div>
      </div>

      <h2>Mobil İmza mı, Kart Tipi E-İmza mı?</h2>
      <p>İkisi de 5070 sayılı Kanun kapsamında <strong>nitelikli elektronik imzadır</strong> ve güvenli elektronik imza olarak elle atılan imzayla aynı hukukî sonucu doğurur (kanundaki istisnalar hariç). Seçim, nasıl çalıştığınıza bağlıdır:</p>
      <table class="price-table">
        <thead><tr><th></th><th>Mobil imza</th><th>Kart tipi e-imza</th></tr></thead>
        <tbody>
          <tr><td>Sertifikanın yeri</td><td>SIM kart</td><td>Akıllı kart / USB token</td></tr>
          <tr><td>E-SIM ile</td><td>Turkcell'de kullanılamıyor</td><td>Etkilenmez</td></tr>
          <tr><td>SIM / operatör değişimi</td><td>Mobil imza iptal olur</td><td>Etkilenmez</td></tr>
          <tr><td>Ücret modeli</td><td>Aylık abonelik (Turkcell: 62 TL/ay, Ekim 2026)</td><td>Tek seferlik paket (1-3 yıl)</td></tr>
          <tr><td>İmza anında gereken</td><td>Telefon yanınızda ve çekiyor olmalı</td><td>Kart bilgisayara takılı olmalı</td></tr>
        </tbody>
      </table>
      <p>Aylık maliyet açısından mobil imza daha düşük görünebilir; kart tipi e-imzanın avantajı ise <strong>telefona, SIM'e ve operatöre bağımlı olmaması</strong>dır. Sık telefon/hat değiştiren, e-SIM kullanan, yurt dışında çalışan ya da imzayı ofis bilgisayarında atan kullanıcılar için kart tipi daha az sürpriz çıkarır. Ayrıntılı karşılaştırma için <a href="e-imza-mobil-imza-farki">E-İmza ve Mobil İmza Farkı</a> yazımıza bakın.</p>

      <h2>Sık Sorulan Sorular</h2>
`,
    endCta: { eyebrow: "Telefondan Bağımsız", title: "E-SIM kullanın, imzanızı kaybetmeyin", desc: "Ayyıldız kart tipi e-imza operatör ve SIM değişikliğinden etkilenmez. Başvurunuzu WhatsApp'tan başlatın; onaydan sonra aynı gün kargo, kurulumu uzaktan birlikte yapıyoruz.", msg: "E-SIM kullanıyorum, kart tipi e-imza almak istiyorum.", btn: "WhatsApp ile Başvur", prices: true },
    related: [
      { slug: "e-imza-mobil-imza-farki", title: "E-İmza ve Mobil İmza Farkı" },
      { slug: "e-imza-kac-gunde-gelir", title: "E-İmza Kaç Günde Gelir?" },
      { slug: "e-imza-nedir-nasil-alinir", title: "E-İmza Nedir? Nasıl Alınır?" }
    ]
  }
];
