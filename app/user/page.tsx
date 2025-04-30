'use client';

import { useEffect, useState } from 'react';

export default function UserPage() {
  const [user, setUser] = useState<any>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get('code');

    if (!code) {
      setError('No code found in URL.');
      return;
    }

    const fetchUser = async () => {
      const res = await fetch(`/api/auth/callback?code=${code}`);
      const data = await res.json();

      if (res.ok) {
        setUser(data.user);
      } else {
        setError(data.error || 'Something went wrong');
      }
    };

    fetchUser();
  }, []);

  if (error) return <p>Error: {error}</p>;
  if (!user) return <p>Loading...</p>;

  return (
    <main className="p-6 text-center">
      <h1 className="text-2xl font-bold mb-4">Welcome, {user.name || user.login}!</h1>
      <img src={user.avatar_url} alt="avatar" className="w-32 h-32 rounded-full mx-auto mb-4" />
      <p><strong>Username:</strong> {user.login}</p>
      <p><strong>GitHub URL:</strong> <a href={user.html_url} className="text-blue-500">{user.html_url}</a></p>
    </main>
  );
}
