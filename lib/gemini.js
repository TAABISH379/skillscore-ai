import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || 'dummy_key');

export async function generateAIFeedback(githubData, score) {
  if (!process.env.GEMINI_API_KEY) {
    return {
      summary: "Gemini API key is missing. This is a fallback dummy summary.",
      strengths: ["Placeholder strength 1", "Placeholder strength 2"],
      weaknesses: ["Placeholder weakness 1"],
      verdict: "Please add GEMINI_API_KEY to your environment variables."
    };
  }

  const prompt = `
  Act as an expert Senior Developer and Tech Recruiter.
  Analyze the following GitHub profile data and provide a brutally honest but constructive feedback summary.

  Profile Data:
  Name: ${githubData.name} (@${githubData.username})
  Bio: ${githubData.bio || 'N/A'}
  Public Repos: ${githubData.publicRepos}
  Followers: ${githubData.followers}
  Total Stars Received: ${githubData.totalStars}
  Top Languages: ${githubData.topLanguages.join(', ') || 'N/A'}
  Calculated Skill Score: ${score}/100

  Return the response in strictly valid JSON format matching this schema:
  {
    "summary": "2-3 sentences summarizing their profile and overall level.",
    "strengths": ["point 1", "point 2", "point 3"],
    "weaknesses": ["point 1", "point 2"],
    "verdict": "One short punchy sentence verdict (e.g. 'Promising junior developer with great open source potential.')"
  }
  `;

  try {
    const model = genAI.getGenerativeModel({ 
      model: "gemini-2.5-flash", 
      generationConfig: { responseMimeType: "application/json" } 
    });
    
    const result = await model.generateContent(prompt);
    const text = result.response.text();
    
    return JSON.parse(text);
  } catch (error) {
    console.error('Gemini generation error:', error);
    return {
      summary: "Could not generate AI feedback due to an API error.",
      strengths: [],
      weaknesses: [],
      verdict: "Error generating feedback."
    };
  }
}
