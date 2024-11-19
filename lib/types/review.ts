export interface Review {
  id: string;
  book_id: string;
  reviewer_name: string;
  rating: number;
  review: string;
  createdAt: string;
  updatedAt: string;
}

export interface ReviewQueryParams {
  book_id?: string;
  id?: string;
  limit?: number;
  offset?: number;
}

export interface ReviewCreateParams {
  book_id: string;
  reviewer_name: string;
  rating: number;
  review: string;
}
