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
  Search,
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
import { AE, AZ, BG, CN, DE, FR, GB, GR, IR, IT, NL, PL, PT, RO, RU, TR, UA } from "country-flag-icons/react/3x2";
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
const socialLinks = [
  { key: "linkedin", name: "LinkedIn", url: "https://www.linkedin.com/company/dynamic-era-export" },
  { key: "x", name: "X", url: "https://x.com/Dynamiceraxport" },
  { key: "facebook", name: "Facebook", url: "https://www.facebook.com/dynamiceraexport/" },
  { key: "instagram", name: "Instagram", url: "https://www.instagram.com/dynamiceraexport/" },
];
const defaultWeb3FormsAccessKey = "282570a4-a7e9-4a13-a895-fe20df7aa532";
const web3FormsAccessKey = String(import.meta.env.VITE_WEB3FORMS_ACCESS_KEY || defaultWeb3FormsAccessKey).trim();

const languages = [
  { code: "tr", label: "TR", name: "Türkçe", dir: "ltr" },
  { code: "en", label: "EN", name: "English", dir: "ltr" },
  { code: "it", label: "IT", name: "Italiano", dir: "ltr" },
  { code: "pt", label: "PT", name: "Português", dir: "ltr" },
  { code: "zh", label: "ZH", name: "中文", dir: "ltr" },
  { code: "fa", label: "FA", name: "فارسی", dir: "rtl" },
  { code: "uk", label: "UK", name: "Українська", dir: "ltr" },
  { code: "ro", label: "RO", name: "Română", dir: "ltr" },
  { code: "bg", label: "BG", name: "Български", dir: "ltr" },
  { code: "az", label: "AZ", name: "Azərbaycanca", dir: "ltr" },
  { code: "pl", label: "PL", name: "Polski", dir: "ltr" },
  { code: "el", label: "EL", name: "Ελληνικά", dir: "ltr" },
  { code: "ru", label: "RU", name: "Русский", dir: "ltr" },
  { code: "fr", label: "FR", name: "Français", dir: "ltr" },
  { code: "de", label: "DE", name: "Deutsch", dir: "ltr" },
  { code: "nl", label: "NL", name: "Nederlands", dir: "ltr" },
  { code: "ar", label: "AR", name: "العربية", dir: "rtl" },
];

const languageFlags = {
  tr: TR,
  en: GB,
  it: IT,
  pt: PT,
  zh: CN,
  fa: IR,
  uk: UA,
  ro: RO,
  bg: BG,
  az: AZ,
  pl: PL,
  el: GR,
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
      "Dynamic Era Export, farklı sektörlerin ihtiyaç duyduğu ürün ve malzeme gruplarında geniş bir ticaret ağına sahiptir.",
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
      "İhtiyacınız olan ürün grubunu listede göremiyorsanız bizimle iletişime geçin. Dynamic Era Export, farklı sektörlerdeki özel talepleriniz için size uygun tedarik seçeneklerini araştırabilir.",
    categoryCustomCtaButton: "WhatsApp ile İletişime Geç",
    allSectorsTitle: "Tüm Sektörler",
    allSectorsLead:
      "Dynamic Era Export, farklı sektörlerdeki ürün ve tedarik ihtiyaçlarına yönelik geniş kapsamlı ticaret çözümleri sunar.",
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
      "Dynamic Era Export, iç ve dış ticaret alanında faaliyet gösteren; farklı sektörlerdeki ürün ve tedarik ihtiyaçlarına profesyonel çözümler sunan bir ticaret şirketidir. Kurulduğu günden bu yana temel hedefimiz, müşterilerimizin ihtiyaç duyduğu ürünleri doğru tedarik kaynaklarıyla buluşturmak ve ithalat ile ihracat süreçlerini güvenilir şekilde yönetmektir.",
    aboutMore: "Hakkımızda Daha Fazla Bilgi",
    homeAboutEyebrow: "Dynamic Era Export",
    homeAboutTitle: "Tedarik ihtiyacınızı doğru ticaret modeline dönüştürüyoruz.",
    homeAboutText:
      "Enerjiden tekstile, gıdadan sağlığa kadar farklı sektörlerde ürün araştırması, tedarikçi karşılaştırması, teklif süreci ve operasyon takibini tek merkezden yönetiyoruz. Talebinizi netleştiriyor, doğru kaynağı buluyor ve süreci şeffaf iletişimle ilerletiyoruz.",
    homeAboutValues: ["Talebe özel tedarik araştırması", "Sektör bazlı ürün ağı", "Şeffaf operasyon takibi"],
    homeAboutButton: "Çalışma Modelimizi İncele",
    aboutTitle: "Hakkımızda",
    aboutText:
      "Dynamic Era Export, iç ve dış ticaret alanında faaliyet gösteren; farklı sektörlerdeki ürün ve tedarik ihtiyaçlarına profesyonel çözümler sunan bir ticaret şirketidir.",
    aboutSupport:
      "Günümüz global ticaret dünyasında firmalar yalnızca ürün aramaz; güvenilir tedarikçi, doğru fiyatlandırma, sürdürülebilir iş ilişkisi, operasyonel takip ve hızlı iletişim de bekler. Dynamic Era Export olarak biz, bu ihtiyaçların tamamını dikkate alan bütüncül bir ticaret yaklaşımı benimsiyoruz.",
    aboutHeroNote:
      "Bu yaklaşım sayesinde firmaların hem yerel hem de uluslararası pazarlarda daha güvenli ve verimli ticaret yapmasına katkı sağlıyoruz.",
    aboutFlowTitle: "Geniş sektör ağımızla ticaret sürecinizi uçtan uca yönetiyoruz",
    aboutFlowText1:
      "Enerji, inşaat malzemeleri, tekstil, gıda, sağlık, savunma sanayi, elektrik-elektronik, makine, mobilya, otomotiv, ambalaj, plastik, tarım ürünleri ve daha birçok alanda geniş ürün ve sektör ağıyla müşterilerimize hizmet veriyoruz. Her sektörde farklı ihtiyaçların, farklı standartların ve farklı operasyon süreçlerinin olduğunu biliyor; bu doğrultuda müşterilerimize özel çözümler geliştiriyoruz.",
    aboutFlowText2:
      "Dynamic Era Export için ticaret yalnızca alım-satım süreci değildir. Bizim için ticaret; doğru ürünü bulmak, güvenilir tedarikçiyle çalışmak, rekabetçi fiyat sunmak, teslimat sürecini takip etmek ve müşterinin operasyonel yükünü azaltmak anlamına gelir. Müşterilerimizin taleplerini detaylı şekilde analiz eder, uygun tedarik kaynaklarını belirler ve sürecin her aşamasında şeffaf iletişim kurarız.",
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
    aboutCtaEyebrow: "Dynamic Era Export ile Çalışmak",
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
    copyright: "© Copyright 2026 Dynamic Era Export. Tüm hakları saklıdır.",
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
      "Dynamic Era Export has a wide trade network across product and material groups needed by different sectors.",
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
      "If you cannot see the product group you need in the list, contact us. Dynamic Era Export can research suitable sourcing options for your special requests across different sectors.",
    categoryCustomCtaButton: "Contact via WhatsApp",
    allSectorsTitle: "All Sectors",
    allSectorsLead:
      "Dynamic Era Export offers comprehensive trade solutions for product and sourcing needs across different sectors.",
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
      "Dynamic Era Export is a trade company operating in domestic and foreign trade with a wide product portfolio, strong supplier relationships and a solution-oriented approach.\n\nIt develops sourcing solutions suitable for customer needs in energy, construction materials, textile, food, health, defense industry and different trade categories. Our goal is not only to provide products, but to offer our customers a reliable, sustainable and efficient trade experience.\n\nWith our wide sector network, flexible operation structure and customer-oriented service approach, we position ourselves as a strong business partner in companies' import and export processes.",
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
      "At Dynamic Era Export, we go beyond finding products and manage every step of trade with trust, transparency and speed.",
    aboutFlowTitle: "Trade built on trust, speed and transparency",
    aboutFlowText1:
      "Since day one, our core goal has been to connect customers with the right sourcing channels, manage import and export processes reliably, and become a business partner that creates value at every stage of trade.",
    aboutFlowText2:
      "In today's global trade landscape, companies expect more than a product: a reliable supplier, correct pricing, sustainable business relationships, operational follow-up and fast communication. At Dynamic Era Export, we adopt a holistic trade approach that takes all of these needs into account.",
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
    aboutCtaEyebrow: "Working with Dynamic Era Export",
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
    copyright: "© Copyright 2026 Dynamic Era Export. All rights reserved.",
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
      "Dynamic Era Export обладает широкой торговой сетью по группам продукции и материалов, необходимых разным секторам.",
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
      "Если вы не видите нужную группу продукции в списке, свяжитесь с нами. Dynamic Era Export может исследовать подходящие варианты поставок для ваших специальных запросов в разных секторах.",
    categoryCustomCtaButton: "Связаться в WhatsApp",
    allSectorsTitle: "Все секторы",
    allSectorsLead:
      "Dynamic Era Export предлагает комплексные торговые решения для потребностей в продукции и поставках в разных секторах.",
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
      "Dynamic Era Export — торговая компания, работающая в сфере внутренней и внешней торговли и предлагающая профессиональные решения для продуктовых и поставочных потребностей разных секторов.\n\nКомпания разрабатывает решения по поставкам для энергетики, строительных материалов, текстиля, продуктов питания, здравоохранения, оборонной промышленности и других торговых категорий. Наша цель — не просто предоставить продукт, а обеспечить клиентам надежный, устойчивый и эффективный торговый опыт.\n\nБлагодаря широкой секторной сети, гибкой операционной структуре и клиентскому подходу мы становимся сильным партнером компаний в процессах импорта и экспорта.",
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
      "В Dynamic Era Export мы выходим за рамки поиска продукта и управляем каждым этапом торговли с доверием, прозрачностью и скоростью.",
    aboutFlowTitle: "Торговля, основанная на доверии, скорости и прозрачности",
    aboutFlowText1:
      "С первого дня наша главная цель — соединять клиентов с правильными каналами поставок, надежно управлять процессами импорта и экспорта и быть партнером, который создает ценность на каждом этапе торговли.",
    aboutFlowText2:
      "В современной глобальной торговле компаниям нужен не только продукт: они ожидают надежного поставщика, корректного ценообразования, устойчивых деловых отношений, операционного сопровождения и быстрой коммуникации. Dynamic Era Export учитывает все эти потребности через комплексный торговый подход.",
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
    aboutCtaEyebrow: "Работа с Dynamic Era Export",
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
    copyright: "© Copyright 2026 Dynamic Era Export. Все права защищены.",
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
      "Dynamic Era Export dispose d'un vaste réseau commercial couvrant les groupes de produits et matériaux nécessaires à différents secteurs.",
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
      "Si vous ne voyez pas le groupe de produits dont vous avez besoin dans la liste, contactez-nous. Dynamic Era Export peut rechercher des options d'approvisionnement adaptées à vos demandes spécifiques dans différents secteurs.",
    categoryCustomCtaButton: "Contacter via WhatsApp",
    allSectorsTitle: "Tous Les Secteurs",
    allSectorsLead:
      "Dynamic Era Export propose des solutions commerciales complètes pour les besoins en produits et approvisionnement dans différents secteurs.",
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
      "Dynamic Era Export est une société commerciale active dans le commerce intérieur et extérieur, offrant des solutions professionnelles aux besoins en produits et approvisionnement de différents secteurs.\n\nElle développe des solutions d'approvisionnement adaptées aux besoins des clients dans l'énergie, les matériaux de construction, le textile, l'alimentaire, la santé, l'industrie de défense et d'autres catégories commerciales. Notre objectif n'est pas seulement de fournir des produits, mais d'offrir une expérience commerciale fiable, durable et efficace.\n\nGrâce à notre large réseau sectoriel, notre structure opérationnelle flexible et notre approche orientée client, nous nous positionnons comme un partenaire solide dans les processus d'importation et d'exportation des entreprises.",
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
      "Chez Dynamic Era Export, nous allons au-delà de la recherche de produits et gérons chaque étape du commerce avec confiance, transparence et rapidité.",
    aboutFlowTitle: "Un commerce fondé sur la confiance, la rapidité et la transparence",
    aboutFlowText1:
      "Depuis le premier jour, notre objectif principal est de connecter nos clients aux bons canaux d'approvisionnement, de gérer les processus d'importation et d'exportation avec fiabilité et de devenir un partenaire qui crée de la valeur à chaque étape du commerce.",
    aboutFlowText2:
      "Dans le commerce mondial actuel, les entreprises attendent plus qu'un produit: un fournisseur fiable, une tarification correcte, des relations durables, un suivi opérationnel et une communication rapide. Dynamic Era Export adopte une approche globale qui prend en compte tous ces besoins.",
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
    aboutCtaEyebrow: "Travailler avec Dynamic Era Export",
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
    copyright: "© Copyright 2026 Dynamic Era Export. Tous droits réservés.",
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
      "Dynamic Era Export verfügt über ein breites Handelsnetzwerk für Produkt- und Materialgruppen, die in verschiedenen Sektoren benötigt werden.",
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
      "Wenn Sie die benötigte Produktgruppe nicht in der Liste sehen, kontaktieren Sie uns. Dynamic Era Export kann passende Beschaffungsoptionen für Ihre speziellen Anforderungen in verschiedenen Sektoren recherchieren.",
    categoryCustomCtaButton: "Per WhatsApp kontaktieren",
    allSectorsTitle: "Alle Sektoren",
    allSectorsLead:
      "Dynamic Era Export bietet umfassende Handelslösungen für Produkt- und Beschaffungsanforderungen in verschiedenen Sektoren.",
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
      "Dynamic Era Export ist ein Handelsunternehmen im Innen- und Außenhandel, das professionelle Lösungen für Produkt- und Beschaffungsbedarfe unterschiedlicher Sektoren anbietet.\n\nDas Unternehmen entwickelt passende Beschaffungslösungen für Energie, Baustoffe, Textil, Lebensmittel, Gesundheit, Verteidigungsindustrie und weitere Handelsbereiche. Unser Ziel ist nicht nur die Bereitstellung von Produkten, sondern ein zuverlässiges, nachhaltiges und effizientes Handelserlebnis für unsere Kunden.\n\nMit unserem breiten Sektornetzwerk, unserer flexiblen Operationsstruktur und unserem kundenorientierten Serviceverständnis positionieren wir uns als starker Partner in Import- und Exportprozessen.",
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
      "Bei Dynamic Era Export gehen wir über die reine Produktsuche hinaus und steuern jeden Handelsschritt mit Vertrauen, Transparenz und Geschwindigkeit.",
    aboutFlowTitle: "Handel auf Basis von Vertrauen, Geschwindigkeit und Transparenz",
    aboutFlowText1:
      "Seit dem ersten Tag ist unser Ziel, Kunden mit den richtigen Beschaffungskanälen zu verbinden, Import- und Exportprozesse zuverlässig zu steuern und in jeder Handelsphase Mehrwert zu schaffen.",
    aboutFlowText2:
      "Im heutigen globalen Handel erwarten Unternehmen mehr als nur ein Produkt: zuverlässige Lieferanten, korrekte Preisgestaltung, nachhaltige Geschäftsbeziehungen, operative Nachverfolgung und schnelle Kommunikation. Dynamic Era Export berücksichtigt all diese Bedürfnisse mit einem ganzheitlichen Handelsansatz.",
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
    aboutCtaEyebrow: "Arbeiten mit Dynamic Era Export",
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
    copyright: "© Copyright 2026 Dynamic Era Export. Alle Rechte vorbehalten.",
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
      "Dynamic Era Export beschikt over een breed handelsnetwerk voor product- en materiaalgroepen die verschillende sectoren nodig hebben.",
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
      "Als u de productgroep die u nodig heeft niet in de lijst ziet, neem dan contact met ons op. Dynamic Era Export kan geschikte sourcingopties onderzoeken voor uw speciale aanvragen in verschillende sectoren.",
    categoryCustomCtaButton: "Contact via WhatsApp",
    allSectorsTitle: "Alle Sectoren",
    allSectorsLead:
      "Dynamic Era Export biedt uitgebreide handelsoplossingen voor product- en sourcingbehoeften in verschillende sectoren.",
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
      "Dynamic Era Export is een handelsbedrijf actief in binnenlandse en buitenlandse handel, dat professionele oplossingen biedt voor product- en sourcingbehoeften in verschillende sectoren.\n\nHet bedrijf ontwikkelt sourcingoplossingen voor energie, bouwmaterialen, textiel, voeding, gezondheid, defensie-industrie en andere handelscategorieen. Ons doel is niet alleen producten leveren, maar klanten een betrouwbare, duurzame en efficiente handelservaring bieden.\n\nMet ons brede sectornetwerk, flexibele operationele structuur en klantgerichte serviceaanpak positioneren wij ons als sterke partner in import- en exportprocessen.",
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
      "Bij Dynamic Era Export gaan wij verder dan productfinding en beheren wij elke stap van handel met vertrouwen, transparantie en snelheid.",
    aboutFlowTitle: "Handel gebouwd op vertrouwen, snelheid en transparantie",
    aboutFlowText1:
      "Vanaf de eerste dag is ons kern doel klanten te verbinden met de juiste sourcingkanalen, import- en exportprocessen betrouwbaar te beheren en waarde te creeren in elke fase van handel.",
    aboutFlowText2:
      "In het huidige wereldhandelslandschap verwachten bedrijven meer dan een product: een betrouwbare leverancier, correcte prijsstelling, duurzame zakelijke relaties, operationele opvolging en snelle communicatie. Dynamic Era Export neemt al deze behoeften mee in een integrale handelsaanpak.",
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
    aboutCtaEyebrow: "Werken met Dynamic Era Export",
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
    copyright: "© Copyright 2026 Dynamic Era Export. Alle rechten voorbehouden.",
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
      "تمتلك Dynamic Era Export شبكة تجارية واسعة في مجموعات المنتجات والمواد التي تحتاجها القطاعات المختلفة.",
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
      "إذا لم تجدوا مجموعة المنتجات التي تحتاجونها في القائمة، تواصلوا معنا. يمكن لـ Dynamic Era Export البحث عن خيارات توريد مناسبة لطلباتكم الخاصة في قطاعات مختلفة.",
    categoryCustomCtaButton: "تواصل عبر واتساب",
    allSectorsTitle: "جميع القطاعات",
    allSectorsLead:
      "تقدم Dynamic Era Export حلولا تجارية شاملة لاحتياجات المنتجات والتوريد في قطاعات مختلفة.",
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
      "Dynamic Era Export شركة تجارية تعمل في مجال التجارة الداخلية والخارجية من خلال محفظة منتجات واسعة وعلاقات توريد قوية ونهج يركز على الحلول.\n\nتطور الشركة حلول توريد مناسبة لاحتياجات عملائها في الطاقة ومواد البناء والمنسوجات والغذاء والصحة والصناعات الدفاعية وفئات تجارية مختلفة. هدفنا ليس فقط توفير المنتجات، بل تقديم تجربة تجارية موثوقة ومستدامة وفعالة لعملائنا.\n\nمن خلال شبكة قطاعات واسعة وهيكل عمليات مرن ونهج خدمة يركز على العميل، نتموضع كشريك أعمال قوي في عمليات الاستيراد والتصدير للشركات.",
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
      "في Dynamic Era Export نتجاوز مجرد إيجاد المنتجات، وندير كل خطوة في التجارة بثقة وشفافية وسرعة.",
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
    aboutCtaEyebrow: "العمل مع Dynamic Era Export",
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
    copyright: "© Copyright 2026 Dynamic Era Export. جميع الحقوق محفوظة.",
  },
};

const seoFaqContent = {
  tr: {
    title: "Dış ticaret ve tedarik hakkında sık sorulanlar",
    intro: "Ürün araştırması, ithalat, ihracat ve operasyon süreçlerimizle ilgili temel soruların kısa yanıtları.",
    items: [
      ["Dynamic Era Export hangi sektörlerde tedarik sağlar?", "Enerji, inşaat malzemeleri, tekstil, gıda, sağlık, savunma sanayi, elektrik-elektronik, makine, mobilya, otomotiv, ambalaj, tarım ve farklı ürün gruplarında tedarik araştırması yürütürüz."],
      ["İthalat ve ihracat süreci nasıl başlar?", "Ürün, teknik özellik, miktar, hedef ülke ve teslimat beklentisini netleştirir; uygun tedarik kaynaklarını, teklifleri ve operasyon adımlarını birlikte planlarız."],
      ["Teklif almak için hangi bilgiler gerekir?", "Ürün adı veya teknik şartname, tahmini adet, teslimat ülkesi veya şehri ve hedeflenen zaman bilgisi ilk araştırma için yeterlidir."],
      ["Yerel ve uluslararası tedarikçilerle çalışıyor musunuz?", "Evet. Talebin sektörüne, kalite standardına, bütçesine ve teslimat koşullarına göre yerel ve uluslararası tedarik seçeneklerini karşılaştırırız."],
    ],
  },
  en: {
    title: "Frequently asked questions about global trade and sourcing",
    intro: "Clear answers about product research, import, export and operational follow-up.",
    items: [
      ["Which sectors does Dynamic Era Export source for?", "We research sourcing options across energy, construction materials, textile, food, health, defense, electrical and electronics, machinery, furniture, automotive, packaging, agriculture and other product groups."],
      ["How does the import or export process begin?", "We clarify the product, technical specifications, quantity, destination and delivery expectations, then plan suppliers, quotations and operational steps."],
      ["What information is needed for a quotation?", "A product name or specification, estimated quantity, delivery country or city and target timing are enough to start the initial research."],
      ["Do you work with local and international suppliers?", "Yes. We compare local and international sourcing options according to sector, quality standards, budget and delivery requirements."],
    ],
  },
  ru: {
    title: "Частые вопросы о международной торговле и поставках",
    intro: "Краткие ответы об исследовании продукции, импорте, экспорте и операционном сопровождении.",
    items: [
      ["Для каких отраслей Dynamic Era Export организует поставки?", "Мы исследуем варианты поставок для энергетики, строительства, текстиля, пищевой отрасли, здравоохранения, обороны, электроники, машиностроения, мебели, автомобилестроения, упаковки, сельского хозяйства и других групп товаров."],
      ["Как начинается процесс импорта или экспорта?", "Мы уточняем продукт, технические характеристики, объем, страну назначения и условия поставки, затем планируем поставщиков, предложения и операционные этапы."],
      ["Какая информация нужна для предложения?", "Для начала достаточно названия или спецификации продукта, примерного количества, места доставки и желаемых сроков."],
      ["Вы работаете с местными и международными поставщиками?", "Да. Мы сравниваем местные и международные варианты по качеству, бюджету, отраслевым стандартам и условиям поставки."],
    ],
  },
  fr: {
    title: "Questions fréquentes sur le commerce et l’approvisionnement",
    intro: "Des réponses claires sur la recherche de produits, l’importation, l’exportation et le suivi opérationnel.",
    items: [
      ["Dans quels secteurs Dynamic Era Export intervient-elle ?", "Nous recherchons des solutions d’approvisionnement dans l’énergie, la construction, le textile, l’alimentaire, la santé, la défense, l’électronique, les machines, le mobilier, l’automobile, l’emballage, l’agriculture et d’autres groupes de produits."],
      ["Comment commence un processus d’importation ou d’exportation ?", "Nous précisons le produit, les spécifications, la quantité, la destination et les attentes de livraison avant de planifier les fournisseurs, les offres et les étapes opérationnelles."],
      ["Quelles informations faut-il fournir pour une offre ?", "Le nom ou la spécification du produit, la quantité estimée, le lieu de livraison et le délai souhaité suffisent pour lancer la recherche."],
      ["Travaillez-vous avec des fournisseurs locaux et internationaux ?", "Oui. Nous comparons les options locales et internationales selon les normes de qualité, le budget et les conditions de livraison."],
    ],
  },
  de: {
    title: "Häufige Fragen zu Handel und Beschaffung",
    intro: "Klare Antworten zu Produktsuche, Import, Export und operativer Begleitung.",
    items: [
      ["Für welche Branchen beschafft Dynamic Era Export Produkte?", "Wir recherchieren Beschaffungsoptionen für Energie, Bau, Textil, Lebensmittel, Gesundheit, Verteidigung, Elektronik, Maschinen, Möbel, Automotive, Verpackung, Landwirtschaft und weitere Produktgruppen."],
      ["Wie beginnt ein Import- oder Exportprozess?", "Wir klären Produkt, technische Spezifikationen, Menge, Zielort und Liefererwartungen und planen anschließend Lieferanten, Angebote und operative Schritte."],
      ["Welche Angaben werden für ein Angebot benötigt?", "Produktname oder Spezifikation, geschätzte Menge, Lieferland oder -stadt und gewünschter Zeitraum reichen für die erste Recherche aus."],
      ["Arbeiten Sie mit lokalen und internationalen Lieferanten?", "Ja. Wir vergleichen lokale und internationale Optionen nach Branche, Qualitätsstandard, Budget und Lieferbedingungen."],
    ],
  },
  nl: {
    title: "Veelgestelde vragen over handel en sourcing",
    intro: "Duidelijke antwoorden over productonderzoek, import, export en operationele opvolging.",
    items: [
      ["Voor welke sectoren verzorgt Dynamic Era Export sourcing?", "Wij onderzoeken sourcingopties voor energie, bouw, textiel, voeding, gezondheid, defensie, elektronica, machines, meubilair, automotive, verpakking, landbouw en andere productgroepen."],
      ["Hoe begint een import- of exportproces?", "Wij verduidelijken het product, de specificaties, hoeveelheid, bestemming en leveringsverwachtingen en plannen daarna leveranciers, offertes en operationele stappen."],
      ["Welke informatie is nodig voor een offerte?", "Een productnaam of specificatie, geschatte hoeveelheid, leveringsland of stad en gewenste timing zijn voldoende voor de eerste inventarisatie."],
      ["Werkt u met lokale en internationale leveranciers?", "Ja. Wij vergelijken lokale en internationale opties op basis van sector, kwaliteit, budget en leveringsvoorwaarden."],
    ],
  },
  ar: {
    title: "الأسئلة الشائعة حول التجارة والتوريد",
    intro: "إجابات واضحة حول البحث عن المنتجات والاستيراد والتصدير والمتابعة التشغيلية.",
    items: [
      ["ما القطاعات التي توفر لها Dynamic Era Export حلول التوريد؟", "نبحث عن خيارات التوريد في الطاقة والبناء والمنسوجات والغذاء والصحة والدفاع والإلكترونيات والآلات والأثاث والسيارات والتغليف والزراعة ومجموعات منتجات أخرى."],
      ["كيف تبدأ عملية الاستيراد أو التصدير؟", "نحدد المنتج والمواصفات الفنية والكمية والوجهة ومتطلبات التسليم، ثم نخطط للموردين والعروض والخطوات التشغيلية."],
      ["ما المعلومات المطلوبة للحصول على عرض؟", "يكفي اسم المنتج أو مواصفاته والكمية التقديرية وبلد أو مدينة التسليم والموعد المطلوب لبدء البحث."],
      ["هل تعملون مع موردين محليين ودوليين؟", "نعم. نقارن الخيارات المحلية والدولية وفق القطاع ومعايير الجودة والميزانية وشروط التسليم."],
    ],
  },
};

