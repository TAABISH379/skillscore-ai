"use client";

import { Share2 } from "lucide-react";

export default function ShareButtons({ username, score }) {
  const shareText = `I just scored ${score}/100 on SkillScore AI! 🚀 Check out my GitHub Developer Rating.`;
  const appUrl = typeof window !== 'undefined' ? window.location.origin : 'https://skillscore-ai.vercel.app';
  
  const handleTwitterShare = () => {
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(appUrl)}`;
    window.open(url, '_blank');
  };

  const handleLinkedInShare = () => {
    const url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(appUrl)}`;
    window.open(url, '_blank');
  };

  const handleWhatsAppShare = () => {
    const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(shareText + ' ' + appUrl)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-6 border-t border-white/[0.03]">
      <div className="flex items-center gap-3 text-zinc-500 text-xs uppercase tracking-widest font-black">
        <Share2 className="w-4 h-4 text-zinc-600" />
        Spread the Roast
      </div>
      <div className="flex items-center gap-3 w-full sm:w-auto">
        <button 
          onClick={handleTwitterShare}
          className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-5 py-2.5 bg-zinc-900 border border-zinc-800 hover:bg-white hover:border-white hover:text-black rounded-xl text-xs font-bold uppercase tracking-widest transition-all duration-500 shadow-inner group"
        >
          𝕏 <span className="opacity-70 group-hover:opacity-100">Post</span>
        </button>
        <button 
          onClick={handleLinkedInShare}
          className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-5 py-2.5 bg-zinc-900 border border-zinc-800 hover:bg-white hover:border-white hover:text-black rounded-xl text-xs font-bold uppercase tracking-widest transition-all duration-500 shadow-inner group"
        >
          💼 <span className="opacity-70 group-hover:opacity-100">Brag</span>
        </button>
        <button 
          onClick={handleWhatsAppShare}
          className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-5 py-2.5 bg-zinc-900 border border-zinc-800 hover:bg-[#25D366] hover:border-[#25D366] hover:text-white rounded-xl text-xs font-bold uppercase tracking-widest transition-all duration-500 shadow-inner group"
        >
          💬 <span className="opacity-70 group-hover:opacity-100">Send</span>
        </button>
      </div>
    </div>
  );
}
