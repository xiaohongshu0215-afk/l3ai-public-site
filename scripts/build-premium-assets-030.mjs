import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";

const root = process.cwd();
const outDir = path.join(root, "collateral", "premium-assets-030");
const screenDir = path.join(outDir, "screens");
const recordingDir = path.join(outDir, "recordings");
const rawVideoDir = path.join(recordingDir, "raw-webm");
const visualDir = path.join(outDir, "visuals");
const iconDir = path.join(outDir, "icons");
const socialDir = path.join(outDir, "social");
const thumbnailDir = path.join(outDir, "thumbnails");

for (const dir of [recordingDir, visualDir, iconDir, socialDir, thumbnailDir]) {
  fs.mkdirSync(dir, { recursive: true });
}

const ffmpeg = findExecutable("ffmpeg.exe", [
  process.env.FFMPEG_PATH,
  path.join(process.env.LOCALAPPDATA || "", "Microsoft", "WinGet", "Packages"),
  "C:\\ffmpeg",
  "C:\\Program Files",
  "C:\\Program Files (x86)",
]);

const magick = findExecutable("magick.exe", [
  process.env.MAGICK_PATH,
  "C:\\Program Files\\ImageMagick-7.1.2-Q16-HDRI",
  "C:\\Program Files",
  "C:\\Program Files (x86)",
]);

function findExecutable(name, roots) {
  for (const candidate of roots.filter(Boolean)) {
    if (candidate.endsWith(name) && fs.existsSync(candidate)) return candidate;
    if (fs.existsSync(candidate)) {
      const found = findRecursive(candidate, name, 5);
      if (found) return found;
    }
  }
  return null;
}

function findRecursive(dir, target, depth) {
  if (depth < 0) return null;
  let entries = [];
  try {
    entries = fs.readdirSync(dir, { withFileTypes: true });
  } catch {
    return null;
  }
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isFile() && entry.name.toLowerCase() === target.toLowerCase()) return full;
  }
  for (const entry of entries) {
    if (entry.isDirectory()) {
      const found = findRecursive(path.join(dir, entry.name), target, depth - 1);
      if (found) return found;
    }
  }
  return null;
}

function rel(file) {
  return path.relative(root, file).replaceAll("\\", "/");
}

function write(file, content) {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, content);
}

function convertSvg(svgFile, pngFile) {
  if (!magick) return false;
  execFileSync(magick, [svgFile, pngFile], { stdio: "inherit" });
  return true;
}

function convertWebp(pngFile, webpFile) {
  if (!magick) return false;
  execFileSync(magick, [pngFile, "-quality", "88", webpFile], { stdio: "inherit" });
  return true;
}

function convertVideo(input, output) {
  if (!ffmpeg) return false;
  execFileSync(
    ffmpeg,
    [
      "-y",
      "-i",
      input,
      "-vf",
      "scale=1280:720:force_original_aspect_ratio=decrease,pad=1280:720:(ow-iw)/2:(oh-ih)/2",
      "-c:v",
      "libx264",
      "-pix_fmt",
      "yuv420p",
      "-movflags",
      "+faststart",
      "-an",
      output,
    ],
    { stdio: "inherit" },
  );
  return true;
}

function poster(input, output, size = "1200:675") {
  if (!ffmpeg) return false;
  execFileSync(ffmpeg, ["-y", "-ss", "00:00:01", "-i", input, "-vframes", "1", "-vf", `scale=${size}`, output], {
    stdio: "inherit",
  });
  return true;
}

const svgStyle = `
  <defs>
    <linearGradient id="bg" x1="0" x2="1" y1="0" y2="1">
      <stop offset="0%" stop-color="#08111f"/>
      <stop offset="54%" stop-color="#10233f"/>
      <stop offset="100%" stop-color="#0f9f9a"/>
    </linearGradient>
    <linearGradient id="panel" x1="0" x2="1">
      <stop offset="0%" stop-color="#ffffff" stop-opacity=".13"/>
      <stop offset="100%" stop-color="#ffffff" stop-opacity=".05"/>
    </linearGradient>
    <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="24" stdDeviation="24" flood-color="#000000" flood-opacity=".28"/>
    </filter>
  </defs>`;

