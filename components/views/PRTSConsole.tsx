import React, { useState, useRef, useEffect } from 'react';
import { sendMessageToPRTS } from '../../services/geminiService';
import { ChatMessage } from '../../types';
import { Send, Terminal, Loader2 } from 'lucide-react';

interface PRTSConsoleProps {
  onBack: () => void;
  initialContext?: string;
}

const PRTSConsole: React.FC<PRTSConsoleProps> = ({ onBack, initialContext }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'init',
      role: 'model',
      text: initialContext 
        ? `[PRTS] 作战记录已加载。正在分析上下文：${initialContext}。\n等待博士指令。` 
        : '[PRTS] 系统联机正常。神经网络连接建立完毕。代理指挥系统 PRTS 为您服务。\n博士，请下达指令。',
      timestamp: Date.now()
    }
  ]);
  const [input, setInput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isProcessing) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: input,
      timestamp: Date.now()
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsProcessing(true);

    const history = messages.map(m => ({ role: m.role, text: m.text }));
    const responseText = await sendMessageToPRTS(input, history);

    const modelMsg: ChatMessage = {
      id: (Date.now() + 1).toString(),
      role: 'model',
      text: responseText,
      timestamp: Date.now()
    };

    setMessages(prev => [...prev, modelMsg]);
    setIsProcessing(false);
  };

  return (
    <div className="flex flex-col h-full bg-black font-mono text-sm relative crt">
      {/* Header */}
      <div className="bg-zinc-900 p-3 border-b border-zinc-700 flex justify-between items-center z-10 shadow-lg">
        <div className="flex items-center gap-3">
           <Terminal className="w-5 h-5 text-ark-accent" />
           <span className="text-ark-accent font-bold tracking-widest text-xs md:text-sm">PRTS V3.0 // NEURAL LINK // 神经连接中</span>
        </div>
        <button onClick={onBack} className="text-gray-500 hover:text-white uppercase text-xs border border-gray-700 hover:border-white px-3 py-1 transition-colors">
            断开连接 [DISCONNECT]
        </button>
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6" ref={scrollRef}>
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] md:max-w-[70%] p-4 border relative ${
              msg.role === 'user' 
                ? 'bg-zinc-900 border-zinc-700 text-gray-200' 
                : 'bg-blue-900/10 border-ark-accent/40 text-blue-50'
            }`}>
              {/* Corner markers */}
              <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-current opacity-50"></div>
              <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-current opacity-50"></div>
              <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-current opacity-50"></div>
              <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-current opacity-50"></div>

              {msg.role === 'model' && (
                <div className="text-[10px] text-ark-accent mb-2 opacity-80 tracking-wider flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-ark-accent rounded-full animate-pulse"></div>
                    PRTS_RESPONSE_LOG
                </div>
              )}
              {msg.role === 'user' && (
                <div className="text-[10px] text-gray-500 mb-2 opacity-80 tracking-wider text-right">
                    DOCTOR_INPUT
                </div>
              )}
              <div className="whitespace-pre-wrap leading-relaxed text-sm md:text-base">{msg.text}</div>
            </div>
          </div>
        ))}
        {isProcessing && (
           <div className="flex justify-start">
             <div className="bg-transparent text-ark-accent p-4 flex items-center gap-3">
               <Loader2 className="w-4 h-4 animate-spin" />
               <span className="animate-pulse tracking-widest text-xs">CALCULATING // 数据分析中...</span>
             </div>
           </div>
        )}
      </div>

      {/* Input Area */}
      <div className="p-4 bg-zinc-900 border-t border-zinc-700 z-10">
        <div className="flex gap-4 items-end">
           <span className="text-ark-accent pb-3 animate-pulse">_</span>
           <textarea
             value={input}
             onChange={(e) => setInput(e.target.value)}
             onKeyDown={(e) => {
               if (e.key === 'Enter' && !e.shiftKey) {
                 e.preventDefault();
                 handleSend();
               }
             }}
             placeholder="输入指令或数学问题..."
             className="flex-1 bg-black/50 border border-zinc-700 text-white resize-none outline-none h-14 p-3 focus:border-ark-accent transition-colors font-mono text-sm"
           />
           <button 
             onClick={handleSend}
             disabled={isProcessing || !input.trim()}
             className="h-14 px-6 bg-ark-accent text-black font-bold hover:bg-white disabled:opacity-30 disabled:hover:bg-ark-accent transition-colors uppercase tracking-widest flex items-center justify-center"
           >
             <Send className="w-5 h-5" />
           </button>
        </div>
      </div>
    </div>
  );
};

export default PRTSConsole;