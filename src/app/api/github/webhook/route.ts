import { NextRequest, NextResponse } from 'next/server';
import { revalidateTag } from 'next/cache';
import crypto from 'crypto';

function bufferToHex(buffer: ArrayBuffer) {
  return Buffer.from(buffer).toString('hex');
}

async function verifySignature(req: NextRequest, secret: string | undefined) {
  if (!secret) return { ok: false, reason: 'no-secret' };

  const signature = req.headers.get('x-hub-signature-256');
  if (!signature) return { ok: false, reason: 'no-signature' };

  const buf = await req.arrayBuffer();
  const hmac = crypto.createHmac('sha256', secret);
  hmac.update(Buffer.from(buf));
  const expected = `sha256=${hmac.digest('hex')}`;

  const sigBuf = Buffer.from(signature);
  const expBuf = Buffer.from(expected);
  if (sigBuf.length !== expBuf.length) return { ok: false, reason: 'mismatch-length' };
  const equal = crypto.timingSafeEqual(sigBuf, expBuf);
  return { ok: equal, reason: equal ? 'verified' : 'invalid' };
}

export async function POST(req: NextRequest) {
  const secret = process.env.GITHUB_WEBHOOK_SECRET;

  // verify signature when secret exists
  if (secret) {
    const v = await verifySignature(req, secret);
    if (!v.ok) {
      return NextResponse.json({ ok: false, reason: `signature_${v.reason}` }, { status: 401 });
    }
  }

  // Re-read body as JSON. If verification consumed the body via arrayBuffer, we already have it in memory; parse from arrayBuffer.
  const raw = await req.arrayBuffer();
  let payload: any;
  try {
    payload = JSON.parse(Buffer.from(raw).toString('utf8'));
  } catch (e) {
    return NextResponse.json({ ok: false, reason: 'invalid_json' }, { status: 400 });
  }

  const event = req.headers.get('x-github-event') || '';
  // Only act on release events
  if (event !== 'release') {
    return NextResponse.json({ ok: true, skipped: true, reason: 'not_release_event' });
  }

  const action = payload?.action;
  // GitHub release actions of interest: published, released, edited
  if (!['published', 'released', 'edited'].includes(action)) {
    return NextResponse.json({ ok: true, skipped: true, reason: `action_${action}` });
  }

  try {
    // Revalidate the cached tag used by your repos API
    await revalidateTag('github');
    return NextResponse.json({ ok: true, revalidated: true });
  } catch (err: any) {
    return NextResponse.json({ ok: false, reason: String(err) }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({ ok: true, info: 'POST GitHub release webhooks to this endpoint' });
}
