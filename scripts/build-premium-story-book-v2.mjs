import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { pathToFileURL } from "node:url";

const root = process.cwd();
const outDir = path.join(root, "collateral", "brand-system");
const deckDir = path.join(outDir, "story-book-v2");
const previewDir = path.join(deckDir, "preview");
const qaDir = path.join(deckDir, "qa");

for (const dir of [outDir, deckDir, previewDir, qaDir]) {
  fs.mkdirSync(dir, { recursive: true });
}

const artifactToolDir =
  process.env.ARTIFACT_TOOL_DIR ||
  path.join(
    process.env.TEMP || process.env.TMP || "",
    "codex-presentations",
    "l3ai-brand-story-033",
    "tmp",
    "node_modules",
    "@oai",
    "artifact-tool",
  );

let Presentation;
let PresentationFile;
try {
  ({ Presentation, PresentationFile } = await import(
    pathToFileURL(path.join(artifactToolDir, "dist", "artifact_tool.mjs")).href
  ));
} catch {
  ({ Presentation, PresentationFile } = await import("@oai/artifact-tool"));
}

const W = 1280;
const H = 720;
const fileStem = "L3AI_Story_Book_Premium_v2";
const assetId = "L3AI_STORY_BOOK_PREMIUM_V2";

const COLORS = {
  ink: "#07111F",
  ink2: "#142033",
  slate: "#475569",
  mute: "#64748B",
  line: "#D9E2EF",
  light: "#F7FAFC",
  panel: "#FFFFFF",
  blue: "#155EEF",
  cyan: "#16A7D8",
  green: "#0F9F6E",
  emerald: "#047857",
  amber: "#B7791F",
  orange: "#E36B2C",
  red: "#C2410C",
  dark: "#07101D",
  dark2: "#0B1628",
  darkPanel: "#0F1E33",
};

const assets = {
  homepage: "collateral/premium-assets-030/screens/homepage-flow-desktop.png",
  aiQuant: "collateral/premium-assets-030/screens/ai-quant-workflow-desktop.png",
  wallet: "collateral/premium-assets-030/screens/wallet-experience-desktop.png",
  businessScreen: "collateral/premium-assets-030/screens/business-model-desktop.png",
  resources: "collateral/premium-assets-030/screens/resources-flow-desktop.png",
  workflow: "collateral/premium-assets-030/visuals/l3ai-ai-quant-workflow-030.png",
  modelLoop: "collateral/premium-assets-030/visuals/l3ai-business-model-loop-030.png",
  ecosystem: "collateral/premium-assets-030/visuals/l3ai-ecosystem-map-030.png",
  hero: "collateral/premium-assets-030/visuals/l3ai-enterprise-hero-030.png",
  iconSet: "collateral/premium-assets-030/visuals/l3ai-public-icon-set-030.png",
  socialBanner: "collateral/premium-assets-030/social/l3ai-social-banner-1200x675-030.png",
};

