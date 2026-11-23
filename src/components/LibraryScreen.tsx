import { useState, useMemo, useEffect, useDeferredValue, useRef, MouseEvent, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Search,
  Bookmark,
  X,
  BookOpen,
  Heart,
  Feather,
  Menu,
  CloudRain,
  Flame,
  HelpCircle,
  Palette,
  Volume2,
  VolumeX,
  Info,
} from 'lucide-react';
import { Poem, PoemCategory, BookTheme } from '../types';
import { PoetsDrawer } from './PoetsDrawer';
import { PoetInfo } from '../data/poets';
import { THEMES } from '../utils/theme';
import { toEasternArabicNumerals } from './LiteraryDecorations';
import { GhazalaHeaderEmblem } from './GhazalaHeaderEmblem';
import { PoemCompactCard } from './PoemCompactCard';
import { BottomNavBar, BottomNavTab } from './BottomNavBar';
import { SectionsView } from './SectionsView';
import { ambientSoundscape } from '../utils/audio';

interface LibraryScreenProps {
  poems: Poem[];
  onSelectPoem: (poem: Poem) => void;
  onBackToCover: () => void;
  bookmarkedIds: string[];
  onToggleBookmark: (id: string, e?: MouseEvent) => void;
  onRandomPoem?: () => void;
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

const POET_CATEGORIES = new Set(['heyam', 'sultan', 'salim', 'yaqeen', 'saad']);
const PAGE_BATCH_SIZE = 40;

// Main Diwan categories only (Poets belong exclusively to the Poets drawer/section)
const CATEGORIES: { id: PoemCategory; name: string; icon: typeof BookOpen }[] = [
  { id: 'all', name: 'جميع النصوص', icon: BookOpen },
  { id: 'makarah', name: 'مكاره؟', icon: Feather },
  { id: 'ghazal', name: 'غزالاتي', icon: Heart },
  { id: 'limatha', name: 'لماذا؟', icon: HelpCircle },
  { id: 'inkisar', name: 'الإنكسار', icon: CloudRain },
  { id: 'habr', name: 'حين يجرؤ الحبر', icon: Flame },
];

export function LibraryScreen({
  poems,
  onSelectPoem,
  onBackToCover,
  bookmarkedIds,
  onToggleBookmark,
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
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(() => ambientSoundscape.getIsPlaying());
  // View mode: 'poems' (الرئيسية - واجهة الأشعار) or 'sections' (المكتبة - قسم الخانات)
  const [viewMode, setViewMode] = useState<'poems' | 'sections'>('poems');

  const selectedCategory = propCategory !== undefined ? propCategory : localCategory;
  const searchQuery = propSearchQuery !== undefined ? propSearchQuery : localSearchQuery;
  const deferredSearchQuery = useDeferredValue(searchQuery);
  const showBookmarksOnly =
    propShowBookmarksOnly !== undefined ? propShowBookmarksOnly : localShowBookmarksOnly;

  // Ensure initial displayCount covers lastActivePoemId if returning from deep in the list
  const [displayCount, setDisplayCount] = useState<number>(() => {
    if (lastActivePoemId) {
      const scoped = poems.filter((p) =>
        selectedCategory === 'all' ? !POET_CATEGORIES.has(p.category) : p.category === selectedCategory
      );
      const idx = scoped.findIndex((p) => p.id === lastActivePoemId);
      if (idx >= PAGE_BATCH_SIZE) {
        return Math.ceil((idx + 1) / PAGE_BATCH_SIZE) * PAGE_BATCH_SIZE;
      }
    }
    return PAGE_BATCH_SIZE;
  });

  const activeTheme = THEMES[theme] || THEMES.midnight;

  // Precompute lowercase searchable text per poem once
  const searchIndexMap = useMemo(() => {
    const map = new Map<string, string>();
    for (const poem of poems) {
      const text = `${poem.title}\n${poem.excerpt || ''}\n${poem.stanzas.join('\n')}\n${poem.chapter || ''}`.toLowerCase();
      map.set(poem.id, text);
    }
    return map;
  }, [poems]);

  // Compute count of poems per category (Diwan 'all' excludes external poet collections)
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { all: 0 };
    for (const p of poems) {
      if (p.category) {
        counts[p.category] = (counts[p.category] || 0) + 1;
        if (!POET_CATEGORIES.has(p.category)) {
          counts.all += 1;
        }
      }
    }
    return counts;
  }, [poems]);

  // Fast O(1) bookmark membership lookup
  const bookmarkedSet = useMemo(() => new Set(bookmarkedIds), [bookmarkedIds]);

