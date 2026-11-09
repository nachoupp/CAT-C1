// Crea dist-viewer/parla-c1.html: tota l'app en un sol fitxer (JS i CSS inline) per obrir-la en un visor.
import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { join } from "node:path";

const dist = "dist";
let html = readFileSync(join(dist, "index.html"), "utf8");
html = html.replace(/<script type="module" crossorigin src="([^"]+)"><\/script>/g, (_, src) => {
  const js = readFileSync(join(dist, src.replace(/^\//, "")), "utf8").replace(/<\/script/gi, "<\\/script");
  return `<script type="module">${js}</script>`;
});
html = html.replace(/<link rel="stylesheet" crossorigin href="([^"]+)">/g, (_, href) => `<style>${readFileSync(join(dist, href.replace(/^\//, "")), "utf8")}</style>`);
html = html.replace(/<link rel="modulepreload"[^>]*>/g, "").replace(/<link rel="manifest"[^>]*>/g, "");
const icon = join(dist, "icon.svg");
if (existsSync(icon)) html = html.replace(/href="\/icon\.svg"/g, `href="data:image/svg+xml;base64,${readFileSync(icon).toString("base64")}"`);
if (/src="\/assets\//.test(html)) throw new Error("Queden recursos externs sense incrustar");
mkdirSync("dist-viewer", { recursive: true });
writeFileSync("dist-viewer/parla-c1.html", html);
console.log("dist-viewer/parla-c1.html", Math.round(html.length / 1024), "KB");
