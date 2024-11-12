import { Op, WhereOptions } from "sequelize";
import { Book } from "../models/book";
import { Author } from "../models/author";
import { createBookLoader } from "../dataloaders/bookLoader";

const bookLoader = createBookLoader();

export async function bookQueryResolver(
  _parent: unknown,
  {
    limit = 10,
    offset = 0,
    id,
    title,
    author_id,
    published_date,
    author_name,
  }: {
    limit: number;
    offset: number;
    id?: string;
    title?: string;
    author_id?: string;
    published_date?: string;
    author_name?: string;
  }
) {
  if (id) {
    const book = await bookLoader.load(id);
    return {
      books: book ? [book] : [],
      count: book ? 1 : 0,
    };
  }

  const where: WhereOptions = {};

  if (author_name) {
    const author = await Author.findAll({
      where: { name: { [Op.iLike]: `%${author_name}%` } },
    });
    if (author) {
      where.author_id = {
        //@ts-expect-error - TS doesn't know that author is an array of Author
        [Op.in]: author.map((a) => a?.id),
      };
    }
  }

  // Filtering options
  if (title) where.title = { [Op.iLike]: `%${title}%` };
  if (published_date) where.published_date = published_date;
  if (author_id) where.author_id = author_id;

  const count = await Book.count({
    where,
  });

  const books = await Book.findAll({
    where,
    limit,
    offset,
    include: [{ model: Author, as: "author" }],
    order: [["published_date", "DESC"]], // TODO: enable sorting in UI
  });

  return {
    books,
    count,
  };
}

export async function createBookMutationResolver(
  _parent: unknown,
  {
    title,
    description,
    published_date,
    author_id,
    image_url,
  }: {
    title: string;
    description: string;
    published_date: string;
    author_id: string;
    image_url: string;
  }
) {
  try {
    const newBook = await Book.create({
      title,
      description,
      published_date,
      author_id,
      image_url,
    });
    return newBook;
  } catch (error) {
    console.error("Error creating book:", error);
    throw new Error("Failed to create book");
  }
}

export async function updateBookMutationResolver(
  _parent: unknown,
  {
    id,
    title,
    description,
    published_date,
    author_id,
    image_url,
  }: {
    id: string;
    title: string;
    description: string;
    published_date: string;
    author_id: string;
    image_url: string;
  }
) {
  try {
    await Book.update(
      {
        title,
        description,
        published_date,
        author_id,
        image_url,
      },
      {
        where: {
          id,
        },
      }
    );

    bookLoader.clear(id);
    const book = await bookLoader.load(id);
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
  }
) {
  try {
    const book = await bookLoader.load(id);
    await Book.destroy({
      where: {
        id,
      },
    });

    bookLoader.clear(id);
    return book;
  } catch (error) {
    console.error("Error deleting book:", error);
    throw new Error("Failed to delete book");
  }
}