  const setSelectedCategory = useCallback(
    (cat: PoemCategory) => {
      if (onSelectCategory) onSelectCategory(cat);
      setLocalCategory(cat);
      setDisplayCount(PAGE_BATCH_SIZE);
    },
    [onSelectCategory]
  );

  const setSearchQuery = useCallback(
    (q: string) => {
      if (onSearchChange) onSearchChange(q);
      setLocalSearchQuery(q);
      setDisplayCount(PAGE_BATCH_SIZE);
    },
    [onSearchChange]
  );

  const setShowBookmarksOnly = useCallback(
    (show: boolean) => {
      if (onToggleBookmarksFilter) onToggleBookmarksFilter(show);
      setLocalShowBookmarksOnly(show);
      setDisplayCount(PAGE_BATCH_SIZE);
    },
    [onToggleBookmarksFilter]
  );

  // Restore scroll position once on mount when returning from ReaderScreen
  const hasRestoredScrollRef = useRef(false);
  useEffect(() => {
    if (hasRestoredScrollRef.current) return;
    hasRestoredScrollRef.current = true;

    const animId = requestAnimationFrame(() => {
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
    });

    return () => cancelAnimationFrame(animId);
  }, [lastActivePoemId, savedScrollY]);

  // Filtered poems based on category, deferred search, and bookmarks
  const filteredPoems = useMemo(() => {
    const q = deferredSearchQuery.trim().toLowerCase();

    return poems.filter((poem) => {
      if (showBookmarksOnly && !bookmarkedSet.has(poem.id)) {
        return false;
      }

      if (!showBookmarksOnly && selectedCategory === 'all' && POET_CATEGORIES.has(poem.category)) {
        return false;
      }

      if (!showBookmarksOnly && selectedCategory !== 'all' && poem.category !== selectedCategory) {
        return false;
      }

      if (q !== '') {
        const indexed = searchIndexMap.get(poem.id) || '';
        return indexed.includes(q);
      }

      return true;
    });
  }, [poems, selectedCategory, showBookmarksOnly, bookmarkedSet, deferredSearchQuery, searchIndexMap]);

  // Slice for progressive rendering performance
  const visiblePoems = useMemo(() => {
    return filteredPoems.slice(0, displayCount);
  }, [filteredPoems, displayCount]);

  const handleSelectPoet = useCallback(
    (poet: PoetInfo) => {
      setSelectedCategory(poet.category);
      setShowBookmarksOnly(false);
      setViewMode('poems');
      setIsPoetsDrawerOpen(false);
      window.scrollTo({ top: 0, behavior: 'auto' });
    },
    [setSelectedCategory, setShowBookmarksOnly]
  );

  const handleToggleSound = useCallback(() => {
    const active = ambientSoundscape.toggle();
    setIsPlayingAudio(active);
  }, []);

  // Determine active bottom nav tab
  const activeNavTab: BottomNavTab = showBookmarksOnly
    ? 'bookmarks'
    : isPoetsDrawerOpen
    ? 'poets'
    : isSettingsOpen
    ? 'settings'
    : viewMode === 'sections'
    ? 'library'
    : 'home';

  const handleBottomNavChange = useCallback(
    (tab: BottomNavTab) => {
      if (tab === 'home') {
        setViewMode('poems');
        setShowBookmarksOnly(false);
        setIsPoetsDrawerOpen(false);
        setIsSettingsOpen(false);
        window.scrollTo({ top: 0, behavior: 'auto' });
      } else if (tab === 'library') {
        setViewMode('sections');
        setShowBookmarksOnly(false);
        setIsPoetsDrawerOpen(false);
        setIsSettingsOpen(false);
        window.scrollTo({ top: 0, behavior: 'auto' });
      } else if (tab === 'poets') {
        setIsPoetsDrawerOpen(true);
        setIsSettingsOpen(false);
      } else if (tab === 'bookmarks') {
        const nextBookmarksState = !showBookmarksOnly;
        setShowBookmarksOnly(nextBookmarksState);
        if (nextBookmarksState) {
          setViewMode('poems');
        }
        setIsPoetsDrawerOpen(false);
        setIsSettingsOpen(false);
        window.scrollTo({ top: 0, behavior: 'auto' });
      } else if (tab === 'settings') {
        setIsPlayingAudio(ambientSoundscape.getIsPlaying());
        setIsSettingsOpen(true);
      }
    },
    [showBookmarksOnly, setShowBookmarksOnly]
  );

  const handleSelectCategoryFromSections = useCallback(
    (catId: PoemCategory) => {
      setSelectedCategory(catId);
      setViewMode('poems');
      window.scrollTo({ top: 0, behavior: 'auto' });
    },
    [setSelectedCategory]
  );

