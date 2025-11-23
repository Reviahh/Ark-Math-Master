
import React, { useState } from 'react';
import { OperationMission } from '../../types';
import { ChevronLeft, Share2, Printer, Terminal, Check } from 'lucide-react';
import PRTSConsole from './PRTSConsole';

interface MissionControlProps {
  mission: OperationMission;
  onExit: () => void;
}

const MissionControl: React.FC<MissionControlProps> = ({ mission, onExit }) => {
  const [showTerminal, setShowTerminal] = useState(false);
  const [shareStatus, setShareStatus] = useState<'idle' | 'copied'>('idle');

  const handlePrint = () => {
    window.print();
  };

  const handleShare = async () => {
    const shareData = {
        title: `Rhodes Math: ${mission.code}`,
        text: `Check out this tactical math briefing on ${mission.title}: ${mission.subtitle}`,
        url: window.location.href
    };

    if (navigator.share) {
        try {
            await navigator.share(shareData);
        } catch (err) {
            console.log('Share canceled');
        }
    } else {
        // Fallback to clipboard
        try {
            await navigator.clipboard.writeText(`${shareData.text}\n${shareData.url}`);
            setShareStatus('copied');
            setTimeout(() => setShareStatus('idle'), 2000);
        } catch (err) {
            console.error('Failed to copy');
        }
    }
  };

  return (
    <div className="h-full w-full flex flex-col bg-zinc-950 text-gray-200 relative overflow-hidden print:overflow-visible print:h-auto print:bg-white print:text-black">
      {/* Background Decor (Screen Only) */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-20 bg-[url('https://www.transparenttextures.com/patterns/dark-matter.png')] print:hidden"></div>
      
      {/* Top Bar (Screen Only) */}
      <div className="h-14 bg-zinc-900 border-b border-zinc-700 flex items-center justify-between px-6 z-20 shrink-0 shadow-md print:hidden">
         <div className="flex items-center gap-4">
            <button onClick={onExit} className="flex items-center gap-2 text-sm font-mono text-gray-400 hover:text-white transition-colors">
                <ChevronLeft size={16} /> EXIT RECORD
            </button>
            <div className="h-6 w-px bg-zinc-700"></div>
            <span className="font-mono text-ark-yellow font-bold">{mission.code}</span>
            <span className="text-sm text-gray-300 truncate hidden md:inline">{mission.title}</span>
         </div>
         <div className="flex items-center gap-4 text-xs font-mono text-gray-500">
            <span className="hidden md:inline">ENCRYPTED // RHODES ISLAND ARCHIVE</span>
            <div className="flex gap-2">
                <button 
                    onClick={handleShare}
                    className="p-2 hover:bg-zinc-800 rounded text-gray-400 hover:text-white transition-colors flex items-center gap-2"
                    title="Share Record"
                >
                    {shareStatus === 'copied' ? <Check size={16} className="text-green-500" /> : <Share2 size={16} />}
                </button>
                <button 
                    onClick={handlePrint}
                    className="p-2 hover:bg-zinc-800 rounded text-gray-400 hover:text-white transition-colors"
                    title="Print / Save PDF"
                >
                    <Printer size={16} />
                </button>
            </div>
         </div>
      </div>

      <div className="flex-1 flex overflow-hidden relative z-10 print:overflow-visible print:block">
          {/* Main Content (The "Paper" / File) */}
          <div className="flex-1 overflow-y-auto custom-scrollbar p-0 md:p-8 flex justify-center print:overflow-visible print:p-0 print:block">
             <div className="w-full max-w-4xl bg-[#181818] min-h-full border-x border-zinc-800 shadow-2xl relative print:bg-white print:border-none print:shadow-none print:text-black">
                {/* Paper Texture Overlay (Screen Only) */}
                <div className="absolute inset-0 pointer-events-none opacity-5 bg-[url('https://www.transparenttextures.com/patterns/graphy-dark.png')] print:hidden"></div>
                
                {/* Header Section */}
                <div className="p-8 md:p-12 border-b-2 border-zinc-800 pb-8 relative overflow-hidden print:border-black print:pb-4">
                    <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none print:opacity-20">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Rhodes_Island_logo.svg/1200px-Rhodes_Island_logo.svg.png" className="w-64 grayscale" alt="" />
                    </div>
                    
                    <div className="flex justify-between items-start relative z-10">
                        <div>
                            <div className="inline-block px-2 py-1 bg-white text-black text-xs font-black tracking-widest mb-4 print:border print:border-black">CONFIDENTIAL</div>
                            <h1 className="text-3xl md:text-5xl font-bold text-white mb-2 leading-tight print:text-black">{mission.title}</h1>
                            <p className="text-lg text-ark-subtext font-light print:text-gray-600">{mission.subtitle}</p>
                        </div>
                        <div className="text-right hidden md:block">
                            <div className="text-6xl font-black text-zinc-800 print:text-gray-200">{mission.code}</div>
                        </div>
                    </div>
                </div>

                {/* Content Body */}
                <div className="p-8 md:p-12 prose prose-invert prose-lg max-w-none text-gray-300 leading-relaxed font-sans print:prose-neutral print:text-black">
                    {/* Render HTML content safely */}
                    <div dangerouslySetInnerHTML={{ __html: mission.longDescription }} />
                    
                    <hr className="border-zinc-800 my-12 print:border-gray-300" />
                    
                    <div className="bg-zinc-900/50 p-6 border-l-2 border-ark-accent text-sm text-gray-400 font-mono print:bg-gray-100 print:text-black print:border-black">
                        <p className="mb-2 text-ark-accent font-bold print:text-black">TACTICAL SUMMARY:</p>
                        <p>End of record. Data verified by PRTS.</p>
                        <p className="mt-2 text-xs opacity-50">Rhodes Island Math Academy // {mission.id}</p>
                    </div>
                </div>
             </div>
          </div>

          {/* Side Tools (Optional Chat) - Hidden on Print */}
          {showTerminal && (
             <div className="w-96 border-l border-zinc-700 bg-black absolute md:relative right-0 top-0 bottom-0 z-30 shadow-xl flex flex-col transition-all print:hidden">
                <PRTSConsole onBack={() => setShowTerminal(false)} initialContext={`User is studying: ${mission.title} (${mission.code}). Content: ${mission.description}`} />
             </div>
          )}
      </div>

      {/* Floating Action Button for Terminal - Hidden on Print */}
      {!showTerminal && (
        <button 
            onClick={() => setShowTerminal(true)}
            className="absolute bottom-8 right-8 w-14 h-14 bg-ark-accent hover:bg-white text-black rounded-full shadow-[0_0_20px_rgba(0,200,255,0.4)] flex items-center justify-center transition-transform hover:scale-110 z-50 group print:hidden"
        >
            <Terminal size={24} />
            <div className="absolute right-16 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                Consult PRTS
            </div>
        </button>
      )}

      <style>{`
        @media print {
            @page {
                margin: 0;
            }
            body {
                background: white;
            }
            /* Reset colors for printing */
            .prose h3, .prose h4, .prose strong, .prose blockquote {
                color: black !important;
            }
            .prose p, .prose ul {
                color: #333 !important;
            }
        }
      `}</style>
    </div>
  );
};

export default MissionControl;
