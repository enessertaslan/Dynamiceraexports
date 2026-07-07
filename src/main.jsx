import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  Armchair,
  ArrowRight,
  Boxes,
  BrickWall,
  Cable,
  CarFront,
  CheckCircle2,
  ChevronDown as ChevronDownIcon,
  CircleAlert,
  Cog,
  FlaskConical,
  Globe2,
  HardHat,
  HeartPulse,
  Mail,
  MapPin,
  Menu,
  PackageCheck,
  PackageOpen,
  Phone,
  SearchCheck,
  Shield,
  ShieldCheck,
  Ship,
  Shirt,
  Shapes,
  Sparkles,
  SprayCan,
  Stethoscope,
  Tractor,
  Utensils,
  X,
  Zap,
} from "lucide-react";
import { AE, DE, FR, GB, NL, RU, TR } from "country-flag-icons/react/3x2";
import logoSvg from "./assets/dynamic-era-logo-original.svg?raw";
import "./styles.css";

const company = {
  name: "Dynamic Era Export",
  suffix: "Global Trade, Dynamic Solutions",
  phone: "+90 547 990 40 40",
  whatsapp: "905479904040",
  email: "info@dynamiceraexport.com",
  location: "Istanbul, Turkiye",
};
const web3FormsAccessKey = String(import.meta.env.VITE_WEB3FORMS_ACCESS_KEY || "").trim();

const languages = [
  { code: "tr", label: "TR", name: "Türkçe", dir: "ltr" },
  { code: "en", label: "EN", name: "English", dir: "ltr" },
  { code: "ru", label: "RU", name: "Русский", dir: "ltr" },
  { code: "fr", label: "FR", name: "Français", dir: "ltr" },
  { code: "de", label: "DE", name: "Deutsch", dir: "ltr" },
  { code: "nl", label: "NL", name: "Nederlands", dir: "ltr" },
  { code: "ar", label: "AR", name: "العربية", dir: "rtl" },
];

const languageFlags = {
  tr: TR,
  en: GB,
  ru: RU,
  fr: FR,
  de: DE,
  nl: NL,
  ar: AE,
};

function getInitialLanguage() {
  if (typeof navigator === "undefined") return "tr";
  const browserLanguages = navigator.languages?.length ? navigator.languages : [navigator.language];
  const supported = languages.map((language) => language.code);
  const matched = browserLanguages
    .map((language) => language?.toLowerCase().split("-")[0])
    .find((language) => supported.includes(language));
  return matched || "tr";
}

const categoryIcons = {
  energy: Zap,
  construction: HardHat,
  textile: Shirt,
  food: Utensils,
  health: HeartPulse,
  defense: ShieldCheck,
  electrical: Cable,
  machinery: Cog,
  furniture: Armchair,
  automotive: CarFront,
  plastic: Shapes,
  packaging: PackageOpen,
  cosmetics: FlaskConical,
  cleaning: SprayCan,
  agriculture: Tractor,
  medical: Stethoscope,
  rawMaterial: Boxes,
  buildingProducts: BrickWall,
  logisticsTrade: Ship,
  generalSourcing: SearchCheck,
};

const heroImages = [
  "https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=2100&q=84",
  "https://images.unsplash.com/photo-1494412651409-8963ce7935a7?auto=format&fit=crop&w=2100&q=84",
  "https://images.unsplash.com/photo-1553413077-190dd305871c?auto=format&fit=crop&w=2100&q=84",
];

const responsiveWidths = [640, 960, 1280, 1600];

function imageVariant(url, width = 1280, quality = 78) {
  try {
    const imageUrl = new URL(url);
    imageUrl.searchParams.set("auto", "format");
    imageUrl.searchParams.set("fm", "avif");
    imageUrl.searchParams.set("fit", "crop");
    imageUrl.searchParams.set("w", String(width));
    imageUrl.searchParams.set("q", String(quality));
    return imageUrl.toString();
  } catch {
    return url;
  }
}

function imageSrcSet(url, quality = 78) {
  return responsiveWidths.map((width) => `${imageVariant(url, width, quality)} ${width}w`).join(", ");
}

const partnerLogos = [
  { name: "Set Medikal", logo: "/logos/set-medikal.svg" },
  { name: "Çimsa", logo: "/logos/cimsa.avif" },
  { name: "Kipaş", logo: "/logos/kipas.svg" },
  { name: "Tat Gıda", logo: "/logos/tat-gida.avif" },
  { name: "Korozo Group", logo: "/logos/korozo-group.avif" },
];

const showcaseImages = {
  trade:
    "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1100&q=82",
  cargo:
    "https://images.unsplash.com/photo-1580674285054-bed31e145f59?auto=format&fit=crop&w=900&q=82",
  textile:
    "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&w=900&q=82",
  port:
    "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=82",
  logistics:
    "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=900&q=82",
  aboutFlow: "/about-global-logistics.avif",
  aboutMain:
    "https://images.unsplash.com/photo-1494412651409-8963ce7935a7?auto=format&fit=crop&w=1200&q=86",
  aboutSupply:
    "https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?auto=format&fit=crop&w=900&q=86",
  aboutProduct:
    "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=900&q=86",
};

