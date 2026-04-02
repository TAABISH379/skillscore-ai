export async function getGitHubUserData(username) {
  const headers = {
    'Accept': 'application/vnd.github.v3+json',
    ...(process.env.GITHUB_TOKEN && { 'Authorization': `Bearer ${process.env.GITHUB_TOKEN}` })
  };

  try {
    const [userRes, reposRes] = await Promise.all([
      fetch(`https://api.github.com/users/${username}`, { headers }),
      fetch(`https://api.github.com/users/${username}/repos?per_page=100&sort=pushed`, { headers })
    ]);

    if (!userRes.ok) {
      if (userRes.status === 404) throw new Error('User not found');
      throw new Error(`GitHub API Error: ${userRes.statusText}`);
    }

    const userData = await userRes.json();
    const reposData = reposRes.ok ? await reposRes.json() : [];

    let totalStars = 0;
    let languageCounts = {};

    reposData.forEach(repo => {
      totalStars += repo.stargazers_count;
      if (repo.language) {
        languageCounts[repo.language] = (languageCounts[repo.language] || 0) + 1;
      }
    });

    const topLanguages = Object.entries(languageCounts)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 5)
      .map(([lang]) => lang);

    return {
      username: userData.login,
      name: userData.name || userData.login,
      avatarUrl: userData.avatar_url,
      bio: userData.bio,
      publicRepos: userData.public_repos,
      followers: userData.followers,
      following: userData.following,
      totalStars,
      topLanguages,
    };
  } catch (error) {
    throw error;
  }
}
