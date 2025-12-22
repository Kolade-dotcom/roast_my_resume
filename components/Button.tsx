import { ButtonHTMLAttributes, ReactNode } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'primary' | 'secondary';
  isLoading?: boolean;
}

export default function Button({ 
  children, 
  variant = 'primary', 
  isLoading = false,
  className = '',
  disabled,
  ...props 
}: ButtonProps) {
  const baseStyles = 'px-8 py-4 rounded-xl font-bold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden group';
  
  const variantStyles = {
    primary: 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:from-purple-700 hover:to-indigo-700 hover:scale-105 shadow-lg hover:shadow-2xl shadow-purple-500/30',
    secondary: 'bg-white text-purple-600 border-2 border-purple-200 hover:border-purple-300 hover:bg-purple-50 shadow-md hover:shadow-lg'
  };

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {/* Shine effect on hover */}
      {!isLoading && variant === 'primary' && (
        <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></span>
      )}
      
      <span className="relative z-10">
        {isLoading ? (
          <span className="flex items-center gap-2 justify-center">
            <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            Loading...
          </span>
        ) : children}
      </span>
    </button>
  );
}
