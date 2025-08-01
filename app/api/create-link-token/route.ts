import { NextResponse } from 'next/server';
import { plaidClient } from '@/lib/plaid';
import { Products, CountryCode } from 'plaid';

export async function GET() {
  try {
    const tokenResponse = await plaidClient.linkTokenCreate({
      user: {
        client_user_id: 'anonymous-user',
      },
      client_name: 'Plaid Demo App',
      products: [Products.Auth, Products.Transactions],
      language: 'en',
      country_codes: [CountryCode.Us],
    });

    return NextResponse.json({ link_token: tokenResponse.data.link_token });
  } catch (error: any) {
    console.error('Link token creation error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

