import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { pathToFileURL } from "node:url";

const root = process.cwd();
const outDir = path.join(root, "collateral", "brand-system");
const deckDir = path.join(outDir, "platform-product-book");
const previewDir = path.join(deckDir, "preview");
const qaDir = path.join(deckDir, "qa");
for (const dir of [outDir, deckDir, previewDir, qaDir]) fs.mkdirSync(dir, { recursive: true });

const artifactToolDir =
  process.env.ARTIFACT_TOOL_DIR ||
  path.join(process.env.TEMP || process.env.TMP || "", "codex-presentations", "l3ai-brand-story-033", "tmp", "node_modules", "@oai", "artifact-tool");

let Presentation;
let PresentationFile;
try {
  ({ Presentation, PresentationFile } = await import(pathToFileURL(path.join(artifactToolDir, "dist", "artifact_tool.mjs")).href));
} catch {
  ({ Presentation, PresentationFile } = await import("@oai/artifact-tool"));
}

const W = 1280;
const H = 720;
const fileStem = "L3AI_Platform_Product_Book_v1";
const assetId = "L3AI_PLATFORM_PRODUCT_BOOK_V1";

const C = {
  midnight: "#050B16",
  navy: "#081426",
  navy2: "#0C1B31",
  ink: "#07111F",
  white: "#FFFFFF",
  frost: "#D8ECFF",
  cloud: "#F6FAFF",
  line: "#21405F",
  blue: "#1A66FF",
  cyan: "#19D4FF",
  teal: "#16B8C8",
  green: "#17B978",
  amber: "#E8B84A",
  mute: "#9BB4CF",
  slate: "#52657D",
};

const A = {
  hero: "collateral/premium-assets-030/visuals/l3ai-enterprise-hero-030.png",
  icons: "collateral/premium-assets-030/visuals/l3ai-public-icon-set-030.png",
  workflow: "collateral/premium-assets-030/visuals/l3ai-ai-quant-workflow-030.png",
  flywheel: "collateral/premium-assets-030/visuals/l3ai-business-model-loop-030.png",
  ecosystem: "collateral/premium-assets-030/visuals/l3ai-ecosystem-map-030.png",
  homepage: "collateral/premium-assets-030/screens/homepage-flow-desktop.png",
  aiQuant: "collateral/premium-assets-030/screens/ai-quant-workflow-desktop.png",
  wallet: "collateral/premium-assets-030/screens/wallet-experience-desktop.png",
  business: "collateral/premium-assets-030/screens/business-model-desktop.png",
  contact: "collateral/premium-assets-030/screens/contact-flow-desktop.png",
  resources: "collateral/premium-assets-030/screens/resources-flow-desktop.png",
  showcaseHome: "collateral/showcase/screens/l3ai-showcase-homepage.png",
  showcaseAI: "collateral/showcase/screens/l3ai-showcase-ai-quant.png",
  showcaseWallet: "collateral/showcase/screens/l3ai-showcase-wallet.png",
  showcaseFAQ: "collateral/showcase/screens/l3ai-showcase-faq.png",
  showcaseStart: "collateral/showcase/screens/l3ai-showcase-get-started.png",
  videoPoster: "collateral/video/premium-027/L3AI_Premium_Promo_027_poster.png",
  roadshow01: "collateral/deck/enterprise-roadshow-031/preview/slide-01.png",
  roadshow04: "collateral/deck/enterprise-roadshow-031/preview/slide-04.png",
  roadshow06: "collateral/deck/enterprise-roadshow-031/preview/slide-06.png",
  roadshow08: "collateral/deck/enterprise-roadshow-031/preview/slide-08.png",
  roadshow09: "collateral/deck/enterprise-roadshow-031/preview/slide-09.png",
  roadshow16: "collateral/deck/enterprise-roadshow-031/preview/slide-16.png",
  business01: "collateral/deck/product-business-deck-032/preview/slide-01.png",
  business04: "collateral/deck/product-business-deck-032/preview/slide-04.png",
  business05: "collateral/deck/product-business-deck-032/preview/slide-05.png",
  business10: "collateral/deck/product-business-deck-032/preview/slide-10.png",
  business15: "collateral/deck/product-business-deck-032/preview/slide-15.png",
};

