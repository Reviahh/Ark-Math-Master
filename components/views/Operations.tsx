
import React, { useState, useRef, useEffect } from 'react';
import { SubjectType, OperationMission } from '../../types';
import { SUBJECT_DATA, MOCK_MISSIONS } from '../../constants';
import { Lock, Play, X, Info, ChevronRight } from 'lucide-react';

interface OperationsProps {
  onBack: () => void;
  onStartMission: (mission: OperationMission) => void;
}

const Operations: React.FC<OperationsProps> = ({ onBack, onStartMission }) => {
  const [selectedSubject, setSelectedSubject] = useState<SubjectType>(SubjectType.CALCULUS);
  const [selectedMission, setSelectedMission] = useState<OperationMission | null>(null);
  
  // Drag to scroll refs and state
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isDown, setIsDown] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const missions = MOCK_MISSIONS.filter(m => m.subject === selectedSubject);

  // Reset scroll when subject changes - using 'auto' for instant jump to avoid disorientation
  useEffect(() => {
    if (scrollRef.current) {
        scrollRef.current.scrollTo({ left: 0, behavior: 'auto' });
    }
  }, [selectedSubject]);

  // Drag Handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollRef.current) return;
    setIsDown(true);
    setIsDragging(false);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
  };

  const handleMouseLeave = () => {
    setIsDown(false);
    // Don't reset isDragging immediately here to prevent accidental clicks on exit
  };

  const handleMouseUp = () => {
    setIsDown(false);
    // Slight delay to reset dragging state so click handlers can check it
    setTimeout(() => setIsDragging(false), 50);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDown || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 1.5; // Drag multiplier
    
    // If moved significantly (more than 5px), consider it a drag to prevent accidental clicks
    if (Math.abs(walk) > 5) {
        setIsDragging(true);
    }
    
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMissionClick = (mission: OperationMission) => {
      // Prevent click if user was just dragging
      if (isDragging) return;
      setSelectedMission(mission);
  };

  return (
    <div className="flex h-full w-full relative bg-ark-bg font-sans overflow-hidden">
      {/* Left Subject Selector (Episode List) */}
      {/* Added shrink-0 to prevent sidebar from squishing when main content is wide */}
      <div className="w-20 md:w-80 bg-zinc-950 border-r border-zinc-800 flex flex-col z-20 shadow-[5px_0_30px_rgba(0,0,0,0.5)] shrink-0">
        <div className="p-0 md:p-6 bg-zinc-900 border-b border-zinc-800">
            <button onClick={onBack} className="w-full text-ark-subtext hover:text-white hover:bg-zinc-800 font-mono flex items-center justify-center md:justify-start gap-2 text-sm tracking-widest py-3 md:py-0 transition-all group">
               <span className="group-hover:-translate-x-1 transition-transform">&lt;</span> <span className="hidden md:inline">TERMINAL</span>
            </button>
            <div className="hidden md:block mt-6">
                <h1 className="text-4xl font-black italic text-white tracking-tighter">EPISODES</h1>
                <p className="text-xs text-ark-subtext tracking-[0.3em] mt-1">COURSE SELECTION</p>
            </div>
        </div>
        
        <div className="flex-1 overflow-y-auto custom-scrollbar">
            {Object.values(SubjectType).map((type, index) => {
            const info = SUBJECT_DATA[type];
            const Icon = info.icon;
            const isSelected = selectedSubject === type;
            return (
                <button
                key={type}
                onClick={() => { setSelectedSubject(type); setSelectedMission(null); }}
                className={`w-full relative h-24 md:h-32 transition-all duration-300 group overflow-hidden border-b border-zinc-800
                    ${isSelected ? 'bg-zinc-800' : 'bg-transparent hover:bg-zinc-900'}`}
                >
                    {/* Background Number */}
                    <div className={`absolute -right-4 -bottom-6 text-8xl font-black italic opacity-5 transition-opacity group-hover:opacity-10 ${isSelected ? 'opacity-20 text-white' : 'text-gray-500'}`}>
                        0{index + 1}
                    </div>

                    <div className="absolute inset-0 flex items-center px-4 md:px-8">
                        <div className={`w-12 h-12 flex items-center justify-center border-2 rotate-45 transition-all duration-500 mr-6
                            ${isSelected ? `border-${info.color.split('-')[1]}-500 bg-${info.color.split('-')[1]}-500/20 shadow-[0_0_15px_currentColor]` : 'border-zinc-700 text-zinc-600 group-hover:border-zinc-500'}`}>
                             <Icon className={`w-6 h-6 -rotate-45 ${isSelected ? 'text-white' : 'text-zinc-600 group-hover:text-zinc-400'}`} />
                        </div>
                        
                        <div className="hidden md:block text-left z-10">
                            <div className={`font-mono text-xs mb-1 tracking-widest ${isSelected ? 'text-ark-accent' : 'text-zinc-600'}`}>{info.code}</div>
                            <div className={`font-bold text-lg leading-none mb-1 ${isSelected ? 'text-white' : 'text-zinc-400 group-hover:text-zinc-200'}`}>{info.name}</div>
                            <div className="text-[10px] text-zinc-500 truncate w-40">{info.description.split('//')[0]}</div>
                        </div>
                    </div>
                    
                    {/* Active Indicator Bar */}
                    {isSelected && <div className="absolute left-0 top-0 bottom-0 w-1 bg-ark-yellow box-shadow-[0_0_10px_#FCD321]"></div>}
                </button>
            );
            })}
        </div>
      </div>

      {/* Main Stage Map / List Area */}
      <div className="flex-1 relative bg-[#121212] flex flex-col min-w-0">
          {/* Header */}
          <div className="h-32 w-full flex items-end justify-between p-8 md:p-12 relative overflow-hidden select-none shrink-0">
             <div className="absolute top-0 right-0 p-4 opacity-20">
                 <h2 className="text-9xl font-black text-white italic tracking-tighter">{SUBJECT_DATA[selectedSubject].code}</h2>
             </div>
             <div className="z-10 relative">
                 <div className="flex items-center gap-4 mb-2">
                     <span className={`px-2 py-0.5 text-xs font-bold text-black bg-white`}>CURRENT EPISODE</span>
                     <span className="h-px w-20 bg-zinc-700"></span>
                 </div>
                 <h2 className="text-4xl md:text-5xl font-black text-white italic drop-shadow-lg">{SUBJECT_DATA[selectedSubject].name}</h2>
                 <p className="text-ark-subtext mt-2 font-mono text-sm tracking-wider">{SUBJECT_DATA[selectedSubject].description}</p>
             </div>
          </div>

          {/* Stage Nodes (Visual List) */}
          <div 
             ref={scrollRef}
             className="flex-1 overflow-x-auto overflow-y-hidden whitespace-nowrap p-8 md:p-12 flex items-center gap-8 md:gap-16 custom-scrollbar cursor-grab active:cursor-grabbing select-none"
             onMouseDown={handleMouseDown}
             onMouseLeave={handleMouseLeave}
             onMouseUp={handleMouseUp}
             onMouseMove={handleMouseMove}
          >
               {/* Start Line */}
               <div className="h-0.5 bg-zinc-800 w-12 min-w-[3rem] relative">
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-1 bg-zinc-600 rounded-full"></div>
               </div>

               {missions.map((mission, idx) => (
                   <div key={mission.id} className="relative inline-block align-middle group">
                       {/* Connection Line */}
                       {idx < missions.length - 1 && (
                           <div className="absolute left-full top-1/2 w-8 md:w-16 h-0.5 bg-zinc-800 -z-10 flex items-center justify-center">
                              {/* Small dot in middle of line */}
                              <div className="w-1 h-1 bg-zinc-800 group-hover:bg-zinc-600 transition-colors rounded-full"></div>
                           </div>
                       )}
                       
                       <button 
                         onClick={() => handleMissionClick(mission)}
                         className={`relative w-48 h-32 md:w-64 md:h-40 border-2 transition-all duration-300 flex flex-col justify-between p-4 group-hover:-translate-y-2
                            ${selectedMission?.id === mission.id 
                                ? 'bg-zinc-800 border-ark-yellow shadow-[0_0_20px_rgba(252,211,33,0.2)]' 
                                : 'bg-black/60 border-zinc-700 hover:border-zinc-500 hover:bg-zinc-900'}`}
                       >
                           <div className="flex justify-between items-start">
                               <span className={`font-mono text-2xl font-black italic ${selectedMission?.id === mission.id ? 'text-ark-yellow' : 'text-zinc-600'}`}>
                                   {mission.code}
                               </span>
                               {mission.locked && <Lock className="w-4 h-4 text-zinc-600" />}
                           </div>
                           
                           <div className="whitespace-normal pointer-events-none">
                               <div className={`text-sm font-bold leading-tight mb-1 ${selectedMission?.id === mission.id ? 'text-white' : 'text-zinc-400'}`}>
                                   {mission.title}
                               </div>
                               <div className="text-[10px] text-zinc-600 leading-tight">
                                   {mission.subtitle}
                               </div>
                           </div>
                           
                           {/* Decorative Corner */}
                           <div className={`absolute bottom-0 right-0 w-0 h-0 border-b-[20px] border-r-[20px] 
                                ${selectedMission?.id === mission.id ? 'border-b-ark-yellow border-r-ark-yellow' : 'border-b-zinc-700 border-r-zinc-700'} 
                                border-t-[20px] border-t-transparent border-l-[20px] border-l-transparent opacity-50`}>
                           </div>
                       </button>
                   </div>
               ))}
               
               {/* End Line */}
               <div className="h-0.5 bg-zinc-800 w-24 min-w-[6rem] border-r-2 border-zinc-800 h-4 mt-[-6px] relative">
                  <ChevronRight className="absolute -right-3 -top-3 text-zinc-800 w-4 h-4" />
               </div>
          </div>
      </div>

      {/* Stage Detail Panel (Right Side) */}
      <div className={`absolute top-0 right-0 bottom-0 w-full md:w-[500px] bg-[#1a1a1a]/95 backdrop-blur-xl border-l border-zinc-700 shadow-2xl transition-transform duration-300 z-30 flex flex-col
            ${selectedMission ? 'translate-x-0' : 'translate-x-full'}`}>
            
            {selectedMission && (
                <>
                    {/* Panel Header */}
                    <div className="h-48 bg-zinc-900 relative p-8 flex flex-col justify-end overflow-hidden shrink-0">
                        <div className="absolute top-0 right-0 text-[10rem] font-black italic text-white/5 leading-none -mr-10 -mt-10 select-none">
                            {selectedMission.code}
                        </div>
                        <button onClick={() => setSelectedMission(null)} className="absolute top-6 right-6 text-zinc-500 hover:text-white transition-colors">
                            <X size={24} />
                        </button>
                        
                        <div className="relative z-10">
                            <div className="flex items-center gap-3 mb-2">
                                <span className="px-2 py-0.5 bg-ark-yellow text-black text-xs font-bold tracking-wider">OPERATION</span>
                                <span className="text-zinc-500 font-mono text-xs">DIFFICULTY: {selectedMission.difficulty}/3</span>
                            </div>
                            <h2 className="text-3xl font-bold text-white mb-1">{selectedMission.title}</h2>
                            <p className="text-ark-subtext text-sm">{selectedMission.subtitle}</p>
                        </div>
                        
                        {/* Striped Bar */}
                        <div className="absolute bottom-0 left-0 right-0 h-1 bg-stripes-white opacity-20"></div>
                    </div>

                    {/* Briefing Content */}
                    <div className="flex-1 p-8 overflow-y-auto">
                        <div className="mb-6">
                            <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-3 flex items-center gap-2">
                                <Info size={12} /> Mission Briefing
                            </h3>
                            <div className="bg-black/30 border border-zinc-800 p-4 text-sm text-gray-300 leading-relaxed font-mono">
                                {selectedMission.description}
                            </div>
                        </div>

                        {/* Rewards Grid */}
                        <div className="mb-6">
                             <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-3">Likely Drops</h3>
                             <div className="flex gap-4">
                                {selectedMission.rewards.map((reward, i) => (
                                    <div key={i} className="w-16 h-16 bg-zinc-800 border border-zinc-700 flex flex-col items-center justify-center relative group cursor-pointer hover:border-gray-500 hover:bg-zinc-700 transition-all">
                                        <div className={`w-8 h-8 rounded-full mb-1 shadow-lg ${i === 0 ? 'bg-yellow-600 shadow-yellow-500/20' : 'bg-blue-600 shadow-blue-500/20'}`}></div>
                                        <span className="text-[9px] text-gray-400 text-center leading-none px-1">{reward}</span>
                                        {/* Rarity Stripe */}
                                        <div className={`absolute bottom-0 left-0 right-0 h-0.5 ${i===0?'bg-yellow-500':'bg-blue-400'}`}></div>
                                    </div>
                                ))}
                             </div>
                        </div>

                        {/* Cost Info */}
                        <div className="flex items-center justify-between bg-zinc-900 p-4 border border-zinc-800 rounded-sm">
                            <div className="flex flex-col">
                                <span className="text-[10px] text-zinc-500 uppercase tracking-wider">Required Sanity</span>
                                <span className="text-white text-sm">理智消耗</span>
                            </div>
                            <span className="text-2xl font-black font-mono text-white">
                                -{selectedMission.cost}
                            </span>
                        </div>
                    </div>

                    {/* Footer Actions */}
                    <div className="p-8 border-t border-zinc-800 bg-zinc-900/50 shrink-0">
                        <button 
                            onClick={() => onStartMission(selectedMission)}
                            className="w-full h-16 bg-ark-accent hover:bg-white text-black font-black text-xl italic tracking-widest flex items-center justify-center gap-4 transition-all hover:shadow-[0_0_20px_rgba(255,255,255,0.4)] relative overflow-hidden group"
                        >
                            <span className="relative z-10 flex items-center gap-3">
                                START OPERATION <Play className="fill-current" />
                            </span>
                            {/* Hover slide effect */}
                            <div className="absolute inset-0 bg-white transform translate-x-full group-hover:translate-x-0 transition-transform duration-200 z-0"></div>
                        </button>
                        
                        <div className="flex justify-between mt-4 text-[10px] text-zinc-600 font-mono">
                            <span>PRTS V3.0 SYSTEM READY</span>
                            <span>AUTO-DEPLOY: OFF</span>
                        </div>
                    </div>
                </>
            )}
      </div>

      <style>{`
        .bg-stripes-white {
            background-image: linear-gradient(45deg, rgba(255,255,255,.15) 25%, transparent 25%, transparent 50%, rgba(255,255,255,.15) 50%, rgba(255,255,255,.15) 75%, transparent 75%, transparent);
            background-size: 1rem 1rem;
        }
        .custom-scrollbar::-webkit-scrollbar {
            height: 4px;
            width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
            background: #121212;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
            background: #333;
        }
      `}</style>
    </div>
  );
};

export default Operations;
