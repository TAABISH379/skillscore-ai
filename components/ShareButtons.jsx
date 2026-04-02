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
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-white/5">
      <div className="flex items-center gap-2 text-muted-foreground text-sm font-medium">
        <Share2 className="w-4 h-4" />
        Share your score
      </div>
      <div className="flex items-center gap-3 w-full sm:w-auto">
        <button 
          onClick={handleTwitterShare}
          className="flex-1 sm:flex-none px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-sm font-medium transition-colors"
        >
          Twitter
        </button>
        <button 
          onClick={handleLinkedInShare}
          className="flex-1 sm:flex-none px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-sm font-medium transition-colors cursor-pointer"
        >
          LinkedIn
        </button>
        <button 
          onClick={handleWhatsAppShare}
          className="flex-1 sm:flex-none px-4 py-2 bg-[#25D366]/10 hover:bg-[#25D366]/20 border border-[#25D366]/20 text-[#25D366] rounded-lg text-sm font-medium transition-colors"
        >
          WhatsApp
        </button>
      </div>
    </div>
  );
}
