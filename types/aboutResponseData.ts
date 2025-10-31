// Type for a single About item
export interface AboutItem {
  _id: string;
  title: string;
  description: string;
  image: {
    public_id: string;
    url: string;
  };
  __v: number;
}

// Type for the full API response
export interface AboutResponse {
  success: boolean;
  message: string;
  data: AboutItem[];
}