const slides = [
  s("cover", "How does the L3AI platform actually work?", "A customer-ready product book for understanding the real public experience, product modules, journey status and roadmap boundaries.", A.homepage, "Use this book after the Story Book when the customer asks what the platform does."),
  s("dark", "What problem does the product solve on day one?", "L3AI gives users one guided place to understand Web3 context, product pages, wallet-aware education and approved public resources.", A.hero, "The product job is to make the first review path clear."),
  s("split", "Where does a new visitor start?", "Current: the public homepage introduces the product promise, routes visitors to Story, Overview, AI Quant, Wallet, Trust and Resources, and keeps the first action educational.", A.showcaseHome, "The first screen gives orientation before any deeper material."),
  s("chapter", "How does registration fit into the journey?", "Current: public get-started and contact routes handle interest and partner review. In Progress: authenticated onboarding can connect identity, membership and product access. Planned: deeper account-state guidance.", A.showcaseStart, "Registration is treated as an onboarding step, not a pressure point."),
  s("signal", "What is the core user flow?", "Discover the platform, review product context, explore AI Quant, understand wallet states, open resources and return through community or contact paths.", A.workflow, "A user can follow the same loop without needing private system access."),
  s("orbit", "What modules make up the platform?", "The product map connects AI Quant, Wallet context, Compute, Membership, Community learning, Automation and a roadmap layer for future Universe experiences.", A.ecosystem, "L3AI is easier to evaluate when the modules are shown as one system."),
  s("chapter", "What does AI Quant do for the customer?", "Current: AI Quant presents market and product context as explainable review material. It avoids outcome promises and helps the user ask better questions before deciding what to explore.", A.aiQuant, "AI Quant is an explanation layer, not a guarantee layer."),
  s("split", "How does a user read an AI Quant screen?", "The experience frames what the user is seeing, why it may matter, and which next page or resource can help them understand the context.", A.showcaseAI, "The screen is useful because it explains the situation before action."),
  s("dark", "What stays outside the AI Quant claim boundary?", "L3AI does not present guaranteed returns, asset-price predictions, exchange listing claims, or funding instructions in public product materials.", A.roadshow06, "The boundary is visible because trust is part of the product."),
  s("chapter", "How does wallet-aware education work?", "Current: Wallet pages show high-level state awareness and education. They do not expose signing material, private keys, real accounts or production wallet data.", A.wallet, "The wallet experience explains state without exposing private material."),
  s("split", "What should a user understand before a wallet moment?", "A wallet-aware journey should tell the user where they are, what a state means, what remains review-only and where to find the trust boundary.", A.showcaseWallet, "The product slows down the wallet moment so the user can understand it."),
  s("chapter", "Where does Compute fit?", "In Progress: Compute is the work layer for structured AI tasks, automation workflows and future product operations. It is described as platform capability, not a public promise of live capacity.", A.business04, "Compute gives the product system a way to organize work over time."),
  s("split", "What automation can the platform support?", "In Progress: automation can connect content, alerts, learning flows, AI review and release operations. Planned: broader campaign and product-workflow automation after governance gates.", A.business10, "Automation should reduce confusion while keeping review gates visible."),
  s("chapter", "How does membership change the product experience?", "In Progress: membership can connect user state, learning progress, access levels, community participation and future product surfaces into one repeatable relationship.", A.business15, "Membership gives the product memory without overstating what is live."),
  s("split", "What role does the community play?", "Current: public FAQ and resources explain the product language. Planned community layers can support moderated learning, official updates and safer product education.", A.showcaseFAQ, "Community should teach before it amplifies."),
  s("chapter", "How does the business model connect to the product?", "The commercial story begins with a clearer product journey: visitors understand value, partners understand fit, and reviewers can inspect public-safe evidence before engagement.", A.business, "A better product path makes business conversations cleaner."),
  s("signal", "How does a customer move from interest to review?", "Read the Story Book, open Product Overview, inspect AI Quant and Wallet pages, verify Resources and choose Contact only when intent is clear.", A.flywheel, "The conversion path is review-led, not pressure-led."),
  s("chapter", "What is Current today?", "Current: public product site, Product Overview, AI Quant page, Wallet page, Trust page, Resources hub, public screenshots, downloadable decks, PDF/PPTX/HTML previews and manifests.", A.resources, "Current means the user can open it now on the public site."),
  s("split", "What is In Progress?", "In Progress: creative polish, deeper product recordings, authenticated onboarding design, membership progression, compute workflows, localized campaigns and improved motion assets.", A.roadshow04, "In Progress means it is being shaped, not promised as live."),
  s("chapter", "What is Planned?", "Planned: broader Universe experiences, advanced automation, partner kits, community learning expansion, more distribution channels and future account-state journeys after approval gates.", A.roadshow09, "Planned work stays in the roadmap lane until it is ready."),
  s("split", "How should a customer compare L3AI to ordinary content sites?", "L3AI combines product pages, product visuals, narrative assets, QA evidence, manifests and trust language into one controlled public review experience.", A.resources, "The proof is not one document. It is the connected package."),
  s("orbit", "Which audience gets which path?", "Users start with Overview and AI Quant. Partners start with Business Model and Contact. Media reviewers start with Resources. Operators start with manifests and QA evidence.", A.icons, "The same platform supports different review paths without changing the truth."),
  s("dark", "What should never appear in the public product book?", "No private repository detail, no API keys, no tunnel state, no real user data, no signing material, no deposit instructions, no unsupported financial claims and no internal task labels.", A.videoPoster, "Public product material must stay safe enough to share."),
  s("closing", "What is the next step after this Product Book?", "Open the Product Overview, follow AI Quant and Wallet, verify Resources, then use Contact or partner review when the product fit is clear.", A.contact, "The Product Book turns curiosity into a clean review path."),
];

