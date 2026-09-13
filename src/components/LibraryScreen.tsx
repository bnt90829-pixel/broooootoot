import { useState, useMemo, useEffect, MouseEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Search,
  Bookmark,
  Shuffle,
  ArrowRight,
  BookOpen,
  Heart,
  ChevronLeft,
  Feather,
  Menu,
  User,
  CloudRain,
  Compass,
  Flame,
  HelpCircle,
  Palette,
} from 'lucide-react';
import { Poem, PoemCategory, BookTheme } from '../types';
import { PoetsDrawer } from './PoetsDrawer';
import { PoetInfo, getPoetNameForPoem } from '../data/poets';
import { THEMES } from '../utils/theme';
import { DeerDrawing } from './LiteraryDecorations';

interface LibraryScreenProps {
  poems: Poem[];
  onSelectPoem: (poem: Poem) => void;
  onBackToCover: () => void;
  bookmarkedIds: string[];
  onToggleBookmark: (id: string, e?: MouseEvent) => void;
  onRandomPoem: () => void;
  selectedCategory?: PoemCategory;
  onSelectCategory?: (category: PoemCategory) => void;
  searchQuery?: string;
  onSearchChange?: (query: string) => void;
  showBookmarksOnly?: boolean;
  onToggleBookmarksFilter?: (show: boolean) => void;
  lastActivePoemId?: string;
  savedScrollY?: number;
  theme?: BookTheme;
  onThemeChange?: (theme: BookTheme) => void;
}

const CATEGORIES: { id: PoemCategory; name: string; subtitle: string; icon: typeof BookOpen; description: string }[] = [
  {
    id: 'all',
    name: 'جميع النصوص',
    subtitle: '',
    icon: BookOpen,
    description: '',
  },
  {
    id: 'ghazal',
    name: 'غزالتي',
    subtitle: '',
    icon: Heart,
    description: '',
  },
  {
    id: 'limatha',
    name: 'لماذا؟',
    subtitle: '',
    icon: HelpCircle,
    description: '',
  },
  {
    id: 'nathr',
    name: 'نثر غزالتي',
    subtitle: '',
    icon: BookOpen,
    description: '',
  },
  {
    id: 'inkisar',
    name: 'الإنكسار',
    subtitle: '',
    icon: CloudRain,
    description: '',
  },
  {
    id: 'habr',
    name: 'حين يجرؤ الحبر',
    subtitle: '',
    icon: Flame,
    description: '',
  },
];

const HEYAM_CATEGORY_INFO = {
  id: 'heyam' as PoemCategory,
  name: 'الشاعرة هيام محمد',
  subtitle: 'مجموعة قصائد وأشعار ووجدانيات',
  icon: Feather,
  description: 'ديوان الشاعرة هيام محمد: مجموعة قصائد وأشعار ووجدانيات تحاكي أعماق الروح والذاكرة والغياب',
};

const SULTAN_CATEGORY_INFO = {
  id: 'sultan' as PoemCategory,
  name: 'الشاعر محمد سلطان',
  subtitle: 'مجموعة شعرية وقصائد عمودية',
  icon: Feather,
  description: 'ديوان الشاعر محمد سلطان: مجموعة شعرية في ليل الأسى والغربة والذكرى وبقايا الأمس، ١٠ قصائد كاملة',
};

const SALIM_CATEGORY_INFO = {
  id: 'salim' as PoemCategory,
  name: 'الشاعر سليم السلطان',
  subtitle: 'قصائد في الحياة والأمل والخيانة',
  icon: Feather,
  description: 'ديوان الشاعر سليم السلطان: مجموعة شعرية مختارة في الأمل والحياة وقصائد الخيانة والغدر، ١٣ قصيدة كاملة',
};

const YAQEEN_CATEGORY_INFO = {
  id: 'yaqeen' as PoemCategory,
  name: 'الشاعرة يقين محمد',
  subtitle: 'غزل بجمال الأنثى وغرورها وكبريائها',
  icon: Feather,
  description: 'ديوان يقين السلطان: غزل بجمال الأنثى وعزتها وغرورها وكبريائها وسلطانة الذات، ١٤ قصيدة كاملة',
};

const SAAD_CATEGORY_INFO = {
  id: 'saad' as PoemCategory,
  name: 'سعد غدير',
  subtitle: 'حكايات وحكم — روائع القصص والعِبَر',
  icon: Feather,
  description: 'روائع القصص والعِبَر للأديب سعد غدير: ١١ حكاية وحكمة تربوية مستخلصة من التراث والمفاهيم الإنسانية',
};

