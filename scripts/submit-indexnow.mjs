import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, "..");

const host = "dynamiceraexport.com";
const key = "69570477b14e45a4afc0299da97acd3c27ed049ef2714d10";
const keyLocation = `https://${host}/${key}.txt`;
const endpoint = "https://api.indexnow.org/indexnow";

const sitemapPath = path.join(projectRoot, "public", "sitemap.xml");
const sitemap = await readFile(sitemapPath, "utf8");
const urls = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) => match[1]);

if (!urls.length) {
  throw new Error("No URLs found in public/sitemap.xml");
}

const response = await fetch(endpoint, {
  method: "POST",
  headers: {
    "Content-Type": "application/json; charset=utf-8",
  },
  body: JSON.stringify({
    host,
    key,
    keyLocation,
    urlList: urls,
  }),
});

if (!response.ok) {
  const body = await response.text();
  throw new Error(`IndexNow submission failed: ${response.status} ${body}`);
}

console.log(`Submitted ${urls.length} URLs to IndexNow.`);
