import { NextRequest, NextResponse } from 'next/server';
import { verifyFirebaseToken, upsertD1User, getUserQuotaStatus } from '@/lib/userDb';

export async function POST(req: NextRequest) {
  try {
    const authHeader = req.headers.get('authorization') || '';
    const match = authHeader.match(/^Bearer\s+(.+)$/i);
    const token = match?.[1];

    if (!token) {
      return NextResponse.json(
        { error: 'Missing or malformed Authorization header' },
        { status: 401 }
      );
    }

    const verifiedUser = await verifyFirebaseToken(token);
    if (!verifiedUser) {
      return NextResponse.json(
        { error: 'Invalid or expired authentication token' },
        { status: 401 }
      );
    }

    // Upsert into Cloudflare D1
    await upsertD1User({
      id: verifiedUser.uid,
      email: verifiedUser.email,
      displayName: verifiedUser.displayName,
      photoURL: verifiedUser.photoUrl,
      provider: verifiedUser.provider,
    });

    const quota = await getUserQuotaStatus(verifiedUser.uid);

    return NextResponse.json({
      success: true,
      user: verifiedUser,
      quota,
    });
  } catch (err) {
    console.error('Error in /api/user/sync:', err);
    return NextResponse.json(
      { error: 'Internal server error syncing user state' },
      { status: 500 }
    );
  }
}
