import './globals.css';

export const metadata = {
  title: 'SkillScore AI - GitHub Skill Analyzer',
  description: 'AI-powered GitHub profile analyzer that assigns a deterministic score and feedback.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen bg-obsidian text-foreground font-sans antialiased overflow-x-hidden selection:bg-white/20 selection:text-white">
        
        {/* Prestige Noise Layer */}
        <div className="fixed inset-0 pointer-events-none z-0 noise-overlay mix-blend-screen opacity-50" />
        
        {/* Architect Grid Pattern */}
        <div className="fixed inset-0 pointer-events-none z-0 bg-grid-pattern" />
        
        {/* Ambient Subtle Glow */}
        <div className="fixed inset-0 pointer-events-none z-0 flex items-center justify-center">
           <div className="w-[80vw] h-[80vw] bg-white/5 blur-[120px] rounded-full opacity-30" />
        </div>

        <div className="relative z-10 flex flex-col min-h-screen">
          {children}
        </div>
      </body>
    </html>
  );
}