export function LibraryScreen({
  poems,
  onSelectPoem,
  onBackToCover,
  bookmarkedIds,
  onToggleBookmark,
  onRandomPoem,
  selectedCategory: propCategory,
  onSelectCategory,
  searchQuery: propSearchQuery,
  onSearchChange,
  showBookmarksOnly: propShowBookmarksOnly,
  onToggleBookmarksFilter,
  lastActivePoemId,
  savedScrollY,
  theme = 'midnight',
  onThemeChange,
}: LibraryScreenProps) {
  const [localCategory, setLocalCategory] = useState<PoemCategory>('all');
  const [localSearchQuery, setLocalSearchQuery] = useState('');
  const [localShowBookmarksOnly, setLocalShowBookmarksOnly] = useState(false);
  const [isPoetsDrawerOpen, setIsPoetsDrawerOpen] = useState(false);
  const [isThemeMenuOpen, setIsThemeMenuOpen] = useState(false);

  const activeTheme = THEMES[theme] || THEMES.midnight;

  // Restore scroll position to where the user stopped or to the last viewed poem card
  useEffect(() => {
    let timeoutId: number;
    let animId: number;

    const performRestore = () => {
      if (lastActivePoemId) {
        const targetElement = document.getElementById(`poem-card-${lastActivePoemId}`);
        if (targetElement) {
          targetElement.scrollIntoView({ block: 'center', behavior: 'auto' });
          return;
        }
      }
      if (typeof savedScrollY === 'number' && savedScrollY > 0) {
        window.scrollTo({ top: savedScrollY, behavior: 'auto' });
      }
    };

    // Attempt immediately and after initial render frames
    animId = requestAnimationFrame(() => {
      performRestore();
    });

    timeoutId = window.setTimeout(() => {
      performRestore();
    }, 120);

    return () => {
      cancelAnimationFrame(animId);
      clearTimeout(timeoutId);
    };
  }, [lastActivePoemId, savedScrollY]);

  const selectedCategory = propCategory !== undefined ? propCategory : localCategory;
  const setSelectedCategory = (cat: PoemCategory) => {
    if (onSelectCategory) onSelectCategory(cat);
    setLocalCategory(cat);
  };

  const searchQuery = propSearchQuery !== undefined ? propSearchQuery : localSearchQuery;
  const setSearchQuery = (q: string) => {
    if (onSearchChange) onSearchChange(q);
    setLocalSearchQuery(q);
  };

  const showBookmarksOnly = propShowBookmarksOnly !== undefined ? propShowBookmarksOnly : localShowBookmarksOnly;
  const setShowBookmarksOnly = (show: boolean) => {
    if (onToggleBookmarksFilter) onToggleBookmarksFilter(show);
    setLocalShowBookmarksOnly(show);
  };

  // Filter poems based on category, search, and bookmarks
  const filteredPoems = useMemo(() => {
    return poems.filter((poem) => {
      // Bookmarks filter
      if (showBookmarksOnly && !bookmarkedIds.includes(poem.id)) {
        return false;
      }

      // Category filter (if category is not 'all')
      if (!showBookmarksOnly && selectedCategory !== 'all' && poem.category !== selectedCategory) {
        return false;
      }

      // Search filter
      if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase();
        const inTitle = poem.title.toLowerCase().includes(q);
        const inExcerpt = poem.excerpt.toLowerCase().includes(q);
        const inStanzas = poem.stanzas.some((s) => s.toLowerCase().includes(q));
        const inChapter = poem.chapter.toLowerCase().includes(q);
        return inTitle || inExcerpt || inStanzas || inChapter;
      }

      return true;
    });
  }, [poems, selectedCategory, showBookmarksOnly, bookmarkedIds, searchQuery]);

  const activeCategoryInfo =
    selectedCategory === 'heyam'
      ? HEYAM_CATEGORY_INFO
      : selectedCategory === 'sultan'
      ? SULTAN_CATEGORY_INFO
      : selectedCategory === 'salim'
      ? SALIM_CATEGORY_INFO
      : selectedCategory === 'yaqeen'
      ? YAQEEN_CATEGORY_INFO
      : selectedCategory === 'saad'
      ? SAAD_CATEGORY_INFO
      : CATEGORIES.find((c) => c.id === selectedCategory) || CATEGORIES[0];

  const handleSelectPoet = (poet: PoetInfo) => {
    setSelectedCategory(poet.category);
    setShowBookmarksOnly(false);
    setIsPoetsDrawerOpen(false);
  };

  return (
    <div
      id="library-screen-container"
      className={`min-h-screen w-full max-w-full ${activeTheme.appBg} ${activeTheme.textPrimary} pb-24 selection:bg-[#c5a059]/30 select-none font-serif relative overflow-x-hidden transition-colors duration-500`}
    >
      {/* Subtle ambient lighting with contained overflow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-20">
        <div
          className="absolute top-0 right-1/4 w-96 h-96 rounded-full blur-3xl transition-colors duration-500"
          style={{ backgroundColor: activeTheme.ambientColor }}
        />
      </div>

      {/* Poets Drawer Modal */}
      <PoetsDrawer
        isOpen={isPoetsDrawerOpen}
        onClose={() => setIsPoetsDrawerOpen(false)}
        selectedCategory={selectedCategory}
        onSelectPoet={handleSelectPoet}
        theme={theme}
      />

      {/* Top Atmospheric Header */}
      <header className={`sticky top-0 z-30 ${activeTheme.headerBg} backdrop-blur-md border-b ${activeTheme.headerBorder} px-4 sm:px-8 py-3.5 transition-colors duration-500 w-full`}>
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          {/* Right side (in RTL): Navigation back to cover */}
          <div className="flex items-center gap-2">
            <button
              id="back-to-cover-btn"
              onClick={onBackToCover}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-sm border ${activeTheme.cardBorder} ${activeTheme.cardBg} ${activeTheme.textSecondary} hover:${activeTheme.textPrimary} hover:${activeTheme.accentBorder} transition-all text-xs sm:text-sm cursor-pointer`}
            >
              <ArrowRight size={14} />
              <span className="hidden md:inline">الغلاف الرئيسي</span>
              <span className="md:hidden">الغلاف</span>
            </button>
          </div>

          {/* Book Title Centered Header */}
          <div className="flex flex-col items-center text-center">
            <h2 className={`font-amiri text-lg sm:text-2xl font-bold ${activeTheme.textPrimary} tracking-wide flex items-center gap-2`}>
              <span className={activeTheme.accent}>«</span>
              {selectedCategory === 'ghazal'
                ? 'غزالتي'
                : selectedCategory === 'limatha'
                ? 'لماذا؟'
                : selectedCategory === 'nathr'
                ? 'نثر غزالتي'
                : selectedCategory === 'heyam'
                ? 'ديوان هيام محمد'
                : selectedCategory === 'sultan'
                ? 'ديوان محمد سلطان'
                : selectedCategory === 'salim'
                ? 'ديوان سليم السلطان'
                : selectedCategory === 'yaqeen'
                ? 'ديوان يقين محمد'
                : selectedCategory === 'saad'
                ? 'سعد غدير'
                : selectedCategory === 'inkisar'
                ? 'الإنكسار'
                : selectedCategory === 'habr'
                ? 'حين يجرؤ الحبر'
                : 'ديوان غزالتي'}
              <span className={activeTheme.accent}>»</span>
            </h2>
            <span className={`text-[10px] uppercase tracking-[0.2em] ${activeTheme.accent} font-mono`}>
              {selectedCategory === 'ghazal'
                ? 'إفراهيم 2003'
                : selectedCategory === 'limatha'
                ? 'إفراهيم 2003'
                : selectedCategory === 'nathr'
                ? 'نثر غزالتي'
                : selectedCategory === 'inkisar'
                ? 'الإنكسار'
                : selectedCategory === 'habr'
                ? 'حين يجرؤ الحبر'
                : selectedCategory === 'heyam'
                ? 'هيام محمد'
                : selectedCategory === 'sultan'
                ? 'محمد سلطان'
                : selectedCategory === 'salim'
                ? 'سليم السلطان'
                : selectedCategory === 'yaqeen'
                ? 'يقين محمد'
                : selectedCategory === 'saad'
                ? 'سعد غدير'
                : 'ديوان غزالتي'}
            </span>
          </div>

          {/* Left side (in RTL): Action buttons + Poets Menu Button '=' in the left corner */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            {/* Global Theme Switcher Button */}
            <div className="relative">
              <button
                id="library-theme-toggle-btn"
                onClick={() => setIsThemeMenuOpen(!isThemeMenuOpen)}
                className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-sm border ${activeTheme.cardBorder} ${activeTheme.cardBg} ${activeTheme.textSecondary} hover:${activeTheme.textPrimary} hover:${activeTheme.accentBorder} transition-all text-xs sm:text-sm cursor-pointer`}
                title="تغيير المظهر واللون لجميع أرجاء التطبيق"
              >
                <Palette size={14} className={activeTheme.accent} />
                <span className="hidden lg:inline">اللون</span>
              </button>

              <AnimatePresence>
                {isThemeMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -5, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -5, scale: 0.96 }}
                    className={`absolute left-0 mt-2 w-44 rounded-sm border ${activeTheme.cardBorder} ${activeTheme.cardBg} shadow-2xl z-50 p-1.5 backdrop-blur-md`}
                  >
                    {([
                      { id: 'midnight', name: 'سواد كوني' },
                      { id: 'parchment', name: 'مخطوطة عاجية' },
                      { id: 'slate', name: 'ضباب الليل' },
                      { id: 'emerald', name: 'زمرد ملكي' },
                    ] as const).map((t) => (
                      <button
                        key={t.id}
                        onClick={() => {
                          onThemeChange?.(t.id);
                          setIsThemeMenuOpen(false);
                        }}
                        className={`w-full text-right px-3 py-2 rounded-sm text-xs font-serif flex items-center justify-between cursor-pointer transition-colors ${
                          theme === t.id
                            ? `${activeTheme.accentBg} ${activeTheme.accent} font-bold`
                            : `${activeTheme.textSecondary} hover:${activeTheme.textPrimary} hover:${activeTheme.cardHoverBg}`
                        }`}
                      >
                        <span>{t.name}</span>
                        {theme === t.id && <span className="text-xs">✓</span>}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <button
              id="random-poem-button"
              onClick={onRandomPoem}
              className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-sm border ${activeTheme.cardBorder} ${activeTheme.cardBg} ${activeTheme.textSecondary} hover:${activeTheme.textPrimary} hover:${activeTheme.accentBorder} transition-all text-xs sm:text-sm cursor-pointer`}
              title="قراءة قصيدة عشوائية"
            >
              <Shuffle size={13} className={activeTheme.accent} />
              <span className="hidden md:inline">قصيدة عشوائية</span>
            </button>

            <button
              id="toggle-bookmarks-filter-btn"
              onClick={() => setShowBookmarksOnly(!showBookmarksOnly)}
              className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-sm border transition-all text-xs sm:text-sm cursor-pointer ${
                showBookmarksOnly
                  ? 'border-[#c5a059] bg-[#c5a059] text-[#0a0a0c] font-bold'
                  : `${activeTheme.cardBorder} ${activeTheme.cardBg} ${activeTheme.textSecondary} hover:${activeTheme.textPrimary} hover:${activeTheme.accentBorder}`
              }`}
              title="عرض الصفحات المحفوظة"
            >
              <Bookmark size={13} className={showBookmarksOnly ? 'fill-[#0a0a0c]' : ''} />
              <span className="hidden sm:inline">المحفوظات</span>
              {bookmarkedIds.length > 0 && (
                <span
                  className={`px-1.5 py-0.2 rounded-full text-[10px] ${
                    showBookmarksOnly
                      ? 'bg-[#0a0a0c] text-[#c5a059]'
                      : `${activeTheme.badgeBg} ${activeTheme.accent}`
                  }`}
                >
                  {bookmarkedIds.length}
                </span>
              )}
            </button>

            {/* Corner '=' Poets Button placed on the Left */}
            <button
              id="poets-menu-toggle-btn"
              onClick={() => setIsPoetsDrawerOpen(true)}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-sm border ${activeTheme.accentBorder} ${activeTheme.cardBg} ${activeTheme.textPrimary} hover:${activeTheme.accentBorder} transition-all text-xs sm:text-sm cursor-pointer shadow-sm group`}
              title="قائمة الشعراء والأدباء (=)"
            >
              <span className={`font-mono text-lg font-bold ${activeTheme.accent} leading-none group-hover:scale-110 transition-transform`}>
                =
              </span>
              <span className="font-serif font-bold text-xs sm:text-sm">الشعراء</span>
              {(selectedCategory === 'heyam' || selectedCategory === 'sultan' || selectedCategory === 'salim' || selectedCategory === 'yaqeen' || selectedCategory === 'saad') && (
                <span className={`w-2 h-2 rounded-full bg-current ${activeTheme.accent} animate-pulse`} />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-6xl mx-auto px-4 sm:px-8 pt-6 relative z-10">
        {/* Search & Fast Jump Bar */}
        <div className="mb-6 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <Search size={15} className={`absolute right-3.5 top-1/2 -translate-y-1/2 ${activeTheme.accent} pointer-events-none`} />
            <input
              id="library-search-input"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={
                selectedCategory === 'heyam'
                  ? 'ابحث في قصائد وأشعار هيام محمد...'
                  : selectedCategory === 'sultan'
                  ? 'ابحث في قصائد الشاعر محمد سلطان...'
                  : selectedCategory === 'salim'
                  ? 'ابحث في قصائد الشاعر سليم السلطان...'
                  : selectedCategory === 'yaqeen'
                  ? 'ابحث في قصائد الشاعرة يقين محمد...'
                  : selectedCategory === 'saad'
                  ? 'ابحث في حكايات وحكم سعد غدير...'
                  : 'ابحث في عناوين ونصوص الديوان والقصائد...'
              }
              className={`w-full pl-4 pr-10 py-2.5 rounded-sm border ${activeTheme.inputBorder} ${activeTheme.inputBg} text-sm ${activeTheme.textPrimary} placeholder:${activeTheme.textMuted} focus:outline-none focus:${activeTheme.accentBorder} transition-all`}
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className={`absolute left-3 top-1/2 -translate-y-1/2 text-xs ${activeTheme.textSecondary} hover:${activeTheme.textPrimary}`}
              >
                مسح
              </button>
            )}
          </div>

          {searchQuery && (
            <div className={`text-xs ${activeTheme.accent} flex items-center gap-1.5 self-end sm:self-auto font-serif`}>
              <span>نتائج البحث عن: «{searchQuery}»</span>
            </div>
          )}
        </div>

        {/* Categories Ribbon Navigation - Clean & Elegant Design */}
        {!showBookmarksOnly && selectedCategory !== 'heyam' && selectedCategory !== 'sultan' && selectedCategory !== 'salim' && selectedCategory !== 'yaqeen' && selectedCategory !== 'saad' && (
          <div className="mb-8 w-full">
            <div className="flex items-center gap-2 sm:gap-3 overflow-x-auto pb-2 pt-1 no-scrollbar scroll-smooth">
              {CATEGORIES.map((cat) => {
                const isActive = selectedCategory === cat.id;

                return (
                  <button
                    key={cat.id}
                    id={`cat-tab-${cat.id}`}
                    onClick={() => {
                      setSelectedCategory(cat.id);
                      setShowBookmarksOnly(false);
                    }}
                    className={`px-4 sm:px-5 py-2.5 rounded-sm text-xs sm:text-sm font-serif transition-all duration-300 whitespace-nowrap cursor-pointer flex items-center gap-2 ${
                      isActive
                        ? activeTheme.isLight
                          ? 'bg-[#855e1e] text-[#fcfaf7] font-bold shadow-md border border-[#855e1e]'
                          : `${activeTheme.accentBg} ${activeTheme.accent} font-bold shadow-md border ${activeTheme.accentBorder}`
                        : `${activeTheme.cardBg} ${activeTheme.textSecondary} border ${activeTheme.cardBorder} hover:${activeTheme.accentBorder} hover:${activeTheme.textPrimary} hover:${activeTheme.cardHoverBg}`
                    }`}
                  >
                    <span className="tracking-wide">{cat.name}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Dedicated Poet Header Banner for Heyam */}
        {!showBookmarksOnly && selectedCategory === 'heyam' && searchQuery === '' && (
          <div className={`mb-8 p-6 rounded-sm border ${activeTheme.accentBorder} ${activeTheme.cardBg} relative overflow-hidden`}>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className={`text-[10px] font-mono uppercase tracking-[0.25em] ${activeTheme.accent} block font-bold`}>
                    ديوان شعري مستقل
                  </span>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full ${activeTheme.accentBg} ${activeTheme.accent} border ${activeTheme.accentBorder}`}>
                    ١٢ قصيدة كاملة
                  </span>
                </div>
                <h3 className={`font-amiri text-2xl sm:text-3xl font-bold ${activeTheme.textPrimary} mb-2`}>
                  {HEYAM_CATEGORY_INFO.name}
                </h3>
                <p className={`text-xs sm:text-sm ${activeTheme.textSecondary} max-w-xl leading-relaxed font-serif`}>
                  {HEYAM_CATEGORY_INFO.description}
                </p>
              </div>

              <div className="flex items-center gap-2 self-start md:self-center">
                <button
                  onClick={() => setIsPoetsDrawerOpen(true)}
                  className={`px-3 py-1.5 rounded-sm border ${activeTheme.accentBorder} ${activeTheme.accentBg} ${activeTheme.accent} text-xs font-serif hover:opacity-90 transition-all flex items-center gap-1.5 cursor-pointer`}
                >
                  <Feather size={14} />
                  <span>قائمة الشعراء</span>
                </button>
                <button
                  onClick={() => setSelectedCategory('all')}
                  className={`px-3 py-1.5 rounded-sm border ${activeTheme.cardBorder} ${activeTheme.textSecondary} text-xs font-serif hover:${activeTheme.textPrimary} hover:${activeTheme.accentBorder} transition-all cursor-pointer`}
                >
                  الديوان الأساسي
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Dedicated Poet Header Banner for Sultan */}
        {!showBookmarksOnly && selectedCategory === 'sultan' && searchQuery === '' && (
          <div className={`mb-8 p-6 rounded-sm border ${activeTheme.accentBorder} ${activeTheme.cardBg} relative overflow-hidden`}>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className={`text-[10px] font-mono uppercase tracking-[0.25em] ${activeTheme.accent} block font-bold`}>
                    ديوان شعري مستقل
                  </span>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full ${activeTheme.accentBg} ${activeTheme.accent} border ${activeTheme.accentBorder}`}>
                    ١٠ قصائد كاملة
                  </span>
                </div>
                <h3 className={`font-amiri text-2xl sm:text-3xl font-bold ${activeTheme.textPrimary} mb-2`}>
                  {SULTAN_CATEGORY_INFO.name}
                </h3>
                <p className={`text-xs sm:text-sm ${activeTheme.textSecondary} max-w-xl leading-relaxed font-serif`}>
                  {SULTAN_CATEGORY_INFO.description}
                </p>
              </div>

              <div className="flex items-center gap-2 self-start md:self-center">
                <button
                  onClick={() => setIsPoetsDrawerOpen(true)}
                  className={`px-3 py-1.5 rounded-sm border ${activeTheme.accentBorder} ${activeTheme.accentBg} ${activeTheme.accent} text-xs font-serif hover:opacity-90 transition-all flex items-center gap-1.5 cursor-pointer`}
                >
                  <Feather size={14} />
                  <span>قائمة الشعراء</span>
                </button>
                <button
                  onClick={() => setSelectedCategory('all')}
                  className={`px-3 py-1.5 rounded-sm border ${activeTheme.cardBorder} ${activeTheme.textSecondary} text-xs font-serif hover:${activeTheme.textPrimary} hover:${activeTheme.accentBorder} transition-all cursor-pointer`}
                >
                  الديوان الأساسي
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Dedicated Poet Header Banner for Salim */}
        {!showBookmarksOnly && selectedCategory === 'salim' && searchQuery === '' && (
          <div className={`mb-8 p-6 rounded-sm border ${activeTheme.accentBorder} ${activeTheme.cardBg} relative overflow-hidden`}>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className={`text-[10px] font-mono uppercase tracking-[0.25em] ${activeTheme.accent} block font-bold`}>
                    ديوان شعري مستقل
                  </span>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full ${activeTheme.accentBg} ${activeTheme.accent} border ${activeTheme.accentBorder}`}>
                    ١٣ قصيدة كاملة
                  </span>
                </div>
                <h3 className={`font-amiri text-2xl sm:text-3xl font-bold ${activeTheme.textPrimary} mb-2`}>
                  {SALIM_CATEGORY_INFO.name}
                </h3>
                <p className={`text-xs sm:text-sm ${activeTheme.textSecondary} max-w-xl leading-relaxed font-serif`}>
                  {SALIM_CATEGORY_INFO.description}
                </p>
              </div>

              <div className="flex items-center gap-2 self-start md:self-center">
                <button
                  onClick={() => setIsPoetsDrawerOpen(true)}
                  className={`px-3 py-1.5 rounded-sm border ${activeTheme.accentBorder} ${activeTheme.accentBg} ${activeTheme.accent} text-xs font-serif hover:opacity-90 transition-all flex items-center gap-1.5 cursor-pointer`}
                >
                  <Feather size={14} />
                  <span>قائمة الشعراء</span>
                </button>
                <button
                  onClick={() => setSelectedCategory('all')}
                  className={`px-3 py-1.5 rounded-sm border ${activeTheme.cardBorder} ${activeTheme.textSecondary} text-xs font-serif hover:${activeTheme.textPrimary} hover:${activeTheme.accentBorder} transition-all cursor-pointer`}
                >
                  الديوان الأساسي
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Dedicated Poet Header Banner for Yaqeen */}
        {!showBookmarksOnly && selectedCategory === 'yaqeen' && searchQuery === '' && (
          <div className={`mb-8 p-6 rounded-sm border ${activeTheme.accentBorder} ${activeTheme.cardBg} relative overflow-hidden`}>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className={`text-[10px] font-mono uppercase tracking-[0.25em] ${activeTheme.accent} block font-bold`}>
                    ديوان شعري مستقل
                  </span>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full ${activeTheme.accentBg} ${activeTheme.accent} border ${activeTheme.accentBorder}`}>
                    ١٤ قصيدة كاملة
                  </span>
                </div>
                <h3 className={`font-amiri text-2xl sm:text-3xl font-bold ${activeTheme.textPrimary} mb-2`}>
                  {YAQEEN_CATEGORY_INFO.name}
                </h3>
                <p className={`text-xs sm:text-sm ${activeTheme.textSecondary} max-w-xl leading-relaxed font-serif`}>
                  {YAQEEN_CATEGORY_INFO.description}
                </p>
              </div>

              <div className="flex items-center gap-2 self-start md:self-center">
                <button
                  onClick={() => setIsPoetsDrawerOpen(true)}
                  className={`px-3 py-1.5 rounded-sm border ${activeTheme.accentBorder} ${activeTheme.accentBg} ${activeTheme.accent} text-xs font-serif hover:opacity-90 transition-all flex items-center gap-1.5 cursor-pointer`}
                >
                  <Feather size={14} />
                  <span>قائمة الشعراء</span>
                </button>
                <button
                  onClick={() => setSelectedCategory('all')}
                  className={`px-3 py-1.5 rounded-sm border ${activeTheme.cardBorder} ${activeTheme.textSecondary} text-xs font-serif hover:${activeTheme.textPrimary} hover:${activeTheme.accentBorder} transition-all cursor-pointer`}
                >
                  الديوان الأساسي
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Dedicated Poet Header Banner for Saad Ghadeer */}
        {!showBookmarksOnly && selectedCategory === 'saad' && searchQuery === '' && (
          <div className={`mb-8 p-6 rounded-sm border ${activeTheme.accentBorder} ${activeTheme.cardBg} relative overflow-hidden`}>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className={`text-[10px] font-mono uppercase tracking-[0.25em] ${activeTheme.accent} block font-bold`}>
                    حكايات وحكم أدبية
                  </span>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full ${activeTheme.accentBg} ${activeTheme.accent} border ${activeTheme.accentBorder}`}>
                    ١١ حكاية وحكمة
                  </span>
                </div>
                <h3 className={`font-amiri text-2xl sm:text-3xl font-bold ${activeTheme.textPrimary} mb-2`}>
                  {SAAD_CATEGORY_INFO.name}
                </h3>
                <p className={`text-xs sm:text-sm ${activeTheme.textSecondary} max-w-xl leading-relaxed font-serif`}>
                  {SAAD_CATEGORY_INFO.description}
                </p>
              </div>

              <div className="flex items-center gap-2 self-start md:self-center">
                <button
                  onClick={() => setIsPoetsDrawerOpen(true)}
                  className={`px-3 py-1.5 rounded-sm border ${activeTheme.accentBorder} ${activeTheme.accentBg} ${activeTheme.accent} text-xs font-serif hover:opacity-90 transition-all flex items-center gap-1.5 cursor-pointer`}
                >
                  <Feather size={14} />
                  <span>قائمة الشعراء</span>
                </button>
                <button
                  onClick={() => setSelectedCategory('all')}
                  className={`px-3 py-1.5 rounded-sm border ${activeTheme.cardBorder} ${activeTheme.textSecondary} text-xs font-serif hover:${activeTheme.textPrimary} hover:${activeTheme.accentBorder} transition-all cursor-pointer`}
                >
                  الديوان الأساسي
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Active Chapter Header Banner (Only when a specific chapter is selected, or for limatha) */}
        {!showBookmarksOnly && selectedCategory !== 'all' && selectedCategory !== 'heyam' && selectedCategory !== 'sultan' && selectedCategory !== 'salim' && selectedCategory !== 'yaqeen' && selectedCategory !== 'saad' && searchQuery === '' && (
          <div className={`mb-8 p-5 sm:p-6 rounded-sm border ${activeTheme.cardBorder} ${activeTheme.cardBg} flex items-center justify-between gap-4`}>
            <div>
              {activeCategoryInfo.subtitle ? (
                <span className={`text-[10px] font-mono uppercase tracking-[0.25em] ${activeTheme.accent} block mb-1 font-bold`}>
                  {activeCategoryInfo.subtitle}
                </span>
              ) : null}
              <h3 className={`font-amiri text-2xl sm:text-3xl font-bold ${activeTheme.textPrimary}`}>
                {activeCategoryInfo.name}
              </h3>
              {activeCategoryInfo.description ? (
                <p className={`text-xs sm:text-sm ${activeTheme.textSecondary} max-w-xl leading-relaxed font-serif mt-2`}>
                  {activeCategoryInfo.description}
                </p>
              ) : null}
            </div>
            <div className={`w-11 h-11 sm:w-12 sm:h-12 rounded-full border ${activeTheme.accentBorder} flex items-center justify-center ${activeTheme.accent} shrink-0`}>
              <DeerDrawing size={26} />
            </div>
          </div>
        )}

        {showBookmarksOnly && (
          <div className={`mb-8 p-6 rounded-sm border ${activeTheme.accentBorder} ${activeTheme.cardBg} flex items-center justify-between`}>
            <div>
              <span className={`text-[10px] font-mono uppercase tracking-[0.25em] ${activeTheme.accent} block mb-1`}>
                المختارات المرجعية
              </span>
              <h3 className={`font-amiri text-2xl font-bold ${activeTheme.textPrimary}`}>
                القصائد المحفوظة
              </h3>
            </div>
            <Bookmark size={24} className={`${activeTheme.accent} fill-current`} />
          </div>
        )}

        {/* Poems Grid */}
        {filteredPoems.length === 0 ? (
          <div className={`py-20 text-center border border-dashed ${activeTheme.cardBorder} rounded-sm p-8`}>
            <BookOpen size={40} className={`${activeTheme.textMuted} mx-auto mb-3 opacity-50`} />
            <h4 className={`text-base ${activeTheme.textPrimary} font-medium`}>لم يتم العثور على قصائد تطابق خياراتك</h4>
            <p className={`text-xs ${activeTheme.textSecondary} mt-1 max-w-sm mx-auto`}>
              جرب تغيير عبارة البحث أو استعراض تصنيف آخر من تصنيفات الديوان أو اختيار شاعر من قائمة الشعراء (=).
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            <AnimatePresence>
              {filteredPoems.map((poem, index) => {
                const isBookmarked = bookmarkedIds.includes(poem.id);
                const isLastActive = poem.id === lastActivePoemId;

                return (
                  <motion.div
                    key={poem.id}
                    id={`poem-card-${poem.id}`}
                    layout
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3, delay: Math.min(index * 0.02, 0.25) }}
                    onClick={() => onSelectPoem(poem)}
                    className={`group relative p-5 sm:p-6 rounded-sm border transition-all duration-300 flex flex-col justify-between cursor-pointer hover:shadow-xl ${
                      isLastActive
                        ? `${activeTheme.accentBorder} ${activeTheme.cardActiveBg} shadow-md`
                        : `${activeTheme.cardBorder} ${activeTheme.cardBg} hover:${activeTheme.accentBorder} hover:${activeTheme.cardHoverBg}`
                    }`}
                  >
                    {/* Top Item Meta */}
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <div className="flex items-center gap-2">
                          <span className={`text-[10px] font-mono tracking-widest uppercase ${activeTheme.accent} px-2 py-0.5 rounded-sm ${activeTheme.badgeBg} border ${activeTheme.badgeBorder}`}>
                            ص {poem.pageNumber}
                          </span>
                          <span className={`text-[11px] ${activeTheme.textSecondary} font-naskh`}>
                            {poem.chapter}
                          </span>
                        </div>

                        {/* Bookmark Icon */}
                        <button
                          onClick={(e) => onToggleBookmark(poem.id, e)}
                          className={`p-1.5 rounded-full transition-all cursor-pointer ${
                            isBookmarked
                              ? `${activeTheme.accent} hover:scale-110`
                              : `${activeTheme.textMuted} hover:${activeTheme.accent}`
                          }`}
                          title={isBookmarked ? 'إزالة من المحفوظات' : 'حفظ في المحفوظات'}
                        >
                          <Bookmark size={14} className={isBookmarked ? 'fill-current' : ''} />
                        </button>
                      </div>

                      {/* Poem Title */}
                      <h4 className={`font-amiri text-lg sm:text-xl font-bold ${activeTheme.textPrimary} group-hover:${activeTheme.accent} transition-colors mb-2.5 line-clamp-1`}>
                        {poem.title}
                      </h4>

                      {/* Poem Excerpt Preview */}
                      <p className={`text-xs sm:text-sm ${activeTheme.textSecondary} leading-relaxed line-clamp-3 font-naskh not-italic mb-4 font-normal whitespace-pre-line`}>
                        {poem.excerpt}
                      </p>
                    </div>

                    {/* Bottom CTA / Reading indicator */}
                    <div className={`pt-3 border-t ${activeTheme.divider} flex items-center justify-between text-[11px] ${activeTheme.accent} font-medium`}>
                      <span className="flex items-center gap-1 group-hover:underline">
                        <span>قراءة الصفحة كاملة</span>
                        <ChevronLeft size={14} className="transition-transform group-hover:-translate-x-1" />
                      </span>
                      <Feather size={12} className="opacity-40 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        )}
      </main>
    </div>
  );
}