function textLines(lines, x, y, size, fill = "#dbeafe", weight = 700, gap = 1.28) {
  return lines
    .map((line, index) => `<text x="${x}" y="${y + index * size * gap}" fill="${fill}" font-size="${size}" font-family="Inter, Arial, sans-serif" font-weight="${weight}">${line}</text>`)
    .join("\n");
}

const visuals = [
  {
    name: "l3ai-enterprise-hero-030",
    width: 1600,
    height: 900,
    body: `
      <rect width="1600" height="900" fill="url(#bg)"/>
      <circle cx="1260" cy="110" r="250" fill="#38bdf8" opacity=".16"/>
      <circle cx="1120" cy="760" r="320" fill="#14b8a6" opacity=".2"/>
      <rect x="82" y="96" width="1436" height="708" rx="34" fill="url(#panel)" stroke="#ffffff" stroke-opacity=".18" filter="url(#shadow)"/>
      <text x="126" y="174" fill="#ffffff" font-size="34" font-family="Inter, Arial, sans-serif" font-weight="900">L3AI</text>
      <text x="126" y="262" fill="#ffffff" font-size="62" font-family="Inter, Arial, sans-serif" font-weight="900">AI-native intelligence</text>
      <text x="126" y="330" fill="#ffffff" font-size="62" font-family="Inter, Arial, sans-serif" font-weight="900">layer for Web3</text>
      <text x="126" y="398" fill="#ffffff" font-size="62" font-family="Inter, Arial, sans-serif" font-weight="900">decisions.</text>
      ${textLines(["Product-led public journey", "Authentic browser recordings", "Verified launch assets"], 134, 482, 34)}
      <rect x="918" y="174" width="458" height="472" rx="28" fill="#ffffff" opacity=".96"/>
      <rect x="956" y="220" width="382" height="56" rx="12" fill="#0f172a"/>
      <rect x="956" y="308" width="302" height="28" rx="8" fill="#155eef" opacity=".9"/>
      <rect x="956" y="362" width="350" height="24" rx="8" fill="#0f9f9a" opacity=".75"/>
      <rect x="956" y="432" width="382" height="112" rx="18" fill="#e8f1ff"/>
      <rect x="984" y="464" width="114" height="48" rx="10" fill="#155eef"/>
      <rect x="1120" y="464" width="186" height="48" rx="10" fill="#0f172a"/>
      <text x="956" y="604" fill="#0f172a" font-size="24" font-family="Inter, Arial, sans-serif" font-weight="900">Public site package</text>
      <text x="126" y="728" fill="#93c5fd" font-size="28" font-family="Inter, Arial, sans-serif" font-weight="800">PREMIUM-ASSETS-030</text>`,
  },
  {
    name: "l3ai-ecosystem-map-030",
    width: 1600,
    height: 900,
    body: `
      <rect width="1600" height="900" fill="#f6f9ff"/>
      <text x="92" y="110" fill="#0f172a" font-size="52" font-family="Inter, Arial, sans-serif" font-weight="900">L3AI ecosystem map</text>
      <text x="92" y="158" fill="#475569" font-size="24" font-family="Inter, Arial, sans-serif" font-weight="700">Product, content, trust and launch operations in one public surface.</text>
      <circle cx="800" cy="456" r="120" fill="#0f172a"/>
      <text x="742" y="472" fill="#ffffff" font-size="48" font-family="Inter, Arial, sans-serif" font-weight="900">L3AI</text>
      ${["AI market context", "Wallet education", "Public resources", "Business deck", "Media kit", "Risk boundary"].map((label, index) => {
        const points = [
          [372, 300],
          [800, 220],
          [1228, 300],
          [1228, 628],
          [800, 700],
          [372, 628],
        ];
        const [x, y] = points[index];
        return `<line x1="800" y1="456" x2="${x}" y2="${y}" stroke="#155eef" stroke-width="4" opacity=".38"/><rect x="${x - 160}" y="${y - 52}" width="320" height="104" rx="18" fill="#ffffff" stroke="#dbeafe"/><text x="${x}" y="${y + 8}" text-anchor="middle" fill="#0f172a" font-size="25" font-family="Inter, Arial, sans-serif" font-weight="900">${label}</text>`;
      }).join("\n")}`,
  },
  {
    name: "l3ai-business-model-loop-030",
    width: 1600,
    height: 900,
    body: `
      <rect width="1600" height="900" fill="#08111f"/>
      <text x="92" y="118" fill="#ffffff" font-size="52" font-family="Inter, Arial, sans-serif" font-weight="900">Business model loop</text>
      <text x="92" y="166" fill="#bfdbfe" font-size="24" font-family="Inter, Arial, sans-serif" font-weight="700">Audience, experience, trust and growth stay connected without unsupported claims.</text>
      ${[
        ["Audience", "Customers, partners, media, reviewers", 210, 326, "#155eef"],
        ["Experience", "AI context and wallet-aware education", 820, 326, "#0f9f9a"],
        ["Trust", "Risk language, manifests, QA evidence", 820, 604, "#334155"],
        ["Growth", "Resources, media kit, partner review", 210, 604, "#7c3aed"],
      ].map(([title, copy, x, y, color]) => `<rect x="${x}" y="${y}" width="520" height="160" rx="24" fill="${color}"/><text x="${x + 34}" y="${y + 62}" fill="#ffffff" font-size="34" font-family="Inter, Arial, sans-serif" font-weight="900">${title}</text><text x="${x + 34}" y="${y + 106}" fill="#eaf2ff" font-size="23" font-family="Inter, Arial, sans-serif" font-weight="700">${copy}</text>`).join("\n")}
      <path d="M730 406 C780 350 770 350 820 406" stroke="#ffffff" stroke-width="8" fill="none" opacity=".65"/>
      <path d="M1080 486 C1160 534 1160 556 1080 604" stroke="#ffffff" stroke-width="8" fill="none" opacity=".65"/>
      <path d="M820 684 C770 740 780 740 730 684" stroke="#ffffff" stroke-width="8" fill="none" opacity=".65"/>
      <path d="M470 604 C390 556 390 534 470 486" stroke="#ffffff" stroke-width="8" fill="none" opacity=".65"/>`,
  },
  {
    name: "l3ai-ai-quant-workflow-030",
    width: 1600,
    height: 900,
    body: `
      <rect width="1600" height="900" fill="#f8fafc"/>
      <text x="92" y="118" fill="#0f172a" font-size="52" font-family="Inter, Arial, sans-serif" font-weight="900">AI Quant workflow</text>
      <text x="92" y="166" fill="#475569" font-size="24" font-family="Inter, Arial, sans-serif" font-weight="700">Explain-first decision context, not personalized investment advice.</text>
      ${[
        ["01", "Signal intake", "Public market context"],
        ["02", "AI explanation", "Narrative and uncertainty"],
        ["03", "Risk boundary", "No guaranteed outcomes"],
        ["04", "Review path", "Resources and contact"],
      ].map(([step, title, copy], index) => {
        const x = 130 + index * 360;
        return `<rect x="${x}" y="328" width="300" height="254" rx="24" fill="#ffffff" stroke="#dbeafe" filter="url(#shadow)"/><text x="${x + 30}" y="386" fill="#155eef" font-size="28" font-family="Inter, Arial, sans-serif" font-weight="900">${step}</text><text x="${x + 30}" y="454" fill="#0f172a" font-size="32" font-family="Inter, Arial, sans-serif" font-weight="900">${title}</text><text x="${x + 30}" y="510" fill="#475569" font-size="22" font-family="Inter, Arial, sans-serif" font-weight="700">${copy}</text>${index < 3 ? `<path d="M${x + 304} 454 L${x + 350} 454" stroke="#0f9f9a" stroke-width="8" stroke-linecap="round"/>` : ""}`;
      }).join("\n")}`,
  },
  {
    name: "l3ai-public-icon-set-030",
    width: 1600,
    height: 900,
    body: `
      <rect width="1600" height="900" fill="#ffffff"/>
      <text x="92" y="110" fill="#0f172a" font-size="52" font-family="Inter, Arial, sans-serif" font-weight="900">L3AI public icon set</text>
      ${["AI", "Wallet", "Trust", "Media", "Deck", "Roadmap", "Manifest", "Contact"].map((label, index) => {
        const col = index % 4;
        const row = Math.floor(index / 4);
        const x = 150 + col * 340;
        const y = 250 + row * 260;
        return `<rect x="${x}" y="${y}" width="190" height="150" rx="24" fill="#f1f5f9" stroke="#dbeafe"/><circle cx="${x + 95}" cy="${y + 58}" r="34" fill="${index % 2 ? "#0f9f9a" : "#155eef"}"/><text x="${x + 95}" y="${y + 69}" text-anchor="middle" fill="#ffffff" font-size="26" font-family="Inter, Arial, sans-serif" font-weight="900">${label.slice(0, 2)}</text><text x="${x + 95}" y="${y + 120}" text-anchor="middle" fill="#0f172a" font-size="24" font-family="Inter, Arial, sans-serif" font-weight="900">${label}</text>`;
      }).join("\n")}`,
  },
];

const generated = [];

for (const visual of visuals) {
  const svg = path.join(visualDir, `${visual.name}.svg`);
  const png = path.join(visualDir, `${visual.name}.png`);
  const webp = path.join(visualDir, `${visual.name}.webp`);
  write(svg, `<svg xmlns="http://www.w3.org/2000/svg" width="${visual.width}" height="${visual.height}" viewBox="0 0 ${visual.width} ${visual.height}">${svgStyle}${visual.body}</svg>`);
  generated.push(svg);
  if (convertSvg(svg, png)) generated.push(png);
  if (fs.existsSync(png) && convertWebp(png, webp)) generated.push(webp);
}

const socialSpecs = [
  ["l3ai-social-banner-1200x675-030", 1200, 675, ["AI-native intelligence", "for Web3 decisions"]],
  ["l3ai-social-square-1080x1080-030", 1080, 1080, ["Product-led public", "launch package"]],
  ["l3ai-social-story-1080x1920-030", 1080, 1920, ["Explore L3AI", "public experience"]],
];

for (const [name, width, height, titleLines] of socialSpecs) {
  const svg = path.join(socialDir, `${name}.svg`);
  const png = path.join(socialDir, `${name}.png`);
  const webp = path.join(socialDir, `${name}.webp`);
  const titleSize = width > height ? 54 : 62;
  const startY = Math.round(height * 0.31);
  const titleSvg = titleLines
    .map((line, index) => `<text x="${Math.round(width * 0.08)}" y="${startY + index * Math.round(titleSize * 1.08)}" fill="#ffffff" font-size="${titleSize}" font-family="Inter, Arial, sans-serif" font-weight="900">${line}</text>`)
    .join("");
  write(
    svg,
    `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">${svgStyle}<rect width="${width}" height="${height}" fill="url(#bg)"/><circle cx="${Math.round(width * 0.82)}" cy="${Math.round(height * 0.22)}" r="${Math.round(Math.min(width, height) * 0.24)}" fill="#38bdf8" opacity=".18"/><text x="${Math.round(width * 0.08)}" y="${Math.round(height * 0.14)}" fill="#93c5fd" font-size="${Math.round(titleSize * 0.45)}" font-family="Inter, Arial, sans-serif" font-weight="900">L3AI</text>${titleSvg}<text x="${Math.round(width * 0.08)}" y="${Math.round(height * 0.56)}" fill="#dbeafe" font-size="${Math.round(titleSize * 0.38)}" font-family="Inter, Arial, sans-serif" font-weight="700">Public recordings, verified assets and launch-ready resources.</text><rect x="${Math.round(width * 0.08)}" y="${Math.round(height * 0.72)}" width="${Math.round(width * 0.5)}" height="${Math.round(height * 0.1)}" rx="18" fill="#ffffff" opacity=".96"/><text x="${Math.round(width * 0.11)}" y="${Math.round(height * 0.782)}" fill="#0f172a" font-size="${Math.round(titleSize * 0.32)}" font-family="Inter, Arial, sans-serif" font-weight="900">xiaohongshu0215-afk.github.io/l3ai-public-site</text></svg>`,
  );
  generated.push(svg);
  if (convertSvg(svg, png)) generated.push(png);
  if (fs.existsSync(png) && convertWebp(png, webp)) generated.push(webp);
}

