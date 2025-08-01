import { NextRequest, NextResponse } from 'next/server';
import { plaidClient } from '@/lib/plaid';
import { PrismaClient } from '@prisma/client';
import { CountryCode } from 'plaid';

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const { public_token } = await req.json();

    // 1. Exchange the public token for an access token
    const tokenResponse = await plaidClient.itemPublicTokenExchange({ public_token });
    const { access_token, item_id } = tokenResponse.data;

    // 2. Fetch item details
    const item = await plaidClient.itemGet({ access_token });

    let institutionId: string | undefined = item.data.item.institution_id ?? undefined;
    let institutionName: string | undefined = '';

    // 3. Fetch institution info if available
    if (institutionId) {
      try {
        const institution = await plaidClient.institutionsGetById({
          institution_id: institutionId,
          country_codes: [CountryCode.Us], // ✅ Proper enum usage
        });

        institutionId = institution.data.institution.institution_id;
        institutionName = institution.data.institution.name;
      } catch (err) {
        console.warn('Institution fetch failed:', err);
      }
    }

    // 4. Save Plaid Item to DB
    const savedItem = await prisma.plaidItem.create({
      data: {
        accessToken: access_token,
        itemId: item_id,
        institutionId,
        institutionName,
      },
    });

    // 5. Get and save accounts
    const accountsResponse = await plaidClient.accountsGet({ access_token });

    for (const acct of accountsResponse.data.accounts) {
      await prisma.account.create({
        data: {
          plaidItemId: savedItem.id,
          name: acct.name,
          officialName: acct.official_name ?? '',
          mask: acct.mask ?? '',
          type: acct.type ?? null,
          subtype: acct.subtype as any,
          balances: acct.balances as any,
        },
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error exchanging token:', error);
    return NextResponse.json({ success: false, error: 'Failed to exchange token' }, { status: 500 });
  }
}
