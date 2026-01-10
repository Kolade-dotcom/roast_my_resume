import { NextRequest, NextResponse } from 'next/server';
import { getPayment } from '@/lib/storage';

export interface VerifyAccessResponse {
  hasAccess: boolean;
  sessionId?: string;
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const sessionId = searchParams.get('session_id');

    if (!sessionId) {
      return NextResponse.json<VerifyAccessResponse>(
        { hasAccess: false },
        { status: 400 }
      );
    }

    const payment = getPayment(sessionId);

    if (!payment) {
      return NextResponse.json<VerifyAccessResponse>(
        { hasAccess: false },
        { status: 200 }
      );
    }

    // Only grant access if payment is completed
    const hasAccess = payment.status === 'completed';

    return NextResponse.json<VerifyAccessResponse>({
      hasAccess,
      sessionId: hasAccess ? sessionId : undefined,
    });
  } catch (error) {
    console.error('Verify access error:', error);
    return NextResponse.json<VerifyAccessResponse>(
      { hasAccess: false },
      { status: 500 }
    );
  }
}
