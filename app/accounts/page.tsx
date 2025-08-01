'use client';

import { useEffect, useState } from 'react';

type Account = {
  id: string;
  name: string;
  officialName: string | null;
  mask: string | null;
  type: string | null;
  subtype: string | null;
  balances: {
    current?: number;
    available?: number;
    iso_currency_code?: string;
  };
  institutionName: string | null;
};

export default function AccountsPage() {
  const [accounts, setAccounts] = useState<Account[]>([]);

  useEffect(() => {
    const fetchAccounts = async () => {
      const res = await fetch('/api/accounts');
      const data = await res.json();
      setAccounts(data.accounts || []);
    };
    fetchAccounts();
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Connected Bank Accounts</h1>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded shadow">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-4">Institution</th>
              <th className="p-4">Account Name</th>
              <th className="p-4">Type</th>
              <th className="p-4">Balance</th>
            </tr>
          </thead>
          <tbody>
            {accounts.map((acc) => (
              <tr key={acc.id} className="border-t hover:bg-gray-50">
                <td className="p-4">{acc.institutionName || '—'}</td>
                <td className="p-4">{acc.name}</td>
                <td className="p-4">{[acc.type, acc.subtype].filter(Boolean).join(' / ')}</td>
                <td className="p-4">
                  {acc.balances?.current != null
                    ? `$${acc.balances.current.toFixed(2)}`
                    : '—'}
                </td>
              </tr>
            ))}
            {accounts.length === 0 && (
              <tr>
                <td colSpan={4} className="text-center p-4 text-gray-500">
                  No accounts connected yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