const slides = [
  {
    type: "cover",
    kicker: "Premium visual story edition",
    title: "L3AI turns Web3 review into a guided product journey.",
    subtitle: "A visual-first public story for first-time customers, media, partners and investor-style reviewers.",
    visual: assets.hero,
    takeaway: "Start with confidence, not noise.",
    note: "Open with the new positioning: L3AI is a guided review journey, not a hype-led pitch.",
  },
  {
    type: "split",
    kicker: "Why L3AI exists",
    title: "Users meet signals before they have a safe way to evaluate them.",
    body: "The first problem is not access to information. It is the missing path from market context to product understanding, wallet-aware education and reviewable proof.",
    visual: assets.socialBanner,
    takeaway: "L3AI gives the first visit a clear sequence.",
    tags: ["Context", "Product proof", "Trust boundary"],
    note: "Keep the pain point human and practical. The product exists because the first decision moment is too compressed.",
  },
  {
    type: "journey",
    kicker: "The customer path",
    title: "A visitor should always know where they are in the story.",
    body: "The public experience is intentionally ordered: see the product, understand the context, review wallet education, check the boundary, then open proof.",
    visual: assets.workflow,
    takeaway: "Every page answers one customer question.",
    note: "The page rhythm mirrors the user journey rather than an internal feature list.",
  },
  {
    type: "screenshot",
    kicker: "First impression",
    title: "The homepage has to prove the company before the deck does.",
    body: "The public homepage now acts as a story room. It shows the product surface, routes visitors by intent and points them to controlled collateral.",
    visual: assets.homepage,
    takeaway: "A mature brand makes the next step obvious.",
    note: "Explain that the site is not only a wrapper around PDFs. It is the first layer of product proof.",
  },
  {
    type: "diagram",
    kicker: "AI Quant",
    title: "AI Quant explains the signal before a user forms a conclusion.",
    body: "The workflow is explain-first. It organizes market context, visible limitations and user review steps without promising performance or automating financial decisions.",
    visual: assets.aiQuant,
    support: assets.workflow,
    takeaway: "The product helps users review context, not chase certainty.",
    note: "Make the safety boundary explicit: no guaranteed outcomes, no investment instruction.",
  },
  {
    type: "screenshot",
    kicker: "Wallet-aware education",
    title: "Wallet moments become checkpoints instead of pressure points.",
    body: "L3AI can frame wallet-aware journeys while keeping signing material, credentials and real account data out of public collateral.",
    visual: assets.wallet,
    takeaway: "Education comes before action.",
    note: "This slide protects the brand and explains the product stance around sensitive wallet contexts.",
  },
  {
    type: "diagram",
    kicker: "Business flywheel",
    title: "The business grows when visitors can verify the story.",
    body: "Attention becomes understanding. Understanding creates trust. Trust improves the quality of customer, partner and media conversations.",
    visual: assets.businessScreen,
    support: assets.modelLoop,
    takeaway: "The commercial loop starts with clarity.",
    note: "Use the flywheel as business logic, not as a revenue promise.",
  },
  {
    type: "ecosystem",
    kicker: "Ecosystem map",
    title: "L3AI connects public education, product proof and partner review.",
    body: "Customers, partners, media and investor-style reviewers need different paths, but the same controlled source of truth.",
    visual: assets.ecosystem,
    takeaway: "One story, several review paths.",
    note: "Position the ecosystem as a public review architecture.",
  },
  {
    type: "status",
    kicker: "Roadmap discipline",
    title: "Every claim sits in a visible status lane.",
    body: "Current, in-progress and planned capabilities are separated so public materials stay credible.",
    takeaway: "Trust improves when future work is not described as already live.",
    columns: [
      ["Current", "Public website", "AI Quant explanation", "Wallet education", "Resource library"],
      ["In Progress", "Creative polish", "Localized campaigns", "More recordings", "Launch QA evidence"],
      ["Planned", "Partner kits", "Growth automation", "Motion package", "Channel expansion"],
    ],
    note: "This is a core maturity signal. Do not overstate future features.",
  },
  {
    type: "trust",
    kicker: "Trust boundary",
    title: "The strongest public story says what it will not do.",
    body: "The rebuilt Story Book avoids private implementation details, protected data, outcome promises, deposit prompts and unsupported financial claims.",
    takeaway: "Clear boundaries make the brand safer to share.",
    note: "Keep this page bold and minimal. It should feel like a brand principle, not a disclaimer dump.",
  },
  {
    type: "proof",
    kicker: "Proof room",
    title: "Resources turn the story into downloadable evidence.",
    body: "Visitors can move from the story to the product book, partnership deck, video narrative, screenshots, recordings and versioned manifests.",
    visual: assets.resources,
    takeaway: "The proof is organized, downloadable and public-safe.",
    note: "Use this as the handoff from story to evidence.",
  },
  {
    type: "closing",
    kicker: "Review path",
    title: "Open the story. Review the product. Verify the boundary.",
    body: "L3AI is ready to be understood through a public product journey, not just a pitch deck.",
    visual: assets.resources,
    takeaway: "Next step: open Resources or contact the team.",
    note: "Close with a practical external handoff.",
  },
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
  slide.background.fill = data.type === "cover" || data.type === "closing" ? COLORS.dark : COLORS.light;
  renderSlide(slide, data, index + 1);
  slide.speakerNotes.textFrame.setText(data.note);
  slide.speakerNotes.setVisible(true);
  notes.push({ title: data.title, text: data.note });
});

