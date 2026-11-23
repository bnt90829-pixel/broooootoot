import {
  Feather,
  Heart,
  HelpCircle,
  CloudRain,
  Flame,
  ArrowLeft,
  Sparkles,
  Layers,
  BookOpen,
} from 'lucide-react';
import { PoemCategory, BookTheme } from '../types';
import { THEMES } from '../utils/theme';
import { toEasternArabicNumerals, AndalusianRosette } from './LiteraryDecorations';

export interface CategoryCardData {
  id: PoemCategory;
  name: string;
  subtitle: string;
  description: string;
  icon: typeof Feather;
  tag: string;
}

export const SECTIONS_LIST: CategoryCardData[] = [
  {
    id: 'makarah',
    name: 'مكاره؟',
    subtitle: 'ومضات الغزل ودهاء الأنثى',
    description: 'نصوص أدبية وقصائد تحاكي دهاء وحيلة وعذوبة الأنثى، ومواقف العشق والكبرياء.',
    icon: Feather,
    tag: 'نصوص غزلية',
  },
  {
    id: 'ghazal',
    name: 'غزالاتي',
    subtitle: 'قصائد العشق والجمال وسحر الغزال',
    description: 'همسات في العيون والأنوثة وحُسن الحبيبة، نبضات وارفة في الرقة والعاطفة.',
    icon: Heart,
    tag: 'ديوان غزل',
  },
  {
    id: 'limatha',
    name: 'لماذا؟',
    subtitle: 'تساؤلات القلب والحيرة والعتاب',
    description: 'بوح حائر وتأملات في الفراق والغياب ولواعج الأسئلة التي لا تنتهي.',
    icon: HelpCircle,
    tag: 'تساؤلات وعتاب',
  },
  {
    id: 'inkisar',
    name: 'الإنكسار',
    subtitle: 'شجون الوجع وبقايا المشاعر الصامتة',
    description: 'رسائل صامتة في لحظات الألم والوداع، وانكسار القلب برقي وهدوء.',
    icon: CloudRain,
    tag: 'وجدانيات حزينة',
  },
  {
    id: 'habr',
    name: 'حين يجرؤ الحبر',
    subtitle: 'جرأة القلم وشغف الحروف',
    description: 'نصوص متقدة تعبر عن ثورة الحبر وجرأة المشاعر بلا قيود ولا مواربة.',
    icon: Flame,
    tag: 'نصوص متقدة',
  },
];

interface SectionsViewProps {
  onSelectCategory: (categoryId: PoemCategory) => void;
  selectedCategory?: PoemCategory;
  categoryCounts: Record<string, number>;
  theme?: BookTheme;
}

