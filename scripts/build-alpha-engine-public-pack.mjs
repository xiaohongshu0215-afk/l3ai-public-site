import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";
import { existsSync, mkdirSync, readdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import { extname, join, relative } from "node:path";

const publicRoot = process.cwd();
const env = process["env"];
const sourceRoot = env.L3AI_SOURCE_REPO || join(publicRoot, "..", "quantx-pro");
const sourceRef = env.L3AI_SOURCE_REF || "origin/fix/v10-p0-core-blockers";
const outDir = join(publicRoot, "collateral", "alpha-engine");
const generatedAt = env.L3AI_GENERATED_AT || new Date().toISOString();

const sourceDocs = [
  ["product_overview", "mum-platform/docs/l3ai-alpha-engine-product-overview.md"],
  ["business_whitepaper", "mum-platform/docs/l3ai-alpha-engine-product-whitepaper.md"],
  ["executive_architecture", "mum-platform/docs/l3ai-alpha-engine-executive-architecture.md"],
  ["capability_matrix", "mum-platform/docs/l3ai-alpha-engine-capability-matrix.md"],
  ["differentiation", "mum-platform/docs/l3ai-alpha-engine-differentiation.md"],
  ["use_cases", "mum-platform/docs/l3ai-alpha-engine-use-cases.md"],
  ["three_year_roadmap", "mum-platform/docs/l3ai-alpha-engine-three-year-roadmap.md"],
  ["business_glossary", "mum-platform/docs/l3ai-alpha-engine-business-glossary.md"],
  ["visual_asset_suggestions", "mum-platform/docs/l3ai-alpha-engine-visual-asset-suggestions.md"],
  ["business_materials_pack", "mum-platform/docs/l3ai-alpha-engine-business-materials-pack.md"],
  ["investor_faq", "mum-platform/docs/l3ai-alpha-engine-investor-faq.md"],
  ["llm_runtime_review", "mum-platform/docs/l3ai-alpha-engine-pi-4-llm-runtime-integration-review.md"],
];

function gitShow(file) {
  return execFileSync("git", ["-C", sourceRoot, "show", `${sourceRef}:${file}`], {
    encoding: "utf8",
    maxBuffer: 1024 * 1024 * 4,
  }).replace(/\r\n/g, "\n");
}

function sha256(textOrBuffer) {
  return createHash("sha256").update(textOrBuffer).digest("hex");
}

function escapeHtml(value) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function inlineMarkdown(value) {
  return escapeHtml(value)
    .replace(/`([^`]+)`/g, "<code>$1</code>")
    .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
}

function markdownToHtml(markdown, title) {
  const lines = markdown.split("\n");
  const html = [];
  let inList = false;
  let inTable = false;

  const closeList = () => {
    if (inList) {
      html.push("</ul>");
      inList = false;
    }
  };
  const closeTable = () => {
    if (inTable) {
      html.push("</tbody></table>");
      inTable = false;
    }
  };

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) {
      closeList();
      closeTable();
      continue;
    }
    if (/^\|.+\|$/.test(trimmed)) {
      closeList();
      if (/^\|\s*-+/.test(trimmed)) continue;
      const cells = trimmed.slice(1, -1).split("|").map((cell) => cell.trim());
      if (!inTable) {
        html.push("<table><tbody>");
        inTable = true;
      }
      html.push(`<tr>${cells.map((cell) => `<td>${inlineMarkdown(cell)}</td>`).join("")}</tr>`);
      continue;
    }
    closeTable();
    if (trimmed.startsWith("# ")) {
      closeList();
      html.push(`<h1>${inlineMarkdown(trimmed.slice(2))}</h1>`);
    } else if (trimmed.startsWith("## ")) {
      closeList();
      html.push(`<h2>${inlineMarkdown(trimmed.slice(3))}</h2>`);
    } else if (trimmed.startsWith("### ")) {
      closeList();
      html.push(`<h3>${inlineMarkdown(trimmed.slice(4))}</h3>`);
    } else if (trimmed.startsWith("- ")) {
      if (!inList) {
        html.push("<ul>");
        inList = true;
      }
      html.push(`<li>${inlineMarkdown(trimmed.slice(2))}</li>`);
    } else {
      closeList();
      html.push(`<p>${inlineMarkdown(trimmed)}</p>`);
    }
  }
  closeList();
  closeTable();

  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>${escapeHtml(title)}</title>
    <meta name="description" content="Public L3AI Alpha Engine narrative pack with product overview, capability boundaries, investor FAQ and roadmap notes.">
    <meta name="theme-color" content="#155eef">
    <link rel="canonical" href="https://xiaohongshu0215-afk.github.io/l3ai-public-site/collateral/alpha-engine/L3AI_Alpha_Engine_Public_Narrative_Pack_v1.html">
    <link rel="stylesheet" href="../../assets/public-site.css">
  </head>
  <body class="doc-page">
    <a class="skip-link" href="#content">Skip to content</a>
    <nav class="site-nav" aria-label="Primary navigation">
      <div class="site-nav-inner">
        <a class="site-brand" href="../../"><span class="site-brand-mark">L3</span><span>L3AI</span></a>
        <div class="site-links">
          <a href="../../resources.html">Resources</a>
          <a href="../../faq.html">FAQ</a>
          <a href="../../sitemap.html">Sitemap</a>
        </div>
      </div>
    </nav>
    <div class="cover">
      <p class="eyebrow">Alpha Engine Public Narrative Pack</p>
      <h1>${escapeHtml(title)}</h1>
      <p>Curated public product narrative derived from approved source documents. This page preserves the paper-only boundary and avoids live trading, custody, deployment, or financial outcome claims.</p>
      <div class="actions">
        <a class="button" href="L3AI_Alpha_Engine_Public_Narrative_Pack_v1.pdf">Download PDF</a>
        <a class="button secondary" href="L3AI_Alpha_Engine_Public_Narrative_Pack_v1.md">Download Markdown</a>
        <a class="button ghost" href="../../resources.html">Back to Resources</a>
      </div>
    </div>
    <main id="content">
${html.join("\n")}
    </main>
    <footer class="footer">Generated ${escapeHtml(generatedAt)}. Public-safe package only; no protected credentials, private code, live trading, or deployment execution is included.</footer>
  </body>
</html>
`;
}

