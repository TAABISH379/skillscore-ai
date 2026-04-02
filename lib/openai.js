import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || 'dummy_key_if_missing',
});

export async function generateAIFeedback(githubData, score) {
  if (!process.env.OPENAI_API_KEY) {
    return {
      summary: "OpenAI API key is missing. This is a fallback dummy summary.",
      strengths: ["Placeholder strength 1", "Placeholder strength 2"],
      weaknesses: ["Placeholder weakness 1"],
      verdict: "Please add OPENAI_API_KEY to your environment variables."
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
  Do not include markdown blocks like \`\`\`json, just pure JSON text.
  `;

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.7,
      max_tokens: 500,
    });

    const rawJson = response.choices[0].message.content.trim().replace(/^```json\n?/, '').replace(/\n?```$/, '');
    return JSON.parse(rawJson);
  } catch (error) {
    console.error('OpenAI generation error:', error);
    return {
      summary: "Could not generate AI feedback due to an API error.",
      strengths: [],
      weaknesses: [],
      verdict: "Error generating feedback."
    };
  }
}