const pptxPath = path.join(outDir, `${fileStem}.pptx`);
const pdfPath = path.join(outDir, `${fileStem}.pdf`);
const htmlPath = path.join(outDir, `${fileStem}.html`);
const notesPath = path.join(outDir, `${fileStem}_speaker_notes.md`);
const manifestPath = path.join(outDir, `${assetId}_MANIFEST.json`);
const inspectPath = path.join(outDir, `${fileStem}.pptx.inspect.ndjson`);

for (const dir of [previewDir, qaDir]) {
  fs.readdirSync(dir, { withFileTypes: true }).forEach((entry) => {
    const target = path.join(dir, entry.name);
    if (entry.isFile()) fs.rmSync(target, { force: true });
  });
}

const deck = Presentation.create({ slideSize: { width: W, height: H } });
const notes = [];
slides.forEach((data, index) => {
  const slide = deck.slides.add();
  slide.background.fill = data.kind === "light" ? C.cloud : C.midnight;
  drawSlide(slide, data, index + 1);
  slide.speakerNotes.textFrame.setText(data.note || data.takeaway);
  slide.speakerNotes.setVisible(true);
  notes.push({ title: data.title, text: data.note || data.takeaway });
});

for (const [i, slide] of deck.slides.items.entries()) {
  const stem = `slide-${String(i + 1).padStart(2, "0")}`;
  await writeBlob(path.join(previewDir, `${stem}.png`), await deck.export({ slide, format: "png", scale: 1 }));
  fs.writeFileSync(path.join(qaDir, `${stem}.layout.json`), await (await slide.export({ format: "layout" })).text());
}

await writeBlob(path.join(qaDir, "deck-montage.webp"), await deck.export({ format: "webp", montage: true, scale: 1 }));
fs.writeFileSync(inspectPath, (await deck.inspect({ kind: "slide,textbox,shape,image,notes,layout", maxChars: 90000 })).ndjson);
const pptx = await PresentationFile.exportPptx(deck);
await pptx.save(pptxPath);
fs.writeFileSync(notesPath, renderNotes());
fs.writeFileSync(htmlPath, renderHtml());
createPdf(pdfPath);
createContactSheet(path.join(qaDir, "deck-contact-sheet.png"));

const generatedFiles = [
  pptxPath,
  pdfPath,
  htmlPath,
  notesPath,
  inspectPath,
  path.join(qaDir, "deck-montage.webp"),
  path.join(qaDir, "deck-contact-sheet.png"),
  ...sortedPngs(previewDir),
  ...fs.readdirSync(qaDir).filter((file) => file.endsWith(".layout.json")).sort().map((file) => path.join(qaDir, file)),
];

