/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef, MouseEvent, useCallback, useMemo } from 'react';
import { motion } from 'motion/react';
import { POEMS } from './data/poems';
import { Poem, PoemCategory, ViewState, BookTheme, BookFont } from './types';
import { THEMES } from './utils/theme';
import { CoverScreen } from './components/CoverScreen';
import { LibraryScreen } from './components/LibraryScreen';
import { ReaderScreen } from './components/ReaderScreen';
import { safeStorage } from './utils/safeStorage';

const BOOKMARKS_STORAGE_KEY = 'efrahim_bookmarked_poems_v1';
const LAST_VIEW_KEY = 'efrahim_last_view_state_v1';
const LAST_CATEGORY_KEY = 'efrahim_last_category_state_v1';
const READER_THEME_STORAGE_KEY = 'efrahim_reader_theme_v1';
const READER_FONT_STORAGE_KEY = 'efrahim_reader_font_v1';
const READER_FONT_SIZE_STORAGE_KEY = 'efrahim_reader_font_size_v1';

const POET_CATEGORIES = new Set(['heyam', 'sultan', 'salim', 'yaqeen', 'saad']);

// Pre-build O(1) poem lookup map once
const POEMS_BY_ID = new Map<string, Poem>(POEMS.map((p) => [p.id, p]));

// Safe history navigation that never triggers iframe reload
function safePushHistory(state: Record<string, unknown>, title: string, url: string) {
  try {
    if (window.history && typeof window.history.pushState === 'function') {
      window.history.pushState(state, title, url);
    }
  } catch {
    // Silently ignore in sandboxed or cross-origin iframes
  }
}

function safeReplaceHistory(state: Record<string, unknown>, title: string, url: string) {
  try {
    if (window.history && typeof window.history.replaceState === 'function') {
      window.history.replaceState(state, title, url);
    }
  } catch {
    // Silently ignore
  }
}

