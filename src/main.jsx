import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  ArrowRight,
  Building2,
  ChevronDown as ChevronDownIcon,
  Factory,
  Globe2,
  HeartPulse,
  Mail,
  MapPin,
  Menu,
  PackageCheck,
  Phone,
  Shield,
  Sparkles,
  Wheat,
  X,
  Zap,
} from "lucide-react";
import { AE, GB, TR } from "country-flag-icons/react/3x2";
import "./styles.css";

const company = {
  name: "Dynamic Era Export",
  suffix: "Global Trade, Dynamic Solutions",
  phone: "+90 555 111 22 33",
  whatsapp: "905551112233",
  email: "info@dynamiceraexport.com",
  location: "Istanbul, Turkiye",
};

const languages = [
  { code: "tr", label: "TR", name: "Türkçe", dir: "ltr" },
  { code: "en", label: "EN", name: "English", dir: "ltr" },
  { code: "ar", label: "AR", name: "العربية", dir: "rtl" },
];

const languageFlags = {
  tr: TR,
  en: GB,
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
  construction: Building2,
  textile: Factory,
  food: Wheat,
  health: HeartPulse,
  defense: Shield,
};

const heroImages = [
  "https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=2100&q=84",
  "https://images.unsplash.com/photo-1494412651409-8963ce7935a7?auto=format&fit=crop&w=2100&q=84",
  "https://images.unsplash.com/photo-1553413077-190dd305871c?auto=format&fit=crop&w=2100&q=84",
];

const partnerLogos = [
  { name: "Astra Global", code: "AG" },
  { name: "Nova Supply", code: "NS" },
  { name: "Blue Port", code: "BP" },
  { name: "Meridian Trade", code: "MT" },
  { name: "Atlas Works", code: "AW" },
  { name: "Vector Line", code: "VL" },
  { name: "Prime Source", code: "PS" },
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
};