fs.writeFileSync(manifestPath, JSON.stringify({
  asset_id: assetId,
  title: "L3AI Platform Product Book v1",
  status: "prepared",
  version: "v1",
  generated_at: new Date().toISOString(),
  customer_facing_role: "primary_product_book",
  relationship_to_story_book: "Complements the Customer Story Book. The Story Book explains why L3AI matters; this Product Book explains how the public platform experience works.",
  source_policy: "Approved public L3AI pages, screenshots, recordings and product collateral were used as source material. No private code, credentials or protected implementation details are included.",
  safety_boundary: [
    "No private source exposure",
    "No sensitive access material",
    "No real user or wallet signing material",
    "No funding-action instruction",
    "No outcome promise",
    "No unsupported market, listing, traction or partnership claim",
    "Current, In Progress and Planned states remain separated",
  ],
  files: generatedFiles.map(fileRecord),
}, null, 2));

console.log(JSON.stringify({
  status: "prepared",
  title: "L3AI Platform Product Book v1",
  slides: slides.length,
  pptx: relative(pptxPath),
  pdf: relative(pdfPath),
  html: relative(htmlPath),
  manifest: relative(manifestPath),
}, null, 2));

function s(kind, title, body, visual, takeaway, note = "") {
  return { kind, title, body, visual, takeaway, note };
}

function drawSlide(slide, data, index) {
  switch (data.kind) {
    case "cover": return cover(slide, data, index);
    case "dark": return dark(slide, data, index);
    case "split": return split(slide, data, index);
    case "signal": return signal(slide, data, index);
    case "orbit": return orbit(slide, data, index);
    case "chapter": return chapter(slide, data, index);
    case "closing": return closing(slide, data, index);
    default: return split(slide, data, index);
  }
}

function cover(slide, data, index) {
  backdrop(slide);
  addImage(slide, data.visual, { left: 690, top: 92, width: 460, height: 314 }, "cover", 18);
  text(slide, "L3AI Platform Product Book", { left: 72, top: 76, width: 440, height: 26 }, { fontSize: 17, bold: true, color: C.cyan });
  text(slide, data.title, { left: 72, top: 142, width: 650, height: 240 }, { fontSize: 52, bold: true, color: C.white });
  text(slide, data.body, { left: 72, top: 414, width: 610, height: 70 }, { fontSize: 23, color: C.frost });
  takeaway(slide, data.takeaway, 72, 544, 560, true);
  footer(slide, index, true);
}

function dark(slide, data, index) {
  backdrop(slide);
  addImage(slide, data.visual, { left: 742, top: 96, width: 416, height: 300 }, "cover", 18);
  text(slide, sectionLabel(index), { left: 72, top: 76, width: 360, height: 24 }, { fontSize: 14, bold: true, color: C.cyan });
  text(slide, data.title, { left: 72, top: 138, width: 632, height: 160 }, { fontSize: 44, bold: true, color: C.white });
  text(slide, data.body, { left: 72, top: 332, width: 580, height: 78 }, { fontSize: 22, color: C.frost });
  takeaway(slide, data.takeaway, 72, 504, 580, true);
  footer(slide, index, true);
}

function split(slide, data, index) {
  darkBase(slide);
  text(slide, sectionLabel(index), { left: 72, top: 56, width: 380, height: 24 }, { fontSize: 14, bold: true, color: C.cyan });
  text(slide, data.title, { left: 72, top: 104, width: 560, height: 156 }, { fontSize: 42, bold: true, color: C.white });
  text(slide, data.body, { left: 72, top: 294, width: 520, height: 86 }, { fontSize: 21, color: C.frost });
  addImage(slide, data.visual, { left: 672, top: 82, width: 504, height: 360 }, "cover", 18);
  takeaway(slide, data.takeaway, 72, 500, 520, true);
  footer(slide, index, true);
}

function signal(slide, data, index) {
  darkBase(slide);
  text(slide, sectionLabel(index), { left: 72, top: 56, width: 380, height: 24 }, { fontSize: 14, bold: true, color: C.cyan });
  text(slide, data.title, { left: 72, top: 104, width: 1000, height: 106 }, { fontSize: 42, bold: true, color: C.white });
  text(slide, data.body, { left: 72, top: 232, width: 790, height: 52 }, { fontSize: 21, color: C.frost });
  const labels = ["Learn", "Review", "Compare", "Participate", "Return"];
  labels.forEach((label, i) => {
    const x = 94 + i * 224;
    glow(slide, x, 360, i % 2 === 0 ? C.blue : C.cyan);
    text(slide, label, { left: x - 36, top: 424, width: 110, height: 28 }, { fontSize: 22, bold: true, color: C.white, alignment: "center" });
    if (i < labels.length - 1) line(slide, x + 58, 392, x + 162, 392, "#275A86");
  });
  addImage(slide, data.visual, { left: 896, top: 282, width: 220, height: 118 }, "contain", 0);
  takeaway(slide, data.takeaway, 246, 540, 790, true);
  footer(slide, index, true);
}

