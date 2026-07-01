import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const outDir = path.join(root, "collateral", "video", "premium-027");
const sceneDir = path.join(outDir, "scene-html");
const frameDir = path.join(outDir, "frames");
fs.mkdirSync(sceneDir, { recursive: true });
fs.mkdirSync(frameDir, { recursive: true });

const scenes = [
  {
    id: 1,
    title: "AI-native intelligence for Web3 decisions",
    kicker: "L3AI flagship story",
    copy: "L3AI turns fragmented market signals, wallet-aware journeys, education and risk boundaries into one guided public experience.",
    visual: "../../../premium-site/screens/l3ai-premium-homepage-desktop-026.png",
    line: "L3AI opens with a product-led public experience for Web3 decision context.",
  },
  {
    id: 2,
    title: "The public site now starts with product proof",
    kicker: "Premium homepage",
    copy: "Visitors see the platform story, live demo proof, business model and safety boundary before they reach the download library.",
    visual: "../../../showcase/screens/l3ai-showcase-homepage.png",
    line: "The homepage now leads with product proof before documents.",
  },
  {
    id: 3,
    title: "A guided journey replaces disconnected files",
    kicker: "Customer path",
    copy: "The experience routes users through discovery, onboarding, product understanding, business review and public resources.",
    visual: "../../../showcase/screens/l3ai-showcase-get-started.png",
    line: "A guided journey helps every visitor choose the right next step.",
  },
  {
    id: 4,
    title: "AI Quant explains before action",
    kicker: "Product workflow",
    copy: "The AI Quant path is framed as research context and explanation, not a promise of performance or automated trading.",
    visual: "../../../showcase/screens/l3ai-showcase-ai-quant.png",
    line: "AI Quant is positioned as explain-before-action research context.",
  },
  {
    id: 5,
    title: "Wallet-aware journeys stay public safe",
    kicker: "Wallet experience",
    copy: "Wallet-aware education shows context, verification and records without exposing real private wallet data or balances.",
    visual: "../../../showcase/screens/l3ai-showcase-wallet.png",
    line: "Wallet-aware journeys keep private wallet data outside the public story.",
  },
  {
    id: 6,
    title: "Business model review is visible",
    kicker: "Investor narrative",
    copy: "The public business plan connects audience, experience, trust and growth while avoiding forecasts, returns and unsupported claims.",
    visual: "../../../showcase/screens/l3ai-showcase-business-presentation.png",
    line: "The business model is reviewable without making financial promises.",
  },
  {
    id: 7,
    title: "Resources become a launch room",
    kicker: "Launch experience center",
    copy: "Whitepaper, deck, demo package, video assets, media kit, manifests and FAQ are organized for different reviewers.",
    visual: "../../../showcase/screens/l3ai-showcase-resources.png",
    line: "The resource center becomes a launch room for customers, media, partners and operators.",
  },
  {
    id: 8,
    title: "The trust boundary is part of the product",
    kicker: "Risk language",
    copy: "L3AI avoids personalized investment advice, guaranteed outcomes, exchange endorsements and real-funds demonstrations.",
    visual: "../../../showcase/screens/l3ai-showcase-faq.png",
    line: "Clear public boundaries are part of the product experience.",
  },
  {
    id: 9,
    title: "The ecosystem connects product, content and governance",
    kicker: "Operating model",
    copy: "Source facts, public collateral, QA gates, manifests and approval records keep launch materials controlled and traceable.",
    visual: "../../../demo/screens/l3ai-launch-experience-center-desktop.png",
    line: "The ecosystem connects product narrative, public content and release governance.",
  },
  {
    id: 10,
    title: "The executive deck tells the story visually",
    kicker: "Collateral upgrade",
    copy: "The upgraded deck turns the product, trust model, ecosystem and roadmap into presentation-grade investor collateral.",
    visual: "../../../deck/qa/L3AI_Public_Business_Plan_v1_montage.webp",
    line: "The executive deck becomes a visual decision aid rather than a document dump.",
  },
  {
    id: 11,
    title: "The video and website now reinforce each other",
    kicker: "Media system",
    copy: "The homepage points to the flagship video, while the video directs viewers back to the live public demo and resources.",
    visual: "../../../premium-site/screens/l3ai-premium-homepage-mobile-026.png",
    line: "The website and video now work as one launch experience.",
  },
  {
    id: 12,
    title: "L3AI is ready for controlled public review",
    kicker: "Close",
    copy: "Explore the demo, read the whitepaper, open the executive deck and verify public assets through the manifest.",
    visual: "../../../showcase/screens/l3ai-showcase-homepage.png",
    line: "L3AI is ready for controlled public review through official assets only.",
  },
];

function pad(value) {
  return String(value).padStart(2, "0");
}

function srtTime(seconds) {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = Math.floor(seconds % 60);
  const ms = Math.round((seconds - Math.floor(seconds)) * 1000);
  return `${pad(h)}:${pad(m)}:${pad(s)},${String(ms).padStart(3, "0")}`;
}