const copy = {
  tr: {
    nav: ["Ana Sayfa", "Sektörler", "Hakkımızda", "İletişim"],
    whatsapp: "WhatsApp ile direkt iletişim",
    direct: "WhatsApp ile İletişime Geç",
    quoteCta: "Teklif Al",
    categoriesCta: "Tüm Sektörleri İncele",
    homeBadge: "Global Trade, Dynamic Solutions",
    homeTitle: "Global Ticarette Güvenilir Çözüm Ortağınız",
    homeText:
      "Enerjiden inşaat malzemelerine, tekstilden gıdaya, sağlıktan savunma sanayine kadar birçok alanda; doğru ürün, doğru tedarikçi ve doğru ticaret modeliyle müşterilerimize değer katıyoruz.\n\n20+ yıllık ticari deneyim, 1500+ müşteri ve 20+ sektörde güçlü tedarik ağıyla global ticaretin dinamik gücü.",
    heroStats: [
      ["20+", "Yıl Deneyim"],
      ["1500+", "Müşteri"],
      ["20+", "Ana Sektör"],
    ],
    quoteTitle: "Ticaretin Her Aşamasında Yanınızdayız",
    quoteText: "Ürün araştırmasından tedarik sürecine, fiyatlandırmadan lojistik planlamaya kadar uçtan uca destek sağlıyoruz.",
    trustTitle: "Ticaretin Her Aşamasında Yanınızdayız",
    trustText:
      "Ürün araştırmasından tedarik sürecine, fiyatlandırmadan lojistik planlamaya kadar ithalat ve ihracat operasyonlarında müşterilerimize uçtan uca destek sağlıyoruz.",
    servicesKicker: "Hizmetlerimiz",
    servicesLead:
      "Firmaların ithalat ve ihracat süreçlerinde ihtiyaç duyduğu ticari altyapıyı, tedarik ağını ve operasyonel desteği tek çatı altında sunuyoruz.",
    services: [
      ["Ürün Tedariki", "Yerel ve uluslararası tedarik ağımız üzerinden ürün araştırır, uygun tedarikçilerle bağlantı kurarız."],
      ["İthalat Süreçleri", "Yurt dışından temin edilecek ürünlerde tedarik, belge süreci ve lojistik koordinasyonunda destek sağlarız."],
      ["İhracat Çözümleri", "Türkiye’den farklı pazarlara ürün gönderimi yapmak isteyen firmalar için ürün, pazar ve operasyon çözümleri üretiriz."],
      ["Tedarikçi Araştırması", "Kalite, kapasite, fiyat dengesi ve teslimat şartlarına göre uygun tedarikçi seçenekleri sunarız."],
      ["Teklif ve Fiyatlandırma", "Talep edilen ürün grupları için rekabetçi ve karşılaştırılabilir teklif seçenekleri hazırlarız."],
      ["Lojistik ve Operasyon Takibi", "Teslimat, sevkiyat ve operasyonel takip süreçlerinde müşterilerimize düzenli destek oluruz."],
    ],
    processTitle: "Talebi analiz eder, doğru kaynağı bulur, operasyonu takip ederiz.",
    processLead:
      "Her sektörün kalite, teslimat, maliyet ve mevzuat beklentisi farklıdır; bu yüzden standart değil, talebe özel ticaret modeli kurarız.",
    processSteps: [
      ["01", "Talep Analizi", "Ürün grubu, hedef pazar, adet, kalite beklentisi ve teslimat planı netleştirilir."],
      ["02", "Tedarik Kaynağı", "Talebe uygun tedarikçiler araştırılır, fiyat ve operasyon seçenekleri karşılaştırılır."],
      ["03", "Ticaret Operasyonu", "Teklif, belge, lojistik ve teslimat süreci şeffaf iletişimle takip edilir."],
    ],
    ctaTitle: "Ticaret sürecinizi birlikte güçlendirelim.",
    ctaText:
      "İhtiyacınız olan ürün, tedarikçi veya ithalat-ihracat çözümü için bizimle iletişime geçin. Size en uygun ticaret modelini oluşturalım.",
    hero: [
      {
        eyebrow: "Global Trade, Dynamic Solutions",
        title: "Dünyaya açılan dinamik ticaret gücü.",
        text: "Dynamic Era Export, farklı sektörlerdeki ürünleri uluslararası pazarlara güvenilir, hızlı ve profesyonel ihracat çözümleriyle ulaştırır.",
      },
      {
        eyebrow: "Geniş sektör ve ürün ağı",
        title: "Enerjiden gıdaya, tekstilden sağlığa çok yönlü ticaret çözümleri.",
        text: "Müşterilerimizin taleplerine göre ürün araştırması, tedarik, fiyatlandırma ve operasyon süreçlerini profesyonel şekilde yönetiyoruz.",
      },
      {
        eyebrow: "20+ yıllık ticari deneyim",
        title: "Global ticaretin dinamik gücüyle sürecinizi hızlandırın.",
        text: "1500+ müşteri ve geniş sektör ağıyla firmalara hızlı, esnek ve sürdürülebilir ticaret çözümleri sunuyoruz.",
      },
    ],
    metrics: [
      ["20+", "yıldır hizmet"],
      ["1500+", "müşteri"],
      ["20", "faaliyet alanı"],
      ["360°", "ticaret desteği"],
    ],
    categoryTitle: "Öne Çıkan Faaliyet Alanlarımız",
    categoryLead:
      "Dynamic Era Exporters, farklı sektörlerin ihtiyaç duyduğu ürün ve malzeme gruplarında geniş bir ticaret ağına sahiptir.",
    allCategoriesCta: "Tüm Faaliyet Alanlarımızı Görün",
    categories: {
      energy: ["Enerji", "Ekipman, altyapı ürünleri, elektrik malzemeleri ve yenilenebilir enerji destek ürünleri."],
      construction: ["İnşaat Malzemeleri", "Yapı malzemeleri, altyapı ürünleri, mekanik ekipmanlar ve proje bazlı ihtiyaçlar."],
      textile: ["Tekstil", "Kumaş, hazır giyim, iş kıyafetleri, teknik tekstil ve farklı tekstil grupları."],
      food: ["Gıda", "Temel gıda ürünleri, paketli gıda, tarımsal ürünler ve güvenilir ticaret çözümleri."],
      health: ["Sağlık", "Medikal ürünler, sarf malzemeleri, sağlık ekipmanları ve sektörel tedarik çözümleri."],
      defense: ["Savunma Sanayi", "Mevzuata uygunluk, gizlilik ve operasyonel disiplinle profesyonel tedarik süreçleri."],
    },
    categoryDetails: {
      energy: {
        title: "Enerji",
        text: "Enerji sektörü için ekipman, altyapı ürünleri, elektrik malzemeleri ve yenilenebilir enerji destek ürünleri başta olmak üzere farklı ürün gruplarında tedarik çözümleri sunuyoruz.",
        points: ["Enerji ekipmanları", "Elektrik malzemeleri", "Proje bazlı tedarik"],
      },
      construction: {
        title: "İnşaat Malzemeleri",
        text: "Yapı malzemeleri, altyapı ürünleri, mekanik ekipmanlar, tamamlayıcı inşaat ürünleri ve proje bazlı ihtiyaçlara yönelik tedarik hizmetleri sağlıyoruz.",
        points: ["Yapı ve altyapı ürünleri", "Mekanik ekipmanlar", "Proje bazlı ihtiyaçlar"],
      },
      textile: {
        title: "Tekstil",
        text: "Kumaş, hazır giyim, iş kıyafetleri, teknik tekstil ürünleri ve farklı tekstil gruplarında iç ve dış ticaret çözümleri sunuyoruz.",
        points: ["Kumaş ve hazır giyim", "İş kıyafetleri", "Teknik tekstil ürünleri"],
      },
      food: {
        title: "Gıda",
        text: "Temel gıda ürünleri, paketli gıda, tarımsal ürünler ve farklı gıda kategorilerinde güvenilir tedarik ve ticaret çözümleri geliştiriyoruz.",
        points: ["Temel gıda", "Paketli ürünler", "Tarımsal ürünler"],
      },
      health: {
        title: "Sağlık",
        text: "Medikal ürünler, sarf malzemeleri, sağlık ekipmanları ve sektörel ihtiyaçlara yönelik tedarik çözümleri sunuyoruz.",
        points: ["Medikal ürünler", "Sarf malzemeleri", "Sağlık ekipmanları"],
      },
      defense: {
        title: "Savunma Sanayi",
        text: "Savunma sanayi alanında mevzuata uygunluk, gizlilik ve operasyonel disiplin ilkeleriyle sektörel tedarik süreçlerine yönelik profesyonel çözümler geliştiriyoruz.",
        points: ["Mevzuata uygunluk", "Gizlilik ve disiplin", "Sektörel tedarik"],
      },
    },
    categoryPageTitle: "Sektörler / Faaliyet Alanları",
    categoryPageLead:
      "Tüm faaliyet alanlarımızda müşterilerimizin taleplerine göre ürün ve tedarik çözümleri geliştiriyoruz.",
    categoryScrollHint: "Listeyi kaydırarak tüm sektörleri görün",
    categoryCustomCtaTitle: "Listede göremediğiniz ürün grubu için bize ulaşın.",
    categoryCustomCtaText:
      "İhtiyacınız olan ürün grubunu listede göremiyorsanız bizimle iletişime geçin. Dynamic Era Exporters, farklı sektörlerdeki özel talepleriniz için size uygun tedarik seçeneklerini araştırabilir.",
    categoryCustomCtaButton: "WhatsApp ile İletişime Geç",
    allSectorsTitle: "Tüm Sektörler",
    allSectorsLead:
      "Dynamic Era Exporters, farklı sektörlerdeki ürün ve tedarik ihtiyaçlarına yönelik geniş kapsamlı ticaret çözümleri sunar.",
    allSectors: [
      ["Enerji", "Ekipman, altyapı ürünleri, elektrik malzemeleri ve yenilenebilir enerji destek ürünleri."],
      ["İnşaat Malzemeleri", "Yapı malzemeleri, altyapı ürünleri, mekanik ekipmanlar ve proje bazlı ihtiyaçlar."],
      ["Tekstil", "Kumaş, hazır giyim, iş kıyafetleri, teknik tekstil ürünleri ve farklı tekstil grupları."],
      ["Gıda", "Temel gıda ürünleri, paketli gıda, tarımsal ürünler ve güvenilir ticaret çözümleri."],
      ["Sağlık", "Medikal ürünler, sarf malzemeleri, sağlık ekipmanları ve sektörel tedarik çözümleri."],
      ["Savunma Sanayi", "Mevzuata uygunluk, gizlilik ve operasyonel disiplinle profesyonel tedarik süreçleri."],
      ["Elektrik & Elektronik", "Elektrik malzemeleri, elektronik ürünler, bağlantı ekipmanları ve aydınlatma ürünleri."],
      ["Makine & Ekipman", "Sanayi makineleri, üretim ekipmanları, yedek parçalar ve teknik ekipman ihtiyaçları."],
      ["Mobilya", "Ev, ofis, ticari alan ve proje bazlı mobilya ürünlerinde geniş tedarik seçenekleri."],
      ["Otomotiv", "Otomotiv yedek parçaları, ekipmanlar, aksesuarlar ve sektörel ürün grupları."],
      ["Plastik & Kauçuk", "Plastik ürünler, kauçuk malzemeler, teknik parçalar ve endüstriyel ürün grupları."],
      ["Ambalaj", "Gıda, tekstil, sanayi ve perakende sektörleri için ambalaj ve paketleme çözümleri."],
      ["Kozmetik", "Kozmetik ürünler, kişisel bakım ürünleri, hijyen ürünleri ve ilgili ürün grupları."],
      ["Temizlik Ürünleri", "Endüstriyel temizlik ürünleri, hijyen malzemeleri, sarf ürünleri ve kurumsal kullanım ürünleri."],
      ["Tarım Ürünleri", "Tarımsal ürünler, gıda hammaddeleri ve tarım sektörüne yönelik ticari çözümler."],
      ["Medikal Ürünler", "Sağlık kuruluşları ve medikal tedarik firmaları için ürün grubu tedarik desteği."],
      ["Hammadde", "Farklı sektörlerin üretim süreçlerinde ihtiyaç duyduğu hammadde grupları."],
      ["Yapı Ürünleri", "İnşaat, dekorasyon ve yapı projelerinde kullanılan tamamlayıcı ürün grupları."],
      ["Lojistik Destekli Ticaret", "Tedarik sürecinin sevkiyat, teslimat ve operasyon takibi aşamalarında koordinasyon desteği."],
      ["Genel Tedarik Çözümleri", "Belirli bir kategoriyle sınırlı kalmadan özel ürün taleplerine yönelik araştırma ve tedarik çözümleri."],
    ],
    aboutIntroTitle: "Hakkımızda",
    aboutIntroText:
      "Dynamic Era Exporters, iç ve dış ticaret alanında faaliyet gösteren; farklı sektörlerdeki ürün ve tedarik ihtiyaçlarına profesyonel çözümler sunan bir ticaret şirketidir. Kurulduğu günden bu yana temel hedefimiz, müşterilerimizin ihtiyaç duyduğu ürünleri doğru tedarik kaynaklarıyla buluşturmak ve ithalat ile ihracat süreçlerini güvenilir şekilde yönetmektir.",
    aboutMore: "Hakkımızda Daha Fazla Bilgi",
    homeAboutEyebrow: "Dynamic Era Export",
    homeAboutTitle: "Tedarik ihtiyacınızı doğru ticaret modeline dönüştürüyoruz.",
    homeAboutText:
      "Enerjiden tekstile, gıdadan sağlığa kadar farklı sektörlerde ürün araştırması, tedarikçi karşılaştırması, teklif süreci ve operasyon takibini tek merkezden yönetiyoruz. Talebinizi netleştiriyor, doğru kaynağı buluyor ve süreci şeffaf iletişimle ilerletiyoruz.",
    homeAboutValues: ["Talebe özel tedarik araştırması", "Sektör bazlı ürün ağı", "Şeffaf operasyon takibi"],
    homeAboutButton: "Çalışma Modelimizi İncele",
    aboutTitle: "Hakkımızda",
    aboutText:
      "Dynamic Era Exporters, iç ve dış ticaret alanında faaliyet gösteren; farklı sektörlerdeki ürün ve tedarik ihtiyaçlarına profesyonel çözümler sunan bir ticaret şirketidir.",
    aboutSupport:
      "Günümüz global ticaret dünyasında firmalar yalnızca ürün aramaz; güvenilir tedarikçi, doğru fiyatlandırma, sürdürülebilir iş ilişkisi, operasyonel takip ve hızlı iletişim de bekler. Dynamic Era Exporters olarak biz, bu ihtiyaçların tamamını dikkate alan bütüncül bir ticaret yaklaşımı benimsiyoruz.",
    aboutHeroNote:
      "Bu yaklaşım sayesinde firmaların hem yerel hem de uluslararası pazarlarda daha güvenli ve verimli ticaret yapmasına katkı sağlıyoruz.",
    aboutFlowTitle: "Geniş sektör ağımızla ticaret sürecinizi uçtan uca yönetiyoruz",
    aboutFlowText1:
      "Enerji, inşaat malzemeleri, tekstil, gıda, sağlık, savunma sanayi, elektrik-elektronik, makine, mobilya, otomotiv, ambalaj, plastik, tarım ürünleri ve daha birçok alanda geniş ürün ve sektör ağıyla müşterilerimize hizmet veriyoruz. Her sektörde farklı ihtiyaçların, farklı standartların ve farklı operasyon süreçlerinin olduğunu biliyor; bu doğrultuda müşterilerimize özel çözümler geliştiriyoruz.",
    aboutFlowText2:
      "Dynamic Era Exporters için ticaret yalnızca alım-satım süreci değildir. Bizim için ticaret; doğru ürünü bulmak, güvenilir tedarikçiyle çalışmak, rekabetçi fiyat sunmak, teslimat sürecini takip etmek ve müşterinin operasyonel yükünü azaltmak anlamına gelir. Müşterilerimizin taleplerini detaylı şekilde analiz eder, uygun tedarik kaynaklarını belirler ve sürecin her aşamasında şeffaf iletişim kurarız.",
    aboutPillars: [
      ["Vizyonumuz", "Global ticarette güvenilirliği, hızı ve çözüm odaklı yaklaşımıyla öne çıkan; farklı sektörlerde müşterilerine sürdürülebilir tedarik çözümleri sunan güçlü bir ticaret markası olmak."],
      ["Misyonumuz", "Müşterilerimizin ithalat, ihracat ve tedarik ihtiyaçlarını doğru analiz ederek; kaliteli ürün, güvenilir kaynak, rekabetçi fiyat ve profesyonel operasyon desteğiyle en uygun ticaret çözümlerini sunmak."],
      ["Yaklaşımımız", "Her iş birliğini uzun vadeli bir ticari ilişki olarak görür, yalnızca anlık ürün taleplerine değil müşterilerimizin gelecekteki ihtiyaçlarına da odaklanırız."],
    ],
    aboutOperationsEyebrow: "Ne Yapıyoruz?",
    aboutOperationsTitle: "İthalat, ihracat ve tedarik süreçlerinde uçtan uca destek sağlıyoruz.",
    aboutOperations: [
      ["01", "İthalat ve ihracat desteği", "İthalat ve ihracat süreçlerinde ticari destek sağlıyoruz."],
      ["02", "Ürün ve tedarik araştırması", "Farklı sektörler için ürün ve tedarikçi araştırması yapıyoruz."],
      ["03", "Talebe uygun ürün grupları", "Müşteri taleplerine göre uygun ürün gruplarını belirliyoruz."],
      ["04", "Tedarikçi bağlantıları", "Yerel ve uluslararası tedarikçilerle bağlantı kuruyoruz."],
      ["05", "Teklif ve operasyon", "Teklif, fiyatlandırma ve operasyon süreçlerini yönetiyoruz."],
      ["06", "Sürdürülebilir tedarik", "Geniş ürün kategorilerinde sürdürülebilir tedarik çözümleri sunuyoruz."],
    ],
    aboutValuesEyebrow: "Değerlerimiz",
    aboutValuesTitle: "Ticaretin temelinde güven, hız, esneklik ve global bakış açısı olduğuna inanıyoruz.",
    aboutValues: [
      ["Güvenilirlik", "Tüm iş süreçlerimizde şeffaf, sorumlu ve sürdürülebilir bir yaklaşım benimsiyoruz."],
      ["Hız", "Müşteri taleplerine hızlı dönüş yapar, süreci etkin şekilde planlar ve operasyonel akışı yakından takip ederiz."],
      ["Esneklik", "Standart kalıplar yerine projeye, ürüne ve talebe özel çözümler üretiriz."],
      ["Global Bakış Açısı", "Farklı pazarları, ürün gruplarını ve tedarik kaynaklarını değerlendirerek daha geniş seçenekler sunarız."],
    ],
    aboutCtaEyebrow: "Dynamic Era Exporters ile Çalışmak",
    aboutCtaTitle: "Ticaret sürecinizi daha güvenli, daha hızlı ve daha verimli hale getirelim.",
    aboutCtaText:
      "İster belirli bir ürün grubu için tedarik arayışında olun, ister ithalat-ihracat süreçleriniz için profesyonel destek isteyin; ekibimiz size en uygun çözümü geliştirmek için hazırdır.",
    aboutCtaPrimary: "WhatsApp ile iletişime geç",
    aboutCtaEmail: "E-posta ile Ulaş",
    aboutCtaSecondary: "İletişim sayfası",
    values: ["Geniş ürün ve sektör ağı", "Güvenilir ticaret süreci", "Esnek ve hızlı çözümler", "Uluslararası ticaret deneyimi"],
    contactTitle: "İletişim",
    contactLead:
      "Aradığınız ürün, hedef ülke veya kategori ne olursa olsun kısa bir mesajla başlayabiliriz.",
    form: {
      name: "Ad Soyad",
      company: "Firma",
      email: "E-posta",
      message: "Ne arıyorsunuz?",
      send: "Mail Gönder",
      sending: "Gönderiliyor...",
      configTitle: "Form servisi yapılandırılmadı",
      configText: "Mesaj göndermek için Web3Forms erişim anahtarının eklenmesi gerekiyor. Bu sırada WhatsApp üzerinden bize ulaşabilirsiniz.",
      successTitle: "Mesajınız başarıyla gönderildi",
      successText: "Teşekkür ederiz. Size en kısa sürede dönüş sağlayacağız.",
      errorTitle: "Mesaj gönderilemedi",
      errorText: "Lütfen biraz sonra tekrar deneyin veya WhatsApp üzerinden bize ulaşın.",
      rateTitle: "Lütfen biraz bekleyin",
      rateText: "Spam güvenliği için bir dakika içinde yalnızca bir mesaj gönderebilirsiniz.",
      close: "Kapat",
    },
    partnersTitle: "Global Ticaret Ekosistemi",
    importantLinksTitle: "Önemli Linkler",
    footerWhatsappTitle: "WhatsApp'tan Ulaşın",
    footerWhatsappText: "Ürün, sektör veya tedarik talebiniz için doğrudan bizimle iletişime geçin.",
    footer: "İthalat, ihracat ve global tedarik operasyonlarında net iletişim.",
    copyright: "© Copyright 2026 Dynamic Era Exporters. Tüm hakları saklıdır.",
  },
  en: {
    nav: ["Home", "Sectors", "About Us", "Contact"],
    whatsapp: "Direct WhatsApp contact",
    direct: "Contact via WhatsApp",
    quoteCta: "Get a Quote",
    categoriesCta: "View All Sectors",
    homeBadge: "Global Trade, Dynamic Solutions",
    homeTitle: "Your Reliable\nSolution Partner in\nGlobal Trade",
    homeText:
      "From energy to construction materials, from textile to food, from health to the defense industry, we create value for our customers with the right product, the right supplier and the right trade model.\n\nWith 20+ years of commercial experience, 1500+ customers and a strong supply network across 20+ sectors, we are the dynamic power of global trade.",
    heroStats: [
      ["20+", "Years Experience"],
      ["1500+", "Customers"],
      ["20+", "Main Sectors"],
    ],
    quoteTitle: "We Are With You at Every Stage of Trade",
    quoteText: "From product research and sourcing to pricing and logistics planning, we provide end-to-end support.",
    trustTitle: "We Are With You at Every Stage of Trade",
    trustText:
      "From product research and sourcing to pricing and logistics planning, we provide end-to-end support in import and export operations.",
    servicesKicker: "Our Services",
    servicesLead:
      "We provide the commercial infrastructure, supply network and operational support companies need in import and export processes under one roof.",
    services: [
      ["Product Sourcing", "We research products through our local and international supply network and connect you with suitable suppliers."],
      ["Import Processes", "For products sourced from abroad, we support sourcing, documentation and logistics coordination."],
      ["Export Solutions", "We create product, market and operation solutions for companies that want to export from Turkey to different markets."],
      ["Supplier Research", "We offer suitable supplier options based on quality, capacity, price balance and delivery terms."],
      ["Quotation and Pricing", "We prepare competitive and comparable quotation options for requested product groups."],
      ["Logistics and Operation Tracking", "We provide regular support throughout delivery, shipment and operational follow-up processes."],
    ],
    processTitle: "We analyze demand, find the right source and follow the operation.",
    processLead:
      "Every sector has different expectations for quality, delivery, cost and compliance; therefore, we build a demand-specific trade model rather than a standard process.",
    processSteps: [
      ["01", "Demand Analysis", "Product group, target market, quantity, quality expectation and delivery plan are clarified."],
      ["02", "Supply Source", "Suitable suppliers are researched, and price and operation options are compared."],
      ["03", "Trade Operation", "Quotation, documentation, logistics and delivery processes are followed with transparent communication."],
    ],
    ctaTitle: "Let's strengthen your trade process together.",
    ctaText:
      "Contact us for the product, supplier or import-export solution you need. Let's build the most suitable trade model for you.",
    hero: [
      {
        eyebrow: "Global Trade, Dynamic Solutions",
        title: "A dynamic trade power opening to the world.",
        text: "Dynamic Era Export delivers products from different sectors to international markets with reliable, fast and professional export solutions.",
      },
      {
        eyebrow: "Wide sector and product network",
        title: "Versatile trade solutions from energy to food, textile to health.",
        text: "We professionally manage product research, sourcing, pricing and operation processes according to customer demand.",
      },
      {
        eyebrow: "20+ years of commercial experience",
        title: "Accelerate your process with the dynamic power of global trade.",
        text: "With 1500+ customers and a wide sector network, we offer fast, flexible and sustainable trade solutions.",
      },
    ],
    metrics: [
      ["20+", "years of service"],
      ["1500+", "customers"],
      ["20", "business areas"],
      ["360°", "trade support"],
    ],
    categoryTitle: "Featured Business Areas",
    categoryLead:
      "Dynamic Era Exporters has a wide trade network across product and material groups needed by different sectors.",
    allCategoriesCta: "View All Business Areas",
    categories: {
      energy: ["Energy", "Equipment, infrastructure products, electrical materials and renewable energy support products."],
      construction: ["Construction Materials", "Building materials, infrastructure products, mechanical equipment and project-based needs."],
      textile: ["Textile", "Fabric, ready-to-wear, workwear, technical textile and different textile groups."],
      food: ["Food", "Staple food products, packaged food, agricultural products and reliable trade solutions."],
      health: ["Health", "Medical products, consumables, healthcare equipment and sector-specific supply solutions."],
      defense: ["Defense Industry", "Professional supply processes with compliance, confidentiality and operational discipline."],
    },
    categoryDetails: {
      energy: {
        title: "Energy",
        text: "For the energy sector, we provide sourcing solutions across different product groups, especially equipment, infrastructure products, electrical materials and renewable energy support products.",
        points: ["Energy equipment", "Electrical materials", "Project-based sourcing"],
      },
      construction: {
        title: "Construction Materials",
        text: "We provide sourcing services for building materials, infrastructure products, mechanical equipment, complementary construction products and project-based needs.",
        points: ["Building and infrastructure products", "Mechanical equipment", "Project-based needs"],
      },
      textile: {
        title: "Textile",
        text: "We offer domestic and international trade solutions for fabric, ready-to-wear, workwear, technical textile products and different textile groups.",
        points: ["Fabric and ready-to-wear", "Workwear", "Technical textile products"],
      },
      food: {
        title: "Food",
        text: "We develop reliable sourcing and trade solutions for staple food products, packaged food, agricultural products and different food categories.",
        points: ["Staple food", "Packaged products", "Agricultural products"],
      },
      health: {
        title: "Health",
        text: "We provide sourcing solutions for medical products, consumables, healthcare equipment and sector-specific needs.",
        points: ["Medical products", "Consumables", "Healthcare equipment"],
      },
      defense: {
        title: "Defense Industry",
        text: "In the defense industry, we develop professional solutions for sector-specific supply processes with principles of compliance, confidentiality and operational discipline.",
        points: ["Compliance", "Confidentiality and discipline", "Sector-specific supply"],
      },
    },
    categoryPageTitle: "Sectors / Business Areas",
    categoryPageLead:
      "Across all our business areas, we develop product and sourcing solutions according to customer demand.",
    categoryScrollHint: "Scroll the list to view all sectors",
    categoryCustomCtaTitle: "Contact us for product groups not listed here.",
    categoryCustomCtaText:
      "If you cannot see the product group you need in the list, contact us. Dynamic Era Exporters can research suitable sourcing options for your special requests across different sectors.",
    categoryCustomCtaButton: "Contact via WhatsApp",
    allSectorsTitle: "All Sectors",
    allSectorsLead:
      "Dynamic Era Exporters offers comprehensive trade solutions for product and sourcing needs across different sectors.",
    allSectors: [
      ["Energy", "Equipment, infrastructure products, electrical materials and renewable energy support products."],
      ["Construction Materials", "Building materials, infrastructure products, mechanical equipment and project-based needs."],
      ["Textile", "Fabric, ready-to-wear, workwear, technical textile products and different textile groups."],
      ["Food", "Staple food products, packaged food, agricultural products and reliable trade solutions."],
      ["Health", "Medical products, consumables, healthcare equipment and sector-specific sourcing solutions."],
      ["Defense Industry", "Professional sourcing processes with compliance, confidentiality and operational discipline."],
      ["Electrical & Electronics", "Electrical materials, electronic products, connection equipment and lighting products."],
      ["Machinery & Equipment", "Industrial machinery, production equipment, spare parts and technical equipment needs."],
      ["Furniture", "Wide sourcing options for home, office, commercial space and project-based furniture products."],
      ["Automotive", "Automotive spare parts, equipment, accessories and sector-specific product groups."],
      ["Plastic & Rubber", "Plastic products, rubber materials, technical parts and industrial product groups."],
      ["Packaging", "Packaging products and packing solutions for food, textile, industrial and retail sectors."],
      ["Cosmetics", "Cosmetic products, personal care products, hygiene products and related product groups."],
      ["Cleaning Products", "Industrial cleaning products, hygiene materials, consumables and corporate-use products."],
      ["Agricultural Products", "Agricultural products, food raw materials and trade solutions for the agriculture sector."],
      ["Medical Products", "Product sourcing support for healthcare institutions and medical supply companies."],
      ["Raw Materials", "Raw material groups needed in the production processes of different sectors."],
      ["Building Products", "Complementary product groups used in construction, decoration and building projects."],
      ["Logistics-Supported Trade", "Coordination support for shipment, delivery and operational tracking stages."],
      ["General Sourcing Solutions", "Research and sourcing solutions for special product requests beyond a single category."],
    ],
    aboutIntroTitle: "About Us",
    aboutIntroText:
      "Dynamic Era Exporters is a trade company operating in domestic and foreign trade with a wide product portfolio, strong supplier relationships and a solution-oriented approach.\n\nIt develops sourcing solutions suitable for customer needs in energy, construction materials, textile, food, health, defense industry and different trade categories. Our goal is not only to provide products, but to offer our customers a reliable, sustainable and efficient trade experience.\n\nWith our wide sector network, flexible operation structure and customer-oriented service approach, we position ourselves as a strong business partner in companies' import and export processes.",
    aboutMore: "More Information About Us",
    homeAboutEyebrow: "Dynamic Era Export",
    homeAboutTitle: "We turn sourcing needs into the right trade model.",
    homeAboutText:
      "Across energy, textile, food, health and many other sectors, we manage product research, supplier comparison, quotation and operational follow-up from one place. We clarify your demand, find the right source and keep the process moving with transparent communication.",
    homeAboutValues: ["Demand-specific sourcing", "Sector-based product network", "Transparent operation follow-up"],
    homeAboutButton: "Explore Our Working Model",
    aboutTitle: "About Us",
    aboutText:
      "Success in global trade depends on reaching the right product, at the right time and under the right conditions. We analyze our customers' needs, identify sourcing channels suitable for the sector and demand, and manage the trade process reliably.",
    aboutSupport:
      "At Dynamic Era Exporters, we go beyond finding products and manage every step of trade with trust, transparency and speed.",
    aboutFlowTitle: "Trade built on trust, speed and transparency",
    aboutFlowText1:
      "Since day one, our core goal has been to connect customers with the right sourcing channels, manage import and export processes reliably, and become a business partner that creates value at every stage of trade.",
    aboutFlowText2:
      "In today's global trade landscape, companies expect more than a product: a reliable supplier, correct pricing, sustainable business relationships, operational follow-up and fast communication. At Dynamic Era Exporters, we adopt a holistic trade approach that takes all of these needs into account.",
    aboutPillars: [
      ["Our Vision", "To become a strong trade brand known for reliability, speed and solution-focused thinking in global trade, while offering sustainable sourcing solutions across different sectors."],
      ["Our Mission", "To analyze our customers' import, export and sourcing needs correctly and deliver the most suitable trade solutions with quality products, reliable sources, competitive pricing and professional operational support."],
      ["Our Approach", "We see every collaboration as a long-term commercial relationship and focus not only on current product requests, but also on our customers' future needs."],
    ],
    aboutOperationsEyebrow: "What We Do",
    aboutOperationsTitle: "We provide end-to-end support in import, export and sourcing processes.",
    aboutOperations: [
      ["01", "Import and export support", "We provide commercial support in import and export processes."],
      ["02", "Product and supplier research", "We research products and suppliers for different sectors."],
      ["03", "Demand-fit product groups", "We identify suitable product groups based on customer demand."],
      ["04", "Supplier connections", "We connect with local and international suppliers."],
      ["05", "Quotes and operations", "We manage quotation, pricing and operational processes."],
      ["06", "Sustainable sourcing", "We offer sustainable sourcing solutions across broad product categories."],
    ],
    aboutValuesEyebrow: "Our Values",
    aboutValuesTitle: "We believe trust, speed, flexibility and a global perspective are the foundation of trade.",
    aboutValues: [
      ["Reliability", "We adopt a transparent, responsible and sustainable approach across all business processes."],
      ["Speed", "We respond quickly to customer requests, plan the process efficiently and closely track the operational flow."],
      ["Flexibility", "Instead of fixed patterns, we create project-specific, product-specific and demand-specific solutions."],
      ["Global Perspective", "By evaluating different markets, product groups and supply sources, we offer broader options."],
    ],
    aboutCtaEyebrow: "Working with Dynamic Era Exporters",
    aboutCtaTitle: "Let's make your trade process safer, faster and more efficient.",
    aboutCtaText:
      "Whether you are looking for a specific product group or need professional support for import-export processes, our team is ready to build the right solution for you.",
    aboutCtaPrimary: "Contact via WhatsApp",
    aboutCtaEmail: "Contact via Email",
    aboutCtaSecondary: "Contact page",
    values: ["Wide product and sector network", "Reliable trade process", "Flexible and fast solutions", "International trade experience"],
    contactTitle: "Contact",
    contactLead: "Whatever the product, target country or category you are looking for, we can start with a short message.",
    form: {
      name: "Full Name",
      company: "Company",
      email: "Email",
      message: "What are you looking for?",
      send: "Send Email",
      sending: "Sending...",
      configTitle: "Form service is not configured",
      configText: "A Web3Forms access key must be added before messages can be sent. You can contact us via WhatsApp in the meantime.",
      successTitle: "Your message was sent successfully",
      successText: "Thank you. We will get back to you as soon as possible.",
      errorTitle: "Message could not be sent",
      errorText: "Please try again shortly or contact us via WhatsApp.",
      rateTitle: "Please wait a moment",
      rateText: "For spam protection, you can send only one message per minute.",
      close: "Close",
    },
    partnersTitle: "Global Trade Ecosystem",
    importantLinksTitle: "Important Links",
    footerWhatsappTitle: "Reach Us on WhatsApp",
    footerWhatsappText: "Contact us directly for your product, sector or sourcing request.",
    footer: "Clear communication in import, export and global sourcing operations.",
    copyright: "© Copyright 2026 Dynamic Era Exporters. All rights reserved.",
  },
  ru: {
    nav: ["Главная", "Секторы", "О нас", "Контакты"],
    whatsapp: "Прямая связь в WhatsApp",
    direct: "Связаться в WhatsApp",
    quoteCta: "Получить предложение",
    categoriesCta: "Посмотреть все отрасли",
    homeBadge: "Global Trade, Dynamic Solutions",
    homeTitle: "Ваш надежный\nпартнер в\nмировой торговле",
    homeText:
      "От энергетики и строительных материалов до текстиля, продуктов питания, здравоохранения и оборонной промышленности: мы создаем ценность для клиентов через правильный продукт, правильного поставщика и правильную торговую модель.\n\nБолее 20 лет коммерческого опыта, 1500+ клиентов и сильная сеть поставок в 20+ секторах делают нас динамичной силой глобальной торговли.",
    heroStats: [
      ["20+", "лет опыта"],
      ["1500+", "клиентов"],
      ["20+", "основных секторов"],
    ],
    quoteTitle: "Мы рядом на каждом этапе торговли",
    quoteText: "От поиска продукта и поставки до ценообразования и логистического планирования мы обеспечиваем комплексную поддержку.",
    trustTitle: "Мы рядом на каждом этапе торговли",
    trustText:
      "От поиска продукта и поставки до ценообразования и логистического планирования мы обеспечиваем комплексную поддержку в импортных и экспортных операциях.",
    servicesKicker: "Наши услуги",
    servicesLead:
      "Мы объединяем коммерческую инфраструктуру, сеть поставок и операционную поддержку, которые нужны компаниям в процессах импорта и экспорта.",
    services: [
      ["Поиск продукции", "Мы исследуем продукты через нашу локальную и международную сеть поставок и связываем вас с подходящими поставщиками."],
      ["Импортные процессы", "Для продукции, поставляемой из-за рубежа, мы поддерживаем поиск поставщиков, документацию и логистическую координацию."],
      ["Экспортные решения", "Мы создаем продуктовые, рыночные и операционные решения для компаний, которые хотят экспортировать из Турции на разные рынки."],
      ["Поиск поставщиков", "Мы предлагаем подходящие варианты поставщиков с учетом качества, мощности, баланса цены и условий поставки."],
      ["Предложения и ценообразование", "Мы готовим конкурентные и сопоставимые коммерческие предложения для запрошенных групп продукции."],
      ["Логистика и операционный контроль", "Мы обеспечиваем регулярную поддержку на этапах доставки, отгрузки и операционного сопровождения."],
    ],
    processTitle: "Мы анализируем запрос, находим правильный источник и сопровождаем операцию.",
    processLead:
      "В каждом секторе разные ожидания по качеству, срокам, стоимости и соответствию требованиям; поэтому мы строим торговую модель под конкретный запрос, а не стандартный процесс.",
    processSteps: [
      ["01", "Анализ запроса", "Уточняются группа продукции, целевой рынок, количество, требования к качеству и план поставки."],
      ["02", "Источник поставки", "Исследуются подходящие поставщики, сравниваются цены и операционные варианты."],
      ["03", "Торговая операция", "Коммерческое предложение, документы, логистика и доставка сопровождаются прозрачной коммуникацией."],
    ],
    ctaTitle: "Давайте усилим ваш торговый процесс вместе.",
    ctaText:
      "Свяжитесь с нами по нужному продукту, поставщику или импортно-экспортному решению. Мы построим для вас наиболее подходящую торговую модель.",
    hero: [
      {
        eyebrow: "Global Trade, Dynamic Solutions",
        title: "Динамичная торговая сила, открывающая путь в мир.",
        text: "Dynamic Era Export поставляет продукцию из разных секторов на международные рынки через надежные, быстрые и профессиональные экспортные решения.",
      },
      {
        eyebrow: "Широкая сеть секторов и продуктов",
        title: "Гибкие торговые решения от энергетики до продуктов питания, от текстиля до здравоохранения.",
        text: "Мы профессионально управляем поиском продукции, поставками, ценообразованием и операционными процессами в соответствии с запросами клиентов.",
      },
      {
        eyebrow: "Более 20 лет коммерческого опыта",
        title: "Ускорьте процесс с динамичной силой глобальной торговли.",
        text: "1500+ клиентов и широкая секторная сеть позволяют нам предлагать быстрые, гибкие и устойчивые торговые решения.",
      },
    ],
    metrics: [
      ["20+", "лет работы"],
      ["1500+", "клиентов"],
      ["20", "направлений"],
      ["360°", "торговая поддержка"],
    ],
    categoryTitle: "Ключевые направления деятельности",
    categoryLead:
      "Dynamic Era Exporters обладает широкой торговой сетью по группам продукции и материалов, необходимых разным секторам.",
    allCategoriesCta: "Посмотреть все направления",
    categories: {
      energy: ["Энергетика", "Оборудование, инфраструктурные продукты, электрические материалы и продукты для возобновляемой энергетики."],
      construction: ["Строительные материалы", "Строительные материалы, инфраструктурные продукты, механическое оборудование и проектные потребности."],
      textile: ["Текстиль", "Ткани, готовая одежда, спецодежда, технический текстиль и разные текстильные группы."],
      food: ["Продукты питания", "Основные продукты питания, упакованные продукты, сельскохозяйственная продукция и надежные торговые решения."],
      health: ["Здравоохранение", "Медицинские продукты, расходные материалы, медицинское оборудование и отраслевые решения поставок."],
      defense: ["Оборонная промышленность", "Профессиональные процессы поставок с учетом соответствия требованиям, конфиденциальности и операционной дисциплины."],
    },
    categoryDetails: {
      energy: {
        title: "Энергетика",
        text: "Для энергетического сектора мы предлагаем решения по поставкам разных групп продукции, включая оборудование, инфраструктурные продукты, электрические материалы и продукты для возобновляемой энергетики.",
        points: ["Энергетическое оборудование", "Электрические материалы", "Проектные поставки"],
      },
      construction: {
        title: "Строительные материалы",
        text: "Мы предоставляем услуги поставки строительных материалов, инфраструктурных продуктов, механического оборудования, дополнительных строительных товаров и проектных потребностей.",
        points: ["Строительные и инфраструктурные продукты", "Механическое оборудование", "Проектные потребности"],
      },
      textile: {
        title: "Текстиль",
        text: "Мы предлагаем решения внутренней и международной торговли для тканей, готовой одежды, спецодежды, технического текстиля и разных текстильных групп.",
        points: ["Ткани и готовая одежда", "Спецодежда", "Технический текстиль"],
      },
      food: {
        title: "Продукты питания",
        text: "Мы разрабатываем надежные решения поставок и торговли для основных продуктов питания, упакованных товаров, сельскохозяйственной продукции и разных пищевых категорий.",
        points: ["Основные продукты", "Упакованные товары", "Сельскохозяйственная продукция"],
      },
      health: {
        title: "Здравоохранение",
        text: "Мы предоставляем решения по поставкам медицинских продуктов, расходных материалов, медицинского оборудования и отраслевых потребностей.",
        points: ["Медицинские продукты", "Расходные материалы", "Медицинское оборудование"],
      },
      defense: {
        title: "Оборонная промышленность",
        text: "В оборонной промышленности мы разрабатываем профессиональные решения для отраслевых процессов поставок с принципами соответствия, конфиденциальности и операционной дисциплины.",
        points: ["Соответствие требованиям", "Конфиденциальность и дисциплина", "Отраслевые поставки"],
      },
    },
    categoryPageTitle: "Секторы / направления деятельности",
    categoryPageLead:
      "Во всех наших направлениях деятельности мы разрабатываем продуктовые и поставочные решения в соответствии с запросами клиентов.",
    categoryScrollHint: "Прокрутите список, чтобы увидеть все сектора",
    categoryCustomCtaTitle: "Свяжитесь с нами по группам продукции, которых нет в списке.",
    categoryCustomCtaText:
      "Если вы не видите нужную группу продукции в списке, свяжитесь с нами. Dynamic Era Exporters может исследовать подходящие варианты поставок для ваших специальных запросов в разных секторах.",
    categoryCustomCtaButton: "Связаться в WhatsApp",
    allSectorsTitle: "Все секторы",
    allSectorsLead:
      "Dynamic Era Exporters предлагает комплексные торговые решения для потребностей в продукции и поставках в разных секторах.",
    allSectors: [
      ["Энергетика", "Оборудование, инфраструктурные продукты, электрические материалы и продукты для возобновляемой энергетики."],
      ["Строительные материалы", "Строительные материалы, инфраструктурные продукты, механическое оборудование и проектные потребности."],
      ["Текстиль", "Ткани, готовая одежда, спецодежда, технический текстиль и разные текстильные группы."],
      ["Продукты питания", "Основные продукты питания, упакованные продукты, сельскохозяйственная продукция и надежные торговые решения."],
      ["Здравоохранение", "Медицинские продукты, расходные материалы, медицинское оборудование и отраслевые решения поставок."],
      ["Оборонная промышленность", "Профессиональные процессы поставок с учетом соответствия требованиям, конфиденциальности и операционной дисциплины."],
      ["Электрика и электроника", "Электрические материалы, электронные продукты, соединительное оборудование и осветительные продукты."],
      ["Машины и оборудование", "Промышленные машины, производственное оборудование, запасные части и технические потребности."],
      ["Мебель", "Широкие варианты поставок мебели для дома, офиса, коммерческих пространств и проектных нужд."],
      ["Автомобили", "Автозапчасти, оборудование, аксессуары и отраслевые группы продукции."],
      ["Пластик и резина", "Пластиковые изделия, резиновые материалы, технические детали и промышленные группы продукции."],
      ["Упаковка", "Упаковочные продукты и решения для пищевого, текстильного, промышленного и розничного секторов."],
      ["Косметика", "Косметические продукты, средства личного ухода, гигиенические продукты и связанные группы товаров."],
      ["Чистящие средства", "Промышленные чистящие средства, гигиенические материалы, расходные материалы и продукты для корпоративного использования."],
      ["Сельскохозяйственная продукция", "Сельскохозяйственная продукция, пищевое сырье и торговые решения для аграрного сектора."],
      ["Медицинские продукты", "Поддержка поставок групп продукции для медицинских учреждений и поставщиков медтоваров."],
      ["Сырье", "Группы сырья, необходимые в производственных процессах разных секторов."],
      ["Строительные продукты", "Дополнительные группы продукции, используемые в строительстве, отделке и строительных проектах."],
      ["Торговля с логистической поддержкой", "Координационная поддержка на этапах отгрузки, доставки и операционного контроля."],
      ["Общие решения поставок", "Исследование и поставочные решения для специальных запросов вне одной категории."],
    ],
    aboutIntroTitle: "О нас",
    aboutIntroText:
      "Dynamic Era Exporters — торговая компания, работающая в сфере внутренней и внешней торговли и предлагающая профессиональные решения для продуктовых и поставочных потребностей разных секторов.\n\nКомпания разрабатывает решения по поставкам для энергетики, строительных материалов, текстиля, продуктов питания, здравоохранения, оборонной промышленности и других торговых категорий. Наша цель — не просто предоставить продукт, а обеспечить клиентам надежный, устойчивый и эффективный торговый опыт.\n\nБлагодаря широкой секторной сети, гибкой операционной структуре и клиентскому подходу мы становимся сильным партнером компаний в процессах импорта и экспорта.",
    aboutMore: "Подробнее о нас",
    homeAboutEyebrow: "Dynamic Era Export",
    homeAboutTitle: "Мы превращаем потребности в поставках в правильную торговую модель.",
    homeAboutText:
      "В энергетике, текстиле, пищевой сфере, здравоохранении и многих других секторах мы управляем поиском продукции, сравнением поставщиков, коммерческими предложениями и операционным сопровождением из одного центра. Мы уточняем ваш запрос, находим правильный источник и поддерживаем процесс через прозрачную коммуникацию.",
    homeAboutValues: ["Поставка под конкретный запрос", "Секторная продуктовая сеть", "Прозрачное сопровождение операций"],
    homeAboutButton: "Изучить нашу модель работы",
    aboutTitle: "О нас",
    aboutText:
      "Успех в глобальной торговле зависит от доступа к правильному продукту, в правильное время и на правильных условиях. Мы анализируем потребности клиентов, определяем подходящие каналы поставок и надежно управляем торговым процессом.",
    aboutSupport:
      "В Dynamic Era Exporters мы выходим за рамки поиска продукта и управляем каждым этапом торговли с доверием, прозрачностью и скоростью.",
    aboutFlowTitle: "Торговля, основанная на доверии, скорости и прозрачности",
    aboutFlowText1:
      "С первого дня наша главная цель — соединять клиентов с правильными каналами поставок, надежно управлять процессами импорта и экспорта и быть партнером, который создает ценность на каждом этапе торговли.",
    aboutFlowText2:
      "В современной глобальной торговле компаниям нужен не только продукт: они ожидают надежного поставщика, корректного ценообразования, устойчивых деловых отношений, операционного сопровождения и быстрой коммуникации. Dynamic Era Exporters учитывает все эти потребности через комплексный торговый подход.",
    aboutPillars: [
      ["Наше видение", "Стать сильным торговым брендом, известным надежностью, скоростью и ориентированностью на решения в глобальной торговле, предлагая устойчивые поставочные решения в разных секторах."],
      ["Наша миссия", "Правильно анализировать импортные, экспортные и поставочные потребности клиентов и предлагать наиболее подходящие торговые решения через качественные продукты, надежные источники, конкурентные цены и профессиональную операционную поддержку."],
      ["Наш подход", "Мы рассматриваем каждое сотрудничество как долгосрочные коммерческие отношения и фокусируемся не только на текущих запросах, но и на будущих потребностях клиентов."],
    ],
    aboutOperationsEyebrow: "Что мы делаем",
    aboutOperationsTitle: "Мы обеспечиваем комплексную поддержку в импорте, экспорте и поставках.",
    aboutOperations: [
      ["01", "Поддержка импорта и экспорта", "Мы предоставляем коммерческую поддержку в импортных и экспортных процессах."],
      ["02", "Поиск продуктов и поставщиков", "Мы исследуем продукты и поставщиков для разных секторов."],
      ["03", "Группы продукции под запрос", "Мы определяем подходящие группы продукции на основе запросов клиентов."],
      ["04", "Связи с поставщиками", "Мы устанавливаем контакт с локальными и международными поставщиками."],
      ["05", "Предложения и операции", "Мы управляем коммерческими предложениями, ценообразованием и операционными процессами."],
      ["06", "Устойчивые поставки", "Мы предлагаем устойчивые поставочные решения по широким категориям продукции."],
    ],
    aboutValuesEyebrow: "Наши ценности",
    aboutValuesTitle: "Мы верим, что доверие, скорость, гибкость и глобальный взгляд являются основой торговли.",
    aboutValues: [
      ["Надежность", "Мы придерживаемся прозрачного, ответственного и устойчивого подхода во всех бизнес-процессах."],
      ["Скорость", "Мы быстро отвечаем на запросы клиентов, эффективно планируем процесс и внимательно отслеживаем операционный поток."],
      ["Гибкость", "Вместо шаблонных решений мы создаем решения под конкретный проект, продукт и запрос."],
      ["Глобальный взгляд", "Оценивая разные рынки, группы продукции и источники поставок, мы предлагаем клиентам более широкие возможности."],
    ],
    aboutCtaEyebrow: "Работа с Dynamic Era Exporters",
    aboutCtaTitle: "Давайте сделаем ваш торговый процесс безопаснее, быстрее и эффективнее.",
    aboutCtaText:
      "Если вы ищете конкретную группу продукции или нуждаетесь в профессиональной поддержке импортно-экспортных процессов, наша команда готова построить для вас правильное решение.",
    aboutCtaPrimary: "Связаться в WhatsApp",
    aboutCtaEmail: "Связаться по электронной почте",
    aboutCtaSecondary: "Страница контактов",
    values: ["Широкая продуктовая и секторная сеть", "Надежный торговый процесс", "Гибкие и быстрые решения", "Опыт международной торговли"],
    contactTitle: "Контакты",
    contactLead: "Какой бы продукт, страну назначения или категорию вы ни искали, мы можем начать с короткого сообщения.",
    form: {
      name: "Имя и фамилия",
      company: "Компания",
      email: "Email",
      message: "Что вы ищете?",
      send: "Отправить email",
      sending: "Отправка...",
      configTitle: "Сервис формы не настроен",
      configText: "Для отправки сообщений необходимо добавить ключ доступа Web3Forms. Пока вы можете связаться с нами через WhatsApp.",
      successTitle: "Ваше сообщение успешно отправлено",
      successText: "Спасибо. Мы свяжемся с вами в ближайшее время.",
      errorTitle: "Не удалось отправить сообщение",
      errorText: "Попробуйте еще раз немного позже или свяжитесь с нами через WhatsApp.",
      rateTitle: "Пожалуйста, немного подождите",
      rateText: "Для защиты от спама можно отправлять только одно сообщение в минуту.",
      close: "Закрыть",
    },
    partnersTitle: "Экосистема мировой торговли",
    importantLinksTitle: "Важные ссылки",
    footerWhatsappTitle: "Связаться с нами в WhatsApp",
    footerWhatsappText: "Свяжитесь с нами напрямую по вашему продукту, сектору или запросу на поставку.",
    footer: "Четкая коммуникация в импортных, экспортных и глобальных поставочных операциях.",
    copyright: "© Copyright 2026 Dynamic Era Exporters. Все права защищены.",
  },
  fr: {
    nav: ["Accueil", "Secteurs", "À propos", "Contact"],
    whatsapp: "Contact direct via WhatsApp",
    direct: "Contacter via WhatsApp",
    quoteCta: "Demander un devis",
    categoriesCta: "Voir tous les secteurs",
    homeBadge: "Global Trade, Dynamic Solutions",
    homeTitle: "Votre partenaire\nfiable dans le\ncommerce mondial",
    homeText:
      "De l'énergie aux matériaux de construction, du textile à l'alimentaire, de la santé à l'industrie de défense, nous créons de la valeur pour nos clients avec le bon produit, le bon fournisseur et le bon modèle commercial.\n\nAvec plus de 20 ans d'expérience commerciale, 1500+ clients et un solide réseau d'approvisionnement dans plus de 20 secteurs, nous sommes une force dynamique du commerce mondial.",
    heroStats: [
      ["20+", "ans d'expérience"],
      ["1500+", "clients"],
      ["20+", "secteurs clés"],
    ],
    quoteTitle: "Nous vous accompagnons à chaque étape du commerce",
    quoteText: "De la recherche produit à l'approvisionnement, de la tarification à la planification logistique, nous assurons un accompagnement de bout en bout.",
    trustTitle: "Nous vous accompagnons à chaque étape du commerce",
    trustText:
      "De la recherche produit à l'approvisionnement, de la tarification à la planification logistique, nous assurons un accompagnement complet dans les opérations d'importation et d'exportation.",
    servicesKicker: "Nos Services",
    servicesLead:
      "Nous réunissons l'infrastructure commerciale, le réseau d'approvisionnement et le support opérationnel dont les entreprises ont besoin dans leurs processus d'importation et d'exportation.",
    services: [
      ["Approvisionnement produit", "Nous recherchons des produits via notre réseau de fournisseurs local et international et vous mettons en relation avec les bons partenaires."],
      ["Processus d'importation", "Pour les produits à importer, nous accompagnons la recherche fournisseur, les documents et la coordination logistique."],
      ["Solutions d'exportation", "Nous créons des solutions produit, marché et opération pour les entreprises qui souhaitent exporter depuis la Turquie vers différents marchés."],
      ["Recherche de fournisseurs", "Nous proposons des options de fournisseurs selon la qualité, la capacité, l'équilibre prix et les conditions de livraison."],
      ["Offres et tarification", "Nous préparons des offres compétitives et comparables pour les groupes de produits demandés."],
      ["Suivi logistique et opérationnel", "Nous assurons un support régulier tout au long des étapes de livraison, d'expédition et de suivi opérationnel."],
    ],
    processTitle: "Nous analysons la demande, trouvons la bonne source et suivons l'opération.",
    processLead:
      "Chaque secteur a des attentes différentes en matière de qualité, délai, coût et conformité; nous construisons donc un modèle commercial adapté à chaque demande.",
    processSteps: [
      ["01", "Analyse de la demande", "Le groupe de produits, le marché cible, la quantité, les attentes qualité et le plan de livraison sont clarifiés."],
      ["02", "Source d'approvisionnement", "Les fournisseurs adaptés sont recherchés, puis les options de prix et d'opération sont comparées."],
      ["03", "Opération commerciale", "L'offre, les documents, la logistique et la livraison sont suivis avec une communication transparente."],
    ],
    ctaTitle: "Renforçons ensemble votre processus commercial.",
    ctaText:
      "Contactez-nous pour le produit, le fournisseur ou la solution d'import-export dont vous avez besoin. Construisons le modèle commercial le plus adapté pour vous.",
    hero: [
      {
        eyebrow: "Global Trade, Dynamic Solutions",
        title: "Une force commerciale dynamique ouverte sur le monde.",
        text: "Dynamic Era Export livre des produits de différents secteurs sur les marchés internationaux avec des solutions d'exportation fiables, rapides et professionnelles.",
      },
      {
        eyebrow: "Large réseau de secteurs et de produits",
        title: "Des solutions commerciales polyvalentes, de l'énergie à l'alimentaire, du textile à la santé.",
        text: "Nous gérons professionnellement la recherche produit, l'approvisionnement, la tarification et les opérations selon les demandes de nos clients.",
      },
      {
        eyebrow: "Plus de 20 ans d'expérience commerciale",
        title: "Accélérez votre processus avec la force dynamique du commerce mondial.",
        text: "Avec 1500+ clients et un large réseau sectoriel, nous offrons des solutions commerciales rapides, flexibles et durables.",
      },
    ],
    metrics: [
      ["20+", "ans de service"],
      ["1500+", "clients"],
      ["20", "domaines d'activité"],
      ["360°", "support commercial"],
    ],
    categoryTitle: "Nos Domaines D'activité Clés",
    categoryLead:
      "Dynamic Era Exporters dispose d'un vaste réseau commercial couvrant les groupes de produits et matériaux nécessaires à différents secteurs.",
    allCategoriesCta: "Voir Tous Les Domaines",
    categories: {
      energy: ["Énergie", "Équipements, produits d'infrastructure, matériaux électriques et produits de support aux énergies renouvelables."],
      construction: ["Matériaux de construction", "Matériaux de construction, produits d'infrastructure, équipements mécaniques et besoins liés aux projets."],
      textile: ["Textile", "Tissus, prêt-à-porter, vêtements de travail, textile technique et différents groupes textiles."],
      food: ["Alimentaire", "Produits alimentaires de base, produits emballés, produits agricoles et solutions commerciales fiables."],
      health: ["Santé", "Produits médicaux, consommables, équipements de santé et solutions d'approvisionnement sectorielles."],
      defense: ["Industrie de défense", "Processus d'approvisionnement professionnels avec conformité, confidentialité et discipline opérationnelle."],
    },
    categoryDetails: {
      energy: {
        title: "Énergie",
        text: "Pour le secteur de l'énergie, nous proposons des solutions d'approvisionnement sur différents groupes de produits, notamment équipements, produits d'infrastructure, matériaux électriques et produits de support aux énergies renouvelables.",
        points: ["Équipements énergétiques", "Matériaux électriques", "Approvisionnement par projet"],
      },
      construction: {
        title: "Matériaux de construction",
        text: "Nous fournissons des services d'approvisionnement pour matériaux de construction, produits d'infrastructure, équipements mécaniques, produits complémentaires et besoins spécifiques aux projets.",
        points: ["Produits de construction et d'infrastructure", "Équipements mécaniques", "Besoins liés aux projets"],
      },
      textile: {
        title: "Textile",
        text: "Nous proposons des solutions de commerce intérieur et international pour les tissus, le prêt-à-porter, les vêtements de travail, les textiles techniques et différents groupes textiles.",
        points: ["Tissus et prêt-à-porter", "Vêtements de travail", "Textiles techniques"],
      },
      food: {
        title: "Alimentaire",
        text: "Nous développons des solutions fiables d'approvisionnement et de commerce pour les produits alimentaires de base, les produits emballés, les produits agricoles et différentes catégories alimentaires.",
        points: ["Produits de base", "Produits emballés", "Produits agricoles"],
      },
      health: {
        title: "Santé",
        text: "Nous proposons des solutions d'approvisionnement pour les produits médicaux, consommables, équipements de santé et besoins sectoriels.",
        points: ["Produits médicaux", "Consommables", "Équipements de santé"],
      },
      defense: {
        title: "Industrie de défense",
        text: "Dans l'industrie de défense, nous développons des solutions professionnelles pour les processus d'approvisionnement sectoriels avec conformité, confidentialité et discipline opérationnelle.",
        points: ["Conformité", "Confidentialité et discipline", "Approvisionnement sectoriel"],
      },
    },
    categoryPageTitle: "Secteurs / Domaines d'activité",
    categoryPageLead:
      "Dans tous nos domaines d'activité, nous développons des solutions produit et approvisionnement selon les demandes de nos clients.",
    categoryScrollHint: "Faites défiler la liste pour voir tous les secteurs",
    categoryCustomCtaTitle: "Contactez-nous pour les groupes de produits non listés.",
    categoryCustomCtaText:
      "Si vous ne voyez pas le groupe de produits dont vous avez besoin dans la liste, contactez-nous. Dynamic Era Exporters peut rechercher des options d'approvisionnement adaptées à vos demandes spécifiques dans différents secteurs.",
    categoryCustomCtaButton: "Contacter via WhatsApp",
    allSectorsTitle: "Tous Les Secteurs",
    allSectorsLead:
      "Dynamic Era Exporters propose des solutions commerciales complètes pour les besoins en produits et approvisionnement dans différents secteurs.",
    allSectors: [
      ["Énergie", "Équipements, produits d'infrastructure, matériaux électriques et produits de support aux énergies renouvelables."],
      ["Matériaux de construction", "Matériaux de construction, produits d'infrastructure, équipements mécaniques et besoins liés aux projets."],
      ["Textile", "Tissus, prêt-à-porter, vêtements de travail, textiles techniques et différents groupes textiles."],
      ["Alimentaire", "Produits alimentaires de base, produits emballés, produits agricoles et solutions commerciales fiables."],
      ["Santé", "Produits médicaux, consommables, équipements de santé et solutions d'approvisionnement sectorielles."],
      ["Industrie de défense", "Processus d'approvisionnement professionnels avec conformité, confidentialité et discipline opérationnelle."],
      ["Électricité & électronique", "Matériaux électriques, produits électroniques, équipements de connexion et produits d'éclairage."],
      ["Machines & équipements", "Machines industrielles, équipements de production, pièces de rechange et besoins techniques."],
      ["Mobilier", "Large choix d'approvisionnement pour meubles de maison, bureau, espaces commerciaux et projets."],
      ["Automobile", "Pièces automobiles, équipements, accessoires et groupes de produits sectoriels."],
      ["Plastique & caoutchouc", "Produits plastiques, matériaux en caoutchouc, pièces techniques et groupes de produits industriels."],
      ["Emballage", "Produits d'emballage et solutions de conditionnement pour l'alimentaire, le textile, l'industrie et le retail."],
      ["Cosmétiques", "Produits cosmétiques, soins personnels, produits d'hygiène et groupes de produits associés."],
      ["Produits de nettoyage", "Produits de nettoyage industriels, matériaux d'hygiène, consommables et produits à usage professionnel."],
      ["Produits agricoles", "Produits agricoles, matières premières alimentaires et solutions commerciales pour le secteur agricole."],
      ["Produits médicaux", "Support d'approvisionnement pour établissements de santé et fournisseurs de produits médicaux."],
      ["Matières premières", "Groupes de matières premières nécessaires aux processus de production de différents secteurs."],
      ["Produits de construction", "Groupes de produits complémentaires utilisés dans la construction, la décoration et les projets de bâtiment."],
      ["Commerce avec support logistique", "Support de coordination pour les étapes d'expédition, livraison et suivi opérationnel."],
      ["Solutions générales d'approvisionnement", "Recherche et approvisionnement pour demandes spécifiques au-delà d'une seule catégorie."],
    ],
    aboutIntroTitle: "À propos",
    aboutIntroText:
      "Dynamic Era Exporters est une société commerciale active dans le commerce intérieur et extérieur, offrant des solutions professionnelles aux besoins en produits et approvisionnement de différents secteurs.\n\nElle développe des solutions d'approvisionnement adaptées aux besoins des clients dans l'énergie, les matériaux de construction, le textile, l'alimentaire, la santé, l'industrie de défense et d'autres catégories commerciales. Notre objectif n'est pas seulement de fournir des produits, mais d'offrir une expérience commerciale fiable, durable et efficace.\n\nGrâce à notre large réseau sectoriel, notre structure opérationnelle flexible et notre approche orientée client, nous nous positionnons comme un partenaire solide dans les processus d'importation et d'exportation des entreprises.",
    aboutMore: "Plus d'informations sur nous",
    homeAboutEyebrow: "Dynamic Era Export",
    homeAboutTitle: "Nous transformons les besoins d'approvisionnement en modèle commercial adapté.",
    homeAboutText:
      "Dans l'énergie, le textile, l'alimentaire, la santé et de nombreux autres secteurs, nous gérons la recherche produit, la comparaison fournisseurs, les offres et le suivi opérationnel depuis un point unique. Nous clarifions votre demande, trouvons la bonne source et faisons avancer le processus avec une communication transparente.",
    homeAboutValues: ["Approvisionnement adapté à la demande", "Réseau produit par secteur", "Suivi opérationnel transparent"],
    homeAboutButton: "Découvrir Notre Modèle",
    aboutTitle: "À propos",
    aboutText:
      "Le succès dans le commerce mondial dépend de l'accès au bon produit, au bon moment et dans les bonnes conditions. Nous analysons les besoins de nos clients, identifions les canaux d'approvisionnement adaptés et gérons le processus commercial avec fiabilité.",
    aboutSupport:
      "Chez Dynamic Era Exporters, nous allons au-delà de la recherche de produits et gérons chaque étape du commerce avec confiance, transparence et rapidité.",
    aboutFlowTitle: "Un commerce fondé sur la confiance, la rapidité et la transparence",
    aboutFlowText1:
      "Depuis le premier jour, notre objectif principal est de connecter nos clients aux bons canaux d'approvisionnement, de gérer les processus d'importation et d'exportation avec fiabilité et de devenir un partenaire qui crée de la valeur à chaque étape du commerce.",
    aboutFlowText2:
      "Dans le commerce mondial actuel, les entreprises attendent plus qu'un produit: un fournisseur fiable, une tarification correcte, des relations durables, un suivi opérationnel et une communication rapide. Dynamic Era Exporters adopte une approche globale qui prend en compte tous ces besoins.",
    aboutPillars: [
      ["Notre vision", "Devenir une marque commerciale forte, reconnue pour sa fiabilité, sa rapidité et son orientation solution dans le commerce mondial, tout en proposant des solutions d'approvisionnement durables dans différents secteurs."],
      ["Notre mission", "Analyser correctement les besoins d'importation, d'exportation et d'approvisionnement de nos clients et proposer les solutions commerciales les plus adaptées avec des produits de qualité, des sources fiables, des prix compétitifs et un support opérationnel professionnel."],
      ["Notre approche", "Nous considérons chaque collaboration comme une relation commerciale à long terme et nous concentrons non seulement sur les demandes actuelles, mais aussi sur les besoins futurs de nos clients."],
    ],
    aboutOperationsEyebrow: "Ce Que Nous Faisons",
    aboutOperationsTitle: "Nous assurons un accompagnement complet dans l'importation, l'exportation et l'approvisionnement.",
    aboutOperations: [
      ["01", "Support import-export", "Nous fournissons un support commercial dans les processus d'importation et d'exportation."],
      ["02", "Recherche produit et fournisseur", "Nous recherchons des produits et fournisseurs pour différents secteurs."],
      ["03", "Groupes de produits adaptés", "Nous identifions les groupes de produits adaptés à la demande client."],
      ["04", "Connexions fournisseurs", "Nous établissons des contacts avec des fournisseurs locaux et internationaux."],
      ["05", "Offres et opérations", "Nous gérons les offres, la tarification et les processus opérationnels."],
      ["06", "Approvisionnement durable", "Nous proposons des solutions d'approvisionnement durables dans de larges catégories de produits."],
    ],
    aboutValuesEyebrow: "Nos Valeurs",
    aboutValuesTitle: "Nous croyons que la confiance, la rapidité, la flexibilité et la vision globale sont la base du commerce.",
    aboutValues: [
      ["Fiabilité", "Nous adoptons une approche transparente, responsable et durable dans tous nos processus."],
      ["Rapidité", "Nous répondons rapidement aux demandes clients, planifions efficacement le processus et suivons attentivement le flux opérationnel."],
      ["Flexibilité", "Au lieu de modèles fixes, nous créons des solutions adaptées au projet, au produit et à la demande."],
      ["Vision globale", "En évaluant différents marchés, groupes de produits et sources d'approvisionnement, nous offrons plus d'options."],
    ],
    aboutCtaEyebrow: "Travailler avec Dynamic Era Exporters",
    aboutCtaTitle: "Rendons votre processus commercial plus sûr, plus rapide et plus efficace.",
    aboutCtaText:
      "Que vous recherchiez un groupe de produits spécifique ou un support professionnel pour vos processus import-export, notre équipe est prête à construire la bonne solution pour vous.",
    aboutCtaPrimary: "Contacter via WhatsApp",
    aboutCtaEmail: "Contacter par e-mail",
    aboutCtaSecondary: "Page contact",
    values: ["Large réseau de produits et secteurs", "Processus commercial fiable", "Solutions flexibles et rapides", "Expérience du commerce international"],
    contactTitle: "Contact",
    contactLead: "Quel que soit le produit, le pays cible ou la catégorie que vous recherchez, nous pouvons commencer par un court message.",
    form: {
      name: "Nom complet",
      company: "Entreprise",
      email: "Email",
      message: "Que recherchez-vous ?",
      send: "Envoyer un email",
      sending: "Envoi...",
      configTitle: "Le service de formulaire n’est pas configuré",
      configText: "Une clé d’accès Web3Forms doit être ajoutée avant l’envoi. Vous pouvez nous contacter via WhatsApp entre-temps.",
      successTitle: "Votre message a été envoyé",
      successText: "Merci. Nous vous répondrons dans les plus brefs délais.",
      errorTitle: "Le message n'a pas pu être envoyé",
      errorText: "Veuillez réessayer dans quelques instants ou nous contacter via WhatsApp.",
      rateTitle: "Veuillez patienter un instant",
      rateText: "Pour éviter le spam, vous ne pouvez envoyer qu'un message par minute.",
      close: "Fermer",
    },
    partnersTitle: "Écosystème du commerce mondial",
    importantLinksTitle: "Liens Importants",
    footerWhatsappTitle: "Nous contacter sur WhatsApp",
    footerWhatsappText: "Contactez-nous directement pour votre produit, secteur ou demande d'approvisionnement.",
    footer: "Communication claire dans les opérations d'importation, d'exportation et d'approvisionnement mondial.",
    copyright: "© Copyright 2026 Dynamic Era Exporters. Tous droits réservés.",
  },
  de: {
    nav: ["Startseite", "Sektoren", "Über uns", "Kontakt"],
    whatsapp: "Direkter WhatsApp-Kontakt",
    direct: "Per WhatsApp kontaktieren",
    quoteCta: "Angebot anfordern",
    categoriesCta: "Alle Sektoren ansehen",
    homeBadge: "Global Trade, Dynamic Solutions",
    homeTitle: "Ihr zuverlässiger\nPartner im\nglobalen Handel",
    homeText:
      "Von Energie und Baustoffen über Textil und Lebensmittel bis hin zu Gesundheit und Verteidigungsindustrie schaffen wir Mehrwert durch das richtige Produkt, den richtigen Lieferanten und das richtige Handelsmodell.\n\nMit mehr als 20 Jahren Handelserfahrung, 1500+ Kunden und einem starken Liefernetzwerk in über 20 Sektoren sind wir die dynamische Kraft des globalen Handels.",
    heroStats: [
      ["20+", "Jahre Erfahrung"],
      ["1500+", "Kunden"],
      ["20+", "Hauptsektoren"],
    ],
    quoteTitle: "Wir begleiten Sie in jeder Phase des Handels",
    quoteText: "Von der Produktrecherche und Beschaffung bis zur Preisgestaltung und Logistikplanung bieten wir durchgängige Unterstützung.",
    trustTitle: "Wir begleiten Sie in jeder Phase des Handels",
    trustText:
      "Von der Produktrecherche und Beschaffung bis zur Preisgestaltung und Logistikplanung bieten wir umfassende Unterstützung in Import- und Exportprozessen.",
    servicesKicker: "Unsere Leistungen",
    servicesLead:
      "Wir bündeln die kommerzielle Infrastruktur, das Liefernetzwerk und die operative Unterstützung, die Unternehmen in Import- und Exportprozessen benötigen.",
    services: [
      ["Produktbeschaffung", "Wir recherchieren Produkte über unser lokales und internationales Liefernetzwerk und verbinden Sie mit geeigneten Lieferanten."],
      ["Importprozesse", "Bei Produkten aus dem Ausland unterstützen wir Beschaffung, Dokumentation und logistische Koordination."],
      ["Exportlösungen", "Wir entwickeln Produkt-, Markt- und Operationslösungen für Unternehmen, die aus der Türkei in verschiedene Märkte exportieren möchten."],
      ["Lieferantenrecherche", "Wir bieten passende Lieferantenoptionen nach Qualität, Kapazität, Preisbalance und Lieferbedingungen."],
      ["Angebote und Preisgestaltung", "Wir erstellen wettbewerbsfähige und vergleichbare Angebote für angefragte Produktgruppen."],
      ["Logistik und Operationsverfolgung", "Wir unterstützen regelmäßig in Lieferung, Versand und operativer Nachverfolgung."],
    ],
    processTitle: "Wir analysieren den Bedarf, finden die richtige Quelle und begleiten die Operation.",
    processLead:
      "Jeder Sektor hat andere Erwartungen an Qualität, Lieferung, Kosten und Compliance; deshalb entwickeln wir ein bedarfsspezifisches Handelsmodell statt eines Standardprozesses.",
    processSteps: [
      ["01", "Bedarfsanalyse", "Produktgruppe, Zielmarkt, Menge, Qualitätsanforderung und Lieferplan werden geklärt."],
      ["02", "Bezugsquelle", "Geeignete Lieferanten werden recherchiert, Preis- und Operationsoptionen werden verglichen."],
      ["03", "Handelsoperation", "Angebot, Dokumente, Logistik und Lieferung werden mit transparenter Kommunikation begleitet."],
    ],
    ctaTitle: "Stärken wir gemeinsam Ihren Handelsprozess.",
    ctaText:
      "Kontaktieren Sie uns für das Produkt, den Lieferanten oder die Import-Export-Lösung, die Sie benötigen. Wir entwickeln das passende Handelsmodell für Sie.",
    hero: [
      {
        eyebrow: "Global Trade, Dynamic Solutions",
        title: "Eine dynamische Handelskraft mit Zugang zur Welt.",
        text: "Dynamic Era Export liefert Produkte aus unterschiedlichen Sektoren mit zuverlässigen, schnellen und professionellen Exportlösungen auf internationale Märkte.",
      },
      {
        eyebrow: "Breites Sektor- und Produktnetzwerk",
        title: "Vielseitige Handelslösungen von Energie bis Lebensmittel, von Textil bis Gesundheit.",
        text: "Wir steuern Produktrecherche, Beschaffung, Preisgestaltung und operative Prozesse professionell nach Kundenbedarf.",
      },
      {
        eyebrow: "Mehr als 20 Jahre Handelserfahrung",
        title: "Beschleunigen Sie Ihren Prozess mit der dynamischen Kraft des globalen Handels.",
        text: "Mit 1500+ Kunden und einem breiten Sektornetzwerk bieten wir schnelle, flexible und nachhaltige Handelslösungen.",
      },
    ],
    metrics: [
      ["20+", "Jahre Service"],
      ["1500+", "Kunden"],
      ["20", "Geschäftsbereiche"],
      ["360°", "Handelsunterstützung"],
    ],
    categoryTitle: "Ausgewählte Geschäftsbereiche",
    categoryLead:
      "Dynamic Era Exporters verfügt über ein breites Handelsnetzwerk für Produkt- und Materialgruppen, die in verschiedenen Sektoren benötigt werden.",
    allCategoriesCta: "Alle Geschäftsbereiche ansehen",
    categories: {
      energy: ["Energie", "Ausrüstung, Infrastrukturprodukte, elektrische Materialien und Produkte zur Unterstützung erneuerbarer Energien."],
      construction: ["Baustoffe", "Baustoffe, Infrastrukturprodukte, mechanische Ausrüstung und projektbezogene Anforderungen."],
      textile: ["Textil", "Stoffe, Konfektion, Arbeitskleidung, technische Textilien und verschiedene Textilgruppen."],
      food: ["Lebensmittel", "Grundnahrungsmittel, verpackte Lebensmittel, Agrarprodukte und zuverlässige Handelslösungen."],
      health: ["Gesundheit", "Medizinische Produkte, Verbrauchsmaterialien, Gesundheitsausrüstung und sektorspezifische Beschaffungslösungen."],
      defense: ["Verteidigungsindustrie", "Professionelle Beschaffungsprozesse mit Compliance, Vertraulichkeit und operativer Disziplin."],
    },
    categoryDetails: {
      energy: {
        title: "Energie",
        text: "Für den Energiesektor bieten wir Beschaffungslösungen für verschiedene Produktgruppen, insbesondere Ausrüstung, Infrastrukturprodukte, elektrische Materialien und Produkte zur Unterstützung erneuerbarer Energien.",
        points: ["Energieausrüstung", "Elektrische Materialien", "Projektbezogene Beschaffung"],
      },
      construction: {
        title: "Baustoffe",
        text: "Wir bieten Beschaffungsleistungen für Baustoffe, Infrastrukturprodukte, mechanische Ausrüstung, ergänzende Bauprodukte und projektbezogene Anforderungen.",
        points: ["Bau- und Infrastrukturprodukte", "Mechanische Ausrüstung", "Projektbezogene Anforderungen"],
      },
      textile: {
        title: "Textil",
        text: "Wir bieten Lösungen für Binnen- und Außenhandel mit Stoffen, Konfektion, Arbeitskleidung, technischen Textilien und verschiedenen Textilgruppen.",
        points: ["Stoffe und Konfektion", "Arbeitskleidung", "Technische Textilien"],
      },
      food: {
        title: "Lebensmittel",
        text: "Wir entwickeln zuverlässige Beschaffungs- und Handelslösungen für Grundnahrungsmittel, verpackte Lebensmittel, Agrarprodukte und verschiedene Lebensmittelkategorien.",
        points: ["Grundnahrungsmittel", "Verpackte Produkte", "Agrarprodukte"],
      },
      health: {
        title: "Gesundheit",
        text: "Wir bieten Beschaffungslösungen für medizinische Produkte, Verbrauchsmaterialien, Gesundheitsausrüstung und sektorspezifische Anforderungen.",
        points: ["Medizinische Produkte", "Verbrauchsmaterialien", "Gesundheitsausrüstung"],
      },
      defense: {
        title: "Verteidigungsindustrie",
        text: "In der Verteidigungsindustrie entwickeln wir professionelle Lösungen für sektorspezifische Beschaffungsprozesse mit Compliance, Vertraulichkeit und operativer Disziplin.",
        points: ["Compliance", "Vertraulichkeit und Disziplin", "Sektorspezifische Beschaffung"],
      },
    },
    categoryPageTitle: "Sektoren / Geschäftsbereiche",
    categoryPageLead:
      "In allen unseren Geschäftsbereichen entwickeln wir Produkt- und Beschaffungslösungen entsprechend den Anforderungen unserer Kunden.",
    categoryScrollHint: "Scrollen Sie durch die Liste, um alle Sektoren zu sehen",
    categoryCustomCtaTitle: "Kontaktieren Sie uns für Produktgruppen, die nicht aufgeführt sind.",
    categoryCustomCtaText:
      "Wenn Sie die benötigte Produktgruppe nicht in der Liste sehen, kontaktieren Sie uns. Dynamic Era Exporters kann passende Beschaffungsoptionen für Ihre speziellen Anforderungen in verschiedenen Sektoren recherchieren.",
    categoryCustomCtaButton: "Per WhatsApp kontaktieren",
    allSectorsTitle: "Alle Sektoren",
    allSectorsLead:
      "Dynamic Era Exporters bietet umfassende Handelslösungen für Produkt- und Beschaffungsanforderungen in verschiedenen Sektoren.",
    allSectors: [
      ["Energie", "Ausrüstung, Infrastrukturprodukte, elektrische Materialien und Produkte zur Unterstützung erneuerbarer Energien."],
      ["Baustoffe", "Baustoffe, Infrastrukturprodukte, mechanische Ausrüstung und projektbezogene Anforderungen."],
      ["Textil", "Stoffe, Konfektion, Arbeitskleidung, technische Textilien und verschiedene Textilgruppen."],
      ["Lebensmittel", "Grundnahrungsmittel, verpackte Lebensmittel, Agrarprodukte und zuverlässige Handelslösungen."],
      ["Gesundheit", "Medizinische Produkte, Verbrauchsmaterialien, Gesundheitsausrüstung und sektorspezifische Beschaffungslösungen."],
      ["Verteidigungsindustrie", "Professionelle Beschaffungsprozesse mit Compliance, Vertraulichkeit und operativer Disziplin."],
      ["Elektro & Elektronik", "Elektrische Materialien, elektronische Produkte, Verbindungsausrüstung und Beleuchtungsprodukte."],
      ["Maschinen & Ausrüstung", "Industriemaschinen, Produktionsausrüstung, Ersatzteile und technische Ausrüstungsbedarfe."],
      ["Möbel", "Breite Beschaffungsoptionen für Wohn-, Büro-, Gewerbe- und projektbezogene Möbelprodukte."],
      ["Automotive", "Kfz-Ersatzteile, Ausrüstung, Zubehör und sektorspezifische Produktgruppen."],
      ["Kunststoff & Gummi", "Kunststoffprodukte, Gummimaterialien, technische Teile und industrielle Produktgruppen."],
      ["Verpackung", "Verpackungsprodukte und Verpackungslösungen für Lebensmittel, Textil, Industrie und Einzelhandel."],
      ["Kosmetik", "Kosmetikprodukte, Körperpflegeprodukte, Hygieneprodukte und verwandte Produktgruppen."],
      ["Reinigungsprodukte", "Industrielle Reinigungsprodukte, Hygienematerialien, Verbrauchsmaterialien und Produkte für institutionelle Nutzung."],
      ["Agrarprodukte", "Agrarprodukte, Lebensmittelrohstoffe und Handelslösungen für den Agrarsektor."],
      ["Medizinische Produkte", "Produktbeschaffungsunterstützung für Gesundheitseinrichtungen und medizinische Lieferfirmen."],
      ["Rohstoffe", "Rohstoffgruppen, die in Produktionsprozessen verschiedener Sektoren benötigt werden."],
      ["Bauprodukte", "Ergänzende Produktgruppen für Bau, Dekoration und Bauprojekte."],
      ["Logistikgestützter Handel", "Koordinationsunterstützung bei Versand, Lieferung und operativer Nachverfolgung."],
      ["Allgemeine Beschaffungslösungen", "Recherche- und Beschaffungslösungen für spezielle Produktanfragen außerhalb einer einzelnen Kategorie."],
    ],
    aboutIntroTitle: "Über uns",
    aboutIntroText:
      "Dynamic Era Exporters ist ein Handelsunternehmen im Innen- und Außenhandel, das professionelle Lösungen für Produkt- und Beschaffungsbedarfe unterschiedlicher Sektoren anbietet.\n\nDas Unternehmen entwickelt passende Beschaffungslösungen für Energie, Baustoffe, Textil, Lebensmittel, Gesundheit, Verteidigungsindustrie und weitere Handelsbereiche. Unser Ziel ist nicht nur die Bereitstellung von Produkten, sondern ein zuverlässiges, nachhaltiges und effizientes Handelserlebnis für unsere Kunden.\n\nMit unserem breiten Sektornetzwerk, unserer flexiblen Operationsstruktur und unserem kundenorientierten Serviceverständnis positionieren wir uns als starker Partner in Import- und Exportprozessen.",
    aboutMore: "Mehr Informationen über uns",
    homeAboutEyebrow: "Dynamic Era Export",
    homeAboutTitle: "Wir verwandeln Beschaffungsbedarf in das richtige Handelsmodell.",
    homeAboutText:
      "In Energie, Textil, Lebensmittel, Gesundheit und vielen weiteren Sektoren steuern wir Produktrecherche, Lieferantenvergleich, Angebote und operative Nachverfolgung aus einer Hand. Wir klären Ihren Bedarf, finden die richtige Quelle und halten den Prozess mit transparenter Kommunikation in Bewegung.",
    homeAboutValues: ["Bedarfsspezifische Beschaffung", "Sektorbasiertes Produktnetzwerk", "Transparente Operationsverfolgung"],
    homeAboutButton: "Unser Arbeitsmodell entdecken",
    aboutTitle: "Über uns",
    aboutText:
      "Erfolg im globalen Handel hängt davon ab, das richtige Produkt zur richtigen Zeit und zu den richtigen Bedingungen zu erreichen. Wir analysieren Kundenbedarfe, identifizieren passende Beschaffungskanäle und steuern den Handelsprozess zuverlässig.",
    aboutSupport:
      "Bei Dynamic Era Exporters gehen wir über die reine Produktsuche hinaus und steuern jeden Handelsschritt mit Vertrauen, Transparenz und Geschwindigkeit.",
    aboutFlowTitle: "Handel auf Basis von Vertrauen, Geschwindigkeit und Transparenz",
    aboutFlowText1:
      "Seit dem ersten Tag ist unser Ziel, Kunden mit den richtigen Beschaffungskanälen zu verbinden, Import- und Exportprozesse zuverlässig zu steuern und in jeder Handelsphase Mehrwert zu schaffen.",
    aboutFlowText2:
      "Im heutigen globalen Handel erwarten Unternehmen mehr als nur ein Produkt: zuverlässige Lieferanten, korrekte Preisgestaltung, nachhaltige Geschäftsbeziehungen, operative Nachverfolgung und schnelle Kommunikation. Dynamic Era Exporters berücksichtigt all diese Bedürfnisse mit einem ganzheitlichen Handelsansatz.",
    aboutPillars: [
      ["Unsere Vision", "Eine starke Handelsmarke zu werden, die im globalen Handel durch Zuverlässigkeit, Geschwindigkeit und Lösungsorientierung hervorsticht und nachhaltige Beschaffungslösungen in verschiedenen Sektoren bietet."],
      ["Unsere Mission", "Die Import-, Export- und Beschaffungsbedarfe unserer Kunden richtig zu analysieren und die passendsten Handelslösungen mit Qualitätsprodukten, zuverlässigen Quellen, wettbewerbsfähigen Preisen und professioneller operativer Unterstützung zu liefern."],
      ["Unser Ansatz", "Wir betrachten jede Zusammenarbeit als langfristige Geschäftsbeziehung und konzentrieren uns nicht nur auf aktuelle Produktanfragen, sondern auch auf zukünftige Kundenbedarfe."],
    ],
    aboutOperationsEyebrow: "Was Wir Tun",
    aboutOperationsTitle: "Wir bieten End-to-End-Unterstützung in Import, Export und Beschaffung.",
    aboutOperations: [
      ["01", "Import- und Exportunterstützung", "Wir bieten kommerzielle Unterstützung in Import- und Exportprozessen."],
      ["02", "Produkt- und Lieferantenrecherche", "Wir recherchieren Produkte und Lieferanten für verschiedene Sektoren."],
      ["03", "Bedarfsgerechte Produktgruppen", "Wir bestimmen passende Produktgruppen auf Basis des Kundenbedarfs."],
      ["04", "Lieferantenverbindungen", "Wir verbinden Sie mit lokalen und internationalen Lieferanten."],
      ["05", "Angebote und Operationen", "Wir steuern Angebote, Preisgestaltung und operative Prozesse."],
      ["06", "Nachhaltige Beschaffung", "Wir bieten nachhaltige Beschaffungslösungen über breite Produktkategorien hinweg."],
    ],
    aboutValuesEyebrow: "Unsere Werte",
    aboutValuesTitle: "Wir glauben, dass Vertrauen, Geschwindigkeit, Flexibilität und eine globale Perspektive die Grundlage des Handels sind.",
    aboutValues: [
      ["Zuverlässigkeit", "Wir verfolgen in allen Geschäftsprozessen einen transparenten, verantwortungsvollen und nachhaltigen Ansatz."],
      ["Geschwindigkeit", "Wir reagieren schnell auf Kundenanfragen, planen den Prozess effizient und verfolgen den operativen Ablauf genau."],
      ["Flexibilität", "Statt starrer Muster schaffen wir projekt-, produkt- und bedarfsspezifische Lösungen."],
      ["Globale Perspektive", "Durch die Bewertung verschiedener Märkte, Produktgruppen und Bezugsquellen bieten wir breitere Optionen."],
    ],
    aboutCtaEyebrow: "Arbeiten mit Dynamic Era Exporters",
    aboutCtaTitle: "Machen wir Ihren Handelsprozess sicherer, schneller und effizienter.",
    aboutCtaText:
      "Ob Sie eine bestimmte Produktgruppe suchen oder professionelle Unterstützung für Import-Export-Prozesse benötigen: Unser Team ist bereit, die richtige Lösung für Sie zu entwickeln.",
    aboutCtaPrimary: "Per WhatsApp kontaktieren",
    aboutCtaEmail: "Per E-Mail kontaktieren",
    aboutCtaSecondary: "Kontaktseite",
    values: ["Breites Produkt- und Sektornetzwerk", "Zuverlässiger Handelsprozess", "Flexible und schnelle Lösungen", "Erfahrung im internationalen Handel"],
    contactTitle: "Kontakt",
    contactLead: "Ganz gleich, welches Produkt, Zielland oder welche Kategorie Sie suchen: Wir können mit einer kurzen Nachricht starten.",
    form: {
      name: "Vor- und Nachname",
      company: "Unternehmen",
      email: "E-Mail",
      message: "Wonach suchen Sie?",
      send: "E-Mail senden",
      sending: "Wird gesendet...",
      configTitle: "Formulardienst ist nicht konfiguriert",
      configText: "Vor dem Versand muss ein Web3Forms-Zugriffsschlüssel hinzugefügt werden. Bis dahin erreichen Sie uns über WhatsApp.",
      successTitle: "Ihre Nachricht wurde erfolgreich gesendet",
      successText: "Vielen Dank. Wir melden uns schnellstmöglich bei Ihnen.",
      errorTitle: "Nachricht konnte nicht gesendet werden",
      errorText: "Bitte versuchen Sie es später erneut oder kontaktieren Sie uns per WhatsApp.",
      rateTitle: "Bitte warten Sie einen Moment",
      rateText: "Zum Schutz vor Spam können Sie nur eine Nachricht pro Minute senden.",
      close: "Schließen",
    },
    partnersTitle: "Globales Handelsökosystem",
    importantLinksTitle: "Wichtige Links",
    footerWhatsappTitle: "Kontaktieren Sie uns per WhatsApp",
    footerWhatsappText: "Kontaktieren Sie uns direkt für Ihr Produkt, Ihren Sektor oder Ihre Beschaffungsanfrage.",
    footer: "Klare Kommunikation in Import-, Export- und globalen Beschaffungsoperationen.",
    copyright: "© Copyright 2026 Dynamic Era Exporters. Alle Rechte vorbehalten.",
  },
  nl: {
    nav: ["Home", "Sectoren", "Over ons", "Contact"],
    whatsapp: "Direct WhatsApp-contact",
    direct: "Contact via WhatsApp",
    quoteCta: "Offerte aanvragen",
    categoriesCta: "Alle sectoren bekijken",
    homeBadge: "Global Trade, Dynamic Solutions",
    homeTitle: "Uw betrouwbare\npartner in\nwereldhandel",
    homeText:
      "Van energie en bouwmaterialen tot textiel, voeding, gezondheid en defensie-industrie: wij creeren waarde voor onze klanten met het juiste product, de juiste leverancier en het juiste handelsmodel.\n\nMet meer dan 20 jaar commerciele ervaring, 1500+ klanten en een sterk leveranciersnetwerk in 20+ sectoren zijn wij een dynamische kracht in wereldhandel.",
    heroStats: [
      ["20+", "jaar ervaring"],
      ["1500+", "klanten"],
      ["20+", "hoofdsectoren"],
    ],
    quoteTitle: "Wij staan naast u in elke fase van handel",
    quoteText: "Van productonderzoek en sourcing tot prijsstelling en logistieke planning bieden wij end-to-end ondersteuning.",
    trustTitle: "Wij staan naast u in elke fase van handel",
    trustText:
      "Van productonderzoek en sourcing tot prijsstelling en logistieke planning bieden wij volledige ondersteuning in import- en exportoperaties.",
    servicesKicker: "Onze Diensten",
    servicesLead:
      "Wij brengen de commerciele infrastructuur, het leveranciersnetwerk en de operationele ondersteuning samen die bedrijven nodig hebben in import- en exportprocessen.",
    services: [
      ["Product sourcing", "Wij onderzoeken producten via ons lokale en internationale leveranciersnetwerk en verbinden u met geschikte leveranciers."],
      ["Importprocessen", "Voor producten uit het buitenland ondersteunen wij sourcing, documentatie en logistieke coordinatie."],
      ["Exportoplossingen", "Wij ontwikkelen product-, markt- en operationele oplossingen voor bedrijven die vanuit Turkije naar verschillende markten willen exporteren."],
      ["Leveranciersonderzoek", "Wij bieden geschikte leveranciersopties op basis van kwaliteit, capaciteit, prijsbalans en leveringsvoorwaarden."],
      ["Offertes en prijsstelling", "Wij bereiden concurrerende en vergelijkbare offertes voor aangevraagde productgroepen voor."],
      ["Logistiek en operationele opvolging", "Wij bieden regelmatige ondersteuning bij levering, verzending en operationele opvolging."],
    ],
    processTitle: "Wij analyseren de vraag, vinden de juiste bron en volgen de operatie op.",
    processLead:
      "Elke sector heeft andere verwachtingen rond kwaliteit, levering, kosten en naleving; daarom bouwen wij een handelsmodel op maat van de vraag, niet een standaardproces.",
    processSteps: [
      ["01", "Vraaganalyse", "Productgroep, doelmarkt, hoeveelheid, kwaliteitsverwachting en leveringsplanning worden verduidelijkt."],
      ["02", "Leveringsbron", "Geschikte leveranciers worden onderzocht en prijs- en operationele opties worden vergeleken."],
      ["03", "Handelsoperatie", "Offerte, documentatie, logistiek en levering worden opgevolgd met transparante communicatie."],
    ],
    ctaTitle: "Laten we uw handelsproces samen versterken.",
    ctaText:
      "Neem contact met ons op voor het product, de leverancier of de import-exportoplossing die u nodig heeft. Wij bouwen het meest geschikte handelsmodel voor u.",
    hero: [
      {
        eyebrow: "Global Trade, Dynamic Solutions",
        title: "Een dynamische handelskracht die deuren naar de wereld opent.",
        text: "Dynamic Era Export levert producten uit verschillende sectoren aan internationale markten met betrouwbare, snelle en professionele exportoplossingen.",
      },
      {
        eyebrow: "Breed sector- en productnetwerk",
        title: "Veelzijdige handelsoplossingen van energie tot voeding, van textiel tot gezondheid.",
        text: "Wij beheren productonderzoek, sourcing, prijsstelling en operationele processen professioneel volgens de vraag van de klant.",
      },
      {
        eyebrow: "Meer dan 20 jaar commerciele ervaring",
        title: "Versnel uw proces met de dynamische kracht van wereldhandel.",
        text: "Met 1500+ klanten en een breed sectornetwerk bieden wij snelle, flexibele en duurzame handelsoplossingen.",
      },
    ],
    metrics: [
      ["20+", "jaar service"],
      ["1500+", "klanten"],
      ["20", "bedrijfsgebieden"],
      ["360°", "handelsondersteuning"],
    ],
    categoryTitle: "Uitgelichte Bedrijfsgebieden",
    categoryLead:
      "Dynamic Era Exporters beschikt over een breed handelsnetwerk voor product- en materiaalgroepen die verschillende sectoren nodig hebben.",
    allCategoriesCta: "Alle Bedrijfsgebieden Bekijken",
    categories: {
      energy: ["Energie", "Apparatuur, infrastructuurproducten, elektrische materialen en ondersteunende producten voor hernieuwbare energie."],
      construction: ["Bouwmaterialen", "Bouwmaterialen, infrastructuurproducten, mechanische apparatuur en projectgerichte behoeften."],
      textile: ["Textiel", "Stoffen, confectie, werkkleding, technisch textiel en verschillende textielgroepen."],
      food: ["Voeding", "Basisvoeding, verpakte voedingsmiddelen, landbouwproducten en betrouwbare handelsoplossingen."],
      health: ["Gezondheid", "Medische producten, verbruiksartikelen, zorgapparatuur en sectorspecifieke sourcingoplossingen."],
      defense: ["Defensie-industrie", "Professionele sourcingprocessen met naleving, vertrouwelijkheid en operationele discipline."],
    },
    categoryDetails: {
      energy: {
        title: "Energie",
        text: "Voor de energiesector bieden wij sourcingoplossingen in verschillende productgroepen, met name apparatuur, infrastructuurproducten, elektrische materialen en ondersteunende producten voor hernieuwbare energie.",
        points: ["Energieapparatuur", "Elektrische materialen", "Projectgerichte sourcing"],
      },
      construction: {
        title: "Bouwmaterialen",
        text: "Wij leveren sourcingdiensten voor bouwmaterialen, infrastructuurproducten, mechanische apparatuur, aanvullende bouwproducten en projectgerichte behoeften.",
        points: ["Bouw- en infrastructuurproducten", "Mechanische apparatuur", "Projectgerichte behoeften"],
      },
      textile: {
        title: "Textiel",
        text: "Wij bieden binnenlandse en internationale handelsoplossingen voor stoffen, confectie, werkkleding, technische textielproducten en verschillende textielgroepen.",
        points: ["Stoffen en confectie", "Werkkleding", "Technisch textiel"],
      },
      food: {
        title: "Voeding",
        text: "Wij ontwikkelen betrouwbare sourcing- en handelsoplossingen voor basisvoeding, verpakte producten, landbouwproducten en verschillende voedingscategorieen.",
        points: ["Basisvoeding", "Verpakte producten", "Landbouwproducten"],
      },
      health: {
        title: "Gezondheid",
        text: "Wij bieden sourcingoplossingen voor medische producten, verbruiksartikelen, zorgapparatuur en sectorspecifieke behoeften.",
        points: ["Medische producten", "Verbruiksartikelen", "Zorgapparatuur"],
      },
      defense: {
        title: "Defensie-industrie",
        text: "Binnen de defensie-industrie ontwikkelen wij professionele oplossingen voor sectorspecifieke sourcingprocessen met naleving, vertrouwelijkheid en operationele discipline.",
        points: ["Naleving", "Vertrouwelijkheid en discipline", "Sectorspecifieke sourcing"],
      },
    },
    categoryPageTitle: "Sectoren / Bedrijfsgebieden",
    categoryPageLead:
      "In al onze bedrijfsgebieden ontwikkelen wij product- en sourcingoplossingen volgens de vraag van onze klanten.",
    categoryScrollHint: "Scroll door de lijst om alle sectoren te zien",
    categoryCustomCtaTitle: "Neem contact op voor productgroepen die niet in de lijst staan.",
    categoryCustomCtaText:
      "Als u de productgroep die u nodig heeft niet in de lijst ziet, neem dan contact met ons op. Dynamic Era Exporters kan geschikte sourcingopties onderzoeken voor uw speciale aanvragen in verschillende sectoren.",
    categoryCustomCtaButton: "Contact via WhatsApp",
    allSectorsTitle: "Alle Sectoren",
    allSectorsLead:
      "Dynamic Era Exporters biedt uitgebreide handelsoplossingen voor product- en sourcingbehoeften in verschillende sectoren.",
    allSectors: [
      ["Energie", "Apparatuur, infrastructuurproducten, elektrische materialen en ondersteunende producten voor hernieuwbare energie."],
      ["Bouwmaterialen", "Bouwmaterialen, infrastructuurproducten, mechanische apparatuur en projectgerichte behoeften."],
      ["Textiel", "Stoffen, confectie, werkkleding, technisch textiel en verschillende textielgroepen."],
      ["Voeding", "Basisvoeding, verpakte voedingsmiddelen, landbouwproducten en betrouwbare handelsoplossingen."],
      ["Gezondheid", "Medische producten, verbruiksartikelen, zorgapparatuur en sectorspecifieke sourcingoplossingen."],
      ["Defensie-industrie", "Professionele sourcingprocessen met naleving, vertrouwelijkheid en operationele discipline."],
      ["Elektrisch & elektronica", "Elektrische materialen, elektronische producten, verbindingsapparatuur en verlichtingsproducten."],
      ["Machines & apparatuur", "Industriele machines, productieapparatuur, reserveonderdelen en technische apparatuurbehoeften."],
      ["Meubels", "Brede sourcingopties voor woning, kantoor, commerciele ruimte en projectgerichte meubelproducten."],
      ["Automotive", "Auto-onderdelen, apparatuur, accessoires en sectorspecifieke productgroepen."],
      ["Plastic & rubber", "Plastic producten, rubbermaterialen, technische onderdelen en industriele productgroepen."],
      ["Verpakking", "Verpakkingsproducten en verpakkingsoplossingen voor voeding, textiel, industrie en retail."],
      ["Cosmetica", "Cosmetische producten, persoonlijke verzorging, hygieneproducten en gerelateerde productgroepen."],
      ["Reinigingsproducten", "Industriele reinigingsproducten, hygienematerialen, verbruiksartikelen en producten voor zakelijk gebruik."],
      ["Landbouwproducten", "Landbouwproducten, voedselgrondstoffen en handelsoplossingen voor de landbouwsector."],
      ["Medische producten", "Product sourcing ondersteuning voor zorginstellingen en medische leveranciers."],
      ["Grondstoffen", "Grondstofgroepen die nodig zijn in productieprocessen van verschillende sectoren."],
      ["Bouwproducten", "Aanvullende productgroepen voor bouw, decoratie en bouwprojecten."],
      ["Logistiek ondersteunde handel", "Coordinatieondersteuning voor verzending, levering en operationele opvolging."],
      ["Algemene sourcingoplossingen", "Onderzoek en sourcingoplossingen voor speciale productaanvragen buiten een enkele categorie."],
    ],
    aboutIntroTitle: "Over ons",
    aboutIntroText:
      "Dynamic Era Exporters is een handelsbedrijf actief in binnenlandse en buitenlandse handel, dat professionele oplossingen biedt voor product- en sourcingbehoeften in verschillende sectoren.\n\nHet bedrijf ontwikkelt sourcingoplossingen voor energie, bouwmaterialen, textiel, voeding, gezondheid, defensie-industrie en andere handelscategorieen. Ons doel is niet alleen producten leveren, maar klanten een betrouwbare, duurzame en efficiente handelservaring bieden.\n\nMet ons brede sectornetwerk, flexibele operationele structuur en klantgerichte serviceaanpak positioneren wij ons als sterke partner in import- en exportprocessen.",
    aboutMore: "Meer informatie over ons",
    homeAboutEyebrow: "Dynamic Era Export",
    homeAboutTitle: "Wij zetten sourcingbehoeften om in het juiste handelsmodel.",
    homeAboutText:
      "In energie, textiel, voeding, gezondheid en vele andere sectoren beheren wij productonderzoek, leveranciersvergelijking, offertes en operationele opvolging vanuit een punt. Wij verduidelijken uw vraag, vinden de juiste bron en houden het proces in beweging met transparante communicatie.",
    homeAboutValues: ["Sourcing op maat van de vraag", "Sectorgericht productnetwerk", "Transparante operationele opvolging"],
    homeAboutButton: "Ons Werkmodel Bekijken",
    aboutTitle: "Over ons",
    aboutText:
      "Succes in wereldhandel hangt af van toegang tot het juiste product, op het juiste moment en onder de juiste voorwaarden. Wij analyseren klantbehoeften, bepalen geschikte sourcingkanalen en beheren het handelsproces betrouwbaar.",
    aboutSupport:
      "Bij Dynamic Era Exporters gaan wij verder dan productfinding en beheren wij elke stap van handel met vertrouwen, transparantie en snelheid.",
    aboutFlowTitle: "Handel gebouwd op vertrouwen, snelheid en transparantie",
    aboutFlowText1:
      "Vanaf de eerste dag is ons kern doel klanten te verbinden met de juiste sourcingkanalen, import- en exportprocessen betrouwbaar te beheren en waarde te creeren in elke fase van handel.",
    aboutFlowText2:
      "In het huidige wereldhandelslandschap verwachten bedrijven meer dan een product: een betrouwbare leverancier, correcte prijsstelling, duurzame zakelijke relaties, operationele opvolging en snelle communicatie. Dynamic Era Exporters neemt al deze behoeften mee in een integrale handelsaanpak.",
    aboutPillars: [
      ["Onze visie", "Een sterk handelsmerk worden dat in wereldhandel bekendstaat om betrouwbaarheid, snelheid en oplossingsgericht denken, met duurzame sourcingoplossingen in verschillende sectoren."],
      ["Onze missie", "De import-, export- en sourcingbehoeften van onze klanten correct analyseren en de meest geschikte handelsoplossingen leveren met kwaliteitsproducten, betrouwbare bronnen, concurrerende prijzen en professionele operationele ondersteuning."],
      ["Onze aanpak", "Wij zien elke samenwerking als een langdurige commerciele relatie en richten ons niet alleen op huidige productaanvragen, maar ook op toekomstige behoeften van klanten."],
    ],
    aboutOperationsEyebrow: "Wat Wij Doen",
    aboutOperationsTitle: "Wij bieden end-to-end ondersteuning in import, export en sourcing.",
    aboutOperations: [
      ["01", "Import- en exportondersteuning", "Wij bieden commerciele ondersteuning in import- en exportprocessen."],
      ["02", "Product- en leveranciersonderzoek", "Wij onderzoeken producten en leveranciers voor verschillende sectoren."],
      ["03", "Productgroepen op maat van de vraag", "Wij bepalen geschikte productgroepen op basis van klantvraag."],
      ["04", "Leveranciersverbindingen", "Wij leggen contact met lokale en internationale leveranciers."],
      ["05", "Offertes en operaties", "Wij beheren offertes, prijsstelling en operationele processen."],
      ["06", "Duurzame sourcing", "Wij bieden duurzame sourcingoplossingen over brede productcategorieen."],
    ],
    aboutValuesEyebrow: "Onze Waarden",
    aboutValuesTitle: "Wij geloven dat vertrouwen, snelheid, flexibiliteit en een wereldwijde blik de basis van handel zijn.",
    aboutValues: [
      ["Betrouwbaarheid", "Wij hanteren een transparante, verantwoordelijke en duurzame aanpak in alle bedrijfsprocessen."],
      ["Snelheid", "Wij reageren snel op klantvragen, plannen het proces efficient en volgen de operationele flow nauwgezet."],
      ["Flexibiliteit", "In plaats van vaste patronen creeren wij oplossingen per project, product en vraag."],
      ["Wereldwijde blik", "Door verschillende markten, productgroepen en leveringsbronnen te evalueren, bieden wij bredere opties."],
    ],
    aboutCtaEyebrow: "Werken met Dynamic Era Exporters",
    aboutCtaTitle: "Laten we uw handelsproces veiliger, sneller en efficienter maken.",
    aboutCtaText:
      "Of u nu een specifieke productgroep zoekt of professionele ondersteuning nodig heeft voor import-exportprocessen, ons team is klaar om de juiste oplossing voor u te bouwen.",
    aboutCtaPrimary: "Contact via WhatsApp",
    aboutCtaEmail: "Contact via e-mail",
    aboutCtaSecondary: "Contactpagina",
    values: ["Breed product- en sectornetwerk", "Betrouwbaar handelsproces", "Flexibele en snelle oplossingen", "Ervaring in internationale handel"],
    contactTitle: "Contact",
    contactLead: "Welk product, doelland of categorie u ook zoekt, we kunnen beginnen met een kort bericht.",
    form: {
      name: "Volledige naam",
      company: "Bedrijf",
      email: "E-mail",
      message: "Waar bent u naar op zoek?",
      send: "E-mail verzenden",
      sending: "Verzenden...",
      configTitle: "Formulierservice is niet geconfigureerd",
      configText: "Er moet een Web3Forms-toegangssleutel worden toegevoegd voordat berichten kunnen worden verzonden. Neem ondertussen contact op via WhatsApp.",
      successTitle: "Uw bericht is succesvol verzonden",
      successText: "Bedankt. Wij nemen zo snel mogelijk contact met u op.",
      errorTitle: "Het bericht kon niet worden verzonden",
      errorText: "Probeer het later opnieuw of neem contact met ons op via WhatsApp.",
      rateTitle: "Wacht alstublieft even",
      rateText: "Ter bescherming tegen spam kunt u slechts één bericht per minuut verzenden.",
      close: "Sluiten",
    },
    partnersTitle: "Wereldwijd handelsecosysteem",
    importantLinksTitle: "Belangrijke Links",
    footerWhatsappTitle: "Bereik ons via WhatsApp",
    footerWhatsappText: "Neem direct contact met ons op voor uw product, sector of sourcingaanvraag.",
    footer: "Heldere communicatie in import-, export- en wereldwijde sourcingoperaties.",
    copyright: "© Copyright 2026 Dynamic Era Exporters. Alle rechten voorbehouden.",
  },
  ar: {
    nav: ["الرئيسية", "القطاعات", "من نحن", "تواصل"],
    whatsapp: "تواصل مباشر عبر واتساب",
    direct: "تواصل عبر واتساب",
    quoteCta: "اطلب عرضا",
    categoriesCta: "عرض جميع القطاعات",
    homeBadge: "Global Trade, Dynamic Solutions",
    homeTitle: "شريككم الموثوق للحلول في التجارة العالمية",
    homeText:
      "من الطاقة إلى مواد البناء، ومن المنسوجات إلى الغذاء، ومن الصحة إلى الصناعات الدفاعية، نضيف قيمة لعملائنا عبر المنتج الصحيح والمورد الصحيح ونموذج التجارة الصحيح.\n\nبخبرة تجارية تتجاوز 20 عاما، وأكثر من 1500 عميل، وشبكة توريد قوية في أكثر من 20 قطاعا، نحن القوة الديناميكية للتجارة العالمية.",
    heroStats: [
      ["20+", "سنة خبرة"],
      ["1500+", "عميل"],
      ["20+", "قطاع رئيسي"],
    ],
    quoteTitle: "نرافقكم في كل مرحلة من مراحل التجارة",
    quoteText: "من البحث عن المنتج وعملية التوريد إلى التسعير وتخطيط اللوجستيات، نقدم دعما شاملا من البداية إلى النهاية.",
    trustTitle: "نرافقكم في كل مرحلة من مراحل التجارة",
    trustText:
      "من البحث عن المنتج وعملية التوريد إلى التسعير وتخطيط اللوجستيات، نقدم دعما شاملا في عمليات الاستيراد والتصدير.",
    servicesKicker: "خدماتنا",
    servicesLead:
      "نقدم البنية التجارية وشبكة التوريد والدعم التشغيلي الذي تحتاجه الشركات في عمليات الاستيراد والتصدير تحت سقف واحد.",
    services: [
      ["توريد المنتجات", "نبحث عن المنتجات عبر شبكة التوريد المحلية والدولية ونربطكم بالموردين المناسبين."],
      ["عمليات الاستيراد", "ندعم التوريد والوثائق وتنسيق اللوجستيات للمنتجات التي يتم تأمينها من الخارج."],
      ["حلول التصدير", "نطور حلول المنتج والسوق والتشغيل للشركات التي ترغب في التصدير من تركيا إلى أسواق مختلفة."],
      ["بحث الموردين", "نقدم خيارات موردين مناسبة حسب الجودة والقدرة وتوازن السعر وشروط التسليم."],
      ["العروض والتسعير", "نجهز خيارات عروض تنافسية وقابلة للمقارنة لمجموعات المنتجات المطلوبة."],
      ["متابعة اللوجستيات والتشغيل", "نقدم دعما منتظما في مراحل التسليم والشحن والمتابعة التشغيلية."],
    ],
    processTitle: "نحلل الطلب، نجد المصدر الصحيح، ونتابع العملية.",
    processLead:
      "لكل قطاع توقعات مختلفة في الجودة والتسليم والتكلفة والامتثال؛ لذلك نبني نموذجا تجاريا خاصا بالطلب بدلا من مسار قياسي.",
    processSteps: [
      ["01", "تحليل الطلب", "يتم توضيح مجموعة المنتج والسوق المستهدف والكمية وتوقعات الجودة وخطة التسليم."],
      ["02", "مصدر التوريد", "يتم البحث عن الموردين المناسبين ومقارنة خيارات السعر والتشغيل."],
      ["03", "عملية التجارة", "تتم متابعة العرض والوثائق واللوجستيات والتسليم بتواصل شفاف."],
    ],
    ctaTitle: "لنعزز عملية تجارتكم معا.",
    ctaText:
      "تواصلوا معنا للمنتج أو المورد أو حل الاستيراد والتصدير الذي تحتاجونه. لننشئ نموذج التجارة الأنسب لكم.",
    hero: [
      {
        eyebrow: "Global Trade, Dynamic Solutions",
        title: "قوة تجارية ديناميكية تنفتح على العالم.",
        text: "تقدم Dynamic Era Export منتجات من قطاعات مختلفة إلى الأسواق الدولية بحلول تصدير موثوقة وسريعة واحترافية.",
      },
      {
        eyebrow: "شبكة واسعة من القطاعات والمنتجات",
        title: "حلول تجارية متعددة من الطاقة إلى الغذاء، ومن المنسوجات إلى الصحة.",
        text: "ندير باحتراف عمليات البحث عن المنتج والتوريد والتسعير والتشغيل حسب طلبات عملائنا.",
      },
      {
        eyebrow: "خبرة تجارية تتجاوز 20 عاما",
        title: "سرعوا عملياتكم بقوة التجارة العالمية الديناميكية.",
        text: "مع أكثر من 1500 عميل وشبكة قطاعات واسعة، نقدم حلولا تجارية سريعة ومرنة ومستدامة.",
      },
    ],
    metrics: [
      ["20+", "سنة خدمة"],
      ["1500+", "عميل"],
      ["20", "مجال عمل"],
      ["360°", "دعم تجاري"],
    ],
    categoryTitle: "مجالات عملنا البارزة",
    categoryLead:
      "تمتلك Dynamic Era Exporters شبكة تجارية واسعة في مجموعات المنتجات والمواد التي تحتاجها القطاعات المختلفة.",
    allCategoriesCta: "عرض جميع مجالات العمل",
    categories: {
      energy: ["الطاقة", "معدات ومنتجات بنية تحتية ومواد كهربائية ومنتجات داعمة للطاقة المتجددة."],
      construction: ["مواد البناء", "مواد بناء ومنتجات بنية تحتية ومعدات ميكانيكية واحتياجات حسب المشروع."],
      textile: ["المنسوجات", "أقمشة وملابس جاهزة وملابس عمل ومنسوجات تقنية ومجموعات نسيج مختلفة."],
      food: ["الغذاء", "منتجات غذائية أساسية وأغذية معبأة ومنتجات زراعية وحلول تجارة موثوقة."],
      health: ["الصحة", "منتجات طبية ومستهلكات ومعدات صحية وحلول توريد قطاعية."],
      defense: ["الصناعات الدفاعية", "عمليات توريد احترافية مع الامتثال والسرية والانضباط التشغيلي."],
    },
    categoryDetails: {
      energy: {
        title: "الطاقة",
        text: "نقدم حلول توريد لقطاع الطاقة في مجموعات منتجات مختلفة، وخاصة المعدات ومنتجات البنية التحتية والمواد الكهربائية ومنتجات دعم الطاقة المتجددة.",
        points: ["معدات الطاقة", "مواد كهربائية", "توريد حسب المشروع"],
      },
      construction: {
        title: "مواد البناء",
        text: "نقدم خدمات توريد لمواد البناء ومنتجات البنية التحتية والمعدات الميكانيكية ومنتجات البناء المكملة والاحتياجات القائمة على المشاريع.",
        points: ["منتجات البناء والبنية التحتية", "معدات ميكانيكية", "احتياجات حسب المشروع"],
      },
      textile: {
        title: "المنسوجات",
        text: "نقدم حلولا للتجارة الداخلية والخارجية في الأقمشة والملابس الجاهزة وملابس العمل والمنسوجات التقنية ومجموعات النسيج المختلفة.",
        points: ["أقمشة وملابس جاهزة", "ملابس عمل", "منتجات منسوجات تقنية"],
      },
      food: {
        title: "الغذاء",
        text: "نطور حلولا موثوقة للتوريد والتجارة في المنتجات الغذائية الأساسية والأغذية المعبأة والمنتجات الزراعية وفئات الغذاء المختلفة.",
        points: ["غذاء أساسي", "منتجات معبأة", "منتجات زراعية"],
      },
      health: {
        title: "الصحة",
        text: "نقدم حلول توريد للمنتجات الطبية والمستهلكات والمعدات الصحية والاحتياجات القطاعية.",
        points: ["منتجات طبية", "مستهلكات", "معدات صحية"],
      },
      defense: {
        title: "الصناعات الدفاعية",
        text: "نطور حلولا احترافية لعمليات التوريد القطاعية في مجال الصناعات الدفاعية وفق مبادئ الامتثال والسرية والانضباط التشغيلي.",
        points: ["الامتثال", "السرية والانضباط", "توريد قطاعي"],
      },
    },
    categoryPageTitle: "القطاعات / مجالات العمل",
    categoryPageLead:
      "في جميع مجالات عملنا، نطور حلول المنتجات والتوريد وفقا لطلبات عملائنا.",
    categoryScrollHint: "مرر القائمة لعرض جميع القطاعات",
    categoryCustomCtaTitle: "تواصلوا معنا للمنتجات غير الموجودة في القائمة.",
    categoryCustomCtaText:
      "إذا لم تجدوا مجموعة المنتجات التي تحتاجونها في القائمة، تواصلوا معنا. يمكن لـ Dynamic Era Exporters البحث عن خيارات توريد مناسبة لطلباتكم الخاصة في قطاعات مختلفة.",
    categoryCustomCtaButton: "تواصل عبر واتساب",
    allSectorsTitle: "جميع القطاعات",
    allSectorsLead:
      "تقدم Dynamic Era Exporters حلولا تجارية شاملة لاحتياجات المنتجات والتوريد في قطاعات مختلفة.",
    allSectors: [
      ["الطاقة", "معدات ومنتجات بنية تحتية ومواد كهربائية ومنتجات داعمة للطاقة المتجددة."],
      ["مواد البناء", "مواد بناء ومنتجات بنية تحتية ومعدات ميكانيكية واحتياجات حسب المشروع."],
      ["المنسوجات", "أقمشة وملابس جاهزة وملابس عمل ومنسوجات تقنية ومجموعات نسيج مختلفة."],
      ["الغذاء", "منتجات غذائية أساسية وأغذية معبأة ومنتجات زراعية وحلول تجارة موثوقة."],
      ["الصحة", "منتجات طبية ومستهلكات ومعدات صحية وحلول توريد قطاعية."],
      ["الصناعات الدفاعية", "عمليات توريد احترافية مع الامتثال والسرية والانضباط التشغيلي."],
      ["الكهرباء والإلكترونيات", "مواد كهربائية ومنتجات إلكترونية ومعدات توصيل ومنتجات إضاءة."],
      ["الآلات والمعدات", "آلات صناعية ومعدات إنتاج وقطع غيار واحتياجات معدات تقنية."],
      ["الأثاث", "خيارات توريد واسعة لمنتجات أثاث المنازل والمكاتب والمساحات التجارية والمشاريع."],
      ["السيارات", "قطع غيار السيارات والمعدات والإكسسوارات ومجموعات المنتجات القطاعية."],
      ["البلاستيك والمطاط", "منتجات بلاستيكية ومواد مطاطية وقطع تقنية ومجموعات منتجات صناعية."],
      ["التغليف", "منتجات تغليف وحلول تعبئة لقطاعات الغذاء والمنسوجات والصناعة والتجزئة."],
      ["مستحضرات التجميل", "منتجات تجميل وعناية شخصية ومنتجات نظافة ومجموعات منتجات مرتبطة."],
      ["منتجات التنظيف", "منتجات تنظيف صناعية ومواد نظافة ومستهلكات ومنتجات للاستخدام المؤسسي."],
      ["المنتجات الزراعية", "منتجات زراعية ومواد خام غذائية وحلول تجارية لقطاع الزراعة."],
      ["المنتجات الطبية", "دعم توريد مجموعات المنتجات للمؤسسات الصحية وشركات التوريد الطبي."],
      ["المواد الخام", "مجموعات المواد الخام التي تحتاجها عمليات الإنتاج في قطاعات مختلفة."],
      ["منتجات البناء", "مجموعات منتجات مكملة تستخدم في مشاريع البناء والديكور والإنشاء."],
      ["تجارة مدعومة لوجستيا", "دعم تنسيقي في مراحل الشحن والتسليم والمتابعة التشغيلية."],
      ["حلول التوريد العامة", "حلول بحث وتوريد للطلبات الخاصة خارج حدود فئة واحدة."],
    ],
    aboutIntroTitle: "من نحن",
    aboutIntroText:
      "Dynamic Era Exporters شركة تجارية تعمل في مجال التجارة الداخلية والخارجية من خلال محفظة منتجات واسعة وعلاقات توريد قوية ونهج يركز على الحلول.\n\nتطور الشركة حلول توريد مناسبة لاحتياجات عملائها في الطاقة ومواد البناء والمنسوجات والغذاء والصحة والصناعات الدفاعية وفئات تجارية مختلفة. هدفنا ليس فقط توفير المنتجات، بل تقديم تجربة تجارية موثوقة ومستدامة وفعالة لعملائنا.\n\nمن خلال شبكة قطاعات واسعة وهيكل عمليات مرن ونهج خدمة يركز على العميل، نتموضع كشريك أعمال قوي في عمليات الاستيراد والتصدير للشركات.",
    aboutMore: "مزيد من المعلومات عنا",
    homeAboutEyebrow: "Dynamic Era Export",
    homeAboutTitle: "نحول احتياجات التوريد إلى نموذج تجارة مناسب.",
    homeAboutText:
      "في قطاعات الطاقة والمنسوجات والغذاء والصحة وغيرها، ندير بحث المنتجات ومقارنة الموردين وعروض الأسعار والمتابعة التشغيلية من نقطة واحدة. نوضح الطلب ونحدد المصدر المناسب وندير العملية بتواصل شفاف.",
    homeAboutValues: ["توريد مناسب للطلب", "شبكة منتجات حسب القطاع", "متابعة تشغيلية شفافة"],
    homeAboutButton: "استكشف طريقة عملنا",
    aboutTitle: "من نحن",
    aboutText:
      "يعتمد النجاح في التجارة العالمية على الوصول إلى المنتج الصحيح في الوقت الصحيح وبالشروط الصحيحة. نحلل احتياجات عملائنا ونحدد مصادر التوريد المناسبة للقطاع والطلب وندير العملية التجارية بثقة.",
    aboutSupport:
      "في Dynamic Era Exporters نتجاوز مجرد إيجاد المنتجات، وندير كل خطوة في التجارة بثقة وشفافية وسرعة.",
    aboutFlowTitle: "تجارة قائمة على الثقة والسرعة والشفافية",
    aboutFlowText1:
      "منذ اليوم الأول كان هدفنا الأساسي هو ربط عملائنا بمصادر التوريد الصحيحة، وإدارة عمليات الاستيراد والتصدير بثقة، وأن نكون شريكا يضيف قيمة في كل مرحلة من مراحل التجارة.",
    aboutFlowText2:
      "في عالم التجارة العالمية اليوم لا تبحث الشركات عن المنتج فقط؛ بل تتوقع موردا موثوقا وتسعيرا صحيحا وعلاقات عمل مستدامة ومتابعة تشغيلية وتواصلا سريعا. لذلك نعتمد نهجا تجاريا شاملا يراعي كل هذه الاحتياجات.",
    aboutPillars: [
      ["رؤيتنا", "أن نكون علامة تجارية قوية في التجارة العالمية تتميز بالثقة والسرعة والتركيز على الحلول، وتقدم حلول توريد مستدامة في قطاعات مختلفة."],
      ["مهمتنا", "تحليل احتياجات عملائنا في الاستيراد والتصدير والتوريد بشكل صحيح، وتقديم أفضل حلول التجارة من خلال منتجات عالية الجودة ومصادر موثوقة وأسعار تنافسية ودعم تشغيلي احترافي."],
      ["نهجنا", "نرى كل تعاون كعلاقة تجارية طويلة الأمد، ونركز على احتياجات عملائنا الحالية والمستقبلية."],
    ],
    aboutOperationsEyebrow: "ماذا نفعل",
    aboutOperationsTitle: "نقدم دعما شاملا في عمليات الاستيراد والتصدير والتوريد.",
    aboutOperations: [
      ["01", "دعم الاستيراد والتصدير", "نقدم دعما تجاريا في عمليات الاستيراد والتصدير."],
      ["02", "بحث المنتجات والموردين", "نبحث عن المنتجات والموردين لقطاعات مختلفة."],
      ["03", "مجموعات منتجات مناسبة", "نحدد مجموعات المنتجات المناسبة حسب طلب العميل."],
      ["04", "ربط الموردين", "نتواصل مع الموردين المحليين والدوليين."],
      ["05", "العروض والعمليات", "ندير عروض الأسعار والتسعير والعمليات التشغيلية."],
      ["06", "توريد مستدام", "نقدم حلول توريد مستدامة عبر فئات منتجات واسعة."],
    ],
    aboutValuesEyebrow: "قيمنا",
    aboutValuesTitle: "نؤمن بأن الثقة والسرعة والمرونة والرؤية العالمية هي أساس التجارة.",
    aboutValues: [
      ["الموثوقية", "نعتمد نهجا شفافا ومسؤولا ومستداما في جميع عملياتنا."],
      ["السرعة", "نستجيب بسرعة لطلبات العملاء ونخطط العملية بكفاءة ونتابع التدفق التشغيلي عن كثب."],
      ["المرونة", "نصمم حلولا خاصة بالمشروع والمنتج والطلب بدلا من القوالب الثابتة."],
      ["الرؤية العالمية", "نقيم الأسواق ومجموعات المنتجات ومصادر التوريد المختلفة لتقديم خيارات أوسع."],
    ],
    aboutCtaEyebrow: "العمل مع Dynamic Era Exporters",
    aboutCtaTitle: "لنجعل عملية تجارتكم أكثر أمانا وسرعة وكفاءة.",
    aboutCtaText:
      "سواء كنتم تبحثون عن مجموعة منتجات معينة أو تحتاجون دعما مهنيا لعمليات الاستيراد والتصدير، فريقنا جاهز لبناء الحل الأنسب لكم.",
    aboutCtaPrimary: "تواصلوا عبر واتساب",
    aboutCtaEmail: "تواصل عبر البريد الإلكتروني",
    aboutCtaSecondary: "صفحة التواصل",
    values: ["شبكة واسعة من المنتجات والقطاعات", "عملية تجارة موثوقة", "حلول مرنة وسريعة", "خبرة في التجارة الدولية"],
    contactTitle: "تواصل",
    contactLead: "أيا كان المنتج أو البلد المستهدف أو الفئة التي تبحثون عنها، يمكننا البدء برسالة قصيرة.",
    form: {
      name: "الاسم الكامل",
      company: "الشركة",
      email: "البريد الإلكتروني",
      message: "ماذا تبحث عنه؟",
      send: "إرسال بريد",
      sending: "جارٍ الإرسال...",
      configTitle: "خدمة النموذج غير مهيأة",
      configText: "يجب إضافة مفتاح وصول Web3Forms قبل إرسال الرسائل. يمكنكم التواصل معنا عبر واتساب في هذه الأثناء.",
      successTitle: "تم إرسال رسالتكم بنجاح",
      successText: "شكرا لكم. سنتواصل معكم في أقرب وقت ممكن.",
      errorTitle: "تعذر إرسال الرسالة",
      errorText: "يرجى المحاولة مرة أخرى بعد قليل أو التواصل معنا عبر واتساب.",
      rateTitle: "يرجى الانتظار قليلا",
      rateText: "للحماية من الرسائل المزعجة، يمكن إرسال رسالة واحدة فقط كل دقيقة.",
      close: "إغلاق",
    },
    partnersTitle: "منظومة التجارة العالمية",
    importantLinksTitle: "روابط مهمة",
    footerWhatsappTitle: "تواصلوا عبر واتساب",
    footerWhatsappText: "تواصلوا معنا مباشرة لطلب المنتج أو القطاع أو التوريد.",
    footer: "تواصل واضح في عمليات الاستيراد والتصدير والتوريد العالمي.",
    copyright: "© Copyright 2026 Dynamic Era Exporters. جميع الحقوق محفوظة.",
  },
};

