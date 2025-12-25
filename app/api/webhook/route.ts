import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { createRewritePrompt } from '@/lib/prompts';
import Stripe from 'stripe';

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_API_KEY || '');

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
        const model = genAI.getGenerativeModel({ 
          model: 'gemini-2.5-pro',
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 3000,
          }
        });
        const result = await model.generateContent(createRewritePrompt(resumeText));
        const response = result.response;
        const rewriteText = response.text();
        
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
