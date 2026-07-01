import fs from "node:fs";
import http from "node:http";
import path from "node:path";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const { chromium } = require("playwright");

const root = process.cwd();
const outDir = path.join(root, "collateral", "premium-assets-030");
const screenDir = path.join(outDir, "screens");
const rawVideoDir = path.join(outDir, "recordings", "raw-webm");

for (const dir of [screenDir, rawVideoDir]) {
  fs.mkdirSync(dir, { recursive: true });
}

const mime = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".mp4": "video/mp4",
  ".webm": "video/webm",
  ".pdf": "application/pdf",
  ".pptx": "application/vnd.openxmlformats-officedocument.presentationml.presentation",
  ".md": "text/markdown; charset=utf-8",
};

const flows = [
  {
    id: "homepage-flow",
    title: "Homepage product discovery",
    page: "index.html",
    audience: "Customers and first-time reviewers",
    steps: [
      { type: "wait", ms: 900 },
      { type: "scroll", y: 620 },
      { type: "wait", ms: 700 },
      { type: "scroll", y: 720 },
      { type: "wait", ms: 700 },
      { type: "home" },
      { type: "wait", ms: 500 },
    ],
  },
  {
    id: "ai-quant-workflow",
    title: "AI Quant workflow",
    page: "ai-quant-workflow.html",
    audience: "Product reviewers",
    steps: [
      { type: "wait", ms: 800 },
      { type: "scroll", y: 650 },
      { type: "wait", ms: 900 },
      { type: "scroll", y: 700 },
      { type: "wait", ms: 600 },
    ],
  },
  {
    id: "wallet-experience",
    title: "Wallet-aware education flow",
    page: "wallet-experience.html",
    audience: "Trust and wallet-experience reviewers",
    steps: [
      { type: "wait", ms: 800 },
      { type: "scroll", y: 650 },
      { type: "wait", ms: 900 },
      { type: "scroll", y: 700 },
      { type: "wait", ms: 600 },
    ],
  },
  {
    id: "business-model",
    title: "Business model walkthrough",
    page: "business-model.html",
    audience: "Commercial and partner reviewers",
    steps: [
      { type: "wait", ms: 800 },
      { type: "scroll", y: 650 },
      { type: "wait", ms: 900 },
      { type: "scroll", y: 700 },
      { type: "wait", ms: 600 },
    ],
  },
  {
    id: "resources-flow",
    title: "Resources and downloads flow",
    page: "resources.html",
    audience: "Customers, media, launch operators",
    steps: [
      { type: "wait", ms: 800 },
      { type: "scroll", y: 760 },
      { type: "wait", ms: 700 },
      { type: "scroll", y: 1180 },
      { type: "wait", ms: 700 },
      { type: "scroll", y: 1280 },
      { type: "wait", ms: 700 },
    ],
  },
  {
    id: "contact-flow",
    title: "Contact and partner review flow",
    page: "contact-partner.html",
    audience: "Qualified partners and operators",
    steps: [
      { type: "wait", ms: 800 },
      { type: "scroll", y: 650 },
      { type: "wait", ms: 900 },
      { type: "scroll", y: 700 },
      { type: "wait", ms: 600 },
    ],
  },
];

function send(res, status, headers, body) {
  res.writeHead(status, headers);
  res.end(body);
}

function staticServer() {
  const server = http.createServer((req, res) => {
    const raw = decodeURIComponent((req.url || "/").split("?")[0]);
    const normalized = raw === "/" ? "/index.html" : raw;
    const target = path.normalize(path.join(root, normalized));
    if (!target.startsWith(root)) {
      send(res, 403, { "content-type": "text/plain" }, "Forbidden");
      return;
    }
    fs.readFile(target, (error, data) => {
      if (error) {
        send(res, 404, { "content-type": "text/plain" }, "Not found");
        return;
      }
      send(res, 200, { "content-type": mime[path.extname(target).toLowerCase()] || "application/octet-stream" }, data);
    });
  });

  return new Promise((resolve) => {
    server.listen(0, "127.0.0.1", () => {
      const address = server.address();
      resolve({ server, baseUrl: `http://127.0.0.1:${address.port}` });
    });
  });
}

async function runStep(page, step) {
  if (step.type === "wait") await page.waitForTimeout(step.ms);
  if (step.type === "scroll") await page.mouse.wheel(0, step.y);
  if (step.type === "home") await page.keyboard.press("Home");
}

const { server, baseUrl } = await staticServer();
const browser = await chromium.launch({ headless: true });
const outputs = [];

try {
  for (const flow of flows) {
    const context = await browser.newContext({
      viewport: { width: 1280, height: 720 },
      deviceScaleFactor: 1,
      recordVideo: {
        dir: rawVideoDir,
        size: { width: 1280, height: 720 },
      },
    });
    const page = await context.newPage();
    const video = page.video();
    await page.goto(`${baseUrl}/${flow.page}`, { waitUntil: "networkidle" });
    await page.screenshot({
      path: path.join(screenDir, `${flow.id}-desktop.png`),
      fullPage: true,
    });

    for (const step of flow.steps) {
      await runStep(page, step);
    }

    await context.close();
    const rawVideo = await video.path();
    const rawTarget = path.join(rawVideoDir, `${flow.id}.webm`);
    fs.renameSync(rawVideo, rawTarget);
    outputs.push({
      id: flow.id,
      title: flow.title,
      page: flow.page,
      audience: flow.audience,
      screenshot: path.relative(root, path.join(screenDir, `${flow.id}-desktop.png`)).replaceAll("\\", "/"),
      raw_recording: path.relative(root, rawTarget).replaceAll("\\", "/"),
    });
  }
} finally {
  await browser.close();
  server.close();
}

fs.writeFileSync(
  path.join(outDir, "capture-index-030.json"),
  JSON.stringify(
    {
      task_id: "PREMIUM-ASSETS-030",
      generated_at: new Date().toISOString(),
      source: "local public GitHub Pages site package",
      flows: outputs,
    },
    null,
    2,
  ),
);

console.log(JSON.stringify({ captured_flows: outputs.length, output: "collateral/premium-assets-030" }, null, 2));