const seoFaqContent = {
  tr: {
    title: "Dış ticaret ve tedarik hakkında sık sorulanlar",
    intro: "Ürün araştırması, ithalat, ihracat ve operasyon süreçlerimizle ilgili temel soruların kısa yanıtları.",
    items: [
      ["Dynamic Era Exporters hangi sektörlerde tedarik sağlar?", "Enerji, inşaat malzemeleri, tekstil, gıda, sağlık, savunma sanayi, elektrik-elektronik, makine, mobilya, otomotiv, ambalaj, tarım ve farklı ürün gruplarında tedarik araştırması yürütürüz."],
      ["İthalat ve ihracat süreci nasıl başlar?", "Ürün, teknik özellik, miktar, hedef ülke ve teslimat beklentisini netleştirir; uygun tedarik kaynaklarını, teklifleri ve operasyon adımlarını birlikte planlarız."],
      ["Teklif almak için hangi bilgiler gerekir?", "Ürün adı veya teknik şartname, tahmini adet, teslimat ülkesi veya şehri ve hedeflenen zaman bilgisi ilk araştırma için yeterlidir."],
      ["Yerel ve uluslararası tedarikçilerle çalışıyor musunuz?", "Evet. Talebin sektörüne, kalite standardına, bütçesine ve teslimat koşullarına göre yerel ve uluslararası tedarik seçeneklerini karşılaştırırız."],
    ],
  },
  en: {
    title: "Frequently asked questions about global trade and sourcing",
    intro: "Clear answers about product research, import, export and operational follow-up.",
    items: [
      ["Which sectors does Dynamic Era Exporters source for?", "We research sourcing options across energy, construction materials, textile, food, health, defense, electrical and electronics, machinery, furniture, automotive, packaging, agriculture and other product groups."],
      ["How does the import or export process begin?", "We clarify the product, technical specifications, quantity, destination and delivery expectations, then plan suppliers, quotations and operational steps."],
      ["What information is needed for a quotation?", "A product name or specification, estimated quantity, delivery country or city and target timing are enough to start the initial research."],
      ["Do you work with local and international suppliers?", "Yes. We compare local and international sourcing options according to sector, quality standards, budget and delivery requirements."],
    ],
  },
  ru: {
    title: "Частые вопросы о международной торговле и поставках",
    intro: "Краткие ответы об исследовании продукции, импорте, экспорте и операционном сопровождении.",
    items: [
      ["Для каких отраслей Dynamic Era Exporters организует поставки?", "Мы исследуем варианты поставок для энергетики, строительства, текстиля, пищевой отрасли, здравоохранения, обороны, электроники, машиностроения, мебели, автомобилестроения, упаковки, сельского хозяйства и других групп товаров."],
      ["Как начинается процесс импорта или экспорта?", "Мы уточняем продукт, технические характеристики, объем, страну назначения и условия поставки, затем планируем поставщиков, предложения и операционные этапы."],
      ["Какая информация нужна для предложения?", "Для начала достаточно названия или спецификации продукта, примерного количества, места доставки и желаемых сроков."],
      ["Вы работаете с местными и международными поставщиками?", "Да. Мы сравниваем местные и международные варианты по качеству, бюджету, отраслевым стандартам и условиям поставки."],
    ],
  },
  fr: {
    title: "Questions fréquentes sur le commerce et l’approvisionnement",
    intro: "Des réponses claires sur la recherche de produits, l’importation, l’exportation et le suivi opérationnel.",
    items: [
      ["Dans quels secteurs Dynamic Era Exporters intervient-elle ?", "Nous recherchons des solutions d’approvisionnement dans l’énergie, la construction, le textile, l’alimentaire, la santé, la défense, l’électronique, les machines, le mobilier, l’automobile, l’emballage, l’agriculture et d’autres groupes de produits."],
      ["Comment commence un processus d’importation ou d’exportation ?", "Nous précisons le produit, les spécifications, la quantité, la destination et les attentes de livraison avant de planifier les fournisseurs, les offres et les étapes opérationnelles."],
      ["Quelles informations faut-il fournir pour une offre ?", "Le nom ou la spécification du produit, la quantité estimée, le lieu de livraison et le délai souhaité suffisent pour lancer la recherche."],
      ["Travaillez-vous avec des fournisseurs locaux et internationaux ?", "Oui. Nous comparons les options locales et internationales selon les normes de qualité, le budget et les conditions de livraison."],
    ],
  },
  de: {
    title: "Häufige Fragen zu Handel und Beschaffung",
    intro: "Klare Antworten zu Produktsuche, Import, Export und operativer Begleitung.",
    items: [
      ["Für welche Branchen beschafft Dynamic Era Exporters Produkte?", "Wir recherchieren Beschaffungsoptionen für Energie, Bau, Textil, Lebensmittel, Gesundheit, Verteidigung, Elektronik, Maschinen, Möbel, Automotive, Verpackung, Landwirtschaft und weitere Produktgruppen."],
      ["Wie beginnt ein Import- oder Exportprozess?", "Wir klären Produkt, technische Spezifikationen, Menge, Zielort und Liefererwartungen und planen anschließend Lieferanten, Angebote und operative Schritte."],
      ["Welche Angaben werden für ein Angebot benötigt?", "Produktname oder Spezifikation, geschätzte Menge, Lieferland oder -stadt und gewünschter Zeitraum reichen für die erste Recherche aus."],
      ["Arbeiten Sie mit lokalen und internationalen Lieferanten?", "Ja. Wir vergleichen lokale und internationale Optionen nach Branche, Qualitätsstandard, Budget und Lieferbedingungen."],
    ],
  },
  nl: {
    title: "Veelgestelde vragen over handel en sourcing",
    intro: "Duidelijke antwoorden over productonderzoek, import, export en operationele opvolging.",
    items: [
      ["Voor welke sectoren verzorgt Dynamic Era Exporters sourcing?", "Wij onderzoeken sourcingopties voor energie, bouw, textiel, voeding, gezondheid, defensie, elektronica, machines, meubilair, automotive, verpakking, landbouw en andere productgroepen."],
      ["Hoe begint een import- of exportproces?", "Wij verduidelijken het product, de specificaties, hoeveelheid, bestemming en leveringsverwachtingen en plannen daarna leveranciers, offertes en operationele stappen."],
      ["Welke informatie is nodig voor een offerte?", "Een productnaam of specificatie, geschatte hoeveelheid, leveringsland of stad en gewenste timing zijn voldoende voor de eerste inventarisatie."],
      ["Werkt u met lokale en internationale leveranciers?", "Ja. Wij vergelijken lokale en internationale opties op basis van sector, kwaliteit, budget en leveringsvoorwaarden."],
    ],
  },
  ar: {
    title: "الأسئلة الشائعة حول التجارة والتوريد",
    intro: "إجابات واضحة حول البحث عن المنتجات والاستيراد والتصدير والمتابعة التشغيلية.",
    items: [
      ["ما القطاعات التي توفر لها Dynamic Era Exporters حلول التوريد؟", "نبحث عن خيارات التوريد في الطاقة والبناء والمنسوجات والغذاء والصحة والدفاع والإلكترونيات والآلات والأثاث والسيارات والتغليف والزراعة ومجموعات منتجات أخرى."],
      ["كيف تبدأ عملية الاستيراد أو التصدير؟", "نحدد المنتج والمواصفات الفنية والكمية والوجهة ومتطلبات التسليم، ثم نخطط للموردين والعروض والخطوات التشغيلية."],
      ["ما المعلومات المطلوبة للحصول على عرض؟", "يكفي اسم المنتج أو مواصفاته والكمية التقديرية وبلد أو مدينة التسليم والموعد المطلوب لبدء البحث."],
      ["هل تعملون مع موردين محليين ودوليين؟", "نعم. نقارن الخيارات المحلية والدولية وفق القطاع ومعايير الجودة والميزانية وشروط التسليم."],
    ],
  },
};