const additionalSeoFaqContent = {
  "it": {
    "title": "Domande frequenti sul commercio globale e sull'approvvigionamento",
    "intro": "Risposte chiare su ricerca prodotto, import, export e follow-up operativo.",
    "items": [
      [
        "Per quali settori si rifornisce Dynamic Era Export?",
        "Ricerchiamo opzioni di approvvigionamento nei settori dell'energia, dei materiali da costruzione, del tessile, dell'alimentazione, della sanità, della difesa, dell'elettricità e dell'elettronica, dei macchinari, dei mobili, dell'automotive, dell'imballaggio, dell'agricoltura e di altri gruppi di prodotti."
      ],
      [
        "Come inizia il processo import o export?",
        "Chiariamo il prodotto, le specifiche tecniche, la quantità, la destinazione e le aspettative di consegna, quindi pianifichiamo fornitori, preventivi e fasi operative."
      ],
      [
        "Quali informazioni sono necessarie per un preventivo?",
        "Per avviare la ricerca iniziale sono sufficienti il ​​nome o le specifiche del prodotto, la quantità stimata, il paese o la città di consegna e i tempi target."
      ],
      [
        "Lavori con fornitori locali e internazionali?",
        "SÌ. Confrontiamo le opzioni di approvvigionamento locali e internazionali in base al settore, agli standard di qualità, al budget e ai requisiti di consegna."
      ]
    ]
  },
  "pt": {
    "title": "Perguntas frequentes sobre comércio e fornecimento global",
    "intro": "Respostas claras sobre pesquisa de produtos, import, export e acompanhamento operacional.",
    "items": [
      [
        "Para quais setores a Dynamic Era Export fornece?",
        "Pesquisamos opções de fornecimento em energia, materiais de construção, têxteis, alimentos, saúde, defesa, elétricos e eletrônicos, máquinas, móveis, automotivo, embalagens, agricultura e outros grupos de produtos."
      ],
      [
        "Como começa o processo import ou export?",
        "Esclarecemos o produto, especificações técnicas, quantidade, destino e expectativas de entrega, em seguida planejamos fornecedores, cotações e etapas operacionais."
      ],
      [
        "Quais informações são necessárias para uma cotação?",
        "O nome ou especificação do produto, a quantidade estimada, o país ou cidade de entrega e o prazo de entrega são suficientes para iniciar a pesquisa inicial."
      ],
      [
        "Você trabalha com fornecedores locais e internacionais?",
        "Sim. Comparamos opções de fornecimento locais e internacionais de acordo com o setor, padrões de qualidade, orçamento e requisitos de entrega."
      ]
    ]
  },
  "zh": {
    "title": "有关全球贸易和采购的常见问题",
    "intro": "关于产品研究、import、export和运营跟进的清晰答案。",
    "items": [
      [
        "Dynamic Era Export 为哪些部门采购？",
        "我们研究能源、建筑材料、纺织、食品、健康、国防、电气和电子、机械、家具、汽车、包装、农业和其他产品组的采购选择。"
      ],
      [
        "import 或 export 流程如何开始？",
        "我们明确产品、技术规格、数量、目的地和交货期望，然后规划供应商、报价和操作步骤。"
      ],
      [
        "报价需要哪些信息？",
        "产品名称或规格、预计数量、交货国家或城市以及目标时间足以开始初步研究。"
      ],
      [
        "您与本地和国际供应商合作吗？",
        "是的。我们根据行业、质量标准、预算和交付要求比较本地和国际采购选项。"
      ]
    ]
  },
  "fa": {
    "title": "سوالات متداول در مورد تجارت جهانی و منابع",
    "intro": "پاسخ‌های روشن درباره تحقیقات محصول، واردات، صادرات و پیگیری عملیاتی.",
    "items": [
      [
        "Dynamic Era Export برای کدام بخش ها منبع می شود؟",
        "ما در مورد گزینه های منابع انرژی، مصالح ساختمانی، نساجی، غذا، بهداشت، دفاع، برق و الکترونیک، ماشین آلات، مبلمان، خودرو، بسته بندی، کشاورزی و سایر گروه های محصول تحقیق می کنیم."
      ],
      [
        "فرآیند import یا export چگونه آغاز می شود؟",
        "ما محصول، مشخصات فنی، کمیت، مقصد و انتظارات تحویل را روشن می کنیم، سپس تامین کنندگان، قیمت ها و مراحل عملیاتی را برنامه ریزی می کنیم."
      ],
      [
        "چه اطلاعاتی برای نقل قول مورد نیاز است؟",
        "نام یا مشخصات محصول، مقدار تخمینی، کشور یا شهر تحویل و زمان هدف برای شروع تحقیقات اولیه کافی است."
      ],
      [
        "آیا با تامین کنندگان داخلی و بین المللی کار می کنید؟",
        "بله ما گزینه های منابع محلی و بین المللی را با توجه به بخش، استانداردهای کیفیت، بودجه و الزامات تحویل مقایسه می کنیم."
      ]
    ]
  },
  "uk": {
    "title": "Часті запитання про світову торгівлю та пошук",
    "intro": "Чіткі відповіді щодо дослідження продукту, import, export і операційного супроводу.",
    "items": [
      [
        "Для яких секторів використовується Dynamic Era Export?",
        "Ми досліджуємо варіанти постачальників у сферах енергетики, будівельних матеріалів, текстилю, продуктів харчування, охорони здоров’я, оборони, електротехніки та електроніки, машинобудування, меблів, автомобілів, упаковки, сільського господарства та інших груп продуктів."
      ],
      [
        "Як починається процес import або export?",
        "Ми уточнюємо продукт, технічні характеристики, кількість, пункт призначення та очікування доставки, а потім плануємо постачальників, пропозиції та операційні кроки."
      ],
      [
        "Яка інформація потрібна для пропозиції?",
        "Для початку початкового дослідження достатньо назви або специфікації продукту, орієнтовної кількості, країни або міста доставки та цільового часу."
      ],
      [
        "Чи працюєте ви з місцевими та міжнародними постачальниками?",
        "так Ми порівнюємо місцеві та міжнародні варіанти постачання відповідно до сектору, стандартів якості, бюджету та вимог щодо доставки."
      ]
    ]
  },
  "ro": {
    "title": "Întrebări frecvente despre comerțul global și aprovizionare",
    "intro": "Răspunsuri clare despre cercetarea produselor, import, export și urmărirea operațională.",
    "items": [
      [
        "Pentru ce sectoare provine Dynamic Era Export?",
        "Cercetăm opțiuni de aprovizionare pentru energie, materiale de construcții, textile, alimente, sănătate, apărare, electrice și electronice, mașini, mobilier, auto, ambalaje, agricultură și alte grupuri de produse."
      ],
      [
        "Cum începe procesul import sau export?",
        "Clarificăm produsul, specificațiile tehnice, cantitatea, destinația și așteptările de livrare, apoi planificăm furnizorii, cotațiile și etapele operaționale."
      ],
      [
        "Ce informații sunt necesare pentru o cotație?",
        "Un nume sau o specificație a produsului, o cantitate estimată, țara sau orașul de livrare și momentul țintă sunt suficiente pentru a începe cercetarea inițială."
      ],
      [
        "Lucrați cu furnizori locali și internaționali?",
        "Da. Comparăm opțiunile de aprovizionare locale și internaționale în funcție de sector, standarde de calitate, buget și cerințe de livrare."
      ]
    ]
  },
  "bg": {
    "title": "Често задавани въпроси относно глобалната търговия и снабдяването",
    "intro": "Ясни отговори относно проучване на продукта, import, export и оперативно проследяване.",
    "items": [
      [
        "За кои сектори се използва Dynamic Era Export?",
        "Ние проучваме възможности за снабдяване в енергетиката, строителните материали, текстила, храните, здравеопазването, отбраната, електричеството и електрониката, машините, мебелите, автомобилите, опаковките, селското стопанство и други продуктови групи."
      ],
      [
        "Как започва процесът import или export?",
        "Ние изясняваме продукта, техническите спецификации, количеството, дестинацията и очакванията за доставка, след което планираме доставчици, оферти и оперативни стъпки."
      ],
      [
        "Каква информация е необходима за оферта?",
        "Име на продукта или спецификация, прогнозно количество, държава или град на доставка и целево време са достатъчни, за да започнете първоначалното проучване."
      ],
      [
        "Работите ли с местни и международни доставчици?",
        "да Ние сравняваме местни и международни опции за снабдяване според сектора, стандартите за качество, бюджета и изискванията за доставка."
      ]
    ]
  },
  "az": {
    "title": "Qlobal ticarət və mənbə haqqında tez-tez verilən suallar",
    "intro": "Məhsul araşdırması, import, export və əməliyyat təqibi ilə bağlı aydın cavablar.",
    "items": [
      [
        "Dynamic Era Export hansı sektorlar üçün qaynaq edir?",
        "Biz enerji, tikinti materialları, tekstil, qida, səhiyyə, müdafiə, elektrik və elektronika, maşınqayırma, mebel, avtomobil, qablaşdırma, kənd təsərrüfatı və digər məhsul qrupları üzrə satınalma variantlarını araşdırırıq."
      ],
      [
        "import və ya export prosesi necə başlayır?",
        "Məhsulu, texniki xüsusiyyətləri, miqdarı, təyinat yeri və çatdırılma gözləntilərini aydınlaşdırırıq, sonra təchizatçıları, kotirovkaları və əməliyyat addımlarını planlaşdırırıq."
      ],
      [
        "Kotirovka üçün hansı məlumat lazımdır?",
        "İlkin araşdırmaya başlamaq üçün məhsulun adı və ya spesifikasiyası, təxmin edilən miqdar, çatdırılma ölkəsi və ya şəhəri və hədəf vaxtı kifayətdir."
      ],
      [
        "Yerli və beynəlxalq təchizatçılarla işləyirsinizmi?",
        "Bəli. Sektor, keyfiyyət standartları, büdcə və çatdırılma tələblərinə uyğun olaraq yerli və beynəlxalq satınalma variantlarını müqayisə edirik."
      ]
    ]
  },
  "pl": {
    "title": "Często zadawane pytania dotyczące globalnego handlu i zaopatrzenia",
    "intro": "Jasne odpowiedzi na temat badań produktów, import, export i działań następczych.",
    "items": [
      [
        "Dla jakich sektorów zaopatruje się Dynamic Era Export?",
        "Badamy możliwości pozyskiwania energii, materiałów budowlanych, tekstyliów, żywności, zdrowia, obronności, elektryki i elektroniki, maszyn, mebli, motoryzacji, opakowań, rolnictwa i innych grup produktów."
      ],
      [
        "Jak rozpoczyna się proces import lub export?",
        "Wyjaśniamy produkt, specyfikacje techniczne, ilość, miejsce docelowe i oczekiwania dotyczące dostawy, a następnie planujemy dostawców, oferty i kroki operacyjne."
      ],
      [
        "Jakie informacje są potrzebne do wyceny?",
        "Nazwa lub specyfikacja produktu, szacowana ilość, kraj lub miasto dostawy oraz docelowy termin wystarczą, aby rozpocząć wstępne badania."
      ],
      [
        "Czy współpracujesz z lokalnymi i międzynarodowymi dostawcami?",
        "Tak. Porównujemy lokalne i międzynarodowe opcje zaopatrzenia według sektora, standardów jakości, budżetu i wymagań dotyczących dostawy."
      ]
    ]
  },
  "el": {
    "title": "Συχνές ερωτήσεις σχετικά με το παγκόσμιο εμπόριο και την προμήθεια",
    "intro": "Σαφείς απαντήσεις σχετικά με την έρευνα προϊόντων, το import, το export και τη λειτουργική παρακολούθηση.",
    "items": [
      [
        "Για ποιους τομείς προέρχεται το Dynamic Era Export;",
        "Ερευνούμε επιλογές προμήθειας σε ενέργεια, δομικά υλικά, κλωστοϋφαντουργικά προϊόντα, τρόφιμα, υγεία, άμυνα, ηλεκτρικά και ηλεκτρονικά είδη, μηχανήματα, έπιπλα, αυτοκίνητα, συσκευασία, γεωργία και άλλες ομάδες προϊόντων."
      ],
      [
        "Πώς ξεκινά η διαδικασία import ή export;",
        "Διευκρινίζουμε το προϊόν, τις τεχνικές προδιαγραφές, την ποσότητα, τον προορισμό και τις προσδοκίες παράδοσης και, στη συνέχεια, σχεδιάζουμε προμηθευτές, προσφορές και λειτουργικά βήματα."
      ],
      [
        "Ποιες πληροφορίες χρειάζονται για μια προσφορά;",
        "Ένα όνομα προϊόντος ή μια προδιαγραφή, η εκτιμώμενη ποσότητα, η χώρα ή η πόλη παράδοσης και ο χρόνος στόχος είναι αρκετά για να ξεκινήσει η αρχική έρευνα."
      ],
      [
        "Συνεργάζεστε με τοπικούς και διεθνείς προμηθευτές;",
        "Ναί. Συγκρίνουμε τοπικές και διεθνείς επιλογές προμήθειας σύμφωνα με τον τομέα, τα πρότυπα ποιότητας, τον προϋπολογισμό και τις απαιτήσεις παράδοσης."
      ]
    ]
  }
};

Object.assign(seoFaqContent, additionalSeoFaqContent);


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

function mergeLanguageCopy(base, override) {
  const result = { ...base };
  Object.entries(override).forEach(([key, value]) => {
    const baseValue = base[key];
    result[key] =
      value && typeof value === "object" && !Array.isArray(value) && baseValue && typeof baseValue === "object" && !Array.isArray(baseValue)
        ? mergeLanguageCopy(baseValue, value)
        : value;
  });
  return result;
}

const additionalLanguageCopy = {
  it: {
    nav: ["Home", "Settori", "Chi siamo", "Contatto"],
    whatsapp: "Contatto diretto via WhatsApp",
    direct: "Contatta via WhatsApp",
    categoriesCta: "Vedi tutti i settori",
    homeTitle: "Il vostro partner affidabile\nnel commercio globale",
    homeText: "Dall'energia ai materiali da costruzione, dal tessile al food, dalla sanità alla difesa, creiamo valore con il prodotto giusto, il fornitore giusto e il modello commerciale giusto.\n\nCon oltre 20 anni di esperienza, 1500+ clienti e una rete di fornitura in più di 20 settori, siamo una forza dinamica nel commercio globale.",
    heroStats: [["20+", "Anni di esperienza"], ["1500+", "Clienti"], ["20+", "Settori principali"]],
    servicesKicker: "I nostri servizi",
    categoryPageTitle: "Settori / Aree di attività",
    categoryPageLead: "In tutte le aree sviluppiamo soluzioni di prodotto e sourcing secondo la domanda del cliente.",
    allSectorsTitle: "Tutti i settori",
    categoryCustomCtaButton: "Contatta via WhatsApp",
    aboutTitle: "Chi siamo",
    contactTitle: "Contatto",
    contactLead: "Qualunque sia il prodotto, il paese o la categoria che cercate, possiamo iniziare con un breve messaggio.",
    form: { name: "Nome e cognome", company: "Azienda", message: "Che cosa state cercando?", send: "Invia email", sending: "Invio...", successTitle: "Messaggio inviato con successo", successText: "Grazie. Vi risponderemo il prima possibile.", errorTitle: "Il messaggio non è stato inviato", errorText: "Riprova a breve o contattaci via WhatsApp.", close: "Chiudi" },
  },
  pt: {
    nav: ["Início", "Setores", "Sobre nós", "Contato"],
    whatsapp: "Contato direto via WhatsApp",
    direct: "Contato via WhatsApp",
    categoriesCta: "Ver todos os setores",
    homeTitle: "Seu parceiro confiável\nno comércio global",
    homeText: "Da energia aos materiais de construção, do têxtil aos alimentos, da saúde à defesa, criamos valor com o produto certo, o fornecedor certo e o modelo comercial certo.\n\nCom mais de 20 anos de experiência, 1500+ clientes e rede de fornecimento em mais de 20 setores, somos a força dinâmica do comércio global.",
    heroStats: [["20+", "Anos de experiência"], ["1500+", "Clientes"], ["20+", "Setores principais"]],
    servicesKicker: "Nossos serviços",
    categoryPageTitle: "Setores / Áreas de negócio",
    categoryPageLead: "Em todas as áreas desenvolvemos soluções de produto e sourcing conforme a demanda do cliente.",
    allSectorsTitle: "Todos os setores",
    categoryCustomCtaButton: "Contato via WhatsApp",
    aboutTitle: "Sobre nós",
    contactTitle: "Contato",
    contactLead: "Qualquer que seja o produto, país ou categoria, podemos começar com uma mensagem curta.",
    form: { name: "Nome completo", company: "Empresa", message: "O que você procura?", send: "Enviar email", sending: "Enviando...", successTitle: "Mensagem enviada com sucesso", successText: "Obrigado. Retornaremos o mais breve possível.", errorTitle: "Mensagem não enviada", errorText: "Tente novamente em breve ou fale via WhatsApp.", close: "Fechar" },
  },
  zh: {
    nav: ["首页", "行业", "关于我们", "联系"],
    whatsapp: "WhatsApp 直接联系",
    direct: "通过 WhatsApp 联系",
    categoriesCta: "查看全部行业",
    homeTitle: "全球贸易中\n值得信赖的解决方案伙伴",
    homeText: "从能源到建筑材料、从纺织到食品、从医疗到国防，我们通过正确的产品、供应商和贸易模式为客户创造价值。\n\n凭借20年以上商业经验、1500+客户以及覆盖20+行业的供应网络，我们是全球贸易的动态力量。",
    heroStats: [["20+", "年经验"], ["1500+", "客户"], ["20+", "主要行业"]],
    servicesKicker: "我们的服务",
    categoryPageTitle: "行业 / 业务领域",
    categoryPageLead: "我们在所有业务领域根据客户需求开发产品和采购解决方案。",
    allSectorsTitle: "全部行业",
    categoryCustomCtaButton: "通过 WhatsApp 联系",
    aboutTitle: "关于我们",
    contactTitle: "联系",
    contactLead: "无论您寻找产品、目标国家还是类别，都可以从一条简短消息开始。",
    form: { name: "姓名", company: "公司", message: "您在寻找什么？", send: "发送邮件", sending: "发送中...", successTitle: "消息已成功发送", successText: "谢谢。我们会尽快回复。", errorTitle: "消息未发送", errorText: "请稍后重试或通过 WhatsApp 联系。", close: "关闭" },
  },
  fa: {
    nav: ["خانه", "بخش‌ها", "درباره ما", "تماس"],
    whatsapp: "ارتباط مستقیم واتساپ",
    direct: "تماس از طریق واتساپ",
    categoriesCta: "مشاهده همه بخش‌ها",
    homeTitle: "شریک مطمئن شما\nدر تجارت جهانی",
    homeText: "از انرژی تا مصالح ساختمانی، از نساجی تا غذا، از سلامت تا صنایع دفاعی، با محصول درست، تامین‌کننده درست و مدل تجاری درست برای مشتریان ارزش ایجاد می‌کنیم.\n\nبا بیش از 20 سال تجربه، 1500+ مشتری و شبکه تامین در بیش از 20 بخش، نیروی پویا در تجارت جهانی هستیم.",
    heroStats: [["20+", "سال تجربه"], ["1500+", "مشتری"], ["20+", "بخش اصلی"]],
    servicesKicker: "خدمات ما",
    categoryPageTitle: "بخش‌ها / حوزه‌های فعالیت",
    categoryPageLead: "در همه حوزه‌ها راهکارهای محصول و تامین را براساس نیاز مشتری توسعه می‌دهیم.",
    allSectorsTitle: "همه بخش‌ها",
    categoryCustomCtaButton: "تماس از طریق واتساپ",
    aboutTitle: "درباره ما",
    contactTitle: "تماس",
    contactLead: "هر محصول، کشور هدف یا دسته‌ای که جستجو می‌کنید، می‌توانیم با یک پیام کوتاه شروع کنیم.",
    form: { name: "نام کامل", company: "شرکت", message: "به دنبال چه چیزی هستید؟", send: "ارسال ایمیل", sending: "در حال ارسال...", successTitle: "پیام شما با موفقیت ارسال شد", successText: "سپاسگزاریم. در کوتاه‌ترین زمان پاسخ می‌دهیم.", errorTitle: "پیام ارسال نشد", errorText: "لطفا بعدا تلاش کنید یا از واتساپ تماس بگیرید.", close: "بستن" },
  },
  uk: { nav: ["Головна", "Сектори", "Про нас", "Контакти"], whatsapp: "Прямий контакт у WhatsApp", direct: "Зв'язатися через WhatsApp", categoriesCta: "Переглянути всі сектори", homeTitle: "Ваш надійний партнер\nу глобальній торгівлі", heroStats: [["20+", "Років досвіду"], ["1500+", "Клієнтів"], ["20+", "Основних секторів"]], servicesKicker: "Наші послуги", categoryPageTitle: "Сектори / напрями діяльності", allSectorsTitle: "Усі сектори", aboutTitle: "Про нас", contactTitle: "Контакти", categoryCustomCtaButton: "Зв'язатися через WhatsApp", form: { name: "Повне ім'я", company: "Компанія", message: "Що ви шукаєте?", send: "Надіслати email", sending: "Надсилання...", close: "Закрити" } },
  ro: { nav: ["Acasă", "Sectoare", "Despre noi", "Contact"], whatsapp: "Contact direct pe WhatsApp", direct: "Contact prin WhatsApp", categoriesCta: "Vezi toate sectoarele", homeTitle: "Partenerul tău de încredere\nîn comerțul global", heroStats: [["20+", "Ani experiență"], ["1500+", "Clienți"], ["20+", "Sectoare principale"]], servicesKicker: "Serviciile noastre", categoryPageTitle: "Sectoare / Domenii de activitate", allSectorsTitle: "Toate sectoarele", aboutTitle: "Despre noi", contactTitle: "Contact", categoryCustomCtaButton: "Contact prin WhatsApp", form: { name: "Nume complet", company: "Companie", message: "Ce cauți?", send: "Trimite email", sending: "Se trimite...", close: "Închide" } },
  bg: { nav: ["Начало", "Сектори", "За нас", "Контакт"], whatsapp: "Директен контакт в WhatsApp", direct: "Контакт чрез WhatsApp", categoriesCta: "Виж всички сектори", homeTitle: "Вашият надежден партньор\nв глобалната търговия", heroStats: [["20+", "Години опит"], ["1500+", "Клиенти"], ["20+", "Основни сектора"]], servicesKicker: "Нашите услуги", categoryPageTitle: "Сектори / бизнес области", allSectorsTitle: "Всички сектори", aboutTitle: "За нас", contactTitle: "Контакт", categoryCustomCtaButton: "Контакт чрез WhatsApp", form: { name: "Име и фамилия", company: "Компания", message: "Какво търсите?", send: "Изпрати email", sending: "Изпращане...", close: "Затвори" } },
  az: { nav: ["Ana səhifə", "Sektorlar", "Haqqımızda", "Əlaqə"], whatsapp: "WhatsApp ilə birbaşa əlaqə", direct: "WhatsApp ilə əlaqə", categoriesCta: "Bütün sektorları gör", homeTitle: "Qlobal ticarətdə\netibarlı həll ortağınız", heroStats: [["20+", "İl təcrübə"], ["1500+", "Müştəri"], ["20+", "Əsas sektor"]], servicesKicker: "Xidmətlərimiz", categoryPageTitle: "Sektorlar / fəaliyyət sahələri", allSectorsTitle: "Bütün sektorlar", aboutTitle: "Haqqımızda", contactTitle: "Əlaqə", categoryCustomCtaButton: "WhatsApp ilə əlaqə", form: { name: "Ad Soyad", company: "Şirkət", message: "Nə axtarırsınız?", send: "Email göndər", sending: "Göndərilir...", close: "Bağla" } },
  pl: { nav: ["Strona główna", "Sektory", "O nas", "Kontakt"], whatsapp: "Bezpośredni kontakt WhatsApp", direct: "Kontakt przez WhatsApp", categoriesCta: "Zobacz wszystkie sektory", homeTitle: "Twój zaufany partner\nw globalnym handlu", heroStats: [["20+", "Lat doświadczenia"], ["1500+", "Klientów"], ["20+", "Głównych sektorów"]], servicesKicker: "Nasze usługi", categoryPageTitle: "Sektory / obszary działalności", allSectorsTitle: "Wszystkie sektory", aboutTitle: "O nas", contactTitle: "Kontakt", categoryCustomCtaButton: "Kontakt przez WhatsApp", form: { name: "Imię i nazwisko", company: "Firma", message: "Czego szukasz?", send: "Wyślij email", sending: "Wysyłanie...", close: "Zamknij" } },
  el: { nav: ["Αρχική", "Κλάδοι", "Σχετικά", "Επικοινωνία"], whatsapp: "Άμεση επαφή μέσω WhatsApp", direct: "Επικοινωνία μέσω WhatsApp", categoriesCta: "Δείτε όλους τους κλάδους", homeTitle: "Ο αξιόπιστος συνεργάτης σας\nστο παγκόσμιο εμπόριο", heroStats: [["20+", "Χρόνια εμπειρίας"], ["1500+", "Πελάτες"], ["20+", "Κύριοι κλάδοι"]], servicesKicker: "Οι υπηρεσίες μας", categoryPageTitle: "Κλάδοι / επιχειρηματικοί τομείς", allSectorsTitle: "Όλοι οι κλάδοι", aboutTitle: "Σχετικά με εμάς", contactTitle: "Επικοινωνία", categoryCustomCtaButton: "Επικοινωνία μέσω WhatsApp", form: { name: "Ονοματεπώνυμο", company: "Εταιρεία", message: "Τι αναζητάτε;", send: "Αποστολή email", sending: "Αποστολή...", close: "Κλείσιμο" } },
};

Object.entries(additionalLanguageCopy).forEach(([code, localizedCopy]) => {
  copy[code] = mergeLanguageCopy(copy.en, localizedCopy);
});

const languageCompletionCopy = {
  it: {
    nav: ["Home", "Settori", "Chi siamo", "Contatto"],
    quoteCta: "Richiedi un'offerta",
    homeBadge: "Commercio globale, soluzioni dinamiche",
    quoteTitle: "Siamo con voi in ogni fase del commercio",
    quoteText: "Dalla ricerca prodotto e sourcing alla quotazione e pianificazione logistica, offriamo supporto completo.",
    trustTitle: "Siamo con voi in ogni fase del commercio",
    trustText: "Offriamo supporto completo nei processi di importazione ed esportazione, dalla ricerca alla logistica.",
    servicesLead: "Riuniamo sotto lo stesso tetto l'infrastruttura commerciale, la rete di fornitura e il supporto operativo di cui le aziende hanno bisogno.",
    services: [
      ["Sourcing di prodotti", "Ricerchiamo prodotti nella nostra rete locale e internazionale e vi colleghiamo con fornitori adatti."],
      ["Processi di importazione", "Supportiamo sourcing, documentazione e coordinamento logistico per prodotti provenienti dall'estero."],
      ["Soluzioni di esportazione", "Creiamo soluzioni di prodotto, mercato e operazione per aziende che esportano verso mercati diversi."],
      ["Ricerca fornitori", "Proponiamo fornitori adatti in base a qualità, capacità, prezzo e condizioni di consegna."],
      ["Offerte e prezzi", "Prepariamo opzioni di quotazione competitive e comparabili per i gruppi di prodotto richiesti."],
      ["Logistica e follow-up operativo", "Forniamo supporto regolare durante consegna, spedizione e follow-up operativo."],
    ],
    processTitle: "Analizziamo la domanda, troviamo la fonte giusta e seguiamo l'operazione.",
    processLead: "Ogni settore ha aspettative diverse su qualità, consegna, costo e conformità; per questo costruiamo un modello commerciale su misura.",
    processSteps: [
      ["01", "Analisi della domanda", "Gruppo prodotto, mercato target, quantità, qualità attesa e piano di consegna vengono chiariti."],
      ["02", "Fonte di fornitura", "Ricerchiamo fornitori adatti e confrontiamo prezzi e opzioni operative."],
      ["03", "Operazione commerciale", "Offerta, documenti, logistica e consegna vengono seguiti con comunicazione trasparente."],
    ],
    ctaTitle: "Rafforziamo insieme il vostro processo commerciale.",
    ctaText: "Contattateci per il prodotto, il fornitore o la soluzione import-export di cui avete bisogno.",
    hero: [
      { eyebrow: "Commercio globale, soluzioni dinamiche", title: "Una forza commerciale dinamica aperta al mondo.", text: "Dynamic Era Export porta prodotti di diversi settori sui mercati internazionali con soluzioni affidabili, rapide e professionali." },
      { eyebrow: "Ampia rete di settori e prodotti", title: "Soluzioni versatili dall'energia al food, dal tessile alla salute.", text: "Gestiamo ricerca prodotto, sourcing, pricing e processi operativi secondo la domanda del cliente." },
      { eyebrow: "Oltre 20 anni di esperienza commerciale", title: "Accelerate il processo con la forza dinamica del commercio globale.", text: "Con 1500+ clienti e una vasta rete settoriale, offriamo soluzioni rapide, flessibili e sostenibili." },
    ],
    metrics: [["20+", "anni di servizio"], ["1500+", "clienti"], ["20", "aree di attività"], ["360°", "supporto commerciale"]],
    categoryTitle: "Aree di attività in evidenza",
    categoryLead: "Dynamic Era Export dispone di una rete commerciale ampia nei gruppi di prodotti e materiali richiesti da diversi settori.",
    categories: {
      energy: ["Energia", "Attrezzature, prodotti infrastrutturali, materiali elettrici e supporti per energia rinnovabile."],
      construction: ["Materiali da costruzione", "Materiali edili, prodotti infrastrutturali, attrezzature meccaniche e necessità di progetto."],
      textile: ["Tessile", "Tessuti, abbigliamento, abiti da lavoro, tessili tecnici e diversi gruppi tessili."],
      food: ["Food", "Prodotti alimentari di base, confezionati, agricoli e soluzioni commerciali affidabili."],
      health: ["Salute", "Prodotti medicali, consumabili, apparecchiature sanitarie e soluzioni settoriali."],
      defense: ["Industria della difesa", "Processi professionali con conformità, riservatezza e disciplina operativa."],
    },
    categoryDetails: {
      energy: { title: "Energia", text: "Offriamo soluzioni di sourcing per attrezzature, infrastrutture, materiali elettrici e prodotti di supporto all'energia rinnovabile.", points: ["Attrezzature energetiche", "Materiali elettrici", "Sourcing su progetto"] },
      construction: { title: "Materiali da costruzione", text: "Forniamo sourcing per materiali edili, infrastrutture, attrezzature meccaniche e prodotti complementari.", points: ["Prodotti edili e infrastrutturali", "Attrezzature meccaniche", "Necessità di progetto"] },
      textile: { title: "Tessile", text: "Sviluppiamo soluzioni di commercio locale e internazionale per tessuti, abbigliamento, abiti da lavoro e tessili tecnici.", points: ["Tessuti e abbigliamento", "Abiti da lavoro", "Tessili tecnici"] },
      food: { title: "Food", text: "Sviluppiamo soluzioni affidabili per alimenti di base, prodotti confezionati, agricoli e diverse categorie food.", points: ["Alimenti di base", "Prodotti confezionati", "Prodotti agricoli"] },
      health: { title: "Salute", text: "Offriamo sourcing per prodotti medicali, consumabili, apparecchiature sanitarie e bisogni specifici del settore.", points: ["Prodotti medicali", "Consumabili", "Apparecchiature sanitarie"] },
      defense: { title: "Industria della difesa", text: "Gestiamo processi di fornitura con conformità, riservatezza e disciplina operativa.", points: ["Conformità", "Riservatezza e disciplina", "Fornitura settoriale"] },
    },
    categoryScrollHint: "Scorri l'elenco per vedere tutti i settori.",
    categoryCustomCtaTitle: "Contattateci per gruppi di prodotto non presenti nell'elenco.",
    categoryCustomCtaText: "Se non trovate il gruppo di prodotto necessario, contattateci. Dynamic Era Export può ricercare opzioni di sourcing adatte alle vostre richieste speciali.",
    allSectorsLead: "Dynamic Era Export offre soluzioni commerciali complete per esigenze di prodotto e sourcing in diversi settori.",
    allSectors: [
      ["Energia", "Attrezzature, infrastrutture, materiali elettrici e prodotti per energia rinnovabile."],
      ["Materiali da costruzione", "Materiali edili, infrastrutture, attrezzature meccaniche e bisogni di progetto."],
      ["Tessile", "Tessuti, abbigliamento, abiti da lavoro, tessili tecnici e gruppi tessili."],
      ["Food", "Alimenti di base, confezionati, prodotti agricoli e soluzioni affidabili."],
      ["Salute", "Prodotti medicali, consumabili, apparecchiature sanitarie e sourcing settoriale."],
      ["Industria della difesa", "Processi professionali con conformità, riservatezza e disciplina operativa."],
      ["Elettrico ed elettronica", "Materiali elettrici, prodotti elettronici, connessione e illuminazione."],
      ["Macchinari e attrezzature", "Macchinari industriali, attrezzature produttive, ricambi e bisogni tecnici."],
      ["Arredamento", "Opzioni di sourcing per casa, ufficio, spazi commerciali e progetti."],
      ["Automotive", "Ricambi, attrezzature, accessori e gruppi prodotto del settore automotive."],
      ["Plastica e gomma", "Prodotti plastici, materiali in gomma, parti tecniche e gruppi industriali."],
      ["Imballaggio", "Prodotti e soluzioni di packaging per food, tessile, industria e retail."],
      ["Cosmetica", "Cosmetici, cura personale, igiene e gruppi prodotto correlati."],
      ["Prodotti per la pulizia", "Prodotti industriali per pulizia, materiali igienici e consumabili aziendali."],
      ["Prodotti agricoli", "Prodotti agricoli, materie prime alimentari e soluzioni per l'agricoltura."],
      ["Prodotti medicali", "Supporto sourcing per istituzioni sanitarie e forniture medicali."],
      ["Materie prime", "Gruppi di materie prime necessari nei processi produttivi."],
      ["Prodotti edili", "Gruppi complementari per costruzione, decorazione e progetti edilizi."],
      ["Commercio con supporto logistico", "Coordinamento per spedizione, consegna e follow-up operativo."],
      ["Soluzioni generali di sourcing", "Ricerca e sourcing per richieste speciali oltre una singola categoria."],
    ],
    homeAboutTitle: "Trasformiamo le esigenze di sourcing nel modello commerciale giusto.",
    homeAboutText: "In energia, tessile, food, salute e molti altri settori gestiamo ricerca prodotto, confronto fornitori, offerte e follow-up operativo da un unico punto.",
    homeAboutValues: ["Sourcing specifico per la domanda", "Rete prodotti per settore", "Follow-up operativo trasparente"],
    homeAboutButton: "Scopri il nostro modello operativo",
    aboutText: "Il successo nel commercio globale dipende dal raggiungere il prodotto giusto, al momento giusto e alle condizioni giuste. Analizziamo le esigenze dei clienti e gestiamo il processo commerciale in modo affidabile.",
    aboutSupport: "In Dynamic Era Export andiamo oltre la ricerca del prodotto e gestiamo ogni fase del commercio con fiducia, trasparenza e velocità.",
    aboutFlowTitle: "Commercio basato su fiducia, velocità e trasparenza",
    aboutFlowText1: "Dal primo giorno il nostro obiettivo è collegare i clienti alle fonti corrette, gestire import ed export in modo affidabile e creare valore in ogni fase.",
    aboutFlowText2: "Nel commercio globale le aziende cercano fornitore affidabile, prezzo corretto, relazioni sostenibili, follow-up operativo e comunicazione rapida.",
    aboutPillars: [["La nostra visione", "Diventare un marchio commerciale forte, noto per affidabilità, velocità e soluzioni sostenibili."], ["La nostra missione", "Analizzare correttamente le esigenze di import, export e sourcing e offrire soluzioni commerciali adatte."], ["Il nostro approccio", "Consideriamo ogni collaborazione una relazione commerciale di lungo periodo e ci concentriamo anche sui bisogni futuri."]],
    aboutOperationsEyebrow: "Cosa facciamo",
    aboutOperationsTitle: "Offriamo supporto end-to-end nei processi di import, export e sourcing.",
    aboutOperations: [["01", "Supporto import-export", "Forniamo supporto commerciale nei processi di importazione ed esportazione."], ["02", "Ricerca prodotti e fornitori", "Ricerchiamo prodotti e fornitori per diversi settori."], ["03", "Gruppi prodotto su richiesta", "Identifichiamo gruppi di prodotto adatti alla domanda del cliente."], ["04", "Connessioni con fornitori", "Creiamo collegamenti con fornitori locali e internazionali."], ["05", "Offerte e operazioni", "Gestiamo quotazioni, prezzi e processi operativi."], ["06", "Sourcing sostenibile", "Offriamo soluzioni sostenibili in ampie categorie di prodotto."]],
    aboutValuesEyebrow: "I nostri valori",
    aboutValuesTitle: "Crediamo che fiducia, velocità, flessibilità e prospettiva globale siano la base del commercio.",
    aboutValues: [["Affidabilità", "Adottiamo un approccio trasparente, responsabile e sostenibile."], ["Velocità", "Rispondiamo rapidamente e seguiamo il flusso operativo da vicino."], ["Flessibilità", "Creiamo soluzioni specifiche per progetto, prodotto e domanda."], ["Prospettiva globale", "Valutiamo mercati, gruppi prodotto e fonti diverse per offrire più opzioni."]],
    aboutCtaEyebrow: "Lavorare con Dynamic Era Export",
    aboutCtaTitle: "Rendiamo il vostro processo commerciale più sicuro, rapido ed efficiente.",
    aboutCtaText: "Che cerchiate un gruppo prodotto specifico o supporto professionale per import-export, il nostro team è pronto a costruire la soluzione giusta.",
    aboutCtaPrimary: "Contatta via WhatsApp",
    aboutCtaEmail: "Contatta via email",
    aboutCtaSecondary: "Pagina contatti",
    values: ["Ampia rete prodotti e settori", "Processo commerciale affidabile", "Soluzioni rapide e flessibili", "Esperienza nel commercio internazionale"],
    form: { email: "Email", configTitle: "Servizio modulo non configurato", configText: "Serve una chiave Web3Forms per inviare messaggi. Nel frattempo potete contattarci via WhatsApp.", rateTitle: "Attendere un momento", rateText: "Per protezione spam potete inviare un solo messaggio al minuto." },
    partnersTitle: "Ecosistema del commercio globale",
    importantLinksTitle: "Link importanti",
    footerWhatsappTitle: "Raggiungici su WhatsApp",
    footerWhatsappText: "Contattaci direttamente per prodotto, settore o richiesta di sourcing.",
    footer: "Comunicazione chiara nelle operazioni di import, export e sourcing globale.",
    copyright: "© Copyright 2026 Dynamic Era Export. Tutti i diritti riservati.",
  },
};

