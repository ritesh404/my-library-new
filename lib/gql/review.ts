import { gql } from "@apollo/client";

export const REVIEWS_QUERY = gql`
  query Reviews($bookId: ID, $id: ID, $limit: Int, $offset: Int) {
    reviews(bookId: $bookId, id: $id, limit: $limit, offset: $offset) {
      reviews {
        id
        bookId
        reviewerName
        rating
        createdAt
        updatedAt
      }
      count
    }
  }
`;

export const REVIEW_QUERY = gql`
  query Review($bookId: ID, $id: ID, $limit: Int, $offset: Int) {
    reviews(bookId: $bookId, id: $id, limit: $limit, offset: $offset) {
      reviews {
        id
        bookId
        reviewerName
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
    $bookId: ID!
    $reviewerName: String!
    $rating: Int!
    $review: String!
  ) {
    createReview(
      bookId: $bookId
      reviewerName: $reviewerName
      rating: $rating
      review: $review
    ) {
      id
      reviewerName
      rating
      review
      createdAt
    }
  }
`;
