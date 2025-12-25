'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import UploadZone from '@/components/UploadZone';
import { Flame, Zap, Target, TrendingUp, Check } from 'lucide-react';

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (text: string) => {
    setIsLoading(true);
    const loadingToast = toast.loading('🔥 Roasting your resume...');
    try {
      const formData = new FormData();
      formData.append('text', text);
      const response = await fetch('/api/roast', {
        method: 'POST',
        body: formData,
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to generate roast');
      }
      const data = await response.json();
      sessionStorage.setItem('roastResult', JSON.stringify(data));
      toast.success('Roast complete! 🔥', { id: loadingToast });
      router.push('/roast');
    } catch (error) {
      console.error('Error:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to generate roast. Please try again.', { id: loadingToast });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0F0F0F] text-white relative overflow-hidden">
      {/* Subtle background gradient - barely visible */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-red-600 rounded-full mix-blend-screen filter blur-[120px] opacity-[0.03] animate-blob"></div>
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-orange-600 rounded-full mix-blend-screen filter blur-[120px] opacity-[0.03] animate-blob" style={{animationDelay: '10s'}}></div>
      </div>

      {/* Subtle texture */}
      <div className="texture-overlay fixed inset-0 pointer-events-none"></div>

      <div className="container mx-auto px-6 py-8 relative z-10 max-w-7xl">
        {/* Header */}
        <header className="flex justify-between items-center mb-12 md:mb-24">
          <div className="text-lg md:text-xl font-bold tracking-tight">
            <span className="text-white">RoastMyResume</span>
          </div>
          <div className="flex items-center gap-2 bg-[#1A1A1A] border border-[#2A2A2A] px-3 py-1.5 md:px-4 md:py-2 rounded-lg">
            <Flame className="w-3 h-3 md:w-4 md:h-4 text-[#FF3B30]" />
            <span className="text-xs md:text-sm font-medium text-[#A1A1A1]">5,247 roasted</span>
          </div>
        </header>

        {/* Hero Section */}
        <section className="grid lg:grid-cols-2 gap-8 lg:gap-16 mb-16 md:mb-32 items-center">
          <div className="space-y-6 md:space-y-8">
            <div className="inline-flex items-center gap-2 bg-[#1A1A1A] border border-[#2A2A2A] px-3 py-1.5 md:px-4 md:py-2 rounded-lg">
              <span className="text-xs md:text-sm font-medium text-[#A1A1A1]">Free • No signup required</span>
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black leading-[1.1] tracking-tight">
              <span className="block text-white">Your Resume</span>
              <span className="block text-white red-underline">Probably Sucks</span>
              <span className="block text-xl md:text-2xl lg:text-3xl text-[#666666] font-normal mt-4 md:mt-6">
                Let's fix that.
              </span>
            </h1>

            <p className="text-base md:text-lg lg:text-xl text-[#A1A1A1] font-normal max-w-xl leading-relaxed">
              Get brutally honest AI feedback on your resume in 10 seconds. 
              No fluff, no corporate speak—just what actually needs to change.
            </p>

            <div className="flex flex-wrap gap-4 md:gap-8 pt-2 md:pt-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 md:w-6 md:h-6 text-[#FF9500]" />
                </div>
                <div>
                  <div className="text-xl md:text-2xl font-bold text-white">73%</div>
                  <div className="text-xs md:text-sm text-[#666666]">More callbacks</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg flex items-center justify-center">
                  <Zap className="w-5 h-5 md:w-6 md:h-6 text-[#FF9500]" />
                </div>
                <div>
                  <div className="text-xl md:text-2xl font-bold text-white">10s</div>
                  <div className="text-xs md:text-sm text-[#666666]">To get roasted</div>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:pl-8">
            <UploadZone onSubmit={handleSubmit} isLoading={isLoading} />
          </div>
        </section>

        {/* How It Works */}
        <section className="mb-16 md:mb-32">
          <div className="text-center mb-12 md:mb-20">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-3 md:mb-4 tracking-tight">How it works</h2>
            <p className="text-base md:text-lg text-[#666666]">Three steps to a resume that doesn't suck</p>
          </div>

          <div className="grid md:grid-cols-3 gap-4 md:gap-6">
            <div className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-2xl p-6 md:p-8 hover:border-[#3A3A3A] transition-all duration-300">
              <div className="text-4xl md:text-5xl font-black text-[#FF3B30] mb-4 md:mb-6">01</div>
              <div className="w-12 h-12 md:w-14 md:h-14 bg-[#0F0F0F] border border-[#2A2A2A] rounded-xl flex items-center justify-center mb-4 md:mb-6">
                <Target className="w-6 h-6 md:w-7 md:h-7 text-[#FF3B30]" />
              </div>
              <h3 className="text-lg md:text-xl font-bold text-white mb-2 md:mb-3">Upload</h3>
              <p className="text-sm md:text-base text-[#A1A1A1] leading-relaxed">
                Drop your resume or paste the text. PDF, Word, or plain text—we'll handle it.
              </p>
            </div>

            <div className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-2xl p-6 md:p-8 hover:border-[#3A3A3A] transition-all duration-300 md:mt-12">
              <div className="text-4xl md:text-5xl font-black text-[#FF3B30] mb-4 md:mb-6">02</div>
              <div className="w-12 h-12 md:w-14 md:h-14 bg-[#0F0F0F] border border-[#2A2A2A] rounded-xl flex items-center justify-center mb-4 md:mb-6">
                <Flame className="w-6 h-6 md:w-7 md:h-7 text-[#FF3B30]" />
              </div>
              <h3 className="text-lg md:text-xl font-bold text-white mb-2 md:mb-3">Get Roasted</h3>
              <p className="text-sm md:text-base text-[#A1A1A1] leading-relaxed">
                Our AI analyzes every line. Buzzwords, clichés, weak statements—nothing escapes.
              </p>
            </div>

            <div className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-2xl p-6 md:p-8 hover:border-[#3A3A3A] transition-all duration-300 md:mt-24">
              <div className="text-4xl md:text-5xl font-black text-[#FF3B30] mb-4 md:mb-6">03</div>
              <div className="w-12 h-12 md:w-14 md:h-14 bg-[#0F0F0F] border border-[#2A2A2A] rounded-xl flex items-center justify-center mb-4 md:mb-6">
                <Zap className="w-6 h-6 md:w-7 md:h-7 text-[#FF3B30]" />
              </div>
              <h3 className="text-lg md:text-xl font-bold text-white mb-2 md:mb-3">Improve</h3>
              <p className="text-sm md:text-base text-[#A1A1A1] leading-relaxed">
                Fix the issues yourself or upgrade for a complete professional rewrite.
              </p>
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section className="mb-16 md:mb-32">
          <div className="text-center mb-12 md:mb-20">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-3 md:mb-4 tracking-tight">From roasted to hired</h2>
            <p className="text-base md:text-lg text-[#666666]">Everything you need in one package</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-4 md:gap-6 max-w-5xl mx-auto">
            {/* Free Tier */}
            <div className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-2xl p-6 md:p-10 hover:border-[#3A3A3A] transition-all duration-300">
              <div className="mb-6 md:mb-8">
                <div className="text-xs md:text-sm font-medium text-[#666666] uppercase tracking-wider mb-2">Free Forever</div>
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">The Roast</h3>
                <div className="text-4xl md:text-5xl font-black text-white mb-2">$0</div>
                <p className="text-xs md:text-sm text-[#666666]">See what's wrong</p>
              </div>

              <ul className="space-y-3 md:space-y-4 mb-6 md:mb-8">
                {[
                  'Brutally honest AI critique',
                  'Top 3 resume crimes',
                  'Buzzword bingo results',
                  'What you actually did right',
                ].map((feature, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-[#0F0F0F] border border-[#2A2A2A] flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-3 h-3 text-[#A1A1A1]" />
                    </div>
                    <span className="text-sm md:text-base text-[#A1A1A1]">{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="w-full bg-[#FF3B30] hover:bg-[#FF4D42] text-white px-6 py-3 md:py-4 rounded-xl font-semibold transition-all duration-200 cursor-pointer text-sm md:text-base"
              >
                Get Started Free
              </button>
            </div>

            {/* Premium Tier */}
            <div className="bg-[#1A1A1A] border-2 border-[#FF3B30] rounded-2xl p-6 md:p-10 relative">
              <div className="absolute -top-3 left-6 bg-[#FF9500] text-[#0F0F0F] px-3 py-1 rounded-full text-xs font-bold uppercase">
                Coming Soon
              </div>

              <div className="mb-6 md:mb-8">
                <div className="text-xs md:text-sm font-medium text-[#FF3B30] uppercase tracking-wider mb-2">One-Time Payment</div>
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">Complete Package</h3>
                <div className="text-4xl md:text-5xl font-black text-white mb-2">$9.99</div>
                <p className="text-xs md:text-sm text-[#A1A1A1]">Everything you need to land the job</p>
              </div>

              <ul className="space-y-3 md:space-y-4 mb-6 md:mb-8">
                {[
                  'Everything in Free +',
                  'Professional AI rewrite',
                  '3 resume templates (choose your style)',
                  'Download as PDF, DOCX, TXT',
                  'LinkedIn-optimized version',
                  'Custom cover letter template',
                  'ATS optimization score',
                  'Before/after comparison',
                ].map((feature, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-[#FF3B30] flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-3 h-3 text-white" />
                    </div>
                    <span className="text-sm md:text-base text-white font-medium">{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                disabled
                className="w-full bg-[#2A2A2A] text-[#666666] px-6 py-3 md:py-4 rounded-xl font-semibold cursor-not-allowed text-sm md:text-base"
              >
                Payment Integration Coming Soon
              </button>
              
              <p className="text-xs text-[#666666] text-center mt-4">
                Worth $30/month elsewhere • Pay once, use forever
              </p>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="text-center py-8 md:py-12 border-t border-[#2A2A2A] mt-12 md:mt-20">
          <p className="mb-2 text-sm md:text-base text-[#A1A1A1]">Built by developers who've been there</p>
          <p className="text-xs md:text-sm text-[#666666]">© 2024 RoastMyResume. All rights reserved.</p>
          <p className="text-xs mt-3 md:mt-4 text-[#666666]">
            Demo mode • Full AI integration coming soon
          </p>
        </footer>
      </div>
    </div>
  );
}
