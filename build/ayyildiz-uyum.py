# -*- coding: utf-8 -*-
"""
AYYILDIZ IMZA duzeltme talimatlari (07.10.2026) uyum scripti.
Kaynak: e-imzasatinal.com.tr-Duzeltme-Talimatlari.pdf (49 madde).

Sira: (A) sayfaya ozel maddeler -> (B) site geneli bant/footer/telif -> (C) toplu dil kurallari
      -> (D) il sayfasi dilbilgisi -> (E) rapor.
Idempotent: tekrar calistirildiginda degisiklik yapmaz.
Kullanim: python build/ayyildiz-uyum.py
"""
import re, os, glob, io, sys

sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding="utf-8")
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
os.chdir(ROOT)

FULL = "AYYILDIZ İMZA BİLGİ GÜVENLİĞİ VE TEKNOLOJİLERİ A.Ş."
UMAY_FULL = "UMAY TÜM BİLİŞİM VE EĞİTİM DAN. YAZILIM İTH. İHR. SAN. TİC. LTD. ŞTİ."
AY_URL = "https://www.ayyildizimza.com.tr/"
BTK_ESHS = "https://www.btk.gov.tr/elektronik-sertifika-hizmet-saglayicilari"
BTK_LINK = f'<a href="{BTK_ESHS}" target="_blank" rel="noopener">BTK ESHS listesi</a>'
CAVEAT = ("Kanunların resmî şekle veya özel bir merasime tabi tuttuğu hukukî işlemler ile banka teminat mektupları "
          "ve Türkiye'de yerleşik sigorta şirketleri tarafından düzenlenen kefalet senetleri dışındaki teminat sözleşmeleri, "
          "güvenli elektronik imza ile gerçekleştirilemez.")

DEALER_HTML = (f'{UMAY_FULL} (e-imzasatinal.com.tr), '
               f'<a href="{AY_URL}" target="_blank" rel="noopener" class="dealer-name">{FULL}</a>\'nin bayisi / başvuru noktasıdır. '
               f'Nitelikli Elektronik Sertifikalar ile askı ve iptal dahil tüm sertifika hizmetleri '
               f'<a href="{AY_URL}" target="_blank" rel="noopener" class="dealer-name">AYYILDIZ İMZA</a> tarafından sunulmaktadır. '
               f'{BTK_LINK}')
DEALER_TEXT = (f"{UMAY_FULL} (e-imzasatinal.com.tr), {FULL}'nin bayisi / başvuru noktasıdır. "
               f"Nitelikli Elektronik Sertifikalar ile askı ve iptal dahil tüm sertifika hizmetleri AYYILDIZ İMZA tarafından sunulmaktadır.")
BAR = f'<div class="dealer-bar" role="note"><div class="container"><p>{DEALER_HTML}</p></div></div>'
COPYRIGHT_TAIL = f"Tüm hakları saklıdır. AYYILDIZ İMZA markası {FULL}'ye aittir."

REPORT = {"ok": 0, "miss": []}
changed_files = set()

def load(p): return open(p, encoding="utf-8").read()
def save(p, t):
    open(p, "w", encoding="utf-8", newline="").write(t); changed_files.add(p)

def rep(path, old, new, regex=False, count=0, required=True, flags=0):
    t = load(path)
    if regex:
        t2, n = re.subn(old, new, t, count=count, flags=flags)
    else:
        n = t.count(old); t2 = t.replace(old, new) if count == 0 else t.replace(old, new, count)
    if n == 0:
        if required and (regex or new not in t):
            REPORT["miss"].append(f"{path}: {old[:70]!r}")
        return 0
    if t2 != t: save(path, t2)
    REPORT["ok"] += 1
    return n

def meta(path, attr, key, val):
    rep(path, rf'<meta {attr}="{re.escape(key)}" content="[^"]*">', f'<meta {attr}="{key}" content="{val}">', regex=True, count=1)

# ---------------------------------------------------------------- (A) SAYFAYA OZEL
# --- Ana sayfa (6-15)
P = "index.html"
rep(P, r"<title>[^<]*</title>", "<title>E-İmza ve KEP | UMAY TÜM BİLİŞİM — AYYILDIZ İMZA e-imza bayisi</title>", regex=True, count=1)
OGT = "E-İmza ve KEP — UMAY TÜM BİLİŞİM, AYYILDIZ İMZA e-imza bayisi — 81 İlde Hızlı Teslimat"
meta(P, "property", "og:title", OGT); meta(P, "name", "twitter:title", OGT)
DESC = "UMAY TÜM BİLİŞİM, AYYILDIZ İMZA e-imza bayisi: 1 yıl 3.000 TL, 3 yıl 4.000 TL (KDV dahil). WhatsApp'tan evden başvuru, uzaktan kurulum. KEP başvurusu da yapılır."
meta(P, "name", "description", DESC); meta(P, "property", "og:description", DESC); meta(P, "name", "twitter:description", DESC)
rep(P, '<span class="eyebrow">Ayyıldız Yetkili Satıcısı</span>', '<span class="eyebrow">AYYILDIZ İMZA Bayisi</span>')
rep(P, r"Bireysel, firma ve kurumsal ihtiyaçlarınız için orijinal Ayyıldız e-imza, KEP, zaman damgası ve e-mühür çözümleri\.[^<]*</p>",
    "Bireysel, firma ve kurumsal ihtiyaçlarınız için AYYILDIZ İMZA e-imza, zaman damgası ve e-mühür çözümleri ile KEP başvurusu. Uygun bayi fiyatı ve uçtan uca kurumsal destek.</p>", regex=True)
rep(P, "<span>Orijinal &amp; Yetkili</span>", "<span>AYYILDIZ İMZA Bayisi</span>")
rep(P, r"ile düzenlenmiştir ve <strong>ıslak imza ile aynı hukuki sonucu doğurur</strong>\.",
    f"ile düzenlenmiştir. <strong>Güvenli elektronik imza, elle atılan imza ile aynı hukukî sonucu doğurur</strong>; {CAVEAT[0].lower() + CAVEAT[1:]}", regex=True)
rep(P, r"Türkiye'de e-imza, BTK lisanslı <strong>5 Elektronik Sertifika Hizmet Sağlayıcısı'ndan</strong> \([^)]*\) veya yetkili bayilerinden alınır\.[^<]*",
    f"Türkiye'de e-imza, 5070 sayılı Elektronik İmza Kanunu kapsamında BTK tarafından yetkilendirilmiş Elektronik Sertifika Hizmet Sağlayıcılarından (güncel liste: {BTK_LINK}) veya bunların bayilerinden alınır. UMAY TÜM BİLİŞİM, AYYILDIZ İMZA bayisi olarak 81 ile kargo ile hizmet verir.", regex=True)
rep(P, r"<h3>Orijinal &amp; Yetkili Ürün</h3>\s*<p>[^<]*</p>",
    f"<h3>AYYILDIZ İMZA Bayisi</h3>\n            <p>Nitelikli Elektronik Sertifikalar {FULL} tarafından üretilir. Faturanız ve sertifikanız eksiksiz teslim edilir.</p>", regex=True)
