import { NextResponse } from 'next/server';
import { getGitHubUserData } from '@/lib/github';
import { calculateSkillScore } from '@/lib/scoring';
import { generateAIFeedback } from '@/lib/gemini';
import connectDB, { Profile } from '@/lib/mongodb';

export async function POST(req) {
  try {
    const { username } = await req.json();

    if (!username || typeof username !== 'string') {
      return NextResponse.json({ error: 'Valid GitHub username is required' }, { status: 400 });
    }

    // 1. Fetch GitHub Data
    let githubData;
    try {
      githubData = await getGitHubUserData(username);
    } catch (error) {
      if (error.message === 'User not found') {
        return NextResponse.json({ error: 'GitHub user not found' }, { status: 404 });
      }
      throw error;
    }

    // 2. Calculate Deterministic Score
    const score = calculateSkillScore(githubData);

    // 3. Generate AI Feedback
    const feedback = await generateAIFeedback(githubData, score);

    const resultPayload = {
      username: githubData.username,
      score,
      githubData,
      feedback
    };

    // 4. Save to Database (Optional - gracefully degrade if no DB)
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
      // Don't fail the request if DB fails
    }

    return NextResponse.json(resultPayload, { status: 200 });

  } catch (error) {
    console.error("Analysis Error:", error);
    return NextResponse.json(
      { error: 'An error occurred while analyzing the profile' },
      { status: 500 }
    );
  }
}
