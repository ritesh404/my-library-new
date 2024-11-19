import { Op, WhereOptions } from "sequelize";
import { Author } from "../models/author";
import {
  BookCreateParams,
  BookQueryParams,
  BookUpdateParams,
} from "../types/book";
import { Book } from "../models/book";

export async function getPaginatedBooks({
  limit = 10,
  offset = 0,
  title,
  author_id,
  published_date,
  author_name,
}: BookQueryParams) {
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
    order: [["published_date", "DESC"]], // TODO: enable sorting in UI
  });

  return {
    books,
    count,
  };
}

export async function createBook({
  title,
  description,
  published_date,
  author_id,
  image_url,
}: BookCreateParams) {
  const newBook = await Book.create({
    title,
    description,
    published_date,
    author_id,
    image_url,
  });

  return newBook;
}

export async function updateBook({
  id,
  title,
  description,
  published_date,
  author_id,
  image_url,
}: BookUpdateParams) {
  return await Book.update(
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
      returning: true,
    }
  );
}

export async function deleteBook(id: string) {
  await Book.destroy({
    where: {
      id,
    },
  });
}
