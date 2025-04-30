'use client';

export default function Home() {
  const loginWithGitHub = () => {
    const clientId = process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID!;
    const redirectUri = process.env.NEXT_PUBLIC_GITHUB_REDIRECT_URI!;
    const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=read:user user:email`;

    window.location.href = githubAuthUrl;
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-3xl font-bold mb-4">GitHub OAuth</h1>
      <button
        className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
        onClick={loginWithGitHub}
      >
        Login with GitHub
      </button>
    </main>
  );
}
