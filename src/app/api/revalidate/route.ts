import { NextRequest, NextResponse } from 'next/server';
import { revalidateTag } from 'next/cache';

const SECRET = process.env.REVALIDATE_SECRET;

export async function POST(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const secret = searchParams.get('secret');
  if (!secret || secret !== SECRET) {
    return NextResponse.json({ revalidated: false, error: 'Invalid secret' }, { status: 401 });
  }
  await revalidateTag('github');
  return NextResponse.json({ revalidated: true });
}
