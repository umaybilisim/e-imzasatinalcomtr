"use strict";
/**
 * 81 il sayfasına şehir-spesifik bilgi bloğu ekler.
 *
 * Eklenenler:
 *   - "Şehir Profili" kutusu: ana üniversite, baskın sektör, OSB, plaka kodu
 *   - AI-citation friendly format
 *
 * Marker: <!-- GEO-CITY-PROFILE-V1 -->
 */
const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..", "iller");
const MARKER = "<!-- GEO-CITY-PROFILE-V1 -->";

// Her il için: plaka, üniversite(ler), baskın sektör, OSB/sanayi vurgu, e-imza kullanıcı profili
const cityData = {
  adana: { plaka: "01", universite: "Çukurova Üniversitesi", sektor: "tekstil, gıda, lojistik, otomotiv yan sanayi", vurgu: "Adana OSB ve Hacı Sabancı OSB'deki binlerce firma için e-imza zorunluluğu", profil: "muhasebeciler, ihracat şirketleri, sanayi tesisleri" },
  adiyaman: { plaka: "02", universite: "Adıyaman Üniversitesi", sektor: "tekstil, tarım, mermer", vurgu: "Adıyaman OSB'deki tekstil firmaları için e-fatura zorunluluğu", profil: "tekstil firmaları, çiftçi kooperatifleri" },
  afyonkarahisar: { plaka: "03", universite: "Afyon Kocatepe Üniversitesi", sektor: "mermer, gıda, termal turizm", vurgu: "Afyon mermer ihracatçıları ve termal otellerin KEP zorunluluğu", profil: "mermer ihracatçıları, otel işletmeleri, gıda firmaları" },
  agri: { plaka: "04", universite: "Ağrı İbrahim Çeçen Üniversitesi", sektor: "tarım, hayvancılık, sınır ticareti", vurgu: "İran-Türkiye sınır ticareti yapan firmalar için e-imza", profil: "ihracatçılar, tarım kooperatifleri" },
  aksaray: { plaka: "68", universite: "Aksaray Üniversitesi", sektor: "otomotiv, gıda, tarım", vurgu: "Aksaray OSB'deki otomotiv yan sanayi firmaları", profil: "otomotiv firmaları, çiftçi kooperatifleri" },
  amasya: { plaka: "05", universite: "Amasya Üniversitesi", sektor: "tarım (elma), turizm, eğitim", vurgu: "Amasya elma üreticileri ve turizm işletmeleri", profil: "tarım kooperatifleri, otel işletmecileri" },
  ankara: { plaka: "06", universite: "Hacettepe, ODTÜ, Gazi, Ankara, Bilkent ve 15+ üniversite", sektor: "kamu, savunma sanayi, teknopark, sağlık, finans", vurgu: "Başkent olarak tüm kamu kurumları, savunma sanayi firmaları, TEKNOPARK ve hukuk büroları için yoğun e-imza kullanımı", profil: "kamu çalışanları, avukatlar, savunma sanayi firmaları, mali müşavirler" },
  antalya: { plaka: "07", universite: "Akdeniz Üniversitesi, Antalya Bilim Üniversitesi", sektor: "turizm, sera tarımı, gayrimenkul, ihracat", vurgu: "Antalya turizm firmaları, sera üreticileri ve ihracatçılar için e-imza ve KEP", profil: "otel işletmecileri, ihracat şirketleri, emlak firmaları" },
  ardahan: { plaka: "75", universite: "Ardahan Üniversitesi", sektor: "tarım, hayvancılık, sınır ticareti", vurgu: "Gürcistan sınır ticareti yapan firmalar için e-imza", profil: "ihracatçılar, hayvancılık işletmeleri" },
  artvin: { plaka: "08", universite: "Artvin Çoruh Üniversitesi", sektor: "ormancılık, çay üretimi, HES", vurgu: "Çay üreticileri ve enerji santrali firmaları için e-imza", profil: "çay üreticileri, enerji firmaları" },
  aydin: { plaka: "09", universite: "Aydın Adnan Menderes Üniversitesi", sektor: "incir-zeytin ihracatı, jeotermal turizm, tarım", vurgu: "İncir ve zeytin ihracatçıları, jeotermal otel işletmeleri için e-fatura", profil: "tarım ihracatçıları, otel işletmecileri" },
  balikesir: { plaka: "10", universite: "Balıkesir Üniversitesi, Bandırma Onyedi Eylül Üniversitesi", sektor: "tarım, hayvancılık, turizm (Ayvalık-Edremit), maden", vurgu: "Bandırma OSB ve Ayvalık zeytin işletmecileri için e-imza", profil: "tarım firmaları, otel ve restoran işletmecileri" },
  bartin: { plaka: "74", universite: "Bartın Üniversitesi", sektor: "maden (taşkömürü), liman, ormancılık", vurgu: "Bartın limanı kullanan ihracat firmaları için e-imza", profil: "lojistik firmaları, maden işletmecileri" },
  batman: { plaka: "72", universite: "Batman Üniversitesi", sektor: "petrol, tarım, hayvancılık", vurgu: "TPAO ve petrol işletmecileri için e-imza", profil: "petrol şirketleri, tarım firmaları" },
  bayburt: { plaka: "69", universite: "Bayburt Üniversitesi", sektor: "tarım, hayvancılık, taşçılık", vurgu: "Bayburt taşı işletmecileri için e-imza", profil: "küçük ölçekli üreticiler, tarım kooperatifleri" },
  bilecik: { plaka: "11", universite: "Bilecik Şeyh Edebali Üniversitesi", sektor: "seramik, mermer, tarım", vurgu: "Bilecik seramik fabrikaları ve mermer ihracatçıları için e-imza", profil: "seramik üreticileri, mermer firmaları" },
  bingol: { plaka: "12", universite: "Bingöl Üniversitesi", sektor: "tarım, hayvancılık, eğitim", vurgu: "Tarım Bakanlığı destekli üreticiler için VERBİS başvurusu", profil: "tarım kooperatifleri, kamu kurumları" },
  bitlis: { plaka: "13", universite: "Bitlis Eren Üniversitesi", sektor: "tarım, hayvancılık, turizm (Ahlat-Nemrut)", vurgu: "Tarihi turizm bölgesi otelleri ve tarım üreticileri için e-imza", profil: "otel işletmecileri, tarım üreticileri" },
  bolu: { plaka: "14", universite: "Bolu Abant İzzet Baysal Üniversitesi", sektor: "orman ürünleri, mobilya, kaplıca turizmi, tavuk yetiştiriciliği", vurgu: "Bolu mobilya ve orman ürünleri firmaları, kaplıca otelleri için e-imza", profil: "mobilya firmaları, otel işletmecileri" },
  burdur: { plaka: "15", universite: "Mehmet Akif Ersoy Üniversitesi", sektor: "mermer, tarım, hayvancılık", vurgu: "Burdur mermer ihracatçıları ve süt üreticileri için e-fatura", profil: "mermer firmaları, hayvancılık işletmeleri" },
  bursa: { plaka: "16", universite: "Bursa Uludağ Üniversitesi, Bursa Teknik Üniversitesi", sektor: "otomotiv, tekstil, gıda, tarım", vurgu: "Bursa OSB ve İnegöl Mobilya OSB'deki binlerce firma — otomotiv yan sanayi, tekstil ve mobilya için yoğun e-imza ve KEP kullanımı", profil: "otomotiv firmaları, tekstil üreticileri, mobilya işletmecileri" },
  canakkale: { plaka: "17", universite: "Çanakkale Onsekiz Mart Üniversitesi", sektor: "tarım, balıkçılık, turizm (Gelibolu-Truva), maden", vurgu: "Çanakkale Boğazı geçişi yapan lojistik firmaları ve turizm işletmeleri", profil: "lojistik firmaları, otel işletmecileri, balıkçı kooperatifleri" },
  cankiri: { plaka: "18", universite: "Çankırı Karatekin Üniversitesi", sektor: "tuz madenciliği, tarım", vurgu: "Çankırı tuz işletmecileri ve tarım üreticileri için e-imza", profil: "maden işletmecileri, tarım kooperatifleri" },
  corum: { plaka: "19", universite: "Hitit Üniversitesi", sektor: "leblebi-makarna, makine, tuğla", vurgu: "Çorum OSB makine ve gıda sanayi firmaları için e-imza ve e-fatura", profil: "sanayi firmaları, gıda üreticileri" },
  denizli: { plaka: "20", universite: "Pamukkale Üniversitesi", sektor: "tekstil (havlu-bornoz), termal turizm, ihracat", vurgu: "Denizli tekstil ihracatçıları ve termal otel işletmecileri için yoğun e-imza/KEP kullanımı", profil: "tekstil ihracatçıları, otel işletmecileri" },
  diyarbakir: { plaka: "21", universite: "Dicle Üniversitesi", sektor: "tarım, hayvancılık, hizmet, hukuk", vurgu: "Diyarbakır barosu avukatları ve tarım firmaları için yoğun e-imza kullanımı", profil: "avukatlar, mali müşavirler, tarım firmaları" },
  duzce: { plaka: "81", universite: "Düzce Üniversitesi", sektor: "orman ürünleri, mobilya, tarım", vurgu: "Düzce OSB'deki mobilya ve sanayi firmaları için e-fatura zorunluluğu", profil: "mobilya firmaları, orman ürünleri işletmeleri" },
  edirne: { plaka: "22", universite: "Trakya Üniversitesi", sektor: "tarım, hayvancılık, sınır ticareti (Bulgaristan-Yunanistan)", vurgu: "Avrupa sınır ticareti yapan ihracatçılar ve tarım firmaları için e-imza", profil: "ihracat firmaları, tarım kooperatifleri" },
  elazig: { plaka: "23", universite: "Fırat Üniversitesi", sektor: "maden (krom), tarım, hayvancılık", vurgu: "Elazığ maden işletmecileri ve OSB firmaları için e-imza", profil: "maden firmaları, sanayi işletmecileri" },
  erzincan: { plaka: "24", universite: "Erzincan Binali Yıldırım Üniversitesi", sektor: "tarım, gümüş işlemeciliği, maden", vurgu: "Erzincan Kemaliye gümüş işletmecileri ve tarım kooperatifleri için e-imza", profil: "küçük ölçekli üreticiler, tarım kooperatifleri" },
  erzurum: { plaka: "25", universite: "Atatürk Üniversitesi", sektor: "hayvancılık, kış turizmi (Palandöken), eğitim", vurgu: "Erzurum hayvancılık işletmeleri ve Palandöken kayak otelleri için e-imza", profil: "hayvancılık firmaları, otel işletmecileri, kamu çalışanları" },
  eskisehir: { plaka: "26", universite: "Eskişehir Osmangazi Üniversitesi, Anadolu Üniversitesi", sektor: "havacılık (TUSAŞ), demiryolu, beyaz eşya, eğitim", vurgu: "Eskişehir OSB'deki TUSAŞ ve demiryolu firmaları için yoğun e-imza kullanımı", profil: "savunma ve havacılık firmaları, sanayi işletmecileri" },
  gaziantep: { plaka: "27", universite: "Gaziantep Üniversitesi", sektor: "tekstil, gıda, halı, ihracat (Ortadoğu)", vurgu: "Gaziantep OSB'deki 1500+ firma için yoğun e-imza, KEP, e-fatura kullanımı", profil: "tekstil-halı ihracatçıları, gıda firmaları, mali müşavirler" },
  giresun: { plaka: "28", universite: "Giresun Üniversitesi", sektor: "fındık ihracatı, balıkçılık, ormancılık", vurgu: "Giresun fındık ihracatçıları için e-imza ve KEP zorunluluğu", profil: "fındık ihracatçıları, balıkçı kooperatifleri" },
  gumushane: { plaka: "29", universite: "Gümüşhane Üniversitesi", sektor: "tarım, hayvancılık, maden", vurgu: "Maden işletmecileri ve tarım kooperatifleri için e-imza", profil: "maden firmaları, tarım üreticileri" },
  hakkari: { plaka: "30", universite: "Hakkari Üniversitesi", sektor: "hayvancılık, sınır ticareti", vurgu: "Sınır ticareti yapan firmalar için e-imza", profil: "küçük ölçekli ihracatçılar, hayvancılık işletmecileri" },
  hatay: { plaka: "31", universite: "Hatay Mustafa Kemal Üniversitesi", sektor: "tarım, demir-çelik (İskenderun), liman, gastronomi", vurgu: "İskenderun limanı ve demir-çelik firmaları için yoğun e-imza", profil: "lojistik firmaları, demir-çelik üreticileri, gastronomi işletmecileri" },
  igdir: { plaka: "76", universite: "Iğdır Üniversitesi", sektor: "tarım (kayısı), sınır ticareti", vurgu: "Iğdır-Ermenistan sınır ticareti firmaları için e-imza", profil: "ihracatçılar, tarım kooperatifleri" },
  isparta: { plaka: "32", universite: "Süleyman Demirel Üniversitesi", sektor: "gül yağı, halı, mermer, elma", vurgu: "Isparta gül yağı ihracatçıları ve mermer firmaları için e-imza", profil: "gül yağı ihracatçıları, halı üreticileri" },
  istanbul: { plaka: "34", universite: "İstanbul, Boğaziçi, İTÜ, Marmara, Yıldız Teknik ve 50+ üniversite", sektor: "finans, ticaret, üretim, lojistik, teknoloji, medya", vurgu: "Türkiye'nin ticaret başkenti olarak 500.000+ kayıtlı şirket, yoğun finans, fintech, e-ticaret, hukuk ve muhasebe e-imza/KEP kullanımı", profil: "finans kurumları, e-ticaret firmaları, avukatlar, mali müşavirler, ihracatçılar" },
  izmir: { plaka: "35", universite: "Ege Üniversitesi, Dokuz Eylül Üniversitesi, İYTE", sektor: "ihracat (Aliağa-Çiğli OSB), turizm, tarım, liman, lojistik", vurgu: "İzmir Limanı ve Aliağa OSB'deki binlerce ihracat firması için yoğun e-imza ve KEP kullanımı", profil: "ihracatçılar, lojistik firmaları, turizm işletmecileri" },
  kahramanmaras: { plaka: "46", universite: "Kahramanmaraş Sütçü İmam Üniversitesi", sektor: "tekstil (denim-jean), gıda (dondurma), demir-çelik", vurgu: "Kahramanmaraş tekstil ve dondurma üreticileri için e-imza", profil: "tekstil ihracatçıları, gıda firmaları" },
  karabuk: { plaka: "78", universite: "Karabük Üniversitesi", sektor: "demir-çelik (KARDEMİR), maden, turizm (Safranbolu)", vurgu: "KARDEMİR ve diğer demir-çelik firmaları için e-imza ve e-fatura", profil: "demir-çelik firmaları, otel işletmecileri" },
  karaman: { plaka: "70", universite: "Karamanoğlu Mehmetbey Üniversitesi", sektor: "bisküvi-helva, gıda sanayi", vurgu: "Karaman gıda sanayi firmaları için e-fatura", profil: "gıda üreticileri, sanayi işletmecileri" },
  kars: { plaka: "36", universite: "Kafkas Üniversitesi", sektor: "süt ürünleri (kaşar), turizm, hayvancılık", vurgu: "Kars kaşar üreticileri ve turizm işletmecileri için e-imza", profil: "süt ürünleri firmaları, otel işletmecileri" },
  kastamonu: { plaka: "37", universite: "Kastamonu Üniversitesi", sektor: "orman ürünleri, sarımsak, mobilya", vurgu: "Taşköprü sarımsağı ve mobilya firmaları için e-imza", profil: "tarım üreticileri, mobilya işletmecileri" },
  kayseri: { plaka: "38", universite: "Erciyes Üniversitesi", sektor: "mobilya, tekstil, gıda, ihracat, savunma sanayi", vurgu: "Kayseri OSB'deki 1000+ firma — mobilya ve savunma sanayi için yoğun e-imza/KEP kullanımı", profil: "mobilya firmaları, savunma sanayi şirketleri, tekstil üreticileri" },
  kilis: { plaka: "79", universite: "Kilis 7 Aralık Üniversitesi", sektor: "tarım, sınır ticareti, zeytin", vurgu: "Suriye sınır ticareti yapan firmalar için e-imza", profil: "ihracatçılar, tarım üreticileri" },
  kirikkale: { plaka: "71", universite: "Kırıkkale Üniversitesi", sektor: "savunma sanayi (MKE), petrokimya, tarım", vurgu: "MKE ve TÜPRAŞ Kırıkkale Rafinerisi gibi savunma/petrokimya firmaları için yoğun e-imza", profil: "savunma sanayi firmaları, petrokimya işletmecileri" },
  kirklareli: { plaka: "39", universite: "Kırklareli Üniversitesi", sektor: "tarım (ayçiçeği), sanayi, sınır ticareti (Bulgaristan)", vurgu: "Lüleburgaz OSB ve Bulgaristan sınır ticareti firmaları için e-imza", profil: "tarım firmaları, ihracatçılar" },
  kirsehir: { plaka: "40", universite: "Ahi Evran Üniversitesi", sektor: "tarım, hayvancılık, mermer", vurgu: "Kırşehir mermer ve tarım üreticileri için e-imza", profil: "mermer firmaları, tarım kooperatifleri" },
  kocaeli: { plaka: "41", universite: "Kocaeli Üniversitesi, Gebze Teknik Üniversitesi", sektor: "petrokimya (TÜPRAŞ), otomotiv (Ford, Hyundai), liman, savunma sanayi", vurgu: "Gebze OSB ve Tübitak MAM Teknopark'taki yüzlerce firma için yoğun e-imza, KEP, e-fatura", profil: "otomotiv firmaları, petrokimya işletmecileri, savunma sanayi şirketleri" },
  konya: { plaka: "42", universite: "Selçuk Üniversitesi, Necmettin Erbakan Üniversitesi, KTO Karatay Üniversitesi", sektor: "tarım, otomotiv yan sanayi, makine, gıda, eğitim", vurgu: "Konya OSB'deki 1500+ firma — makine ve otomotiv yan sanayi için yoğun e-imza ve e-fatura", profil: "makine firmaları, tarım üreticileri, eğitim kurumları" },
  kutahya: { plaka: "43", universite: "Kütahya Dumlupınar Üniversitesi", sektor: "porselen-seramik (KÜTAHYA Porselen), maden", vurgu: "Kütahya porselen ve seramik fabrikaları için e-imza ve e-fatura", profil: "seramik üreticileri, maden işletmecileri" },
  malatya: { plaka: "44", universite: "İnönü Üniversitesi", sektor: "kayısı ihracatı, tekstil, gıda", vurgu: "Malatya kayısı ihracatçıları ve tekstil firmaları için e-imza/KEP", profil: "kayısı ihracatçıları, tekstil üreticileri" },
  manisa: { plaka: "45", universite: "Manisa Celal Bayar Üniversitesi", sektor: "beyaz eşya (Vestel), tarım (üzüm), otomotiv yan sanayi", vurgu: "Vestel City ve Manisa OSB'deki firmalar için yoğun e-imza ve KEP", profil: "elektronik firmaları, tarım ihracatçıları" },
  mardin: { plaka: "47", universite: "Mardin Artuklu Üniversitesi", sektor: "turizm, telkari (gümüş), tarım", vurgu: "Mardin turizm işletmeleri ve telkari ustaları için e-imza", profil: "otel işletmecileri, esnaf, tarım üreticileri" },
  mersin: { plaka: "33", universite: "Mersin Üniversitesi", sektor: "liman, ihracat (Akdeniz), narenciye, lojistik", vurgu: "Mersin Limanı ve serbest bölge firmaları için yoğun e-imza ve KEP", profil: "ihracat firmaları, lojistik şirketleri, tarım üreticileri" },
  mugla: { plaka: "48", universite: "Muğla Sıtkı Koçman Üniversitesi", sektor: "turizm (Bodrum-Marmaris-Fethiye), yat, tarım, mermer", vurgu: "Bodrum, Marmaris, Fethiye otel ve restoran işletmecileri için e-imza ve e-fatura", profil: "otel işletmecileri, yat firmaları, gayrimenkul firmaları" },
  mus: { plaka: "49", universite: "Muş Alparslan Üniversitesi", sektor: "tarım, hayvancılık", vurgu: "Muş tarım kooperatifleri için e-imza", profil: "tarım kooperatifleri, hayvancılık işletmecileri" },
  nevsehir: { plaka: "50", universite: "Nevşehir Hacı Bektaş Veli Üniversitesi", sektor: "turizm (Kapadokya), gıda, tarım", vurgu: "Kapadokya otel ve balon işletmeleri için e-imza ve e-fatura", profil: "otel ve balon işletmecileri, gastronomi firmaları" },
  nigde: { plaka: "51", universite: "Niğde Ömer Halisdemir Üniversitesi", sektor: "tarım (patates, elma), maden, taşıma", vurgu: "Niğde patates ve elma üreticileri ile maden firmaları için e-imza", profil: "tarım kooperatifleri, maden firmaları" },
  ordu: { plaka: "52", universite: "Ordu Üniversitesi", sektor: "fındık ihracatı, balıkçılık", vurgu: "Ordu fındık ihracatçıları için e-imza ve KEP zorunluluğu", profil: "fındık ihracatçıları, balıkçı kooperatifleri" },
  osmaniye: { plaka: "80", universite: "Osmaniye Korkut Ata Üniversitesi", sektor: "demir-çelik, gıda, hidroelektrik", vurgu: "Osmaniye OSB demir-çelik ve gıda firmaları için e-imza ve e-fatura", profil: "demir-çelik firmaları, gıda üreticileri" },
  rize: { plaka: "53", universite: "Recep Tayyip Erdoğan Üniversitesi", sektor: "çay üretimi (ÇAYKUR), balıkçılık, turizm (yayla)", vurgu: "ÇAYKUR ve özel çay üreticileri için e-imza", profil: "çay üreticileri, balıkçı kooperatifleri" },
  sakarya: { plaka: "54", universite: "Sakarya Üniversitesi, Sakarya Uygulamalı Bilimler Üniversitesi", sektor: "otomotiv (Toyota), beyaz eşya, demiryolu", vurgu: "Toyota Türkiye, Sakarya OSB ve TÜVASAŞ'taki firmalar için yoğun e-imza ve KEP kullanımı. UMAY TÜM BİLİŞİM merkez ofisi de Sakarya'dadır.", profil: "otomotiv firmaları, demiryolu işletmecileri, mali müşavirler" },
  samsun: { plaka: "55", universite: "Ondokuz Mayıs Üniversitesi", sektor: "tarım (tütün-fındık), liman, gübre", vurgu: "Samsun limanı ve TEKEL'deki firmalar için yoğun e-imza", profil: "tarım firmaları, lojistik şirketleri, ihracatçılar" },
  sanliurfa: { plaka: "63", universite: "Harran Üniversitesi", sektor: "tekstil, tarım (pamuk), gastronomi (lahmacun-çiğköfte)", vurgu: "Şanlıurfa tekstil ve tarım ihracatçıları için e-imza/KEP", profil: "tekstil firmaları, pamuk üreticileri, gastronomi işletmeleri" },
  siirt: { plaka: "56", universite: "Siirt Üniversitesi", sektor: "tarım (fıstık), petrol", vurgu: "Siirt fıstığı ihracatçıları için e-imza", profil: "fıstık üreticileri, petrol firmaları" },
  sinop: { plaka: "57", universite: "Sinop Üniversitesi", sektor: "balıkçılık, turizm, ormancılık", vurgu: "Sinop balıkçı kooperatifleri ve turizm işletmecileri için e-imza", profil: "balıkçı kooperatifleri, otel işletmecileri" },
  sirnak: { plaka: "73", universite: "Şırnak Üniversitesi", sektor: "maden (asfaltit), sınır ticareti, petrol", vurgu: "Habur sınır kapısı ticareti yapan firmalar için e-imza", profil: "ihracatçılar, maden firmaları" },
  sivas: { plaka: "58", universite: "Cumhuriyet Üniversitesi", sektor: "demir-çelik, tarım, eğitim", vurgu: "Sivas demir-çelik ve OSB firmaları için e-imza ve e-fatura", profil: "sanayi firmaları, eğitim kurumları" },
  tekirdag: { plaka: "59", universite: "Tekirdağ Namık Kemal Üniversitesi", sektor: "tarım (ayçiçeği), sanayi (Çorlu-Çerkezköy OSB), liman", vurgu: "Çorlu ve Çerkezköy OSB'deki binlerce firma için yoğun e-imza, KEP, e-fatura kullanımı", profil: "tekstil firmaları, lojistik şirketleri, mali müşavirler" },
  tokat: { plaka: "60", universite: "Tokat Gaziosmanpaşa Üniversitesi", sektor: "tarım, sanayi, eğitim", vurgu: "Tokat OSB ve tarım üreticileri için e-imza", profil: "tarım üreticileri, sanayi firmaları" },
  trabzon: { plaka: "61", universite: "Karadeniz Teknik Üniversitesi", sektor: "fındık, balıkçılık, turizm (Uzungöl-Sumela), liman", vurgu: "Trabzon limanı ve fındık ihracatçıları için yoğun e-imza ve KEP", profil: "fındık ihracatçıları, otel işletmecileri, lojistik firmaları" },
  tunceli: { plaka: "62", universite: "Munzur Üniversitesi", sektor: "tarım, ormancılık, turizm (Munzur)", vurgu: "Tunceli üreticileri için e-imza", profil: "tarım kooperatifleri, küçük ölçekli üreticiler" },
  usak: { plaka: "64", universite: "Uşak Üniversitesi", sektor: "tekstil (battaniye), seramik, deri", vurgu: "Uşak tekstil ve seramik firmaları için e-imza ve KEP", profil: "tekstil firmaları, seramik üreticileri" },
  van: { plaka: "65", universite: "Van Yüzüncü Yıl Üniversitesi", sektor: "tarım, hayvancılık, sınır ticareti (İran), turizm", vurgu: "Van OSB ve İran sınır ticareti firmaları için e-imza", profil: "ihracatçılar, tarım üreticileri, otel işletmecileri" },
  yalova: { plaka: "77", universite: "Yalova Üniversitesi", sektor: "termal turizm, otomotiv yan sanayi, çiçekçilik", vurgu: "Yalova termal otelleri ve çiçek üreticileri için e-imza", profil: "otel işletmecileri, çiçek üreticileri" },
  yozgat: { plaka: "66", universite: "Bozok Üniversitesi", sektor: "tarım, hayvancılık, mermer", vurgu: "Yozgat mermer ve tarım üreticileri için e-imza", profil: "mermer firmaları, tarım kooperatifleri" },
  zonguldak: { plaka: "67", universite: "Bülent Ecevit Üniversitesi", sektor: "taşkömürü (TTK), demir-çelik (ERDEMİR), liman", vurgu: "ERDEMİR ve TTK'deki binlerce çalışan ve firma için yoğun e-imza", profil: "demir-çelik firmaları, maden işletmecileri, kamu çalışanları" }
};