for (const [i, slide] of deck.slides.items.entries()) {
  const stem = `slide-${String(i + 1).padStart(2, "0")}`;
  await writeBlob(path.join(previewDir, `${stem}.png`), await deck.export({ slide, format: "png", scale: 1 }));
  fs.writeFileSync(path.join(qaDir, `${stem}.layout.json`), await (await slide.export({ format: "layout" })).text());
}

await writeBlob(path.join(qaDir, "deck-montage.webp"), await deck.export({ format: "webp", montage: true, scale: 1 }));
fs.writeFileSync(inspectPath, (await deck.inspect({ kind: "slide,textbox,shape,image,notes,layout", maxChars: 65000 })).ndjson);

const pptx = await PresentationFile.exportPptx(deck);
await pptx.save(pptxPath);

fs.writeFileSync(notesPath, renderNotes());
fs.writeFileSync(htmlPath, renderHtmlPreview());
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
  ...fs.readdirSync(qaDir)
    .filter((file) => file.endsWith(".layout.json"))
    .sort()
    .map((file) => path.join(qaDir, file)),
];

const manifest = {
  asset_id: assetId,
  title: "L3AI Story Book Premium v2",
  version: "v2",
  status: "prepared",
  public_use: "primary_public_story_asset",
  generated_at: new Date().toISOString(),
  narrative_baseline: "L3AI Story Book v1",
  design_policy:
    "Reference PDFs were used only for storytelling rhythm, visual pacing and page-level clarity. No wording, branding, graphics, names, claims or proprietary layouts were copied.",
  visual_upgrade: [
    "One clear message per page",
    "One strong visual per page",
    "One explicit customer takeaway per page",
    "Paragraph-heavy documentation style reduced",
    "Original L3AI product screenshots and public visuals used throughout",
  ],
  safety_boundary: [
    "No private source exposure",
    "No sensitive credential material",
    "No protected implementation detail",
    "No real user data or wallet signing material",
    "No funding-action instructions",
    "No outcome promises",
    "No unsupported financial, listing, traction or partnership claims",
    "Current, In Progress and Planned status lanes kept separate",
  ],
  files: generatedFiles.map(fileRecord),
};
fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));

console.log(
  JSON.stringify(
    {
      status: "prepared",
      title: manifest.title,
      pptx: relative(pptxPath),
      pdf: relative(pdfPath),
      html: relative(htmlPath),
      manifest: relative(manifestPath),
      slides: slides.length,
    },
    null,
    2,
  ),
);

function renderSlide(slide, data, index) {
  switch (data.type) {
    case "cover":
      return renderCover(slide, data, index);
    case "split":
      return renderSplit(slide, data, index);
    case "journey":
      return renderJourney(slide, data, index);
    case "screenshot":
      return renderScreenshot(slide, data, index);
    case "diagram":
      return renderDiagram(slide, data, index);
    case "ecosystem":
      return renderEcosystem(slide, data, index);
    case "status":
      return renderStatus(slide, data, index);
    case "trust":
      return renderTrust(slide, data, index);
    case "proof":
      return renderProof(slide, data, index);
    case "closing":
      return renderClosing(slide, data, index);
    default:
      return renderSplit(slide, data, index);
  }
}

function renderCover(slide, data, index) {
  addImage(slide, data.visual, { left: 668, top: 80, width: 520, height: 338 }, "cover", 12);
  shape(slide, { left: 72, top: 58, width: 248, height: 40 }, COLORS.blue, "none", "roundRect", "rounded-full");
  text(slide, data.kicker, { left: 96, top: 68, width: 200, height: 18 }, { fontSize: 13, bold: true, color: "#FFFFFF", alignment: "center" });
  text(slide, data.title, { left: 72, top: 136, width: 572, height: 220 }, { fontSize: 46, bold: true, color: "#FFFFFF" });
  text(slide, data.subtitle, { left: 72, top: 392, width: 560, height: 70 }, { fontSize: 20, color: "#CFE0F4" });
  takeaway(slide, data.takeaway, { left: 72, top: 512, width: 558, height: 72 }, true);
  text(slide, "Story Book Premium v2", { left: 780, top: 452, width: 310, height: 30 }, { fontSize: 24, bold: true, color: "#FFFFFF", alignment: "center" });
  footer(slide, index, true);
}

