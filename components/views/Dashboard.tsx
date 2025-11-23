
import React from 'react';
import { Atom, FlaskConical, BrainCircuit, Shield, Database } from 'lucide-react';
import { ViewState, UserStats } from '../../types';

interface DashboardProps {
  stats: UserStats;
  onChangeView: (view: ViewState) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ stats, onChangeView }) => {
  return (
    <div className="flex flex-col h-full w-full p-6 animate-fadeIn select-none">
      
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 h-full">
        
        {/* Left Column: Character/Assistant */}
        <div className="md:col-span-5 relative flex flex-col justify-end group">
           {/* Placeholder for Assistant Art - Amiya or Kal'tsit style silhouette */}
           <div className="absolute inset-0 z-0 opacity-20 flex items-center justify-center pointer-events-none">
              <div className="w-full h-full bg-[url('https://picsum.photos/600/800?grayscale')] bg-cover bg-center grayscale contrast-125" style={{clipPath: "polygon(0 0, 100% 0, 85% 100%, 0% 100%)"}}></div>
           </div>
           
           <div className="relative z-10 bg-black/80 backdrop-blur-md p-6 border-l-4 border-ark-yellow mb-12 shadow-lg">
             <div className="flex justify-between items-start">
                <div>
                    <h1 className="text-4xl font-black font-mono tracking-tighter mb-1 text-white">DOCTOR</h1>
                    <p className="text-ark-subtext text-xs tracking-widest mb-4">ID: 84920193 // 罗德岛指挥官</p>
                </div>
                <div className="text-ark-yellow font-mono font-bold text-2xl">LV.{stats.level}</div>
             </div>
             
             <div className="space-y-2">
                <div className="flex justify-between text-xs text-gray-400 font-mono">
                    <span>EXP</span>
                    <span>{stats.exp} / {stats.maxExp}</span>
                </div>
                <div className="h-1.5 w-full bg-gray-800 rounded-full overflow-hidden">
                  <div className="h-full bg-ark-yellow" style={{ width: `${(stats.exp / stats.maxExp) * 100}%` }}></div>
                </div>
             </div>
           </div>
        </div>

        {/* Right Column: Menu Grid */}
        <div className="md:col-span-7 flex flex-col gap-4 justify-center">
          
          <div className="grid grid-cols-2 gap-4">
             {/* Large Combat Button */}
             <button 
               onClick={() => onChangeView(ViewState.OPERATIONS)}
               className="col-span-2 bg-blue-900/30 border border-blue-500/30 hover:bg-blue-800/50 hover:border-ark-accent transition-all p-8 relative overflow-hidden group h-48 flex items-center justify-between shadow-[0_0_15px_rgba(0,0,0,0.5)]"
             >
                {/* Scanlines overlay */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-0 pointer-events-none opacity-20 bg-[length:100%_2px,3px_100%]"></div>
                
                <div className="z-10 text-left relative">
                  <div className="text-6xl font-black italic tracking-tighter text-white/10 absolute -top-8 -left-4 select-none">PHYSICS</div>
                  <h2 className="text-4xl font-black italic tracking-widest text-white group-hover:text-ark-accent transition-colors drop-shadow-md">
                    作战 <span className="text-xl not-italic font-normal opacity-70">OPERATIONS</span>
                  </h2>
                  <p className="text-blue-200 text-xs font-mono mt-2 tracking-widest">当前行动：CA-5 泰勒展开与源石技艺</p>
                </div>
                
                <div className="relative z-10">
                    <Atom className="w-24 h-24 text-blue-500/20 group-hover:text-ark-accent/60 transition-all rotate-12" />
                </div>
                
                <div className="absolute bottom-0 right-0 w-16 h-16 border-b-4 border-r-4 border-ark-accent opacity-50 group-hover:opacity-100 transition-opacity"></div>
             </button>

             {/* Secondary Buttons */}
             <div 
               onClick={() => onChangeView(ViewState.ARCHIVES)}
               className="bg-zinc-800/60 border border-zinc-600 hover:bg-zinc-700/80 hover:border-gray-400 p-6 cursor-pointer flex flex-col justify-between group transition-all h-32 relative overflow-hidden"
             >
                <FlaskConical className="w-8 h-8 text-gray-500 group-hover:text-ark-yellow mb-4 group-hover:scale-110 transition-transform duration-300" />
                <div className="z-10">
                  <h3 className="text-xl font-bold tracking-wider">档案 <span className="text-xs text-gray-500 font-mono">ARCHIVES</span></h3>
                  <p className="text-xs text-gray-400 mt-1">综合生物数据库</p>
                </div>
                <div className="absolute -right-4 -bottom-4 text-8xl font-black text-white/5 rotate-[-15deg]">BIO</div>
             </div>

             <div 
               onClick={() => onChangeView(ViewState.PRTS)}
               className="bg-zinc-800/60 border border-zinc-600 hover:bg-zinc-700/80 hover:border-gray-400 p-6 cursor-pointer flex flex-col justify-between group transition-all h-32 relative overflow-hidden"
             >
                <BrainCircuit className="w-8 h-8 text-gray-500 group-hover:text-green-400 mb-4 group-hover:scale-110 transition-transform duration-300" />
                <div className="z-10">
                  <h3 className="text-xl font-bold tracking-wider">神经网络 <span className="text-xs text-gray-500 font-mono">PRTS</span></h3>
                  <p className="text-xs text-gray-400 mt-1">AI 神经连接</p>
                </div>
                <div className="absolute -right-4 -bottom-4 text-8xl font-black text-white/5 rotate-[-15deg]">NET</div>
             </div>

             <div className="col-span-2 bg-zinc-900/90 border-t-2 border-zinc-700 p-4 flex items-center justify-between shadow-inner">
                <div className="flex items-center gap-4">
                  <Shield className="w-5 h-5 text-gray-500" />
                  <span className="text-sm font-mono text-gray-400">基建状态 (BASE STATUS): <span className="text-green-500 font-bold">STABLE</span></span>
                </div>
                <div className="flex gap-2">
                   <div className="w-1.5 h-1.5 bg-green-500 rounded-sm animate-pulse"></div>
                   <div className="w-1.5 h-1.5 bg-green-500 rounded-sm animate-pulse delay-75"></div>
                   <div className="w-1.5 h-1.5 bg-green-500 rounded-sm animate-pulse delay-150"></div>
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