function orbit(slide, data, index) {
  darkBase(slide);
  text(slide, sectionLabel(index), { left: 72, top: 56, width: 380, height: 24 }, { fontSize: 14, bold: true, color: C.cyan });
  text(slide, data.title, { left: 72, top: 104, width: 970, height: 104 }, { fontSize: 41, bold: true, color: C.white });
  text(slide, data.body, { left: 72, top: 226, width: 790, height: 52 }, { fontSize: 20, color: C.frost });
  addImage(slide, data.visual, { left: 446, top: 308, width: 330, height: 186 }, "contain", 0);
  const nodes = [["AI Quant", 164, 340], ["Wallet", 852, 340], ["Compute", 230, 516], ["Community", 798, 516]];
  nodes.forEach(([label, x, y], i) => {
    glow(slide, x, y, i % 2 === 0 ? C.blue : C.cyan);
    text(slide, label, { left: x - 74, top: y + 52, width: 150, height: 24 }, { fontSize: 19, bold: true, color: C.white, alignment: "center" });
  });
  takeaway(slide, data.takeaway, 396, 562, 490, true);
  footer(slide, index, true);
}

function chapter(slide, data, index) {
  darkBase(slide);
  addImage(slide, data.visual, { left: 82, top: 96, width: 510, height: 358 }, "cover", 18);
  text(slide, sectionLabel(index), { left: 666, top: 72, width: 360, height: 24 }, { fontSize: 14, bold: true, color: C.cyan });
  text(slide, data.title, { left: 666, top: 126, width: 500, height: 154 }, { fontSize: 41, bold: true, color: C.white });
  text(slide, data.body, { left: 666, top: 312, width: 484, height: 90 }, { fontSize: 21, color: C.frost });
  takeaway(slide, data.takeaway, 666, 506, 484, true);
  footer(slide, index, true);
}

function closing(slide, data, index) {
  backdrop(slide);
  addImage(slide, data.visual, { left: 748, top: 94, width: 374, height: 250 }, "cover", 18);
  text(slide, "The starting point", { left: 72, top: 76, width: 380, height: 24 }, { fontSize: 14, bold: true, color: C.cyan });
  text(slide, data.title, { left: 72, top: 138, width: 660, height: 184 }, { fontSize: 48, bold: true, color: C.white });
  text(slide, data.body, { left: 72, top: 360, width: 612, height: 70 }, { fontSize: 25, bold: true, color: C.frost });
  takeaway(slide, data.takeaway, 72, 520, 580, true);
  footer(slide, index, true);
}

function backdrop(slide) {
  darkBase(slide);
  shape(slide, { left: 900, top: -120, width: 360, height: 360 }, "#0D4166", "none", "ellipse");
  shape(slide, { left: 1020, top: 88, width: 220, height: 220 }, "#0A6D8E", "none", "ellipse");
}

function darkBase(slide) {
  slide.background.fill = C.midnight;
  shape(slide, { left: 0, top: 0, width: W, height: H }, C.midnight, "none", "rect");
  shape(slide, { left: 0, top: 0, width: W, height: 46 }, C.navy2, "none", "rect");
  shape(slide, { left: 0, top: 46, width: W, height: 2 }, C.blue, "none", "rect");
}

function takeaway(slide, value, left, top, width, dark = false) {
  shape(slide, { left, top, width, height: 78 }, dark ? "#0C1D32" : C.white, dark ? "#234A72" : "#D9E2EF", "roundRect", "rounded-xl");
  shape(slide, { left, top, width: 8, height: 78 }, C.cyan, "none", "roundRect", "rounded-xl");
  text(slide, "Product answer", { left: left + 26, top: top + 13, width: width - 52, height: 18 }, { fontSize: 12, bold: true, color: C.cyan });
  text(slide, value, { left: left + 26, top: top + 36, width: width - 52, height: 28 }, { fontSize: 20, bold: true, color: dark ? C.white : C.ink });
}

