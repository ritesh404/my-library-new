"use client";
import { BOOKS_QUERY } from "@/lib/gql/book";
import { REVIEWS_QUERY } from "@/lib/gql/review";
import { Review } from "@/lib/types/review";
import { useQuery } from "@apollo/client";
import Link from "next/link";

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center">
      {[...Array(5)].map((_, index) => (
        <span
          key={index}
          className={`text-xl ${
            index < rating ? "text-yellow-400" : "text-gray-300"
          }`}
        >
          ★
        </span>
      ))}
    </div>
  );
}

export default function Page({ params }: { params: { bookId: string } }) {
  const bookId = params.bookId;
  const {
    data: bookData,
    loading: bookLoading,
    error: bookError,
  } = useQuery(BOOKS_QUERY, {
    variables: { id: bookId },
  });

  const { data: reviewsData, loading: reviewsLoading } = useQuery(
    REVIEWS_QUERY,
    {
      variables: { bookId },
    }
  );

  if (bookLoading || reviewsLoading) return <p>Loading...</p>;
  if (bookError) return <p>Error: {bookError.message}</p>;
  if (bookData?.books.books.length <= 0) return <p>Book not found.</p>;

  const { title, description, published_date, author } =
    bookData.books.books[0];
  const reviews = reviewsData?.reviews.reviews || [];

  return (
    <div className="container mx-auto p-6">
      <div className="flex gap-8 mb-6">
        {bookData.books.books[0].image_url && (
          <div className="flex-shrink-0">
            <img
              src={bookData.books.books[0].image_url}
              alt={title}
              className="w-48 h-64 object-cover rounded-lg shadow-lg"
            />
          </div>
        )}
        <div>
          <h1 className="text-3xl font-bold mb-4">{title}</h1>
          <p className="text-sm mb-2">
            Published Date:{" "}
            {new Date(Number(published_date)).toLocaleDateString()}
          </p>
          {author && (
            <div className="mb-6">
              <h2 className="text-sm font-semibold">Author:</h2>
              <Link
                href={`/authors/${author.id}`}
                className="text-blue-500 hover:underline text-sm"
              >
                {author.name}
              </Link>
            </div>
          )}
          <p className="text-gray-700 mb-4">{description}</p>
        </div>
      </div>

      <div className="mt-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Reviews</h2>
          <Link
            href={`/books/${bookId}/review`}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Add Review
          </Link>
        </div>

        {reviews.length > 0 ? (
          <div className="space-y-4">
            {reviews.map((review: Review) => (
              <div
                key={review.id}
                className="border rounded-lg p-4 hover:bg-gray-50"
              >
                <Link href={`/books/${bookId}/review/${review.id}`}>
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold">{review.reviewerName}</h3>
                      <p className="text-xs text-gray-500">
                        {new Date(
                          Number(review.createdAt)
                        ).toLocaleDateString()}
                      </p>
                    </div>
                    <StarRating rating={review.rating} />
                  </div>
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">
            No reviews yet. Be the first to review!
          </p>
        )}
      </div>

      <Link
        href="/books"
        className="mt-6 inline-block bg-gray-200 px-4 py-2 rounded hover:bg-gray-300"
      >
        Back to Books
      </Link>
    </div>
  );
}
