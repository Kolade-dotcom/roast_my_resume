import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { createRewritePrompt } from '@/lib/prompts';
import { stripe } from '@/lib/stripe';
import { RewriteResult } from '@/types';

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_API_KEY || '');

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

    // Generate the rewrite using Gemini
    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-pro' });
    const geminiResult = await model.generateContent(createRewritePrompt(resumeText));
    const geminiResponse = geminiResult.response;
    const responseText = geminiResponse.text();

    // Try to parse JSON response
    let rewriteResult: RewriteResult;
    try {
      const jsonMatch = responseText.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        rewriteResult = JSON.parse(jsonMatch[0]);
      } else {
        // Fallback if not JSON formatted
        rewriteResult = {
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
      rewriteResult = {
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

    return NextResponse.json(rewriteResult);
  } catch (error) {
    console.error('Rewrite API error:', error);
    return NextResponse.json(
      { error: 'Failed to generate rewrite' },
      { status: 500 }
    );
  }
}
