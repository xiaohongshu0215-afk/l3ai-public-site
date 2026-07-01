import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { pathToFileURL } from "node:url";

const root = process.cwd();
const outDir = path.join(root, "collateral", "brand-system");
const videoDir = path.join(root, "collateral", "video", "brand-system");

for (const dir of [outDir, videoDir]) {
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
const COLORS = {
  ink: "#0B1220",
  ink2: "#172033",
  slate: "#475569",
  mute: "#64748B",
  line: "#D8E0EA",
  light: "#F8FAFC",
  panel: "#FFFFFF",
  blue: "#155EEF",
  cyan: "#18A7D8",
  green: "#0F9F6E",
  emerald: "#047857",
  amber: "#B7791F",
  orange: "#E36B2C",
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
  iconSet: "collateral/premium-assets-030/visuals/l3ai-public-icon-set-030.png",
  videoPoster: "collateral/video/premium-027/L3AI_Premium_Promo_027_poster.png",
};

const deckSpecs = [
  {
    key: "story",
    assetId: "L3AI_STORY_BOOK_V1",
    title: "L3AI Story Book v1",
    fileStem: "L3AI_Story_Book_v1",
    dirSlug: "story-book-v1",
    footer: "L3AI Story Book v1",
    accent: COLORS.blue,
    accent2: COLORS.cyan,
    purpose: "First-time visitor narrative. Start with the problem, show the product journey, then make the trust boundary explicit.",
    slides: [
      {
        type: "cover",
        title: "L3AI helps people understand Web3 before they act",
        subtitle: "A narrative-first introduction for first-time visitors, customers, partners and public reviewers.",
        image: assets.homepage,
        badge: "Story Book v1",
        note: "Open with the customer reality: people do not need more hype. They need a clean path from market context to safer review.",
      },
      {
        type: "cards",
        eyebrow: "The moment before action",
        title: "Web3 asks users to decide too quickly.",
        subtitle: "Signals, claims, wallets and communities often arrive before the user has a reliable mental model.",
        cards: [
          ["Signals arrive fast", "A user sees market context before they understand the product surface."],
          ["Claims feel loud", "Most public pages lead with conviction before they show boundaries."],
          ["Wallet context feels final", "The moment near a wallet should educate first and never pressure action."],
        ],
        note: "This slide frames the story without attacking others. L3AI is positioned as a guided review layer.",
      },
      {
        type: "imageSplit",
        eyebrow: "L3AI's narrative answer",
        title: "Slow the decision down, then make the next step clear.",
        subtitle: "L3AI organizes context, product evidence, wallet-aware education and public resources into a guided path.",
        image: assets.hero,
        bullets: [
          ["Context", "Explain what a visitor is seeing."],
          ["Product proof", "Show real public pages and flows."],
          ["Trust boundary", "Separate review from promises."],
        ],
        note: "Explain the product story as a sequence. The goal is not to push users; it is to help them review.",
      },
      {
        type: "flow",
        eyebrow: "First visit path",
        title: "A first visit should feel like a guided room.",
        subtitle: "The public site now routes visitors through the same five-step sequence.",
        steps: [
          ["See the product", "Homepage"],
          ["Understand context", "AI Quant"],
          ["Review wallet education", "Wallet page"],
          ["Check boundaries", "Trust page"],
          ["Open proof", "Resources"],
        ],
        image: assets.workflow,
        note: "This matches the new website IA: story first, product proof second, resources third.",
      },
      {
        type: "imageSplit",
        eyebrow: "Product proof",
        title: "AI Quant explains the signal before a user forms a conclusion.",
        subtitle: "The public workflow is explain-first. It supports review context without promising outcomes or automating decisions.",
        image: assets.aiQuant,
        bullets: [
          ["Explain-first", "Market context is structured as education."],
          ["Boundary visible", "The site avoids outcome promises."],
          ["Reviewable proof", "Screenshots and recordings are public assets."],
        ],
        note: "Be precise here: AI Quant is a public explanation layer, not a guaranteed prediction engine.",
      },
      {
        type: "imageSplit",
        eyebrow: "Wallet-aware education",
        title: "Wallet context becomes a checkpoint, not a pressure point.",
        subtitle: "L3AI can talk about wallet-aware journeys while keeping signing material, credentials and real account data out of public media.",
        image: assets.wallet,
        bullets: [
          ["Education first", "Explain what a wallet moment means."],
          ["No exposed private data", "Public materials stay review-safe."],
          ["Safer handoff", "Users can move to contact or resources."],
        ],
        note: "Use this slide to reinforce that public collateral is intentionally safe and does not expose private data.",
      },
      {
        type: "cards",
        eyebrow: "Trust language",
        title: "The trust boundary is part of the product.",
        subtitle: "A mature Web3 brand must make limitations easy to see.",
        cards: [
          ["No outcome promises", "Public assets do not promise performance, yield-rate, asset-price movement or future availability."],
          ["No funding-action instructions", "Materials do not tell users to deposit or trade."],
          ["No protected system details", "The public site avoids internal routes, credentials and implementation detail."],
        ],
        note: "Make the boundary sound like a product quality, not a legal footnote.",
      },
      {
        type: "imageSplit",
        eyebrow: "Resources as proof room",
        title: "Resources turn claims into reviewable files.",
        subtitle: "The Resources center gives visitors decks, whitepapers, videos, screenshots, recordings and manifests in one controlled library.",
        image: assets.resources,
        bullets: [
          ["Downloadable", "PPTX, PDF, HTML previews and notes."],
          ["Traceable", "Versioned manifests and checksums where applicable."],
          ["Public-safe", "No private repo references or secrets."],
        ],
        note: "The story ends with proof. That is the difference between a mature launch package and a pile of marketing claims.",
      },
      {
        type: "status",
        eyebrow: "Roadmap discipline",
        title: "Every public claim sits in a status lane.",
        subtitle: "Current capabilities, in-progress improvements and planned roadmap items are separated before publication.",
        columns: [
          ["Current", "Public website", "AI Quant explanation flow", "Wallet-aware education page", "Resources library"],
          ["In Progress", "Creative polish", "Localized campaigns", "More product recordings", "Launch QA evidence"],
          ["Planned", "Expanded partner kits", "Growth campaign automation", "Advanced motion package", "Broader channel distribution"],
        ],
        note: "This slide protects the brand from overstating future functionality.",
      },
      {
        type: "matrix",
        eyebrow: "Visitor routing",
        title: "Different visitors need different next steps.",
        rows: [
          ["Customer", "Understand product value", "Product Overview + AI Quant"],
          ["Partner", "Assess ecosystem fit", "Business model + Contact path"],
          ["Media", "Use approved facts", "Resources + media kit"],
          ["Investor-style reviewer", "Review logic and status", "Business deck + roadmap"],
        ],
        note: "This is the page-level reason for rebuilding the website IA around the story.",
      },
      {
        type: "cards",
        eyebrow: "What L3AI does not claim",
        title: "A credible story is also clear about what it is not.",
        subtitle: "The public narrative avoids shortcuts that create compliance, trust or reputation risk.",
        cards: [
          ["Not investment advice", "Materials are for product and business review."],
          ["Not a return guarantee", "No promises about user outcomes or market results."],
          ["Not an implementation disclosure", "Protected systems, credentials and private operations stay out of public media."],
        ],
        note: "This slide should be used whenever the deck is sent externally.",
      },
      {
        type: "closing",
        eyebrow: "Closing path",
        title: "Open the story, then choose your path.",
        subtitle: "Start with the product journey. Move into resources. Route the right conversation through contact or partner review.",
        cta: "Story -> Product -> Resources -> Contact",
        note: "Close with a calm call to action. The visitor is invited to review, not pressured to convert.",
      },
    ],
  },
  {
    key: "product",
    assetId: "L3AI_PRODUCT_BOOK_V1",
    title: "L3AI Product Book v1",
    fileStem: "L3AI_Product_Book_v1",
    dirSlug: "product-book-v1",
    footer: "L3AI Product Book v1",
    accent: COLORS.green,
    accent2: COLORS.blue,
    purpose: "Prospective user product guide. Show the live public surfaces, user lifecycle and capability map.",
    slides: [
      {
        type: "cover",
        title: "A user can review L3AI without needing a pitch",
        subtitle: "Product book for customers and evaluators who want to understand what exists now, what is in progress and what is planned.",
        image: assets.homepage,
        badge: "Product Book v1",
        note: "Position this as a product guide rather than a sales brochure.",
      },
      {
        type: "imageSplit",
        eyebrow: "Entry surface",
        title: "The product starts at the public homepage.",
        subtitle: "L3AI opens with product proof, visual rhythm, trust boundaries and direct routes into deeper pages.",
        image: assets.homepage,
        bullets: [
          ["First 30 seconds", "Visitors understand the category and next step."],
          ["Proof before files", "Screens and recordings sit before downloads."],
          ["No hidden dependency", "The public site can stand alone."],
        ],
        note: "Explain why a public homepage is part of the product, not just marketing.",
      },
      {
        type: "imageSplit",
        eyebrow: "AI Quant",
        title: "AI Quant is explain-first.",
        subtitle: "The workflow helps structure Web3 context and limitations for review without claiming certainty.",
        image: assets.aiQuant,
        bullets: [
          ["What happened", "Structure market or product context."],
          ["Why it matters", "Explain relevance in accessible language."],
          ["What to review", "Point to next proof or boundary."],
        ],
        note: "Keep the claim grounded. This is not a trading-performance slide.",
      },
      {
        type: "imageSplit",
        eyebrow: "Wallet experience",
        title: "Wallet-aware pages support safer review.",
        subtitle: "The journey can reference wallet context as education while keeping private signing and account data out of public material.",
        image: assets.wallet,
        bullets: [
          ["Context", "Wallet moments are explained."],
          ["Boundary", "No signing demonstration in public assets."],
          ["Review", "Users can move back to resources."],
        ],
        note: "This slide should reduce fear around the wallet theme by emphasizing education and safety.",
      },
      {
        type: "imageSplit",
        eyebrow: "Commercial logic page",
        title: "The business model page explains why trust matters.",
        subtitle: "L3AI connects audience, product experience, education, resources and qualified handoff into one loop.",
        image: assets.business,
        bullets: [
          ["Audience", "People arrive with curiosity or uncertainty."],
          ["Experience", "The product helps structure review."],
          ["Handoff", "Qualified conversations move to contact."],
        ],
        note: "Translate business logic into a user-safe sequence.",
      },
      {
        type: "imageSplit",
        eyebrow: "Resources",
        title: "Resources turn product claims into reviewable evidence.",
        subtitle: "A user can open decks, whitepapers, videos, screenshots, recordings and manifest files without asking for private access.",
        image: assets.resources,
        bullets: [
          ["Decks", "Editable and PDF versions."],
          ["Videos", "Public-safe product and launch story."],
          ["Manifests", "Versioned asset references."],
        ],
        note: "This slide is the bridge from product book to release package.",
      },
      {
        type: "flow",
        eyebrow: "User lifecycle",
        title: "The user lifecycle is simple.",
        subtitle: "A visitor moves from curiosity to informed review before any deeper conversation.",
        steps: [
          ["Arrive", "Homepage"],
          ["Learn", "Product pages"],
          ["Verify", "Resources"],
          ["Decide", "FAQ + trust"],
          ["Contact", "Partner path"],
        ],
        image: assets.workflow,
        note: "A clear lifecycle makes the product easier to explain to customers and partners.",
      },
      {
        type: "matrix",
        eyebrow: "Capability map",
        title: "L3AI is a public intelligence and education layer.",
        rows: [
          ["Market context", "Explain signals", "Current"],
          ["Product guidance", "Route visitors", "Current"],
          ["Wallet education", "Reduce confusion", "Current"],
          ["Release resources", "Support review", "Current"],
          ["Campaign automation", "Scale content operations", "Planned"],
        ],
        note: "Use the status column to prevent future features from sounding current.",
      },
      {
        type: "status",
        eyebrow: "Current capabilities",
        title: "What users can review now.",
        subtitle: "The current public package is intentionally centered on visible, reviewable surfaces.",
        columns: [
          ["Product pages", "Overview", "AI Quant", "Wallet", "Business model"],
          ["Proof assets", "Screenshots", "Recordings", "Decks", "Whitepaper"],
          ["Trust controls", "FAQ", "Roadmap labels", "Safety language", "Contact path"],
        ],
        note: "Current should mean public and visible, not aspirational.",
      },
      {
        type: "cards",
        eyebrow: "In progress",
        title: "What is being polished next.",
        subtitle: "These are production-quality improvements, not required proof of the current product.",
        cards: [
          ["Creative polish", "Higher-end motion design, voice-over and campaign layouts."],
          ["Localization", "More market-specific landing paths and review copy."],
          ["Evidence cadence", "More screenshots, recordings and QA manifests as the site evolves."],
        ],
        note: "Make in-progress items sound like improvement work, not missing foundations.",
      },
      {
        type: "cards",
        eyebrow: "Planned roadmap",
        title: "What remains planned.",
        subtitle: "Planned capabilities are described as future direction and require separate approval before launch claims.",
        cards: [
          ["Growth automation", "Campaign orchestration and content refresh systems."],
          ["Partner workspaces", "More partner-specific review rooms and co-marketing packages."],
          ["Deeper analytics", "Public reporting surfaces and campaign learning loops."],
        ],
        note: "Keep planned items clearly future-facing.",
      },
      {
        type: "cards",
        eyebrow: "Safety rules",
        title: "The product book keeps the public boundary intact.",
        subtitle: "Every surface is written for public review.",
        cards: [
          ["No secrets", "No credentials, keys, tunnel state or protected local paths."],
          ["No private data", "No real balances, signing material or user account details."],
          ["No unsupported promises", "No performance, yield-rate, listing-status or outcome-certainty claims."],
        ],
        note: "This safety slide is part of the product narrative, not an appendix.",
      },
      {
        type: "matrix",
        eyebrow: "Review checklist",
        title: "A prospective user can verify the product in minutes.",
        rows: [
          ["Open homepage", "Understand value proposition", "Current"],
          ["Open AI Quant", "Review explain-first workflow", "Current"],
          ["Open Wallet", "Review safety language", "Current"],
          ["Open Resources", "Download proof assets", "Current"],
          ["Open Contact", "Route qualified questions", "Current"],
        ],
        note: "This is useful as a customer demo checklist.",
      },
      {
        type: "cards",
        eyebrow: "Who uses it",
        title: "The same public layer supports several roles.",
        subtitle: "The product experience can be adapted without changing the core trust model.",
        cards: [
          ["Customers", "Understand the product before deeper engagement."],
          ["Partners", "Assess ecosystem fit and co-marketing potential."],
          ["Media reviewers", "Use approved, versioned facts and visuals."],
        ],
        note: "This bridges to the business partnership deck.",
      },
      {
        type: "closing",
        eyebrow: "Close",
        title: "Review the product before reviewing the pitch.",
        subtitle: "The public product path is the first proof point. The deck and whitepaper should reinforce what visitors can already see.",
        cta: "Open Product Overview -> Review Resources -> Contact",
        note: "Close by sending evaluators back to the product surface.",
      },
    ],
  },
  {
    key: "business",
    assetId: "L3AI_BUSINESS_PARTNERSHIP_DECK_V1",
    title: "L3AI Business & Partnership Deck v1",
    fileStem: "L3AI_Business_Partnership_Deck_v1",
    dirSlug: "business-partnership-deck-v1",
    footer: "L3AI Business & Partnership Deck v1",
    accent: COLORS.blue,
    accent2: COLORS.amber,
    purpose: "Partner and investor-style business deck. Connect product proof, commercial loop, roadmap gates and partner review path.",
    slides: [
      {
        type: "cover",
        title: "L3AI creates a safer path from Web3 attention to qualified review",
        subtitle: "Business and partnership narrative for external review, partner conversations and investor-style diligence.",
        image: assets.business,
        badge: "Business & Partnership Deck v1",
        note: "Open with the commercial logic: L3AI organizes attention into qualified review, not speculative promises.",
      },
      {
        type: "cards",
        eyebrow: "Why now",
        title: "Web3 attention is abundant. Qualified trust is scarce.",
        subtitle: "The brands that win the next cycle will make their product, proof and risk boundaries legible.",
        cards: [
          ["Audience fatigue", "Users are tired of noisy claims and unclear product paths."],
          ["Review pressure", "Partners and media need approved, public-safe facts."],
          ["Trust premium", "Clear boundaries create better conversations and fewer support failures."],
        ],
        note: "Keep this macro slide grounded. Do not use market-size claims that are not sourced.",
      },
      {
        type: "matrix",
        eyebrow: "Audience problem",
        title: "Each audience asks a different diligence question.",
        rows: [
          ["Customer", "Can I understand the product safely?", "Product path"],
          ["Partner", "Is the ecosystem narrative coherent?", "Business model"],
          ["Media", "Can I quote approved facts?", "Resources"],
          ["Investor-style reviewer", "Is the roadmap disciplined?", "Deck + manifests"],
        ],
        note: "This gives partners a simple way to understand segmentation.",
      },
      {
        type: "imageSplit",
        eyebrow: "Product proof",
        title: "The product proof is already public.",
        subtitle: "The homepage, product pages, recordings and Resources center are visible before any private conversation.",
        image: assets.homepage,
        bullets: [
          ["Public site", "The product story is accessible."],
          ["Public recordings", "Key flows are captured."],
          ["Public resources", "Decks and proof files are downloadable."],
        ],
        note: "This is the foundation of the business story.",
      },
      {
        type: "flow",
        eyebrow: "Commercial loop",
        title: "The commercial loop starts with clarity.",
        subtitle: "L3AI turns attention into understanding, understanding into trust and trust into qualified handoff.",
        steps: [
          ["Attention", "Public channel"],
          ["Understanding", "Product story"],
          ["Trust", "Boundary + proof"],
          ["Review", "Resources"],
          ["Handoff", "Contact path"],
        ],
        image: assets.modelLoop,
        note: "This is the business model without overpromising revenue.",
      },
      {
        type: "cards",
        eyebrow: "Partner value",
        title: "Partners get a cleaner launch surface.",
        subtitle: "The value is not only content. It is a controlled review experience that can support co-marketing and diligence.",
        cards: [
          ["Narrative clarity", "One story across homepage, decks, videos and resources."],
          ["Public-safe assets", "Approved screenshots, recordings, notes and manifests."],
          ["Qualified routing", "Cleaner contact path for deeper conversations."],
        ],
        note: "Partners care about repeatability and risk control.",
      },
      {
        type: "cards",
        eyebrow: "Media value",
        title: "Media reviewers can use approved facts without guessing.",
        subtitle: "The Resources center acts as a media room for public narratives, screenshots, video and review notes.",
        cards: [
          ["Press-ready story", "Short, consistent and boundary-aware."],
          ["Visual proof", "Screenshots and recordings from public pages."],
          ["Version control", "Manifests and stable asset paths."],
        ],
        note: "This slide explains why the asset library matters commercially.",
      },
      {
        type: "cards",
        eyebrow: "Enterprise buyer value",
        title: "Enterprise-style buyers need confidence before depth.",
        subtitle: "L3AI's public layer gives them an initial review path before any private demo or partner conversation.",
        cards: [
          ["Easy orientation", "What it is, who it is for and what is current."],
          ["Risk-aware messaging", "No unsupported promises or private detail."],
          ["Handoff readiness", "Clear contact and partner review route."],
        ],
        note: "This is not an enterprise sales claim; it is a buyer-experience claim.",
      },
      {
        type: "imageSplit",
        eyebrow: "Community path",
        title: "A community path works when education comes before conversion.",
        subtitle: "Public product pages and FAQs give communities safer language for discussing the platform.",
        image: assets.resources,
        bullets: [
          ["Shared facts", "Use approved resources."],
          ["Shared boundaries", "Avoid unsupported claims."],
          ["Shared next steps", "Route qualified questions."],
        ],
        note: "This supports community without claiming automated social publishing.",
      },
      {
        type: "cards",
        eyebrow: "Automation system",
        title: "The operating system is built for preparation, not uncontrolled publishing.",
        subtitle: "Distribution and release systems prepare packages, validate assets and enforce approval gates before any external execution.",
        cards: [
          ["Prepare", "Organize assets and manifests."],
          ["Validate", "Run public safety and link checks."],
          ["Approve", "Keep execution behind gates."],
        ],
        note: "This reflects the current safe-mode operating model.",
      },
      {
        type: "status",
        eyebrow: "Roadmap gates",
        title: "Growth only enters the story after it passes the right gate.",
        subtitle: "Current, in-progress and planned capabilities are separated to protect credibility.",
        columns: [
          ["Current", "Public product site", "Flagship books", "Resources room", "Safety QA"],
          ["In Progress", "Creative motion", "Localization", "More recordings", "Campaign polish"],
          ["Planned", "Automated growth loops", "Partner portals", "Broader integrations", "Advanced analytics"],
        ],
        note: "Roadmap gates make the business story mature.",
      },
      {
        type: "cards",
        eyebrow: "Revenue discipline",
        title: "Revenue categories stay evidence-gated.",
        subtitle: "The deck can discuss commercial categories without fabricating traction, partnerships or guarantees.",
        cards: [
          ["Product-led conversion", "Qualified users and partners move through public review."],
          ["Partner programs", "Co-marketing and ecosystem opportunities remain review-based."],
          ["Services and enablement", "Support around content, education and launch operations can be explored."],
        ],
        note: "Do not make financial forecasts here unless separately approved and evidenced.",
      },
      {
        type: "imageSplit",
        eyebrow: "Go-to-market",
        title: "GTM starts with the public site, not a private pitch.",
        subtitle: "Every channel should point back to the same story, product proof and resources.",
        image: assets.hero,
        bullets: [
          ["Homepage", "Narrative entry."],
          ["Product pages", "Proof and explanation."],
          ["Resources", "Files and manifests."],
        ],
        note: "This explains how social, media and partner routes should converge.",
      },
      {
        type: "cards",
        eyebrow: "Trust model",
        title: "The trust model is visible by design.",
        subtitle: "The public launch package is built to prevent common launch risks.",
        cards: [
          ["No private exposure", "No credentials, protected data or internal implementation detail."],
          ["No unsupported claims", "No performance, yield-rate, listing-status, unverified traction or unapproved partnership claims."],
          ["No uncontrolled execution", "Publishing and production operations require separate approval gates."],
        ],
        note: "This is a board-level trust slide.",
      },
      {
        type: "matrix",
        eyebrow: "Flagship asset system",
        title: "The release package now has three primary books.",
        rows: [
          ["Story Book", "First-time visitors", "Narrative entry"],
          ["Product Book", "Prospective users", "Product evaluation"],
          ["Business Deck", "Partners and investors", "Commercial review"],
          ["Resources", "Everyone", "Downloadable proof"],
        ],
        note: "This is the 033 deliverable map.",
      },
      {
        type: "flow",
        eyebrow: "Partner review path",
        title: "A partner can review L3AI in a controlled sequence.",
        subtitle: "This path creates a clean handoff without requiring access to private systems.",
        steps: [
          ["Story", "Read narrative"],
          ["Product", "Open public flows"],
          ["Business", "Review commercial loop"],
          ["Proof", "Download assets"],
          ["Contact", "Open partner path"],
        ],
        image: assets.ecosystem,
        note: "Use this as the practical next-step slide in partner calls.",
      },
      {
        type: "cards",
        eyebrow: "Approval and next step",
        title: "What a partner should ask for next.",
        subtitle: "The public package should lead to clear, qualified asks rather than vague interest.",
        cards: [
          ["Content review", "Confirm public narrative fit and localization needs."],
          ["Launch alignment", "Confirm timing, channels and approved claims."],
          ["Pilot scope", "Define what can be evaluated without private exposure."],
        ],
        note: "This keeps the conversation productive.",
      },
      {
        type: "closing",
        eyebrow: "Close",
        title: "L3AI turns a noisy category into a reviewable product story.",
        subtitle: "The business opportunity begins with trust: a public product path, a controlled asset room and a disciplined roadmap.",
        cta: "Story Book -> Product Book -> Business Deck -> Partner Review",
        note: "Close with confidence, but without hype.",
      },
    ],
  },
];

const allGeneratedFiles = [];

for (const spec of deckSpecs) {
  const files = await buildDeck(spec);
  allGeneratedFiles.push(...files);
}

const narrativePath = path.join(videoDir, "L3AI_Public_Story_Promo_Narrative_v1.md");
const storyboardPath = path.join(videoDir, "L3AI_Public_Story_Promo_Storyboard_v1.json");
writePromoNarrative(narrativePath, storyboardPath);
allGeneratedFiles.push(narrativePath, storyboardPath);

const unifiedManifestPath = path.join(outDir, "L3AI_PUBLIC_NARRATIVE_SYSTEM_V1_MANIFEST.json");
writeUnifiedManifest(unifiedManifestPath);

console.log(JSON.stringify({
  status: "prepared",
  manifests: [relative(unifiedManifestPath)],
  decks: deckSpecs.map((spec) => ({
    title: spec.title,
    pptx: `collateral/brand-system/${spec.fileStem}.pptx`,
    pdf: `collateral/brand-system/${spec.fileStem}.pdf`,
    html: `collateral/brand-system/${spec.fileStem}.html`,
  })),
  video_narrative: relative(narrativePath),
}, null, 2));

async function buildDeck(spec) {
  const deckAssetDir = path.join(outDir, spec.dirSlug);
  const previewDir = path.join(deckAssetDir, "preview");
  const qaDir = path.join(deckAssetDir, "qa");
  for (const dir of [deckAssetDir, previewDir, qaDir]) {
    fs.mkdirSync(dir, { recursive: true });
  }

  const pptxPath = path.join(outDir, `${spec.fileStem}.pptx`);
  const pdfPath = path.join(outDir, `${spec.fileStem}.pdf`);
  const htmlPath = path.join(outDir, `${spec.fileStem}.html`);
  const notesPath = path.join(outDir, `${spec.fileStem}_speaker_notes.md`);
  const manifestPath = path.join(outDir, `${spec.assetId}_MANIFEST.json`);
  const inspectPath = path.join(outDir, `${spec.fileStem}.pptx.inspect.ndjson`);
  const deck = Presentation.create({ slideSize: { width: W, height: H } });
  const notes = [];

  spec.slides.forEach((slideData, index) => {
    const slide = deck.slides.add();
    slide.background.fill = slideData.type === "cover" ? COLORS.dark : COLORS.light;
    renderSlide(slide, slideData, spec, index + 1);
    const noteText = slideData.note || `Present ${slideData.title} as part of ${spec.title}.`;
    slide.speakerNotes.textFrame.setText(noteText);
    slide.speakerNotes.setVisible(true);
    notes.push({ title: slideData.title, text: noteText });
  });

  for (const [i, slide] of deck.slides.items.entries()) {
    const stem = `slide-${String(i + 1).padStart(2, "0")}`;
    await writeBlob(path.join(previewDir, `${stem}.png`), await deck.export({ slide, format: "png", scale: 1 }));
    fs.writeFileSync(path.join(qaDir, `${stem}.layout.json`), await (await slide.export({ format: "layout" })).text());
  }

  await writeBlob(path.join(qaDir, "deck-montage.webp"), await deck.export({ format: "webp", montage: true, scale: 1 }));
  fs.writeFileSync(inspectPath, (await deck.inspect({ kind: "slide,textbox,shape,image,notes,layout", maxChars: 50000 })).ndjson);

  const pptx = await PresentationFile.exportPptx(deck);
  await pptx.save(pptxPath);

  fs.writeFileSync(notesPath, renderNotes(spec, notes));
  fs.writeFileSync(htmlPath, renderHtmlPreview(spec, notes));

  createPdf(pdfPath, previewDir, qaDir, `${spec.key}-pdf.py`);
  createContactSheet(path.join(qaDir, "deck-contact-sheet.png"), previewDir, qaDir, `${spec.key}-contact-sheet.py`);

  const outputFiles = [
    pptxPath,
    pdfPath,
    htmlPath,
    notesPath,
    manifestPath,
    inspectPath,
    path.join(qaDir, "deck-montage.webp"),
    path.join(qaDir, "deck-contact-sheet.png"),
    ...fs.readdirSync(previewDir).sort().map((file) => path.join(previewDir, file)),
    ...fs.readdirSync(qaDir).filter((file) => file.endsWith(".layout.json")).sort().map((file) => path.join(qaDir, file)),
  ];

  const manifest = {
    asset_id: spec.assetId,
    title: spec.title,
    version: "v1",
    status: "prepared",
    public_use: "controlled_public_review",
    generated_at: new Date().toISOString(),
    source_policy: "Reference PDFs were used only for narrative rhythm, information hierarchy, pacing and visual inspiration. No wording, branding or layouts were copied.",
    safety_boundary: [
      "No outcome promises",
      "No funding-action instructions",
      "No protected-source content",
      "No protected-system implementation details",
      "No secrets or credentials",
      "Roadmap items explicitly marked Current / In Progress / Planned",
    ],
    files: outputFiles.filter((file) => file !== manifestPath).map(fileRecord),
  };
  fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));

  return outputFiles;
}

