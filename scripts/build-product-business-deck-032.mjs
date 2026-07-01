import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { pathToFileURL } from "node:url";

const root = process.cwd();
const deckDir = path.join(root, "collateral", "deck");
const qaDir = path.join(deckDir, "product-business-deck-032", "qa");
const previewDir = path.join(deckDir, "product-business-deck-032", "preview");
const videoNarrativeDir = path.join(root, "collateral", "video", "deck-remake-032");
const pptxPath = path.join(deckDir, "L3AI_Product_Business_Deck_032.pptx");
const pdfPath = path.join(deckDir, "L3AI_Product_Business_Deck_032.pdf");
const htmlPath = path.join(deckDir, "L3AI_Product_Business_Deck_032.html");
const notesPath = path.join(deckDir, "L3AI_Product_Business_Deck_032_speaker_notes.md");
const manifestPath = path.join(deckDir, "L3AI_PRODUCT_BUSINESS_DECK_032_MANIFEST.json");
const inspectPath = path.join(deckDir, "L3AI_Product_Business_Deck_032.pptx.inspect.ndjson");
const videoNarrativePath = path.join(videoNarrativeDir, "L3AI_Product_Business_Promo_Narrative_032.md");
const videoStoryboardPath = path.join(videoNarrativeDir, "L3AI_Product_Business_Promo_Storyboard_032.json");

for (const dir of [deckDir, qaDir, previewDir, videoNarrativeDir]) {
  fs.mkdirSync(dir, { recursive: true });
}

