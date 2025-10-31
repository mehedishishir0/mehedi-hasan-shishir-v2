type TestimonialItem = {
  image: {
    public_id: string;
    url: string;
  };
  _id: string;
  name: string;
  role: string;
  feedback: string;
  rating: number;
  __v: number;
};

type TestimonialResponse = {
  success: boolean;
  message: string;
  data: TestimonialItem[];
};