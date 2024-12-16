import React, { useState, useEffect } from 'react';
import { Star } from 'lucide-react';

const GitHubStars = ({ repoUrl }) => {
  const [stars, setStars] = useState(null);

  useEffect(() => {
    const fetchStars = async () => {
      try {
        // Extract owner and repo from URL
        const match = repoUrl.match(/github\.com\/([^\/]+)\/([^\/]+)/);
        if (match) {
          const [, owner, repo] = match;
          const response = await fetch(`https://api.github.com/repos/${owner}/${repo}`);
          const data = await response.json();
          setStars(data.stargazers_count);
        }
      } catch (error) {
        console.error('Failed to fetch GitHub stars', error);
      }
    };

    fetchStars();
  }, [repoUrl]);

  if (stars === null) return null;

  return (

    <button onClick={() => window.open(repoUrl, '_blank')} className="flex items-center space-x-1 py-1 rounded-md">
      <img
        src='https://github.githubassets.com/assets/GitHub-Mark-ea2971cee799.png'
        className='w-8 h-8 rounded-full'
      />
      <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
      <span className="text-sm text-gray-200">{stars}</span>
    </button>
  );
};

export default GitHubStars;
