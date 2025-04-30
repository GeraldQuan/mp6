'use client';

import { useEffect, useState } from 'react';

type GitHubUser = {
  login: string;
  name: string;
  avatar_url: string;
  html_url: string;
};

export default function UserPage() {
  const [user, setUser] = useState<GitHubUser | null>(null);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get('code');

    if (!code) {
      setError('No code found in URL.');
      return;
    }

    const fetchUser = async () => {
      try {
        const res = await fetch(`/api/auth/callback?code=${code}`);
        const data = await res.json();

        if (res.ok) {
          setUser(data.user as GitHubUser);
        } else {
          setError(data.error || 'Something went wrong');
        }
      } catch (err) {
        setError('Failed to fetch user info.');
      }
    };

    fetchUser();
  }, []);

  if (error) return <p className="text-red-400 text-center p-4">Error: {error}</p>;
  if (!user) return <p className="text-white text-center p-4">Loading...</p>;

  return (
    <main className="p-6 text-center">
      <h1 className="text-2xl font-bold mb-4">Welcome, {user.name || user.login}!</h1>
      <img
        src={user.avatar_url}
        alt="avatar"
        className="w-32 h-32 rounded-full mx-auto mb-4 shadow-lg border border-white"
      />
      <p><strong>Username:</strong> {user.login}</p>
      <p>
        <strong>GitHub URL:</strong>{' '}
        <a href={user.html_url} className="text-blue-400 hover:underline">
          {user.html_url}
        </a>
      </p>
    </main>
  );
}

