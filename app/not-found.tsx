import Link from 'next/link';
import { Home, Flame } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#0F0F0F] text-white flex items-center justify-center px-6 relative overflow-hidden">
      {/* Subtle background gradient */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-red-600 rounded-full mix-blend-screen filter blur-[120px] opacity-[0.03] animate-blob"></div>
      </div>

      {/* Subtle texture */}
      <div className="texture-overlay fixed inset-0 pointer-events-none"></div>

      <div className="text-center max-w-2xl relative z-10">
        <div className="mb-12">
          <div className="text-9xl md:text-[10rem] font-black text-white mb-6 tracking-tight">
            404
          </div>
          <Flame className="w-16 h-16 text-[#FF3B30] mx-auto" />
        </div>
        
        <h1 className="text-4xl md:text-5xl font-black text-white mb-6 tracking-tight">
          Page Not Found
        </h1>
        
        <p className="text-lg md:text-xl text-[#A1A1A1] mb-12">
          This page got roasted so hard it disappeared.
          <br />
          <span className="text-[#FF3B30]">Let's get you back on track.</span>
        </p>
        
        <Link
          href="/"
          className="inline-flex items-center gap-3 bg-[#FF3B30] hover:bg-[#FF4D42] text-white px-8 py-4 rounded-xl font-semibold transition-all duration-200"
        >
          <Home className="w-5 h-5" />
          Back to Home
        </Link>
        
        <div className="mt-16 text-[#666666] text-sm">
          <p className="font-medium text-[#A1A1A1] mb-2">Looking for something?</p>
          <p>
            Try the <Link href="/" className="text-[#FF3B30] hover:text-[#FF4D42] font-medium underline">homepage</Link> or{' '}
            <Link href="/roast" className="text-[#FF3B30] hover:text-[#FF4D42] font-medium underline">roast page</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
