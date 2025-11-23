
import React from 'react';
import { UserStats } from '../../types';
import { Battery, Coins, Zap } from 'lucide-react';

interface ShellProps {
  children: React.ReactNode;
  stats: UserStats;
}

const Shell: React.FC<ShellProps> = ({ children, stats }) => {
  return (
    <div className="h-screen md:h-screen lg:h-screen h-[100dvh] w-screen flex flex-col bg-ark-bg text-ark-text overflow-hidden select-none supports-[height:100dvh]:h-[100dvh]">
      {/* Top Navigation Bar */}
      <header className="h-16 bg-zinc-900/90 backdrop-blur-md border-b border-zinc-800 flex items-center justify-between px-4 md:px-6 z-50 shadow-lg relative shrink-0">
        {/* Deco lines */}
        <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-ark-accent to-transparent opacity-50"></div>
        
        <div className="flex items-center gap-6">
           {/* Logo Area */}
           <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white text-black flex items-center justify-center font-black text-xl italic tracking-tighter rhombus-btn" style={{clipPath: "polygon(20% 0, 100% 0, 80% 100%, 0% 100%)"}}>
                R
              </div>
              <div className="leading-none">
                <h1 className="text-xl font-black italic tracking-tighter text-white">RHODES <span className="text-ark-accent">MATH</span></h1>
                <p className="text-[10px] tracking-[0.2em] text-gray-500 hidden md:block">TACTICAL TERMINAL</p>
              </div>
           </div>
        </div>

        {/* Resources with Math Metaphors */}
        <div className="flex items-center gap-4 md:gap-12 font-mono text-sm">
           <div className="flex items-center gap-3 group cursor-help">
              <div className="bg-blue-600/20 p-2 rounded-full border border-blue-500/30 group-hover:bg-blue-500 group-hover:text-black transition-colors relative">
                 <Battery size={16} className="text-blue-400 group-hover:text-white" />
                 <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              </div>
              <div className="flex flex-col leading-none">
                 <span className="hidden md:inline text-[9px] text-gray-500 uppercase tracking-wider mb-0.5 group-hover:text-blue-400">Computational Power</span>
                 <span className="font-bold text-lg text-white group-hover:text-ark-accent transition-colors">{stats.sanity} <span className="text-xs text-gray-600">/ {stats.maxSanity}</span></span>
                 <span className="md:hidden text-[9px] text-gray-600">理智</span>
                 <span className="hidden md:inline text-[9px] text-gray-600 scale-90 origin-left">理智 / 算力极限</span>
              </div>
           </div>

           <div className="hidden md:flex items-center gap-3 group">
              <div className="bg-yellow-600/20 p-2 rounded-full border border-yellow-500/30">
                 <Coins size={16} className="text-yellow-500" />
              </div>
              <div className="flex flex-col leading-none">
                 <span className="text-[9px] text-gray-500 uppercase tracking-wider mb-0.5">Vector Scalar</span>
                 <span className="font-bold text-lg text-white">{stats.lmd.toLocaleString()}</span>
                 <span className="text-[9px] text-gray-600 scale-90 origin-left">龙门币 / 标量</span>
              </div>
           </div>

           <div className="hidden md:flex items-center gap-3 group">
              <div className="bg-red-600/20 p-2 rounded-full border border-red-500/30">
                 <Zap size={16} className="text-red-500" />
              </div>
              <div className="flex flex-col leading-none">
                 <span className="text-[9px] text-gray-500 uppercase tracking-wider mb-0.5">Entropy Resource</span>
                 <span className="font-bold text-lg text-white">{stats.orundum}</span>
                 <span className="text-[9px] text-gray-600 scale-90 origin-left">合成玉 / 随机熵</span>
              </div>
           </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 relative overflow-hidden bg-[url('https://aistudio.google.com/test')] bg-cover">
        {/* Global Grid Overlay */}
        <div className="absolute inset-0 pointer-events-none z-0 opacity-10" 
             style={{
                 backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px)`,
                 backgroundSize: '40px 40px'
             }}>
        </div>
        {children}
      </main>
      
      {/* Background Decor Elements */}
      <div className="hidden md:flex fixed bottom-4 left-6 text-[10px] text-gray-600 font-mono pointer-events-none z-50 flex-col gap-1">
        <p className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span> SYSTEM: PRTS V3.0.1 Online</p>
        <p className="pl-3.5">CONN: SECURE (Rhodes Island Intranet)</p>
      </div>
    </div>
  );
};

export default Shell;
