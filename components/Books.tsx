"use client";
import { BOOKS_QUERY, DELETE_BOOK } from "@/lib/gql/book";
import { Book } from "@/lib/types/book";
import { useMutation, useQuery } from "@apollo/client";
import { useSearchParams, useRouter } from "next/navigation";
import React, { use, useState } from "react";
import Pagination from "./Pagination";
import Modal from "./Modal";
import BookModal from "./BookModal";
import GenericErrorModal from "./GenericErrorModal";

const ITEMS_PER_PAGE = 10;

const ConfirmDeleteModal = ({
  book,
  onConfirm,
  onCancel,
  isBusy = false,
}: {
  book: Book;
  onConfirm: () => void;
  onCancel: () => void;
  isBusy: boolean;
}) => {
  return (
    <Modal>
      <p>
        Are you sure you want to delete <b>{book.title}</b>?
      </p>

      <div className="mt-4 flex gap-8">
        {isBusy ? (
          "Please wait..."
        ) : (
          <>
            <button
              type="button"
              className=" px-4 py-2 text-sm font-medium text-red-900 bg-red-100 border border-transparent rounded-md hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-red-500"
              onClick={onConfirm}
            >
              Yes, delete
            </button>
            <button
              type="button"
              className=" px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-300 rounded-md hover:text-gray-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-500"
              onClick={onCancel}
            >
              No, cancel
            </button>
          </>
        )}
      </div>
    </Modal>
  );
};

const Books = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const currentPage = searchParams.get("page")
    ? Number(searchParams.get("page"))
    : 1;
  const [titleFilter, setTitleFilter] = useState("");
  const [authorFilter, setAuthorFilter] = useState("");
  const [showBookModal, setShowBookModal] = useState(false);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [showSomethingWentWrong, setShowSomethingWentWrong] = useState(false);

  const [deleteBook, { loading: isDeleting }] = useMutation(DELETE_BOOK, {
    variables: {
      id: selectedBook?.id,
    },
  });

  const { data, loading, refetch } = useQuery(BOOKS_QUERY, {
    variables: {
      limit: ITEMS_PER_PAGE,
      offset: (currentPage - 1) * ITEMS_PER_PAGE,
    },
    // skip: currentTab !== "books",
  });
  const totalPages = data ? Math.ceil(data.books.count / ITEMS_PER_PAGE) : 0;

  function handleRefetchBooks() {
    refetch({
      limit: ITEMS_PER_PAGE,
      offset: (currentPage - 1) * ITEMS_PER_PAGE,
      title: titleFilter,
      author_name: authorFilter,
    });
  }

  async function confirmDeleteAuthor() {
    if (!selectedBook) return;
    try {
      await deleteBook({
        variables: {
          id: selectedBook.id,
        },
      });
      await handleRefetchBooks();
      setShowDeleteConfirmation(false);
    } catch (e) {
      setShowSomethingWentWrong(true);
    }
  }

  return (
    <>
      <div className="flex gap-4">
        <div className="flex flex-col gap-2">
          <span className="text-sm">Search by title</span>
          <input
            type="text"
            placeholder="Search books by title"
            className="w-full rounded-md border border-gray-300 p-2 text-sm"
            value={titleFilter}
            onChange={(e) => setTitleFilter(e.target.value || "")}
          />
        </div>
        <div className="flex flex-col gap-2">
          <span className="text-sm">Search by author</span>
          <input
            type="text"
            placeholder="Search books by author"
            className="w-full rounded-md border border-gray-300 p-2 text-sm"
            value={authorFilter}
            onChange={(e) => setAuthorFilter(e.target.value || "")}
          />
        </div>
        <div className="flex items-end">
          <button
            disabled={loading}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => {
              handleRefetchBooks();
            }}
          >
            Search
          </button>
        </div>
      </div>
      <div className="margin-t-12 w-full">
        {loading ? (
          <div className="py-4">Please wait...</div>
        ) : (
          <div className="mt-4 w-full  bg-slate-50 rounded-xl ">
            <table className="border-collapse w-full">
              <thead>
                <tr>
                  <th className="border-b font-medium p-4  pb-3 text-slate-400 text-left">
                    Books
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white ">
                {data?.books.books.map((book: Book) => (
                  <tr key={book.id}>
                    <td
                      className="border-y pl-8 border-l border-slate-100 p-4 text-slate-500 cursor-pointer"
                      onClick={() => {
                        router.push(`/books/${book.id}`);
                      }}
                    >
                      {book.title}
                    </td>
                    <td className="border-y flex gap-4 justify-end border-slate-100 p-4 text-slate-500">
                      <button
                        onClick={() => {
                          setSelectedBook(book);
                          setShowBookModal(true);
                        }}
                        className="px-4 py-2 bg-gray-400 text-white rounded"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => {
                          setSelectedBook(book);
                          setShowDeleteConfirmation(true);
                        }}
                        className="px-4 py-2 bg-gray-400 text-white rounded"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      {!loading && totalPages > 1 && (
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={(pageNo) => {
            router.push(`/authors?page=${pageNo}`);
          }}
        />
      )}
      {showBookModal && selectedBook && (
        <BookModal
          book={selectedBook}
          selectedAuthorID={selectedBook.author.id}
          onBookSuccess={() => {
            setShowBookModal(false);
          }}
          onBookFailure={() => {
            setShowBookModal(false);
          }}
          onCancel={() => setShowBookModal(false)}
        />
      )}
      {showDeleteConfirmation && selectedBook && (
        <ConfirmDeleteModal
          book={selectedBook}
          onConfirm={confirmDeleteAuthor}
          onCancel={() => setShowDeleteConfirmation(false)}
          isBusy={isDeleting}
        />
      )}
      {showSomethingWentWrong && (
        <GenericErrorModal onConfirm={() => setShowSomethingWentWrong(false)} />
      )}
    </>
  );
};

export default Books;
