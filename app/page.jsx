import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AnalyzerForm from '@/components/AnalyzerForm';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center relative z-10">
      <Header />
      
      <main className="flex-1 w-full max-w-5xl px-4 py-16 flex flex-col items-center justify-center">
        <div className="text-center space-y-8 mb-14 relative z-10">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-primary/20 blur-[80px] rounded-full -z-10" />
          <h1 className="text-6xl md:text-[5.5rem] leading-[1.1] font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-white via-white to-gray-500 drop-shadow-2xl">
            Discover Your True<br />Developer Worth
          </h1>
          <p className="text-muted-foreground text-xl md:text-2xl max-w-2xl mx-auto font-medium leading-relaxed tracking-tight">
            Our AI-powered analyzer inspects your public GitHub profile, calculates a deterministic skill score, and offers brutally honest career feedback.
          </p>
        </div>

        <AnalyzerForm />
      </main>

      <Footer />
    </div>
  );
}