rep(P, "Süresi dolan e-imzanızı WhatsApp üzerinden birkaç dakikada yenileyebilirsiniz.", "Yenileme başvurunuzu WhatsApp üzerinden kolayca iletebilirsiniz.")
rep(P, "Kimlik fotoğrafı ve gerekli belgeleri gönderin, başvurunuzu biz oluşturalım.",
    "Kimlik fotoğrafı ve gerekli belgeleri gönderin, başvurunuzu AYYILDIZ İMZA'ya iletelim. Kimlik doğrulama ve sertifika üretimi AYYILDIZ İMZA tarafından gerçekleştirilir.")
rep(P, "Ayyıldız'ın orijinal ürün yelpazesi ile", "AYYILDIZ İMZA ürün yelpazesi ile")
rep(P, '"description": "BTK lisanslı Elektronik Sertifika Hizmet Sağlayıcısı"', '"description": "5070 sayılı Kanun kapsamında BTK tarafından yetkilendirilmiş Elektronik Sertifika Hizmet Sağlayıcısı"')
rep(P, '"description": "BTK lisanslı 5 ESHS\'den biri"', '"description": "5070 sayılı Kanun kapsamında BTK tarafından yetkilendirilmiş ESHS"')

# --- /e-imza (17-19)
P = "e-imza.html"
rep(P, r"<title>[^<]*</title>", "<title>E-İmza Satın Al — AYYILDIZ İMZA Bayisi | UMAY TÜM BİLİŞİM</title>", regex=True, count=1)
rep(P, r"<p>[^<]*Ayyıldız Bilgi Güvenliği A\.Ş\. ürettiği NES ürünleri ile ESHS \(Elektronik Sertifika Hizmet Sağlayıcısı\) olarak BTK tarafından yetkilendirilmiştir\.</p>",
    f"<p>Güvenli elektronik imza, 5070 sayılı Elektronik İmza Kanunu'nun 5. maddesi uyarınca elle atılan imza ile aynı hukukî sonucu doğurur. {CAVEAT} "
    f"Nitelikli Elektronik Sertifikalar, 5070 sayılı Elektronik İmza Kanunu kapsamında BTK tarafından yetkilendirilmiş ESHS olan {FULL} tarafından üretilmektedir.</p>", regex=True)
rep(P, '<div class="step"><h3>Başvuru Onayı</h3><p>Ayyıldız sistemi üzerinden başvurunuzu oluşturuyoruz.</p></div>',
    '<div class="step"><h3>Başvuru İletimi</h3><p>Başvurunuzu AYYILDIZ İMZA\'ya iletiyoruz; kimlik doğrulama ve sertifika üretimi AYYILDIZ İMZA tarafından gerçekleştirilir.</p></div>')
rep(P, r'"name": "Başvuru Onayı",\s*"text": "[^"]*"',
    '"name": "Başvuru İletimi", "text": "Başvurunuzu AYYILDIZ İMZA\'ya iletiyoruz; kimlik doğrulama ve sertifika üretimi AYYILDIZ İMZA tarafından gerçekleştirilir."', regex=True)

# --- /hakkimizda (20-25)
P = "hakkimizda.html"
rep(P, r"<title>[^<]*</title>", "<title>Hakkımızda — AYYILDIZ İMZA Bayisi | UMAY TÜM BİLİŞİM</title>", regex=True, count=1)
rep(P, "UMAY TÜM BİLİŞİM: Ayyıldız e-imza ve KEP yetkili satıcısı.", "UMAY TÜM BİLİŞİM: Ayyıldız e-imza bayisi.")
meta(P, "property", "og:title", "Hakkımızda — AYYILDIZ İMZA Bayisi"); meta(P, "name", "twitter:title", "Hakkımızda — AYYILDIZ İMZA Bayisi")
rep(P, "<h1>Ayyıldız Yetkili Satıcınız</h1>", "<h1>AYYILDIZ İMZA Bayiniz</h1>")
rep(P, r"Ayyıldız Bilgi Güvenliği A\.Ş\.'nin <strong>yetkili satıcısı</strong> olarak, tüm ürünlerini orijinal kaynağından, yetkili bayi fiyatlarıyla ve kurumsal destek güvencesiyle temin ediyoruz\.",
    f"{FULL}'nin bayisi olarak Nitelikli Elektronik Sertifika başvurularınızı alır ve AYYILDIZ İMZA'ya iletiriz; kimlik doğrulama ve sertifika üretimi AYYILDIZ İMZA tarafından gerçekleştirilir.", regex=True)
rep(P, r"<p>Ayyıldız Bilgi Güvenliği A\.Ş\., Bilgi Teknolojileri ve İletişim Kurumu \(BTK\) tarafından yetkilendirilmiş[^<]*</p>",
    f"<p>{FULL}, 5070 sayılı Elektronik İmza Kanunu kapsamında Bilgi Teknolojileri ve İletişim Kurumu (BTK) tarafından yetkilendirilmiş bir Elektronik Sertifika Hizmet Sağlayıcısıdır ({BTK_LINK}). Nitelikli elektronik sertifika, zaman damgası ve e-mühür hizmetleri sunar.</p>", regex=True)
rep(P, "en güvenilir ve en erişilebilir yetkili satıcı ağlarından biri olmak.", "en güvenilir ve en erişilebilir bayi ağlarından biri olmak.")
rep(P, "<li><strong>Yetkili bayi:</strong> Ayyıldız ile direkt kurumsal bağlantı.</li>", "<li><strong>AYYILDIZ İMZA bayisi:</strong> başvurularınız doğrudan AYYILDIZ İMZA'ya iletilir.</li>")

# --- /sertifika-ilkeleri (26-31)
P = "sertifika-ilkeleri.html"
meta(P, "name", "description", f"{FULL} Nitelikli Elektronik Sertifika İlkeleri, Uygulama Esasları ve zaman damgası belgeleri.")
rep(P, '<span class="eyebrow">Resmi Belgeler</span>', '<span class="eyebrow">ESHS Belgeleri</span>')
rep(P, "BTK yetkili Elektronik Sertifika Hizmet Sağlayıcılarının (ESHS) uymakla yükümlü olduğu resmi belgelerdir.",
    "Elektronik Sertifika Hizmet Sağlayıcılarının (ESHS) 5070 sayılı Kanun ve ilgili mevzuat uyarınca yayımladığı ve uymakla yükümlü olduğu belgelerdir.")
rep(P, "Sürüm 2.0 &bull; PDF &bull; Ayyıldız Bilgi Güvenliği A.Ş.", f"Sürüm 2 &bull; PDF &bull; {FULL}")
rep(P, "(Güncel — Sürüm 2.0)", "(Güncel — Sürüm 2)", required=False)
rep(P, r"\bresmi belge\.", "belge.", regex=True)
rep(P, r'<div class="doc-section">\s*<div class="doc-section__title">Arşiv — Önceki Sürümler \(Sürüm 1\.0\)</div>.*?</div>\s*</div>\s*</div>(?=\s*(?:<div class="doc-section">|</div>))',
    "", regex=True, flags=re.S)
rep(P, "Ayyıldız yetkili satıcısı olarak en uygun fiyat ve hızlı teslim garantisi ile hizmetinizdeyiz.", "AYYILDIZ İMZA bayisi olarak hizmetinizdeyiz.")

