"use client";

import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Star, GitCommit, Users, BookOpen, AlertCircle, CheckCircle2, Award } from 'lucide-react';
import ShareButtons from './ShareButtons';

export default function ResultCard({ result }) {
  const { githubData, score, feedback } = result;

  const scoreColor = useMemo(() => {
    if (score >= 80) return 'text-green-400 drop-shadow-[0_0_15px_rgba(74,222,128,0.5)]';
    if (score >= 50) return 'text-yellow-400 drop-shadow-[0_0_15px_rgba(250,204,21,0.5)]';
    return 'text-red-400 drop-shadow-[0_0_15px_rgba(248,113,113,0.5)]';
  }, [score]);

  return (
    <div className="w-full glass-panel rounded-2xl overflow-hidden p-1">
      <div className="bg-card/90 rounded-xl p-6 sm:p-8 flex flex-col gap-8">
        
        {/* Profile & Score Section */}
        <div className="flex flex-col md:flex-row gap-8 items-center md:items-start justify-between border-b border-white/5 pb-8">
          <div className="flex items-center gap-6">
            <img 
              src={githubData.avatarUrl} 
              alt={githubData.username} 
              className="w-24 h-24 rounded-2xl shadow-xl border border-white/10"
            />
            <div>
              <h2 className="text-2xl font-bold text-white mb-1">{githubData.name}</h2>
              <a 
                href={`https://github.com/${githubData.username}`} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary hover:underline text-sm font-medium block mb-2"
              >
                @{githubData.username}
              </a>
              <p className="text-muted-foreground text-sm max-w-xs leading-relaxed">
                {githubData.bio || 'No bio provided.'}
              </p>
            </div>
          </div>

          <div className="flex flex-col items-center justify-center p-4 rounded-2xl bg-white/5 border border-white/10 min-w-[160px]">
            <span className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-2">Skill Score</span>
            <div className={`text-6xl font-black ${scoreColor}`}>
              {score}
            </div>
          </div>
        </div>

        {/* GitHub Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <StatBox icon={Star} label="Stars" value={githubData.totalStars} />
          <StatBox icon={BookOpen} label="Repos" value={githubData.publicRepos} />
          <StatBox icon={Users} label="Followers" value={githubData.followers} />
          <div className="glass-panel p-4 rounded-xl space-y-2">
             <div className="flex items-center gap-2 text-muted-foreground">
                <GitCommit className="w-4 h-4" />
                <span className="text-xs font-semibold uppercase tracking-wider">Top Langs</span>
             </div>
             <div className="text-sm font-medium text-white line-clamp-1">
                {githubData.topLanguages.join(', ') || 'N/A'}
             </div>
          </div>
        </div>

        {/* AI Feedback Section */}
        <div className="space-y-6 bg-white/5 p-6 rounded-xl border border-white/10 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-1 h-full bg-primary" />
          
          <div>
            <h3 className="text-lg font-bold text-white flex items-center gap-2 mb-3">
              <Award className="w-5 h-5 text-primary" />
              AI Summary
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              {feedback.summary}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h4 className="text-sm font-bold text-green-400 flex items-center gap-2">
                 <CheckCircle2 className="w-4 h-4" /> Strengths
              </h4>
              <ul className="space-y-2">
                {feedback.strengths.map((s, i) => (
                  <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                    <span className="text-green-400/50 mt-0.5">•</span> {s}
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="space-y-3">
              <h4 className="text-sm font-bold text-red-400 flex items-center gap-2">
                 <AlertCircle className="w-4 h-4" /> Areas to Improve
              </h4>
              <ul className="space-y-2">
                {feedback.weaknesses.map((w, i) => (
                  <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                    <span className="text-red-400/50 mt-0.5">•</span> {w}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="pt-4 border-t border-white/10 mt-6 hidden md:block">
            <p className="text-white font-medium italic">
              " {feedback.verdict} "
            </p>
          </div>
        </div>

        {/* Share Section */}
        <ShareButtons username={githubData.username} score={score} />
        
      </div>
    </div>
  );
}

function StatBox({ icon: Icon, label, value }) {
  return (
    <div className="glass-panel p-4 rounded-xl space-y-2">
      <div className="flex items-center gap-2 text-muted-foreground">
        <Icon className="w-4 h-4" />
        <span className="text-xs font-semibold uppercase tracking-wider">{label}</span>
      </div>
      <div className="text-2xl font-bold text-white">
        {value.toLocaleString()}
      </div>
    </div>
  );
}
