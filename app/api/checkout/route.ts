import { NextRequest, NextResponse } from 'next/server';
import { stripe, PRODUCT_PRICE } from '@/lib/stripe';

export async function POST(request: NextRequest) {
  try {
    const { resumeText, email } = await request.json();

    if (!resumeText) {
      return NextResponse.json(
        { error: 'Resume text is required' },
        { status: 400 }
      );
    }

    if (!stripe) {
      return NextResponse.json(
        { error: 'Payment system not configured' },
        { status: 500 }
      );
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'Resume Rewrite + Optimization',
              description: 'Professional resume rewrite with ATS optimization',
            },
            unit_amount: PRODUCT_PRICE,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_URL}/roast`,
      customer_email: email || undefined,
      metadata: {
        resumeText: resumeText.substring(0, 500), // Stripe metadata limit
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error('Checkout API error:', error);
    return NextResponse.json(
      { error: 'Failed to create checkout session' },
      { status: 500 }
    );
  }
}