const categoryOrder = [
  "energy",
  "construction",
  "textile",
  "food",
  "health",
  "defense",
  "electrical",
  "machinery",
  "furniture",
  "automotive",
  "plastic",
  "packaging",
  "cosmetics",
  "cleaning",
  "agriculture",
  "medical",
  "rawMaterial",
  "buildingProducts",
  "logisticsTrade",
  "generalSourcing",
];
const featuredCategoryOrder = categoryOrder.slice(0, 6);
const categoryIndexByKey = Object.fromEntries(categoryOrder.map((key, index) => [key, index]));
const pages = ["home", "categories", "about", "contact"];
const SITE_URL = "https://dynamiceraexport.com";
const routePaths = {
  tr: { home: "/", categories: "/sektorler", about: "/hakkimizda", contact: "/iletisim" },
  en: { home: "/en", categories: "/en/sectors", about: "/en/about", contact: "/en/contact" },
  ru: { home: "/ru", categories: "/ru/sectors", about: "/ru/about", contact: "/ru/contact" },
  fr: { home: "/fr", categories: "/fr/secteurs", about: "/fr/a-propos", contact: "/fr/contact" },
  de: { home: "/de", categories: "/de/branchen", about: "/de/ueber-uns", contact: "/de/kontakt" },
  nl: { home: "/nl", categories: "/nl/sectoren", about: "/nl/over-ons", contact: "/nl/contact" },
  ar: { home: "/ar", categories: "/ar/sectors", about: "/ar/about", contact: "/ar/contact" },
};
const categorySlugs = {
  rawMaterial: "raw-material",
  buildingProducts: "building-products",
  logisticsTrade: "logistics-supported-trade",
  generalSourcing: "general-sourcing",
};
const seoHomeTitles = {
  tr: "Global Tedarik ve Dış Ticaret | Dynamic Era Export",
  en: "Global Sourcing and Trade | Dynamic Era Export",
  ru: "Глобальные поставки и торговля | Dynamic Era Export",
  fr: "Approvisionnement et commerce mondial | Dynamic Era Export",
  de: "Globale Beschaffung und Handel | Dynamic Era Export",
  nl: "Wereldwijde sourcing en handel | Dynamic Era Export",
  ar: "التوريد والتجارة العالمية | Dynamic Era Export",
};
const localeCodes = {
  tr: "tr_TR",
  en: "en_US",
  ru: "ru_RU",
  fr: "fr_FR",
  de: "de_DE",
  nl: "nl_NL",
  ar: "ar_AE",
};

