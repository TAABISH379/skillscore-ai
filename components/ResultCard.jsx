"use client";

import React, { useMemo, useEffect, useState } from 'react';
import { motion, useAnimation, animate } from 'framer-motion';
import { Star, GitCommit, Users, BookOpen, AlertCircle, CheckCircle2, Award, Clipboard, Check, TerminalSquare, ShieldAlert, Sparkles, DollarSign } from 'lucide-react';
import confetti from 'canvas-confetti';
import ShareButtons from './ShareButtons';

export default function ResultCard({ result }) {
  const { githubData, score, feedback } = result;
  const [copied, setCopied] = useState(false);
  const controls = useAnimation();

  useEffect(() => {
    if (score >= 80) {
      const end = Date.now() + 2 * 1000;
      const colors = ['#4ade80', '#ffffff', '#3b82f6'];

      (function frame() {
        confetti({ particleCount: 4, angle: 60, spread: 55, origin: { x: 0 }, colors: colors });
        confetti({ particleCount: 4, angle: 120, spread: 55, origin: { x: 1 }, colors: colors });
        if (Date.now() < end) requestAnimationFrame(frame);
      }());
    }
    controls.start({ opacity: 1, scale: 1, transition: { duration: 0.6, delay: 0.3, type: "spring" } });
  }, [score, controls]);

  const scoreTheme = useMemo(() => {
    if (score >= 80) return { color: '#ffffff', tailwind: 'text-white' };
    if (score >= 50) return { color: '#a1a1aa', tailwind: 'text-gray-400' };
    return { color: '#52525b', tailwind: 'text-gray-600' };
  }, [score]);

  const badgeMarkdown = `[![SkillScore AI](https://img.shields.io/badge/SkillScore_AI-${score}%2F100-${score >= 80 ? 'black' : score >= 50 ? 'lightgrey' : 'lightgrey'})](https://skillscore-ai.vercel.app)`;

  const copyBadge = () => {
    navigator.clipboard.writeText(badgeMarkdown);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const [tiltX, setTiltX] = useState(0);
  const [tiltY, setTiltY] = useState(0);

  const handleCardMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Very subtle 3D tilt (max 3 degrees)
    const tiltXCalc = ((y / rect.height) - 0.5) * -4;
    const tiltYCalc = ((x / rect.width) - 0.5) * 4;
    
    setTiltX(tiltXCalc);
    setTiltY(tiltYCalc);
  };

  const handleCardMouseLeave = () => {
    setTiltX(0);
    setTiltY(0);
  };

  return (
    <div style={{ perspective: 2000 }} className="w-full">
      <motion.div 
        onMouseMove={handleCardMouseMove}
        onMouseLeave={handleCardMouseLeave}
        animate={{ rotateX: tiltX, rotateY: tiltY }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
        className="w-full premium-glass rounded-[2.5rem] overflow-hidden relative group transform-gpu"
        style={{ transformStyle: "preserve-3d" }}
      >
        
        {/* Dynamic Glass Glare Effect */}
        <motion.div 
          className="pointer-events-none absolute inset-0 z-50 opacity-0 group-hover:opacity-100 transition-opacity duration-700 mix-blend-overlay"
          animate={{
            background: `radial-gradient(1000px circle at ${tiltY * 50 + 50}% ${tiltX * -50 + 50}%, rgba(255,255,255,0.15), transparent 40%)`
          }}
        />

        {/* Decorative ultra-sheer noise inside the card */}
        <div className="absolute inset-0 noise-overlay mix-blend-screen opacity-20 pointer-events-none" />
      
      {/* Ultra-subtle reflective top edge line */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white-[0.15] to-transparent opacity-50 pointer-events-none" />
      
      <div className="p-8 sm:p-12 flex flex-col gap-14 relative z-10">
        
        {/* Top Header: Identity, RPG Class & Gauge */}
        <div className="flex flex-col md:flex-row gap-10 items-center md:items-start justify-between border-b border-white/5 pb-12">
          
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="flex items-center gap-8"
          >
            <div className="relative group/avatar cursor-pointer">
              <div className="absolute inset-0 bg-primary/20 rounded-full blur-2xl opacity-0 group-hover/avatar:opacity-100 transition duration-500" />
              <img 
                src={githubData.avatarUrl} 
                alt={githubData.username} 
                className="w-32 h-32 rounded-full shadow-[0_0_0_1px_rgba(255,255,255,0.1)] relative z-10 transition-transform duration-500 group-hover/avatar:scale-[1.05]"
              />
            </div>
            <div className="flex flex-col items-start">
              <h2 className="text-4xl font-extrabold text-white tracking-tight mb-2 drop-shadow-sm">{githubData.name}</h2>
              <a 
                href={`https://github.com/${githubData.username}`} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary hover:text-white transition-colors text-lg font-semibold flex items-center gap-1 mb-4"
              >
                @{githubData.username}
              </a>
              
              {/* RPG Class Pill (Subtle Luxury) */}
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/[0.08] bg-white/[0.02] shadow-2xl backdrop-blur-md"
              >
                <Sparkles className="w-4 h-4 text-[#fbbf24]" />
                <span className="text-sm font-bold tracking-widest uppercase gold-accent">
                  {feedback.rpgClass || 'Developer'}
                </span>
              </motion.div>
            </div>
          </motion.div>

          <RadialGauge score={score} theme={scoreTheme} controls={controls} />
        </div>

        {/* Dynamic Hover Stat Grid with Salary */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-2 lg:grid-cols-5 gap-4"
        >
          <StatBox icon={DollarSign} label="Predicted Worth" value={feedback.salary || 'Unknown'} isText isHighlight delay={0.2} />
          <StatBox icon={Star} label="Total Stars" value={githubData.totalStars} delay={0.3} />
          <StatBox icon={BookOpen} label="Public Repos" value={githubData.publicRepos} delay={0.4} />
          <StatBox icon={Users} label="Followers" value={githubData.followers} delay={0.5} />
          <StatBox icon={GitCommit} label="Top Language" value={githubData.topLanguages[0] || 'N/A'} isText delay={0.6} />
        </motion.div>

        {/* Commit Scanner Roast Box */}
        {githubData.recentCommits && githubData.recentCommits.length > 0 && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="grid lg:grid-cols-2 gap-12 pt-8 mt-4 border-t border-white/[0.03]"
          >
            <div className="flex flex-col justify-center">
              <h4 className="flex items-center gap-3 text-sm uppercase tracking-widest font-black text-zinc-500 mb-6 font-mono">
                <TerminalSquare className="w-5 h-5 text-zinc-600" /> Recent Commits
              </h4>
              <div className="space-y-4 font-mono text-sm">
                {githubData.recentCommits.map((msg, idx) => (
                  <div key={idx} className="text-zinc-400 truncate flex items-center relative">
                    <span className="text-zinc-700 mr-4 font-bold">~</span> {msg}
                  </div>
                ))}
              </div>
            </div>
            <div className="flex flex-col justify-center lg:pl-10 lg:border-l border-white/[0.03]">
              <h4 className="flex items-center gap-3 text-sm uppercase tracking-widest font-black text-zinc-500 mb-6">
                <ShieldAlert className="w-5 h-5 text-zinc-600" /> Code Smell Verdict
              </h4>
              <p className="text-xl text-white font-medium leading-relaxed italic">
                "{feedback.commitRoast || 'Looks like a 10x developer.'}"
              </p>
            </div>
          </motion.div>
        )}

        {/* AI Insight Box */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="pt-10 mt-6 border-t border-white/[0.03] relative"
        >
          <div className="absolute top-10 left-0">
            <Award className="w-10 h-10 text-zinc-500/50" />
          </div>
          
          <div className="ml-20">
            <h3 className="text-2xl font-bold text-white mb-6 tracking-tight">SkillScoreAI Analysis</h3>
            <p className="text-xl text-zinc-300 leading-relaxed font-medium mb-12">
              {feedback.summary}
            </p>

            <div className="grid md:grid-cols-2 gap-16">
              <FeedbackList items={feedback.strengths} icon={CheckCircle2} title="Key Strengths" color="text-zinc-200" bgColor="bg-zinc-800" dotColor="bg-zinc-400" />
              <FeedbackList items={feedback.weaknesses} icon={AlertCircle} title="Areas to Improve" color="text-zinc-400" bgColor="bg-zinc-900/50" dotColor="bg-zinc-700" />
            </div>
            
            <div className="mt-16 text-center">
              <span className="text-3xl lg:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-br from-white to-zinc-600 italic tracking-tight">
                "{feedback.verdict}"
              </span>
            </div>
          </div>
        </motion.div>

        {/* Footer Actions */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="flex flex-col xl:flex-row gap-6 items-center justify-between mt-2"
        >
          <div className="flex bg-black/50 border border-white/10 p-2 rounded-2xl w-full xl:w-auto items-center hover:border-white/20 transition-colors duration-300 group/badge">
            <span className="text-xs font-black text-muted-foreground px-4 whitespace-nowrap uppercase tracking-widest hidden sm:block">README Badge</span>
            <div className="w-[1px] h-6 bg-white/10 mr-4 hidden sm:block" />
            <code className="text-sm text-primary/80 bg-primary/5 px-4 py-2.5 rounded-xl font-mono truncate w-40 sm:w-72 selection:bg-primary/30">
              {badgeMarkdown}
            </code>
            <button 
              onClick={copyBadge}
              className="ml-3 bg-white hover:bg-gray-200 text-black p-2.5 rounded-xl transition-all font-bold flex items-center justify-center min-w-[44px]"
              title="Copy to clipboard"
            >
              {copied ? <Check className="w-5 h-5 text-green-600" /> : <Clipboard className="w-5 h-5" />}
            </button>
          </div>
          <ShareButtons username={githubData.username} score={score} />
        </motion.div>
        
      </div>
      </motion.div>
    </div>
  );
}

function FeedbackList({ items, icon: Icon, title, color, bgColor, dotColor }) {
  if (!items || items.length === 0) return null;
  return (
    <div className="space-y-5">
      <h4 className={`text-sm font-bold uppercase tracking-widest flex items-center gap-3 ${color}`}>
         <div className={`p-1.5 rounded-md ${bgColor}`}><Icon className="w-4 h-4" /></div> {title}
      </h4>
      <ul className="space-y-4">
        {items.map((item, i) => (
          <motion.li 
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 + (i * 0.1) }}
            key={i} 
            className="text-[15px] font-medium text-gray-400 flex items-start gap-4 leading-relaxed"
          >
            <div className={`mt-2 h-1.5 w-1.5 rounded-full flex-shrink-0 ${dotColor} shadow-[0_0_8px_var(--tw-shadow-color)] shadow-${dotColor}`} /> 
            {item}
          </motion.li>
        ))}
      </ul>
    </div>
  );
}

function AnimatedCounter({ from, to }) {
  const nodeRef = React.useRef(null);

  useEffect(() => {
    const controls = animate(from, to, {
      duration: 1.5,
      ease: "easeOut",
      onUpdate(value) {
        if (nodeRef.current) {
          nodeRef.current.textContent = Math.round(value).toLocaleString();
        }
      },
    });
    return () => controls.stop();
  }, [from, to]);

  return <span ref={nodeRef}>{from}</span>;
}

function StatBox({ icon: Icon, label, value, isText, isHighlight, delay }) {
  const [mouseX, setMouseX] = useState(0);
  const [mouseY, setMouseY] = useState(0);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMouseX(e.clientX - rect.left);
    setMouseY(e.clientY - rect.top);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, type: "spring" }}
      onMouseMove={handleMouseMove}
      className={`relative p-5 lg:p-7 rounded-3xl space-y-3 overflow-hidden transition-all duration-500 cursor-default group ${
        isHighlight 
          ? 'lg:col-span-2 premium-glass magic-border' 
          : 'bg-black border border-white/5 shadow-inner'
      }`}
      style={{
        boxShadow: isHighlight 
          ? 'inset 0 1px 0 0 rgba(255,255,255,0.1), 0 30px 60px -15px rgba(0,0,0,1)' 
          : 'inset 0 1px 0 0 rgba(255,255,255,0.02), 0 10px 30px -5px rgba(0,0,0,0.8)'
      }}
    >
      {/* Vercel-style Mouse Spotlight Hover tracking cursor */}
      <div 
        className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: `radial-gradient(400px circle at ${mouseX}px ${mouseY}px, rgba(255,255,255,0.08), transparent 40%)`
        }}
      />
      
      <div className={`flex items-center gap-3 relative z-10 ${isHighlight ? 'text-zinc-300' : 'text-zinc-500 group-hover:text-zinc-300 transition-colors duration-500'}`}>
        <div className={`p-2 rounded-xl transition-colors duration-500 ${isHighlight ? 'bg-zinc-800 shadow-[0_0_15px_rgba(255,255,255,0.1)]' : 'bg-zinc-900 group-hover:bg-zinc-800'}`}>
           <Icon className="w-4 h-4 text-inherit" />
        </div>
        <span className="text-[11px] font-bold uppercase tracking-widest leading-none mt-1">{label}</span>
      </div>
      <div className={`text-3xl lg:text-5xl font-light relative z-10 truncate tracking-tight pt-1 ${isHighlight ? 'brushed-steel-animated drop-shadow-xl' : 'text-white'}`}>
        {isText ? (
          value
        ) : (
          <AnimatedCounter from={0} to={value} />
        )}
      </div>
    </motion.div>
  );
}

