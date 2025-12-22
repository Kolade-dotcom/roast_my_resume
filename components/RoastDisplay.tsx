'use client';

import { useRef } from 'react';
import { Flame, Zap, Target, TrendingUp, Download } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { toPng } from 'html-to-image';

interface RoastDisplayProps {
  roast: string;
}

export default function RoastDisplay({ roast }: RoastDisplayProps) {
  const roastCardRef = useRef<HTMLDivElement>(null);

  const handleDownloadImage = async () => {
    if (!roastCardRef.current) return;

    try {
      const dataUrl = await toPng(roastCardRef.current, {
        quality: 1,
        pixelRatio: 2,
        backgroundColor: '#0F0F0F',
      });

      const link = document.createElement('a');
      link.download = 'my-resume-roast.png';
      link.href = dataUrl;
      link.click();
    } catch (error) {
      console.error('Failed to generate image:', error);
      alert('Failed to generate image. Please try again.');
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto space-y-8">
      {/* Main Roast Card */}
      <div ref={roastCardRef} className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-2xl p-8 md:p-12">
        <div className="mb-8 text-center">
          <div className="inline-flex items-center gap-2 bg-[#FF3B30]/10 border border-[#FF3B30]/30 text-[#FF3B30] px-4 py-2 rounded-lg text-sm font-bold mb-6 uppercase tracking-wider">
            <Flame className="w-4 h-4" />
            Roasted
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-3 tracking-tight">
            The Verdict
          </h2>
          <p className="text-[#666666] text-lg">The truth hurts, but it helps</p>
        </div>
        
        <div className="bg-[#0F0F0F] rounded-xl p-8 border border-[#2A2A2A] markdown-content">
          <ReactMarkdown
            components={{
              h1: ({ children }) => <h1 className="text-3xl font-black text-white mb-4 mt-6">{children}</h1>,
              h2: ({ children }) => <h2 className="text-2xl font-bold text-white mb-3 mt-5">{children}</h2>,
              h3: ({ children }) => <h3 className="text-xl font-bold text-[#FF3B30] mb-2 mt-4">{children}</h3>,
              p: ({ children }) => <p className="text-[#A1A1A1] leading-relaxed text-lg mb-4">{children}</p>,
              strong: ({ children }) => <strong className="text-white font-bold">{children}</strong>,
              em: ({ children }) => <em className="text-[#FF9500] italic">{children}</em>,
              ul: ({ children }) => <ul className="list-none space-y-2 mb-4 ml-4">{children}</ul>,
              ol: ({ children }) => <ol className="list-decimal space-y-2 mb-4 ml-6 text-[#A1A1A1]">{children}</ol>,
              li: ({ children }) => <li className="text-[#A1A1A1] leading-relaxed">{children}</li>,
              code: ({ children }) => <code className="bg-[#1A1A1A] text-[#FF3B30] px-2 py-1 rounded text-sm font-mono">{children}</code>,
              blockquote: ({ children }) => <blockquote className="border-l-4 border-[#FF3B30] pl-4 italic text-[#666666] my-4">{children}</blockquote>,
            }}
          >
            {roast}
          </ReactMarkdown>
        </div>
      </div>

      {/* Download Button */}
      <div className="flex justify-center">
        <button
          onClick={handleDownloadImage}
          className="flex items-center gap-2 bg-[#1A1A1A] border border-[#2A2A2A] text-white px-6 py-3 rounded-xl hover:border-[#FF3B30] hover:text-[#FF3B30] transition-all font-medium"
        >
          <Download className="w-5 h-5" />
          Download as Image
        </button>
      </div>

      {/* Premium Upgrade Card */}
      <div className="bg-[#1A1A1A] border-2 border-[#FF3B30] rounded-2xl p-8 md:p-12 relative">
        <div className="absolute -top-3 right-6 bg-[#FF9500] text-[#0F0F0F] px-3 py-1 rounded-full text-xs font-bold uppercase">
          Coming Soon
        </div>
        
        <div className="text-center mb-8">
          <Flame className="w-12 h-12 text-[#FF3B30] mx-auto mb-4" />
          <h3 className="text-3xl md:text-4xl font-black text-white mb-3 tracking-tight">
            Ready to Level Up?
          </h3>
          <p className="text-[#A1A1A1] text-lg max-w-2xl mx-auto">
            Get a complete professional rewrite that actually gets you interviews
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-4 mb-8">
          <div className="bg-[#0F0F0F] border border-[#2A2A2A] rounded-xl p-6 text-center">
            <div className="w-12 h-12 bg-[#FF3B30]/10 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Zap className="w-6 h-6 text-[#FF3B30]" />
            </div>
            <h4 className="text-white font-bold text-base mb-2">AI Rewrite</h4>
            <p className="text-[#666666] text-sm">Complete professional overhaul</p>
          </div>

          <div className="bg-[#0F0F0F] border border-[#2A2A2A] rounded-xl p-6 text-center">
            <div className="w-12 h-12 bg-[#FF3B30]/10 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Target className="w-6 h-6 text-[#FF3B30]" />
            </div>
            <h4 className="text-white font-bold text-base mb-2">ATS Optimized</h4>
            <p className="text-[#666666] text-sm">Beat the robot gatekeepers</p>
          </div>

          <div className="bg-[#0F0F0F] border border-[#2A2A2A] rounded-xl p-6 text-center">
            <div className="w-12 h-12 bg-[#FF3B30]/10 rounded-lg flex items-center justify-center mx-auto mb-4">
              <TrendingUp className="w-6 h-6 text-[#FF3B30]" />
            </div>
            <h4 className="text-white font-bold text-base mb-2">More Callbacks</h4>
            <p className="text-[#666666] text-sm">73% increase on average</p>
          </div>
        </div>

        {/* Pricing */}
        <div className="bg-[#0F0F0F] border border-[#2A2A2A] rounded-xl p-6 text-center mb-6">
          <div className="text-5xl font-black text-white mb-2">
            $9.99
          </div>
          <div className="text-[#A1A1A1] font-medium">One-time payment • Instant delivery</div>
        </div>

        {/* CTA Button */}
        <button
          disabled
          className="w-full bg-[#2A2A2A] text-[#666666] px-6 py-4 rounded-xl font-semibold cursor-not-allowed"
        >
          Payment Integration Coming Soon
        </button>
        
        <p className="text-[#666666] text-sm mt-4 text-center">
          We're integrating Stripe payments. Check back soon!
        </p>
      </div>
    </div>
  );
}
