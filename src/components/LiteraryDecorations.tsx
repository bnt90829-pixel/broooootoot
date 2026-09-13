import React from 'react';

interface DecorationProps {
  className?: string;
  color?: string;
  size?: number;
}

/**
 * Ornate classical Arabic manuscript headpiece divider
 */
export function ArabesqueDivider({ className = '', color = '#c5a059' }: { className?: string; color?: string }) {
  return (
    <div className={`flex items-center justify-center gap-3 w-full max-w-xs mx-auto my-3 select-none pointer-events-none ${className}`}>
      <div
        className="h-px flex-1 bg-gradient-to-r from-transparent via-current to-current opacity-40"
        style={{ color }}
      />
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="shrink-0 opacity-80" style={{ color }}>
        <path
          d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z"
          fill="currentColor"
          fillOpacity="0.2"
          stroke="currentColor"
          strokeWidth="1"
        />
        <circle cx="12" cy="12" r="2.5" fill="currentColor" />
      </svg>
      <div
        className="h-px flex-1 bg-gradient-to-l from-transparent via-current to-current opacity-40"
        style={{ color }}
      />
    </div>
  );
}

/**
 * Elegant gazelle insignia silhouette for Diwan Ghazalati
 */
export function GazelleInsignia({ className = '', size = 28 }: DecorationProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`inline-block select-none ${className}`}
    >
      {/* Delicate Gazelle horns & noble head silhouette */}
      <path
        d="M24 6C22.5 11 18 14 14 16C12.5 16.8 13.5 19 15.5 18.5C19 17.5 22 16 23.5 14C24 16.5 25.5 18 28 19C29 19.4 29.5 18 28.5 17.2C26.5 15.5 25 12 24 6Z"
        fill="currentColor"
      />
      <path
        d="M24 14C21 16 19 19 19 23C19 27.5 22.5 30 24 33C25.5 30 29 27.5 29 23C29 19 27 16 24 14Z"
        fill="currentColor"
        fillOpacity="0.75"
      />
      <circle cx="24" cy="38" r="1.5" fill="currentColor" />
      <path
        d="M16 24C12 26 10 30 11 34C11.5 36 13 37 14 36C13.5 34 14 31 17 28"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      <path
        d="M32 24C36 26 38 30 37 34C36.5 36 35 37 34 36C34.5 34 34 31 31 28"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
    </svg>
  );
}

/**
 * Classical deer / gazelle drawing (رسم الغزال والوعل) with antlers and noble silhouette
 */
export function DeerDrawing({ className = '', size = 28 }: DecorationProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 36 36"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      className={`inline-block select-none ${className}`}
    >
      {/* Left Antlers / قرون الوعل اليسرى */}
      <path d="M16 13.5C15.2 11 13.5 7.5 9 6C8 5.7 7.5 6.9 8.5 7.5C11 9 12.8 11.3 13.5 14C11.5 12.7 9 13 7 14.3C6.2 14.8 6.8 16 7.8 15.7C9.8 15.3 12.2 15.7 14.2 17C13 18.5 11 19.5 8.8 20.3C8 20.6 8.4 21.9 9.4 21.7C11.8 21.3 14 19.7 15.5 18L16.2 19.5C16.8 17 17 15 16 13.5Z" />
      {/* Right Antlers / قرون الوعل اليمنى */}
      <path d="M20 13.5C20.8 11 22.5 7.5 27 6C28 5.7 28.5 6.9 27.5 7.5C25 9 23.2 11.3 22.5 14C24.5 12.7 27 13 29 14.3C29.8 14.8 29.2 16 28.2 15.7C26.2 15.3 23.8 15.7 21.8 17C23 18.5 25 19.5 27.2 20.3C28 20.6 27.6 21.9 26.6 21.7C24.2 21.3 22 19.7 20.5 18L19.8 19.5C19.2 17 19 15 20 13.5Z" />
      {/* Left Ear / أذن الغزال اليسرى */}
      <path d="M14.5 18C11.5 18 8.5 20.5 7.2 22.7C6.8 23.5 7.8 24.5 8.6 24C11 23 13.2 21.5 15 20Z" />
      {/* Right Ear / أذن الغزال اليمنى */}
      <path d="M21.5 18C24.5 18 27.5 20.5 28.8 22.7C29.2 23.5 28.2 24.5 27.4 24C25 23 22.8 21.5 21 20Z" />
      {/* Face & Head / الرأس والوجنتان */}
      <path d="M16 18.5C17 18 19 18 20 18.5C21.8 20.5 22.5 23.5 21.8 26.5C21.2 29 19.5 31.5 18 33C16.5 31.5 14.8 29 14.2 26.5C13.5 23.5 14.2 20.5 16 18.5Z" fillOpacity="0.88" />
      {/* Nose Tip */}
      <circle cx="18" cy="31.8" r="1.1" />
      {/* Eyes */}
      <circle cx="16.3" cy="23.5" r="0.6" fill="#000" fillOpacity="0.3" />
      <circle cx="19.7" cy="23.5" r="0.6" fill="#000" fillOpacity="0.3" />
    </svg>
  );
}