# --- /sss (32-33)
P = "sss.html"
KAYIP = (f"Sertifikanızın askıya alınması veya iptali için derhal AYYILDIZ İMZA'ya başvurun (iletişim bilgileri: "
         f"<a href=\"{AY_URL}\" target=\"_blank\" rel=\"noopener\">{AY_URL}</a>); dilerseniz bize de bilgi verebilirsiniz. "
         f"Askı ve iptal işlemleri AYYILDIZ İMZA tarafından yapılır.")
KAYIP_TXT = (f"Sertifikanızın askıya alınması veya iptali için derhal AYYILDIZ İMZA'ya başvurun (iletişim bilgileri: {AY_URL}); "
             f"dilerseniz bize de bilgi verebilirsiniz. Askı ve iptal işlemleri AYYILDIZ İMZA tarafından yapılır.")
rep(P, r'(E-imza kartımı kaybedersem ne olur\?</button><div class="faq-a"><div>)Derhal bize bildirin\.[^<]*', r"\g<1>" + KAYIP.replace("\\", "\\\\"), regex=True)
rep(P, r'("name":\s*"E-imza kartımı kaybedersem ne olur\?",\s*"acceptedAnswer":\s*\{\s*"@type":\s*"Answer",\s*"text":\s*")[^"]*', r"\g<1>" + KAYIP_TXT, regex=True, required=False)
FARK = (f"AYYILDIZ İMZA, 5070 sayılı Elektronik İmza Kanunu kapsamında BTK tarafından yetkilendirilmiş ESHS'lerden biridir ({BTK_LINK}). "
        "Tüm ESHS'lerin ürettiği nitelikli elektronik sertifikalar aynı hukukî sonucu doğurur; kamu ve özel sektör uygulamalarıyla uyumludur.")
FARK_TXT = ("AYYILDIZ İMZA, 5070 sayılı Elektronik İmza Kanunu kapsamında BTK tarafından yetkilendirilmiş ESHS'lerden biridir. "
            "Tüm ESHS'lerin ürettiği nitelikli elektronik sertifikalar aynı hukukî sonucu doğurur; kamu ve özel sektör uygulamalarıyla uyumludur.")
rep(P, r'(diğer markalardan farkı nedir\?</button><div class="faq-a"><div>)Ayyıldız, BTK yetkili ESHS[^<]*', r"\g<1>" + FARK, regex=True)
rep(P, r'("name":\s*"Ayyıldız e-imzası diğer markalardan farkı nedir\?",\s*"acceptedAnswer":\s*\{\s*"@type":\s*"Answer",\s*"text":\s*")[^"]*', r"\g<1>" + FARK_TXT, regex=True, required=False)

# --- /karsilastir (34-36)
P = "karsilastir.html"
KARS_HAD_ESHS = 'id="eshs-karsilastirma"' in load(P)
rep(P, r"\s*<!-- TABLO 2: 5 ESHS KARŞILAŞTIRMASI -->\s*<section class=\"section section--alt\" id=\"eshs-karsilastirma\">.*?</section>", "", regex=True, flags=re.S)
rep(P, r'\s*<a href="#eshs-karsilastirma"[^>]*>[^<]*</a>', "", regex=True)
for a, b in ([] if not KARS_HAD_ESHS else [("3. E-İmza Paket Süreleri", "2. E-İmza Paket Süreleri"), ("4. Bireysel vs Firma", "3. Bireysel vs Firma"), ("5. KEP vs Normal", "4. KEP vs Normal"),
             ("3️⃣", "2️⃣"), ("4️⃣", "3️⃣"), ("5️⃣", "4️⃣"),
             ("Tablo 3:", "Tablo 2:"), ("Tablo 4:", "Tablo 3:"), ("Tablo 5:", "Tablo 4:")]):
    rep(P, a, b, required=False)
rep(P, "E-İmza Karşılaştırma — 5 Detaylı Tablo Tek Sayfada", "E-İmza Karşılaştırma — 4 Detaylı Tablo Tek Sayfada")
rep(P, "E-İmza Karşılaştırma Rehberi — 5 Detaylı Tablo", "E-İmza Karşılaştırma Rehberi — 4 Detaylı Tablo", required=False)
rep(P, r"<title>[^<]*</title>", "<title>E-İmza Karşılaştırma — Mobil İmza, Paketler, KEP | UMAY TÜM BİLİŞİM</title>", regex=True, count=1)
KD = "E-imza vs mobil imza, 1-2-3 yıllık paketler, bireysel/firma/mali mühür ve KEP vs e-posta. Karar verirken işinize yarayacak 4 detaylı tablo."
meta(P, "name", "description", KD); meta(P, "property", "og:description", KD); meta(P, "name", "twitter:description", KD)
meta(P, "property", "og:title", "E-İmza Karşılaştırma — Mobil İmza, Paketler, KEP"); meta(P, "name", "twitter:title", "E-İmza Karşılaştırma — 4 Tablo, Tek Sayfa")
rep(P, r"mobil imza ile fark, Türkiye'deki 5 ESHS, paket süreleri", "mobil imza ile fark, paket süreleri", regex=True)
rep(P, r"E-imza vs mobil imza, Türkiye'deki 5 ESHS karşılaştırması \([^)]*\), ", "E-imza vs mobil imza, ", regex=True)
rep(P, r",?\s*\{\s*\"@type\":\s*\"Question\",\s*\"name\":\s*\"[^\"]*\",\s*\"acceptedAnswer\":\s*\{\"@type\":\s*\"Answer\",\s*\"text\":\s*\"Türkiye'de BTK lisanslı 5 ESHS[^\"]*\"\s*\}\s*\}", "", regex=True)
rep(P, "5 ESHS hakkında temel kavramlar ve mevzuat referansları.", "ESHS hakkında temel kavramlar ve mevzuat referansları.")

# --- /ilgili-kurum-linkleri (46)
P = "ilgili-kurum-linkleri.html"
rep(P, r'(<a href=")[^"]*("[^>]*>\s*<div class="link-card__icon">⭐</div>\s*<div class="link-card__body">\s*<div class="link-card__name">)Ayyıldız Bilgi Güvenliği(</div>\s*<div class="link-card__desc">)BTK yetkili ESHS &amp; KEPHS — bizim çözüm ortağımız',
    r"\g<1>" + AY_URL + r"\g<2>" + FULL + r"\g<3>BTK tarafından yetkilendirilmiş ESHS — bayisi olduğumuz hizmet sağlayıcı", regex=True)
rep(P, r'(<a href=")[^"]*("[^>]*>\s*<div class="link-card__icon">⭐</div>\s*<div class="link-card__body">\s*<div class="link-card__name">)Ayyıldız Bilgi Güvenliği(</div>\s*<div class="link-card__desc">)BTK yetkili ESHS & KEPHS — bizim çözüm ortağımız',
    r"\g<1>" + AY_URL + r"\g<2>" + FULL + r"\g<3>BTK tarafından yetkilendirilmiş ESHS — bayisi olduğumuz hizmet sağlayıcı", regex=True, required=False)

# --- /blog/e-imza-nedir (47-48)
P = "blog/e-imza-nedir-nasil-alinir.html"
rep(P, r"<strong>Nasıl alınır\?</strong> BTK lisanslı 5 ESHS'den birinden veya yetkili bayisinden alınır\. UMAY TÜM BİLİŞİM Ayyıldız yetkili bayisi olarak",
    "<strong>Nasıl alınır?</strong> BTK tarafından yetkilendirilmiş bir ESHS'den veya bayisinden alınır. UMAY TÜM BİLİŞİM, AYYILDIZ İMZA bayisi olarak", regex=True)