function getPathForPage(lang, page, category) {
  const languageRoutes = routePaths[lang] || routePaths.tr;
  const basePath = languageRoutes[page] || languageRoutes.home;
  return page === "categories" && category ? `${basePath}/${categorySlugs[category] || category}` : basePath;
}

function getRouteFromPath() {
  const path = window.location.pathname.replace(/\/+$/, "") || "/";
  for (const [routeLang, languageRoutes] of Object.entries(routePaths)) {
    for (const routePage of pages) {
      const basePath = languageRoutes[routePage];
      if (path === basePath) return { lang: routeLang, page: routePage, category: null };
      if (routePage === "categories" && path.startsWith(`${basePath}/`)) {
        const categorySlug = path.slice(basePath.length + 1);
        const category = categoryOrder.find((key) => (categorySlugs[key] || key) === categorySlug);
        if (category) return { lang: routeLang, page: routePage, category };
      }
    }
  }
  return null;
}

function getInitialRoute() {
  const route = getRouteFromPath();
  if (route && window.location.pathname !== "/") return route;
  const queryLanguage = new URLSearchParams(window.location.search).get("lang");
  const initialLanguage = languages.some((language) => language.code === queryLanguage)
    ? queryLanguage
    : getInitialLanguage();
  return route && initialLanguage === "tr" ? route : { lang: initialLanguage, page: "home", category: null };
}

