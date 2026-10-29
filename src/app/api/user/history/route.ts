import { NextRequest, NextResponse } from 'next/server';
import { verifyFirebaseToken, getUserHistoryFromD1 } from '@/lib/userDb';

export async function GET(req: NextRequest) {
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

    const history = await getUserHistoryFromD1(verifiedUser.uid, 25);

    return NextResponse.json({
      success: true,
      history,
    });
  } catch (err) {
    console.error('Error in /api/user/history:', err);
    return NextResponse.json(
      { error: 'Internal server error fetching user history' },
      { status: 500 }
    );
  }
}
