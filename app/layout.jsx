import './globals.css';

export const metadata = {
  title: 'SkillScore AI - GitHub Skill Analyzer',
  description: 'AI-powered GitHub profile analyzer that assigns a deterministic score and feedback.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen bg-[#030712] text-foreground font-sans antialiased overflow-x-hidden">
        
        {/* Next-Level Pro Background Layer */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
          <div className="absolute inset-0 bg-dot-pattern opacity-50" />
          <div className="absolute inset-0 flex items-center justify-center mask-vignette">
            <div className="absolute w-[80vw] h-[80vw] max-w-[800px] max-h-[800px] aurora-blob-1 opacity-40 mix-blend-screen" />
            <div className="absolute w-[90vw] h-[90vw] max-w-[900px] max-h-[900px] aurora-blob-2 opacity-30 mix-blend-screen -ml-[20%]" />
          </div>
        </div>

        <div className="relative z-10 flex flex-col min-h-screen">
          {children}
        </div>
      </body>
    </html>
  );
}