function renderSlide(slide, data, spec, index) {
  switch (data.type) {
    case "cover":
      return renderCover(slide, data, spec, index);
    case "imageSplit":
      return renderImageSplit(slide, data, spec, index);
    case "flow":
      return renderFlow(slide, data, spec, index);
    case "status":
      return renderStatus(slide, data, spec, index);
    case "matrix":
      return renderMatrix(slide, data, spec, index);
    case "closing":
      return renderClosing(slide, data, spec, index);
    case "cards":
    default:
      return renderCards(slide, data, spec, index);
  }
}

function renderCover(slide, data, spec, index) {
  addImage(slide, data.image, { left: 682, top: 68, width: 526, height: 338 }, "cover");
  rect(slide, { left: 72, top: 58, width: Math.max(150, data.badge.length * 9 + 54), height: 42 }, spec.accent, "none", "rounded-full");
  textbox(slide, data.badge, { left: 96, top: 68, width: Math.max(100, data.badge.length * 9), height: 20 }, { fontSize: 15, bold: true, color: "#FFFFFF", alignment: "center" });
  textbox(slide, data.title, { left: 72, top: 136, width: 570, height: 232 }, { fontSize: 44, bold: true, color: "#FFFFFF" });
  textbox(slide, data.subtitle, { left: 72, top: 392, width: 570, height: 74 }, { fontSize: 20, color: "#D4E2F5" });
  card(slide, "What this book does", spec.purpose, { left: 72, top: 512, width: 500, height: 96 }, { fill: COLORS.darkPanel, line: "#253450", titleColor: "#FFFFFF", copyColor: "#C8D5E8", copySize: 15 });
  chip(slide, "Current / In Progress / Planned kept separate", 708, 438, COLORS.green);
  footer(slide, spec.footer, index, true);
}

