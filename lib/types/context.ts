import { createAuthorLoader } from "../dataloaders/authorLoader";
import { createBookLoader } from "../dataloaders/bookLoader";
import { createReviewLoader } from "../dataloaders/reviewLoader";

export type Context = {
  loaders: {
    authorLoader: ReturnType<typeof createAuthorLoader>;
    bookLoader: ReturnType<typeof createBookLoader>;
    reviewLoader: ReturnType<typeof createReviewLoader>;
  };
};
