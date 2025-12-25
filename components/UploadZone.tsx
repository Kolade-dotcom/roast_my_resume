'use client';

import { useState, useRef, DragEvent, ChangeEvent } from 'react';
import { toast } from 'sonner';
import { Upload, FileText, Zap } from 'lucide-react';

interface UploadZoneProps {
  onSubmit: (text: string) => void;
  isLoading: boolean;
}

export default function UploadZone({ onSubmit, isLoading }: UploadZoneProps) {
  const [activeTab, setActiveTab] = useState<'paste' | 'upload'>('paste');
  const [pastedText, setPastedText] = useState('');
  const [fileName, setFileName] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = async (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    const file = e.dataTransfer.files[0];
    if (file) {
      handleFileSelection(file);
    }
  };

  const handleFileSelect = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileSelection(file);
    }
  };

  const handleFileSelection = (file: File) => {
    setFileName(file.name);
    onSubmit(`Resume uploaded: ${file.name}\n\nThis is a demo with mock data. Your actual resume content would be analyzed here!`);
  };

  const handlePasteSubmit = () => {
    if (pastedText.trim().length < 10) {
      toast.error('Please paste at least 10 characters of resume text');
      return;
    }
    onSubmit(pastedText);
  };

  const sampleResume = `John Doe
Senior Software Engineer

EXPERIENCE
Tech Corp (2020-Present)
- Responsible for developing features
- Worked with team members on various projects
- Utilized cutting-edge technologies
- Synergized with stakeholders to drive results

SKILLS
JavaScript, React, Node.js, Team Player, Self-Starter, Detail-Oriented, Results-Driven

EDUCATION
Bachelor's Degree in Computer Science`;

  return (
    <div className="w-full">
      {/* Tab Switcher */}
      <div className="flex gap-2 mb-4">
        <button
          onClick={() => setActiveTab('paste')}
          className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all cursor-pointer ${
            activeTab === 'paste'
              ? 'bg-[#1A1A1A] text-white border border-[#2A2A2A]'
              : 'text-[#666666] hover:text-[#A1A1A1]'
          }`}
        >
          <FileText className="inline-block w-4 h-4 mr-2" />
          Paste Text
        </button>
        <button
          onClick={() => setActiveTab('upload')}
          className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all cursor-pointer ${
            activeTab === 'upload'
              ? 'bg-[#1A1A1A] text-white border border-[#2A2A2A]'
              : 'text-[#666666] hover:text-[#A1A1A1]'
          }`}
        >
          <Upload className="inline-block w-4 h-4 mr-2" />
          Upload PDF
        </button>
      </div>

      {activeTab === 'paste' ? (
        <div className="space-y-4">
          <div className="relative">
            <textarea
              value={pastedText}
              onChange={(e) => setPastedText(e.target.value)}
              placeholder="Paste your resume here..."
              className="w-full h-72 p-6 bg-[#1A1A1A] border border-[#2A2A2A] rounded-2xl focus:border-[#FF3B30] focus:outline-none resize-none text-white placeholder:text-[#666666] transition-all"
            />
            {pastedText.length === 0 && (
              <div className="absolute bottom-6 left-6 right-6">
                <button
                  onClick={() => setPastedText(sampleResume)}
                  className="text-[#FF3B30] hover:text-[#FF4D42] font-medium text-sm underline cursor-pointer"
                >
                  → Use sample resume
                </button>
              </div>
            )}
          </div>
          
          <button
            onClick={handlePasteSubmit}
            disabled={isLoading || pastedText.trim().length < 10}
            className="w-full bg-[#FF3B30] hover:bg-[#FF4D42] text-white px-6 py-4 rounded-xl font-semibold transition-all duration-200 disabled:bg-[#2A2A2A] disabled:text-[#666666] disabled:cursor-not-allowed cursor-pointer flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Analyzing...
              </span>
            ) : (
              <>
                <Zap className="w-5 h-5" />
                Get Roasted
              </>
            )}
          </button>
        </div>
      ) : (
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`border-2 border-dashed rounded-2xl p-12 text-center cursor-pointer transition-all ${
            isDragging
              ? 'border-[#FF3B30] bg-[#FF3B30]/5'
              : 'border-[#2A2A2A] hover:border-[#3A3A3A]'
          }`}
        >
          <div className="w-16 h-16 bg-[#1A1A1A] border border-[#2A2A2A] rounded-xl flex items-center justify-center mx-auto mb-4">
            <Upload className={`w-8 h-8 transition-all ${
              isDragging ? 'text-[#FF3B30]' : 'text-[#666666]'
            }`} />
          </div>
          <p className="text-white font-semibold mb-1">
            {fileName || 'Drop your resume here'}
          </p>
          <p className="text-sm text-[#666666] mb-2">or click to browse</p>
          <p className="text-xs text-[#666666]">PDF files • Max 5MB</p>
          <p className="text-xs text-[#FF9500] mt-3 font-medium">
            Demo mode: Triggers mock roast
          </p>
          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf"
            onChange={handleFileSelect}
            className="hidden"
          />
        </div>
      )}
    </div>
  );
}
