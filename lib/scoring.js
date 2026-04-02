/**
 * Deterministic scoring engine (0-100) based on GitHub stats
 */
export function calculateSkillScore(data) {
  let score = 0;

  // Followers (max 20 points)
  // 500+ followers = 20 pts
  score += Math.min(20, (data.followers / 500) * 20);

  // Stars (max 30 points)
  // 1000+ stars = 30 pts
  score += Math.min(30, (data.totalStars / 1000) * 30);

  // Repositories (max 20 points)
  // 50+ repos = 20 pts, but we also want to reward active ones. Since we only count up to 50 public, 
  score += Math.min(20, (data.publicRepos / 50) * 20);

  // Languages Diversity (max 10 points)
  // 5 languages = 10 pts
  score += Math.min(10, (data.topLanguages.length / 5) * 10);

  // Remaining 20 points as base score for having an active GitHub (non-zero stats)
  if (data.publicRepos > 0) score += 10;
  if (data.followers > 0 || data.totalStars > 0) score += 10;

  return Math.round(Math.min(100, Math.max(0, score)));
}