function renderSplit(slide, data, index) {
  header(slide, data, index, 575);
  addImage(slide, data.visual, { left: 704, top: 116, width: 482, height: 292 }, "cover", 10);
  text(slide, data.body, { left: 78, top: 284, width: 514, height: 106 }, { fontSize: 22, color: COLORS.slate });
  if (data.tags) {
    data.tags.forEach((tag, i) => {
      pill(slide, tag, 82 + i * 164, 428, [COLORS.blue, COLORS.cyan, COLORS.green][i]);
    });
  }
  takeaway(slide, data.takeaway, { left: 704, top: 448, width: 482, height: 80 });
  footer(slide, index);
}

function renderJourney(slide, data, index) {
  header(slide, data, index, 860);
  addImage(slide, data.visual, { left: 892, top: 98, width: 252, height: 132 }, "contain", 0);
  const steps = [
    ["01", "See", "Product surface"],
    ["02", "Understand", "AI context"],
    ["03", "Review", "Wallet education"],
    ["04", "Verify", "Trust boundary"],
    ["05", "Open", "Resources"],
  ];
  steps.forEach(([num, head, copy], i) => {
    const x = 76 + i * 226;
    shape(slide, { left: x, top: 320, width: 178, height: 154 }, "#FFFFFF", i === 0 ? COLORS.blue : COLORS.line, "roundRect", "rounded-xl");
    pill(slide, num, x + 20, 340, i % 2 === 0 ? COLORS.blue : COLORS.cyan, 60);
    text(slide, head, { left: x + 24, top: 394, width: 120, height: 28 }, { fontSize: 24, bold: true, color: COLORS.ink });
    text(slide, copy, { left: x + 24, top: 428, width: 126, height: 28 }, { fontSize: 15, color: COLORS.slate });
    if (i < steps.length - 1) line(slide, x + 184, 398, x + 218, 398, COLORS.line);
  });
  takeaway(slide, data.takeaway, { left: 190, top: 540, width: 900, height: 62 });
  footer(slide, index);
}

function renderScreenshot(slide, data, index) {
  header(slide, data, index, 540);
  addImage(slide, data.visual, { left: 642, top: 94, width: 554, height: 392 }, "cover", 10);
  text(slide, data.body, { left: 78, top: 296, width: 486, height: 122 }, { fontSize: 22, color: COLORS.slate });
  takeaway(slide, data.takeaway, { left: 78, top: 468, width: 486, height: 82 });
  footer(slide, index);
}

function renderDiagram(slide, data, index) {
  header(slide, data, index, 545);
  addImage(slide, data.visual, { left: 674, top: 88, width: 500, height: 286 }, "cover", 10);
  addImage(slide, data.support, { left: 744, top: 414, width: 358, height: 156 }, "contain", 0);
  text(slide, data.body, { left: 78, top: 302, width: 506, height: 116 }, { fontSize: 22, color: COLORS.slate });
  takeaway(slide, data.takeaway, { left: 78, top: 472, width: 506, height: 82 });
  footer(slide, index);
}

function renderEcosystem(slide, data, index) {
  header(slide, data, index, 720);
  addImage(slide, data.visual, { left: 122, top: 286, width: 464, height: 254 }, "contain", 0);
  const audiences = [
    ["Customers", "Product value"],
    ["Partners", "Ecosystem fit"],
    ["Media", "Approved facts"],
    ["Reviewers", "Roadmap status"],
  ];
  audiences.forEach(([head, copy], i) => {
    const x = 668 + (i % 2) * 252;
    const y = 292 + Math.floor(i / 2) * 124;
    miniCard(slide, head, copy, x, y, i);
  });
  takeaway(slide, data.takeaway, { left: 668, top: 546, width: 504, height: 62 });
  footer(slide, index);
}

function renderStatus(slide, data, index) {
  header(slide, data, index, 860);
  const fills = [COLORS.blue, COLORS.cyan, COLORS.amber];
  data.columns.forEach((column, i) => {
    const x = 76 + i * 392;
    shape(slide, { left: x, top: 286, width: 340, height: 258 }, "#FFFFFF", COLORS.line, "roundRect", "rounded-xl");
    pill(slide, column[0], x + 24, 310, fills[i], 136);
    column.slice(1).forEach((item, row) => {
      text(slide, item, { left: x + 30, top: 368 + row * 40, width: 270, height: 24 }, { fontSize: row === 0 ? 19 : 17, bold: row === 0, color: row === 0 ? COLORS.ink : COLORS.slate });
      if (row < column.length - 2) rule(slide, x + 30, 398 + row * 40, 280, "#EDF2F7");
    });
  });
  footer(slide, index);
}

