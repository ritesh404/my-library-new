import {
  BookQueryParams,
  BookCreateParams,
  BookUpdateParams,
} from "../types/book";
import {
  createBook,
  deleteBook,
  getPaginatedBooks,
  updateBook,
} from "../services/bookService";
import { Context } from "../types/context";

export async function bookQueryResolver(
  _parent: unknown,
  params: BookQueryParams
) {
  // if (params.id) {
  //   const book = await context.loaders.bookLoader.load(params.id);
  //   return {
  //     books: book ? [book] : [],
  //     count: book ? 1 : 0,
  //   };
  // }

  const result = await getPaginatedBooks(params);
  return result;
}

export async function bookAuthorResolver(
  _parent: { id: string; author_id: string },
  _: any,
  context: Context
) {
  const author = await context.loaders.authorLoader.load(_parent.author_id);
  return author;
}

export async function createBookMutationResolver(
  _parent: unknown,
  params: BookCreateParams,
  context: Context
) {
  try {
    const newBook = await createBook(params);
    context.loaders.authorLoader.clear(params.author_id);
    return newBook;
  } catch (error) {
    console.error("Error creating book:", error);
    throw new Error("Failed to create book");
  }
}

export async function updateBookMutationResolver(
  _parent: unknown,
  params: BookUpdateParams,
  context: Context
) {
  try {
    await updateBook(params);
    context.loaders.bookLoader.clear(params.id);
    context.loaders.authorLoader.clear(params.author_id);
    const book = await context.loaders.bookLoader.load(params.id);
    return book;
  } catch (error) {
    console.error("Error updating book:", error);
    throw new Error("Failed to update book");
  }
}

export async function deleteBookMutationResolver(
  _parent: unknown,
  {
    id,
  }: {
    id: string;
  },
  context: Context
) {
  try {
    const book = await context.loaders.bookLoader.load(id);
    await deleteBook(id);

    context.loaders.bookLoader.clear(id);
    return book;
  } catch (error) {
    console.error("Error deleting book:", error);
    throw new Error("Failed to delete book");
  }
}
