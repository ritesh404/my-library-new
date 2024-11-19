export interface Author {
  id: string;
  name: string;
  biography?: string;
  born_date?: string;
  image_url?: string;
}

export interface AuthorQueryParams {
  limit?: number;
  offset?: number;
  id?: string;
  name?: string;
  born_year?: string;
}

export interface AuthorCreateParams {
  name: string;
  biography: string;
  born_date: string;
  image_url: string;
}

export interface AuthorUpdateParams extends AuthorCreateParams {
  id: string;
}
