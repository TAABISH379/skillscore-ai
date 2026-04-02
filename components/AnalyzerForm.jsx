"use client";

import { useState, useEffect } from 'react';
import { Search, Loader2, Flame, Sparkles, Command } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ResultCard from './ResultCard';
import DeepScanUI from './DeepScanUI';
import { cn } from '@/lib/utils';

const LOADING_TEXTS = [
  "Cloning repositories... 📦",
  "Judging your commit history... 👀",
  "Assigning RPG Class... 🧙‍♂️",
  "Sniffing for code smells... 💩",
  "Calculating raw developer worth... 💸"
];

const MODES = [
  { id: 'roast', label: 'Roast Mode', icon: Flame, color: 'text-zinc-400' },
  { id: 'hype', label: 'Hype Mode', icon: Sparkles, color: 'text-zinc-400' }
];

import { useRouter } from 'next/navigation';

export default function AnalyzerForm() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [mode, setMode] = useState('roast');
  const [isNavigating, setIsNavigating] = useState(false);
  const [loadingTextIndex, setLoadingTextIndex] = useState(0);

  useEffect(() => {
    if (!isNavigating) return;
    const interval = setInterval(() => {
      setLoadingTextIndex(prev => (prev + 1) % LOADING_TEXTS.length);
    }, 1500);
    return () => clearInterval(interval);
  }, [isNavigating]);

  const handleAnalyze = (e) => {
    e.preventDefault();
    if (!username.trim()) return;

    setIsNavigating(true);
    setLoadingTextIndex(0);
    
    // Redirect to the dynamic server component route
    router.push(`/report/${encodeURIComponent(username.trim())}?mode=${encodeURIComponent(mode)}`);
  };

  return (
    <div className="w-full flex flex-col items-center">
      
      {/* Sleek Segmented Control */}
      <div className="mb-8 flex items-center bg-white/5 border border-white/10 p-1.5 rounded-full shadow-inner relative z-10 w-full max-w-[300px]">
        {MODES.map((m) => {
          const isActive = mode === m.id;
          const Icon = m.icon;
          return (
            <button
              key={m.id}
              type="button"
              onClick={() => setMode(m.id)}
              className={cn(
                "relative flex-1 flex items-center justify-center gap-2 py-2.5 rounded-full text-sm font-semibold transition-colors duration-300 z-10",
                isActive ? "text-white" : "text-muted-foreground hover:text-gray-300"
              )}
            >
              {isActive && (
                <motion.div
                  layoutId="active-pill"
                  className="absolute inset-0 bg-white/10 border border-white/20 rounded-full shadow-[0_0_15px_rgba(255,255,255,0.1)]"
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                />
              )}
              <Icon className={cn("w-4 h-4 relative z-10", isActive && m.color)} />
              <span className="relative z-10">{m.label}</span>
            </button>
          );
        })}
      </div>

      {/* Omnibar Input */}
      <form onSubmit={handleAnalyze} className="relative w-full max-w-2xl group z-10">
        <div className="absolute -inset-1 bg-white/[0.03] blur-xl rounded-full opacity-0 group-hover:opacity-100 transition duration-700 pointer-events-none" />
        
        <div className="relative flex items-center bg-[#050505]/80 backdrop-blur-3xl border border-white/[0.08] rounded-full overflow-hidden p-2 shadow-[0_20px_40px_rgba(0,0,0,0.8)] transition-all duration-300 focus-within:ring-1 focus-within:ring-white/20 focus-within:border-white/20">
          
          <div className="pl-5 pr-3 py-3 flex items-center text-muted-foreground group-focus-within:text-white transition-colors">
            <Command className="w-5 h-5 hidden sm:block" />
            <Search className="w-5 h-5 sm:hidden" />
          </div>
          
          <input
            type="text"
            placeholder="Search GitHub Username..."
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="flex-1 bg-transparent border-none outline-none text-white text-lg placeholder:text-muted-foreground/60 px-2 py-3 font-medium tracking-wide"
            disabled={isNavigating}
          />
          
          <button
            type="submit"
            disabled={isNavigating || !username}
            className="bg-white text-black hover:bg-gray-300 font-extrabold px-8 py-3.5 rounded-full transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center min-w-[140px] shadow-lg"
          >
            {isNavigating ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Analyze'}
          </button>
        </div>
      </form>

    </div>
  );
}
