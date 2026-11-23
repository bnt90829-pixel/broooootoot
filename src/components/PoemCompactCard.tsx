import { memo, MouseEvent } from 'react';
import { Bookmark, ChevronLeft, Feather, Heart, HelpCircle, CloudRain, Flame, BookOpen } from 'lucide-react';
import { Poem, BookTheme } from '../types';
import { toEasternArabicNumerals } from './LiteraryDecorations';
import { THEMES } from '../utils/theme';

interface PoemCompactCardProps {
  poem: Poem;
  isBookmarked: boolean;
  onSelect: (poem: Poem) => void;
  onToggleBookmark: (id: string, e: MouseEvent) => void;
  theme?: BookTheme;
}

export const PoemCompactCard = memo(function PoemCompactCard({
  poem,
  isBookmarked,
  onSelect,
  onToggleBookmark,
  theme = 'midnight',
}: PoemCompactCardProps) {
  const activeTheme = THEMES[theme] || THEMES.midnight;

  const categoryLabel =
    poem.category === 'makarah'
      ? 'مكاره؟'
      : poem.category === 'ghazal'
      ? 'غزالاتي'
      : poem.category === 'limatha'
      ? 'لماذا؟'
      : poem.category === 'inkisar'
      ? 'الإنكسار'
      : poem.category === 'habr'
      ? 'حين يجرؤ الحبر'
      : poem.category === 'sultan'
      ? 'محمد سلطان'
      : poem.category === 'salim'
      ? 'سليم السلطان'
      : poem.category === 'yaqeen'
      ? 'يقين محمد'
      : poem.category === 'saad'
      ? 'سعد غدير'
      : poem.category === 'heyam'
      ? 'هيام محمد'
      : poem.categoryTitle || 'ديوان غزالتي';

  const CategoryIcon =
    poem.category === 'makarah'
      ? Feather
      : poem.category === 'ghazal'
      ? Heart
      : poem.category === 'limatha'
      ? HelpCircle
      : poem.category === 'inkisar'
      ? CloudRain
      : poem.category === 'habr'
      ? Flame
      : BookOpen;

  return (
    <article
      id={`poem-card-${poem.id}`}
      onClick={() => onSelect(poem)}
      className={`poem-card-virtual group relative w-full ${activeTheme.cardBg} border ${activeTheme.cardBorder} ${activeTheme.cardHoverBorder} ${activeTheme.cardHoverBg} rounded-xl sm:rounded-2xl p-3.5 sm:p-4.5 transition-colors duration-150 cursor-pointer select-none flex flex-col justify-between shadow-sm`}
    >
      {/* 1. Top Row: Category + Page Number (Right) | Bookmark (Left) */}
      <div className="flex items-center justify-between gap-2 mb-2">
        <div className={`flex items-center gap-1.5 text-xs ${activeTheme.textSecondary} font-serif`}>
          <CategoryIcon size={13} className={`${activeTheme.accent} shrink-0`} />
          <span>{categoryLabel}</span>
          <span className="opacity-40 select-none">•</span>
          <span>ص {toEasternArabicNumerals(poem.pageNumber || 1)}</span>
        </div>

        <button
          type="button"
          aria-label={isBookmarked ? 'إزالة من المحفوظات' : 'حفظ في المحفوظات'}
          onClick={(e) => onToggleBookmark(poem.id, e)}
          className={`p-1 -ml-1 ${activeTheme.textSecondary} ${activeTheme.accentHover} transition-colors cursor-pointer`}
        >
          <Bookmark
            size={18}
            className={isBookmarked ? `fill-current ${activeTheme.accent}` : `${activeTheme.textSecondary} ${activeTheme.accentHover}`}
          />
        </button>
      </div>

      {/* 2. Title Row */}
      <h3 className={`font-amiri text-xl sm:text-[22px] font-bold ${activeTheme.textPrimary} tracking-wide leading-snug mb-1.5 line-clamp-1 ${activeTheme.accentGroupHover} transition-colors text-right`}>
        «{poem.title}»
      </h3>

      {/* 3. Excerpt Row: 1 to 2 lines max with ellipsis */}
      <p className={`text-[13.5px] sm:text-[14.5px] ${activeTheme.textSecondary} line-clamp-2 leading-relaxed font-serif text-right mb-3`}>
        {poem.excerpt || poem.stanzas[0] || ''}
      </p>

      {/* 4. Bottom Row: Read Action (Right) | Arrow (Left) */}
      <div className={`flex items-center justify-between text-xs ${activeTheme.accent} font-amiri pt-2 border-t ${activeTheme.divider}`}>
        <div className={`flex items-center gap-1.5 ${activeTheme.accent}`}>
          <Feather size={12} className="shrink-0" />
          <span>طالع المخطوطة</span>
        </div>

        <ChevronLeft
          size={16}
          className={`${activeTheme.textSecondary} ${activeTheme.accentGroupHover} group-hover:-translate-x-1 transition-transform duration-150`}
        />
      </div>
    </article>
  );
});
