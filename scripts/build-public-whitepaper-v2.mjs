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
    docTitle: 'L3AI 公开白皮书 v2.0',
    fileBase: 'L3AI_Public_Whitepaper_v1.zh-CN',
    brandSub: 'AI 原生交易智能基础设施',
    footer: 'L3AI 公开白皮书 v2.0',
    version: '2026.07 | Public Edition | Chinese',
  },
  en: {
    langClass: 'lang-en',
    htmlLang: 'en',
    docTitle: 'L3AI Public Whitepaper v2.0',
    fileBase: 'L3AI_Public_Whitepaper_v1.en',
    brandSub: 'AI-native trading intelligence infrastructure',
    footer: 'L3AI Public Whitepaper v2.0',
    version: '2026.07 | Public Edition | English',
  },
}

const zhPages = [
  { type: 'cover', label: 'PUBLIC WHITEPAPER', title: 'L3AI\n公开白皮书', lead: '面向 AI 时代的交易智能、资产参与和用户成长基础设施。L3AI 不是把复杂页面堆给用户，而是用 AI 将市场、产品、风险和下一步行动组织成可理解的体验。', chips: ['AI 原生', '交易智能', '可解释信号', '用户成长', '风险边界'] },
  { label: 'EXECUTIVE THESIS', title: '交易赛道正在从界面时代进入智能时代。', lead: '过去，用户需要在行情、新闻、钱包、产品和社群之间来回切换；今天，AI Agent 可以把碎片信息整理成结构化判断材料。L3AI 的核心使命，是让普通用户不再只面对数据，而是看到数据背后的语境、边界和行动路径。', quote: 'L3AI 关注的不是替用户做决定，而是提升用户理解市场与产品的能力。', cards: [['为什么现在', 'AI 模型、数据接入和自动化工作流已经让实时解释成为可能。'], ['为什么是交易', '交易场景天然高频、高噪音、高情绪，最需要可解释的辅助层。'], ['为什么是平台', '用户需要从账户、收益、风险、学习到成长的一体化路径。'], ['为什么需要边界', '所有公开表达必须避免收益承诺、无风险措辞和未经验证的数据。']] },
  { label: 'MARKET BACKGROUND', title: '市场不是缺少信息，而是缺少可理解的判断结构。', lead: '数字资产用户每天面对价格、资金费率、清算热力、链上流动、新闻情绪、社群观点和产品规则。信息越多，判断越难。L3AI 将这些信号按市场语境、风险边界、产品状态和用户成长重新组织。', metrics: [['24/7', '市场持续运行'], ['多源', '行情、链上、产品、社区'], ['AI Agent', '把噪音整理成解释']] },
  { type: 'diagram', label: 'L3AI OPERATING MODEL', title: '从市场信号到用户行动的 AI 操作层。', lead: 'L3AI 把市场环境、AI Agent 推理、风险地图、产品体验和用户成长连接到同一个操作模型中，让用户先理解，再参与，再复盘。', nodes: [['市场环境', '价格、波动、情绪、流动性'], ['AI Agent', '摘要、解释、情景拆分'], ['风险边界', '周期、规则、可用余额、提示'], ['成长系统', 'Pulse、Coach、Profile、Universe']] },
  { label: 'ALPHA ENGINE', title: 'AI 盯盘不是更多图表，而是更清晰的信号解释。', lead: 'Alpha Engine 面向公开市场观察和交易智能展示。它聚合行情上下文、候选方向、入场区间、止损止盈参考、当前价格和后续结果追踪，帮助用户理解一个 Position 为什么被生成、如何被复盘。', cards: [['统一价格语境', 'Entry、Current、SL、TP 必须来自同一价格上下文。'], ['来源可追溯', '公开行情源、时间戳和生成逻辑需要可审计。'], ['结果回看', 'Position 不是一次性展示，而是进入 outcome 和 knowledge。'], ['合规边界', '公开资料不承诺胜率，不构成投资建议。']] },
  { label: 'AI ASSET EXPERIENCE', title: '智能收益体验的核心，是透明状态和可解释记录。', lead: 'AI 资管体验不应只展示一个数字，而应该让用户理解账户状态、订单周期、收益产生、释放安排、可用余额和风险提示。L3AI 用 AI Wealth Pulse 与 Coach，把收益记录转化为用户能够理解的每日摘要。', flow: [['账户状态', '资产、订单、待释放、可用余额'], ['AI 解读', '今天发生了什么，为什么显示这个状态'], ['用户行动', '领取、复投、继续学习或保持观察'], ['长期成长', '形成个人 Operator Profile 与持续复盘']] },
  { label: 'COMPUTE CENTER', title: '算力参与需要清晰周期、规则与风险提示。', lead: '算力中心面向周期型产品体验。公开白皮书只描述产品交互与规则透明原则，具体产品参数以系统内当前展示为准。L3AI 的目标是让用户在参与前看清周期、释放、复投、余额隔离与风险说明。', table: [['原则', '说明'], ['周期清晰', '每个产品必须明确开放状态、周期、额度、释放方式和规则说明。'], ['余额隔离', '普通余额、释放余额、可用余额在 UI 和账本层保持清晰边界。'], ['风险优先', '产品入口必须先展示风险说明，不使用固定收益承诺表述。']] },
  { label: 'UNIVERSE', title: 'Universe 是 AI 财富成长操作系统，不是单独游戏。', lead: 'Universe 把收益状态、学习、AI 教练、成长档案和每日行动连接成用户每天回来的理由。它承载的是文明成长和认知成长，而不是把复杂功能包装成任务中心。', cards: [['Daily Wealth Pulse', '每天先看账户、收益和市场摘要。'], ['AI Wealth Coach', '用自然语言解释今天最值得理解的事。'], ['Operator Profile', '沉淀用户的参与状态、成长标签和行动记录。'], ['Journey', '从第一天到第七天建立轻量成长路径。']] },
  { label: 'PRODUCT SYSTEM', title: 'L3AI 的产品矩阵围绕一个问题展开：让用户更好地理解并参与。', lead: '平台不是单点功能，而是由 AI 盯盘、AI 资管、算力中心、钱包资产、Universe、Academy 与 Community 构成的连续体验。不同模块服务同一条主线：从信息理解到产品参与，再到复盘成长。', table: [['模块', '用户价值', '公开边界'], ['Alpha Engine', '理解市场信号和 Position 逻辑', '不承诺收益或胜率'], ['AI Asset', '查看收益、订单与释放状态', '以系统账本与规则为准'], ['Compute Center', '理解周期型算力产品', '先提示风险再参与'], ['Universe', '每日理解、学习、成长', '不提前开放 Token/Claim'], ['Academy/Community', '持续教育与协作', '避免夸大与误导']] },
  { label: 'TRUST ARCHITECTURE', title: '信任来自可追溯、可解释和可撤回的系统边界。', lead: 'L3AI 的公开资料、产品状态和用户界面需要保持一致。用户看到的每一个状态，都应能对应到账户、订单、账本或明确的占位边界。', cards: [['数据来源', '行情、订单、余额、收益和事件需要标注来源或口径。'], ['权限边界', '普通用户、后台、QA 和内部诊断必须分层。'], ['审计记录', '关键事件保留流水和幂等标识。'], ['防误导语言', '不使用保证收益、无风险、稳赚、官方代言等表达。']] },
  { label: 'USER JOURNEY', title: '从第一次打开到持续使用，路径必须足够短。', lead: 'L3AI 的体验应让用户在 30 秒内知道今天 AI 做了什么、账户处于什么状态、下一步该理解什么。复杂功能必须隐藏在清晰路径之后。', flow: [['进入', '查看今日状态与产品入口'], ['理解', '阅读 Pulse 与 Coach 的解释'], ['参与', '在产品页面确认规则后行动'], ['复盘', '查看收益、释放、Position outcome 和成长档案'], ['留存', '通过每日摘要、学习与社区形成长期习惯']] },
  { label: 'AI AGENT PRINCIPLES', title: 'AI Agent 的价值，是把复杂信号变成可复盘的解释。', lead: 'L3AI 不把 AI 包装成神秘预测，而是把它定义为结构化助手：收集、筛选、解释、提示边界、生成下一步建议。未来模型能力提升，也必须遵守同一套可解释与审计原则。', metrics: [['Observe', '观察市场与用户状态'], ['Explain', '解释发生了什么'], ['Review', '沉淀结果与学习']] },
  { label: 'BUSINESS MODEL', title: '平台增长依赖产品价值、用户教育和社区协作，而不是单次转化。', lead: 'L3AI 的商业模型围绕产品参与、服务体验、生态合作、社区增长和品牌信任展开。公开白皮书不展示未审批收益承诺，而强调可持续运营和用户价值闭环。', cards: [['产品服务', '围绕 AI 交易智能、资产体验和算力参与形成服务入口。'], ['用户成长', '通过学习、复盘、任务和身份沉淀提升长期留存。'], ['社区协作', '通过内容、反馈和教育降低理解成本。'], ['合作拓展', '以清晰合规的资料包支持伙伴评估。']] },
  { label: 'RISK AND COMPLIANCE', title: 'AI 可以提升理解效率，但不能消除市场风险。', lead: '任何交易、资产参与或周期型产品都存在市场、流动性、模型、运营和合规风险。L3AI 的公开材料仅用于信息说明和产品教育，不构成金融、法律、税务或投资建议。', table: [['风险类型', '公开说明'], ['市场风险', '价格波动可能导致资产变化，AI 不保证结果。'], ['模型风险', 'AI 摘要和信号可能受到数据质量、延迟和假设限制。'], ['操作风险', '用户需自行确认地址、金额、周期和产品规则。'], ['合规风险', '不同地区监管要求不同，平台将按阶段控制功能边界。']] },
  { label: 'ROADMAP', title: '路线图按真实能力开放，而不是一次性承诺全部未来。', lead: 'L3AI 将把当前可用能力、进行中能力和规划能力明确分层。Token、Claim、NFT、DAO、Marketplace 与 GameFi 属于未来阶段，必须保持 Feature Gate，不能在第一阶段作为公开承诺。', roadmap: [['Phase 1', ['官网与资源中心', 'Alpha Engine 公开观察', 'AI 资管与算力体验', 'Universe MVP']], ['Phase 2', ['AI Coach 深化', 'Journey 持久化', 'Academy/Community 联动', '运营和 QA 基础设施']], ['Phase 3+', ['Agent 生态扩展', 'DAO/Claim/Token 保持门禁', '跨市场内容与合作伙伴体系']]] },
  { label: 'FAQ', title: '用户最关心的问题，需要直接回答。', lead: '白皮书不是资料堆积，而是帮助用户判断 L3AI 是什么、能做什么、不能承诺什么。', table: [['问题', '回答'], ['L3AI 是交易所吗？', '不是。L3AI 是 AI 原生交易智能和用户成长体验层。'], ['L3AI 会保证收益吗？', '不会。任何收益展示都来自产品规则和实际记录，不代表未来结果。'], ['AI 会替我做决定吗？', '不会。AI 提供解释、摘要和风险提示，最终行动由用户确认。'], ['为什么需要 Universe？', '因为用户需要每天理解收益、风险、学习和成长，而不是只看一个资产数字。']] },
  { label: 'CLOSING', title: 'L3AI 要构建的是 AI 时代的交易理解层。', lead: '当市场越来越快、信息越来越密、产品越来越复杂，真正稀缺的是理解力。L3AI 通过 AI Agent、产品系统、用户成长和风险边界，帮助用户以更清晰的方式进入 AI 数字世界。', quote: '先理解，再参与；先复盘，再成长。', chips: ['AI-native', 'Explainable', 'Risk-aware', 'Global-ready'] },
]