function renderCards(slide, data, spec, index) {
  titleBlock(slide, data, spec, index);
  const width = data.cards.length === 3 ? 340 : 250;
  const start = data.cards.length === 3 ? 76 : 72;
  const gap = data.cards.length === 3 ? 54 : 28;
  data.cards.forEach(([title, copy], i) => {
    const x = start + i * (width + gap);
    card(slide, title, copy, { left: x, top: 304, width, height: 172 }, {
      fill: "#FFFFFF",
      line: i === 0 ? spec.accent : COLORS.line,
      titleColor: i === 0 ? spec.accent : COLORS.ink,
    });
  });
  drawStatement(slide, data.subtitle || "The public story stays reviewable, visible and safe.", 130, 532, 1020, spec);
  footer(slide, spec.footer, index);
}

function renderImageSplit(slide, data, spec, index) {
  titleBlock(slide, data, spec, index, { titleWidth: 585, subtitleWidth: 565 });
  addImage(slide, data.image, { left: 690, top: 118, width: 516, height: 360 }, "cover");
  bulletBlock(slide, data.bullets, 82, 318, 510, 78, spec);
  drawStatement(slide, data.subtitle, 704, 506, 470, spec);
  footer(slide, spec.footer, index);
}

function renderFlow(slide, data, spec, index) {
  titleBlock(slide, data, spec, index);
  addPlainImage(slide, data.image, { left: 860, top: 100, width: 282, height: 154 }, "contain");
  const startX = 86;
  const top = 324;
  const boxW = 194;
  data.steps.forEach(([head, copy], i) => {
    const x = startX + i * 224;
    rect(slide, { left: x, top, width: boxW, height: 136 }, "#FFFFFF", i === 0 ? spec.accent : COLORS.line, "rounded-xl");
    chip(slide, String(i + 1).padStart(2, "0"), x + 18, top + 18, i % 2 === 0 ? spec.accent : spec.accent2);
    textbox(slide, head, { left: x + 20, top: top + 58, width: boxW - 40, height: 28 }, { fontSize: 20, bold: true, color: COLORS.ink });
    textbox(slide, copy, { left: x + 20, top: top + 92, width: boxW - 40, height: 38 }, { fontSize: 15, color: COLORS.slate });
    if (i < data.steps.length - 1) {
      connector(slide, x + boxW + 8, top + 68, x + 218, top + 68, "#B9C7D8");
    }
  });
  drawStatement(slide, data.subtitle, 144, 520, 992, spec);
  footer(slide, spec.footer, index);
}

