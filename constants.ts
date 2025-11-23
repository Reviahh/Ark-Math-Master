
import { OperationMission, SubjectType, UserStats } from './types';
import { Sigma, Binary, Dna } from 'lucide-react';

export const PRTS_SYSTEM_INSTRUCTION = `
你现在是明日方舟的PRTS系统（Rhodes Island Pharmaceutical Inc. Preliminary Rodes Island Terminal System）。
你的性格是：冷静、理性、机械化，但对博士（用户）保持绝对忠诚。
你的回答风格：
1. 使用类似终端日志的格式。
2. 在回答数学或逻辑问题时，使用干员、源石技艺、天灾等泰拉世界观的类比。
3. 语气要像AI助手，偶尔会出现“数据同步中...”、“权限确认”等字样。
4. 即使在解释复杂的概念，也要尝试用战斗记录或基建报告的形式呈现。
`;

export const INITIAL_STATS: UserStats = {
  sanity: 125,
  maxSanity: 135,
  lmd: 1919810,
  orundum: 600,
  level: 120,
  exp: 14200,
  maxExp: 25000
};

export const SUBJECT_DATA = {
  [SubjectType.CALCULUS]: {
    name: "高等数学",
    code: "CA", 
    icon: Sigma,
    color: "text-ark-accent",
    description: "源石技艺能量流动分析 // CALCULUS"
  },
  [SubjectType.LINEAR_ALGEBRA]: {
    name: "线性代数",
    code: "LA", 
    icon: Binary,
    color: "text-ark-yellow",
    description: "多维作战数据矩阵化处理 // LINEAR ALGEBRA"
  },
  [SubjectType.PROBABILITY]: {
    name: "概率论",
    code: "PR", 
    icon: Dna,
    color: "text-red-500",
    description: "公开招募与掉落统计学 // PROBABILITY"
  }
};

