import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { pathToFileURL } from "node:url";

const root = process.cwd();
const outDir = path.join(root, "collateral", "brand-system");
const deckDir = path.join(outDir, "customer-story-book");
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
const fileStem = "L3AI_Customer_Story_Book_v1";
const assetId = "L3AI_CUSTOMER_STORY_BOOK_V1";

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
  s("cover", "L3AI makes Web3 easier to understand before people participate.", "A customer-ready story about intelligence, participation and the next layer of Web3 products.", A.hero, "The first promise is clarity."),
  s("dark", "Web3 has more signals than people can reasonably read.", "Markets, wallets, products, communities and automation now move faster than a normal user can interpret.", A.videoPoster, "The new scarcity is understanding."),
  s("dark", "The next platform layer is not another dashboard.", "Users need a guide that turns scattered information into a path they can follow.", A.roadshow04, "A product should make the decision space legible."),
  s("split", "L3AI is built for the moment before action.", "It helps users learn what they are seeing, review context and choose their next step with more confidence.", A.homepage, "The product starts before the click."),
  s("signal", "The journey begins with a simple sequence.", "Learn, review, compare, participate and return. L3AI turns that loop into a repeatable experience.", A.workflow, "Participation works better when the path is visible."),
  s("orbit", "One platform connects intelligence, wallet context and community learning.", "The pieces are easier to trust when they are part of one system.", A.ecosystem, "L3AI is a connected experience, not a folder of tools."),
  s("chapter", "AI Quant turns market noise into a readable context layer.", "Instead of asking users to chase every signal, L3AI organizes what matters into explainable scenarios.", A.aiQuant, "The user sees context before conclusion."),
  s("split", "AI Quant is designed to explain before it recommends any direction.", "The experience frames signals, assumptions and review notes so users can understand the situation first.", A.showcaseAI, "Better context creates better questions."),
  s("dark", "The intelligence layer becomes more useful when it is repeatable.", "Users can return to the same pattern: see the context, read the explanation and decide what to explore next.", A.roadshow06, "Consistency is part of trust."),
  s("chapter", "Wallet-aware journeys make participation easier to understand.", "Wallet context can feel technical and final. L3AI turns that moment into education, state awareness and careful user guidance.", A.wallet, "The wallet moment should feel understandable."),
  s("split", "Wallet context connects identity, access and product state.", "The user does not need a lecture. They need a clear explanation of where they are and what each step means.", A.showcaseWallet, "A good product explains the state it creates."),
  s("chapter", "Compute gives the platform a way to organize work behind the scenes.", "Compute is the platform layer for structured tasks, AI workflows and repeatable product operations as the ecosystem grows.", A.business04, "The system needs a work layer, not just pages."),
  s("split", "Automation should help the user keep momentum.", "L3AI can connect learning, review, alerts, content and product flows into repeatable journeys without making the experience feel mechanical.", A.business10, "Automation should reduce confusion."),
  s("chapter", "Membership turns a product visit into an ongoing relationship.", "A member journey can connect access, learning, community participation and future product modules in one place.", A.showcaseStart, "Membership gives the platform memory."),
  s("split", "Community learning is the human layer of the product.", "Moderated learning, shared explanations and official channels help users understand the platform without relying on hype.", A.showcaseFAQ, "The community should teach before it amplifies."),
  s("dark", "L3AI changes the role of content.", "Content is not only marketing. It becomes education, onboarding, product memory and a bridge between users and the platform.", A.business01, "The story becomes part of the product."),
  s("chapter", "The business model grows from trust, not pressure.", "A visitor who understands the product is more likely to become a useful customer, member, partner or community contributor.", A.business, "Clarity improves the quality of growth."),
  s("signal", "The participation loop is simple enough to remember.", "Discover the platform, understand the context, join the right journey, learn with the community and return with better questions.", A.flywheel, "Growth is a loop of understanding."),
  s("chapter", "The Universe roadmap gives the ecosystem room to expand.", "Universe is the long-range map for connected experiences, future modules and broader participation across the L3AI environment.", A.roadshow09, "The roadmap should feel like a world, not a backlog."),
  s("split", "The roadmap separates what users can use now from what comes next.", "Current product surfaces, active content systems and planned expansions are presented as different stages of one platform story.", A.roadshow16, "A future is stronger when its stages are honest."),
  s("dark", "Why now? AI is becoming the interface for complex markets.", "When information becomes too fast and fragmented, users look for a layer that can translate complexity into usable context.", A.business05, "The timing is about behavior, not hype."),
  s("split", "Why now? Web3 participation is becoming more product-led.", "Users expect better onboarding, clearer states, safer explanations and official content they can trust.", A.showcaseHome, "The category is ready for better experience design."),
  s("chapter", "L3AI gives users a place to start.", "A first-time user does not need to understand every module on day one. They need a path that tells them where to begin.", A.contact, "The best product is easy to enter."),
  s("orbit", "Different audiences can follow the same story in different ways.", "Users, members, partners and media reviewers each need a clear first step without changing the core narrative.", A.icons, "One story can support many entry points."),
  s("split", "For partners, L3AI is a product ecosystem in motion.", "The partnership conversation starts with user education, product surface, community learning and roadmap fit.", A.roadshow08, "Partnership begins with shared context."),
  s("dark", "For users, the next step is simple.", "Open the Story Book, explore the platform, learn the product language and choose the path that fits your intent.", A.resources, "Start by understanding the platform."),
  s("chapter", "The story now leads with the user.", "This edition brings the platform into a customer narrative: why it matters, how it works and where to begin.", A.business15, "The customer should feel the path immediately."),
  s("closing", "L3AI is building the intelligence layer people can actually follow.", "Understand the market. Learn the product. Join the journey.", A.hero, "This is the starting point for the L3AI world."),
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
  title: "L3AI Customer Story Book v1",
  status: "prepared",
  version: "v1",
  generated_at: new Date().toISOString(),
  customer_facing_role: "primary_story_book",
  replaces: "L3AI Story Book Premium v2 is retained as an archive/supporting draft while this edition becomes the primary customer-facing story.",
  source_policy: "Reference PDFs were used only for storytelling rhythm and page clarity. No content, visuals, branding, names or claims were copied.",
  safety_boundary: [
    "No private source exposure",
    "No sensitive access material",
    "No real user or wallet signing material",
    "No funding-action instruction",
    "No outcome promise",
    "No unsupported market, listing, traction or partnership claim",
  ],
  files: generatedFiles.map(fileRecord),
}, null, 2));

