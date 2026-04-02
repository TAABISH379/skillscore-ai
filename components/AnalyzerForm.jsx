"use client";

import { useState, useEffect } from 'react';
import { Search, Loader2, Flame, Sparkles, Command } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ResultCard from './ResultCard';
import { cn } from '@/lib/utils';

const LOADING_TEXTS = [
  "Cloning repositories... 📦",
  "Judging your commit history... 👀",
  "Counting the stars... ⭐",
  "Summoning the AI overloads... 🤖",
  "Calculating raw developer worth... 🧮"
];

const MODES = [
  { id: 'roast', label: 'Roast Mode', icon: Flame, color: 'text-red-400' },
  { id: 'hype', label: 'Hype Mode', icon: Sparkles, color: 'text-green-400' }
];

export default function AnalyzerForm() {
  const [username, setUsername] = useState('');
  const [mode, setMode] = useState('roast');
  const [isLoading, setIsLoading] = useState(false);
  const [loadingTextIndex, setLoadingTextIndex] = useState(0);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);

  useEffect(() => {
    if (!isLoading) return;
    const interval = setInterval(() => {
      setLoadingTextIndex(prev => (prev + 1) % LOADING_TEXTS.length);
    }, 1500);
    return () => clearInterval(interval);
  }, [isLoading]);

  const handleAnalyze = async (e) => {
    e.preventDefault();
    if (!username.trim()) return;

    setIsLoading(true);
    setLoadingTextIndex(0);
    setError(null);
    setResult(null);

    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: username.trim(), mode }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Something went wrong');
      }

      setResult(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
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
        <div className="absolute -inset-1 bg-gradient-to-r from-primary/30 to-purple-500/30 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition duration-700 pointer-events-none" />
        
        <div className="relative flex items-center bg-[#0a0a0a]/80 backdrop-blur-3xl border border-white/10 rounded-full overflow-hidden p-2 shadow-2xl transition-all duration-300 focus-within:ring-2 focus-within:ring-primary/50 focus-within:border-primary/50">
          
          <div className="pl-5 pr-3 py-3 flex items-center text-muted-foreground group-focus-within:text-primary transition-colors">
            <Command className="w-5 h-5 hidden sm:block" />
            <Search className="w-5 h-5 sm:hidden" />
          </div>
          
          <input
            type="text"
            placeholder="Search GitHub Username..."
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="flex-1 bg-transparent border-none outline-none text-white text-lg placeholder:text-muted-foreground/60 px-2 py-3 font-medium tracking-wide"
            disabled={isLoading}
          />
          
          <button
            type="submit"
            disabled={isLoading || !username}
            className="bg-white text-black hover:bg-gray-200 font-extrabold px-8 py-3.5 rounded-full transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center min-w-[140px] shadow-lg"
          >
            {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Analyze'}
          </button>
        </div>
      </form>

      {/* Dynamic Loading Text */}
      <AnimatePresence mode="wait">
        {isLoading && (
          <motion.div 
            key={loadingTextIndex}
            initial={{ opacity: 0, y: 10, filter: 'blur(4px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -10, filter: 'blur(4px)' }}
            transition={{ duration: 0.3 }}
            className="mt-8 text-primary font-semibold tracking-widest uppercase text-sm h-8"
          >
            {LOADING_TEXTS[loadingTextIndex]}
          </motion.div>
        )}
      </AnimatePresence>

      {error && (
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-8 text-red-300 bg-red-950/50 px-6 py-3 rounded-xl border border-red-500/30 text-sm font-medium shadow-xl shadow-red-900/10 backdrop-blur-md"
        >
          {error}
        </motion.div>
      )}

      <AnimatePresence mode="wait">
        {result && !isLoading && (
          <motion.div
            key="result"
            initial={{ opacity: 0, scale: 0.96, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -20 }}
            transition={{ duration: 0.7, type: "spring", bounce: 0.3 }}
            className="w-full max-w-5xl mt-12 z-20"
          >
            <ResultCard result={result} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
