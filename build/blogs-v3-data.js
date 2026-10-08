"use strict";
/**
 * Blog sprint (2026-10-08) — GSC/GA4 verisinden secilen 2 satis odakli yazi.
 *   1. e-imza-yenileme-sure-uzatma  ("e imza yenileme" pos 42, "... sure uzatma" sorgulari, rakip ESHS'ler)
 *   2. e-imza-hatalari-ve-cozumleri ("java e imza", "e imza surucu", "bilgisayar e imzayi gormuyor", hata mesajlari)
 */
const WA = "https://wa.me/908507771145?text=";
const wa = (msg) => WA + encodeURIComponent("Merhaba, eimzasatinal.com.tr sitesinden yazıyorum. " + msg);

const PRICES = `<div class="blog-cta__prices"><span>1 Yıl 3.000 TL</span><span>2 Yıl 3.500 TL</span><span>3 Yıl 4.000 TL</span><span>KDV dahil</span></div>`;

function cta({ compact, eyebrow, title, desc, msg, btn, prices, ghost }) {
  const g = ghost || { href: "../e-imza", text: "E-İmza Paketleri" };
  return `
      <!-- BLOG-CTA-V1 -->
      <aside class="blog-cta${compact ? " blog-cta--compact" : ""}" aria-label="E-imza başvurusu">
        <div class="blog-cta__text">
          ${eyebrow ? `<span class="blog-cta__eyebrow">${eyebrow}</span>` : ""}
          <span class="blog-cta__title">${title}</span>
          <p class="blog-cta__desc">${desc}</p>
          ${prices ? PRICES : ""}
        </div>
        <div class="blog-cta__actions">
          <a href="${wa(msg)}" class="btn btn--wa" target="_blank" rel="noopener">${btn}</a>
          ${compact ? "" : `<a href="${g.href}" class="btn btn--ghost">${g.text}</a>`}
        </div>
      </aside>
`;
}

