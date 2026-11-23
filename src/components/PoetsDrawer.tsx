import { motion, AnimatePresence } from 'motion/react';
import { X, Feather, Sparkles, User, PlusCircle, Check, ArrowLeft } from 'lucide-react';
import { POETS_LIST, PoetInfo } from '../data/poets';
import { PoemCategory, BookTheme } from '../types';
import { THEMES } from '../utils/theme';
import { toEasternArabicNumerals, AndalusianRosette } from './LiteraryDecorations';

interface PoetsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  selectedCategory: PoemCategory;
  onSelectPoet: (poet: PoetInfo) => void;
  theme?: BookTheme;
}

export function PoetsDrawer({
  isOpen,
  onClose,
  selectedCategory,
  onSelectPoet,
  theme = 'midnight',
}: PoetsDrawerProps) {
  const activeTheme = THEMES[theme] || THEMES.midnight;
  const availablePoets = POETS_LIST.filter((p) => p.isAvailable);
  const upcomingPoets = POETS_LIST.filter((p) => !p.isAvailable);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex justify-end font-serif select-none">
          {/* Dark overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.16 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/75"
          />

          {/* Drawer content sliding in */}
          <motion.aside
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className={`relative w-full max-w-md ${activeTheme.drawerBg} border-r sm:border-l ${activeTheme.drawerBorder} ${activeTheme.textPrimary} h-full shadow-2xl flex flex-col z-10 overflow-hidden transition-colors duration-200`}
          >
            {/* Antique decorative top border */}
            <div className="h-1 w-full bg-gradient-to-r from-transparent via-[#c5a059] to-transparent opacity-70" />

            {/* Header */}
            <div className={`p-5 sm:p-6 border-b ${activeTheme.divider} flex items-center justify-between ${activeTheme.cardBg}`}>
              <div className="flex items-center gap-3">
                <div className={`w-9 h-9 rounded-sm border ${activeTheme.accentBorder} ${activeTheme.accentBg} flex items-center justify-center ${activeTheme.accent} font-mono font-bold text-xl`}>
                  =
                </div>
                <div>
                  <h3 className={`font-amiri text-xl font-bold ${activeTheme.textPrimary} tracking-wide`}>
                    قائمة الشعراء والأدباء
                  </h3>
                  <p className={`text-[11px] ${activeTheme.textSecondary} font-mono tracking-wider`}>
                    فهرس الدواوين والمجموعات الشعرية
                  </p>
                </div>
              </div>

              <button
                id="close-poets-drawer-btn"
                onClick={onClose}
                className={`w-8 h-8 rounded-sm border ${activeTheme.cardBorder} flex items-center justify-center ${activeTheme.textSecondary} ${activeTheme.textPrimaryHover} ${activeTheme.cardHoverBorder} transition-colors cursor-pointer`}
                title="إغلاق القائمة"
              >
                <X size={16} />
              </button>
            </div>

            {/* List of poets & Upcoming spaces */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
              <div className={`text-[11px] font-mono uppercase tracking-[0.2em] ${activeTheme.accent} mb-2 flex items-center gap-1.5`}>
                <Feather size={13} />
                <span>الشعراء الحاليون بالديوان</span>
              </div>

              {/* Available Poets */}
              {availablePoets.map((poet) => {
                const isSelected =
                  poet.category === 'all'
                    ? selectedCategory !== 'heyam' &&
                      selectedCategory !== 'sultan' &&
                      selectedCategory !== 'salim' &&
                      selectedCategory !== 'yaqeen' &&
                      selectedCategory !== 'saad'
                    : selectedCategory === poet.category;

                return (
                  <div
                    key={poet.id}
                    id={`poet-item-${poet.id}`}
                    onClick={() => onSelectPoet(poet)}
                    className={`group relative p-4 rounded-sm border transition-colors duration-150 cursor-pointer ${
                      isSelected
                        ? `${activeTheme.cardActiveBg} border-[#c5a059] shadow-lg shadow-[#c5a059]/10`
                        : `${activeTheme.cardBg} ${activeTheme.cardBorder} ${activeTheme.cardHoverBorder} ${activeTheme.cardHoverBg}`
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-11 h-11 rounded-sm border flex items-center justify-center transition-colors ${
                            isSelected
                              ? 'border-[#c5a059] bg-[#c5a059] text-[#0a0a0c]'
                              : `${activeTheme.cardBorder} ${activeTheme.badgeBg} ${activeTheme.accent} group-hover:border-[#c5a059]`
                          }`}
                        >
                          <User size={20} />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className={`font-amiri text-lg font-bold ${activeTheme.textPrimary} ${activeTheme.accentGroupHover} transition-colors`}>
                              {poet.name}
                            </h4>
                            {isSelected && (
                              <span className="flex items-center gap-1 text-[10px] text-emerald-400 bg-emerald-950/40 border border-emerald-800/50 px-2 py-0.5 rounded-full font-mono">
                                <Check size={10} />
                                <span>مُحدد الآن</span>
                              </span>
                            )}
                          </div>
                          <span className={`text-xs ${activeTheme.accent} font-medium block`}>
                            {poet.title}
                          </span>
                        </div>
                      </div>

                      <span className={`text-[11px] font-amiri tracking-wider ${activeTheme.accent} px-2.5 py-0.5 rounded-sm ${activeTheme.badgeBg} border ${activeTheme.badgeBorder} shrink-0 font-bold flex items-center gap-1`}>
                        <AndalusianRosette size={9} color="currentColor" />
                        <span>{toEasternArabicNumerals(poet.poemsCount)} نصوص</span>
                      </span>
                    </div>

                    <p className={`text-xs ${activeTheme.textSecondary} mt-3 leading-relaxed border-t ${activeTheme.divider} pt-2.5 line-clamp-2`}>
                      {poet.description}
                    </p>

                    <div className={`mt-3 flex items-center justify-between text-[11px] ${activeTheme.accent} pt-1`}>
                      <span className="flex items-center gap-1 group-hover:underline">
                        <span>فتح ديوان {poet.name}</span>
                        <ArrowLeft size={13} className="transition-transform group-hover:-translate-x-1" />
                      </span>
                      <span className={`text-[10px] font-mono ${activeTheme.textMuted}`}>{poet.badge}</span>
                    </div>
                  </div>
                );
              })}

              {/* Separator / Divider for Upcoming Poets */}
              <div className={`pt-4 mt-6 border-t ${activeTheme.divider}`}>
                <div className={`text-[11px] font-mono uppercase tracking-[0.2em] ${activeTheme.accent} mb-3 flex items-center gap-1.5`}>
                  <Sparkles size={13} />
                  <span>مساحة الشعراء القادمين (قريباً)</span>
                </div>

                <div className="space-y-3">
                  {upcomingPoets.map((poet) => (
                    <div
                      key={poet.id}
                      className={`p-4 rounded-sm border border-dashed ${activeTheme.cardBorder} ${activeTheme.cardBg} opacity-80 hover:opacity-100 transition-opacity`}
                    >
                      <div className="flex items-center justify-between gap-3 mb-2">
                        <div className="flex items-center gap-2.5">
                          <div className={`w-8 h-8 rounded-sm border border-dashed ${activeTheme.cardBorder} ${activeTheme.badgeBg} flex items-center justify-center ${activeTheme.textSecondary}`}>
                            <PlusCircle size={15} />
                          </div>
                          <div>
                            <h5 className={`font-amiri text-base font-bold ${activeTheme.textPrimary}`}>
                              {poet.name}
                            </h5>
                            <span className={`text-[11px] ${activeTheme.textSecondary} block`}>
                              {poet.title}
                            </span>
                          </div>
                        </div>
                        <span className={`text-[10px] font-mono ${activeTheme.accent} ${activeTheme.accentBg} border ${activeTheme.accentBorder} px-2 py-0.5 rounded-sm`}>
                          قريباً
                        </span>
                      </div>
                      <p className={`text-[11px] ${activeTheme.textMuted} leading-relaxed`}>
                        {poet.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className={`p-4 ${activeTheme.drawerBg} border-t ${activeTheme.divider} text-center text-xs ${activeTheme.textSecondary} flex items-center justify-between`}>
              <span className={`font-mono text-[10px] ${activeTheme.accent}`}>
                موسوعة الشعر والأدب الرقمية
              </span>
              <span className="text-[11px]">مساحة مفتوحة للإضافة</span>
            </div>
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  );
}