export default function App() {
  const getInitialState = (): { view: ViewState; poemId: string; category: PoemCategory } => {
    try {
      const hash = window.location.hash || '';
      const savedCat = (safeStorage.getSessionItem(LAST_CATEGORY_KEY) as PoemCategory) || 'all';

      if (hash.startsWith('#poem-')) {
        const id = hash.replace('#poem-', '');
        const exists = POEMS_BY_ID.get(id);
        if (exists) {
          return { view: 'reader', poemId: id, category: (exists.category as PoemCategory) || savedCat };
        }
      }
      if (hash.startsWith('#library')) {
        const rawCat = hash.replace('#library-', '').replace('#library', '');
        const validCategory: PoemCategory =
          rawCat.length > 0 ? (rawCat as PoemCategory) : savedCat;
        return { view: 'library', poemId: POEMS[0]?.id || 'makarah-1', category: validCategory };
      }
      const savedView = safeStorage.getSessionItem(LAST_VIEW_KEY);
      if (savedView === 'library') {
        return { view: 'library', poemId: POEMS[0]?.id || 'makarah-1', category: savedCat };
      }
    } catch {
      // Ignore
    }
    return { view: 'cover', poemId: POEMS[0]?.id || 'makarah-1', category: 'all' };
  };

  const initial = getInitialState();
  const [view, setView] = useState<ViewState>(initial.view);
  const [activePoemId, setActivePoemId] = useState<string>(initial.poemId);
  const [selectedCategory, setSelectedCategory] = useState<PoemCategory>(initial.category);
  const [searchQuery, setSearchQuery] = useState('');
  const [showBookmarksOnly, setShowBookmarksOnly] = useState(false);

  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>(() => {
    try {
      const saved = safeStorage.getItem(BOOKMARKS_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [readerTheme, setReaderTheme] = useState<BookTheme>(() => {
    try {
      const saved = safeStorage.getItem(READER_THEME_STORAGE_KEY);
      if (saved && ['midnight', 'parchment', 'slate', 'emerald'].includes(saved)) {
        return saved as BookTheme;
      }
    } catch {}
    return 'midnight';
  });

  const [readerFont, setReaderFont] = useState<BookFont>(() => {
    try {
      const saved = safeStorage.getItem(READER_FONT_STORAGE_KEY);
      if (saved && ['amiri', 'ruqaa', 'scheherazade', 'naskh', 'serif-ar'].includes(saved)) {
        return saved as BookFont;
      }
    } catch {}
    return 'amiri';
  });

  const [readerFontSizeIndex, setReaderFontSizeIndex] = useState<number>(() => {
    try {
      const saved = safeStorage.getItem(READER_FONT_SIZE_STORAGE_KEY);
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
    safeStorage.setItem(READER_THEME_STORAGE_KEY, newTheme);
  }, []);

  // Sync document body, HTML and meta theme-color with current theme
  useEffect(() => {
    const bgMap: Record<BookTheme, { bg: string; text: string }> = {
      midnight: { bg: '#09090B', text: '#F1EDE6' },
      parchment: { bg: '#f0eae1', text: '#2b2621' },
      slate: { bg: '#0f131a', text: '#eef2f7' },
      emerald: { bg: '#08120d', text: '#f0f7f3' },
    };
    const current = bgMap[readerTheme] || bgMap.midnight;
    document.documentElement.style.backgroundColor = current.bg;
    document.documentElement.style.color = current.text;
    document.body.style.backgroundColor = current.bg;
    document.body.style.color = current.text;
    const rootEl = document.getElementById('root');
    if (rootEl) {
      rootEl.style.backgroundColor = current.bg;
      rootEl.style.color = current.text;
    }
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor) {
      metaThemeColor.setAttribute('content', current.bg);
    }
  }, [readerTheme]);

  const handleReaderFontChange = useCallback((newFont: BookFont) => {
    setReaderFont(newFont);
    safeStorage.setItem(READER_FONT_STORAGE_KEY, newFont);
  }, []);

  const handleReaderFontSizeIndexChange = useCallback((updater: number | ((prev: number) => number)) => {
    setReaderFontSizeIndex((prev) => {
      const next = typeof updater === 'function' ? updater(prev) : updater;
      const clamped = Math.max(0, Math.min(4, next));
      safeStorage.setItem(READER_FONT_SIZE_STORAGE_KEY, clamped.toString());
      return clamped;
    });
  }, []);

  const handleToggleBookmark = useCallback((id: string, e?: MouseEvent) => {
    if (e) e.stopPropagation();
    setBookmarkedIds((prev) => {
      const updated = prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id];
      try {
        safeStorage.setItem(BOOKMARKS_STORAGE_KEY, JSON.stringify(updated));
      } catch {
        // Ignore
      }
      return updated;
    });
  }, []);

  useEffect(() => {
    safeStorage.setSessionItem(LAST_VIEW_KEY, view);
    safeStorage.setSessionItem(LAST_CATEGORY_KEY, selectedCategory);
  }, [view, selectedCategory]);

  // Handle browser back and forward gestures (popstate) safely
  useEffect(() => {
    const handlePopState = (event: PopStateEvent) => {
      try {
        const state = event.state;
        const hash = window.location.hash || '';

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
          const p = POEMS_BY_ID.get(id);
          if (p) {
            setActivePoemId(id);
            if (p.category) {
              setSelectedCategory(p.category as PoemCategory);
            }
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
        }
      } catch (err) {
        console.error('Error handling popstate:', err);
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const savedScrollYRef = useRef<number>(0);

  // Category-scoped active poems list
  const activePoemsList = useMemo(() => {
    if (selectedCategory && selectedCategory !== 'all') {
      const filtered = POEMS.filter((p) => p.category === selectedCategory);
      if (filtered.length > 0) return filtered;
    }
    return POEMS.filter((p) => !POET_CATEGORIES.has(p.category));
  }, [selectedCategory]);

  const activePoemIndexInList = useMemo(
    () => activePoemsList.findIndex((p) => p.id === activePoemId),
    [activePoemsList, activePoemId]
  );

  const currentPoem: Poem = useMemo(() => {
    if (activePoemIndexInList !== -1 && activePoemsList[activePoemIndexInList]) {
      return activePoemsList[activePoemIndexInList];
    }
    const found = POEMS_BY_ID.get(activePoemId);
    if (found) return found;
    return activePoemsList[0] || POEMS[0];
  }, [activePoemIndexInList, activePoemsList, activePoemId]);

  const hasNextInList = activePoemIndexInList >= 0 && activePoemIndexInList < activePoemsList.length - 1;
  const hasPrevInList = activePoemIndexInList > 0 && activePoemIndexInList < activePoemsList.length;

  const handleSelectCategory = useCallback((cat: PoemCategory) => {
    setSelectedCategory(cat);
    safeStorage.setSessionItem(LAST_CATEGORY_KEY, cat);
    safePushHistory(
      { view: 'library', category: cat },
      '',
      cat === 'all' ? '#library' : `#library-${cat}`
    );
  }, []);

  const handleEnterLibrary = useCallback(() => {
    setView('library');
    window.scrollTo({ top: 0, behavior: 'auto' });
    safePushHistory(
      { view: 'library', category: selectedCategory },
      '',
      selectedCategory === 'all' ? '#library' : `#library-${selectedCategory}`
    );
  }, [selectedCategory]);

  const handleBackToCover = useCallback(() => {
    setView('cover');
    window.scrollTo({ top: 0, behavior: 'auto' });
    safePushHistory({ view: 'cover' }, '', '#cover');
  }, []);

  const handleSelectPoem = useCallback(
    (poem: Poem) => {
      if (!poem) return;
      savedScrollYRef.current = window.scrollY || document.documentElement.scrollTop || 0;
      setActivePoemId(poem.id);
      // Preserve 'all' browsing context unless poem belongs to an external poet collection
      const targetCategory: PoemCategory =
        selectedCategory === 'all' && !POET_CATEGORIES.has(poem.category)
          ? 'all'
          : ((poem.category as PoemCategory) || selectedCategory);
      if (targetCategory !== selectedCategory) {
        setSelectedCategory(targetCategory);
      }
      setView('reader');
      window.scrollTo({ top: 0, behavior: 'auto' });
      safePushHistory(
        { view: 'reader', poemId: poem.id, category: targetCategory },
        '',
        `#poem-${poem.id}`
      );
    },
    [selectedCategory]
  );

  const handleBackToLibrary = useCallback(() => {
    setView('library');
    safePushHistory(
      { view: 'library', category: selectedCategory },
      '',
      selectedCategory === 'all' ? '#library' : `#library-${selectedCategory}`
    );
  }, [selectedCategory]);

  const handleNextPoem = useCallback(() => {
    if (activePoemIndexInList >= 0 && activePoemIndexInList < activePoemsList.length - 1) {
      const nextPoem = activePoemsList[activePoemIndexInList + 1];
      if (!nextPoem) return;
      setActivePoemId(nextPoem.id);
      window.scrollTo({ top: 0, behavior: 'auto' });
      safeReplaceHistory(
        { view: 'reader', poemId: nextPoem.id, category: selectedCategory },
        '',
        `#poem-${nextPoem.id}`
      );
    }
  }, [activePoemsList, activePoemIndexInList, selectedCategory]);

  const handlePrevPoem = useCallback(() => {
    if (activePoemIndexInList > 0 && activePoemIndexInList < activePoemsList.length) {
      const prevPoem = activePoemsList[activePoemIndexInList - 1];
      if (!prevPoem) return;
      setActivePoemId(prevPoem.id);
      window.scrollTo({ top: 0, behavior: 'auto' });
      safeReplaceHistory(
        { view: 'reader', poemId: prevPoem.id, category: selectedCategory },
        '',
        `#poem-${prevPoem.id}`
      );
    }
  }, [activePoemsList, activePoemIndexInList, selectedCategory]);

  const handleRandomPoem = useCallback(() => {
    const list = activePoemsList.length > 0 ? activePoemsList : POEMS;
    const randomIndex = Math.floor(Math.random() * list.length);
    const randomPoem = list[randomIndex];
    if (!randomPoem) return;
    setActivePoemId(randomPoem.id);
    setView('reader');
    window.scrollTo({ top: 0, behavior: 'auto' });
    safePushHistory(
      { view: 'reader', poemId: randomPoem.id, category: selectedCategory },
      '',
      `#poem-${randomPoem.id}`
    );
  }, [activePoemsList, selectedCategory]);

  const currentTheme = THEMES[readerTheme] || THEMES.midnight;

  return (
    <div className={`min-h-screen w-full max-w-full ${currentTheme.appBg} ${currentTheme.textPrimary} font-naskh overflow-x-hidden transition-colors duration-200`}>
      {view === 'cover' && (
        <motion.div
          key="cover"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.16 }}
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
          transition={{ duration: 0.16 }}
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

      {view === 'reader' && currentPoem && (
        <motion.div
          key="reader"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.16 }}
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
    </div>
  );
}
