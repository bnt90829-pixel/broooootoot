import React from 'react';
import { Home, BookOpen, Feather, Bookmark, Settings } from 'lucide-react';
import { BookTheme } from '../types';
import { THEMES } from '../utils/theme';

export type BottomNavTab = 'home' | 'library' | 'poets' | 'bookmarks' | 'settings';

interface BottomNavBarProps {
  activeTab: BottomNavTab;
  onTabChange: (tab: BottomNavTab) => void;
  bookmarksCount?: number;
  theme?: BookTheme;
}

export function BottomNavBar({
  activeTab,
  onTabChange,
  bookmarksCount = 0,
  theme = 'midnight',
}: BottomNavBarProps) {
  const activeTheme = THEMES[theme] || THEMES.midnight;

  // Order: Settings (Left) -> Bookmarks -> Home (Center) -> Library (المكتبة) -> Poets (Right)
  const tabs = [
    { id: 'settings' as BottomNavTab, label: 'الإعدادات', icon: Settings },
    { id: 'bookmarks' as BottomNavTab, label: 'المحفوظات', icon: Bookmark, badge: bookmarksCount > 0 ? bookmarksCount : undefined },
    { id: 'home' as BottomNavTab, label: 'الرئيسية', icon: Home },
    { id: 'library' as BottomNavTab, label: 'المكتبة', icon: BookOpen },
    { id: 'poets' as BottomNavTab, label: 'الشعراء', icon: Feather },
  ];

  const getAccentColorHex = () => {
    if (activeTheme.id === 'parchment') return '#855e1e';
    if (activeTheme.id === 'slate' || activeTheme.id === 'emerald') return '#c5a059';
    return '#C5A35E';
  };

  const accentHex = getAccentColorHex();

  return (
    <nav
      id="bottom-navigation-bar"
      aria-label="شريط التنقل السفلي"
      className={`fixed bottom-0 left-0 right-0 z-40 ${activeTheme.headerBg} border-t ${activeTheme.divider} select-none transition-colors duration-200`}
      style={{ paddingBottom: 'max(env(safe-area-inset-bottom, 8px), 8px)' }}
    >
      <div className="max-w-md md:max-w-xl mx-auto flex items-center justify-around px-2 pt-2 pb-1">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          const Icon = tab.icon;

          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className="group relative flex flex-col items-center justify-center py-1 px-2.5 min-w-[56px] transition-colors cursor-pointer"
            >
              <div className="relative">
                <Icon
                  size={20}
                  className={`transition-colors duration-150 ${
                    isActive ? activeTheme.accent : `${activeTheme.textSecondary} ${activeTheme.textPrimaryGroupHover}`
                  }`}
                  strokeWidth={isActive ? 2.3 : 1.8}
                />
                {tab.badge !== undefined && (
                  <span
                    className={`absolute -top-1 -right-2 font-bold text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-mono shadow-sm ${
                      activeTheme.isLight ? 'bg-[#855e1e] text-[#fdfcf9]' : 'bg-[#C5A35E] text-[#09090B]'
                    }`}
                  >
                    {tab.badge > 99 ? '99+' : tab.badge}
                  </span>
                )}
              </div>

              <span
                className={`text-[11px] font-amiri font-bold mt-1 tracking-wide transition-colors duration-150 ${
                  isActive ? activeTheme.accent : `${activeTheme.textSecondary} ${activeTheme.textPrimaryGroupHover}`
                }`}
              >
                {tab.label}
              </span>

              {/* Theme-aware active indicator bar */}
              <div
                className={`h-0.5 rounded-full mt-1 transition-all duration-300 ${
                  isActive ? 'w-6 opacity-100' : 'w-0 opacity-0'
                }`}
                style={{
                  backgroundColor: isActive ? accentHex : 'transparent',
                  boxShadow: isActive ? `0 0 8px ${accentHex}88` : 'none',
                }}
              />
            </button>
          );
        })}
      </div>
    </nav>
  );
}