function glow(slide, x, y, fill) {
  shape(slide, { left: x - 38, top: y - 38, width: 76, height: 76 }, "#0C1D32", "#23527D", "ellipse");
  shape(slide, { left: x - 20, top: y - 20, width: 40, height: 40 }, fill, "none", "ellipse");
}

function sectionLabel(index) {
  if (index <= 6) return "Entry and product map";
  if (index <= 13) return "Core product modules";
  if (index <= 20) return "Status and roadmap";
  return "Review path";
}

function shape(slide, position, fill, lineColor = C.line, geometry = "roundRect", borderRadius = "rounded-xl") {
  const cfg = { geometry, position, fill, line: { style: "solid", fill: lineColor, width: lineColor === "none" ? 0 : 1 } };
  if (borderRadius && borderRadius !== "none" && ["rect", "textbox", "roundRect"].includes(geometry)) cfg.borderRadius = borderRadius;
  return slide.shapes.add(cfg);
}

function text(slide, value, position, style = {}) {
  const item = slide.shapes.add({ geometry: "textbox", position, fill: "none", line: { style: "solid", fill: "none", width: 0 } });
  item.text = value;
  item.text.style = {
    fontSize: style.fontSize ?? 18,
    color: style.color ?? C.white,
    bold: style.bold ?? false,
    alignment: style.alignment ?? "left",
  };
  return item;
}

function line(slide, x1, y1, x2, y2, color) {
  slide.shapes.add({ geometry: "line", position: { left: x1, top: y1, width: x2 - x1, height: y2 - y1 }, fill: "none", line: { style: "solid", fill: color, width: 2 } });
}

function footer(slide, index, dark = true) {
  shape(slide, { left: 72, top: 640, width: 1136, height: 1 }, dark ? "#1D3856" : "#D9E2EF", "none", "rect");
  text(slide, "L3AI Platform Product Book", { left: 72, top: 654, width: 420, height: 22 }, { fontSize: 13, color: dark ? C.mute : C.slate });
  text(slide, String(index).padStart(2, "0"), { left: 1134, top: 654, width: 74, height: 22 }, { fontSize: 13, color: dark ? C.mute : C.slate, alignment: "right" });
}

function addImage(slide, relPath, position, fit = "cover", radius = 18) {
  slide.images.add({
    blob: readImage(relPath),
    contentType: "image/png",
    alt: relPath.split("/").pop(),
    fit,
    geometry: radius ? "roundRect" : "rect",
    borderRadius: radius ? "rounded-xl" : undefined,
    position,
  });
}

function readImage(relPath) {
  const bytes = fs.readFileSync(path.join(root, relPath));
  return bytes.buffer.slice(bytes.byteOffset, bytes.byteOffset + bytes.byteLength);
}

async function writeBlob(filePath, blob) {
  fs.writeFileSync(filePath, Buffer.from(await blob.arrayBuffer()));
}

function renderNotes() {
  return [
    "# L3AI Platform Product Book Speaker Notes",
    "",
    "Purpose: customer-facing product guide for explaining how the public L3AI platform experience works.",
    "",
    ...notes.flatMap((note, index) => [`## Slide ${String(index + 1).padStart(2, "0")} - ${note.title}`, "", note.text, ""]),
  ].join("\n");
}

