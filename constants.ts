
import { OperationMission, SubjectType, UserStats } from './types';
import { Circle, Hexagon, Triangle } from 'lucide-react';

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
    icon: Circle,
    color: "text-ark-accent",
    description: "源石技艺能量流动分析 // CALCULUS"
  },
  [SubjectType.LINEAR_ALGEBRA]: {
    name: "线性代数",
    code: "LA", 
    icon: Hexagon,
    color: "text-ark-yellow",
    description: "多维作战数据矩阵化处理 // LINEAR ALGEBRA"
  },
  [SubjectType.PROBABILITY]: {
    name: "概率论",
    code: "PR", 
    icon: Triangle,
    color: "text-red-500",
    description: "公开招募与掉落统计学 // PROBABILITY"
  }
};

export const MOCK_MISSIONS: OperationMission[] = [
  // --- LINEAR ALGEBRA (Based on provided image text) ---
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
      <p class="mb-4">你可以跟朋友这么说：</p>
      <blockquote class="border-l-4 border-ark-yellow pl-4 italic text-gray-400 mb-6">
        “你玩明日方舟的时候，一个干员其实不是一个名字，而是一个 <strong>多维属性点</strong>。”
      </blockquote>
      <p class="mb-2">比如，一个干员可以用 6 个维度表示：</p>
      <div class="bg-zinc-900 p-4 font-mono text-sm mb-6 border border-zinc-700">
        v = (ATK, DEF, HP, ASPD, COST, RANGE)
      </div>
      <p class="mb-4">那么：</p>
      <ul class="list-disc pl-5 space-y-2 mb-6 text-gray-300">
        <li><strong>阿米娅</strong> = 一个 6 维向量</li>
        <li><strong>能天使</strong> = 另一个 6 维向量</li>
        <li>特兰、煌、陈、史尔特尔......都各有自己的向量</li>
      </ul>
      <p class="mb-4">这就是线性代数里最本质的东西：</p>
      <p class="text-ark-yellow font-bold">一个向量就是一个干员的完整状态。</p>
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
      <h3 class="text-xl font-bold text-white mb-4">第二章：向量加法 —— 干员合成？错！是“状态叠加”</h3>
      <p class="mb-4">你也能继续说：</p>
      <blockquote class="border-l-4 border-ark-yellow pl-4 italic text-gray-400 mb-6">
        “如果我把两个干员的状态加起来，那相当于他们的属性相加。”
      </blockquote>
      <p class="mb-2">当然游戏里不能真的这么合成，但数学允许你这么玩。如果：</p>
      <div class="bg-zinc-900 p-4 font-mono text-sm mb-6 border border-zinc-700 space-y-2">
        <p>v(能天使) = (900, 100, 1500, 100, 10, 6)</p>
        <p>v(阿米娅) = (1100, 200, 2000, 90, 17, 1)</p>
      </div>
      <p class="mb-4">那么：</p>
      <div class="bg-zinc-900 p-4 font-mono text-sm mb-6 border border-zinc-700">
        v(能天使) + v(阿米娅)
      </div>
      <p class="text-ark-yellow font-bold">就是“把这两套属性叠加在一起”的状态。</p>
      <p class="mt-2 text-sm text-gray-500">虽然游戏里不会这么干，但这为了理解加法。</p>
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
      <h3 class="text-xl font-bold text-white mb-4">第三章：数乘 —— 干员技能 = 属性按倍数放大</h3>
      <p class="mb-4">例如陈的二技能攻击力是 1.8：</p>
      <div class="bg-zinc-900 p-4 font-mono text-sm mb-6 border border-zinc-700">
        1.8 · v(陈)
      </div>
      <p class="mb-4">这就代表“等开了技能后的属性”。</p>
      <p class="mb-4">在数学里，这叫：</p>
      <ul class="list-disc pl-5 space-y-2 mb-6 text-gray-300">
        <li><strong>标量乘法 (数乘)</strong></li>
        <li>它是向量空间的核心操作</li>
      </ul>
    `
  },
  {
    id: 'la-4',
    code: 'LA-4',
    title: '线性变换',
    subtitle: '游戏里的所有 buff/debuff/机制',
    subject: SubjectType.LINEAR_ALGEBRA,
    difficulty: 3,
    locked: false,
    cost: 15,
    rewards: ['高级作战记录', '全新装置'],
    description: '攻击+40%，攻速+20%。用矩阵来描述这些对干员向量的操作。',
    longDescription: `
      <h3 class="text-xl font-bold text-white mb-4">第四章：线性变换 —— 游戏里的所有 buff/debuff/机制</h3>
      <p class="mb-4">你现在可以引出核心：</p>
      <blockquote class="border-l-4 border-ark-yellow pl-4 italic text-gray-400 mb-6">
        “线性变换 = 游戏机制作用在干员身上。”
      </blockquote>
      
      <div class="space-y-6">
        <div>
            <h4 class="text-ark-accent font-bold mb-2">✔ 攻击 +40%</h4>
            <div class="bg-zinc-900 p-4 font-mono text-sm border border-zinc-700">
                T_atk(v) = [1.4 0...; 0 1...] v
            </div>
        </div>

        <div>
            <h4 class="text-ark-accent font-bold mb-2">✔ 攻速 +20</h4>
            <div class="bg-zinc-900 p-4 font-mono text-sm border border-zinc-700">
                T_aspd(v) = [1 0...; ... 0 1.2 ...] v
            </div>
        </div>
        
        <div>
            <h4 class="text-ark-accent font-bold mb-2">✔ 只取攻击 (投影)</h4>
            <div class="bg-zinc-900 p-4 font-mono text-sm border border-zinc-700">
                P(v) = (ATK) <br/>
                <span class="text-gray-500 text-xs">// 就像只看干员的 DPS 评测</span>
            </div>
        </div>
      </div>
      <p class="mt-4 text-white">这是一个“压缩”的线性变换。</p>
    `
  },

  // --- CALCULUS (Based on provided image text) ---
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
      <h3 class="text-xl font-bold text-white mb-4">① 导数 = 这一瞬间的“每秒产出能力” (DPS)</h3>
      <p class="mb-4">导数（微分）就是：<strong>当当前输出有多快在变化。</strong></p>
      
      <p class="mb-2">比如一个干员的伤害曲线是 <span class="font-mono text-ark-yellow">f(t)</span></p>
      <p class="mb-4">那么导数 <span class="font-mono text-ark-yellow">f'(t)</span> 就相当于：</p>
      <ul class="list-disc pl-5 space-y-2 mb-6 text-gray-300">
        <li>当前技能爆发后，DPS 上升得有多快？</li>
        <li>技能刚启动时，伤害提升速度是不是陡增？</li>
        <li>攻速 Buff 叠上去时，伤害爬升速度如何？</li>
      </ul>

      <div class="bg-zinc-900 p-4 border border-zinc-700">
        <h4 class="font-bold text-white mb-2">举例：艾雅法拉3技能爆发曲线</h4>
        <p class="text-sm text-gray-400">
          刚启动 → 瞬间火山爆发，DPS 斜率特别大 → <span class="text-ark-accent">导数大</span><br/>
          结束阶段 → 没有增幅了 → 导数小甚至变成 0<br/>
          <br/>
          <strong>导数大</strong> = 输出正在快速增加（火山）<br/>
          <strong>导数小</strong> = 输出趋于稳定（普通平A）
        </p>
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
      <h3 class="text-xl font-bold text-white mb-4">② 极值 (最大值/最小值) = 干员“最强/最弱瞬间”</h3>
      <p class="mb-4">高数里极大值、极小值，就是：<strong>输出最高峰 / 最低谷的瞬间。</strong></p>
      
      <div class="space-y-4">
        <div class="bg-zinc-900 p-3 border-l-2 border-ark-yellow">
           <h5 class="text-ark-yellow font-bold">史尔特尔 3 技能 最强点</h5>
           <p class="text-sm text-gray-400">你在黄昏里找输出最高的一秒，就是在找函数的极值。</p>
        </div>
        <div class="bg-zinc-900 p-3 border-l-2 border-ark-yellow">
           <h5 class="text-ark-yellow font-bold">山 2 技能 最强持续区间</h5>
        </div>
        <div class="bg-zinc-900 p-3 border-l-2 border-ark-yellow">
           <h5 class="text-ark-yellow font-bold">Boss 某阶段 最弱点 (易伤)</h5>
        </div>
      </div>
    `
  },
  {
    id: 'ca-5',
    code: 'CA-5',
    title: '积分',
    subtitle: '整个技能期间打了多少伤害 (总输出)',
    subject: SubjectType.CALCULUS,
    difficulty: 3,
    locked: false,
    cost: 18,
    rewards: ['高级作战记录', '聚合剂'],
    description: 'DPS曲线下的面积。把每一秒的伤害全部加起来。',
    longDescription: `
      <h3 class="text-xl font-bold text-white mb-4">⑤ 积分 = 整个技能期间打了多少伤害 (总输出)</h3>
      <p class="mb-4">积分就是：<strong>把每一秒的伤害全部加起来 = 总伤。</strong></p>
      <p class="mb-6">这不就和我们在明日方舟里算总伤一模一样吗？</p>

      <div class="bg-zinc-900 p-4 font-mono text-sm mb-6 border border-zinc-700">
        TotalDamage = ∫(0 to 30) DPS(t) dt
      </div>

      <p class="mb-4">如果 DPS(t) 是一个曲线，就相当于把这个曲线下面的面积求出来。</p>
      
      <h4 class="font-bold text-white mb-2">游戏里大量的例子：</h4>
      <ul class="list-disc pl-5 space-y-2 text-gray-300">
        <li>史尔特尔 3 技能“一刀秒人”实际是高积分</li>
        <li>高 DPH 恢复总量（桃金娘充电宝）就是积分</li>
        <li>Boss 总共给你造成多少伤害 → 积分</li>
      </ul>
      <p class="mt-4 text-ark-accent font-bold">积分 = 一段时间内的总收益。</p>
    `
  },

  // --- PROBABILITY (Based on provided image text) ---
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
      <h3 class="text-xl font-bold text-white mb-4">① 概率 = 事情发生的“稳定频率”</h3>
      <p class="mb-4">不讲公式，只讲一句话：</p>
      <blockquote class="border-l-4 border-red-500 pl-4 italic text-gray-400 mb-6">
        你抽 100 次出了 1 次六星 → 六星概率约 1%<br/>
        你每天打一次材料图，有 30 天出了 18 次紫 → 掉落概率约 60%
      </blockquote>
      <p class="mb-4">概率本质就是 <strong>重复很多次后，这个频率会趋于稳定</strong>。</p>
      <p class="text-gray-500 text-sm">这就是 <strong>大数定律</strong> (后面会讲)。</p>
    `
  },
  {
    id: 'pr-3',
    code: 'PR-3',
    title: '独立事件',
    subtitle: '抽卡不是“玄学连携技”',
    subject: SubjectType.PROBABILITY,
    difficulty: 2,
    locked: false,
    cost: 12,
    rewards: ['中级作战记录', '聚酸酯'],
    description: '“我已经歪了三次，下一个一定是对应的吗？” 概率论告诉你：NO。',
    longDescription: `
      <h3 class="text-xl font-bold text-white mb-4">③ 独立事件 = 抽卡不是“玄学连携技”</h3>
      <p class="mb-4">玩家经常问：</p>
      <blockquote class="bg-zinc-900 p-4 mb-6 italic text-white">
        “我已经歪了三次，下一个一定是对应的吗？”
      </blockquote>
      <p class="mb-4">概率论会说：</p>
      <ul class="list-disc pl-5 space-y-2 mb-6 text-gray-300">
        <li>抽卡是 <strong>独立事件</strong></li>
        <li>上一次出的结果，对下一次 <strong>完全没有影响</strong></li>
      </ul>
      <p class="text-ark-danger font-bold">别人刚抽出能天使 -> 不会提高你抽能天使的概率。</p>
      <p class="mt-2 text-sm text-gray-500">这就是“独立事件”。</p>
    `
  },
  {
    id: 'pr-7',
    code: 'PR-7',
    title: '期望',
    subtitle: '平均能赚多少？(最重要)',
    subject: SubjectType.PROBABILITY,
    difficulty: 3,
    locked: false,
    cost: 18,
    rewards: ['高级作战记录', 'D32钢'],
    description: '你刚赤金，有60%概率出紫，40%出蓝。你的期望收益是多少？',
    longDescription: `
      <h3 class="text-xl font-bold text-white mb-4">⑦ 期望 (数学期望) = 平均能赚多少？(最重要)</h3>
      <p class="mb-4">期望 = 重复很多次后，平均能拿到多少收益。</p>
      <h4 class="font-bold text-white mb-2">举例：</h4>
      <p class="mb-4">你刷赤金，有 60% 概率出紫 (价值 700)，40% 出蓝 (价值 200)。</p>
      <p class="mb-2">你的期望收益：</p>
      <div class="bg-zinc-900 p-4 font-mono text-sm mb-6 border border-zinc-700">
        0.6 * 700 + 0.4 * 200 = 520
      </div>
      <p class="mb-4">意思是说：<strong>长期刷一次材料图，平均赚 520。</strong></p>
      <p class="text-sm text-gray-500 mb-6">不是每次都 520，但打多了就是 520。</p>
      
      <h4 class="font-bold text-white mb-2">抽卡也是：</h4>
      <ul class="list-disc pl-5 space-y-2 text-gray-300">
        <li>UP 六星概率假设 50%</li>
        <li>六星总概率 2%</li>
        <li>那么抽到 UP 的期望 = 1%</li>
      </ul>
      <p class="mt-4">但抽多了 → 大家实际都接近 1% 的 UP 六星。这就是期望。</p>
    `
  }
];
