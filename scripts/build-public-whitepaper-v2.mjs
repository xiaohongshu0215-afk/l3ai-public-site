import { execFileSync } from 'node:child_process'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(__dirname, '..')
const outDir = path.join(root, 'collateral', 'whitepaper')

const css = String.raw`
*{box-sizing:border-box}
html,body{margin:0;background:#020713;color:#f4fbff;font-family:Inter,Arial,"PingFang SC","Microsoft YaHei",sans-serif}
body{counter-reset:page}
@page{size:A4;margin:0}
.page{position:relative;width:210mm;height:297mm;overflow:hidden;padding:18mm 17mm 14mm;background:
radial-gradient(circle at 82% 18%,rgba(0,212,255,.20),transparent 28%),
radial-gradient(circle at 15% 85%,rgba(124,92,255,.18),transparent 30%),
linear-gradient(135deg,#020713 0%,#071326 48%,#080b1b 100%);page-break-after:always;break-after:page}
.page:before{content:"";position:absolute;inset:0;background:
linear-gradient(rgba(255,255,255,.035) 1px,transparent 1px),
linear-gradient(90deg,rgba(255,255,255,.035) 1px,transparent 1px);background-size:22px 22px;mask-image:linear-gradient(180deg,rgba(0,0,0,.75),transparent 82%);pointer-events:none}
.page:after{content:"";position:absolute;right:-70mm;top:24mm;width:150mm;height:150mm;border:1px solid rgba(0,212,255,.18);border-radius:50%;box-shadow:0 0 70px rgba(0,212,255,.15);pointer-events:none}
.chrome{position:relative;z-index:1;height:100%;display:flex;flex-direction:column}
.nav{display:flex;justify-content:space-between;align-items:center;margin-bottom:13mm}
.brand{display:flex;gap:10px;align-items:center;font-weight:900;letter-spacing:.5px}
.logo{width:34px;height:34px;border-radius:12px;background:linear-gradient(135deg,#00d4ff,#7b5cff);display:grid;place-items:center;color:#02111f;font-weight:950;box-shadow:0 0 30px rgba(0,212,255,.34)}
.doc-tag{font-size:10px;letter-spacing:2px;text-transform:uppercase;color:#9cb4c9}
.section-label{font-size:10px;letter-spacing:3px;text-transform:uppercase;color:#e4c96a;font-weight:900;margin:0 0 8mm}
h1{font-size:36px;line-height:1.02;margin:0 0 7mm;font-weight:950;letter-spacing:-1px;max-width:132mm}
h2{font-size:24px;line-height:1.15;margin:0 0 5mm;font-weight:900;color:#ffffff}
p{font-size:13px;line-height:1.78;color:#b9cadc;margin:0 0 4mm}
.lead{font-size:16px;line-height:1.65;color:#e8f8ff;max-width:150mm}
.accent{color:#00d4ff}.gold{color:#e4c96a}
.grid-two{display:grid;grid-template-columns:1.04fr .96fr;gap:8mm;align-items:stretch;min-height:176mm}
.panel{border:1px solid rgba(130,175,255,.22);background:linear-gradient(180deg,rgba(8,23,48,.92),rgba(6,11,28,.82));border-radius:18px;padding:8mm;box-shadow:0 20px 60px rgba(0,0,0,.32),inset 0 1px rgba(255,255,255,.07)}
.panel.lift{transform:translateY(6mm)}
.cards{display:grid;grid-template-columns:repeat(2,1fr);gap:4mm}
.card{border:1px solid rgba(0,212,255,.22);background:rgba(4,14,33,.82);border-radius:14px;padding:5mm;min-height:29mm}
.card strong{display:block;color:#fff;font-size:14px;margin-bottom:2mm}.card span{display:block;color:#92a8bd;font-size:11px;line-height:1.55}
.chips{display:flex;flex-wrap:wrap;gap:3mm;margin-top:7mm}
.chip{border:1px solid rgba(0,212,255,.32);background:rgba(0,212,255,.08);color:#cbf7ff;border-radius:999px;padding:2.5mm 4mm;font-size:11px;font-weight:800}
.hero-visual{position:absolute;right:12mm;bottom:34mm;width:82mm;height:82mm;border-radius:50%;background:radial-gradient(circle,#00d4ff 0 5%,#174dff 16%,#101a55 44%,rgba(4,8,26,.2) 70%);box-shadow:0 0 70px rgba(0,102,255,.55),inset -18px -20px 45px rgba(0,0,0,.35)}
.hero-visual:before,.hero-visual:after{content:"";position:absolute;inset:-8mm;border:1.5px solid rgba(0,212,255,.42);border-radius:50%;transform:rotate(-20deg) scaleX(1.55)}
.hero-visual:after{border-color:rgba(124,92,255,.55);transform:rotate(34deg) scaleX(1.35)}
.cover-title{font-size:55px;line-height:.98;max-width:120mm;margin-top:22mm}.cover-sub{max-width:118mm;font-size:18px;color:#d8f8ff}
.cover .meta-line{display:flex;gap:4mm;margin-top:auto;align-items:center;color:#9fb2c5;font-size:12px}
.flow{display:grid;gap:4mm;margin-top:7mm}
.flow-item{display:grid;grid-template-columns:20mm 1fr;gap:4mm;align-items:center;border:1px solid rgba(0,212,255,.24);background:rgba(3,12,30,.72);border-radius:14px;padding:4mm}
.num{width:14mm;height:14mm;border-radius:999px;background:linear-gradient(135deg,#00d4ff,#7b5cff);display:grid;place-items:center;color:#011020;font-weight:950}
.flow-item b{font-size:14px;color:#fff}.flow-item small{display:block;color:#91a9bd;margin-top:1mm;line-height:1.5}
.diagram{height:148mm;border:1px solid rgba(0,212,255,.2);border-radius:18px;background:radial-gradient(circle at 50% 50%,rgba(0,212,255,.16),transparent 48%),rgba(4,12,29,.8);position:relative;margin-top:7mm}
.core{position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);width:52mm;height:32mm;border-radius:16px;background:linear-gradient(135deg,#0b244f,#102d7c);display:grid;place-items:center;font-size:22px;font-weight:950;box-shadow:0 0 50px rgba(0,212,255,.22)}
.orbit{position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);width:126mm;height:76mm;border:1px solid rgba(0,212,255,.35);border-radius:50%}.orbit.two{width:150mm;height:92mm;border-color:rgba(124,92,255,.35);transform:translate(-50%,-50%) rotate(-14deg)}
.node{position:absolute;width:43mm;border:1px solid rgba(255,255,255,.16);border-radius:13px;background:rgba(3,11,26,.9);padding:4mm;color:#fff;font-weight:900}
.node small{display:block;color:#8fa6bc;font-weight:700;margin-top:1mm;line-height:1.45}
.n1{left:10mm;top:18mm}.n2{right:13mm;top:28mm}.n3{left:18mm;bottom:22mm}.n4{right:20mm;bottom:18mm}
.metric-row{display:grid;grid-template-columns:repeat(3,1fr);gap:4mm;margin-top:7mm}
.metric{padding:5mm;border:1px solid rgba(0,212,255,.22);border-radius:14px;background:rgba(4,14,33,.82)}.metric b{font-size:24px;color:#00d4ff}.metric span{display:block;color:#9fb2c5;font-size:11px;margin-top:1mm}
table{width:100%;border-collapse:collapse;margin-top:5mm;font-size:11px;color:#d9e8f4}th,td{border:1px solid rgba(130,175,255,.18);padding:3.2mm;text-align:left;vertical-align:top}th{color:#fff;background:rgba(0,212,255,.12)}td{background:rgba(4,14,33,.65)}
.roadmap{display:grid;grid-template-columns:repeat(3,1fr);gap:5mm;margin-top:6mm}.road{min-height:112mm;border:1px solid rgba(0,212,255,.22);border-radius:16px;padding:5mm;background:linear-gradient(180deg,rgba(8,23,48,.92),rgba(5,9,24,.82))}.road b{font-size:16px}.road ul{margin:4mm 0 0;padding-left:5mm;color:#aebfd0;font-size:11px;line-height:1.7}
.quote{font-size:22px;line-height:1.4;color:#fff;font-weight:900;border-left:4px solid #00d4ff;padding-left:5mm;margin:6mm 0}
.footer{margin-top:auto;display:flex;align-items:center;justify-content:space-between;color:#6f8499;font-size:10px;letter-spacing:.5px;position:relative;z-index:1}
.footer .page-no:after{counter-increment:page;content:counter(page)}
.subtle{color:#7f93a8}.legal{font-size:10px;line-height:1.6;color:#8ba0b4}
.lang-zh h1{letter-spacing:-2px}.lang-zh p{font-size:13.3px}.lang-zh .lead{font-size:16px}
@media print{body{background:#020713}.page{-webkit-print-color-adjust:exact;print-color-adjust:exact}}
`