Object.entries(languageCompletionCopy).forEach(([code, localizedCopy]) => {
  copy[code] = mergeLanguageCopy(copy[code] || copy.en, localizedCopy);
});

const compactLanguageCompletionSeeds = {
  pt: {
    quoteCta: "Solicitar proposta",
    homeBadge: "Comércio global, soluções dinâmicas",
    homeText: "Da energia aos materiais de construção, do têxtil aos alimentos, da saúde à defesa, criamos valor com o produto certo, o fornecedor certo e o modelo comercial certo.\n\nCom mais de 20 anos de experiência, 1500+ clientes e uma forte rede de fornecimento em mais de 20 setores, somos a força dinâmica do comércio global.",
    quoteTitle: "Estamos com você em todas as etapas do comércio",
    quoteText: "Da pesquisa de produto e sourcing à precificação e logística, oferecemos suporte completo.",
    trustTitle: "Estamos com você em todas as etapas do comércio",
    trustText: "Oferecemos suporte completo nos processos de importação e exportação.",
    servicesLead: "Reunimos infraestrutura comercial, rede de fornecimento e suporte operacional em um único ponto.",
    services: [["Sourcing de produtos", "Pesquisamos produtos em nossa rede local e internacional e conectamos você a fornecedores adequados."], ["Processos de importação", "Apoiamos sourcing, documentação e coordenação logística para produtos do exterior."], ["Soluções de exportação", "Criamos soluções de produto, mercado e operação para empresas que exportam."], ["Pesquisa de fornecedores", "Oferecemos opções conforme qualidade, capacidade, preço e prazo."], ["Cotação e preços", "Preparamos cotações competitivas e comparáveis."], ["Logística e acompanhamento", "Acompanhamos entrega, embarque e processos operacionais."]],
    processTitle: "Analisamos a demanda, encontramos a fonte certa e acompanhamos a operação.",
    processLead: "Cada setor tem expectativas diferentes; por isso criamos um modelo comercial específico para a demanda.",
    processSteps: [["01", "Análise da demanda", "Produto, mercado, quantidade, qualidade e entrega são esclarecidos."], ["02", "Fonte de fornecimento", "Fornecedores adequados são pesquisados e comparados."], ["03", "Operação comercial", "Cotação, documentos, logística e entrega são acompanhados com comunicação transparente."]],
    ctaTitle: "Vamos fortalecer seu processo comercial juntos.",
    ctaText: "Entre em contato para o produto, fornecedor ou solução de importação e exportação de que precisa.",
    hero: [["Comércio global, soluções dinâmicas", "Uma força comercial dinâmica aberta ao mundo.", "Levamos produtos de diferentes setores aos mercados internacionais com soluções confiáveis."], ["Ampla rede de setores e produtos", "Soluções versáteis da energia aos alimentos, do têxtil à saúde.", "Gerenciamos pesquisa, sourcing, preço e operação conforme a demanda."], ["Mais de 20 anos de experiência", "Acelere seu processo com a força dinâmica do comércio global.", "Com 1500+ clientes, oferecemos soluções rápidas, flexíveis e sustentáveis."]],
    metrics: [["20+", "anos de serviço"], ["1500+", "clientes"], ["20", "áreas de atuação"], ["360°", "suporte comercial"]],
    categoryTitle: "Áreas de atuação em destaque",
    categoryLead: "Dynamic Era Export possui uma ampla rede comercial em grupos de produtos e materiais exigidos por diferentes setores.",
    categoryPageTitle: "Setores / Áreas de atuação",
    categoryPageLead: "Em todas as nossas áreas, desenvolvemos soluções de produto e sourcing de acordo com a demanda do cliente.",
    allSectorsTitle: "Todos os setores",
    allSectorsLead: "Oferecemos soluções comerciais completas para necessidades de produto e sourcing em diferentes setores.",
    categoryScrollHint: "Role a lista para ver todos os setores.",
    categoryCustomCtaTitle: "Fale conosco para grupos de produtos não listados aqui.",
    categoryCustomCtaText: "Se você não encontrar o grupo de produto necessário, podemos pesquisar opções adequadas para sua demanda especial.",
    categoryCustomCtaButton: "Contato via WhatsApp",
    categories: [["Energia", "Equipamentos, infraestrutura, materiais elétricos e produtos de apoio a energia renovável."], ["Materiais de construção", "Materiais de construção, infraestrutura, equipamentos mecânicos e necessidades de projeto."], ["Têxtil", "Tecidos, vestuário, uniformes, têxteis técnicos e grupos relacionados."], ["Alimentos", "Alimentos básicos, embalados, produtos agrícolas e soluções confiáveis."], ["Saúde", "Produtos médicos, consumíveis, equipamentos de saúde e soluções setoriais."], ["Indústria de defesa", "Processos profissionais com conformidade, confidencialidade e disciplina operacional."]],
    allSectorNames: ["Energia", "Materiais de construção", "Têxtil", "Alimentos", "Saúde", "Indústria de defesa", "Elétrica e eletrônica", "Máquinas e equipamentos", "Móveis", "Automotivo", "Plástico e borracha", "Embalagem", "Cosméticos", "Produtos de limpeza", "Produtos agrícolas", "Produtos médicos", "Matérias-primas", "Produtos de construção", "Comércio com apoio logístico", "Soluções gerais de sourcing"],
    allSectorText: "Pesquisa de produtos, fornecedores e operação comercial para necessidades específicas deste setor.",
    homeAboutTitle: "Transformamos necessidades de sourcing no modelo comercial certo.",
    homeAboutText: "Em energia, têxtil, alimentos, saúde e muitos outros setores, gerenciamos pesquisa de produto, comparação de fornecedores, cotação e acompanhamento operacional em um só lugar.",
    homeAboutValues: ["Sourcing específico por demanda", "Rede de produtos por setor", "Acompanhamento operacional transparente"],
    homeAboutButton: "Conheça nosso modelo de trabalho",
    aboutText: "O sucesso no comércio global depende de alcançar o produto certo, no momento certo e nas condições certas. Analisamos as necessidades dos clientes e gerenciamos o processo comercial com confiança.",
    aboutSupport: "Na Dynamic Era Export, vamos além de encontrar produtos e gerenciamos cada etapa com confiança, transparência e velocidade.",
    aboutFlowTitle: "Comércio baseado em confiança, velocidade e transparência",
    aboutFlowText1: "Desde o primeiro dia, nosso objetivo é conectar clientes às fontes certas e gerar valor em cada etapa do comércio.",
    aboutFlowText2: "Empresas esperam fornecedor confiável, preço correto, relações sustentáveis, acompanhamento operacional e comunicação rápida.",
    pillars: [["Nossa visão", "Ser uma marca forte de comércio global conhecida por confiança, velocidade e soluções sustentáveis."], ["Nossa missão", "Analisar corretamente necessidades de importação, exportação e sourcing e oferecer as soluções mais adequadas."], ["Nossa abordagem", "Vemos cada colaboração como uma relação comercial de longo prazo."]],
    operations: [["01", "Suporte importação-exportação", "Oferecemos suporte comercial em processos de importação e exportação."], ["02", "Pesquisa de produtos e fornecedores", "Pesquisamos produtos e fornecedores para diferentes setores."], ["03", "Grupos de produtos por demanda", "Identificamos grupos de produtos adequados à demanda."], ["04", "Conexões com fornecedores", "Conectamos fornecedores locais e internacionais."], ["05", "Cotações e operações", "Gerenciamos cotações, preços e processos operacionais."], ["06", "Sourcing sustentável", "Oferecemos soluções sustentáveis em amplas categorias."]],
    valuesList: [["Confiabilidade", "Adotamos uma abordagem transparente, responsável e sustentável."], ["Velocidade", "Respondemos rapidamente e acompanhamos o fluxo operacional."], ["Flexibilidade", "Criamos soluções específicas para projeto, produto e demanda."], ["Visão global", "Avaliamos mercados, grupos de produtos e fontes diversas."]],
    whatWeDo: "O que fazemos",
    ourValues: "Nossos valores",
    aboutCtaEyebrow: "Trabalhar com Dynamic Era Export",
    aboutCtaTitle: "Vamos tornar seu processo comercial mais seguro, rápido e eficiente.",
    aboutCtaText: "Se você procura um produto específico ou suporte profissional, nossa equipe está pronta para criar a solução certa.",
    aboutCtaPrimary: "Contato via WhatsApp",
    aboutCtaEmail: "Contato por email",
    aboutCtaSecondary: "Página de contato",
    values: ["Ampla rede de produtos e setores", "Processo comercial confiável", "Soluções rápidas e flexíveis", "Experiência em comércio internacional"],
    contactTitle: "Contato",
    contactLead: "Qualquer que seja o produto, país de destino ou categoria, podemos começar com uma mensagem curta.",
    form: { name: "Nome completo", company: "Empresa", email: "Email", message: "O que você procura?", send: "Enviar email", sending: "Enviando...", configTitle: "Serviço de formulário não configurado", configText: "É necessária uma chave Web3Forms para enviar mensagens. Enquanto isso, fale conosco via WhatsApp.", successTitle: "Mensagem enviada com sucesso", successText: "Obrigado. Retornaremos o quanto antes.", errorTitle: "A mensagem não pôde ser enviada", errorText: "Tente novamente em breve ou fale conosco via WhatsApp.", rateTitle: "Aguarde um momento", rateText: "Para proteção contra spam, é possível enviar apenas uma mensagem por minuto.", close: "Fechar" },
    partnersTitle: "Ecossistema de comércio global",
    importantLinksTitle: "Links importantes",
    footerWhatsappTitle: "Fale conosco pelo WhatsApp",
    footerWhatsappText: "Entre em contato diretamente para produto, setor ou demanda de sourcing.",
    footer: "Comunicação clara em operações de importação, exportação e sourcing global.",
    copyright: "© Copyright 2026 Dynamic Era Export. Todos os direitos reservados.",
  },
  zh: {
    quoteCta: "获取报价",
    homeBadge: "全球贸易，动态解决方案",
    homeText: "从能源到建材，从纺织到食品，从健康到防务，我们以正确的产品、供应商和贸易模式为客户创造价值。\n\n凭借20年以上商业经验、1500+客户以及覆盖20+行业的供应网络，我们是全球贸易的动态力量。",
    quoteTitle: "我们陪伴贸易流程的每一个阶段",
    quoteText: "从产品研究、采购到报价和物流规划，我们提供端到端支持。",
    trustTitle: "我们陪伴贸易流程的每一个阶段",
    trustText: "我们为进出口业务提供从采购到物流的完整支持。",
    servicesLead: "我们将企业在进出口中需要的商业基础、供应网络和运营支持集中在一起。",
    services: [["产品采购", "通过本地和国际供应网络寻找产品并对接合适供应商。"], ["进口流程", "为海外产品采购、文件和物流协调提供支持。"], ["出口解决方案", "为出口企业提供产品、市场和运营方案。"], ["供应商调研", "按质量、产能、价格和交付条件提供供应商选项。"], ["报价与定价", "为所需产品组准备有竞争力且可比较的报价。"], ["物流与运营跟进", "持续跟进交付、运输和运营流程。"]],
    processTitle: "我们分析需求，找到正确来源并跟进运营。",
    processLead: "每个行业对质量、交付、成本和合规都有不同期待，因此我们建立需求导向的贸易模型。",
    processSteps: [["01", "需求分析", "明确产品组、目标市场、数量、质量要求和交付计划。"], ["02", "供应来源", "调研合适供应商并比较价格与运营选项。"], ["03", "贸易运营", "以透明沟通跟进报价、文件、物流和交付。"]],
    ctaTitle: "让我们一起强化您的贸易流程。",
    ctaText: "如需产品、供应商或进出口解决方案，请联系我们。",
    hero: [["全球贸易，动态解决方案", "面向世界的动态贸易力量。", "Dynamic Era Export 以可靠、快速和专业的方案将不同领域产品带向国际市场。"], ["广泛的行业和产品网络", "从能源到食品，从纺织到健康的多元贸易方案。", "我们根据客户需求管理产品研究、采购、定价和运营。"], ["20年以上商业经验", "用全球贸易的动态力量加速您的流程。", "凭借1500+客户和广泛行业网络，我们提供快速、灵活、可持续的方案。"]],
    metrics: [["20+", "服务年限"], ["1500+", "客户"], ["20", "业务领域"], ["360°", "贸易支持"]],
    categoryTitle: "重点业务领域",
    categoryLead: "Dynamic Era Export 在不同领域所需产品和材料组中拥有广泛贸易网络。",
    categoryPageTitle: "行业 / 业务领域",
    categoryPageLead: "在所有业务领域，我们根据客户需求开发产品与采购解决方案。",
    allSectorsTitle: "所有行业",
    allSectorsLead: "我们为不同领域的产品和采购需求提供全面贸易解决方案。",
    categoryScrollHint: "滚动列表查看全部行业。",
    categoryCustomCtaTitle: "如未看到所需产品组，请联系我们。",
    categoryCustomCtaText: "如果列表中没有您需要的产品组，Dynamic Era Export 可为您的特殊需求调研合适的采购选项。",
    categoryCustomCtaButton: "通过 WhatsApp 联系",
    categories: [["能源", "设备、基础设施、电气材料和可再生能源支持产品。"], ["建材", "建筑材料、基础设施、机械设备和项目需求。"], ["纺织", "面料、成衣、工装、技术纺织品及相关组。"], ["食品", "基础食品、包装食品、农产品和可靠贸易方案。"], ["健康", "医疗产品、耗材、医疗设备和行业采购方案。"], ["防务工业", "具备合规、保密和运营纪律的专业供应流程。"]],
    allSectorNames: ["能源", "建材", "纺织", "食品", "健康", "防务工业", "电气与电子", "机械与设备", "家具", "汽车", "塑料与橡胶", "包装", "化妆品", "清洁产品", "农产品", "医疗产品", "原材料", "建筑产品", "物流支持贸易", "通用采购方案"],
    allSectorText: "针对该行业的特殊需求提供产品、供应商和贸易运营研究。",
    homeAboutTitle: "我们将采购需求转化为正确的贸易模式。",
    homeAboutText: "在能源、纺织、食品、健康等领域，我们统一管理产品研究、供应商比较、报价和运营跟进。",
    homeAboutValues: ["需求导向采购", "按行业建立产品网络", "透明运营跟进"],
    homeAboutButton: "了解我们的工作模式",
    aboutText: "全球贸易成功取决于在正确时间、正确条件下找到正确产品。我们分析客户需求并可靠管理贸易流程。",
    aboutSupport: "Dynamic Era Export 不只寻找产品，还以信任、透明和速度管理贸易每一步。",
    aboutFlowTitle: "建立在信任、速度和透明上的贸易",
    aboutFlowText1: "我们的核心目标是连接客户与正确供应来源，可靠管理进出口并在每个阶段创造价值。",
    aboutFlowText2: "企业需要可靠供应商、正确价格、可持续关系、运营跟进和快速沟通。",
    pillars: [["我们的愿景", "成为以可靠、快速和解决方案导向著称的全球贸易品牌。"], ["我们的使命", "正确分析进口、出口和采购需求，并提供最合适的贸易解决方案。"], ["我们的方法", "我们将每次合作视为长期商业关系。"]],
    operations: [["01", "进出口支持", "提供进出口流程的商业支持。"], ["02", "产品与供应商研究", "为不同领域研究产品和供应商。"], ["03", "按需求匹配产品组", "根据客户需求确定合适产品组。"], ["04", "供应商连接", "连接本地和国际供应商。"], ["05", "报价与运营", "管理报价、定价和运营流程。"], ["06", "可持续采购", "在广泛产品类别中提供可持续采购方案。"]],
    valuesList: [["可靠性", "采用透明、负责和可持续的方法。"], ["速度", "快速响应并密切跟进运营流程。"], ["灵活性", "按项目、产品和需求创建方案。"], ["全球视角", "评估不同市场、产品组和供应来源。"]],
    whatWeDo: "我们做什么",
    ourValues: "我们的价值观",
    aboutCtaEyebrow: "与 Dynamic Era Export 合作",
    aboutCtaTitle: "让您的贸易流程更安全、更快速、更高效。",
    aboutCtaText: "无论您需要特定产品组还是专业进出口支持，我们的团队都可以建立正确方案。",
    aboutCtaPrimary: "通过 WhatsApp 联系",
    aboutCtaEmail: "通过邮件联系",
    aboutCtaSecondary: "联系页面",
    values: ["广泛产品和行业网络", "可靠贸易流程", "快速灵活方案", "国际贸易经验"],
    contactTitle: "联系",
    contactLead: "无论您寻找产品、目标国家还是类别，都可以从一条简短消息开始。",
    form: { name: "姓名", company: "公司", email: "邮箱", message: "您在寻找什么？", send: "发送邮件", sending: "发送中...", configTitle: "表单服务未配置", configText: "发送消息需要 Web3Forms 访问密钥。您也可以先通过 WhatsApp 联系我们。", successTitle: "消息发送成功", successText: "谢谢。我们会尽快回复您。", errorTitle: "消息未能发送", errorText: "请稍后重试或通过 WhatsApp 联系我们。", rateTitle: "请稍等", rateText: "为防止垃圾信息，每分钟只能发送一条消息。", close: "关闭" },
    partnersTitle: "全球贸易生态",
    importantLinksTitle: "重要链接",
    footerWhatsappTitle: "通过 WhatsApp 联系我们",
    footerWhatsappText: "就产品、行业或采购需求直接联系我们。",
    footer: "进出口和全球采购运营中的清晰沟通。",
    copyright: "© Copyright 2026 Dynamic Era Export. 保留所有权利。",
  },
};

const extraLanguageDefaults = {
  fa: {
    quoteCta: "درخواست پیشنهاد", homeBadge: "تجارت جهانی، راهکارهای پویا", homeText: "از انرژی تا مصالح ساختمانی، از نساجی تا غذا و از سلامت تا صنایع دفاعی، با محصول درست، تامین‌کننده درست و مدل تجاری درست برای مشتریان ارزش ایجاد می‌کنیم.\n\nبا بیش از ۲۰ سال تجربه، ۱۵۰۰+ مشتری و شبکه تامین در بیش از ۲۰ بخش، نیروی پویای تجارت جهانی هستیم.",
    quoteTitle: "در هر مرحله تجارت کنار شما هستیم", quoteText: "از تحقیق محصول و تامین تا قیمت‌گذاری و برنامه‌ریزی لجستیک، پشتیبانی کامل ارائه می‌دهیم.", trustTitle: "در هر مرحله تجارت کنار شما هستیم", trustText: "در فرایندهای واردات و صادرات پشتیبانی کامل ارائه می‌دهیم.",
    servicesLead: "زیرساخت تجاری، شبکه تامین و پشتیبانی عملیاتی مورد نیاز شرکت‌ها را یکجا ارائه می‌کنیم.", services: [["تامین محصول", "محصولات را از طریق شبکه محلی و بین‌المللی بررسی کرده و شما را به تامین‌کنندگان مناسب وصل می‌کنیم."], ["فرایندهای واردات", "برای محصولات خارجی در تامین، اسناد و هماهنگی لجستیک پشتیبانی می‌کنیم."], ["راهکارهای صادرات", "برای شرکت‌های صادرکننده راهکار محصول، بازار و عملیات ایجاد می‌کنیم."], ["تحقیق تامین‌کننده", "گزینه‌های مناسب را بر اساس کیفیت، ظرفیت، قیمت و تحویل ارائه می‌کنیم."], ["پیشنهاد و قیمت‌گذاری", "پیشنهادهای رقابتی و قابل مقایسه آماده می‌کنیم."], ["لجستیک و پیگیری عملیات", "تحویل، حمل و مراحل عملیاتی را پیگیری می‌کنیم."]],
    processTitle: "نیاز را تحلیل می‌کنیم، منبع درست را می‌یابیم و عملیات را دنبال می‌کنیم.", processLead: "هر بخش انتظارهای متفاوتی دارد؛ بنابراین مدل تجاری ویژه نیاز شما می‌سازیم.", processSteps: [["01", "تحلیل نیاز", "گروه محصول، بازار هدف، مقدار، کیفیت و برنامه تحویل مشخص می‌شود."], ["02", "منبع تامین", "تامین‌کنندگان مناسب بررسی و مقایسه می‌شوند."], ["03", "عملیات تجاری", "پیشنهاد، اسناد، لجستیک و تحویل با ارتباط شفاف دنبال می‌شود."]],
    ctaTitle: "بیایید فرایند تجاری شما را تقویت کنیم.", ctaText: "برای محصول، تامین‌کننده یا راهکار واردات و صادرات مورد نیازتان با ما تماس بگیرید.",
    categoryTitle: "حوزه‌های فعالیت برجسته", categoryLead: "Dynamic Era Export در گروه‌های محصول و مواد مورد نیاز بخش‌های مختلف شبکه تجاری گسترده‌ای دارد.", categoryPageTitle: "بخش‌ها / حوزه‌های فعالیت", categoryPageLead: "در همه حوزه‌ها بر اساس نیاز مشتری راهکار محصول و تامین توسعه می‌دهیم.", allSectorsTitle: "همه بخش‌ها", allSectorsLead: "برای نیازهای محصول و تامین در بخش‌های مختلف راهکارهای تجاری جامع ارائه می‌دهیم.",
    categoryScrollHint: "برای دیدن همه بخش‌ها فهرست را پیمایش کنید.", categoryCustomCtaTitle: "برای گروه‌های محصولی که در فهرست نیستند با ما تماس بگیرید.", categoryCustomCtaText: "اگر گروه محصول مورد نیازتان را نمی‌بینید، می‌توانیم گزینه‌های تامین مناسب را بررسی کنیم.", categoryCustomCtaButton: "تماس از طریق واتساپ",
    categories: [["انرژی", "تجهیزات، زیرساخت، مواد برقی و محصولات پشتیبان انرژی تجدیدپذیر."], ["مصالح ساختمانی", "مصالح، زیرساخت، تجهیزات مکانیکی و نیازهای پروژه."], ["نساجی", "پارچه، پوشاک، لباس کار، منسوجات فنی و گروه‌های مرتبط."], ["غذا", "مواد غذایی پایه، بسته‌بندی، محصولات کشاورزی و راهکارهای قابل اعتماد."], ["سلامت", "محصولات پزشکی، مصرفی، تجهیزات سلامت و راهکارهای بخشی."], ["صنایع دفاعی", "فرایندهای حرفه‌ای با انطباق، محرمانگی و نظم عملیاتی."]],
    allSectorNames: ["انرژی", "مصالح ساختمانی", "نساجی", "غذا", "سلامت", "صنایع دفاعی", "برق و الکترونیک", "ماشین‌آلات و تجهیزات", "مبلمان", "خودرو", "پلاستیک و لاستیک", "بسته‌بندی", "آرایشی", "محصولات پاک‌کننده", "محصولات کشاورزی", "محصولات پزشکی", "مواد اولیه", "محصولات ساختمانی", "تجارت با پشتیبانی لجستیک", "راهکارهای عمومی تامین"], allSectorText: "تحقیق محصول، تامین‌کننده و عملیات تجاری برای نیازهای ویژه این بخش.",
    homeAboutTitle: "نیازهای تامین را به مدل تجاری درست تبدیل می‌کنیم.", homeAboutText: "در انرژی، نساجی، غذا، سلامت و بسیاری بخش‌ها تحقیق محصول، مقایسه تامین‌کننده، پیشنهاد و پیگیری عملیات را یکجا مدیریت می‌کنیم.", homeAboutValues: ["تامین ویژه نیاز", "شبکه محصول بر اساس بخش", "پیگیری عملیاتی شفاف"], homeAboutButton: "مدل کاری ما را ببینید",
    aboutText: "موفقیت در تجارت جهانی به یافتن محصول درست در زمان و شرایط درست بستگی دارد. نیاز مشتریان را تحلیل کرده و فرایند تجارت را با اطمینان مدیریت می‌کنیم.", aboutSupport: "در Dynamic Era Export فراتر از یافتن محصول عمل می‌کنیم و هر مرحله را با اعتماد، شفافیت و سرعت مدیریت می‌کنیم.", aboutFlowTitle: "تجارت بر پایه اعتماد، سرعت و شفافیت", aboutFlowText1: "هدف ما اتصال مشتریان به منابع درست و ایجاد ارزش در هر مرحله تجارت است.", aboutFlowText2: "شرکت‌ها تامین‌کننده قابل اعتماد، قیمت درست، روابط پایدار، پیگیری عملیاتی و ارتباط سریع می‌خواهند.",
    pillars: [["چشم‌انداز ما", "تبدیل شدن به برند قدرتمند تجارت جهانی با اعتماد، سرعت و راهکارهای پایدار."], ["ماموریت ما", "تحلیل درست نیازهای واردات، صادرات و تامین و ارائه مناسب‌ترین راهکارها."], ["رویکرد ما", "هر همکاری را رابطه‌ای تجاری و بلندمدت می‌دانیم."]], operations: [["01", "پشتیبانی واردات و صادرات", "در فرایندهای واردات و صادرات پشتیبانی تجاری ارائه می‌دهیم."], ["02", "تحقیق محصول و تامین‌کننده", "برای بخش‌های مختلف محصول و تامین‌کننده بررسی می‌کنیم."], ["03", "گروه محصول متناسب با نیاز", "گروه‌های محصول مناسب را تعیین می‌کنیم."], ["04", "ارتباط با تامین‌کنندگان", "با تامین‌کنندگان محلی و بین‌المللی ارتباط برقرار می‌کنیم."], ["05", "پیشنهادها و عملیات", "پیشنهاد، قیمت‌گذاری و عملیات را مدیریت می‌کنیم."], ["06", "تامین پایدار", "در دسته‌های گسترده محصول راهکارهای پایدار ارائه می‌دهیم."]],
    valuesList: [["اعتمادپذیری", "رویکردی شفاف، مسئولانه و پایدار داریم."], ["سرعت", "سریع پاسخ می‌دهیم و جریان عملیات را پیگیری می‌کنیم."], ["انعطاف‌پذیری", "راهکارهای ویژه پروژه، محصول و نیاز ایجاد می‌کنیم."], ["نگاه جهانی", "بازارها، گروه‌های محصول و منابع مختلف را ارزیابی می‌کنیم."]],
    whatWeDo: "چه می‌کنیم", ourValues: "ارزش‌های ما", aboutCtaEyebrow: "همکاری با Dynamic Era Export", aboutCtaTitle: "فرایند تجارت شما را ایمن‌تر، سریع‌تر و کارآمدتر کنیم.", aboutCtaText: "برای محصول خاص یا پشتیبانی حرفه‌ای واردات و صادرات، تیم ما آماده ساخت راهکار درست است.", aboutCtaPrimary: "تماس از طریق واتساپ", aboutCtaEmail: "تماس از طریق ایمیل", aboutCtaSecondary: "صفحه تماس", values: ["شبکه گسترده محصول و بخش", "فرایند تجاری قابل اعتماد", "راهکارهای سریع و منعطف", "تجربه تجارت بین‌المللی"], contactTitle: "تماس", contactLead: "هر محصول، کشور هدف یا دسته‌ای که جستجو می‌کنید، می‌توانیم با یک پیام کوتاه شروع کنیم.", form: { email: "ایمیل", configTitle: "سرویس فرم پیکربندی نشده است", configText: "برای ارسال پیام کلید Web3Forms لازم است. فعلا می‌توانید از واتساپ تماس بگیرید.", rateTitle: "لطفا کمی صبر کنید", rateText: "برای جلوگیری از اسپم، در هر دقیقه فقط یک پیام قابل ارسال است." }, partnersTitle: "اکوسیستم تجارت جهانی", importantLinksTitle: "لینک‌های مهم", footerWhatsappTitle: "از طریق واتساپ با ما تماس بگیرید", footerWhatsappText: "برای محصول، بخش یا درخواست تامین مستقیم تماس بگیرید.", footer: "ارتباط شفاف در واردات، صادرات و تامین جهانی.", copyright: "© Copyright 2026 Dynamic Era Export. همه حقوق محفوظ است."
  },
};

Object.entries(compactLanguageCompletionSeeds).forEach(([code, seed]) => {
  const categories = {
    energy: seed.categories[0],
    construction: seed.categories[1],
    textile: seed.categories[2],
    food: seed.categories[3],
    health: seed.categories[4],
    defense: seed.categories[5],
  };
  copy[code] = mergeLanguageCopy(copy[code] || copy.en, {
    ...seed,
    hero: seed.hero?.map(([eyebrow, title, text]) => ({ eyebrow, title, text })) || copy[code]?.hero,
    categories,
    categoryDetails: Object.fromEntries(
      Object.entries(categories).map(([key, [title, text]]) => [key, { title, text, points: [title, seed.allSectorText, seed.categoryCustomCtaButton] }])
    ),
    allSectors: seed.allSectorNames.map((title) => [title, seed.allSectorText]),
    aboutPillars: seed.pillars,
    aboutOperationsEyebrow: seed.whatWeDo,
    aboutOperationsTitle: seed.aboutOperationsTitle || copy[code]?.aboutOperationsTitle,
    aboutOperations: seed.operations,
    aboutValuesEyebrow: seed.ourValues,
    aboutValuesTitle: seed.aboutValuesTitle || copy[code]?.aboutValuesTitle,
    aboutValues: seed.valuesList,
  });
});

Object.entries(extraLanguageDefaults).forEach(([code, seed]) => {
  const categories = {
    energy: seed.categories[0],
    construction: seed.categories[1],
    textile: seed.categories[2],
    food: seed.categories[3],
    health: seed.categories[4],
    defense: seed.categories[5],
  };
  copy[code] = mergeLanguageCopy(copy[code] || copy.en, {
    ...seed,
    hero: seed.hero?.map(([eyebrow, title, text]) => ({ eyebrow, title, text })) || copy[code]?.hero,
    categories,
    categoryDetails: Object.fromEntries(
      Object.entries(categories).map(([key, [title, text]]) => [key, { title, text, points: [title, seed.allSectorText, seed.categoryCustomCtaButton] }])
    ),
    allSectors: seed.allSectorNames.map((title) => [title, seed.allSectorText]),
    aboutPillars: seed.pillars,
    aboutOperationsEyebrow: seed.whatWeDo,
    aboutOperationsTitle: seed.aboutOperationsTitle || seed.operationsTitle || seed.copyOperationsTitle || seed.operationsLead || seed.aboutOperationsTitle || seed.aboutOperationsTitleText || seed.aboutOperationsTitleTextValue || seed.aboutOperationsTitleValue || seed.aboutOperationsTitleCopy || seed.aboutOperationsTitleLabel || seed.aboutOperationsTitleName || (code === "fa" ? "در فرایندهای واردات، صادرات و تامین پشتیبانی کامل ارائه می‌دهیم." : copy[code]?.aboutOperationsTitle),
    aboutOperations: seed.operations,
    aboutValuesEyebrow: seed.ourValues,
    aboutValuesTitle: seed.aboutValuesTitle || (code === "fa" ? "باور داریم اعتماد، سرعت، انعطاف‌پذیری و نگاه جهانی پایه تجارت است." : copy[code]?.aboutValuesTitle),
    aboutValues: seed.valuesList,
  });
});

