import type { Article } from '@/types'

const now = Date.now()
const hoursAgo = (h: number) => new Date(now - h * 3600_000).toISOString()

type Seed = Omit<Article, 'id' | 'publishedAt' | 'image'> & { hours: number }

/** `body` holds plain-text paragraphs only — never embed images, HTML or markup in it. */
const seeds: Seed[] = [
  // ---- Breaking carousel ----
  {
    slug: 'google-driverless-car-hits-roadblock-8sx41',
    title: '谷歌无人驾驶汽车遭遇道路施工障碍',
    dek: '事故未造成人员伤亡，但再次将自动驾驶系统在复杂路况下的决策能力推上风口。',
    category: 'tech', regions: ['americas'], sourceId: 'bbc-world', hours: 1.9,
    readMinutes: 2, imageColor: '#0f766e', tags: ['自动驾驶', '谷歌', 'AI'], breaking: true,
    body: ['现场视频显示，车辆在临时的施工围挡前停驶并触发了远程协助请求。', '监管机构表示已要求运营方提交事件报告，并将复核其路测许可范围。'],
  },
  {
    slug: 'anthropic-valued-up-to-1-5tn-ahead-of-ipo-3fp0',
    title: 'AI 巨头 Anthropic 上市前估值或达 1.5 万亿美元',
    dek: '若最终落定，这将成为史上规模最大的科技公司IPO之一，市场关注其企业客户增长。',
    category: 'tech', regions: ['americas', 'global'], sourceId: 'bbc-business', hours: 2.4,
    readMinutes: 3, imageColor: '#7c3aed', tags: ['AI', 'IPO', '估值'], breaking: true, featured: true,
    credibility: 91, body: [
      '据多位接近交易的人士透露，该公司已与多家承销商就发行规模展开初步接触。',
      '投资者最为关注的指标是其企业级 API 收入的持续性，以及在主要模型厂商竞争加剧背景下的毛利率表现。',
      '公司方面对估值传闻未予置评。',
    ],
  },
  {
    slug: 'global-markets-rally-on-rate-cut-hopes-5hg2',
    title: '降息预期升温，全球主要股指集体上扬',
    dek: '科技与金融板块领涨，交易员正押注主要央行在下一轮会议中释放宽松信号。',
    category: 'business', regions: ['global'], sourceId: 'reuters', hours: 2.9,
    readMinutes: 2, imageColor: '#b45309', tags: ['市场', '央行', '降息'], breaking: true,
    body: ['亚洲早盘跟随隔夜美股走高，欧洲主要指数开盘后延续升势。', '经济学家提醒，通胀数据的波动仍可能改变市场对政策路径的预期。'],
  },

  // ---- Editorial originals ----
  {
    slug: 'li-yugang-stage-comeback-9qk2',
    title: '李玉刚的舞台归来：一场关于传统与流量的漫长实验',
    dek: '从选秀舞台到国家级剧院，他用二十年时间回答一个问题：传统戏曲如何活在同代的注意力经济里。',
    category: 'culture', regions: ['asia'], sourceId: 'deepdeeg', hours: 5,
    readMinutes: 8, imageColor: '#9d174d', tags: ['文化', '戏曲', '人物'], editorial: true, featured: true,
    body: [
      '舞台上，水袖与电子屏的光影交错。台下坐着的既有白发观众，也有举着手机直播的年轻人。这种奇妙的混搭，几乎成了李玉刚近年演出的标配。',
      '回望他的轨迹，从最初的模仿与争议，到后来在大型制作中担任主创，一条清晰的线索是：他始终在尝试把戏曲的程式化语言翻译成当代观众能够直觉理解的情绪。',
      '"传统不是被保存下来的，而是被不断重新使用的。"在一次排练间隙，他这样对记者说。',
      '这场归来因此不只是一次演出安排，更像是一份关于文化 how 延续的阶段性答卷。',
    ],
  },
  {
    slug: 'bybit-security-rebuild-after-exploit-7dr9',
    title: 'Bybit 重建信任：一次安全危机后的交易所样本',
    dek: '从冷钱包架构到赔付节奏，这家平台正在用可验证的流程修复用户信心。',
    category: 'business', regions: ['global', 'asia'], sourceId: 'deepdeeg', hours: 7,
    readMinutes: 7, imageColor: '#c2410c', tags: ['加密', '安全', '平台'], editorial: true,
    body: [
      '安全事件的余波往往持续数年。对于交易所而言，真正的考验不在于事件发生时如何应对，而在于此后能否把承诺变成可审计的日常流程。',
      '我们梳理了该公司公开披露的整改清单，并采访了三位独立安全研究员，尝试还原这场信任修复的真实进度。',
      '多位受访者强调，透明度的价值高于任何单次赔付声明。',
    ],
  },
  {
    slug: 'bitget-global-expansion-playbook-4nt6',
    title: 'Bitget 的全球化剧本：在监管缝隙中寻找确定性',
    dek: '合规、本地化与产品节奏，构成这家交易平台出海的三条主线。',
    category: 'business', regions: ['global', 'asia', 'europe'], sourceId: 'deepdeeg', hours: 9,
    readMinutes: 6, imageColor: '#a16207', tags: ['加密', '全球化', '监管'], editorial: true,
    body: [
      '在不同司法辖区之间搭建统一的产品体验，是一项被低估的工程。',
      '本报告从牌照布局、团队结构和用户增长三个维度，拆解其扩张路径的可复制部分与不可复制部分。',
    ],
  },
  {
    slug: 'deepseek-open-model-wave-8wz3',
    title: 'DeepSeek 与开源模型的下一波浪潮',
    dek: '当性能差距缩小，竞争的重心正从参数规模转向部署成本与生态适配。',
    category: 'tech', regions: ['asia', 'global'], sourceId: 'deepdeeg', hours: 11,
    readMinutes: 9, imageColor: '#1e40af', tags: ['AI', '开源', 'DeepSeek'], editorial: true, featured: true,
    body: [
      '开源模型的追赶速度在过去一年显著加快。对于绝大多数应用团队而言，能力是否"足够好"已经不再是首要问题，真正的约束变成了推理成本与集成复杂度。',
      '我们在多个真实业务场景中对比了主流开源模型的表现，发现其在结构化输出与长上下文任务上的进步最为明显。',
      '这并不意味着闭源模型的优势消失，而是市场的分层正在加速形成。',
    ],
  },
  {
    slug: 'alexandr-wang-meta-ai-direction-6vc1',
    title: 'Alexandr Wang 加入 Meta 后，AI 路线图如何改变',
    dek: '从数据基础设施到模型训练，一家社交巨头正在重新排列它的技术优先级。',
    category: 'tech', regions: ['americas'], sourceId: 'deepdeeg', hours: 13,
    readMinutes: 7, imageColor: '#4338ca', tags: ['Meta', 'AI', '人物'], editorial: true,
    body: ['高管的加入往往被视为战略信号灯。我们梳理了近半年的招聘与开源动作，尝试勾勒其真实方向。', '多位行业分析师认为，数据管道的重建可能是最先落地的环节。'],
  },
  {
    slug: 'haidilao-service-model-under-pressure-1jx7',
    title: '海底捞的服务模型，正在经历压力测试',
    dek: '当扩张速度与消费降级相遇，极致服务是否还能构成护城河？',
    category: 'business', regions: ['asia'], sourceId: 'deepdeeg', hours: 15,
    readMinutes: 6, imageColor: '#be123c', tags: ['消费', '餐饮', '商业模式'], editorial: true,
    body: ['我们走访了多座城市的门店，并对比了不同客流量下的服务兑现情况。', '答案并非简单的退化，而是一种被重新校准的平衡。'],
  },
  {
    slug: 'french-supermarkets-cyberattack-logistics-0bp5',
    title: '法国超市遭网络攻击：供应链的脆弱一环',
    dek: '从仓储系统到门店结算，一次攻击暴露了零售基础设施的集中风险。',
    category: 'tech', regions: ['europe'], sourceId: 'deepdeeg', hours: 17,
    readMinutes: 5, imageColor: '#0369a1', tags: ['网络安全', '零售', '欧洲'], editorial: true,
    body: ['事件导致部分门店暂停电子支付，供货节奏也受到影响。', '安全专家指出，行业普遍存在的系统同质化是放大冲击的关键因素。'],
  },

  // ---- Wide feed ----
  {
    slug: 'eu-ai-act-implementation-guidelines-3mn7',
    title: '欧盟发布 AI 法案实施细则草案',
    dek: '高风险系统的合规路径进一步明确，企业需在过渡期内完成分类评估。',
    category: 'tech', regions: ['europe'], sourceId: 'theverge', hours: 5.5,
    readMinutes: 4, imageColor: '#3730a3', tags: ['欧盟', 'AI', '监管'],
    body: ['草案对训练数据治理与模型文档提出了更具体的要求。', '多家科技公司已提交反馈意见，呼吁延长过渡期。'],
  },
  {
    slug: 'nasa-artemis-lunar-landing-window-2rt8',
    title: 'NASA 确认阿尔忒弥斯登月窗口',
    dek: '任务团队完成关键系统复核，目标是在下一窗口期执行载人绕月与着陆。',
    category: 'science', regions: ['global', 'americas'], sourceId: 'bbc-science', hours: 6.9,
    readMinutes: 3, imageColor: '#1e3a8a', tags: ['航天', 'NASA', '月球'],
    body: ['工程师重点复查了生命支持系统与热防护层的可靠性数据。', '若窗口顺利，任务将为后续长期驻留奠定基础。'],
  },
  {
    slug: 'quantum-error-correction-milestone-7hy0',
    title: '量子纠错研究取得新里程碑',
    dek: '研究团队在逻辑量子比特稳定性上取得进展，距离实用化更近一步。',
    category: 'science', regions: ['global'], sourceId: 'bbc-science', hours: 8.4,
    readMinutes: 5, imageColor: '#6d28d9', tags: ['量子计算', '科研'],
    body: ['论文发表于同行评审期刊，实验重复了多轮纠错周期。', '研究者强调距离容错阈值仍有工程挑战需要解决。'],
  },
  {
    slug: 'global-wheat-supply-forecast-cut-4bg3',
    title: '机构下调全球小麦产量预期',
    dek: '极端天气影响主产区，粮价波动风险上升。',
    category: 'business', regions: ['global'], sourceId: 'reuters', hours: 9.8,
    readMinutes: 3, imageColor: '#a16207', tags: ['农业', '大宗商品', '气候'],
    body: ['报告将多个主产国的单产预估下调，理由包括持续干旱与播种延迟。', '进口国正在评估储备策略的调整空间。'],
  },
  {
    slug: 'africa-solar-grid-expansion-5nm9',
    title: '非洲离网太阳能扩张提速',
    dek: '成本下降与融资创新推动电力可及性改善，但维护体系仍是短板。',
    category: 'science', regions: ['africa'], sourceId: 'france24', hours: 11.5,
    readMinutes: 4, imageColor: '#047857', tags: ['能源', '非洲', '可持续发展'],
    body: ['多个国家在过去一年新增了大规模离网装机，惠及偏远社区。', '业内人士指出，本地化运维能力的建设速度落后于设备部署。'],
  },
  {
    slug: 'oceania-climate-adaptation-plan-8qw1',
    title: '大洋洲岛国推出联合气候适应计划',
    dek: '计划聚焦海岸防护与淡水安全，呼吁国际社会兑现资金承诺。',
    category: 'world', regions: ['oceania', 'global'], sourceId: 'ap', hours: 12.7,
    readMinutes: 3, imageColor: '#0891b2', tags: ['气候', '大洋洲', '国际协作'],
    body: ['联合声明列出了未来五年的优先项目清单。', '多国代表强调，资金到位速度直接决定计划的实施效果。'],
  },
  {
    slug: 'european-film-festival-awards-0cv6',
    title: '欧洲电影节公布主竞赛获奖名单',
    dek: '来自七个国家的作品分享主要奖项，纪录片单元备受关注。',
    category: 'culture', regions: ['europe'], sourceId: 'bbc-culture', hours: 14.2,
    readMinutes: 3, imageColor: '#be185d', tags: ['电影', '欧洲', '艺术'],
    body: ['评委会主席表示，今年入围作品在叙事形式上的实验性显著增强。', '多部获奖影片已确定后续发行计划。'],
  },
  {
    slug: 'global-tourism-recovery-uneven-3xd5',
    title: '全球旅游复苏并不均衡',
    dek: '部分区域已恢复至疫情前水平，另一些目的地仍面临运力与信心不足。',
    category: 'business', regions: ['global'], sourceId: 'bbc-business', hours: 16.1,
    readMinutes: 4, imageColor: '#0d9488', tags: ['旅游', '经济', '全球'],
    body: ['数据显示，短途旅行恢复速度快于长途跨境旅行。', '汇率波动与签证政策被列为主要影响因素。'],
  },
  {
    slug: 'premier-league-title-race-tightens-9lg2',
    title: '英超争冠形势再度收紧',
    dek: '积分榜前列分差缩小至两分，剩余赛程将决定最终走向。',
    category: 'sports', regions: ['europe'], sourceId: 'espn', hours: 18.3,
    readMinutes: 2, imageColor: '#dc2626', tags: ['足球', '英超'],
    body: ['两支争冠球队将在下周直接对话，这场比赛被广泛视为赛季分水岭。', '伤病名单的变化可能影响双方的排兵布阵。'],
  },
  {
    slug: 'asian-games-record-break-7kp4',
    title: '亚运会赛场诞生多项新纪录',
    dek: '游泳与田径项目成为纪录高产田，东道主观众创造热烈氛围。',
    category: 'sports', regions: ['asia'], sourceId: 'ap', hours: 20.6,
    readMinutes: 3, imageColor: '#0284c7', tags: ['亚运会', '田径', '游泳'],
    body: ['多项纪录在决赛中被刷新，裁判团队确认成绩有效。', '赛事组织方表示观众上座率创下同类赛事新高。'],
  },
  {
    slug: 'museum-digital-archives-open-access-2zr0',
    title: '多家博物馆开放数字馆藏',
    dek: '高清影像与元数据向公众免费开放，推动文化资源的再利用。',
    category: 'culture', regions: ['europe', 'global'], sourceId: 'bbc-culture', hours: 22.4,
    readMinutes: 4, imageColor: '#7e22ce', tags: ['博物馆', '数字档案', '开放'],
    body: ['首批上线的藏品涵盖绘画、手稿与考古器物。', '研究者期待开放接口能够催生新的跨学科项目。'],
  },
  {
    slug: 'middle-east-water-scarcity-innovation-6tn3',
    title: '中东地区加速水资源技术创新',
    dek: '海水淡化与循环用水项目获得新一轮投资，技术成本持续下降。',
    category: 'science', regions: ['middle-east'], sourceId: 'france24', hours: 24.8,
    readMinutes: 4, imageColor: '#0369a1', tags: ['水资源', '中东', '技术'],
    body: ['多个城市启动了大规模管网升级项目，以减少输水损耗。', '专家指出，能源成本仍是淡化技术普及的关键变量。'],
  },
  {
    slug: 'latin-america-debt-restructuring-1aq8',
    title: '拉美国家推进债务重组谈判',
    dek: '多边机构参与协调，债权方与借款方在利率安排上仍存分歧。',
    category: 'business', regions: ['americas'], sourceId: 'reuters', hours: 26.5,
    readMinutes: 4, imageColor: '#b45309', tags: ['债务', '拉美', '金融'],
    body: ['谈判已进入技术性阶段，双方正就担保条款交换方案。', '市场参与者密切关注主权信用评级的后续调整。'],
  },
  {
    slug: 'africa-tech-hubs-funding-growth-4jk7',
    title: '非洲科技中心融资活跃度上升',
    dek: '金融科技与农业科技公司获得更多早期资金，本地资本开始发挥作用。',
    category: 'tech', regions: ['africa'], sourceId: 'bbc-business', hours: 28.9,
    readMinutes: 3, imageColor: '#059669', tags: ['创业', '非洲', '金融科技'],
    body: ['数据显示，本季度早期轮次数量同比明显增长。', '投资人普遍看好本地支付与供应链digitization方向。'],
  },
  {
    slug: 'space-telescope-new-galaxy-survey-5we6',
    title: '太空望远镜完成新一轮星系巡天',
    dek: '海量数据将帮助天文学家追溯早期宇宙的结构形成。',
    category: 'science', regions: ['global'], sourceId: 'bbc-science', hours: 34.7,
    readMinutes: 4, imageColor: '#312e81', tags: ['天文', '宇宙', '科研'],
    body: ['巡天覆盖了约百分之一的天空区域，识别出大量此前未被记录的星系。', '研究团队计划在未来数月发布首批公开数据集。'],
  },
  {
    slug: 'global-supply-chain-rerouting-0gh4',
    title: '全球供应链重组进入新阶段',
    dek: '制造企业在成本与韧性之间重新权衡，区域化布局趋势更加明显。',
    category: 'business', regions: ['global', 'asia', 'europe'], sourceId: 'reuters', hours: 38.1,
    readMinutes: 5, imageColor: '#92400e', tags: ['供应链', '制造', '全球'],
    body: ['多项企业调查显示，近岸外包与多源采购的比例持续上升。', '物流成本的波动仍是决策中的主要不确定因素。'],
  },
  {
    slug: 'anthropic-ipo-product-competition-8xd4',
    title: 'Anthropic 上市叙事：产品增长与竞争压力',
    dek: '投资者关注企业客户续约率，以及主要模型厂商竞争对定价的影响。',
    category: 'tech', regions: ['americas'], sourceId: 'theverge', hours: 3.9,
    readMinutes: 4, imageColor: '#6d28d9', tags: ['AI', 'IPO', '竞争'], credibility: 82,
    body: ['多位分析师指出，企业客户的续约数据是估值的关键支撑。', '模型能力的快速迭代也给长期定价带来不确定性。'],
  },
  {
    slug: 'ai-ipo-wave-market-pricing-3cy7',
    title: 'AI 公司上市潮：资本市场如何定价',
    dek: '从盈利预期到叙事溢价，不同估值方法正在被市场反复检验。',
    category: 'business', regions: ['global'], sourceId: 'reuters', hours: 6.3,
    readMinutes: 5, imageColor: '#1e40af', tags: ['AI', 'IPO', '市场'], credibility: 89,
    body: ['部分基金经理倾向于用传统现金流折现，另一些则更看重用户增长曲线。', '估值分歧本身也成为市场波动的来源之一。'],
  },
  {
    slug: 'eu-ai-act-compliance-costs-7jw2',
    title: '欧盟 AI 法案细则：企业合规成本几何',
    dek: '分类评估与文档要求将带来新增支出，中小企业尤其关注过渡期安排。',
    category: 'business', regions: ['europe'], sourceId: 'reuters', hours: 4.7,
    readMinutes: 4, imageColor: '#4338ca', tags: ['欧盟', 'AI', '合规'], credibility: 88,
    body: ['咨询机构估算，高风险系统的合规准备需要专门团队与流程。', '中小企业呼吁提供更长的过渡期与简化的申报路径。'],
  },
  {
    slug: 'ai-regulation-tech-stocks-impact-6mn4',
    title: 'AI 监管收紧，对科技板块意味着什么',
    dek: '投资者重新评估合规成本与产品节奏之间的关系。',
    category: 'business', regions: ['europe', 'global'], sourceId: 'bbc-business', hours: 7.4,
    readMinutes: 4, imageColor: '#312e81', tags: ['AI', '监管', '市场'], credibility: 84,
    body: ['部分分析师认为合规成本将被头部企业消化，从而巩固其优势。', '也有观点担心监管不确定性会延后产品发布节奏。'],
  },
]

export const articles: Article[] = seeds.map((s, i) => {
  const { hours, ...rest } = s
  return {
    ...rest,
    id: `a${String(i + 1).padStart(3, '0')}`,
    publishedAt: hoursAgo(hours),
    image: `https://picsum.photos/seed/${s.slug.slice(0, 18)}/960/540`,
  }
})

export const articleById = new Map(articles.map((a) => [a.id, a]))
export const articleBySlug = new Map(articles.map((a) => [a.slug, a]))