const rawVideos = fs.existsSync(rawVideoDir)
  ? fs.readdirSync(rawVideoDir).filter((file) => file.endsWith(".webm"))
  : [];

const recordings = [];
for (const file of rawVideos) {
  const input = path.join(rawVideoDir, file);
  const base = path.basename(file, ".webm");
  const mp4 = path.join(recordingDir, `${base}.mp4`);
  const thumb = path.join(thumbnailDir, `${base}-thumbnail-1200x675.png`);
  const webp = path.join(thumbnailDir, `${base}-thumbnail-1200x675.webp`);
  if (convertVideo(input, mp4)) generated.push(mp4);
  if (fs.existsSync(mp4) && poster(mp4, thumb)) generated.push(thumb);
  if (fs.existsSync(thumb) && convertWebp(thumb, webp)) generated.push(webp);
  recordings.push({
    id: base,
    raw_webm: rel(input),
    mp4: fs.existsSync(mp4) ? rel(mp4) : null,
    thumbnail: fs.existsSync(thumb) ? rel(thumb) : null,
  });
}

const captures = JSON.parse(fs.readFileSync(path.join(outDir, "capture-index-030.json"), "utf8"));
const catalogueItems = [
  ...captures.flows.map((flow) => ({
    asset_id: `recording-${flow.id}-030`,
    type: "authentic-product-recording",
    title: flow.title,
    audience: flow.audience,
    status: "complete",
    version: "030",
    file_path: recordings.find((item) => item.id === flow.id)?.mp4 || flow.raw_recording,
    source_page: flow.page,
  })),
  ...captures.flows.map((flow) => ({
    asset_id: `screenshot-${flow.id}-030`,
    type: "authentic-product-screenshot",
    title: flow.title,
    audience: flow.audience,
    status: "complete",
    version: "030",
    file_path: flow.screenshot,
    source_page: flow.page,
  })),
  ...visuals.map((visual) => ({
    asset_id: `${visual.name}`,
    type: visual.name.includes("icon") ? "icon-set" : "premium-visual",
    title: visual.name.replaceAll("-", " "),
    audience: "Customers, partners, media and launch operators",
    status: "complete",
    version: "030",
    file_path: `collateral/premium-assets-030/visuals/${visual.name}.png`,
  })),
  ...socialSpecs.map(([name]) => ({
    asset_id: name,
    type: "social-media-banner",
    title: name.replaceAll("-", " "),
    audience: "Social, media and public launch channels",
    status: "complete",
    version: "030",
    file_path: `collateral/premium-assets-030/social/${name}.png`,
  })),
  {
    asset_id: "l3ai-executive-deck-v2",
    type: "pptx",
    title: "L3AI Executive Deck v2",
    audience: "Executive and partner reviewers",
    status: "complete",
    version: "027",
    file_path: "collateral/deck/L3AI_Executive_Deck_v2.pptx",
  },
  {
    asset_id: "l3ai-public-whitepaper-v1-en",
    type: "pdf",
    title: "L3AI Public Whitepaper v1 English",
    audience: "Customers, partners and long-form reviewers",
    status: "complete",
    version: "019",
    file_path: "collateral/whitepaper/L3AI_Public_Whitepaper_v1.en.pdf",
  },
  {
    asset_id: "l3ai-public-whitepaper-v1-zh-cn",
    type: "pdf",
    title: "L3AI Public Whitepaper v1 Chinese",
    audience: "Customers, partners and long-form reviewers",
    status: "complete",
    version: "019",
    file_path: "collateral/whitepaper/L3AI_Public_Whitepaper_v1.zh-CN.pdf",
  },
  {
    asset_id: "l3ai-premium-promo-027",
    type: "mp4",
    title: "L3AI Premium Promo 3-minute render",
    audience: "Public launch and media reviewers",
    status: "complete",
    version: "027",
    file_path: "collateral/video/premium-027/L3AI_Premium_Promo_3min_027.mp4",
  },
];

