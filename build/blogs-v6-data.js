"use strict";
/**
 * KEP sprint (2026-10-08). GSC 3 ay: KEP sorgulari kep-nedir yazisinda 603 gosterim,
 * pos 3,8, 2 tik. Bu iki yazi farkli niyetleri hedefler:
 *   1. kep-adresi-kimlere-zorunlu  ("kep adresi kimlere zorunlu" pos 9,6, "kep zorunlu mu",
 *      "sahis sirketi kep zorunlu mu", "trendyol kep adresi zorunlu mu")
 *   2. kep-saglayicilari-karsilastirma ("turkkep nedir", "edm kep", "ptt kep", "kep hizmeti veren firmalar")
 * Kaynaklar (2026-10-08 dogrulandi):
 *  - 7201 sayili Tebligat Kanunu md. 7/a (7101 ile degisik, 2018): zorunlu liste, 5. gun kurali, UETS/PTT
 *  - BTK KEPHS listesi: PTT hs01, TNB hs02, TURKKEP hs03, QNB eSolutions hs05, KEPKUR hs06,
 *    F.I.T. hs07, EDM hs09, Ark Dijital hs10 (aktif); Intertech hs04 ve Mikro hs08 faaliyet sona erdi.
 * Not: Ayyildiz BTK KEPHS listesinde yok; yazilarda saglayici gibi gosterilmedi.
 * Uretim: node build/create-new-blogs-v3.js build/blogs-v6-data.js
 */
const { cta } = require("./blogs-v3-data");

const KEP_MSG = "KEP adresi almak istiyorum.";

