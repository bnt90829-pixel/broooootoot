import { BookTheme } from '../types';

export interface ThemeConfig {
  id: BookTheme;
  name: string;
  isLight: boolean;
  appBg: string;
  headerBg: string;
  headerBorder: string;
  cardBg: string;
  cardBorder: string;
  cardHoverBorder: string;
  cardHoverBg: string;
  cardActiveBg: string;
  cardActiveHoverBg: string;
  textPrimary: string;
  textPrimaryHover: string;
  textPrimaryGroupHover: string;
  textSecondary: string;
  textMuted: string;
  placeholderText: string;
  accent: string;
  accentHover: string;
  accentGroupHover: string;
  accentBg: string;
  accentBorder: string;
  accentFocusWithinBorder: string;
  divider: string;
  inputBg: string;
  inputBorder: string;
  pageBg: string;
  pageBorder: string;
  spineShadow: string;
  ambientColor: string;
  drawerBg: string;
  drawerBorder: string;
  badgeBg: string;
  badgeBorder: string;
}

export const THEMES: Record<BookTheme, ThemeConfig> = {
  midnight: {
    id: 'midnight',
    name: 'سواد ديوان غزالتي المذهب',
    isLight: false,
    appBg: 'bg-[#09090B]',
    headerBg: 'bg-[#09090B]/95',
    headerBorder: 'border-[#2A292D]',
    cardBg: 'bg-[#111114]',
    cardBorder: 'border-[#2A292D]',
    cardHoverBorder: 'hover:border-[#C5A35E]',
    cardHoverBg: 'hover:bg-[#151518]',
    cardActiveBg: 'bg-[#171619]',
    cardActiveHoverBg: 'hover:bg-[#171619]',
    textPrimary: 'text-[#F1EDE6]',
    textPrimaryHover: 'hover:text-[#F1EDE6]',
    textPrimaryGroupHover: 'group-hover:text-[#F1EDE6]',
    textSecondary: 'text-[#AAA6A3]',
    textMuted: 'text-[#7A7672]',
    placeholderText: 'placeholder:text-[#7A7672]',
    accent: 'text-[#C5A35E]',
    accentHover: 'hover:text-[#C5A35E]',
    accentGroupHover: 'group-hover:text-[#C5A35E]',
    accentBg: 'bg-[#C5A35E]/15',
    accentBorder: 'border-[#C5A35E]',
    accentFocusWithinBorder: 'focus-within:border-[#C5A35E]',
    divider: 'border-[#29282C]',
    inputBg: 'bg-[#111114]',
    inputBorder: 'border-[#2A292D]',
    pageBg: 'bg-[#09090B]',
    pageBorder: 'border-[#2A292D]',
    spineShadow: 'shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)]',
    ambientColor: 'rgba(197, 163, 94, 0.08)',
    drawerBg: 'bg-[#111114]',
    drawerBorder: 'border-[#2A292D]',
    badgeBg: 'bg-[#171619]',
    badgeBorder: 'border-[#2A292D]',
  },
  parchment: {
    id: 'parchment',
    name: 'مخطوطة عاجية أندلسية',
    isLight: true,
    appBg: 'bg-[#f0eae1]',
    headerBg: 'bg-[#f3ede3]/95',
    headerBorder: 'border-[#ded4c3]',
    cardBg: 'bg-[#faf6ef]',
    cardBorder: 'border-[#dfd6c6]',
    cardHoverBorder: 'hover:border-[#966b26]/70',
    cardHoverBg: 'hover:bg-[#f5ede0]',
    cardActiveBg: 'bg-[#efe6d8]',
    cardActiveHoverBg: 'hover:bg-[#efe6d8]',
    textPrimary: 'text-[#2b2621]',
    textPrimaryHover: 'hover:text-[#2b2621]',
    textPrimaryGroupHover: 'group-hover:text-[#2b2621]',
    textSecondary: 'text-[#6b6055]',
    textMuted: 'text-[#8a7f74]',
    placeholderText: 'placeholder:text-[#8a7f74]',
    accent: 'text-[#855e1e]',
    accentHover: 'hover:text-[#855e1e]',
    accentGroupHover: 'group-hover:text-[#855e1e]',
    accentBg: 'bg-[#855e1e]/10',
    accentBorder: 'border-[#855e1e]/40',
    accentFocusWithinBorder: 'focus-within:border-[#855e1e]/40',
    divider: 'border-[#ded4c3]',
    inputBg: 'bg-[#faf6ef]',
    inputBorder: 'border-[#ded4c3]',
    pageBg: 'bg-[#fdfcf9]',
    pageBorder: 'border-[#dcd1be]',
    spineShadow: 'shadow-[0_20px_50px_-10px_rgba(90,75,60,0.18)]',
    ambientColor: 'rgba(133, 94, 30, 0.06)',
    drawerBg: 'bg-[#f5eee4]',
    drawerBorder: 'border-[#dcd1be]',
    badgeBg: 'bg-[#ede3d3]',
    badgeBorder: 'border-[#cbbeaa]',
  },
  slate: {
    id: 'slate',
    name: 'رخام إشبيلية',
    isLight: false,
    appBg: 'bg-[#0f131a]',
    headerBg: 'bg-[#0f131a]/95',
    headerBorder: 'border-[#222b3a]',
    cardBg: 'bg-[#161c27]',
    cardBorder: 'border-[#253042]',
    cardHoverBorder: 'hover:border-[#c5a059]/60',
    cardHoverBg: 'hover:bg-[#1a2333]',
    cardActiveBg: 'bg-[#1d2739]',
    cardActiveHoverBg: 'hover:bg-[#1d2739]',
    textPrimary: 'text-[#eef2f7]',
    textPrimaryHover: 'hover:text-[#eef2f7]',
    textPrimaryGroupHover: 'group-hover:text-[#eef2f7]',
    textSecondary: 'text-[#8e9cb0]',
    textMuted: 'text-[#5f6e82]',
    placeholderText: 'placeholder:text-[#5f6e82]',
    accent: 'text-[#c5a059]',
    accentHover: 'hover:text-[#c5a059]',
    accentGroupHover: 'group-hover:text-[#c5a059]',
    accentBg: 'bg-[#c5a059]/10',
    accentBorder: 'border-[#c5a059]/40',
    accentFocusWithinBorder: 'focus-within:border-[#c5a059]/40',
    divider: 'border-[#222b3a]',
    inputBg: 'bg-[#161c27]',
    inputBorder: 'border-[#253042]',
    pageBg: 'bg-[#181e29]/95',
    pageBorder: 'border-[#2e3748]',
    spineShadow: 'shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)]',
    ambientColor: 'rgba(56, 189, 248, 0.05)',
    drawerBg: 'bg-[#131822]',
    drawerBorder: 'border-[#253042]',
    badgeBg: 'bg-[#1a2333]',
    badgeBorder: 'border-[#2d3b52]',
  },
  emerald: {
    id: 'emerald',
    name: 'زمرد جنة العريف',
    isLight: false,
    appBg: 'bg-[#08120d]',
    headerBg: 'bg-[#08120d]/95',
    headerBorder: 'border-[#1b3124]',
    cardBg: 'bg-[#0f1f17]',
    cardBorder: 'border-[#1f3829]',
    cardHoverBorder: 'hover:border-[#c5a059]/60',
    cardHoverBg: 'hover:bg-[#14291f]',
    cardActiveBg: 'bg-[#172f23]',
    cardActiveHoverBg: 'hover:bg-[#172f23]',
    textPrimary: 'text-[#f0f7f3]',
    textPrimaryHover: 'hover:text-[#f0f7f3]',
    textPrimaryGroupHover: 'group-hover:text-[#f0f7f3]',
    textSecondary: 'text-[#87a393]',
    textMuted: 'text-[#5d7768]',
    placeholderText: 'placeholder:text-[#5d7768]',
    accent: 'text-[#c5a059]',
    accentHover: 'hover:text-[#c5a059]',
    accentGroupHover: 'group-hover:text-[#c5a059]',
    accentBg: 'bg-[#c5a059]/10',
    accentBorder: 'border-[#c5a059]/40',
    accentFocusWithinBorder: 'focus-within:border-[#c5a059]/40',
    divider: 'border-[#1b3124]',
    inputBg: 'bg-[#0f1f17]',
    inputBorder: 'border-[#1f3829]',
    pageBg: 'bg-[#0f1f17]/95',
    pageBorder: 'border-[#213b2c]',
    spineShadow: 'shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)]',
    ambientColor: 'rgba(16, 185, 129, 0.06)',
    drawerBg: 'bg-[#0b1812]',
    drawerBorder: 'border-[#1f3829]',
    badgeBg: 'bg-[#14291f]',
    badgeBorder: 'border-[#224734]',
  },
};