const shared = {
  zh: {
    langClass: 'lang-zh',
    htmlLang: 'zh-CN',
    docTitle: 'L3AI 公开白皮书 v2.1',
    fileBase: 'L3AI_Public_Whitepaper_v1.zh-CN',
    brandSub: 'AI 原生市场智能网络',
    footer: 'L3AI 公开白皮书 v2.1',
    version: '2026.07 | Public Edition | Chinese',
    coverMeta: ['公开版本', '独立中文版本', 'AI+Web3 战略'],
  },
  en: {
    langClass: 'lang-en',
    htmlLang: 'en',
    docTitle: 'L3AI Public Whitepaper v2.1',
    fileBase: 'L3AI_Public_Whitepaper_v1.en',
    brandSub: 'AI-native market intelligence network',
    footer: 'L3AI Public Whitepaper v2.1',
    version: '2026.07 | Public Edition | English',
    coverMeta: ['Public edition', 'Independent English version', 'AI+Web3 strategy'],
  },
}

// Current whitepaper content is defined in upgradedZhPages/upgradedEnPages below. Legacy page arrays were removed to prevent stale public copy from being regenerated.

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
}

function renderCards(cards = []) {
  return `<div class="cards">${cards.map(([title, body]) => `<div class="card"><strong>${escapeHtml(title)}</strong><span>${escapeHtml(body)}</span></div>`).join('')}</div>`
}

function renderFlow(flow = []) {
  return `<div class="flow">${flow.map(([title, body], index) => `<div class="flow-item"><div class="num">${String(index + 1).padStart(2, '0')}</div><div><b>${escapeHtml(title)}</b><small>${escapeHtml(body)}</small></div></div>`).join('')}</div>`
}

