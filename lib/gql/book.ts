import { gql } from "@apollo/client";

export const BOOKS_QUERY = gql`
  query Books(
    $limit: Int
    $offset: Int
    $id: ID
    $title: String
    $author_id: ID
    $published_date: String
    $author_name: String
  ) {
    books(
      limit: $limit
      offset: $offset
      id: $id
      title: $title
      author_id: $author_id
      published_date: $published_date
      author_name: $author_name
    ) {
      books {
        id
        title
        description
        published_date
        image_url
        author {
          id
          name
        }
      }
      count
    }
  }
`;

export const CREATE_BOOK = gql`
  mutation CreateBook(
    $title: String!
    $description: String
    $published_date: String
    $author_id: String!
    $image_url: String
  ) {
    createBook(
      title: $title
      description: $description
      published_date: $published_date
      author_id: $author_id
      image_url: $image_url
    ) {
      id
      title
      description
      image_url
    }
  }
`;

export const UPDATE_BOOK = gql`
  mutation UpdateBook(
    $id: ID!
    $title: String
    $description: String
    $published_date: String
    $author_id: String
    $image_url: String
  ) {
    updateBook(
      id: $id
      title: $title
      description: $description
      published_date: $published_date
      author_id: $author_id
      image_url: $image_url
    ) {
      id
      title
      description
      image_url
    }
  }
`;

export const DELETE_BOOK = gql`
  mutation DeleteBook($id: ID!) {
    deleteBook(id: $id) {
      id
      title
      description
    }
  }
`;
