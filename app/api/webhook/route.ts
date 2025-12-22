import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import Anthropic from '@anthropic-ai/sdk';
import { createRewritePrompt } from '@/lib/prompts';
import Stripe from 'stripe';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export async function POST(request: NextRequest) {
  const body = await request.text();
  const signature = request.headers.get('stripe-signature');

  if (!signature) {
    return NextResponse.json(
      { error: 'No signature' },
      { status: 400 }
    );
  }

  if (!stripe || !process.env.STRIPE_WEBHOOK_SECRET) {
    return NextResponse.json(
      { error: 'Webhook not configured' },
      { status: 500 }
    );
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (error) {
    console.error('Webhook signature verification failed:', error);
    return NextResponse.json(
      { error: 'Invalid signature' },
      { status: 400 }
    );
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;
    const resumeText = session.metadata?.resumeText;

    if (resumeText) {
      try {
        const message = await anthropic.messages.create({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 3000,
          messages: [
            {
              role: 'user',
              content: createRewritePrompt(resumeText),
            },
          ],
        });

        const rewriteText = message.content[0].type === 'text' ? message.content[0].text : '';
        
        // For MVP: Log the result (in production, store in database or send via email)
        console.log('Rewrite generated for session:', session.id);
        console.log('Rewrite:', rewriteText);
        
        // TODO: Store in database or send via email
      } catch (error) {
        console.error('Failed to generate rewrite:', error);
      }
    }
  }

  return NextResponse.json({ received: true });
}
