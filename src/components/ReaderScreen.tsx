import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Bookmark,
  Sun,
  Moon,
  Type,
  Maximize2,
  Minimize2,
  Copy,
  Check,
  Sparkles,
  Share2,
  Feather,
} from 'lucide-react';
import { Poem, BookTheme, BookFont } from '../types';
import { SurrealSymbol } from './SurrealSymbol';
import { THEMES } from '../utils/theme';
import { getPoetNameForPoem } from '../data/poets';
import {
  ArabesqueDivider,
  CornerFiligree,
  DiwanWatermark,
  GazelleInsignia,
} from './LiteraryDecorations';

interface ReaderScreenProps {
  poem: Poem;
  onBackToLibrary: () => void;
  onNextPoem: () => void;
  onPrevPoem: () => void;
  hasNext: boolean;
  hasPrev: boolean;
  currentIndex: number;
  totalPoemsCount: number;
  isBookmarked: boolean;
  onToggleBookmark: (id: string) => void;
  theme?: BookTheme;
  onThemeChange?: (theme: BookTheme) => void;
  font?: BookFont;
  onFontChange?: (font: BookFont) => void;
  fontSizeIndex?: number;
  onFontSizeIndexChange?: (updater: number | ((prev: number) => number)) => void;
}

export function ReaderScreen({
  poem,
  onBackToLibrary,
  onNextPoem,
  onPrevPoem,
  hasNext,
  hasPrev,
  currentIndex,
  totalPoemsCount,
  isBookmarked,
  onToggleBookmark,
  theme: controlledTheme,
  onThemeChange,
  font: controlledFont,
  onFontChange,
  fontSizeIndex: controlledFontSizeIndex,
  onFontSizeIndexChange,
}: ReaderScreenProps) {
  const [internalTheme, setInternalTheme] = useState<BookTheme>('midnight');
  const [internalFont, setInternalFont] = useState<BookFont>('amiri');
  const [internalFontSizeIndex, setInternalFontSizeIndex] = useState(2); // 0: sm, 1: base, 2: lg, 3: xl, 4: 2xl

  const theme = controlledTheme ?? internalTheme;
  const font = controlledFont ?? internalFont;
  const fontSizeIndex = controlledFontSizeIndex ?? internalFontSizeIndex;

  const setTheme = (newTheme: BookTheme) => {
    if (onThemeChange) {
      onThemeChange(newTheme);
    } else {
      setInternalTheme(newTheme);
    }
  };

  const setFont = (newFont: BookFont) => {
    if (onFontChange) {
      onFontChange(newFont);
    } else {
      setInternalFont(newFont);
    }
  };

  const setFontSizeIndex = (updater: number | ((prev: number) => number)) => {
    if (onFontSizeIndexChange) {
      onFontSizeIndexChange(updater);
    } else {
      setInternalFontSizeIndex(updater);
    }
  };

  const [copied, setCopied] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2500);
  };

  const poetName = getPoetNameForPoem(poem);

  // Normalized poem lines across all categories for cohesive, classical book typography
  const poemLines = poem.stanzas
    .flatMap((s) => s.split('\n'))
    .map((l) => l.trim())
    .filter(Boolean);

  const fontSizes = [
    'text-[15px] sm:text-base leading-[1.62] sm:leading-[1.68]',
    'text-base sm:text-lg leading-[1.65] sm:leading-[1.72]',
    'text-lg sm:text-xl leading-[1.68] sm:leading-[1.76]',
    'text-xl sm:text-2xl leading-[1.7] sm:leading-[1.8]',
    'text-2xl sm:text-3xl leading-[1.75] sm:leading-[1.85]',
  ];

  const fontClassMap: Record<BookFont, string> = {
    amiri: 'font-amiri',
    ruqaa: 'font-ruqaa',
    scheherazade: 'font-scheherazade',
    naskh: 'font-naskh',
    'serif-ar': 'font-serif-ar',
  };

  // Keyboard navigation
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        // Next in RTL
        if (hasNext) onNextPoem();
      } else if (e.key === 'ArrowRight') {
        // Prev in RTL
        if (hasPrev) onPrevPoem();
      } else if (e.key === 'Escape') {
        onBackToLibrary();
      }
    },
    [hasNext, hasPrev, onNextPoem, onPrevPoem, onBackToLibrary]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  const activeTheme = THEMES[theme] || THEMES.midnight;

  const handleCopyText = () => {
    const formattedPoemText = poemLines.join('\n');
    const fullText = `«${poem.title}»\nبقلم: ${poetName}\n\n${formattedPoemText}\n\n— ديوان غزالتي`;
    navigator.clipboard.writeText(fullText).then(() => {
      setCopied(true);
      showToast('تم نسخ نص القصيدة كاملاً ❦');
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const handleShare = async () => {
    const formattedPoemText = poemLines.join('\n');
    const fullText = `«${poem.title}»\nبقلم: ${poetName}\n\n${formattedPoemText}\n\n— ديوان غزالتي`;
    if (navigator.share) {
      try {
        await navigator.share({
          title: `«${poem.title}» — ${poetName}`,
          text: fullText,
          url: window.location.href,
        });
        showToast('تمت مشاركة القصيدة بنجاح ❦');
        return;
      } catch {
        // fallback to copy
      }
    }
    handleCopyText();
  };

  const backButtonLabel =
    poem.category === 'ghazal'
      ? 'غزالتي'
      : poem.category === 'limatha'
      ? 'لماذا؟'
      : poem.category === 'nathr'
      ? 'نثر غزالتي'
      : poem.category === 'inkisar'
      ? 'الإنكسار'
      : poem.category === 'habr'
      ? 'حين يجرؤ الحبر'
      : poem.category === 'sultan'
      ? 'ديوان محمد سلطان'
      : poem.category === 'salim'
      ? 'ديوان سليم السلطان'
      : poem.category === 'yaqeen'
      ? 'ديوان يقين محمد'
      : poem.category === 'saad'
      ? 'حكايات سعد غدير'
      : poem.category === 'heyam'
      ? 'ديوان هيام محمد'
      : 'المكتبة والفهرس';

  const footerCredit =
    poem.category === 'ghazal'
      ? '«غزالتي»'
      : poem.category === 'limatha'
      ? '«لماذا؟»'
      : poem.category === 'nathr'
      ? '«نثر غزالتي»'
      : poem.category === 'inkisar'
      ? '«الإنكسار»'
      : poem.category === 'habr'
      ? '«حين يجرؤ الحبر»'
      : poem.category === 'sultan'
      ? '«ديوان محمد سلطان»'
      : poem.category === 'salim'
      ? '«ديوان سليم السلطان» — قصائد في الحياة والأمل والخيانة'
      : poem.category === 'yaqeen'
      ? '«ديوان يقين السلطان» — يقين محمد'
      : poem.category === 'saad'
      ? '«حكايات وحكم» — روائع القصص والعِبَر، سعد غدير'
      : poem.category === 'heyam'
      ? '«ديوان هيام محمد»'
      : '«ديوان إفراهيم 2003»';

  return (
    <div
      id="reader-screen-container"
      className={`min-h-screen w-full ${activeTheme.appBg} transition-colors duration-500 flex flex-col justify-between select-none selection:bg-[#c5a059]/30 overflow-x-hidden font-serif relative`}
    >
      {/* Toast feedback notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.95 }}
            className="fixed bottom-20 left-1/2 -translate-x-1/2 z-50 px-4 py-2.5 rounded-full bg-[#15171e] text-[#f7f4ee] border border-[#c5a059] shadow-2xl text-xs sm:text-sm font-serif flex items-center gap-2 backdrop-blur-md"
          >
            <span className="text-[#c5a059] text-base">❦</span>
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Top Reading Navigation Bar */}
      <header className={`sticky top-0 z-30 ${activeTheme.headerBg} backdrop-blur-md border-b ${activeTheme.headerBorder} px-3 sm:px-8 py-3 transition-colors duration-500 w-full`}>
        <div className="max-w-5xl mx-auto flex items-center justify-between gap-2 sm:gap-4">
          {/* Return to Library */}
          <button
            id="reader-back-to-library-btn"
            onClick={onBackToLibrary}
            className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 rounded-sm border ${activeTheme.cardBorder} ${activeTheme.cardBg} ${activeTheme.textSecondary} hover:${activeTheme.textPrimary} hover:${activeTheme.accentBorder} transition-all text-xs sm:text-sm cursor-pointer shadow-sm`}
          >
            <ArrowRight size={15} />
            <span className="font-serif">{backButtonLabel}</span>
          </button>

          {/* Center: Book & Chapter indicator */}
          <div className="text-center hidden md:flex flex-col items-center">
            <span className={`text-[10px] uppercase font-mono tracking-widest ${activeTheme.accent} flex items-center gap-1.5`}>
              <span className="w-1 h-1 rounded-full bg-current" />
              <span>{poem.chapter} • ص {poem.pageNumber}</span>
              <span className="w-1 h-1 rounded-full bg-current" />
            </span>
            <h3 className={`font-amiri text-base lg:text-lg ${activeTheme.textPrimary} font-bold truncate max-w-[280px] tracking-wide`}>
              «{poem.title}»
            </h3>
          </div>

          {/* Right/Left Toolbar controls */}
          <div className="flex items-center gap-1 sm:gap-2">
            {/* Share button */}
            <button
              id="reader-share-btn"
              onClick={handleShare}
              className={`p-2 rounded-sm border ${activeTheme.cardBorder} ${activeTheme.cardBg} ${activeTheme.textSecondary} hover:${activeTheme.textPrimary} hover:${activeTheme.accentBorder} transition-all text-xs cursor-pointer`}
              title="مشاركة القصيدة"
            >
              <Share2 size={15} />
            </button>

            {/* Bookmark button */}
            <button
              id="reader-bookmark-btn"
              onClick={() => {
                onToggleBookmark(poem.id);
                showToast(isBookmarked ? 'تمت إزالة القصيدة من المحفوظات' : 'تم حفظ القصيدة في المحفوظات ❦');
              }}
              className={`p-2 rounded-sm border transition-all text-xs cursor-pointer ${
                isBookmarked
                  ? 'border-[#c5a059] bg-[#c5a059] text-[#0a0a0c]'
                  : `${activeTheme.cardBorder} ${activeTheme.cardBg} ${activeTheme.textSecondary} hover:${activeTheme.textPrimary} hover:${activeTheme.accentBorder}`
              }`}
              title={isBookmarked ? 'إزالة من المحفوظات' : 'حفظ في المحفوظات'}
            >
              <Bookmark size={15} className={isBookmarked ? 'fill-[#0a0a0c]' : ''} />
            </button>

            {/* Copy verse */}
            <button
              id="copy-verse-btn"
              onClick={handleCopyText}
              className={`p-2 rounded-sm border ${activeTheme.cardBorder} ${activeTheme.cardBg} ${activeTheme.textSecondary} hover:${activeTheme.textPrimary} hover:${activeTheme.accentBorder} transition-all text-xs cursor-pointer`}
              title="نسخ نص القصيدة"
            >
              {copied ? <Check size={15} className="text-emerald-400" /> : <Copy size={15} />}
            </button>

            {/* Typography / Theme settings toggle */}
            <button
              id="reader-settings-toggle-btn"
              onClick={() => setShowSettings(!showSettings)}
              className={`p-2 rounded-sm border transition-all text-xs cursor-pointer ${
                showSettings
                  ? `${activeTheme.accentBorder} ${activeTheme.accentBg} ${activeTheme.accent}`
                  : `${activeTheme.cardBorder} ${activeTheme.cardBg} ${activeTheme.textSecondary} hover:${activeTheme.textPrimary} hover:${activeTheme.accentBorder}`
              }`}
              title="تخصيص الخط ونمط الصفحة"
            >
              <Type size={15} />
            </button>
          </div>
        </div>
      </header>

      {/* Slide-down Typography & Manuscript Customizer */}
      <AnimatePresence>
        {showSettings && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className={`sticky top-[53px] z-20 ${activeTheme.cardBg} backdrop-blur-md border-b ${activeTheme.cardBorder} px-4 py-3.5 shadow-2xl transition-colors duration-500`}
          >
            <div className={`max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-xs ${activeTheme.textSecondary}`}>
              {/* Themes Selector */}
              <div className="flex items-center gap-2">
                <span className={`font-mono uppercase text-[10px] ${activeTheme.accent}`}>نمط الصفحة:</span>
                <div className="flex items-center gap-1.5 flex-wrap">
                  <button
                    onClick={() => setTheme('midnight')}
                    className={`px-2.5 py-1 rounded-sm border flex items-center gap-1.5 cursor-pointer ${
                      theme === 'midnight'
                        ? 'border-[#c5a059] bg-[#0c0d12] text-[#f5f2ed] font-bold shadow-sm'
                        : `${activeTheme.cardBorder} opacity-70 hover:opacity-100`
                    }`}
                  >
                    <span className="w-2.5 h-2.5 rounded-full bg-[#08080b] border border-[#c5a059]/40 inline-block" />
                    <span>سواد كوني</span>
                  </button>
                  <button
                    onClick={() => setTheme('parchment')}
                    className={`px-2.5 py-1 rounded-sm border flex items-center gap-1.5 cursor-pointer ${
                      theme === 'parchment'
                        ? 'border-[#8c6d37] bg-[#fbf8f0] text-[#2c2214] font-bold shadow-sm'
                        : `${activeTheme.cardBorder} opacity-70 hover:opacity-100`
                    }`}
                  >
                    <span className="w-2.5 h-2.5 rounded-full bg-[#f4ecd8] border border-[#8c6d37] inline-block" />
                    <span>مخطوطة عاجية</span>
                  </button>
                  <button
                    onClick={() => setTheme('slate')}
                    className={`px-2.5 py-1 rounded-sm border flex items-center gap-1.5 cursor-pointer ${
                      theme === 'slate'
                        ? 'border-[#c5a059] bg-[#161c27] text-[#eef2f7] font-bold shadow-sm'
                        : `${activeTheme.cardBorder} opacity-70 hover:opacity-100`
                    }`}
                  >
                    <span className="w-2.5 h-2.5 rounded-full bg-[#0f131a] border border-[#3b82f6]/40 inline-block" />
                    <span>ضباب الليل</span>
                  </button>
                  <button
                    onClick={() => setTheme('emerald')}
                    className={`px-2.5 py-1 rounded-sm border flex items-center gap-1.5 cursor-pointer ${
                      theme === 'emerald'
                        ? 'border-[#c5a059] bg-[#0f1f17] text-[#f0f7f3] font-bold shadow-sm'
                        : `${activeTheme.cardBorder} opacity-70 hover:opacity-100`
                    }`}
                  >
                    <span className="w-2.5 h-2.5 rounded-full bg-[#08120d] border border-[#10b981]/40 inline-block" />
                    <span>زمرد ملكي</span>
                  </button>
                </div>
              </div>

              {/* Font Type Selector */}
              <div className="flex items-center gap-2">
                <span className={`font-mono uppercase text-[10px] ${activeTheme.accent}`}>نوع الخط:</span>
                <div className="flex items-center gap-1 flex-wrap">
                  {(
                    [
                      { id: 'amiri', name: 'أميري' },
                      { id: 'naskh', name: 'نسخ' },
                      { id: 'scheherazade', name: 'شهرزاد' },
                      { id: 'ruqaa', name: 'رقعة' },
                      { id: 'serif-ar', name: 'سيريف' },
                    ] as const
                  ).map((f) => (
                    <button
                      key={f.id}
                      onClick={() => setFont(f.id)}
                      className={`px-2 py-1 rounded-sm border cursor-pointer ${
                        font === f.id
                          ? `${activeTheme.accentBorder} ${activeTheme.accentBg} ${activeTheme.accent} font-bold`
                          : `${activeTheme.cardBorder} opacity-60 hover:opacity-100`
                      }`}
                    >
                      {f.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Font Size Adjuster */}
              <div className="flex items-center gap-2">
                <span className={`font-mono uppercase text-[10px] ${activeTheme.accent}`}>الحجم:</span>
                <div className="flex items-center gap-1">
                  <button
                    disabled={fontSizeIndex <= 0}
                    onClick={() => setFontSizeIndex((i) => Math.max(0, i - 1))}
                    className={`w-7 h-7 rounded-sm border ${activeTheme.cardBorder} ${activeTheme.appBg} ${activeTheme.textPrimary} flex items-center justify-center disabled:opacity-30 hover:${activeTheme.accentBorder} cursor-pointer font-bold`}
                    title="تصغير الخط"
                  >
                    -
                  </button>
                  <span className="px-1 text-[11px] font-mono text-center min-w-[20px]">{fontSizeIndex + 1}</span>
                  <button
                    disabled={fontSizeIndex >= fontSizes.length - 1}
                    onClick={() => setFontSizeIndex((i) => Math.min(fontSizes.length - 1, i + 1))}
                    className={`w-7 h-7 rounded-sm border ${activeTheme.cardBorder} ${activeTheme.appBg} ${activeTheme.textPrimary} flex items-center justify-center disabled:opacity-30 hover:${activeTheme.accentBorder} cursor-pointer font-bold`}
                    title="تكبير الخط"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Container with Decorative Lateral Margins on Wide Desktops */}
      <div className="relative flex-1 w-full flex items-center justify-center py-6 sm:py-10 md:py-14 px-3 sm:px-6 md:px-8">
        {/* Subtle radial aura behind book page */}
        <div
          className="absolute inset-0 pointer-events-none opacity-40 blur-3xl transition-colors duration-700"
          style={{
            background: `radial-gradient(circle at center, ${
              activeTheme.isLight ? 'rgba(212, 175, 55, 0.12)' : 'rgba(197, 160, 89, 0.08)'
            } 0%, transparent 70%)`,
          }}
        />

        {/* Decorative Literary Vertical Ribbon on Left (for Large Screens >= 1280px) */}
        <div className="hidden xl:flex absolute left-8 top-1/2 -translate-y-1/2 flex-col items-center gap-6 opacity-30 select-none pointer-events-none">
          <GazelleInsignia size={22} className={activeTheme.accent} />
          <div className="w-px h-20 bg-gradient-to-b from-current via-current to-transparent" />
          <span
            className={`text-xs font-serif tracking-[0.3em] ${activeTheme.accent}`}
            style={{ writingMode: 'vertical-rl' }}
          >
            ديوان غزالتي
          </span>
          <div className="w-px h-20 bg-gradient-to-t from-current via-current to-transparent" />
        </div>

        {/* Decorative Literary Vertical Ribbon on Right (for Large Screens >= 1280px) */}
        <div className="hidden xl:flex absolute right-8 top-1/2 -translate-y-1/2 flex-col items-center gap-6 opacity-30 select-none pointer-events-none">
          <span className="text-[#c5a059] text-sm">❦</span>
          <div className="w-px h-20 bg-gradient-to-b from-current via-current to-transparent" />
          <span
            className={`text-xs font-serif tracking-[0.3em] ${activeTheme.accent}`}
            style={{ writingMode: 'vertical-rl' }}
          >
            {poem.chapter}
          </span>
          <div className="w-px h-20 bg-gradient-to-t from-current via-current to-transparent" />
        </div>

        {/* Main Book Reader Page - Unified intimate manuscript design identical to poet Ifrahim */}
        <main className="relative z-10 w-full max-w-2xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={poem.id}
              initial={{ opacity: 0, y: 15, scale: 0.985 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -15, scale: 0.985 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              id="book-physical-page"
              className={`relative w-full rounded-md border ${activeTheme.pageBorder} ${activeTheme.pageBg} p-6 sm:p-10 md:p-12 ${activeTheme.spineShadow} transition-all duration-500 overflow-hidden shadow-2xl`}
            >
              {/* Delicate double-line hairline inner manuscript frame */}
              <div
                className={`absolute inset-2 sm:inset-3.5 border border-current pointer-events-none rounded-[3px] ${
                  activeTheme.isLight ? 'opacity-15' : 'opacity-10'
                }`}
              />

              {/* Classical Antique Corner Filigrees */}
              <CornerFiligree
                position="tr"
                className="top-2 sm:top-3.5 right-2 sm:right-3.5"
                color={activeTheme.isLight ? '#8c6d37' : '#c5a059'}
              />
              <CornerFiligree
                position="tl"
                className="top-2 sm:top-3.5 left-2 sm:left-3.5"
                color={activeTheme.isLight ? '#8c6d37' : '#c5a059'}
              />
              <CornerFiligree
                position="br"
                className="bottom-2 sm:bottom-3.5 right-2 sm:right-3.5"
                color={activeTheme.isLight ? '#8c6d37' : '#c5a059'}
              />
              <CornerFiligree
                position="bl"
                className="bottom-2 sm:bottom-3.5 left-2 sm:left-3.5"
                color={activeTheme.isLight ? '#8c6d37' : '#c5a059'}
              />

              {/* Background Manuscript Subtle Watermark (Does not impair text clarity) */}
              <DiwanWatermark className={activeTheme.isLight ? 'text-[#8c6d37]' : 'text-[#c5a059]'} />

              {/* Top Page Header (Chapter, Page Num, Symbol) */}
              <div
                className={`relative z-10 flex items-center justify-between border-b ${
                  activeTheme.isLight ? 'border-[#8c6d37]/20' : 'border-current/15'
                } pb-3 sm:pb-4 mb-4 sm:mb-6`}
              >
                <div className="flex items-center gap-2">
                  <SurrealSymbol symbol={poem.symbol} size={16} className={activeTheme.accent} />
                  <span className={`text-[11px] font-mono tracking-widest uppercase ${activeTheme.accent} font-semibold`}>
                    {poem.chapter}
                  </span>
                  <span className={`text-[10px] font-mono ${activeTheme.accent} ${activeTheme.accentBg} border ${activeTheme.accentBorder} px-2 py-0.5 rounded-sm`}>
                    نص #{poem.pageNumber}
                  </span>
                </div>
                <span className={`text-[11px] font-mono tracking-widest ${activeTheme.textSecondary} font-medium`}>
                  صفحة {poem.pageNumber} من {totalPoemsCount}
                </span>
              </div>

              {/* Center Title & Poet Headpiece - Exactly matching Ifrahim */}
              <div className="relative z-10 text-center mb-6 sm:mb-8">
                {/* Upper delicate Arabesque flourish */}
                <div className="flex items-center justify-center gap-2 mb-2 opacity-70">
                  <span className={`text-xs ${activeTheme.accent}`}>❦</span>
                  <span className="w-8 h-px bg-gradient-to-r from-transparent to-[#c5a059]" />
                  <span className={`text-sm ${activeTheme.accent}`}>❖</span>
                  <span className="w-8 h-px bg-gradient-to-l from-transparent to-[#c5a059]" />
                  <span className={`text-xs ${activeTheme.accent}`}>❦</span>
                </div>

                {/* Main Poem Title */}
                <h2
                  id="active-poem-title"
                  className={`font-amiri text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold ${activeTheme.textPrimary} mb-2 sm:mb-3 tracking-wide leading-tight`}
                >
                  {poem.title}
                </h2>

                {/* Distinct Poet Name Attribution */}
                <div className="inline-flex items-center justify-center gap-1.5 px-4 py-1 rounded-full bg-current/5 border border-current/15 mt-1 mb-2">
                  <Feather size={12} className={activeTheme.accent} />
                  <span className={`text-xs sm:text-sm font-serif font-semibold ${activeTheme.accent} tracking-wide`}>
                    بقلم: {poetName}
                  </span>
                </div>

                {/* Symmetrical Arabic divider */}
                <ArabesqueDivider color={activeTheme.isLight ? '#8c6d37' : '#c5a059'} className="mt-2 opacity-80" />
              </div>

              {/* Poem Verses - Unified, cohesive, book-like poetic block */}
              <div className="relative z-10 my-2 sm:my-4 flex flex-col items-center justify-center select-text w-full">
                <div
                  className={`w-full max-w-[340px] sm:max-w-[420px] md:max-w-[460px] mx-auto text-center ${fontClassMap[font]} ${activeTheme.textPrimary}`}
                >
                  <div className="flex flex-col items-center text-center space-y-1 sm:space-y-1.5 w-full">
                    {poemLines.map((line, lIdx) => {
                      const hasDoubleHemistich = line.includes('***');

                      if (hasDoubleHemistich) {
                        const [sadr, ajuz] = line.split('***');
                        return (
                          <div
                            key={lIdx}
                            className={`w-full ${fontSizes[fontSizeIndex]} font-normal tracking-normal transition-all text-center [text-wrap:balance] break-words`}
                          >
                            <div className="flex flex-wrap items-center justify-center gap-x-2.5 sm:gap-x-3.5 gap-y-0.5 text-center">
                              <span>{sadr.trim()}</span>
                              <span className="text-[#c5a059] text-[10px] sm:text-xs opacity-60 select-none px-0.5">✦</span>
                              <span>{ajuz?.trim()}</span>
                            </div>
                          </div>
                        );
                      }

                      return (
                        <p
                          key={lIdx}
                          className={`w-full ${fontSizes[fontSizeIndex]} font-normal tracking-normal transition-all text-center [text-wrap:balance] break-words m-0`}
                        >
                          {line}
                        </p>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Optional poetic footnotes / note */}
              {poem.notes && (
                <div
                  className={`relative z-10 mt-6 pt-3 border-t ${activeTheme.divider} text-xs ${activeTheme.textSecondary} text-center font-naskh not-italic opacity-80`}
                >
                  {poem.notes}
                </div>
              )}

              {/* Bottom page footnote */}
              <div
                className={`relative z-10 mt-4 pt-3 flex items-center justify-between text-[10px] font-mono uppercase tracking-widest ${activeTheme.textSecondary} opacity-60 border-t border-dashed border-current/20`}
              >
                <span>{footerCredit}</span>
                <span>{poem.chapter}</span>
              </div>
            </motion.div>
          </AnimatePresence>
        </main>
      </div>

      {/* Bottom Floating Navigation Toolbar */}
      <footer className={`sticky bottom-0 z-30 ${activeTheme.headerBg} backdrop-blur-md border-t ${activeTheme.headerBorder} px-3 sm:px-8 py-3 transition-colors duration-500 w-full`}>
        <div className="max-w-5xl mx-auto flex items-center justify-between gap-2 sm:gap-4">
          {/* Previous Page Button */}
          <button
            id="prev-page-button"
            disabled={!hasPrev}
            onClick={onPrevPoem}
            className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-5 py-2 rounded-sm border ${activeTheme.cardBorder} ${activeTheme.cardBg} ${activeTheme.textPrimary} disabled:opacity-30 disabled:pointer-events-none hover:${activeTheme.accentBorder} transition-all text-xs sm:text-sm cursor-pointer shadow-sm`}
          >
            <ChevronRight size={16} />
            <span className="font-serif">الصفحة السابقة</span>
          </button>

          {/* Center Page Counter Badge & Quick Back to Library */}
          <button
            id="reader-footer-index-btn"
            onClick={onBackToLibrary}
            className="text-center font-mono px-3 py-1 rounded hover:bg-white/5 transition-colors cursor-pointer group"
            title="الرجوع إلى الفهرس والمكتبة"
          >
            <span className={`text-xs sm:text-sm ${activeTheme.accent} font-bold block tracking-wider group-hover:underline`}>
              ص {poem.pageNumber}
            </span>
            <span className={`text-[10px] ${activeTheme.textSecondary} block tracking-widest group-hover:${activeTheme.textPrimary}`}>
              {poem.categoryTitle}
            </span>
          </button>

          {/* Next Page Button */}
          <button
            id="next-page-button"
            disabled={!hasNext}
            onClick={onNextPoem}
            className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-5 py-2 rounded-sm border ${activeTheme.cardBorder} ${activeTheme.cardBg} ${activeTheme.textPrimary} disabled:opacity-30 disabled:pointer-events-none hover:${activeTheme.accentBorder} transition-all text-xs sm:text-sm cursor-pointer shadow-sm`}
          >
            <span className="font-serif">الصفحة التالية</span>
            <ChevronLeft size={16} />
          </button>
        </div>
      </footer>
    </div>
  );
}