if "(5070 sayılı Kanun md. 5)</li>" not in load(P): rep(P, r"(<li>Güvenli elektronik imza, elle atılan imza ile aynı hukuki sonucu doğurur\.</li>(?:\s*<li>[^<]*</li>){2})",
    r"\g<1>" + f"\n        <li>{CAVEAT} (5070 sayılı Kanun md. 5)</li>", regex=True)

# --- /kep: AYYILDIZ IMZA KEPHS degildir (madde 23/37 ile tutarlilik)
P = "kep.html"
rep(P, r"<title>[^<]*</title>", "<title>KEP Başvurusu — Kayıtlı Elektronik Posta | UMAY TÜM BİLİŞİM</title>", regex=True, count=1)
KEPD = "KEP (kayıtlı elektronik posta) başvurusu: anonim ve limited şirketler için zorunlu elektronik tebligat ve hukuken ispatlanabilir yazışma. BTK yetkili KEP sağlayıcıları üzerinden hızlı başvuru."
meta(P, "name", "description", KEPD); meta(P, "property", "og:description", KEPD); meta(P, "name", "twitter:description", KEPD)
meta(P, "property", "og:title", "KEP Başvurusu — Kayıtlı Elektronik Posta")
rep(P, r"Ayyıldız KEP \(Kayıtlı Elektronik Posta\)", "KEP (Kayıtlı Elektronik Posta)", regex=True, required=False)
rep(P, r"Ayyıldız KEP", "KEP", regex=True, required=False)

# ---------------------------------------------------------------- (B) SITE GENELI: bant, footer, telif
HTML_FILES = sorted(set(glob.glob("*.html") + glob.glob("blog/*.html") + glob.glob("iller/*.html") + ["build/city-template.html"]))
HTML_FILES = [f for f in HTML_FILES if os.path.basename(f) not in ("google1ccc76d9cd8b2102.html",)]
for f in HTML_FILES:
    t = load(f); o = t
    if 'class="site-header"' in t and 'class="dealer-bar"' not in t:
        t = re.sub(r"(<body[^>]*>)", r"\1\n" + BAR.replace("\\", "\\\\"), t, count=1)
    # footer hakkinda cumlesi (madde 2)
    t = re.sub(r"Türkiye'nin 81 ilinde Ayyıldız e-imza, KEP ve dijital güven çözümlerinde yetkili satıcınız\.",
               DEALER_HTML.replace("\\", "\\\\"), t)
    # telif satiri (madde 16)
    t = re.sub(r"(©\s*2026\s*)(<a [^>]*>)?UMAY TÜM BİLİŞİM LTD\.ŞTİ\.(</a>)?\s*Tüm hakları saklıdır\.(\s*Ayyıldız(?:®|&reg;)\s*tescilli markadır\.)?",
               lambda m: f"{m.group(1)}{m.group(2) or ''}{UMAY_FULL}{m.group(3) or ''} {COPYRIGHT_TAIL}", t)
    if t != o: save(f, t)

# ---------------------------------------------------------------- (C) TOPLU DIL KURALLARI
TEXT_FILES = HTML_FILES + ["llms.txt", "llms-full.txt"] + sorted(glob.glob("build/*.json"))
JS_FILES = sorted(glob.glob("build/*.js"))

