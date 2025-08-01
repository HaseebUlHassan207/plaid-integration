import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const accounts = await prisma.account.findMany({
      include: {
        plaidItem: true,
      },
    });

    const formatted = accounts.map((account) => ({
      id: account.id,
      name: account.name,
      officialName: account.officialName,
      mask: account.mask,
      type: account.type,
      subtype: account.subtype,
      balances: account.balances,
      institutionName: account.plaidItem.institutionName,
    }));

    return NextResponse.json({ accounts: formatted });
  } catch (error) {
    console.error('Failed to fetch accounts:', error);
    return NextResponse.json({ error: 'Failed to fetch accounts' }, { status: 500 });
  }
}