/**
 * Filigree wing ornament flanking the cover button
 */
export function ButtonFiligreeWing({ side = 'left', color = '#c5a059', className = '' }: { side?: 'left' | 'right'; color?: string; className?: string }) {
  const isLeft = side === 'left';
  return (
    <svg
      width="48"
      height="24"
      viewBox="0 0 48 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${isLeft ? '' : 'scale-x-[-1]'} select-none ${className}`}
      style={{ color }}
    >
      {/* Horizontal connecting line */}
      <line x1="48" y1="12" x2="14" y2="12" stroke="currentColor" strokeWidth="1.2" strokeOpacity="0.75" />
      {/* Center diamond */}
      <polygon points="28,8.5 32,12 28,15.5 24,12" fill="currentColor" />
      {/* Leaf / scroll curl */}
      <path
        d="M16 12C12 7 6 7 4 12C6 17 12 17 16 12Z"
        stroke="currentColor"
        strokeWidth="1"
        fill="none"
        strokeOpacity="0.85"
      />
      {/* Outer tip */}
      <path d="M4 12L0 12" stroke="currentColor" strokeWidth="1.2" />
      <circle cx="8" cy="12" r="1.5" fill="currentColor" />
      <circle cx="40" cy="12" r="1.2" fill="currentColor" fillOpacity="0.6" />
    </svg>
  );
}

/**
 * Classical manuscript corner filigree
 */
export function CornerFiligree({ position, color = '#c5a059', className = '' }: { position: 'tl' | 'tr' | 'bl' | 'br'; color?: string; className?: string }) {
  const rotation = {
    tl: 'rotate-0',
    tr: 'rotate-90',
    br: 'rotate-180',
    bl: '-rotate-90',
  }[position];

  return (
    <div className={`absolute pointer-events-none select-none ${className}`}>
      <svg
        width="28"
        height="28"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`transform ${rotation}`}
        style={{ color }}
      >
        <path
          d="M2 2H16C23.732 2 30 8.26801 30 16V30"
          stroke="currentColor"
          strokeWidth="1"
          strokeOpacity="0.4"
        />
        <path
          d="M6 6H15C20.5228 6 25 10.4772 25 16V25"
          stroke="currentColor"
          strokeWidth="0.75"
          strokeOpacity="0.25"
        />
        <circle cx="5" cy="5" r="1.5" fill="currentColor" fillOpacity="0.8" />
        <circle cx="16" cy="2" r="1" fill="currentColor" fillOpacity="0.5" />
        <circle cx="2" cy="16" r="1" fill="currentColor" fillOpacity="0.5" />
      </svg>
    </div>
  );
}

/**
 * Ultra-subtle watermark for the book background
 */
export function DiwanWatermark({ className = '' }: { className?: string }) {
  return (
    <div className={`absolute inset-0 pointer-events-none flex items-center justify-center overflow-hidden select-none ${className}`}>
      <svg
        width="380"
        height="380"
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="opacity-[0.03] transition-opacity duration-700"
      >
        {/* Geometric rosette & arabesque star */}
        <circle cx="100" cy="100" r="88" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" />
        <circle cx="100" cy="100" r="70" stroke="currentColor" strokeWidth="0.8" />
        <rect x="50" y="50" width="100" height="100" transform="rotate(45 100 100)" stroke="currentColor" strokeWidth="0.8" />
        <rect x="50" y="50" width="100" height="100" stroke="currentColor" strokeWidth="0.8" />
        <circle cx="100" cy="100" r="35" stroke="currentColor" strokeWidth="1" />
        <circle cx="100" cy="100" r="4" fill="currentColor" />
        {/* Delicate floral petals */}
        {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
          <ellipse
            key={angle}
            cx="100"
            cy="65"
            rx="8"
            ry="20"
            transform={`rotate(${angle} 100 100)`}
            stroke="currentColor"
            strokeWidth="0.6"
          />
        ))}
      </svg>
    </div>
  );
}
