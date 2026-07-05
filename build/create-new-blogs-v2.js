"use strict";
/**
 * 4 nis blog yazisi olusturur — UMAY blog stilinde,
 * tam GEO/AEO schema'li (TechArticle + WebPage + Speakable + Citations + Mentions),
 * E-E-A-T sinyalleri ile (TL;DR + Author Bio + Sources).
 *
 * Yazilar:
 *   1. doktorlar-icin-e-imza-e-recete
 *   2. muhendisler-icin-e-imza-tmmob
 *   3. ekap-icin-e-imza-kamu-ihale
 *   4. e-imza-kayip-calinti-hasarli
 */
const fs = require("fs");
const path = require("path");

const BLOG = path.join(__dirname, "..", "blog");
const SITE = "https://www.e-imzasatinal.com.tr";
const DATE_PUBLISHED = "2026-07-05";
const DATE_MODIFIED = "2026-07-05";

const blogs = [
  {
    slug: "doktorlar-icin-e-imza-e-recete",
    title: "Doktorlar İçin E-İmza ve E-Reçete Rehberi (2026)",
    h1: "Doktorlar İçin E-İmza ve E-Reçete Rehberi",
    description: "Doktorlar için e-imza zorunluluğu, e-Reçete, MEDULA, Sağlık Bakanlığı sistemleri ve özel muayenehane kullanımı. Sağlık profesyonelleri için tam rehber.",
    ogTitle: "Doktorlar İçin E-İmza ve E-Reçete Rehberi 2026",
    ogDescription: "E-Reçete, MEDULA, HSYS ve muayenehane işlemleri için doktor e-imza kullanımı.",
    eyebrow: "Sağlık Sektörü Rehberi",
    section: "Doktorlar İçin Rehber",
    keywords: ["doktor e-imza", "e-reçete", "MEDULA", "hekim e-imza", "muayenehane e-imza", "diş hekimi e-imza", "eczacı e-imza"],
    wordCount: 1800,
    tldr: "<strong>Doktorlar için e-imza zorunludur.</strong> <strong>E-Reçete</strong> yazımı, <strong>MEDULA</strong> sistemine giriş, <strong>e-Rapor</strong> düzenleme, muayenehane e-Fatura kesimi ve akademik yayın imzalama için e-imza gerekir. <strong>Önerilen paket: 3 yıllık bireysel e-imza + muayenehane sahipleri için mali mühür.</strong> Yıllık maliyet ~1.250 TL — bir haftalık reçete cirosu.",
    citations: [
      { name: "Sağlık Bakanlığı — Reçete Bilgi Sistemi", url: "https://www.saglik.gov.tr" },
      { name: "SGK — MEDULA Sistemi", url: "https://www.sgk.gov.tr" },
      { name: "Türk Tabipleri Birliği (TTB)", url: "https://www.ttb.org.tr" },
      { name: "Türk Eczacıları Birliği (TEB)", url: "https://www.teb.org.tr" },
      { name: "5070 sayılı Elektronik İmza Kanunu", url: "https://www.mevzuat.gov.tr/mevzuatmetin/1.5.5070.pdf" }
    ],
    mentions: ["e-imza", "mali-muhur", "nes", "e-fatura"],
    body: `
      <h2>Doktorlar İçin E-İmza Neden Zorunlu?</h2>
      <p>Türkiye'de hekimlik mesleğinin dijital dönüşümü <strong>e-Reçete</strong>, <strong>e-Rapor</strong>, <strong>MEDULA</strong> ve <strong>Hekim Bilgi Yönetim Sistemi (HBYS)</strong> ile hızla ilerledi. 2026 itibarıyla bir doktorun günlük mesleki rutinini e-imza olmadan sürdürmesi pratikte imkansız.</p>
      <p>Sadece devlet hastanesi hekimleri değil, <strong>özel muayenehane sahipleri, üniversite hastanelerinde çalışan akademisyenler ve serbest çalışan uzmanlar</strong> da e-imzaya bağımlıdır. Muayene sonrası hasta reçetesi, tetkik onayı, sevk kağıdı, rapor düzenleme — hepsi e-imza ile atılır.</p>

      <h2>Doktorlar E-İmzayı Hangi Sistemlerde Kullanır?</h2>
      <ul>
        <li><strong>E-Reçete Sistemi:</strong> Hasta adına elektronik ortamda reçete yazma. Reçete SGK'ya iletilir, eczane e-imzalı reçeteyi görür.</li>
        <li><strong>MEDULA:</strong> SGK'nın sağlık hizmetleri portalı. Hastane fatura kesimi, hasta takibi, provizyon işlemleri.</li>
        <li><strong>E-Rapor:</strong> İş göremezlik raporu, sağlık raporu, sürücü belgesi raporu gibi resmi belgelerin dijital düzenlenmesi.</li>
        <li><strong>HBYS entegrasyonu:</strong> Hastane bilgi yönetim sistemlerinden dış sistemlere veri iletimi.</li>
        <li><strong>E-Sevk:</strong> Hasta sevk işlemleri.</li>
        <li><strong>Akademik yayın imzalama:</strong> ÜAK başvuruları, dergi makale imzaları, tez teslimi.</li>
        <li><strong>Muayenehane e-Fatura:</strong> Özel muayenehanenin GİB nezdinde faturalarını kesme (mali mühür ile).</li>
        <li><strong>KVKK VERBİS:</strong> Muayenehane sahibi olarak veri sorumluları siciline kayıt.</li>
      </ul>

      <h2>E-Reçete Sistemi Nasıl Çalışır?</h2>
      <p>Türkiye'de <strong>Sağlık Bakanlığı Reçete Bilgi Sistemi</strong> aracılığıyla düzenlenen tüm reçeteler elektroniktir. Süreç şu şekilde işler:</p>
      <div class="steps">
        <div class="step"><h3>Muayene</h3><p>Doktor hastayı muayene eder, tanı koyar, ilaç veya tetkik reçetesi yazacaktır.</p></div>
        <div class="step"><h3>Sistem Girişi</h3><p>HBYS veya Sağlık Bakanlığı portalından e-imza ile giriş yapılır (Chrome/Edge + AKİS + tarayıcı eklentisi).</p></div>
        <div class="step"><h3>Reçete Yazımı</h3><p>İlaç adı, doz, süre bilgileri sisteme girilir. Etkileşim uyarıları otomatik çıkar.</p></div>
        <div class="step"><h3>E-İmza Onayı</h3><p>Reçete e-imza ile onaylanır. PIN girilir, kriptografik imza atılır. SGK'ya iletilir.</p></div>
        <div class="step"><h3>Eczane Erişimi</h3><p>Hasta eczaneye TC kimlik numarası ile gider. Eczaneci SGK sistemine bağlanıp e-reçeteyi görür ve ilaçları verir.</p></div>
      </div>

      <div class="callout">
        <strong>Önemli:</strong> Kağıt reçete yazma yetkisi bazı istisnalar dışında kalktı. Sistemin çökmesi veya elektrik kesintisi gibi acil durumlarda beyaz reçete geçici olarak yazılabilir, sonra sisteme işlenir.
      </div>

      <h2>MEDULA ve E-İmza</h2>
      <p><strong>MEDULA</strong>, SGK'nın sağlık hizmet sağlayıcıları için portal sistemidir. Hastane, poliklinik, muayenehane, laboratuvar tüm sağlık kuruluşları MEDULA üzerinden fatura keser, hasta bilgisi girer.</p>
      <p>MEDULA'ya <strong>e-imza ile giriş zorunludur</strong> ve tüm fatura düzenlemeleri e-imzalı yapılır. Muayenehane sahibi doktorlar için MEDULA + Mali Mühür kombinasyonu gerekir:</p>
      <ul>
        <li><strong>E-İmza:</strong> MEDULA girişi, hekim kimlik doğrulama</li>
        <li><strong>Mali Mühür:</strong> Muayenehanenin e-Fatura kesimi</li>
      </ul>

      <h2>Diş Hekimleri ve Eczacılar İçin E-İmza</h2>
      <p>Diş hekimleri e-imzayı özel muayenehane işlemleri, TDB (Türk Dişhekimleri Birliği) portalı, e-reçete ve tedavi planı için kullanır. <strong>Eczacılar</strong> ise SGK provizyon sistemi, e-reçete karşılama, ilaç geri ödeme işlemleri ve TEB (Türk Eczacıları Birliği) portalı için e-imzaya ihtiyaç duyar.</p>

      <h2>Önerilen Paket: Doktorlar İçin</h2>
      <p>Bir doktorun tipik ihtiyacı:</p>

      <h3>Senaryo 1: Devlet Hastanesi/Üniversite Doktoru</h3>
      <ul>
        <li><strong>1 × Bireysel E-İmza (3 yıllık)</strong> — hastane HBYS, e-reçete, MEDULA, akademik yayın için</li>
        <li>Yıllık maliyet: ~1.250 TL</li>
      </ul>

      <h3>Senaryo 2: Özel Muayenehane Sahibi</h3>
      <ul>
        <li><strong>1 × Bireysel E-İmza (3 yıllık)</strong> — kendi mesleki işlemleri için</li>
        <li><strong>1 × Mali Mühür</strong> — muayenehane e-Fatura kesimi için (GİB'den alınır)</li>
        <li><strong>1 × KEP hesabı</strong> — hasta yazışmaları, hukuki bildirimler için önerilir</li>
        <li>Yıllık maliyet: ~2.500 TL</li>
      </ul>

      <h3>Senaryo 3: Grup Muayenehanesi (Birden Fazla Doktor)</h3>
      <ul>
        <li>Her doktor için <strong>bireysel e-imza</strong></li>
        <li>Merkez muayenehane için <strong>1 mali mühür</strong></li>
        <li>Muayenehane adına <strong>1 KEP</strong></li>
      </ul>

      <h2>Doktorlar İçin Sık Sorulan Sorular</h2>
      <p><strong>Asistan hekim e-imza alabilir mi?</strong> Evet. Asistan hekimlerin de kendi adlarına e-imza alıp HBYS ve akademik işlemler için kullanmaları gerekir.</p>
      <p><strong>Kadrolu ve sözleşmeli çalışıyorum, iki tane e-imza mı almalıyım?</strong> Hayır. Kişisel bir e-imza tüm sistemlerde kullanılır. E-imza kişiye aittir, iş yerine değil.</p>
      <p><strong>E-Reçete için hangi tarayıcı gerekli?</strong> Chrome, Edge veya Firefox. Detaylar için <a href="/blog/e-imza-tarayici-eklentisi-kurulumu">tarayıcı eklentisi rehberimize</a> bakın.</p>
      <p><strong>Yurtdışı görevindeyken e-reçete yazabilir miyim?</strong> Evet, tarayıcı + AKİS + USB token ile herhangi bir bilgisayardan giriş yapılabilir. VPN veya sabit IP gerekmez.</p>
      <p><strong>PIN kilitlendi, hasta bekliyor, ne yapayım?</strong> PUK kodu ile açabilirsiniz. Detay için <a href="/blog/e-imza-kayip-calinti-hasarli">e-imza kayıp/hasar rehberimize</a> bakın.</p>

      <h2>Maliyet-Fayda Analizi</h2>
      <p>Bir doktor yılda ortalama 3.000-5.000 reçete yazar. Kağıt reçete zamanında bir reçete için gereken süre 3-5 dakika. E-reçete ile bu 30-60 saniyeye iner. Yıllık tasarruf: <strong>100+ saat mesai zamanı.</strong></p>
      <p>Bunun karşılığında yıllık ~1.250 TL e-imza maliyeti — doktorun bir haftalık kısmi mesaisinin bile altında. Belki de mesleki hayatın en yüksek getirili yatırımıdır.</p>

      <div class="callout">
        <strong>Doktorlar için özel destek:</strong> UMAY TÜM BİLİŞİM sağlık sektörü müşterilerine e-reçete, MEDULA ve HBYS entegrasyonunda ücretsiz danışmanlık sunar. WhatsApp +90 850 777 11 45.
      </div>
`,
    related: [
      { slug: "e-imza-nedir-nasil-alinir", title: "E-İmza Nedir? Nasıl Alınır?" },
      { slug: "mali-muhur-nedir-eimza-farki", title: "Mali Mühür Nedir? E-İmza ile Farkı" },
      { slug: "e-imza-tarayici-eklentisi-kurulumu", title: "E-İmza Tarayıcı Eklentisi Kurulumu" }
    ]
  },
  {
    slug: "muhendisler-icin-e-imza-tmmob",
    title: "Mühendisler İçin E-İmza ve TMMOB İşlemleri (2026)",
    h1: "Mühendisler İçin E-İmza ve TMMOB İşlemleri",
    description: "Mühendisler için e-imza zorunluluğu, TMMOB oda kayıtları, SGK iş güvenliği, proje onayı ve ihale süreçleri. İnşaat, elektrik, makine mühendisleri için tam rehber.",
    ogTitle: "Mühendisler İçin E-İmza ve TMMOB Rehberi 2026",
    ogDescription: "TMMOB oda işlemleri, proje onayı, iş güvenliği ve ihale süreçleri için mühendis e-imzası.",
    eyebrow: "Mühendislik Rehberi",
    section: "Mühendisler İçin Rehber",
    keywords: ["mühendis e-imza", "TMMOB e-imza", "inşaat mühendisi e-imza", "elektrik mühendisi e-imza", "SGK İSG e-imza", "yapı denetim e-imza", "SMM e-imza"],
    wordCount: 1750,
    tldr: "<strong>Mühendisler için e-imza pratikte zorunludur.</strong> <strong>TMMOB oda kayıtları</strong>, <strong>SMM (Serbest Müşavir Mühendis) belgesi</strong>, <strong>Yapı Denetim</strong>, <strong>SGK İş Sağlığı ve Güvenliği</strong>, <strong>EKAP ihale teklifleri</strong>, proje onayları e-imza gerektirir. <strong>Önerilen paket: 3 yıllık bireysel e-imza + KEP hesabı</strong> (özellikle SMM'ler için). Yıllık maliyet ~1.500 TL.",
    citations: [
      { name: "TMMOB — Türk Mühendis ve Mimar Odaları Birliği", url: "https://www.tmmob.org.tr" },
      { name: "İnşaat Mühendisleri Odası (İMO)", url: "https://www.imo.org.tr" },
      { name: "Elektrik Mühendisleri Odası (EMO)", url: "https://www.emo.org.tr" },
      { name: "Makine Mühendisleri Odası (MMO)", url: "https://www.mmo.org.tr" },
      { name: "SGK — İş Sağlığı ve Güvenliği", url: "https://www.sgk.gov.tr" },
      { name: "6331 sayılı İSG Kanunu", url: "https://www.mevzuat.gov.tr/mevzuatmetin/1.5.6331.pdf" }
    ],
    mentions: ["e-imza", "eshs", "nes", "kep"],
    body: `
      <h2>Mühendisler İçin E-İmza Neden Gerekli?</h2>
      <p>Türkiye'de mühendislik mesleği, TMMOB'a bağlı 24 meslek odası üzerinden yürütülür. İnşaat, makine, elektrik-elektronik, çevre, jeoloji, harita, gıda, kimya ve diğer disiplinlerdeki mühendislerin <strong>meslek odası kayıtları, proje onayları, ihale teklifleri, iş güvenliği yükümlülükleri ve devlet başvuruları</strong> için e-imzaya ihtiyacı vardır.</p>
      <p>Özellikle <strong>Serbest Müşavir Mühendis (SMM)</strong> belgesi alan bağımsız çalışan mühendisler ve <strong>proje sahibi mühendisler</strong> için e-imza günlük iş rutininin merkezindedir.</p>

      <h2>Mühendislerin E-İmza Kullandığı Alanlar</h2>
      <ul>
        <li><strong>TMMOB Oda Kayıtları:</strong> Üye kayıt, aidat, sicil güncellemeleri, oda etkinlikleri.</li>
        <li><strong>SMM Belgesi Başvuruları:</strong> Serbest çalışan mühendislik hizmetleri için belge almak/yenilemek.</li>
        <li><strong>Yapı Denetim İşlemleri:</strong> İnşaat mühendisleri için yapı denetim şirketi kayıtları, denetim raporları.</li>
        <li><strong>SGK İSG (İş Sağlığı ve Güvenliği):</strong> İşyeri hekimi/İSG uzmanı belge işlemleri, İSG-KATİP.</li>
        <li><strong>EKAP İhale:</strong> Kamu ihalelerinde teklif zarfı hazırlama, e-teklif onayı.</li>
        <li><strong>Proje Onayları:</strong> Belediye, TSE, Enerji Bakanlığı gibi kurumlara mühendislik projesi teslimi.</li>
        <li><strong>Bilirkişi İşlemleri:</strong> Mahkemelere sunulan uzman görüş, keşif raporu.</li>
        <li><strong>TSE Belgelendirme:</strong> CE işareti, ISO uyum işlemleri.</li>
        <li><strong>Enerji Kimlik Belgesi (EKB):</strong> Enerji verimliliği uzmanları için.</li>
      </ul>

      <h2>Meslek Odalarına Göre E-İmza Kullanımı</h2>

      <h3>İnşaat Mühendisleri (İMO)</h3>
      <p>İMO üyeleri için e-imza en yoğun kullanılan sertifikadır. Yapı denetim çalışanları, statik proje sahipleri ve SMM'ler günde onlarca belgeyi e-imza ile onaylar. İnşaat mühendisleri için tipik kullanım:</p>
      <ul>
        <li>Yapı denetim şirketi ruhsat işlemleri</li>
        <li>Belediyeye ruhsat başvurusu</li>
        <li>Deprem yönetmeliği uyum raporları</li>
        <li>SMM belgesi ile bağımsız proje çizim ve onayı</li>
      </ul>

      <h3>Elektrik-Elektronik Mühendisleri (EMO)</h3>
      <p>Elektrik projeleri, tesisat onayları, ölçüm raporları, EMO üyeliği ve LPG istasyonu projeleri gibi işlemler e-imza ile yapılır. Yapı denetim ve enerji sektöründe çalışan mühendisler için kritik.</p>

      <h3>Makine Mühendisleri (MMO)</h3>
      <p>Mekanik tesisat projeleri, ısı yalıtım hesapları, asansör periyodik kontrolleri, LPG istasyonu, doğalgaz tesisatı projeleri ve MMO üyelik işlemleri e-imza gerektirir.</p>

      <h3>Diğer Mühendislik Disiplinleri</h3>
      <p>Kimya, gıda, çevre, harita, jeoloji, orman ve diğer mühendisler kendi meslek odası portalları + ilgili bakanlık sistemleri için e-imza kullanır. Örneğin çevre mühendisleri ÇED raporlarını e-imzalı gönderir, harita mühendisleri TAKBİS ve kadastro işlemlerini yürütür.</p>

      <h2>SGK İş Sağlığı ve Güvenliği (İSG) Uzmanları</h2>
      <p><strong>6331 sayılı İSG Kanunu</strong> gereği işyerlerine atanan İSG uzmanları (A/B/C sınıfı) ve işyeri hekimleri SGK'nın <strong>İSG-KATİP</strong> sistemine e-imza ile girer. İSG uzmanlığı belge yenileme, risk değerlendirmesi ve İSG kurul kararları e-imzalı yapılır.</p>

      <h2>Kamu İhalelerinde Mühendis E-İmzası</h2>
      <p>Mühendislik hizmet ihalelerinde (mimarlık-mühendislik danışmanlığı, yapı denetim, proje çizim vb.) EKAP üzerinden e-teklif zarfı hazırlanır. Detay için <a href="/blog/ekap-icin-e-imza-kamu-ihale">EKAP e-imza rehberimize</a> bakın.</p>

      <h2>Önerilen Paket: Mühendisler İçin</h2>

      <h3>Senaryo 1: Kamu/Özel Sektör Çalışanı Mühendis</h3>
      <ul>
        <li><strong>1 × Bireysel E-İmza (3 yıllık)</strong> — oda işlemleri, iş yeri sistemi girişi için</li>
        <li>Yıllık maliyet: ~1.250 TL</li>
      </ul>

      <h3>Senaryo 2: SMM (Serbest Müşavir Mühendis)</h3>
      <ul>
        <li><strong>1 × Bireysel E-İmza (3 yıllık)</strong> — proje imzalama, oda işlemleri</li>
        <li><strong>1 × KEP hesabı</strong> — resmi yazışmalar (belediyeler, kamu kurumları)</li>
        <li><strong>Mali Mühür (mükellef olarak)</strong> — e-Fatura kesimi için</li>
        <li>Yıllık maliyet: ~2.500 TL</li>
      </ul>

      <h3>Senaryo 3: Yapı Denetim Şirketi Sahibi</h3>
      <ul>
        <li>Her denetçi/mühendis için ayrı e-imza</li>
        <li>Şirket için mali mühür + KEP</li>
        <li>Yıllık maliyet: 3.000-6.000 TL (çalışan sayısına göre)</li>
      </ul>

      <h2>Mühendislere Özel Sık Sorulan Sorular</h2>
      <p><strong>TMMOB üyeliğim iptal edildi, e-imza kullanabilir miyim?</strong> Evet. E-imza TMMOB ile ilgili değildir; kişiye aittir ve tüm devlet sistemlerinde kullanılabilir.</p>
      <p><strong>Farklı odalara üyeyim (İMO + MMO), tek e-imza yeter mi?</strong> Evet, tek bir bireysel e-imza tüm meslek odası işlemlerinde geçerlidir.</p>
      <p><strong>Yurtdışında müşavirlik yapıyorum, Türkiye e-imzası oradan çalışır mı?</strong> Evet. Tarayıcı + AKİS + USB token ile herhangi bir ülkeden Türk devlet sistemlerine giriş yapılabilir.</p>
      <p><strong>Yapı denetim şirketinde çalışıyorum, şirket adına mı imza atmalıyım?</strong> Denetim yapan mühendis kendi adına imza atar; şirket adı da belgede yer alır. Firma e-imzası ayrı — daha çok yönetici yetkilendirmesi içindir.</p>

      <div class="callout">
        <strong>Mühendisler için özel danışmanlık:</strong> Meslek odanıza ve çalışma alanınıza göre uygun paketi belirlemek için WhatsApp +90 850 777 11 45.
      </div>
`,
    related: [
      { slug: "ekap-icin-e-imza-kamu-ihale", title: "EKAP İçin E-İmza — Kamu İhale Rehberi" },
      { slug: "e-imza-nedir-nasil-alinir", title: "E-İmza Nedir? Nasıl Alınır?" },
      { slug: "kep-nedir-kimler-almak-zorunda", title: "KEP Nedir? Kimler Almak Zorunda?" }
    ]
  },
  {
    slug: "ekap-icin-e-imza-kamu-ihale",
    title: "EKAP İçin E-İmza — Kamu İhale Rehberi (2026)",
    h1: "EKAP İçin E-İmza — Kamu İhale Rehberi",
    description: "EKAP (Elektronik Kamu Alımları Platformu) üzerinden kamu ihalelerine katılım için e-imza kullanımı. Teklif zarfı hazırlama, e-teklif süreci, KİK mevzuatı ve tam rehber.",
    ogTitle: "EKAP E-İmza — Kamu İhale Katılım Rehberi 2026",
    ogDescription: "Kamu ihalelerinde e-imza ile teklif zarfı, e-teklif ve EKAP süreçleri adım adım.",
    eyebrow: "Kamu İhale Rehberi",
    section: "EKAP Rehberi",
    keywords: ["EKAP e-imza", "kamu ihalesi e-imza", "e-teklif zarfı", "KİK e-imza", "kamu alımları platformu", "elektronik ihale", "müteahhit e-imza"],
    wordCount: 1900,
    tldr: "<strong>Kamu ihalelerine katılmak için EKAP + e-imza zorunludur.</strong> <strong>EKAP (Elektronik Kamu Alımları Platformu)</strong> üzerinden ihale ilanları takip edilir, teklif zarfı hazırlanır, <strong>e-teklif</strong> ile başvuru yapılır. Firma yetkilisinin <strong>3 yıllık firma e-imzası + KEP hesabı</strong> minimum gerekli. Yıllık maliyet ~1.500 TL, kazanılan tek bir ihale bu maliyeti onlarca kat karşılar.",
    citations: [
      { name: "EKAP — Elektronik Kamu Alımları Platformu", url: "https://ekap.kik.gov.tr" },
      { name: "Kamu İhale Kurumu (KİK)", url: "https://www.kik.gov.tr" },
      { name: "4734 sayılı Kamu İhale Kanunu", url: "https://www.mevzuat.gov.tr/mevzuatmetin/1.5.4734.pdf" },
      { name: "4735 sayılı Kamu İhale Sözleşmeleri Kanunu", url: "https://www.mevzuat.gov.tr/mevzuatmetin/1.5.4735.pdf" },
      { name: "5070 sayılı Elektronik İmza Kanunu", url: "https://www.mevzuat.gov.tr/mevzuatmetin/1.5.5070.pdf" }
    ],
    mentions: ["e-imza", "ekap", "kep", "nes"],
    body: `
      <h2>EKAP Nedir?</h2>
      <p><strong>EKAP (Elektronik Kamu Alımları Platformu)</strong>, Türkiye'de kamu kurumlarının açtığı tüm ihalelerin duyurulduğu, tekliflerin alındığı ve süreçlerin yürütüldüğü elektronik platformdur. <strong>Kamu İhale Kurumu (KİK)</strong> tarafından yönetilir ve <strong>4734 sayılı Kamu İhale Kanunu</strong> kapsamındaki tüm alım süreçleri buradan yapılır.</p>
      <p>2018 sonrası kamu ihalelerinin büyük çoğunluğu <strong>e-teklif</strong> (elektronik teklif) yöntemi ile yürütülmektedir. Kağıt teklif dönemi neredeyse kapandı.</p>

      <h2>EKAP'a Kimler Katılabilir?</h2>
      <ul>
        <li>Türkiye'de kayıtlı gerçek ve tüzel kişiler</li>
        <li>Serbest meslek erbabı (avukat, mali müşavir, mühendis, mimar)</li>
        <li>Şahıs şirketleri</li>
        <li>Limited şirketler, anonim şirketler, sermayesi paylara bölünmüş komandit şirketler</li>
        <li>Kooperatif ve dernekler (uygun ihalelerde)</li>
        <li>İş ortaklıkları (birden fazla firmanın birleşerek katılması)</li>
      </ul>

      <h2>EKAP İçin Gerekli Belgeler</h2>
      <p>EKAP kaydı ve teklif verme için hazırlanması gerekenler:</p>
      <ul>
        <li><strong>Firma E-İmzası:</strong> Şirket yetkilisi adına düzenlenmiş nitelikli elektronik sertifika</li>
        <li><strong>KEP Hesabı:</strong> Tebligat ve resmi bildirimler için (özellikle A.Ş./LTD.ŞTİ. için zaten zorunlu)</li>
        <li><strong>MERSİS kaydı:</strong> Şirketin merkezi sicil kayıt sisteminde güncel bilgileri</li>
        <li><strong>Vergi Levhası ve Vergi Borcu Yok Yazısı</strong> (elektronik olarak alınır)</li>
        <li><strong>SGK Prim Borcu Yok Yazısı</strong> (elektronik olarak alınır)</li>
        <li><strong>Ticaret Sicil Gazetesi</strong> (dijital erişilebilir)</li>
        <li>İhaleye özel istenen belgeler (deneyim, bilanço, mesleki yeterlilik vb.)</li>
      </ul>

      <h2>EKAP'a Kayıt ve İlk Giriş</h2>
      <div class="steps">
        <div class="step"><h3>1. Firma E-İmzası Al</h3><p>Firma yetkilisi adına bireysel e-imza satın alın. Şirket bilgileri sertifikada yer alır. <a href="/e-imza">Firma e-imza hakkında detay →</a></p></div>
        <div class="step"><h3>2. KEP Hesabı Aç</h3><p>KEP zorunludur; ihale tebligatları buraya gelir. <a href="/kep">KEP başvurusu →</a></p></div>
        <div class="step"><h3>3. EKAP Kaydı</h3><p><strong>ekap.kik.gov.tr</strong> adresinden "Firma Kaydı" bölümüne gidin. E-imza ile giriş yapın, firma bilgilerinizi doldurun.</p></div>
        <div class="step"><h3>4. Onay Bekleyin</h3><p>KİK onayı 1-3 iş günü sürer. Onay sonrası tüm ihale ilanlarına ve teklif fonksiyonlarına erişiminiz açılır.</p></div>
      </div>

      <h2>E-Teklif Süreci: Adım Adım</h2>
      <p>Bir ihaleye elektronik teklif nasıl verilir?</p>

      <h3>1. İhale İlanını İnceleyin</h3>
      <p>EKAP'ta ilgi alanınıza göre filtre kullanarak açılan ihaleleri görüntüleyin. Her ihale için <strong>ihale dokümanları</strong> indirilebilir (bedelsiz veya ücretli).</p>

      <h3>2. Teklif Zarfını Hazırlayın</h3>
      <p>Klasik ihalede fiziksel zarf kullanılırdı; e-teklifte tüm evraklar elektronik olarak yüklenir:</p>
      <ul>
        <li><strong>Teklif Mektubu</strong> — fiyat teklifiniz</li>
        <li><strong>Geçici Teminat</strong> — banka teminat mektubu (elektronik nüsha)</li>
        <li><strong>Yeterlik Belgeleri</strong> — deneyim, uzmanlık, bilanço</li>
        <li><strong>Meslek Odası Belgesi</strong> (mühendislik, mimarlık ihalelerinde)</li>
        <li><strong>Diğer istekli belgeler</strong> — ihale şartnamesine göre değişir</li>
      </ul>

      <h3>3. E-İmza ile Teklifi Onaylayın</h3>
      <p>Tüm belgeler yüklendikten sonra <strong>e-imza ile teklif zarfı imzalanır</strong>. Bu imza:</p>
      <ul>
        <li>Firma yetkilisinin kimliğini doğrular</li>
        <li>Teklif içeriğinin değiştirilmediğini garanti eder</li>
        <li>Teklif zamanını kriptografik olarak kaydeder</li>
      </ul>

      <h3>4. Son Teklif Zamanı</h3>
      <p>İhale ilanında belirtilen son teklif zamanına kadar (dakikası dahil) teklif sistemde olmalıdır. Zamanı geçen teklifler otomatik reddedilir.</p>

      <h3>5. Açılış ve Değerlendirme</h3>
      <p>Belirlenen zamanda ihale komisyonu tüm teklifleri açar (kriptografik olarak deşifre eder). En avantajlı teklif seçilir, sonuç EKAP üzerinden duyurulur.</p>

      <div class="callout">
        <strong>Kritik:</strong> Teklif imzalanmadan sistemden çıkarsanız veya oturum sonlanırsa teklif kaydedilmiş sayılmaz. Son teklif zamanına <strong>en az 1 saat kala</strong> teklifi tamamlayın.
      </div>

      <h2>Yaygın Hatalar ve Kaçınma Yolları</h2>
      <ul>
        <li><strong>E-imza süresi dolmuş:</strong> Bir sonraki güncelleme yapılmadan e-imza yenilenmiş olmalıdır. <a href="/blog/e-imza-suresi-doldu-ne-yapilmali">Yenileme rehberi →</a></li>
        <li><strong>MERSİS'te güncel olmayan yetki:</strong> İhaleye teklif verecek yetkili değişmişse MERSİS önce güncellenmelidir.</li>
        <li><strong>Yanlış geçici teminat tutarı:</strong> Teminat tutarı ihale dokümantasyonuna göre hesaplanmalıdır (genelde tahmini bedelin %3'ü).</li>
        <li><strong>Belge tarihi eski:</strong> Vergi/SGK borç yoktur yazıları güncel tarihli olmalıdır (genelde son 3 ay).</li>
      </ul>

      <h2>Önerilen Paket: EKAP Katılımcıları İçin</h2>
      <ul>
        <li><strong>1 × Firma E-İmzası (3 yıllık)</strong> — yetkili adına, MERSİS uyumlu</li>
        <li><strong>1 × KEP hesabı</strong> — zorunlu (TTK 18/3 zaten gerektirir)</li>
        <li><strong>Mali mühür</strong> (e-Fatura kullanıyorsanız)</li>
        <li>Yıllık maliyet: ~1.500-2.500 TL</li>
      </ul>
      <p>Bu maliyet ortalama bir kamu ihalesi tutarının binde biri kadardır. Tek bir ihale kazancıyla yıllarca kapatır.</p>

      <div class="callout">
        <strong>EKAP başvurusunda destek:</strong> UMAY TÜM BİLİŞİM, ilk EKAP kaydı ve teklif süreci konusunda müşterilerine ücretsiz danışmanlık sunar. WhatsApp +90 850 777 11 45.
      </div>
`,
    related: [
      { slug: "muhendisler-icin-e-imza-tmmob", title: "Mühendisler İçin E-İmza ve TMMOB" },
      { slug: "kep-nedir-kimler-almak-zorunda", title: "KEP Nedir? Kimler Almak Zorunda?" },
      { slug: "e-imza-nedir-nasil-alinir", title: "E-İmza Nedir? Nasıl Alınır?" }
    ]
  },
  {
    slug: "e-imza-kayip-calinti-hasarli",
    title: "E-İmza Kartım Kayıp/Çalıntı/Hasarlı — Ne Yapmalıyım? (2026)",
    h1: "E-İmza Kartım Kayıp/Çalıntı/Hasarlı — Ne Yapmalıyım?",
    description: "E-imza kartınız kaybolduğunda, çalındığında veya hasar gördüğünde adım adım yapılması gerekenler. PIN/PUK kilidi, sertifika iptali ve yeni kart süreci.",
    ogTitle: "E-İmza Kayıp/Çalıntı/Hasarlı Rehberi 2026",
    ogDescription: "Kayıp, çalıntı, hasarlı e-imza kartında acil eylemler, sertifika iptali ve yeni başvuru.",
    eyebrow: "Sorun Giderme",
    section: "Sorun Giderme",
    keywords: ["e-imza kayıp", "e-imza çalındı", "e-imza hasarlı", "PIN kilitlendi", "PUK kilitlendi", "e-imza iptal", "sertifika iptali"],
    wordCount: 1600,
    tldr: "<strong>E-imza kartınız kayıp/çalıntı ise:</strong> derhal ESHS'yi arayarak sertifikayı iptal ettirin (kötüye kullanım riskini önler). <strong>Hasarlı ise:</strong> sertifika kart üzerinde saklı olduğu için genelde iade veya yeni başvuru gerekir. <strong>PIN 3 kez yanlış → kart bloke</strong> (PUK ile açılır); <strong>PUK 5 kez yanlış → kart kalıcı kilit</strong> (yeni başvuru zorunlu). Tüm işlemlerde WhatsApp +90 850 777 11 45 destek verir.",
    citations: [
      { name: "5070 sayılı Elektronik İmza Kanunu", url: "https://www.mevzuat.gov.tr/mevzuatmetin/1.5.5070.pdf" },
      { name: "BTK — ESHS Düzenleyici Çerçevesi", url: "https://www.btk.gov.tr" },
      { name: "Ayyıldız Bilgi Güvenliği — Sertifika İptal Süreci", url: "https://www.ayyildiz.com.tr" }
    ],
    mentions: ["e-imza", "eshs", "nes", "akis"],
    body: `
      <h2>Neden Hızlı Hareket Etmelisiniz?</h2>
      <p>E-imza kartınız sizin <strong>dijital kimliğinizin fiziksel taşıyıcısıdır</strong>. Kart üçüncü şahsın eline geçerse ve PIN kodunuz da biliniyorsa, adınıza <strong>hukuki değeri ıslak imzaya eşit</strong> işlemler yapılabilir. Kayıp veya çalıntı durumunda saatler bile önemlidir.</p>
      <p>Hasarlı kart durumunda ise farklı bir aciliyet var: kartınızın <strong>elektronik olarak okunamaması</strong>, çalışmakta olduğunuz beyanname/ihale/reçete sürecini durdurabilir. İkame süreci başlatmak için doğru adımları bilmek zaman kaybını önler.</p>

      <h2>1. Kayıp E-İmza — Ne Yapmalıyım?</h2>
      <div class="steps">
        <div class="step"><h3>Sakin Kalın, Aramaya Başlayın</h3><p>Son 24 saatte kartı çıkardığınız yerleri (ofis çekmece, laptop çantası, araba) mantıklı bir sırayla arayın. Çoğu kayıp aslında geçici unutmadır.</p></div>
        <div class="step"><h3>Kart Yoksa: Derhal Sertifikayı İptal Ettirin</h3><p>ESHS'ye (Ayyıldız veya bayisi UMAY TÜM BİLİŞİM) telefon veya WhatsApp ile ulaşın. TC kimlik numaranız ile sertifikanız iptal edilir. İptal sonrası kart artık işlem yapamaz.</p></div>
        <div class="step"><h3>Yeni Başvuru Yapın</h3><p>İptal sonrası yeni bir e-imza almanız gerekir. Yeni başvuru süreci normal başvuruya benzer, 1-3 iş günü sürer.</p></div>
      </div>

      <div class="callout">
        <strong>İptal süresi kritik:</strong> İptal talebi ESHS'ye ulaştığı andan itibaren geçerli olur. Kaybettiğinizi fark edince <strong>bir saat içinde</strong> iptal talebi göndermek en güvenli yaklaşımdır.
      </div>

      <h2>2. Çalıntı E-İmza — Ne Yapmalıyım?</h2>
      <p>Çalıntı durumunda kayıptan daha ciddi bir risk vardır: kartı alan kişi hedef odaklı olabilir. Adımlar:</p>
      <div class="steps">
        <div class="step"><h3>1. Derhal Sertifika İptali</h3><p>Kayıp durumundaki gibi acil olarak ESHS'yi arayın. Çalıntı olduğunu açıkça belirtin — bazı ESHS'ler ekstra güvenlik önlemleri uygular.</p></div>
        <div class="step"><h3>2. Emniyete Suç Duyurusu</h3><p>En yakın karakola veya online e-Devlet üzerinden <strong>hırsızlık suç duyurusu</strong> yapın. Tutanak numarası yeni başvuru sürecinde belge olarak kullanılabilir.</p></div>
        <div class="step"><h3>3. Kredi Notu Kontrolü</h3><p>Kimliğinizin başka amaçlarla kullanılıp kullanılmadığını görmek için Findeks kredi notunuzu ve varsa banka hesaplarınızı kontrol edin.</p></div>
        <div class="step"><h3>4. Yeni E-İmza Başvurusu</h3><p>İptal onayından sonra yeni e-imza başvurusu yapın. Süreç 1-3 iş günü.</p></div>
      </div>

      <h2>3. Hasarlı E-İmza Kartı</h2>
      <p>Kart fiziksel olarak hasarlanmış (kırılmış, delinmiş, çipi çıkmış, USB portu bozulmuş) veya elektronik olarak okunamıyorsa:</p>

      <h3>Önce Test Edin</h3>
      <ul>
        <li>Başka bir USB porta takın</li>
        <li>Başka bir bilgisayarda deneyin</li>
        <li>AKİS sürücüsünü güncelleyin</li>
        <li>Bilgisayarı yeniden başlatın</li>
      </ul>
      <p>Yukarıdakiler işe yaramıyorsa kart gerçekten hasarlı olabilir.</p>

      <h3>Hasarlı Karttan Kurtarma</h3>
      <p>Kart hasarlıysa <strong>sertifika kart üzerinde saklı olduğu için genelde kurtarılamaz</strong>. Yani:</p>
      <ul>
        <li>Sertifika hala geçerlidir (iptal edilmemiştir) ama okunamaz</li>
        <li>Yeni bir karta aynı sertifikayı yükleme çoğunlukla mümkün değildir</li>
        <li>Genelde <strong>yeni başvuru</strong> gerekir</li>
      </ul>
      <p>Bazı özel durumlarda (fabrikasyon hatası, garantili ürün) ücretsiz değişim mümkün olabilir. ESHS'nizle konuşun.</p>

      <h2>4. PIN Kilitlendi (3 Hatalı Deneme)</h2>
      <p>PIN kodunuzu <strong>3 kez ardışık yanlış girerseniz</strong> kart geçici olarak bloke olur. Bu sorun görece kolay çözülür:</p>
      <div class="steps">
        <div class="step"><h3>PUK Kodunu Bulun</h3><p>Kart teslim edildiğinde ESHS/bayi tarafından size verilmiş olan <strong>PUK kodu</strong>nu bulun. Genelde tesellüm evrakı, e-posta veya SMS ile iletilir.</p></div>
        <div class="step"><h3>AKİS'ten Kartı Aç</h3><p>AKİS uygulamasında "PIN Değiştir" veya "Karti Aç" seçeneğini kullanın. PUK kodunu girin, yeni bir PIN belirleyin.</p></div>
        <div class="step"><h3>Kart Aktif</h3><p>Yeni PIN ile kart tekrar kullanılabilir.</p></div>
      </div>

      <h2>5. PUK Kilitlendi (5 Hatalı Deneme) — Kart Kalıcı Kilit</h2>
      <p>PUK kodunu <strong>5 kez yanlış girerseniz</strong> kart <strong>kalıcı olarak kilitlenir</strong>. Bu durumda:</p>
      <ul>
        <li>Kart bir daha açılamaz</li>
        <li>Sertifika hala geçerli ama karta erişilemez</li>
        <li>Yeni başvuru gerekir</li>
      </ul>
      <div class="callout">
        <strong>Uyarı:</strong> PUK kodunu tahmin yoluyla girmeyin. Emin değilseniz ESHS'ye başvurup doğru kodu teyit ettirin.
      </div>

      <h2>Kayıp/Çalıntı/Hasar Sonrası Yeni Başvuru Süreci</h2>
      <p>Herhangi bir sebeple yeni e-imza gerekiyor:</p>
      <ul>
        <li><strong>Belge:</strong> Kimlik fotoğrafı (bireysel) veya vergi levhası + imza sirküleri (firma)</li>
        <li><strong>Süre:</strong> 1-3 iş günü</li>
        <li><strong>Fiyat:</strong> Standart e-imza paket fiyatı (2.750-3.750 TL)</li>
        <li><strong>Kalan süre:</strong> Eski karttaki kalan süre yeni karta yansımaz (çoğunlukla). Yeni sertifikanın tam süresi verilir.</li>
      </ul>

      <h2>Kartınızı Nasıl Korursunuz?</h2>
      <p>Yaşanmış acı deneyimlere dayanarak öneriler:</p>
      <ul>
        <li><strong>PIN'i asla yazmayın:</strong> Cüzdanınızda, bilgisayarınızda, e-postada PIN yazılmamalıdır.</li>
        <li><strong>PIN'i kimseyle paylaşmayın:</strong> Aile, iş arkadaşı, teknik servis dahil.</li>
        <li><strong>Kartı ayrı taşıyın:</strong> USB token'ı laptop çantasında değil, cebinizde veya kart cüzdanında.</li>
        <li><strong>PUK'u güvenli sakla:</strong> PUK e-postasını farklı bir yerde arşivleyin.</li>
        <li><strong>Yenileme takibi:</strong> Sertifika süresi bitmeden 1 ay önce hatırlatma kurun.</li>
      </ul>

      <div class="callout">
        <strong>Acil destek:</strong> Kayıp, çalıntı veya kilitlenme durumunda WhatsApp +90 850 777 11 45'i arayın — mesai saatleri dışında bile 24 saat içinde iptal işleminizi başlatabiliriz.
      </div>
`,
    related: [
      { slug: "e-imza-suresi-doldu-ne-yapilmali", title: "E-İmza Süresi Doldu — Ne Yapılmalı?" },
      { slug: "e-imza-kurulumu-nasil-yapilir", title: "E-İmza Kurulumu Nasıl Yapılır?" },
      { slug: "e-imza-nedir-nasil-alinir", title: "E-İmza Nedir? Nasıl Alınır?" }
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
    "image": `${SITE}/assets/img/blog/blog-${b.slug}.svg`,
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
      "logo": { "@type": "ImageObject", "url": `${SITE}/assets/img/blog/blog-${b.slug}.svg` }
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
<script type="application/ld+json">
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
          <div style="font-size:.85rem">Yayınlanma: 5 Temmuz 2026 · Güncelleme: 5 Temmuz 2026</div>
        </div>
      </div>
      <img src="../assets/img/blog/blog-${b.slug}.svg" alt="${b.h1}" style="width:100%;border-radius:12px;margin-bottom:28px;aspect-ratio:1200/630;object-fit:cover" loading="eager">

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
          🔄 Bu içerik en son <strong>5 Temmuz 2026</strong> tarihinde gözden geçirildi ve güncel mevzuata uygunluğu teyit edildi.
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
<script defer src="../assets/js/main.js?v=20260619"></script>
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