const autoLanguageCompletionCopy = {
  "tr": {
    "homeBadge": "Global Ticaret, Dinamik Çözümler",
    "hero": [
      {
        "eyebrow": "Global Ticaret, Dinamik Çözümler"
      }
    ]
  },
  "ru": {
    "homeBadge": "Глобальная торговля, динамические решения",
    "hero": [
      {
        "eyebrow": "Глобальная торговля, динамические решения"
      }
    ]
  },
  "fr": {
    "nav": [
      null,
      null,
      null,
      "Contact"
    ],
    "homeBadge": "Commerce mondial, solutions dynamiques",
    "hero": [
      {
        "eyebrow": "Commerce mondial, solutions dynamiques"
      }
    ],
    "categories": {
      "textile": [
        "Textile"
      ]
    },
    "categoryDetails": {
      "textile": {
        "title": "Textile"
      }
    },
    "allSectors": [
      null,
      null,
      [
        "Textile"
      ]
    ],
    "contactTitle": "Contact"
  },
  "de": {
    "homeBadge": "Globaler Handel, dynamische Lösungen",
    "hero": [
      {
        "eyebrow": "Globaler Handel, dynamische Lösungen"
      }
    ],
    "categoryDetails": {
      "defense": {
        "points": [
          "Einhaltung"
        ]
      }
    },
    "allSectors": [
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      [
        "Automobil"
      ]
    ]
  },
  "nl": {
    "nav": [
      "Thuis",
      null,
      null,
      "Contact"
    ],
    "direct": "Neem contact op via WhatsApp",
    "homeBadge": "Mondiale handel, dynamische oplossingen",
    "hero": [
      {
        "eyebrow": "Mondiale handel, dynamische oplossingen"
      }
    ],
    "categoryCustomCtaButton": "Neem contact op via WhatsApp",
    "allSectors": [
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      [
        "Automobiel"
      ]
    ],
    "aboutCtaPrimary": "Neem contact op via WhatsApp",
    "contactTitle": "Contact"
  },
  "ar": {
    "homeBadge": "التجارة العالمية، الحلول الديناميكية",
    "hero": [
      {
        "eyebrow": "التجارة العالمية، الحلول الديناميكية"
      }
    ]
  },
  "it": {
    "nav": [
      "Casa"
    ],
    "allCategoriesCta": "Visualizza tutte le aree di business",
    "categories": {
      "food": [
        "Cibo"
      ]
    },
    "categoryDetails": {
      "food": {
        "title": "Cibo"
      }
    },
    "allSectors": [
      null,
      null,
      null,
      [
        "Cibo"
      ],
      null,
      null,
      null,
      null,
      null,
      [
        "Automobilistico"
      ]
    ],
    "aboutIntroTitle": "Chi siamo",
    "aboutIntroText": "Dynamic Era Export è una società commerciale che opera nel commercio nazionale ed estero con un ampio portafoglio di prodotti, forti relazioni con i fornitori e un approccio orientato alla soluzione.\n\nSviluppa soluzioni di sourcing adatte alle esigenze dei clienti nei settori dell'energia, dei materiali da costruzione, del tessile, dell'alimentazione, della sanità, della difesa e di diverse categorie commerciali. Il nostro obiettivo non è solo fornire prodotti, ma offrire ai nostri clienti un'esperienza commerciale affidabile, sostenibile ed efficiente.\n\nCon la nostra ampia rete settoriale, la struttura operativa flessibile e l'approccio al servizio orientato al cliente, ci posizioniamo come un forte partner commerciale nei processi di importazione ed esportazione delle aziende.",
    "aboutMore": "Ulteriori informazioni su di noi"
  },
  "pt": {
    "allCategoriesCta": "Ver todas as áreas de negócios",
    "aboutIntroTitle": "Sobre nós",
    "aboutIntroText": "Dynamic Era Export é uma empresa comercial que atua no comércio interno e externo com um amplo portfólio de produtos, fortes relacionamentos com fornecedores e uma abordagem orientada a soluções.\n\nDesenvolve soluções de sourcing adequadas às necessidades dos clientes em energia, materiais de construção, têxteis, alimentos, saúde, indústria de defesa e diferentes categorias comerciais. Nosso objetivo não é apenas fornecer produtos, mas oferecer aos nossos clientes uma experiência comercial confiável, sustentável e eficiente.\n\nCom nossa ampla rede setorial, estrutura operacional flexível e abordagem de atendimento orientada ao cliente, nos posicionamos como um forte parceiro de negócios nos processos de importação e exportação das empresas.",
    "aboutMore": "Mais informações sobre nós",
    "aboutOperationsTitle": "Fornecemos suporte ponta a ponta nos processos de importação, exportação e sourcing.",
    "aboutValuesTitle": "Acreditamos que a confiança, a rapidez, a flexibilidade e uma perspectiva global são a base do comércio."
  },
  "zh": {
    "allCategoriesCta": "查看所有业务领域",
    "aboutIntroTitle": "关于我们",
    "aboutIntroText": "Dynamic Era Export 是一家从事国内和外贸业务的贸易公司，拥有广泛的产品组合、强大的供应商关系和以解决方案为导向的方法。\n\n它开发适合能源、建筑材料、纺织、食品、卫生、国防工业和不同贸易类别客户需求的采购解决方案。我们的目标不仅仅是提供产品，而是为客户提供可靠、可持续和高效的贸易体验。\n\n凭借广泛的行业网络、灵活的运营结构和以客户为导向的服务方式，我们将自己定位为公司进出口流程中强大的业务合作伙伴。",
    "aboutMore": "关于我们的更多信息",
    "aboutOperationsTitle": "我们在进口、出口和采购流程中提供端到端支持。",
    "aboutValuesTitle": "我们相信信任、速度、灵活性和全球视野是贸易的基础。"
  },
  "fa": {
    "hero": [
      {
        "eyebrow": "تجارت جهانی، راه حل های پویا",
        "title": "یک قدرت تجاری پویا که به روی جهان باز می شود.",
        "text": "Dynamic Era Export محصولات را از بخش های مختلف با راه حل های صادراتی قابل اعتماد، سریع و حرفه ای به بازارهای بین المللی ارائه می دهد."
      },
      {
        "eyebrow": "بخش گسترده و شبکه محصول",
        "title": "راه حل های تجاری همه کاره از انرژی تا غذا، نساجی تا سلامتی.",
        "text": "ما به طور حرفه ای فرآیندهای تحقیق محصول، منبع یابی، قیمت گذاری و عملیات را بر اساس تقاضای مشتری مدیریت می کنیم."
      },
      {
        "eyebrow": "20+ سال تجربه تجاری",
        "title": "با قدرت پویای تجارت جهانی، روند خود را تسریع کنید.",
        "text": "ما با بیش از 1500 مشتری و شبکه گسترده ای، راه حل های تجاری سریع، انعطاف پذیر و پایدار ارائه می دهیم."
      }
    ],
    "metrics": [
      [
        null,
        "سال خدمت"
      ],
      [
        null,
        "مشتریان"
      ],
      [
        null,
        "مناطق تجاری"
      ],
      [
        null,
        "حمایت تجاری"
      ]
    ],
    "allCategoriesCta": "مشاهده تمام حوزه های تجاری",
    "aboutIntroTitle": "درباره ما",
    "aboutIntroText": "Dynamic Era Export یک شرکت تجاری است که در تجارت داخلی و خارجی با سبد محصولات گسترده، روابط قوی با تامین کنندگان و رویکرد راه حل محور فعالیت می کند.\n\nراه حل های منبع یابی مناسب برای نیازهای مشتری در انرژی، مصالح ساختمانی، نساجی، مواد غذایی، بهداشت، صنایع دفاعی و دسته های مختلف تجاری را توسعه می دهد. هدف ما تنها ارائه محصولات نیست، بلکه ارائه یک تجربه تجاری قابل اعتماد، پایدار و کارآمد به مشتریان خود است.\n\nبا شبکه گسترده بخش، ساختار عملیاتی منعطف و رویکرد خدمات مشتری مدار، خود را به عنوان یک شریک تجاری قوی در فرآیندهای واردات و صادرات شرکت ها قرار می دهیم.",
    "aboutMore": "اطلاعات بیشتر درباره ما",
    "aboutOperationsTitle": "ما در فرآیندهای واردات، صادرات و منبع یابی پشتیبانی کامل ارائه می دهیم.",
    "aboutValuesTitle": "ما بر این باوریم که اعتماد، سرعت، انعطاف پذیری و دیدگاه جهانی اساس تجارت است."
  },
  "uk": {
    "quoteCta": "Отримати цінову пропозицію",
    "homeBadge": "Глобальна торгівля, динамічні рішення",
    "homeText": "Від енергетики до будівельних матеріалів, від текстилю до продуктів харчування, від охорони здоров’я до оборонної промисловості, ми створюємо цінність для наших клієнтів за допомогою правильного продукту, правильного постачальника та правильної моделі торгівлі.\n\nМаючи понад 20 років комерційного досвіду, понад 1500 клієнтів і потужну мережу поставок у понад 20 секторах, ми є динамічною силою світової торгівлі.",
    "quoteTitle": "Ми з вами на кожному етапі торгівлі",
    "quoteText": "Ми надаємо наскрізну підтримку, починаючи від дослідження продукту та пошуку джерел до ціноутворення та планування логістики.",
    "trustTitle": "Ми з вами на кожному етапі торгівлі",
    "trustText": "Ми надаємо наскрізну підтримку в імпортних та експортних операціях, починаючи від дослідження продукту та пошуку джерел до ціноутворення та планування логістики.",
    "servicesLead": "Ми надаємо комерційну інфраструктуру, мережу постачання та оперативну підтримку компаній, необхідних для процесів імпорту та експорту під одним дахом.",
    "services": [
      [
        "Пошук продукції",
        "Ми досліджуємо продукти через нашу місцеву та міжнародну мережу поставок і зв’язуємо вас із відповідними постачальниками."
      ],
      [
        "Процеси імпорту",
        "Для товарів, що постачаються з-за кордону, ми підтримуємо пошук, документацію та координацію логістики."
      ],
      [
        "Експортні рішення",
        "Ми створюємо продуктові, ринкові та операційні рішення для компаній, які хочуть експортувати з Туреччини на різні ринки."
      ],
      [
        "Дослідження постачальників",
        "Ми пропонуємо відповідні варіанти постачальника, виходячи з якості, потужності, цінового балансу та умов доставки."
      ],
      [
        "Котирування та ціноутворення",
        "Ми готуємо конкурентоспроможні та порівняльні варіанти пропозицій для запитуваних груп товарів."
      ],
      [
        "Логістика та відстеження операцій",
        "Ми надаємо регулярну підтримку протягом процесів доставки, відвантаження та операційного супроводу."
      ]
    ],
    "processTitle": "Ми аналізуємо попит, знаходимо правильне джерело і стежимо за роботою.",
    "processLead": "Кожен сектор має різні очікування щодо якості, доставки, вартості та відповідності; тому ми будуємо торгову модель, що залежить від попиту, а не стандартний процес.",
    "processSteps": [
      [
        null,
        "Аналіз попиту",
        "Уточнюються товарна група, цільовий ринок, кількість, очікувана якість і план доставки."
      ],
      [
        null,
        "Джерело постачання",
        "Вивчаються відповідні постачальники, порівнюються ціни та варіанти роботи."
      ],
      [
        null,
        "Торгова операція",
        "Ціни, документація, логістика та процеси доставки супроводжуються прозорою комунікацією."
      ]
    ],
    "ctaTitle": "Давайте разом покращимо ваш торговий процес.",
    "ctaText": "Зв’яжіться з нами, щоб отримати потрібний продукт, постачальника чи імпортно-експортне рішення. Давайте побудуємо найбільш підходящу торгову модель для вас.",
    "hero": [
      {
        "eyebrow": "Глобальна торгівля, динамічні рішення",
        "title": "Динамічна торгова сила, що відкривається світові.",
        "text": "Dynamic Era Export постачає продукти з різних секторів на міжнародні ринки за допомогою надійних, швидких і професійних експортних рішень."
      },
      {
        "eyebrow": "Широкий сектор і продуктова мережа",
        "title": "Універсальні торгові рішення від енергетики до продуктів харчування, текстилю до здоров’я.",
        "text": "Ми професійно керуємо процесами дослідження продукту, пошуку джерел, ціноутворення та експлуатації відповідно до попиту клієнтів."
      },
      {
        "eyebrow": "20+ років комерційного досвіду",
        "title": "Прискоріть свій процес завдяки динамічній силі глобальної торгівлі.",
        "text": "Маючи понад 1500 клієнтів і широку галузеву мережу, ми пропонуємо швидкі, гнучкі та стійкі торговельні рішення."
      }
    ],
    "metrics": [
      [
        null,
        "років служби"
      ],
      [
        null,
        "клієнтів"
      ],
      [
        null,
        "сфери бізнесу"
      ],
      [
        null,
        "підтримка торгівлі"
      ]
    ],
    "categoryTitle": "Рекомендовані сфери діяльності",
    "categoryLead": "Dynamic Era Export має широку торгову мережу серед груп продуктів і матеріалів, необхідних для різних секторів.",
    "allCategoriesCta": "Переглянути всі сфери діяльності",
    "categories": {
      "energy": [
        "Енергія",
        "Обладнання, інфраструктурні продукти, електротехнічні матеріали та продукти підтримки відновлюваної енергії."
      ],
      "construction": [
        "Будівельні матеріали",
        "Будівельні матеріали, інфраструктурні продукти, механічне обладнання та проектні потреби."
      ],
      "textile": [
        "Текстиль",
        "Тканина, готовий одяг, робочий одяг, технічний текстиль та різні групи текстилю."
      ],
      "food": [
        "харчування",
        "Основні продукти харчування, упаковані продукти харчування, сільськогосподарська продукція та надійні торгові рішення."
      ],
      "health": [
        "Здоров'я",
        "Медичні вироби, витратні матеріали, обладнання для охорони здоров’я та рішення для постачання для окремих галузей."
      ],
      "defense": [
        "Оборонна промисловість",
        "Професійні процеси постачання з дотриманням вимог, конфіденційністю та операційною дисципліною."
      ]
    },
    "categoryDetails": {
      "energy": {
        "title": "Енергія",
        "text": "Для енергетичного сектору ми надаємо рішення для пошуку джерел для різних груп продуктів, особливо обладнання, інфраструктурних продуктів, електротехнічних матеріалів і продуктів підтримки відновлюваної енергії.",
        "points": [
          "Енергетичне обладнання",
          "Електротехнічні матеріали",
          "Пошук на основі проекту"
        ]
      },
      "construction": {
        "title": "Будівельні матеріали",
        "text": "Ми надаємо послуги з пошуку будівельних матеріалів, інфраструктурних продуктів, механічного обладнання, додаткових будівельних виробів і потреб, що базуються на проектах.",
        "points": [
          "Будівельні та інфраструктурні продукти",
          "Механічне обладнання",
          "Потреби на основі проекту"
        ]
      },
      "textile": {
        "title": "Текстиль",
        "text": "Ми пропонуємо внутрішні та міжнародні торгові рішення для тканин, готового одягу, робочого одягу, технічних текстильних виробів та різних груп текстилю.",
        "points": [
          "Тканина і готова одяг",
          "Робочий одяг",
          "Вироби технічного текстилю"
        ]
      },
      "food": {
        "title": "харчування",
        "text": "Ми розробляємо надійні рішення щодо постачання та торгівлі основними продуктами харчування, упакованими продуктами харчування, сільськогосподарською продукцією та різними категоріями продуктів харчування.",
        "points": [
          "Основний продукт харчування",
          "Упакована продукція",
          "Сільськогосподарська продукція"
        ]
      },
      "health": {
        "title": "Здоров'я",
        "text": "Ми надаємо рішення щодо пошуку медичних виробів, витратних матеріалів, обладнання для охорони здоров’я та потреб конкретного сектора.",
        "points": [
          "Вироби медичного призначення",
          "Витратні матеріали",
          "Медичне обладнання"
        ]
      },
      "defense": {
        "title": "Оборонна промисловість",
        "text": "В оборонній промисловості ми розробляємо професійні рішення для процесів постачання в певному секторі з дотриманням принципів відповідності, конфіденційності та операційної дисципліни.",
        "points": [
          "Відповідність",
          "Конфіденційність і дисциплінованість",
          "Галузеве постачання"
        ]
      }
    },
    "categoryPageLead": "У всіх сферах нашого бізнесу ми розробляємо продукти та рішення щодо пошуку відповідно до попиту клієнтів.",
    "categoryScrollHint": "Прокрутіть список, щоб переглянути всі сектори",
    "categoryCustomCtaTitle": "Зв’яжіться з нами щодо груп продуктів, яких тут немає.",
    "categoryCustomCtaText": "Якщо ви не бачите в списку потрібну групу товарів, зв’яжіться з нами. Dynamic Era Export може досліджувати відповідні варіанти постачання для ваших особливих запитів у різних секторах.",
    "allSectorsLead": "Dynamic Era Export пропонує комплексні торговельні рішення для потреб продуктів і джерел у різних секторах.",
    "allSectors": [
      [
        "Енергія",
        "Обладнання, інфраструктурні продукти, електротехнічні матеріали та продукти підтримки відновлюваної енергії."
      ],
      [
        "Будівельні матеріали",
        "Будівельні матеріали, інфраструктурні продукти, механічне обладнання та проектні потреби."
      ],
      [
        "Текстиль",
        "Тканина, готовий одяг, робочий одяг, вироби технічного текстилю та різні групи текстилю."
      ],
      [
        "харчування",
        "Основні продукти харчування, упаковані продукти харчування, сільськогосподарська продукція та надійні торгові рішення."
      ],
      [
        "Здоров'я",
        "Медичні вироби, витратні матеріали, обладнання для охорони здоров’я та рішення щодо пошуку джерел для певних галузей."
      ],
      [
        "Оборонна промисловість",
        "Професійні процеси пошуку з дотриманням вимог, конфіденційності та операційної дисципліни."
      ],
      [
        "Електротехніка та електроніка",
        "Електротехнічні матеріали, електронні вироби, з'єднувальне обладнання та освітлювальні вироби."
      ],
      [
        "Машини та обладнання",
        "Потреби в промисловому обладнанні, виробничому обладнанні, запасних частинах і технічному обладнанні."
      ],
      [
        "Меблі",
        "Широкі можливості пошуку меблів для дому, офісу, комерційних приміщень і проектних меблів."
      ],
      [
        "Автомобільний",
        "Автомобільні запчастини, обладнання, аксесуари та групи товарів для окремих галузей."
      ],
      [
        "Пластик і гума",
        "Пластмасові вироби, гумові матеріали, технічні частини та групи промислових товарів."
      ],
      [
        "Упаковка",
        "Пакувальні продукти та пакувальні рішення для харчової, текстильної, промислової та роздрібної торгівлі."
      ],
      [
        "Косметика",
        "Косметична продукція, засоби особистої гігієни, засоби гігієни та суміжні групи товарів."
      ],
      [
        "Чистячі засоби",
        "Промислові чистячі засоби, гігієнічні матеріали, витратні матеріали та засоби корпоративного використання."
      ],
      [
        "Сільськогосподарська продукція",
        "Сільськогосподарська продукція, продовольча сировина та торгові рішення для аграрного сектора."
      ],
      [
        "Медичні вироби",
        "Підтримка постачальників продуктів для закладів охорони здоров’я та компаній, що постачають медичні препарати."
      ],
      [
        "Сировина",
        "Групи сировини, необхідні у виробничих процесах різних галузей."
      ],
      [
        "Будівельні вироби",
        "Додаткові групи продуктів, які використовуються в будівництві, оздобленні та будівельних проектах."
      ],
      [
        "Логістична підтримка торгівлі",
        "Підтримка координації етапів відвантаження, доставки та відстеження операцій."
      ],
      [
        "Загальні рішення з пошуку",
        "Дослідження та пошук рішень для спеціальних запитів на продукти, що виходять за межі однієї категорії."
      ]
    ],
    "aboutIntroTitle": "Про нас",
    "aboutIntroText": "Dynamic Era Export – це торгова компанія, що працює у внутрішній та зовнішній торгівлі з широким портфелем продуктів, міцними зв’язками з постачальниками та орієнтованим на рішення підходом.\n\nВін розробляє рішення щодо пошуку джерел, які відповідають потребам клієнтів у сферах енергетики, будівельних матеріалів, текстилю, продуктів харчування, охорони здоров’я, оборонної промисловості та різних категорій торгівлі. Наша мета полягає не тільки в тому, щоб надавати продукти, але й запропонувати нашим клієнтам надійний, стабільний і ефективний досвід торгівлі.\n\nЗавдяки широкій галузевій мережі, гнучкій операційній структурі та орієнтованому на клієнта підходу до обслуговування ми позиціонуємо себе як сильного ділового партнера в імпортних та експортних процесах компаній.",
    "aboutMore": "Більше інформації про нас",
    "homeAboutTitle": "Ми перетворюємо потреби в пошуку джерел у правильну торгову модель.",
    "homeAboutText": "В енергетиці, текстилі, харчовій промисловості, охороні здоров’я та багатьох інших секторах ми керуємо дослідженнями продуктів, порівнюємо постачальників, пропонуємо пропозиції та оперативний контроль з одного місця. Ми уточнюємо ваш запит, знаходимо правильне джерело та підтримуємо процес за допомогою прозорого спілкування.",
    "homeAboutValues": [
      "Пошук джерел відповідно до попиту",
      "Продуктова мережа за галузями",
      "Прозоре супроводження операцій"
    ],
    "homeAboutButton": "Дізнайтеся про нашу робочу модель",
    "aboutText": "Успіх у світовій торгівлі залежить від отримання потрібного продукту в потрібний час і за правильних умов. Ми аналізуємо потреби наших клієнтів, визначаємо канали постачання, які відповідають сектору та попиту, і надійно керуємо процесом торгівлі.",
    "aboutSupport": "У Dynamic Era Export ми виходимо за рамки пошуку продуктів і керуємо кожним кроком торгівлі з довірою, прозорістю та швидкістю.",
    "aboutFlowTitle": "Торгівля, заснована на довірі, швидкості та прозорості",
    "aboutFlowText1": "З першого дня наша головна мета полягала в тому, щоб підключити клієнтів до правильних каналів постачання, надійно керувати процесами імпорту та експорту та стати діловим партнером, який створює цінність на кожному етапі торгівлі.",
    "aboutFlowText2": "У сучасному глобальному торговому ландшафті компанії очікують більше, ніж продукт: надійний постачальник, правильне ціноутворення, стійкі ділові відносини, оперативне спостереження та швидке спілкування. У Dynamic Era Export ми використовуємо комплексний підхід до торгівлі, який враховує всі ці потреби.",
    "aboutPillars": [
      [
        "Наше бачення",
        "Стати потужним торговельним брендом, відомим своєю надійністю, швидкістю та орієнтованим на рішення мисленням у глобальній торгівлі, пропонуючи при цьому стійкі рішення для пошуку в різних секторах."
      ],
      [
        "Наша місія",
        "Правильно аналізувати потреби наших клієнтів щодо імпорту, експорту та пошуку джерел і надавати найбільш відповідні торговельні рішення з якісними продуктами, надійними джерелами, конкурентними цінами та професійною операційною підтримкою."
      ],
      [
        "Наш підхід",
        "Ми розглядаємо кожну співпрацю як довгострокові комерційні відносини та зосереджуємось не лише на поточних запитах на продукт, але й на майбутніх потребах наших клієнтів."
      ]
    ],
    "aboutOperationsEyebrow": "Що ми робимо",
    "aboutOperationsTitle": "Ми надаємо наскрізну підтримку в процесах імпорту, експорту та пошуку.",
    "aboutOperations": [
      [
        null,
        "Підтримка імпорту та експорту",
        "Ми надаємо комерційну підтримку в процесах імпорту та експорту."
      ],
      [
        null,
        "Дослідження продукту та постачальника",
        "Ми досліджуємо продукти та постачальників для різних секторів."
      ],
      [
        null,
        "Товарні групи, що відповідають попиту",
        "Ми визначаємо відповідні групи товарів на основі попиту клієнтів."
      ],
      [
        null,
        "Підключення постачальників",
        "Ми співпрацюємо з місцевими та міжнародними постачальниками."
      ],
      [
        null,
        "Котирування та операції",
        "Ми керуємо котируванням, ціноутворенням і операційними процесами."
      ],
      [
        null,
        "Сталі джерела",
        "Ми пропонуємо екологічні рішення для широких категорій продуктів."
      ]
    ],
    "aboutValuesEyebrow": "Наші цінності",
    "aboutValuesTitle": "Ми віримо, що довіра, швидкість, гнучкість і глобальна перспектива є основою торгівлі.",
    "aboutValues": [
      [
        "Надійність",
        "Ми використовуємо прозорий, відповідальний і стабільний підхід до всіх бізнес-процесів."
      ],
      [
        "швидкість",
        "Ми швидко реагуємо на запити клієнтів, ефективно плануємо процес і ретельно відслідковуємо хід операцій."
      ],
      [
        "Гнучкість",
        "Замість фіксованих шаблонів ми створюємо рішення для конкретного проекту, продукту та попиту."
      ],
      [
        "Глобальна перспектива",
        "Оцінюючи різні ринки, групи продуктів і джерела постачання, ми пропонуємо ширші можливості."
      ]
    ],
    "aboutCtaEyebrow": "Робота з Dynamic Era Export",
    "aboutCtaTitle": "Давайте зробимо ваш торговий процес безпечнішим, швидшим і ефективнішим.",
    "aboutCtaText": "Якщо ви шукаєте конкретну групу продуктів або потребуєте професійної підтримки для імпортно-експортних процесів, наша команда готова створити правильне рішення для вас.",
    "aboutCtaPrimary": "Зв'яжіться через WhatsApp",
    "aboutCtaEmail": "Зв'язатися через електронну пошту",
    "aboutCtaSecondary": "Сторінка контактів",
    "values": [
      "Широка продуктова та галузева мережа",
      "Надійний торговий процес",
      "Гнучкі та швидкі рішення",
      "Досвід міжнародної торгівлі"
    ],
    "contactLead": "Який би продукт, цільову країну чи категорію ви не шукали, ми можемо почати з короткого повідомлення.",
    "form": {
      "configTitle": "Службу форм не налаштовано",
      "configText": "Перш ніж надсилати повідомлення, потрібно додати ключ доступу Web3Forms. Тим часом ви можете зв’язатися з нами через WhatsApp.",
      "successTitle": "Ваше повідомлення успішно надіслано",
      "successText": "дякую Ми зв'яжемося з вами якомога швидше.",
      "errorTitle": "Не вдалося надіслати повідомлення",
      "errorText": "Повторіть спробу незабаром або зв’яжіться з нами через WhatsApp.",
      "rateTitle": "Зачекайте хвилинку",
      "rateText": "Для захисту від спаму ви можете надсилати лише одне повідомлення за хвилину."
    },
    "partnersTitle": "Глобальна торгова екосистема",
    "importantLinksTitle": "Важливі посилання",
    "footerWhatsappTitle": "Зв’яжіться з нами на WhatsApp",
    "footerWhatsappText": "Зв’яжіться з нами напряму, щоб отримати запит щодо свого продукту, сектору чи джерела.",
    "footer": "Чітка комунікація в імпорті, експорті та глобальних операціях з пошуку.",
    "copyright": "© Copyright 2026 Dynamic Era Export. Всі права захищені."
  },
  "ro": {
    "nav": [
      null,
      null,
      null,
      "Contact"
    ],
    "quoteCta": "Obțineți o cotație",
    "homeBadge": "Comerț global, soluții dinamice",
    "homeText": "De la energie la materiale de construcții, de la textile la alimente, de la sănătate la industria de apărare, creăm valoare pentru clienții noștri cu produsul potrivit, furnizorul potrivit și modelul comercial potrivit.\n\nCu peste 20 de ani de experiență comercială, peste 1500 de clienți și o rețea puternică de aprovizionare în peste 20 de sectoare, suntem puterea dinamică a comerțului global.",
    "quoteTitle": "Suntem alături de dvs. în fiecare etapă a comerțului",
    "quoteText": "De la cercetarea produselor și aprovizionarea până la planificarea prețurilor și logisticii, oferim asistență completă.",
    "trustTitle": "Suntem alături de dvs. în fiecare etapă a comerțului",
    "trustText": "De la cercetarea și aprovizionarea produselor până la planificarea prețurilor și logisticii, oferim suport complet în operațiunile de import și export.",
    "servicesLead": "Oferim infrastructura comercială, rețeaua de aprovizionare și suportul operațional de care companiile au nevoie în procesele de import și export sub un singur acoperiș.",
    "services": [
      [
        "Aprovizionarea cu produse",
        "Cercetăm produse prin intermediul rețelei noastre locale și internaționale de aprovizionare și vă punem în legătură cu furnizori potriviți."
      ],
      [
        "Procese de import",
        "Pentru produsele provenite din străinătate, sprijinim coordonarea aprovizionării, documentării și logisticii."
      ],
      [
        "Soluții de export",
        "Creăm soluții de produse, piețe și operațiuni pentru companiile care doresc să exporte din Turcia către diferite piețe."
      ],
      [
        "Cercetarea furnizorilor",
        "Oferim opțiuni de furnizori adecvate în funcție de calitate, capacitate, echilibru de preț și termeni de livrare."
      ],
      [
        "Cotație și prețuri",
        "Pregătim opțiuni de cotație competitive și comparabile pentru grupurile de produse solicitate."
      ],
      [
        "Logistica și urmărirea operațiunilor",
        "Oferim suport regulat pe parcursul proceselor de livrare, expediere și de urmărire operațională."
      ]
    ],
    "processTitle": "Analizăm cererea, găsim sursa potrivită și urmărim operațiunea.",
    "processLead": "Fiecare sector are așteptări diferite pentru calitate, livrare, cost și conformitate; prin urmare, construim un model comercial specific cererii mai degrabă decât un proces standard.",
    "processSteps": [
      [
        null,
        "Analiza cererii",
        "Sunt clarificate grupul de produse, piata tinta, cantitatea, asteptarile de calitate si planul de livrare."
      ],
      [
        null,
        "Sursa de aprovizionare",
        "Sunt cercetați furnizorii potriviți și sunt comparate prețurile și opțiunile de operare."
      ],
      [
        null,
        "Operațiune comercială",
        "Procesele de cotație, documentare, logistică și livrare sunt urmate cu o comunicare transparentă."
      ]
    ],
    "ctaTitle": "Haideți să vă întărim procesul comercial împreună.",
    "ctaText": "Contactați-ne pentru produsul, furnizorul sau soluția de import-export de care aveți nevoie. Să construim cel mai potrivit model de comerț pentru tine.",
    "hero": [
      {
        "eyebrow": "Comerț global, soluții dinamice",
        "title": "O putere comercială dinamică care se deschide către lume.",
        "text": "Dynamic Era Export livrează produse din diferite sectoare pe piețele internaționale cu soluții de export fiabile, rapide și profesionale."
      },
      {
        "eyebrow": "Sector vast și rețea de produse",
        "title": "Soluții comerciale versatile de la energie la alimente, textile la sănătate.",
        "text": "Gestionăm în mod profesionist procesele de cercetare a produselor, aprovizionare, stabilire a prețurilor și operare în funcție de cererea clienților."
      },
      {
        "eyebrow": "20+ ani de experiență comercială",
        "title": "Accelerează-ți procesul cu puterea dinamică a comerțului global.",
        "text": "Cu peste 1500 de clienți și o rețea sectorială largă, oferim soluții comerciale rapide, flexibile și durabile."
      }
    ],
    "metrics": [
      [
        null,
        "ani de serviciu"
      ],
      [
        null,
        "clienţilor"
      ],
      [
        null,
        "zonele de afaceri"
      ],
      [
        null,
        "sprijin comercial"
      ]
    ],
    "categoryTitle": "Zone de afaceri recomandate",
    "categoryLead": "Dynamic Era Export are o rețea comercială largă în grupuri de produse și materiale necesare diferitelor sectoare.",
    "allCategoriesCta": "Vedeți toate zonele de afaceri",
    "categories": {
      "energy": [
        "Energie",
        "Echipamente, produse de infrastructură, materiale electrice și produse de sprijin pentru energie regenerabilă."
      ],
      "construction": [
        "Materiale de constructii",
        "Materiale de construcție, produse de infrastructură, echipamente mecanice și nevoi bazate pe proiecte."
      ],
      "textile": [
        "Textile",
        "Tesaturi, prêt-à-porter, imbracaminte de lucru, textile tehnice si diferite grupe de textile."
      ],
      "food": [
        "Mâncare",
        "Produse alimentare de bază, alimente ambalate, produse agricole și soluții comerciale de încredere."
      ],
      "health": [
        "Sănătate",
        "Produse medicale, consumabile, echipamente medicale și soluții de aprovizionare specifice sectorului."
      ],
      "defense": [
        "Industria de apărare",
        "Procese profesionale de aprovizionare cu conformitate, confidențialitate și disciplină operațională."
      ]
    },
    "categoryDetails": {
      "energy": {
        "title": "Energie",
        "text": "Pentru sectorul energetic, oferim soluții de aprovizionare pentru diferite grupuri de produse, în special echipamente, produse de infrastructură, materiale electrice și produse de sprijin pentru energie regenerabilă.",
        "points": [
          "Echipamente energetice",
          "Materiale electrice",
          "Aprovizionare bazată pe proiecte"
        ]
      },
      "construction": {
        "title": "Materiale de constructii",
        "text": "Oferim servicii de aprovizionare pentru materiale de construcție, produse de infrastructură, echipamente mecanice, produse de construcții complementare și nevoi bazate pe proiecte.",
        "points": [
          "Produse pentru constructii si infrastructura",
          "Echipamente mecanice",
          "Nevoile bazate pe proiecte"
        ]
      },
      "textile": {
        "title": "Textile",
        "text": "Oferim soluții de comerț intern și internațional pentru țesături, prêt-à-porter, îmbrăcăminte de lucru, produse textile tehnice și diferite grupe textile.",
        "points": [
          "Tesatura si gata de purtat",
          "Îmbrăcăminte de lucru",
          "Produse textile tehnice"
        ]
      },
      "food": {
        "title": "Mâncare",
        "text": "Dezvoltăm soluții fiabile de aprovizionare și comerț pentru produse alimentare de bază, alimente ambalate, produse agricole și diferite categorii de alimente.",
        "points": [
          "Alimente de bază",
          "Produse ambalate",
          "Produse agricole"
        ]
      },
      "health": {
        "title": "Sănătate",
        "text": "Oferim soluții de aprovizionare pentru produse medicale, consumabile, echipamente medicale și nevoi specifice sectorului.",
        "points": [
          "Produse medicale",
          "Consumabile",
          "Echipamente medicale"
        ]
      },
      "defense": {
        "title": "Industria de apărare",
        "text": "În industria de apărare, dezvoltăm soluții profesionale pentru procesele de aprovizionare specifice sectorului, cu principii de conformitate, confidențialitate și disciplină operațională.",
        "points": [
          "Conformitate",
          "Confidențialitate și disciplină",
          "Aprovizionare specifică sectorului"
        ]
      }
    },
    "categoryPageLead": "În toate domeniile noastre de activitate, dezvoltăm soluții de produse și aprovizionare în funcție de cererea clienților.",
    "categoryScrollHint": "Derulați lista pentru a vedea toate sectoarele",
    "categoryCustomCtaTitle": "Contactați-ne pentru grupurile de produse care nu sunt listate aici.",
    "categoryCustomCtaText": "Dacă nu puteți vedea grupul de produse de care aveți nevoie în listă, contactați-ne. Dynamic Era Export poate căuta opțiuni de aprovizionare adecvate pentru solicitările dumneavoastră speciale din diferite sectoare.",
    "allSectorsLead": "Dynamic Era Export oferă soluții comerciale complete pentru nevoile de produse și aprovizionare din diferite sectoare.",
    "allSectors": [
      [
        "Energie",
        "Echipamente, produse de infrastructură, materiale electrice și produse de sprijin pentru energie regenerabilă."
      ],
      [
        "Materiale de constructii",
        "Materiale de construcție, produse de infrastructură, echipamente mecanice și nevoi bazate pe proiecte."
      ],
      [
        "Textile",
        "Tesaturi, prêt-à-porter, imbracaminte de lucru, produse textile tehnice si diferite grupe textile."
      ],
      [
        "Mâncare",
        "Produse alimentare de bază, alimente ambalate, produse agricole și soluții comerciale de încredere."
      ],
      [
        "Sănătate",
        "Produse medicale, consumabile, echipamente medicale și soluții de aprovizionare specifice sectorului."
      ],
      [
        "Industria de apărare",
        "Procese profesionale de aprovizionare cu conformitate, confidențialitate și disciplină operațională."
      ],
      [
        "Electrice și electronice",
        "Materiale electrice, produse electronice, echipamente de conectare și produse de iluminat."
      ],
      [
        "Mașini și echipamente",
        "Nevoi de utilaje industriale, echipamente de producție, piese de schimb și echipamente tehnice."
      ],
      [
        "Mobilier",
        "Opțiuni largi de aprovizionare pentru casă, birou, spații comerciale și produse de mobilier bazate pe proiecte."
      ],
      [
        "Automobile",
        "Piese de schimb pentru automobile, echipamente, accesorii și grupuri de produse specifice sectorului."
      ],
      [
        "Plastic & cauciuc",
        "Produse din plastic, materiale din cauciuc, piese tehnice și grupe de produse industriale."
      ],
      [
        "Ambalare",
        "Produse de ambalare și soluții de ambalare pentru sectoarele alimentar, textil, industrial și de retail."
      ],
      [
        "Cosmetice",
        "Produse cosmetice, produse de îngrijire personală, produse de igienă și grupe de produse aferente."
      ],
      [
        "Produse de curatenie",
        "Produse de curățare industrială, materiale de igienă, consumabile și produse de uz corporativ."
      ],
      [
        "Produse agricole",
        "Produse agricole, materii prime alimentare și soluții comerciale pentru sectorul agricol."
      ],
      [
        "Produse medicale",
        "Suport de aprovizionare cu produse pentru instituțiile de sănătate și companiile de furnizare medicală."
      ],
      [
        "Materii prime",
        "Grupuri de materii prime necesare în procesele de producție din diferite sectoare."
      ],
      [
        "Produse pentru constructii",
        "Grupe de produse complementare utilizate în construcții, decorațiuni și proiecte de construcții."
      ],
      [
        "Comerț sprijinit de logistică",
        "Suport de coordonare pentru etapele de expediere, livrare și urmărire operațională."
      ],
      [
        "Soluții generale de aprovizionare",
        "Soluții de cercetare și aprovizionare pentru cereri speciale de produse dincolo de o singură categorie."
      ]
    ],
    "aboutIntroTitle": "Despre noi",
    "aboutIntroText": "Dynamic Era Export este o companie comercială care operează în comerțul intern și exterior cu un portofoliu larg de produse, relații puternice cu furnizorii și o abordare orientată spre soluții.\n\nEa dezvoltă soluții de aprovizionare potrivite nevoilor clienților în energie, materiale de construcții, textile, alimente, sănătate, industria de apărare și diferite categorii comerciale. Scopul nostru nu este doar să oferim produse, ci să oferim clienților noștri o experiență comercială de încredere, durabilă și eficientă.\n\nCu rețeaua noastră sectorială largă, structura operațională flexibilă și abordarea de servicii orientată către client, ne poziționăm ca un partener de afaceri puternic în procesele de import și export ale companiilor.",
    "aboutMore": "Mai multe informații despre noi",
    "homeAboutTitle": "Transformăm nevoile de aprovizionare în modelul comercial potrivit.",
    "homeAboutText": "În domeniul energiei, textilelor, alimentației, sănătății și în multe alte sectoare, gestionăm cercetarea produselor, compararea furnizorilor, cotația și urmărirea operațională dintr-un singur loc. Vă clarificăm cererea, găsim sursa potrivită și menținem procesul în mișcare printr-o comunicare transparentă.",
    "homeAboutValues": [
      "Aprovizionare specifică cererii",
      "Rețea de produse sectorială",
      "Urmărire transparentă a operațiunii"
    ],
    "homeAboutButton": "Explorați modelul nostru de lucru",
    "aboutText": "Succesul în comerțul global depinde de obținerea produsului potrivit, la momentul potrivit și în condițiile potrivite. Analizăm nevoile clienților noștri, identificăm canalele de aprovizionare potrivite pentru sector și cerere și gestionăm procesul comercial în mod fiabil.",
    "aboutSupport": "La Dynamic Era Export, mergem dincolo de găsirea de produse și gestionăm fiecare pas al comerțului cu încredere, transparență și rapiditate.",
    "aboutFlowTitle": "Comerțul bazat pe încredere, viteză și transparență",
    "aboutFlowText1": "Încă din prima zi, obiectivul nostru principal a fost să conectăm clienții cu canalele de aprovizionare potrivite, să gestionăm procesele de import și export în mod fiabil și să devenim un partener de afaceri care creează valoare în fiecare etapă a comerțului.",
    "aboutFlowText2": "În peisajul comercial global de astăzi, companiile așteaptă mai mult decât un produs: un furnizor de încredere, prețuri corecte, relații de afaceri durabile, urmărire operațională și comunicare rapidă. La Dynamic Era Export, adoptăm o abordare comercială holistică care ia în considerare toate aceste nevoi.",
    "aboutPillars": [
      [
        "Viziunea noastră",
        "Pentru a deveni un brand comercial puternic, cunoscut pentru fiabilitate, rapiditate și gândire axată pe soluții în comerțul global, oferind în același timp soluții de aprovizionare durabile în diferite sectoare."
      ],
      [
        "Misiunea noastră",
        "Să analizăm corect nevoile de import, export și aprovizionare ale clienților noștri și să oferim cele mai potrivite soluții comerciale cu produse de calitate, surse de încredere, prețuri competitive și suport operațional profesional."
      ],
      [
        "Abordarea noastră",
        "Vedem fiecare colaborare ca pe o relație comercială pe termen lung și ne concentrăm nu numai pe cererile curente de produse, ci și pe nevoile viitoare ale clienților noștri."
      ]
    ],
    "aboutOperationsEyebrow": "Ce facem",
    "aboutOperationsTitle": "Oferim suport end-to-end în procesele de import, export și aprovizionare.",
    "aboutOperations": [
      [
        null,
        "Suport pentru import și export",
        "Oferim suport comercial in procesele de import si export."
      ],
      [
        null,
        "Cercetare de produse și furnizori",
        "Cercetăm produse și furnizori pentru diferite sectoare."
      ],
      [
        null,
        "Grupuri de produse potrivite la cerere",
        "Identificăm grupuri de produse potrivite în funcție de cererea clienților."
      ],
      [
        null,
        "Conexiuni cu furnizorii",
        "Ne conectăm cu furnizori locali și internaționali."
      ],
      [
        null,
        "Citate și operațiuni",
        "Gestionăm ofertele, prețurile și procesele operaționale."
      ],
      [
        null,
        "Aprovizionare durabilă",
        "Oferim soluții de aprovizionare durabilă pentru categorii largi de produse."
      ]
    ],
    "aboutValuesEyebrow": "Valorile noastre",
    "aboutValuesTitle": "Credem că încrederea, viteza, flexibilitatea și o perspectivă globală sunt temelia comerțului.",
    "aboutValues": [
      [
        "Fiabilitate",
        "Adoptăm o abordare transparentă, responsabilă și durabilă în toate procesele de afaceri."
      ],
      [
        "Viteză",
        "Răspundem rapid la solicitările clienților, planificăm eficient procesul și urmărim îndeaproape fluxul operațional."
      ],
      [
        "Flexibilitate",
        "În loc de modele fixe, creăm soluții specifice proiectului, specifice produsului și specifice cererii."
      ],
      [
        "Perspectivă globală",
        "Evaluând diferite piețe, grupuri de produse și surse de aprovizionare, oferim opțiuni mai largi."
      ]
    ],
    "aboutCtaEyebrow": "Lucrul cu Dynamic Era Export",
    "aboutCtaTitle": "Să vă facem procesul comercial mai sigur, mai rapid și mai eficient.",
    "aboutCtaText": "Indiferent dacă sunteți în căutarea unui anumit grup de produse sau aveți nevoie de asistență profesională pentru procesele de import-export, echipa noastră este pregătită să construiască soluția potrivită pentru dvs.",
    "aboutCtaPrimary": "Contactați prin WhatsApp",
    "aboutCtaEmail": "Contactați prin e-mail",
    "aboutCtaSecondary": "Pagina de contact",
    "values": [
      "Rețea largă de produse și sector",
      "Proces comercial de încredere",
      "Soluții flexibile și rapide",
      "Experiență în comerț internațional"
    ],
    "contactTitle": "Contact",
    "contactLead": "Indiferent de produsul, țara țintă sau categoria pe care o căutați, putem începe cu un mesaj scurt.",
    "form": {
      "configTitle": "Serviciul de formulare nu este configurat",
      "configText": "O cheie de acces Web3Forms trebuie adăugată înainte ca mesajele să poată fi trimise. Ne puteți contacta între timp prin WhatsApp.",
      "successTitle": "Mesajul dvs. a fost trimis cu succes",
      "successText": "Multumesc. Vă vom reveni cât mai curând posibil.",
      "errorTitle": "Mesajul nu a putut fi trimis",
      "errorText": "Vă rugăm să încercați din nou în scurt timp sau să ne contactați prin WhatsApp.",
      "rateTitle": "Vă rugăm să așteptați un moment",
      "rateText": "Pentru protecția împotriva spamului, puteți trimite doar un mesaj pe minut."
    },
    "partnersTitle": "Ecosistemul comercial global",
    "importantLinksTitle": "Legături importante",
    "footerWhatsappTitle": "Contactați-ne pe WhatsApp",
    "footerWhatsappText": "Contactați-ne direct pentru cererea dvs. de produs, sector sau aprovizionare.",
    "footer": "Comunicare clară în operațiunile de import, export și aprovizionare globală.",
    "copyright": "© Copyright 2026 Dynamic Era Export. Toate drepturile rezervate."
  },
  "bg": {
    "quoteCta": "Получете оферта",
    "homeBadge": "Глобална търговия, динамични решения",
    "homeText": "От енергетиката до строителните материали, от текстила до храните, от здравеопазването до отбранителната индустрия, ние създаваме стойност за нашите клиенти с правилния продукт, правилния доставчик и правилния търговски модел.\n\nС 20+ години търговски опит, 1500+ клиенти и силна мрежа за доставки в над 20 сектора, ние сме динамичната сила на световната търговия.",
    "quoteTitle": "Ние сме с вас на всеки етап от търговията",
    "quoteText": "От проучване на продукта и снабдяване до планиране на ценообразуване и логистика, ние предоставяме поддръжка от край до край.",
    "trustTitle": "Ние сме с вас на всеки етап от търговията",
    "trustText": "От проучване на продукта и снабдяване до ценообразуване и логистично планиране, ние предоставяме цялостна поддръжка при операциите по внос и износ.",
    "servicesLead": "Ние предоставяме търговската инфраструктура, мрежата за доставки и оперативната поддръжка на компаниите, от които се нуждаят в процесите на внос и износ под един покрив.",
    "services": [
      [
        "Снабдяване с продукти",
        "Ние проучваме продукти чрез нашата местна и международна мрежа за доставки и ви свързваме с подходящи доставчици."
      ],
      [
        "Процеси на импортиране",
        "За продукти, доставени от чужбина, ние поддържаме снабдяване, документация и логистична координация."
      ],
      [
        "Експортиране на решения",
        "Ние създаваме продуктови, пазарни и оперативни решения за компании, които искат да изнасят от Турция на различни пазари."
      ],
      [
        "Проучване на доставчици",
        "Ние предлагаме подходящи доставчици на база качество, капацитет, ценови баланс и условия на доставка."
      ],
      [
        "Оферти и цени",
        "Изготвяме конкурентни и сравними опции за оферти за заявените продуктови групи."
      ],
      [
        "Логистика и проследяване на операциите",
        "Ние осигуряваме редовна поддръжка по време на процесите на доставка, изпращане и последващи операции."
      ]
    ],
    "processTitle": "Ние анализираме търсенето, намираме правилния източник и проследяваме операцията.",
    "processLead": "Всеки сектор има различни очаквания за качество, доставка, цена и съответствие; следователно ние изграждаме търговски модел, специфичен за търсенето, а не стандартен процес.",
    "processSteps": [
      [
        null,
        "Анализ на търсенето",
        "Изясняват се продуктова група, целеви пазар, количество, очакване за качество и план за доставка."
      ],
      [
        null,
        "Източник на доставка",
        "Проучват се подходящи доставчици и се сравняват цени и възможности за работа."
      ],
      [
        null,
        "Търговска операция",
        "Процесите на оферти, документация, логистика и доставка се следват с прозрачна комуникация."
      ]
    ],
    "ctaTitle": "Нека заедно укрепим вашия търговски процес.",
    "ctaText": "Свържете се с нас за продукта, доставчика или решението за внос-износ, от което се нуждаете. Нека изградим най-подходящия търговски модел за вас.",
    "hero": [
      {
        "eyebrow": "Глобална търговия, динамични решения",
        "title": "Динамична търговска сила, отваряща се към света.",
        "text": "Dynamic Era Export доставя продукти от различни сектори на международните пазари с надеждни, бързи и професионални решения за износ."
      },
      {
        "eyebrow": "Широк сектор и продуктова мрежа",
        "title": "Разнообразни търговски решения от енергия до храна, текстил до здравеопазване.",
        "text": "Ние професионално управляваме процесите на проучване на продукта, снабдяване, ценообразуване и работа според търсенето на клиентите."
      },
      {
        "eyebrow": "20+ години търговски опит",
        "title": "Ускорете процеса си с динамичната сила на глобалната търговия.",
        "text": "С над 1500 клиенти и широка секторна мрежа ние предлагаме бързи, гъвкави и устойчиви търговски решения."
      }
    ],
    "metrics": [
      [
        null,
        "години трудов стаж"
      ],
      [
        null,
        "клиенти"
      ],
      [
        null,
        "бизнес области"
      ],
      [
        null,
        "търговска подкрепа"
      ]
    ],
    "categoryTitle": "Представени бизнес области",
    "categoryLead": "Dynamic Era Export има широка търговска мрежа в групи продукти и материали, необходими на различни сектори.",
    "allCategoriesCta": "Вижте всички бизнес области",
    "categories": {
      "energy": [
        "енергия",
        "Оборудване, инфраструктурни продукти, електрически материали и поддържащи продукти за възобновяема енергия."
      ],
      "construction": [
        "Строителни материали",
        "Строителни материали, инфраструктурни продукти, механично оборудване и нужди, базирани на проекти."
      ],
      "textile": [
        "Текстил",
        "Платове, конфекция, работно облекло, технически текстил и различни групи текстил."
      ],
      "food": [
        "храна",
        "Основни хранителни продукти, пакетирани храни, селскостопански продукти и надеждни търговски решения."
      ],
      "health": [
        "здраве",
        "Медицински продукти, консумативи, здравно оборудване и специфични за сектора решения за доставки."
      ],
      "defense": [
        "Отбранителна индустрия",
        "Професионални процеси на доставка със съответствие, поверителност и оперативна дисциплина."
      ]
    },
    "categoryDetails": {
      "energy": {
        "title": "енергия",
        "text": "За енергийния сектор ние предоставяме решения за снабдяване с различни продуктови групи, особено оборудване, инфраструктурни продукти, електрически материали и продукти за поддръжка на възобновяема енергия.",
        "points": [
          "Енергийно оборудване",
          "Електрически материали",
          "Проектно базирано снабдяване"
        ]
      },
      "construction": {
        "title": "Строителни материали",
        "text": "Ние предоставяме услуги за снабдяване със строителни материали, инфраструктурни продукти, механично оборудване, допълнителни строителни продукти и нужди, базирани на проекти.",
        "points": [
          "Строителни и инфраструктурни продукти",
          "Механично оборудване",
          "Базирани на проекта нужди"
        ]
      },
      "textile": {
        "title": "Текстил",
        "text": "Ние предлагаме вътрешни и международни търговски решения за платове, конфекция, работно облекло, технически текстилни продукти и различни текстилни групи.",
        "points": [
          "Плат и конфекция",
          "Работно облекло",
          "Изделия от технически текстил"
        ]
      },
      "food": {
        "title": "храна",
        "text": "Ние разработваме надеждни решения за снабдяване и търговия с основни хранителни продукти, пакетирани храни, селскостопански продукти и различни категории храни.",
        "points": [
          "Основна храна",
          "Пакетирани продукти",
          "Селскостопански продукти"
        ]
      },
      "health": {
        "title": "здраве",
        "text": "Ние предлагаме решения за снабдяване с медицински продукти, консумативи, здравно оборудване и специфични за сектора нужди.",
        "points": [
          "Медицински продукти",
          "Консумативи",
          "Здравно оборудване"
        ]
      },
      "defense": {
        "title": "Отбранителна индустрия",
        "text": "В отбранителната индустрия ние разработваме професионални решения за специфични за сектора процеси на доставка с принципи на съответствие, поверителност и оперативна дисциплина.",
        "points": [
          "Съответствие",
          "Конфиденциалност и дисциплина",
          "Специфично за сектора предлагане"
        ]
      }
    },
    "categoryPageLead": "Във всички наши бизнес области ние разработваме продукти и решения за снабдяване според търсенето на клиентите.",
    "categoryScrollHint": "Превъртете списъка, за да видите всички сектори",
    "categoryCustomCtaTitle": "Свържете се с нас за групи продукти, които не са изброени тук.",
    "categoryCustomCtaText": "Ако не виждате продуктовата група, от която се нуждаете, в списъка, свържете се с нас. Dynamic Era Export може да проучи подходящи опции за снабдяване за вашите специални заявки в различни сектори.",
    "allSectorsLead": "Dynamic Era Export предлага всеобхватни търговски решения за нуждите от продукти и снабдяване в различни сектори.",
    "allSectors": [
      [
        "енергия",
        "Оборудване, инфраструктурни продукти, електрически материали и поддържащи продукти за възобновяема енергия."
      ],
      [
        "Строителни материали",
        "Строителни материали, инфраструктурни продукти, механично оборудване и нужди, базирани на проекти."
      ],
      [
        "Текстил",
        "Платове, конфекция, работно облекло, изделия от технически текстил и различни групи текстил."
      ],
      [
        "храна",
        "Основни хранителни продукти, пакетирани храни, селскостопански продукти и надеждни търговски решения."
      ],
      [
        "здраве",
        "Медицински продукти, консумативи, здравно оборудване и специфични за сектора решения за снабдяване."
      ],
      [
        "Отбранителна индустрия",
        "Професионални процеси за снабдяване със съответствие, поверителност и оперативна дисциплина."
      ],
      [
        "Електротехника и електроника",
        "Електрически материали, електронни продукти, свързващо оборудване и осветителни продукти."
      ],
      [
        "Машини и оборудване",
        "Необходимост от промишлени машини, производствено оборудване, резервни части и техническо оборудване."
      ],
      [
        "Мебели",
        "Широки възможности за снабдяване с мебелни продукти за дома, офиса, търговските площи и проекти."
      ],
      [
        "Автомобилна",
        "Автомобилни резервни части, оборудване, аксесоари и специфични за сектора продуктови групи."
      ],
      [
        "Пластмаса и каучук",
        "Пластмасови изделия, каучукови материали, технически части и индустриални продуктови групи."
      ],
      [
        "Опаковка",
        "Опаковъчни продукти и опаковъчни решения за хранителния, текстилния, индустриалния и търговския сектор."
      ],
      [
        "Козметика",
        "Козметични продукти, продукти за лична хигиена, хигиенни продукти и свързани продуктови групи."
      ],
      [
        "Почистващи продукти",
        "Индустриални почистващи продукти, хигиенни материали, консумативи и продукти за корпоративна употреба."
      ],
      [
        "Селскостопански продукти",
        "Земеделски продукти, хранителни суровини и търговски решения за сектора на селското стопанство."
      ],
      [
        "Медицински продукти",
        "Подкрепа за снабдяване с продукти за здравни институции и компании за медицински доставки."
      ],
      [
        "Суровини",
        "Групи суровини, необходими в производствените процеси на различни сектори."
      ],
      [
        "Строителни продукти",
        "Допълнителни групи продукти, използвани в строителството, декорацията и строителните проекти."
      ],
      [
        "Логистично поддържана търговия",
        "Координационна поддръжка за етапите на изпращане, доставка и оперативно проследяване."
      ],
      [
        "Общи решения за снабдяване",
        "Проучване и намиране на решения за специални заявки за продукти извън една категория."
      ]
    ],
    "aboutIntroTitle": "За нас",
    "aboutIntroText": "Dynamic Era Export е търговска компания, работеща във вътрешната и външната търговия с широко продуктово портфолио, силни връзки с доставчици и подход, ориентиран към решения.\n\nТой разработва решения за снабдяване, подходящи за нуждите на клиентите в енергетиката, строителните материали, текстила, храните, здравеопазването, отбранителната промишленост и различни търговски категории. Нашата цел е не само да предоставяме продукти, но и да предлагаме на нашите клиенти надеждно, устойчиво и ефективно търговско изживяване.\n\nС нашата широка секторна мрежа, гъвкава оперативна структура и подход, ориентиран към клиента, ние се позиционираме като силен бизнес партньор в процесите на внос и износ на компаниите.",
    "aboutMore": "Повече информация за нас",
    "homeAboutTitle": "Превръщаме нуждите от снабдяване в правилния търговски модел.",
    "homeAboutText": "В енергетиката, текстила, храните, здравеопазването и много други сектори, ние управляваме проучване на продукти, сравнение на доставчици, котировки и оперативно проследяване от едно място. Ние изясняваме вашето търсене, намираме правилния източник и поддържаме процеса с прозрачна комуникация.",
    "homeAboutValues": [
      "Снабдяване според търсенето",
      "Секторна продуктова мрежа",
      "Прозрачно проследяване на операцията"
    ],
    "homeAboutButton": "Разгледайте нашия работен модел",
    "aboutText": "Успехът в глобалната търговия зависи от достигането до правилния продукт, в точното време и при правилните условия. Ние анализираме нуждите на нашите клиенти, идентифицираме канали за снабдяване, подходящи за сектора и търсенето, и управляваме надеждно търговския процес.",
    "aboutSupport": "В Dynamic Era Export надхвърляме намирането на продукти и управляваме всяка стъпка от търговията с доверие, прозрачност и бързина.",
    "aboutFlowTitle": "Търговия, изградена на доверие, бързина и прозрачност",
    "aboutFlowText1": "От първия ден нашата основна цел е да свържем клиентите с правилните канали за снабдяване, да управляваме надеждно процесите на внос и износ и да станем бизнес партньор, който създава стойност на всеки етап от търговията.",
    "aboutFlowText2": "В днешния глобален търговски пейзаж компаниите очакват повече от продукт: надежден доставчик, правилно ценообразуване, устойчиви бизнес отношения, оперативно проследяване и бърза комуникация. В Dynamic Era Export възприемаме холистичен търговски подход, който взема предвид всички тези нужди.",
    "aboutPillars": [
      [
        "Нашата визия",
        "Да станем силна търговска марка, известна с надеждност, бързина и фокусирано върху решения мислене в глобалната търговия, като същевременно предлагаме устойчиви решения за снабдяване в различни сектори."
      ],
      [
        "Нашата мисия",
        "Да анализираме правилно нуждите от внос, износ и снабдяване на нашите клиенти и да предоставим най-подходящите търговски решения с качествени продукти, надеждни източници, конкурентни цени и професионална оперативна поддръжка."
      ],
      [
        "Нашият подход",
        "Ние гледаме на всяко сътрудничество като на дългосрочни търговски взаимоотношения и се фокусираме не само върху настоящите заявки за продукти, но и върху бъдещите нужди на нашите клиенти."
      ]
    ],
    "aboutOperationsEyebrow": "Какво правим",
    "aboutOperationsTitle": "Ние предоставяме поддръжка от край до край в процесите на импортиране, експортиране и снабдяване.",
    "aboutOperations": [
      [
        null,
        "Поддръжка за импортиране и експортиране",
        "Ние предоставяме търговска подкрепа в процесите на внос и износ."
      ],
      [
        null,
        "Проучване на продукти и доставчици",
        "Ние проучваме продукти и доставчици за различни сектори."
      ],
      [
        null,
        "Продуктови групи, отговарящи на търсенето",
        "Ние идентифицираме подходящи продуктови групи въз основа на търсенето на клиентите."
      ],
      [
        null,
        "Връзки с доставчици",
        "Свързваме се с местни и международни доставчици."
      ],
      [
        null,
        "Котировки и операции",
        "Ние управляваме оферти, цени и оперативни процеси."
      ],
      [
        null,
        "Устойчиво снабдяване",
        "Ние предлагаме решения за устойчиво снабдяване в широки продуктови категории."
      ]
    ],
    "aboutValuesEyebrow": "Нашите ценности",
    "aboutValuesTitle": "Вярваме, че доверието, бързината, гъвкавостта и глобалната перспектива са в основата на търговията.",
    "aboutValues": [
      [
        "Надеждност",
        "Ние възприемаме прозрачен, отговорен и устойчив подход във всички бизнес процеси."
      ],
      [
        "Скорост",
        "Ние реагираме бързо на заявките на клиентите, планираме ефективно процеса и проследяваме отблизо оперативния поток."
      ],
      [
        "Гъвкавост",
        "Вместо фиксирани модели, ние създаваме специфични за проекта, продукта и търсенето решения."
      ],
      [
        "Глобална перспектива",
        "Като оценяваме различни пазари, продуктови групи и източници на доставки, ние предлагаме по-широки възможности."
      ]
    ],
    "aboutCtaEyebrow": "Работа с Dynamic Era Export",
    "aboutCtaTitle": "Нека направим вашия търговски процес по-безопасен, по-бърз и по-ефективен.",
    "aboutCtaText": "Независимо дали търсите конкретна продуктова група или се нуждаете от професионална поддръжка за импортно-износни процеси, нашият екип е готов да изгради правилното решение за вас.",
    "aboutCtaPrimary": "Свържете се чрез WhatsApp",
    "aboutCtaEmail": "Свържете се чрез имейл",
    "aboutCtaSecondary": "Страница за контакт",
    "values": [
      "Широка продуктова и секторна мрежа",
      "Надежден търговски процес",
      "Гъвкави и бързи решения",
      "Опит в международната търговия"
    ],
    "contactLead": "Какъвто и продукт, целева страна или категория да търсите, можем да започнем с кратко съобщение.",
    "form": {
      "configTitle": "Услугата за формуляри не е конфигурирана",
      "configText": "Трябва да се добави ключ за достъп Web3Forms, преди да могат да се изпращат съобщения. Междувременно можете да се свържете с нас чрез WhatsApp.",
      "successTitle": "Вашето съобщение беше изпратено успешно",
      "successText": "благодаря Ние ще се свържем с вас възможно най-скоро.",
      "errorTitle": "Съобщението не можа да бъде изпратено",
      "errorText": "Моля, опитайте отново скоро или се свържете с нас чрез WhatsApp.",
      "rateTitle": "Моля, изчакайте малко",
      "rateText": "За защита от спам можете да изпращате само едно съобщение на минута."
    },
    "partnersTitle": "Глобална търговска екосистема",
    "importantLinksTitle": "Важни връзки",
    "footerWhatsappTitle": "Свържете се с нас на WhatsApp",
    "footerWhatsappText": "Свържете се директно с нас за вашия продукт, сектор или заявка за снабдяване.",
    "footer": "Ясна комуникация при операции по внос, износ и глобални доставки.",
    "copyright": "© Copyright 2026 Dynamic Era Export. Всички права запазени."
  },
  "az": {
    "quoteCta": "Sitat əldə edin",
    "homeBadge": "Qlobal Ticarət, Dinamik Həllər",
    "homeText": "Enerjidən tikinti materiallarına, tekstildən qidaya, sağlamlıqdan müdafiə sənayesinə qədər biz müştərilərimiz üçün doğru məhsul, düzgün təchizatçı və düzgün ticarət modeli ilə dəyər yaradırıq.\n\n20+ illik kommersiya təcrübəsi, 1500+ müştəri və 20+ sektorda güclü təchizat şəbəkəsi ilə biz qlobal ticarətin dinamik gücüyük.",
    "quoteTitle": "Ticarətin Hər Mərhələsində Sizinləyik",
    "quoteText": "Məhsulun tədqiqi və tədarükdən tutmuş qiymət və logistika planlaşdırılmasına qədər biz hərtərəfli dəstək veririk.",
    "trustTitle": "Ticarətin Hər Mərhələsində Sizinləyik",
    "trustText": "Məhsulun tədqiqi və tədarükdən tutmuş qiymət və logistika planlaşdırılmasına qədər biz idxal və ixrac əməliyyatlarında hərtərəfli dəstək veririk.",
    "servicesLead": "Biz idxal və ixrac proseslərində ehtiyac duyulan kommersiya infrastrukturunu, təchizat şəbəkəsini və əməliyyat dəstəyini bir dam altında təmin edirik.",
    "services": [
      [
        "Məhsulların Təminatı",
        "Biz yerli və beynəlxalq təchizat şəbəkəmiz vasitəsilə məhsulları araşdırır və sizi uyğun təchizatçılarla əlaqələndiririk."
      ],
      [
        "İdxal Prosesləri",
        "Xaricdən gətirilən məhsullar üçün mənbə, sənədləşdirmə və logistika koordinasiyasını dəstəkləyirik."
      ],
      [
        "İxrac Həlləri",
        "Türkiyədən müxtəlif bazarlara ixrac etmək istəyən şirkətlər üçün məhsul, bazar və əməliyyat həlləri yaradırıq."
      ],
      [
        "Təchizatçı Araşdırması",
        "Biz keyfiyyət, tutum, qiymət balansı və çatdırılma şərtlərinə əsaslanan uyğun təchizat variantları təklif edirik."
      ],
      [
        "Kotirovka və Qiymətləndirmə",
        "Biz tələb olunan məhsul qrupları üçün rəqabətli və müqayisə edilə bilən kotirovka variantları hazırlayırıq."
      ],
      [
        "Logistika və Əməliyyat İzləmə",
        "Çatdırılma, daşınma və əməliyyat təqibi proseslərində müntəzəm dəstək veririk."
      ]
    ],
    "processTitle": "Tələbi təhlil edirik, düzgün mənbəni tapırıq və əməliyyatı izləyirik.",
    "processLead": "Hər sektorun keyfiyyət, çatdırılma, qiymət və uyğunluq üçün fərqli gözləntiləri var; buna görə də biz standart prosesdən daha çox tələbə uyğun ticarət modeli qururuq.",
    "processSteps": [
      [
        null,
        "Tələb Analizi",
        "Məhsul qrupu, hədəf bazar, kəmiyyət, keyfiyyət gözləntiləri və çatdırılma planı aydınlaşdırılır."
      ],
      [
        null,
        "Təchizat Mənbəsi",
        "Uyğun təchizatçılar araşdırılır, qiymət və əməliyyat variantları müqayisə edilir."
      ],
      [
        null,
        "Ticarət əməliyyatı",
        "Kotirovka, sənədləşdirmə, logistika və çatdırılma prosesləri şəffaf ünsiyyətlə izlənilir."
      ]
    ],
    "ctaTitle": "Gəlin ticarət prosesinizi birlikdə gücləndirək.",
    "ctaText": "Ehtiyacınız olan məhsul, təchizatçı və ya idxal-ixrac həlli üçün bizimlə əlaqə saxlayın. Gəlin sizin üçün ən uyğun ticarət modelini quraq.",
    "hero": [
      {
        "eyebrow": "Qlobal Ticarət, Dinamik Həllər",
        "title": "Dünyaya açılan dinamik ticarət gücü.",
        "text": "Dynamic Era Export etibarlı, sürətli və peşəkar ixrac həlləri ilə müxtəlif sektorlardan məhsulları beynəlxalq bazarlara çatdırır."
      },
      {
        "eyebrow": "Geniş sektor və məhsul şəbəkəsi",
        "title": "Enerjidən qidaya, tekstildən sağlamlığa qədər çox yönlü ticarət həlləri.",
        "text": "Biz müştərilərin tələbinə uyğun olaraq məhsul araşdırması, satınalma, qiymət və əməliyyat proseslərini peşəkar şəkildə idarə edirik."
      },
      {
        "eyebrow": "20+ illik kommersiya təcrübəsi",
        "title": "Qlobal ticarətin dinamik gücü ilə prosesinizi sürətləndirin.",
        "text": "1500+ müştəri və geniş sektor şəbəkəsi ilə biz sürətli, çevik və davamlı ticarət həlləri təklif edirik."
      }
    ],
    "metrics": [
      [
        null,
        "xidmət illəri"
      ],
      [
        null,
        "müştərilər"
      ],
      [
        null,
        "biznes sahələri"
      ],
      [
        null,
        "ticarət dəstəyi"
      ]
    ],
    "categoryTitle": "Seçilmiş Biznes Sahələri",
    "categoryLead": "Dynamic Era Export müxtəlif sektorların ehtiyac duyduğu məhsul və material qrupları arasında geniş ticarət şəbəkəsinə malikdir.",
    "allCategoriesCta": "Bütün Biznes Sahələrinə Baxın",
    "categories": {
      "energy": [
        "Enerji",
        "Avadanlıq, infrastruktur məhsulları, elektrik materialları və bərpa olunan enerjiyə dəstək məhsulları."
      ],
      "construction": [
        "Tikinti materialları",
        "Tikinti materialları, infrastruktur məhsulları, mexaniki avadanlıq və layihə əsaslı ehtiyaclar."
      ],
      "textile": [
        "Tekstil",
        "Parça, hazır geyim, iş geyimi, texniki tekstil və müxtəlif tekstil qrupları."
      ],
      "food": [
        "Qida",
        "Əsas ərzaq məhsulları, qablaşdırılmış qidalar, kənd təsərrüfatı məhsulları və etibarlı ticarət həlləri."
      ],
      "health": [
        "Sağlamlıq",
        "Tibbi məhsullar, istehlak materialları, səhiyyə avadanlığı və sektora aid təchizat həlləri."
      ],
      "defense": [
        "Müdafiə Sənayesi",
        "Uyğunluq, məxfilik və əməliyyat intizamı ilə peşəkar təchizat prosesləri."
      ]
    },
    "categoryDetails": {
      "energy": {
        "title": "Enerji",
        "text": "Enerji sektoru üçün biz müxtəlif məhsul qrupları, xüsusən də avadanlıq, infrastruktur məhsulları, elektrik materialları və bərpa olunan enerji dəstəyi məhsulları üzrə mənbə həlləri təqdim edirik.",
        "points": [
          "Enerji avadanlıqları",
          "Elektrik materialları",
          "Layihə əsaslı mənbə"
        ]
      },
      "construction": {
        "title": "Tikinti materialları",
        "text": "Biz tikinti materialları, infrastruktur məhsulları, mexaniki avadanlıqlar, tamamlayıcı tikinti məhsulları və layihə əsaslı ehtiyaclar üçün satınalma xidmətləri təqdim edirik.",
        "points": [
          "Bina və infrastruktur məhsulları",
          "Mexanik avadanlıq",
          "Layihə əsaslı ehtiyaclar"
        ]
      },
      "textile": {
        "title": "Tekstil",
        "text": "Parça, hazır geyim, iş geyimləri, texniki tekstil məhsulları və müxtəlif tekstil qrupları üçün yerli və beynəlxalq ticarət həlləri təklif edirik.",
        "points": [
          "Parça və hazır geyim",
          "İş paltarı",
          "Texniki tekstil məhsulları"
        ]
      },
      "food": {
        "title": "Qida",
        "text": "Biz əsas ərzaq məhsulları, qablaşdırılmış qidalar, kənd təsərrüfatı məhsulları və müxtəlif qida kateqoriyaları üçün etibarlı tədarük və ticarət həlləri hazırlayırıq.",
        "points": [
          "Əsas qida",
          "Qablaşdırılmış məhsullar",
          "Kənd təsərrüfatı məhsulları"
        ]
      },
      "health": {
        "title": "Sağlamlıq",
        "text": "Biz tibbi məhsullar, istehlak materialları, səhiyyə avadanlığı və sektora aid ehtiyaclar üçün qaynaq həlləri təqdim edirik.",
        "points": [
          "Tibbi məhsullar",
          "İstehlak materialları",
          "Səhiyyə avadanlıqları"
        ]
      },
      "defense": {
        "title": "Müdafiə Sənayesi",
        "text": "Müdafiə sənayesində biz uyğunluq, məxfilik və əməliyyat intizamı prinsipləri ilə sektora xas təchizat prosesləri üçün peşəkar həllər hazırlayırıq.",
        "points": [
          "Uyğunluq",
          "Məxfilik və nizam-intizam",
          "Sektora uyğun təchizat"
        ]
      }
    },
    "categoryPageLead": "Bütün iş sahələrimizdə biz müştəri tələblərinə uyğun məhsul və tədarük həlləri inkişaf etdiririk.",
    "categoryScrollHint": "Bütün sektorlara baxmaq üçün siyahını sürüşdürün",
    "categoryCustomCtaTitle": "Burada qeyd olunmayan məhsul qrupları üçün bizimlə əlaqə saxlayın.",
    "categoryCustomCtaText": "Siyahıda sizə lazım olan məhsul qrupunu görə bilmirsinizsə, bizimlə əlaqə saxlayın. Dynamic Era Export müxtəlif sektorlar üzrə xüsusi sorğularınız üçün uyğun mənbə variantlarını araşdıra bilər.",
    "allSectorsLead": "Dynamic Era Export müxtəlif sektorlar üzrə məhsul və tədarük ehtiyacları üçün hərtərəfli ticarət həlləri təklif edir.",
    "allSectors": [
      [
        "Enerji",
        "Avadanlıq, infrastruktur məhsulları, elektrik materialları və bərpa olunan enerjiyə dəstək məhsulları."
      ],
      [
        "Tikinti materialları",
        "Tikinti materialları, infrastruktur məhsulları, mexaniki avadanlıq və layihə əsaslı ehtiyaclar."
      ],
      [
        "Tekstil",
        "Parça, hazır geyim, iş geyimləri, texniki tekstil məhsulları və müxtəlif tekstil qrupları."
      ],
      [
        "Qida",
        "Əsas ərzaq məhsulları, qablaşdırılmış qidalar, kənd təsərrüfatı məhsulları və etibarlı ticarət həlləri."
      ],
      [
        "Sağlamlıq",
        "Tibbi məhsullar, istehlak materialları, səhiyyə avadanlığı və sektora xas mənbə həlləri."
      ],
      [
        "Müdafiə Sənayesi",
        "Uyğunluq, məxfilik və əməliyyat intizamı ilə peşəkar qaynaq prosesləri."
      ],
      [
        "Elektrik və Elektronika",
        "Elektrik materialları, elektron məhsullar, qoşulma avadanlıqları və işıqlandırma məhsulları."
      ],
      [
        "Maşın və Avadanlıq",
        "Sənaye maşınları, istehsal avadanlıqları, ehtiyat hissələri və texniki avadanlıqlara ehtiyac."
      ],
      [
        "Mebel",
        "Ev, ofis, ticarət sahəsi və layihə əsaslı mebel məhsulları üçün geniş seçim variantları."
      ],
      [
        "Avtomobil",
        "Avtomobil ehtiyat hissələri, avadanlıq, aksesuarlar və sektora aid məhsul qrupları."
      ],
      [
        "Plastik və Kauçuk",
        "Plastik məhsullar, rezin materiallar, texniki hissələr və sənaye məhsul qrupları."
      ],
      [
        "Qablaşdırma",
        "Qida, tekstil, sənaye və pərakəndə sektorlar üçün qablaşdırma məhsulları və qablaşdırma həlləri."
      ],
      [
        "Kosmetika",
        "Kosmetik məhsullar, şəxsi qulluq məhsulları, gigiyena məhsulları və əlaqəli məhsul qrupları."
      ],
      [
        "Təmizləyici Məhsullar",
        "Sənaye təmizlik məhsulları, gigiyena materialları, istehlak materialları və korporativ istifadə məhsulları."
      ],
      [
        "Kənd Təsərrüfatı Məhsulları",
        "Kənd təsərrüfatı məhsulları, ərzaq xammalı və kənd təsərrüfatı sektoru üçün ticarət həlləri."
      ],
      [
        "Tibbi Məhsullar",
        "Səhiyyə müəssisələri və tibbi təchizat şirkətləri üçün məhsul tədarükü dəstəyi."
      ],
      [
        "Xammal",
        "Müxtəlif sektorların istehsal proseslərində lazım olan xammal qrupları."
      ],
      [
        "Tikinti Məhsulları",
        "Tikinti, bəzək və tikinti layihələrində istifadə olunan tamamlayıcı məhsul qrupları."
      ],
      [
        "Logistika ilə dəstəklənən ticarət",
        "Göndərmə, çatdırılma və əməliyyat izləmə mərhələləri üçün koordinasiya dəstəyi."
      ],
      [
        "Ümumi mənbə həlləri",
        "Bir kateqoriyadan kənarda xüsusi məhsul tələbləri üçün araşdırma və axtarış həlləri."
      ]
    ],
    "aboutIntroTitle": "Haqqımızda",
    "aboutIntroText": "Dynamic Era Export geniş məhsul portfeli, güclü təchizatçı əlaqələri və həll yönümlü yanaşması ilə daxili və xarici ticarətdə fəaliyyət göstərən ticarət şirkətidir.\n\nEnerji, tikinti materialları, tekstil, qida, səhiyyə, müdafiə sənayesi və müxtəlif ticarət kateqoriyalarında müştərilərin ehtiyaclarına uyğun qaynaq həlləri hazırlayır. Məqsədimiz təkcə məhsul təqdim etmək deyil, həm də müştərilərimizə etibarlı, davamlı və səmərəli ticarət təcrübəsi təqdim etməkdir.\n\nGeniş sektor şəbəkəmiz, çevik əməliyyat strukturumuz və müştəri yönümlü xidmət yanaşmamızla özümüzü şirkətlərin idxal və ixrac proseslərində güclü iş ortağı kimi yerləşdiririk.",
    "aboutMore": "Haqqımızda Ətraflı Məlumat",
    "homeAboutTitle": "Mənbə ehtiyaclarını düzgün ticarət modelinə çeviririk.",
    "homeAboutText": "Enerji, tekstil, qida, səhiyyə və bir çox digər sektorlarda biz məhsul araşdırması, təchizatçı müqayisəsi, qiymət təklifi və əməliyyat təqibini bir yerdən idarə edirik. Şəffaf ünsiyyətlə tələbinizi dəqiqləşdirir, düzgün mənbəni tapır və prosesi davam etdiririk.",
    "homeAboutValues": [
      "Tələb-xüsusi mənbə",
      "Sektor əsaslı məhsul şəbəkəsi",
      "Şəffaf əməliyyat təqibi"
    ],
    "homeAboutButton": "İş Modelimizi araşdırın",
    "aboutText": "Qlobal ticarətdə uğur düzgün məhsula, doğru zamanda və uyğun şərtlərdə çatmaqdan asılıdır. Müştərilərimizin ehtiyaclarını təhlil edir, sektora və tələbata uyğun qaynaq kanallarını müəyyənləşdirir və ticarət prosesini etibarlı şəkildə idarə edirik.",
    "aboutSupport": "Dynamic Era Export-də biz məhsul tapmaqdan kənara çıxırıq və ticarətin hər addımını etibar, şəffaflıq və sürətlə idarə edirik.",
    "aboutFlowTitle": "Etibar, sürət və şəffaflıq üzərində qurulmuş ticarət",
    "aboutFlowText1": "İlk gündən bizim əsas məqsədimiz müştəriləri düzgün tədarük kanalları ilə əlaqələndirmək, idxal və ixrac proseslərini etibarlı şəkildə idarə etmək və ticarətin hər mərhələsində dəyər yaradan biznes tərəfdaşı olmaqdır.",
    "aboutFlowText2": "Müasir qlobal ticarət mənzərəsində şirkətlər məhsuldan daha çox şey gözləyir: etibarlı təchizatçı, düzgün qiymət, davamlı işgüzar əlaqələr, əməliyyat təqibi və sürətli ünsiyyət. Dynamic Era Export-də biz bütün bu ehtiyacları nəzərə alan vahid ticarət yanaşmasını qəbul edirik.",
    "aboutPillars": [
      [
        "Vizyonumuz",
        "Qlobal ticarətdə etibarlılıq, sürət və həll odaklı düşüncə ilə tanınan güclü ticarət markası olmaq, eyni zamanda müxtəlif sektorlarda davamlı qaynaq həlləri təklif etmək."
      ],
      [
        "Missiyamız",
        "Müştərilərimizin idxal, ixrac və satınalma ehtiyaclarını düzgün təhlil etmək və keyfiyyətli məhsullar, etibarlı mənbələr, rəqabətli qiymətlər və peşəkar əməliyyat dəstəyi ilə ən uyğun ticarət həllərini təqdim etmək."
      ],
      [
        "Bizim yanaşmamız",
        "Biz hər bir əməkdaşlığı uzunmüddətli ticarət əlaqələri kimi görürük və təkcə cari məhsul tələblərinə deyil, həm də müştərilərimizin gələcək ehtiyaclarına diqqət yetiririk."
      ]
    ],
    "aboutOperationsEyebrow": "Biz nə edirik",
    "aboutOperationsTitle": "Biz idxal, ixrac və satınalma proseslərində başdan-başa dəstək veririk.",
    "aboutOperations": [
      [
        null,
        "İdxal və ixrac dəstəyi",
        "Biz idxal və ixrac proseslərində kommersiya dəstəyi veririk."
      ],
      [
        null,
        "Məhsul və təchizatçı araşdırması",
        "Biz müxtəlif sektorlar üçün məhsul və təchizatçıları araşdırırıq."
      ],
      [
        null,
        "Tələbə uyğun məhsul qrupları",
        "Müştəri tələbinə əsasən uyğun məhsul qruplarını müəyyənləşdiririk."
      ],
      [
        null,
        "Təchizatçı əlaqələri",
        "Biz yerli və beynəlxalq təchizatçılarla əlaqə saxlayırıq."
      ],
      [
        null,
        "Sitatlar və əməliyyatlar",
        "Biz kotirovka, qiymət və əməliyyat proseslərini idarə edirik."
      ],
      [
        null,
        "Davamlı mənbə",
        "Biz geniş məhsul kateqoriyaları üzrə davamlı mənbə həlləri təklif edirik."
      ]
    ],
    "aboutValuesEyebrow": "Dəyərlərimiz",
    "aboutValuesTitle": "Biz güvən, sürət, çeviklik və qlobal perspektivin ticarətin əsası olduğuna inanırıq.",
    "aboutValues": [
      [
        "Etibarlılıq",
        "Biz bütün biznes proseslərində şəffaf, məsuliyyətli və davamlı bir yanaşma tətbiq edirik."
      ],
      [
        "Sürət",
        "Biz müştərilərin istəklərinə tez cavab verir, prosesi səmərəli planlaşdırır və əməliyyat axınını yaxından izləyirik."
      ],
      [
        "Çeviklik",
        "Sabit nümunələr əvəzinə biz layihəyə, məhsula və tələbata uyğun həllər yaradırıq."
      ],
      [
        "Qlobal Perspektiv",
        "Müxtəlif bazarları, məhsul qruplarını və təchizat mənbələrini qiymətləndirərək, biz daha geniş seçimlər təklif edirik."
      ]
    ],
    "aboutCtaEyebrow": "Dynamic Era Export ilə işləyirik",
    "aboutCtaTitle": "Ticarət prosesinizi daha təhlükəsiz, daha sürətli və daha səmərəli edək.",
    "aboutCtaText": "İstər konkret məhsul qrupu axtarırsınız, istərsə də idxal-ixrac prosesləri üçün peşəkar dəstəyə ehtiyacınız olsun, komandamız sizin üçün düzgün həll variantını yaratmağa hazırdır.",
    "aboutCtaPrimary": "WhatsApp vasitəsilə əlaqə saxlayın",
    "aboutCtaEmail": "E-poçt vasitəsilə əlaqə saxlayın",
    "aboutCtaSecondary": "Əlaqə səhifəsi",
    "values": [
      "Geniş məhsul və sektor şəbəkəsi",
      "Etibarlı ticarət prosesi",
      "Çevik və sürətli həllər",
      "Beynəlxalq ticarət təcrübəsi"
    ],
    "contactLead": "Axtardığınız məhsul, hədəf ölkə və ya kateqoriya nə olursa olsun, qısa bir mesajla başlaya bilərik.",
    "form": {
      "configTitle": "Forma xidməti konfiqurasiya edilməyib",
      "configText": "Mesajlar göndərilməzdən əvvəl Web3Forms giriş açarı əlavə edilməlidir. Bu arada WhatsApp vasitəsilə bizimlə əlaqə saxlaya bilərsiniz.",
      "successTitle": "Mesajınız uğurla göndərildi",
      "successText": "təşəkkür edirəm. Biz ən qısa zamanda sizinlə əlaqə saxlayacağıq.",
      "errorTitle": "Mesaj göndərilə bilmədi",
      "errorText": "Lütfən, qısa müddətdə yenidən cəhd edin və ya WhatsApp vasitəsilə bizimlə əlaqə saxlayın.",
      "rateTitle": "Zəhmət olmasa bir az gözləyin",
      "rateText": "Spamdan qorunmaq üçün dəqiqədə yalnız bir mesaj göndərə bilərsiniz."
    },
    "partnersTitle": "Qlobal Ticarət Ekosistemi",
    "importantLinksTitle": "Vacib Linklər",
    "footerWhatsappTitle": "WhatsApp-də bizə müraciət edin",
    "footerWhatsappText": "Məhsul, sektor və ya satınalma sorğunuz üçün birbaşa bizimlə əlaqə saxlayın.",
    "footer": "İdxal, ixrac və qlobal satınalma əməliyyatlarında aydın ünsiyyət.",
    "copyright": "© Copyright 2026 Dynamic Era Export. Bütün hüquqlar qorunur."
  },
  "pl": {
    "quoteCta": "Uzyskaj wycenę",
    "homeBadge": "Handel globalny, rozwiązania dynamiczne",
    "homeText": "Od energii po materiały budowlane, od tekstyliów po żywność, od zdrowia po przemysł obronny – tworzymy wartość dla naszych klientów dzięki odpowiedniemu produktowi, właściwemu dostawcy i właściwemu modelowi handlowemu.\n\nDzięki ponad 20-letniemu doświadczeniu handlowemu, ponad 1500 klientom i silnej sieci dostaw w ponad 20 sektorach jesteśmy dynamiczną siłą światowego handlu.",
    "quoteTitle": "Jesteśmy z Tobą na każdym etapie handlu",
    "quoteText": "Zapewniamy kompleksowe wsparcie, od badań produktów i zaopatrzenia po planowanie cen i logistyki.",
    "trustTitle": "Jesteśmy z Tobą na każdym etapie handlu",
    "trustText": "Od badań produktów i zaopatrzenia po planowanie cen i logistyki – zapewniamy kompleksowe wsparcie w operacjach importu i eksportu.",
    "servicesLead": "Zapewniamy pod jednym dachem infrastrukturę handlową, sieć dostaw i wsparcie operacyjne, których potrzebują firmy w procesach importu i eksportu.",
    "services": [
      [
        "Pozyskiwanie produktów",
        "Badamy produkty za pośrednictwem naszej lokalnej i międzynarodowej sieci dostaw i łączymy Cię z odpowiednimi dostawcami."
      ],
      [
        "Procesy importu",
        "W przypadku produktów sprowadzanych z zagranicy wspieramy zaopatrzenie, dokumentację i koordynację logistyki."
      ],
      [
        "Rozwiązania eksportowe",
        "Tworzymy rozwiązania produktowe, rynkowe i operacyjne dla firm, które chcą eksportować z Turcji na różne rynki."
      ],
      [
        "Badania dostawców",
        "Oferujemy odpowiednie opcje dostawców w oparciu o jakość, wydajność, równowagę cenową i warunki dostawy."
      ],
      [
        "Oferta i wycena",
        "Przygotowujemy konkurencyjne i porównywalne oferty cenowe dla żądanych grup produktowych."
      ],
      [
        "Śledzenie logistyki i operacji",
        "Zapewniamy regularne wsparcie podczas procesów dostaw, wysyłki i działań operacyjnych."
      ]
    ],
    "processTitle": "Analizujemy popyt, znajdujemy odpowiednie źródło i śledzimy operację.",
    "processLead": "Każdy sektor ma inne oczekiwania dotyczące jakości, dostaw, kosztów i zgodności; dlatego budujemy model handlu dostosowany do popytu, a nie standardowy proces.",
    "processSteps": [
      [
        null,
        "Analiza popytu",
        "Wyjaśniona zostaje grupa produktów, rynek docelowy, ilość, oczekiwana jakość i plan dostaw."
      ],
      [
        null,
        "Źródło zaopatrzenia",
        "Poszukiwani są odpowiedni dostawcy i porównywane są opcje cenowe i operacyjne."
      ],
      [
        null,
        "Operacja Handlowa",
        "Procesy ofertowe, dokumentacyjne, logistyczne i dostawcze są prowadzone przy przejrzystej komunikacji."
      ]
    ],
    "ctaTitle": "Wzmocnijmy razem Twój proces handlowy.",
    "ctaText": "Skontaktuj się z nami, aby uzyskać potrzebny produkt, dostawcę lub rozwiązanie importowo-eksportowe. Zbudujmy dla Ciebie najbardziej odpowiedni model handlu.",
    "hero": [
      {
        "eyebrow": "Handel globalny, rozwiązania dynamiczne",
        "title": "Dynamiczne otwarcie potęgi handlowej na świat.",
        "text": "Dynamic Era Export dostarcza produkty z różnych sektorów na rynki międzynarodowe dzięki niezawodnym, szybkim i profesjonalnym rozwiązaniom eksportowym."
      },
      {
        "eyebrow": "Szeroka sieć branżowa i produktowa",
        "title": "Wszechstronne rozwiązania handlowe, od energii po żywność, od tekstyliów po zdrowie.",
        "text": "Profesjonalnie zarządzamy badaniami produktów, zaopatrzeniem, cenami i procesami operacyjnymi zgodnie z zapotrzebowaniem klienta."
      },
      {
        "eyebrow": "Ponad 20 lat doświadczenia komercyjnego",
        "title": "Przyspiesz swój proces dzięki dynamicznej sile globalnego handlu.",
        "text": "Dzięki ponad 1500 klientom i szerokiej sieci sektorowej oferujemy szybkie, elastyczne i zrównoważone rozwiązania handlowe."
      }
    ],
    "metrics": [
      [
        null,
        "lat służby"
      ],
      [
        null,
        "klienci"
      ],
      [
        null,
        "obszary biznesowe"
      ],
      [
        null,
        "wsparcie handlowe"
      ]
    ],
    "categoryTitle": "Wyróżnione obszary biznesowe",
    "categoryLead": "Dynamic Era Export posiada szeroką sieć handlową obejmującą grupy produktów i materiałów potrzebnych różnym sektorom.",
    "allCategoriesCta": "Wyświetl wszystkie obszary biznesowe",
    "categories": {
      "energy": [
        "Energia",
        "Sprzęt, produkty infrastrukturalne, materiały elektryczne i produkty wspierające energię odnawialną."
      ],
      "construction": [
        "Materiały budowlane",
        "Materiały budowlane, produkty infrastrukturalne, sprzęt mechaniczny i potrzeby oparte na projektach."
      ],
      "textile": [
        "Włókienniczy",
        "Tkaniny, odzież gotowa, robocza, tekstylia techniczne i różne grupy tekstyliów."
      ],
      "food": [
        "Żywność",
        "Podstawowe produkty spożywcze, żywność pakowana, produkty rolne i niezawodne rozwiązania handlowe."
      ],
      "health": [
        "Zdrowie",
        "Produkty medyczne, materiały eksploatacyjne, sprzęt medyczny i rozwiązania w zakresie dostaw specyficzne dla danego sektora."
      ],
      "defense": [
        "Przemysł Obronny",
        "Profesjonalne procesy dostaw z zachowaniem zgodności, poufności i dyscypliny operacyjnej."
      ]
    },
    "categoryDetails": {
      "energy": {
        "title": "Energia",
        "text": "Dla sektora energetycznego zapewniamy rozwiązania w zakresie zaopatrzenia w różnych grupach produktów, w szczególności w sprzęt, produkty infrastrukturalne, materiały elektryczne i produkty wspierające energię odnawialną.",
        "points": [
          "Sprzęt energetyczny",
          "Materiały elektryczne",
          "Zaopatrzenie oparte na projektach"
        ]
      },
      "construction": {
        "title": "Materiały budowlane",
        "text": "Świadczymy usługi zaopatrzenia w materiały budowlane, produkty infrastrukturalne, sprzęt mechaniczny, uzupełniające produkty budowlane i potrzeby oparte na projektach.",
        "points": [
          "Produkty budowlane i infrastrukturalne",
          "Sprzęt mechaniczny",
          "Potrzeby oparte na projektach"
        ]
      },
      "textile": {
        "title": "Włókienniczy",
        "text": "Oferujemy rozwiązania w zakresie handlu krajowego i międzynarodowego w zakresie tkanin, odzieży roboczej, odzieży roboczej, technicznych wyrobów tekstylnych i różnych grup tekstyliów.",
        "points": [
          "Tkanina i gotowe do noszenia",
          "Odzież robocza",
          "Techniczne wyroby tekstylne"
        ]
      },
      "food": {
        "title": "Żywność",
        "text": "Opracowujemy niezawodne rozwiązania w zakresie zaopatrzenia i handlu podstawowymi produktami spożywczymi, żywnością pakowaną, produktami rolnymi i różnymi kategoriami żywności.",
        "points": [
          "Podstawowe jedzenie",
          "Produkty pakowane",
          "Produkty rolne"
        ]
      },
      "health": {
        "title": "Zdrowie",
        "text": "Dostarczamy rozwiązania w zakresie pozyskiwania produktów medycznych, materiałów eksploatacyjnych, sprzętu medycznego i potrzeb specyficznych dla danego sektora.",
        "points": [
          "Produkty medyczne",
          "Materiały eksploatacyjne",
          "Sprzęt medyczny"
        ]
      },
      "defense": {
        "title": "Przemysł Obronny",
        "text": "W branży obronnej opracowujemy profesjonalne rozwiązania dla sektorowych procesów dostaw z zachowaniem zasad compliance, poufności i dyscypliny operacyjnej.",
        "points": [
          "Zgodność",
          "Poufność i dyscyplina",
          "Dostawy specyficzne dla danego sektora"
        ]
      }
    },
    "categoryPageLead": "We wszystkich obszarach naszej działalności opracowujemy rozwiązania w zakresie produktów i zaopatrzenia zgodnie z zapotrzebowaniem klientów.",
    "categoryScrollHint": "Przewiń listę, aby wyświetlić wszystkie sektory",
    "categoryCustomCtaTitle": "Skontaktuj się z nami w sprawie grup produktów, które nie są tutaj wymienione.",
    "categoryCustomCtaText": "Jeśli na liście nie widzisz potrzebnej Ci grupy produktów, skontaktuj się z nami. Dynamic Era Export może zbadać odpowiednie opcje zaopatrzenia dla Twoich specjalnych wymagań w różnych sektorach.",
    "allSectorsLead": "Dynamic Era Export oferuje kompleksowe rozwiązania handlowe dla potrzeb produktów i zaopatrzenia w różnych sektorach.",
    "allSectors": [
      [
        "Energia",
        "Sprzęt, produkty infrastrukturalne, materiały elektryczne i produkty wspierające energię odnawialną."
      ],
      [
        "Materiały budowlane",
        "Materiały budowlane, produkty infrastrukturalne, sprzęt mechaniczny i potrzeby oparte na projektach."
      ],
      [
        "Włókienniczy",
        "Tkaniny, konfekcja, odzież robocza, techniczne wyroby tekstylne i różne grupy tekstyliów."
      ],
      [
        "Żywność",
        "Podstawowe produkty spożywcze, żywność pakowana, produkty rolne i niezawodne rozwiązania handlowe."
      ],
      [
        "Zdrowie",
        "Produkty medyczne, materiały eksploatacyjne, sprzęt medyczny i rozwiązania zaopatrzeniowe specyficzne dla danego sektora."
      ],
      [
        "Przemysł Obronny",
        "Profesjonalne procesy zaopatrzenia z zachowaniem zgodności, poufności i dyscypliny operacyjnej."
      ],
      [
        "Elektryka i elektronika",
        "Materiały elektryczne, produkty elektroniczne, sprzęt połączeniowy i produkty oświetleniowe."
      ],
      [
        "Maszyny i sprzęt",
        "Maszyny przemysłowe, sprzęt produkcyjny, części zamienne i wyposażenie techniczne."
      ],
      [
        "Meble",
        "Szerokie możliwości zaopatrzenia w produkty meblowe do domu, biura, powierzchni komercyjnej i oparte na projektach."
      ],
      [
        "Automobilowy",
        "Motoryzacyjne części zamienne, wyposażenie, akcesoria i specyficzne dla branży grupy produktów."
      ],
      [
        "Plastik i guma",
        "Wyroby z tworzyw sztucznych, materiały gumowe, części techniczne i grupy produktów przemysłowych."
      ],
      [
        "Opakowanie",
        "Produkty opakowaniowe i rozwiązania opakowaniowe dla sektora spożywczego, tekstylnego, przemysłowego i detalicznego."
      ],
      [
        "Kosmetyki",
        "Produkty kosmetyczne, produkty higieny osobistej, produkty higieniczne i powiązane grupy produktów."
      ],
      [
        "Produkty czyszczące",
        "Przemysłowe produkty czyszczące, materiały higieniczne, materiały eksploatacyjne i produkty do użytku korporacyjnego."
      ],
      [
        "Produkty Rolne",
        "Produkty rolne, surowce spożywcze i rozwiązania handlowe dla sektora rolnego."
      ],
      [
        "Produkty medyczne",
        "Wsparcie w zakresie pozyskiwania produktów dla instytucji opieki zdrowotnej i firm z branży zaopatrzenia medycznego."
      ],
      [
        "Surowce",
        "Grupy surowców potrzebne w procesach produkcyjnych różnych sektorów."
      ],
      [
        "Produkty budowlane",
        "Uzupełniające grupy produktów stosowane w budownictwie, dekoracji i projektach budowlanych."
      ],
      [
        "Handel wspierany logistyką",
        "Wsparcie koordynacyjne na etapach wysyłki, dostawy i śledzenia operacyjnego."
      ],
      [
        "Ogólne rozwiązania dotyczące zaopatrzenia",
        "Rozwiązania w zakresie badań i pozyskiwania produktów specjalnych, wykraczających poza jedną kategorię."
      ]
    ],
    "aboutIntroTitle": "O nas",
    "aboutIntroText": "Dynamic Era Export jest firmą handlową działającą w handlu krajowym i zagranicznym, z szerokim portfolio produktów, silnymi relacjami z dostawcami i podejściem zorientowanym na rozwiązania.\n\nOpracowuje rozwiązania w zakresie zaopatrzenia odpowiednie dla potrzeb klientów z branży energetycznej, materiałów budowlanych, tekstyliów, żywności, zdrowia, przemysłu obronnego i różnych kategorii handlowych. Naszym celem jest nie tylko dostarczanie produktów, ale także oferowanie naszym klientom niezawodnych, zrównoważonych i wydajnych doświadczeń handlowych.\n\nDzięki naszej szerokiej sieci branżowej, elastycznej strukturze operacyjnej i podejściu do usług zorientowanych na klienta, pozycjonujemy się jako silny partner biznesowy w procesach importu i eksportu przedsiębiorstw.",
    "aboutMore": "Więcej informacji o nas",
    "homeAboutTitle": "Przekształcamy potrzeby sourcingowe we właściwy model handlowy.",
    "homeAboutText": "W sektorach energetycznym, tekstylnym, spożywczym, zdrowotnym i wielu innych zarządzamy badaniami produktów, porównywaniem dostawców, ofertami cenowymi i monitorowaniem operacyjnym z jednego miejsca. Wyjaśniamy Twoje zapotrzebowanie, znajdujemy właściwe źródło i utrzymujemy proces dzięki przejrzystej komunikacji.",
    "homeAboutValues": [
      "Zaopatrzenie dostosowane do zapotrzebowania",
      "Sieć produktów oparta na sektorach",
      "Przejrzyste monitorowanie operacji"
    ],
    "homeAboutButton": "Poznaj nasz model pracy",
    "aboutText": "Sukces w handlu światowym zależy od dotarcia do odpowiedniego produktu, we właściwym czasie i we właściwych warunkach. Analizujemy potrzeby naszych klientów, identyfikujemy kanały zaopatrzenia odpowiednie dla branży i popytu oraz rzetelnie zarządzamy procesem handlowym.",
    "aboutSupport": "W Dynamic Era Export wykraczamy poza wyszukiwanie produktów i zarządzamy każdym etapem handlu z zaufaniem, przejrzystością i szybkością.",
    "aboutFlowTitle": "Handel oparty na zaufaniu, szybkości i przejrzystości",
    "aboutFlowText1": "Od samego początku naszym głównym celem było zapewnienie klientom odpowiednich kanałów zaopatrzenia, niezawodne zarządzanie procesami importu i eksportu oraz bycie partnerem biznesowym tworzącym wartość na każdym etapie handlu.",
    "aboutFlowText2": "W dzisiejszym globalnym krajobrazie handlowym firmy oczekują czegoś więcej niż tylko produktu: niezawodnego dostawcy, właściwych cen, zrównoważonych relacji biznesowych, działań następczych i szybkiej komunikacji. W Dynamic Era Export przyjmujemy holistyczne podejście do handlu, które uwzględnia wszystkie te potrzeby.",
    "aboutPillars": [
      [
        "Nasza wizja",
        "Stać się silną marką handlową znaną z niezawodności, szybkości i myślenia skoncentrowanego na rozwiązaniach w handlu światowym, oferując jednocześnie zrównoważone rozwiązania w zakresie zaopatrzenia w różnych sektorach."
      ],
      [
        "Nasza misja",
        "Prawidłowa analiza potrzeb naszych klientów w zakresie importu, eksportu i zaopatrzenia oraz dostarczanie najbardziej odpowiednich rozwiązań handlowych z produktami wysokiej jakości, niezawodnymi źródłami, konkurencyjnymi cenami i profesjonalnym wsparciem operacyjnym."
      ],
      [
        "Nasze podejście",
        "Każdą współpracę postrzegamy jako długoterminową relację handlową i skupiamy się nie tylko na bieżących zapotrzebowaniach na produkty, ale także na przyszłych potrzebach naszych klientów."
      ]
    ],
    "aboutOperationsEyebrow": "Co robimy",
    "aboutOperationsTitle": "Zapewniamy kompleksowe wsparcie w procesach importu, eksportu i zaopatrzenia.",
    "aboutOperations": [
      [
        null,
        "Wsparcie importu i eksportu",
        "Zapewniamy wsparcie handlowe w procesach importu i eksportu."
      ],
      [
        null,
        "Badania produktów i dostawców",
        "Badamy produkty i dostawców dla różnych sektorów."
      ],
      [
        null,
        "Grupy produktów dopasowane do popytu",
        "Identyfikujemy odpowiednie grupy produktów na podstawie zapotrzebowania klientów."
      ],
      [
        null,
        "Połączenia dostawców",
        "Łączymy się z dostawcami lokalnymi i międzynarodowymi."
      ],
      [
        null,
        "Cytaty i operacje",
        "Zarządzamy procesami ofertowymi, cenowymi i operacyjnymi."
      ],
      [
        null,
        "Zrównoważone pozyskiwanie",
        "Oferujemy zrównoważone rozwiązania w zakresie zaopatrzenia w szerokich kategoriach produktów."
      ]
    ],
    "aboutValuesEyebrow": "Nasze wartości",
    "aboutValuesTitle": "Wierzymy, że zaufanie, szybkość, elastyczność i globalna perspektywa są podstawą handlu.",
    "aboutValues": [
      [
        "Niezawodność",
        "Stosujemy przejrzyste, odpowiedzialne i zrównoważone podejście we wszystkich procesach biznesowych."
      ],
      [
        "Prędkość",
        "Szybko reagujemy na prośby klientów, sprawnie planujemy proces i uważnie śledzimy przepływ operacyjny."
      ],
      [
        "Elastyczność",
        "Zamiast ustalonych schematów tworzymy rozwiązania dostosowane do projektu, produktu i zapotrzebowania."
      ],
      [
        "Perspektywa globalna",
        "Oceniając różne rynki, grupy produktów i źródła dostaw, oferujemy szersze możliwości."
      ]
    ],
    "aboutCtaEyebrow": "Współpraca z Dynamic Era Export",
    "aboutCtaTitle": "Sprawmy, aby Twój proces handlowy był bezpieczniejszy, szybszy i wydajniejszy.",
    "aboutCtaText": "Niezależnie od tego, czy szukasz konkretnej grupy produktów, czy potrzebujesz profesjonalnego wsparcia w procesach import-eksport, nasz zespół jest gotowy zbudować dla Ciebie odpowiednie rozwiązanie.",
    "aboutCtaPrimary": "Skontaktuj się poprzez WhatsApp",
    "aboutCtaEmail": "Kontakt poprzez e-mail",
    "aboutCtaSecondary": "Strona kontaktowa",
    "values": [
      "Szeroka sieć produktów i sektorów",
      "Niezawodny proces handlowy",
      "Elastyczne i szybkie rozwiązania",
      "Doświadczenie w handlu międzynarodowym"
    ],
    "contactLead": "Niezależnie od tego, jakiego produktu, kraju docelowego lub kategorii szukasz, możemy zacząć od krótkiej wiadomości.",
    "form": {
      "configTitle": "Usługa formularza nie jest skonfigurowana",
      "configText": "Aby możliwe było wysyłanie wiadomości, należy dodać klucz dostępu Web3Forms. W międzyczasie możesz skontaktować się z nami za pośrednictwem WhatsApp.",
      "successTitle": "Twoja wiadomość została pomyślnie wysłana",
      "successText": "Dziękuję. Skontaktujemy się z Tobą tak szybko, jak to możliwe.",
      "errorTitle": "Nie udało się wysłać wiadomości",
      "errorText": "Spróbuj ponownie wkrótce lub skontaktuj się z nami poprzez WhatsApp.",
      "rateTitle": "Proszę chwilę poczekać",
      "rateText": "W celu ochrony przed spamem możesz wysłać tylko jedną wiadomość na minutę."
    },
    "partnersTitle": "Globalny ekosystem handlu",
    "importantLinksTitle": "Ważne linki",
    "footerWhatsappTitle": "Skontaktuj się z nami na WhatsApp",
    "footerWhatsappText": "Skontaktuj się z nami bezpośrednio w sprawie Twojego produktu, sektora lub zapytania o źródła zaopatrzenia.",
    "footer": "Jasna komunikacja w operacjach importu, eksportu i globalnego zaopatrzenia.",
    "copyright": "© Copyright 2026 Dynamic Era Export. Wszelkie prawa zastrzeżone."
  },
  "el": {
    "quoteCta": "Λάβετε μια προσφορά",
    "homeBadge": "Παγκόσμιο Εμπόριο, Δυναμικές Λύσεις",
    "homeText": "Από την ενέργεια μέχρι τα υλικά κατασκευής, από τα κλωστοϋφαντουργικά προϊόντα μέχρι τα τρόφιμα, από την υγεία στην αμυντική βιομηχανία, δημιουργούμε αξία για τους πελάτες μας με το σωστό προϊόν, τον σωστό προμηθευτή και το σωστό εμπορικό μοντέλο.\n\nΜε 20+ χρόνια εμπορικής εμπειρίας, 1500+ πελάτες και ισχυρό δίκτυο εφοδιασμού σε 20+ τομείς, είμαστε η δυναμική δύναμη του παγκόσμιου εμπορίου.",
    "quoteTitle": "Είμαστε μαζί σας σε κάθε στάδιο του εμπορίου",
    "quoteText": "Από την έρευνα προϊόντων και την προμήθεια έως τον προγραμματισμό τιμολόγησης και logistics, παρέχουμε υποστήριξη από άκρο σε άκρο.",
    "trustTitle": "Είμαστε μαζί σας σε κάθε στάδιο του εμπορίου",
    "trustText": "Από την έρευνα προϊόντων και την προμήθεια έως τον προγραμματισμό τιμολόγησης και logistics, παρέχουμε υποστήριξη από άκρο σε άκρο στις εργασίες εισαγωγής και εξαγωγής.",
    "servicesLead": "Παρέχουμε την εμπορική υποδομή, το δίκτυο εφοδιασμού και τη λειτουργική υποστήριξη που χρειάζονται οι εταιρείες στις διαδικασίες εισαγωγής και εξαγωγής κάτω από μια στέγη.",
    "services": [
      [
        "Προμήθεια προϊόντων",
        "Ερευνούμε προϊόντα μέσω του τοπικού και διεθνούς δικτύου προμηθειών μας και σας συνδέουμε με κατάλληλους προμηθευτές."
      ],
      [
        "Διαδικασίες εισαγωγής",
        "Για προϊόντα που προέρχονται από το εξωτερικό, υποστηρίζουμε την προμήθεια, την τεκμηρίωση και τον συντονισμό logistics."
      ],
      [
        "Εξαγωγικές Λύσεις",
        "Δημιουργούμε λύσεις προϊόντων, αγοράς και λειτουργίας για εταιρείες που θέλουν να εξάγουν από την Τουρκία σε διαφορετικές αγορές."
      ],
      [
        "Έρευνα Προμηθευτών",
        "Προσφέρουμε κατάλληλες επιλογές προμηθευτών με βάση την ποιότητα, τη χωρητικότητα, το ισοζύγιο τιμής και τους όρους παράδοσης."
      ],
      [
        "Προσφορά και Τιμολόγηση",
        "Ετοιμάζουμε ανταγωνιστικές και συγκρίσιμες επιλογές προσφοράς για ζητούμενες ομάδες προϊόντων."
      ],
      [
        "Logistics και Παρακολούθηση Λειτουργίας",
        "Παρέχουμε τακτική υποστήριξη σε όλες τις διαδικασίες παράδοσης, αποστολής και λειτουργικής παρακολούθησης."
      ]
    ],
    "processTitle": "Αναλύουμε τη ζήτηση, βρίσκουμε τη σωστή πηγή και παρακολουθούμε τη λειτουργία.",
    "processLead": "Κάθε τομέας έχει διαφορετικές προσδοκίες για ποιότητα, παράδοση, κόστος και συμμόρφωση. Ως εκ τούτου, οικοδομούμε ένα μοντέλο εμπορίου ειδικά για τη ζήτηση και όχι μια τυπική διαδικασία.",
    "processSteps": [
      [
        null,
        "Ανάλυση ζήτησης",
        "Η ομάδα προϊόντων, η αγορά-στόχος, η ποσότητα, η προσδοκία ποιότητας και το σχέδιο παράδοσης διευκρινίζονται."
      ],
      [
        null,
        "Πηγή ανεφοδιασμού",
        "Ερευνώνται οι κατάλληλοι προμηθευτές και συγκρίνονται οι επιλογές τιμών και λειτουργίας."
      ],
      [
        null,
        "Εμπορική Λειτουργία",
        "Οι διαδικασίες προσφοράς, τεκμηρίωσης, εφοδιαστικής και παράδοσης ακολουθούνται με διαφανή επικοινωνία."
      ]
    ],
    "ctaTitle": "Ας ενισχύσουμε μαζί την εμπορική σας διαδικασία.",
    "ctaText": "Επικοινωνήστε μαζί μας για το προϊόν, τον προμηθευτή ή τη λύση εισαγωγής-εξαγωγής που χρειάζεστε. Ας δημιουργήσουμε το πιο κατάλληλο εμπορικό μοντέλο για εσάς.",
    "hero": [
      {
        "eyebrow": "Παγκόσμιο Εμπόριο, Δυναμικές Λύσεις",
        "title": "Μια δυναμική εμπορική δύναμη που ανοίγει στον κόσμο.",
        "text": "Η Dynamic Era Export παραδίδει προϊόντα από διαφορετικούς τομείς στις διεθνείς αγορές με αξιόπιστες, γρήγορες και επαγγελματικές λύσεις εξαγωγών."
      },
      {
        "eyebrow": "Ευρύς τομέας και δίκτυο προϊόντων",
        "title": "Ευέλικτες λύσεις εμπορίου από την ενέργεια μέχρι τα τρόφιμα, τα υφάσματα στην υγεία.",
        "text": "Διαχειριζόμαστε επαγγελματικά τις διαδικασίες έρευνας προϊόντων, προμήθειας, τιμολόγησης και λειτουργίας σύμφωνα με τη ζήτηση των πελατών."
      },
      {
        "eyebrow": "20+ χρόνια εμπορικής εμπειρίας",
        "title": "Επιταχύνετε τη διαδικασία σας με τη δυναμική δύναμη του παγκόσμιου εμπορίου.",
        "text": "Με 1500+ πελάτες και ένα ευρύ τομεακό δίκτυο, προσφέρουμε γρήγορες, ευέλικτες και βιώσιμες εμπορικές λύσεις."
      }
    ],
    "metrics": [
      [
        null,
        "χρόνια υπηρεσίας"
      ],
      [
        null,
        "πελάτες"
      ],
      [
        null,
        "επιχειρηματικούς χώρους"
      ],
      [
        null,
        "υποστήριξη του εμπορίου"
      ]
    ],
    "categoryTitle": "Επιλεγμένες επιχειρηματικές περιοχές",
    "categoryLead": "Η Dynamic Era Export διαθέτει ένα ευρύ εμπορικό δίκτυο σε ομάδες προϊόντων και υλικών που απαιτούνται από διαφορετικούς τομείς.",
    "allCategoriesCta": "Δείτε όλους τους επιχειρηματικούς χώρους",
    "categories": {
      "energy": [
        "Ενέργεια",
        "Εξοπλισμός, προϊόντα υποδομής, ηλεκτρικά υλικά και προϊόντα υποστήριξης ανανεώσιμων πηγών ενέργειας."
      ],
      "construction": [
        "Υλικά Κατασκευών",
        "Οικοδομικά υλικά, προϊόντα υποδομής, μηχανολογικός εξοπλισμός και ανάγκες που βασίζονται σε έργα."
      ],
      "textile": [
        "Υφασμα",
        "Υφάσματα, έτοιμα ενδύματα, ενδύματα εργασίας, τεχνικά υφάσματα και διάφορες ομάδες υφασμάτων."
      ],
      "food": [
        "Τροφή",
        "Βασικά προϊόντα διατροφής, συσκευασμένα τρόφιμα, αγροτικά προϊόντα και αξιόπιστες εμπορικές λύσεις."
      ],
      "health": [
        "Υγεία",
        "Ιατρικά προϊόντα, αναλώσιμα, εξοπλισμός υγειονομικής περίθαλψης και λύσεις προμήθειας ανά τομέα."
      ],
      "defense": [
        "Αμυντική Βιομηχανία",
        "Επαγγελματικές διαδικασίες εφοδιασμού με συμμόρφωση, εμπιστευτικότητα και λειτουργική πειθαρχία."
      ]
    },
    "categoryDetails": {
      "energy": {
        "title": "Ενέργεια",
        "text": "Για τον ενεργειακό τομέα, παρέχουμε λύσεις προμήθειας σε διάφορες ομάδες προϊόντων, ιδίως εξοπλισμό, προϊόντα υποδομής, ηλεκτρικά υλικά και προϊόντα υποστήριξης ανανεώσιμων πηγών ενέργειας.",
        "points": [
          "Ενεργειακός εξοπλισμός",
          "Ηλεκτρικά υλικά",
          "Προμήθεια βάσει έργου"
        ]
      },
      "construction": {
        "title": "Υλικά Κατασκευών",
        "text": "Παρέχουμε υπηρεσίες προμήθειας δομικών υλικών, προϊόντων υποδομής, μηχανολογικού εξοπλισμού, συμπληρωματικών δομικών προϊόντων και αναγκών που βασίζονται σε έργα.",
        "points": [
          "Προϊόντα κτιρίων και υποδομών",
          "Μηχανικός εξοπλισμός",
          "Ανάγκες που βασίζονται σε έργα"
        ]
      },
      "textile": {
        "title": "Υφασμα",
        "text": "Προσφέρουμε λύσεις εσωτερικού και διεθνούς εμπορίου για υφάσματα, έτοιμα ενδύματα, ενδύματα εργασίας, τεχνικά κλωστοϋφαντουργικά προϊόντα και διαφορετικές ομάδες κλωστοϋφαντουργικών προϊόντων.",
        "points": [
          "Ύφασμα και έτοιμα για ένδυση",
          "Ενδύματα εργασίας",
          "Τεχνικά κλωστοϋφαντουργικά προϊόντα"
        ]
      },
      "food": {
        "title": "Τροφή",
        "text": "Αναπτύσσουμε αξιόπιστες λύσεις προμήθειας και εμπορίου για βασικά προϊόντα διατροφής, συσκευασμένα τρόφιμα, γεωργικά προϊόντα και διαφορετικές κατηγορίες τροφίμων.",
        "points": [
          "Βασική τροφή",
          "Συσκευασμένα προϊόντα",
          "Γεωργικά προϊόντα"
        ]
      },
      "health": {
        "title": "Υγεία",
        "text": "Παρέχουμε λύσεις προμήθειας για ιατρικά προϊόντα, αναλώσιμα, εξοπλισμό υγειονομικής περίθαλψης και ανάγκες ανά τομέα.",
        "points": [
          "Ιατρικά προϊόντα",
          "Αναλώσιμα",
          "Εξοπλισμός υγειονομικής περίθαλψης"
        ]
      },
      "defense": {
        "title": "Αμυντική Βιομηχανία",
        "text": "Στην αμυντική βιομηχανία, αναπτύσσουμε επαγγελματικές λύσεις για διαδικασίες εφοδιασμού σε συγκεκριμένους τομείς με αρχές συμμόρφωσης, εμπιστευτικότητας και επιχειρησιακής πειθαρχίας.",
        "points": [
          "Συμμόρφωση",
          "Εμπιστευτικότητα και πειθαρχία",
          "Προμήθεια ειδικού τομέα"
        ]
      }
    },
    "categoryPageLead": "Σε όλους τους επιχειρηματικούς μας τομείς, αναπτύσσουμε λύσεις προϊόντων και προμήθειας σύμφωνα με τη ζήτηση των πελατών.",
    "categoryScrollHint": "Κάντε κύλιση στη λίστα για να δείτε όλους τους τομείς",
    "categoryCustomCtaTitle": "Επικοινωνήστε μαζί μας για ομάδες προϊόντων που δεν αναφέρονται εδώ.",
    "categoryCustomCtaText": "Εάν δεν μπορείτε να δείτε την ομάδα προϊόντων που χρειάζεστε στη λίστα, επικοινωνήστε μαζί μας. Η Dynamic Era Export μπορεί να ερευνήσει κατάλληλες επιλογές προμήθειας για τα ειδικά αιτήματά σας σε διαφορετικούς τομείς.",
    "allSectorsLead": "Η Dynamic Era Export προσφέρει ολοκληρωμένες εμπορικές λύσεις για ανάγκες προϊόντων και προμήθειας σε διαφορετικούς τομείς.",
    "allSectors": [
      [
        "Ενέργεια",
        "Εξοπλισμός, προϊόντα υποδομής, ηλεκτρικά υλικά και προϊόντα υποστήριξης ανανεώσιμων πηγών ενέργειας."
      ],
      [
        "Υλικά Κατασκευών",
        "Οικοδομικά υλικά, προϊόντα υποδομής, μηχανολογικός εξοπλισμός και ανάγκες που βασίζονται σε έργα."
      ],
      [
        "Υφασμα",
        "Υφάσματα, έτοιμα ενδύματα, ενδύματα εργασίας, τεχνικά κλωστοϋφαντουργικά προϊόντα και διάφορες ομάδες κλωστοϋφαντουργικών προϊόντων."
      ],
      [
        "Τροφή",
        "Βασικά προϊόντα διατροφής, συσκευασμένα τρόφιμα, αγροτικά προϊόντα και αξιόπιστες εμπορικές λύσεις."
      ],
      [
        "Υγεία",
        "Ιατρικά προϊόντα, αναλώσιμα, εξοπλισμός υγειονομικής περίθαλψης και λύσεις προμήθειας ανά τομέα."
      ],
      [
        "Αμυντική Βιομηχανία",
        "Επαγγελματικές διαδικασίες προμήθειας με συμμόρφωση, εμπιστευτικότητα και λειτουργική πειθαρχία."
      ],
      [
        "Ηλεκτρολόγων & Ηλεκτρονικών",
        "Ηλεκτρικά υλικά, ηλεκτρονικά προϊόντα, εξοπλισμός σύνδεσης και προϊόντα φωτισμού."
      ],
      [
        "Μηχανήματα & Εξοπλισμός",
        "Βιομηχανικά μηχανήματα, εξοπλισμός παραγωγής, ανταλλακτικά και ανάγκες τεχνικού εξοπλισμού."
      ],
      [
        "Επιπλα",
        "Ευρείες επιλογές προμήθειας για οικιακά, γραφεία, εμπορικούς χώρους και προϊόντα επίπλων που βασίζονται σε έργα."
      ],
      [
        "Αυτοκίνητο",
        "Ανταλλακτικά αυτοκινήτων, εξοπλισμός, αξεσουάρ και ομάδες προϊόντων ανά τομέα."
      ],
      [
        "Πλαστικό & Καουτσούκ",
        "Πλαστικά προϊόντα, ελαστικά υλικά, τεχνικά μέρη και ομάδες βιομηχανικών προϊόντων."
      ],
      [
        "Συσκευασία",
        "Προϊόντα συσκευασίας και λύσεις συσκευασίας για τομείς τροφίμων, κλωστοϋφαντουργίας, βιομηχανίας και λιανικής."
      ],
      [
        "Καλλυντικά",
        "Καλλυντικά προϊόντα, προϊόντα προσωπικής περιποίησης, προϊόντα υγιεινής και συναφείς ομάδες προϊόντων."
      ],
      [
        "Προϊόντα Καθαρισμού",
        "Προϊόντα βιομηχανικού καθαρισμού, υλικά υγιεινής, αναλώσιμα και προϊόντα εταιρικής χρήσης."
      ],
      [
        "Αγροτικά Προϊόντα",
        "Αγροτικά προϊόντα, πρώτες ύλες τροφίμων και εμπορικές λύσεις για τον αγροτικό τομέα."
      ],
      [
        "Ιατρικά Προϊόντα",
        "Υποστήριξη προμήθειας προϊόντων για ιδρύματα υγειονομικής περίθαλψης και εταιρείες ιατρικών προμηθειών."
      ],
      [
        "Πρώτες ύλες",
        "Ομάδες πρώτων υλών που απαιτούνται στις παραγωγικές διαδικασίες διαφορετικών τομέων."
      ],
      [
        "Δομικά Προϊόντα",
        "Συμπληρωματικές ομάδες προϊόντων που χρησιμοποιούνται σε κατασκευές, διακόσμηση και οικοδομικά έργα."
      ],
      [
        "Logistics-Supported Trade",
        "Υποστήριξη συντονισμού για τα στάδια αποστολής, παράδοσης και λειτουργικής παρακολούθησης."
      ],
      [
        "Γενικές Λύσεις Προμήθειας",
        "Λύσεις έρευνας και προμήθειας για ειδικά αιτήματα προϊόντων πέρα ​​από μία κατηγορία."
      ]
    ],
    "aboutIntroTitle": "Σχετικά με εμάς",
    "aboutIntroText": "Η Dynamic Era Export είναι μια εμπορική εταιρεία που δραστηριοποιείται στο εσωτερικό και εξωτερικό εμπόριο με ευρύ χαρτοφυλάκιο προϊόντων, ισχυρές σχέσεις προμηθευτών και προσέγγιση προσανατολισμένη στη λύση.\n\nΑναπτύσσει λύσεις προμήθειας κατάλληλες για τις ανάγκες των πελατών σε ενέργεια, δομικά υλικά, κλωστοϋφαντουργία, τρόφιμα, υγεία, αμυντική βιομηχανία και διάφορες εμπορικές κατηγορίες. Στόχος μας δεν είναι μόνο να παρέχουμε προϊόντα, αλλά να προσφέρουμε στους πελάτες μας μια αξιόπιστη, βιώσιμη και αποτελεσματική εμπορική εμπειρία.\n\nΜε το ευρύ τομεακό μας δίκτυο, την ευέλικτη δομή λειτουργίας και την πελατοκεντρική προσέγγιση εξυπηρέτησης, τοποθετούμαστε ως ισχυρός επιχειρηματικός εταίρος στις διαδικασίες εισαγωγής και εξαγωγής των εταιρειών.",
    "aboutMore": "Περισσότερες πληροφορίες για εμάς",
    "homeAboutTitle": "Μετατρέπουμε τις ανάγκες προμήθειας στο σωστό εμπορικό μοντέλο.",
    "homeAboutText": "Σε όλους τους τομείς της ενέργειας, της κλωστοϋφαντουργίας, των τροφίμων, της υγείας και σε πολλούς άλλους τομείς, διαχειριζόμαστε την έρευνα προϊόντων, τη σύγκριση προμηθευτών, τις προσφορές και τη λειτουργική παρακολούθηση από ένα μέρος. Διευκρινίζουμε το αίτημά σας, βρίσκουμε τη σωστή πηγή και συνεχίζουμε τη διαδικασία με διαφανή επικοινωνία.",
    "homeAboutValues": [
      "Πηγή συγκεκριμένης ζήτησης",
      "Τομεακό δίκτυο προϊόντων",
      "Διαφανής παρακολούθηση λειτουργίας"
    ],
    "homeAboutButton": "Εξερευνήστε το μοντέλο εργασίας μας",
    "aboutText": "Η επιτυχία στο παγκόσμιο εμπόριο εξαρτάται από την επίτευξη του κατάλληλου προϊόντος, την κατάλληλη στιγμή και υπό τις κατάλληλες συνθήκες. Αναλύουμε τις ανάγκες των πελατών μας, εντοπίζουμε κανάλια προμήθειας κατάλληλα για τον κλάδο και τη ζήτηση και διαχειριζόμαστε αξιόπιστα τη διαδικασία του εμπορίου.",
    "aboutSupport": "Στη Dynamic Era Export, προχωράμε πέρα ​​από την εύρεση προϊόντων και διαχειριζόμαστε κάθε βήμα του εμπορίου με εμπιστοσύνη, διαφάνεια και ταχύτητα.",
    "aboutFlowTitle": "Το εμπόριο βασίζεται στην εμπιστοσύνη, την ταχύτητα και τη διαφάνεια",
    "aboutFlowText1": "Από την πρώτη μέρα, ο βασικός μας στόχος ήταν να συνδέουμε τους πελάτες με τα σωστά κανάλια προμήθειας, να διαχειριζόμαστε αξιόπιστα τις διαδικασίες εισαγωγής και εξαγωγής και να γίνουμε επιχειρηματικός συνεργάτης που δημιουργεί αξία σε κάθε στάδιο του εμπορίου.",
    "aboutFlowText2": "Στο σημερινό τοπίο του παγκόσμιου εμπορίου, οι εταιρείες περιμένουν περισσότερα από ένα προϊόν: αξιόπιστο προμηθευτή, σωστή τιμολόγηση, βιώσιμες επιχειρηματικές σχέσεις, λειτουργική παρακολούθηση και γρήγορη επικοινωνία. Στη Dynamic Era Export, υιοθετούμε μια ολιστική εμπορική προσέγγιση που λαμβάνει υπόψη όλες αυτές τις ανάγκες.",
    "aboutPillars": [
      [
        "Το Όραμά μας",
        "Για να γίνετε μια ισχυρή εμπορική επωνυμία γνωστή για την αξιοπιστία, την ταχύτητα και τη σκέψη με επίκεντρο τις λύσεις στο παγκόσμιο εμπόριο, προσφέροντας παράλληλα βιώσιμες λύσεις προμήθειας σε διαφορετικούς τομείς."
      ],
      [
        "Η αποστολή μας",
        "Να αναλύουμε σωστά τις ανάγκες των πελατών μας για εισαγωγή, εξαγωγή και προμήθεια και να παρέχουμε τις καταλληλότερες εμπορικές λύσεις με ποιοτικά προϊόντα, αξιόπιστες πηγές, ανταγωνιστικές τιμές και επαγγελματική λειτουργική υποστήριξη."
      ],
      [
        "Η προσέγγισή μας",
        "Βλέπουμε κάθε συνεργασία ως μια μακροπρόθεσμη εμπορική σχέση και επικεντρωνόμαστε όχι μόνο στα τρέχοντα αιτήματα προϊόντων, αλλά και στις μελλοντικές ανάγκες των πελατών μας."
      ]
    ],
    "aboutOperationsEyebrow": "Τι κάνουμε",
    "aboutOperationsTitle": "Παρέχουμε υποστήριξη από άκρο σε άκρο στις διαδικασίες εισαγωγής, εξαγωγής και προμήθειας.",
    "aboutOperations": [
      [
        null,
        "Υποστήριξη εισαγωγών και εξαγωγών",
        "Παρέχουμε εμπορική υποστήριξη σε διαδικασίες εισαγωγής και εξαγωγής."
      ],
      [
        null,
        "Έρευνα προϊόντων και προμηθευτών",
        "Ερευνούμε προϊόντα και προμηθευτές για διαφορετικούς τομείς."
      ],
      [
        null,
        "Ομάδες προϊόντων που ταιριάζουν στη ζήτηση",
        "Εντοπίζουμε κατάλληλες ομάδες προϊόντων με βάση τη ζήτηση των πελατών."
      ],
      [
        null,
        "Συνδέσεις προμηθευτών",
        "Συνδεόμαστε με τοπικούς και διεθνείς προμηθευτές."
      ],
      [
        null,
        "Τιμές και λειτουργίες",
        "Διαχειριζόμαστε τις προσφορές, τις τιμές και τις λειτουργικές διαδικασίες."
      ],
      [
        null,
        "Βιώσιμη προμήθεια",
        "Προσφέρουμε λύσεις βιώσιμης προμήθειας σε μεγάλες κατηγορίες προϊόντων."
      ]
    ],
    "aboutValuesEyebrow": "Οι αξίες μας",
    "aboutValuesTitle": "Πιστεύουμε ότι η εμπιστοσύνη, η ταχύτητα, η ευελιξία και η παγκόσμια προοπτική είναι τα θεμέλια του εμπορίου.",
    "aboutValues": [
      [
        "Αξιοπιστία",
        "Υιοθετούμε μια διαφανή, υπεύθυνη και βιώσιμη προσέγγιση σε όλες τις επιχειρηματικές διαδικασίες."
      ],
      [
        "Ταχύτητα",
        "Ανταποκρινόμαστε γρήγορα στα αιτήματα των πελατών, σχεδιάζουμε τη διαδικασία αποτελεσματικά και παρακολουθούμε στενά τη λειτουργική ροή."
      ],
      [
        "Ευκαμψία",
        "Αντί για σταθερά μοτίβα, δημιουργούμε λύσεις για συγκεκριμένο έργο, για συγκεκριμένο προϊόν και για συγκεκριμένη ζήτηση."
      ],
      [
        "Παγκόσμια Προοπτική",
        "Αξιολογώντας διαφορετικές αγορές, ομάδες προϊόντων και πηγές προμήθειας, προσφέρουμε ευρύτερες επιλογές."
      ]
    ],
    "aboutCtaEyebrow": "Συνεργασία με το Dynamic Era Export",
    "aboutCtaTitle": "Ας κάνουμε τη διαδικασία συναλλαγών σας ασφαλέστερη, ταχύτερη και πιο αποτελεσματική.",
    "aboutCtaText": "Είτε αναζητάτε μια συγκεκριμένη ομάδα προϊόντων είτε χρειάζεστε επαγγελματική υποστήριξη για διαδικασίες εισαγωγής-εξαγωγής, η ομάδα μας είναι έτοιμη να δημιουργήσει τη σωστή λύση για εσάς.",
    "aboutCtaPrimary": "Επικοινωνήστε μέσω WhatsApp",
    "aboutCtaEmail": "Επικοινωνία μέσω email",
    "aboutCtaSecondary": "Σελίδα επικοινωνίας",
    "values": [
      "Ευρύ δίκτυο προϊόντων και κλάδου",
      "Αξιόπιστη διαδικασία εμπορίου",
      "Ευέλικτες και γρήγορες λύσεις",
      "Διεθνής εμπορική εμπειρία"
    ],
    "contactLead": "Όποιο και αν είναι το προϊόν, η χώρα-στόχος ή η κατηγορία που αναζητάτε, μπορούμε να ξεκινήσουμε με ένα σύντομο μήνυμα.",
    "form": {
      "configTitle": "Η υπηρεσία φόρμας δεν έχει ρυθμιστεί",
      "configText": "Για την αποστολή μηνυμάτων πρέπει να προστεθεί ένα κλειδί πρόσβασης Web3Forms. Μπορείτε να επικοινωνήσετε μαζί μας μέσω WhatsApp στο μεταξύ.",
      "successTitle": "Το μήνυμά σας στάλθηκε με επιτυχία",
      "successText": "Σας ευχαριστώ. Θα επικοινωνήσουμε μαζί σας το συντομότερο δυνατό.",
      "errorTitle": "Δεν ήταν δυνατή η αποστολή του μηνύματος",
      "errorText": "Δοκιμάστε ξανά σύντομα ή επικοινωνήστε μαζί μας μέσω WhatsApp.",
      "rateTitle": "Περιμένετε λίγο",
      "rateText": "Για προστασία από ανεπιθύμητα μηνύματα, μπορείτε να στείλετε μόνο ένα μήνυμα ανά λεπτό."
    },
    "partnersTitle": "Παγκόσμιο Οικοσύστημα Εμπορίου",
    "importantLinksTitle": "Σημαντικοί σύνδεσμοι",
    "footerWhatsappTitle": "Επικοινωνήστε μαζί μας στο WhatsApp",
    "footerWhatsappText": "Επικοινωνήστε μαζί μας απευθείας για το προϊόν, τον τομέα ή το αίτημα προμήθειας.",
    "footer": "Σαφής επικοινωνία σε εισαγωγές, εξαγωγές και παγκόσμιες δραστηριότητες προμήθειας.",
    "copyright": "© Πνευματικά δικαιώματα 2026 Dynamic Era Export. Με την επιφύλαξη παντός δικαιώματος."
  }
};

