import React from 'react';
import { motion } from 'motion/react';

interface GentleDrawnMoonProps {
  className?: string;
  size?: number;
}

/**
 * An artistic, hand-drawn style golden crescent moon:
 * - 100% transparent background (no black box)
 * - Pure drawn linework without any words or text
 * - Soft, calm, gentle aesthetic (ناعمة وهادئة بدون مبالغة)
 * - Delicate suspended star and subtle stardust glow
 */
export function GentleDrawnMoon({ className = '', size = 260 }: GentleDrawnMoonProps) {
  return (
    <div
      className={`relative flex items-center justify-center select-none pointer-events-none ${className}`}
      style={{ width: size, height: size }}
    >
      {/* Soft atmospheric golden aura behind the moon */}
      <div
        className="absolute inset-0 rounded-full blur-2xl opacity-20 pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(212,175,55,0.4) 0%, rgba(197,160,89,0.1) 50%, transparent 75%)',
        }}
      />

      <svg
        width={size}
        height={size}
        viewBox="0 0 260 260"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-[0_2px_12px_rgba(212,175,55,0.25)]"
      >
        <defs>
          {/* Main Gold Gradient */}
          <linearGradient id="softGoldGrad" x1="40" y1="20" x2="220" y2="240" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#f5e2a3" />
            <stop offset="35%" stopColor="#d4af37" />
            <stop offset="70%" stopColor="#c5a059" />
            <stop offset="100%" stopColor="#8c6d2d" />
          </linearGradient>

          {/* Gentle Shimmer Gradient */}
          <linearGradient id="innerShimmerGrad" x1="60" y1="50" x2="200" y2="210" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#fff8db" stopOpacity="0.85" />
            <stop offset="50%" stopColor="#d4af37" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#c5a059" stopOpacity="0.05" />
          </linearGradient>

          {/* Star Glow */}
          <radialGradient id="starGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#fff8db" stopOpacity="1" />
            <stop offset="30%" stopColor="#e8c86d" stopOpacity="0.8" />
            <stop offset="70%" stopColor="#c5a059" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#d4af37" stopOpacity="0" />
          </radialGradient>

          {/* Soft Filter Glow */}
          <filter id="gentleGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Outer Delicate Foliage / Floral Sketch Lines (Soft and Gentle, Not Heavy) */}
        <g stroke="url(#softGoldGrad)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" opacity="0.85">
          {/* Top Vine & Little Flower Buds */}
          <path d="M125 35 C115 28 100 28 92 38 C88 43 89 50 94 54" fill="none" />
          <circle cx="90" cy="30" r="1.5" fill="#d4af37" />
          <circle cx="106" cy="24" r="1.8" fill="#e6ca65" />
          <path d="M102 31 C98 25 106 20 110 26" fill="none" />
          {/* Subtle leaves */}
          <path d="M78 52 C70 47 70 38 80 43 C83 45 82 50 78 52Z" fill="url(#softGoldGrad)" fillOpacity="0.2" />
          <path d="M60 76 C52 70 54 62 64 66 C67 68 65 74 60 76Z" fill="url(#softGoldGrad)" fillOpacity="0.2" />

          {/* Mid-Outer Vine Curves */}
          <path d="M50 110 C42 104 43 94 53 98 C56 100 54 107 50 110Z" fill="url(#softGoldGrad)" fillOpacity="0.2" />
          <circle cx="39" cy="116" r="1.6" fill="#d4af37" />
          <path d="M47 132 C38 126 39 118 48 121 C51 123 50 129 47 132Z" fill="url(#softGoldGrad)" fillOpacity="0.2" />

          {/* Lower Outer Vine & Graceful Scroll */}
          <path d="M56 168 C48 165 48 156 57 158 C60 160 60 166 56 168Z" fill="url(#softGoldGrad)" fillOpacity="0.2" />
          <path d="M75 198 C66 199 64 190 74 189 C78 190 79 196 75 198Z" fill="url(#softGoldGrad)" fillOpacity="0.2" />
          <circle cx="65" cy="208" r="1.8" fill="#e6ca65" />
          <path d="M96 222 C88 226 84 218 93 214 C97 214 99 219 96 222Z" fill="url(#softGoldGrad)" fillOpacity="0.2" />

          {/* Bottom Flourish Tendril */}
          <path d="M120 228 C130 236 145 235 152 225 C156 220 154 214 148 212" fill="none" />
          <circle cx="158" cy="232" r="1.5" fill="#d4af37" />
        </g>

        {/* 
          Main Hand-Drawn Crescent Moon Silhouette 
          Smooth, poetic arcs with no internal text
        */}
        {/* Subtle Semi-Transparent Moon Body Tint */}
        <path
          d="M 148 38
             C 75 52, 40 110, 68 182
             C 86 222, 134 238, 172 216
             C 118 214, 86 172, 88 124
             C 90 82, 118 48, 148 38 Z"
          fill="url(#innerShimmerGrad)"
          stroke="none"
        />

        {/* Outer Primary Crescent Line (Graceful, hand-drawn feel) */}
        <path
          d="M 148 38
             C 75 52, 40 110, 68 182
             C 86 222, 134 238, 172 216"
          stroke="url(#softGoldGrad)"
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
          filter="url(#gentleGlow)"
        />

        {/* Inner Primary Crescent Arc (Smooth tapered curve) */}
        <path
          d="M 148 38
             C 118 48, 90 82, 88 124
             C 86 172, 118 214, 172 216"
          stroke="url(#softGoldGrad)"
          strokeWidth="1.8"
          strokeLinecap="round"
          fill="none"
        />

        {/* Secondary Delicate Sketch Accent Lines inside Moon (Pure Geometry, ZERO Words) */}
        <g stroke="url(#softGoldGrad)" strokeWidth="0.85" opacity="0.6" strokeLinecap="round">
          {/* Parallel sketch contour */}
          <path
            d="M 140 46
               C 85 64, 58 116, 78 174
               C 92 208, 128 222, 160 210"
            fill="none"
            strokeDasharray="4 2"
          />

          {/* Gentle arabesque internal ribbing / ornamental petals (NO text) */}
          <path d="M 86 86 C 96 92, 102 88, 106 82" fill="none" />
          <circle cx="106" cy="82" r="1.2" fill="#d4af37" />

          <path d="M 76 114 C 88 118, 94 116, 98 108" fill="none" />
          <circle cx="98" cy="108" r="1.2" fill="#d4af37" />

          <path d="M 74 140 C 86 142, 92 138, 96 130" fill="none" />
          <circle cx="96" cy="130" r="1.2" fill="#d4af37" />

          <path d="M 82 168 C 94 166, 100 160, 102 152" fill="none" />
          <circle cx="102" cy="152" r="1.2" fill="#d4af37" />

          <path d="M 98 192 C 108 188, 114 180, 114 172" fill="none" />
          <circle cx="114" cy="172" r="1.2" fill="#d4af37" />
        </g>

        {/* Central Suspended Star (Calm, radiant 8-point drawn star) */}
        <g transform="translate(154, 118)">
          {/* Subtle star aura */}
          <circle cx="0" cy="0" r="28" fill="url(#starGlow)" opacity="0.5" />

          {/* Long Vertical Beam */}
          <path d="M 0 -24 L 1.5 -6 L 2 -2 L 6 -1.5 L 24 0 L 6 1.5 L 2 2 L 1.5 6 L 0 24 L -1.5 6 L -2 2 L -6 1.5 L -24 0 L -6 -1.5 L -2 -2 L -1.5 -6 Z" fill="url(#softGoldGrad)" />

          {/* Diagonal Beams (Subtle & shorter) */}
          <path d="M 0 -14 L 1 -4 L 4 -1 L 14 0 L 4 1 L 1 4 L 0 14 L -1 4 L -4 1 L -14 0 L -4 -1 L -1 -4 Z" transform="rotate(45)" fill="#fff8db" opacity="0.75" />

          {/* Center bright core */}
          <circle cx="0" cy="0" r="2.2" fill="#ffffff" />
        </g>

        {/* Delicate Scattered Starlight Dots around the crescent (Gentle Stardust) */}
        <g fill="#e6ca65" opacity="0.7">
          <circle cx="140" cy="80" r="1" />
          <circle cx="180" cy="94" r="1.2" />
          <circle cx="172" cy="152" r="1" />
          <circle cx="132" cy="158" r="0.9" />
          <circle cx="190" cy="130" r="0.8" />
          <circle cx="120" cy="100" r="1.1" fill="#fff" />
          {/* Small 4-point sparkle */}
          <path d="M 125 72 L 126 75 L 129 76 L 126 77 L 125 80 L 124 77 L 121 76 L 124 75 Z" fill="#fff8db" opacity="0.65" />
          <path d="M 176 168 L 177 170 L 180 171 L 177 172 L 176 175 L 175 172 L 172 171 L 175 170 Z" fill="#fff8db" opacity="0.65" />
        </g>
      </svg>
    </div>
  );
}
