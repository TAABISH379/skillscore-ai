"use client";

import { useMemo, useEffect, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { Star, GitCommit, Users, BookOpen, AlertCircle, CheckCircle2, Award, Clipboard, Check } from 'lucide-react';
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
    controls.start({ 
      opacity: 1, 
      scale: 1, 
      filter: 'blur(0px)',
      transition: { duration: 0.6, delay: 0.3, type: "spring" } 
    });
  }, [score, controls]);

  const scoreTheme = useMemo(() => {
    if (score >= 80) return { color: '#4ade80', tailwind: 'text-green-400' };
    if (score >= 50) return { color: '#facc15', tailwind: 'text-yellow-400' };
    return { color: '#f87171', tailwind: 'text-red-400' };
  }, [score]);

  const badgeMarkdown = `[![SkillScore AI](https://img.shields.io/badge/SkillScore_AI-${score}%2F100-${score >= 80 ? 'brightgreen' : score >= 50 ? 'yellow' : 'red'})](https://skillscore-ai.vercel.app)`;

  const copyBadge = () => {
    navigator.clipboard.writeText(badgeMarkdown);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full bg-[#0a0a0a]/60 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] shadow-[0_0_50px_rgba(0,0,0,0.5)] overflow-hidden relative group">
      
      {/* Decorative top gradient line */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent" />
      
      <div className="p-8 sm:p-12 flex flex-col gap-12 relative z-10">
        
        {/* Top Header: Identity & Gauge */}
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
            <div>
              <h2 className="text-4xl font-extrabold text-white tracking-tight mb-2 drop-shadow-sm">{githubData.name}</h2>
              <a 
                href={`https://github.com/${githubData.username}`} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary hover:text-white transition-colors text-lg font-semibold flex items-center gap-1 mb-3"
              >
                @{githubData.username}
              </a>
              <p className="text-muted-foreground text-base max-w-sm leading-relaxed font-medium">
                {githubData.bio || 'A developer of few words and many commits.'}
              </p>
            </div>
          </motion.div>

          <RadialGauge score={score} theme={scoreTheme} controls={controls} />
        </div>

        {/* Dynamic Hover Stat Grid */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          <StatBox icon={Star} label="Total Stars" value={githubData.totalStars} delay={0.2} />
          <StatBox icon={BookOpen} label="Public Repos" value={githubData.publicRepos} delay={0.3} />
          <StatBox icon={Users} label="Followers" value={githubData.followers} delay={0.4} />
          <StatBox icon={GitCommit} label="Top Language" value={githubData.topLanguages[0] || 'N/A'} isText delay={0.5} />
        </motion.div>

        {/* AI Insight Box */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-gradient-to-b from-white/[0.04] to-transparent p-8 rounded-[2rem] border border-white/[0.05] relative shadow-inner"
        >
          <div className="absolute top-8 left-8 p-3 rounded-full bg-primary/10">
            <Award className="w-8 h-8 text-primary" />
          </div>
          
          <div className="ml-16 pl-6">
            <h3 className="text-xl font-bold text-white mb-4">Gemini Analysis</h3>
            <p className="text-lg text-gray-300/90 leading-relaxed font-medium mb-10">
              {feedback.summary}
            </p>

            <div className="grid md:grid-cols-2 gap-10">
              <FeedbackList items={feedback.strengths} icon={CheckCircle2} title="Key Strengths" color="text-green-400" bgColor="bg-green-400/10" dotColor="bg-green-400" />
              <FeedbackList items={feedback.weaknesses} icon={AlertCircle} title="Areas to Improve" color="text-red-400" bgColor="bg-red-400/10" dotColor="bg-red-400" />
            </div>
            
            <div className="mt-10 p-6 rounded-2xl bg-black/30 border border-white/5 text-center">
              <span className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-gray-100 to-gray-500 italic uppercase tracking-wider">
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
          className="flex flex-col xl:flex-row gap-6 items-center justify-between mt-4"
        >
          <div className="flex bg-black/50 border border-white/10 p-2 rounded-2xl w-full xl:w-auto items-center hover:border-white/20 transition-colors duration-300 group/badge">
            <span className="text-xs font-black text-muted-foreground px-4 whitespace-nowrap uppercase tracking-widest">README Badge</span>
            <div className="w-[1px] h-6 bg-white/10 mr-4" />
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
    </div>
  );
}

function FeedbackList({ items, icon: Icon, title, color, bgColor, dotColor }) {
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

function StatBox({ icon: Icon, label, value, isText, delay }) {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, type: "spring" }}
      className="bg-white/[0.02] border border-white/[0.05] hover:bg-white/[0.04] p-6 rounded-3xl space-y-3 relative overflow-hidden transition-all duration-300 hover:border-white/[0.12] hover:-translate-y-1 hover:shadow-2xl cursor-default group"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="flex items-center gap-3 text-muted-foreground relative z-10">
        <div className="p-2 bg-white/5 rounded-lg group-hover:bg-primary/20 transition-colors duration-300">
           <Icon className="w-4 h-4 text-white group-hover:text-primary transition-colors" />
        </div>
        <span className="text-[11px] font-bold uppercase tracking-widest">{label}</span>
      </div>
      <div className="text-3xl font-black text-white relative z-10 truncate tracking-tight">
        {isText ? value : value.toLocaleString()}
      </div>
    </motion.div>
  );
}

// Pinnacle SVG Radial Gauge
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
      initial={{ opacity: 0, scale: 0.5, filter: 'blur(10px)' }}
      animate={controls}
      className="relative flex items-center justify-center p-4"
    >
      <div className="absolute inset-0 bg-white/[0.02] rounded-[3rem] border border-white/[0.05] shadow-2xl -z-10" />
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="transform -rotate-90">
        {/* Background Track */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="rgba(255,255,255,0.05)"
          strokeWidth={strokeWidth}
          fill="none"
        />
        {/* Animated Progress Stroke */}
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={theme.color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          fill="none"
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: circumference - (displayValue / 100) * circumference }}
          transition={{ duration: 0.1, ease: "linear" }}
          style={{ strokeDasharray: circumference }}
          className="drop-shadow-lg"
        />
      </svg>
      {/* Center Number */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className={`text-6xl font-black tabular-nums tracking-tighter ${theme.tailwind}`}>
          {displayValue}
        </span>
      </div>
    </motion.div>
  );
}