function mergeCompletionCopy(base, patch) {
  if (patch === null || patch === undefined) return base;
  if (Array.isArray(base) && Array.isArray(patch)) {
    const result = [...base];
    patch.forEach((value, index) => {
      if (value !== null && value !== undefined) {
        result[index] = mergeCompletionCopy(base[index], value);
      }
    });
    return result;
  }
  if (base && typeof base === "object" && !Array.isArray(base) && patch && typeof patch === "object" && !Array.isArray(patch)) {
    const result = { ...base };
    Object.entries(patch).forEach(([key, value]) => {
      result[key] = mergeCompletionCopy(base[key], value);
    });
    return result;
  }
  return patch;
}

Object.entries(autoLanguageCompletionCopy).forEach(([code, localizedCopy]) => {
  copy[code] = mergeCompletionCopy(copy[code] || copy.en, localizedCopy);
});

const finalLanguageCopyFixes = {
  fr: {
    nav: ["Accueil", "Secteurs", "À propos", "Nous contacter"],
    contactTitle: "Nous contacter",
    categories: { textile: ["Textile et habillement", "Tissus, prêt-à-porter, vêtements de travail, textiles techniques et différents groupes textiles."] },
    categoryDetails: { textile: { title: "Textile et habillement" } },
  },
  nl: {
    nav: ["Start", "Sectoren", "Over ons", "Contact opnemen"],
    contactTitle: "Contact opnemen",
  },
  ro: {
    nav: ["Acasă", "Sectoare", "Despre noi", "Contactează-ne"],
    contactTitle: "Contactează-ne",
    categories: { textile: ["Textile și confecții", "Țesături, îmbrăcăminte, echipamente de lucru, textile tehnice și grupuri textile diferite."] },
    categoryDetails: { textile: { title: "Textile și confecții" } },
  },
};

