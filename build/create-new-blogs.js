"use strict";
/**
 * 6 yeni blog yazısı oluşturur — UMAY blog stilinde,
 * tam GEO/AEO schema'lı (TechArticle + WebPage + Speakable + Citations + Mentions),
 * E-E-A-T sinyalleri ile (TL;DR + Author Bio + Sources).
 *
 * Yazılar:
 *   1. mali-muhur-nedir-eimza-farki
 *   2. e-imza-ile-e-devlete-giris (+ HowTo)
 *   3. e-imza-tarayici-eklentisi-kurulumu (+ HowTo)
 *   4. avukatlar-icin-e-imza-uyap
 *   5. muhasebeciler-icin-e-imza
 *   6. vekaletle-e-imza-alinabilir-mi
 */
const fs = require("fs");
const path = require("path");

const BLOG = path.join(__dirname, "..", "blog");
const SITE = "https://www.e-imzasatinal.com.tr";
const DATE_PUBLISHED = "2026-06-19";
const DATE_MODIFIED = "2026-06-19";

const blogs = [
  {
    slug: "mali-muhur-nedir-eimza-farki",
    title: "Mali Mühür Nedir? E-İmza ile Farkı (2026 Rehberi)",
    h1: "Mali Mühür Nedir? E-İmza ile Farkı",
    description: "Mali mühür (e-mühür) nedir, e-imzadan farkı ne? Şirketler için zorunluluk, GİB başvurusu, fiyatlar ve hangi durumda hangisi alınmalı. 2026 rehberi.",
    ogTitle: "Mali Mühür Nedir? E-İmza ile Farkı (2026)",
    ogDescription: "Mali mühür (e-mühür) ve e-imza arasındaki temel farklar, e-Fatura için zorunluluk ve başvuru süreci.",
    eyebrow: "E-Mühür Rehberi",
    section: "Mali Mühür Rehberi",
    keywords: ["mali mühür", "e-mühür", "mali mühür e-imza farkı", "e-fatura mali mühür", "GİB mali mühür", "mali mühür başvurusu"],
    wordCount: 1900,
    tldr: "<strong>Mali Mühür (e-Mühür)</strong>, şirket adına imza atan, <strong>GİB tarafından düzenlenen kurumsal sertifikadır</strong>. E-imzadan farkı: e-imza <em>gerçek kişiye</em> aittir, mali mühür ise <em>tüzel kişiye</em>. <strong>Zorunlu olanlar:</strong> e-Fatura, e-Arşiv, e-Defter kullanan tüm mükellefler. Tipik şirket konfigürasyonu: 1 mali mühür (GİB işlemleri için) + her yetkili için 1 firma e-imza.",
    citations: [
      { name: "GİB — e-Fatura Uygulama Kılavuzu", url: "https://www.gib.gov.tr" },
      { name: "509 sıra No.lu VUK Genel Tebliği", url: "https://www.mevzuat.gov.tr" },
      { name: "535 sıra No.lu VUK Genel Tebliği", url: "https://www.mevzuat.gov.tr" },
      { name: "5070 sayılı Elektronik İmza Kanunu", url: "https://www.mevzuat.gov.tr/mevzuatmetin/1.5.5070.pdf" }
    ],
    mentions: ["mali-muhur", "e-imza", "e-fatura", "nes"],
    body: `
      <h2>Mali Mühür Nedir?</h2>
      <p><strong>Mali Mühür (e-Mühür)</strong>, şirketler ve tüzel kişiler adına elektronik imza atmaya yarayan, <strong>Gelir İdaresi Başkanlığı (GİB) tarafından düzenlenen kurumsal nitelikli elektronik sertifikadır</strong>. Halk arasında "e-mühür" olarak da bilinir. Bir bireysel e-imzadan temel farkı, gerçek kişiye değil tüzel kişiliğe ait olmasıdır.</p>
      <p>Mali mühür, özellikle 2014 yılında zorunlu hale gelen <a href="/blog/e-fatura-gecis-zorunlulugu-2026">e-Fatura</a>, e-Arşiv ve e-Defter sistemlerinin işleyişi için gerekli kriptografik kimliği sağlar. Şirketin GİB'e gönderdiği her elektronik belge mali mühür ile imzalanır.</p>

      <div class="callout">
        <strong>Önemli:</strong> Mali mühür adı yanıltıcıdır — fiziksel bir mühür değildir. Akıllı kart veya USB token üzerinde kayıtlı dijital bir sertifikadır.
      </div>

      <h2>Mali Mühür ile E-İmza Arasındaki Temel Farklar</h2>
      <p>İki sertifika tipi de Türkiye hukukunda elektronik imza olarak kabul edilir, ancak kullanım amaçları ve sahipleri farklıdır.</p>

      <table style="width:100%;border-collapse:collapse;font-size:.92rem;margin:20px 0;background:#fff;border-radius:10px;overflow:hidden;box-shadow:0 1px 3px rgba(0,0,0,.05)">
        <thead><tr style="background:var(--navy);color:#fff"><th style="padding:12px 14px;text-align:left">Özellik</th><th style="padding:12px 14px;text-align:left">E-İmza (NES)</th><th style="padding:12px 14px;text-align:left">Mali Mühür</th></tr></thead>
        <tbody>
          <tr style="border-bottom:1px solid var(--border)"><td style="padding:10px 14px"><strong>Sahip</strong></td><td style="padding:10px 14px">Gerçek kişi</td><td style="padding:10px 14px">Tüzel kişi (şirket)</td></tr>
          <tr style="border-bottom:1px solid var(--border);background:#f8fafc"><td style="padding:10px 14px"><strong>Üreten kurum</strong></td><td style="padding:10px 14px">BTK lisanslı ESHS (Ayyıldız vb.)</td><td style="padding:10px 14px">GİB (Gelir İdaresi Başkanlığı)</td></tr>
          <tr style="border-bottom:1px solid var(--border)"><td style="padding:10px 14px"><strong>e-Devlet girişi</strong></td><td style="padding:10px 14px">✅ Evet</td><td style="padding:10px 14px">❌ Hayır</td></tr>
          <tr style="border-bottom:1px solid var(--border);background:#f8fafc"><td style="padding:10px 14px"><strong>e-Fatura imzalama</strong></td><td style="padding:10px 14px">❌ Hayır</td><td style="padding:10px 14px">✅ Evet (zorunlu)</td></tr>
          <tr style="border-bottom:1px solid var(--border)"><td style="padding:10px 14px"><strong>UYAP / EKAP</strong></td><td style="padding:10px 14px">✅ Evet</td><td style="padding:10px 14px">❌ Hayır</td></tr>
          <tr><td style="padding:10px 14px"><strong>Tipik 1 yıl fiyat</strong></td><td style="padding:10px 14px">800-1.500 TL</td><td style="padding:10px 14px">1.500-2.500 TL</td></tr>
        </tbody>
      </table>

      <h2>Mali Mühür Kimler Almak Zorunda?</h2>
      <p>Aşağıdaki sistemleri kullanan tüm mükellefler mali mühür edinmek zorundadır:</p>
      <ul>
        <li><strong>E-Fatura</strong> kullanıcıları — brüt satış hasılatı eşiklerini aşan tüm mükellefler</li>
        <li><strong>E-Arşiv Fatura</strong> kullanıcıları</li>
        <li><strong>E-Defter</strong> tutmak zorunda olan firmalar (yevmiye ve büyük defter)</li>
        <li><strong>E-İrsaliye</strong> ve <strong>e-Müstahsil Makbuzu</strong> düzenleyenler</li>
        <li><strong>E-Serbest Meslek Makbuzu</strong> (SMMM, avukat, doktor, mimar vb. serbest meslek erbabı)</li>
        <li><strong>İnternet Vergi Dairesi</strong> üzerinden işlem yapan tüzel kişiler</li>
      </ul>

      <h2>Mali Mühür Nasıl Alınır?</h2>
      <div class="steps">
        <div class="step"><h3>İhtiyaç Tespiti</h3><p>Firmanızın e-Fatura, e-Arşiv veya e-Defter sistemine geçişinin zorunlu olup olmadığını GİB cirosal eşikleriyle kontrol edin.</p></div>
        <div class="step"><h3>GİB İnteraktif Vergi Dairesi Başvurusu</h3><p>İnteraktif Vergi Dairesi sitesinden başvuru oluşturun. Şirket vergi numarası ve yetkili kişi kimliği ile.</p></div>
        <div class="step"><h3>Kart ve Sertifika Teslimi</h3><p>Onay sonrası mali mühür kartınız kargo ile firmanıza ulaşır. Genellikle 5-10 iş günü.</p></div>
        <div class="step"><h3>Sürücü Kurulumu</h3><p>AKİS veya kart üreticisinin sürücüsü bilgisayara yüklenir. PIN kodu ile aktivasyon yapılır.</p></div>
      </div>

      <h2>Mali Mühür Fiyatları (2026)</h2>
      <p>Mali mühür fiyatları kart üreticisine ve süreye göre değişir. 2026 itibarıyla yaklaşık aralıklar:</p>
      <ul>
        <li><strong>1 yıllık mali mühür:</strong> 1.500-2.000 TL</li>
        <li><strong>3 yıllık mali mühür:</strong> 3.000-4.500 TL</li>
      </ul>
      <p>UMAY TÜM BİLİŞİM Ayyıldız yetkili bayisi olarak mali mühür başvurusu sürecinde rehberlik sağlar ve uygun fiyat avantajı sunar.</p>

      <h2>Tipik Şirket Konfigürasyonu: Hangileri Alınmalı?</h2>
      <div class="callout">
        <strong>İdeal kurulum:</strong> Tüm e-Fatura kullanan şirketler için <strong>1 mali mühür</strong> (e-Fatura, e-Defter için) + <strong>her yetkili için 1 firma e-imza</strong> (e-Devlet, MERSİS, EKAP, UYAP işlemleri için) önerilir.
      </div>

      <p>Bu konfigürasyon, hem GİB süreçlerinin (mali mühür gerektirir) hem de diğer kamu portallarının (e-imza gerektirir) eksiksiz çalışmasını sağlar. Karşılaştırma için <a href="/karsilastir">karşılaştırma sayfamızı</a> inceleyebilirsiniz.</p>

      <h2>Sık Sorulan Sorular</h2>
      <p><strong>Mali mühür şubelere göre değişir mi?</strong> Hayır. Mali mühür şirketin merkezi adına düzenlenir; şubeler de aynı sertifikayı kullanır.</p>
      <p><strong>Mali mühür kaybedildiğinde ne olur?</strong> GİB İnteraktif Vergi Dairesi üzerinden iptal başvurusu yapılır ve yeni başvuru gerekir. Süreç boyunca e-Fatura kesimi durabilir, bu nedenle hızlı hareket etmek önemlidir.</p>
      <p><strong>Mali mühür yenilenebilir mi?</strong> Evet. Süre bitiminden 1-2 hafta önce GİB üzerinden yenileme başvurusu yapılabilir.</p>

      <div class="callout">
        <strong>Yardıma ihtiyacınız var mı?</strong> Mali mühür veya e-imza başvurusunda kararsızsanız WhatsApp +90 850 777 11 45 hattımızdan size durumunuza özel paket önerebiliriz.
      </div>
`,
    related: [
      { slug: "e-fatura-gecis-zorunlulugu-2026", title: "E-Fatura Geçiş Zorunluluğu 2026" },
      { slug: "e-imza-nedir-nasil-alinir", title: "E-İmza Nedir? Nasıl Alınır?" },
      { slug: "kep-nedir-kimler-almak-zorunda", title: "KEP Nedir? Kimler Almak Zorunda?" }
    ]
  },
  {
    slug: "e-imza-ile-e-devlete-giris",
    title: "E-İmza ile e-Devlet'e Nasıl Girilir? (Adım Adım)",
    h1: "E-İmza ile e-Devlet'e Nasıl Girilir?",
    description: "E-imza ile e-Devlet'e (turkiye.gov.tr) giriş yapma rehberi. AKİS, PIN, tarayıcı eklentisi ve adım adım giriş süreci. Sık karşılaşılan sorunlar ve çözümleri.",
    ogTitle: "E-İmza ile e-Devlet'e Giriş — Adım Adım Rehber",
    ogDescription: "AKİS sürücüsü, tarayıcı eklentisi ve PIN ile e-Devlet'e güvenli giriş süreci.",
    eyebrow: "Teknik Rehber",
    section: "Teknik Rehber",
    keywords: ["e-imza e-devlet", "e-devlet e-imza giriş", "turkiye.gov.tr e-imza", "e-devlet kapısı e-imza", "AKİS e-devlet"],
    wordCount: 1700,
    tldr: "<strong>E-imza ile e-Devlet girişi</strong>, kart ve okuyucu hazır olduktan sonra 4 adımda tamamlanır: (1) <a href='https://www.turkiye.gov.tr' target='_blank' rel='noopener'>turkiye.gov.tr</a> sayfasında 'E-İmza' seçeneği seçilir, (2) tarayıcı eklentisi kartı algılar, (3) sertifika listesinden seçim yapılır, (4) <strong>PIN</strong> girilir. Sorun yaşarsanız genellikle AKİS sürücüsü veya tarayıcı eklentisi eksiktir.",
    citations: [
      { name: "e-Devlet Kapısı — Resmi Site", url: "https://www.turkiye.gov.tr" },
      { name: "Ayyıldız Bilgi Güvenliği — Sürücüler", url: "https://www.ayyildiz.com.tr" },
      { name: "5070 sayılı Elektronik İmza Kanunu", url: "https://www.mevzuat.gov.tr/mevzuatmetin/1.5.5070.pdf" }
    ],
    mentions: ["e-imza", "e-devlet", "akis", "nes"],
    howto: {
      name: "E-Devlet'e E-İmza ile Giriş",
      description: "Türkiye.gov.tr (e-Devlet) sitesine e-imza kartınızla giriş yapmak için 5 adımlı resmi rehber.",
      totalTime: "PT5M",
      steps: [
        { name: "AKİS Sürücüsünü ve Tarayıcı Eklentisini Doğrulayın", text: "Bilgisayarınızda AKİS Kart İzleme Sistemi yüklü olmalı ve tarayıcı (Chrome/Edge/Firefox) e-imza eklentisi aktif olmalıdır. Yoksa önce <a href='/blog/e-imza-tarayici-eklentisi-kurulumu'>kurulum rehberi</a>ni takip edin." },
        { name: "USB Token'ı Takın", text: "Ayyıldız USB token'ınızı bilgisayarın bir USB portuna takın. Sistem tepsisinde AKİS simgesinin yeşil olduğunu kontrol edin." },
        { name: "e-Devlet'e Gidin", text: "Tarayıcınızda <a href='https://www.turkiye.gov.tr' target='_blank' rel='noopener'>turkiye.gov.tr</a> adresine gidin. 'Giriş Yap' butonuna basın." },
        { name: "E-İmza Seçeneğini Seçin", text: "Açılan giriş ekranında 'Elektronik İmza' sekmesini seçin. Sistem otomatik olarak kartınızı algılayacaktır." },
        { name: "Sertifika Seçin ve PIN Girin", text: "Açılan pencerede sertifikanızı seçin. PIN kodunuzu girin (genelde 6 haneli). 3 hatalı PIN denemesinde kart bloke olur — PUK kodu ile açılabilir." }
      ]
    },
    body: `
      <h2>e-Devlet Nedir ve Neden Önemli?</h2>
      <p><strong>e-Devlet Kapısı (turkiye.gov.tr)</strong>, Türkiye Cumhuriyeti devletinin sunduğu <strong>5.000+ kamu hizmetine elektronik erişim sağlayan portaldır</strong>. SGK işlemleri, vergi beyannamesi, nüfus kayıt örneği, sabıka kaydı, askerlik durum belgesi, e-imzalı dilekçeler ve daha fazlası buradan yapılabilir.</p>
      <p>e-Devlet'e <strong>4 farklı yöntemle giriş yapılabilir:</strong> şifre (PTT'den alınan), mobil imza, internet bankacılığı ve <strong>elektronik imza (e-imza)</strong>. Bu rehberde e-imza ile güvenli giriş süreci anlatılmaktadır.</p>

      <h2>E-İmza ile Giriş İçin Gereksinimler</h2>
      <ul>
        <li><strong>Geçerli bir e-imza sertifikası</strong> (Ayyıldız NES — süresi dolmuş olmamalı)</li>
        <li><strong>USB token veya akıllı kart + okuyucu</strong></li>
        <li><strong>AKİS sürücüsü</strong> (Ayyıldız Kart İzleme Sistemi)</li>
        <li><strong>Tarayıcı eklentisi</strong> (Chrome, Edge veya Firefox için)</li>
        <li><strong>Java Runtime Environment</strong> (bazı işlemlerde gerekli olabilir)</li>
        <li><strong>PIN kodu</strong> (kart ile birlikte size iletilen 4-8 haneli şifre)</li>
      </ul>

      <h2>Adım Adım E-Devlet Giriş Süreci</h2>
      <div class="steps">
        <div class="step"><h3>1. AKİS ve Eklentiyi Doğrula</h3><p>Sistem tepsisinde <strong>AKİS</strong> simgesi yeşil olmalı. Tarayıcıda <strong>e-imza eklentisi</strong> aktif olmalı.</p></div>
        <div class="step"><h3>2. USB Token Tak</h3><p>USB token bilgisayara takıldığında <strong>"kart algılandı"</strong> bildirimi gelir.</p></div>
        <div class="step"><h3>3. turkiye.gov.tr'ye Git</h3><p>Tarayıcıdan <strong>turkiye.gov.tr</strong> sayfasını açın. Sağ üstte <strong>"Giriş Yap"</strong> butonuna basın.</p></div>
        <div class="step"><h3>4. "Elektronik İmza" Sekmesini Seç</h3><p>Açılan giriş ekranında <strong>"Elektronik İmza"</strong> sekmesini seçin.</p></div>
        <div class="step"><h3>5. Sertifikanı Seç</h3><p>Açılan pencerede e-imza sertifikanız listelenir. Seçip <strong>"İmzala"</strong> butonuna basın.</p></div>
        <div class="step"><h3>6. PIN Kodunu Gir</h3><p>PIN kodunuzu girin. Doğru girildiğinde e-Devlet ana sayfasına giriş yapmış olursunuz.</p></div>
      </div>

      <div class="callout">
        <strong>Güvenlik:</strong> PIN kodunuzu kimseyle paylaşmayın. Kart fiziksel olarak elinizden çıkarsa hemen sertifika iptal başvurusu yapın.
      </div>

      <h2>Sık Karşılaşılan Sorunlar ve Çözümleri</h2>

      <h3>Sorun 1: "Kart Algılanmıyor"</h3>
      <ul>
        <li>USB token başka bir USB porta takın</li>
        <li>AKİS uygulamasını yeniden başlatın</li>
        <li>Bilgisayarı yeniden başlatın</li>
        <li>AKİS'in güncel sürümünü yükleyin (Ayyıldız resmi sitesinden)</li>
      </ul>

      <h3>Sorun 2: "Tarayıcı Eklentisi Çalışmıyor"</h3>
      <ul>
        <li>Chrome veya Edge için eklentinin yüklü olduğunu kontrol edin</li>
        <li>Firefox kullanıyorsanız NSS kütüphanesi tanımlı olmalı</li>
        <li>Detaylı kurulum için <a href="/blog/e-imza-tarayici-eklentisi-kurulumu">tarayıcı eklentisi rehberimizi</a> takip edin</li>
      </ul>

      <h3>Sorun 3: "PIN Yanlış" Hatası</h3>
      <ul>
        <li>3 hatalı denemede kart bloke olur</li>
        <li>PUK kodu ile açılabilir</li>
        <li>PUK'ı 5 kez hatalı girerseniz kart kalıcı olarak kilitlenir</li>
        <li>Detaylar için <a href="/blog/e-imza-suresi-doldu-ne-yapilmali">e-imza yenileme rehberimize</a> bakın</li>
      </ul>

      <h3>Sorun 4: "Sertifika Süresi Dolmuş"</h3>
      <ul>
        <li>Süre bitmiş bir e-imza ile giriş yapılamaz</li>
        <li>WhatsApp +90 850 777 11 45 hattından yenileme başvurusu yapın</li>
      </ul>

      <h2>E-Devlet'te E-İmza ile Yapılabilen Önemli İşlemler</h2>
      <ul>
        <li><strong>Vergi:</strong> Beyanname onayı, vergi borcu sorgulama</li>
        <li><strong>SGK:</strong> İşveren işlemleri, sigortalı sorgulama, e-Bildirge</li>
        <li><strong>Nüfus:</strong> Kimlik talep, nüfus kayıt örneği</li>
        <li><strong>Adalet:</strong> UYAP'a giriş (avukatlar için), sabıka kaydı</li>
        <li><strong>Sağlık:</strong> e-Reçete (doktorlar için), Medula sistemi</li>
        <li><strong>Eğitim:</strong> Akademik başvurular, üniversite işlemleri</li>
        <li><strong>Tapu:</strong> Tapu sorgulama, online tapu işlemleri</li>
        <li><strong>İhale:</strong> EKAP üzerinden kamu ihale teklifleri</li>
      </ul>

      <div class="callout">
        <strong>Daha fazla bilgi:</strong> E-imzanın kullanım alanları için <a href="/blog/e-imza-nerelerde-kullanilir">e-imza nerelerde kullanılır</a> yazımıza bakabilirsiniz.
      </div>
`,
    related: [
      { slug: "e-imza-tarayici-eklentisi-kurulumu", title: "E-İmza Tarayıcı Eklentisi Kurulumu" },
      { slug: "e-imza-kurulumu-nasil-yapilir", title: "E-İmza Kurulumu Nasıl Yapılır?" },
      { slug: "e-imza-nerelerde-kullanilir", title: "E-İmza Nerelerde Kullanılır?" }
    ]
  },
  {
    slug: "e-imza-tarayici-eklentisi-kurulumu",
    title: "E-İmza Tarayıcı Eklentisi Kurulumu (Chrome / Edge / Firefox)",
    h1: "E-İmza Tarayıcı Eklentisi Kurulumu",
    description: "E-imza için Chrome, Edge ve Firefox tarayıcı eklentisi kurulumu. AKİS, Java ve NSS yapılandırması adım adım. e-Devlet, EKAP, UYAP için hazırlık rehberi.",
    ogTitle: "E-İmza Tarayıcı Eklentisi — Chrome, Edge, Firefox Kurulumu",
    ogDescription: "Hangi tarayıcıda hangi eklenti gerekli, nasıl kurulur, sorun giderme adımları.",
    eyebrow: "Teknik Rehber",
    section: "Teknik Rehber",
    keywords: ["e-imza tarayıcı eklentisi", "Chrome e-imza", "Edge e-imza", "Firefox e-imza", "AKİS eklenti", "e-imza Java"],
    wordCount: 1600,
    tldr: "<strong>E-imza tarayıcı eklentisi</strong>, web tarayıcısının (Chrome, Edge, Firefox) e-imza kartınızla iletişim kurmasını sağlar. <strong>Chrome ve Edge için</strong> tek bir resmi eklenti yeterli (Ayyıldız İmzala). <strong>Firefox için</strong> NSS kütüphanesi tanıtılır. Tüm tarayıcılarda kullanım: AKİS sürücüsü → tarayıcı eklentisi → e-Devlet/UYAP/EKAP girişinde otomatik algılama.",
    citations: [
      { name: "Ayyıldız Bilgi Güvenliği — Sürücüler", url: "https://www.ayyildiz.com.tr" },
      { name: "Mozilla NSS Kütüphanesi", url: "https://developer.mozilla.org/en-US/docs/Mozilla/Projects/NSS" },
      { name: "AKİS Kart İzleme Sistemi", url: "https://www.akis.com.tr" }
    ],
    mentions: ["e-imza", "akis", "nes"],
    howto: {
      name: "Tarayıcı Eklentisi Kurulumu",
      description: "Chrome, Edge ve Firefox için e-imza tarayıcı eklentisi kurulum rehberi.",
      totalTime: "PT10M",
      steps: [
        { name: "AKİS Sürücüsünü Yükleyin", text: "Önce AKİS Kart İzleme Sistemi bilgisayarınıza yüklenmiş olmalıdır. Detaylar için <a href='/blog/e-imza-kurulumu-nasil-yapilir'>kurulum rehberi</a>ne bakın." },
        { name: "Tarayıcınızı Seçin", text: "Chrome, Microsoft Edge ve Firefox için farklı kurulum adımları vardır. Hangisini kullanıyorsanız ilgili bölümü takip edin." },
        { name: "Eklentiyi İndirin ve Kurun", text: "Chrome Web Store / Edge Eklentileri'nden 'Ayyıldız İmzala' eklentisini yükleyin. Firefox için NSS yapılandırması ayrı yapılır." },
        { name: "Tarayıcıyı Yeniden Başlatın", text: "Eklenti yüklendikten sonra tarayıcıyı kapatıp tekrar açın." },
        { name: "Test İmzası Yapın", text: "turkiye.gov.tr veya başka bir e-imza destekli sitede test girişi yaparak doğrulayın." }
      ]
    },
    body: `
      <h2>Tarayıcı Eklentisi Neden Gerekli?</h2>
      <p>E-imza ile web tabanlı işlemler (e-Devlet, EKAP, UYAP, MERSİS, GİB) yapabilmek için tarayıcının <strong>kriptografik kart ile iletişim kurabilmesi</strong> gerekir. Bu iletişimi sağlayan ara katmana <strong>tarayıcı eklentisi</strong> denir.</p>
      <p>AKİS sürücüsü kartı işletim sistemine tanıtırken, tarayıcı eklentisi <strong>web sayfasının</strong> bu kartla konuşmasını sağlar. İkisi de gereklidir.</p>

      <h2>Hangi Tarayıcıda Hangi Eklenti?</h2>
      <ul>
        <li><strong>Google Chrome:</strong> Ayyıldız İmzala eklentisi (Chrome Web Store)</li>
        <li><strong>Microsoft Edge:</strong> Aynı Chrome eklentisi (Edge eklenti mağazasında)</li>
        <li><strong>Mozilla Firefox:</strong> NSS kütüphanesine PKCS#11 modülü tanıtımı</li>
        <li><strong>Safari (Mac):</strong> Sınırlı destek — Mac kullanıcılar Chrome veya Firefox tercih etmelidir</li>
      </ul>

      <h2>Chrome İçin Kurulum</h2>
      <div class="steps">
        <div class="step"><h3>1. Chrome Web Store'a Git</h3><p>Chrome tarayıcısında <strong>chrome.google.com/webstore</strong> adresine gidin.</p></div>
        <div class="step"><h3>2. "Ayyıldız İmzala" Ara</h3><p>Arama kutusuna <strong>"Ayyıldız İmzala"</strong> veya <strong>"e-imza imzala"</strong> yazın.</p></div>
        <div class="step"><h3>3. "Chrome'a Ekle" Butonu</h3><p>İlgili eklentinin sayfasında <strong>"Chrome'a Ekle"</strong> butonuna basın. Onay penceresinde <strong>"Eklentiyi ekle"</strong> seçin.</p></div>
        <div class="step"><h3>4. Eklentiyi Sabit Tut</h3><p>Sağ üstteki yapboz ikonuna tıklayın, eklentinin yanındaki pin işaretine basarak sabit tutun.</p></div>
      </div>

      <h2>Edge İçin Kurulum</h2>
      <p>Microsoft Edge tarayıcısı Chrome eklentilerini desteklediği için aynı eklentiyi kullanabilirsiniz. İki seçenek vardır:</p>
      <ul>
        <li><strong>Seçenek A:</strong> Edge'de <strong>edge://extensions</strong> adresine gidin, <strong>"Diğer mağazalardan eklentilere izin ver"</strong> seçeneğini açın, Chrome Web Store'dan kurun.</li>
        <li><strong>Seçenek B:</strong> Microsoft Edge Eklentiler mağazasında doğrudan <strong>"Ayyıldız İmzala"</strong> aratın.</li>
      </ul>

      <h2>Firefox İçin Kurulum (NSS Modülü)</h2>
      <p>Firefox, kendi <strong>NSS (Network Security Services)</strong> kütüphanesini kullanır. Bu nedenle PKCS#11 modülü manuel olarak tanıtılır:</p>
      <div class="steps">
        <div class="step"><h3>1. AKİS Yüklendi mi Kontrol Et</h3><p>AKİS yüklü değilse Firefox kartı göremez. Önce AKİS sürücüsünü yükleyin.</p></div>
        <div class="step"><h3>2. Firefox Ayarları</h3><p>Firefox menüsünden <strong>Ayarlar → Gizlilik ve Güvenlik → Sertifikalar → Güvenlik Aygıtları</strong> bölümüne gidin.</p></div>
        <div class="step"><h3>3. Yeni PKCS#11 Modülü</h3><p><strong>"Yükle"</strong> butonuna basın. Modül adı: <code>AKIS</code>. Modül dosyası genellikle <code>C:\\Windows\\System32\\akisp11.dll</code> konumundadır.</p></div>
        <div class="step"><h3>4. Tamam → Yeniden Başlat</h3><p>Tamam'a basın ve Firefox'u yeniden başlatın.</p></div>
      </div>

      <div class="callout">
        <strong>Önemli Not:</strong> Bazı yeni e-imza uygulamaları artık tarayıcı eklentisi yerine <strong>yerli imzalama uygulamaları</strong> (örn. PDF Sign, XML Signer) ile çalışır. Bu durumda tarayıcı eklentisine gerek kalmayabilir.
      </div>

      <h2>Java Kurulumu Gerekli mi?</h2>
      <p>Eski e-imza uygulamaları Java Applet ile çalışıyordu. <strong>Bugün çoğu modern e-imza uygulaması Java gerektirmez.</strong> Ancak bazı kurumsal sistemler (özellikle eski belediye, üniversite portalları) hâlâ Java tabanlı çalışır.</p>
      <p>Gerekiyorsa Oracle JRE veya AdoptOpenJDK'nın güncel sürümünü yükleyin. Java ile birlikte gelen <strong>Java Web Start</strong> ve <strong>tarayıcı entegrasyonu</strong> seçenekleri aktif edilmelidir.</p>

      <h2>Test ve Doğrulama</h2>
      <p>Tüm kurulumlar tamamlandıktan sonra şu adımlarla test edin:</p>
      <ol>
        <li>USB token'ı bilgisayara takın</li>
        <li>Tarayıcıdan <strong>turkiye.gov.tr</strong> adresine gidin</li>
        <li><strong>"Elektronik İmza"</strong> seçeneği ile giriş yapmayı deneyin</li>
        <li>Sertifikanız listede görünüyorsa kurulum başarılıdır</li>
      </ol>

      <h2>Sorun Giderme</h2>
      <h3>"Eklenti çalışmıyor / kart algılanmıyor"</h3>
      <ul>
        <li>AKİS sürücüsünün güncel sürümünü yeniden yükleyin</li>
        <li>Bilgisayarı yeniden başlatın</li>
        <li>Tarayıcının güncel sürüm olduğundan emin olun</li>
      </ul>

      <h3>"Firefox sertifika göremiyor"</h3>
      <ul>
        <li>PKCS#11 modülünün doğru tanıtıldığını kontrol edin</li>
        <li>AKIS modülünün etkin durumda olduğundan emin olun</li>
      </ul>

      <div class="callout">
        <strong>Ücretsiz uzaktan destek:</strong> Kurulumda sorun yaşarsanız UMAY TÜM BİLİŞİM WhatsApp +90 850 777 11 45 hattından AnyDesk ile ekran paylaşımı yaparak ücretsiz destek alabilirsiniz.
      </div>
`,
    related: [
      { slug: "e-imza-kurulumu-nasil-yapilir", title: "E-İmza Kurulumu Nasıl Yapılır?" },
      { slug: "e-imza-ile-e-devlete-giris", title: "E-İmza ile e-Devlet'e Giriş" },
      { slug: "e-imza-nedir-nasil-alinir", title: "E-İmza Nedir? Nasıl Alınır?" }
    ]
  },
  {
    slug: "avukatlar-icin-e-imza-uyap",
    title: "Avukatlar İçin E-İmza ve UYAP Rehberi (2026)",
    h1: "Avukatlar İçin E-İmza ve UYAP Rehberi",
    description: "Avukatlar için e-imza zorunluluğu, UYAP portalı kullanımı, müvekkil vekaletleri, dava süreçleri ve önerilen paket. Türkiye Barolar Birliği uyumlu rehber.",
    ogTitle: "Avukatlar İçin E-İmza ve UYAP Rehberi 2026",
    ogDescription: "Avukatlar için e-imza neden zorunlu, UYAP üzerinde günlük kullanım ve uygun paket seçimi.",
    eyebrow: "Mesleki Rehber",
    section: "Avukatlar İçin Rehber",
    keywords: ["avukat e-imza", "UYAP e-imza", "avukat portal e-imza", "baro e-imza", "vekaletname e-imza"],
    wordCount: 1700,
    tldr: "<strong>Avukatlar için e-imza pratikte zorunludur.</strong> <strong>UYAP (Ulusal Yargı Ağı Projesi)</strong> üzerinden dava açma, dilekçe gönderimi, dosya inceleme, e-tebligat alımı ve müvekkil vekaletnamesi imzalanması e-imza gerektirir. <strong>Önerilen paket: 3 yıllık bireysel e-imza + KEP hesabı.</strong> Yıllık maliyet ~1.500 TL — bir avukatın yıllık vekalet/dilekçe gönderim maliyetinden çok daha düşük.",
    citations: [
      { name: "UYAP Bilişim Sistemi", url: "https://www.uyap.gov.tr" },
      { name: "Türkiye Barolar Birliği", url: "https://www.barobirlik.org.tr" },
      { name: "Adalet Bakanlığı", url: "https://www.adalet.gov.tr" },
      { name: "5070 sayılı Elektronik İmza Kanunu", url: "https://www.mevzuat.gov.tr/mevzuatmetin/1.5.5070.pdf" }
    ],
    mentions: ["e-imza", "uyap", "kep", "nes"],
    body: `
      <h2>Avukatlar İçin E-İmza Neden Önemli?</h2>
      <p>Avukatlar, mesleki günlük rutinlerinde <strong>Adalet Bakanlığı'na bağlı UYAP (Ulusal Yargı Ağı Projesi)</strong> sistemini yoğun olarak kullanırlar. UYAP, mahkemelere fiziksel olarak gitmeden dava açma, dilekçe gönderme, dosya inceleme ve tebligat alma imkanı sunan kapsamlı bir e-devlet platformudur. Bu sistemin tamamı <strong>elektronik imza ile çalışır.</strong></p>
      <p>2026 itibarıyla pratikte bir avukatın e-imzasız çalışması neredeyse imkansızdır. Vekaletname düzenleme, mahkeme yazışmaları, müvekkil sözleşmeleri ve baro işlemleri e-imza ile yapılmaktadır.</p>

      <h2>UYAP Portalında E-İmza ile Yapılabilen İşlemler</h2>
      <ul>
        <li><strong>Dava Açma:</strong> Dilekçe ve eklerini elektronik olarak gönderebilir, dava harçlarını online ödeyebilirsiniz.</li>
        <li><strong>Dosya İnceleme:</strong> Müvekkilin tüm aktif ve geçmiş dosyalarına erişim.</li>
        <li><strong>Dilekçe Gönderimi:</strong> Cevap, beyan, itiraz, temyiz dilekçelerinin e-imzayla gönderimi.</li>
        <li><strong>E-Tebligat:</strong> Mahkeme tebligatlarının UYAP üzerinden alınması.</li>
        <li><strong>Vekaletname:</strong> Müvekkil-avukat arası dijital vekalet düzenleme.</li>
        <li><strong>Duruşma Listesi:</strong> Aktif duruşma günlerinin takibi.</li>
        <li><strong>İcra Takibi:</strong> İcra dairelerinde elektronik takip başlatma.</li>
        <li><strong>Avukat Portal:</strong> Baro bağlantılı kişisel avukat paneli.</li>
      </ul>

      <h2>Müvekkil Vekaletleri ve E-İmza</h2>
      <p>Geleneksel olarak vekaletname noterde düzenlenirdi. Günümüzde <strong>e-imzalı dijital vekaletname</strong> hukuki olarak geçerlidir ve UYAP üzerinden anında işleme alınır. Bu, hem avukat hem müvekkil için zaman ve maliyet tasarrufu sağlar.</p>
      <div class="callout">
        <strong>Dikkat:</strong> Bazı özel vekalet türleri (gayrimenkul satışı, miras işlemleri vb.) hâlâ noter onayı gerektirebilir. Mevzuat dışındaki standart dava vekaletnameleri için e-imzalı vekalet yeterlidir.
      </div>

      <h2>Dava Süreçlerinde E-İmza Kullanımı</h2>
      <p>Bir davanın UYAP üzerinden e-imzayla yürütülmesi:</p>
      <div class="steps">
        <div class="step"><h3>Dava Açma</h3><p>UYAP portalına e-imza ile giriş yapılır. Dava türü seçilir, dilekçe yüklenir, e-imza ile onaylanır. Harç ödemesi yapılır.</p></div>
        <div class="step"><h3>Duruşma Takibi</h3><p>Aktif davalar listesinden tüm dosyalar görüntülenir. Duruşma günü ve saati otomatik bildirim olarak gelir.</p></div>
        <div class="step"><h3>Yazışma</h3><p>Dilekçeler, beyanlar ve cevaplar UYAP üzerinden elektronik olarak gönderilir, e-imza ile imzalanır.</p></div>
        <div class="step"><h3>Tebligat Alımı</h3><p>Mahkeme tebligatları UYAP'ta görüntülendiğinde otomatik tebliğ kabul edilir. Süre takibi kritiktir.</p></div>
      </div>

      <h2>Önerilen Paket: Avukatlar İçin</h2>
      <p>Avukatlar için ideal konfigürasyon şudur:</p>
      <ul>
        <li><strong>1 × Bireysel E-İmza (3 yıllık)</strong> — UYAP, vekalet, dilekçe imzalama için</li>
        <li><strong>1 × KEP hesabı</strong> — TTK 18/3 zorunluluğu kapsamında hukuki yazışma, tebligat (özellikle ticari davalar için)</li>
      </ul>
      <p>Yıllık toplam maliyet: ~<strong>1.500 TL</strong>. Detaylı paket karşılaştırması için <a href="/karsilastir">karşılaştırma sayfamıza</a> bakabilirsiniz.</p>

      <h2>Avukatlar İçin Sık Sorulan Sorular</h2>
      <p><strong>Stajyer avukatlar e-imza alabilir mi?</strong> Evet. Stajyer avukatlar da kendi adlarına e-imza alabilir ve UYAP üzerinden bağlı oldukları avukatın denetiminde işlem yapabilir.</p>
      <p><strong>İcra dairelerinde de e-imza geçerli mi?</strong> Evet. Tüm icra daireleri UYAP'a bağlıdır ve e-imza ile takip başlatma, dosya inceleme yapılabilir.</p>
      <p><strong>Baro üyeliği için e-imza zorunlu mu?</strong> Doğrudan zorunluluk yoktur ancak pratikte tüm baro işlemleri (aidat, etkinlik kaydı) UYAP veya baro portalı üzerinden e-imzayla yapılır.</p>
      <p><strong>Müvekkilim adına e-imza ile dilekçe gönderirsem yasal mı?</strong> Evet. Yetkin avukat olarak müvekkilinizden aldığınız vekaletle UYAP üzerinden e-imzalı dilekçe göndermek tamamen geçerlidir ve müvekkil adına işlem hükmü doğurur.</p>

      <h2>Maliyet-Fayda Analizi</h2>
      <p>Bir avukat ortalama olarak yılda 100-300 dilekçe gönderir, 50+ duruşmaya katılır. Geleneksel yöntemle (fiziksel mahkeme ziyareti, kağıt, kargo):</p>
      <ul>
        <li>Dilekçe başına ortalama 2-3 saat (yolda + bekleme)</li>
        <li>Fiziksel takip için bekleme süresi</li>
        <li>Yıllık maliyet: ~50-100 saat avukatlık zamanı (fırsat maliyeti)</li>
      </ul>
      <p>E-imza ile bu süre <strong>%80'in üzerinde tasarruf</strong> sağlar. 1.250 TL yıllık maliyet karşılığında onlarca saat kazanç.</p>

      <div class="callout">
        <strong>Avukatlar için özel destek:</strong> UMAY TÜM BİLİŞİM avukatlık bürolarına UYAP entegrasyonu konusunda ücretsiz danışmanlık sunar. WhatsApp +90 850 777 11 45.
      </div>
`,
    related: [
      { slug: "e-imza-nedir-nasil-alinir", title: "E-İmza Nedir? Nasıl Alınır?" },
      { slug: "e-imza-nerelerde-kullanilir", title: "E-İmza Nerelerde Kullanılır?" },
      { slug: "kep-nedir-kimler-almak-zorunda", title: "KEP Nedir? Kimler Almak Zorunda?" }
    ]
  },
  {
    slug: "muhasebeciler-icin-e-imza",
    title: "Muhasebeciler İçin E-İmza Paketleri (SMMM/YMM Rehberi)",
    h1: "Muhasebeciler İçin E-İmza Paketleri",
    description: "Mali müşavirler (SMMM, YMM) için e-imza zorunlulukları, müvekkil sayısına göre paket önerileri, GİB ve SGK platformlarında kullanım. 2026 rehberi.",
    ogTitle: "Muhasebeciler İçin E-İmza — SMMM/YMM Rehberi",
    ogDescription: "Mali müşavir paketleri, müvekkil yönetimi ve yıllık maliyet analizi.",
    eyebrow: "Mesleki Rehber",
    section: "Muhasebeciler İçin Rehber",
    keywords: ["muhasebeci e-imza", "SMMM e-imza", "mali müşavir e-imza", "YMM e-imza", "beyanname e-imza", "TÜRMOB e-imza"],
    wordCount: 1700,
    tldr: "<strong>Mali müşavirler için e-imza zorunludur.</strong> Müvekkil firmalar adına <strong>beyanname gönderimi, e-Defter onayı, KDV/Gelir/Geçici beyannamesi imzalama, SGK işveren işlemleri</strong> e-imza gerektirir. <strong>Önerilen paket: 3 yıllık bireysel e-imza + KEP hesabı + müvekkil sayısı 20+'sa mali mühür entegrasyonu.</strong> Yıllık maliyet ~1.250 TL, müvekkil başına ~50 TL.",
    citations: [
      { name: "TÜRMOB — Türkiye Serbest Muhasebeci Mali Müşavirler Birliği", url: "https://www.turmob.org.tr" },
      { name: "GİB — Gelir İdaresi Başkanlığı", url: "https://www.gib.gov.tr" },
      { name: "SGK — Sosyal Güvenlik Kurumu", url: "https://www.sgk.gov.tr" },
      { name: "5070 sayılı Elektronik İmza Kanunu", url: "https://www.mevzuat.gov.tr/mevzuatmetin/1.5.5070.pdf" }
    ],
    mentions: ["e-imza", "mali-muhur", "e-fatura", "kep"],
    body: `
      <h2>Mali Müşavirler İçin E-İmza Neden Zorunlu?</h2>
      <p>Türkiye'de Serbest Muhasebeci Mali Müşavirler (SMMM) ve Yeminli Mali Müşavirler (YMM), <strong>müvekkilleri adına resmi devlet sistemlerinde işlem yaparak</strong> hizmet sunarlar. Bu işlemlerin hepsi <strong>elektronik imza ile yapılır.</strong></p>
      <p>Bir mali müşavirin yıllık iş yükünün %70'inden fazlası dijital platformlar üzerinden yürütülür: GİB, e-Defter, e-Fatura, SGK, BAĞ-KUR, MERSİS ve daha fazlası. Tüm bu sistemlerin işleyişi e-imza gerektirir.</p>

      <h2>Mali Müşavirin Günlük E-İmza Kullanımı</h2>
      <p>Tipik bir mali müşavir günde 5-50 arası e-imza işlemi gerçekleştirir:</p>
      <ul>
        <li><strong>GİB üzerinden:</strong> KDV beyannamesi, Gelir/Kurumlar Vergisi beyannamesi, Geçici vergi, ÖTV beyannameleri, Stopaj beyannamesi</li>
        <li><strong>SGK üzerinden:</strong> Aylık Prim ve Hizmet Belgesi (APHB), İşe Giriş Bildirgesi, İşten Çıkış Bildirgesi, e-Bildirge</li>
        <li><strong>MERSİS üzerinden:</strong> Ticaret sicil işlemleri, şirket güncelleme bildirimleri</li>
        <li><strong>e-Defter:</strong> Aylık yevmiye ve büyük defter beratları</li>
        <li><strong>e-Fatura/e-Arşiv:</strong> Müvekkil adına fatura kesimi (mali mühür ile)</li>
        <li><strong>BAĞ-KUR/SSK işlemleri:</strong> Sigortalı kaydı, prim sorgulama</li>
        <li><strong>VEDOP üzerinden:</strong> KOSGEB raporları, e-Tebligat</li>
        <li><strong>İhale dosyaları:</strong> Müvekkil firmalar adına EKAP'a teklif (ek yetki ile)</li>
      </ul>

      <h2>Mali Müşavirler İçin Önerilen Paket Yapısı</h2>

      <h3>Senaryo 1: Yeni Başlayan Mali Müşavir (1-5 müvekkil)</h3>
      <ul>
        <li><strong>1 × Bireysel E-İmza (3 yıllık)</strong> — temel iş için yeterli</li>
        <li><strong>1 × KEP hesabı</strong> — TTK 18/3 ve müvekkil yazışmaları için</li>
        <li>Mali mühür: müvekkillerin kendi kurmuş olması yeterli</li>
        <li><strong>Yıllık maliyet: ~1.250 TL</strong></li>
      </ul>

      <h3>Senaryo 2: Orta Ölçekli Büro (5-20 müvekkil)</h3>
      <ul>
        <li><strong>1 × Bireysel E-İmza (3 yıllık)</strong></li>
        <li><strong>1 × KEP hesabı</strong></li>
        <li><strong>Müvekkillere danışmanlık:</strong> her birinin kendi mali mührünü alması</li>
        <li><strong>Yıllık maliyet: ~1.500 TL</strong></li>
      </ul>

      <h3>Senaryo 3: Kurumsal Büro (20+ müvekkil, ofis çalışanları)</h3>
      <ul>
        <li><strong>Büro sahibi için 1 × Bireysel E-İmza (3 yıllık)</strong></li>
        <li><strong>Her çalışan için ek e-imza</strong> (yetkili işlem yapacak çalışanlar)</li>
        <li><strong>1 × KEP hesabı</strong> (büroda merkezi)</li>
        <li><strong>HSM düşünülebilir</strong> (çok yoğun işlem için kurumsal çözüm)</li>
        <li><strong>Yıllık maliyet: 3.000-6.000 TL</strong></li>
      </ul>

      <h2>Müvekkil Sayısına Göre Strateji</h2>
      <p>Mali müşavirlerin sık sorduğu soru: <strong>"Her müvekkilim için ayrı e-imza mı almalıyım?"</strong> Cevap: Hayır. Müvekkillerin <strong>kendi mali mühürlerini</strong> (e-Fatura için) ve gerekirse <strong>kendi e-imzalarını</strong> (e-Devlet işlemleri için) almaları gerekir. Mali müşavir kendi e-imzasıyla yetki kapsamında müvekkili adına işlem yapar (özellikle SGK, vergi beyannameleri için).</p>

      <div class="callout">
        <strong>Önemli Ayrım:</strong> Mali müşavir, müvekkil adına işlem yaparken <strong>"vekaleten"</strong> kendi e-imzasını kullanır. Müvekkilin kendi e-imzası ise sadece müvekkilin kendi adına imzalayacağı belgeler için gereklidir.
      </div>

      <h2>Yıllık Maliyet Analizi</h2>
      <p>Bir mali müşavirin yıllık e-imza maliyeti çok mütevazıdır:</p>
      <ul>
        <li><strong>E-imza (3 yıllık paket):</strong> Yıllık ~1.250 TL</li>
        <li><strong>KEP hesabı:</strong> Yıllık ~500 TL</li>
        <li><strong>Toplam:</strong> ~1.750 TL/yıl</li>
      </ul>
      <p>Bu maliyet, 20 müvekkillik bir büro için <strong>müvekkil başına ~90 TL/yıl</strong> demektir. Bir tek dilekçe gönderim ücretinden bile düşüktür.</p>

      <h2>Mali Müşavirler İçin E-İmza ve Mali Mühür Farkı</h2>
      <p>Mali müşavirlerin sık karıştırdığı iki kavramı netleştirelim:</p>
      <ul>
        <li><strong>Bireysel E-İmza:</strong> Mali müşavir <strong>kendi adına</strong> imza atar. Beyanname, dilekçe, SGK gibi işlemler için.</li>
        <li><strong>Mali Mühür:</strong> <strong>Şirket adına</strong> imza atar. Yalnızca e-Fatura ve e-Defter gibi GİB uygulamaları için.</li>
      </ul>
      <p>Mali müşavir kendi adına mali mühüre ihtiyaç duymaz. Mali mühür müvekkil şirketin kendisine aittir. Detay için <a href="/blog/mali-muhur-nedir-eimza-farki">Mali Mühür Nedir?</a> yazımıza bakın.</p>

      <h2>Sık Sorulan Sorular</h2>
      <p><strong>SMMM ve YMM e-imza farklı mı?</strong> Hayır, aynı tip e-imza her ikisinin de işine yarar.</p>
      <p><strong>Müvekkilim emrime e-imza verebilir mi?</strong> Hayır. Her kişi kendi e-imzasını taşımak zorundadır. Yetki vekalet ile devredilir.</p>
      <p><strong>TÜRMOB'un özel anlaşması var mı?</strong> Mali müşavirler için bazı ESHS'lerin meslek odası anlaşmaları olabilir. UMAY TÜM BİLİŞİM Ayyıldız yetkili bayisi olarak avantajlı paketler sunar.</p>

      <div class="callout">
        <strong>Mali müşavirler için danışmanlık:</strong> Müvekkil sayınıza ve iş yoğunluğunuza özel paket önerisi için WhatsApp +90 850 777 11 45.
      </div>
`,
    related: [
      { slug: "mali-muhur-nedir-eimza-farki", title: "Mali Mühür Nedir? E-İmza ile Farkı" },
      { slug: "e-fatura-gecis-zorunlulugu-2026", title: "E-Fatura Geçiş Zorunluluğu 2026" },
      { slug: "e-imza-nedir-nasil-alinir", title: "E-İmza Nedir? Nasıl Alınır?" }
    ]
  },
  {
    slug: "vekaletle-e-imza-alinabilir-mi",
    title: "Vekaletle E-İmza Alınabilir Mi? (Hukuki Çerçeve 2026)",
    h1: "Vekaletle E-İmza Alınabilir Mi?",
    description: "Vekaletle e-imza başvurusu mümkün mü? Hukuki çerçeve, noter onayı gereksinimleri, hangi durumlarda kabul edilir? 2026 rehberi.",
    ogTitle: "Vekaletle E-İmza Alınabilir Mi? Hukuki Çerçeve",
    ogDescription: "Başkası adına e-imza başvurusu, noter onayı, vekalet formatı ve geçerlilik şartları.",
    eyebrow: "Hukuki Rehber",
    section: "Hukuki Rehber",
    keywords: ["vekaletle e-imza", "vekalet e-imza", "başkası adına e-imza", "noter vekaleti e-imza", "şirket adına e-imza"],
    wordCount: 1500,
    tldr: "<strong>Vekaletle e-imza başvurusu mümkündür</strong> ancak özel şartlara tabidir. <strong>Bireysel e-imza için kişinin kendisinin başvurması esastır</strong>; vekalet ile başvuru ESHS'ler tarafından genelde kabul edilmez. <strong>Firma e-imzası</strong> ise şirket yetkilisi adına imza sirküleri ile başvurularak alınır — bu zaten yetki devri içerir. <strong>Mali mühür</strong> şirketin yetkili temsilcisi tarafından (vekaletle değil, GİB'e doğrudan başvuru ile) alınır.",
    citations: [
      { name: "5070 sayılı Elektronik İmza Kanunu", url: "https://www.mevzuat.gov.tr/mevzuatmetin/1.5.5070.pdf" },
      { name: "Türkiye Noterler Birliği", url: "https://www.tnb.org.tr" },
      { name: "BTK — ESHS Düzenleyici Çerçevesi", url: "https://www.btk.gov.tr" }
    ],
    mentions: ["e-imza", "nes", "eshs"],
    body: `
      <h2>Vekaletle E-İmza Başvurusu Mümkün Mü?</h2>
      <p>Bu soruya kısa cevap: <strong>Genel kural olarak hayır — bireysel e-imza için kişinin kendisi başvurmak zorundadır.</strong> Ancak özel durumlarda istisnalar vardır. Bu yazıda hukuki çerçeveyi netleştireceğiz.</p>
      <p>Sebep basittir: <strong>e-imza, sahibinin kimliğini elektronik olarak temsil eder.</strong> Bu bir nevi <em>"dijital pasaport"</em>tur. Pasaportu nasıl başkasının çıkaramayacağı gibi, e-imzayı da prensip olarak başkası çıkaramaz.</p>

      <h2>Yasal Çerçeve</h2>
      <p><strong>5070 sayılı Elektronik İmza Kanunu</strong>'na göre nitelikli elektronik sertifika (NES) verilmeden önce sertifika sahibinin kimliği <strong>fiziksel/biyometrik olarak doğrulanmalıdır.</strong> Bu doğrulama:</p>
      <ul>
        <li>Yüz yüze kimlik kontrolü ile</li>
        <li>Video konferans yoluyla canlı kimlik doğrulama (bazı ESHS'lerde)</li>
        <li>Mevcut bir e-imzayla başvuru (yenileme durumunda)</li>
      </ul>
      <p>şeklinde yapılır. <strong>Vekalet eden kişi bunu sahibinin yerine yapamaz.</strong></p>

      <h2>Bireysel E-İmza ve Vekalet</h2>
      <p>Bireysel bir gerçek kişi için e-imza, <strong>kişinin kendisinin başvurusu</strong> ile alınır. Vekalet ile başvuru ESHS'ler tarafından kabul edilmez çünkü:</p>
      <ul>
        <li>Sertifikanın kişisel kimlik bağı olmalı</li>
        <li>PIN/PUK kodlarının asıl sahibe tesliminin garantisi olmalı</li>
        <li>Hukuki sorumluluğun açık olması için imza atanın kimliği şüpheli olmamalı</li>
      </ul>

      <h3>İstisnalar</h3>
      <p>Şu özel durumlarda vekalet kabul edilebilir:</p>
      <ul>
        <li><strong>Yasal temsilciler:</strong> Velayet altındaki çocuklar için ebeveynler veya vesayet altındaki kişiler için vasi.</li>
        <li><strong>Engelli kişiler:</strong> Fiziksel/zihinsel engel nedeniyle başvuru yapamayan kişiler için yasal vekil — özel süreç gerektirir.</li>
        <li><strong>Cezaevinde tutuklu/hükümlü kişiler:</strong> Özel hukuki prosedür kapsamında.</li>
      </ul>

      <h2>Firma E-İmzası ve Vekalet</h2>
      <p>Firma e-imzası farklıdır. Burada vekalet kavramı zaten içkindir — çünkü firma adına imza atacak gerçek kişi (genelde şirket yetkilisi), <strong>şirketin imza sirküleri ile yetkilendirilmiştir.</strong></p>
      <p>Firma e-imzası başvurusu şu belgeleri gerektirir:</p>
      <ul>
        <li>Şirketin güncel imza sirküleri</li>
        <li>Vergi levhası</li>
        <li>Ticaret sicil gazetesi</li>
        <li>İmzayı atacak yetkili kişinin kimlik fotoğrafı</li>
        <li>Yetki belgesi (özel durumlarda)</li>
      </ul>
      <p><strong>İmza yetkilisi başvuruyu kendisi yapar.</strong> Şirket sahibi başka birini vekil tayin ederek başvuru yaptıramaz. Yetkili kim ise o başvurmak zorundadır.</p>

      <h2>Mali Mühür ve Vekalet</h2>
      <p>Mali mühür (e-Mühür) için durum farklıdır. Mali mühür <strong>şirketin GİB'e doğrudan başvurusu</strong> ile alınır. Şirket yetkilisi (genelde imza sirkülerinde belirtilen kişi) İnteraktif Vergi Dairesi üzerinden online başvuru yapar.</p>
      <p>Mali müşavir bu süreçte <strong>danışmanlık</strong> verir ama başvuruyu kendisi adına yapamaz. Bilgi için <a href="/blog/mali-muhur-nedir-eimza-farki">Mali Mühür Nedir?</a> yazımıza bakın.</p>

      <h2>Süreç ve Belgeler (Yasal Temsilci Vekaleti)</h2>
      <p>Velayet, vesayet veya engelli temsil gibi <strong>özel durumlarda</strong> vekaletle başvuru süreci:</p>
      <div class="steps">
        <div class="step"><h3>Noter Vekaletnamesi</h3><p>Noter huzurunda <strong>"elektronik imza başvurusu yapma yetkisi"</strong> açıkça belirtilmiş özel vekaletname düzenlenmelidir. Genel vekalet yeterli değildir.</p></div>
        <div class="step"><h3>ESHS Onayı</h3><p>Vekaletname ile birlikte ilgili ESHS'ye (Ayyıldız vb.) başvurulur. ESHS'nin durumu değerlendirip onaylaması gerekir.</p></div>
        <div class="step"><h3>Kimlik Doğrulama</h3><p>Asıl başvuru sahibinin kimliği özel yöntemlerle doğrulanır (vesayet kararı, sağlık raporu, mahkeme kararı vb.).</p></div>
        <div class="step"><h3>Teslim</h3><p>Sertifika ve PIN kodu, vekalet eden kişiye <strong>asıl sahibe ulaştırmak üzere</strong> teslim edilir.</p></div>
      </div>

      <h2>Riskler ve Sorumluluk</h2>
      <p>Vekaletle e-imza alınması hukuki açıdan riskli olduğu için ESHS'ler bu konuda son derece dikkatlidir:</p>
      <ul>
        <li><strong>Yasal sorumluluk:</strong> Vekaletle alınan e-imza ile yapılan işlemlerden asıl sahip sorumludur.</li>
        <li><strong>İptal:</strong> Asıl sahip vekalet etmesi gerekmemişse sertifika iptal edilebilir.</li>
        <li><strong>Hukuki uyuşmazlık:</strong> Vekalet sınırları aşıldığında ciddi yaptırımlar.</li>
      </ul>

      <div class="callout">
        <strong>Tavsiyemiz:</strong> Bireysel e-imza ihtiyacınız olan kişinin bizzat başvurması en doğru ve risksiz yöntemdir. Süreç zaten WhatsApp üzerinden hızlı ve uzaktan tamamlanabildiği için (ofise gelmeye gerek yoktur), vekalete pratik olarak gerek kalmaz.
      </div>

      <h2>Sık Sorulan Sorular</h2>
      <p><strong>Eşim adına e-imza alabilir miyim?</strong> Hayır. Eşinizin kendisinin başvurması gerekir. Süreç tamamen uzaktan yapılabildiği için kendisi için 5 dakikalık bir iştir.</p>
      <p><strong>Babam yaşlı, onun yerine ben alabilir miyim?</strong> Direkt vekaletle olmaz ancak <strong>sağlık raporu + noter vekalet</strong> ile özel süreç açılabilir. ESHS değerlendirmesi gerekir.</p>
      <p><strong>Yurtdışındaki Türk vatandaşı adına alabilir mi?</strong> Hayır. Konsolosluk üzerinden başvuru yapılması gerekir.</p>
      <p><strong>Şirket çalışanım adına alabilir miyim?</strong> Hayır. Her çalışan kendi adına başvurmalıdır. İşveren olarak süreçte rehberlik ve maliyet karşılayabilirsiniz.</p>

      <div class="callout">
        <strong>Yardıma ihtiyacınız var mı?</strong> Vekalet durumu, engellilik veya diğer özel durumlarınız varsa WhatsApp +90 850 777 11 45 hattından durumunuza uygun çözümü birlikte bulalım.
      </div>
`,
    related: [
      { slug: "e-imza-nedir-nasil-alinir", title: "E-İmza Nedir? Nasıl Alınır?" },
      { slug: "mali-muhur-nedir-eimza-farki", title: "Mali Mühür Nedir? E-İmza ile Farkı" },
      { slug: "avukatlar-icin-e-imza-uyap", title: "Avukatlar İçin E-İmza Rehberi" }
    ]
  }
];

