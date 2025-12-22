'use client';

import { RewriteResult } from '@/types';
import { Download, CheckCircle } from 'lucide-react';
import Button from './Button';

interface RewriteDisplayProps {
  result: RewriteResult;
  originalResume: string;
}

export default function RewriteDisplay({ result, originalResume }: RewriteDisplayProps) {
  const handleDownload = (format: 'txt') => {
    const blob = new Blob([result.rewrittenResume], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `rewritten-resume.${format}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const shareOnTwitter = () => {
    const text = encodeURIComponent('Just got my resume professionally rewritten! 🚀 Check out RoastMyResume');
    window.open(`https://twitter.com/intent/tweet?text=${text}`, '_blank');
  };

  return (
    <div className="w-full max-w-6xl mx-auto space-y-8">
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 bg-green-100 text-green-800 px-6 py-3 rounded-full mb-4">
          <CheckCircle className="w-5 h-5" />
          <span className="font-semibold">Payment Successful!</span>
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Your Rewritten Resume</h1>
        <p className="text-gray-600">Professional, ATS-optimized, and ready to land interviews</p>
      </div>

      <div className="bg-gradient-to-br from-purple-600 to-purple-700 rounded-2xl shadow-xl p-8 text-white">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold">ATS Optimization Score</h2>
          <div className="text-5xl font-bold">{result.atsScore}/100</div>
        </div>
        <p className="text-purple-100">{result.atsExplanation}</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white rounded-2xl shadow-xl shadow-purple-500/10 p-8">
          <h3 className="text-xl font-bold text-gray-900 mb-4">📋 Before</h3>
          <div className="bg-gray-50 rounded-lg p-6 max-h-96 overflow-y-auto">
            <pre className="whitespace-pre-wrap text-sm text-gray-700 font-mono">
              {originalResume.substring(0, 500)}...
            </pre>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-xl shadow-purple-500/10 p-8">
          <h3 className="text-xl font-bold text-gray-900 mb-4">✨ After</h3>
          <div className="bg-purple-50 rounded-lg p-6 max-h-96 overflow-y-auto">
            <pre className="whitespace-pre-wrap text-sm text-gray-800 font-mono">
              {result.rewrittenResume.substring(0, 500)}...
            </pre>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-xl shadow-purple-500/10 p-8">
        <h3 className="text-2xl font-bold text-gray-900 mb-6">Key Improvements</h3>
        <div className="space-y-4">
          {result.beforeAfterExamples.map((example, index) => (
            <div key={index} className="border-l-4 border-purple-500 pl-6 py-2">
              <p className="text-gray-700">{example}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-xl shadow-purple-500/10 p-8">
        <h3 className="text-2xl font-bold text-gray-900 mb-6">Industry Tips</h3>
        <ul className="space-y-3">
          {result.industryTips.map((tip, index) => (
            <li key={index} className="flex items-start gap-3">
              <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
              <span className="text-gray-700">{tip}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="bg-white rounded-2xl shadow-xl shadow-purple-500/10 p-8">
        <h3 className="text-2xl font-bold text-gray-900 mb-6">Complete Rewritten Resume</h3>
        <div className="bg-gray-50 rounded-lg p-8 mb-6">
          <pre className="whitespace-pre-wrap text-gray-800 leading-relaxed">
            {result.rewrittenResume}
          </pre>
        </div>
        
        <div className="flex flex-wrap gap-4 justify-center">
          <Button onClick={() => handleDownload('txt')}>
            <Download className="w-5 h-5 mr-2 inline-block" />
            Download as TXT
          </Button>
          <Button onClick={shareOnTwitter} variant="secondary">
            Share on Twitter 🐦
          </Button>
        </div>
      </div>
    </div>
  );
}
