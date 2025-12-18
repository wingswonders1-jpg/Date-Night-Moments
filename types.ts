
export type CardTheme = 
  | 'Deep Conversation Starters' 
  | 'Fun & Silly Questions' 
  | 'Dream Vacation Plans' 
  | 'Relationship Reflections';

export interface DateQuestion {
  id: number;
  text: string;
  theme: CardTheme;
  isFavorite?: boolean;
}
