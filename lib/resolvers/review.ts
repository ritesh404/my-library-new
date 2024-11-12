import { createReviewLoader } from "../dataloaders/reviewLoader";
import { Review } from "../models/review";

const reviewLoader = createReviewLoader();

export async function reviewQueryResolver(
  _parent: unknown,
  {
    bookId,
    id,
    limit = 10,
    offset = 0,
  }: {
    bookId?: string;
    id?: string;
    limit?: number;
    offset?: number;
  }
) {
  if (id) {
    const review = await reviewLoader.load(id);
    return {
      reviews: review ? [review] : [],
      count: review ? 1 : 0,
    };
  }
  const query: any = {};
  if (bookId) query.bookId = bookId;

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

export async function createReviewMutationResolver(
  _parent: unknown,
  {
    bookId,
    reviewerName,
    rating,
    review,
  }: {
    bookId: string;
    reviewerName: string;
    rating: number;
    review: string;
  }
) {
  try {
    const newReview = await Review.create({
      bookId,
      reviewerName,
      rating,
      review,
    });
    return newReview;
  } catch (error) {
    console.error("Error creating review:", error);
    throw new Error("Failed to create review");
  }
}
