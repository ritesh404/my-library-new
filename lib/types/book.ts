export interface Book {
  id: string;
  title: string;
  description: string;
  published_date: string;
  author: {
    id: string;
    name: string;
  };
  image_url?: string;
}