function cleanSeoText(value) {
  return String(value || "").replace(/\s+/g, " ").trim();
}

function truncateSeoText(value, maxLength = 158) {
  const text = cleanSeoText(value);
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength - 1).replace(/\s+\S*$/, "")}…`;
}

function setMetaTag(attribute, key, content) {
  let element = document.head.querySelector(`meta[${attribute}="${key}"]`);
  if (!element) {
    element = document.createElement("meta");
    element.setAttribute(attribute, key);
    document.head.appendChild(element);
  }
  element.setAttribute("content", content);
}

function setCanonicalLink(url) {
  let link = document.head.querySelector('link[rel="canonical"]');
  if (!link) {
    link = document.createElement("link");
    link.setAttribute("rel", "canonical");
    document.head.appendChild(link);
  }
  link.setAttribute("href", url);
}

function updateAlternateLinks(page, category) {
  document.head.querySelectorAll("link[data-seo-hreflang]").forEach((link) => link.remove());
  languages.forEach((language) => {
    const link = document.createElement("link");
    link.rel = "alternate";
    link.hreflang = language.code;
    link.href = `${SITE_URL}${getPathForPage(language.code, page, category)}`;
    link.dataset.seoHreflang = "true";
    document.head.appendChild(link);
  });
  const defaultLink = document.createElement("link");
  defaultLink.rel = "alternate";
  defaultLink.hreflang = "x-default";
  defaultLink.href = `${SITE_URL}${getPathForPage("tr", page, category)}`;
  defaultLink.dataset.seoHreflang = "true";
  document.head.appendChild(defaultLink);
}

function getCategoryEntry(t, key) {
  return t.categories?.[key] || t.allSectors?.[categoryIndexByKey[key]] || [key, ""];
}

function getCategoryDetail(t, key) {
  const [title, text] = getCategoryEntry(t, key);
  return (
    t.categoryDetails?.[key] || {
      title,
      text,
      points: t.processSteps.map(([, stepTitle]) => stepTitle),
    }
  );
}

function updatePageSeo({ lang, page, category, t }) {
  const pageLabel = page === "home" ? t.homeTitle : t.nav[pages.indexOf(page)];
  const categoryLabel = category ? getCategoryEntry(t, category)[0] : null;
  const title = page === "home"
    ? seoHomeTitles[lang]
    : `${categoryLabel || pageLabel} | Dynamic Era Export`;
  const descriptionSource = page === "home"
    ? t.homeText
    : page === "categories"
      ? category
        ? getCategoryEntry(t, category)[1]
        : t.categoryPageLead
      : page === "about"
        ? t.aboutIntroText || t.aboutText
        : t.contactLead;
  const description = truncateSeoText(descriptionSource);
  const path = getPathForPage(lang, page, category);
  const canonicalUrl = `${SITE_URL}${path}`;
  const imageUrl = `${SITE_URL}/about-global-logistics.jpg`;

  document.title = title;
  setMetaTag("name", "description", description);
  setMetaTag("name", "robots", "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1");
  setMetaTag("name", "application-name", "Dynamic Era Export");
  setMetaTag("name", "author", "Dynamic Era Exporters");
  setMetaTag("property", "og:type", "website");
  setMetaTag("property", "og:site_name", "Dynamic Era Export");
  setMetaTag("property", "og:title", title);
  setMetaTag("property", "og:description", description);
  setMetaTag("property", "og:url", canonicalUrl);
  setMetaTag("property", "og:image", imageUrl);
  setMetaTag("property", "og:image:width", "1920");
  setMetaTag("property", "og:image:height", "1280");
  setMetaTag("property", "og:image:alt", categoryLabel || pageLabel);
  setMetaTag("property", "og:locale", localeCodes[lang] || localeCodes.tr);
  setMetaTag("name", "twitter:card", "summary_large_image");
  setMetaTag("name", "twitter:title", title);
  setMetaTag("name", "twitter:description", description);
  setMetaTag("name", "twitter:image", imageUrl);
  setCanonicalLink(canonicalUrl);
  updateAlternateLinks(page, category);

  const sectorNames = (t.allSectors || []).map(([name]) => name);
  const organizationId = `${SITE_URL}/#organization`;
  const websiteId = `${SITE_URL}/#website`;
  const webpageId = `${canonicalUrl}#webpage`;
  const breadcrumbItems = [
    { "@type": "ListItem", position: 1, name: t.nav[0], item: `${SITE_URL}${getPathForPage(lang, "home")}` },
  ];
  if (page !== "home") {
    breadcrumbItems.push({ "@type": "ListItem", position: 2, name: pageLabel, item: `${SITE_URL}${getPathForPage(lang, page)}` });
  }
  if (categoryLabel) {
    breadcrumbItems.push({ "@type": "ListItem", position: 3, name: categoryLabel, item: canonicalUrl });
  }

  const graph = [
    {
      "@type": "Organization",
      "@id": organizationId,
      name: "Dynamic Era Exporters",
      alternateName: "Dynamic Era Export",
      url: SITE_URL,
      logo: `${SITE_URL}/dynamic-era-logo-original.svg`,
      image: imageUrl,
      email: company.email,
      telephone: company.phone,
      description,
      address: {
        "@type": "PostalAddress",
        addressLocality: "Istanbul",
        addressCountry: "TR",
      },
      areaServed: "Worldwide",
      knowsAbout: sectorNames,
      contactPoint: {
        "@type": "ContactPoint",
        telephone: company.phone,
        contactType: "sales",
        availableLanguage: languages.map((language) => language.name),
      },
    },
    {
      "@type": "WebSite",
      "@id": websiteId,
      url: SITE_URL,
      name: "Dynamic Era Export",
      publisher: { "@id": organizationId },
      inLanguage: languages.map((language) => language.code),
    },
    {
      "@type": page === "about" ? "AboutPage" : page === "contact" ? "ContactPage" : page === "categories" ? "CollectionPage" : "WebPage",
      "@id": webpageId,
      url: canonicalUrl,
      name: title,
      description,
      isPartOf: { "@id": websiteId },
      about: { "@id": organizationId },
      inLanguage: lang,
      breadcrumb: { "@id": `${canonicalUrl}#breadcrumb` },
    },
    {
      "@type": "BreadcrumbList",
      "@id": `${canonicalUrl}#breadcrumb`,
      itemListElement: breadcrumbItems,
    },
  ];

  const faqItems = seoFaqContent[lang]?.items || [];
  if (page === "home" && faqItems.length) {
    graph.push({
      "@type": "FAQPage",
      "@id": `${canonicalUrl}#faq`,
      mainEntity: faqItems.map(([question, answer]) => ({
        "@type": "Question",
        name: question,
        acceptedAnswer: { "@type": "Answer", text: answer },
      })),
    });
  }

  let schema = document.getElementById("dynamic-era-schema");
  if (!schema) {
    schema = document.createElement("script");
    schema.id = "dynamic-era-schema";
    schema.type = "application/ld+json";
    document.head.appendChild(schema);
  }
  schema.textContent = JSON.stringify({ "@context": "https://schema.org", "@graph": graph });
}

