'use client';

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import RewriteDisplay from '@/components/RewriteDisplay';
import { RewriteResult } from '@/types';

export default function SuccessPage() {
  const [rewriteResult, setRewriteResult] = useState<RewriteResult | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const searchParams = useSearchParams();
  const router = useRouter();
  const sessionId = searchParams.get('session_id');

  useEffect(() => {
    if (!sessionId) {
      router.push('/');
      return;
    }

    const fetchRewrite = async () => {
      try {
        const response = await fetch(`/api/rewrite?session_id=${sessionId}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch rewrite');
        }

        const data = await response.json();
        setRewriteResult(data);
      } catch (err) {
        console.error('Error fetching rewrite:', err);
        setError('Failed to load your rewrite. Please contact support with your session ID.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchRewrite();
  }, [sessionId, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-16 h-16 border-4 border-purple-600 border-t-transparent rounded-full mx-auto mb-6"></div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Generating Your Rewrite...</h2>
          <p className="text-gray-600">This may take up to 30 seconds</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md text-center">
          <div className="text-red-500 text-5xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Oops!</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={() => router.push('/')}
            className="bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-700"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  const originalResume = sessionStorage.getItem('roastResult');
  const originalText = originalResume ? JSON.parse(originalResume).resumeText : '';

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white py-12 px-4">
      <div className="container mx-auto">
        {rewriteResult && (
          <RewriteDisplay result={rewriteResult} originalResume={originalText} />
        )}
      </div>
    </div>
  );
}
