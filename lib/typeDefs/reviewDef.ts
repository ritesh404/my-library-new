export const reviewType = `
  type Review {
    id: ID!
    book_id: ID!
    reviewer_name: String!
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
    reviews(book_id: ID, id: ID, limit: Int, offset: Int): ReviewResponse!
`;

export const reviewMutation = `
    createReview(
      book_id: ID!
      reviewer_name: String!
      rating: Int!
      review: String!
    ): Review!
`;
