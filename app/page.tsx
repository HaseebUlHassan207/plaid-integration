'use client';

import { useEffect, useState } from 'react';
import { usePlaidLink } from 'react-plaid-link';

export default function Home() {
  const [linkToken, setLinkToken] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/create-link-token')
      .then(res => res.json())
      .then(data => setLinkToken(data.link_token));
  }, []);

  const onSuccess = async (public_token: string) => {
    await fetch('/api/exchange-token', {
      method: 'POST',
      body: JSON.stringify({ public_token }),
      headers: { 'Content-Type': 'application/json' },
    });

    alert('Bank account linked!');
  };

  const { open, ready } = usePlaidLink({
    token: linkToken!,
    onSuccess,
  });

  return (
    <main className="flex flex-col items-center justify-center p-12">
      <h1 className="text-3xl mb-6">Plaid Integration</h1>
      <button
        onClick={() => open()}
        disabled={!ready}
        className="px-4 py-2 bg-black text-white rounded cursor-pointer"
      >
        Connect Bank
      </button>
    </main>
  );
}
