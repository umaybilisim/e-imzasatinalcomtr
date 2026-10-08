"use strict";
/**
 * Blog sprint (2026-10-08, 2. tur) — GSC'de gosterim alan ama karsiligi olmayan sorular.
 *   1. e-fatura-icin-e-imza-gerekli-mi  ("e fatura icin e imza gerekli mi" pos 3,8 / 0 tik,
 *      "e imza olmadan e fatura kesilir mi", "e arsiv fatura kase imza zorunlu mu")
 *   2. e-imza-kac-gunde-gelir           ("e imza almak ne kadar surer", "kac gunde gelir")
 * Uretim: node build/create-new-blogs-v3.js build/blogs-v4-data.js
 */
const { cta } = require("./blogs-v3-data");

module.exports = [
  {
    slug: "e-fatura-icin-e-imza-gerekli-mi",
    svg: "blog-e-fatura-icin-e-imza-gerekli-mi.svg",
    title: "E-Fatura İçin E-İmza Gerekli mi? Şahıs, Şirket ve Entegratör (2026)",
    h1: "E-Fatura İçin E-İmza Gerekli mi?",
    description: "E-fatura kesmek için e-imza mı, mali mühür mü gerekir? Şahıs şirketi, limited/anonim şirket, özel entegratör ve e-Arşiv Portal için net cevaplar ve tablo.",
    ogTitle: "E-Fatura İçin E-İmza Gerekli mi? 2026 Net Cevap",
    ogDescription: "Şahıs, şirket, entegratör ve e-Arşiv Portal kullanıcıları için e-imza / mali mühür ihtiyacı.",
    eyebrow: "E-Fatura Rehberi",
    section: "E-Fatura",
    keywords: ["e-fatura için e-imza gerekli mi", "e-imza olmadan e-fatura kesilir mi", "e-fatura mali mühür", "şahıs şirketi e-fatura e-imza", "e-arşiv fatura imza zorunlu mu", "özel entegratör e-imza"],
    wordCount: 780,
    tldr: "<strong>Kısa cevap: GİB e-Fatura Portalı'nı kullanacaksanız evet.</strong> Şahıs şirketi sahibi (gerçek kişi) <strong>nitelikli e-imza veya mali mühür</strong>, limited/anonim şirket (tüzel kişi) <strong>mali mühür</strong> kullanır. <strong>Özel entegratörle</strong> çalışıyorsanız faturalarınızı çoğunlukla entegratör imzalar; yine de başvuru ve diğer GİB/e-Devlet işlemleri için e-imza sık sık gerekir. <strong>GİB e-Arşiv Portal</strong>'da faturalar SMS onayıyla düzenlenebilir. Elektronik faturada <strong>ıslak imza ve kaşe aranmaz</strong>.",
    citations: [
      { name: "GİB — e-Belge Uygulamaları", url: "https://ebelge.gib.gov.tr" },
      { name: "213 sayılı Vergi Usul Kanunu", url: "https://www.mevzuat.gov.tr/mevzuatmetin/1.4.213.pdf" },
      { name: "5070 sayılı Elektronik İmza Kanunu", url: "https://www.mevzuat.gov.tr/mevzuatmetin/1.5.5070.pdf" },
      { name: "TÜBİTAK Kamu SM — Mali Mühür", url: "https://kamusm.bilgem.tubitak.gov.tr" }
    ],
    mentions: ["e-imza", "mali-muhur", "e-fatura", "e-arsiv"],
    faq: [
      { q: "E-fatura için e-imza gerekli mi?", a: "GİB e-Fatura Portalı'nı kullanacaksanız evet: gerçek kişiler (şahıs şirketleri) nitelikli e-imza veya mali mühür, tüzel kişiler (limited, anonim) mali mühür kullanır. Özel entegratörle çalışanlarda faturayı çoğunlukla entegratör imzalar." },
      { q: "E-imza olmadan e-fatura kesilir mi?", a: "GİB e-Fatura Portalı'nda e-imza veya mali mühür olmadan fatura imzalanamaz. Özel entegratör kullanıyorsanız entegratör faturayı kendi altyapısıyla imzalayabilir; GİB e-Arşiv Portal'da ise faturalar SMS onayıyla düzenlenebilir." },
      { q: "Şahıs şirketi e-fatura için mali mühür mü e-imza mı almalı?", a: "Şahıs şirketi sahibi gerçek kişi olduğu için nitelikli e-imza ile de işlem yapabilir. E-imza aynı zamanda e-Devlet, UYAP, EKAP ve SGK işlemlerinde de kullanıldığı için çoğu şahıs şirketi için daha çok yönlü bir tercihtir." },
      { q: "E-arşiv faturada kaşe ve ıslak imza zorunlu mu?", a: "Hayır. Elektronik olarak düzenlenen faturalarda ıslak imza ve kaşe aranmaz; belgenin güvenliğini elektronik imza, mali mühür veya portal onayı sağlar." },
      { q: "E-fatura için e-imza ne kadar sürede gelir?", a: "Başvuru onayından sonra kart aynı gün kargoya verilir; büyükşehirlere ertesi gün, diğer illere 1-2 iş günü içinde ulaşır." }
    ],
    body: `
      <h2>Kısa Cevap: Hangi Yöntemi Kullandığınıza Bağlı</h2>
      <p>"E-fatura için e-imza gerekli mi?" sorusunun cevabı, <strong>faturayı nereden kestiğinize</strong> ve <strong>şirket türünüze</strong> göre değişir. Elektronik faturanın kendisi elektronik olarak imzalanır ya da mühürlenir; bu işi kimin, hangi araçla yaptığı farklıdır:</p>
      <table class="price-table">
        <thead><tr><th>Durumunuz</th><th>Fatura imzası</th><th>Size ne gerekir?</th></tr></thead>
        <tbody>
          <tr><td>Şahıs şirketi, GİB e-Fatura Portalı</td><td>Sizin imzanız</td><td>Nitelikli e-imza <em>veya</em> mali mühür</td></tr>
          <tr><td>Limited / anonim şirket, GİB e-Fatura Portalı</td><td>Şirket mührü</td><td>Mali mühür</td></tr>
          <tr><td>Özel entegratör kullanan her mükellef</td><td>Çoğunlukla entegratör</td><td>Fatura için kart gerekmeyebilir; başvuru ve diğer işlemler için e-imza sık gerekir</td></tr>
          <tr><td>GİB e-Arşiv Portal (ücretsiz)</td><td>Portal onayı</td><td>SMS onayı; e-imza zorunlu değil</td></tr>
        </tbody>
      </table>
      <p>Hangi mükelleflerin e-faturaya geçmek zorunda olduğunu <a href="e-fatura-gecis-zorunlulugu-2026">E-Fatura Geçiş Zorunluluğu 2026</a> yazımızda ayrıntılı anlattık. Bu yazı yalnızca "imza tarafında neye ihtiyacım var?" sorusuna odaklanıyor.</p>
${cta({ compact: true, title: "Hangi yöntemin size uygun olduğundan emin değil misiniz?", desc: "Şirket türünüzü ve fatura hacminizi yazın, doğru çözümü önerelim.", msg: "E-fatura için e-imza almak istiyorum.", btn: "Danış" })}
      <h2>Şahıs Şirketi: E-İmza mı, Mali Mühür mü?</h2>
      <p>Şahıs şirketi sahibi hukuken <strong>gerçek kişi</strong>dir. Bu yüzden GİB e-Fatura Portalı'nda faturalarını kendi <strong>nitelikli elektronik imzası (NES)</strong> ile imzalayabilir; isterse mali mühür de alabilir. Pratikte çoğu şahıs şirketi için <strong>e-imza daha mantıklıdır</strong>, çünkü aynı kart:</p>
      <ul>
        <li>e-Devlet'e şifresiz giriş,</li>
        <li>SGK, UYAP, EKAP ve MERSİS işlemleri,</li>
        <li>sözleşme ve resmi yazışmaların imzalanması</li>
      </ul>
      <p>için de kullanılır. Mali mühür ise yalnızca vergi ve e-belge işlemlerine yöneliktir. İki aracın farkını <a href="mali-muhur-nedir-eimza-farki">Mali Mühür Nedir? E-İmza ile Farkı</a> yazımızda karşılaştırdık.</p>

      <h2>Limited ve Anonim Şirket: Mali Mühür Şart</h2>
      <p>Tüzel kişiler (limited, anonim, kooperatif vb.) GİB e-Fatura Portalı'nda faturalarını <strong>mali mühür</strong> ile imzalar; şirket adına kişisel e-imza bu işin yerine geçmez. Ancak şirket yetkilisinin <strong>kişisel e-imzası</strong> yine de gerekir: MERSİS, ticaret sicili, SGK işveren işlemleri, KEP ve EKAP gibi birçok işlem yetkilinin kendi e-imzasıyla yapılır. Bu yüzden tipik bir şirkette <strong>hem mali mühür hem yetkili e-imzası</strong> bulunur.</p>

      <h2>Özel Entegratör Kullanıyorsanız</h2>
      <p>Faturalarını bir özel entegratör yazılımıyla kesen mükelleflerde imzalama çoğunlukla <strong>entegratörün altyapısında</strong> yapılır; bu durumda her fatura için kartınızı takmanız gerekmez. Yine de:</p>
      <ul>
        <li>Entegratör sözleşmesi, başvuru ve yetkilendirme adımlarında,</li>
        <li>GİB İnternet Vergi Dairesi ve e-Devlet işlemlerinde</li>
      </ul>
      <p>e-imza sıkça istenir. Entegratörünüze "faturaları kendi mührünüzle mi imzalıyorsunuz?" diye sormanız en net cevabı verir.</p>

      <h2>GİB e-Arşiv Portal: E-İmza Olmadan Fatura</h2>
      <p>GİB'in ücretsiz <strong>e-Arşiv Portal</strong>'ında faturalar kullanıcı kodu ve şifreyle girilip <strong>SMS onayıyla</strong> düzenlenebilir. Bu nedenle "e-imza olmadan fatura kesilir mi?" sorusunun cevabı, yalnızca e-Arşiv Portal kullananlar için <strong>evet</strong>tir. Karşı taraf e-fatura mükellefiyse ona e-arşiv değil <strong>e-fatura</strong> kesmeniz gerekir; bunun için yukarıdaki portal veya entegratör yöntemlerinden birine ihtiyaç duyarsınız.</p>

      <h2>Kaşe ve Islak İmza Gerekir mi?</h2>
      <p>Hayır. Elektronik ortamda düzenlenen e-fatura ve e-arşiv faturalarda <strong>ıslak imza ve kaşe aranmaz</strong>. Belgenin kimden geldiğini ve değiştirilmediğini elektronik imza, mali mühür veya portal onayı güvence altına alır. Çıktısını aldığınız bir e-arşiv faturaya kaşe basmanız da belgenin geçerliliğini değiştirmez.</p>

      <h2>E-Fatura İçin E-İmza Almak Ne Kadar Sürer?</h2>
      <p>Ayyıldız e-imza başvurusu WhatsApp üzerinden başlar; bireysel başvuruda kimlik fotoğrafı, firma yetkilisi için vergi levhası, imza sirküleri ve kimlik yeterlidir. Başvuru onayından sonra kart <strong>aynı gün kargoya</strong> verilir, büyükşehirlere ertesi gün ulaşır. Ayrıntılar için <a href="e-imza-kac-gunde-gelir">E-İmza Kaç Günde Gelir?</a> yazımıza bakın.</p>

      <h2>Sık Sorulan Sorular</h2>
`,
    endCta: { eyebrow: "E-Fatura İçin", title: "E-faturaya geçerken e-imzanızı hazır edin", desc: "Ayyıldız e-imza başvurunuzu WhatsApp'tan başlatın, kartınız aynı gün kargoda olsun. Şirketiniz için mali mühür gerekiyorsa başvuru sürecinde de yol gösterelim.", msg: "E-fatura için e-imza almak istiyorum.", btn: "WhatsApp ile Başvur", prices: true },
    related: [
      { slug: "e-fatura-gecis-zorunlulugu-2026", title: "E-Fatura Geçiş Zorunluluğu 2026" },
      { slug: "mali-muhur-nedir-eimza-farki", title: "Mali Mühür Nedir? E-İmza ile Farkı" },
      { slug: "e-imza-kac-gunde-gelir", title: "E-İmza Kaç Günde Gelir?" }
    ]
  },
  {
    slug: "e-imza-kac-gunde-gelir",
    svg: "blog-e-imza-kac-gunde-gelir.svg",
    title: "E-İmza Kaç Günde Gelir? Başvurudan Teslime Süreç (2026)",
    h1: "E-İmza Kaç Günde Gelir? Başvurudan Teslime Süreç",
    description: "E-imza almak ne kadar sürer? Başvuru, onay, aynı gün kargo ve kurulum adımları; büyükşehir ve diğer iller için teslim süreleri, süreyi uzatan hatalar.",
    ogTitle: "E-İmza Kaç Günde Gelir? 2026 Teslim Süreleri",
    ogDescription: "Başvurudan teslime e-imza süreci: aynı gün kargo, büyükşehirlere ertesi gün teslim.",
    eyebrow: "Başvuru Süreci",
    section: "Başvuru ve Teslimat",
    keywords: ["e-imza kaç günde gelir", "e-imza almak ne kadar sürer", "e-imza ne kadar sürede gelir", "e-imza teslim süresi", "e-imza başvuru süreci", "acil e-imza"],
    wordCount: 580,
    tldr: "<strong>Başvuru onayından sonra e-imzanız aynı gün kargoya verilir.</strong> Büyükşehirlere <strong>ertesi gün</strong>, diğer illere <strong>1-2 iş günü</strong> içinde ulaşır; <strong>İstanbul, Ankara ve İzmir</strong> için aynı gün kurye seçeneği vardır. Toplamda çoğu müşteri e-imzasını <strong>1-3 iş gününde</strong> kullanmaya başlar. Süreyi en çok uzatan şey <strong>eksik veya okunaksız belge</strong>dir; kimlik fotoğrafınızı net göndermek bir gün kazandırır.",
    citations: [
      { name: "5070 sayılı Elektronik İmza Kanunu", url: "https://www.mevzuat.gov.tr/mevzuatmetin/1.5.5070.pdf" },
      { name: "BTK — Elektronik Sertifika Hizmet Sağlayıcıları", url: "https://www.btk.gov.tr" },
      { name: "Ayyıldız Bilgi Güvenliği", url: "https://www.ayyildiz.com.tr" }
    ],
    mentions: ["e-imza", "eshs", "nes"],
    faq: [
      { q: "E-imza kaç günde gelir?", a: "Başvuru onayından sonra e-imza aynı gün kargoya verilir; büyükşehirlere ertesi gün, diğer illere 1-2 iş günü içinde ulaşır. İstanbul, Ankara ve İzmir için aynı gün kurye seçeneği vardır." },
      { q: "E-imza almak için hangi belgeler gerekir?", a: "Bireysel başvuruda TC kimlik numarası net görünen kimlik kartı fotoğrafı yeterlidir. Firma adına kullanımda vergi levhası, imza sirküleri ve yetkili kişinin kimliği istenir. Belgeler WhatsApp ile iletilir." },
      { q: "Acil e-imza lazım, aynı gün alabilir miyim?", a: "İstanbul, Ankara ve İzmir'de aynı gün kurye seçeneği mevcuttur. Belgelerinizi sabah erken iletmeniz, onay ve gönderimin aynı gün tamamlanma ihtimalini artırır." },
      { q: "E-imza geldikten sonra hemen kullanabilir miyim?", a: "Kart ve okuyucu elinize ulaştıktan sonra sürücü ve tarayıcı kurulumu gerekir. Kurulumu uzaktan bağlantıyla birlikte yapıyoruz; genellikle aynı gün kullanmaya başlarsınız." },
      { q: "Süresi dolan e-imzayı yenilemek de bu kadar sürer mi?", a: "Hayır, süre dolmadan yapılan yenilemede yeni sertifika mevcut kartınıza yüklenir ve kargo beklenmez; işlem çoğunlukla aynı gün tamamlanır." }
    ],
    body: `
      <h2>Toplam Süre: Çoğu Müşteri İçin 1-3 İş Günü</h2>
      <p>E-imza almak, belgeleriniz hazırsa uzun bir süreç değildir. Zamanın büyük kısmını kargo oluşturur:</p>
      <table class="price-table">
        <thead><tr><th>Teslim yeri</th><th>Onaydan sonra</th></tr></thead>
        <tbody>
          <tr><td>İstanbul, Ankara, İzmir (kurye)</td><td>Aynı gün kurye seçeneği</td></tr>
          <tr><td>Büyükşehirler (kargo)</td><td>Ertesi gün</td></tr>
          <tr><td>Diğer iller (kargo)</td><td>1-2 iş günü</td></tr>
        </tbody>
      </table>

      <h2>Adım Adım: Başvurudan Teslime</h2>
      <div class="steps">
        <div class="step"><h3>1. WhatsApp'tan başvuru</h3><p>Bireysel mi firma adına mı kullanacağınızı ve paket süresini (1, 2 veya 3 yıl) yazın.</p></div>
        <div class="step"><h3>2. Belgeler</h3><p>Bireysel: TC kimlik numarası net görünen kimlik fotoğrafı. Firma: vergi levhası, imza sirküleri ve yetkili kişinin kimliği. Fiziksel evrak göndermezsiniz.</p></div>
        <div class="step"><h3>3. Ödeme</h3><p>Online tahsilat (kredi kartı) veya havale/EFT.</p></div>
        <div class="step"><h3>4. Onay ve üretim</h3><p>Belge onayıyla sertifika üretimi başlar; kart ve okuyucu <strong>aynı gün kargoya</strong> verilir.</p></div>
        <div class="step"><h3>5. Teslim ve kurulum</h3><p>Kart elinize ulaşınca sürücü ve tarayıcı ayarlarını uzaktan bağlantıyla birlikte kuruyoruz.</p></div>
      </div>
${cta({ compact: true, title: "Bugün başvurun, kartınız bugün kargoda olsun", desc: "Belgelerinizi WhatsApp'tan iletin, başvurunuzu hemen işleme alalım.", msg: "E-imza başvurusu yapmak istiyorum, ne kadar sürede gelir?", btn: "Başvuruyu Başlat" })}
      <h2>Süreyi Uzatan 4 Hata</h2>
      <ul>
        <li><strong>Okunaksız kimlik fotoğrafı:</strong> TC kimlik numarası veya yüz net değilse belge tekrar istenir. Işıklı bir ortamda, flaşsız ve kenarları görünecek şekilde çekin.</li>
        <li><strong>Firma belgelerinin eksik olması:</strong> İmza sirküleri güncel değilse ya da başvuran kişi yetkili değilse süreç durur.</li>
        <li><strong>Hafta sonu ve resmi tatiller:</strong> Kargo iş günlerinde çalışır; cuma akşamı yapılan başvuru genellikle pazartesi yola çıkar.</li>
        <li><strong>Teslimat adresinde bulunmamak:</strong> Kargo teslim edilemezse bir gün daha kaybedilir; kargo takip numarasını izleyin.</li>
      </ul>

      <h2>Acil E-İmza Gerekiyorsa</h2>
      <p>Beyanname, ihale veya dava için son gün yaklaşıyorsa:</p>
      <ul>
        <li>Belgelerinizi <strong>sabah erken</strong> iletin, onayın aynı gün tamamlanma ihtimali artar.</li>
        <li>İstanbul, Ankara veya İzmir'deyseniz <strong>aynı gün kurye</strong> seçeneğini sorun.</li>
        <li>Mevcut e-imzanızın süresi dolmak üzereyse yeni kart yerine <a href="e-imza-yenileme-sure-uzatma">süre uzatma</a> yapın; yeni sertifika mevcut kartınıza yüklenir, kargo beklemezsiniz.</li>
      </ul>

      <h2>Geldikten Sonra: Kurulum Ne Kadar Sürer?</h2>
      <p>Kart ve okuyucu elinize ulaştığında sürücü, gerekirse Java ve tarayıcı eklentisi kurulmalıdır. Kendiniz yapmak isterseniz <a href="e-imza-kurulumu-nasil-yapilir">E-İmza Kurulumu</a> rehberimizi izleyebilirsiniz; isterseniz uzaktan bağlanıp birlikte kuruyoruz. Bir sorunla karşılaşırsanız <a href="e-imza-hatalari-ve-cozumleri">E-İmza Hataları ve Çözümleri</a> yazımıza bakın.</p>

      <h2>Sık Sorulan Sorular</h2>
`,
    endCta: { eyebrow: "Hızlı Başvuru", title: "E-imzanız bugün kargoda olsun", desc: "Belgelerinizi WhatsApp'tan iletin; onaydan sonra aynı gün kargo, büyükşehirlere ertesi gün teslim. Kurulumu uzaktan birlikte yapalım.", msg: "E-imza başvurusu yapmak istiyorum, ne kadar sürede gelir?", btn: "WhatsApp ile Başvur", prices: true },
    related: [
      { slug: "e-imza-nedir-nasil-alinir", title: "E-İmza Nedir? Nasıl Alınır?" },
      { slug: "e-imza-yenileme-sure-uzatma", title: "E-İmza Yenileme ve Süre Uzatma" },
      { slug: "e-imza-kurulumu-nasil-yapilir", title: "E-İmza Kurulumu Nasıl Yapılır?" }
    ]
  }
];