function renderTrust(slide, data, index) {
  header(slide, data, index, 760);
  const items = [
    ["No outcome promises", "No performance, yield-rate or asset-price promises."],
    ["No deposit prompts", "No instruction to fund, trade or sign from public collateral."],
    ["No private exposure", "No protected routes, credentials, signing data or internal source detail."],
    ["Status lanes remain visible", "Current, in-progress and planned work are kept separate."],
  ];
  items.forEach(([head, copy], i) => {
    const x = 86 + (i % 2) * 552;
    const y = 300 + Math.floor(i / 2) * 122;
    miniCard(slide, head, copy, x, y, i);
  });
  takeaway(slide, data.takeaway, { left: 206, top: 566, width: 868, height: 62 });
  footer(slide, index);
}

function renderProof(slide, data, index) {
  header(slide, data, index, 560);
  addImage(slide, data.visual, { left: 640, top: 96, width: 546, height: 372 }, "cover", 10);
  const files = ["Story Book", "Product Book", "Partnership Deck", "Video narrative", "Manifest"];
  files.forEach((item, i) => {
    pill(slide, item, 82 + (i % 2) * 210, 318 + Math.floor(i / 2) * 48, i % 2 === 0 ? COLORS.blue : COLORS.cyan, 176);
  });
  text(slide, data.body, { left: 82, top: 474, width: 496, height: 54 }, { fontSize: 19, color: COLORS.slate });
  takeaway(slide, data.takeaway, { left: 82, top: 548, width: 496, height: 62 });
  footer(slide, index);
}

function renderClosing(slide, data, index) {
  addImage(slide, data.visual, { left: 704, top: 86, width: 450, height: 286 }, "cover", 10);
  text(slide, data.kicker, { left: 72, top: 72, width: 440, height: 22 }, { fontSize: 14, bold: true, color: "#8FB7FF" });
  text(slide, data.title, { left: 72, top: 126, width: 622, height: 180 }, { fontSize: 44, bold: true, color: "#FFFFFF" });
  text(slide, data.body, { left: 72, top: 342, width: 596, height: 72 }, { fontSize: 22, color: "#CFE0F4" });
  takeaway(slide, data.takeaway, { left: 72, top: 498, width: 596, height: 78 }, true);
  pill(slide, "Resources", 782, 428, COLORS.blue, 154);
  pill(slide, "Contact", 958, 428, COLORS.green, 132);
  footer(slide, index, true);
}

function header(slide, data, index, titleWidth = 850) {
  text(slide, data.kicker, { left: 72, top: 54, width: 460, height: 22 }, { fontSize: 14, bold: true, color: COLORS.blue });
  text(slide, data.title, { left: 72, top: 92, width: titleWidth, height: 108 }, { fontSize: 36, bold: true, color: COLORS.ink });
  if (data.body) text(slide, data.body, { left: 72, top: 214, width: Math.min(titleWidth, 760), height: 54 }, { fontSize: 19, color: COLORS.slate });
}

function takeaway(slide, textValue, position, dark = false) {
  shape(slide, position, dark ? COLORS.darkPanel : "#FFFFFF", dark ? "#263A58" : "#DFE8F2", "roundRect", "rounded-xl");
  shape(slide, { left: position.left, top: position.top, width: 8, height: position.height }, dark ? COLORS.blue : COLORS.blue, "none", "roundRect", "rounded-xl");
  text(slide, "Customer takeaway", { left: position.left + 28, top: position.top + 14, width: position.width - 56, height: 18 }, { fontSize: 12, bold: true, color: dark ? "#8FB7FF" : COLORS.blue });
  text(slide, textValue, { left: position.left + 28, top: position.top + 36, width: position.width - 56, height: 30 }, { fontSize: 20, bold: true, color: dark ? "#FFFFFF" : COLORS.ink });
}