function renderMetrics(metrics = []) {
  return `<div class="metric-row">${metrics.map(([value, label]) => `<div class="metric"><b>${escapeHtml(value)}</b><span>${escapeHtml(label)}</span></div>`).join('')}</div>`
}

function renderTable(table = []) {
  const [head, ...rows] = table
  return `<table><thead><tr>${head.map((cell) => `<th>${escapeHtml(cell)}</th>`).join('')}</tr></thead><tbody>${rows.map((row) => `<tr>${row.map((cell) => `<td>${escapeHtml(cell)}</td>`).join('')}</tr>`).join('')}</tbody></table>`
}

function renderRoadmap(roadmap = []) {
  return `<div class="roadmap">${roadmap.map(([title, items]) => `<div class="road"><b>${escapeHtml(title)}</b><ul>${items.map((item) => `<li>${escapeHtml(item)}</li>`).join('')}</ul></div>`).join('')}</div>`
}

function renderDiagram(page) {
  const nodes = page.nodes ?? []
  return `<div class="diagram"><div class="orbit"></div><div class="orbit two"></div><div class="core">L3AI</div>${nodes.map(([title, body], index) => `<div class="node n${index + 1}">${escapeHtml(title)}<small>${escapeHtml(body)}</small></div>`).join('')}</div>`
}

function renderContent(page, config) {
  if (page.type === 'cover') {
    const meta = page.meta ?? config.coverMeta ?? []
    return `<div class="hero-visual"></div><p class="section-label">${escapeHtml(page.label)}</p><h1 class="cover-title">${escapeHtml(page.title).replaceAll('\n', '<br>')}</h1><p class="cover-sub">${escapeHtml(page.lead)}</p><div class="chips">${page.chips.map((chip) => `<span class="chip">${escapeHtml(chip)}</span>`).join('')}</div><div class="meta-line">${meta.map((item) => `<span>${escapeHtml(item)}</span>`).join('')}</div>`
  }
  if (page.type === 'diagram') {
    return `<p class="section-label">${escapeHtml(page.label)}</p><h1>${escapeHtml(page.title)}</h1><p class="lead">${escapeHtml(page.lead)}</p>${renderDiagram(page)}`
  }
  const right = page.cards ? renderCards(page.cards)
    : page.flow ? renderFlow(page.flow)
      : page.metrics ? renderMetrics(page.metrics)
        : page.table ? renderTable(page.table)
          : page.roadmap ? renderRoadmap(page.roadmap)
            : `<div class="panel lift"><p class="quote">${escapeHtml(page.quote ?? '')}</p></div>`

  return `<p class="section-label">${escapeHtml(page.label)}</p><h1>${escapeHtml(page.title)}</h1><div class="grid-two"><div class="panel"><p class="lead">${escapeHtml(page.lead)}</p>${page.quote ? `<p class="quote">${escapeHtml(page.quote)}</p>` : ''}${page.chips ? `<div class="chips">${page.chips.map((chip) => `<span class="chip">${escapeHtml(chip)}</span>`).join('')}</div>` : ''}</div><div>${right}</div></div>`
}

function renderDoc(config, pages) {
  return `<!doctype html><html lang="${config.htmlLang}"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${escapeHtml(config.docTitle)}</title><style>${css}</style></head><body class="${config.langClass}">${pages.map((page, index) => `<section class="page${page.type === 'cover' ? ' cover' : ''}"><div class="chrome"><div class="nav"><div class="brand"><div class="logo">L3</div><div><div>L3AI</div><div class="doc-tag">${escapeHtml(config.brandSub)}</div></div></div><div class="doc-tag">${String(index + 1).padStart(2, '0')} / ${String(pages.length).padStart(2, '0')}</div></div>${renderContent(page, config)}<div class="footer"><span>${escapeHtml(config.footer)}</span><span>${escapeHtml(config.version)}</span><span class="page-no"></span></div></div></section>`).join('')}</body></html>`
}

function findChrome() {
  const candidates = [
    process.env.CHROME_PATH,
    'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
    'C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe',
    'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
  ].filter(Boolean)
  return candidates.find((candidate) => fs.existsSync(candidate))
}

function printPdf(chrome, htmlPath, pdfPath) {
  execFileSync(chrome, [
    '--headless=new',
    '--disable-gpu',
    '--no-pdf-header-footer',
    '--print-to-pdf-no-header',
    `--print-to-pdf=${pdfPath}`,
    pathToFileURL(htmlPath).href,
  ], { stdio: 'pipe' })
}

