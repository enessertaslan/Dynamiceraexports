import { writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

const siteUrl = "https://dynamiceraexport.com";
const routePaths = {
  tr: { home: "/", categories: "/sektorler", about: "/hakkimizda", contact: "/iletisim" },
  en: { home: "/en", categories: "/en/sectors", about: "/en/about", contact: "/en/contact" },
  ru: { home: "/ru", categories: "/ru/sectors", about: "/ru/about", contact: "/ru/contact" },
  fr: { home: "/fr", categories: "/fr/secteurs", about: "/fr/a-propos", contact: "/fr/contact" },
  de: { home: "/de", categories: "/de/branchen", about: "/de/ueber-uns", contact: "/de/kontakt" },
  nl: { home: "/nl", categories: "/nl/sectoren", about: "/nl/over-ons", contact: "/nl/contact" },
  ar: { home: "/ar", categories: "/ar/sectors", about: "/ar/about", contact: "/ar/contact" },
};
const categories = [
  "energy", "construction", "textile", "food", "health", "defense", "electrical", "machinery", "furniture",
  "automotive", "plastic", "packaging", "cosmetics", "cleaning", "agriculture", "medical", "rawMaterial",
  "buildingProducts", "logisticsTrade", "generalSourcing",
];
const categorySlugs = {
  rawMaterial: "raw-material",
  buildingProducts: "building-products",
  logisticsTrade: "logistics-supported-trade",
  generalSourcing: "general-sourcing",
};
const languages = Object.keys(routePaths);
const lastmod = new Date().toISOString().slice(0, 10);

const escapeXml = (value) => value.replaceAll("&", "&amp;").replaceAll('"', "&quot;");
const pagePath = (lang, page, category) => {
  const basePath = routePaths[lang][page];
  return page === "categories" && category ? `${basePath}/${categorySlugs[category] || category}` : basePath;
};
const alternates = (page, category) => [
  ...languages.map((lang) => ({ lang, href: `${siteUrl}${pagePath(lang, page, category)}` })),
  { lang: "x-default", href: `${siteUrl}${pagePath("tr", page, category)}` },
];
const renderUrl = ({ lang, page, category, priority, changefreq }) => {
  const location = `${siteUrl}${pagePath(lang, page, category)}`;
  const alternateLinks = alternates(page, category)
    .map(({ lang: hreflang, href }) => `    <xhtml:link rel="alternate" hreflang="${hreflang}" href="${escapeXml(href)}" />`)
    .join("\n");
  return `  <url>\n    <loc>${escapeXml(location)}</loc>\n    <lastmod>${lastmod}</lastmod>\n    <changefreq>${changefreq}</changefreq>\n    <priority>${priority}</priority>\n${alternateLinks}\n  </url>`;
};

const entries = [];
for (const lang of languages) {
  entries.push({ lang, page: "home", priority: lang === "tr" ? "1.0" : "0.9", changefreq: "weekly" });
  entries.push({ lang, page: "categories", priority: lang === "tr" ? "0.9" : "0.8", changefreq: "weekly" });
  entries.push({ lang, page: "about", priority: lang === "tr" ? "0.8" : "0.7", changefreq: "monthly" });
  entries.push({ lang, page: "contact", priority: lang === "tr" ? "0.8" : "0.7", changefreq: "monthly" });
  for (const category of categories) {
    entries.push({ lang, page: "categories", category, priority: lang === "tr" ? "0.8" : "0.7", changefreq: "monthly" });
  }
}

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${entries.map(renderUrl).join("\n")}
</urlset>
`;

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
await writeFile(path.join(projectRoot, "public", "sitemap.xml"), sitemap, "utf8");
console.log(`Generated sitemap with ${entries.length} URLs.`);