module.exports = [
  {
    slug: "e-imza-yenileme-sure-uzatma",
    svg: "blog-e-imza-yenileme-sure-uzatma.svg",
    title: "E-İmza Yenileme ve Süre Uzatma 2026: Fiyat, Süre ve Adımlar",
    h1: "E-İmza Yenileme ve Süre Uzatma Rehberi (2026)",
    description: "E-imza süresi nasıl öğrenilir, yenileme ne kadar tutar, kaç günde biter? Başka firmadan alınan e-imzanın Ayyıldız ile yenilenmesi dahil adım adım rehber.",
    ogTitle: "E-İmza Yenileme ve Süre Uzatma 2026 — Fiyat ve Adımlar",
    ogDescription: "E-imza süre uzatma fiyatları, süre öğrenme yöntemleri ve başka firmadan geçiş.",
    eyebrow: "Yenileme Rehberi",
    section: "Yenileme ve Süre Uzatma",
    cardTag: "Yenileme",
    cardDesc: "Süre öğrenme, 2026 yenileme fiyatları, adım adım süre uzatma ve başka firmadan geçiş.",
    llmsDesc: "Süre öğrenme, 2026 fiyatları (3.000/3.500/4.000 TL), süre uzatma adımları, e-Güven/TÜRKKEP/E-Tuğra'dan geçiş",
    keywords: ["e-imza yenileme", "e-imza süre uzatma", "e-imza süresi öğrenme", "e-imza yenileme fiyatı", "süresi dolan e-imza yenileme", "e-imza sertifika yenileme"],
    wordCount: 820,
    tldr: "<strong>E-imza yenileme (süre uzatma), sertifikanızın süresi dolmadan yeni bir sertifika almaktır.</strong> Süre dolmadan başvurursanız <strong>mevcut kartınıza yeni sertifika yüklenir</strong>, kargo beklemezsiniz. 2026 Ayyıldız fiyatları KDV dahil <strong>1 yıl 3.000 TL, 2 yıl 3.500 TL, 3 yıl 4.000 TL</strong>. Başka firmadan (e-Güven, TÜRKKEP, E-Tuğra vb.) aldığınız e-imzanın yerine Ayyıldız e-imza alabilirsiniz; bu durumda yeni kart gönderilir. En güvenli zaman: <strong>bitişten en az 30 gün önce</strong>.",
    citations: [
      { name: "5070 sayılı Elektronik İmza Kanunu", url: "https://www.mevzuat.gov.tr/mevzuatmetin/1.5.5070.pdf" },
      { name: "BTK — Elektronik Sertifika Hizmet Sağlayıcıları", url: "https://www.btk.gov.tr" },
      { name: "Ayyıldız Bilgi Güvenliği", url: "https://www.ayyildiz.com.tr" }
    ],
    mentions: ["e-imza", "eshs", "nes"],
    faq: [
      { q: "E-imza yenileme ücreti ne kadar?", a: "2026 itibarıyla Ayyıldız e-imza yenileme fiyatları KDV dahil 1 yıllık 3.000 TL, 2 yıllık 3.500 TL, 3 yıllık 4.000 TL'dir. Yenileme ücreti yeni başvuruyla aynıdır." },
      { q: "E-imza süresi nasıl öğrenilir?", a: "Kartınız takılıyken e-imza yazılımındaki sertifika bilgilerinde veya tarayıcının sertifika yönetimi ekranında geçerlilik bitiş tarihi görünür. TC kimlik numaranızla bize WhatsApp'tan yazarak da öğrenebilirsiniz." },
      { q: "E-imza yenileme kaç günde biter?", a: "Süre dolmadan yapılan yenilemede yeni sertifika mevcut karta yüklenir ve işlem çoğunlukla aynı gün tamamlanır. Yeni kart gerekiyorsa teslim 1-3 iş günüdür." },
      { q: "Başka firmadan aldığım e-imzayı Ayyıldız ile yenileyebilir miyim?", a: "Evet. e-Güven, TÜRKKEP, E-Tuğra gibi farklı bir sağlayıcıdan aldığınız e-imzanın yerine Ayyıldız e-imza alabilirsiniz. Bu yeni bir başvuru sayılır ve yeni kart gönderilir; e-Devlet, UYAP, EKAP gibi sistemlerde aynı şekilde kullanılır." },
      { q: "Süresi dolan e-imza ile işlem yapılabilir mi?", a: "Hayır. Süresi dolan sertifika ile yeni imza atılamaz ve e-imza ile giriş yapılan sistemlere erişilemez. Daha önce atılmış imzalar ise geçerliliğini korur." }
    ],
    body: `
      <h2>E-İmza Yenileme ve Süre Uzatma Aynı Şey mi?</h2>
      <p>Günlük dilde <strong>"e-imza yenileme"</strong>, <strong>"süre uzatma"</strong> ve <strong>"sertifika yenileme"</strong> aynı işlem için kullanılır. Teknik olarak e-imzanın süresi uzatılmaz; elektronik sertifika hizmet sağlayıcısı (ESHS) size <strong>yeni bir nitelikli elektronik sertifika</strong> üretir. Süre dolmadan başvurduğunuzda bu yeni sertifika mevcut kartınıza yüklenir; kullanıcı açısından sonuç, "sürenin uzaması" gibi görünür.</p>
      <p>Süresi dolduktan sonra ne yapmanız gerektiğini merak ediyorsanız <a href="e-imza-suresi-doldu-ne-yapilmali">E-İmza Süresi Doldu — Ne Yapılmalı?</a> yazımıza bakın. Bu rehber ise süre dolmadan planlı yenileme, fiyatlar ve sağlayıcı değiştirme üzerine.</p>

      <h2>E-İmza Süresi Nasıl Öğrenilir?</h2>
      <p>E-imzanızın bitiş tarihini öğrenmenin üç pratik yolu var:</p>
      <div class="steps">
        <div class="step"><h3>E-imza yazılımından</h3><p>Kartınız takılıyken e-imza yazılımında (Ayyıldız kullanıcıları için kart yönetim uygulaması) sertifika bilgilerini açın. <strong>"Geçerlilik bitiş"</strong> ya da <strong>"Son kullanma"</strong> satırı bitiş tarihidir.</p></div>
        <div class="step"><h3>Tarayıcıdan</h3><p>Chrome veya Edge'de <em>Ayarlar → Gizlilik ve güvenlik → Güvenlik → Sertifikaları yönet</em> yolunu izleyin. Kart takılıyken adınıza düzenlenmiş sertifikanın <strong>geçerlilik tarihleri</strong> listelenir.</p></div>
        <div class="step"><h3>Bize sorun</h3><p>Kartınız yanınızda değilse TC kimlik numaranızla WhatsApp'tan yazın; Ayyıldız sertifikanızın bitiş tarihini kontrol edip size iletelim.</p></div>
      </div>
${cta({ compact: true, title: "Sürenizi biz kontrol edelim", desc: "TC kimlik numaranızı yazın, bitiş tarihini ve yenileme seçeneklerini iletelim.", msg: "E-imza süremi öğrenmek ve yenilemek istiyorum.", btn: "Süremi Sor" })}
      <h2>2026 E-İmza Yenileme Fiyatları</h2>
      <p>Ayyıldız e-imza yenileme fiyatları yeni başvuruyla aynıdır. Uzun süreli paket, yıllık maliyeti belirgin şekilde düşürür:</p>
      <table class="price-table">
        <thead><tr><th>Paket</th><th>Fiyat (KDV dahil)</th><th>Yıllık maliyet</th></tr></thead>
        <tbody>
          <tr><td>1 yıllık</td><td>3.000 TL</td><td>3.000 TL</td></tr>
          <tr><td>2 yıllık</td><td>3.500 TL</td><td>1.750 TL</td></tr>
          <tr><td>3 yıllık</td><td>4.000 TL</td><td>~1.333 TL</td></tr>
        </tbody>
      </table>
      <p>Her yıl yenilemek yerine 3 yıllık paket seçen bir kullanıcı, üç yılda <strong>5.000 TL</strong> tasarruf eder (3 × 3.000 TL yerine 4.000 TL). Ayrıca üç yıl boyunca yenileme takibiyle uğraşmaz.</p>

      <h2>Adım Adım E-İmza Yenileme</h2>
      <div class="steps">
        <div class="step"><h3>1. Talebinizi iletin</h3><p>WhatsApp'tan yenileme istediğinizi ve paket süresini (1, 2 veya 3 yıl) yazın.</p></div>
        <div class="step"><h3>2. Kimlik fotoğrafı</h3><p>Bireysel yenilemede genellikle kimlik kartınızın fotoğrafı yeterlidir. Firma adına kullanımda güncel belgeler istenebilir.</p></div>
        <div class="step"><h3>3. Ödeme</h3><p>Online tahsilat (kredi kartı) veya havale/EFT ile ödemenizi yapın.</p></div>
        <div class="step"><h3>4. Kimlik doğrulama ve yükleme</h3><p>ESHS'nin kimlik doğrulama adımı tamamlanınca yeni sertifika kartınıza yüklenir. Süre dolmadan yapılan yenilemelerde işlem çoğunlukla <strong>aynı gün</strong> biter.</p></div>
      </div>

      <h2>Başka Firmadan Aldığım E-İmzayı Ayyıldız ile Yenileyebilir miyim?</h2>
      <p>Evet. Türkiye'de BTK yetkisiyle nitelikli elektronik sertifika veren birden fazla sağlayıcı vardır (Ayyıldız, e-Güven, TÜRKKEP, E-Tuğra, kamu personeli için Kamu SM gibi). Hangisinden aldığınız fark etmeksizin, süre uzatma zamanı geldiğinde <strong>sağlayıcı değiştirebilirsiniz</strong>.</p>
      <ul>
        <li><strong>Yeni başvuru sayılır:</strong> Farklı sağlayıcının sertifikası eski kartınıza yüklenmez; size yeni Ayyıldız kartı gönderilir (1-3 iş günü).</li>
        <li><strong>Kullanım alanı değişmez:</strong> e-Devlet, UYAP, EKAP, GİB, MERSİS, e-Reçete gibi sistemler BTK yetkili tüm sağlayıcıların sertifikalarını kabul eder.</li>
        <li><strong>Kurulum:</strong> Yeni kartın sürücüsü farklı olabilir; uzaktan bağlantıyla birlikte kuruyoruz.</li>
        <li><strong>Eski kart:</strong> Süresi dolan eski kartınızı ayrıca iptal ettirmeniz gerekmez; süresi dolunca kendiliğinden geçersiz olur.</li>
      </ul>
      <div class="callout">
        <strong>İpucu:</strong> Sağlayıcı değiştirecekseniz eski sertifikanızın süresi dolmadan 1 hafta önce başvurun; yeni kart elinize ulaşana kadar eski kartınızla işlem yapmaya devam edersiniz.
      </div>

      <h2>Ne Zaman Yenilemeliyim?</h2>
      <p><strong>Bitiş tarihinden en az 30 gün önce</strong> başvurmak en güvenli yoldur. Beyanname, ihale veya dava süresinin son gününde e-imzanın dolması, en sık karşılaştığımız ve en pahalıya patlayan durumdur. Takvim uygulamanıza bitişten 30 gün önce hatırlatıcı kurmanızı öneririz.</p>

      <h2>Kurumlar İçin Toplu Yenileme</h2>
      <p>Muhasebe büroları, hastaneler ve şirketler gibi çok sayıda e-imza kullanan kurumlarda bitiş tarihleri farklı olur. Tüm çalışanların sertifikalarını listeleyip yenilemeleri tek tarihte toplamak hem takibi kolaylaştırır hem de kurulum işini tek seferde bitirir. Toplu yenileme için kişi listesiyle bize yazabilirsiniz.</p>

      <h2>Sık Sorulan Sorular</h2>
`,
    endCta: { eyebrow: "Yenileme", title: "E-imzanızı süresi dolmadan yenileyin", desc: "Talebinizi WhatsApp'tan iletin, yeni sertifikanız çoğunlukla aynı gün kartınıza yüklensin. Başka firmadan geçişte yeni kart 1-3 iş gününde elinizde.", msg: "E-imza yenileme (süre uzatma) yapmak istiyorum.", btn: "WhatsApp ile Yenile", prices: true },
    related: [
      { slug: "e-imza-suresi-doldu-ne-yapilmali", title: "E-İmza Süresi Doldu — Ne Yapılmalı?" },
      { slug: "e-imza-hatalari-ve-cozumleri", title: "E-İmza Hataları ve Çözümleri" },
      { slug: "e-imza-kayip-calinti-hasarli", title: "E-İmza Kartım Kayıp/Çalıntı/Hasarlı" }
    ]
  },
  {
    slug: "e-imza-hatalari-ve-cozumleri",
    svg: "blog-e-imza-hatalari-ve-cozumleri.svg",
    title: "E-İmza Hataları ve Çözümleri: Kart Görünmüyor, Java, Sürücü (2026)",
    h1: "E-İmza Hataları ve Çözümleri",
    description: "Bilgisayar e-imzayı görmüyor, Java hatası, sürücü bulunamadı, imza socket'e erişilemedi, PIN kilitlendi. En sık e-imza hataları ve adım adım çözümleri.",
    ogTitle: "E-İmza Hataları ve Çözümleri 2026",
    ogDescription: "Kart görünmüyor, Java, sürücü ve tarayıcı hatalarına adım adım çözüm.",
    eyebrow: "Sorun Giderme",
    section: "Sorun Giderme",
    cardTag: "Sorun Giderme",
    cardDesc: "Kart görünmüyor, Java, sürücü, imza socket ve PIN hataları için adım adım çözümler.",
    llmsDesc: "Kart görünmüyor, Java, sürücü, imza socket, PIN/PUK, sertifika süresi hataları için çözüm rehberi",
    keywords: ["e-imza hataları", "bilgisayar e-imzayı görmüyor", "e-imza java hatası", "e-imza sürücüsü", "akıllı kart sürücüsü", "imza socket hatası", "e-imza çalışmıyor"],
    wordCount: 790,
    tldr: "<strong>E-imza hatalarının çoğu üç sebepten kaynaklanır:</strong> kart sürücüsü yüklü değil veya güncel değil, Java/imza uygulaması çalışmıyor ya da tarayıcı eklentisi kapalı. Önce <strong>kartı başka USB porta takın, sürücüyü yeniden kurun ve bilgisayarı yeniden başlatın</strong>. \"İmza socket'e erişilemedi\" hatasında imza uygulamasını açıp sayfayı yenileyin. PIN 3 kez yanlış girilirse kart bloke olur, PUK ile açılır. Çözemezseniz uzaktan bağlanıp birlikte çözüyoruz.",
    citations: [
      { name: "BTK — Elektronik İmza", url: "https://www.btk.gov.tr" },
      { name: "Java (Oracle) resmi indirme sayfası", url: "https://www.java.com" },
      { name: "Ayyıldız Bilgi Güvenliği — Destek", url: "https://www.ayyildiz.com.tr" }
    ],
    mentions: ["e-imza", "akis", "java", "pkcs11"],
    faq: [
      { q: "Bilgisayar e-imzayı neden görmüyor?", a: "En sık sebep kart sürücüsünün yüklü olmaması veya güncel olmamasıdır. Kartı başka bir USB porta takın, sürücüyü yeniden kurun ve bilgisayarı yeniden başlatın. Kart okuyucunun ışığı yanmıyorsa kablo veya port sorunu olabilir." },
      { q: "E-imza için Java gerekli mi?", a: "Bazı kamu sistemleri ve imza uygulamaları Java ile çalışır. Uygulamanız Java istiyorsa java.com üzerinden güncel sürümü kurun ve imza uygulamasını yeniden başlatın. Birden fazla Java sürümü çakışma yaratabilir; eskilerini kaldırmak sorunu çözebilir." },
      { q: "\"İmza socket sunucusuna erişilemedi\" hatası nasıl çözülür?", a: "Bu hata, tarayıcının bilgisayarınızdaki imza uygulamasına bağlanamadığını gösterir. İmza uygulamasını başlatın, açık olduğundan emin olun ve sayfayı yenileyin. Güvenlik yazılımı uygulamayı engelliyorsa izin verin." },
      { q: "PIN'imi unuttum veya kart bloke oldu, ne yapmalıyım?", a: "PIN 3 kez yanlış girilirse kart bloke olur ve PUK koduyla açılır. PUK 5 kez yanlış girilirse kart kalıcı olarak kilitlenir ve yeni başvuru gerekir. PUK'u tahminle denemeyin." },
      { q: "E-imzam takılı ama \"sertifika bulunamadı\" diyor, neden?", a: "Sertifikanın süresi dolmuş olabilir veya kart sürücüsü sertifikayı okuyamıyordur. Önce sertifika bitiş tarihini kontrol edin; süre dolmuşsa yenileme gerekir." }
    ],
    body: `
      <h2>Önce Bu 4 Adımı Deneyin</h2>
      <p>Destek taleplerimizin büyük kısmı aşağıdaki dört basit adımla çözülüyor. Ayrıntılı hatalara geçmeden önce bunları sırayla deneyin:</p>
      <div class="steps">
        <div class="step"><h3>1. Farklı USB port</h3><p>Kartı/token'ı çıkarıp başka bir USB porta (mümkünse doğrudan bilgisayara, çoklayıcıya değil) takın.</p></div>
        <div class="step"><h3>2. Yeniden başlatma</h3><p>Tarayıcıyı ve e-imza uygulamasını kapatın, bilgisayarı yeniden başlatın.</p></div>
        <div class="step"><h3>3. Sürücüyü yeniden kurun</h3><p>Kart sürücüsünü kaldırıp güncel sürümünü yeniden kurun. Kurulum adımları için <a href="e-imza-kurulumu-nasil-yapilir">E-İmza Kurulumu</a> yazımıza bakın.</p></div>
        <div class="step"><h3>4. Sertifika süresi</h3><p>Hata "sertifika bulunamadı" veya "geçersiz sertifika" ise sorun teknik değil, <strong>sürenin dolmuş</strong> olması olabilir.</p></div>
      </div>
${cta({ compact: true, title: "Takıldıysanız birlikte çözelim", desc: "Uzaktan bağlanıp sürücü, Java ve tarayıcı ayarlarını kontrol edelim.", msg: "E-imzamda hata alıyorum, destek istiyorum.", btn: "Uzaktan Destek" })}
      <h2>Hata 1: Bilgisayar E-İmzayı Görmüyor / Kart Okunmuyor</h2>
      <p>"Kart bulunamadı", "akıllı kart takılı değil" veya kart yönetim uygulamasında boş liste görüyorsanız:</p>
      <ul>
        <li><strong>Işığı kontrol edin:</strong> Kart okuyucu veya token takılıyken ışık yanmıyorsa port, kablo ya da donanım sorunu vardır.</li>
        <li><strong>Aygıt Yöneticisi:</strong> Windows'ta <em>Aygıt Yöneticisi → Akıllı kart okuyucuları</em> altında okuyucunuz sarı ünlemle görünüyorsa sürücü eksiktir.</li>
        <li><strong>Doğru sürücü:</strong> Kart tipinize uygun sürücüyü kurun (Ayyıldız kartlarında AKİS altyapısı yaygındır; Safenet/Gemalto token'lar farklı sürücü ister).</li>
        <li><strong>Kart kütüphanesi hatası:</strong> "Kart kütüphaneleri yüklenemedi" uyarısı genellikle sürücünün eksik veya eski olduğunu gösterir; sürücüyü yeniden kurmak çözer.</li>
      </ul>

      <h2>Hata 2: Java Hataları</h2>
      <p>Bazı kamu sistemleri ve masaüstü imza uygulamaları Java ile çalışır. Java kaynaklı tipik belirtiler: uygulama hiç açılmıyor, "Java bulunamadı" uyarısı veya imza ekranının boş gelmesi.</p>
      <ul>
        <li>Uygulamanın istediği sürümü <a href="https://www.java.com" target="_blank" rel="noopener nofollow">java.com</a> üzerinden kurun.</li>
        <li>Bilgisayarda birden fazla eski Java sürümü varsa <em>Denetim Masası → Programlar</em>'dan eskilerini kaldırın; çakışma en sık nedendir.</li>
        <li>Java kurduktan sonra imza uygulamasını ve tarayıcıyı yeniden başlatın.</li>
      </ul>

      <h2>Hata 3: "İmza Socket Sunucusuna Erişilemedi"</h2>
      <p>Bu mesaj, tarayıcıdaki sayfanın bilgisayarınızda çalışması gereken imza uygulamasına bağlanamadığını gösterir.</p>
      <div class="steps">
        <div class="step"><h3>Uygulamayı başlatın</h3><p>İmza uygulamasını (ilgili sistemin istediği yerel imza yazılımı) açın; görev çubuğunda simgesinin göründüğünden emin olun.</p></div>
        <div class="step"><h3>Sayfayı yenileyin</h3><p>Uygulama açıkken tarayıcıda sayfayı yenileyin (F5).</p></div>
        <div class="step"><h3>Güvenlik yazılımı</h3><p>Antivirüs veya güvenlik duvarı uygulamayı engelliyorsa izin verin.</p></div>
      </div>

      <h2>Hata 4: Tarayıcı E-İmzayı Algılamıyor</h2>
      <p>Uygulamada kart görünüyor ama web sitesinde imza atılamıyorsa sorun tarayıcı eklentisindedir. Chrome, Edge ve Firefox için adım adım ayarlar <a href="e-imza-tarayici-eklentisi-kurulumu">E-İmza Tarayıcı Eklentisi Kurulumu</a> yazımızda. Kısaca: eklentinin yüklü ve <strong>etkin</strong> olduğunu, site izinlerinin açık olduğunu kontrol edin; gizli pencerede eklentiler çoğunlukla kapalıdır.</p>

      <h2>Hata 5: PIN Kilitlendi / PUK Soruluyor</h2>
      <p>PIN'i <strong>3 kez</strong> yanlış girerseniz kart bloke olur; kart yönetim uygulamasından PUK koduyla açıp yeni PIN belirlersiniz. PUK <strong>5 kez</strong> yanlış girilirse kart kalıcı kilitlenir ve yeni başvuru gerekir. Ayrıntılar için <a href="e-imza-kayip-calinti-hasarli">Kayıp/Çalıntı/Hasarlı Kart</a> rehberimize bakın.</p>
      <div class="callout">
        <strong>Uyarı:</strong> PUK kodunu tahminle denemeyin. Emin değilseniz önce bize yazın.
      </div>

      <h2>Hata 6: "Sertifika Süresi Dolmuş" / "Yetki Bitiş Tarihi Dolmuştur"</h2>
      <p>Bu bir arıza değil, sertifikanızın geçerlilik süresinin bittiğini gösterir. Sürücü veya Java'yı yeniden kurmak işe yaramaz; <a href="e-imza-yenileme-sure-uzatma">e-imza yenileme</a> gerekir. Süre dolmadan yenilemede yeni sertifika mevcut kartınıza yüklenir.</p>

      <h2>Hangi Durumda Destek Almalısınız?</h2>
      <ul>
        <li>Yukarıdaki adımlardan sonra kart hâlâ okunmuyorsa,</li>
        <li>Birden fazla Java sürümü ve eski sürücüler bilgisayarda birbirine karışmışsa,</li>
        <li>Son gün beyanname, ihale veya dava işi beklemiyorsa ve vakit kaybetmek istemiyorsanız.</li>
      </ul>
      <p>Uzaktan bağlantıyla bilgisayarınıza bağlanıp sürücü, Java ve tarayıcı ayarlarını birlikte düzenliyoruz.</p>

      <h2>Sık Sorulan Sorular</h2>
`,
    endCta: { eyebrow: "Uzaktan Destek", title: "Hatayı uzaktan birlikte çözelim", desc: "WhatsApp'tan aldığınız hata mesajını yazın veya ekran görüntüsünü gönderin. Ayyıldız e-imza müşterilerimize kurulum ve sorun giderme desteğini uzaktan veriyoruz. Süreniz dolduysa yenilemeyi de aynı görüşmede yapalım.", msg: "E-imzamda hata alıyorum, destek istiyorum.", btn: "WhatsApp ile Yaz", prices: true },
    related: [
      { slug: "e-imza-kurulumu-nasil-yapilir", title: "E-İmza Kurulumu Nasıl Yapılır?" },
      { slug: "e-imza-tarayici-eklentisi-kurulumu", title: "E-İmza Tarayıcı Eklentisi Kurulumu" },
      { slug: "e-imza-yenileme-sure-uzatma", title: "E-İmza Yenileme ve Süre Uzatma" }
    ]
  }
];

module.exports.cta = cta;
