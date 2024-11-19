"use client";
import StarRating from "@/components/StarRating";
import { REVIEW_QUERY } from "@/lib/gql/review";
import { useQuery } from "@apollo/client";
import Link from "next/link";

export default function ReviewPage({
  params,
}: {
  params: { bookId: string; reviewId: string };
}) {
  const { data, loading, error } = useQuery(REVIEW_QUERY, {
    variables: { id: params.reviewId },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  if (!data?.reviews.reviews[0]) return <p>Review not found.</p>;

  const review = data.reviews.reviews[0];

  return (
    <div className="container mx-auto p-6">
      <div className="max-w-2xl mx-auto">
        <div className="mb-6">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold">
              Review by {review.reviewer_name}
            </h1>
            <StarRating rating={review.rating} />
          </div>
          <p className="text-sm text-gray-500 mb-4">
            Posted on {new Date(review.createdAt).toLocaleString()}
          </p>
          <p className="text-gray-700 whitespace-pre-wrap">{review.review}</p>
        </div>

        <div className="flex gap-4">
          <Link
            href={`/books/${params.bookId}`}
            className="inline-block bg-gray-200 px-4 py-2 rounded hover:bg-gray-300"
          >
            Back to Book
          </Link>
        </div>
      </div>
    </div>
  );
}
