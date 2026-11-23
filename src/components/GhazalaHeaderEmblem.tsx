import React from 'react';
import { BookTheme } from '../types';
import { THEMES } from '../utils/theme';

interface GhazalaHeaderEmblemProps {
  size?: number;
  className?: string;
  theme?: BookTheme;
}

export function GhazalaHeaderEmblem({ size = 36, className = '', theme = 'midnight' }: GhazalaHeaderEmblemProps) {
  const activeTheme = THEMES[theme] || THEMES.midnight;

  return (
    <div
      className={`relative rounded-full flex items-center justify-center p-0.5 ${activeTheme.cardActiveBg} border ${activeTheme.cardBorder} ${activeTheme.cardHoverBorder} shadow-sm shrink-0 select-none transition-colors duration-200 ${className}`}
      style={{ width: size, height: size }}
      title="ديوان غزالتي"
    >
      <svg
        width={size - 6}
        height={size - 6}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="text-[#C5A35E]"
      >
        <defs>
          <linearGradient id="gazelleHeadGold" x1="20" y1="10" x2="80" y2="90" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#E1BD79" />
            <stop offset="50%" stopColor="#C5A35E" />
            <stop offset="100%" stopColor="#9B7836" />
          </linearGradient>
        </defs>

        {/* Delicate curved spiral horns */}
        <path
          d="M48 38C44 26 36 16 26 10C28 20 38 32 44 42"
          stroke="url(#gazelleHeadGold)"
          strokeWidth="2.8"
          strokeLinecap="round"
        />
        <path
          d="M56 40C54 28 48 18 40 12C42 22 50 34 54 44"
          stroke="url(#gazelleHeadGold)"
          strokeWidth="2.2"
          strokeLinecap="round"
        />

        {/* Ears */}
        <path
          d="M45 44C38 42 32 44 30 50C34 50 40 48 45 46"
          stroke="url(#gazelleHeadGold)"
          strokeWidth="1.8"
          strokeLinejoin="round"
        />

        {/* Head profile */}
        <path
          d="M52 44C58 45 65 48 70 54C73 59 71 64 66 67C60 69 54 67 48 64C42 60 44 52 48 46C50 44 52 44 52 44Z"
          stroke="url(#gazelleHeadGold)"
          strokeWidth="2.2"
          strokeLinejoin="round"
        />

        {/* Eye */}
        <circle cx="56" cy="53" r="1.8" fill="#E1BD79" />

        {/* Neck */}
        <path
          d="M46 64C44 74 38 86 32 94"
          stroke="url(#gazelleHeadGold)"
          strokeWidth="2.4"
          strokeLinecap="round"
        />
        <path
          d="M54 66C52 78 48 88 44 94"
          stroke="url(#gazelleHeadGold)"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}
