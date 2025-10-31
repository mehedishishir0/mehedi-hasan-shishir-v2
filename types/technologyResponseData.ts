export interface TechnologyImage {
  public_id: string;
  url: string;
}

export interface TechnologyItem {
  image: TechnologyImage;
  _id: string;
  name: string;
  description: string;
  __v: number;
}

export interface TechnologyResponse {
  success: boolean;
  message: string;
  data: TechnologyItem[];
}