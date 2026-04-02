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

    // Fetch user events to rip recent commit messages
    let recentCommits = [];
    try {
      const eventsRes = await fetch(`https://api.github.com/users/${username}/events/public?per_page=30`, { headers });
      if (eventsRes.ok) {
        const eventsData = await eventsRes.json();
        const pushEvents = eventsData.filter(e => e.type === 'PushEvent' && e.payload?.commits);
        const allCommits = pushEvents.flatMap(e => e.payload.commits.map(c => c.message));
        // Get up to 5 unique commit messages
        recentCommits = [...new Set(allCommits)].slice(0, 5);
      }
    } catch (e) {
      console.error('Failed to fetch events, skipping commits.');
    }

    if (recentCommits.length === 0) {
      recentCommits = ["No recent public commits found (Silent coder or lazy?)"];
    }

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
      recentCommits,
    };
  } catch (error) {
    throw error;
  }
}
