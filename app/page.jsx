import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AnalyzerForm from '@/components/AnalyzerForm';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center">
      <Header />
      
      <main className="flex-1 w-full max-w-5xl px-4 py-12 flex flex-col items-center justify-center">
        <div className="text-center space-y-4 mb-12">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight bg-gradient-to-r from-blue-400 via-indigo-400 to-primary text-transparent bg-clip-text">
            Discover Your True<br />Developer Worth
          </h1>
          <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto">
            Our AI-powered analyzer inspects your public GitHub profile, calculates a deterministic skill score, and offers brutally honest career feedback.
          </p>
        </div>

        <AnalyzerForm />
      </main>

      <Footer />
    </div>
  );
}