function App() {
  const [initialRoute] = useState(getInitialRoute);
  const [lang, setLang] = useState(initialRoute.lang);
  const [page, setPage] = useState(initialRoute.page);
  const [menuOpen, setMenuOpen] = useState(false);
  const [loading, setLoading] = useState(() => {
    if (typeof window === "undefined") return false;
    return !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  });
  const [selectedCategory, setSelectedCategory] = useState(initialRoute.category || "energy");
  const [categoryInUrl, setCategoryInUrl] = useState(initialRoute.category);
  const t = copy[lang];
  const isRtl = languages.find((item) => item.code === lang)?.dir === "rtl";

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = isRtl ? "rtl" : "ltr";
    updatePageSeo({ lang, page, category: page === "categories" ? categoryInUrl : null, t });
  }, [lang, isRtl, page, categoryInUrl, t]);

  useEffect(() => {
    if (!loading) return undefined;
    const timer = window.setTimeout(() => setLoading(false), 220);
    return () => window.clearTimeout(timer);
  }, [loading]);

  useEffect(() => {
    const expectedPath = getPathForPage(lang, page, page === "categories" ? categoryInUrl : null);
    if (window.location.pathname !== expectedPath) {
      window.history.replaceState({ lang, page, category: selectedCategory }, "", expectedPath);
    }
    const handlePopState = () => {
      const route = getRouteFromPath() || { lang: "tr", page: "home", category: null };
      setLang(route.lang);
      setPage(route.page);
      setCategoryInUrl(route.category);
      if (route.category) setSelectedCategory(route.category);
      setMenuOpen(false);
      window.scrollTo({ top: 0, behavior: "auto" });
    };
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  const goTo = (target, category) => {
    const nextCategory = category || null;
    if (nextCategory) setSelectedCategory(nextCategory);
    setCategoryInUrl(target === "categories" ? nextCategory : null);
    setPage(target);
    setMenuOpen(false);
    const nextPath = getPathForPage(lang, target, nextCategory);
    window.history.pushState({ lang, page: target, category: nextCategory }, "", nextPath);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const changeLanguage = (nextLanguage) => {
    setLang(nextLanguage);
    const nextCategory = page === "categories" ? categoryInUrl : null;
    const nextPath = getPathForPage(nextLanguage, page, nextCategory);
    window.history.pushState({ lang: nextLanguage, page, category: nextCategory }, "", nextPath);
  };

  const selectCategory = (category) => {
    setSelectedCategory(category);
    setCategoryInUrl(category);
    const nextPath = getPathForPage(lang, "categories", category);
    window.history.pushState({ lang, page: "categories", category }, "", nextPath);
  };

  return (
    <div className={`site-shell ${loading ? "is-loading" : "is-ready"}`}>
      <Loader loading={loading} />
      <Header
        t={t}
        lang={lang}
        setLang={changeLanguage}
        page={page}
        goTo={goTo}
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
      />
      <main>
        {page === "home" && <Home t={t} lang={lang} goTo={goTo} />}
        {page === "categories" && (
          <CategoriesPage
            t={t}
            lang={lang}
            goTo={goTo}
            selectedCategory={selectedCategory}
            setSelectedCategory={selectCategory}
          />
        )}
        {page === "about" && <About t={t} goTo={goTo} />}
        {page === "contact" && <Contact t={t} />}
      </main>
      <Footer t={t} lang={lang} goTo={goTo} />
    </div>
  );
}

function Loader({ loading }) {
  return (
    <div className={`loader ${loading ? "" : "loader-hide"}`} aria-hidden={!loading}>
      <div className="loader-logo">
        <LogoMark />
      </div>
      <div className="loader-line" />
    </div>
  );
}

function LogoMark() {
  return (
    <span
      className="logo-mark"
      role="img"
      aria-label="Dynamic Era Export"
      dangerouslySetInnerHTML={{ __html: logoSvg }}
    />
  );
}

function WhatsAppIcon({ size = 18 }) {
  return (
    <svg
      className="whatsapp-icon"
      width={size}
      height={size}
      viewBox="0 0 32 32"
      aria-hidden="true"
      focusable="false"
    >
      <path
        fill="currentColor"
        d="M16.01 3.2A12.72 12.72 0 0 0 3.3 15.9c0 2.24.58 4.42 1.7 6.35L3.2 28.8l6.72-1.76a12.64 12.64 0 0 0 6.08 1.55h.01A12.72 12.72 0 0 0 28.8 15.9 12.72 12.72 0 0 0 16.01 3.2Zm0 23.24h-.01a10.54 10.54 0 0 1-5.38-1.47l-.39-.23-3.98 1.04 1.06-3.88-.25-.4a10.5 10.5 0 1 1 8.95 4.94Zm5.78-7.86c-.32-.16-1.88-.93-2.17-1.04-.29-.1-.5-.16-.71.16-.21.31-.82 1.04-1 1.25-.18.21-.37.24-.69.08-.32-.16-1.34-.49-2.55-1.57-.94-.84-1.58-1.88-1.76-2.19-.18-.32-.02-.49.14-.65.14-.14.32-.37.48-.55.16-.18.21-.31.32-.52.1-.21.05-.39-.03-.55-.08-.16-.71-1.71-.97-2.34-.26-.61-.52-.53-.71-.54h-.61c-.21 0-.55.08-.84.39-.29.32-1.1 1.08-1.1 2.62 0 1.55 1.13 3.05 1.29 3.26.16.21 2.22 3.39 5.38 4.75.75.32 1.34.52 1.8.66.76.24 1.45.21 1.99.13.61-.09 1.88-.77 2.15-1.51.26-.74.26-1.38.18-1.51-.08-.13-.29-.21-.61-.37Z"
      />
    </svg>
  );
}

function LanguageFlag({ code }) {
  const Flag = languageFlags[code] || TR;
  return (
    <Flag className="language-flag" aria-hidden="true" />
  );
}

function Header({ t, lang, setLang, page, goTo, menuOpen, setMenuOpen }) {
  const [scrolled, setScrolled] = useState(false);
  const [languageOpen, setLanguageOpen] = useState(false);
  const activeLanguage = languages.find((language) => language.code === lang) || languages[0];

  useEffect(() => {
    const updateHeader = () => setScrolled(window.scrollY > 28);
    updateHeader();
    window.addEventListener("scroll", updateHeader, { passive: true });
    return () => window.removeEventListener("scroll", updateHeader);
  }, []);

  const isTransparent = page === "home" && !scrolled && !menuOpen;

  return (
    <header className={`topbar ${isTransparent ? "topbar-transparent" : "topbar-solid"}`}>
      <a className="brand" href={getPathForPage(lang, "home")} onClick={(event) => { event.preventDefault(); goTo("home"); }} aria-label={t.nav[0]}>
        <LogoMark />
      </a>

      <nav className={`nav ${menuOpen ? "nav-open" : ""}`} aria-label="Primary navigation">
        {pages.map((item, index) => (
          <a
            key={item}
            href={getPathForPage(lang, item)}
            className={page === item ? "active" : ""}
            onClick={(event) => { event.preventDefault(); goTo(item); }}
          >
            {t.nav[index]}
          </a>
        ))}
      </nav>

      <div className="top-actions">
        <div className={`language-picker ${languageOpen ? "language-picker-open" : ""}`}>
          <button
            className="language-current"
            type="button"
            aria-label="Language"
            aria-expanded={languageOpen}
            onClick={() => setLanguageOpen((value) => !value)}
          >
            <LanguageFlag code={activeLanguage.code} />
            <span>{activeLanguage.label}</span>
            <ChevronDownIcon />
          </button>
          <div className="language-menu">
            {languages.map((language) => (
              <button
                key={language.code}
                type="button"
                className={language.code === lang ? "active" : ""}
                onClick={() => {
                  setLang(language.code);
                  setLanguageOpen(false);
                }}
              >
                <LanguageFlag code={language.code} />
                <span>{language.name}</span>
              </button>
            ))}
          </div>
        </div>
        <a className="header-whatsapp" href={`https://wa.me/${company.whatsapp}`} target="_blank" rel="noreferrer">
          <WhatsAppIcon size={18} />
          <span>{t.direct}</span>
        </a>
        <button className="menu-button" onClick={() => setMenuOpen((value) => !value)} aria-label="Menu">
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>
    </header>
  );
}

function Home({ t, lang, goTo }) {
  return (
    <>
      <Hero t={t} goTo={goTo} />
      <LogoTicker t={t} />
      <AboutIntro t={t} goTo={goTo} />
      <AboutShowcase t={t} goTo={goTo} />
      <ServicesSection t={t} />
      <CategoryPreview t={t} lang={lang} goTo={goTo} />
      <ProcessSection t={t} />
      <FaqSection lang={lang} />
      <CtaBand t={t} goTo={goTo} />
    </>
  );
}

function LogoTicker({ t }) {
  const logos = [...partnerLogos, ...partnerLogos];

  return (
    <section className="logo-ticker" aria-label={t.partnersTitle || "Global Trade Ecosystem"}>
      <div className="logo-ticker-label">{t.partnersTitle || "Global Trade Ecosystem"}</div>
      <div className="logo-ticker-window">
        <div className="logo-ticker-track">
          {logos.map((logo, index) => (
            <div className="ticker-logo" key={`${logo.name}-${index}`}>
              <PartnerLogo partner={logo} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function PartnerLogo({ partner }) {
  return (
    <div className="partner-logo">
      <img src={partner.logo} alt={`${partner.name} logo`} loading="lazy" decoding="async" />
    </div>
  );
}

function Hero({ t, goTo }) {
  const [active, setActive] = useState(0);
  const [carouselReady, setCarouselReady] = useState(false);
  const heroStats = t.heroStats || t.metrics;

  useEffect(() => {
    const startCarousel = () => setCarouselReady(true);
    let idleId;
    let timerId;
    if ("requestIdleCallback" in window) {
      idleId = window.requestIdleCallback(startCarousel, { timeout: 1800 });
    } else {
      timerId = window.setTimeout(startCarousel, 1200);
    }

    return () => {
      if (idleId) window.cancelIdleCallback(idleId);
      if (timerId) window.clearTimeout(timerId);
    };
  }, []);

  useEffect(() => {
    if (!carouselReady) return undefined;
    const timer = window.setInterval(() => {
      setActive((value) => (value + 1) % heroImages.length);
    }, 5400);
    return () => window.clearInterval(timer);
  }, [carouselReady]);

  return (
    <section className="hero">
      {heroImages.map((image, index) => {
        if (!carouselReady && index > 0) return null;

        return (
          <img
            key={image}
            className={`hero-image ${active === index ? "active" : ""}`}
            src={imageVariant(image, index === 0 ? 1280 : 960, index === 0 ? 80 : 74)}
            srcSet={imageSrcSet(image, index === 0 ? 80 : 74)}
            sizes="100vw"
            width="1600"
            height="1067"
            alt=""
            aria-hidden="true"
            loading={index === 0 ? "eager" : "lazy"}
            fetchPriority={index === 0 ? "high" : "low"}
            decoding={index === 0 ? "sync" : "async"}
          />
        );
      })}
      <div className="hero-overlay" />
      <div className="hero-inner">
        <div className="hero-copy">
          <h1>{t.homeTitle}</h1>
          <div className="hero-description">
            {t.homeText.split("\n\n").map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          <div className="hero-actions">
            <a className="primary-action whatsapp-action" href={`https://wa.me/${company.whatsapp}`} target="_blank" rel="noreferrer">
              <WhatsAppIcon size={18} />
              {t.direct}
            </a>
            <button className="secondary-action" onClick={() => goTo("categories")}>
              <PackageCheck size={18} />
              {t.categoriesCta}
            </button>
          </div>
          <div className="hero-stats" aria-label="Company metrics">
            {heroStats.map(([value, label], index) => (
              <AnimatedStat key={`${value}-${label}`} value={value} label={label} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function AnimatedStat({ value, label, index }) {
  const match = String(value).match(/^(\d+)(.*)$/);
  const target = match ? Number(match[1]) : null;
  const suffix = match ? match[2] : "";
  const [displayValue, setDisplayValue] = useState(target === null ? value : `0${suffix}`);

  useEffect(() => {
    if (target === null) return undefined;

    let counter;
    const duration = 1200;
    const delay = 220 + index * 120;
    const startTimer = window.setTimeout(() => {
      const startedAt = performance.now();
      counter = window.setInterval(() => {
        const now = performance.now();
        const progress = Math.min((now - startedAt) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        setDisplayValue(`${Math.round(target * eased)}${suffix}`);

        if (progress >= 1) {
          window.clearInterval(counter);
        }
      }, 16);
    }, delay);

    return () => {
      window.clearTimeout(startTimer);
      if (counter) window.clearInterval(counter);
    };
  }, [index, suffix, target]);

  return (
    <div style={{ "--stat-delay": `${index * 110}ms` }}>
      <strong>{displayValue}</strong>
      <span>{label}</span>
    </div>
  );
}

function ProcessSection({ t }) {
  return (
    <section className="process-section">
      <div className="process-shell">
        <Reveal className="process-copy">
          <h2>{t.processTitle}</h2>
          <span>{t.processLead}</span>
        </Reveal>
        <div className="process-grid">
          {t.processSteps.map(([number, title, text]) => (
            <Reveal key={number}>
              <article className="process-card">
                <span>{number}</span>
                <div>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function AboutIntro({ t, goTo }) {
  const text = t.aboutIntroText || t.aboutText;
  const introStats = t.metrics.slice(0, 3);

  return (
    <section className="about-intro">
      <Reveal className="about-intro-head">
        <h2>{t.aboutIntroTitle || t.nav[2]}</h2>
      </Reveal>
      <div className="about-intro-layout">
        <Reveal className="about-intro-copy">
          {text.split("\n\n").map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
          <div className="about-intro-stats">
            {introStats.map(([value, label]) => (
              <div key={label}>
                <strong>{value}</strong>
                <span>{label}</span>
              </div>
            ))}
          </div>
          <button className="primary-action" onClick={() => goTo("about")}>
            {t.aboutMore || t.nav[2]}
            <ArrowRight size={17} />
          </button>
        </Reveal>
        <Reveal className="about-intro-media">
          <img className="about-intro-main" src={imageVariant(showcaseImages.logistics, 960)} srcSet={imageSrcSet(showcaseImages.logistics)} sizes="(max-width: 760px) 100vw, 44vw" width="960" height="640" alt={`${t.aboutIntroTitle || t.aboutTitle} - ${getCategoryEntry(t, "logisticsTrade")[0]}`} loading="lazy" decoding="async" />
          <img className="about-intro-side top" src={imageVariant(heroImages[2], 640, 74)} srcSet={imageSrcSet(heroImages[2], 74)} sizes="(max-width: 760px) 44vw, 20vw" width="640" height="427" alt={getCategoryEntry(t, "machinery")[0]} loading="lazy" decoding="async" />
          <img className="about-intro-side bottom" src={imageVariant(heroImages[1], 640, 74)} srcSet={imageSrcSet(heroImages[1], 74)} sizes="(max-width: 760px) 48vw, 22vw" width="640" height="427" alt={getCategoryEntry(t, "construction")[0]} loading="lazy" decoding="async" />
        </Reveal>
      </div>
    </section>
  );
}

function FaqSection({ lang }) {
  const content = seoFaqContent[lang] || seoFaqContent.tr;

  return (
    <section className="faq-section" aria-labelledby="faq-title">
      <Reveal className="faq-heading">
        <h2 id="faq-title">{content.title}</h2>
        <p>{content.intro}</p>
      </Reveal>
      <div className="faq-list">
        {content.items.map(([question, answer], index) => (
          <Reveal key={question}>
            <details className="faq-item" open={index === 0}>
              <summary>
                <span>{question}</span>
                <ChevronDownIcon aria-hidden="true" />
              </summary>
              <p>{answer}</p>
            </details>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function AboutShowcase({ t, goTo }) {
  return (
    <section className="about-showcase">
      <Reveal className="showcase-media">
        <img className="showcase-main" src={imageVariant(showcaseImages.trade, 960)} srcSet={imageSrcSet(showcaseImages.trade)} sizes="(max-width: 760px) 100vw, 46vw" width="960" height="640" alt={t.homeAboutTitle || t.aboutTitle} loading="lazy" decoding="async" />
        <img className="showcase-float top" src={imageVariant(showcaseImages.cargo, 560, 74)} srcSet={imageSrcSet(showcaseImages.cargo, 74)} sizes="(max-width: 760px) 48vw, 20vw" width="560" height="374" alt={getCategoryEntry(t, "logisticsTrade")[0]} loading="lazy" decoding="async" />
        <img className="showcase-float bottom" src={imageVariant(showcaseImages.textile, 560, 74)} srcSet={imageSrcSet(showcaseImages.textile, 74)} sizes="(max-width: 760px) 48vw, 20vw" width="560" height="374" alt={getCategoryEntry(t, "textile")[0]} loading="lazy" decoding="async" />
        <div className="showcase-badge">
          <strong>20+</strong>
          <span>{t.metrics[0][1]}</span>
        </div>
      </Reveal>
      <Reveal className="showcase-copy">
        <h2>{t.homeAboutTitle || t.aboutTitle}</h2>
        <p>{t.homeAboutText || t.aboutText}</p>
        <div className="showcase-values">
          {(t.homeAboutValues || t.values).slice(0, 3).map((value) => (
            <span key={value}>{value}</span>
          ))}
        </div>
        <button className="primary-action" onClick={() => goTo("about")}>
          {t.homeAboutButton || t.aboutMore || t.nav[2]}
          <ArrowRight size={17} />
        </button>
      </Reveal>
    </section>
  );
}

function CtaBand({ t, goTo }) {
  return (
    <section className="cta-band">
      <Reveal>
        <p className="eyebrow">Dynamic Era Export</p>
        <h2>{t.ctaTitle}</h2>
        <p>{t.ctaText}</p>
        <div className="cta-actions">
          <a className="primary-action whatsapp-action" href={`https://wa.me/${company.whatsapp}`} target="_blank" rel="noreferrer">
            <WhatsAppIcon size={18} />
            {t.direct}
          </a>
          <button className="secondary-action dark" onClick={() => goTo("categories")}>
            {t.categoriesCta}
            <ArrowRight size={17} />
          </button>
        </div>
      </Reveal>
    </section>
  );
}

function ServicesSection({ t }) {
  const services = t.services || [
    ["Product Sourcing", "We research the requested product groups and connect demand with suitable supplier options."],
    ["Import Operations", "We support sourcing, documentation and logistics coordination for imported products."],
    ["Export Solutions", "We build product, market and operation solutions for companies exporting from Turkiye."],
    ["Supplier Research", "We compare suppliers by quality, capacity, price balance and delivery conditions."],
    ["Quotation", "We prepare comparable and applicable quotation options for requested product groups."],
    ["Logistics Follow-up", "We support delivery, shipment and operational follow-up after sourcing."],
  ];

  return (
    <section className="services-section">
      <Reveal className="services-title-row">
        <h2>{t.servicesKicker || "Services"}</h2>
      </Reveal>
      <Reveal className="section-head services-head">
        <h3>{t.servicesLead || "We provide sourcing, trade and operational support under one roof."}</h3>
      </Reveal>
      <div className="services-grid">
        {services.map(([title, text], index) => (
          <Reveal key={title}>
            <article className="service-card">
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function Reveal({ children, className = "" }) {
  const [visible, setVisible] = useState(false);
  const ref = React.useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.18 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={`reveal ${visible ? "show" : ""} ${className}`}>
      {children}
    </div>
  );
}

function Metrics({ t }) {
  return (
    <section className="metrics-band" aria-label="Company metrics">
      {t.metrics.map(([number, label]) => (
        <div className="metric" key={label}>
          <strong>{number}</strong>
          <span>{label}</span>
        </div>
      ))}
    </section>
  );
}

function CategoryPreview({ t, lang, goTo }) {
  return (
    <section className="section categories-preview">
      <Reveal className="category-title-row">
        <h2>{t.categoryTitle}</h2>
      </Reveal>
      <Reveal className="section-head category-head">
        <h3>{t.categoryLead}</h3>
      </Reveal>
      <div className="category-grid">
        {featuredCategoryOrder.map((key, index) => {
          const Icon = categoryIcons[key] || PackageCheck;
          const [title, description] = getCategoryEntry(t, key);
              return (
                <Reveal key={key} className="category-reveal">
                  <article className="category-card" style={{ "--delay": `${index * 70}ms` }}>
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <div className="category-icon">
                      <Icon size={24} />
                    </div>
                    <h3>{title}</h3>
                    <p>{description}</p>
                <a
                  href={getPathForPage(lang, "categories", key)}
                  aria-label={title}
                  onClick={(event) => { event.preventDefault(); goTo("categories", key); }}
                >
                  <ArrowRight size={18} />
                </a>
              </article>
            </Reveal>
          );
        })}
      </div>
      <Reveal className="category-cta-row">
        <a
          className="primary-action"
          href={getPathForPage(lang, "categories")}
          onClick={(event) => { event.preventDefault(); goTo("categories"); }}
        >
          {t.allCategoriesCta || t.categoriesCta || "View All Categories"}
          <ArrowRight size={17} />
        </a>
      </Reveal>
    </section>
  );
}

function AboutStrip({ t }) {
  return (
    <section className="about-strip">
      <Reveal>
        <div className="about-copy">
          <p className="eyebrow">{company.name}</p>
          <h2>{t.aboutTitle}</h2>
          <p>{t.aboutText}</p>
        </div>
      </Reveal>
      <Reveal>
        <div className="value-list">
          {t.values.map((value) => (
            <div key={value}>
              <Sparkles size={18} />
              <span>{value}</span>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}

function CategoriesPage({ t, lang, goTo, selectedCategory, setSelectedCategory }) {
  const selected = getCategoryDetail(t, selectedCategory);
  const selectedLabel = getCategoryEntry(t, selectedCategory)[0];

  return (
    <section className="page-section">
      <Reveal className="page-intro category-page-intro">
        <p className="eyebrow">{t.categoryPageTitle}</p>
        <h1>{t.categoryPageLead}</h1>
      </Reveal>
      <div className="category-detail-layout">
        <Reveal className="category-tabs-shell">
          <div className="category-tabs-hint">
            <span>{t.categoryScrollHint}</span>
            <span aria-hidden="true" className="scroll-cue" />
          </div>
          <div className="category-tabs" tabIndex="0" aria-label={t.allSectorsTitle}>
            {categoryOrder.map((key) => {
              const Icon = categoryIcons[key] || PackageCheck;
              const [title, description] = getCategoryEntry(t, key);
              return (
                <a
                  key={key}
                  href={getPathForPage(lang, "categories", key)}
                  className={selectedCategory === key ? "active" : ""}
                  onClick={(event) => { event.preventDefault(); setSelectedCategory(key); }}
                >
                  <Icon size={22} />
                  <span>{title}</span>
                  <small>{description}</small>
                </a>
              );
            })}
          </div>
        </Reveal>
        <Reveal>
          <article className="selected-detail">
            <span>{selectedLabel}</span>
            <h2>{selected.title}</h2>
            <p>{selected.text}</p>
            <ul>
              {selected.points.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
            <button onClick={() => goTo("contact")}>
              {t.direct}
              <ArrowRight size={17} />
            </button>
          </article>
        </Reveal>
      </div>
      <Reveal className="category-custom-cta">
        <div>
          <h2>{t.categoryCustomCtaTitle}</h2>
          <p>{t.categoryCustomCtaText}</p>
        </div>
        <a className="primary-action whatsapp-action" href={`https://wa.me/${company.whatsapp}`} target="_blank" rel="noreferrer">
          <WhatsAppIcon size={18} />
          {t.categoryCustomCtaButton || t.direct}
        </a>
      </Reveal>
    </section>
  );
}

function About({ t, goTo }) {
  const introText = t.aboutIntroText || t.aboutText;
  const heroImages = [
    showcaseImages.aboutMain,
    showcaseImages.aboutSupply,
    showcaseImages.aboutProduct,
  ];
  const pillars = t.aboutPillars || [];
  const values = t.aboutValues || [];

  return (
    <section className="page-section about-page">
      <div className="about-hero-shell">
        <Reveal className="about-hero-copy">
          <h1>{t.aboutTitle}</h1>
          <p className="about-lead">{introText}</p>
          <p className="about-lead about-lead-secondary">{t.aboutSupport}</p>
          {t.aboutHeroNote && <p className="about-support">{t.aboutHeroNote}</p>}
        </Reveal>

        <Reveal className="about-hero-panel">
          <div className="about-hero-gallery">
            <figure className="about-hero-main">
              <img src={imageVariant(heroImages[0], 960)} srcSet={imageSrcSet(heroImages[0])} sizes="(max-width: 760px) 100vw, 46vw" width="960" height="640" alt={`${t.aboutTitle} - ${getCategoryEntry(t, "logisticsTrade")[0]}`} loading="lazy" decoding="async" />
            </figure>
            <figure className="about-hero-float about-hero-float-one">
              <img src={imageVariant(heroImages[1], 560, 74)} srcSet={imageSrcSet(heroImages[1], 74)} sizes="(max-width: 760px) 44vw, 20vw" width="560" height="374" alt={getCategoryEntry(t, "construction")[0]} loading="lazy" decoding="async" />
            </figure>
            <figure className="about-hero-float about-hero-float-two">
              <img src={imageVariant(heroImages[2], 560, 74)} srcSet={imageSrcSet(heroImages[2], 74)} sizes="(max-width: 760px) 44vw, 20vw" width="560" height="374" alt={getCategoryEntry(t, "textile")[0]} loading="lazy" decoding="async" />
            </figure>
          </div>
        </Reveal>
      </div>

      <Reveal className="about-metrics-band">
        {t.metrics.slice(0, 4).map(([value, label]) => (
          <div key={label} className="about-metric">
            <strong>{value}</strong>
            <span>{label}</span>
          </div>
        ))}
      </Reveal>

      <div className="about-flow">
        <Reveal className="about-flow-intro">
          <div className="about-flow-layout">
            <div className="about-flow-copy">
              <h2>{t.aboutFlowTitle || t.aboutMore}</h2>
              <p>{t.aboutFlowText1}</p>
              <p>{t.aboutFlowText2}</p>
            </div>
            <figure className="about-flow-media">
              <img src={showcaseImages.aboutFlow} width="1920" height="1280" alt={t.aboutFlowTitle || t.aboutMore} loading="lazy" decoding="async" />
            </figure>
          </div>
        </Reveal>

        <div className="about-pillars">
          {pillars.map(([title, text], index) => (
            <Reveal key={title} className={`about-pillar pillar-${index + 1}`}>
              <div className="about-pillar-inner">
                <span
                  className="about-pillar-index"
                  style={{
                    display: "grid",
                    placeItems: "center",
                    width: 56,
                    height: 56,
                    flex: "0 0 56px",
                    borderRadius: 999,
                    background: "#155c98",
                    color: "#ffffff",
                    fontSize: 15,
                    fontWeight: 900,
                    lineHeight: 1,
                    opacity: 1,
                  }}
                >
                  0{index + 1}
                </span>
                <div>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="about-operations">
          <div className="about-operations-copy">
            <p className="eyebrow">{t.aboutOperationsEyebrow}</p>
            <h2>{t.aboutOperationsTitle}</h2>
          </div>
          <div className="about-operations-grid">
            {t.aboutOperations.map(([index, title, text]) => (
              <article className="about-operation-card" key={title}>
                <strong
                  style={{
                    display: "grid",
                    placeItems: "center",
                    width: 50,
                    height: 50,
                    borderRadius: 999,
                    background: "#0d3373",
                    color: "#ffffff",
                    fontSize: 15,
                    fontWeight: 900,
                    lineHeight: 1,
                    opacity: 1,
                    visibility: "visible",
                  }}
                >
                  {index}
                </strong>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </Reveal>

        <Reveal className="about-values">
          <div className="about-values-copy">
            <p className="eyebrow">{t.aboutValuesEyebrow}</p>
            <h2>{t.aboutValuesTitle}</h2>
          </div>
          <div className="about-values-grid">
            {values.map(([title, text], index) => {
              const Icon = [Shield, Zap, Sparkles, Globe2][index] || Sparkles;
              return (
                <div key={title} className="about-value-card">
                  <div className="about-value-icon">
                    <Icon size={22} />
                  </div>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </div>
              );
            })}
          </div>
        </Reveal>

        <Reveal className="about-cta">
          <div className="about-cta-copy">
            <p className="eyebrow">{t.aboutCtaEyebrow}</p>
            <h2>{t.aboutCtaTitle}</h2>
            <p>{t.aboutCtaText}</p>
            <div className="about-cta-actions">
              <a className="primary-action" href={`https://wa.me/${company.whatsapp}`} target="_blank" rel="noreferrer">
                <WhatsAppIcon size={18} />
                {t.aboutCtaPrimary}
              </a>
              <a className="secondary-action about-mail-action" href={`mailto:${company.email}`}>
                <Mail size={18} />
                {t.aboutCtaEmail}
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Contact({ t }) {
  const [form, setForm] = useState({ name: "", company: "", email: "", message: "", website: "" });
  const [submitting, setSubmitting] = useState(false);
  const [feedback, setFeedback] = useState(null);
  const [formStartedAt, setFormStartedAt] = useState(() => Date.now());
  const update = (key) => (event) => setForm((value) => ({ ...value, [key]: event.target.value }));

  useEffect(() => {
    if (!feedback) return undefined;
    const closeOnEscape = (event) => {
      if (event.key === "Escape") setFeedback(null);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [feedback]);

  const submit = async (event) => {
    event.preventDefault();
    if (submitting) return;

    if (!web3FormsAccessKey) {
      setFeedback("config");
      return;
    }

    if (form.website) {
      setFeedback("success");
      return;
    }

    const now = Date.now();
    let lastSubmit = 0;
    try {
      lastSubmit = Number(window.localStorage.getItem("dynamic-era-contact-last-submit") || 0);
    } catch {
      lastSubmit = 0;
    }
    if (now - formStartedAt < 2500 || now - lastSubmit < 60000) {
      setFeedback("rate");
      return;
    }

    setSubmitting(true);
    try {
      const payload = {
        access_key: web3FormsAccessKey,
        subject: `${company.name} website inquiry`,
        from_name: company.name,
        name: form.name.trim(),
        company: form.company.trim(),
        email: form.email.trim(),
        message: form.message.trim(),
        botcheck: "",
      };

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      const result = await response.json().catch(() => null);
      const succeeded = result?.success === true;
      if (!response.ok || !succeeded) {
        throw new Error(result?.message || `Web3Forms submission failed with status ${response.status}`);
      }

      try {
        window.localStorage.setItem("dynamic-era-contact-last-submit", String(Date.now()));
      } catch {
        // Submission still succeeds when browser storage is unavailable.
      }
      setForm({ name: "", company: "", email: "", message: "", website: "" });
      setFormStartedAt(Date.now());
      setFeedback("success");
    } catch (error) {
      if (import.meta.env.DEV) console.error("Contact form error:", error);
      setFeedback("error");
    } finally {
      setSubmitting(false);
    }
  };

  const feedbackContent = feedback
    ? feedback === "success"
      ? { title: t.form.successTitle, text: t.form.successText }
      : feedback === "config"
        ? { title: t.form.configTitle, text: t.form.configText }
      : feedback === "rate"
        ? { title: t.form.rateTitle, text: t.form.rateText }
        : { title: t.form.errorTitle, text: t.form.errorText }
    : null;

  return (
    <section className="page-section contact-page">
      <Reveal className="page-intro contact-page-intro">
        <p className="eyebrow">{t.contactTitle}</p>
        <h1>{t.contactLead}</h1>
      </Reveal>
      <div className="contact-layout">
        <Reveal>
          <form
            className="contact-form"
            action="https://api.web3forms.com/submit"
            method="POST"
            onSubmit={submit}
          >
            <input type="hidden" name="access_key" value={web3FormsAccessKey} />
            <input type="hidden" name="subject" value={`${company.name} website inquiry`} />
            <input type="hidden" name="from_name" value={company.name} />
            <div className="form-honeypot" aria-hidden="true">
              <label htmlFor="contact-website">Website</label>
              <input
                id="contact-website"
                name="botcheck"
                type="text"
                tabIndex="-1"
                autoComplete="off"
                value={form.website}
                onChange={update("website")}
              />
            </div>
            <input
              required
              id="contact-name"
              name="name"
              autoComplete="name"
              maxLength="120"
              aria-label={t.form.name}
              placeholder={t.form.name}
              value={form.name}
              onChange={update("name")}
            />
            <input
              id="contact-company"
              name="company"
              autoComplete="organization"
              maxLength="160"
              aria-label={t.form.company}
              placeholder={t.form.company}
              value={form.company}
              onChange={update("company")}
            />
            <input
              required
              id="contact-email"
              name="email"
              type="email"
              autoComplete="email"
              maxLength="180"
              aria-label={t.form.email}
              placeholder={t.form.email}
              value={form.email}
              onChange={update("email")}
            />
            <textarea
              required
              id="contact-message"
              name="message"
              rows="6"
              minLength="10"
              maxLength="3000"
              aria-label={t.form.message}
              placeholder={t.form.message}
              value={form.message}
              onChange={update("message")}
            />
            <button className="primary-action" type="submit" disabled={submitting} aria-live="polite">
              {submitting ? <span className="button-spinner" aria-hidden="true" /> : <Mail size={18} />}
              {submitting ? t.form.sending : t.form.send}
            </button>
          </form>
        </Reveal>
        <Reveal>
          <aside className="contact-card">
            <div>
              <MapPin size={20} />
              <span>{company.location}</span>
            </div>
            <div>
              <Phone size={20} />
              <span>{company.phone}</span>
            </div>
            <div>
              <Mail size={20} />
              <span>{company.email}</span>
            </div>
            <iframe
              title="Dynamic Era Export location"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              src="https://www.google.com/maps?q=Istanbul%20Turkiye&output=embed"
            />
            <a className="whatsapp-wide" href={`https://wa.me/${company.whatsapp}`} target="_blank" rel="noreferrer">
              <WhatsAppIcon size={19} />
              {t.whatsapp}
            </a>
          </aside>
        </Reveal>
      </div>
      {feedbackContent && (
        <div
          className="form-feedback-backdrop"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setFeedback(null);
          }}
        >
          <div
            className={`form-feedback-modal ${feedback === "success" ? "is-success" : "is-error"}`}
            role="dialog"
            aria-modal="true"
            aria-labelledby="form-feedback-title"
          >
            <button className="form-feedback-close" type="button" onClick={() => setFeedback(null)} aria-label={t.form.close}>
              <X size={20} />
            </button>
            <div className="form-feedback-icon" aria-hidden="true">
              {feedback === "success" ? <CheckCircle2 size={34} /> : <CircleAlert size={34} />}
            </div>
            <h2 id="form-feedback-title">{feedbackContent.title}</h2>
            <p>{feedbackContent.text}</p>
            <button className="primary-action" type="button" onClick={() => setFeedback(null)}>
              {t.form.close}
            </button>
          </div>
        </div>
      )}
    </section>
  );
}

function Footer({ t, lang, goTo }) {
  const footerServices = (t.services || []).slice(0, 4);

  return (
    <footer className="footer">
      <div className="footer-main">
        <div className="footer-brand-col">
          <a className="brand" href={getPathForPage(lang, "home")} onClick={(event) => { event.preventDefault(); goTo("home"); }} aria-label={t.nav[0]}>
            <LogoMark />
          </a>
          <h2>{t.homeTitle}</h2>
          <p>{t.footer}</p>
        </div>

        <div className="footer-col">
          <h3>{t.servicesKicker || "Services"}</h3>
          {footerServices.map(([title]) => (
            <span key={title}>{title}</span>
          ))}
        </div>

        <div className="footer-col footer-links">
          <h3>{t.importantLinksTitle || "Önemli Linkler"}</h3>
          {pages.map((page, index) => (
            <a key={page} href={getPathForPage(lang, page)} onClick={(event) => { event.preventDefault(); goTo(page); }}>
              {t.nav[index]}
            </a>
          ))}
        </div>

        <div className="footer-contact-col">
          <h3>{t.footerWhatsappTitle || "WhatsApp'tan Ulaşın"}</h3>
          <p>{t.footerWhatsappText || "Ürün, sektör veya tedarik talebiniz için doğrudan bizimle iletişime geçin."}</p>
          <a className="footer-whatsapp" href={`https://wa.me/${company.whatsapp}`} target="_blank" rel="noreferrer">
            <WhatsAppIcon size={18} />
            {t.whatsapp}
          </a>
        </div>
      </div>

      <div className="footer-bottom">
        <span>{t.copyright || "© Copyright 2026 Dynamic Era Exporters. Tüm hakları saklıdır."}</span>
      </div>
    </footer>
  );
}

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
