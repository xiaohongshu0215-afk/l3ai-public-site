import { createHash } from "node:crypto";
import { mkdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const generatedAt = new Date().toISOString();
const baseUrl = "https://xiaohongshu0215-afk.github.io/l3ai-public-site/";

const pages = [
  {
    file: "product-overview.html",
    title: "L3AI Product Overview",
    description: "Product-first L3AI overview for enterprise Web3 decision context, product education, wallet-aware journeys and trust boundaries.",
    eyebrow: "Product overview",
    h1: "One product surface for Web3 decision context.",
    copy: "L3AI organizes public market context, AI-assisted explanation, wallet-aware education, business review and safety language into one guided product experience.",
    image: "collateral/showcase/screens/l3ai-showcase-homepage.png",
    imageAlt: "L3AI public homepage screenshot",
    primaryCta: ["Start AI workflow", "ai-quant-workflow.html"],
    secondaryCta: ["Review trust layer", "security-trust.html"],
    modules: [
      ["Market context", "Collects public-facing signals and product materials into an explainable workspace."],
      ["AI explanation", "Frames information as educational context, scenario notes and reviewer-friendly summaries."],
      ["Wallet journey", "Shows wallet-aware states through high-level product education instead of raw private data."],
      ["Trust boundary", "Keeps advice, performance, signing and production-data boundaries visible before action."],
    ],
    workflow: [
      ["Discover", "Visitor understands the product promise before opening documents."],
      ["Explore", "Visitor reviews AI Quant, wallet education and ecosystem pages."],
      ["Evaluate", "Visitor opens business model, roadmap, trust notes and supporting collateral."],
      ["Contact", "Visitor moves to partner or enterprise review when intent is clear."],
    ],
    proofTitle: "What makes this a product experience",
    proof: "The site now routes visitors through product pages first. Video, deck, whitepaper and manifests remain available, but they support the product story rather than replacing it.",
  },
  {
    file: "ai-quant-workflow.html",
    title: "L3AI AI Quant Workflow",
    description: "Explain-first AI Quant workflow for public Web3 research context and risk-aware education.",
    eyebrow: "AI Quant workflow",
    h1: "AI Quant is framed as explanation before action.",
    copy: "The AI Quant experience organizes public research context into assumptions, scenarios, review notes and boundaries. It does not present trading certainty or personalized financial advice.",
    image: "collateral/showcase/screens/l3ai-showcase-ai-quant.png",
    imageAlt: "L3AI AI Quant screenshot",
    primaryCta: ["Open wallet journey", "wallet-experience.html"],
    secondaryCta: ["Read trust boundary", "security-trust.html"],
    modules: [
      ["Input", "Public market themes, protocol context, product documentation and launch materials."],
      ["Model role", "Explain, compare, summarize and structure rather than guarantee performance."],
      ["Reviewer controls", "Risk notes, scenario language, public FAQ and unsupported-claim filters."],
      ["Output", "Educational context that can hand off to product pages, whitepaper or deck."],
    ],
    workflow: [
      ["Collect public context", "Gather public-facing information only."],
      ["Structure signals", "Separate observation, assumption, scenario and uncertainty."],
      ["Review boundary", "Remove advice, guaranteed outcome and live-execution language."],
      ["Hand off", "Route visitors to business model, roadmap or contact when appropriate."],
    ],
    proofTitle: "Remaining real screen recording need",
    proof: "A final authenticated product recording should be captured from an approved product environment when the live AI Quant workflow is approved for public demonstration.",
  },
  {
    file: "wallet-experience.html",
    title: "L3AI Wallet Experience",
    description: "Wallet-aware L3AI journey page explaining context, verification and records without exposing private wallet data.",
    eyebrow: "Wallet experience",
    h1: "Wallet context stays educational, visible and bounded.",
    copy: "L3AI presents wallet-aware product states as guided education: intent, context, review checkpoints and record awareness without exposing private keys, balances or irreversible transaction flows.",
    image: "collateral/showcase/screens/l3ai-showcase-wallet.png",
    imageAlt: "L3AI wallet journey screenshot",
    primaryCta: ["Review security", "security-trust.html"],
    secondaryCta: ["Open business model", "business-model.html"],
    modules: [
      ["Intent first", "Start from the user goal instead of forcing a technical wallet action."],
      ["Context view", "Explain product state in plain language before sensitive decisions."],
      ["Checkpoints", "Make risk reminders and confirmation moments visible."],
      ["Record layer", "Describe auditability at a high level without exposing raw account data."],
    ],
    workflow: [
      ["Understand intent", "Clarify what the visitor is trying to do."],
      ["Show context", "Present wallet-aware state as product education."],
      ["Review risk", "Keep confirmation and boundary notes visible."],
      ["Preserve records", "Explain auditability without exposing private implementation details."],
    ],
    proofTitle: "Privacy boundary",
    proof: "The public page does not include wallet signing, private keys, real user balances, production endpoints or irreversible transaction demonstrations.",
  },
  {
    file: "business-model.html",
    title: "L3AI Business Model",
    description: "L3AI public business model page for audience, product experience, trust, resources and growth loop review.",
    eyebrow: "Business model",
    h1: "The commercial story is product-led, not hype-led.",
    copy: "L3AI connects audience education, product workflows, trust boundaries and review resources into a business loop that can support customers, media, partners and investor-style due diligence.",
    image: "collateral/showcase/screens/l3ai-showcase-business-presentation.png",
    imageAlt: "L3AI business presentation screenshot",
    primaryCta: ["Open ecosystem", "ecosystem.html"],
    secondaryCta: ["Download deck", "collateral/deck/L3AI_Executive_Deck_v2.pptx"],
    modules: [
      ["Audience", "Users, media, partners and investor-style reviewers."],
      ["Experience", "Product pages, walkthroughs, AI Quant, wallet education and FAQ."],
      ["Trust", "Public-safe risk language, no unsupported claims and clear limitations."],
      ["Growth", "Education, partner review, media kit, roadmap and controlled contact paths."],
    ],
    workflow: [
      ["Educate", "Make the problem and product understandable."],
      ["Demonstrate", "Use public screenshots and guided product pages."],
      ["Evaluate", "Provide deck, whitepaper, FAQ and quality reports."],
      ["Convert", "Route qualified users to partner or enterprise review."],
    ],
    proofTitle: "Claim boundary",
    proof: "The business model page does not add revenue forecasts, asset price claims, exchange listing claims, fake traction or guaranteed outcomes.",
  },
  {
    file: "ecosystem.html",
    title: "L3AI Ecosystem",
    description: "L3AI ecosystem page connecting product education, AI market context, wallet-aware journeys, media, partners and trust resources.",
    eyebrow: "Ecosystem",
    h1: "L3AI connects product, education and release governance.",
    copy: "The ecosystem is organized around a single public product surface: AI market context, wallet-aware education, public resources, business review, media kit and trust boundary.",
    image: "collateral/video/premium-027/L3AI_Premium_Promo_027_poster.png",
    imageAlt: "L3AI premium video poster",
    primaryCta: ["Review use cases", "enterprise-use-cases.html"],
    secondaryCta: ["Open resources", "resources.html"],
    modules: [
      ["AI market context", "Public research framing and explainable product context."],
      ["Wallet-aware education", "High-level user journey and risk checkpoints."],
      ["Media and partners", "Approved language, resources and review paths."],
      ["Governance", "Manifest, QA reports, safety notes and release evidence."],
    ],
    workflow: [
      ["Public context", "Start with visible product and market education."],
      ["Product journeys", "Move through AI Quant, wallet and business model pages."],
      ["Trust evidence", "Read risk boundary, FAQ, manifest and quality reports."],
      ["Partner review", "Move to contact when the review intent is qualified."],
    ],
    proofTitle: "Ecosystem role",
    proof: "The ecosystem page explains how public materials reinforce one product narrative without exposing private implementation details.",
  },
  {
    file: "security-trust.html",
    title: "L3AI Security and Trust",
    description: "Security and trust page for L3AI public risk boundaries, claim controls, privacy and launch evidence.",
    eyebrow: "Security and trust",
    h1: "Trust is designed into the public journey.",
    copy: "L3AI keeps unsupported claims, private implementation details, wallet signing, live trading and production data out of the public experience while keeping evidence and limitations visible.",
    image: "collateral/showcase/screens/l3ai-showcase-faq.png",
    imageAlt: "L3AI FAQ screenshot",
    primaryCta: ["Review roadmap", "roadmap.html"],
    secondaryCta: ["Read FAQ", "faq.html"],
    modules: [
      ["Claim control", "No guaranteed returns, APY, asset price or exchange listing claims."],
      ["Privacy boundary", "No private keys, wallet balances, user data or protected configuration."],
      ["Release evidence", "Manifest, quality report, link checks and public asset inventory."],
      ["Human review", "Manual approval remains required for voice-over, certified recordings and campaigns."],
    ],
    workflow: [
      ["State limits", "Make what L3AI does and does not do easy to find."],
      ["Show evidence", "Expose public manifests, report links and resource inventory."],
      ["Route review", "Move technical, legal or partner reviewers to the right materials."],
      ["Escalate contact", "Use contact/partner page when review needs a responsible owner."],
    ],
    proofTitle: "Security posture",
    proof: "This public site does not execute external publishing, wallet signing, live trading, CDN upload, OSS upload or production system changes.",
  },
  {
    file: "roadmap.html",
    title: "L3AI Roadmap",
    description: "L3AI roadmap page separating current public package, in-progress premium production and planned creative/product work.",
    eyebrow: "Roadmap",
    h1: "Current, in progress and planned work stay separate.",
    copy: "The roadmap shows what is public now, what is being improved, and what still requires manual creative production or approved product recordings.",
    image: "collateral/showcase/screens/l3ai-showcase-resources.png",
    imageAlt: "L3AI resources screenshot",
    primaryCta: ["Open use cases", "enterprise-use-cases.html"],
    secondaryCta: ["Review gap tracker", "collateral/conversion/PREMIUM_CONVERT_028_GAP_TRACKER.md"],
    modules: [
      ["Current", "Product pages, public demo, video, deck, whitepaper, resources and manifests."],
      ["In progress", "Conversion page expansion, improved navigation and enterprise walkthroughs."],
      ["Planned", "Professional voice-over, authenticated recordings, motion graphics and localization."],
      ["Gate", "Public claims remain bounded until approved evidence exists."],
    ],
    workflow: [
      ["Public package", "Use the site for controlled review and product education."],
      ["Production upgrade", "Add certified recordings and polished campaign media."],
      ["Partner motion", "Use enterprise review paths and contact routing."],
      ["Scale", "Only expand paid distribution after manual creative gaps are closed."],
    ],
    proofTitle: "Roadmap discipline",
    proof: "Planned items are not described as live product capabilities. They are tracked as future or manual production work.",
  },
  {
    file: "enterprise-use-cases.html",
    title: "L3AI Enterprise Use Cases",
    description: "Enterprise use cases for L3AI across customer education, partner review, media launch, investor diligence and internal enablement.",
    eyebrow: "Enterprise use cases",
    h1: "Different reviewers get a clear product path.",
    copy: "L3AI supports structured review for prospective customers, partners, media, investor-style diligence and internal launch operators without asking them to hunt through a document library.",
    image: "collateral/showcase/screens/l3ai-showcase-get-started.png",
    imageAlt: "L3AI get started screenshot",
    primaryCta: ["Contact partner team", "contact-partner.html"],
    secondaryCta: ["Open product overview", "product-overview.html"],
    modules: [
      ["Customer education", "Explain product value and safety boundaries before conversion."],
      ["Partner review", "Route partners through ecosystem, business model and trust pages."],
      ["Media launch", "Provide approved language, screenshots, video and public FAQ."],
      ["Operator review", "Use manifests, quality reports and readiness trackers for launch governance."],
    ],
    workflow: [
      ["Choose role", "Visitor selects customer, partner, media or operator path."],
      ["Review product", "Visitor sees product pages and walkthroughs first."],
      ["Open evidence", "Visitor uses video, deck, whitepaper and manifest as proof."],
      ["Start contact", "Qualified intent routes to the partner contact page."],
    ],
    proofTitle: "Conversion improvement",
    proof: "Use cases make the next step role-specific instead of sending everyone to the same resource library.",
  },
  {
    file: "contact-partner.html",
    title: "L3AI Contact and Partner Review",
    description: "Contact and partner review page for L3AI, routing qualified visitors without collecting sensitive information on the static site.",
    eyebrow: "Contact and partner",
    h1: "Move from review to a qualified conversation.",
    copy: "This static public page provides a safe partner-review handoff. It does not collect protected data or process form submissions until an approved contact endpoint is configured.",
    image: "collateral/showcase/screens/l3ai-showcase-get-started-mobile.png",
    imageAlt: "L3AI mobile get started screenshot",
    primaryCta: ["Open resources", "resources.html"],
    secondaryCta: ["Review trust layer", "security-trust.html"],
    modules: [
      ["Enterprise review", "Use product overview, use cases, deck and trust materials before contact."],
      ["Partner review", "Use business model, ecosystem and roadmap pages."],
      ["Media review", "Use media kit, video, screenshots and FAQ."],
      ["Operator review", "Use manifest, quality report and gap tracker."],
    ],
    workflow: [
      ["Prepare context", "Review product and use case pages."],
      ["Collect questions", "List business, legal, media or technical review needs."],
      ["Use approved channel", "Send through the externally approved contact route when configured."],
      ["Keep boundary", "Do not submit wallet data, private access material, user data or protected configuration."],
    ],
    proofTitle: "Conversion endpoint status",
    proof: "An official form, CRM or email endpoint requires legal and operations approval before it is embedded. Until then, this page acts as a safe handoff and checklist.",
  },
];

function htmlEscape(value) {
  return value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;");
}

function nav(active) {
  const links = [
    ["Overview", "product-overview.html"],
    ["AI Quant", "ai-quant-workflow.html"],
    ["Wallet", "wallet-experience.html"],
    ["Trust", "security-trust.html"],
    ["Use Cases", "enterprise-use-cases.html"],
    ["Contact", "contact-partner.html"],
    ["Resources", "resources.html"],
  ];
  return links.map(([label, href]) => `<a${href === active ? ' aria-current="page"' : ""} href="${href}">${label}</a>`).join("\n          ");
}

function moduleCards(items) {
  return items.map(([title, copy]) => `<article>
            <h3>${htmlEscape(title)}</h3>
            <p>${htmlEscape(copy)}</p>
          </article>`).join("\n          ");
}

function workflowCards(items) {
  return items.map(([title, copy], index) => `<div class="flow-card">
            <span>${String(index + 1).padStart(2, "0")}</span>
            <strong>${htmlEscape(title)}</strong>
            <p>${htmlEscape(copy)}</p>
          </div>`).join("\n          ");
}

function relatedCards(currentFile) {
  return pages
    .filter((page) => page.file !== currentFile)
    .slice(0, 4)
    .map((page) => `<a href="${page.file}"><strong>${htmlEscape(page.eyebrow)}</strong><span>${htmlEscape(page.h1)}</span></a>`)
    .join("\n          ");
}

function renderPage(page) {
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>${htmlEscape(page.title)}</title>
    <meta name="description" content="${htmlEscape(page.description)}">
    <meta name="theme-color" content="#0f172a">
    <link rel="canonical" href="${baseUrl}${page.file}">
    <link rel="icon" href="marketing/en/images/lib075-003-social-square.en.png">
    <link rel="stylesheet" href="assets/public-site.css">
    <meta property="og:title" content="${htmlEscape(page.title)}">
    <meta property="og:description" content="${htmlEscape(page.description)}">
    <meta property="og:type" content="website">
    <meta property="og:url" content="${baseUrl}${page.file}">
    <meta property="og:image" content="${baseUrl}${page.image}">
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="${htmlEscape(page.title)}">
    <meta name="twitter:description" content="${htmlEscape(page.description)}">
    <meta name="twitter:image" content="${baseUrl}${page.image}">
  </head>
  <body>
    <a class="skip-link" href="#main">Skip to content</a>
    <nav class="site-nav" aria-label="Primary navigation">
      <div class="site-nav-inner">
        <a class="site-brand" href="./"><span class="site-brand-mark">L3</span><span>L3AI</span></a>
        <div class="site-links">
          ${nav(page.file)}
        </div>
      </div>
    </nav>

    <header class="conversion-hero">
      <div class="conversion-hero-inner">
        <div>
          <p class="eyebrow inverse">${htmlEscape(page.eyebrow)}</p>
          <h1>${htmlEscape(page.h1)}</h1>
          <p class="premium-hero-copy">${htmlEscape(page.copy)}</p>
          <div class="premium-actions">
            <a class="button premium-primary" href="${page.primaryCta[1]}">${htmlEscape(page.primaryCta[0])}</a>
            <a class="button premium-secondary" href="${page.secondaryCta[1]}">${htmlEscape(page.secondaryCta[0])}</a>
          </div>
        </div>
        <figure class="conversion-visual">
          <img src="${page.image}" alt="${htmlEscape(page.imageAlt)}">
        </figure>
      </div>
    </header>

    <main id="main">
      <section class="premium-section conversion-modules">
        <div class="section-heading">
          <p class="eyebrow">Product modules</p>
          <h2>What this page helps the visitor understand.</h2>
        </div>
        <div class="capability-grid">
          ${moduleCards(page.modules)}
        </div>
      </section>

      <section class="premium-section conversion-walkthrough">
        <div class="section-heading">
          <p class="eyebrow">Walkthrough</p>
          <h2>From first context to next step.</h2>
        </div>
        <div class="showcase-flow">
          ${workflowCards(page.workflow)}
        </div>
      </section>

      <section class="premium-section split-note">
        <div>
          <p class="eyebrow">Proof boundary</p>
          <h2>${htmlEscape(page.proofTitle)}</h2>
          <p>${htmlEscape(page.proof)}</p>
        </div>
        <div class="resource-actions">
          <a href="collateral/video/premium-027/L3AI_Premium_Promo_3min_027.mp4">Watch flagship video</a>
          <a href="collateral/deck/L3AI_Executive_Deck_v2.pptx">Open Executive Deck v2</a>
          <a href="collateral/video/premium-027/PREMIUM_VIDEO_027_MANIFEST.json">Verify manifest</a>
          <a href="contact-partner.html">Contact / partner review</a>
        </div>
      </section>

      <section class="premium-section journey-section">
        <div class="section-heading">
          <p class="eyebrow">Continue the product journey</p>
          <h2>Explore the next product surface.</h2>
        </div>
        <div class="journey-cards">
          ${relatedCards(page.file)}
        </div>
      </section>
    </main>

    <footer class="site-footer">
      PREMIUM-CONVERT-028 product experience page. Public-safe assets only.
    </footer>
  </body>
</html>
`;
}

function sha256(relativePath) {
  const file = join(root, relativePath);
  return createHash("sha256").update(readFileSync(file)).digest("hex");
}

for (const page of pages) {
  writeFileSync(join(root, page.file), renderPage(page), "utf8");
}

mkdirSync(join(root, "collateral/conversion"), { recursive: true });

const gapTracker = `# PREMIUM-CONVERT-028 Final Production Gap Tracker

Task ID: PREMIUM-CONVERT-028
Generated: ${generatedAt}
Status: COMPLETE FOR PRODUCT-FIRST PUBLIC SITE EXPERIENCE

## Closed In This Task

- Product-first homepage path defined.
- Dedicated product pages generated for Product Overview, AI Quant Workflow, Wallet Experience, Business Model, Ecosystem, Security & Trust, Roadmap, Enterprise Use Cases, and Contact/Partner.
- Flagship video and Executive Deck v2 repositioned as supporting proof assets.
- Conversion journey clarified: homepage -> product overview -> product workflow -> trust/business/roadmap -> contact or resources.
- Public page links and manifest inventory prepared for validation.

## Remaining Manual Creative Work Only

1. Professional human voice-over and audio mastering.
2. Authenticated product screen recordings from an approved staging or production environment.
3. Advanced motion graphics, editorial polish and localized campaign variants.
4. Official legal/operations-approved contact, CRM or conversion endpoint.
5. Certified product screenshots for any future functionality not represented by current public assets.

## Explicit Non-Gaps

- Public product pages exist.
- Public video exists.
- Executive Deck v2 exists.
- Public screenshots exist.
- Public manifest exists.
- Public safety boundaries exist.

## Safety Boundary

No protected production access material, private source code, user data, wallet signing material, live trading, social publishing, CDN upload, OSS upload or external system execution is included in this public conversion package.
`;
writeFileSync(join(root, "collateral/conversion/PREMIUM_CONVERT_028_GAP_TRACKER.md"), gapTracker, "utf8");

const conversionReport = `# L3AI Premium Conversion Experience Report 028

Task ID: PREMIUM-CONVERT-028
Status: COMPLETE FOR PUBLIC PRODUCT-FIRST EXPERIENCE
Generated: ${generatedAt}

## Summary

PREMIUM-CONVERT-028 upgrades the public L3AI site from a resource-heavy launch package into a product-first enterprise conversion experience. The homepage now routes visitors to product pages before downloadable collateral, while the flagship video, Executive Deck v2, whitepaper and manifests serve as supporting proof assets.

## Product Pages Created

${pages.map((page) => `- \`${page.file}\``).join("\n")}

## Conversion Journey

The intended public journey is:

1. Homepage
2. Product Overview
3. AI Quant Workflow or Wallet Experience
4. Business Model, Ecosystem, Security & Trust or Roadmap
5. Enterprise Use Cases
6. Contact / Partner Review
7. Resources and manifests for deeper due diligence

## Supporting Assets

- Flagship 3:15 video: \`collateral/video/premium-027/L3AI_Premium_Promo_3min_027.mp4\`
- Executive Deck v2: \`collateral/deck/L3AI_Executive_Deck_v2.pptx\`
- Conversion manifest: \`collateral/conversion/PREMIUM_CONVERT_028_MANIFEST.json\`
- Final production gap tracker: \`collateral/conversion/PREMIUM_CONVERT_028_GAP_TRACKER.md\`

## Remaining Manual Creative Work

Only the following items remain outside the public static-site package:

- Professional human voice-over and audio mastering.
- Authenticated product screen recordings from an approved staging or production environment.
- Advanced motion graphics, editorial polish and localized campaign variants.
- Official legal/operations-approved contact, CRM or conversion endpoint.

## Safety Boundary

No protected production access material, private source code, user data, wallet signing material, live trading, external publishing, CDN upload, OSS upload or production system execution is included in this public conversion package.
`;
writeFileSync(join(root, "collateral/conversion/L3AI_Premium_Conversion_Experience_Report_028.md"), conversionReport, "utf8");

const outputs = [
  ...pages.map((page) => page.file),
  "collateral/conversion/PREMIUM_CONVERT_028_GAP_TRACKER.md",
  "collateral/conversion/L3AI_Premium_Conversion_Experience_Report_028.md",
  "collateral/conversion/PREMIUM_CONVERT_028_MANIFEST.json",
];

const manifest = {
  manifest_id: "PREMIUM_CONVERT_028_MANIFEST",
  task_id: "PREMIUM-CONVERT-028",
  generated_at: generatedAt,
  status: "prepared",
  public_base_url: baseUrl,
  product_pages: pages.map((page) => ({
    title: page.title,
    path: page.file,
    url: `${baseUrl}${page.file}`,
    sha256: sha256(page.file),
  })),
  outputs,
  remaining_manual_creative_work: [
    "professional human voice-over and audio mastering",
    "authenticated product screen recordings",
    "advanced motion graphics and localized campaign variants",
    "approved contact or conversion endpoint",
  ],
};
writeFileSync(join(root, "collateral/conversion/PREMIUM_CONVERT_028_MANIFEST.json"), JSON.stringify(manifest, null, 2) + "\n", "utf8");

console.log(JSON.stringify({ status: "ok", pages: pages.length, manifest: "collateral/conversion/PREMIUM_CONVERT_028_MANIFEST.json" }, null, 2));
