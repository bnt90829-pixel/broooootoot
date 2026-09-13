export type ViewState = 'cover' | 'library' | 'reader';

export type PoemCategory = 'all' | 'limatha' | 'nathr' | 'ghazal' | 'ashari' | 'snippets' | 'inkisar' | 'habr' | 'heyam' | 'sultan' | 'salim' | 'yaqeen' | 'saad';

export interface CategoryInfo {
  id: PoemCategory;
  name: string;
  subtitle: string;
  iconName: string;
  description: string;
}

export interface Poem {
  id: string;
  title: string;
  category: string;
  categoryTitle: string;
  chapter: string;
  pageNumber: number;
  symbol: string;
  excerpt: string;
  stanzas: string[];
  notes?: string;
}

export type BookTheme = 'parchment' | 'midnight' | 'slate' | 'emerald';
export type BookFont = 'amiri' | 'ruqaa' | 'scheherazade' | 'naskh' | 'serif-ar';
