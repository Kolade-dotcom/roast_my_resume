'use client';

import { useRef, useState } from 'react';
import { Flame, Zap, Target, TrendingUp, Download, Check, ChevronDown, ChevronUp } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { toPng } from 'html-to-image';
import { toast } from 'sonner';

interface RoastDisplayProps {
  roast: string;
}

export default function RoastDisplay({ roast }: RoastDisplayProps) {
  const roastCardRef = useRef<HTMLDivElement>(null);
  const [isExpanded, setIsExpanded] = useState(false);

  const handleDownloadImage = async () => {
    if (!roastCardRef.current) return;

    const downloadToast = toast.loading('📸 Generating image...');
    try {
      // Temporarily expand content for full capture
      const wasExpanded = isExpanded;
      setIsExpanded(true);
      
      // Wait for state update
      await new Promise(resolve => setTimeout(resolve, 100));
      
      const dataUrl = await toPng(roastCardRef.current, {
        quality: 1,
        pixelRatio: 2,
        backgroundColor: '#0F0F0F',
      });

      // Restore previous state
      setIsExpanded(wasExpanded);

      const link = document.createElement('a');
      link.download = 'my-resume-roast.png';
      link.href = dataUrl;
      link.click();
      
      toast.success('Image downloaded! 🎉', { id: downloadToast });
    } catch (error) {
      console.error('Failed to generate image:', error);
      toast.error('Failed to generate image. Please try again.', { id: downloadToast });
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto space-y-4 md:space-y-6">
      {/* Main Roast Card */}
      <div ref={roastCardRef} className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-xl md:rounded-2xl p-4 sm:p-6 md:p-12 relative">
        
        <div className="mb-4 md:mb-8 text-center">
          <div className="inline-flex items-center gap-2 bg-[#FF3B30]/10 border border-[#FF3B30]/30 text-[#FF3B30] px-3 py-1.5 md:px-4 md:py-2 rounded-lg text-xs md:text-sm font-bold mb-3 md:mb-6 uppercase tracking-wider">
            <Flame className="w-3 h-3 md:w-4 md:h-4" />
            Roasted
          </div>
          <h2 className="text-xl sm:text-3xl md:text-5xl font-black text-white mb-1 md:mb-3 tracking-tight">
            The Verdict
          </h2>
          <p className="text-[#666666] text-xs md:text-lg">The truth hurts, but it helps</p>
        </div>
        
        {/* Scrollable content area on mobile */}
        <div className={`bg-[#0F0F0F] rounded-lg md:rounded-xl p-3 sm:p-6 md:p-8 border border-[#2A2A2A] markdown-content ${!isExpanded ? 'max-h-[60vh] md:max-h-none overflow-y-auto' : ''}`}>
          <ReactMarkdown
            components={{
              h1: ({ children }) => <h1 className="text-lg sm:text-2xl md:text-3xl font-black text-white mb-2 md:mb-4 mt-3 md:mt-6">{children}</h1>,
              h2: ({ children }) => <h2 className="text-base sm:text-xl md:text-2xl font-bold text-white mb-2 md:mb-3 mt-3 md:mt-5">{children}</h2>,
              h3: ({ children }) => <h3 className="text-sm sm:text-lg md:text-xl font-bold text-[#FF3B30] mb-1.5 mt-2 md:mt-4">{children}</h3>,
              p: ({ children }) => <p className="text-[#A1A1A1] leading-relaxed text-xs sm:text-base md:text-lg mb-2 md:mb-4">{children}</p>,
              strong: ({ children }) => <strong className="text-white font-bold">{children}</strong>,
              em: ({ children }) => <em className="text-[#FF9500] italic">{children}</em>,
              ul: ({ children }) => <ul className="list-none space-y-1 md:space-y-2 mb-2 md:mb-4 ml-1 md:ml-4">{children}</ul>,
              ol: ({ children }) => <ol className="list-decimal space-y-1 md:space-y-2 mb-2 md:mb-4 ml-3 md:ml-6 text-[#A1A1A1]">{children}</ol>,
              li: ({ children }) => <li className="text-[#A1A1A1] leading-relaxed text-xs sm:text-base">{children}</li>,
              code: ({ children }) => <code className="bg-[#1A1A1A] text-[#FF3B30] px-1 py-0.5 md:px-2 md:py-1 rounded text-xs md:text-sm font-mono break-all">{children}</code>,
              blockquote: ({ children }) => <blockquote className="border-l-2 md:border-l-4 border-[#FF3B30] pl-2 md:pl-4 italic text-[#666666] my-2 md:my-4 text-xs md:text-base">{children}</blockquote>,
            }}
          >
            {roast}
          </ReactMarkdown>
        </div>

        {/* Expand/Collapse button - mobile only */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="md:hidden w-full mt-3 py-2 flex items-center justify-center gap-2 text-[#A1A1A1] hover:text-white text-xs font-medium transition-colors"
        >
          {isExpanded ? (
            <>
              <ChevronUp className="w-4 h-4" />
              Show less
            </>
          ) : (
            <>
              <ChevronDown className="w-4 h-4" />
              Expand full roast
            </>
          )}
        </button>
        
        {/* Bottom watermark for sharing */}
        <div className="mt-4 md:mt-6 pt-3 md:pt-4 border-t border-[#2A2A2A] text-center">
          <p className="text-[#666666] text-xs md:text-sm">
            Get your resume roasted at <span className="text-[#FF3B30] font-bold">RoastMyResume.com</span> 🔥
          </p>
        </div>
      </div>

      {/* Download Button */}
      <div className="flex justify-center">
        <button
          onClick={handleDownloadImage}
          className="flex items-center gap-2 bg-[#1A1A1A] border border-[#2A2A2A] text-white px-4 md:px-6 py-2.5 md:py-3 rounded-lg md:rounded-xl hover:border-[#FF3B30] hover:text-[#FF3B30] transition-all font-medium text-sm md:text-base cursor-pointer"
        >
          <Download className="w-4 h-4 md:w-5 md:h-5" />
          Download as Image
        </button>
      </div>

      {/* Premium Upgrade Card - Compact on mobile */}
      <div className="bg-[#1A1A1A] border-2 border-[#FF3B30] rounded-xl md:rounded-2xl p-4 sm:p-6 md:p-12 relative">
        <div className="absolute -top-3 right-4 md:right-6 bg-[#FF9500] text-[#0F0F0F] px-2 md:px-3 py-1 rounded-full text-[10px] md:text-xs font-bold uppercase">
          Coming Soon
        </div>
        
        <div className="text-center mb-4 md:mb-8">
          <Flame className="w-8 h-8 md:w-12 md:h-12 text-[#FF3B30] mx-auto mb-2 md:mb-4" />
          <h3 className="text-xl sm:text-2xl md:text-4xl font-black text-white mb-1 md:mb-3 tracking-tight">
            Get the Complete Package
          </h3>
          <p className="text-[#A1A1A1] text-xs sm:text-sm md:text-lg max-w-2xl mx-auto">
            Everything you need to land your next job
          </p>
        </div>

        {/* Features Grid - 2x2 on mobile */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4 mb-4 md:mb-8">
          <div className="bg-[#0F0F0F] border border-[#2A2A2A] rounded-lg p-3 md:p-6 text-center">
            <div className="w-8 h-8 md:w-12 md:h-12 bg-[#FF3B30]/10 rounded-lg flex items-center justify-center mx-auto mb-2 md:mb-4">
              <Zap className="w-4 h-4 md:w-6 md:h-6 text-[#FF3B30]" />
            </div>
            <h4 className="text-white font-bold text-xs md:text-base">AI Rewrite</h4>
          </div>

          <div className="bg-[#0F0F0F] border border-[#2A2A2A] rounded-lg p-3 md:p-6 text-center">
            <div className="w-8 h-8 md:w-12 md:h-12 bg-[#FF3B30]/10 rounded-lg flex items-center justify-center mx-auto mb-2 md:mb-4">
              <Target className="w-4 h-4 md:w-6 md:h-6 text-[#FF3B30]" />
            </div>
            <h4 className="text-white font-bold text-xs md:text-base">3 Templates</h4>
          </div>

          <div className="bg-[#0F0F0F] border border-[#2A2A2A] rounded-lg p-3 md:p-6 text-center">
            <div className="w-8 h-8 md:w-12 md:h-12 bg-[#FF3B30]/10 rounded-lg flex items-center justify-center mx-auto mb-2 md:mb-4">
              <TrendingUp className="w-4 h-4 md:w-6 md:h-6 text-[#FF3B30]" />
            </div>
            <h4 className="text-white font-bold text-xs md:text-base">ATS Score</h4>
          </div>

          <div className="bg-[#0F0F0F] border border-[#2A2A2A] rounded-lg p-3 md:p-6 text-center">
            <div className="w-8 h-8 md:w-12 md:h-12 bg-[#FF3B30]/10 rounded-lg flex items-center justify-center mx-auto mb-2 md:mb-4">
              <Download className="w-4 h-4 md:w-6 md:h-6 text-[#FF3B30]" />
            </div>
            <h4 className="text-white font-bold text-xs md:text-base">All Formats</h4>
          </div>
        </div>

        {/* What's Included - Hidden on mobile, shown on md+ */}
        <div className="hidden md:block bg-[#0F0F0F] border border-[#2A2A2A] rounded-xl p-6 mb-8">
          <h4 className="text-white font-bold text-lg mb-4">What's Included:</h4>
          <div className="grid sm:grid-cols-2 gap-3 text-base">
            {[
              'Professional AI rewrite',
              '3 resume templates',
              'PDF, DOCX, TXT downloads',
              'LinkedIn-optimized version',
              'Custom cover letter',
              'ATS optimization score',
              'Before/after comparison',
              'Industry-specific tips',
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-[#FF3B30] flex items-center justify-center shrink-0">
                  <Check className="w-2.5 h-2.5 text-white" />
                </div>
                <span className="text-[#A1A1A1]">{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Pricing - Compact on mobile */}
        <div className="bg-[#0F0F0F] border border-[#2A2A2A] rounded-lg md:rounded-xl p-3 md:p-6 text-center mb-3 md:mb-6">
          <div className="text-3xl md:text-5xl font-black text-white mb-0.5 md:mb-2">
            $9.99
          </div>
          <div className="text-[#A1A1A1] font-medium text-xs md:text-base">One-time payment • Instant delivery</div>
        </div>

        {/* CTA Button */}
        <button
          disabled
          className="w-full bg-[#2A2A2A] text-[#666666] px-4 md:px-6 py-2.5 md:py-4 rounded-lg md:rounded-xl font-semibold text-xs md:text-base"
        >
          Payment Integration Coming Soon
        </button>
      </div>
    </div>
  );
}