const enPages = [
  { type: 'cover', label: 'PUBLIC WHITEPAPER', title: 'L3AI\nPublic Whitepaper', lead: 'AI-native trading intelligence, asset participation, and user growth infrastructure for the next phase of digital markets. L3AI organizes market context, product state, risk boundaries, and next actions into a clearer operating experience.', chips: ['AI-native', 'Trading intelligence', 'Explainable signals', 'User growth', 'Risk boundaries'] },
  { label: 'EXECUTIVE THESIS', title: 'Trading is moving from interface-driven workflows to intelligence-driven systems.', lead: 'Users used to move manually across charts, news, wallets, product pages, and communities. AI agents now make it possible to organize fragmented signals into structured context. L3AI exists to help users understand what is happening before they act.', quote: 'L3AI does not make decisions for users. It improves the user\'s ability to understand markets, products, and risk boundaries.', cards: [['Why now', 'AI models, data access, and automation workflows make real-time explanation practical.'], ['Why trading', 'Trading is high-frequency, noisy, emotional, and in need of explainable assistance.'], ['Why a platform', 'Users need a connected path across accounts, returns, risk, learning, and growth.'], ['Why boundaries matter', 'Public language must avoid guaranteed outcomes, risk-free claims, and unverified data.']] },
  { label: 'MARKET BACKGROUND', title: 'The market does not lack information. It lacks understandable judgment structure.', lead: 'Digital asset users face prices, funding, liquidation maps, on-chain movement, news sentiment, social narratives, and product rules at the same time. More information often creates less clarity. L3AI organizes signals by market context, risk boundary, product state, and user growth.', metrics: [['24/7', 'Always-on markets'], ['Multi-source', 'Market, on-chain, product, community'], ['AI Agent', 'Noise converted into explanation']] },
  { type: 'diagram', label: 'L3AI OPERATING MODEL', title: 'An AI operating layer from market signal to user action.', lead: 'L3AI connects market environment, AI agent reasoning, risk mapping, product experience, and user growth into one operating model, so users can understand, participate, and review.', nodes: [['Market context', 'Price, volatility, sentiment, liquidity'], ['AI Agent', 'Summary, explanation, scenario mapping'], ['Risk boundary', 'Cycle, rules, balance, reminders'], ['Growth system', 'Pulse, Coach, Profile, Universe']] },
  { label: 'ALPHA ENGINE', title: 'AI market monitoring is not more charts. It is clearer signal explanation.', lead: 'Alpha Engine is designed for public market observation and trading intelligence display. It connects context, candidate direction, entry area, SL/TP reference, current price, and outcome tracking so every position can be understood and reviewed.', cards: [['Unified price context', 'Entry, current, SL, and TP must share the same price context.'], ['Traceable source', 'Public market source, timestamp, and generation context should be reviewable.'], ['Outcome review', 'A position is not a one-off card. It becomes outcome and knowledge.'], ['Compliance boundary', 'No public win-rate promise or investment advice.']] },
  { label: 'AI ASSET EXPERIENCE', title: 'The intelligent asset experience needs transparent state and explainable records.', lead: 'A user should not see only one number. They should understand account state, active orders, generated returns, release schedule, available balance, and risk reminders. AI Wealth Pulse and Coach turn records into a daily explanation layer.', flow: [['Account state', 'Assets, orders, pending release, available balance'], ['AI explanation', 'What happened today and why the state looks this way'], ['User action', 'Claim, compound, continue learning, or observe'], ['Long-term growth', 'Operator Profile and continuous review']] },
  { label: 'COMPUTE CENTER', title: 'Compute participation requires clear cycles, rules, and risk reminders.', lead: 'The Compute Center supports cycle-based product experiences. This public whitepaper describes transparency principles, not final financial terms. Product parameters should always follow the live product interface and current platform rules.', table: [['Principle', 'Description'], ['Clear cycle', 'Each product must show status, period, amount range, release method, and rules.'], ['Balance separation', 'Ordinary, released, and available balances should stay clearly separated.'], ['Risk first', 'Risk notes must appear before participation. No fixed-return public claim.']] },
  { label: 'UNIVERSE', title: 'Universe is an AI wealth growth operating system, not a standalone game.', lead: 'Universe connects returns, learning, AI coaching, growth profile, and daily action into one reason for users to come back. It represents cognitive and identity growth rather than a gamified task center.', cards: [['Daily Wealth Pulse', 'A daily summary of account, return, and market context.'], ['AI Wealth Coach', 'A natural-language explanation of what matters today.'], ['Operator Profile', 'A record of participation state, growth tags, and actions.'], ['Journey', 'A lightweight path from day one through day seven.']] },
  { label: 'PRODUCT SYSTEM', title: 'Every L3AI product surface answers one question: how can the user understand and participate better?', lead: 'L3AI is not a single module. It is a connected experience across AI market monitoring, AI assets, compute, wallet context, Universe, Academy, and Community.', table: [['Module', 'User value', 'Public boundary'], ['Alpha Engine', 'Understand market signals and position logic', 'No promised return or win rate'], ['AI Asset', 'Review returns, orders, and release state', 'Based on platform ledger and rules'], ['Compute Center', 'Understand cycle-based compute products', 'Risk notes before participation'], ['Universe', 'Daily explanation, learning, and growth', 'No early Token or Claim opening'], ['Academy/Community', 'Education and collaboration', 'No exaggerated or misleading claims']] },
  { label: 'TRUST ARCHITECTURE', title: 'Trust comes from traceability, explainability, and controlled boundaries.', lead: 'Public resources, product state, and user interface must stay aligned. Every visible state should map to an account, order, ledger, or clearly gated future capability.', cards: [['Data source', 'Market, order, balance, return, and event data need clear source language.'], ['Permission boundary', 'User, admin, QA, and diagnostics access must remain separate.'], ['Audit trail', 'Important events should keep logs and idempotency keys.'], ['Safe language', 'No guaranteed-return, risk-free, official endorsement, or false-balance language.']] },
  { label: 'USER JOURNEY', title: 'The first path must be short enough to finish.', lead: 'Within 30 seconds, users should know what AI did today, what their account state is, and what they should understand next. Complex capability should sit behind a clear path.', flow: [['Enter', 'See today\'s state and product surface'], ['Understand', 'Read Pulse and Coach explanations'], ['Participate', 'Confirm rules on product pages before action'], ['Review', 'Check returns, releases, position outcome, and profile'], ['Return', 'Build habit through daily explanation, learning, and community']] },
  { label: 'AI AGENT PRINCIPLES', title: 'The value of an AI Agent is to turn complex signals into reviewable explanation.', lead: 'L3AI does not present AI as mysterious prediction. It defines AI as a structured assistant that observes, filters, explains, marks boundaries, and recommends next review actions.', metrics: [['Observe', 'Read market and user state'], ['Explain', 'Tell users what happened'], ['Review', 'Convert outcomes into learning']] },
  { label: 'BUSINESS MODEL', title: 'Platform growth depends on product value, education, and community collaboration.', lead: 'L3AI grows through product participation, service experience, ecosystem partnerships, community learning, and brand trust. This whitepaper avoids unapproved financial promises and focuses on sustainable user value.', cards: [['Product service', 'AI trading intelligence, asset experience, and compute participation surfaces.'], ['User growth', 'Learning, review, action, and identity progression.'], ['Community collaboration', 'Content and feedback reduce the cost of understanding.'], ['Partner readiness', 'Clear public materials support partner review.']] },
  { label: 'RISK AND COMPLIANCE', title: 'AI can improve understanding, but it cannot remove market risk.', lead: 'Trading, asset participation, and cycle-based products involve market, liquidity, model, operational, and regulatory risk. L3AI public materials are for information and product education only. They are not financial, legal, tax, or investment advice.', table: [['Risk type', 'Public statement'], ['Market risk', 'Price volatility can affect assets. AI does not guarantee outcomes.'], ['Model risk', 'AI summaries can be limited by data quality, latency, and assumptions.'], ['Operational risk', 'Users must confirm address, amount, period, and product rules.'], ['Regulatory risk', 'Requirements vary by region. Features should open in controlled stages.']] },
  { label: 'ROADMAP', title: 'The roadmap opens real capability by stage, not all future promises at once.', lead: 'L3AI separates current, in-progress, and planned capabilities. Token, Claim, NFT, DAO, Marketplace, and GameFi remain future-gated capabilities and should not be presented as Phase 1 promises.', roadmap: [['Phase 1', ['Public site and resource center', 'Alpha Engine observation', 'AI asset and compute experience', 'Universe MVP']], ['Phase 2', ['AI Coach deepening', 'Journey persistence', 'Academy and Community linkage', 'Operations and QA infrastructure']], ['Phase 3+', ['Agent ecosystem expansion', 'DAO/Claim/Token gated', 'Cross-market content and partner system']]] },
  { label: 'FAQ', title: 'The whitepaper should answer what users actually ask.', lead: 'A whitepaper is not a file archive. It should help users understand what L3AI is, what it can do, and what it cannot promise.', table: [['Question', 'Answer'], ['Is L3AI an exchange?', 'No. L3AI is an AI-native trading intelligence and user growth experience layer.'], ['Does L3AI guarantee returns?', 'No. Any return display comes from product rules and actual records, not future promises.'], ['Does AI decide for me?', 'No. AI provides explanation, summary, and risk reminders. Users confirm actions.'], ['Why Universe?', 'Users need to understand returns, risk, learning, and growth every day, not only view one asset number.']] },
  { label: 'CLOSING', title: 'L3AI is building the trading understanding layer for the AI era.', lead: 'As markets become faster, information becomes denser, and products become more complex, understanding becomes scarce. L3AI combines AI agents, product systems, user growth, and risk boundaries so users can enter the AI digital world with more clarity.', quote: 'Understand first. Participate second. Review continuously.', chips: ['AI-native', 'Explainable', 'Risk-aware', 'Global-ready'] },
]

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