function renderHtml() {
  const cards = slides.map((slide, i) => {
    const src = `platform-product-book/preview/slide-${String(i + 1).padStart(2, "0")}.png`;
    return `<section class="slide-card"><h2>${String(i + 1).padStart(2, "0")}. ${escapeHtml(slide.title)}</h2><img src="${src}" alt="${escapeHtml(slide.title)}"><p>${escapeHtml(slide.takeaway)}</p></section>`;
  }).join("\n");
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>L3AI Platform Product Book</title>
    <style>
      :root { color-scheme: dark; font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; background: #050b16; color: #fff; }
      body { margin: 0; background: #050b16; }
      header { min-height: 68vh; padding: 68px 6vw 48px; display: grid; align-content: center; background: radial-gradient(circle at 80% 12%, #0a6d8e 0, #081426 32%, #050b16 70%); }
      h1 { max-width: 1000px; margin: 0 0 22px; font-size: clamp(42px, 7vw, 86px); line-height: .96; letter-spacing: 0; }
      header p { max-width: 760px; color: #d8ecff; font-size: 22px; line-height: 1.6; }
      .actions { display: flex; flex-wrap: wrap; gap: 12px; margin-top: 30px; }
      .actions a { color: white; border: 1px solid rgba(255,255,255,.36); border-radius: 999px; padding: 12px 18px; text-decoration: none; font-weight: 800; }
      main { display: grid; gap: 28px; padding: 38px 6vw 78px; background: #f6faff; color: #07111f; }
      .slide-card { background: white; border: 1px solid #d9e2ef; border-radius: 8px; padding: 22px; box-shadow: 0 18px 46px rgb(15 23 42 / 9%); }
      .slide-card h2 { margin: 0 0 16px; font-size: 24px; }
      .slide-card p { color: #52657d; font-size: 17px; line-height: 1.55; }
      img { width: 100%; height: auto; display: block; border-radius: 6px; border: 1px solid #d9e2ef; background: #050b16; }
      footer { padding: 28px 6vw; color: #9bb4cf; background: #050b16; }
    </style>
  </head>
  <body>
    <header>
      <p>L3AI Platform Product Book</p>
      <h1>How the L3AI platform actually works.</h1>
      <p>A customer-ready product guide covering entry, onboarding, AI Quant, Wallet, Compute, membership, community, automation and roadmap lanes.</p>
      <div class="actions">
        <a href="${fileStem}.pptx">Download PPTX</a>
        <a href="${fileStem}.pdf">Download PDF</a>
        <a href="${fileStem}_speaker_notes.md">Speaker notes</a>
      </div>
    </header>
    <main>${cards}</main>
    <footer>Customer-facing product edition. Built from approved public L3AI materials.</footer>
  </body>
</html>`;
}

function createPdf(pdfFile) {
  const pythonExe = process.env.PYTHON_EXE || "python";
  const helper = path.join(qaDir, "create-pdf.py");
  fs.writeFileSync(helper, String.raw`
import sys
from reportlab.pdfgen import canvas
from reportlab.lib.utils import ImageReader

out = sys.argv[1]
images = sys.argv[2:]
c = canvas.Canvas(out, pagesize=(1280, 720))
for img in images:
    c.drawImage(ImageReader(img), 0, 0, width=1280, height=720)
    c.showPage()
c.save()
`.trimStart());
  execFileSync(pythonExe, [helper, pdfFile, ...sortedPngs(previewDir)], { stdio: "inherit" });
  fs.rmSync(helper, { force: true });
}

function createContactSheet(out) {
  const pythonExe = process.env.PYTHON_EXE || "python";
  const helper = path.join(qaDir, "create-contact-sheet.py");
  fs.writeFileSync(helper, String.raw`
import math
import sys
from pathlib import Path
from PIL import Image, ImageDraw

out = Path(sys.argv[1])
images = [Image.open(p).convert("RGB") for p in sys.argv[2:]]
thumb_w = 320
thumb_h = 180
gap = 18
label_h = 26
cols = 4
rows = math.ceil(len(images) / cols)
sheet = Image.new("RGB", (cols * thumb_w + (cols + 1) * gap, rows * (thumb_h + label_h) + (rows + 1) * gap), "#f6faff")
draw = ImageDraw.Draw(sheet)
for idx, im in enumerate(images):
    im.thumbnail((thumb_w, thumb_h))
    x = gap + (idx % cols) * (thumb_w + gap)
    y = gap + (idx // cols) * (thumb_h + label_h + gap)
    frame = Image.new("RGB", (thumb_w, thumb_h), "#050b16")
    frame.paste(im, ((thumb_w - im.width) // 2, (thumb_h - im.height) // 2))
    sheet.paste(frame, (x, y))
    draw.text((x, y + thumb_h + 6), f"Slide {idx + 1:02d}", fill="#52657d")
sheet.save(out)
`.trimStart());
  execFileSync(pythonExe, [helper, out, ...sortedPngs(previewDir)], { stdio: "inherit" });
  fs.rmSync(helper, { force: true });
}

function sortedPngs(dir) {
  return fs.readdirSync(dir).filter((file) => file.endsWith(".png")).sort().map((file) => path.join(dir, file));
}

function fileRecord(filePath) {
  return { path: relative(filePath), bytes: fs.statSync(filePath).size, sha256: crypto.createHash("sha256").update(fs.readFileSync(filePath)).digest("hex") };
}

function relative(filePath) {
  return path.relative(root, filePath).replaceAll("\\", "/");
}

function escapeHtml(value) {
  return String(value).replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;");
}