Object.entries(finalLanguageCopyFixes).forEach(([code, localizedCopy]) => {
  copy[code] = mergeLanguageCopy(copy[code] || copy.en, localizedCopy);
});

copy.fr.allSectors[2] = ["Textile et habillement", "Tissus, prêt-à-porter, vêtements de travail, textiles techniques et différents groupes textiles."];
copy.ro.allSectors[2] = ["Textile și confecții", "Țesături, îmbrăcăminte, echipamente de lucru, textile tehnice și grupuri textile diferite."];
copy.el.allSectors[18] = ["Εμπόριο με υποστήριξη logistics", "Υποστήριξη συντονισμού για αποστολή, παράδοση και επιχειρησιακή παρακολούθηση."];

const SITE_URL = "https://dynamiceraexport.com";
const routePaths = {
  tr: { home: "/", categories: "/sektorler", about: "/hakkimizda", contact: "/iletisim" },
  en: { home: "/en", categories: "/en/sectors", about: "/en/about", contact: "/en/contact" },
  it: { home: "/it", categories: "/it/settori", about: "/it/chi-siamo", contact: "/it/contatto" },
  pt: { home: "/pt", categories: "/pt/setores", about: "/pt/sobre", contact: "/pt/contato" },
  zh: { home: "/zh", categories: "/zh/sectors", about: "/zh/about", contact: "/zh/contact" },
  fa: { home: "/fa", categories: "/fa/sectors", about: "/fa/about", contact: "/fa/contact" },
  uk: { home: "/uk", categories: "/uk/sectors", about: "/uk/about", contact: "/uk/contact" },
  ro: { home: "/ro", categories: "/ro/sectoare", about: "/ro/despre-noi", contact: "/ro/contact" },
  bg: { home: "/bg", categories: "/bg/sectors", about: "/bg/about", contact: "/bg/contact" },
  az: { home: "/az", categories: "/az/sektorlar", about: "/az/haqqimizda", contact: "/az/elaqe" },
  pl: { home: "/pl", categories: "/pl/sektory", about: "/pl/o-nas", contact: "/pl/kontakt" },
  el: { home: "/el", categories: "/el/sectors", about: "/el/about", contact: "/el/contact" },
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
  it: "Sourcing globale e commercio | Dynamic Era Export",
  pt: "Sourcing global e comércio | Dynamic Era Export",
  zh: "全球采购与贸易 | Dynamic Era Export",
  fa: "تأمین جهانی و تجارت | Dynamic Era Export",
  uk: "Глобальні поставки та торгівля | Dynamic Era Export",
  ro: "Aprovizionare globală și comerț | Dynamic Era Export",
  bg: "Глобални доставки и търговия | Dynamic Era Export",
  az: "Qlobal təchizat və ticarət | Dynamic Era Export",
  pl: "Globalne zaopatrzenie i handel | Dynamic Era Export",
  el: "Παγκόσμια προμήθεια και εμπόριο | Dynamic Era Export",
  ru: "Глобальные поставки и торговля | Dynamic Era Export",
  fr: "Approvisionnement et commerce mondial | Dynamic Era Export",
  de: "Globale Beschaffung und Handel | Dynamic Era Export",
  nl: "Wereldwijde sourcing en handel | Dynamic Era Export",
  ar: "التوريد والتجارة العالمية | Dynamic Era Export",
};
const localeCodes = {
  tr: "tr_TR",
  en: "en_US",
  it: "it_IT",
  pt: "pt_PT",
  zh: "zh_CN",
  fa: "fa_IR",
  uk: "uk_UA",
  ro: "ro_RO",
  bg: "bg_BG",
  az: "az_AZ",
  pl: "pl_PL",
  el: "el_GR",
  ru: "ru_RU",
  fr: "fr_FR",
  de: "de_DE",
  nl: "nl_NL",
  ar: "ar_AE",
};

