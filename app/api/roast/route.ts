import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { createRoastPrompt } from '@/lib/prompts';

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_API_KEY || '');

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File | null;
    const text = formData.get('text') as string | null;

    let resumeText: string;

    if (file) {
      // Extract text from PDF if needed
      const { extractTextFromPDF } = await import('@/lib/pdf-extract');
      resumeText = await extractTextFromPDF(file);
    } else if (text) {
      resumeText = text;
    } else {
      return NextResponse.json(
        { error: 'No file or text provided' },
        { status: 400 }
      );
    }

    if (resumeText.length < 10) {
      return NextResponse.json(
        { error: 'Resume text is too short' },
        { status: 400 }
      );
    }

    // Generate roast using Gemini
    const model = genAI.getGenerativeModel({ 
      model: 'gemini-2.5-flash',
      generationConfig: {
        temperature: 1.2,
        maxOutputTokens: 2048,
        topP: 0.95,
      }
    });
    const result = await model.generateContent(createRoastPrompt(resumeText));
    const response = result.response;
    const roast = response.text();

    return NextResponse.json({
      roast,
      resumeText,
    });
  } catch (error) {
    console.error('Roast API error:', error);
    return NextResponse.json(
      { error: 'Failed to generate roast' },
      { status: 500 }
    );
  }
}
