// Single hero item
interface HeroItem {
  _id: string;
  title: string;
  description: string;
  __v: number;
}

// API response type
export interface HeroResponse {
  success: boolean;
  message: string;
  data: HeroItem[];
}
