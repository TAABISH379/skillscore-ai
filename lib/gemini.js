import { GoogleGenAI } from "@google/genai";

// The client automatically picks up process.env.GEMINI_API_KEY
const ai = new GoogleGenAI({});

export async function generateAIFeedback(githubData, score, mode = "roast") {
  if (!process.env.GEMINI_API_KEY) {
    return {
      summary: "Gemini API key is missing. This is a fallback dummy summary.",
      strengths: ["Placeholder strength 1", "Placeholder strength 2"],
      weaknesses: ["Placeholder weakness 1"],
      verdict: "Please add GEMINI_API_KEY to your environment variables.",
      rpgClass: "Level 1 Dummy",
      salary: "$0 (No API Key)",
      commitRoast: "Cannot roast commits without Gemini."
    };
  }

  const personaInstruction = mode === "roast" 
    ? "Act as a brutally honest, sarcastic Senior Developer. You are extremely critical of messy code, lack of tests, and generic projects. Roast the user's profile with dry humor, but keep the strengths real."
    : "Act as an overly enthusiastic, supportive Tech Recruiter and Developer Advocate. You are overly excited about every contribution. Hype the user up immensely, but keep the weaknesses constructive and encouraging.";

  const prompt = `
  ${personaInstruction}
  
  Analyze the following GitHub profile data and provide a highly entertaining, constructive feedback summary.

  Profile Data:
  Name: ${githubData.name} (@${githubData.username})
  Bio: ${githubData.bio || 'N/A'}
  Public Repos: ${githubData.publicRepos}
  Followers: ${githubData.followers}
  Total Stars Received: ${githubData.totalStars}
  Top Languages: ${githubData.topLanguages.join(', ') || 'N/A'}
  Calculated Skill Score: ${score}/100
  Recent Commit Messages (Use these for the commitRoast):
  ${githubData.recentCommits.map(c => `- "${c}"`).join('\n')}

  Return the response in strictly valid JSON format matching this schema:
  {
    "summary": "2-3 sentences summarizing their profile based on your persona.",
    "strengths": ["point 1", "point 2", "point 3"],
    "weaknesses": ["point 1", "point 2"],
    "verdict": "One short punchy sentence verdict that aligns perfectly with your assigned persona.",
    "rpgClass": "A humorous RPG Class based on their top language and skill score (e.g., 'Level 84 TypeScript Warlock' or 'Level 12 HTML Barbarian').",
    "salary": "A saturated, highly exaggerated predicted salary. (e.g. '$650,000 + FAANG Equity' or '$14,000 paid in exposure').",
    "commitRoast": "1-2 sentences specifically roasting or reviewing their recent commit messages shown above."
  }
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: "OBJECT",
          properties: {
            summary: { type: "STRING" },
            strengths: { type: "ARRAY", items: { type: "STRING" } },
            weaknesses: { type: "ARRAY", items: { type: "STRING" } },
            verdict: { type: "STRING" },
            rpgClass: { type: "STRING" },
            salary: { type: "STRING" },
            commitRoast: { type: "STRING" }
          },
          required: ["summary", "strengths", "weaknesses", "verdict", "rpgClass", "salary", "commitRoast"]
        }
      }
    });
    
    const text = response.text;
    const cleanedText = text.replace(/^```(?:json)?\n?/i, '').replace(/\n?```$/i, '').trim();
    
    return JSON.parse(cleanedText);
  } catch (error) {
    console.error('Gemini generation error:', error);
    return {
      summary: `Could not generate AI feedback: ${error.message || 'Unknown API Error'}`,
      strengths: [],
      weaknesses: [],
      verdict: "Error generating feedback.",
      rpgClass: "Level 404 Disconnected Wizard",
      salary: "Server Offline",
      commitRoast: "The API is down, so your commits are safe... for now."
    };
  }
}