function renderStatus(slide, data, spec, index) {
  titleBlock(slide, data, spec, index);
  const labels = data.columns.map((column) => column[0]);
  const fills = [spec.accent, spec.accent2, COLORS.amber];
  data.columns.forEach((column, i) => {
    const x = 76 + i * 394;
    rect(slide, { left: x, top: 284, width: 340, height: 260 }, "#FFFFFF", COLORS.line, "rounded-xl");
    chip(slide, labels[i], x + 22, 306, fills[i]);
    column.slice(1).forEach((item, row) => {
      textbox(slide, item, { left: x + 28, top: 362 + row * 40, width: 280, height: 24 }, { fontSize: 18, bold: row === 0, color: row === 0 ? COLORS.ink : COLORS.slate });
      if (row < column.length - 2) {
        rule(slide, x + 28, 394 + row * 40, 284, "#EDF2F7");
      }
    });
  });
  footer(slide, spec.footer, index);
}

function renderMatrix(slide, data, spec, index) {
  titleBlock(slide, data, spec, index);
  const y = 290;
  rect(slide, { left: 76, top: y, width: 1128, height: 58 + data.rows.length * 54 }, "#FFFFFF", COLORS.line, "rounded-xl");
  const headers = ["Audience / Capability", "Question / Function", "Route / Status"];
  const xs = [104, 430, 820];
  headers.forEach((header, i) => textbox(slide, header, { left: xs[i], top: y + 22, width: 310, height: 20 }, { fontSize: 14, bold: true, color: spec.accent }));
  rule(slide, 102, y + 60, 1050, "#E7EEF7");
  data.rows.forEach((row, r) => {
    const top = y + 78 + r * 54;
    row.forEach((cell, c) => textbox(slide, cell, { left: xs[c], top, width: c === 0 ? 290 : 330, height: 30 }, { fontSize: c === 0 ? 18 : 16, bold: c === 0, color: c === 0 ? COLORS.ink : COLORS.slate }));
    if (r < data.rows.length - 1) {
      rule(slide, 102, top + 42, 1050, "#F0F4F8");
    }
  });
  footer(slide, spec.footer, index);
}