const artifactToolDir =
  process.env.ARTIFACT_TOOL_DIR ||
  path.join(
    process.env.TEMP || process.env.TMP || "",
    "codex-presentations",
    "l3ai-deck-remake-032",
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
const COLORS = {
  ink: "#0B1220",
  ink2: "#172033",
  slate: "#475569",
  mute: "#64748B",
  light: "#F8FAFC",
  panel: "#FFFFFF",
  line: "#D8E0EA",
  blue: "#155EEF",
  cyan: "#18A7D8",
  green: "#0F9F6E",
  amber: "#B7791F",
  red: "#C2410C",
  dark: "#08111F",
  darkPanel: "#101B2D",
};

const assets = {
  homepage: "collateral/premium-assets-030/screens/homepage-flow-desktop.png",
  aiQuant: "collateral/premium-assets-030/screens/ai-quant-workflow-desktop.png",
  wallet: "collateral/premium-assets-030/screens/wallet-experience-desktop.png",
  business: "collateral/premium-assets-030/screens/business-model-desktop.png",
  resources: "collateral/premium-assets-030/screens/resources-flow-desktop.png",
  workflow: "collateral/premium-assets-030/visuals/l3ai-ai-quant-workflow-030.png",
  modelLoop: "collateral/premium-assets-030/visuals/l3ai-business-model-loop-030.png",
  ecosystem: "collateral/premium-assets-030/visuals/l3ai-ecosystem-map-030.png",
  hero: "collateral/premium-assets-030/visuals/l3ai-enterprise-hero-030.png",
  videoPoster: "collateral/video/premium-027/L3AI_Premium_Promo_027_poster.png",
};

function abs(rel) {
  return path.join(root, rel);
}

function readImage(rel) {
  const bytes = fs.readFileSync(abs(rel));
  return bytes.buffer.slice(bytes.byteOffset, bytes.byteOffset + bytes.byteLength);
}

function sha256(filePath) {
  return crypto.createHash("sha256").update(fs.readFileSync(filePath)).digest("hex");
}

function rel(filePath) {
  return path.relative(root, filePath).replaceAll("\\", "/");
}

function textbox(slide, text, position, style = {}) {
  const shape = slide.shapes.add({
    geometry: "textbox",
    position,
    fill: "none",
    line: { style: "solid", fill: "none", width: 0 },
  });
  shape.text = text;
  shape.text.style = {
    fontSize: style.fontSize ?? 20,
    color: style.color ?? COLORS.ink,
    bold: style.bold ?? false,
    alignment: style.alignment ?? "left",
  };
  return shape;
}

function rect(slide, position, fill, line = COLORS.line, radius = "rounded-xl", name = undefined) {
  return slide.shapes.add({
    geometry: "roundRect",
    name,
    position,
    fill,
    line: { style: "solid", fill: line, width: line === "none" ? 0 : 1 },
    borderRadius: radius,
  });
}

function rule(slide, left, top, width, fill = COLORS.line) {
  slide.shapes.add({
    geometry: "rect",
    position: { left, top, width, height: 2 },
    fill,
    line: { style: "solid", fill, width: 0 },
  });
}

function footer(slide, index, dark = false) {
  const color = dark ? "#9FB3CC" : COLORS.mute;
  rule(slide, 72, 640, 1136, dark ? "#253450" : "#E4EAF2");
  textbox(slide, "L3AI Product Business Deck", { left: 72, top: 654, width: 360, height: 24 }, { fontSize: 14, color });
  textbox(slide, String(index).padStart(2, "0"), { left: 1148, top: 654, width: 60, height: 24 }, { fontSize: 14, color, alignment: "right" });
}

function chip(slide, label, left, top, fill, color = "#FFFFFF") {
  rect(slide, { left, top, width: Math.max(96, label.length * 8 + 28), height: 28 }, fill, "none", "rounded-full");
  textbox(slide, label, { left: left + 14, top: top + 5, width: Math.max(70, label.length * 8 + 4), height: 18 }, { fontSize: 13, bold: true, color });
}

function addTitle(slide, title, subtitle, index, opts = {}) {
  const dark = opts.dark ?? false;
  textbox(slide, opts.eyebrow ?? "External business story", { left: 72, top: 54, width: 500, height: 24 }, { fontSize: 14, bold: true, color: dark ? "#8FB7FF" : COLORS.blue });
  textbox(slide, title, { left: 72, top: 88, width: opts.titleWidth ?? 850, height: opts.titleHeight ?? 96 }, { fontSize: opts.titleSize ?? 38, bold: true, color: dark ? "#FFFFFF" : COLORS.ink });
  if (subtitle) {
    textbox(slide, subtitle, { left: 72, top: opts.subtitleTop ?? 190, width: opts.subtitleWidth ?? 780, height: opts.subtitleHeight ?? 68 }, { fontSize: opts.subtitleSize ?? 20, color: dark ? "#C8D5E8" : COLORS.slate });
  }
  footer(slide, index, dark);
}

function addImage(slide, relPath, position, fit = "cover") {
  slide.images.add({
    blob: readImage(relPath),
    contentType: "image/png",
    alt: relPath.split("/").pop(),
    fit,
    geometry: "roundRect",
    borderRadius: "rounded-xl",
    position,
  });
}

function addPlainImage(slide, relPath, position, fit = "contain") {
  slide.images.add({
    blob: readImage(relPath),
    contentType: "image/png",
    alt: relPath.split("/").pop(),
    fit,
    position,
  });
}

function bulletBlock(slide, items, left, top, width, gap = 54, opts = {}) {
  items.forEach((item, i) => {
    const y = top + i * gap;
    rect(slide, { left, top: y + 3, width: 24, height: 24 }, opts.dotFill ?? COLORS.blue, "none", "rounded-full");
    textbox(slide, String(i + 1), { left: left, top: y + 8, width: 24, height: 14 }, { fontSize: 10, bold: true, color: "#FFFFFF", alignment: "center" });
    textbox(slide, item.head, { left: left + 42, top: y, width, height: 26 }, { fontSize: opts.headSize ?? 21, bold: true, color: opts.color ?? COLORS.ink });
    textbox(slide, item.copy, { left: left + 42, top: y + 30, width, height: 42 }, { fontSize: opts.copySize ?? 16, color: opts.copyColor ?? COLORS.slate });
  });
}

function card(slide, title, copy, position, opts = {}) {
  rect(slide, position, opts.fill ?? COLORS.panel, opts.line ?? COLORS.line, "rounded-xl");
  textbox(slide, title, { left: position.left + 22, top: position.top + 20, width: position.width - 44, height: 28 }, { fontSize: opts.titleSize ?? 21, bold: true, color: opts.titleColor ?? COLORS.ink });
  textbox(slide, copy, { left: position.left + 22, top: position.top + 60, width: position.width - 44, height: position.height - 78 }, { fontSize: opts.copySize ?? 16, color: opts.copyColor ?? COLORS.slate });
}

function connector(slide, x1, y1, x2, y2, color = COLORS.line) {
  slide.shapes.add({
    geometry: "line",
    position: { left: x1, top: y1, width: x2 - x1, height: y2 - y1 },
    fill: "none",
    line: { style: "solid", fill: color, width: 2 },
  });
}

function makeSlide(presentation, bg = COLORS.light) {
  const slide = presentation.slides.add();
  slide.background.fill = bg;
  return slide;
}

const slides = [];
const deck = Presentation.create({ slideSize: { width: W, height: H } });

function note(slide, title, text) {
  slide.speakerNotes.textFrame.setText(text);
  slide.speakerNotes.setVisible(true);
  slides.push({ title, notes: text });
}

// 01 Cover
{
  const s = makeSlide(deck, COLORS.dark);
  addImage(s, assets.homepage, { left: 705, top: 62, width: 500, height: 324 }, "cover");
  rect(s, { left: 72, top: 58, width: 130, height: 40 }, "#0D58D8", "none", "rounded-full");
  textbox(s, "L3AI", { left: 99, top: 67, width: 80, height: 22 }, { fontSize: 18, bold: true, color: "#FFFFFF", alignment: "center" });
  textbox(s, "L3AI turns Web3 uncertainty into a guided product journey", { left: 72, top: 144, width: 560, height: 208 }, { fontSize: 48, bold: true, color: "#FFFFFF" });
  textbox(s, "Product story, commercial logic and trust boundary for external review\n面向外部评审的产品叙事、商业逻辑与信任边界", { left: 72, top: 376, width: 560, height: 76 }, { fontSize: 20, color: "#C8D5E8" });
  card(s, "What changed", "This deck replaces a documentation-style roadshow draft with a product-led business story.", { left: 72, top: 500, width: 420, height: 100 }, { fill: COLORS.darkPanel, line: "#253450", titleColor: "#FFFFFF", copyColor: "#C8D5E8" });
  chip(s, "Current public assets only", 520, 526, "#0F9F6E");
  footer(s, 1, true);
  note(s, "Cover", "Open by saying that this is the rebuilt external presentation. It starts from what a visitor can experience on the public L3AI site, then connects that journey to the business model, roadmap and review ask.");
}

// 02
{
  const s = makeSlide(deck);
  addTitle(s, "The buyer problem is not access. It is confidence.", "Web3 users and partners can find data everywhere. The hard part is deciding what to trust, what to ignore and what to do next.", 2);
  card(s, "Fragmented signals", "Market context, product claims, wallet state and community narratives arrive in different places.", { left: 76, top: 300, width: 340, height: 145 });
  card(s, "High-risk decisions", "Users need boundaries before conversion. They should understand limitations before action.", { left: 470, top: 300, width: 340, height: 145 });
  card(s, "Weak public proof", "Many projects lead with documents or hype before showing a coherent product experience.", { left: 864, top: 300, width: 340, height: 145 });
  textbox(s, "L3AI's wedge is not more noise. It is a clearer journey from context to evaluation.", { left: 154, top: 500, width: 970, height: 58 }, { fontSize: 26, bold: true, color: COLORS.blue, alignment: "center" });
  note(s, "Buyer problem", "Frame the market pain without exaggerating. The claim is that L3AI helps organize public decision context and review flow, not that it predicts outcomes.");
}

// 03
{
  const s = makeSlide(deck);
  addTitle(s, "L3AI sells clarity before conversion.", "The public product experience is designed to help a reviewer understand the platform, its limits and the next qualified action.", 3);
  const steps = [
    ["Context", "AI-assisted explanation"],
    ["Education", "Wallet-aware journey"],
    ["Trust", "Risk and claim boundary"],
    ["Resources", "Deck, whitepaper, media kit"],
    ["Handoff", "Partner or customer review"],
  ];
  steps.forEach(([head, copy], i) => {
    const x = 86 + i * 225;
    rect(s, { left: x, top: 330, width: 176, height: 118 }, i === 0 ? "#E9F1FF" : "#FFFFFF", i === 0 ? COLORS.blue : COLORS.line);
    textbox(s, head, { left: x + 18, top: 356, width: 140, height: 26 }, { fontSize: 22, bold: true, color: COLORS.ink });
    textbox(s, copy, { left: x + 18, top: 392, width: 140, height: 42 }, { fontSize: 15, color: COLORS.slate });
    if (i < steps.length - 1) connector(s, x + 176, 389, x + 213, 389, "#A8B7CB");
  });
  textbox(s, "Commercial implication: trusted context creates a better path to partner review, education-led community growth and product-qualified conversations.", { left: 170, top: 510, width: 940, height: 58 }, { fontSize: 22, bold: true, color: COLORS.ink, alignment: "center" });
  note(s, "Clarity before conversion", "Explain the commercial logic in simple terms: L3AI should earn attention by reducing confusion first. The conversion path follows trust rather than promises.");
}

// 04
{
  const s = makeSlide(deck);
  addTitle(s, "The platform journey starts with proof, then moves to resources.", "The live public site gives reviewers a route before asking them to open collateral.", 4);
  addImage(s, assets.homepage, { left: 610, top: 96, width: 560, height: 350 }, "cover");
  bulletBlock(s, [
    { head: "Start at the product surface", copy: "Visitors see the live homepage, product proof and audience paths." },
    { head: "Move into product modules", copy: "AI Quant, wallet-aware education, trust and roadmap pages explain the offer." },
    { head: "Open resources only after context", copy: "Deck, whitepaper, video and media kit support the story instead of replacing it." },
  ], 82, 286, 420, 78);
  chip(s, "Current", 610, 466, COLORS.green);
  textbox(s, "Public screenshot used from the live asset package.", { left: 720, top: 470, width: 360, height: 22 }, { fontSize: 15, color: COLORS.mute });
  note(s, "Platform walkthrough", "Use this slide to connect the deck to the actual public site. The product story is not hypothetical because the screenshots and routes already exist in the public package.");
}

// 05
{
  const s = makeSlide(deck);
  addTitle(s, "AI Quant explains before action.", "The AI Quant experience is positioned as research context and explanation, not trading automation or performance advice.", 5);
  addImage(s, assets.aiQuant, { left: 80, top: 250, width: 520, height: 310 }, "cover");
  card(s, "What the user gets", "A guided research surface for market context, AI-assisted explanation and review language.", { left: 660, top: 248, width: 480, height: 102 });
  card(s, "What it avoids", "No personalized investment advice, no trading execution, no claimed predictive certainty.", { left: 660, top: 374, width: 480, height: 102 });
  chip(s, "Current", 660, 502, COLORS.green);
  chip(s, "Explain-first", 770, 502, COLORS.blue);
  note(s, "AI Quant", "Emphasize the boundary. The workflow is valuable because it helps a reviewer understand context and limits before any action.");
}

// 06
{
  const s = makeSlide(deck);
  addTitle(s, "Wallet-aware education stays public-safe.", "The wallet experience can explain asset context without exposing protected signing material or real balances in public materials.", 6);
  addImage(s, assets.wallet, { left: 650, top: 104, width: 520, height: 360 }, "cover");
  bulletBlock(s, [
    { head: "Context, not custody", copy: "Wallet-aware pages can educate around asset context while staying outside custody claims." },
    { head: "Reviewable boundary", copy: "Public assets avoid real wallet signing material and protected account information." },
    { head: "Conversion support", copy: "The experience helps users understand what to review before qualified handoff." },
  ], 82, 260, 455, 82);
  chip(s, "Current public demo", 82, 526, COLORS.green);
  note(s, "Wallet experience", "Keep this anchored in public-safe education. Do not imply that the public deck demonstrates real funds, signing, custody or user data.");
}

// 07
{
  const s = makeSlide(deck);
  addTitle(s, "Product modules reinforce one journey.", "The business story works because modules point to the same outcome: better review before action.", 7);
  const cards = [
    ["AI Quant", "Explain market context and limits."],
    ["Wallet", "Educate around wallet-aware checkpoints."],
    ["Trust", "Keep public claims and risks visible."],
    ["Resources", "Give reviewers approved files."],
    ["Roadmap", "Separate current, in-progress and planned capabilities."],
    ["Contact", "Route qualified partner or customer review."],
  ];
  cards.forEach(([h, c], i) => {
    const col = i % 3;
    const row = Math.floor(i / 3);
    card(s, h, c, { left: 84 + col * 380, top: 270 + row * 132, width: 320, height: 104 });
  });
  textbox(s, "One platform story beats a collection of disconnected assets.", { left: 190, top: 550, width: 900, height: 34 }, { fontSize: 28, bold: true, color: COLORS.blue, alignment: "center" });
  note(s, "Product modules", "This slide is the connective tissue. It shows that the deck is about the existing product journey, not a list of separate files.");
}

// 08
{
  const s = makeSlide(deck);
  addTitle(s, "The matrix separates live capabilities from the roadmap.", "Capability labels prevent the deck from presenting planned work as completed features.", 8);
  const headers = ["Capability", "Current", "In Progress", "Planned"];
  headers.forEach((h, i) => {
    rect(s, { left: 78 + i * 275, top: 250, width: i === 0 ? 260 : 220, height: 44 }, i === 0 ? COLORS.ink : COLORS.blue, "none", "rounded-lg");
    textbox(s, h, { left: 96 + i * 275, top: 262, width: i === 0 ? 220 : 184, height: 20 }, { fontSize: 16, bold: true, color: "#FFFFFF" });
  });
  const rows = [
    ["Public website and resources", "Yes", "Polish", ""],
    ["AI Quant explanation flow", "Yes", "Depth", "Expanded scoring"],
    ["Wallet-aware education", "Yes", "UX polish", "More integrations"],
    ["Community progression", "", "Design", "Program launch"],
    ["Automated production pipeline", "Yes", "QA hardening", "More channels"],
  ];
  rows.forEach((r, ri) => {
    const y = 304 + ri * 56;
    textbox(s, r[0], { left: 92, top: y + 12, width: 250, height: 22 }, { fontSize: 16, bold: true, color: COLORS.ink });
    [1, 2, 3].forEach((ci) => {
      const val = r[ci];
      if (val) chip(s, val, 84 + ci * 275, y + 9, ci === 1 ? COLORS.green : ci === 2 ? COLORS.blue : COLORS.amber);
    });
    rule(s, 78, y + 50, 1040, "#E4EAF2");
  });
  note(s, "Capability matrix", "Point out that this is a control surface for truthful public language. It protects credibility by clearly separating what is current, what is being improved and what is planned.");
}

// 09
{
  const s = makeSlide(deck);
  addTitle(s, "The lifecycle keeps users moving without promising outcomes.", "The user journey is designed around education, review and qualified handoff.", 9);
  const steps = [
    ["Discover", "Homepage and media"],
    ["Learn", "AI Quant and wallet pages"],
    ["Review", "Whitepaper, deck, FAQ"],
    ["Progress", "Education-led paths"],
    ["Partner", "Qualified handoff"],
  ];
  steps.forEach(([h, c], i) => {
    const x = 96 + i * 218;
    rect(s, { left: x, top: 308, width: 160, height: 160 }, "#FFFFFF", i === 2 ? COLORS.blue : COLORS.line, "rounded-full");
    textbox(s, String(i + 1), { left: x + 58, top: 324, width: 44, height: 30 }, { fontSize: 24, bold: true, color: i === 2 ? COLORS.blue : COLORS.ink, alignment: "center" });
    textbox(s, h, { left: x + 18, top: 374, width: 124, height: 28 }, { fontSize: 21, bold: true, color: COLORS.ink, alignment: "center" });
    textbox(s, c, { left: x + 20, top: 414, width: 120, height: 40 }, { fontSize: 14, color: COLORS.slate, alignment: "center" });
    if (i < steps.length - 1) connector(s, x + 160, 388, x + 204, 388, "#A8B7CB");
  });
  textbox(s, "Progression is a content and education path unless a future program is separately approved.", { left: 202, top: 526, width: 876, height: 34 }, { fontSize: 22, bold: true, color: COLORS.ink, alignment: "center" });
  note(s, "Lifecycle", "Avoid reward or payout language. The approved framing here is an education-led user lifecycle and a qualified review path.");
}

// 10
{
  const s = makeSlide(deck);
  addTitle(s, "The commercial model monetizes trusted product context.", "The business loop connects audience, experience, trust and partner review without relying on unsupported traction claims.", 10);
  addImage(s, assets.business, { left: 78, top: 230, width: 510, height: 300 }, "cover");
  addPlainImage(s, assets.modelLoop, { left: 700, top: 250, width: 330, height: 230 }, "contain");
  card(s, "Core loop", "Product experience creates trust. Trust improves review quality. Review quality supports partner and community growth.", { left: 650, top: 500, width: 470, height: 96 });
  note(s, "Commercial model", "The commercial model should be expressed as a disciplined loop, not as revenue projections. If the audience asks for numbers, they belong in a separately approved financial model.");
}

// 11
{
  const s = makeSlide(deck);
  addTitle(s, "Revenue logic stays evidence-gated.", "The deck can describe revenue categories, but it should not invent metrics or imply approved forecasts.", 11);
  const rows = [
    ["Public resource package", "Current", "Website, deck, whitepaper, FAQ, media kit"],
    ["Partner review path", "Current", "Qualified contact and enterprise use-case routing"],
    ["Education-led programs", "Planned", "Community learning paths and progression model"],
    ["Automation services", "In Progress", "Repeatable content, asset and validation workflow"],
  ];
  rows.forEach((r, i) => {
    const y = 258 + i * 86;
    rect(s, { left: 90, top: y, width: 1080, height: 66 }, "#FFFFFF", "#E1E8F2");
    textbox(s, r[0], { left: 118, top: y + 19, width: 260, height: 24 }, { fontSize: 20, bold: true, color: COLORS.ink });
    chip(s, r[1], 430, y + 19, r[1] === "Current" ? COLORS.green : r[1] === "Planned" ? COLORS.amber : COLORS.blue);
    textbox(s, r[2], { left: 610, top: y + 20, width: 500, height: 24 }, { fontSize: 17, color: COLORS.slate });
  });
  note(s, "Revenue logic", "Use this slide to keep commercial ambition public-safe. It shows how value could be packaged while avoiding unverifiable metrics or financial promises.");
}

// 12
{
  const s = makeSlide(deck);
  addTitle(s, "Progression is framed as education, not payout.", "Membership or progression logic should be shown only as an approved roadmap concept unless finalized for public launch.", 12);
  card(s, "Current", "Users can follow public product pages, FAQ, resources and partner contact paths.", { left: 90, top: 280, width: 330, height: 150 }, { fill: "#ECFDF5", line: "#B6E8D0" });
  card(s, "In Progress", "Progression language can organize learning, review depth and community readiness.", { left: 475, top: 280, width: 330, height: 150 }, { fill: "#EFF6FF", line: "#BBD4FF" });
  card(s, "Planned", "Any membership mechanics, tiers or incentives require separate approval before public claims.", { left: 860, top: 280, width: 330, height: 150 }, { fill: "#FFF7ED", line: "#F2C99D" });
  textbox(s, "This protects the brand from reward-style overclaims while preserving the future growth path.", { left: 180, top: 500, width: 920, height: 36 }, { fontSize: 24, bold: true, color: COLORS.ink, alignment: "center" });
  note(s, "Progression logic", "This is a conservative public framing. It keeps progression useful for product storytelling without turning it into a reward promise.");
}

// 13
{
  const s = makeSlide(deck);
  addTitle(s, "Community growth starts with useful review paths.", "The public experience can attract users, partners and media by helping each group complete a specific review job.", 13);
  addPlainImage(s, assets.ecosystem, { left: 760, top: 240, width: 320, height: 260 }, "contain");
  bulletBlock(s, [
    { head: "Customers", copy: "Understand the product and safety boundary before engagement." },
    { head: "Partners", copy: "Review the commercial story and route qualified conversations." },
    { head: "Media", copy: "Use approved language, screenshots and resource links." },
    { head: "Operators", copy: "Verify manifests, links and public asset completeness." },
  ], 90, 238, 520, 66);
  chip(s, "Current review paths", 762, 508, COLORS.green);
  chip(s, "Planned community programs", 950, 508, COLORS.amber);
  note(s, "Community growth", "Keep the community story practical: growth begins with useful paths for different audiences, not with hype or incentive mechanics.");
}

// 14
{
  const s = makeSlide(deck);
  addTitle(s, "Automation makes public assets repeatable.", "L3AI's content system can turn approved source facts into website pages, decks, video narratives, manifests and QA records.", 14);
  const nodes = [
    ["Source facts", "Approved product material"],
    ["Production", "Deck, website, video scripts"],
    ["Validation", "Safety scan and link checks"],
    ["Distribution prep", "Manifests and public package"],
  ];
  nodes.forEach(([h, c], i) => {
    const x = 110 + i * 280;
    card(s, h, c, { left: x, top: 300, width: 210, height: 116 }, { fill: i === 1 ? "#E9F1FF" : "#FFFFFF", line: i === 1 ? COLORS.blue : COLORS.line });
    if (i < nodes.length - 1) connector(s, x + 210, 358, x + 260, 358, "#A8B7CB");
  });
  textbox(s, "Automation is valuable because it is controlled: source-backed, versioned and public-safe.", { left: 170, top: 500, width: 940, height: 34 }, { fontSize: 24, bold: true, color: COLORS.blue, alignment: "center" });
  note(s, "Automation engine", "This slide describes the public asset engine, not protected system internals. It is about repeatable production and safety controls.");
}

// 15
{
  const s = makeSlide(deck);
  addTitle(s, "Video and media now follow the product story.", "The next promo narrative should move from product problem to user journey, commercial logic and review CTA.", 15);
  addImage(s, assets.videoPoster, { left: 718, top: 132, width: 430, height: 242 }, "cover");
  bulletBlock(s, [
    { head: "Open with the user problem", copy: "Confusing signals and weak trust slow Web3 decisions." },
    { head: "Show the product path", copy: "Homepage, AI Quant, wallet education, resources and partner handoff." },
    { head: "Close with a review action", copy: "Use the deck, whitepaper, demo and contact path for controlled external review." },
  ], 82, 278, 520, 74);
  chip(s, "Rewritten narrative included", 718, 410, COLORS.blue);
  note(s, "Video narrative", "Explain that the video package should stop feeling like a montage of static files. It should now follow the same product and commercial story as the deck.");
}

// 16
{
  const s = makeSlide(deck, COLORS.dark);
  addTitle(s, "Trust boundaries are a product feature.", "The strongest public story is disciplined about what L3AI does and does not claim.", 16, { dark: true, titleWidth: 760 });
  const items = [
    "No outcome promises",
    "No funding instructions",
    "No protected source exposure",
    "No protected system detail",
    "No fake partner or traction metrics",
    "No wallet signing in public media",
  ];
  items.forEach((item, i) => {
    const col = i % 2;
    const row = Math.floor(i / 2);
    card(s, item, row === 0 ? "External language must stay review-safe." : "Public assets stay separated from protected systems.", { left: 94 + col * 545, top: 290 + row * 92, width: 485, height: 68 }, { fill: COLORS.darkPanel, line: "#253450", titleColor: "#FFFFFF", copyColor: "#9FB3CC", titleSize: 20, copySize: 14 });
  });
  note(s, "Trust boundaries", "Use this as the public safety anchor. The deck is more credible because it refuses to overclaim.");
}

// 17
{
  const s = makeSlide(deck);
  addTitle(s, "Roadmap language separates Current, In Progress and Planned.", "A mature external deck makes status visible instead of letting audiences guess.", 17);
  const columns = [
    ["Current", COLORS.green, ["Public site and resources", "AI Quant explanation page", "Wallet-aware education page", "Deck, whitepaper, media kit"]],
    ["In Progress", COLORS.blue, ["Creative polish", "QA hardening", "Deeper product recording", "Automation governance"]],
    ["Planned", COLORS.amber, ["Community programs", "Expanded integrations", "Advanced motion package", "Localized campaigns"]],
  ];
  columns.forEach(([head, color, list], i) => {
    const x = 90 + i * 382;
    rect(s, { left: x, top: 254, width: 320, height: 318 }, "#FFFFFF", "#E1E8F2");
    chip(s, head, x + 24, 278, color);
    list.forEach((line, j) => textbox(s, line, { left: x + 30, top: 336 + j * 46, width: 250, height: 22 }, { fontSize: 17, bold: j === 0, color: COLORS.ink }));
  });
  note(s, "Roadmap status", "Do not let planned work sound complete. This slide gives the audience a plain status model.");
}

// 18
{
  const s = makeSlide(deck);
  addTitle(s, "GTM starts with the public site.", "The launch motion routes audiences from public proof to the right resource and handoff.", 18);
  const rows = [
    ["Homepage", "First impression and product proof"],
    ["Showcase", "Guided walkthrough for reviewers"],
    ["Resources", "Deck, whitepaper, video, manifests"],
    ["Media kit", "Approved language and visual assets"],
    ["Contact", "Qualified partner/customer handoff"],
  ];
  rows.forEach(([a, b], i) => {
    const y = 250 + i * 62;
    rect(s, { left: 160, top: y, width: 260, height: 44 }, i === 0 ? "#E9F1FF" : "#FFFFFF", i === 0 ? COLORS.blue : COLORS.line);
    textbox(s, a, { left: 184, top: y + 12, width: 200, height: 20 }, { fontSize: 18, bold: true, color: COLORS.ink });
    connector(s, 420, y + 22, 500, y + 22, "#A8B7CB");
    textbox(s, b, { left: 532, top: y + 10, width: 560, height: 24 }, { fontSize: 18, color: COLORS.slate });
  });
  note(s, "GTM", "This is a pragmatic go-to-market slide. It names the public channels without claiming external publication or paid-media results.");
}

// 19
{
  const s = makeSlide(deck);
  addTitle(s, "Partner paths start with controlled review.", "The right next step is not a broad promise. It is a qualified review package and a clear owner path.", 19);
  const audiences = [
    ["Ecosystem partners", "Review product fit, audience path and trust boundary."],
    ["Media reviewers", "Use approved screenshots, FAQ and public wording."],
    ["Enterprise buyers", "Assess production workflow, asset quality and governance."],
    ["Community operators", "Evaluate education-led growth paths and roadmap status."],
  ];
  audiences.forEach(([h, c], i) => {
    card(s, h, c, { left: 86 + (i % 2) * 560, top: 260 + Math.floor(i / 2) * 142, width: 500, height: 112 }, { fill: i === 0 ? "#E9F1FF" : "#FFFFFF", line: i === 0 ? COLORS.blue : COLORS.line });
  });
  textbox(s, "CTA: approve the 032 deck as the external story, then route partners through Resources and Contact.", { left: 150, top: 560, width: 980, height: 30 }, { fontSize: 22, bold: true, color: COLORS.blue, alignment: "center" });
  note(s, "Partner path", "The CTA is concrete. Approve this as the official external story and use the public site for routing.");
}

// 20
{
  const s = makeSlide(deck);
  addTitle(s, "The story is credible without invented metrics.", "The deck relies on visible product surfaces, public artifacts, traceable manifests and explicit boundaries.", 20);
  const proof = [
    ["Visible product", "Screenshots and pages already exist in the public package."],
    ["Controlled claims", "No outcome, funding, protected data or protected-system claims."],
    ["Versioned assets", "PPTX, PDF, HTML, notes, previews and manifests are traceable."],
    ["Status discipline", "Current, In Progress and Planned language is separated."],
  ];
  proof.forEach(([h, c], i) => {
    const x = 95 + i * 275;
    rect(s, { left: x, top: 286, width: 220, height: 200 }, "#FFFFFF", "#E1E8F2");
    textbox(s, `0${i + 1}`, { left: x + 26, top: 314, width: 60, height: 38 }, { fontSize: 28, bold: true, color: COLORS.blue });
    textbox(s, h, { left: x + 26, top: 368, width: 168, height: 26 }, { fontSize: 20, bold: true, color: COLORS.ink });
    textbox(s, c, { left: x + 26, top: 410, width: 168, height: 54 }, { fontSize: 15, color: COLORS.slate });
  });
  note(s, "Credibility", "This slide is important for investors and partners. The absence of fake metrics is a strength because the deck relies on evidence and boundaries.");
}

// 21
{
  const s = makeSlide(deck);
  addTitle(s, "Approve language before broad circulation.", "The package is ready for controlled review, but final external use should follow product, legal and brand approvals.", 21);
  const items = [
    ["Product owner", "Confirm current capability labels."],
    ["Legal and compliance", "Confirm public risk language."],
    ["Brand owner", "Confirm visual system and tone."],
    ["Release owner", "Confirm Resources links and asset package."],
  ];
  bulletBlock(s, items.map(([head, copy]) => ({ head, copy })), 160, 260, 760, 70, { dotFill: COLORS.green });
  chip(s, "Controlled review package", 800, 520, COLORS.blue);
  note(s, "Approval", "This slide protects the launch process. It does not block the asset from being generated; it states the approval path before broad circulation.");
}

// 22 Close
{
  const s = makeSlide(deck, COLORS.dark);
  addImage(s, assets.resources, { left: 680, top: 92, width: 500, height: 320 }, "cover");
  textbox(s, "Use the 032 package as the public story.", { left: 72, top: 136, width: 570, height: 118 }, { fontSize: 50, bold: true, color: "#FFFFFF" });
  textbox(s, "Open the product, review the business logic, verify the trust boundary, then route the right conversation.\n打开产品、核查商业逻辑、确认边界，再进入合适的合作沟通。", { left: 72, top: 282, width: 560, height: 92 }, { fontSize: 20, color: "#C8D5E8" });
  card(s, "Primary links", "Resources: deck, PDF, HTML preview, speaker notes\nProduct: AI Quant, wallet, trust, roadmap\nContact: qualified partner or customer review", { left: 72, top: 452, width: 530, height: 120 }, { fill: COLORS.darkPanel, line: "#253450", titleColor: "#FFFFFF", copyColor: "#C8D5E8" });
  footer(s, 22, true);
  note(s, "Close", "End with the action. This package should become the official external story and point audiences to the public Resources page for files.");
}

async function writeBlob(filePath, blob) {
  fs.writeFileSync(filePath, new Uint8Array(await blob.arrayBuffer()));
}

for (const [idx, slide] of deck.slides.items.entries()) {
  const stem = `slide-${String(idx + 1).padStart(2, "0")}`;
  await writeBlob(path.join(previewDir, `${stem}.png`), await deck.export({ slide, format: "png", scale: 1 }));
  fs.writeFileSync(path.join(qaDir, `${stem}.layout.json`), await (await slide.export({ format: "layout" })).text());
}

await writeBlob(path.join(qaDir, "deck-montage.webp"), await deck.export({ format: "webp", montage: true, scale: 1 }));
fs.writeFileSync(inspectPath, (await deck.inspect({ kind: "slide,textbox,shape,image,notes,layout", maxChars: 30000 })).ndjson);

const pptx = await PresentationFile.exportPptx(deck);
await pptx.save(pptxPath);

const notesMd = [
  "# L3AI Product Business Deck 032 Speaker Notes",
  "",
  "Purpose: external product and commercial story for controlled review.",
  "",
  ...slides.flatMap((slide, index) => [
    `## Slide ${String(index + 1).padStart(2, "0")} - ${slide.title}`,
    "",
    slide.notes,
    "",
  ]),
].join("\n");
fs.writeFileSync(notesPath, notesMd);

const htmlSlides = slides
  .map((slide, i) => {
    const src = `product-business-deck-032/preview/slide-${String(i + 1).padStart(2, "0")}.png`;
    return `<section class="slide-card"><h2>${String(i + 1).padStart(2, "0")}. ${escapeHtml(slide.title)}</h2><img src="${src}" alt="${escapeHtml(slide.title)}"><details><summary>Speaker note</summary><p>${escapeHtml(slide.notes)}</p></details></section>`;
  })
  .join("\n");
const html = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>L3AI Product Business Deck 032</title>
    <style>
      :root { color-scheme: light; font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; color: #0b1220; background: #f8fafc; }
      body { margin: 0; }
      header { padding: 56px 6vw 32px; background: #08111f; color: white; }
      header p { color: #c8d5e8; max-width: 880px; font-size: 18px; line-height: 1.6; }
      h1 { margin: 0 0 14px; font-size: clamp(34px, 5vw, 64px); line-height: 1; max-width: 980px; }
      main { display: grid; gap: 28px; padding: 36px 6vw 72px; }
      .slide-card { background: white; border: 1px solid #d8e0ea; border-radius: 8px; padding: 22px; box-shadow: 0 16px 40px rgb(15 23 42 / 8%); }
      .slide-card h2 { margin: 0 0 16px; font-size: 24px; }
      img { width: 100%; height: auto; display: block; border-radius: 6px; border: 1px solid #e4eaf2; }
      details { margin-top: 14px; color: #475569; line-height: 1.6; }
      summary { cursor: pointer; color: #155eef; font-weight: 700; }
      footer { padding: 28px 6vw; color: #64748b; }
    </style>
  </head>
  <body>
    <header>
      <h1>L3AI Product Business Deck 032</h1>
      <p>Rebuilt external business presentation centered on product journey, commercial logic, trust boundaries and roadmap status. This preview uses public screenshots and approved public asset references only.</p>
    </header>
    <main>
      ${htmlSlides}
    </main>
    <footer>Generated for controlled public review. Use the PPTX/PDF package for formal circulation.</footer>
  </body>
</html>`;
fs.writeFileSync(htmlPath, html);

const videoNarrative = `# L3AI Product Business Promo Narrative 032

Purpose: replace the image-document montage with a 3-5 minute product and commercial story.

## Narrative spine

1. Problem: Web3 users and partners do not lack data. They lack a trusted path from signal to review.
2. Product: L3AI organizes AI-assisted market context, wallet-aware education, trust boundaries and public resources into one guided journey.
3. Commercial logic: clarity creates better review, better handoff and stronger partner conversations before conversion.
4. Proof: show the public homepage, AI Quant workflow, wallet experience, business model page and Resources center.
5. Boundary: no outcome promises, no funding-action instructions, no live trading demonstration, no protected account data and no protected system detail.
6. Close: open the product, review the deck and whitepaper, then route qualified customers, partners or media reviewers through the public contact path.

## 3-5 minute structure

- 00:00-00:25 - Web3 decision noise and the confidence gap.
- 00:25-01:05 - L3AI homepage and product promise.
- 01:05-01:45 - AI Quant explain-first workflow.
- 01:45-02:20 - Wallet-aware education and trust boundary.
- 02:20-03:00 - Commercial loop: audience, experience, trust, review and handoff.
- 03:00-03:35 - Public Resources center: deck, whitepaper, video, media kit and manifests.
- 03:35-04:15 - Roadmap status: Current, In Progress and Planned.
- 04:15-04:45 - CTA: use the controlled review package and contact path.

## Voice-over draft

L3AI starts with a simple belief: in Web3, confidence is often harder to find than information.

Users see market signals, product claims, wallet context and community narratives across too many surfaces. L3AI turns those fragments into a guided public journey.

The experience begins with product proof. A reviewer can open the homepage, move into AI Quant, understand wallet-aware education, review the business model and confirm the trust boundary before opening the collateral library.

AI Quant is explain-first. It helps organize context and limitations before action. It does not promise outcomes or automate trading decisions.

The wallet experience is education-first. It can explain wallet-aware checkpoints while keeping protected signing material, real balances and account data outside public media.

The commercial logic is straightforward: clarity creates trust; trust improves review quality; review quality supports partner conversations, community learning paths and product-qualified handoff.

The Resources center brings the launch package together: product business deck, whitepaper, media kit, video package, screenshots, recordings and manifests.

L3AI separates what is current, what is in progress and what is planned. That discipline is part of the brand.

Open the product. Review the business story. Verify the trust boundary. Then route the right conversation through the public contact path.
`;
fs.writeFileSync(videoNarrativePath, videoNarrative);

const storyboard = {
  id: "L3AI_PRODUCT_BUSINESS_PROMO_NARRATIVE_032",
  status: "prepared",
  execution: "narrative_only_no_publish",
  scenes: [
    { order: 1, title: "Confidence gap", visual: assets.hero, status: "Current" },
    { order: 2, title: "Homepage product proof", visual: assets.homepage, status: "Current" },
    { order: 3, title: "AI Quant explain-first workflow", visual: assets.aiQuant, status: "Current" },
    { order: 4, title: "Wallet-aware education", visual: assets.wallet, status: "Current" },
    { order: 5, title: "Commercial loop", visual: assets.business, status: "Current" },
    { order: 6, title: "Resources center", visual: assets.resources, status: "Current" },
    { order: 7, title: "Roadmap status", visual: "roadmap.html", status: "Current / In Progress / Planned" },
    { order: 8, title: "Controlled review CTA", visual: "contact-partner.html", status: "Current" },
  ],
};
fs.writeFileSync(videoStoryboardPath, JSON.stringify(storyboard, null, 2));

await createPdf();
await createContactSheet();

const outputFiles = [
  pptxPath,
  pdfPath,
  htmlPath,
  notesPath,
  inspectPath,
  videoNarrativePath,
  videoStoryboardPath,
  path.join(qaDir, "deck-montage.webp"),
  path.join(qaDir, "deck-contact-sheet.png"),
  ...fs.readdirSync(previewDir).sort().map((file) => path.join(previewDir, file)),
  ...fs.readdirSync(qaDir).filter((file) => file.endsWith(".layout.json")).sort().map((file) => path.join(qaDir, file)),
];

const manifest = {
  asset_id: "L3AI_PRODUCT_BUSINESS_DECK_032",
  version: "032",
  status: "prepared",
  public_use: "controlled_review",
  generated_at: new Date().toISOString(),
  replaces_external_use_of: "L3AI Enterprise Roadshow Deck 031",
  safety_boundary: [
    "No outcome promises",
    "No funding-action instructions",
    "No protected-source content",
    "No protected-system implementation details",
    "No secrets or credentials",
    "Roadmap items explicitly marked Current / In Progress / Planned",
  ],
  files: outputFiles.map((filePath) => ({
    path: rel(filePath),
    bytes: fs.statSync(filePath).size,
    sha256: sha256(filePath),
  })),
};
fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

async function createPdf() {
  const pythonExe = process.env.PYTHON_EXE || "python";
  const helper = path.join(qaDir, "make-product-business-deck-032-pdf.py");
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
  const imageArgs = fs.readdirSync(previewDir).filter((f) => f.endsWith(".png")).sort().map((f) => path.join(previewDir, f));
  execFileSync(pythonExe, [helper, pdfPath, ...imageArgs], { stdio: "inherit" });
  fs.rmSync(helper, { force: true });
}

async function createContactSheet() {
  const pythonExe = process.env.PYTHON_EXE || "python";
  const helper = path.join(qaDir, "make-product-business-deck-032-contact-sheet.py");
  const out = path.join(qaDir, "deck-contact-sheet.png");
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
sheet = Image.new("RGB", (cols * thumb_w + (cols + 1) * gap, rows * (thumb_h + label_h) + (rows + 1) * gap), "#f8fafc")
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
  const imageArgs = fs.readdirSync(previewDir).filter((f) => f.endsWith(".png")).sort().map((f) => path.join(previewDir, f));
  execFileSync(pythonExe, [helper, out, ...imageArgs], { stdio: "inherit" });
  fs.rmSync(helper, { force: true });
}

console.log(JSON.stringify({
  pptx: rel(pptxPath),
  pdf: rel(pdfPath),
  html: rel(htmlPath),
  notes: rel(notesPath),
  manifest: rel(manifestPath),
}, null, 2));
process.exitCode = 0;
