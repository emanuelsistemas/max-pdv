import React from 'react';
import { Boxes, LineChart } from 'lucide-react';

interface SystemLogoProps {
  className?: string;
  iconSize?: number;
  showText?: boolean;
  isDark?: boolean;
}

export function SystemLogo({ 
  className = '', 
  iconSize = 8,
  showText = true,
  isDark = true 
}: SystemLogoProps) {
  return (
    <div className={`flex items-center ${className}`}>
      <div className="relative flex items-center">
        <div className="relative">
          <Boxes className={`w-${iconSize} h-${iconSize} text-blue-500`} strokeWidth={1.5} />
          <LineChart 
            className={`w-${iconSize/2} h-${iconSize/2} text-blue-400 absolute -top-1 -right-1 transform rotate-0`}
            strokeWidth={2}
          />
        </div>
      </div>
      {showText && (
        <span className="ml-3 text-2xl logo-text tracking-tight">
          <span className="text-blue-500">max</span>
          <span className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>-pdv</span>
        </span>
      )}
    </div>
  );
}