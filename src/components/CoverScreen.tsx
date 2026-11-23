import { useState } from 'react';
import { motion } from 'motion/react';
import { Volume2, VolumeX, ArrowLeft, BookOpen } from 'lucide-react';
import { ambientSoundscape } from '../utils/audio';
import { BookTheme } from '../types';
import { THEMES } from '../utils/theme';
import { AndalusianBorderFrame } from './LiteraryDecorations';

interface CoverScreenProps {
  onEnter: () => void;
  totalPoems?: number;
  theme?: BookTheme;
}

export function CoverScreen({ onEnter, theme = 'midnight' }: CoverScreenProps) {
  const [isPlayingAudio, setIsPlayingAudio] = useState(() => ambientSoundscape.getIsPlaying());
  const activeTheme = THEMES[theme] || THEMES.midnight;

  const handleToggleSound = () => {
    const active = ambientSoundscape.toggle();
    setIsPlayingAudio(active);
  };

  return (
    <div
      id="cover-screen-container"
      className={`relative min-h-screen w-full flex flex-col items-center justify-between px-4 py-8 sm:py-12 ${activeTheme.appBg} ${activeTheme.textPrimary} overflow-hidden select-none transition-colors duration-300`}
    >
      {/* Subtle outer Andalusian manuscript frame around the screen edges only */}
      <AndalusianBorderFrame color={activeTheme.isLight ? '#966b26' : '#c5a059'} className="opacity-50" />

      {/* Top Header Bar: Quiet Audio Control Only */}
      <div className="w-full max-w-4xl flex items-center justify-end z-20 px-3 sm:px-6 pt-1">
        <button
          id="sound-toggle-button"
          onClick={handleToggleSound}
          className="group flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-amiri text-[#f5f2ed]/80 hover:text-[#d4af37] bg-white/[0.03] hover:bg-[#c5a059]/10 border border-[#c5a059]/30 hover:border-[#c5a059]/60 transition-colors duration-200 cursor-pointer shadow-sm"
          title="موسيقى هادئة"
        >
          {isPlayingAudio ? (
            <>
              <Volume2 size={13} className="text-[#d4af37]" />
              <span className="text-[11px] font-amiri text-[#d4af37]">موسيقى هادئة</span>
            </>
          ) : (
            <>
              <VolumeX size={13} className="opacity-50" />
              <span className="text-[11px] font-amiri opacity-70">موسيقى هادئة</span>
            </>
          )}
        </button>
      </div>

      {/* Center Stage: Title, Subtle Details & Newly Designed Royal Button - 100% Clean & Transparent */}
      <div className="relative z-10 my-auto flex flex-col items-center text-center max-w-xl px-4 w-full py-8 bg-transparent">
        {/* Main Title: مجلة غزالتي */}
        <motion.h1
          id="book-main-title"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className={`font-amiri text-5xl sm:text-7xl md:text-8xl font-bold tracking-tight ${activeTheme.textPrimary} leading-tight bg-transparent select-none`}
        >
          مجلة غزالتي
        </motion.h1>

        {/* Subtle, Calm Details Line */}
        <motion.p
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.08, duration: 0.35 }}
          className="text-xs sm:text-sm font-amiri text-[#c5a059]/80 tracking-widest mt-3.5 font-normal bg-transparent"
        >
          ديوان الشعر والأدب • إفراهيم ٢٠٠٣
        </motion.p>

        {/* Delicate, transparent, small and elegant entry button */}
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.14, duration: 0.35 }}
          className="mt-8 sm:mt-10 flex items-center justify-center w-full"
        >
          <button
            id="enter-book-button"
            onClick={onEnter}
            className="group inline-flex items-center gap-2.5 px-5 sm:px-6 py-2 sm:py-2.5 rounded-full bg-transparent hover:bg-[#c5a059]/10 border border-[#c5a059]/40 hover:border-[#c5a059]/80 transition-all duration-200 cursor-pointer active:scale-95"
          >
            {/* Small Book Icon */}
            <BookOpen
              size={14}
              className={`${
                activeTheme.isLight ? 'text-[#855e1e]' : 'text-[#c5a059]'
              } transition-transform duration-300 group-hover:scale-110 shrink-0 stroke-[1.8]`}
            />

            {/* Main Button Text - Soft, compact, elegant */}
            <span
              className={`font-amiri font-bold text-sm sm:text-base tracking-wide ${
                activeTheme.isLight
                  ? 'text-[#4a3f35] group-hover:text-[#855e1e]'
                  : 'text-[#e5dfd5] group-hover:text-[#fbf7f0]'
              } transition-colors`}
            >
              افتح المخطوطة الديوانية
            </span>

            {/* Subtle Arrow Left */}
            <ArrowLeft
              size={14}
              className={`${
                activeTheme.isLight ? 'text-[#855e1e]' : 'text-[#c5a059]'
              } transition-transform duration-300 group-hover:-translate-x-1 stroke-[1.8] shrink-0`}
            />
          </button>
        </motion.div>
      </div>

      {/* Spacious Serene Bottom Spacing */}
      <div className="w-full max-w-4xl flex items-center justify-center z-20 pb-2">
        <span className="w-8 h-px bg-[#c5a059]/20" />
      </div>
    </div>
  );
}