const copy = {
  tr: {
    nav: ["Ana Sayfa", "Sektörler", "Hakkımızda", "İletişim"],
    whatsapp: "WhatsApp ile direkt iletişim",
    direct: "WhatsApp ile İletişime Geç",
    quoteCta: "Teklif Al",
    categoriesCta: "Faaliyet Alanlarını İncele",
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
      "Dynamic Era Exporters, iç ve dış ticaret alanında geniş ürün portföyü, güçlü tedarik ilişkileri ve çözüm odaklı yaklaşımıyla faaliyet gösteren bir ticaret şirketidir.\n\nEnerji, inşaat malzemeleri, tekstil, gıda, sağlık, savunma sanayi ve farklı ticaret kategorilerinde müşterilerinin ihtiyaçlarına uygun tedarik çözümleri geliştirir. Amacımız yalnızca ürün sağlamak değil; müşterilerimize güvenilir, sürdürülebilir ve verimli bir ticaret deneyimi sunmaktır.\n\nGeniş sektör ağı, esnek operasyon yapısı ve müşteri odaklı hizmet anlayışımızla, firmaların ithalat ve ihracat süreçlerinde güçlü bir iş ortağı olarak konumlanıyoruz.",
    aboutMore: "Hakkımızda Daha Fazla Bilgi",
    aboutTitle: "İhtiyacınız olan ürünü doğru kaynaktan temin ediyoruz.",
    aboutText:
      "Global ticarette başarı; doğru ürüne, doğru zamanda ve doğru şartlarda ulaşabilmekten geçer. Müşterilerimizin ihtiyaçlarını analiz ediyor, sektöre ve talebe uygun tedarik kaynaklarını belirliyor ve ticaret sürecini güvenilir şekilde yönetiyoruz.",
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
    },
    partnersTitle: "İş Ortaklarımız",
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
    categoriesCta: "View Categories",
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
    aboutTitle: "We source the product you need from the right source.",
    aboutText:
      "Success in global trade depends on reaching the right product, at the right time and under the right conditions. We analyze our customers' needs, identify sourcing channels suitable for the sector and demand, and manage the trade process reliably.",
    values: ["Wide product and sector network", "Reliable trade process", "Flexible and fast solutions", "International trade experience"],
    contactTitle: "Contact",
    contactLead: "Whatever the product, target country or category you are looking for, we can start with a short message.",
    form: {
      name: "Full Name",
      company: "Company",
      email: "Email",
      message: "What are you looking for?",
      send: "Send Email",
    },
    partnersTitle: "Our Partners",
    importantLinksTitle: "Important Links",
    footerWhatsappTitle: "Reach Us on WhatsApp",
    footerWhatsappText: "Contact us directly for your product, sector or sourcing request.",
    footer: "Clear communication in import, export and global sourcing operations.",
    copyright: "© Copyright 2026 Dynamic Era Exporters. All rights reserved.",
  },
  ar: {
    nav: ["الرئيسية", "القطاعات", "من نحن", "تواصل"],
    whatsapp: "تواصل مباشر عبر واتساب",
    direct: "تواصل عبر واتساب",
    quoteCta: "اطلب عرضا",
    categoriesCta: "استعرض مجالات العمل",
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
    aboutTitle: "نوفر المنتج الذي تحتاجونه من المصدر الصحيح.",
    aboutText:
      "يعتمد النجاح في التجارة العالمية على الوصول إلى المنتج الصحيح في الوقت الصحيح وبالشروط الصحيحة. نحلل احتياجات عملائنا ونحدد مصادر التوريد المناسبة للقطاع والطلب وندير العملية التجارية بثقة.",
    values: ["شبكة واسعة من المنتجات والقطاعات", "عملية تجارة موثوقة", "حلول مرنة وسريعة", "خبرة في التجارة الدولية"],
    contactTitle: "تواصل",
    contactLead: "أيا كان المنتج أو البلد المستهدف أو الفئة التي تبحثون عنها، يمكننا البدء برسالة قصيرة.",
    form: {
      name: "الاسم الكامل",
      company: "الشركة",
      email: "البريد الإلكتروني",
      message: "ماذا تبحث عنه؟",
      send: "إرسال بريد",
    },
    partnersTitle: "شركاؤنا",
    importantLinksTitle: "روابط مهمة",
    footerWhatsappTitle: "تواصلوا عبر واتساب",
    footerWhatsappText: "تواصلوا معنا مباشرة لطلب المنتج أو القطاع أو التوريد.",
    footer: "تواصل واضح في عمليات الاستيراد والتصدير والتوريد العالمي.",
    copyright: "© Copyright 2026 Dynamic Era Exporters. جميع الحقوق محفوظة.",
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

function App() {
  const [lang, setLang] = useState(getInitialLanguage);
  const [page, setPage] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("energy");
  const t = copy[lang];
  const isRtl = languages.find((item) => item.code === lang)?.dir === "rtl";

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = isRtl ? "rtl" : "ltr";
  }, [lang, isRtl]);

  useEffect(() => {
    const timer = window.setTimeout(() => setLoading(false), 1150);
    return () => window.clearTimeout(timer);
  }, []);

  const goTo = (target, category) => {
    if (category) {
      setSelectedCategory(category);
    }
    setPage(target);
    setMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className={`site-shell ${loading ? "is-loading" : "is-ready"}`}>
      <Loader loading={loading} />
      <Header
        t={t}
        lang={lang}
        setLang={setLang}
        page={page}
        goTo={goTo}
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
      />
      <main>
        {page === "home" && <Home t={t} goTo={goTo} />}
        {page === "categories" && (
          <CategoriesPage
            t={t}
            goTo={goTo}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />
        )}
        {page === "about" && <About t={t} />}
        {page === "contact" && <Contact t={t} />}
      </main>
      <Footer t={t} goTo={goTo} />
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
    <span className="logo-mark" aria-label="Dynamic Era Export">
      <img src="/dynamic-era-logo-original.svg" alt="Dynamic Era Export" />
    </span>
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
      <button className="brand" onClick={() => goTo("home")} aria-label="Home">
        <LogoMark />
      </button>

      <nav className={`nav ${menuOpen ? "nav-open" : ""}`} aria-label="Primary navigation">
        {pages.map((item, index) => (
          <button key={item} className={page === item ? "active" : ""} onClick={() => goTo(item)}>
            {t.nav[index]}
          </button>
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

function Home({ t, goTo }) {
  return (
    <>
      <Hero t={t} goTo={goTo} />
      <LogoTicker t={t} />
      <AboutIntro t={t} goTo={goTo} />
      <AboutShowcase t={t} goTo={goTo} />
      <ServicesSection t={t} />
      <CategoryPreview t={t} goTo={goTo} />
      <ProcessSection t={t} />
      <CtaBand t={t} goTo={goTo} />
    </>
  );
}

function LogoTicker({ t }) {
  const logos = [...partnerLogos, ...partnerLogos];

  return (
    <section className="logo-ticker" aria-label="Partner logos">
      <div className="logo-ticker-label">{t.partnersTitle || "İş Ortaklarımız"}</div>
      <div className="logo-ticker-window">
        <div className="logo-ticker-track">
          {logos.map((logo, index) => (
            <div className="ticker-logo" key={`${logo.name}-${index}`}>
              <PartnerLogo partner={logo} variant={index % partnerLogos.length} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function PartnerLogo({ partner, variant }) {
  return (
    <div className="partner-logo">
      <svg viewBox="0 0 58 38" aria-hidden="true" focusable="false">
        <circle cx="19" cy="19" r="14" />
        {variant % 3 === 0 && <path d="M15 24 L25 14 M15 14 L25 24" />}
        {variant % 3 === 1 && <path d="M12 23 C18 10 25 10 31 23" />}
        {variant % 3 === 2 && <path d="M11 21 H29 M20 12 V28" />}
        <path d="M37 12 H52 M37 19 H49 M37 26 H54" />
      </svg>
      <span>{partner.name}</span>
    </div>
  );
}

function Hero({ t, goTo }) {
  const [active, setActive] = useState(0);
  const heroStats = t.heroStats || t.metrics;

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActive((value) => (value + 1) % heroImages.length);
    }, 5400);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <section className="hero">
      {heroImages.map((image, index) => (
        <div
          key={image}
          className={`hero-image ${active === index ? "active" : ""}`}
          style={{ backgroundImage: `url(${image})` }}
        />
      ))}
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
  const introStats = [
    ["20+", "yıllık deneyim"],
    ["1500+", "müşteri"],
    ["20+", "sektör ağı"],
  ];

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
          <img className="about-intro-main" src={showcaseImages.logistics} alt="" />
          <img className="about-intro-side top" src={heroImages[2]} alt="" />
          <img className="about-intro-side bottom" src={heroImages[1]} alt="" />
        </Reveal>
      </div>
    </section>
  );
}

function AboutShowcase({ t, goTo }) {
  return (
    <section className="about-showcase">
      <Reveal className="showcase-media">
        <img className="showcase-main" src={showcaseImages.trade} alt="" />
        <img className="showcase-float top" src={showcaseImages.cargo} alt="" />
        <img className="showcase-float bottom" src={showcaseImages.textile} alt="" />
        <div className="showcase-badge">
          <strong>20+</strong>
          <span>{t.metrics[0][1]}</span>
        </div>
      </Reveal>
      <Reveal className="showcase-copy">
        <p className="eyebrow">{company.name}</p>
        <h2>{t.aboutTitle}</h2>
        <p>{t.aboutText}</p>
        <div className="showcase-values">
          {t.values.slice(0, 3).map((value) => (
            <span key={value}>{value}</span>
          ))}
        </div>
        <button className="primary-action" onClick={() => goTo("contact")}>
          {t.direct}
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

function CategoryPreview({ t, goTo }) {
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
                <button onClick={() => goTo("categories", key)}>
                  <ArrowRight size={18} />
                </button>
              </article>
            </Reveal>
          );
        })}
      </div>
      <Reveal className="category-cta-row">
        <button className="primary-action" onClick={() => goTo("categories")}>
          {t.allCategoriesCta || t.categoriesCta || "View All Categories"}
          <ArrowRight size={17} />
        </button>
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

function CategoriesPage({ t, goTo, selectedCategory, setSelectedCategory }) {
  const selected = getCategoryDetail(t, selectedCategory);
  const selectedLabel = getCategoryEntry(t, selectedCategory)[0];

  return (
    <section className="page-section">
      <Reveal className="page-intro">
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
                <button
                  key={key}
                  className={selectedCategory === key ? "active" : ""}
                  onClick={() => setSelectedCategory(key)}
                >
                  <Icon size={22} />
                  <span>{title}</span>
                  <small>{description}</small>
                </button>
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
    </section>
  );
}

function About({ t }) {
  return (
    <section className="page-section about-page">
      <Reveal className="about-hero">
        <div>
          <p className="eyebrow">20+ Years</p>
          <h1>{t.aboutTitle}</h1>
          <p>{t.aboutText}</p>
        </div>
        <div className="about-number">
          <strong>1500+</strong>
          <span>{t.metrics[1][1]}</span>
        </div>
      </Reveal>
      <div className="value-list page-values">
        {t.values.map((value) => (
          <Reveal key={value}>
            <div>
              <Sparkles size={18} />
              <span>{value}</span>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function Contact({ t }) {
  const [form, setForm] = useState({ name: "", company: "", email: "", message: "" });
  const update = (key) => (event) => setForm((value) => ({ ...value, [key]: event.target.value }));

  const submit = (event) => {
    event.preventDefault();
    const subject = encodeURIComponent(`${company.name} inquiry - ${form.company || form.name}`);
    const body = encodeURIComponent(
      `${t.form.name}: ${form.name}\n${t.form.company}: ${form.company}\n${t.form.email}: ${form.email}\n\n${form.message}`
    );
    window.location.href = `mailto:${company.email}?subject=${subject}&body=${body}`;
  };

  return (
    <section className="page-section contact-page">
      <Reveal className="page-intro">
        <p className="eyebrow">{t.contactTitle}</p>
        <h1>{t.contactLead}</h1>
      </Reveal>
      <div className="contact-layout">
        <Reveal>
          <form className="contact-form" onSubmit={submit}>
            <input required placeholder={t.form.name} value={form.name} onChange={update("name")} />
            <input placeholder={t.form.company} value={form.company} onChange={update("company")} />
            <input required type="email" placeholder={t.form.email} value={form.email} onChange={update("email")} />
            <textarea required rows="6" placeholder={t.form.message} value={form.message} onChange={update("message")} />
            <button className="primary-action" type="submit">
              <Mail size={18} />
              {t.form.send}
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
    </section>
  );
}

function Footer({ t, goTo }) {
  const footerServices = (t.services || []).slice(0, 4);

  return (
    <footer className="footer">
      <div className="footer-main">
        <div className="footer-brand-col">
          <button className="brand" onClick={() => goTo("home")} aria-label="Home">
            <LogoMark />
          </button>
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
            <button key={page} onClick={() => goTo(page)}>
              {t.nav[index]}
            </button>
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