function RadialGauge({ score, theme, controls }) {
  const [displayValue, setDisplayValue] = useState(0);
  const size = 180;
  const strokeWidth = 14;
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;

  useEffect(() => {
    let start = 0;
    const end = parseInt(score, 10);
    if (start === end) return;
    const incrementTime = Math.max(1500 / end, 10);
    const timer = setInterval(() => {
      start += 1;
      setDisplayValue(start);
      if (start === end) clearInterval(timer);
    }, incrementTime);
    return () => clearInterval(timer);
  }, [score]);

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.5 }}
      animate={controls}
      className="relative flex items-center justify-center p-4 min-w-[200px]"
    >
      <div className={`absolute inset-0 bg-white/[0.02] rounded-[3rem] border border-white/[0.05] shadow-2xl -z-10`} />
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="transform -rotate-90 drop-shadow-xl">
        <circle cx={size / 2} cy={size / 2} r={radius} stroke="rgba(255,255,255,0.05)" strokeWidth={strokeWidth} fill="none" />
        <motion.circle
          cx={size / 2} cy={size / 2} r={radius} stroke={theme.color} strokeWidth={strokeWidth} strokeLinecap="round" fill="none"
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: circumference - (displayValue / 100) * circumference }}
          transition={{ duration: 0.1, ease: "linear" }}
          style={{ strokeDasharray: circumference }}
          className="drop-shadow-lg"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className={`text-[5rem] font-serif font-light tabular-nums tracking-tighter ${theme.tailwind} drop-shadow-2xl`}>
          {displayValue}
        </span>
      </div>
    </motion.div>
  );
}