const upgradedZhPages = [
  { type: 'cover', label: '公开白皮书', title: 'L3AI\nAI 原生市场智能网络', lead: '当 AI Agent 开始理解行情、资金、风险和用户行为，交易产品的竞争不再只是更快的入口，而是谁能把复杂市场转化为可解释、可参与、可复盘的智能体验。L3AI 面向这一代用户，构建 AI 驱动的数字资产参与系统。', chips: ['AI Agent', '市场智能', '交易理解', '资产参与', '全球化增长'] },
  { label: '01 / 时代判断', title: '下一代交易平台，首先是一套智能理解系统。', lead: '过去十年，数字资产市场完成了从交易入口到产品矩阵的扩张；下一阶段，用户真正需要的是能把行情、产品、风险和行动路径讲清楚的 AI 操作层。L3AI 的机会，不是再造一个页面更多的平台，而是成为用户进入 AI 与 Web3 世界的第一层智能解释。', quote: '用户最终信任的不是“功能很多”，而是“每一步都看得懂”。', cards: [['投资人看趋势', 'AI 正在改变交易、资产管理和用户服务的基础方式。'], ['用户看路径', '从行情、产品、钱包到成长状态，需要一条清晰路线。'], ['社区看共识', '长期参与来自理解、信任和持续复盘，而不是一次性刺激。'], ['平台看复利', '每次解释、记录和反馈，都会沉淀为下一轮智能能力。']] },
  { label: '02 / 对标启发', title: '顶级 Web3 与 AI 项目都在讲同一件事：把复杂基础设施变成可信网络。', lead: 'Chainlink 用可信数据连接链上金融，Bittensor 把智能定义为可被市场衡量的资源，Ocean 从数据与 AI 机会切入，Render 证明算力网络可以成为开放基础设施，交易基础设施项目则强调透明、高性能和可追溯。L3AI 的位置，是把 AI 智能带入交易理解、资产参与和用户成长。', cards: [['可信数据', '数据来源、价格语境和结果追踪决定用户能否相信系统。'], ['智能市场', 'AI 不只是辅助文案，而是组织判断、解释和复盘的能力。'], ['开放算力', 'AI 时代的基础资源需要被产品化、可理解、可参与。'], ['交易基础设施', '交易场景最需要实时、清晰、可追踪和风险边界。']] },
  { label: '03 / 用户问题', title: '用户缺的不是入口，而是判断力。', lead: '行情足够多，群聊足够多，K 线足够多，产品也足够多。但多数用户仍然不知道：今天发生了什么、风险在哪里、该先看什么、为什么一个产品值得或不值得参与。AI 的价值，是把混乱压缩成清晰。', metrics: [['信息过载', '市场、新闻、KOL、群聊和图表同时涌入'], ['工具割裂', '钱包、交易、资产、社区和学习分散在不同入口'], ['风险不透明', '用户常常先参与，后理解风险边界'], ['复盘缺失', '结果发生以后，很少有人真正知道原因']] },
  { type: 'diagram', label: '04 / 操作模型', title: 'L3AI 把市场、产品和成长组织成一个 AI 操作层。', lead: 'L3AI 不是单点工具，而是一套把市场信号、AI Agent、产品参与、钱包状态、用户成长和社区协作连接起来的操作模型。用户进入后看到的不是复杂后台，而是更清楚的下一步。', nodes: [['市场信号', '行情、价格、波动、情绪'], ['AI Agent', '解释、筛选、风险提示'], ['产品体验', '交易、资管、算力、钱包'], ['成长系统', 'Pulse、Coach、Profile'], ['社区协作', '学习、反馈、长期共识']] },
  { label: '05 / Alpha Engine', title: 'Alpha Engine：让交易信号从“看不完”变成“看得懂”。', lead: 'Alpha Engine 不是向用户堆更多图表，而是围绕 Position 组织信息：为什么生成、依据什么价格语境、风险边界在哪里、结果如何复盘。它承担的是信任入口，让用户感受到 L3AI 的 AI 真的在观察市场。', cards: [['实时市场语境', '价格、波动和市场结构在同一上下文中展示。'], ['可解释 Position', '每一条信号都需要说明来源、理由、边界和状态。'], ['Outcome Knowledge', '结果不是结束，而是成为后续模型和内容优化的材料。'], ['信任入口', '先建立“AI 有能力观察市场”的感知，再承接更深层产品。']] },
  { label: '06 / AI 资管体验', title: '用户需要看到收益背后的过程，而不是只看到数字。', lead: '真正的资产体验不是一个余额，而是账户状态、订单周期、收益记录、释放安排、风险提示和下一步行动。L3AI 用 Daily Wealth Pulse 和 AI Wealth Coach 把冷冰冰的记录变成可理解的每日摘要。', flow: [['账户进入', '用户从钱包和资产状态开始理解自己的位置。'], ['产品参与', '智能收益、周期、释放和风险边界统一呈现。'], ['每日脉冲', '用一句话解释今天发生了什么和应该关注什么。'], ['AI 教练', '把收益、风险和学习变成可持续的成长体验。']] },
  { label: '07 / 算力中心', title: '算力中心：把 AI 时代的基础资源变成可理解的参与入口。', lead: 'AI 的发展离不开算力，用户参与也需要清晰的周期、额度、释放、复投与风险边界。算力中心在白皮书中的定位不是收益承诺，而是 L3AI 生态中连接 AI 能力、产品参与和长期成长的资源层。', table: [['层级', '用户看到什么', '平台沉淀什么'], ['产品周期', '额度、周期、释放和状态', '参与记录与风险边界'], ['资源叙事', 'AI 时代需要算力基础', 'AI 生态基础设施定位'], ['复投体验', '释放、领取、复投选择', '留存和长期参与路径'], ['风险说明', '不承诺固定收益', '合规和可信边界']] },
  { label: '08 / Universe', title: 'Universe：让用户每天回来，不只是为了看余额。', lead: '长期留存来自三件事：今天我理解了什么、我完成了什么、我离下一阶段更近了多少。Universe 把 Pulse、Coach、Profile 和 Journey 连接成用户的 AI 财富成长系统。', cards: [['Daily Wealth Pulse', '每天先告诉用户今天最值得关注什么。'], ['AI Wealth Coach', '用自然语言解释收益、风险、市场和下一步。'], ['Operator Profile', '把收益状态、学习、能量和成长沉淀为长期身份。'], ['Wealth Journey', '用 7 天节奏帮助新用户完成第一轮理解和习惯建立。']] },
  { label: '09 / 生态地图', title: 'L3AI 的生态不是一组功能，而是一条用户成长链。', lead: 'AI 盯盘建立信任，AI 资管和算力形成参与，钱包与资产中心提供状态，Universe 负责每日回访，Academy 与 Community 降低理解成本。每个模块都围绕同一目标：让用户更清楚地参与 AI 数字世界。', table: [['模块', '用户价值', '平台价值'], ['Alpha Engine', '看懂市场信号和风险边界', '建立 AI 交易能力信任'], ['AI 资管', '获得清晰的参与和收益记录', '形成核心产品路径'], ['算力中心', '理解 AI 资源参与方式', '扩展生态资源层'], ['Universe', '每日回访、学习和成长', '提升留存和身份感'], ['Academy / Community', '降低理解成本', '形成内容和社群增长']] },
  { label: '10 / 增长飞轮', title: '产品价值、认知成长和社区协作互相放大。', lead: 'L3AI 不依赖单次转化。用户通过 AI 解释理解产品，通过产品记录形成复盘，通过社区和学院降低学习成本，再通过成长体系形成长期参与。真正可持续的增长不是一次推广，而是用户愿意反复回来。', flow: [['AI 解释', '把市场和产品讲清楚。'], ['产品参与', '形成真实账户、订单和行为记录。'], ['复盘成长', 'Pulse、Coach 和 Profile 帮助用户理解过程。'], ['社区扩散', '用户因为理解和体验而愿意分享。']] },
  { label: '11 / 壁垒来源', title: 'L3AI 的壁垒来自“AI + 数据 + 场景 + 复盘”的持续闭环。', lead: '单个 AI 文案很容易复制，单个页面也很容易复制。真正难复制的是持续沉淀的场景数据、Position 结果、用户行为、风险边界和社区反馈。当这些进入统一的知识系统，平台会越用越清楚。', cards: [['场景数据', '交易、资产、算力、学习和社区行为共同构成上下文。'], ['结果复盘', 'Position、订单、收益和释放结果成为知识材料。'], ['用户路径', '新用户、活跃用户、团队用户有不同的解释和成长需求。'], ['信任边界', '能力和限制同时表达，避免夸大承诺。']] },
  { label: '12 / 商业模型', title: '商业模型必须让用户、平台和生态在同一条线上增长。', lead: 'L3AI 的商业模型围绕产品服务、资产参与、AI 工具、算力资源、会员成长和社区协作展开。关键不是把奖励写得复杂，而是让用户一眼看懂：我为什么参与、我从哪里获得价值、平台如何持续运营。', table: [['价值来源', '用户为什么关心', '长期意义'], ['AI 产品服务', '节省理解成本，获得更清晰路径', '建立高频使用入口'], ['智能收益体验', '看到参与记录、释放和复盘', '形成核心收入产品线'], ['算力资源参与', '参与 AI 时代基础资源', '扩展生态资产叙事'], ['会员与成长', '身份、权益和服务层级', '提升留存和社区协作'], ['合作与全球市场', '本地化入口与社群扩展', '形成多区域增长网络']] },
  { label: '13 / 可信边界', title: '越是 AI 时代，越需要清楚的风险边界。', lead: '强叙事必须配合强边界。L3AI 可以解释市场、组织产品、提示风险，但不能承诺收益、不能消除波动、不能替用户承担决策。可信白皮书必须把能力和边界同时说清楚。', table: [['可以承诺', '不能承诺'], ['提供 AI 辅助理解和信息组织', '保证交易胜率或固定收益'], ['展示订单、释放、风险提示和记录', '替用户做最终投资决定'], ['持续优化产品体验和复盘能力', '消除市场波动或全部亏损风险'], ['分阶段开放未来生态能力', '提前承诺 Token、Claim 或链上资产收益']] },
  { label: '14 / 未来版图', title: '从产品到网络：L3AI 的未来版图是 AI 数字世界。', lead: '第一阶段围绕交易理解和资产参与；第二阶段强化 AI Coach、Academy、Community 和全球内容；长期阶段再审慎扩展 Agent、DAO、Token、Claim、NFT 与 GameFi。未来能力必须以真实产品、合规边界和用户价值为前提。', cards: [['第一阶段', '交易智能、AI 资管、算力中心、钱包和 Universe 最小闭环。'], ['第二阶段', 'AI 教练、学院、社区、内容和全球化运营体系。'], ['第三阶段', 'Agent 协作、DAO 治理、权益凭证和生态应用。'], ['长期阶段', '在合规和真实需求基础上探索更广阔的 AI 数字世界。']] },
  { label: '15 / 路线图', title: '路线图不靠一次性承诺，而靠阶段性兑现。', lead: 'L3AI 的建设路径采用“产品可用 - 数据可信 - 增长可复盘 - 生态可扩展”的节奏。每一阶段都应能被用户感知，而不是只停留在内部架构。', roadmap: [['Phase 1 / 灰度上线', ['主站产品体验', 'AI 盯盘与 Position 中心', 'AI 资管与算力中心', 'Universe 日常回访闭环']], ['Phase 2 / 增长验证', ['AI Wealth Coach 深化', 'Academy 与 Community 联动', '微信私域与全球内容运营', '标准 QA 与安全审计体系']], ['Phase 3 / 网络扩展', ['多语言市场内容', '合作伙伴入口', 'Agent 能力增强', '更多产品数据进入知识系统']], ['Phase 4 / 生态开放', ['DAO / Claim / Token / NFT / GameFi 保持分阶段审查', '仅在合规、产品和用户价值均成熟时开放']]] },
  { label: '16 / 关键问题', title: '投资人和用户真正会问的，不是“有多少页面”，而是“为什么它会持续增长”。', lead: '本白皮书把 L3AI 定义为 AI 原生市场智能网络，而不是静态介绍页或单一交易工具。下面的问题，是未来路演、官网、社群和用户沟通必须持续回答的核心。', table: [['问题', '回答方向'], ['L3AI 和交易所有什么不同？', '交易所提供入口，L3AI 提供 AI 解释、产品组织、成长回访和复盘。'], ['为什么是 AI + Web3？', 'Web3 信息密度高、风险边界复杂，最需要 AI 进行整理、解释和路径化。'], ['用户为什么每天回来？', '看今日脉冲、听 AI 教练、确认收益状态、完成成长路径。'], ['投资人应该看什么？', '看品类趋势、产品矩阵、留存路径、数据闭环、风险边界和全球扩展能力。']] },
  { label: '17 / 结语', title: 'L3AI 要成为普通人进入 AI 数字市场的智能入口。', lead: '当市场继续加速，真正稀缺的不再只是信息，而是理解、判断和持续复盘的能力。L3AI 选择从交易这个高频场景切入，向资产、算力、成长、社区和未来智能体生态延伸。', quote: 'AI 不只是工具，它正在成为数字市场的新操作系统。', chips: ['理解市场', '组织产品', '提示风险', '沉淀成长', '扩展生态'] },
]

