import { Github } from "lucide-react";

export default function Header() {
  return (
    <header className="w-full border-b border-white/10 glass-panel sticky top-0 z-50">
      <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2 cursor-pointer transition-transform hover:scale-105">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center flex-shrink-0 shadow-lg shadow-primary/20">
            <Github className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="font-bold text-xl tracking-tight text-white">SkillScore<span className="text-primary text-sm relative -top-1 ml-0.5">AI</span></span>
        </div>
        
        <nav className="hidden sm:block">
          <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-muted-foreground hover:text-white transition-colors duration-200">
            Star on GitHub
          </a>
        </nav>
      </div>
    </header>
  );
}
