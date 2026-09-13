import { useState } from 'react';
import { motion } from 'motion/react';
import { Volume2, VolumeX, ArrowLeft } from 'lucide-react';
import { ambientSoundscape } from '../utils/audio';
import { BookTheme } from '../types';
import { THEMES } from '../utils/theme';
import { ButtonFiligreeWing } from './LiteraryDecorations';
import { GentleDrawnMoon } from './GentleDrawnMoon';

interface CoverScreenProps {
  onEnter: () => void;
  totalPoems?: number;
  theme?: BookTheme;
}

export function CoverScreen({ onEnter, theme = 'midnight' }: CoverScreenProps) {
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const activeTheme = THEMES[theme] || THEMES.midnight;

  const handleToggleSound = () => {
    const active = ambientSoundscape.toggle();
    setIsPlayingAudio(active);
  };

  return (
    <div
      id="cover-screen-container"
      className={`relative min-h-screen w-full flex flex-col items-center justify-between px-4 py-8 sm:py-12 ${activeTheme.appBg} ${activeTheme.textPrimary} overflow-hidden select-none transition-colors duration-500`}
    >
      {/* Soft atmospheric golden ambient glow (transparent & calm) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] sm:w-[480px] h-[320px] sm:h-[480px] rounded-full blur-[120px] opacity-20 transition-all duration-700 pointer-events-none"
          style={{ backgroundColor: '#d4af37' }}
        />
      </div>

      {/* Top Header Bar: Quiet Audio Control */}
      <div className="w-full max-w-4xl flex items-center justify-between z-20 px-2 sm:px-4">
        <span className={`text-[10px] sm:text-[11px] font-mono tracking-[0.25em] ${activeTheme.textMuted} uppercase`}>
          ٢٠٠٣ • إفراهيم
        </span>

        <button
          id="sound-toggle-button"
          onClick={handleToggleSound}
          className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-sans ${activeTheme.textSecondary} hover:${activeTheme.accent} border ${activeTheme.cardBorder} hover:${activeTheme.accentBorder} ${activeTheme.cardBg}/60 backdrop-blur-md transition-all duration-300 cursor-pointer shadow-sm`}
          title="موسيقى هادئة"
        >
          {isPlayingAudio ? (
            <>
              <Volume2 size={13} className="text-[#d4af37] animate-pulse" />
              <span className="text-[11px] text-[#d4af37]">موسيقى هادئة</span>
            </>
          ) : (
            <>
              <VolumeX size={13} className="opacity-60" />
              <span className="text-[11px]">موسيقى هادئة</span>
            </>
          )}
        </button>
      </div>

      {/* Center Stage: Soft, serene hand-drawn moon without any internal text */}
      <div className="relative z-10 my-auto flex flex-col items-center text-center max-w-xl px-4 w-full">
        {/* Calm hand-drawn moon with gentle breathing motion */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: -8 }}
          animate={{
            opacity: 1,
            scale: 1,
            y: [0, -5, 0],
          }}
          transition={{
            opacity: { duration: 1, ease: 'easeOut' },
            scale: { duration: 1, ease: 'easeOut' },
            y: { repeat: Infinity, duration: 6, ease: 'easeInOut' },
          }}
          className="relative flex items-center justify-center -mb-4 sm:-mb-6"
        >
          <GentleDrawnMoon size={240} className="sm:hidden" />
          <GentleDrawnMoon size={280} className="hidden sm:flex" />
        </motion.div>

        {/* Main Title: مجلة غزالتي */}
        <motion.h1
          id="book-main-title"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className={`font-amiri text-5xl sm:text-7xl md:text-8xl font-bold tracking-tight ${activeTheme.textPrimary} leading-tight drop-shadow-[0_2px_12px_rgba(212,175,55,0.2)]`}
        >
          مجلة غزالتي
        </motion.h1>

        {/* Author Attribution: — إفراهيم 2003 — */}
        <motion.div
          id="poet-cover-name"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.8 }}
          className="mt-3 flex items-center justify-center gap-3"
        >
          <span className="h-px w-6 sm:w-10 bg-gradient-to-l from-[#d4af37]/70 to-transparent" />
          <span className="font-serif text-sm sm:text-base text-[#d4af37] tracking-[0.2em] font-medium">
            إفراهيم 2003
          </span>
          <span className="h-px w-6 sm:w-10 bg-gradient-to-r from-[#d4af37]/70 to-transparent" />
        </motion.div>

        {/* Sparkling Star Divider ✦ */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.45, duration: 0.6 }}
          className="my-2 text-[#d4af37] text-xs opacity-80 select-none"
        >
          ✦
        </motion.div>

        {/* Subtitle: في العشق والقصائد وعوالم الخيال */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55, duration: 0.8 }}
          className={`font-serif text-sm sm:text-base ${activeTheme.textSecondary} tracking-widest font-light opacity-90`}
        >
          في العشق والقصائد وعوالم الخيال
        </motion.p>

        {/* Action Button Flanked by Filigree Wings */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.65, duration: 0.8 }}
          className="mt-8 sm:mt-10 flex items-center justify-center gap-2 sm:gap-4"
        >
          {/* Right Filigree Wing */}
          <ButtonFiligreeWing side="right" color="#c5a059" className="hidden xs:block sm:block opacity-75" />

          {/* Golden Enter Button */}
          <button
            id="enter-book-button"
            onClick={onEnter}
            className="group px-9 sm:px-11 py-3.5 sm:py-4 rounded-full bg-gradient-to-b from-[#d8b46e] via-[#c5a059] to-[#b38a42] text-[#120e07] font-serif font-bold text-base sm:text-lg shadow-[0_4px_24px_rgba(212,175,55,0.3)] hover:shadow-[0_6px_32px_rgba(212,175,55,0.45)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-3 cursor-pointer"
          >
            <span className="tracking-wide">تصفح المجلة</span>
            <ArrowLeft size={18} className="transition-transform duration-300 group-hover:-translate-x-1 stroke-[2.5]" />
          </button>

          {/* Left Filigree Wing */}
          <ButtonFiligreeWing side="left" color="#c5a059" className="hidden xs:block sm:block opacity-75" />
        </motion.div>
      </div>

      {/* Footer Notice: — مساحة للقراءة الهادئة والتأمل — */}
      <div className="w-full max-w-4xl flex items-center justify-center z-20 pt-4">
        <div className={`flex items-center justify-center gap-3 sm:gap-4 ${activeTheme.textMuted} text-xs sm:text-[13px] font-serif opacity-80`}>
          <span className="w-8 sm:w-16 h-px bg-current opacity-30" />
          <span className="tracking-wider">مساحة للقراءة الهادئة والتأمل</span>
          <span className="w-8 sm:w-16 h-px bg-current opacity-30" />
        </div>
      </div>
    </div>
  );
}