function renderClosing(slide, data, spec, index) {
  slide.background.fill = COLORS.dark;
  addImage(slide, assets.resources, { left: 716, top: 82, width: 454, height: 286 }, "cover");
  textbox(slide, data.eyebrow, { left: 72, top: 72, width: 480, height: 24 }, { fontSize: 14, bold: true, color: "#8FB7FF" });
  textbox(slide, data.title, { left: 72, top: 124, width: 620, height: 194 }, { fontSize: 42, bold: true, color: "#FFFFFF" });
  textbox(slide, data.subtitle, { left: 72, top: 344, width: 620, height: 74 }, { fontSize: 20, color: "#C8D5E8" });
  rect(slide, { left: 72, top: 486, width: 620, height: 78 }, COLORS.darkPanel, "#253450", "rounded-xl");
  textbox(slide, data.cta, { left: 100, top: 512, width: 560, height: 30 }, { fontSize: 23, bold: true, color: "#FFFFFF", alignment: "center" });
  chip(slide, "Public review package", 796, 430, spec.accent);
  footer(slide, spec.footer, index, true);
}

function titleBlock(slide, data, spec, index, opts = {}) {
  textbox(slide, data.eyebrow || spec.title, { left: 72, top: 54, width: 560, height: 24 }, { fontSize: 14, bold: true, color: spec.accent });
  textbox(slide, data.title, { left: 72, top: 90, width: opts.titleWidth || 920, height: 96 }, { fontSize: 36, bold: true, color: COLORS.ink });
  if (data.subtitle) {
    textbox(slide, data.subtitle, { left: 72, top: 200, width: opts.subtitleWidth || 800, height: 62 }, { fontSize: 19, color: COLORS.slate });
  }
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

function rect(slide, position, fill, line = COLORS.line, radius = "rounded-xl") {
  return slide.shapes.add({
    geometry: "roundRect",
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

function chip(slide, label, left, top, fill, color = "#FFFFFF") {
  const width = Math.max(72, label.length * 8 + 30);
  rect(slide, { left, top, width, height: 28 }, fill, "none", "rounded-full");
  textbox(slide, label, { left: left + 14, top: top + 5, width: width - 28, height: 18 }, { fontSize: 13, bold: true, color, alignment: "center" });
}

function card(slide, title, copy, position, opts = {}) {
  rect(slide, position, opts.fill ?? COLORS.panel, opts.line ?? COLORS.line, "rounded-xl");
  textbox(slide, title, { left: position.left + 22, top: position.top + 18, width: position.width - 44, height: 30 }, { fontSize: opts.titleSize ?? 20, bold: true, color: opts.titleColor ?? COLORS.ink });
  textbox(slide, copy, { left: position.left + 22, top: position.top + 56, width: position.width - 44, height: position.height - 70 }, { fontSize: opts.copySize ?? 15, color: opts.copyColor ?? COLORS.slate });
}

function bulletBlock(slide, items, left, top, width, gap, spec) {
  items.forEach(([head, copy], i) => {
    const y = top + i * gap;
    rect(slide, { left, top: y + 2, width: 24, height: 24 }, i % 2 === 0 ? spec.accent : spec.accent2, "none", "rounded-full");
    textbox(slide, String(i + 1), { left, top: y + 7, width: 24, height: 14 }, { fontSize: 10, bold: true, color: "#FFFFFF", alignment: "center" });
    textbox(slide, head, { left: left + 42, top: y, width, height: 26 }, { fontSize: 20, bold: true, color: COLORS.ink });
    textbox(slide, copy, { left: left + 42, top: y + 30, width, height: 40 }, { fontSize: 15, color: COLORS.slate });
  });
}

function connector(slide, x1, y1, x2, y2, color = COLORS.line) {
  slide.shapes.add({
    geometry: "line",
    position: { left: x1, top: y1, width: x2 - x1, height: y2 - y1 },
    fill: "none",
    line: { style: "solid", fill: color, width: 2 },
  });
}

function drawStatement(slide, text, left, top, width, spec) {
  rect(slide, { left, top, width, height: 72 }, "#FFFFFF", "#E4EAF2", "rounded-xl");
  rect(slide, { left, top, width: 7, height: 72 }, spec.accent, "none", "rounded-xl");
  textbox(slide, text, { left: left + 28, top: top + 18, width: width - 50, height: 40 }, { fontSize: 18, bold: true, color: COLORS.ink });
}

function footer(slide, label, index, dark = false) {
  const color = dark ? "#9FB3CC" : COLORS.mute;
  rule(slide, 72, 640, 1136, dark ? "#253450" : "#E4EAF2");
  textbox(slide, label, { left: 72, top: 654, width: 460, height: 24 }, { fontSize: 14, color });
  textbox(slide, String(index).padStart(2, "0"), { left: 1148, top: 654, width: 60, height: 24 }, { fontSize: 14, color, alignment: "right" });
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

function readImage(relPath) {
  const bytes = fs.readFileSync(path.join(root, relPath));
  return bytes.buffer.slice(bytes.byteOffset, bytes.byteOffset + bytes.byteLength);
}

async function writeBlob(filePath, blob) {
  const buffer = Buffer.from(await blob.arrayBuffer());
  fs.writeFileSync(filePath, buffer);
}

function renderNotes(spec, notes) {
  return [
    `# ${spec.title} Speaker Notes`,
    "",
    `Purpose: ${spec.purpose}`,
    "",
    ...notes.flatMap((note, index) => [
      `## Slide ${String(index + 1).padStart(2, "0")} - ${note.title}`,
      "",
      note.text,
      "",
    ]),
  ].join("\n");
}

function renderHtmlPreview(spec, notes) {
  const slideCards = notes.map((note, i) => {
    const src = `${spec.dirSlug}/preview/slide-${String(i + 1).padStart(2, "0")}.png`;
    return `<section class="slide-card"><h2>${String(i + 1).padStart(2, "0")}. ${escapeHtml(note.title)}</h2><img src="${src}" alt="${escapeHtml(note.title)}"><details><summary>Speaker note</summary><p>${escapeHtml(note.text)}</p></details></section>`;
  }).join("\n");
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>${escapeHtml(spec.title)}</title>
    <style>
      :root { color-scheme: light; font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; color: #0b1220; background: #f8fafc; }
      body { margin: 0; }
      header { padding: 56px 6vw 32px; background: #08111f; color: white; }
      header p { color: #c8d5e8; max-width: 880px; font-size: 18px; line-height: 1.6; }
      h1 { margin: 0 0 14px; font-size: clamp(34px, 5vw, 64px); line-height: 1; max-width: 980px; }
      main { display: grid; gap: 28px; padding: 36px 6vw 72px; }
      .actions { display: flex; flex-wrap: wrap; gap: 12px; margin-top: 24px; }
      .actions a { color: #fff; border: 1px solid rgba(255,255,255,.32); border-radius: 999px; padding: 10px 16px; text-decoration: none; font-weight: 700; }
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
      <h1>${escapeHtml(spec.title)}</h1>
      <p>${escapeHtml(spec.purpose)} Built from approved L3AI public product capabilities with Current, In Progress and Planned status clearly separated.</p>
      <div class="actions">
        <a href="${spec.fileStem}.pptx">Download PPTX</a>
        <a href="${spec.fileStem}.pdf">Download PDF</a>
        <a href="${spec.fileStem}_speaker_notes.md">Speaker notes</a>
      </div>
    </header>
    <main>
      ${slideCards}
    </main>
    <footer>Generated for controlled public review. Public-safe assets only.</footer>
  </body>
</html>`;
}

function createPdf(pdfPath, previewDir, qaDir, helperName) {
  const pythonExe = process.env.PYTHON_EXE || "python";
  const helper = path.join(qaDir, helperName);
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
  const imageArgs = sortedPngs(previewDir);
  execFileSync(pythonExe, [helper, pdfPath, ...imageArgs], { stdio: "inherit" });
  fs.rmSync(helper, { force: true });
}

function createContactSheet(out, previewDir, qaDir, helperName) {
  const pythonExe = process.env.PYTHON_EXE || "python";
  const helper = path.join(qaDir, helperName);
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
  execFileSync(pythonExe, [helper, out, ...sortedPngs(previewDir)], { stdio: "inherit" });
  fs.rmSync(helper, { force: true });
}

function sortedPngs(dir) {
  return fs.readdirSync(dir).filter((file) => file.endsWith(".png")).sort().map((file) => path.join(dir, file));
}

function writePromoNarrative(narrativePath, storyboardPath) {
  const narrative = `# L3AI Public Story Promo Narrative v1

Purpose: rebuild the promo narrative around the public product story and customer journey.

## Narrative spine

1. Web3 is information-rich but confidence-poor.
2. L3AI gives visitors a guided path from context to product proof.
3. AI Quant explains signals before action.
4. Wallet-aware education creates a safer checkpoint.
5. Resources turn claims into reviewable proof.
6. The trust boundary stays visible: no outcome promises, no funding-action instructions, no protected implementation detail and no private data.
7. Visitors choose the right path: customer, partner, media or investor-style review.

## 3-5 minute structure

- 00:00-00:25 - Open on decision noise and the confidence gap.
- 00:25-01:00 - Show the homepage as the public story room.
- 01:00-01:40 - Move through AI Quant as explain-first context.
- 01:40-02:15 - Show wallet-aware education as a checkpoint.
- 02:15-02:55 - Explain the commercial loop through the business model page.
- 02:55-03:35 - Open Resources and the three flagship books.
- 03:35-04:15 - Separate Current, In Progress and Planned.
- 04:15-04:45 - Close with Story Book, Product Book, Business Deck and Contact path.

## Voice-over draft

Web3 does not suffer from a lack of information. It suffers from a lack of confidence.

A visitor sees signals, claims, wallet context and community language before they know how to evaluate the product. L3AI turns that moment into a guided public journey.

The story starts with product proof. A visitor can open the homepage, see the public interface, move into AI Quant and understand the signal before forming a conclusion.

AI Quant is explain-first. It helps organize context and limitations. It does not promise outcomes or automate a financial decision.

The wallet-aware journey is education-first. It explains the moment around wallet context while keeping signing material, credentials and real account data outside public media.

The business model is built on clarity. Attention moves into understanding. Understanding creates trust. Trust supports a better review and a more qualified handoff.

Resources make the story verifiable. The Story Book is for first-time visitors. The Product Book is for prospective users. The Business and Partnership Deck is for partners and investor-style reviewers.

L3AI separates what is current, what is in progress and what is planned. That discipline is part of the brand.

Open the story. Review the product. Verify the boundary. Then choose the right path.
`;
  fs.writeFileSync(narrativePath, narrative);

  const storyboard = {
    asset_id: "L3AI_PUBLIC_STORY_PROMO_STORYBOARD_V1",
    status: "prepared",
    execution: "narrative_only_no_publish",
    scenes: [
      { order: 1, title: "Confidence gap", visual: assets.hero, status: "Current" },
      { order: 2, title: "Homepage story room", visual: assets.homepage, status: "Current" },
      { order: 3, title: "AI Quant explain-first context", visual: assets.aiQuant, status: "Current" },
      { order: 4, title: "Wallet-aware education checkpoint", visual: assets.wallet, status: "Current" },
      { order: 5, title: "Commercial loop", visual: assets.business, status: "Current" },
      { order: 6, title: "Resources proof room", visual: assets.resources, status: "Current" },
      { order: 7, title: "Three flagship books", visual: "story.html", status: "Current" },
      { order: 8, title: "Controlled review CTA", visual: "contact-partner.html", status: "Current" },
    ],
  };
  fs.writeFileSync(storyboardPath, JSON.stringify(storyboard, null, 2));
}

function writeUnifiedManifest(manifestPath) {
  const files = allGeneratedFiles
    .filter((filePath) => fs.existsSync(filePath))
    .filter((filePath, index, arr) => arr.indexOf(filePath) === index)
    .map(fileRecord);
  const manifest = {
    asset_id: "L3AI_PUBLIC_NARRATIVE_SYSTEM_V1",
    status: "prepared",
    generated_at: new Date().toISOString(),
    flagship_assets: deckSpecs.map((spec) => ({
      asset_id: spec.assetId,
      title: spec.title,
      purpose: spec.purpose,
      pptx: `collateral/brand-system/${spec.fileStem}.pptx`,
      pdf: `collateral/brand-system/${spec.fileStem}.pdf`,
      html: `collateral/brand-system/${spec.fileStem}.html`,
      speaker_notes: `collateral/brand-system/${spec.fileStem}_speaker_notes.md`,
      manifest: `collateral/brand-system/${spec.assetId}_MANIFEST.json`,
    })),
    video_assets: [
      relative(path.join(videoDir, "L3AI_Public_Story_Promo_Narrative_v1.md")),
      relative(path.join(videoDir, "L3AI_Public_Story_Promo_Storyboard_v1.json")),
    ],
    source_policy: "Uploaded reference PDFs were used only as inspiration for pacing, hierarchy and visual rhythm; no wording, branding or layouts were copied.",
    safety_boundary: [
      "No private source exposure",
      "No secrets or credentials",
      "No protected implementation detail",
      "No real user data or wallet signing material",
      "No unsupported financial, yield-rate, listing-status, traction or partnership claims",
      "Current / In Progress / Planned kept separate",
    ],
    files,
  };
  fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));
}

function fileRecord(filePath) {
  return {
    path: relative(filePath),
    bytes: fs.statSync(filePath).size,
    sha256: sha256(filePath),
  };
}

function sha256(filePath) {
  return crypto.createHash("sha256").update(fs.readFileSync(filePath)).digest("hex");
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