AUTHOR_OLD = re.compile(r"Ayyıldız Bilgi Güvenliği A\.Ş\. yetkili bayisi olarak")
RULES = [
    # 45 il sayfasi maddesi
    (r"<strong>Ayyıldız yetkili bayi:</strong> Orijinal ürün, orijinal destek, orijinal fiyat\.",
     f"<strong>AYYILDIZ İMZA bayisi:</strong> Nitelikli Elektronik Sertifikalar {FULL} tarafından üretilir."),
    # 44
    (r"bu sektörlerdeki tüm firmalar için e-imza ve KEP zorunlu hale gelmiştir\.", "bu sektörlerdeki firmalar e-imza ve KEP'i yoğun olarak kullanmaktadır."),
    # 49 yazar kutusu + rozetler
    (r"Ayyıldız Bilgi Güvenliği A\.Ş\. yetkili bayisi olarak", f"{FULL} bayisi olarak"),
    (r'\s*<span style="color:#64748b">✓ BTK Mevzuat Uyumlu</span>', ""),
    (r"✓ Ayyıldız Yetkili Bayi", "✓ AYYILDIZ İMZA Bayisi"),
    (r"5\+ yıl deneyimli, yetkili bayi uzmanlarından", "5+ yıl deneyimli, AYYILDIZ İMZA bayisi uzmanlarından"),
    # unvan (madde 3)
    (r"Ayyıldız Bilgi Güvenliği A\.Ş\.", FULL),
    (r"Ayyıldız Bilgi Güvenliği(?! VE)", FULL),
    # baslik/og kaliplari (41-42)
    (r"UMAY TÜM BİLİŞİM - Ayyıldız Yetkili Bayi", "UMAY TÜM BİLİŞİM - AYYILDIZ İMZA e-imza bayisi"),
    (r"— Ayyıldız Yetkili Bayi\b", "— AYYILDIZ İMZA e-imza bayisi"),
    (r"- Ayyıldız Yetkili Bayi\b", "- AYYILDIZ İMZA e-imza bayisi"),
    (r"UMAY TÜM BİLİŞİM — Ayyıldız E-İmza ve KEP Yetkili Satıcısı", "UMAY TÜM BİLİŞİM — AYYILDIZ İMZA e-imza bayisi"),
    (r"Ayyıldız E-İmza ve KEP Yetkili Satıcı(sı)?", "AYYILDIZ İMZA e-imza bayisi"),
    (r"her noktasında yetkili satıcı hizmeti", "her noktasında AYYILDIZ İMZA e-imza bayisi hizmeti"),
    # genel bayilik kaliplari (madde 4)
    (r"Ayyıldız'ın yetkili bayisidir", "AYYILDIZ İMZA bayisidir"),
    (r"Ayyıldız e-imzasının yetkili bayisidir", "AYYILDIZ İMZA bayisidir"),
    (r"bu firmanın yetkili bayisidir", "bu firmanın bayisidir"),
    (r"Ayyıldız e-imza ve KEP yetkili (satıcısı|bayisi)", "Ayyıldız e-imza bayisi"),
    (r"Ayyıldız e-imza yetkili bayisi", "Ayyıldız e-imza bayisi"),
    (r"Ayyıldız [Yy]etkili [Bb]ayisidir", "AYYILDIZ İMZA bayisidir"),
    (r"Ayyıldız Yetkili (Bayisi|Bayi|Satıcısı)\b", "AYYILDIZ İMZA Bayisi"),
    (r"Ayyıldız Yetkili Satıcınız", "AYYILDIZ İMZA Bayiniz"),
    (r"Ayyıldız yetkili (bayisi|bayi|satıcısı)\b", "AYYILDIZ İMZA bayisi"),
    (r"A\.Ş\. yetkili (bayisi|satıcısı)", "A.Ş. bayisi"),
    (r"A\.Ş\.'nin <strong>yetkili satıcısı</strong>", "A.Ş.'nin <strong>bayisi</strong>"),
    (r"BTK > ESHS \(Ayyıldız\) > Yetkili Bayi", "BTK > ESHS (AYYILDIZ İMZA) > Bayi"),
    (r"\*\*Yetkili Bayi\*\*", "**Bayi**"),
    (r"Yetkili bayi olarak", "AYYILDIZ İMZA bayisi olarak"),
    (r"veya yetkili bayi(lerinden|sinden)", r"veya bayi\1"),
    (r"yetkili bayi fiyatlarıyla", "bayi fiyatlarıyla"),
    (r"TÜM BİLİŞİM yetkili bayi", "TÜM BİLİŞİM bayi"),
    (r"(?i)\byetkili satıcınız\b", "bayiniz"),
    (r"\bYetkili Satıcı(sı)?\b", "Bayisi"),
    (r"\byetkili satıcı(sı)?\b", "bayisi"),
    (r"\bYetkili Bayi(si)?\b", "Bayi"),
    (r"\byetkili bayi(si)?\b", r"bayi\1"),
    (r"Orijinal &amp; Yetkili", "AYYILDIZ İMZA Bayisi"),
    # lisans ailesi (madde 5, 39, 40) - yalnizca BTK baglaminda
    (r"Türkiye'de BTK lisanslı yalnızca \*\*5 ESHS\*\* vardır:", "Türkiye'de 5070 sayılı Kanun kapsamında BTK tarafından yetkilendirilmiş ESHS'ler vardır (güncel liste: " + BTK_ESHS + "). Örnekler:"),
    (r"BTK tarafından lisanslandırılmış, Nitelikli Elektronik Sertifika üretmeye yetkili kuruluştur\. Türkiye'de <strong>5 lisanslı ESHS</strong> bulunur: [^<]*",
     "5070 sayılı Elektronik İmza Kanunu kapsamında BTK tarafından yetkilendirilmiş, Nitelikli Elektronik Sertifika üretmeye yetkili kuruluştur. Güncel liste: " + BTK_LINK + "."),
    (r"BTK tarafından lisanslandırılmış, Nitelikli Elektronik Sertifika üretmeye yetkili kuruluştur\. Türkiye'de 5 lisanslı ESHS bulunur: [^\"]*",
     "5070 sayılı Elektronik İmza Kanunu kapsamında BTK tarafından yetkilendirilmiş, Nitelikli Elektronik Sertifika üretmeye yetkili kuruluştur. Güncel liste: BTK ESHS listesi (" + BTK_ESHS + ")."),
    (r"BTK lisanslı 5 Elektronik Sertifika Hizmet Sağlayıcısı'ndan \(ESHS\) biridir", "5070 sayılı Elektronik İmza Kanunu kapsamında BTK tarafından yetkilendirilmiş Elektronik Sertifika Hizmet Sağlayıcılarından biridir"),
    (r"BTK lisanslı 5 (ESHS'den|Elektronik Sertifika Hizmet Sağlayıcısı'ndan) biri(dir)?", r"BTK tarafından yetkilendirilmiş ESHS'lerden biri\2"),
    (r"BTK lisanslı 5 ESHS'den birinden", "BTK tarafından yetkilendirilmiş bir ESHS'den"),
    (r"BTK lisanslı <strong>5 Elektronik", "BTK tarafından yetkilendirilmiş <strong>Elektronik"),
    (r"BTK lisanslı 5 Elektronik Sertifika Hizmet Sağlayıcısı", "BTK tarafından yetkilendirilmiş Elektronik Sertifika Hizmet Sağlayıcıları"),
    (r"Türkiye'de BTK lisanslı 5 ESHS", "Türkiye'de BTK tarafından yetkilendirilmiş ESHS'ler"),
    (r"BTK lisanslı 5 ESHS", "BTK tarafından yetkilendirilmiş ESHS'ler"),
    (r"(<a [^>]*>BTK</a>) lisanslı (<a [^>]*>ESHS</a>)", r"\1 tarafından yetkilendirilmiş \2"),
    (r"BTK lisanslı ESHS'ler", "BTK tarafından yetkilendirilmiş ESHS'ler"),
    (r"BTK lisanslı ESHS", "BTK tarafından yetkilendirilmiş ESHS"),
    (r"BTK lisanslı kurumlar", "yetkilendirilmiş kurumlar"),
    (r"BTK lisanslı KEP hizmet sağlayıcıları", "BTK tarafından yetkilendirilmiş KEP hizmet sağlayıcıları"),
    (r"BTK lisanslı tüm Elektronik", "BTK tarafından yetkilendirilmiş tüm Elektronik"),
    (r"BTK lisanslı Elektronik Sertifika", "BTK tarafından yetkilendirilmiş Elektronik Sertifika"),
    (r"BTK lisanslı", "BTK tarafından yetkilendirilmiş"),
    (r"BTK tarafından lisanslandırılmış", "BTK tarafından yetkilendirilmiş"),
    (r"ESHS'lerin BTK tarafından lisanslandırılacağını", "ESHS'lerin BTK'ya bildirimde bulunup Kurum tarafından yetkilendirileceğini"),
    (r"ESHS'lere lisans verir", "ESHS'leri yetkilendirir"),
    (r"Türkiye'de 5 lisanslı ESHS bulunur:[^.<\"]*\.?", "Güncel liste: BTK ESHS listesi (" + BTK_ESHS + ")."),
    # AKIS (madde 38)
    (r"AKİS \(Ayyıldız Kart İzleme Sistemi\)", "AKİS (Akıllı Kart İşletim Sistemi)"),
    (r"<span style=\"font-size:\.85rem;font-weight:400;color:#64748b\">\(Ayyıldız Kart İzleme Sistemi\)</span>",
     "<span style=\"font-size:.85rem;font-weight:400;color:#64748b\">(Akıllı Kart İşletim Sistemi)</span>"),
    (r"\"Ayyıldız Kart İzleme Sistemi\"", "\"Akıllı Kart İşletim Sistemi\""),
    # domain
    (r"https?://(www\.)?ayyildiz\.com\.tr/?", AY_URL),
    # ıslak imza iddiasi -> md. 5 ifadesi
    (r"ıslak imza ile aynı hukuki sonucu doğurur", "güvenli elektronik imza olarak elle atılan imza ile aynı hukukî sonucu doğurur (5070 sayılı Kanun md. 5; kanundaki istisnalar hariç)"),
]
SAFE_JS = lambda new: "'" not in new and "\\" not in new

def apply_rules(f, t, js=False):
    for pat, new in RULES:
        if js and isinstance(new, str) and not SAFE_JS(new):
            # JS dosyalarinda tek tirnak iceren degerleri, tirnak ' ile cevrelenmemis baglamlarda uygula
            def sub_safe(m, new=new):
                s, e = m.start(), m.end(); line_start = t.rfind("\n", 0, s) + 1; line = t[line_start:t.find("\n", e) if t.find("\n", e) != -1 else len(t)]
                return m.expand(new) if line.count("'") == 0 else m.group(0)
            t = re.sub(pat, sub_safe, t)
        else:
            t = re.sub(pat, new, t)
    return t

for f in TEXT_FILES:
    if not os.path.exists(f): continue
    t = load(f); o = t
    t = apply_rules(f, t)
    if t != o: save(f, t)
for f in JS_FILES:
    t = load(f); o = t
    t = apply_rules(f, t, js=True)
    if t != o: save(f, t)