const manifest = {
  task_id: "PREMIUM-ASSETS-030",
  status: "complete",
  generated_at: new Date().toISOString(),
  ffmpeg_available: Boolean(ffmpeg),
  imagemagick_available: Boolean(magick),
  asset_count: catalogueItems.length,
  assets: catalogueItems,
};

write(path.join(outDir, "PREMIUM_ASSETS_030_MANIFEST.json"), JSON.stringify(manifest, null, 2));

const markdown = `# L3AI Premium Visual and Recording Asset Catalogue 030

Task ID: PREMIUM-ASSETS-030
Status: Complete
Generated: ${manifest.generated_at}

## Summary

This catalogue tracks final public visual, recording, document and website-facing assets produced or verified for the L3AI public launch experience.

## Toolchain

- FFmpeg: ${manifest.ffmpeg_available ? "available and used for MP4 conversion / thumbnails" : "not available"}
- ImageMagick: ${manifest.imagemagick_available ? "available and used for PNG / WebP visual exports" : "not available"}
- Playwright: used for authentic local public-site screenshots and browser recordings

## Asset Catalogue

| Asset ID | Type | Version | Status | Audience | File |
| --- | --- | --- | --- | --- | --- |
${catalogueItems.map((item) => `| ${item.asset_id} | ${item.type} | ${item.version} | ${item.status} | ${item.audience} | ${item.file_path} |`).join("\n")}

## Recording Scope

The product recordings are authentic captures from the public website package, covering homepage discovery, AI Quant workflow, wallet-aware education, business model review, Resources flow and Contact / Partner review.

## Safety Boundary

The captures use only the public GitHub Pages site package. They do not expose private source code, production credentials, wallet signing material, real user data, real balances, internal admin screens or unsupported performance claims.
`;

