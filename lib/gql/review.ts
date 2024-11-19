import { gql } from "@apollo/client";

export const REVIEWS_QUERY = gql`
  query Reviews($book_id: ID, $id: ID, $limit: Int, $offset: Int) {
    reviews(book_id: $book_id, id: $id, limit: $limit, offset: $offset) {
      reviews {
        id
        book_id
        reviewer_name
        rating
        createdAt
        updatedAt
      }
      count
    }
  }
`;

export const REVIEW_QUERY = gql`
  query Review($book_id: ID, $id: ID, $limit: Int, $offset: Int) {
    reviews(book_id: $book_id, id: $id, limit: $limit, offset: $offset) {
      reviews {
        id
        book_id
        reviewer_name
        rating
        review
        createdAt
        updatedAt
      }
      count
    }
  }
`;

export const CREATE_REVIEW = gql`
  mutation CreateReview(
    $book_id: ID!
    $reviewer_name: String!
    $rating: Int!
    $review: String!
  ) {
    createReview(
      book_id: $book_id
      reviewer_name: $reviewer_name
      rating: $rating
      review: $review
    ) {
      id
      reviewer_name
      rating
      review
      createdAt
    }
  }
`;
