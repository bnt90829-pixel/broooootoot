import { PoemCategory } from '../types';

export interface PoetInfo {
  id: string;
  name: string;
  title: string;
  description: string;
  poemsCount: number;
  category: PoemCategory;
  isAvailable: boolean;
  badge?: string;
  period?: string;
}

export const POETS_LIST: PoetInfo[] = [
  {
    id: 'efrahim',
    name: 'إفراهيم 2003',
    title: 'ديوان غزالتي • إفراهيم 2003',
    description: 'المجموعات الشعرية: غزالتي، لماذا؟، نثر غزالتي، الإنكسار، وحين يجرؤ الحبر',
    poemsCount: 514,
    category: 'all',
    isAvailable: true,
    badge: 'الديوان الأساسي',
    period: 'المجموعة الكاملة',
  },
  {
    id: 'heyam',
    name: 'هيام محمد',
    title: 'ديوان الشاعرة هيام محمد',
    description: 'مجموعة قصائد وأشعار ووجدانيات تحاكي أعماق الروح والذاكرة والغياب',
    poemsCount: 11,
    category: 'heyam',
    isAvailable: true,
    badge: 'ديوان مُضاف',
    period: 'قصائد ووجدانيات',
  },
  {
    id: 'sultan',
    name: 'محمد سلطان',
    title: 'مجموعة شعرية • ديوان محمد سلطان',
    description: 'مجموعة شعرية في ليل الأسى والغربة والذكرى وبقايا الأمس',
    poemsCount: 10,
    category: 'sultan',
    isAvailable: true,
    badge: 'ديوان مُضاف',
    period: 'مجموعة شعرية',
  },
  {
    id: 'salim',
    name: 'سليم السلطان',
    title: 'قصائد في الحياة والأمل والخيانة • سليم السلطان',
    description: 'مجموعة شعرية مختارة في الأمل والحياة وقصائد الخيانة والغدر',
    poemsCount: 13,
    category: 'salim',
    isAvailable: true,
    badge: 'ديوان مُضاف',
    period: 'مجموعة شعرية مختارة',
  },
  {
    id: 'yaqeen',
    name: 'يقين محمد',
    title: 'غزل بجمال الأنثى وغرورها وكبريائها • يقين محمد',
    description: 'ديوان يقين السلطان: غزل بجمال الأنثى وعزتها وغرورها وكبريائها وسلطانة الذات',
    poemsCount: 14,
    category: 'yaqeen',
    isAvailable: true,
    badge: 'ديوان مُضاف',
    period: 'مجموعة غزلية وكبرياء',
  },
  {
    id: 'saad',
    name: 'سعد غدير',
    title: 'حكايات وحكم — روائع القصص والعِبَر • سعد غدير',
    description: 'محطات تربوية واستخلاصات من التراث والمفاهيم الإنسانية تقدم دروساً قيّمة في الحياة والإنسان والزمان',
    poemsCount: 11,
    category: 'saad',
    isAvailable: true,
    badge: 'ديوان مُضاف',
    period: 'حكايات وحكم تربوية',
  },
  {
    id: 'upcoming-1',
    name: 'شاعر قادم (مساحة مخصصة)',
    title: 'ديوان جديد قريباً',
    description: 'سيتم إضافة أعمال وقصائد الشاعر الجديد في هذا القسم قريباً',
    poemsCount: 0,
    category: 'all',
    isAvailable: false,
    badge: 'قريباً',
    period: 'قيد الإعداد والتجهيز',
  },
  {
    id: 'upcoming-2',
    name: 'شاعرة قادمة (مساحة مخصصة)',
    title: 'مجموعة شعرية قادمة',
    description: 'مساحة مجهزة لإدراج دواوين وقصائد أدبية إضافية',
    poemsCount: 0,
    category: 'all',
    isAvailable: false,
    badge: 'قريباً',
    period: 'قيد الإعداد والتجهيز',
  },
];

export function getPoetNameForPoem(poem: { category?: string; notes?: string }): string {
  switch (poem.category) {
    case 'heyam':
      return 'هيام محمد';
    case 'sultan':
      return 'محمد سلطان';
    case 'salim':
      return 'سليم السلطان';
    case 'yaqeen':
      return 'يقين محمد';
    case 'saad':
      return 'سعد غدير';
    case 'ghazal':
    case 'limatha':
    case 'nathr':
    case 'inkisar':
    case 'habr':
      return 'إفراهيم 2003';
  }
  if (poem.notes && poem.notes.startsWith('—')) {
    const cleaned = poem.notes.replace(/^—\s*/, '').trim();
    if (cleaned) return cleaned;
  }
  return 'إفراهيم 2003';
}