# ---------------------------------------------------------------- (D) IL SAYFASI DILBILGISI (madde 42: "İstanbul'un")
VOW = "aıoueiöüAIOUEİÖÜ"
def last_vowel(w):
    for ch in reversed(w):
        if ch in VOW: return ch.lower().replace("ı", "ı")
    return "e"
def genitive(name):
    v = last_vowel(name); s = {"a": "ın", "ı": "ın", "o": "un", "u": "un", "e": "in", "i": "in", "ö": "ün", "ü": "ün"}[v]
    return name + "'" + ("n" + s if name[-1].lower() in VOW.lower() else s)
def locative(name):
    v = last_vowel(name); back = v in "aıou"
    hard = name[-1].lower() in "çfhkpsşt"
    return name + "'" + ("t" if hard else "d") + ("a" if back else "e")
for f in glob.glob("iller/*.html"):
    t = load(f); o = t
    t = re.sub(r"(?<![\wçğıöşüÇĞİÖŞÜ])([A-ZÇĞİÖŞÜ][a-zçğıöşü]+)'n[ıiuü]n her noktasında", lambda m: genitive(m.group(1)) + " her noktasında", t)
    t = re.sub(r"([A-ZÇĞİÖŞÜ][a-zçğıöşü]+)'(?:d|t)(?:a|e)ki\b", lambda m: locative(m.group(1)) + "ki", t)
    if t != o: save(f, t)


# ---------------------------------------------------------------- (F) IKINCI TUR: ozel yazimlar
RULES2 = [
    (r"\s*Ayyıldız(?:®|&reg;)\s*tescilli markadır\.", ""),
    # AKIS: gercek urun adi "AKİS Kart İzleme Aracı" (TÜBİTAK BİLGEM)
    (r"\(Ayyıldız Kart İzleme Sistemi\)", "(TÜBİTAK BİLGEM AKİS kart sürücüsü)"),
    (r"Ayyıldız'ın resmi web sitesinden AKİS Kart İzleme Sistemi'nin", "AYYILDIZ İMZA'nın web sitesinden AKİS Kart İzleme Aracı'nın"),
    (r"AKİS Kart İzleme Sistemi", "AKİS Kart İzleme Aracı"),
    # 5 ESHS listeleri
    (r"Türkiye'de <strong>5 lisanslı ESHS</strong> bulunur: <em>[^<]*</em>", "Güncel liste: " + BTK_LINK + "."),
    (r"5 ESHS şunlardır: [^.]*\.", "Güncel liste: BTK ESHS listesi (" + BTK_ESHS + ")."),
    (r"5 detaylı tablo — E-imza vs Mobil İmza, 5 ESHS, paketler", "4 detaylı tablo — E-imza vs Mobil İmza, paketler"),
    (r"BTK tarafından yetkilendirilmiş 5 ESHS'den birinden veya yetkili bayisinden alınır\. UMAY TÜM BİLİŞİM AYYILDIZ İMZA bayisi olarak",
     "BTK tarafından yetkilendirilmiş bir ESHS'den veya bayisinden alınır. UMAY TÜM BİLİŞİM, AYYILDIZ İMZA bayisi olarak"),
    # KEP: AYYILDIZ IMZA KEP saglayicisi degil
    (r"için Ayyıldız KEP başvurusunu", "için KEP başvurusunu"),
    (r'eyebrow: "Ayyıldız KEP"', 'eyebrow: "KEP Başvurusu"'),
    (r'<span class="blog-cta__eyebrow">Ayyıldız KEP</span>', '<span class="blog-cta__eyebrow">KEP Başvurusu</span>'),
    # ıslak imza varyantlari -> 5070 md. 5 dili
    (r"Islak imza ile eşdeğer hukuki sonuç doğurur", "Güvenli elektronik imza, elle atılan imza ile aynı hukukî sonucu doğurur (resmî şekle tabi işlemler ve bazı teminat sözleşmeleri hariç)"),
    (r"Islak imza ile eşdeğer \(Kanun Madde 5\)", "Güvenli elektronik imza, elle atılan imza ile aynı hukukî sonucu doğurur (Kanun md. 5; resmî şekle tabi işlemler ve bazı teminat sözleşmeleri hariç)"),
    (r"Islak imza ile aynı hukuki sonucu doğuran tek sertifika tipidir\.", "Güvenli elektronik imza oluşturmak için kullanılan sertifika tipidir; güvenli elektronik imza, elle atılan imza ile aynı hukukî sonucu doğurur (5070 sayılı Kanun md. 5; kanundaki istisnalar hariç)."),
    (r"NES'in ıslak imza ile eşdeğer hukuki sonuç doğurduğunu", "güvenli elektronik imzanın, kanundaki istisnalar dışında elle atılan imza ile aynı hukukî sonucu doğurduğunu"),
    (r"ıslak imza ile aynı hukuki geçerliliğe sahip,", "güvenli elektronik imza olarak elle atılan imza ile aynı hukukî sonucu doğuran (kanundaki istisnalar hariç),"),
    (r"Islak imza ile aynı hukuki geçerliliğe sahip,", "Güvenli elektronik imza olarak elle atılan imza ile aynı hukukî sonucu doğuran (kanundaki istisnalar hariç),"),
    (r"ıslak imza ile aynı hukuki geçerliliğe sahiptir\.", "elle atılan imza ile aynı hukukî sonucu doğurur (5070 sayılı Kanun md. 5; kanundaki istisnalar hariç)."),
    (r"Islak imza ile aynı hukuki geçerliliğe sahiptir\.", "Güvenli elektronik imza, elle atılan imza ile aynı hukukî sonucu doğurur; ancak resmî şekle tabi işlemler ve bazı teminat sözleşmeleri e-imza ile yapılamaz (5070 sayılı Kanun md. 5)."),
    (r"ıslak imzayla aynı hukuki sonucu doğurur", "güvenli elektronik imza olarak elle atılan imzayla aynı hukukî sonucu doğurur (kanundaki istisnalar hariç)"),
    # llms-full: KEP saglayici listesi BTK ile uyumlu
    (r"Ana KEPHS'ler:\s*- PTT KEP\s*- TÜRKKEP\s*- e-Tuğra KEP\s*- Hızlı KEP",
     "BTK listesindeki faal KEPHS'ler (Ekim 2026): PTT, TNB, TÜRKKEP, QNB eSolutions, KEPKUR, F.I.T., EDM, Ark Dijital. Güncel liste: https://www.btk.gov.tr/kayitli-elektronik-posta-hizmet-saglayicilar"),
]
for f in TEXT_FILES + JS_FILES + ["assets/img/og-image-template.html"]:
    if not os.path.exists(f): continue
    t = load(f); o = t
    for pat, new in RULES2:
        t = re.sub(pat, new, t)
    t = t.replace('<div class="badge">Ayyıldız Yetkili Satıcısı</div>', '<div class="badge">AYYILDIZ İMZA Bayisi</div>')
    if t != o: save(f, t)
print(f"(F) sonrasi toplam degisen dosya: {len(changed_files)}")


