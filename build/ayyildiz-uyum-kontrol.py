# -*- coding: utf-8 -*-
"""AYYILDIZ IMZA talimati (07.10.2026) 49 madde dogrulama raporu. Kullanim: python build/ayyildiz-uyum-kontrol.py"""
import re, glob, html, io, sys, os
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding="utf-8")
os.chdir(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
L = lambda f: open(f, encoding="utf-8").read()
FULL = "AYYILDIZ İMZA BİLGİ GÜVENLİĞİ VE TEKNOLOJİLERİ A.Ş."
UMAY = "UMAY TÜM BİLİŞİM VE EĞİTİM DAN. YAZILIM İTH. İHR. SAN. TİC. LTD. ŞTİ."
pages = [f for f in glob.glob("*.html") + glob.glob("blog/*.html") + glob.glob("iller/*.html") if "<footer" in L(f)]
blogs = glob.glob("blog/*.html"); iller = glob.glob("iller/*.html")
ALL = pages + ["llms.txt", "llms-full.txt"]
txt = lambda s: re.sub(r"\s+", " ", html.unescape(re.sub(r"<[^>]+>", "", s)))
R = []
def ok(n, d, c, det=""): R.append((n, bool(c), d, det))

PDF1 = (f"{UMAY} (e-imzasatinal.com.tr), {FULL}'nin bayisi / başvuru noktasıdır. Nitelikli Elektronik Sertifikalar "
        "ile askı ve iptal dahil tüm sertifika hizmetleri AYYILDIZ İMZA tarafından sunulmaktadır.")
def bar(f):
    t = L(f); m = re.search(r'<div class="dealer-bar".*?</div></div>', t, re.S)
    return bool(m) and PDF1 in txt(m.group(0)) and "ayyildizimza.com.tr" in m.group(0) and "elektronik-sertifika-hizmet-saglayicilari" in m.group(0) and t.find("dealer-bar") < t.find("site-header")
def foot(f):
    t = L(f); i = t.find("<footer"); ft = t[i:t.find("</footer>", i)]
    return PDF1 in txt(ft) and "elektronik-sertifika-hizmet-saglayicilari" in ft
n = sum(bar(f) for f in pages); ok(1, "Üst bant (birebir metin, 2 link, header üstünde)", n == len(pages), f"{n}/{len(pages)}")
n = sum(foot(f) for f in pages); ok(2, "Footer bayilik cümlesi (birebir)", n == len(pages), f"{n}/{len(pages)}")
n = sum(L(f).count("yetkili satıcınız") for f in pages); ok(2, "Eski footer cümlesi kalmadı", n == 0, str(n))
n = sum(len(re.findall(r"Ayyıldız Bilgi Güvenliği", L(f))) for f in ALL); ok(3, "Eski unvan kalmadı", n == 0, str(n))
n = sum(len(re.findall(r"(?i)yetkili\s+(bayi|satıcı)|orijinal", L(f))) for f in ALL); ok(4, "'yetkili / orijinal' kalmadı", n == 0, str(n))
n = sum(len(re.findall(r"(?i)BTK[^.<\n]{0,25}lisans|lisans verir|lisanslandır|\b5\s+(lisanslı\s+)?(ESHS|Elektronik Sertifika)", L(f))) for f in ALL)
ok(5, "'BTK lisanslı' / ESHS sayısı kalmadı", n == 0, str(n))

I = L("index.html")
ok(6, "Ana sayfa title", "<title>E-İmza ve KEP | UMAY TÜM BİLİŞİM — AYYILDIZ İMZA e-imza bayisi</title>" in I)
OGT = "E-İmza ve KEP — UMAY TÜM BİLİŞİM, AYYILDIZ İMZA e-imza bayisi — 81 İlde Hızlı Teslimat"
ok(7, "og:title + twitter:title", f'property="og:title" content="{OGT}"' in I and f'name="twitter:title" content="{OGT}"' in I)
ok(8, "Hero rozeti", '<span class="eyebrow">AYYILDIZ İMZA Bayisi</span>' in I)
ok(9, "Hero paragrafı", "Bireysel, firma ve kurumsal ihtiyaçlarınız için AYYILDIZ İMZA e-imza, zaman damgası ve e-mühür çözümleri ile KEP başvurusu. Uygun bayi fiyatı ve uçtan uca kurumsal destek." in I)
ok(10, "Hero rozet listesi 1. madde", "<span>AYYILDIZ İMZA Bayisi</span>" in I)
ok(11, "'E-imza nedir?' cevabı + md.5 istisnası", "Güvenli elektronik imza, elle atılan imza ile aynı hukukî sonucu doğurur" in txt(I) and "teminat sözleşmeleri, güvenli elektronik imza ile gerçekleştirilemez" in I)
ok(12, "'Nereden alınır?' cevabı", "UMAY TÜM BİLİŞİM, AYYILDIZ İMZA bayisi olarak 81 ile kargo ile hizmet verir." in I and "BTK tarafından yetkilendirilmiş Elektronik Sertifika Hizmet Sağlayıcılarından (güncel liste:" in I)
ok(13, "'Neden Biz' kartı", "<h3>AYYILDIZ İMZA Bayisi</h3>" in I and f"Nitelikli Elektronik Sertifikalar {FULL} tarafından üretilir. Faturanız ve sertifikanız eksiksiz teslim edilir." in I)
ok(14, "'Kolay Yenileme' kartı", "Yenileme başvurunuzu WhatsApp üzerinden kolayca iletebilirsiniz." in I and "birkaç dakikada" not in I)
ok(15, "'3 Adımda' 2. adım", "başvurunuzu AYYILDIZ İMZA'ya iletelim. Kimlik doğrulama ve sertifika üretimi AYYILDIZ İMZA tarafından gerçekleştirilir." in I)
n = sum((f"Tüm hakları saklıdır. AYYILDIZ İMZA markası {FULL}'ye aittir." in L(f) and UMAY in txt(L(f)[L(f).find("footer-bottom"):])) for f in pages)
ok(16, "Telif satırı (tüm sayfalar)", n == len(pages), f"{n}/{len(pages)}")

E = L("e-imza.html")
ok(17, "/e-imza title", "<title>E-İmza Satın Al — AYYILDIZ İMZA Bayisi | UMAY TÜM BİLİŞİM</title>" in E)
ok(18, "/e-imza 'Nedir?' paragrafı", "5070 sayılı Elektronik İmza Kanunu'nun 5. maddesi uyarınca elle atılan imza ile aynı hukukî sonucu doğurur" in E and f"BTK tarafından yetkilendirilmiş ESHS olan {FULL} tarafından üretilmektedir." in E and "ürettiği NES ürünleri" not in E)
ok(19, "/e-imza başvuru 2. adım", "<h3>Başvuru İletimi</h3><p>Başvurunuzu AYYILDIZ İMZA'ya iletiyoruz; kimlik doğrulama ve sertifika üretimi AYYILDIZ İMZA tarafından gerçekleştirilir.</p>" in E and "Ayyıldız sistemi" not in E)

H = L("hakkimizda.html")
ok(20, "Hakkımızda title/meta/og/twitter", "<title>Hakkımızda — AYYILDIZ İMZA Bayisi | UMAY TÜM BİLİŞİM</title>" in H and 'content="UMAY TÜM BİLİŞİM: Ayyıldız e-imza bayisi.' in H and 'property="og:title" content="Hakkımızda — AYYILDIZ İMZA Bayisi"' in H and 'name="twitter:title" content="Hakkımızda — AYYILDIZ İMZA Bayisi"' in H)
ok(21, "Hakkımızda hero", "<h1>AYYILDIZ İMZA Bayiniz</h1>" in H)
ok(22, "'Kim Olduğumuz' son cümle", f"{FULL}'nin bayisi olarak Nitelikli Elektronik Sertifika başvurularınızı alır ve AYYILDIZ İMZA'ya iletiriz; kimlik doğrulama ve sertifika üretimi AYYILDIZ İMZA tarafından gerçekleştirilir." in H)
ok(23, "'Ayyıldız Hakkında' paragrafı (KEPHS/HSM yok)", f"{FULL}, 5070 sayılı Elektronik İmza Kanunu kapsamında Bilgi Teknolojileri ve İletişim Kurumu (BTK) tarafından yetkilendirilmiş bir Elektronik Sertifika Hizmet Sağlayıcısıdır" in H and "Nitelikli elektronik sertifika, zaman damgası ve e-mühür hizmetleri sunar." in H and "KEPHS" not in H)
ok(24, "Vizyon", "en güvenilir ve en erişilebilir bayi ağlarından biri olmak." in H)
ok(25, "'Neden Bizi' 1. madde", "<strong>AYYILDIZ İMZA bayisi:</strong> başvurularınız doğrudan AYYILDIZ İMZA'ya iletilir." in H)

S = L("sertifika-ilkeleri.html")
ok(26, "Sİ meta description", f'name="description" content="{FULL} Nitelikli Elektronik Sertifika İlkeleri, Uygulama Esasları ve zaman damgası belgeleri."' in S)
ok(27, "Sİ rozet + alt başlık", '<span class="eyebrow">ESHS Belgeleri</span>' in S and f"{FULL} tarafından yayımlanan nitelikli elektronik sertifika ve zaman damgası belgeleri." in S and "Resmi Belgeler" not in S)
ok(28, "Sİ 'Bu Belgeler Nedir?' ilk cümle", "Sertifika İlkeleri (Sİ) ve Uygulama Esasları (UE), Elektronik Sertifika Hizmet Sağlayıcılarının (ESHS) 5070 sayılı Kanun ve ilgili mevzuat uyarınca yayımladığı ve uymakla yükümlü olduğu belgelerdir." in txt(S))
ok(29, "Sİ kart alt yazıları, 'resmi belge' yok, yerel PDF yok", f"Sürüm 2 &bull; PDF &bull; {FULL}" in S and "resmi belge" not in S and not re.search(r'href="(?!https?://)[^"]+\.pdf"', S))
ok(30, "Sİ arşiv bölümü silindi", "Önceki Sürümler" not in S and "Nesi_Surum1" not in S and "Nesue_Surum1" not in S)
ok(31, "Sİ alt CTA", "AYYILDIZ İMZA bayisi olarak hizmetinizdeyiz." in S)

Q = L("sss.html")
ok(32, "SSS 'kaybedersem'", "Askı ve iptal işlemleri AYYILDIZ İMZA tarafından yapılır." in Q and "Derhal bize bildirin" not in Q)
ok(33, "SSS 'diğer markalardan farkı'", "Tüm ESHS'lerin ürettiği nitelikli elektronik sertifikalar aynı hukukî sonucu doğurur; kamu ve özel sektör uygulamalarıyla uyumludur." in Q and "Fiyat/performans" not in Q)

K = L("karsilastir.html")
ok(34, "Karşılaştır: ESHS tablosu, tavsiye kutusu, içindekiler linki silindi", "eshs-karsilastirma" not in K and "Lisanslı 5" not in K and "5 ESHS" not in K and "Bireysel/firma için Ayyıldız" not in K)
head = K.split("</head>")[0]; hero = K[K.find("page-hero"):K.find("page-hero") + 1500]
ok(35, "Karşılaştır: '4 Detaylı Tablo' + hero/meta/og/twitter'da ESHS atfı yok", "E-İmza Karşılaştırma — 4 Detaylı Tablo Tek Sayfada" in K and not re.search(r"ESHS", hero) and not re.search(r'<meta[^>]*(description|title|keywords)"[^>]*ESHS', head) and not re.search(r'"(description|headline)":\s*"[^"]*ESHS', head))
ok(36, "Karşılaştır: sözlük kartı", ">ESHS hakkında temel kavramlar ve mevzuat referansları." in K)

Z = L("sozluk.html")
ok(37, "Sözlük AYYILDIZ İMZA maddesi", "5070 sayılı Elektronik İmza Kanunu kapsamında BTK tarafından yetkilendirilmiş Elektronik Sertifika Hizmet Sağlayıcılarından biridir. Nitelikli Elektronik Sertifika (NES), e-mühür ve zaman damgası hizmetleri sunar. UMAY TÜM BİLİŞİM, AYYILDIZ İMZA bayisidir." in txt(Z) and "zaman damgası ve KEP hizmetleri" not in Z)
ok(38, "Sözlük AKİS", "TÜBİTAK BİLGEM tarafından geliştirilen, e-imza kartlarında kullanılan akıllı kart işletim sistemidir. E-imza kullanmadan önce kart sürücüsünün yüklenmesi gerekir." in txt(Z) and "Kart İzleme Sistemi" not in Z)
ok(39, "Sözlük ESHS maddesi (birebir)", "5070 sayılı Elektronik İmza Kanunu kapsamında BTK tarafından yetkilendirilmiş, Nitelikli Elektronik Sertifika üretmeye yetkili kuruluştur. Güncel liste: BTK ESHS listesi." in txt(Z) and 'Güncel liste: <a href="https://www.btk.gov.tr/elektronik-sertifika-hizmet-saglayicilari"' in Z and not re.search(r"Türkiye'de 5 ", Z))
ok(40, "Sözlük 'lisans' ailesi", not re.search(r"lisans", Z, re.I))

agg = {k: [] for k in range(41, 46)}
for f in iller:
    t = L(f); m = re.search(r"<title>(.*?) E-İmza ve KEP Satış", t); il = m.group(1) if m else "?"
    c = {41: f"<title>{il} E-İmza ve KEP Satış — UMAY TÜM BİLİŞİM - AYYILDIZ İMZA e-imza bayisi</title>" in t,
         42: f"{il} E-İmza ve KEP — UMAY TÜM BİLİŞİM - AYYILDIZ İMZA e-imza bayisi" in t and "her noktasında AYYILDIZ İMZA e-imza bayisi hizmeti" in t and "yetkili satıcı hizmeti" not in t,
         43: "AYYILDIZ İMZA bayisi olarak bu sektörlerdeki firmalara WhatsApp tabanlı hızlı destek sunar." in t or "bu sektörlerdeki firmalara WhatsApp" not in t,
         44: "zorunlu hale gelmiştir" not in t,
         45: f"<strong>AYYILDIZ İMZA bayisi:</strong> Nitelikli Elektronik Sertifikalar {FULL} tarafından üretilir." in t}
    for k, v in c.items():
        if not v: agg[k].append(f)
for k, fl in agg.items(): ok(k, f"İl sayfaları — madde {k}", not fl, f"{81 - len(fl)}/81 {fl[:3]}")

G = L("ilgili-kurum-linkleri.html")
ok(46, "İlgili kurum: AYYILDIZ İMZA kartı + link", f"{FULL}</div>" in G and "BTK tarafından yetkilendirilmiş ESHS — bayisi olduğumuz hizmet sağlayıcı" in G and "çözüm ortağımız" not in G and 'href="https://www.ayyildizimza.com.tr/"' in G)
B = L("blog/e-imza-nedir-nasil-alinir.html")
ok(47, "Blog ÖZET son iki cümle", "<strong>Nasıl alınır?</strong> BTK tarafından yetkilendirilmiş bir ESHS'den veya bayisinden alınır. UMAY TÜM BİLİŞİM, AYYILDIZ İMZA bayisi olarak 81 ile WhatsApp tabanlı 1-3 iş günü teslimat sunar." in B)
ok(48, "Blog yasal dayanak 4. madde (bir kez)", B.count("güvenli elektronik imza ile gerçekleştirilemez. (5070 sayılı Kanun md. 5)</li>") == 1)
bad49 = [f for f in blogs if not (f"{FULL} bayisi olarak" in L(f) and "✓ AYYILDIZ İMZA Bayisi" in L(f) and "BTK Mevzuat Uyumlu" not in L(f))]
ok(49, "Yazar kutusu (tüm bloglar)", not bad49, f"{len(blogs) - len(bad49)}/{len(blogs)} {bad49[:3]}")

for n, c, d, det in R: print(f"{'✅' if c else '❌'} {n:>2}  {d}  {det}")
print(f"\nEKSİK: {sum(not r[1] for r in R)} / {len(R)} kontrol")
