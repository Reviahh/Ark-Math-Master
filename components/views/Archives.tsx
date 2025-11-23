
import React, { useState } from 'react';
import { SubjectType, OperationMission } from '../../types';
import { SUBJECT_DATA, MOCK_MISSIONS } from '../../constants';
import { Search, FolderOpen, FileText, X, ArrowUpRight, Clock, Database, Network } from 'lucide-react';

interface ArchivesProps {
  onBack: () => void;
}

const Archives: React.FC<ArchivesProps> = ({ onBack }) => {
  const [filter, setFilter] = useState<SubjectType | 'ALL'>('ALL');
  const [viewingFile, setViewingFile] = useState<OperationMission | null>(null);

  const filteredMissions = filter === 'ALL' 
    ? MOCK_MISSIONS 
    : MOCK_MISSIONS.filter(m => m.subject === filter);

  // Get a few "recent" missions for the top bar (mock logic: take last 3)
  const recentMissions = MOCK_MISSIONS.slice(0, 3);

  return (
    <div className="flex flex-col h-full w-full bg-zinc-950 text-gray-200 relative animate-fadeIn overflow-hidden">
      {/* Complex Background Network */}
      <div className="absolute inset-0 z-0 opacity-10 pointer-events-none">
          <svg className="w-full h-full">
            <pattern id="grid" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5"/>
            </pattern>
            <rect width="100%" height="100%" fill="url(#grid)" />
            {/* Random Nodes */}
            <circle cx="10%" cy="20%" r="2" fill="currentColor" />
            <circle cx="50%" cy="50%" r="2" fill="currentColor" />
            <circle cx="80%" cy="30%" r="2" fill="currentColor" />
            <path d="M 10% 20% L 50% 50% L 80% 30%" stroke="currentColor" strokeWidth="0.5" fill="none" />
          </svg>
      </div>

      {/* Header */}
      <div className="h-14 md:h-16 border-b border-zinc-800 bg-zinc-900/80 backdrop-blur flex items-center justify-between px-4 md:px-6 z-20 shrink-0">
         <div className="flex items-center gap-4">
             <button onClick={onBack} className="flex items-center gap-2 text-ark-subtext hover:text-white transition-colors text-xs md:text-sm font-mono tracking-wider group">
                <span className="group-hover:-translate-x-1 transition-transform">&lt;</span> <span className="hidden md:inline">BACK</span>
             </button>
             <div className="h-4 md:h-6 w-px bg-zinc-700"></div>
             <h1 className="text-lg md:text-xl font-bold tracking-widest text-white flex items-center gap-2">
                <FolderOpen className="text-ark-yellow" size={18} />
                ARCHIVES <span className="text-[10px] md:text-xs text-zinc-500 font-normal mt-1 hidden md:inline">INTELLIGENCE DATABASE</span>
             </h1>
         </div>
         <div className="flex items-center gap-2 bg-black/50 border border-zinc-700 rounded-sm px-3 py-1.5 w-32 md:w-64 focus-within:border-ark-accent transition-colors">
             <Search size={14} className="text-zinc-500" />
             <input placeholder="Search records..." className="bg-transparent border-none outline-none text-xs w-full text-white placeholder-zinc-600 font-mono" />
         </div>
      </div>

      <div className="flex flex-col md:flex-row flex-1 overflow-hidden relative z-10">
          {/* Responsive Sidebar Filters */}
          <div className="w-full md:w-64 border-b md:border-b-0 md:border-r border-zinc-800 bg-zinc-900/50 flex flex-row md:flex-col p-2 md:p-4 gap-2 overflow-x-auto md:overflow-y-auto shrink-0 no-scrollbar">
             <div className="text-[10px] md:text-xs font-bold text-zinc-500 mb-0 md:mb-2 px-2 md:px-4 uppercase tracking-wider flex items-center md:block whitespace-nowrap">
                <span className="md:hidden mr-2">FILTERS:</span> <span className="hidden md:inline">Categories</span>
             </div>
             
             <button 
                onClick={() => setFilter('ALL')}
                className={`text-left px-3 py-2 md:px-4 md:py-3 text-xs md:text-sm font-mono border-b-2 md:border-b-0 md:border-l-2 transition-all flex justify-between items-center group relative overflow-hidden shrink-0 whitespace-nowrap
                ${filter === 'ALL' ? 'border-ark-accent bg-zinc-800 text-white' : 'border-transparent text-gray-500 hover:text-gray-300 hover:bg-zinc-800/50'}`}
             >
                <span className="relative z-10">ALL RECORDS</span>
                <span className="text-[10px] md:text-xs opacity-50 relative z-10 ml-2 md:ml-0">{MOCK_MISSIONS.length}</span>
                {filter === 'ALL' && <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-12 translate-x-[-100%] animate-shine" />}
             </button>
             
             <div className="hidden md:block h-px bg-zinc-800 my-2"></div>

             {Object.values(SubjectType).map(type => (
                 <button 
                    key={type}
                    onClick={() => setFilter(type)}
                    className={`text-left px-3 py-2 md:px-4 md:py-3 text-xs md:text-sm font-mono border-b-2 md:border-b-0 md:border-l-2 transition-all flex justify-between items-center group shrink-0 whitespace-nowrap
                    ${filter === type ? `border-${SUBJECT_DATA[type].color.split('-')[1]}-500 bg-zinc-800 text-white` : 'border-transparent text-gray-500 hover:text-gray-300 hover:bg-zinc-800/50'}`}
                 >
                    <span>{SUBJECT_DATA[type].name}</span>
                    <span className="text-[10px] md:text-xs opacity-50 ml-2 md:ml-0">{MOCK_MISSIONS.filter(m => m.subject === type).length}</span>
                 </button>
             ))}
             
             <div className="hidden md:block mt-auto p-4 border border-zinc-800 bg-black/40">
                <div className="flex items-center gap-2 text-xs text-zinc-500 mb-2">
                   <Network size={12} /> NETWORK STATUS
                </div>
                <div className="text-xs text-green-500 font-mono">CONNECTED</div>
                <div className="w-full bg-zinc-800 h-1 mt-2">
                   <div className="bg-green-500 h-full w-[80%] animate-pulse"></div>
                </div>
             </div>
          </div>

          {/* Main Grid */}
          <div className="flex-1 overflow-y-auto custom-scrollbar flex flex-col">
              
              {/* Recently Accessed Section */}
              <div className="p-4 md:p-8 pb-0">
                  <h2 className="text-xs font-bold text-ark-yellow uppercase tracking-widest mb-4 flex items-center gap-2">
                      <Clock size={12} /> Recently Decrypted
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {recentMissions.map(mission => (
                          <button 
                             key={`recent-${mission.id}`}
                             onClick={() => setViewingFile(mission)}
                             className="flex items-center gap-4 bg-zinc-900/80 border border-zinc-800 p-3 hover:border-gray-500 transition-colors group text-left"
                          >
                             <div className="w-10 h-10 bg-zinc-800 flex items-center justify-center font-mono text-xs text-zinc-500 group-hover:text-white group-hover:bg-ark-accent/20 transition-colors shrink-0">
                                 {mission.code}
                             </div>
                             <div className="flex-1 min-w-0">
                                 <div className="text-sm font-bold text-white truncate">{mission.title}</div>
                                 <div className="text-[10px] text-zinc-500 truncate">{new Date().toLocaleDateString()}</div>
                             </div>
                          </button>
                      ))}
                  </div>
              </div>
              
              <div className="h-px bg-zinc-800 mx-4 md:mx-8 my-6 md:my-8"></div>

              {/* All Files Grid */}
              <div className="p-4 md:p-8 pt-0">
                   <h2 className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-4 flex items-center gap-2">
                      <Database size={12} /> Data Files
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 pb-12">
                      {filteredMissions.map((mission) => (
                          <div 
                            key={mission.id}
                            onClick={() => setViewingFile(mission)}
                            className="bg-black/40 border border-zinc-800 hover:border-ark-yellow hover:bg-zinc-900 transition-all cursor-pointer p-4 group relative overflow-hidden flex flex-col h-32 md:h-40"
                          >
                             <div className="flex justify-between items-start mb-2 md:mb-4">
                                 <FileText className="text-zinc-600 group-hover:text-ark-yellow transition-colors w-5 h-5 md:w-6 md:h-6" />
                                 <span className="font-mono text-[10px] md:text-xs text-zinc-600 border border-zinc-800 px-1 rounded">{mission.code}</span>
                             </div>
                             <h3 className="font-bold text-sm md:text-base text-white mb-1 group-hover:text-ark-accent transition-colors truncate">{mission.title}</h3>
                             <p className="text-[10px] md:text-xs text-gray-500 line-clamp-2">{mission.subtitle}</p>
                             
                             <div className="mt-auto pt-4 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity">
                                <span className="text-[10px] text-ark-yellow font-mono hidden md:inline">ACCESS GRANTED</span>
                                <ArrowUpRight size={16} className="text-ark-yellow ml-auto" />
                             </div>
                             
                             {/* Corner Accent */}
                             <div className="absolute top-0 right-0 w-8 h-8 bg-gradient-to-bl from-white/5 to-transparent"></div>
                          </div>
                      ))}
                  </div>
              </div>
          </div>
      </div>

      {/* File Detail Modal Overlay */}
      {viewingFile && (
          <div className="absolute inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-0 md:p-12 animate-fadeIn">
              <div className="bg-zinc-900 w-full h-full md:h-auto md:max-h-[90vh] md:max-w-4xl border-0 md:border border-zinc-700 shadow-2xl flex flex-col relative animate-slideUp">
                  {/* Modal Header */}
                  <div className="flex justify-between items-center p-4 md:p-6 border-b border-zinc-800 bg-zinc-950 shrink-0">
                      <div className="flex items-center gap-3 md:gap-4">
                          <div className="p-1.5 md:p-2 bg-ark-yellow text-black font-bold font-mono text-sm md:text-base">{viewingFile.code}</div>
                          <div className="min-w-0">
                              <h2 className="text-lg md:text-xl font-bold text-white leading-none truncate">{viewingFile.title}</h2>
                              <p className="text-[10px] md:text-xs text-gray-500 font-mono mt-1 truncate">CLASSIFIED // {SUBJECT_DATA[viewingFile.subject].name}</p>
                          </div>
                      </div>
                      <button onClick={() => setViewingFile(null)} className="p-2 hover:bg-zinc-800 rounded-full text-gray-400 hover:text-white transition-colors">
                          <X size={24} />
                      </button>
                  </div>

                  {/* Modal Body */}
                  <div className="flex-1 overflow-y-auto p-6 md:p-8 custom-scrollbar bg-[#181818]">
                      <div className="prose prose-invert prose-sm max-w-none">
                           {/* Reusing the HTML content structure from constants */}
                           <div dangerouslySetInnerHTML={{ __html: viewingFile.longDescription }} />
                      </div>
                      
                      <div className="mt-8 pt-8 border-t border-zinc-800 flex justify-between items-center text-[10px] md:text-xs text-gray-500 font-mono">
                          <span>UPDATED: {new Date().toLocaleDateString()}</span>
                          <span className="flex items-center gap-2"><div className="w-2 h-2 bg-green-500 rounded-full"></div> PRTS VERIFIED</span>
                      </div>
                  </div>
              </div>
          </div>
      )}
      
      <style>{`
        @keyframes shine {
            0% { transform: translateX(-100%) skewX(12deg); }
            100% { transform: translateX(200%) skewX(12deg); }
        }
        .animate-shine {
            animation: shine 2s infinite;
        }
        .animate-slideUp {
            animation: slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }
        @keyframes slideUp {
            from { transform: translateY(20px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
        }
        /* Hide scrollbar for Chrome, Safari and Opera */
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        /* Hide scrollbar for IE, Edge and Firefox */
        .no-scrollbar {
          -ms-overflow-style: none;  /* IE and Edge */
          scrollbar-width: none;  /* Firefox */
        }
      `}</style>
    </div>
  );
};

export default Archives;
