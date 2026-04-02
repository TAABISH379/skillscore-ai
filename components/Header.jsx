import { Github } from "lucide-react";

export default function Header() {
  return (
    <header className="w-full premium-glass sticky top-0 z-50 border-b-0 relative">
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-zinc-600 to-transparent opacity-30" />
      <div className="max-w-5xl mx-auto px-4 h-[72px] flex items-center justify-between relative z-10">
        <div className="flex items-center gap-3 cursor-pointer transition-transform hover:-translate-y-0.5 duration-500 group">
          <div className="w-9 h-9 rounded-xl border border-zinc-700 bg-zinc-900/50 flex items-center justify-center shadow-inner group-hover:bg-white group-hover:border-white transition-all duration-500">
            <Github className="w-5 h-5 text-zinc-400 group-hover:text-black transition-colors duration-500" />
          </div>
          <span className="font-serif text-2xl font-light tracking-tight text-white flex items-center">
            SkillScore<span className="font-sans font-bold text-sm uppercase tracking-widest text-zinc-500 ml-2 pt-1">AI</span>
          </span>
        </div>
        
        <nav className="hidden sm:block">
          <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-xs uppercase tracking-widest font-bold text-zinc-500 hover:text-white transition-colors duration-300">
            View Source
          </a>
        </nav>
      </div>
    </header>
  );
}