function miniCard(slide, title, copy, left, top, index) {
  shape(slide, { left, top, width: 234, height: 94 }, "#FFFFFF", index === 0 ? COLORS.blue : COLORS.line, "roundRect", "rounded-xl");
  text(slide, title, { left: left + 22, top: top + 18, width: 188, height: 24 }, { fontSize: 19, bold: true, color: index === 0 ? COLORS.blue : COLORS.ink });
  text(slide, copy, { left: left + 22, top: top + 50, width: 188, height: 28 }, { fontSize: 14, color: COLORS.slate });
}

function pill(slide, label, left, top, fill, width = 132) {
  shape(slide, { left, top, width, height: 34 }, fill, "none", "roundRect", "rounded-full");
  text(slide, label, { left: left + 16, top: top + 9, width: width - 32, height: 16 }, { fontSize: 13, bold: true, color: "#FFFFFF", alignment: "center" });
}

function footer(slide, index, dark = false) {
  rule(slide, 72, 640, 1136, dark ? "#263A58" : "#E4EAF2");
  text(slide, "L3AI Story Book Premium v2", { left: 72, top: 654, width: 420, height: 22 }, { fontSize: 13, color: dark ? "#A9BED8" : COLORS.mute });
  text(slide, String(index).padStart(2, "0"), { left: 1142, top: 654, width: 66, height: 22 }, { fontSize: 13, color: dark ? "#A9BED8" : COLORS.mute, alignment: "right" });
}

function shape(slide, position, fill, lineColor = COLORS.line, geometry = "roundRect", borderRadius = "rounded-xl") {
  const config = {
    geometry,
    position,
    fill,
    line: { style: "solid", fill: lineColor, width: lineColor === "none" ? 0 : 1 },
  };
  if (borderRadius && borderRadius !== "none") {
    config.borderRadius = borderRadius;
  }
  return slide.shapes.add(config);
}

function text(slide, textValue, position, style = {}) {
  const item = slide.shapes.add({
    geometry: "textbox",
    position,
    fill: "none",
    line: { style: "solid", fill: "none", width: 0 },
  });
  item.text = textValue;
  item.text.style = {
    fontSize: style.fontSize ?? 18,
    color: style.color ?? COLORS.ink,
    bold: style.bold ?? false,
    alignment: style.alignment ?? "left",
  };
  return item;
}

function rule(slide, left, top, width, fill = COLORS.line) {
  shape(slide, { left, top, width, height: 2 }, fill, "none", "rect", "none");
}

function line(slide, x1, y1, x2, y2, color) {
  slide.shapes.add({
    geometry: "line",
    position: { left: x1, top: y1, width: x2 - x1, height: y2 - y1 },
    fill: "none",
    line: { style: "solid", fill: color, width: 2 },
  });
}

function addImage(slide, relPath, position, fit = "cover", radius = 10) {
  slide.images.add({
    blob: readImage(relPath),
    contentType: "image/png",
    alt: relPath.split("/").pop(),
    fit,
    geometry: radius > 0 ? "roundRect" : "rect",
    borderRadius: radius > 0 ? "rounded-xl" : undefined,
    position,
  });
}

function readImage(relPath) {
  const bytes = fs.readFileSync(path.join(root, relPath));
  return bytes.buffer.slice(bytes.byteOffset, bytes.byteOffset + bytes.byteLength);
}

async function writeBlob(filePath, blob) {
  const buffer = Buffer.from(await blob.arrayBuffer());
  fs.writeFileSync(filePath, buffer);
}

function renderNotes() {
  return [
    "# L3AI Story Book Premium v2 Speaker Notes",
    "",
    "Purpose: visual-first public story asset for first-time customers, media, partners and investor-style reviewers.",
    "",
    ...notes.flatMap((note, index) => [
      `## Slide ${String(index + 1).padStart(2, "0")} - ${note.title}`,
      "",
      note.text,
      "",
    ]),
  ].join("\n");
}

