'use client';

import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
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

        // Try native share with image
        if (navigator.share && navigator.canShare({ files: [file] })) {
          await navigator.share({
            title: 'My Resume Roast',
            text: 'I just got my resume roasted! 🔥',
            files: [file],
          });
        } else {
          // Fallback to Twitter with text only
          window.open(
            `https://twitter.com/intent/tweet?text=${encodeURIComponent('I just got my resume roasted! 🔥 Check out RoastMyResume')}&url=${encodeURIComponent(window.location.origin)}`,
            '_blank'
          );
        }
      } catch (error) {
        console.error('Share failed:', error);
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

      <div className="container mx-auto max-w-6xl py-8 px-6 relative z-10">
        <div className="flex justify-between items-center mb-12">
          <button
            onClick={() => router.push('/')}
            className="flex items-center gap-2 text-[#A1A1A1] hover:text-white font-medium transition-colors group"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            Back
          </button>
          
          <button
            onClick={handleShare}
            className="flex items-center gap-2 bg-[#FF3B30] hover:bg-[#FF4D42] text-white px-4 py-2 rounded-lg transition-all font-medium"
          >
            <Share2 className="w-4 h-4" />
            Share
          </button>
        </div>
        
        <div ref={roastRef}>
          <RoastDisplay roast={roastResult.roast} />
        </div>
      </div>
    </div>
  );
}
