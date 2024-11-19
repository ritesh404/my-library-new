import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    book_id: {
      type: String,
      required: true,
      index: true,
    },
    reviewer_name: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 0,
      max: 5,
    },
    review: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Review =
  mongoose.models.Review || mongoose.model("Review", reviewSchema);