function fileType(file) {
  const ext = extname(file).toLowerCase();
  if (ext === ".html") return "text/html";
  if (ext === ".md") return "text/markdown";
  if (ext === ".json") return "application/json";
  if (ext === ".pdf") return "application/pdf";
  if (ext === ".css") return "text/css";
  if (ext === ".xml") return "application/xml";
  if (ext === ".png") return "image/png";
  if (ext === ".webp") return "image/webp";
  if (ext === ".mp4") return "video/mp4";
  if (ext === ".srt") return "text/plain";
  if (ext === ".pptx") return "application/vnd.openxmlformats-officedocument.presentationml.presentation";
  return "application/octet-stream";
}

function walk(dir, root = dir, out = []) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    if (entry.name === ".git") continue;
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(full, root, out);
    } else {
      const bytes = readFileSync(full);
      out.push({
        path: relative(root, full).replace(/\\/g, "/"),
        bytes: statSync(full).size,
        sha256: sha256(bytes),
        type: fileType(full),
      });
    }
  }
  return out.sort((a, b) => a.path.localeCompare(b.path));
}

mkdirSync(outDir, { recursive: true });

const docs = sourceDocs.map(([id, file]) => {
  const text = gitShow(file);
  return { id, file, sha256: sha256(text), text };
});

