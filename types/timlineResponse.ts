export interface TimelineItemFromAPI {
  _id: string;
  title: string;
  subTitle: string;
  date: string; // ISO date string
  content: string;
  __v: number;
}

export interface TimelineAPIResponse {
  success: boolean;
  message: string;
  data: TimelineItemFromAPI[];
}
export interface TimelineItemFromAPI {
  _id: string;
  title: string;
  subTitle: string;
  date: string; // ISO date string
  content: string;
  __v: number;
}

export interface TimelineAPIResponse {
  success: boolean;
  message: string;
  data: TimelineItemFromAPI[];
}