module.exports = [
  {
    slug: "kep-adresi-kimlere-zorunlu",
    svg: "blog-kep-adresi-kimlere-zorunlu.svg",
    title: "KEP Adresi Kimlere Zorunlu? Şahıs Şirketi, Limited, Anonim (2026)",
    h1: "KEP Adresi Kimlere Zorunlu?",
    description: "Şahıs şirketi, limited, anonim şirket, avukat ve dernekler için KEP ve e-tebligat zorunluluğu. Kanun maddesi, 5. gün kuralı, pazaryerleri ve KEP olmazsa ne olur.",
    ogTitle: "KEP Adresi Kimlere Zorunlu? 2026 Net Liste",
    ogDescription: "Hangi şirket ve meslekler için KEP / e-tebligat zorunlu, şahıs şirketi için durum ne?",
    eyebrow: "KEP Rehberi",
    section: "KEP",
    keywords: ["kep adresi kimlere zorunlu", "kep zorunlu mu", "şahıs şirketi kep zorunlu mu", "limited şirket kep zorunlu", "e-tebligat zorunluluğu", "kep zorunluluğu 2026"],
    wordCount: 780,
    tldr: "<strong>Tebligat Kanunu md. 7/a'ya göre tüm özel hukuk tüzel kişilerine</strong> (anonim, limited, kollektif, komandit şirketler, kooperatif, dernek, vakıf) ve <strong>noter, avukat, arabulucu, bilirkişi ile kamu kurumlarına</strong> tebligat elektronik yolla yapılmak zorundadır. <strong>Şahıs şirketi sahibi gerçek kişi olduğu için zorunlu değildir</strong>, isteğe bağlıdır. Elektronik tebligat, adrese ulaştığı tarihi izleyen <strong>5. günün sonunda</strong> açılmasa da yapılmış sayılır. Ayrıca şirketler arası ihtarlar (TTK 18/3), ihaleler ve pazaryerleri gibi pek çok süreçte KEP adresi istenir.",
    citations: [
      { name: "7201 sayılı Tebligat Kanunu (md. 7/a)", url: "https://www.mevzuat.gov.tr/mevzuatmetin/1.3.7201.pdf" },
      { name: "6102 sayılı Türk Ticaret Kanunu (md. 18/3)", url: "https://www.mevzuat.gov.tr/mevzuatmetin/1.5.6102.pdf" },
      { name: "BTK — Kayıtlı Elektronik Posta Hizmet Sağlayıcıları", url: "https://www.btk.gov.tr/kayitli-elektronik-posta-hizmet-saglayicilar" },
      { name: "PTT — Ulusal Elektronik Tebligat Sistemi (UETS)", url: "https://etebligat.ptt.gov.tr" }
    ],
    mentions: ["kep", "e-tebligat", "uets", "ttk"],
    faq: [
      { q: "KEP adresi kimlere zorunlu?", a: "Tebligat Kanunu md. 7/a'ya göre tüm özel hukuk tüzel kişilerine (anonim, limited, kollektif, komandit şirketler, kooperatif, dernek, vakıf), kamu kurumlarına, noterlere, baroya kayıtlı avukatlara, sicile kayıtlı arabulucu ve bilirkişilere tebligatın elektronik yolla yapılması zorunludur." },
      { q: "Şahıs şirketi için KEP zorunlu mu?", a: "Hayır. Şahıs şirketi ayrı bir tüzel kişilik değildir; sahibi gerçek kişidir ve elektronik tebligat zorunluluğu kapsamında değildir. Ancak talep ederek adres alabilir; bu durumda kendisine elektronik tebligat yapılması zorunlu hale gelir." },
      { q: "Elektronik tebligat ne zaman tebliğ edilmiş sayılır?", a: "Kanuna göre elektronik yolla tebligat, muhatabın elektronik adresine ulaştığı tarihi izleyen beşinci günün sonunda yapılmış sayılır. Mesajı açmamanız bu süreyi durdurmaz." },
      { q: "KEP ile e-tebligat (UETS) aynı şey mi?", a: "Hayır. Kanuni elektronik tebligatlar PTT'nin işlettiği Ulusal Elektronik Tebligat Sistemi (UETS) üzerinden yapılır. KEP ise taraflar arasında hukuken ispatlanabilir yazışma için kullanılır; örneğin TTK 18/3 kapsamındaki tacirler arası ihtarlar KEP ile gönderilebilir." },
      { q: "KEP adresi olmamanın cezası var mı?", a: "KEP adresi edinmemek için doğrudan bir idari para cezası tanımlı değildir. Asıl risk süre kaçırmaktır: elektronik tebligat 5. günün sonunda yapılmış sayılır, ayrıca ihale, pazaryeri ve kurumsal yazışma süreçlerinde KEP adresi olmadan ilerlenemeyebilir." }
    ],
    body: `
      <h2>Kısa Liste: Kimler İçin Zorunlu?</h2>
      <p>Elektronik tebligat zorunluluğunun dayanağı <strong>7201 sayılı Tebligat Kanunu'nun 7/a maddesi</strong>dir (2018'de 7101 sayılı Kanunla değişik). Maddeye göre tebligatın elektronik yolla yapılması zorunlu olanlar:</p>
      <table class="price-table">
        <thead><tr><th>Kim?</th><th>Durum</th></tr></thead>
        <tbody>
          <tr><td>Anonim şirket (A.Ş.)</td><td>Zorunlu</td></tr>
          <tr><td>Limited şirket (Ltd. Şti.)</td><td>Zorunlu</td></tr>
          <tr><td>Kollektif ve komandit şirketler</td><td>Zorunlu</td></tr>
          <tr><td>Kooperatif, dernek, vakıf</td><td>Zorunlu</td></tr>
          <tr><td>Noter, baroya kayıtlı avukat, arabulucu, bilirkişi</td><td>Zorunlu</td></tr>
          <tr><td>Kamu kurumları, belediyeler, meslek odaları</td><td>Zorunlu</td></tr>
          <tr><td>Şahıs şirketi (gerçek kişi)</td><td>İsteğe bağlı</td></tr>
          <tr><td>Bireyler, serbest meslek (avukat hariç)</td><td>İsteğe bağlı</td></tr>
        </tbody>
      </table>
      <p>Kanun metni şirket türlerini tek tek saymaz; <strong>"kanunla kurulanlar da dahil olmak üzere tüm özel hukuk tüzel kişileri"</strong> ifadesini kullanır. Ayrı tüzel kişiliği olan her şirket, kooperatif, dernek ve vakıf bu kapsama girer.</p>
${cta({ compact: true, title: "Şirketiniz için KEP adresi mi gerekiyor?", desc: "Belgelerinizi WhatsApp'tan gönderin, KEP başvurunuzu biz takip edelim.", msg: KEP_MSG, btn: "KEP Başvurusu" })}
      <h2>Şahıs Şirketi KEP Almak Zorunda mı?</h2>
      <p><strong>Hayır.</strong> Şahıs şirketi ayrı bir tüzel kişilik değildir; işletme sahibinin kendisidir, yani hukuken <strong>gerçek kişi</strong>dir. Kanun, birinci fıkra dışındaki gerçek ve tüzel kişilere <strong>talep etmeleri halinde</strong> elektronik tebligat adresi verildiğini, bu durumda tebligatın elektronik yapılmasının zorunlu hale geldiğini söyler.</p>
      <p>Zorunlu olmasa da şahıs şirketleri KEP'i şu durumlarda pratikte ihtiyaç olarak görür:</p>
      <ul>
        <li>Kurumsal müşterilere veya kamuya resmi ihtar ve bildirim gönderirken,</li>
        <li>Kamu ihalelerinde ve bazı pazaryeri başvurularında iletişim adresi olarak istendiğinde,</li>
        <li>İadeli taahhütlü mektup ve noter masrafından kaçınmak istendiğinde.</li>
      </ul>

      <h2>KEP ile E-Tebligat Arasındaki Fark</h2>
      <p>İki kavram sık karıştırılır:</p>
      <ul>
        <li><strong>Elektronik tebligat (UETS):</strong> Mahkeme, icra ve idari makamların yaptığı kanuni tebligatlar, PTT'nin kurduğu ve işlettiği <strong>Ulusal Elektronik Tebligat Sistemi</strong> üzerinden yapılır (Tebligat Kanunu md. 7/a).</li>
        <li><strong>KEP (Kayıtlı Elektronik Posta):</strong> Gönderenin, alıcının, gönderim zamanının ve içeriğin hukuken ispatlanabildiği e-posta sistemidir. Örneğin <strong>TTK 18/3</strong>'e göre tacirler arasında temerrüde düşürme, fesih ve sözleşmeden dönme ihtarları noter, taahhütlü mektup, telgraf <strong>veya güvenli elektronik imza ile KEP</strong> üzerinden yapılır.</li>
      </ul>
      <p>KEP hakkında temel bilgiler için <a href="kep-nedir-kimler-almak-zorunda">KEP Nedir?</a> yazımıza bakın.</p>

      <h2>5. Gün Kuralı: Açmasanız da Tebliğ Edilmiş Sayılır</h2>
      <p>Kanuna göre elektronik tebligat, <strong>adresinize ulaştığı tarihi izleyen beşinci günün sonunda</strong> yapılmış sayılır. Mesajı okumamış olmanız süreyi durdurmaz. Dava, icra veya vergi süreleri bu tarihten itibaren işlemeye başlar. Bu yüzden zorunlu kapsamdaysanız elektronik adreslerinizi <strong>en az haftada bir</strong> kontrol etmeniz ya da bildirimleri cep telefonunuza yönlendirmeniz önemlidir.</p>
      <div class="callout">
        <strong>Dikkat:</strong> Şirketinizde tebligatları kimin takip edeceğini yazılı olarak belirleyin. Tatil veya hastalık durumunda kaçırılan bir tebligat, itiraz süresinin dolmasına yol açabilir.
      </div>

      <h2>Pazaryerleri ve İhaleler KEP İstiyor mu?</h2>
      <p>Trendyol, Hepsiburada gibi pazaryerleri kurumsal satıcı başvurularında KEP adresi isteyebiliyor; şahıs şirketleri için şartlar farklı olabilir ve zaman zaman değişiyor. Güncel şartı başvuru yaptığınız platformun satıcı panelinden kontrol edin. Kamu ihalelerinde ise yazışmalar ve bildirimler için KEP adresi yaygın olarak kullanılır; ayrıntılar için <a href="ekap-icin-e-imza-kamu-ihale">EKAP İçin E-İmza</a> yazımıza bakın.</p>

      <h2>KEP Adresi Nasıl Alınır?</h2>
      <p>KEP hesabı, BTK tarafından yetkilendirilmiş <strong>KEP hizmet sağlayıcılarından</strong> biri üzerinden açılır. Hangi sağlayıcıların bulunduğunu ve aralarındaki farkları <a href="kep-saglayicilari-karsilastirma">KEP Sağlayıcıları Karşılaştırma</a> yazımızda anlattık. Başvuruda genellikle şirket belgeleri ve yetkilinin <a href="e-imza-nedir-nasil-alinir">e-imzası</a> gerekir; e-imzanız yoksa ikisini birlikte planlayabiliriz.</p>

      <h2>Sık Sorulan Sorular</h2>
`,
    endCta: { eyebrow: "KEP Başvurusu", title: "Şirketinizin KEP adresini açalım", desc: "Şirket belgelerinizi WhatsApp'tan iletin, KEP başvurunuzu baştan sona biz takip edelim. Başvuru için gereken e-imzanız yoksa ikisini birlikte hazırlayalım.", msg: KEP_MSG, btn: "WhatsApp ile Yaz", ghost: { href: "../kep", text: "KEP Hizmeti" } },
    related: [
      { slug: "kep-nedir-kimler-almak-zorunda", title: "KEP Adresi Nedir?" },
      { slug: "kep-saglayicilari-karsilastirma", title: "KEP Sağlayıcıları Karşılaştırma" },
      { slug: "ekap-icin-e-imza-kamu-ihale", title: "EKAP İçin E-İmza" }
    ]
  },
  {
    slug: "kep-saglayicilari-karsilastirma",
    svg: "blog-kep-saglayicilari-karsilastirma.svg",
    title: "KEP Sağlayıcıları 2026: TÜRKKEP, PTT KEP, TNB, EDM ve Diğerleri",
    h1: "KEP Sağlayıcıları: TÜRKKEP, PTT KEP, EDM KEP ve Diğerleri",
    description: "BTK'nın yetkilendirdiği KEP hizmet sağlayıcıları listesi: PTT, TNB, TÜRKKEP, QNB eSolutions, KEPKUR, F.I.T., EDM ve Ark Dijital. Farkları, adres uzantıları ve seçim kriterleri.",
    ogTitle: "KEP Sağlayıcıları 2026 — TÜRKKEP, PTT KEP, EDM KEP",
    ogDescription: "BTK yetkili KEP sağlayıcıları, KEP adresi uzantıları ve sağlayıcı seçerken bakılacaklar.",
    eyebrow: "KEP Rehberi",
    section: "KEP",
    keywords: ["kep sağlayıcıları", "türkkep nedir", "ptt kep", "edm kep nedir", "tnb kep", "kep hizmeti veren firmalar", "hs01.kep.tr"],
    wordCount: 650,
    tldr: "<strong>KEP hesabı yalnızca BTK'nın yetkilendirdiği KEP Hizmet Sağlayıcılarından (KEPHS) alınabilir.</strong> Ekim 2026 itibarıyla faaliyette olanlar: <strong>PTT, TNB, TÜRKKEP, QNB eSolutions, KEPKUR, F.I.T., EDM ve Ark Dijital</strong>. Hangisinden alırsanız alın KEP'in <strong>hukuki geçerliliği aynıdır</strong>; farklar fiyat, kullanım paneli, entegrasyon ve destek tarafındadır. Sağlayıcıyı KEP adresinizin uzantısından anlayabilirsiniz: örneğin <strong>hs01.kep.tr PTT</strong>, <strong>hs03.kep.tr TÜRKKEP</strong>'tir.",
    citations: [
      { name: "BTK — Kayıtlı Elektronik Posta Hizmet Sağlayıcıları", url: "https://www.btk.gov.tr/kayitli-elektronik-posta-hizmet-saglayicilar" },
      { name: "6102 sayılı Türk Ticaret Kanunu (md. 18/3)", url: "https://www.mevzuat.gov.tr/mevzuatmetin/1.5.6102.pdf" },
      { name: "7201 sayılı Tebligat Kanunu (md. 7/a)", url: "https://www.mevzuat.gov.tr/mevzuatmetin/1.3.7201.pdf" }
    ],
    mentions: ["kep", "kephs", "btk"],
    faq: [
      { q: "KEP hizmeti veren firmalar hangileri?", a: "BTK'nın listesine göre Ekim 2026 itibarıyla faaliyette olan KEP hizmet sağlayıcıları PTT, TNB Bilişim, TÜRKKEP, QNB eSolutions, KEPKUR, F.I.T. Bilgi İşlem, EDM Bilişim ve Ark Dijital'dir. Intertech ve Mikro Yazılımevi faaliyetlerine son vermiştir." },
      { q: "TÜRKKEP nedir?", a: "TÜRKKEP Kayıtlı Elektronik Posta Hizmet Sağlayıcılığı ve Ticaret A.Ş., BTK tarafından yetkilendirilmiş bir KEP hizmet sağlayıcısıdır. 2013'ten beri faaliyettedir ve adres uzantısı hs03.kep.tr'dir." },
      { q: "PTT KEP ile TÜRKKEP arasında hukuki fark var mı?", a: "Hayır. BTK yetkili tüm KEP sağlayıcılarından alınan KEP hesapları aynı mevzuata tabidir ve aynı hukuki geçerliliğe sahiptir. Farklar fiyat, panel, depolama, entegrasyon ve destek gibi hizmet özelliklerindedir." },
      { q: "KEP adresimin hangi sağlayıcıda olduğunu nasıl anlarım?", a: "KEP adresinizin @ işaretinden sonraki uzantısına bakın: hs01.kep.tr PTT, hs02.kep.tr TNB, hs03.kep.tr TÜRKKEP, hs05.kep.tr QNB eSolutions, hs06.kep.tr KEPKUR, hs07.kep.tr F.I.T., hs09.kep.tr EDM, hs10.kep.tr Ark Dijital'e aittir." },
      { q: "KEP sağlayıcımı değiştirebilir miyim?", a: "Evet, başka bir yetkili sağlayıcıdan yeni hesap açabilirsiniz. Ancak adresinizin uzantısı değişeceği için yeni KEP adresinizi yazıştığınız kurumlara ve ilgili sicillere bildirmeniz gerekir." }
    ],
    body: `
      <h2>KEP Hizmet Sağlayıcısı (KEPHS) Nedir?</h2>
      <p>KEP hesabı, e-posta gibi herhangi bir firmadan açılamaz. Yalnızca <strong>Bilgi Teknolojileri ve İletişim Kurumu (BTK)</strong> tarafından yetkilendirilmiş <strong>Kayıtlı Elektronik Posta Hizmet Sağlayıcıları (KEPHS)</strong> KEP hesabı açabilir. Bu sağlayıcılar gönderim ve teslim kayıtlarını hukuken delil olacak şekilde tutar.</p>

      <h2>BTK Yetkili KEP Sağlayıcıları Listesi (Ekim 2026)</h2>
      <p>BTK'nın resmi listesindeki sağlayıcılar ve KEP adresi uzantıları:</p>
      <table class="price-table">
        <thead><tr><th>Sağlayıcı</th><th>Adres uzantısı</th><th>Faaliyete başlama</th><th>Durum</th></tr></thead>
        <tbody>
          <tr><td>PTT (Posta ve Telgraf Teşkilatı A.Ş.)</td><td>hs01.kep.tr</td><td>2012</td><td>Faaliyette</td></tr>
          <tr><td>TNB Bilişim</td><td>hs02.kep.tr</td><td>2012</td><td>Faaliyette</td></tr>
          <tr><td>TÜRKKEP</td><td>hs03.kep.tr</td><td>2013</td><td>Faaliyette</td></tr>
          <tr><td>Intertech</td><td>hs04.kep.tr</td><td>2014</td><td>Faaliyete son verdi (2023)</td></tr>
          <tr><td>QNB eSolutions</td><td>hs05.kep.tr</td><td>2015</td><td>Faaliyette</td></tr>
          <tr><td>KEPKUR</td><td>hs06.kep.tr</td><td>2015</td><td>Faaliyette</td></tr>
          <tr><td>F.I.T. Bilgi İşlem</td><td>hs07.kep.tr</td><td>2015</td><td>Faaliyette</td></tr>
          <tr><td>Mikro Yazılımevi</td><td>hs08.kep.tr</td><td>2016</td><td>Faaliyete son verdi (2022)</td></tr>
          <tr><td>EDM Bilişim (EDM KEP)</td><td>hs09.kep.tr</td><td>2022</td><td>Faaliyette</td></tr>
          <tr><td>Ark Dijital</td><td>hs10.kep.tr</td><td>2026</td><td>Faaliyette</td></tr>
        </tbody>
      </table>
      <p>Liste zaman zaman değişir; en güncel hali için <a href="https://www.btk.gov.tr/kayitli-elektronik-posta-hizmet-saglayicilar" target="_blank" rel="noopener nofollow">BTK'nın sayfasına</a> bakabilirsiniz.</p>
${cta({ compact: true, title: "Hangi sağlayıcıyı seçeceğinize karar veremediniz mi?", desc: "Kullanım şeklinizi yazın, KEP başvurunuzu birlikte planlayalım.", msg: KEP_MSG, btn: "Danış" })}
      <h2>Sık Aranan Sağlayıcılar Kısaca</h2>
      <ul>
        <li><strong>PTT KEP:</strong> Posta ve Telgraf Teşkilatı'nın KEP hizmetidir; ilk yetkilendirilen sağlayıcıdır (hs01). PTT ayrıca kanuni elektronik tebligatların yapıldığı UETS sistemini de işletir; ikisi farklı hizmetlerdir.</li>
        <li><strong>TÜRKKEP:</strong> 2013'ten beri faaliyette olan özel KEP sağlayıcısıdır (hs03). "TÜRKKEP'ten mesaj geldi" diye arama yapanlar genellikle kendilerine KEP üzerinden bir bildirim ulaştığını görür.</li>
        <li><strong>TNB KEP:</strong> Türkiye Noterler Birliği iştiraki TNB Bilişim tarafından sunulur (hs02).</li>
        <li><strong>EDM KEP:</strong> EDM Bilişim'in 2022'de faaliyete başlayan KEP hizmetidir (hs09).</li>
      </ul>

      <h2>Hukuki Geçerlilik Fark Eder mi?</h2>
      <p><strong>Hayır.</strong> Tüm yetkili sağlayıcılar aynı mevzuata tabidir. TTK 18/3 kapsamındaki ihtarlar veya kurumlarla yazışmalar için hangi sağlayıcıdan aldığınızın hukuki bir önemi yoktur; farklı sağlayıcılardaki KEP adresleri birbirine yazışabilir.</p>

      <h2>Sağlayıcı Seçerken Nelere Bakmalı?</h2>
      <ul>
        <li><strong>Fiyat ve paket yapısı:</strong> Yıllık ücret, ileti adedi ve depolama kotası sağlayıcıya göre değişir.</li>
        <li><strong>Kullanım kolaylığı:</strong> Web paneli, mobil uygulama ve bildirim seçenekleri.</li>
        <li><strong>Entegrasyon:</strong> Muhasebe veya belge yönetim yazılımınızla bağlantı imkanı.</li>
        <li><strong>Saklama süresi:</strong> Gönderilen ve alınan iletilerin ne kadar süre arşivlendiği.</li>
        <li><strong>Destek:</strong> Kurulum, e-imza ile giriş ve sorun anında ulaşılabilirlik.</li>
      </ul>
      <p>KEP hesabına giriş ve ileti göndermek için çoğunlukla <a href="e-imza-nedir-nasil-alinir">nitelikli e-imza</a> kullanılır. Bu yüzden KEP ve e-imzayı birlikte planlamak işinizi kolaylaştırır.</p>

      <h2>Sağlayıcı Değiştirmek Mümkün mü?</h2>
      <p>Evet, istediğiniz zaman başka bir yetkili sağlayıcıdan yeni KEP hesabı açabilirsiniz. Ancak adres uzantısı sağlayıcıya özel olduğu için <strong>KEP adresiniz değişir</strong>. Yeni adresinizi yazıştığınız kurumlara, müşterilerinize ve ilgili kayıtlara bildirmeyi unutmayın. KEP zorunluluğunun kimleri kapsadığını <a href="kep-adresi-kimlere-zorunlu">KEP Adresi Kimlere Zorunlu?</a> yazımızda anlattık.</p>

      <h2>Sık Sorulan Sorular</h2>
`,
    endCta: { eyebrow: "KEP Başvurusu", title: "KEP başvurunuzu biz takip edelim", desc: "Şirket belgelerinizi WhatsApp'tan iletin; size uygun paketi birlikte seçip başvuruyu baştan sona takip edelim. KEP girişinde kullanacağınız e-imzayı da aynı süreçte hazırlayabiliriz.", msg: KEP_MSG, btn: "WhatsApp ile Yaz", ghost: { href: "../kep", text: "KEP Hizmeti" } },
    related: [
      { slug: "kep-nedir-kimler-almak-zorunda", title: "KEP Adresi Nedir?" },
      { slug: "kep-adresi-kimlere-zorunlu", title: "KEP Adresi Kimlere Zorunlu?" },
      { slug: "e-imza-nedir-nasil-alinir", title: "E-İmza Nedir? Nasıl Alınır?" }
    ]
  }
];