export function SectionsView({
  onSelectCategory,
  selectedCategory,
  categoryCounts,
  theme = 'midnight',
}: SectionsViewProps) {
  const activeTheme = THEMES[theme] || THEMES.midnight;

  return (
    <div className="w-full space-y-4 px-4 py-2 select-none">
      {/* Intro Header */}
      <div className={`p-4 rounded-2xl ${activeTheme.cardBg} border ${activeTheme.cardBorder} flex items-center justify-between shadow-sm`}>
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-xl ${activeTheme.cardActiveBg} border ${activeTheme.accentBorder} flex items-center justify-center ${activeTheme.accent}`}>
            <Layers size={20} />
          </div>
          <div>
            <h2 className={`font-amiri text-lg sm:text-xl font-bold ${activeTheme.textPrimary}`}>
              أقسام وخانات الديوان
            </h2>
            <p className={`text-[12px] ${activeTheme.textSecondary} font-serif`}>
              اختر الخانة الأدبية التي ترغب في تصفح نصوصها وقصائدها
            </p>
          </div>
        </div>

        <span className={`text-xs ${activeTheme.accent} font-amiri font-bold flex items-center gap-1`}>
          <Sparkles size={13} />
          <span>{toEasternArabicNumerals(SECTIONS_LIST.length)} أقسام رئيسية</span>
        </span>
      </div>

      {/* "All Poems" Option Card */}
      <button
        type="button"
        onClick={() => onSelectCategory('all')}
        className={`group w-full p-4 rounded-2xl border text-right transition-all duration-150 active:scale-[0.99] cursor-pointer flex items-center justify-between ${
          selectedCategory === 'all'
            ? `${activeTheme.cardActiveBg} border-[#C5A35E] shadow-md shadow-[#C5A35E]/10`
            : `${activeTheme.cardBg} ${activeTheme.cardBorder} ${activeTheme.cardHoverBorder} ${activeTheme.cardHoverBg}`
        }`}
      >
        <div className="flex items-center gap-3.5">
          <div className={`w-11 h-11 rounded-xl ${activeTheme.badgeBg} border ${activeTheme.cardBorder} flex items-center justify-center ${activeTheme.accent} shrink-0`}>
            <BookOpen size={20} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className={`font-amiri text-lg font-bold ${activeTheme.textPrimary}`}>
                جميع قصائد ونصوص الديوان
              </h3>
              {selectedCategory === 'all' && (
                <span className="text-[10px] text-emerald-400 bg-emerald-950/40 border border-emerald-800/50 px-2 py-0.5 rounded-full font-mono">
                  معروض حالياً
                </span>
              )}
            </div>
            <p className={`text-xs ${activeTheme.textSecondary} font-serif mt-0.5`}>
              تصفح كامل للأشعار والنصوص مرتبة دون حصر في خانة محددة
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <span className={`text-xs font-amiri font-bold ${activeTheme.accent} px-2.5 py-1 rounded-full ${activeTheme.badgeBg} border ${activeTheme.cardBorder}`}>
            {toEasternArabicNumerals(categoryCounts['all'] || 0)} نصاً
          </span>
          <ArrowLeft size={16} className={`${activeTheme.textSecondary} ${activeTheme.accentGroupHover} transition-transform duration-150 group-hover:-translate-x-1`} />
        </div>
      </button>

      {/* Grid of Section Cards (User Chooses Where to Enter) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-1">
        {SECTIONS_LIST.map((section) => {
          const isCurrent = selectedCategory === section.id;
          const Icon = section.icon;
          const count = categoryCounts[section.id] || 0;

          return (
            <div
              key={section.id}
              onClick={() => onSelectCategory(section.id)}
              className={`group relative p-4.5 rounded-2xl border transition-all duration-150 active:scale-[0.99] cursor-pointer flex flex-col justify-between ${
                isCurrent
                  ? `${activeTheme.cardActiveBg} border-[#C5A35E] shadow-lg shadow-[#C5A35E]/10`
                  : `${activeTheme.cardBg} ${activeTheme.cardBorder} ${activeTheme.cardHoverBorder} ${activeTheme.cardHoverBg}`
              }`}
            >
              {/* Top Row: Icon + Tag & Count */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className={`w-11 h-11 rounded-xl ${activeTheme.badgeBg} border ${activeTheme.cardBorder} flex items-center justify-center ${activeTheme.accent} group-hover:scale-105 transition-transform duration-150`}>
                    <Icon size={20} />
                  </div>

                  <div className="flex items-center gap-2">
                    <span className={`text-[11px] font-amiri font-bold px-2 py-0.5 rounded-full ${activeTheme.cardActiveBg} ${activeTheme.textSecondary} border ${activeTheme.cardBorder}`}>
                      {section.tag}
                    </span>
                    <span className={`text-xs font-amiri font-bold ${activeTheme.accent} px-2.5 py-0.5 rounded-full ${activeTheme.badgeBg} border ${activeTheme.cardBorder}`}>
                      {toEasternArabicNumerals(count)} نصاً
                    </span>
                  </div>
                </div>

                {/* Section Title */}
                <div className="flex items-center gap-1.5 mb-1">
                  <h3 className={`font-amiri text-xl font-bold ${activeTheme.textPrimary} ${activeTheme.accentGroupHover} transition-colors`}>
                    «{section.name}»
                  </h3>
                  {isCurrent && (
                    <span className="text-[10px] text-emerald-400 bg-emerald-950/40 border border-emerald-800/50 px-2 py-0.5 rounded-full font-mono mr-1">
                      الخانة النشطة
                    </span>
                  )}
                </div>

                <p className={`text-xs ${activeTheme.accent} font-serif mb-2 font-medium`}>
                  {section.subtitle}
                </p>

                <p className={`text-xs ${activeTheme.textSecondary} font-serif leading-relaxed line-clamp-2`}>
                  {section.description}
                </p>
              </div>

              {/* Bottom Action Footer */}
              <div className={`mt-4 pt-3 border-t ${activeTheme.divider} flex items-center justify-between text-xs font-amiri font-bold ${activeTheme.accent}`}>
                <span className="flex items-center gap-1 group-hover:underline">
                  <AndalusianRosette size={9} color="currentColor" />
                  <span>دخول خانة {section.name}</span>
                </span>
                <ArrowLeft size={15} className="transition-transform duration-150 group-hover:-translate-x-1" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