  return (
    <div
      id="library-screen-container"
      className={`min-h-screen w-full max-w-full ${activeTheme.appBg} ${activeTheme.textPrimary} pb-24 selection:bg-[#C5A35E]/30 select-none font-serif relative overflow-x-hidden transition-colors duration-200`}
    >
      {/* Side Poets Drawer */}
      <PoetsDrawer
        isOpen={isPoetsDrawerOpen}
        onClose={() => setIsPoetsDrawerOpen(false)}
        selectedCategory={selectedCategory}
        onSelectPoet={handleSelectPoet}
        theme={theme}
      />

      {/* Settings Modal */}
      <AnimatePresence>
        {isSettingsOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 font-serif select-none">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              onClick={() => setIsSettingsOpen(false)}
              className="fixed inset-0 bg-black/80"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 10 }}
              transition={{ duration: 0.16 }}
              className={`relative w-full max-w-md ${activeTheme.cardBg} border ${activeTheme.cardBorder} rounded-2xl shadow-2xl p-5 z-10 overflow-hidden transition-colors`}
            >
              {/* Header */}
              <div className={`flex items-center justify-between pb-3 mb-4 border-b ${activeTheme.divider}`}>
                <h3 className={`font-amiri text-xl font-bold ${activeTheme.textPrimary} flex items-center gap-2`}>
                  <Palette size={18} className={activeTheme.accent} />
                  <span>إعدادات العرض والألوان</span>
                </h3>
                <button
                  onClick={() => setIsSettingsOpen(false)}
                  className={`p-1 rounded-full ${activeTheme.textSecondary} ${activeTheme.textPrimaryHover} ${activeTheme.cardActiveHoverBg} transition-colors cursor-pointer`}
                >
                  <X size={18} />
                </button>
              </div>