const searchUiCopy = {
  tr: {
    open: "Site içinde ara",
    title: "Sitede ara",
    placeholder: "Sektör, hizmet, sayfa veya ürün grubu ara",
    hint: "En az 2 karakter yazın.",
    empty: "Sonuç bulunamadı. Farklı bir kelime deneyin.",
    close: "Aramayı kapat",
    page: "Sayfa",
    sector: "Sektör",
    service: "Hizmet",
    process: "Süreç",
    value: "Değer",
    resultCount: "sonuç",
  },
  en: {
    open: "Search site",
    title: "Search the site",
    placeholder: "Search sectors, services, pages or product groups",
    hint: "Type at least 2 characters.",
    empty: "No results found. Try another keyword.",
    close: "Close search",
    page: "Page",
    sector: "Sector",
    service: "Service",
    process: "Process",
    value: "Value",
    resultCount: "results",
  },
  ru: {
    open: "Поиск по сайту",
    title: "Поиск по сайту",
    placeholder: "Ищите сектора, услуги, страницы или группы продуктов",
    hint: "Введите минимум 2 символа.",
    empty: "Результаты не найдены. Попробуйте другое слово.",
    close: "Закрыть поиск",
    page: "Страница",
    sector: "Сектор",
    service: "Услуга",
    process: "Процесс",
    value: "Ценность",
    resultCount: "результатов",
  },
  fr: {
    open: "Rechercher sur le site",
    title: "Rechercher sur le site",
    placeholder: "Rechercher secteurs, services, pages ou groupes de produits",
    hint: "Saisissez au moins 2 caractères.",
    empty: "Aucun résultat trouvé. Essayez un autre mot.",
    close: "Fermer la recherche",
    page: "Page",
    sector: "Secteur",
    service: "Service",
    process: "Processus",
    value: "Valeur",
    resultCount: "résultats",
  },
  de: {
    open: "Website durchsuchen",
    title: "Website durchsuchen",
    placeholder: "Branchen, Services, Seiten oder Produktgruppen suchen",
    hint: "Mindestens 2 Zeichen eingeben.",
    empty: "Keine Ergebnisse gefunden. Versuchen Sie ein anderes Wort.",
    close: "Suche schließen",
    page: "Seite",
    sector: "Branche",
    service: "Service",
    process: "Prozess",
    value: "Wert",
    resultCount: "Ergebnisse",
  },
  nl: {
    open: "Zoeken op site",
    title: "Zoeken op de site",
    placeholder: "Zoek sectoren, diensten, pagina's of productgroepen",
    hint: "Typ minimaal 2 tekens.",
    empty: "Geen resultaten gevonden. Probeer een ander woord.",
    close: "Zoeken sluiten",
    page: "Pagina",
    sector: "Sector",
    service: "Dienst",
    process: "Proces",
    value: "Waarde",
    resultCount: "resultaten",
  },
  ar: {
    open: "البحث في الموقع",
    title: "البحث في الموقع",
    placeholder: "ابحث عن القطاعات أو الخدمات أو الصفحات أو مجموعات المنتجات",
    hint: "اكتب حرفين على الأقل.",
    empty: "لم يتم العثور على نتائج. جرب كلمة أخرى.",
    close: "إغلاق البحث",
    page: "صفحة",
    sector: "قطاع",
    service: "خدمة",
    process: "عملية",
    value: "قيمة",
    resultCount: "نتائج",
  },
};

