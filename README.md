# SkillScore AI - GitHub Skill Analyzer

A production-ready Next.js application that analyzes a GitHub user's profile, calculates a deterministic skill score, and uses Gemini to generate constructive feedback. 

## Features
- 🔍 **GitHub Analyzer**: Fetches public repos, stars, and languages.
- 🎯 **Deterministic Scoring Engine**: 0-100 score based on GitHub activity metrics.
- ✨ **AI Feedback**: Gemini-powered personalized strengths and weaknesses.
- 🔗 **Shareable**: Quick sharing to LinkedIn, Twitter, and WhatsApp.
- ⚡ **Serverless Ready**: Deploys flawlessly on Vercel.

## Tech Stack
- Framework: Next.js (App Router)
- Styling: Tailwind CSS, Framer Motion
- Node APIs: Next.js Route Handlers
- DB: MongoDB (Optional, for storing run history)
- External APIs: GitHub REST API, Google Gemini API

## Setup Instructions

### 1. Clone the repo
\`\`\`bash
# If you haven't already
git clone https://github.com/yourusername/skillscore-ai.git
cd skillscore-ai
\`\`\`

### 2. Install Dependencies
\`\`\`bash
npm install
\`\`\`

### 3. Add Environment Variables
Rename \`.env.example\` to \`.env.local\` and fill in the details:
- \`GITHUB_TOKEN\`: Create a Personal Access Token in GitHub (Settings > Developer Settings) to increase rate limits.
- \`OPENAI_API_KEY\`: Get this from platform.openai.com.
- \`MONGODB_URI\`: (Optional) MongoDB connection string to save scores.

### 4. Run Locally
\`\`\`bash
npm run dev
\`\`\`
The application will be available at [http://localhost:3000](http://localhost:3000).

## Deployment Steps for Vercel

1. Push your repository to GitHub.
2. Sign in to [Vercel](https://vercel.com/) and click **Add New > Project**.
3. Import your \`skillscore-ai\` GitHub repository.
4. Expand the **Environment Variables** section and add:
   - \`GITHUB_TOKEN\`
   - \`OPENAI_API_KEY\`
   - \`MONGODB_URI\`
5. Click **Deploy**. Vercel will automatically detect Next.js and deploy the serverless functions appropriately.
