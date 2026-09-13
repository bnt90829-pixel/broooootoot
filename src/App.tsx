/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef, MouseEvent, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { POEMS } from './data/poems';
import { Poem, PoemCategory, ViewState, BookTheme, BookFont } from './types';
import { THEMES } from './utils/theme';
import { CoverScreen } from './components/CoverScreen';
import { LibraryScreen } from './components/LibraryScreen';
import { ReaderScreen } from './components/ReaderScreen';

const BOOKMARKS_STORAGE_KEY = 'efrahim_bookmarked_poems_v1';
const LAST_VIEW_KEY = 'efrahim_last_view_state_v1';
const LAST_CATEGORY_KEY = 'efrahim_last_category_state_v1';
const READER_THEME_STORAGE_KEY = 'efrahim_reader_theme_v1';
const READER_FONT_STORAGE_KEY = 'efrahim_reader_font_v1';
const READER_FONT_SIZE_STORAGE_KEY = 'efrahim_reader_font_size_v1';

export default function App() {
  // Parse initial state from hash or session
  const getInitialState = (): { view: ViewState; poemId: string; category: PoemCategory } => {
    try {
      const hash = window.location.hash;
      const savedCat = (sessionStorage.getItem(LAST_CATEGORY_KEY) as PoemCategory) || 'all';

      if (hash.startsWith('#poem-')) {
        const id = hash.replace('#poem-', '');
        const exists = POEMS.find((p) => p.id === id);
        if (exists) {
          return { view: 'reader', poemId: id, category: (exists.category as PoemCategory) || savedCat };
        }
      }
      if (hash.startsWith('#library')) {
        const rawCat = hash.replace('#library-', '').replace('#library', '');
        const validCategory: PoemCategory =
          rawCat.length > 0 ? (rawCat as PoemCategory) : savedCat;
        return { view: 'library', poemId: POEMS[0]?.id || 'ghazal-1', category: validCategory };
      }
      const savedView = sessionStorage.getItem(LAST_VIEW_KEY);
      if (savedView === 'library') {
        return { view: 'library', poemId: POEMS[0]?.id || 'ghazal-1', category: savedCat };
      }
    } catch {
      // Ignore
    }
    return { view: 'cover', poemId: POEMS[0]?.id || 'ghazal-1', category: 'all' };
  };

  const initial = getInitialState();
  const [view, setView] = useState<ViewState>(initial.view);
  const [activePoemId, setActivePoemId] = useState<string>(initial.poemId);
  const [selectedCategory, setSelectedCategory] = useState<PoemCategory>(initial.category);
  const [searchQuery, setSearchQuery] = useState('');
  const [showBookmarksOnly, setShowBookmarksOnly] = useState(false);

  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(BOOKMARKS_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Persistent Reader Customization Settings
  const [readerTheme, setReaderTheme] = useState<BookTheme>(() => {
    try {
      const saved = localStorage.getItem(READER_THEME_STORAGE_KEY);
      if (saved && ['midnight', 'parchment', 'slate', 'emerald'].includes(saved)) {
        return saved as BookTheme;
      }
    } catch {}
    return 'midnight';
  });

  const [readerFont, setReaderFont] = useState<BookFont>(() => {
    try {
      const saved = localStorage.getItem(READER_FONT_STORAGE_KEY);
      if (saved && ['amiri', 'ruqaa', 'scheherazade', 'naskh', 'serif-ar'].includes(saved)) {
        return saved as BookFont;
      }
    } catch {}
    return 'amiri';
  });

  const [readerFontSizeIndex, setReaderFontSizeIndex] = useState<number>(() => {
    try {
      const saved = localStorage.getItem(READER_FONT_SIZE_STORAGE_KEY);
      if (saved !== null) {
        const parsed = parseInt(saved, 10);
        if (!isNaN(parsed) && parsed >= 0 && parsed <= 4) {
          return parsed;
        }
      }
    } catch {}
    return 2;
  });

  const handleReaderThemeChange = useCallback((newTheme: BookTheme) => {
    setReaderTheme(newTheme);
    try {
      localStorage.setItem(READER_THEME_STORAGE_KEY, newTheme);
    } catch {}
  }, []);

  const handleReaderFontChange = useCallback((newFont: BookFont) => {
    setReaderFont(newFont);
    try {
      localStorage.setItem(READER_FONT_STORAGE_KEY, newFont);
    } catch {}
  }, []);

  const handleReaderFontSizeIndexChange = useCallback((updater: number | ((prev: number) => number)) => {
    setReaderFontSizeIndex((prev) => {
      const next = typeof updater === 'function' ? updater(prev) : updater;
      const clamped = Math.max(0, Math.min(4, next));
      try {
        localStorage.setItem(READER_FONT_SIZE_STORAGE_KEY, clamped.toString());
      } catch {}
      return clamped;
    });
  }, []);

  // Save bookmarks
  const handleToggleBookmark = (id: string, e?: MouseEvent) => {
    if (e) e.stopPropagation();
    setBookmarkedIds((prev) => {
      const updated = prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id];
      try {
        localStorage.setItem(BOOKMARKS_STORAGE_KEY, JSON.stringify(updated));
      } catch {
        // Ignore
      }
      return updated;
    });
  };

  // Synchronize browser history and hash
  useEffect(() => {
    try {
      sessionStorage.setItem(LAST_VIEW_KEY, view);
      sessionStorage.setItem(LAST_CATEGORY_KEY, selectedCategory);
    } catch {
      // Ignore
    }
  }, [view, selectedCategory]);

  // Handle browser back and forward gestures (popstate)
  useEffect(() => {
    const handlePopState = (event: PopStateEvent) => {
      const state = event.state;
      const hash = window.location.hash;

      if (state && state.view) {
        setView(state.view);
        if (state.category) {
          setSelectedCategory(state.category);
        }
        if (state.poemId) {
          setActivePoemId(state.poemId);
        }
      } else if (hash.startsWith('#poem-')) {
        const id = hash.replace('#poem-', '');
        const p = POEMS.find((item) => item.id === id);
        if (p) {
          setActivePoemId(id);
          setSelectedCategory(p.category as PoemCategory);
          setView('reader');
        } else {
          setView('library');
        }
      } else if (hash.startsWith('#library')) {
        const rawCat = hash.replace('#library-', '').replace('#library', '');
        if (rawCat.length > 0) {
          setSelectedCategory(rawCat as PoemCategory);
        }
        setView('library');
      } else if (hash === '#cover') {
        setView('cover');
      } else {
        // Safe default: return to library with current category rather than cover
        setView('library');
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const savedScrollYRef = useRef<number>(0);

  // Category-scoped active poems list for smooth browsing inside poets
  const activePoemsList = useMemo(() => {
    if (selectedCategory === 'sultan') {
      return POEMS.filter((p) => p.category === 'sultan');
    }
    if (selectedCategory === 'heyam') {
      return POEMS.filter((p) => p.category === 'heyam');
    }
    if (selectedCategory === 'salim') {
      return POEMS.filter((p) => p.category === 'salim');
    }
    if (selectedCategory === 'yaqeen') {
      return POEMS.filter((p) => p.category === 'yaqeen');
    }
    if (selectedCategory === 'saad') {
      return POEMS.filter((p) => p.category === 'saad');
    }
    if (selectedCategory !== 'all') {
      return POEMS.filter((p) => p.category === selectedCategory);
    }
    return POEMS.filter(
      (p) =>
        p.category !== 'heyam' &&
        p.category !== 'sultan' &&
        p.category !== 'salim' &&
        p.category !== 'yaqeen' &&
        p.category !== 'saad'
    );
  }, [selectedCategory]);

  const activePoemIndexInList = activePoemsList.findIndex((p) => p.id === activePoemId);
  const currentPoem =
    activePoemIndexInList !== -1
      ? activePoemsList[activePoemIndexInList]
      : POEMS.find((p) => p.id === activePoemId) || POEMS[0];

  const hasNextInList = activePoemIndexInList < activePoemsList.length - 1;
  const hasPrevInList = activePoemIndexInList > 0;

  // Category setter that keeps history in sync
  const handleSelectCategory = useCallback((cat: PoemCategory) => {
    setSelectedCategory(cat);
    try {
      sessionStorage.setItem(LAST_CATEGORY_KEY, cat);
      window.history.pushState(
        { view: 'library', category: cat },
        '',
        cat === 'all' ? '#library' : `#library-${cat}`
      );
    } catch {
      // Ignore
    }
  }, []);

  // Navigation handlers
  const handleEnterLibrary = useCallback(() => {
    setView('library');
    try {
      window.history.pushState(
        { view: 'library', category: selectedCategory },
        '',
        selectedCategory === 'all' ? '#library' : `#library-${selectedCategory}`
      );
    } catch {
      window.location.hash = '#library';
    }
  }, [selectedCategory]);

  const handleBackToCover = useCallback(() => {
    setView('cover');
    try {
      window.history.pushState({ view: 'cover' }, '', '#cover');
    } catch {
      window.location.hash = '#cover';
    }
  }, []);

  const handleSelectPoem = useCallback(
    (poem: Poem) => {
      savedScrollYRef.current = window.scrollY || document.documentElement.scrollTop || 0;
      setActivePoemId(poem.id);
      if (
        poem.category &&
        (poem.category === 'limatha' ||
          poem.category === 'sultan' ||
          poem.category === 'heyam' ||
          poem.category === 'salim' ||
          poem.category === 'yaqeen' ||
          poem.category === 'saad')
      ) {
        setSelectedCategory(poem.category as PoemCategory);
      }
      setView('reader');
      window.scrollTo({ top: 0, behavior: 'auto' });
      try {
        window.history.pushState(
          { view: 'reader', poemId: poem.id, category: (poem.category as PoemCategory) || selectedCategory },
          '',
          `#poem-${poem.id}`
        );
      } catch {
        window.location.hash = `#poem-${poem.id}`;
      }
    },
    [selectedCategory]
  );

  const handleBackToLibrary = useCallback(() => {
    // If the poem belongs to a specific poet, ensure that poet's category remains active
    const targetCategory = currentPoem?.category || selectedCategory;
    setSelectedCategory(targetCategory);
    setView('library');
    try {
      window.history.pushState(
        { view: 'library', category: targetCategory },
        '',
        targetCategory === 'all' ? '#library' : `#library-${targetCategory}`
      );
    } catch {
      window.location.hash = targetCategory === 'all' ? '#library' : `#library-${targetCategory}`;
    }
  }, [currentPoem, selectedCategory]);

  const handleNextPoem = useCallback(() => {
    if (hasNextInList) {
      const nextPoem = activePoemsList[activePoemIndexInList + 1];
      setActivePoemId(nextPoem.id);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      try {
        window.history.replaceState(
          { view: 'reader', poemId: nextPoem.id, category: selectedCategory },
          '',
          `#poem-${nextPoem.id}`
        );
      } catch {
        window.location.hash = `#poem-${nextPoem.id}`;
      }
    }
  }, [hasNextInList, activePoemsList, activePoemIndexInList, selectedCategory]);

  const handlePrevPoem = useCallback(() => {
    if (hasPrevInList) {
      const prevPoem = activePoemsList[activePoemIndexInList - 1];
      setActivePoemId(prevPoem.id);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      try {
        window.history.replaceState(
          { view: 'reader', poemId: prevPoem.id, category: selectedCategory },
          '',
          `#poem-${prevPoem.id}`
        );
      } catch {
        window.location.hash = `#poem-${prevPoem.id}`;
      }
    }
  }, [hasPrevInList, activePoemsList, activePoemIndexInList, selectedCategory]);

  const handleRandomPoem = useCallback(() => {
    const list = activePoemsList.length > 0 ? activePoemsList : POEMS;
    const randomIndex = Math.floor(Math.random() * list.length);
    const randomPoem = list[randomIndex];
    setActivePoemId(randomPoem.id);
    setView('reader');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    try {
      window.history.pushState(
        { view: 'reader', poemId: randomPoem.id, category: randomPoem.category },
        '',
        `#poem-${randomPoem.id}`
      );
    } catch {
      window.location.hash = `#poem-${randomPoem.id}`;
    }
  }, [activePoemsList]);

  const currentTheme = THEMES[readerTheme] || THEMES.midnight;

  return (
    <div className={`min-h-screen w-full max-w-full ${currentTheme.appBg} ${currentTheme.textPrimary} font-naskh overflow-x-hidden transition-colors duration-500`}>
      <AnimatePresence mode="wait">
        {view === 'cover' && (
          <motion.div
            key="cover"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.4 }}
          >
            <CoverScreen
              onEnter={handleEnterLibrary}
              totalPoems={POEMS.length}
              theme={readerTheme}
            />
          </motion.div>
        )}

        {view === 'library' && (
          <motion.div
            key="library"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
          >
            <LibraryScreen
              poems={POEMS}
              onSelectPoem={handleSelectPoem}
              onBackToCover={handleBackToCover}
              bookmarkedIds={bookmarkedIds}
              onToggleBookmark={handleToggleBookmark}
              onRandomPoem={handleRandomPoem}
              selectedCategory={selectedCategory}
              onSelectCategory={handleSelectCategory}
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              showBookmarksOnly={showBookmarksOnly}
              onToggleBookmarksFilter={setShowBookmarksOnly}
              lastActivePoemId={activePoemId}
              savedScrollY={savedScrollYRef.current}
              theme={readerTheme}
              onThemeChange={handleReaderThemeChange}
            />
          </motion.div>
        )}

        {view === 'reader' && (
          <motion.div
            key={`reader-${currentPoem.id}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
          >
            <ReaderScreen
              poem={currentPoem}
              onBackToLibrary={handleBackToLibrary}
              onNextPoem={handleNextPoem}
              onPrevPoem={handlePrevPoem}
              hasNext={hasNextInList}
              hasPrev={hasPrevInList}
              currentIndex={activePoemIndexInList}
              totalPoemsCount={activePoemsList.length}
              isBookmarked={bookmarkedIds.includes(currentPoem.id)}
              onToggleBookmark={handleToggleBookmark}
              theme={readerTheme}
              onThemeChange={handleReaderThemeChange}
              font={readerFont}
              onFontChange={handleReaderFontChange}
              fontSizeIndex={readerFontSizeIndex}
              onFontSizeIndexChange={handleReaderFontSizeIndexChange}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
