import { Check, Lock } from 'lucide-react';

export default function PricingCard() {
  return (
    <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
      {/* Free Tier */}
      <div className="bg-white rounded-3xl shadow-xl p-8 border-2 border-gray-200 hover:border-purple-200 transition-all duration-300 hover:scale-105 hover:shadow-2xl">
        <div className="text-center mb-6">
          <div className="inline-block bg-gray-100 text-gray-700 px-4 py-1 rounded-full text-sm font-bold mb-4">
            FREE FOREVER
          </div>
          <h3 className="text-3xl font-black text-gray-900 mb-2">Free Roast</h3>
          <div className="text-6xl font-black text-gray-900 mb-2">$0</div>
          <p className="text-gray-600 text-lg">See what's wrong</p>
        </div>
        
        <ul className="space-y-4 mb-8">
          <li className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-1">
              <Check className="w-4 h-4 text-green-600" />
            </div>
            <span className="text-gray-700 leading-relaxed">
              <strong>Brutally honest critique</strong> - No sugar-coating, just facts
            </span>
          </li>
          <li className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-1">
              <Check className="w-4 h-4 text-green-600" />
            </div>
            <span className="text-gray-700 leading-relaxed">
              <strong>Top mistakes identified</strong> - Know exactly what to fix
            </span>
          </li>
          <li className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-1">
              <Check className="w-4 h-4 text-green-600" />
            </div>
            <span className="text-gray-700 leading-relaxed">
              <strong>Buzzword detection</strong> - Stop sounding like everyone else
            </span>
          </li>
          <li className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-1">
              <Check className="w-4 h-4 text-green-600" />
            </div>
            <span className="text-gray-700 leading-relaxed">
              <strong>What you're doing right</strong> - Build on your strengths
            </span>
          </li>
        </ul>
        
        <div className="text-center">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="w-full bg-gray-100 text-gray-700 px-6 py-3 rounded-xl font-bold hover:bg-gray-200 transition-all duration-300"
          >
            Get Started Free
          </button>
        </div>
      </div>

      {/* Premium Tier */}
      <div className="bg-gradient-to-br from-purple-600 via-purple-700 to-indigo-700 rounded-3xl shadow-2xl shadow-purple-500/40 p-8 border-2 border-purple-500 relative overflow-hidden transform hover:scale-105 transition-all duration-300">
        {/* Animated background pattern */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRjMC0yLjIxLTEuNzktNC00LTRzLTQgMS43OS00IDQgMS43OSA0IDQgNCA0LTEuNzkgNC00em0wLTEwYzAtMi4yMS0xLjc5LTQtNC00cy00IDEuNzktNCA0IDEuNzkgNCA0IDQgNC0xLjc5IDQtNHoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-30"></div>
        
        <div className="relative z-10">
          <div className="text-center mb-6">
            <div className="inline-block bg-yellow-400 text-purple-900 px-4 py-1 rounded-full text-sm font-bold mb-4 animate-pulse">
              🚀 COMING SOON
            </div>
            <h3 className="text-3xl font-black text-white mb-2">Professional Rewrite</h3>
            <div className="text-6xl font-black text-white mb-2">$9.99</div>
            <p className="text-purple-100 text-lg">Everything + the fix</p>
          </div>
          
          <ul className="space-y-4 mb-8">
            <li className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0 mt-1">
                <Check className="w-4 h-4 text-white" />
              </div>
              <span className="text-white font-medium leading-relaxed">
                Everything in Free +
              </span>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0 mt-1">
                <Check className="w-4 h-4 text-white" />
              </div>
              <span className="text-white font-medium leading-relaxed">
                <strong>Complete professional rewrite</strong> - AI-powered perfection
              </span>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0 mt-1">
                <Check className="w-4 h-4 text-white" />
              </div>
              <span className="text-white font-medium leading-relaxed">
                <strong>ATS optimization</strong> - Beat the bots, get past filters
              </span>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0 mt-1">
                <Check className="w-4 h-4 text-white" />
              </div>
              <span className="text-white font-medium leading-relaxed">
                <strong>Before/after examples</strong> - See the transformation
              </span>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0 mt-1">
                <Check className="w-4 h-4 text-white" />
              </div>
              <span className="text-white font-medium leading-relaxed">
                <strong>Industry-specific tips</strong> - Tailored advice
              </span>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0 mt-1">
                <Check className="w-4 h-4 text-white" />
              </div>
              <span className="text-white font-medium leading-relaxed">
                <strong>Download as PDF/DOCX</strong> - Ready to send
              </span>
            </li>
          </ul>
          
          <div className="text-center">
            <button
              disabled
              className="w-full bg-white/20 backdrop-blur-sm text-white px-6 py-3 rounded-xl font-bold cursor-not-allowed opacity-70 flex items-center justify-center gap-2"
            >
              <Lock className="w-4 h-4" />
              Payment Integration Coming Soon
            </button>
            <p className="text-purple-200 text-sm mt-3">
              We're integrating Stripe. Stay tuned! 🎉
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
