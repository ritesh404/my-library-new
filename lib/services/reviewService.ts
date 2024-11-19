import { Review } from "../models/review";
import { ReviewCreateParams, ReviewQueryParams } from "../types/review";

export async function getPaginatedReviews({
  book_id,

  limit = 10,
  offset = 0,
}: ReviewQueryParams) {
  const query: any = {};
  if (book_id) query.book_id = book_id;
  const count = await Review.countDocuments(query);
  const reviews = await Review.find(query)
    .sort({ createdAt: -1 })
    .skip(offset)
    .limit(limit);

  return {
    reviews,
    count,
  };
}

export async function createReview({
  book_id,
  reviewer_name,
  rating,
  review,
}: ReviewCreateParams) {
  const newReview = await Review.create({
    book_id,
    reviewer_name,
    rating,
    review,
  });
  return newReview;
}