# ---------------------------------------------------------------- (G) BLOG URETICI JS SABLONLARI (template literal)
for f in ["build/create-new-blogs.js", "build/create-new-blogs-v2.js", "build/create-new-blogs-v3.js"]:
    if not os.path.exists(f): continue
    t = load(f); o = t
    if "dealer-bar" not in t:
        t = re.sub(r"<body>(\r?\n)", lambda m: "<body>" + m.group(1) + BAR + m.group(1), t, count=1)
    t = re.sub(r"Türkiye'nin 81 ilinde Ayyıldız e-imza, KEP ve dijital güven çözümlerinde (?:bayiniz|yetkili satıcınız)\.", lambda m: DEALER_HTML, t)
    t = re.sub(r"(©\s*2026\s*)(<a [^>]*>)?UMAY TÜM BİLİŞİM LTD\.ŞTİ\.(</a>)?\s*Tüm hakları saklıdır\.(\s*Ayyıldız(?:®|&reg;)\s*tescilli markadır\.)?",
               lambda m: f"{m.group(1)}{m.group(2) or ''}{UMAY_FULL}{m.group(3) or ''} {COPYRIGHT_TAIL}", t)
    if t != o: save(f, t)


# ---------------------------------------------------------------- (H) KAYIP/CALINTI yazisi: aski/iptal AYYILDIZ IMZA'da (madde 32 tutarliligi)
for f in ["blog/e-imza-kayip-calinti-hasarli.html", "build/create-new-blogs-v2.js"]:
    t = load(f); o = t
    t = re.sub(r"(ESHS(?:</a>)?)'ye \(Ayyıldız veya bayisi UMAY TÜM BİLİŞİM\) telefon veya WhatsApp ile ulaşın\. TC kimlik numaranız ile sertifikanız iptal edilir\.",
               lambda m: "Sertifikanızın askıya alınması veya iptali için derhal AYYILDIZ İMZA'ya başvurun (iletişim bilgileri: " + AY_URL + "). Askı ve iptal işlemleri AYYILDIZ İMZA tarafından yapılır; dilerseniz bize de bilgi verin, süreçte yönlendirelim.", t)
    t = re.sub(r"WhatsApp \+90 850 777 11 45'i arayın — mesai saatleri dışında bile 24 saat içinde iptal işleminizi başlatabiliriz\.",
               "önce sertifikanızın askıya alınması veya iptali için AYYILDIZ İMZA'ya (" + AY_URL + ") başvurun. Ardından WhatsApp +90 850 777 11 45 üzerinden bize yazın; yeni başvurunuzu hemen başlatalım.", t)
    t = t.replace("derhal ESHS'yi arayarak sertifikayı iptal ettirin", "derhal AYYILDIZ İMZA'ya başvurarak sertifikanızı askıya aldırın veya iptal ettirin")
    t = t.replace("Kayıp durumundaki gibi acil olarak ESHS'yi arayın.", "Kayıp durumundaki gibi acil olarak AYYILDIZ İMZA'ya başvurun.")
    if t != o: save(f, t)


# ---------------------------------------------------------------- (I) FOOTER: &copy; varyanti + bayilik cumlesi olmayan footer'lar
for f in HTML_FILES:
    t = load(f); o = t
    t = re.sub(r"((?:©|&copy;)\s*(?:<span id=\"yil\">2026</span>|2026)\s*)(<a [^>]*>)?UMAY TÜM BİLİŞİM LTD\.ŞTİ\.(</a>)?\s*Tüm hakları saklıdır\.(\s*Ayyıldız(?:®|&reg;)\s*tescilli markadır\.)?",
               lambda m: f"{m.group(1)}{m.group(2) or ''}{UMAY_FULL}{m.group(3) or ''} {COPYRIGHT_TAIL}", t)
    i = t.find("<footer")
    if i != -1:
        j = t.find("</footer>", i)
        if "bayisi / başvuru noktasıdır" not in t[i:j]:
            k = t.find('<div class="footer-bottom"', i)
            if k != -1 and k < j:
                t = t[:k] + f'<p class="footer-dealer">{DEALER_HTML}</p>\n    ' + t[k:]
    if t != o: save(f, t)


# ---------------------------------------------------------------- (J) SOZLUK madde 37-38 birebir metin
P = "sozluk.html"
t = load(P); o = t
AKIS_TXT = "TÜBİTAK BİLGEM tarafından geliştirilen, e-imza kartlarında kullanılan akıllı kart işletim sistemidir. E-imza kullanmadan önce kart sürücüsünün yüklenmesi gerekir."
t = re.sub(r'("name":"AKİS","alternateName":\[[^\]]*\],"description":")[^"]*', lambda m: m.group(1) + AKIS_TXT, t)
t = re.sub(r'(\(Akıllı Kart İşletim Sistemi\)</span></h3>\s*<p[^>]*>)<strong>[^<]*</strong>[^<]*', lambda m: m.group(1) + "<strong>" + AKIS_TXT.split(". ")[0] + ".</strong> " + AKIS_TXT.split(". ")[1] + " ", t)
AY_TXT = ("5070 sayılı Elektronik İmza Kanunu kapsamında BTK tarafından yetkilendirilmiş Elektronik Sertifika Hizmet Sağlayıcılarından biridir. "
          "Nitelikli Elektronik Sertifika (NES), e-mühür ve zaman damgası hizmetleri sunar. UMAY TÜM BİLİŞİM, AYYILDIZ İMZA bayisidir.")
t = re.sub(r'("@id":"https://www\.e-imzasatinal\.com\.tr/sozluk#ayyildiz","name":")Ayyıldız(",[^}]*?"description":")[^"]*', lambda m: m.group(1) + "AYYILDIZ İMZA" + m.group(2) + AY_TXT, t)
t = re.sub(r'(<div class="term-card" id="ayyildiz"[^>]*>\s*<h3[^>]*>)Ayyıldız(\s*<span[^>]*>\(' + re.escape(FULL) + r'\)</span></h3>\s*<p[^>]*>).*?(</p>)',
           lambda m: m.group(1) + "AYYILDIZ İMZA" + m.group(2) + "<strong>" + AY_TXT.split(". ")[0] + ".</strong> " + ". ".join(AY_TXT.split(". ")[1:]) + m.group(3), t, flags=re.S)
if t != o: save(P, t)


