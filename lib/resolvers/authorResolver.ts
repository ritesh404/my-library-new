import {
  AuthorCreateParams,
  AuthorQueryParams,
  AuthorUpdateParams,
} from "../types/author";
import {
  createAuthor,
  deleteAuthor,
  getPaginatedAuthors,
  updateAuthor,
} from "../services/authorService";
import { Context } from "../types/context";

export async function authorQueryResolver(
  _parent: unknown,
  params: AuthorQueryParams,
  context: Context
) {
  // If querying by ID, use the loader
  if (params.id) {
    const author = await context.loaders.authorLoader.load(params.id);
    return {
      authors: author ? [author] : [],
      count: author ? 1 : 0,
    };
  }

  return await getPaginatedAuthors(params);
}

export async function authorBooksResolver(
  _parent: { id: string },
  _: any,
  context: Context
) {
  const books = await context.loaders.bookLoader.load(_parent.id);

  return books;
}

export async function createAuthorMutationResolver(
  _parent: unknown,
  params: AuthorCreateParams
) {
  try {
    return await createAuthor(params);
  } catch (error) {
    console.error("Error creating author:", error);
    throw new Error("Failed to create author");
  }
}

export async function updateAuthorMutationResolver(
  _parent: unknown,
  params: AuthorUpdateParams,
  context: Context
) {
  try {
    await updateAuthor(params);
    context.loaders.authorLoader.clear(params.id);
    const author = await context.loaders.authorLoader.load(params.id);
    return author;
  } catch (error) {
    console.error("Error updating author:", error);
    throw new Error("Failed to update author");
  }
}

export async function deleteAuthorMutationResolver(
  _parent: unknown,
  {
    id,
  }: {
    id: string;
  },
  context: Context
) {
  try {
    const author = await context.loaders.authorLoader.load(id);
    await deleteAuthor(id);

    context.loaders.authorLoader.clear(id);
    return author;
  } catch (error) {
    console.error("Error deleting author:", error);
    throw new Error("Failed to delete author");
  }
}
