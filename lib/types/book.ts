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

export interface BookQueryParams {
  limit: number;
  offset: number;
  id?: string;
  title?: string;
  author_id?: string;
  published_date?: string;
  author_name?: string;
}

export interface BookCreateParams {
  title: string;
  description: string;
  published_date: string;
  author_id: string;
  image_url: string;
}

export interface BookUpdateParams extends BookCreateParams {
  id: string;
}
