import DataLoader from "dataloader";
import { Review } from "../models/review";
import { Review as ReviewType } from "../types/review";

export const createReviewLoader = () => {
  return new DataLoader(async (ids: readonly string[]) => {
    const reviews = await Review.find({
      _id: {
        $in: ids,
      },
    });

    const reviewMap = reviews.reduce((map, review) => {
      map[review.id] = review;
      return map;
    }, {} as Record<string, ReviewType>);
    console.log(reviews, reviewMap);
    return ids.map((id) => reviewMap[id] || null);
  });
};
