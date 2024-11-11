export const reviewType = `
  type Review {
    id: ID!
    bookId: ID!
    reviewerName: String!
    rating: Int!
    review: String!
    createdAt: String!
    updatedAt: String!
  }
`;

export const reviewResponseType = `
 type ReviewResponse {
    reviews: [Review!]!
    count: Int!
  }`;

export const reviewQuery = `
    reviews(bookId: ID, id: ID, limit: Int, offset: Int): ReviewResponse!
`;

export const reviewMutation = `
    createReview(
      bookId: ID!
      reviewerName: String!
      rating: Int!
      review: String!
    ): Review!
`;
