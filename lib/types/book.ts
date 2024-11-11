export interface Book {
  id: string;
  title: string;
  description: string;
  published_date: string;
  author: {
    name: string;
    id: string;
  };
}
