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
  textPrimary: string;
  textSecondary: string;
  textMuted: string;
  accent: string;
  accentBg: string;
  accentBorder: string;
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
    name: 'سواد كوني',
    isLight: false,
    appBg: 'bg-[#07080c]',
    headerBg: 'bg-[#07080c]/95',
    headerBorder: 'border-[#232328]',
    cardBg: 'bg-[#121216]',
    cardBorder: 'border-[#232328]',
    cardHoverBorder: 'hover:border-[#c5a059]/60',
    cardHoverBg: 'hover:bg-[#16161c]',
    cardActiveBg: 'bg-[#16161d]',
    textPrimary: 'text-[#f5f2ed]',
    textSecondary: 'text-[#9a9792]',
    textMuted: 'text-[#6e6b66]',
    accent: 'text-[#c5a059]',
    accentBg: 'bg-[#c5a059]/10',
    accentBorder: 'border-[#c5a059]/40',
    divider: 'border-[#232328]',
    inputBg: 'bg-[#121216]',
    inputBorder: 'border-[#232328]',
    pageBg: 'bg-[#0f1015]/95',
    pageBorder: 'border-[#2d2d38]',
    spineShadow: 'shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)]',
    ambientColor: 'rgba(197, 160, 89, 0.08)',
    drawerBg: 'bg-[#0e0e12]',
    drawerBorder: 'border-[#2d2d38]',
    badgeBg: 'bg-[#1a1610]',
    badgeBorder: 'border-[#382d1a]',
  },
  parchment: {
    id: 'parchment',
    name: 'مخطوطة عاجية',
    isLight: true,
    appBg: 'bg-[#f0eae1]',
    headerBg: 'bg-[#f3ede3]/95',
    headerBorder: 'border-[#ded4c3]',
    cardBg: 'bg-[#faf6ef]',
    cardBorder: 'border-[#dfd6c6]',
    cardHoverBorder: 'hover:border-[#966b26]/70',
    cardHoverBg: 'hover:bg-[#f5ede0]',
    cardActiveBg: 'bg-[#efe6d8]',
    textPrimary: 'text-[#2b2621]',
    textSecondary: 'text-[#6b6055]',
    textMuted: 'text-[#8a7f74]',
    accent: 'text-[#855e1e]',
    accentBg: 'bg-[#855e1e]/10',
    accentBorder: 'border-[#855e1e]/40',
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
    name: 'ضباب الليل',
    isLight: false,
    appBg: 'bg-[#0f131a]',
    headerBg: 'bg-[#0f131a]/95',
    headerBorder: 'border-[#222b3a]',
    cardBg: 'bg-[#161c27]',
    cardBorder: 'border-[#253042]',
    cardHoverBorder: 'hover:border-[#c5a059]/60',
    cardHoverBg: 'hover:bg-[#1a2333]',
    cardActiveBg: 'bg-[#1d2739]',
    textPrimary: 'text-[#eef2f7]',
    textSecondary: 'text-[#8e9cb0]',
    textMuted: 'text-[#5f6e82]',
    accent: 'text-[#c5a059]',
    accentBg: 'bg-[#c5a059]/10',
    accentBorder: 'border-[#c5a059]/40',
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
    name: 'زمرد ملكي',
    isLight: false,
    appBg: 'bg-[#08120d]',
    headerBg: 'bg-[#08120d]/95',
    headerBorder: 'border-[#1b3124]',
    cardBg: 'bg-[#0f1f17]',
    cardBorder: 'border-[#1f3829]',
    cardHoverBorder: 'hover:border-[#c5a059]/60',
    cardHoverBg: 'hover:bg-[#14291f]',
    cardActiveBg: 'bg-[#172f23]',
    textPrimary: 'text-[#f0f7f3]',
    textSecondary: 'text-[#87a393]',
    textMuted: 'text-[#5d7768]',
    accent: 'text-[#c5a059]',
    accentBg: 'bg-[#c5a059]/10',
    accentBorder: 'border-[#c5a059]/40',
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
