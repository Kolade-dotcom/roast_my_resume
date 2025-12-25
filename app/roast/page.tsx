'use client';

import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import RoastDisplay from '@/components/RoastDisplay';
import { RoastResult } from '@/types';
import { ArrowLeft, Share2, Flame } from 'lucide-react';
import { toPng } from 'html-to-image';

export default function RoastPage() {
  const [roastResult, setRoastResult] = useState<RoastResult | null>(null);
  const router = useRouter();
  const roastRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const stored = sessionStorage.getItem('roastResult');
    if (stored) {
      setRoastResult(JSON.parse(stored));
    } else {
      router.push('/');
    }
  }, [router]);

  const handleShare = async () => {
    // Try to generate and share image
    if (roastRef.current) {
      const downloadToast = toast.loading('📸 Generating shareable image...');
      try {
        const dataUrl = await toPng(roastRef.current, {
          quality: 1,
          pixelRatio: 2,
          backgroundColor: '#0F0F0F',
        });

        // Convert data URL to blob
        const response = await fetch(dataUrl);
        const blob = await response.blob();
        const file = new File([blob], 'my-resume-roast.png', { type: 'image/png' });

        toast.success('Image ready! 🎉', { id: downloadToast });

        // Try native share with image
        if (navigator.share && navigator.canShare({ files: [file] })) {
          await navigator.share({
            title: 'My Resume Roast',
            text: 'I just got my resume roasted! 🔥',
            files: [file],
          });
          toast.success('Shared successfully!');
        } else {
          // Fallback to Twitter with text only
          window.open(
            `https://twitter.com/intent/tweet?text=${encodeURIComponent('I just got my resume roasted! 🔥 Check out RoastMyResume')}&url=${encodeURIComponent(window.location.origin)}`,
            '_blank'
          );
        }
      } catch (error) {
        console.error('Share failed:', error);
        toast.error('Failed to share. Opening Twitter instead...', { id: downloadToast });
        // Fallback to Twitter
        window.open(
          `https://twitter.com/intent/tweet?text=${encodeURIComponent('I just got my resume roasted! 🔥 Check out RoastMyResume')}&url=${encodeURIComponent(window.location.origin)}`,
          '_blank'
        );
      }
    }
  };

  if (!roastResult) {
    return (
      <div className="min-h-screen bg-[#0F0F0F] flex items-center justify-center">
        <div className="text-center">
          <Flame className="w-16 h-16 text-[#FF3B30] mx-auto mb-4 animate-pulse" />
          <p className="text-[#A1A1A1] text-lg font-medium">Loading your roast...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0F0F0F] text-white relative overflow-hidden">
      {/* Subtle background gradient */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-red-600 rounded-full mix-blend-screen filter blur-[120px] opacity-[0.03] animate-blob"></div>
      </div>

      {/* Subtle texture */}
      <div className="texture-overlay fixed inset-0 pointer-events-none"></div>

      <div className="container mx-auto max-w-6xl py-6 md:py-8 px-4 md:px-6 relative z-10">
        <div className="flex justify-between items-center mb-8 md:mb-12">
          <button
            onClick={() => router.push('/')}
            className="flex items-center gap-2 text-[#A1A1A1] hover:text-white font-medium transition-colors group text-sm md:text-base cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 md:w-5 md:h-5 group-hover:-translate-x-1 transition-transform" />
            Back
          </button>
          
          <button
            onClick={handleShare}
            className="flex items-center gap-2 bg-[#FF3B30] hover:bg-[#FF4D42] text-white px-3 md:px-4 py-2 rounded-lg transition-all font-medium text-sm md:text-base cursor-pointer"
          >
            <Share2 className="w-4 h-4" />
            <span className="hidden sm:inline">Share</span>
          </button>
        </div>
        
        <div ref={roastRef}>
          <RoastDisplay roast={roastResult.roast} />
        </div>
      </div>
    </div>
  );
}