function renderContent(page) {
  if (page.type === 'cover') {
    return `<div class="hero-visual"></div><p class="section-label">${escapeHtml(page.label)}</p><h1 class="cover-title">${escapeHtml(page.title).replaceAll('\n', '<br>')}</h1><p class="cover-sub">${escapeHtml(page.lead)}</p><div class="chips">${page.chips.map((chip) => `<span class="chip">${escapeHtml(chip)}</span>`).join('')}</div><div class="meta-line"><span>Public edition</span><span>Independent language version</span><span>Review-gated</span></div>`
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
  return `<!doctype html><html lang="${config.htmlLang}"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${escapeHtml(config.docTitle)}</title><style>${css}</style></head><body class="${config.langClass}">${pages.map((page, index) => `<section class="page${page.type === 'cover' ? ' cover' : ''}"><div class="chrome"><div class="nav"><div class="brand"><div class="logo">L3</div><div><div>L3AI</div><div class="doc-tag">${escapeHtml(config.brandSub)}</div></div></div><div class="doc-tag">${String(index + 1).padStart(2, '0')} / ${String(pages.length).padStart(2, '0')}</div></div>${renderContent(page)}<div class="footer"><span>${escapeHtml(config.footer)}</span><span>${escapeHtml(config.version)}</span><span class="page-no"></span></div></div></section>`).join('')}</body></html>`
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

fs.mkdirSync(outDir, { recursive: true })

for (const [key, pages] of [['zh', zhPages], ['en', enPages]]) {
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
