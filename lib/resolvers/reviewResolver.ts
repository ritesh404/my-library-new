import { createReviewLoader } from "../dataloaders/reviewLoader";
import { createReview, getPaginatedReviews } from "../services/reviewService";
import { ReviewCreateParams, ReviewQueryParams } from "../types/review";

const reviewLoader = createReviewLoader();

export async function reviewQueryResolver(
  _parent: unknown,
  params: ReviewQueryParams
) {
  if (params.id) {
    const review = await reviewLoader.load(params.id);
    return {
      reviews: review ? [review] : [],
      count: review ? 1 : 0,
    };
  }

  return await getPaginatedReviews(params);
}

export async function createReviewMutationResolver(
  _parent: unknown,
  params: ReviewCreateParams
) {
  try {
    return await createReview(params);
  } catch (error) {
    console.error("Error creating review:", error);
    throw new Error("Failed to create review");
  }
}
