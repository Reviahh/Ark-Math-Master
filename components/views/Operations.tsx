
import React, { useState, useRef, useEffect } from 'react';
import { SubjectType, OperationMission } from '../../types';
import { SUBJECT_DATA, MOCK_MISSIONS } from '../../constants';
import { Lock, Play, X, Info, BrainCircuit } from 'lucide-react';

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

  // Constants for Neural Map Layout
  const CARD_WIDTH = 250; 
  const CARD_HEIGHT = 150;
  const GAP_X = 140; // Increased horizontal space
  const VERTICAL_AMPLITUDE = 160; // How much they go up and down
  
  // Calculate positions for each mission to create the "Network/Neural" look
  const getMissionPosition = (index: number) => {
    // Generate a more organic, neuron-like path
    // [0, -1, 1, -0.5, 0.5 ...] pattern variation
    // Using sine + index to create a flow
    const wavePatterns = [0, -0.8, 0.6, -0.9, 0.2, -0.5, 0.9];
    const waveFactor = wavePatterns[index % wavePatterns.length];
    
    // Add some random-looking but deterministic offset based on index
    const randomOffset = ((index * 13) % 5) * 10;

    const x = 100 + index * (CARD_WIDTH + GAP_X); // Initial padding left
    const yBase = 200; // Middle of the container roughly
    const y = yBase + (waveFactor * VERTICAL_AMPLITUDE) + randomOffset;
    
    return { x, y };
  };

  // Reset scroll when subject changes
  useEffect(() => {
    if (scrollRef.current) {
        scrollRef.current.scrollTo({ left: 0, behavior: 'instant' });
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
  };

  const handleMouseUp = () => {
    setIsDown(false);
    setTimeout(() => setIsDragging(false), 50);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDown || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 1.5; 
    
    if (Math.abs(walk) > 5) {
        setIsDragging(true);
    }
    
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMissionClick = (mission: OperationMission) => {
      if (isDragging) return;
      setSelectedMission(mission);
  };

  // Calculate total width needed for the scroll container
  const totalWidth = Math.max(
      window.innerWidth, 
      missions.length * (CARD_WIDTH + GAP_X) + 600
  );

  return (
    <div className="flex h-full w-full relative bg-ark-bg font-sans overflow-hidden">
      {/* Left Subject Selector */}
      <div className="w-16 md:w-80 bg-zinc-950 border-r border-zinc-800 flex flex-col z-20 shadow-[5px_0_30px_rgba(0,0,0,0.5)] shrink-0 transition-all duration-300">
        <div className="p-0 md:p-6 bg-zinc-900 border-b border-zinc-800">
            <button onClick={onBack} className="w-full text-ark-subtext hover:text-white hover:bg-zinc-800 font-mono flex items-center justify-center md:justify-start gap-2 text-sm tracking-widest py-4 md:py-0 transition-all group">
               <span className="group-hover:-translate-x-1 transition-transform">&lt;</span> <span className="hidden md:inline">TERMINAL</span>
            </button>
            <div className="hidden md:block mt-6">
                <h1 className="text-4xl font-black italic text-white tracking-tighter">EPISODES</h1>
                <p className="text-xs text-ark-subtext tracking-[0.3em] mt-1">NEURAL SELECTION</p>
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
                className={`w-full relative h-20 md:h-32 transition-all duration-300 group overflow-hidden border-b border-zinc-800
                    ${isSelected ? 'bg-zinc-800' : 'bg-transparent hover:bg-zinc-900'}`}
                >
                    <div className={`absolute -right-4 -bottom-6 text-8xl font-black italic opacity-5 transition-opacity group-hover:opacity-10 ${isSelected ? 'opacity-20 text-white' : 'text-gray-500'} hidden md:block`}>
                        0{index + 1}
                    </div>

                    <div className="absolute inset-0 flex items-center justify-center md:justify-start px-0 md:px-8">
                        <div className={`w-10 h-10 md:w-12 md:h-12 flex items-center justify-center border-2 rotate-45 transition-all duration-500 md:mr-6
                            ${isSelected ? `border-${info.color.split('-')[1]}-500 bg-${info.color.split('-')[1]}-500/20 shadow-[0_0_15px_currentColor]` : 'border-zinc-700 text-zinc-600 group-hover:border-zinc-500'}`}>
                             <Icon className={`w-5 h-5 md:w-6 md:h-6 -rotate-45 ${isSelected ? 'text-white' : 'text-zinc-600 group-hover:text-zinc-400'}`} />
                        </div>
                        
                        <div className="hidden md:block text-left z-10">
                            <div className={`font-mono text-xs mb-1 tracking-widest ${isSelected ? 'text-ark-accent' : 'text-zinc-600'}`}>{info.code}</div>
                            <div className={`font-bold text-lg leading-none mb-1 ${isSelected ? 'text-white' : 'text-zinc-400 group-hover:text-zinc-200'}`}>{info.name}</div>
                            <div className="text-[10px] text-zinc-500 truncate w-40">{info.description.split('//')[0]}</div>
                        </div>
                    </div>
                    {isSelected && <div className="absolute left-0 top-0 bottom-0 w-1 bg-ark-yellow box-shadow-[0_0_10px_#FCD321]"></div>}
                </button>
            );
            })}
        </div>
      </div>

      {/* Main Stage Map / List Area */}
      <div className="flex-1 relative bg-[#0a0a0a] flex flex-col min-w-0">
          {/* Header */}
          <div className="h-24 md:h-32 w-full flex items-end justify-between p-6 md:p-12 relative overflow-hidden select-none shrink-0 z-10 pointer-events-none">
             <div className="absolute top-0 right-0 p-4 opacity-10">
                 <h2 className="text-6xl md:text-9xl font-black text-white italic tracking-tighter">{SUBJECT_DATA[selectedSubject].code}</h2>
             </div>
             <div className="z-10 relative pointer-events-auto">
                 <div className="flex items-center gap-4 mb-2">
                     <span className={`px-2 py-0.5 text-[10px] md:text-xs font-bold text-black bg-white`}>CURRENT EPISODE</span>
                     <span className="h-px w-10 md:w-20 bg-zinc-700"></span>
                 </div>
                 <h2 className="text-3xl md:text-5xl font-black text-white italic drop-shadow-lg">{SUBJECT_DATA[selectedSubject].name}</h2>
                 <p className="text-ark-subtext mt-2 font-mono text-xs md:text-sm tracking-wider">{SUBJECT_DATA[selectedSubject].description}</p>
             </div>
          </div>

          {/* Neural Network Map */}
          <div 
             ref={scrollRef}
             className="flex-1 overflow-x-auto overflow-y-hidden relative custom-scrollbar cursor-grab active:cursor-grabbing select-none"
             onMouseDown={handleMouseDown}
             onMouseLeave={handleMouseLeave}
             onMouseUp={handleMouseUp}
             onMouseMove={handleMouseMove}
          >
               <div style={{ width: `${totalWidth}px`, height: '100%' }} className="relative">
                   
                   {/* Background Elements - Organic Neural Web */}
                   <div className="absolute inset-0 pointer-events-none opacity-20">
                      <div className="absolute top-1/2 left-1/4 w-[500px] h-[500px] bg-blue-900/10 rounded-full blur-[100px]"></div>
                      <div className="absolute top-1/3 right-1/4 w-[300px] h-[300px] bg-purple-900/10 rounded-full blur-[80px]"></div>
                   </div>

                   {/* SVG Connection Layer */}
                   <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
                        <defs>
                            <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" stopColor="#333" stopOpacity="0.2" />
                                <stop offset="50%" stopColor="#FCD321" stopOpacity="0.5" />
                                <stop offset="100%" stopColor="#333" stopOpacity="0.2" />
                            </linearGradient>
                        </defs>
                        {missions.map((mission, idx) => {
                            if (idx === missions.length - 1) return null;
                            const start = getMissionPosition(idx);
                            const end = getMissionPosition(idx + 1);
                            
                            // Calculate center points of the cards
                            const startX = start.x + CARD_WIDTH / 2;
                            const startY = start.y + CARD_HEIGHT / 2;
                            const endX = end.x + CARD_WIDTH / 2;
                            const endY = end.y + CARD_HEIGHT / 2;

                            // Bezier Curve Control Points for organic look
                            const cp1X = startX + (endX - startX) / 2;
                            const cp1Y = startY;
                            const cp2X = startX + (endX - startX) / 2;
                            const cp2Y = endY;

                            return (
                                <g key={`line-${mission.id}`}>
                                    {/* Organic Curved Line */}
                                    <path 
                                        d={`M ${startX} ${startY} C ${cp1X} ${cp1Y}, ${cp2X} ${cp2Y}, ${endX} ${endY}`}
                                        stroke="url(#lineGradient)" 
                                        strokeWidth="2" 
                                        fill="none"
                                        strokeDasharray="4,4"
                                    />
                                    {/* Animated Nerve Impulse */}
                                    <circle r="4" fill="#FCD321" filter="drop-shadow(0 0 5px #FCD321)">
                                        <animateMotion 
                                            dur="4s" 
                                            repeatCount="indefinite"
                                            path={`M ${startX} ${startY} C ${cp1X} ${cp1Y}, ${cp2X} ${cp2Y}, ${endX} ${endY}`}
                                            calcMode="spline"
                                            keySplines="0.4 0 0.2 1"
                                        />
                                    </circle>
                                </g>
                            );
                        })}
                   </svg>
                   
                   {/* Floating Background Brain Icon for Atmosphere */}
                   <BrainCircuit className="absolute top-[20%] left-[5%] w-96 h-96 text-zinc-900/50 pointer-events-none -z-10 animate-pulse" style={{animationDuration: '10s'}}/>

                   {/* Node Render Loop */}
                   {missions.map((mission, idx) => {
                       const pos = getMissionPosition(idx);
                       const isSelected = selectedMission?.id === mission.id;
                       
                       return (
                           <div 
                                key={mission.id}
                                style={{
                                    position: 'absolute',
                                    left: `${pos.x}px`,
                                    top: `${pos.y}px`,
                                    width: `${CARD_WIDTH}px`,
                                    height: `${CARD_HEIGHT}px`
                                }}
                                className="group"
                           >
                                {/* The Card Button */}
                                <button 
                                    onClick={() => handleMissionClick(mission)}
                                    className={`w-full h-full relative border-2 transition-all duration-300 flex flex-col justify-between p-4
                                        ${isSelected 
                                            ? 'bg-zinc-800 border-ark-yellow shadow-[0_0_30px_rgba(252,211,33,0.3)] scale-105 z-20' 
                                            : 'bg-black/80 border-zinc-700 hover:border-zinc-500 hover:bg-zinc-900 z-10'}`}
                                >
                                    <div className="flex justify-between items-start">
                                        <span className={`font-mono text-2xl font-black italic ${isSelected ? 'text-ark-yellow' : 'text-zinc-600'}`}>
                                            {mission.code}
                                        </span>
                                        {mission.locked && <Lock className="w-4 h-4 text-zinc-600" />}
                                    </div>
                                    
                                    <div className="whitespace-normal pointer-events-none text-left">
                                        <div className={`text-sm font-bold leading-tight mb-1 ${isSelected ? 'text-white' : 'text-zinc-400'}`}>
                                            {mission.title}
                                        </div>
                                        <div className="text-[10px] text-zinc-600 leading-tight">
                                            {mission.subtitle}
                                        </div>
                                    </div>
                                    
                                    {/* Tech decoration corner */}
                                    <div className={`absolute bottom-0 right-0 w-0 h-0 border-b-[20px] border-r-[20px] 
                                            ${isSelected ? 'border-b-ark-yellow border-r-ark-yellow' : 'border-b-zinc-700 border-r-zinc-700'} 
                                            border-t-[20px] border-t-transparent border-l-[20px] border-l-transparent opacity-50`}>
                                    </div>

                                    {/* Connecting Dot Node (Visual anchor for lines) */}
                                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-zinc-900 border border-zinc-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                </button>
                                
                                {/* Node Index Number floating near it */}
                                <div className="absolute -top-6 left-0 font-mono text-[10px] text-zinc-600 tracking-widest opacity-50">
                                    SYNAPSE_NODE_0{idx + 1}
                                </div>
                           </div>
                       );
                   })}
                   
                   {/* Start Marker */}
                   <div className="absolute top-[200px] left-12 flex items-center gap-2">
                        <div className="w-3 h-3 bg-ark-accent rounded-full animate-pulse"></div>
                        <span className="text-xs font-mono text-ark-accent tracking-widest">ORIGIN</span>
                   </div>
               </div>
          </div>
      </div>

      {/* Stage Detail Panel (Right Side) */}
      <div className={`absolute top-0 right-0 bottom-0 w-full md:w-[500px] bg-[#1a1a1a]/95 backdrop-blur-xl border-l border-zinc-700 shadow-2xl transition-transform duration-300 z-30 flex flex-col
            ${selectedMission ? 'translate-x-0' : 'translate-x-full'}`}>
            
            {selectedMission && (
                <>
                    {/* Panel Header */}
                    <div className="h-40 md:h-48 bg-zinc-900 relative p-6 md:p-8 flex flex-col justify-end overflow-hidden shrink-0">
                        <div className="absolute top-0 right-0 text-8xl md:text-[10rem] font-black italic text-white/5 leading-none -mr-4 md:-mr-10 -mt-4 md:-mt-10 select-none">
                            {selectedMission.code}
                        </div>
                        <button onClick={() => setSelectedMission(null)} className="absolute top-4 right-4 md:top-6 md:right-6 text-zinc-500 hover:text-white transition-colors">
                            <X size={24} />
                        </button>
                        
                        <div className="relative z-10">
                            <div className="flex items-center gap-3 mb-2">
                                <span className="px-2 py-0.5 bg-ark-yellow text-black text-[10px] md:text-xs font-bold tracking-wider">OPERATION</span>
                                <span className="text-zinc-500 font-mono text-[10px] md:text-xs">DIFFICULTY: {selectedMission.difficulty}/5</span>
                            </div>
                            <h2 className="text-2xl md:text-3xl font-bold text-white mb-1">{selectedMission.title}</h2>
                            <p className="text-ark-subtext text-xs md:text-sm">{selectedMission.subtitle}</p>
                        </div>
                        
                        {/* Striped Bar */}
                        <div className="absolute bottom-0 left-0 right-0 h-1 bg-stripes-white opacity-20"></div>
                    </div>

                    {/* Briefing Content */}
                    <div className="flex-1 p-6 md:p-8 overflow-y-auto">
                        <div className="mb-6">
                            <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-3 flex items-center gap-2">
                                <Info size={12} /> Mission Briefing
                            </h3>
                            <div className="bg-black/30 border border-zinc-800 p-4 text-xs md:text-sm text-gray-300 leading-relaxed font-mono">
                                {selectedMission.description}
                            </div>
                        </div>

                        {/* Rewards Grid */}
                        <div className="mb-6">
                             <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-3">Likely Drops</h3>
                             <div className="flex gap-4">
                                {selectedMission.rewards.map((reward, i) => (
                                    <div key={i} className="w-14 h-14 md:w-16 md:h-16 bg-zinc-800 border border-zinc-700 flex flex-col items-center justify-center relative group cursor-pointer hover:border-gray-500 hover:bg-zinc-700 transition-all">
                                        <div className={`w-6 h-6 md:w-8 md:h-8 rounded-full mb-1 shadow-lg ${i === 0 ? 'bg-yellow-600 shadow-yellow-500/20' : 'bg-blue-600 shadow-blue-500/20'}`}></div>
                                        <span className="text-[8px] md:text-[9px] text-gray-400 text-center leading-none px-1">{reward}</span>
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
                    <div className="p-6 md:p-8 border-t border-zinc-800 bg-zinc-900/50 shrink-0">
                        <button 
                            onClick={() => onStartMission(selectedMission)}
                            className="w-full h-14 md:h-16 bg-ark-accent hover:bg-white text-black font-black text-lg md:text-xl italic tracking-widest flex items-center justify-center gap-4 transition-all hover:shadow-[0_0_20px_rgba(255,255,255,0.4)] relative overflow-hidden group"
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
