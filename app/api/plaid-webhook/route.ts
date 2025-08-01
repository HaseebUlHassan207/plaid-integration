import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const body = await req.json();
  console.log('Received webhook:', body);

  // You can process different webhook types here
  return NextResponse.json({ received: true });
}