const MARKER_PROFILE = "<!-- GEO-CITY-PROFILE-V1 -->";

function buildProfile(slug, data) {
  return `${MARKER_PROFILE}
<section class="section" style="padding-top:0">
  <div class="container">
    <div class="city-profile" style="display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:18px;margin:30px 0;padding:24px;background:linear-gradient(135deg,#f8fafc 0%,#eff6ff 100%);border-radius:14px;border:1px solid #e2e8f0">
      <div>
        <div style="font-size:.75rem;font-weight:800;letter-spacing:.5px;color:#64748b;margin-bottom:6px">PLAKA KODU</div>
        <div style="font-size:1.5rem;font-weight:900;color:var(--navy)">${data.plaka}</div>
      </div>
      <div>
        <div style="font-size:.75rem;font-weight:800;letter-spacing:.5px;color:#64748b;margin-bottom:6px">BAŞLICA ÜNİVERSİTE</div>
        <div style="font-size:.95rem;font-weight:700;color:var(--navy);line-height:1.4">${data.universite}</div>
      </div>
      <div>
        <div style="font-size:.75rem;font-weight:800;letter-spacing:.5px;color:#64748b;margin-bottom:6px">BASKIN SEKTÖRLER</div>
        <div style="font-size:.92rem;color:var(--navy);line-height:1.5">${data.sektor}</div>
      </div>
      <div>
        <div style="font-size:.75rem;font-weight:800;letter-spacing:.5px;color:#64748b;margin-bottom:6px">E-İMZA KULLANICI PROFİLİ</div>
        <div style="font-size:.92rem;color:var(--navy);line-height:1.5">${data.profil}</div>
      </div>
    </div>

    <div style="background:#fff;border-left:4px solid var(--accent);padding:20px 24px;border-radius:10px;margin-bottom:30px;box-shadow:0 1px 3px rgba(0,0,0,.04)">
      <h3 style="margin:0 0 8px;color:var(--navy);font-size:1.1rem">📍 ${slug.charAt(0).toUpperCase()}${slug.slice(1)}'da E-İmza Özelinde Neden Yoğun?</h3>
      <p style="margin:0;color:#334155;line-height:1.65">${data.vurgu}. UMAY TÜM BİLİŞİM Ayyıldız yetkili bayisi olarak bu sektörlerdeki firmalara WhatsApp tabanlı hızlı destek sunar.</p>
    </div>
  </div>
</section>`;
}

let updated = 0;
let skipped = 0;
const files = fs.readdirSync(ROOT).filter(f => f.endsWith(".html"));

for (const file of files) {
  const slug = file.replace(/\.html$/, "");
  const data = cityData[slug];
  if (!data) {
    console.log(`Skip (no data): ${file}`);
    skipped++;
    continue;
  }

  const filePath = path.join(ROOT, file);
  let html = fs.readFileSync(filePath, "utf8");

  if (html.includes(MARKER_PROFILE)) {
    skipped++;
    continue;
  }

  const profile = buildProfile(slug, data);
  // Insert AFTER the breadcrumb nav, before first <section class="section">
  html = html.replace(/(<nav class="breadcrumb">[\s\S]*?<\/nav>)/, "$1\n\n" + profile);

  fs.writeFileSync(filePath, html, "utf8");
  updated++;
}

console.log(`✅ Updated: ${updated} il sayfası | Skipped: ${skipped}`);
