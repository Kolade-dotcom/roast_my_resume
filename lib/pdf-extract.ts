export async function extractTextFromPDF(file: File): Promise<string> {
  try {
    // Dynamic import to handle pdf-parse module
    const pdfParse = require('pdf-parse');
    
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const data = await pdfParse(buffer);
    
    // Clean up the extracted text
    const cleanedText = data.text
      .replace(/\s+/g, ' ')
      .replace(/\n\s*\n/g, '\n')
      .trim();
    
    if (!cleanedText || cleanedText.length < 50) {
      throw new Error('PDF appears to be empty or too short');
    }
    
    return cleanedText;
  } catch (error) {
    console.error('PDF extraction error:', error);
    throw new Error('Failed to extract text from PDF. Please ensure the file is a valid PDF with text content.');
  }
}
