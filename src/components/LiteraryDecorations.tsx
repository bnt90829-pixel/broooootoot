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

/**
 * Converts Western digits to Eastern Arabic numerals (١، ٢، ٣...)
 */
export function toEasternArabicNumerals(n: number | string): string {
  const digits = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
  return String(n).replace(/[0-9]/g, (w) => digits[parseInt(w, 10)]);
}

/**
 * Authentic 8-pointed Moorish / Andalusian Star (نجمة أندلسية مثمنة)
 */
export function AndalusianRosette({ size = 20, className = '', color = '#c5a059' }: DecorationProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`inline-block select-none ${className}`}
      style={{ color }}
    >
      <rect x="10" y="10" width="20" height="20" stroke="currentColor" strokeWidth="1.2" strokeOpacity="0.8" />
      <rect
        x="10"
        y="10"
        width="20"
        height="20"
        transform="rotate(45 20 20)"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeOpacity="0.8"
      />
      <circle cx="20" cy="20" r="5" stroke="currentColor" strokeWidth="0.9" fill="currentColor" fillOpacity="0.2" />
      <circle cx="20" cy="20" r="1.5" fill="currentColor" />
    </svg>
  );
}

/**
 * Grand Andalusian manuscript page border frame (إطار التذهيب الأندلسي)
 */
export function AndalusianBorderFrame({ className = '', color = '#c5a059' }: { className?: string; color?: string }) {
  return (
    <div className={`absolute inset-2 sm:inset-4 pointer-events-none select-none z-10 ${className}`}>
      {/* Outer hairline gold border */}
      <div
        className="absolute inset-0 border border-current opacity-25 rounded-sm"
        style={{ color }}
      />
      {/* Inner hairline border with offset */}
      <div
        className="absolute inset-1.5 sm:inset-2.5 border border-current opacity-40 rounded-sm"
        style={{ color }}
      />

      {/* Top Left Andalusian Corner Rosette */}
      <div className="absolute top-0.5 left-0.5 sm:top-1 sm:left-1 -translate-x-1/2 -translate-y-1/2">
        <AndalusianRosette size={18} color={color} />
      </div>
      {/* Top Right Andalusian Corner Rosette */}
      <div className="absolute top-0.5 right-0.5 sm:top-1 sm:right-1 translate-x-1/2 -translate-y-1/2">
        <AndalusianRosette size={18} color={color} />
      </div>
      {/* Bottom Left Andalusian Corner Rosette */}
      <div className="absolute bottom-0.5 left-0.5 sm:bottom-1 sm:left-1 -translate-x-1/2 translate-y-1/2">
        <AndalusianRosette size={18} color={color} />
      </div>
      {/* Bottom Right Andalusian Corner Rosette */}
      <div className="absolute bottom-0.5 right-0.5 sm:bottom-1 sm:right-1 translate-x-1/2 translate-y-1/2">
        <AndalusianRosette size={18} color={color} />
      </div>
    </div>
  );
}

/**
 * Classical Hanging Silk Bookmark Ribbon (شريط العلامة المرجعية الحريري الأندلسي)
 */
export function SilkBookmarkRibbon({
  isBookmarked = false,
  onClick,
  className = '',
}: {
  isBookmarked?: boolean;
  onClick?: () => void;
  className?: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`group absolute -top-1 left-6 sm:left-10 z-20 flex flex-col items-center cursor-pointer transition-transform duration-300 hover:translate-y-1 active:translate-y-1.5 focus:outline-none ${className}`}
      title={isBookmarked ? 'القصيدة محفوظة في المرجعيات (انقر للإزالة)' : 'حفظ القصيدة في المرجعيات'}
    >
      {/* Ribbon body */}
      <div
        className={`w-7 sm:w-8 h-12 sm:h-16 shadow-lg flex flex-col items-center justify-between pb-1 transition-colors duration-300 relative ${
          isBookmarked
            ? 'bg-gradient-to-b from-[#8f181c] via-[#a82226] to-[#781216] border-x border-[#c5a059]/60'
            : 'bg-gradient-to-b from-[#2a2826] via-[#383430] to-[#24211e] border-x border-[#595248]/40 hover:from-[#471a1d] hover:via-[#5e2025] hover:to-[#381316]'
        }`}
        style={{
          boxShadow: isBookmarked
            ? '0 6px 14px rgba(143, 24, 28, 0.4), inset 0 1px 0 rgba(255, 215, 0, 0.4)'
            : '0 4px 10px rgba(0, 0, 0, 0.5)',
        }}
      >
        {/* Fine gold embroidery line */}
        <div className="w-px h-full bg-[#d4af37]/40 absolute top-0 left-1" />
        <div className="w-px h-full bg-[#d4af37]/40 absolute top-0 right-1" />

        {/* Small gold rosette icon */}
        <div className="mt-2 text-[#f5e0a0] opacity-90 transition-transform group-hover:scale-110">
          <AndalusianRosette size={13} color="#f5e0a0" />
        </div>

        {/* Bottom chevron tail cut */}
        <div
          className="absolute -bottom-2 sm:-bottom-2.5 left-0 w-full overflow-hidden"
          style={{ height: '10px' }}
        >
          <div
            className={`w-0 h-0 border-l-[14px] sm:border-l-[16px] border-l-transparent border-r-[14px] sm:border-r-[16px] border-r-transparent ${
              isBookmarked ? 'border-t-[10px] border-t-[#781216]' : 'border-t-[10px] border-t-[#24211e]'
            }`}
          />
        </div>
      </div>
    </button>
  );
}

