import { Review } from "../models/review";

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
  const query: any = {};
  if (bookId) query.bookId = bookId;
  if (id) query._id = id;

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