write(path.join(outDir, "L3AI_Premium_Visual_and_Recording_Asset_Catalogue_030.md"), markdown);

function sha256(file) {
  return crypto.createHash("sha256").update(fs.readFileSync(file)).digest("hex");
}

function walk(dir) {
  const items = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === ".git" || entry.name === ".playwright-cli") continue;
      items.push(...walk(full));
    } else {
      items.push(full);
    }
  }
  return items;
}

const publicAssets = walk(root).map((file) => ({
  path: rel(file),
  bytes: fs.statSync(file).size,
  sha256: sha256(file),
}));

write(
  path.join(root, "PUBLIC_ASSET_MANIFEST.json"),
  JSON.stringify(
    {
      site: "l3ai-public-site",
      base_url: "https://xiaohongshu0215-afk.github.io/l3ai-public-site/",
      asset_count: publicAssets.length,
      generated_at: new Date().toISOString(),
      assets: publicAssets,
    },
    null,
    2,
  ),
);

const sitemapPaths = [
  "index.html",
  "product-overview.html",
  "ai-quant-workflow.html",
  "wallet-experience.html",
  "business-model.html",
  "ecosystem.html",
  "security-trust.html",
  "roadmap.html",
  "enterprise-use-cases.html",
  "contact-partner.html",
  "resources.html",
  "get-started.html",
  "faq.html",
  "faq.zh-CN.html",
  "sitemap.html",
  "PUBLIC_ASSET_MANIFEST.json",
  "collateral/premium-assets-030/PREMIUM_ASSETS_030_MANIFEST.json",
  "collateral/premium-assets-030/L3AI_Premium_Visual_and_Recording_Asset_Catalogue_030.md",
  "collateral/premium-assets-030/recordings/homepage-flow.mp4",
  "collateral/premium-assets-030/social/l3ai-social-banner-1200x675-030.png",
  "collateral/video/premium-027/L3AI_Premium_Promo_3min_027.mp4",
  "collateral/deck/L3AI_Executive_Deck_v2.pptx",
  "collateral/whitepaper/L3AI_Public_Whitepaper_v1.en.html",
  "collateral/whitepaper/L3AI_Public_Whitepaper_v1.en.pdf",
  "collateral/whitepaper/L3AI_Public_Whitepaper_v1.zh-CN.html",
  "collateral/whitepaper/L3AI_Public_Whitepaper_v1.zh-CN.pdf",
];

const baseUrl = "https://xiaohongshu0215-afk.github.io/l3ai-public-site/";
write(
  path.join(root, "sitemap.xml"),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${sitemapPaths
    .map((asset) => `  <url><loc>${baseUrl}${asset === "index.html" ? "" : asset}</loc></url>`)
    .join("\n")}\n</urlset>\n`,
);

console.log(
  JSON.stringify(
    {
      task_id: "PREMIUM-ASSETS-030",
      ffmpeg,
      magick,
      generated_assets: generated.length,
      catalogue_items: catalogueItems.length,
      public_asset_count: publicAssets.length,
    },
    null,
    2,
  ),
);
