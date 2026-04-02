import { getGitHubUserData } from '@/lib/github';
import { calculateSkillScore } from '@/lib/scoring';
import { generateAIFeedback } from '@/lib/gemini';
import connectDB, { Profile } from '@/lib/mongodb';
import ResultCard from '@/components/ResultCard';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default async function ReportPage(props) {
  // Destructure awaitable properties for Next 14 Dynamic Segments
  const searchParams = typeof props.searchParams === 'function' ? await props.searchParams() : await Promise.resolve(props.searchParams || {});
  const params = typeof props.params === 'function' ? await props.params() : await Promise.resolve(props.params || {});
  
  const username = params.username;
  const mode = searchParams.mode || 'roast';

  if (!username) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        <h1>Invalid Profile URL</h1>
      </div>
    );
  }

  let githubData;
  try {
    githubData = await getGitHubUserData(username);
  } catch (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white font-mono flex-col gap-4 relative z-10 selection:bg-zinc-800 selection:text-white">
        <Header />
        <main className="flex-1 flex flex-col justify-center items-center px-4 w-full h-[50vh]">
            <h1 className="text-4xl text-red-500 font-bold mb-4">404 - Not Found</h1>
            <p className="text-zinc-500">Could not find a GitHub user with the handle "@{username}"</p>
            <a href="/" className="mt-8 px-6 py-3 bg-white text-black font-bold rounded-xl shadow-lg">Try another search</a>
        </main>
        <Footer />
      </div>
    );
  }

  // Calculate Deterministic Score
  const score = calculateSkillScore(githubData);

  // Generate AI Feedback
  const feedback = await generateAIFeedback(githubData, score, mode);

  const resultPayload = {
    username: githubData.username,
    score,
    githubData,
    feedback
  };

  // Background Context Safe DB Write
  try {
    const db = await connectDB();
    if (db) {
       await Profile.findOneAndUpdate(
         { username: githubData.username },
         resultPayload,
         { upsert: true, new: true }
       );
    }
  } catch (dbError) {
    console.warn("MongoDB Save Error:", dbError.message);
  }

  return (
    <div className="min-h-screen flex flex-col items-center relative z-10 selection:bg-zinc-800 selection:text-white pb-20">
      <Header />
      
      <main className="flex-1 w-full max-w-5xl px-4 py-12 flex flex-col items-center">
        <ResultCard result={resultPayload} />
        
        <div className="mt-16">
           <a href="/" className="px-6 py-3 border border-zinc-700 bg-zinc-900/50 hover:bg-white hover:text-black font-bold rounded-xl shadow-lg transition-all duration-300">
               Analyze Another Profile
           </a>
        </div>
      </main>

      <Footer />
    </div>
  );
}