# ---------------------------------------------------------------- (K) MADDE 3: saglayici anlamindaki "Ayyıldız" -> AYYILDIZ İMZA (urun adi "Ayyıldız e-imza" kalir)
RULES3 = [
    ("hakkimizda.html", r"<h2>Ayyıldız Hakkında</h2>", "<h2>AYYILDIZ İMZA Hakkında</h2>"),
    ("hakkimizda.html", r"Ayyıldız e-imza ve KEP yetkili satıcısı|Ayyıldız e-imza ve KEP bayisi", "Ayyıldız e-imza bayisi"),
    ("hizmetler.html", r"Ayyıldız'ın e-imza ve KEP dışındaki tüm kurumsal çözümleri", "AYYILDIZ İMZA'nın e-imza dışındaki kurumsal çözümleri"),
    ("hizmetler.html", r"Ayyıldız'ın REST ve SOAP", "AYYILDIZ İMZA'nın REST ve SOAP"),
    ("hizmetler.html", r"Ayyıldız API'si", "AYYILDIZ İMZA API'si"),
    ("iletisim.html", r"Ödeme onayı sonrası Ayyıldız sistemine başvurunuz iletilir, e-imza sertifikanız üretilir",
     "Ödeme onayı sonrası başvurunuz AYYILDIZ İMZA'ya iletilir; kimlik doğrulama ve sertifika üretimi AYYILDIZ İMZA tarafından gerçekleştirilir"),
    ("llms-full.txt", r"Ödeme onayı sonrası Ayyıldız sistemine başvuru iletilir\. Sertifika üretilir",
     "Ödeme onayı sonrası başvuru AYYILDIZ İMZA'ya iletilir. Kimlik doğrulama ve sertifika üretimi AYYILDIZ İMZA tarafından yapılır"),
    ("kep.html", r"Ayyıldız sistemi üzerinden KEP hesabınız açılır\.", "Başvurunuz BTK tarafından yetkilendirilmiş bir KEP hizmet sağlayıcısına iletilir ve KEP hesabınız açılır."),
    ("index.html", r"Ayyıldız ürünlerini sadece satmıyoruz", "AYYILDIZ İMZA ürünlerini sadece satmıyoruz"),
    ("index.html", r'"@type": "Brand", "name": "Ayyıldız"', '"@type": "Brand", "name": "AYYILDIZ İMZA"'),
    ("index.html", r"Türkiye'nin 81 ilinde Ayyıldız e-imza, KEP, zaman damgası ve HSM çözümleri\.", "Türkiye'nin 81 ilinde AYYILDIZ İMZA e-imza, zaman damgası ve e-mühür çözümleri ile KEP başvurusu."),
    ("index.html", r"Ayyıldız e-imza ve KEP hizmetlerine hızlıca ulaşın", "Ayyıldız e-imza ve KEP başvuru hizmetlerine hızlıca ulaşın"),
    ("e-imza.html", r'"@type": "Brand", "name": "Ayyıldız"', '"@type": "Brand", "name": "AYYILDIZ İMZA"'),
    ("sertifika-ilkeleri.html", r'(<meta (?:property="og:description"|name="twitter:description") content=")Ayyıldız nitelikli elektronik sertifika ilkeleri[^"]*',
     r"\g<1>" + FULL + " Nitelikli Elektronik Sertifika İlkeleri, Uygulama Esasları ve zaman damgası belgeleri."),
    ("sozluk.html", r"\(BTK, Kamu SM, Ayyıldız, e-Devlet\.\.\.\)", "(BTK, Kamu SM, AYYILDIZ İMZA, e-Devlet...)"),
    ("karsilastir.html", r"ESHS \(Ayyıldız vb\.\)", "ESHS (AYYILDIZ İMZA vb.)"),
    ("karsilastir.html", r"ESHS karşılaştırması, Ayyıldız Kamu SM E-Güven E-Tuğra TürkTrust, ", ""),
    ("llms.txt", r"bayisi\. Ayyıldız, 5070 sayılı", "bayisi. AYYILDIZ İMZA, 5070 sayılı"),
    ("llms.txt", r"\*\*S: E-imza neden Ayyıldız üzerinden alınmalı\?\*\* C: Ayyıldız,", "**S: E-imza neden AYYILDIZ İMZA üzerinden alınmalı?** C: AYYILDIZ İMZA,"),
    ("llms-full.txt", r"\*\*ESHS\*\* \(Ayyıldız vb\. — sertifika üreticisi\)", "**ESHS** (AYYILDIZ İMZA vb. — sertifika üreticisi)"),
    ("llms-full.txt", r"ESHS'ler'den \(Ayyıldız, Kamu SM, E-Güven, E-Tuğra, TürkTrust\) birinden", "ESHS'lerden (güncel liste: BTK ESHS listesi, " + BTK_ESHS + ") birinden"),
]
for f, pat, new in RULES3:
    if os.path.exists(f):
        t = load(f); t2 = re.sub(pat, new, t)
        if t2 != t: save(f, t2)
# blog genelinde saglayici anlami
BLOG3 = [
    (r"ESHS(</a>)?'ye \(Ayyıldız vb\.\)", r"ESHS\1'ye (AYYILDIZ İMZA vb.)"),
    (r"(ESHS</a>) \(Ayyıldız vb\.\)", r"\1 (AYYILDIZ İMZA vb.)"),
    (r"\(Ayyıldız resmi sitesinden\)", "(AYYILDIZ İMZA'nın web sitesinden)"),
    (r'"name": "Ayyıldız — Yenileme Süreci"', '"name": "AYYILDIZ İMZA — Yenileme Süreci"'),
    (r"Ayyıldız sistemi üzerinden başvurunuz oluşturulur\.", "Başvurunuz AYYILDIZ İMZA'ya iletilir; kimlik doğrulama ve sertifika üretimi AYYILDIZ İMZA tarafından gerçekleştirilir."),
    (r"birden fazla sağlayıcı vardır \(Ayyıldız, e-Güven, TÜRKKEP, E-Tuğra, kamu personeli için Kamu SM gibi\)",
     "birden fazla sağlayıcı vardır (AYYILDIZ İMZA, E-Güven, E-Tuğra, kamu personeli için Kamu SM gibi; güncel liste: " + BTK_LINK + ")"),
]
for f in glob.glob("blog/*.html") + JS_FILES:
    t = load(f); o = t
    for pat, new in BLOG3:
        if f.endswith(".js") and "<a " in new: new = new.replace(BTK_LINK, "BTK ESHS listesi")
        t = re.sub(pat, new, t)
    if t != o: save(f, t)
# il sayfalari: "Ayyıldız ... KEP" algisi (ana sayfa H1 ile ayni dil)
for f in glob.glob("iller/*.html") + ["build/city-template.html"] + sorted(glob.glob("build/*.json")):
    t = load(f); o = t
    t = re.sub(r"(\w+'(?:d|t)(?:a|e)) Ayyıldız E-İmza ve KEP</h2>", r"\1 Ayyıldız E-İmza ve KEP Başvurusu</h2>", t)
    t = t.replace("{{IL_ADI}}'da Ayyıldız E-İmza ve KEP</h2>", "{{IL_ADI}}'da Ayyıldız E-İmza ve KEP Başvurusu</h2>")
    t = re.sub(r"ilinde Ayyıldız e-imza, KEP ve zaman damgası hizmetleri", "ilinde Ayyıldız e-imza, zaman damgası ve KEP başvuru hizmetleri", t)
    t = re.sub(r"ilinde Ayyıldız e-imza ve KEP\.", "ilinde Ayyıldız e-imza ve KEP başvurusu.", t)
    if t != o: save(f, t)


# ---------------------------------------------------------------- (L) madde 35 schema aciklamasi + madde 39 gorunen metin birebir
rep("karsilastir.html", "mobil imza, ESHS'ler, paketler, bireysel/firma ve KEP.", "mobil imza, paketler, bireysel/firma ve KEP.", required=False)
rep("sozluk.html", "<strong>BTK tarafından yetkilendirilmiş, Nitelikli Elektronik Sertifika üretmeye yetkili kuruluştur.</strong>",
    "<strong>5070 sayılı Elektronik İmza Kanunu kapsamında BTK tarafından yetkilendirilmiş, Nitelikli Elektronik Sertifika üretmeye yetkili kuruluştur.</strong>", required=False)

# ---------------------------------------------------------------- (E) RAPOR
print(f"Degisen dosya: {len(changed_files)}  | sayfaya ozel kural basarili: {REPORT['ok']}")
if REPORT["miss"]:
    print("ESLESMEYEN SAYFAYA OZEL KURALLAR:")
    for m in REPORT["miss"]: print("  -", m)