Object.assign(searchUiCopy, {
  it: { ...searchUiCopy.en, open: "Cerca nel sito", title: "Cerca nel sito", placeholder: "Cerca settori, servizi, pagine o prodotti", empty: "Nessun risultato trovato.", close: "Chiudi ricerca", page: "Pagina", sector: "Settore", service: "Servizio", process: "Processo", value: "Valore", resultCount: "risultati" },
  pt: { ...searchUiCopy.en, open: "Pesquisar no site", title: "Pesquisar no site", placeholder: "Pesquise setores, serviços, páginas ou produtos", empty: "Nenhum resultado encontrado.", close: "Fechar pesquisa", page: "Página", sector: "Setor", service: "Serviço", process: "Processo", value: "Valor", resultCount: "resultados" },
  zh: { ...searchUiCopy.en, open: "站内搜索", title: "站内搜索", placeholder: "搜索行业、服务、页面或产品组", hint: "至少输入 2 个字符。", empty: "未找到结果。", close: "关闭搜索", page: "页面", sector: "行业", service: "服务", process: "流程", value: "价值", resultCount: "结果" },
  fa: { ...searchUiCopy.en, open: "جستجو در سایت", title: "جستجو در سایت", placeholder: "جستجوی بخش، خدمات، صفحه یا گروه محصول", hint: "حداقل ۲ کاراکتر وارد کنید.", empty: "نتیجه‌ای یافت نشد.", close: "بستن جستجو", page: "صفحه", sector: "بخش", service: "خدمت", process: "فرآیند", value: "ارزش", resultCount: "نتیجه" },
  uk: { ...searchUiCopy.en, open: "Пошук по сайту", title: "Пошук по сайту", placeholder: "Шукайте сектори, послуги, сторінки або групи товарів", empty: "Нічого не знайдено.", close: "Закрити пошук", page: "Сторінка", sector: "Сектор", service: "Послуга", process: "Процес", value: "Цінність", resultCount: "результатів" },
  ro: { ...searchUiCopy.en, open: "Caută pe site", title: "Caută pe site", placeholder: "Caută sectoare, servicii, pagini sau produse", empty: "Nu s-au găsit rezultate.", close: "Închide căutarea", page: "Pagină", sector: "Sector", service: "Serviciu", process: "Proces", value: "Valoare", resultCount: "rezultate" },
  bg: { ...searchUiCopy.en, open: "Търсене в сайта", title: "Търсене в сайта", placeholder: "Търсете сектори, услуги, страници или продукти", empty: "Няма намерени резултати.", close: "Затвори търсенето", page: "Страница", sector: "Сектор", service: "Услуга", process: "Процес", value: "Стойност", resultCount: "резултата" },
  az: { ...searchUiCopy.en, open: "Saytda axtar", title: "Saytda axtar", placeholder: "Sektor, xidmət, səhifə və ya məhsul qrupu axtar", empty: "Nəticə tapılmadı.", close: "Axtarışı bağla", page: "Səhifə", sector: "Sektor", service: "Xidmət", process: "Proses", value: "Dəyər", resultCount: "nəticə" },
  pl: { ...searchUiCopy.en, open: "Szukaj w serwisie", title: "Szukaj w serwisie", placeholder: "Szukaj sektorów, usług, stron lub produktów", empty: "Nie znaleziono wyników.", close: "Zamknij wyszukiwanie", page: "Strona", sector: "Sektor", service: "Usługa", process: "Proces", value: "Wartość", resultCount: "wyników" },
  el: { ...searchUiCopy.en, open: "Αναζήτηση στον ιστότοπο", title: "Αναζήτηση στον ιστότοπο", placeholder: "Αναζητήστε κλάδους, υπηρεσίες, σελίδες ή προϊόντα", empty: "Δεν βρέθηκαν αποτελέσματα.", close: "Κλείσιμο αναζήτησης", page: "Σελίδα", sector: "Κλάδος", service: "Υπηρεσία", process: "Διαδικασία", value: "Αξία", resultCount: "αποτελέσματα" },
});

Object.assign(searchUiCopy, {
  fr: { ...searchUiCopy.fr, page: "Page du site", service: "Service proposé" },
  de: { ...searchUiCopy.de, service: "Dienstleistung" },
  nl: { ...searchUiCopy.nl, sector: "Sectorgebied" },
  it: { ...searchUiCopy.it, hint: "Inserisci almeno 2 caratteri." },
  pt: { ...searchUiCopy.pt, hint: "Digite pelo menos 2 caracteres." },
  uk: { ...searchUiCopy.uk, hint: "Введіть щонайменше 2 символи." },
  ro: { ...searchUiCopy.ro, hint: "Introduceți cel puțin 2 caractere.", sector: "Domeniu" },
  bg: { ...searchUiCopy.bg, hint: "Въведете поне 2 символа." },
  az: { ...searchUiCopy.az, hint: "Ən azı 2 simvol daxil edin." },
  pl: { ...searchUiCopy.pl, hint: "Wpisz co najmniej 2 znaki." },
  el: { ...searchUiCopy.el, hint: "Πληκτρολογήστε τουλάχιστον 2 χαρακτήρες." },
});

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
  document.head.querySelectorAll('link[rel="alternate"][hreflang]').forEach((link) => link.remove());
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

function normalizeSearchText(value) {
  return String(value || "")
    .toLocaleLowerCase("tr")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function compactSearchText(parts) {
  return parts.flat(Infinity).filter(Boolean).map((part) => String(part).trim()).filter(Boolean).join(" ");
}

function buildSearchItems(t, lang) {
  const ui = searchUiCopy[lang] || searchUiCopy.en;
  const items = pages.map((pageKey, index) => {
    const title = t.nav[index];
    const descriptions = {
      home: compactSearchText([t.homeTitle, t.homeText, t.homeSubText, t.homeAboutTitle, t.homeAboutText]),
      categories: compactSearchText([t.categoryPageTitle, t.categoryPageLead, t.categoryCustomCtaText]),
      about: compactSearchText([t.aboutTitle, t.aboutText, t.aboutIntroText, t.aboutSupport, t.aboutFlowTitle]),
      contact: compactSearchText([t.contactTitle, t.contactLead, t.contactText, t.contactSubtitle]),
    };
    return {
      id: `page-${pageKey}`,
      type: ui.page,
      title,
      description: descriptions[pageKey] || title,
      page: pageKey,
      category: null,
    };
  });

  const categoryItems = categoryOrder.map((key) => {
    const [title, description] = getCategoryEntry(t, key);
    const detail = getCategoryDetail(t, key);
    return {
      id: `category-${key}`,
      type: ui.sector,
      title,
      description: compactSearchText([description, detail.title, detail.text, detail.points]),
      page: "categories",
      category: key,
    };
  });

  const serviceItems = (t.services || []).map(([title, description], index) => ({
    id: `service-${index}`,
    type: ui.service,
    title,
    description,
    page: "home",
    category: null,
  }));

  const processItems = (t.processSteps || []).map((step, index) => {
    const [, title, description] = step;
    return {
      id: `process-${index}`,
      type: ui.process,
      title,
      description,
      page: "home",
      category: null,
    };
  });

  const valueItems = (t.aboutValues || []).map(([title, description], index) => ({
    id: `value-${index}`,
    type: ui.value,
    title,
    description,
    page: "about",
    category: null,
  }));

  return [...items, ...categoryItems, ...serviceItems, ...processItems, ...valueItems].map((item) => ({
    ...item,
    haystack: normalizeSearchText(compactSearchText([item.title, item.description, item.type])),
  }));
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
  setMetaTag("name", "author", "Dynamic Era Export");
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
      name: "Dynamic Era Export",
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
      sameAs: socialLinks.map((item) => item.url),
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

  const faqItems = seoFaqContent[lang]?.items || seoFaqContent.en?.items || [];
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
  const [searchOpen, setSearchOpen] = useState(false);
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

  const openSearch = () => {
    setMenuOpen(false);
    setSearchOpen(true);
  };

  const closeSearch = () => setSearchOpen(false);

  const handleSearchSelect = (result) => {
    closeSearch();
    goTo(result.page, result.category);
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
        onSearchOpen={openSearch}
      />
      <SearchOverlay
        open={searchOpen}
        t={t}
        lang={lang}
        onClose={closeSearch}
        onSelect={handleSearchSelect}
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
      <FloatingWhatsApp t={t} />
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

function SocialIcon({ type, size = 18 }) {
  const paths = {
    linkedin:
      "M7.2 8.5h3.1v10H7.2v-10Zm1.55-5a1.8 1.8 0 1 1 0 3.6 1.8 1.8 0 0 1 0-3.6Zm5.35 5h2.96v1.36h.04c.41-.78 1.42-1.6 2.92-1.6 3.13 0 3.7 2.06 3.7 4.73v5.51h-3.08v-4.88c0-1.17-.02-2.67-1.63-2.67-1.64 0-1.89 1.28-1.89 2.59v4.96H14.1v-10Z",
    x:
      "M14.48 10.42 22.08 2h-1.8l-6.6 7.32L8.41 2H2.33l7.97 11.07L2.33 22h1.8l6.97-7.73L16.67 22h6.08l-8.27-11.58Zm-2.47 2.73-.81-1.1L4.78 3.29h2.77l5.18 7.07.81 1.1 6.74 9.2h-2.77l-5.5-7.51Z",
    facebook:
      "M17.8 5.5h2.3V2.2A24 24 0 0 0 16.75 2c-3.32 0-5.59 2.04-5.59 5.78v3.23H7.4v3.7h3.76V24h4.52v-9.29h3.75l.6-3.7h-4.35V8.14c0-1.07.29-2.64 2.12-2.64Z",
    instagram:
      "M12 6.7c2.1 0 2.35.01 3.18.05.77.04 1.18.17 1.46.28.36.14.62.31.9.58.27.27.44.53.58.9.11.27.24.69.28 1.46.04.83.05 1.08.05 3.18s-.01 2.35-.05 3.18c-.04.77-.17 1.18-.28 1.46-.14.36-.31.62-.58.9-.27.27-.53.44-.9.58-.27.11-.69.24-1.46.28-.83.04-1.08.05-3.18.05s-2.35-.01-3.18-.05c-.77-.04-1.18-.17-1.46-.28a2.42 2.42 0 0 1-.9-.58 2.42 2.42 0 0 1-.58-.9c-.11-.27-.24-.69-.28-1.46-.04-.83-.05-1.08-.05-3.18s.01-2.35.05-3.18c.04-.77.17-1.18.28-1.46.14-.36.31-.62.58-.9.27-.27.53-.44.9-.58.27-.11.69-.24 1.46-.28.83-.04 1.08-.05 3.18-.05Zm0-2.2c-2.14 0-2.41.01-3.28.05-.86.04-1.45.18-1.96.38a4.62 4.62 0 0 0-1.68 1.1 4.62 4.62 0 0 0-1.1 1.68c-.2.51-.34 1.1-.38 1.96-.04.87-.05 1.14-.05 3.28s.01 2.41.05 3.28c.04.86.18 1.45.38 1.96.21.53.49.98 1.1 1.68.7.61 1.15.89 1.68 1.1.51.2 1.1.34 1.96.38.87.04 1.14.05 3.28.05s2.41-.01 3.28-.05c.86-.04 1.45-.18 1.96-.38a4.62 4.62 0 0 0 1.68-1.1 4.62 4.62 0 0 0 1.1-1.68c.2-.51.34-1.1.38-1.96.04-.87.05-1.14.05-3.28s-.01-2.41-.05-3.28c-.04-.86-.18-1.45-.38-1.96a4.62 4.62 0 0 0-1.1-1.68 4.62 4.62 0 0 0-1.68-1.1c-.51-.2-1.1-.34-1.96-.38-.87-.04-1.14-.05-3.28-.05Zm0 4.35a4.15 4.15 0 1 0 0 8.3 4.15 4.15 0 0 0 0-8.3Zm0 6.1a1.95 1.95 0 1 1 0-3.9 1.95 1.95 0 0 1 0 3.9Zm4.42-6.32a.97.97 0 1 0 0-1.94.97.97 0 0 0 0 1.94Z",
  };

  return (
    <svg
      className="social-icon"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
    >
      <path fill="currentColor" d={paths[type] || paths.linkedin} />
    </svg>
  );
}

function SocialLinks({ className = "" }) {
  return (
    <div className={`social-links ${className}`.trim()}>
      {socialLinks.map((item) => (
        <a
          key={item.key}
          href={item.url}
          data-social={item.key}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${company.name} ${item.name}`}
          title={item.name}
        >
          <SocialIcon type={item.key} />
          <span className="sr-only">{item.name}</span>
        </a>
      ))}
    </div>
  );
}

function FloatingWhatsApp({ t }) {
  const label = t.direct || t.whatsapp || "Contact via WhatsApp";
  return (
    <a
      className="floating-whatsapp"
      href={`https://wa.me/${company.whatsapp}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      title={label}
    >
      <WhatsAppIcon size={30} />
      <span className="sr-only">{label}</span>
    </a>
  );
}

function LanguageFlag({ code }) {
  const Flag = languageFlags[code] || TR;
  return (
    <Flag className="language-flag" aria-hidden="true" />
  );
}

function Header({ t, lang, setLang, page, goTo, menuOpen, setMenuOpen, onSearchOpen }) {
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
        <span className="sr-only">Dynamic Era Export - Dynamic Era Export</span>
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
        <button className="search-toggle" type="button" aria-label={(searchUiCopy[lang] || searchUiCopy.en).open} onClick={onSearchOpen}>
          <Search size={19} />
        </button>
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
        <SocialLinks className="header-social-links" />
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

function SearchOverlay({ open, t, lang, onClose, onSelect }) {
  const [query, setQuery] = useState("");
  const inputRef = React.useRef(null);
  const ui = searchUiCopy[lang] || searchUiCopy.en;
  const items = React.useMemo(() => buildSearchItems(t, lang), [t, lang]);
  const normalizedQuery = normalizeSearchText(query);
  const results = React.useMemo(() => {
    if (normalizedQuery.length < 2) return [];
    return items
      .filter((item) => item.haystack.includes(normalizedQuery))
      .slice(0, 12);
  }, [items, normalizedQuery]);

  useEffect(() => {
    if (!open) return undefined;
    const focusTimer = window.setTimeout(() => inputRef.current?.focus(), 40);
    const closeOnEscape = (event) => {
      if (event.key === "Escape") onClose();
    };
    document.body.classList.add("search-lock");
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      window.clearTimeout(focusTimer);
      window.removeEventListener("keydown", closeOnEscape);
      document.body.classList.remove("search-lock");
    };
  }, [open, onClose]);

  useEffect(() => {
    if (open) setQuery("");
  }, [open]);

  if (!open) return null;

  return (
    <div className="search-overlay" role="dialog" aria-modal="true" aria-labelledby="site-search-title">
      <button className="search-backdrop" type="button" aria-label={ui.close} onClick={onClose} />
      <div className="search-panel">
        <div className="search-panel-head">
          <div>
            <span>{company.name}</span>
            <h2 id="site-search-title">{ui.title}</h2>
          </div>
          <button className="search-close" type="button" aria-label={ui.close} onClick={onClose}>
            <X size={22} />
          </button>
        </div>

        <label className="search-field">
          <Search size={22} />
          <input
            ref={inputRef}
            type="search"
            value={query}
            placeholder={ui.placeholder}
            onChange={(event) => setQuery(event.target.value)}
          />
        </label>

        <div className="search-meta">
          {normalizedQuery.length < 2 ? ui.hint : `${results.length} ${ui.resultCount}`}
        </div>

        <div className="search-results">
          {normalizedQuery.length >= 2 && results.length === 0 && (
            <div className="search-empty">
              <CircleAlert size={21} />
              <span>{ui.empty}</span>
            </div>
          )}
          {results.map((result) => (
            <button
              key={result.id}
              type="button"
              className="search-result"
              onClick={() => onSelect(result)}
            >
              <span>{result.type}</span>
              <strong>{result.title}</strong>
              <small>{truncateSeoText(result.description, 170)}</small>
              <ArrowRight size={18} />
            </button>
          ))}
        </div>
      </div>
    </div>
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
  const content = seoFaqContent[lang] || seoFaqContent.en || seoFaqContent.tr;

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
            <SocialLinks className="contact-social-links" />
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
          <SocialLinks className="footer-social-links" />
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
        <span>{t.copyright || "© Copyright 2026 Dynamic Era Export. Tüm hakları saklıdır."}</span>
      </div>
    </footer>
  );
}

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