const upgradedEnPages = [
  { type: 'cover', label: 'PUBLIC WHITEPAPER', title: 'L3AI\nAI-Native Market Intelligence Network', lead: 'As AI agents begin to understand markets, capital flows, risk boundaries, and user behavior, the next generation of trading products will not compete only on faster access. They will compete on who can turn complex markets into explainable, participatory, and reviewable intelligent experiences. L3AI is building an AI-powered digital asset participation system for this new user era.', chips: ['AI Agents', 'Market Intelligence', 'Trading Clarity', 'Asset Participation', 'Global Growth'] },
  { label: '01 / CATEGORY THESIS', title: 'The next trading platform begins as an intelligence layer.', lead: 'Over the last decade, digital asset platforms expanded from trading access into broad product ecosystems. The next phase is different: users need an AI operating layer that explains markets, products, risk, and next actions. L3AI is not trying to add more screens. It is building the first intelligence layer for entering AI and Web3 markets.', quote: 'Users do not ultimately trust “more features.” They trust systems where every step becomes understandable.', cards: [['Investors see the trend', 'AI is changing the foundation of trading, asset management, and user service.'], ['Users see the path', 'Market data, products, wallets, and growth status need one clear route.'], ['Communities see conviction', 'Long-term participation comes from understanding, trust, and review.'], ['The platform compounds', 'Every explanation, record, and feedback loop improves the next experience.']] },
  { label: '02 / BENCHMARK LENS', title: 'Leading Web3 and AI projects tell one story: complex infrastructure becomes trusted networks.', lead: 'Chainlink turns trusted data into onchain finance infrastructure. Bittensor frames intelligence as a market-measured resource. Ocean approaches AI through data opportunity. Render turns compute into open infrastructure. Trading infrastructure projects emphasize performance, transparency, and traceability. L3AI brings that logic into trading understanding, asset participation, and user growth.', cards: [['Trusted data', 'Source, price context, and outcome tracking decide whether users can trust the system.'], ['Intelligence markets', 'AI should organize judgment, explanation, and review - not just generate copy.'], ['Open compute', 'AI-era resources must become understandable and participatory.'], ['Trading infrastructure', 'Trading needs real-time clarity, traceability, and explicit risk boundaries.']] },
  { label: '03 / USER PROBLEM', title: 'Users do not lack access. They lack judgment structure.', lead: 'There are enough charts, chats, alerts, products, and opinions. What many users still lack is clarity: what happened today, where risk is located, what to look at first, and why a product deserves attention. The role of AI is to compress market noise into usable clarity.', metrics: [['Information overload', 'Markets, news, KOLs, charts, and communities move at once'], ['Fragmented tools', 'Wallets, trading, assets, community, and learning remain separated'], ['Unclear risk', 'Users often participate first and understand the risk boundary later'], ['Missing review', 'After outcomes happen, few users know what actually caused them']] },
  { type: 'diagram', label: '04 / OPERATING MODEL', title: 'L3AI organizes markets, products, and growth into one AI operating layer.', lead: 'L3AI is not a single tool. It is an operating model that connects market signals, AI agents, product participation, wallet state, user growth, and community learning. The user does not see a complex backend. The user sees a clearer next step.', nodes: [['Market Signals', 'Price, volatility, sentiment, structure'], ['AI Agents', 'Explain, filter, surface risk'], ['Product Experience', 'Trading, assets, compute, wallet'], ['Growth System', 'Pulse, Coach, Profile'], ['Community Loop', 'Learning, feedback, conviction']] },
  { label: '05 / ALPHA ENGINE', title: 'Alpha Engine turns endless signals into explainable positions.', lead: 'Alpha Engine does not overwhelm users with more charts. It organizes information around positions: why a position appears, which price context supports it, where risk boundaries sit, and how outcomes are reviewed. Its job is to establish trust that L3AI can observe markets intelligently.', cards: [['Real-time context', 'Price, volatility, and market structure are presented in one context.'], ['Explainable positions', 'Every signal needs source, rationale, boundary, and status.'], ['Outcome knowledge', 'Results become material for model, content, and product improvement.'], ['Trust entry point', 'Users first feel that the AI can observe markets before using deeper products.']] },
  { label: '06 / AI ASSET EXPERIENCE', title: 'Users need to understand the process behind returns, not just see a number.', lead: 'A real asset experience is more than a balance. It includes account state, order cycles, release schedules, records, risk reminders, and next actions. L3AI turns raw records into daily summaries through Daily Wealth Pulse and AI Wealth Coach.', flow: [['Account entry', 'Users begin with wallet and asset state.'], ['Product participation', 'Cycles, releases, risk boundaries, and status are explained together.'], ['Daily pulse', 'A concise summary explains what happened today and what matters.'], ['AI coach', 'Returns, risk, and learning become a continuous growth experience.']] },
  { label: '07 / COMPUTE CENTER', title: 'Compute Center makes AI-era resources understandable and participatory.', lead: 'AI development depends on compute, and users need clear cycles, limits, releases, renewal choices, and risk boundaries. In this whitepaper, Compute Center is not a yield promise. It is the resource layer connecting AI capability, product participation, and long-term growth inside the L3AI ecosystem.', table: [['Layer', 'What users see', 'What the platform builds'], ['Product cycle', 'Amount, cycle, release, status', 'Participation records and risk boundaries'], ['Resource narrative', 'AI-era compute as a foundational resource', 'AI ecosystem infrastructure positioning'], ['Renewal experience', 'Release, claim, renewal choices', 'Retention and long-term participation path'], ['Risk language', 'No fixed-return promise', 'Compliance and trust boundary']] },
  { label: '08 / UNIVERSE', title: 'Universe gives users a reason to return beyond checking balances.', lead: 'Retention comes from three questions: what did I understand today, what did I complete, and how much closer am I to the next stage? Universe connects Pulse, Coach, Profile, and Journey into the AI Wealth Growth System.', cards: [['Daily Wealth Pulse', 'Start the day with what matters most.'], ['AI Wealth Coach', 'Explain returns, risk, market context, and next action in plain language.'], ['Operator Profile', 'Turn asset status, learning, energy, and growth into long-term identity.'], ['Wealth Journey', 'Help new users complete their first cycle of understanding and habit formation.']] },
  { label: '09 / ECOSYSTEM MAP', title: 'The L3AI ecosystem is a growth chain, not a feature list.', lead: 'Alpha Engine builds market trust. AI asset products and compute create participation. Wallet and asset center provide status. Universe brings users back daily. Academy and Community reduce the cost of understanding. Every module points to one goal: help users participate in the AI digital world with more clarity.', table: [['Module', 'User value', 'Platform value'], ['Alpha Engine', 'Understand signals and risk boundaries', 'Establish trust in AI trading capability'], ['AI Asset', 'See participation and release records clearly', 'Create the core product path'], ['Compute Center', 'Understand AI-resource participation', 'Expand the ecosystem resource layer'], ['Universe', 'Daily return, learning, and growth', 'Increase retention and identity'], ['Academy / Community', 'Reduce learning friction', 'Create content and community-led growth']] },
  { label: '10 / GROWTH FLYWHEEL', title: 'Product value, learning, and community collaboration amplify one another.', lead: 'L3AI is not built around one-time conversion. Users understand products through AI explanation, build review through product records, reduce learning cost through community and academy, and return through the growth system. Sustainable growth comes from users wanting to come back.', flow: [['AI explanation', 'Make markets and products understandable.'], ['Product participation', 'Create real account, order, and behavior records.'], ['Review and growth', 'Pulse, Coach, and Profile help users understand the process.'], ['Community spread', 'Users share because they understand and experience value.']] },
  { label: '11 / DEFENSIBILITY', title: 'L3AI compounds through AI, data, scenarios, and review loops.', lead: 'A single AI paragraph can be copied. A single page can be copied. What is harder to copy is the growing system of scenario data, position outcomes, user behavior, risk boundaries, and community feedback. When these enter a unified knowledge system, the platform becomes clearer with use.', cards: [['Scenario data', 'Trading, assets, compute, learning, and community behavior create context.'], ['Outcome review', 'Positions, orders, returns, and releases become knowledge material.'], ['User paths', 'New, active, team, and advanced users require different explanations.'], ['Trust boundaries', 'Capabilities and limits are expressed together.']] },
  { label: '12 / BUSINESS MODEL', title: 'The business model must align users, platform, and ecosystem growth.', lead: 'L3AI is built around product services, asset participation, AI tools, compute resources, membership growth, and community collaboration. The key is not to make rewards complicated. The key is to make value legible: why users participate, where value comes from, and how the platform continues operating.', table: [['Value source', 'Why users care', 'Long-term meaning'], ['AI product services', 'Lower the cost of understanding', 'Build a high-frequency entry point'], ['Smart asset experience', 'See participation, release, and review records', 'Form the core revenue product line'], ['Compute resource participation', 'Participate in AI-era infrastructure', 'Extend ecosystem asset narrative'], ['Membership and growth', 'Identity, rights, and service layers', 'Improve retention and community collaboration'], ['Partnership and global markets', 'Local entries and community distribution', 'Create multi-region growth networks']] },
  { label: '13 / TRUST BOUNDARY', title: 'The AI era requires stronger risk boundaries, not looser ones.', lead: 'A strong narrative must come with clear boundaries. L3AI can explain markets, organize products, and remind users of risk. It cannot guarantee returns, eliminate volatility, or make final decisions for users. A credible whitepaper explains both capability and limits.', table: [['Can state', 'Cannot state'], ['AI-assisted understanding and information organization', 'Guaranteed win rate or fixed returns'], ['Order, release, risk, and record visibility', 'Final investment decisions on behalf of users'], ['Continuous improvement of product and review experience', 'Removal of market volatility or all downside risk'], ['Staged future ecosystem capabilities', 'Early promises of Token, Claim, or onchain asset returns']] },
  { label: '14 / FUTURE LANDSCAPE', title: 'From product to network: L3AI expands toward an AI digital world.', lead: 'The first stage focuses on trading understanding and asset participation. The second stage strengthens AI Coach, Academy, Community, and global content. Longer-term stages can cautiously explore Agent, DAO, Token, Claim, NFT, and GameFi capabilities. Future capabilities must be unlocked through real product value, compliance boundaries, and user demand.', cards: [['Stage 1', 'Trading intelligence, AI assets, compute center, wallet, and Universe MVP loop.'], ['Stage 2', 'AI coach, academy, community, content, and global operating system.'], ['Stage 3', 'Agent collaboration, DAO governance, vouchers, and ecosystem applications.'], ['Long-term', 'A broader AI digital world only when compliance, product, and user value mature.']] },
  { label: '15 / ROADMAP', title: 'The roadmap is not a list of promises. It is a sequence of proof.', lead: 'L3AI follows a rhythm of usable product, trustworthy data, reviewable growth, and expandable ecosystem. Each stage must be felt by users, not only described in architecture documents.', roadmap: [['Phase 1 / Beta Launch', ['Core product experience', 'AI monitoring and Position Center', 'AI asset and Compute Center', 'Universe daily return loop']], ['Phase 2 / Growth Validation', ['AI Wealth Coach deepening', 'Academy and Community integration', 'Private-domain and global content operations', 'Standard QA and security audit system']], ['Phase 3 / Network Expansion', ['Multilingual market content', 'Partner entry points', 'Agent capability expansion', 'More product data entering the knowledge system']], ['Phase 4 / Ecosystem Opening', ['DAO / Claim / Token / NFT / GameFi remain staged', 'Open only when compliance, product value, and user demand mature']]] },
  { label: '16 / CORE QUESTIONS', title: 'Investors and users do not ask how many pages exist. They ask why the system keeps growing.', lead: 'This whitepaper defines L3AI as an AI-native market intelligence network, not a static introduction page or a single trading tool. The following questions must be answered consistently across the website, decks, community, and user conversations.', table: [['Question', 'Answer direction'], ['How is L3AI different from an exchange?', 'An exchange gives access. L3AI provides AI explanation, product organization, growth return, and review.'], ['Why AI + Web3?', 'Web3 is dense, fast, and risk-heavy. AI is needed to organize, explain, and route participation.'], ['Why do users return daily?', 'To read the pulse, listen to the coach, confirm asset state, and complete the growth path.'], ['What should investors evaluate?', 'Category trend, product matrix, retention path, data loop, risk boundary, and global expansion.']] },
  { label: '17 / CLOSING', title: 'L3AI aims to become the intelligent entry point into AI digital markets.', lead: 'As markets accelerate, the scarce resource is no longer information alone. It is understanding, judgment, and continuous review. L3AI starts with trading as the highest-frequency scenario and expands toward assets, compute, growth, community, and future agent ecosystems.', quote: 'AI is no longer only a tool. It is becoming the operating system of digital markets.', chips: ['Understand markets', 'Organize products', 'Surface risk', 'Record growth', 'Expand the ecosystem'] },
]

fs.mkdirSync(outDir, { recursive: true })

for (const [key, pages] of [['zh', upgradedZhPages], ['en', upgradedEnPages]]) {
  const config = shared[key]
  const htmlPath = path.join(outDir, `${config.fileBase}.html`)
  const pdfPath = path.join(outDir, `${config.fileBase}.pdf`)
  fs.writeFileSync(htmlPath, renderDoc(config, pages), 'utf8')
  const chrome = findChrome()
  if (!chrome) {
    console.warn(`Chrome or Edge not found. HTML generated but PDF skipped for ${config.fileBase}.`)
    continue
  }
  printPdf(chrome, htmlPath, pdfPath)
  console.log(JSON.stringify({ status: 'generated', html: path.relative(root, htmlPath), pdf: path.relative(root, pdfPath), pages: pages.length }, null, 2))
}