const pack = `# L3AI Alpha Engine Public Narrative Pack v1

Generated: ${generatedAt}

## Public Positioning

L3AI Alpha Engine is a paper-only AI quant research operating-system prototype. It is designed to organize signal research, backtest snapshots, paper execution, runtime orchestration, memory, workflow governance, observability, plugin runtime controls, and institutional read models into one governed research experience.

It is not positioned as a live trading platform, broker, exchange connector, wallet custodian, financial adviser, or guaranteed-performance system.

## One-line Description

L3AI Alpha Engine helps research, product, strategy, and institutional teams review AI-assisted quant research workflows with stronger traceability, paper-only execution boundaries, and AgentOps-style evidence.

## What Has Been Completed

- Alpha Engine V1 surfaces: Signal Engine, Alpha Dashboard, Backtest snapshots, simulated TradingView connector, AI Strategy Lab, Paper Trading Engine, Alpha Center, and Institution API draft.
- Runtime layer: Runtime Facade, Runtime Data Bus, Service Discovery, integration validation, and shared read model.
- PI-4 operating layer: Runtime Kernel, Memory System, Workflow Engine, Observability, Plugin Runtime, and read-only LLM Runtime planning surface.
- Evidence operations: health, diagnostics, readiness, review packages, replay evidence, incident-style analysis, and integration review documents.

## What Is Explicitly Not Claimed

- No live trading.
- No real exchange, broker, wallet, custody, or TradingView account connection.
- No production deployment claim.
- No production credential custody.
- No guaranteed investment result, profit, liquidity, reward, or AI-driven financial outcome.
- No external plugin execution or real model-provider call in the public claim boundary.

## Commercial Shape

The most realistic near-term commercial shape is a paper-only research and governance platform:

- Demo-ready dashboard and evidence package.
- Whitepaper and business-plan narrative for product review.
- Read-only institutional API pilot.
- Partner research workspace pilots.
- AgentOps readiness and review evidence for internal operators.

Live execution should remain out of scope until security, compliance, custody, risk, authentication, observability, and human approval controls are complete.

## Differentiation

L3AI Alpha Engine is not differentiated by a single signal model. Its value is the operating layer around research:

- Research artifacts connect to runtime state, memory, workflow, observability, and review gates.
- Paper execution is separated from live execution by explicit controls.
- Plugin Runtime introduces governed extension boundaries before external code is allowed.
- LLM Runtime is modeled as a read-only planner with sandbox rules and human review for live-adjacent actions.
- AgentOps evidence makes readiness, failures, risk boundaries, and safety controls visible.

## Initial Audience

| Audience | Public-safe need |
| --- | --- |
| Research teams | Paper research workspace, reproducible evidence, and controlled strategy review |
| Product teams | Clear capability map, roadmap, workflow states, and review gates |
| Institutional reviewers | Read-only alpha previews, architecture overview, and risk boundary evidence |
| Media and partners | Plain-language product description without live-trading or return claims |
| Investors | Commercial path, moat, risks, and roadmap without fabricated traction |

## Roadmap Summary

### Current

- Paper-only research workspace.
- Prototype runtime, memory, workflow, observability, plugin runtime, and LLM planner surfaces.
- Review packages and evidence-first operating rhythm.

### In Progress / Review

- Stronger read-only API pilot shape.
- Better evidence packaging for demonstrations.
- More complete public narrative, FAQ, visual direction, and investor-facing resource links.

### Planned

- Staging governance.
- Credential custody design.
- Production-grade authentication, billing, telemetry, and support.
- Compliance and suitability review.
- Only after the above: carefully governed evaluation of live-adjacent or production execution paths.

## Investor FAQ Addendum

### What should investors see first?

The recommended packet is product overview, capability matrix, executive architecture overview, competitive differentiation, three-year roadmap, investor FAQ, and visual asset suggestions.

### What is the moat?

The moat is the integrated operating layer: signal artifacts, runtime governance, memory, workflow, plugin permissions, observability, and evidence are connected into a traceable research lifecycle.

### What is the biggest risk?

The biggest risk is overstating readiness. Public materials must keep the distinction between completed paper-only capabilities and future production claims.

### What is the next technical epic?

The next technical epic is LLM Runtime as a read-only planner. It should reuse Plugin Runtime permission negotiation, sandbox profiles, Observability traces, and Workflow human-review gates. Real provider connectors should remain mock or read-only until governance and credential custody are approved.

## LLM Runtime Public Boundary

The LLM Runtime surface is a paper-only planning model with fixture providers, prompt sandbox rules, tool grant boundaries, workflow gates, and observability references. It does not call real model providers, read protected credentials, write to external networks, deploy, or execute trades.

## Visual And Content Direction

- Use operating-system metaphors: workspace, evidence, governance, review, traces, runtime, memory, workflow.
- Avoid finance hype, guaranteed outcomes, live execution language, or black-box AI claims.
- Show layered product architecture and evidence flow instead of profit charts.
- Separate Current, In Progress, and Planned capabilities everywhere.

## Public Resource Map

| Resource | Role |
| --- | --- |
| Public whitepaper | Broad product and risk-aware narrative |
| Business plan / investor deck | Commercial model, product matrix, roadmap, and safe FAQ |
| Alpha Engine narrative pack | Focused Alpha Engine research OS addendum |
| Public FAQ | Boundary language for users, media, partners, and investors |
| Website resources | Current public download center and asset inventory |

## Source Evidence Digest

This public pack was curated from approved source documents that cover product overview, product whitepaper, executive architecture, capability matrix, differentiation, use cases, three-year roadmap, business glossary, visual asset suggestions, business materials pack, investor FAQ, and LLM Runtime integration review.

| Source ID | Source SHA-256 |
| --- | --- |
${docs.map((doc) => `| ${doc.id} | ${doc.sha256} |`).join("\n")}

## Release Boundary

This package is public collateral only. It does not execute deployment, publish social posts, upload to external services, read protected credentials, connect live data sources, or operate live trading.
`;