              {/* Themes Selector */}
              <div className="mb-5">
                <label className={`block text-xs ${activeTheme.textSecondary} font-amiri mb-2`}>سمة الواجهة والألوان:</label>
                <div className="grid grid-cols-2 gap-2">
                  {(['midnight', 'parchment', 'slate', 'emerald'] as BookTheme[]).map((tKey) => {
                    const t = THEMES[tKey];
                    const isSelected = theme === tKey;
                    return (
                      <button
                        key={tKey}
                        onClick={() => onThemeChange && onThemeChange(tKey)}
                        className={`p-2.5 rounded-xl border text-xs font-amiri font-bold flex items-center justify-between transition-colors cursor-pointer ${
                          isSelected
                            ? `${activeTheme.cardActiveBg} ${activeTheme.accentBorder} ${activeTheme.accent} shadow-sm`
                            : `${activeTheme.cardBg} ${activeTheme.cardBorder} ${activeTheme.textSecondary} ${activeTheme.cardHoverBorder} ${activeTheme.textPrimaryHover}`
                        }`}
                      >
                        <span>{t.name}</span>
                        {isSelected && <span className={activeTheme.accent}>✓</span>}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Soundscape Control */}
              <div className={`flex items-center justify-between p-3 rounded-xl ${activeTheme.cardActiveBg} border ${activeTheme.cardBorder} mb-5`}>
                <div className="flex items-center gap-2.5">
                  {isPlayingAudio ? (
                    <Volume2 size={18} className={activeTheme.accent} />
                  ) : (
                    <VolumeX size={18} className={activeTheme.textSecondary} />
                  )}
                  <div>
                    <h4 className={`text-sm font-amiri font-bold ${activeTheme.textPrimary}`}>الموسيقى الأندلسية المحيطية</h4>
                    <p className={`text-[11px] ${activeTheme.textSecondary}`}>نغمات هادئة تُصاحب قراءة القصائد</p>
                  </div>
                </div>
                <button
                  onClick={handleToggleSound}
                  className={`px-3 py-1 rounded-full text-xs font-amiri font-bold transition-colors cursor-pointer ${
                    isPlayingAudio
                      ? `${activeTheme.isLight ? 'bg-[#855e1e] text-[#faf6ef]' : 'bg-[#C5A35E] text-[#09090B]'}`
                      : `border ${activeTheme.cardBorder} ${activeTheme.textSecondary} ${activeTheme.textPrimaryHover}`
                  }`}
                >
                  {isPlayingAudio ? 'إيقاف' : 'تشغيل'}
                </button>
              </div>

              {/* Info about Diwan */}
              <div className={`p-3 rounded-xl ${activeTheme.cardActiveBg} border ${activeTheme.cardBorder} text-xs ${activeTheme.textSecondary} leading-relaxed font-serif`}>
                <div className={`flex items-center gap-1.5 ${activeTheme.accent} font-bold font-amiri mb-1`}>
                  <Info size={13} />
                  <span>عن ديوان غزالتي</span>
                </div>
                منصة شعرية وأدبية عربية فاخرة، بإشراف إبراهيم، تضم نصوصاً وقصائد في العشق والجمال والتأمل.
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 1. Header (Compact, fast sticky bar) */}
      <header className={`sticky top-0 z-30 ${activeTheme.headerBg} border-b ${activeTheme.headerBorder} px-4 py-3 transition-colors duration-200`}>
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          {/* Left: Hamburger menu */}
          <button
            id="open-side-menu-btn"
            aria-label="القائمة الجانبية"
            onClick={() => setIsPoetsDrawerOpen(true)}
            className={`w-9 h-9 rounded-xl flex items-center justify-center ${activeTheme.textPrimary} ${activeTheme.accentHover} ${activeTheme.cardActiveHoverBg} transition-colors cursor-pointer`}
          >
            <Menu size={22} className="stroke-[2.2]" />
          </button>

          {/* Center: Title & Subtitle */}
          <div className="flex flex-col items-center text-center">
            <h1 className={`font-amiri text-xl sm:text-2xl font-bold ${activeTheme.textPrimary} tracking-wide flex items-center gap-1.5`}>
              <span className={activeTheme.accent}>«</span>
              <span>ديوان غزالتي</span>
              <span className={activeTheme.accent}>»</span>
            </h1>
            <p className={`text-[11.5px] sm:text-xs ${activeTheme.textSecondary} font-serif mt-0.5 tracking-normal`}>
              {viewMode === 'sections' ? 'المكتبة • اختيار الخانات والأقسام' : 'الرئيسية • واجهة نصوص وقصائد الديوان'}
            </p>
          </div>

          {/* Right: Circular Ghazala Emblem */}
          <button
            onClick={onBackToCover}
            title="العودة إلى الغلاف الرئيسي"
            className="cursor-pointer transition-transform hover:scale-105 active:scale-95"
          >
            <GhazalaHeaderEmblem size={36} theme={theme} />
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-4xl mx-auto w-full pt-3">
        {viewMode === 'sections' ? (
          <div>
            <SectionsView
              onSelectCategory={handleSelectCategoryFromSections}
              selectedCategory={selectedCategory}
              categoryCounts={categoryCounts}
              theme={theme}
            />
          </div>
        ) : (
          <div>
            {/* 2. Search Bar */}
            <div className="px-4 pb-3">
              <div className={`relative w-full ${activeTheme.inputBg} border ${activeTheme.inputBorder} ${activeTheme.accentFocusWithinBorder} rounded-full px-4 py-2.5 flex items-center gap-2.5 transition-colors shadow-sm`}>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="ابحث في عناوين ونصوص الديوان والقصائد..."
                  className={`w-full bg-transparent ${activeTheme.textPrimary} ${activeTheme.placeholderText} text-[13px] sm:text-sm font-serif focus:outline-none text-right`}
                  dir="rtl"
                />

                {searchQuery ? (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    className={`${activeTheme.textSecondary} ${activeTheme.textPrimaryHover} p-0.5 cursor-pointer`}
                    title="مسح البحث"
                  >
                    <X size={16} />
                  </button>
                ) : null}

                <Search size={18} className={`${activeTheme.accent} shrink-0`} />
              </div>
            </div>

            {/* 3. Categories Filter Bar */}
            <div className="px-4 pb-3">
              <div className="flex items-center gap-2 overflow-x-auto no-scrollbar flex-nowrap py-1">
                {CATEGORIES.map((cat) => {
                  const isActive = !showBookmarksOnly && selectedCategory === cat.id;
                  const Icon = cat.icon;

                  return (
                    <button
                      key={cat.id}
                      onClick={() => {
                        setShowBookmarksOnly(false);
                        setSelectedCategory(cat.id);
                      }}
                      className={`rounded-full px-3.5 py-1.5 text-xs font-serif shrink-0 flex items-center gap-1.5 transition-colors duration-150 cursor-pointer ${
                        isActive
                          ? `${activeTheme.cardActiveBg} border ${activeTheme.accentBorder} ${activeTheme.textPrimary} font-bold shadow-sm`
                          : `${activeTheme.cardBg} border ${activeTheme.cardBorder} ${activeTheme.textSecondary} ${activeTheme.textPrimaryHover} ${activeTheme.cardHoverBorder}`
                      }`}
                    >
                      <Icon
                        size={13}
                        className={`shrink-0 ${isActive ? activeTheme.accent : activeTheme.textSecondary}`}
                      />
                      <span>{cat.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Active Filter Info Banner */}
            {showBookmarksOnly && (
              <div className="px-4 pb-3 flex items-center justify-between">
                <div className={`flex items-center gap-2 text-xs ${activeTheme.accent} font-amiri font-bold`}>
                  <Bookmark size={14} className="fill-current" />
                  <span>المحفوظات ({toEasternArabicNumerals(filteredPoems.length)} قصيدة)</span>
                </div>
                <button
                  onClick={() => setShowBookmarksOnly(false)}
                  className={`text-xs ${activeTheme.textSecondary} ${activeTheme.textPrimaryHover} font-serif underline cursor-pointer`}
                >
                  عرض جميع النصوص
                </button>
              </div>
            )}

            {/* Active Poet Banner */}
            {!showBookmarksOnly && POET_CATEGORIES.has(selectedCategory) && (
              <div className="px-4 pb-3 flex items-center justify-between">
                <div className={`flex items-center gap-2 text-xs ${activeTheme.accent} font-amiri font-bold`}>
                  <Feather size={14} />
                  <span>ديوان الشاعر المختار ({toEasternArabicNumerals(filteredPoems.length)} قصيدة)</span>
                </div>
                <button
                  onClick={() => setSelectedCategory('all')}
                  className={`text-xs ${activeTheme.textSecondary} ${activeTheme.textPrimaryHover} font-serif underline cursor-pointer`}
                >
                  العودة لنصوص ديوان غزالتي
                </button>
              </div>
            )}

            {/* 4. Poem Cards List */}
            <div className="px-4 space-y-3 sm:space-y-3.5">
              {filteredPoems.length > 0 ? (
                visiblePoems.map((poem) => (
                  <PoemCompactCard
                    key={poem.id}
                    poem={poem}
                    isBookmarked={bookmarkedSet.has(poem.id)}
                    onSelect={onSelectPoem}
                    onToggleBookmark={onToggleBookmark}
                    theme={theme}
                  />
                ))
              ) : (
                <div className={`py-16 text-center flex flex-col items-center justify-center ${activeTheme.cardBg} border ${activeTheme.cardBorder} rounded-2xl p-6 my-4`}>
                  <div className={`w-12 h-12 rounded-full ${activeTheme.cardActiveBg} border ${activeTheme.cardBorder} flex items-center justify-center ${activeTheme.accent} mb-3`}>
                    <Search size={20} />
                  </div>
                  <h3 className={`font-amiri text-lg font-bold ${activeTheme.textPrimary} mb-1`}>
                    لم يتم العثور على أي نصوص
                  </h3>
                  <p className={`text-xs ${activeTheme.textSecondary} font-serif max-w-xs mb-4`}>
                    {showBookmarksOnly
                      ? 'لم تقم بحفظ أي قصائد بعد. انقر على علامة المرجعية لحفظ نصوصك المفضلة.'
                      : 'جرب البحث بكلمات أخرى أو اختر تصنيفاً مختلفاً.'}
                  </p>
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedCategory('all');
                      setShowBookmarksOnly(false);
                    }}
                    className={`px-4 py-2 rounded-full ${activeTheme.cardActiveBg} border ${activeTheme.accentBorder} text-xs font-amiri font-bold ${activeTheme.accent} hover:opacity-90 transition-opacity cursor-pointer`}
                  >
                    عرض جميع نصوص الديوان
                  </button>
                </div>
              )}

              {/* Load More Button */}
              {filteredPoems.length > visiblePoems.length && (
                <div className="pt-2 pb-6 flex items-center justify-center">
                  <button
                    onClick={() => setDisplayCount((prev) => prev + PAGE_BATCH_SIZE)}
                    className={`px-6 py-2.5 rounded-full ${activeTheme.cardBg} border ${activeTheme.cardBorder} ${activeTheme.cardHoverBorder} text-xs font-amiri font-bold ${activeTheme.accent} transition-colors cursor-pointer shadow-sm`}
                  >
                    عرض المزيد من القصائد ({toEasternArabicNumerals(filteredPoems.length - visiblePoems.length)} متبقية)
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </main>

      {/* 5. Fixed Bottom Navigation Bar */}
      <BottomNavBar
        activeTab={activeNavTab}
        onTabChange={handleBottomNavChange}
        bookmarksCount={bookmarkedIds.length}
        theme={theme}
      />
    </div>
  );
}