export const MOCK_MISSIONS: OperationMission[] = [
  // --- LINEAR ALGEBRA ---
  {
    id: 'la-1',
    code: 'LA-1',
    title: '向量',
    subtitle: '干员其实就是一个多维属性',
    subject: SubjectType.LINEAR_ALGEBRA,
    difficulty: 1,
    locked: false,
    cost: 6,
    rewards: ['基础作战记录', '龙门币'],
    description: '干员不是一个名字，而是一个多维属性点 [ATK, DEF, HP, COST, RANGE]。',
    longDescription: `
      <h3 class="text-xl font-bold text-white mb-4">第一章：向量 —— 干员其实就是一个多维属性</h3>
      <p class="mb-4">在 PRTS 的数据库中，干员不是一个名字，而是一组数值的集合（有序数组）。</p>
      <div class="bg-zinc-900 p-4 font-mono text-sm mb-6 border border-zinc-700">
        v = (HP, ATK, DEF, RES, COST)
      </div>
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
        <div class="bg-green-900/20 border border-green-500/30 p-4 rounded">
          <h4 class="text-green-400 font-bold flex items-center gap-2 mb-2">✅ 正确理解</h4>
          <p class="text-sm text-gray-300">
            <strong>斯卡蒂</strong> 可以被表示为向量：<br/>
            <span class="font-mono">[3600, 1000, 260, 0, 17]</span><br/>
            这代表了一个高攻高血低防的具体“状态”。
          </p>
        </div>
        <div class="bg-red-900/20 border border-red-500/30 p-4 rounded">
          <h4 class="text-red-400 font-bold flex items-center gap-2 mb-2">❌ 错误误区</h4>
          <p class="text-sm text-gray-300">
            认为“攻击力 1000”本身就是向量。<br/>
            <span class="text-xs text-gray-500">解释：单个数值（1000）只是标量。只有当所有属性组合在一起，拥有了“维度”的概念，才构成了描述干员完整的向量。</span>
          </p>
        </div>
      </div>
    `
  },
  {
    id: 'la-2',
    code: 'LA-2',
    title: '向量加法',
    subtitle: '干员合成？错！是状态叠加',
    subject: SubjectType.LINEAR_ALGEBRA,
    difficulty: 1,
    locked: false,
    cost: 9,
    rewards: ['初级作战记录', '固源岩'],
    description: '如果我把两个干员的状态加起来，那相当于他们的属性相加。',
    longDescription: `
      <h3 class="text-xl font-bold text-white mb-4">第二章：向量加法 —— 状态的线性叠加</h3>
      <p class="mb-4">向量加法遵循“分量对应相加”的规则。这在计算“合体属性”或“支援加成”时非常有用。</p>
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
        <div class="bg-green-900/20 border border-green-500/30 p-4 rounded">
          <h4 class="text-green-400 font-bold flex items-center gap-2 mb-2">✅ 正确理解</h4>
          <p class="text-sm text-gray-300">
            <strong>浊心斯卡蒂</strong> 的二技能将自身攻击力的 60% 加给队友。<br/>
            <span class="font-mono">队友最终向量 = 队友原向量 + 鼓舞向量</span><br/>
            <span class="font-mono text-xs">[ATK, DEF] + [Add_ATK, Add_DEF] = [ATK+Add, DEF+Add]</span>
          </p>
        </div>
        <div class="bg-red-900/20 border border-red-500/30 p-4 rounded">
          <h4 class="text-red-400 font-bold flex items-center gap-2 mb-2">❌ 错误误区</h4>
          <p class="text-sm text-gray-300">
            认为“能天使 + 德克萨斯 = 企鹅物流”。<br/>
            <span class="text-xs text-gray-500">解释：向量加法必须是同维度的数值相加，而不是概念或字符串的拼接。你不能把“德克萨斯”这个名字加到“能天使”的攻击力上。</span>
          </p>
        </div>
      </div>
    `
  },
  {
    id: 'la-3',
    code: 'LA-3',
    title: '数乘',
    subtitle: '干员技能 = 属性按倍数放大',
    subject: SubjectType.LINEAR_ALGEBRA,
    difficulty: 2,
    locked: false,
    cost: 12,
    rewards: ['中级作战记录', '糖'],
    description: '例如陈的二技能攻击力是1.8倍。这就是标量乘法对向量的核心操作。',
    longDescription: `
      <h3 class="text-xl font-bold text-white mb-4">第三章：数乘 —— 技能倍率的本质</h3>
      <p class="mb-4">数乘（Scalar Multiplication）就是用一个常数去乘以向量的每一个分量。在泰拉世界，这通常表现为“百分比攻击力加成”。</p>
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
        <div class="bg-green-900/20 border border-green-500/30 p-4 rounded">
          <h4 class="text-green-400 font-bold flex items-center gap-2 mb-2">✅ 正确理解</h4>
          <p class="text-sm text-gray-300">
            <strong>陈</strong> 开启赤霄·拔刀，倍率为 320%。<br/>
            计算为：<span class="font-mono">3.2 × [ATK_base]</span><br/>
            这直接拉伸了攻击力这个维度的长度。
          </p>
        </div>
        <div class="bg-red-900/20 border border-red-500/30 p-4 rounded">
          <h4 class="text-red-400 font-bold flex items-center gap-2 mb-2">❌ 错误误区</h4>
          <p class="text-sm text-gray-300">
            认为“攻击力 + 500”也是数乘。<br/>
            <span class="text-xs text-gray-500">解释：加固定数值是向量加法（加上一个 [500,0...] 的向量），而不是数乘。数乘必须是乘法关系，它会改变向量的模长（大小）但不改变方向（除非乘以负数）。</span>
          </p>
        </div>
      </div>
    `
  },
  {
    id: 'la-4',
    code: 'LA-4',
    title: '线性变换',
    subtitle: '矩阵：改变干员状态的机器',
    subject: SubjectType.LINEAR_ALGEBRA,
    difficulty: 3,
    locked: false,
    cost: 15,
    rewards: ['高级作战记录', '全新装置'],
    description: '攻击+40%，攻速+20%。用矩阵来描述这些对干员向量的操作。',
    longDescription: `
      <h3 class="text-xl font-bold text-white mb-4">第四章：线性变换 —— 矩阵的作用</h3>
      <p class="mb-4">如果我们不仅想改变攻击力，还想让攻击力转换成防御力（比如某些特殊模组），我们就需要用到矩阵。</p>
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
        <div class="bg-green-900/20 border border-green-500/30 p-4 rounded">
          <h4 class="text-green-400 font-bold flex items-center gap-2 mb-2">✅ 正确理解</h4>
          <p class="text-sm text-gray-300">
            <strong>阿</strong> 的榴莲针（攻速+50%，攻击+50%）可以看作一个对角矩阵：<br/>
            <span class="font-mono">
            | 1.5  0  |<br/>
            |  0  1.5 |
            </span><br/>
            该矩阵左乘干员属性向量，同时拉伸了两个维度。
          </p>
        </div>
        <div class="bg-red-900/20 border border-red-500/30 p-4 rounded">
          <h4 class="text-red-400 font-bold flex items-center gap-2 mb-2">❌ 错误误区</h4>
          <p class="text-sm text-gray-300">
            认为“平移”（Translation）也是线性变换。<br/>
            <span class="text-xs text-gray-500">解释：线性变换必须满足 f(0)=0。如果一个变换是“所有干员攻击力+100”，这不是线性变换（是仿射变换），不能单纯用 2x2 矩阵乘法表示，除非引入齐次坐标。</span>
          </p>
        </div>
      </div>
    `
  },

  // --- CALCULUS (1-5) ---
  {
    id: 'ca-1',
    code: 'CA-1',
    title: '导数',
    subtitle: '这一瞬间的“每秒产出能力” (DPS)',
    subject: SubjectType.CALCULUS,
    difficulty: 1,
    locked: false,
    cost: 6,
    rewards: ['基础作战记录', '破损装置'],
    description: '当当前输出有多快在变化。艾雅法拉开启火山时的爆发曲线斜率。',
    longDescription: `
      <h3 class="text-xl font-bold text-white mb-4">① 导数 = 瞬时变化率</h3>
      <p class="mb-4">导数告诉你的是“下一秒会发生什么变化”，而不是“现在有多少”。</p>
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
        <div class="bg-green-900/20 border border-green-500/30 p-4 rounded">
          <h4 class="text-green-400 font-bold flex items-center gap-2 mb-2">✅ 正确理解</h4>
          <p class="text-sm text-gray-300">
            看着 <strong>迷迭香</strong> 的攻击间隔缩短过程：<br/>
            “她的攻速正在越来越快。”<br/>
            <span class="text-xs">这描述的是攻击速度对时间的导数是正的（加速度）。</span>
          </p>
        </div>
        <div class="bg-red-900/20 border border-red-500/30 p-4 rounded">
          <h4 class="text-red-400 font-bold flex items-center gap-2 mb-2">❌ 错误误区</h4>
          <p class="text-sm text-gray-300">
            “史尔特尔现在伤害很高，所以她的导数很大。”<br/>
            <span class="text-xs text-gray-500">解释：伤害高（函数值大）不代表导数大。黄昏开启后伤害稳定在高位，此时变化率为0（导数为0）。只有在伤害<strong>飙升</strong>的那一瞬间，导数才是大的。</span>
          </p>
        </div>
      </div>
    `
  },
  {
    id: 'ca-2',
    code: 'CA-2',
    title: '极值',
    subtitle: '干员“最强/最弱瞬间”',
    subject: SubjectType.CALCULUS,
    difficulty: 2,
    locked: false,
    cost: 12,
    rewards: ['中级作战记录', '酮凝集'],
    description: '寻找函数的最大值。史尔特尔黄昏期间的最高爆发点在哪里？',
    longDescription: `
      <h3 class="text-xl font-bold text-white mb-4">② 极值 = 巅峰时刻</h3>
      <p class="mb-4">极值点通常出现在导数为 0 的地方（上升转下降，或下降转上升）。</p>
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
        <div class="bg-green-900/20 border border-green-500/30 p-4 rounded">
          <h4 class="text-green-400 font-bold flex items-center gap-2 mb-2">✅ 正确理解</h4>
          <p class="text-sm text-gray-300">
            <strong>能天使</strong> 吃满拐（Buff）的那一瞬间，DPS 达到了顶峰，随后随着拐的持续时间结束而下降。<br/>
            这个顶峰就是极大值点。
          </p>
        </div>
        <div class="bg-red-900/20 border border-red-500/30 p-4 rounded">
          <h4 class="text-red-400 font-bold flex items-center gap-2 mb-2">❌ 错误误区</h4>
          <p class="text-sm text-gray-300">
            “只要技能还在开着，伤害就是最大的。”<br/>
            <span class="text-xs text-gray-500">解释：很多干员有暖机（如棘刺）或衰减（如刻俄柏打低甲）。极值是某个具体的<strong>时间点</strong>，而不是一段区间。</span>
          </p>
        </div>
      </div>
    `
  },
  {
    id: 'ca-3',
    code: 'CA-3',
    title: '积分',
    subtitle: '整个技能期间打了多少伤害 (总输出)',
    subject: SubjectType.CALCULUS,
    difficulty: 3,
    locked: false,
    cost: 18,
    rewards: ['高级作战记录', '聚合剂'],
    description: 'DPS曲线下的面积。把每一秒的伤害全部加起来。',
    longDescription: `
      <h3 class="text-xl font-bold text-white mb-4">③ 积分 = 总累积量 (Total Damage)</h3>
      <p class="mb-4">如果说导数是“速度”，积分就是“距离”。如果说导数是“DPS”，积分就是“总伤”。</p>
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
        <div class="bg-green-900/20 border border-green-500/30 p-4 rounded">
          <h4 class="text-green-400 font-bold flex items-center gap-2 mb-2">✅ 正确理解</h4>
          <p class="text-sm text-gray-300">
            计算 <strong>假日威龙陈</strong> 一套技能的总伤：<br/>
            我们需要把技能持续时间内每一发子弹的伤害加起来（离散积分），或者计算 DPS 曲线下的面积。
          </p>
        </div>
        <div class="bg-red-900/20 border border-red-500/30 p-4 rounded">
          <h4 class="text-red-400 font-bold flex items-center gap-2 mb-2">❌ 错误误区</h4>
          <p class="text-sm text-gray-300">
            “总伤 = 最高 DPS × 持续时间”<br/>
            <span class="text-xs text-gray-500">解释：这是最常见的错误。只有当伤害完全恒定（矩形面积）时才能这么算。对于有预热、爆发、衰减的技能，必须使用积分思想，否则会严重高估总伤。</span>
          </p>
        </div>
      </div>
    `
  },
  {
    id: 'ca-4',
    code: 'CA-4',
    title: '微分方程',
    subtitle: '矿石病感染扩散模型',
    subject: SubjectType.CALCULUS,
    difficulty: 4,
    locked: false,
    cost: 21,
    rewards: ['高级作战记录', '晶体电子单元'],
    description: '已知现在的感染速度，预测未来30天泰拉大陆的感染者数量。',
    longDescription: `
      <h3 class="text-xl font-bold text-white mb-4">④ 微分方程 = 动态系统的预测</h3>
      <p class="mb-4">微分方程描述的是“状态”和“变化率”之间的关系。比如：感染人数越多，新感染的人就越多。</p>
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
        <div class="bg-green-900/20 border border-green-500/30 p-4 rounded">
          <h4 class="text-green-400 font-bold flex items-center gap-2 mb-2">✅ 正确理解</h4>
          <p class="text-sm text-gray-300">
            <strong>Malthusian 增长模型</strong>：<br/>
            <span class="font-mono">dy/dt = k * y</span><br/>
            当前感染者越多(y)，增长速度(dy/dt)就越快。这是一条指数爆炸曲线。
          </p>
        </div>
        <div class="bg-red-900/20 border border-red-500/30 p-4 rounded">
          <h4 class="text-red-400 font-bold flex items-center gap-2 mb-2">❌ 错误误区</h4>
          <p class="text-sm text-gray-300">
            “每天增加 10 个感染者，所以 30 天后增加 300 个。”<br/>
            <span class="text-xs text-gray-500">解释：这是线性增长，忽略了传染病的级联效应。微分方程的核心就是变化率本身也在变化，不能用简单的乘法预测未来。</span>
          </p>
        </div>
      </div>
    `
  },
  {
    id: 'ca-5',
    code: 'CA-5',
    title: '泰勒展开',
    subtitle: '用简单的多项式模拟复杂的源石技艺',
    subject: SubjectType.CALCULUS,
    difficulty: 5,
    locked: false,
    cost: 24,
    rewards: ['顶级作战记录', '烧结核凝晶'],
    description: '将复杂的BOSS机制拆解为无数个简单的一击。化繁为简的极致。',
    longDescription: `
      <h3 class="text-xl font-bold text-white mb-4">⑤ 泰勒展开 = 局部逼近</h3>
      <p class="mb-4">任何复杂的函数，在某一点附近，都可以用多项式（x, x², x³...）来模拟。</p>
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
        <div class="bg-green-900/20 border border-green-500/30 p-4 rounded">
          <h4 class="text-green-400 font-bold flex items-center gap-2 mb-2">✅ 正确理解</h4>
          <p class="text-sm text-gray-300">
            为了计算 Boss 受到的复杂混合伤害，PRTS 将伤害公式在“低护甲”处展开，忽略高阶项（微小的误差），从而在一毫秒内给出近似解。<br/>
            <span class="text-xs">这就像把曲线看作无数小段直线的拼接。</span>
          </p>
        </div>
        <div class="bg-red-900/20 border border-red-500/30 p-4 rounded">
          <h4 class="text-red-400 font-bold flex items-center gap-2 mb-2">❌ 错误误区</h4>
          <p class="text-sm text-gray-300">
            “因为我在 0 秒时用直线拟合很准，所以这个拟合在 100 秒时也准。”<br/>
            <span class="text-xs text-gray-500">解释：泰勒展开离展开点越远，误差越大。你不能用阿米娅现在的状态去线性推测她 10 年后的源石技艺强度。</span>
          </p>
        </div>
      </div>
    `
  },

  // --- PROBABILITY (1-5) ---
  {
    id: 'pr-1',
    code: 'PR-1',
    title: '概率',
    subtitle: '事情发生的“稳定频率”',
    subject: SubjectType.PROBABILITY,
    difficulty: 1,
    locked: false,
    cost: 6,
    rewards: ['基础作战记录', '赤金'],
    description: '不讲公式，只讲一句话：你抽100次出了1次六星 -> 六星概率约 1%。',
    longDescription: `
      <h3 class="text-xl font-bold text-white mb-4">① 概率 = 大数定律</h3>
      <p class="mb-4">概率不是对单次事件的预测，而是对大规模重复事件的频率描述。</p>
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
        <div class="bg-green-900/20 border border-green-500/30 p-4 rounded">
          <h4 class="text-green-400 font-bold flex items-center gap-2 mb-2">✅ 正确理解</h4>
          <p class="text-sm text-gray-300">
            “罗德岛的数据显示，在进行了 1,000,000 次公开招募后，高级资深干员的出现率稳定在 0.5% 左右。”<br/>
            <span class="text-xs">只有样本量足够大，概率才有意义。</span>
          </p>
        </div>
        <div class="bg-red-900/20 border border-red-500/30 p-4 rounded">
          <h4 class="text-red-400 font-bold flex items-center gap-2 mb-2">❌ 错误误区</h4>
          <p class="text-sm text-gray-300">
            “我单抽出了六星，所以我今天的概率是 100%。”<br/>
            <span class="text-xs text-gray-500">解释：单次样本不能代表整体概率分布。这叫幸存者偏差。</span>
          </p>
        </div>
      </div>
    `
  },
  {
    id: 'pr-2',
    code: 'PR-2',
    title: '独立事件',
    subtitle: '抽卡不是“玄学连携技”',
    subject: SubjectType.PROBABILITY,
    difficulty: 2,
    locked: false,
    cost: 12,
    rewards: ['中级作战记录', '聚酸酯'],
    description: '“我已经歪了三次，下一个一定是对应的吗？” 概率论告诉你：NO。',
    longDescription: `
      <h3 class="text-xl font-bold text-white mb-4">② 独立事件 = 记忆缺失</h3>
      <p class="mb-4">除非有保底机制（这是人为干预），否则硬币没有记忆，卡池也没有记忆。</p>
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
        <div class="bg-green-900/20 border border-green-500/30 p-4 rounded">
          <h4 class="text-green-400 font-bold flex items-center gap-2 mb-2">✅ 正确理解</h4>
          <p class="text-sm text-gray-300">
            “虽然前 50 发全是三星，但这第 51 发抽出六星的概率依然是 2%。”<br/>
            <span class="text-xs">（假设未触发伪随机保底机制）每一次抽取都是全新的独立挑战。</span>
          </p>
        </div>
        <div class="bg-red-900/20 border border-red-500/30 p-4 rounded">
          <h4 class="text-red-400 font-bold flex items-center gap-2 mb-2">❌ 错误误区</h4>
          <p class="text-sm text-gray-300">
            “那个主播刚十连三黄，奖池被吸干了，我现在去抽肯定不出货。”<br/>
            <span class="text-xs text-gray-500">解释：典型的赌徒谬误。别人的独立事件不会影响你的独立事件。服务器没有“奖池总量守恒”这回事。</span>
          </p>
        </div>
      </div>
    `
  },
  {
    id: 'pr-3',
    code: 'PR-3',
    title: '期望',
    subtitle: '平均能赚多少？(最重要)',
    subject: SubjectType.PROBABILITY,
    difficulty: 3,
    locked: false,
    cost: 18,
    rewards: ['高级作战记录', 'D32钢'],
    description: '你刚赤金，有60%概率出紫，40%出蓝。你的期望收益是多少？',
    longDescription: `
      <h3 class="text-xl font-bold text-white mb-4">③ 期望 = 加权平均值</h3>
      <p class="mb-4">期望值是做决策的唯一理性依据。它告诉你长期来看“值不值”。</p>
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
        <div class="bg-green-900/20 border border-green-500/30 p-4 rounded">
          <h4 class="text-green-400 font-bold flex items-center gap-2 mb-2">✅ 正确理解</h4>
          <p class="text-sm text-gray-300">
            活动关卡掉率 50%，理智消耗 18。<br/>
            期望消耗 = 18 / 0.5 = 36 理智/个。<br/>
            主线关卡掉率 30%，理智消耗 12。<br/>
            期望消耗 = 12 / 0.3 = 40 理智/个。<br/>
            <strong>结论：刷活动关卡更赚。</strong>
          </p>
        </div>
        <div class="bg-red-900/20 border border-red-500/30 p-4 rounded">
          <h4 class="text-red-400 font-bold flex items-center gap-2 mb-2">❌ 错误误区</h4>
          <p class="text-sm text-gray-300">
            “这次活动掉率 50%，所以我刷 2 次<strong>一定</strong>会掉 1 个。”<br/>
            <span class="text-xs text-gray-500">解释：期望值是平均数，不是保底承诺。刷 2 次却 0 掉落的概率依然有 25%。</span>
          </p>
        </div>
      </div>
    `
  },
  {
    id: 'pr-4',
    code: 'PR-4',
    title: '贝叶斯定理',
    subtitle: '根据新线索更新情报',
    subject: SubjectType.PROBABILITY,
    difficulty: 4,
    locked: false,
    cost: 21,
    rewards: ['高级作战记录', '提炼溶剂'],
    description: '当你看到Boss放技能的前摇（新证据），你判断它要放大的概率（后验概率）变了。',
    longDescription: `
      <h3 class="text-xl font-bold text-white mb-4">④ 贝叶斯 = 动态修正</h3>
      <p class="mb-4">我们总是带着偏见（先验概率）看待世界，新情报（Evidence）修正了我们的偏见，形成新的判断（后验概率）。</p>
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
        <div class="bg-green-900/20 border border-green-500/30 p-4 rounded">
          <h4 class="text-green-400 font-bold flex items-center gap-2 mb-2">✅ 正确理解</h4>
          <p class="text-sm text-gray-300">
            平时 Boss 放大的概率是 10%。<br/>
            <strong>新线索：</strong>Boss 举起了手。<br/>
            <strong>修正后：</strong>已知 Boss 举手时 90% 会放大，现在放大概率飙升至 80% 以上。<br/>
            <span class="text-xs">战术指挥就是不断根据前摇修正预判。</span>
          </p>
        </div>
        <div class="bg-red-900/20 border border-red-500/30 p-4 rounded">
          <h4 class="text-red-400 font-bold flex items-center gap-2 mb-2">❌ 错误误区</h4>
          <p class="text-sm text-gray-300">
            “不管 Boss 做什么动作，反正攻略书上说他 30 秒放一次技能，我就死等 30 秒。”<br/>
            <span class="text-xs text-gray-500">解释：这是忽略了新信息（Likelihood），死守先验概率（Prior），在瞬息万变的战场上是致命的。</span>
          </p>
        </div>
      </div>
    `
  },
  {
    id: 'pr-5',
    code: 'PR-5',
    title: '正态分布',
    subtitle: '大多数干员都是普通人',
    subject: SubjectType.PROBABILITY,
    difficulty: 5,
    locked: false,
    cost: 24,
    rewards: ['顶级作战记录', '双极纳米片'],
    description: '为什么天才和废柴都很少，大部分人平平无奇？高斯分布解释了一切。',
    longDescription: `
      <h3 class="text-xl font-bold text-white mb-4">⑤ 正态分布 = 世界的常态</h3>
      <p class="mb-4">在自然界中，极端的数值总是少的，中间的数值总是多的。这就构成了钟形曲线。</p>
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
        <div class="bg-green-900/20 border border-green-500/30 p-4 rounded">
          <h4 class="text-green-400 font-bold flex items-center gap-2 mb-2">✅ 正确理解</h4>
          <p class="text-sm text-gray-300">
            泰拉大陆源石适应性统计：<br/>
            绝大多数人是普通感染者或非感染者（中间）。<br/>
            极少数人是 0 源石技艺适应性的普通人（左端）。<br/>
            极少数人是如 <strong>伊芙利特</strong> 般的源石技艺天才（右端）。
          </p>
        </div>
        <div class="bg-red-900/20 border border-red-500/30 p-4 rounded">
          <h4 class="text-red-400 font-bold flex items-center gap-2 mb-2">❌ 错误误区</h4>
          <p class="text-sm text-gray-300">
            认为“天才满地走，庸才不如狗”。<br/>
            <span class="text-xs text-gray-500">解释：如果一个世界里天才和普通人一样多（均匀分布），那这个世界的生态系统早就崩溃了。正态分布维持了社会的稳定性。</span>
          </p>
        </div>
      </div>
    `
  }
];
