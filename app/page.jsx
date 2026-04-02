import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AnalyzerForm from '@/components/AnalyzerForm';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center relative z-10 selection:bg-zinc-800 selection:text-white">
      <Header />
      
      <main className="flex-1 w-full max-w-5xl px-4 py-20 flex flex-col items-center justify-center">
        <div className="text-center space-y-8 mb-16 relative z-10">
          <h1 className="text-6xl md:text-[6.5rem] leading-[1] font-black tracking-tighter brushed-steel-animated drop-shadow-2xl px-2">
            Discover Your True<br />Developer Worth.
          </h1>
          <p className="text-zinc-400 text-lg md:text-2xl max-w-3xl mx-auto font-medium leading-relaxed tracking-tight">
            Our AI inspects your public GitHub profile to calculate a deterministic skill score and deliver brutally honest career feedback.
          </p>
        </div>

        <AnalyzerForm />
      </main>

      <Footer />
    </div>
  );
}