console.log(JSON.stringify({
  status: "prepared",
  title: "L3AI Customer Story Book v1",
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
  text(slide, "L3AI Customer Story Book", { left: 72, top: 76, width: 420, height: 26 }, { fontSize: 17, bold: true, color: C.cyan });
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
  text(slide, "Customer takeaway", { left: left + 26, top: top + 13, width: width - 52, height: 18 }, { fontSize: 12, bold: true, color: C.cyan });
  text(slide, value, { left: left + 26, top: top + 36, width: width - 52, height: 28 }, { fontSize: 20, bold: true, color: dark ? C.white : C.ink });
}

function glow(slide, x, y, fill) {
  shape(slide, { left: x - 38, top: y - 38, width: 76, height: 76 }, "#0C1D32", "#23527D", "ellipse");
  shape(slide, { left: x - 20, top: y - 20, width: 40, height: 40 }, fill, "none", "ellipse");
}

function sectionLabel(index) {
  if (index <= 6) return "World and problem";
  if (index <= 15) return "Product and participation";
  if (index <= 22) return "Platform and roadmap";
  return "Next step";
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
  text(slide, "L3AI Customer Story Book", { left: 72, top: 654, width: 380, height: 22 }, { fontSize: 13, color: dark ? C.mute : C.slate });
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
    "# L3AI Customer Story Book Speaker Notes",
    "",
    "Purpose: customer-facing brand narrative for first-time users, partners, media and ecosystem reviewers.",
    "",
    ...notes.flatMap((note, index) => [`## Slide ${String(index + 1).padStart(2, "0")} - ${note.title}`, "", note.text, ""]),
  ].join("\n");
}

function renderHtml() {
  const cards = slides.map((slide, i) => {
    const src = `customer-story-book/preview/slide-${String(i + 1).padStart(2, "0")}.png`;
    return `<section class="slide-card"><h2>${String(i + 1).padStart(2, "0")}. ${escapeHtml(slide.title)}</h2><img src="${src}" alt="${escapeHtml(slide.title)}"><p>${escapeHtml(slide.takeaway)}</p></section>`;
  }).join("\n");
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>L3AI Customer Story Book</title>
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
      <p>L3AI Customer Story Book</p>
      <h1>L3AI makes Web3 easier to understand before people participate.</h1>
      <p>A customer-ready story about intelligence, participation, membership, automation and the Universe roadmap.</p>
      <div class="actions">
        <a href="${fileStem}.pptx">Download PPTX</a>
        <a href="${fileStem}.pdf">Download PDF</a>
        <a href="${fileStem}_speaker_notes.md">Speaker notes</a>
      </div>
    </header>
    <main>${cards}</main>
    <footer>Customer-facing edition. Built from approved public L3AI materials.</footer>
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