const style = `
  :root { color-scheme: dark; }
  * { box-sizing: border-box; }
  body {
    margin: 0;
    width: 1920px;
    height: 1080px;
    overflow: hidden;
    font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Arial, sans-serif;
    color: #f8fbff;
    background:
      radial-gradient(circle at 82% 18%, rgba(15,159,154,.36), transparent 31%),
      linear-gradient(135deg, #08111f 0%, #0f172a 52%, #111827 100%);
  }
  .scene {
    position: relative;
    width: 1920px;
    height: 1080px;
    display: grid;
    grid-template-columns: 735px 1fr;
    gap: 72px;
    padding: 92px 104px;
  }
  .brand { position: absolute; left: 104px; top: 48px; display: flex; align-items: center; gap: 18px; font-weight: 900; letter-spacing: .01em; }
  .mark { width: 54px; height: 54px; display: grid; place-items: center; border-radius: 14px; background: #fff; color: #101828; font-weight: 900; }
  .kicker { color: #8fdcff; text-transform: uppercase; font-size: 22px; font-weight: 900; margin: 132px 0 22px; }
  h1 { margin: 0; font-size: 76px; line-height: .98; letter-spacing: 0; max-width: 740px; }
  p { color: #d9e7f7; font-size: 31px; line-height: 1.34; margin: 32px 0 0; max-width: 730px; }
  .proof { display: flex; flex-wrap: wrap; gap: 14px; margin-top: 42px; }
  .proof span { border: 1px solid rgba(255,255,255,.22); background: rgba(255,255,255,.08); border-radius: 16px; padding: 14px 18px; color: #fff; font-weight: 800; font-size: 19px; }
  .visual { align-self: center; border: 1px solid rgba(255,255,255,.22); border-radius: 24px; overflow: hidden; box-shadow: 0 34px 86px rgba(0,0,0,.42); background: rgba(255,255,255,.08); }
  .visual img { display: block; width: 100%; height: 610px; object-fit: cover; object-position: top center; }
  .caption { padding: 22px 28px; display: flex; justify-content: space-between; gap: 18px; color: #d9e7f7; font-size: 21px; font-weight: 800; }
  .caption strong { color: #fff; }
  .footer { position: absolute; left: 104px; right: 104px; bottom: 48px; display: flex; justify-content: space-between; color: #91a4bd; font-size: 19px; }
`;

for (const scene of scenes) {
  const html = `<!doctype html>
<html>
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=1920, initial-scale=1">
<title>L3AI Premium Video Scene ${pad(scene.id)}</title>
<style>${style}</style>
</head>
<body>
  <section class="scene">
    <div class="brand"><span class="mark">L3</span><span>L3AI</span></div>
    <div>
      <div class="kicker">${scene.kicker}</div>
      <h1>${scene.title}</h1>
      <p>${scene.copy}</p>
      <div class="proof"><span>Product-led</span><span>Review-gated</span><span>Public safe</span></div>
    </div>
    <figure class="visual">
      <img src="${scene.visual}" alt="${scene.title}">
      <figcaption class="caption"><strong>Scene ${pad(scene.id)}</strong><span>${scene.line}</span></figcaption>
    </figure>
    <div class="footer"><span>Official public materials only</span><span>PREMIUM-VIDEO-027</span></div>
  </section>
</body>
</html>`;
  fs.writeFileSync(path.join(sceneDir, `scene-${pad(scene.id)}.html`), html, "utf8");
}

const duration = 15;
const concat = [];
for (const scene of scenes) {
  concat.push(`file '${path.join(frameDir, `scene-${pad(scene.id)}.png`).replace(/\\/g, "/")}'`);
  concat.push(`duration ${duration}`);
}
concat.push(`file '${path.join(frameDir, `scene-${pad(scenes.at(-1).id)}.png`).replace(/\\/g, "/")}'`);
fs.writeFileSync(path.join(outDir, "concat.txt"), `${concat.join("\n")}\n`, "utf8");

const srt = scenes
  .map((scene, index) => {
    const start = index * duration;
    const end = start + duration;
    return `${index + 1}\n${srtTime(start)} --> ${srtTime(end)}\n${scene.line}\n`;
  })
  .join("\n");
fs.writeFileSync(path.join(outDir, "L3AI_Premium_Promo_027.en.srt"), srt, "utf8");

const zhLines = [
  "L3AI 以产品化公开体验呈现 Web3 决策上下文。",
  "官网现在先展示产品证明，再进入资料下载。",
  "清晰旅程帮助不同访客选择下一步。",
  "AI Quant 定位为研究解释上下文，不承诺交易结果。",
  "钱包旅程避免暴露真实私钥、余额和私有数据。",
  "商业模型可审查，但不发布收益承诺。",
  "资源中心成为客户、媒体、合作方和运营方的发布室。",
  "清晰边界是产品体验的一部分。",
  "生态连接产品叙事、公开内容和发布治理。",
  "执行 Deck 从文档升级为可演示的视觉资料。",
  "官网与视频共同形成发布体验。",
  "L3AI 已可通过官方资料进入受控公开审查。",
];
const zhSrt = scenes
  .map((scene, index) => {
    const start = index * duration;
    const end = start + duration;
    return `${index + 1}\n${srtTime(start)} --> ${srtTime(end)}\n${zhLines[index]}\n`;
  })
  .join("\n");
fs.writeFileSync(path.join(outDir, "L3AI_Premium_Promo_027.zh-CN.srt"), zhSrt, "utf8");

fs.writeFileSync(
  path.join(outDir, "PREMIUM_VIDEO_027_STORYBOARD.json"),
  `${JSON.stringify({ task_id: "PREMIUM-VIDEO-027", duration_seconds: scenes.length * duration, scenes }, null, 2)}\n`,
  "utf8",
);

console.log(JSON.stringify({ scenes: scenes.length, duration_seconds: scenes.length * duration, outDir }, null, 2));