writeFileSync(join(outDir, "L3AI_Alpha_Engine_Public_Narrative_Pack_v1.md"), pack, "utf8");
writeFileSync(
  join(outDir, "L3AI_Alpha_Engine_Public_Narrative_Pack_v1.html"),
  markdownToHtml(pack, "L3AI Alpha Engine Public Narrative Pack v1"),
  "utf8",
);

const sourceManifest = {
  package_id: "PUBLIC-COLLATERAL-021",
  title: "L3AI Alpha Engine Public Narrative Pack",
  generated_at: generatedAt,
  source_ref: sourceRef,
  public_boundary: [
    "paper-only research operating-system prototype",
    "no live trading",
    "no external publishing or deployment execution",
    "no private code, protected credential, wallet account material, or production data",
  ],
  sources: docs.map(({ id, file, sha256: digest }) => ({ id, file, sha256: digest })),
  outputs: [
    "collateral/alpha-engine/L3AI_Alpha_Engine_Public_Narrative_Pack_v1.md",
    "collateral/alpha-engine/L3AI_Alpha_Engine_Public_Narrative_Pack_v1.html",
    "collateral/alpha-engine/L3AI_Alpha_Engine_Public_Narrative_Pack_v1.pdf",
    "collateral/alpha-engine/PUBLIC_COLLATERAL_021_MANIFEST.json",
  ],
};
writeFileSync(join(outDir, "PUBLIC_COLLATERAL_021_MANIFEST.json"), JSON.stringify(sourceManifest, null, 2) + "\n", "utf8");

if (existsSync(join(publicRoot, "PUBLIC_ASSET_MANIFEST.json"))) {
  const assets = walk(publicRoot, publicRoot).filter((asset) => asset.path !== "PUBLIC_ASSET_MANIFEST.json");
  writeFileSync(
    join(publicRoot, "PUBLIC_ASSET_MANIFEST.json"),
    JSON.stringify(
      {
        site: "l3ai-public-site",
        base_url: "https://xiaohongshu0215-afk.github.io/l3ai-public-site/",
        asset_count: assets.length,
        generated_at: generatedAt,
        assets,
      },
      null,
      2,
    ) + "\n",
    "utf8",
  );
}

console.log(JSON.stringify({ status: "ok", outDir, generatedAt, sourceCount: docs.length }, null, 2));
