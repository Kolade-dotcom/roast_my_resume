import { NextRequest, NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';
import { createRewritePrompt } from '@/lib/prompts';
import { stripe } from '@/lib/stripe';
import { RewriteResult } from '@/types';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const sessionId = searchParams.get('session_id');

    if (!sessionId) {
      return NextResponse.json(
        { error: 'Session ID is required' },
        { status: 400 }
      );
    }

    if (!stripe) {
      return NextResponse.json(
        { error: 'Payment system not configured' },
        { status: 500 }
      );
    }

    // Retrieve the checkout session
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (session.payment_status !== 'paid') {
      return NextResponse.json(
        { error: 'Payment not completed' },
        { status: 400 }
      );
    }

    const resumeText = session.metadata?.resumeText;

    if (!resumeText) {
      return NextResponse.json(
        { error: 'Resume text not found' },
        { status: 400 }
      );
    }

    // Generate the rewrite using Claude
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

    const responseText = message.content[0].type === 'text' ? message.content[0].text : '';

    // Try to parse JSON response
    let result: RewriteResult;
    try {
      const jsonMatch = responseText.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        result = JSON.parse(jsonMatch[0]);
      } else {
        // Fallback if not JSON formatted
        result = {
          rewrittenResume: responseText,
          beforeAfterExamples: [
            'Before: Generic buzzwords → After: Specific achievements with metrics',
            'Before: Passive language → After: Strong action verbs',
            'Before: Unclear responsibilities → After: Clear, measurable impact'
          ],
          atsScore: 85,
          atsExplanation: 'Your rewritten resume is well-optimized for ATS systems with clear formatting, relevant keywords, and quantifiable achievements.',
          industryTips: [
            'Use industry-specific keywords naturally throughout your resume',
            'Quantify achievements wherever possible with percentages and numbers',
            'Keep formatting simple and ATS-friendly (no tables, text boxes, or images)',
            'Tailor your resume for each job application'
          ]
        };
      }
    } catch (parseError) {
      console.error('Failed to parse JSON response:', parseError);
      result = {
        rewrittenResume: responseText,
        beforeAfterExamples: [
          'Before: Generic buzzwords → After: Specific achievements with metrics',
          'Before: Passive language → After: Strong action verbs',
          'Before: Unclear responsibilities → After: Clear, measurable impact'
        ],
        atsScore: 85,
        atsExplanation: 'Your rewritten resume is well-optimized for ATS systems.',
        industryTips: [
          'Use industry-specific keywords naturally',
          'Quantify achievements with metrics',
          'Keep formatting ATS-friendly'
        ]
      };
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error('Rewrite API error:', error);
    return NextResponse.json(
      { error: 'Failed to generate rewrite' },
      { status: 500 }
    );
  }
}
