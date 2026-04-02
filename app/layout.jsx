import './globals.css';

export const metadata = {
  title: 'SkillScore AI - GitHub Skill Analyzer',
  description: 'AI-powered GitHub profile analyzer that assigns a deterministic score and feedback.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen bg-background text-foreground bg-[url('/bg-pattern.svg')] bg-fixed">
        <div className="relative z-10">
          {children}
        </div>
      </body>
    </html>
  );
}