function renderHead(b) {
  const url = `${SITE}/blog/${b.slug}`;
  const articleSchema = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": b.title,
    "description": b.description,
    "image": `${SITE}/assets/img/og-image.png`,
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
      "logo": { "@type": "ImageObject", "url": `${SITE}/assets/img/og-image.png` }
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
  let howtoSchema = "";
  if (b.howto) {
    const howto = {
      "@context": "https://schema.org",
      "@type": "HowTo",
      "@id": `${url}#howto`,
      "name": b.howto.name,
      "description": b.howto.description,
      "image": `${SITE}/assets/img/og-image.png`,
      "totalTime": b.howto.totalTime,
      "estimatedCost": { "@type": "MonetaryAmount", "currency": "TRY", "value": "0" },
      "step": b.howto.steps.map((s, i) => ({
        "@type": "HowToStep",
        "position": i + 1,
        "name": s.name,
        "text": s.text.replace(/<[^>]+>/g, ''),
        "url": `${url}#adim-${i + 1}`
      })),
      "inLanguage": "tr-TR",
      "publisher": { "@id": `${SITE}/#organization` },
      "author": { "@id": `${SITE}/#editorialteam` }
    };
    howtoSchema = `<script type="application/ld+json">\n${JSON.stringify(howto, null, 2)}\n</script>\n`;
  }
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
<link rel="stylesheet" href="../assets/css/style.css">
<link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' rx='22' fill='%230a2540'/%3E%3Ctext x='50' y='72' font-size='68' text-anchor='middle' fill='%23e63946'%3E%E2%98%85%3C/text%3E%3C/svg%3E">
<script type="application/ld+json">
${articleSchema}
</script>
<script type="application/ld+json">
${breadcrumb}
</script>
<!-- GEO-BLOG-SCHEMA-V1 -->
${howtoSchema}<script type="application/ld+json">
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
          <div style="font-size:.85rem">Yayınlanma: 19 Haziran 2026 · Güncelleme: 19 Haziran 2026</div>
        </div>
      </div>

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
          🔄 Bu içerik en son <strong>19 Haziran 2026</strong> tarihinde gözden geçirildi ve güncel mevzuata uygunluğu teyit edildi.
        </div>

      </section>
    </article>
    <div class="center" style="margin-top:32px">
      <a href="https://wa.me/908507771145?text=E-imza%20başvurusu%20yapmak%20istiyorum" class="btn btn--wa btn--lg" target="_blank" rel="noopener">WhatsApp ile Başvur</a>
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
<a href="https://wa.me/908507771145" class="fab-wa" target="_blank" rel="noopener" aria-label="WhatsApp">✆</a>
<script defer src="../assets/js/main.js"></script>
</body>
</html>`;
}

let created = 0;
for (const b of blogs) {
  const filePath = path.join(BLOG, `${b.slug}.html`);
  if (fs.existsSync(filePath)) {
    console.log(`✗ Skip (exists): ${b.slug}.html`);
    continue;
  }
  const html = renderHead(b) + "\n" + renderBody(b);
  fs.writeFileSync(filePath, html, "utf8");
  console.log(`✓ ${b.slug}.html (${b.wordCount} kelime)`);
  created++;
}

console.log(`\n✅ Created: ${created} new blog posts`);
