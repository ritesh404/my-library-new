"use client";
import { AUTHORS_QUERY } from "@/lib/gql/author";
import { Book } from "@/lib/types/book";
import { useQuery } from "@apollo/client";
import Link from "next/link";
import { useState } from "react";
import BookModal from "@/components/BookModal";

export default function Page({ params }: { params: { authorId: string } }) {
  const authorId = params.authorId;
  const [showBookModal, setShowBookModal] = useState(false);
  const { data, loading, error, refetch } = useQuery(AUTHORS_QUERY, {
    variables: {
      id: authorId,
    },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  if (data?.authors.authors.length <= 0) return <p>Author not found.</p>;

  const { name, biography, born_date, books } = data.authors.authors[0];

  // Sort books by published date
  const sortedBooks = [...(books || [])].sort(
    (a: Book, b: Book) =>
      new Date(Number(b.published_date)).getTime() -
      new Date(Number(a.published_date)).getTime()
  );

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">{name}</h1>
      {born_date && (
        <p className="text-gray-600 mb-6 text-sm">
          Born: {new Date(Number(born_date)).toLocaleDateString()}
        </p>
      )}
      {biography && <p className="text-gray-700 mb-6">{biography}</p>}
      <div className="my-6">
        <button
          onClick={() => setShowBookModal(true)}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Add Book
        </button>
      </div>

      {sortedBooks && sortedBooks.length > 0 && (
        <div className="mb-6">
          <h2 className="text-2xl font-semibold mb-4">Published Books</h2>
          <div className="grid gap-4">
            {sortedBooks.map((book: Book) => (
              <div
                key={book.id}
                className="border rounded-lg p-4 hover:bg-gray-50 transition-colors"
              >
                <Link href={`/books/${book.id}`} className="block">
                  <h3 className="text-xl font-semibold text-blue-600 hover:text-blue-800">
                    {book.title}
                  </h3>
                  <p className="text-gray-600 mt-1">
                    Published:{" "}
                    {new Date(Number(book.published_date)).toLocaleDateString()}
                  </p>
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}

      <Link
        href="/authors"
        className="mt-6 inline-block bg-gray-200 px-4 py-2 rounded hover:bg-gray-300 transition-colors"
      >
        Back to Authors
      </Link>

      {showBookModal && (
        <BookModal
          selectedAuthorID={authorId}
          onBookSuccess={() => {
            refetch();
            setShowBookModal(false);
          }}
          onBookFailure={() => {
            setShowBookModal(false);
          }}
          onCancel={() => setShowBookModal(false)}
        />
      )}
    </div>
  );
}
