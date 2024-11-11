import Modal from "./Modal";
import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { BOOKS_QUERY, CREATE_BOOK, UPDATE_BOOK } from "@/lib/gql/book";
import { Book } from "@/lib/types/book";

interface BookModalProps {
  book?: Book;
  selectedAuthorID: string;
  onBookSuccess: (book: Book) => void;
  onBookFailure: () => void;
  onCancel: () => void;
}

const BookForm = ({
  book,
  selectedAuthorID,
  onBookSuccess,
  onBookFailure,
  onCancel,
}: BookModalProps) => {
  const [title, setTitle] = useState(book?.title || "");
  const [description, setDescription] = useState(book?.description || "");
  const [publishedDate, setPublishedDate] = useState(
    book?.published_date
      ? new Date(Number(book.published_date)).toISOString().slice(0, 10)
      : ""
  );

  const [createBook, { loading: isCreating }] = useMutation(CREATE_BOOK, {
    refetchQueries: [{ query: BOOKS_QUERY }],
  });

  const [updateBook, { loading: isUpdating }] = useMutation(UPDATE_BOOK, {
    refetchQueries: [{ query: BOOKS_QUERY }],
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (book) {
        const { data } = await updateBook({
          variables: {
            id: book.id,
            title,
            description,
            published_date: publishedDate,
            author_id: book.author.id,
          },
        });
        onBookSuccess(data.updateBook);
      } else {
        const { data } = await createBook({
          variables: {
            title,
            description,
            published_date: publishedDate,
            author_id: selectedAuthorID,
          },
        });
        onBookSuccess(data.createBook);
      }
    } catch (error) {
      console.error("Error creating book:", error);
      onBookFailure();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 w-full">
      <h2 className="text-2xl font-bold mb-4">Add a book</h2>

      {/* Book Details */}
      <div className="mb-4">
        <label className="block mb-2">Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block mb-2">Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block mb-2">Published Date</label>
        <input
          type="date"
          value={publishedDate}
          onChange={(e) => setPublishedDate(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
      </div>

      {isCreating || isUpdating ? (
        <div className="text-center">Please wait...</div>
      ) : (
        <>
          <button
            type="submit"
            className="px-4 py-2 mt-4 bg-blue-500 text-white rounded"
          >
            {book ? "Update" : "Add"}
          </button>
          <button
            type="button"
            className="px-4 py-2 mt-4 ml-4 text-white rounded bg-gray-400"
            onClick={onCancel}
          >
            Cancel
          </button>
        </>
      )}
    </form>
  );
};

const CreateBookModal = (props: BookModalProps) => {
  return (
    <Modal>
      <div className="mt-2">
        <BookForm
          book={props.book}
          selectedAuthorID={props.selectedAuthorID}
          onBookSuccess={props.onBookSuccess}
          onBookFailure={props.onBookFailure}
          onCancel={props.onCancel}
        />
      </div>
    </Modal>
  );
};

export default CreateBookModal;