function renderHtmlPreview() {
  const slideCards = slides.map((slide, i) => {
    const src = `story-book-v2/preview/slide-${String(i + 1).padStart(2, "0")}.png`;
    return `<section class="slide-card"><h2>${String(i + 1).padStart(2, "0")}. ${escapeHtml(slide.title)}</h2><img src="${src}" alt="${escapeHtml(slide.title)}"><p><strong>Takeaway:</strong> ${escapeHtml(slide.takeaway)}</p></section>`;
  }).join("\n");

  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>L3AI Story Book Premium v2</title>
    <style>
      :root { color-scheme: light; font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; color: #07111f; background: #f7fafc; }
      body { margin: 0; }
      header { min-height: 58vh; padding: 64px 6vw 42px; background: #07101d; color: white; display: grid; align-content: center; }
      h1 { max-width: 980px; margin: 0 0 18px; font-size: clamp(38px, 6vw, 76px); line-height: .98; letter-spacing: 0; }
      header p { max-width: 760px; color: #cfe0f4; font-size: 20px; line-height: 1.6; }
      .actions { display: flex; flex-wrap: wrap; gap: 12px; margin-top: 28px; }
      .actions a { color: white; border: 1px solid rgba(255,255,255,.34); border-radius: 999px; padding: 11px 17px; text-decoration: none; font-weight: 800; }
      main { display: grid; gap: 28px; padding: 38px 6vw 78px; }
      .slide-card { background: white; border: 1px solid #d9e2ef; border-radius: 8px; padding: 22px; box-shadow: 0 18px 46px rgb(15 23 42 / 8%); }
      .slide-card h2 { margin: 0 0 16px; font-size: 24px; }
      .slide-card p { color: #475569; line-height: 1.6; }
      img { width: 100%; height: auto; display: block; border-radius: 6px; border: 1px solid #e4eaf2; }
      footer { padding: 28px 6vw; color: #64748b; }
    </style>
  </head>
  <body>
    <header>
      <p>Premium visual story edition</p>
      <h1>L3AI turns Web3 review into a guided product journey.</h1>
      <p>A visual-first Story Book for customers, media, partners and investor-style reviewers. Each page carries one message, one strong visual and one customer takeaway.</p>
      <div class="actions">
        <a href="${fileStem}.pptx">Download PPTX</a>
        <a href="${fileStem}.pdf">Download PDF</a>
        <a href="${fileStem}_speaker_notes.md">Speaker notes</a>
      </div>
    </header>
    <main>${slideCards}</main>
    <footer>Public-safe visual edition. No private implementation detail, sensitive credential material, wallet signing material, funding-action prompts or outcome promises.</footer>
  </body>
</html>`;
}

function createPdf(pdfFile) {
  const pythonExe = process.env.PYTHON_EXE || "python";
  const helper = path.join(qaDir, "create-pdf.py");
  const py = String.raw`
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
`;
  fs.writeFileSync(helper, py.trimStart());
  execFileSync(pythonExe, [helper, pdfFile, ...sortedPngs(previewDir)], { stdio: "inherit" });
  fs.rmSync(helper, { force: true });
}

function createContactSheet(out) {
  const pythonExe = process.env.PYTHON_EXE || "python";
  const helper = path.join(qaDir, "create-contact-sheet.py");
  const py = String.raw`
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
sheet = Image.new("RGB", (cols * thumb_w + (cols + 1) * gap, rows * (thumb_h + label_h) + (rows + 1) * gap), "#f7fafc")
draw = ImageDraw.Draw(sheet)
for idx, im in enumerate(images):
    im.thumbnail((thumb_w, thumb_h))
    x = gap + (idx % cols) * (thumb_w + gap)
    y = gap + (idx // cols) * (thumb_h + label_h + gap)
    frame = Image.new("RGB", (thumb_w, thumb_h), "#ffffff")
    frame.paste(im, ((thumb_w - im.width) // 2, (thumb_h - im.height) // 2))
    sheet.paste(frame, (x, y))
    draw.text((x, y + thumb_h + 6), f"Slide {idx + 1:02d}", fill="#475569")
sheet.save(out)
`;
  fs.writeFileSync(helper, py.trimStart());
  execFileSync(pythonExe, [helper, out, ...sortedPngs(previewDir)], { stdio: "inherit" });
  fs.rmSync(helper, { force: true });
}

function sortedPngs(dir) {
  return fs.readdirSync(dir).filter((file) => file.endsWith(".png")).sort().map((file) => path.join(dir, file));
}

function fileRecord(filePath) {
  return {
    path: relative(filePath),
    bytes: fs.statSync(filePath).size,
    sha256: crypto.createHash("sha256").update(fs.readFileSync(filePath)).digest("hex"),
  };
}

function relative(filePath) {
  return path.relative(root, filePath).replaceAll("\\", "/");
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}
