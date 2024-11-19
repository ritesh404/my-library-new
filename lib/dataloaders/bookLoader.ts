import DataLoader from "dataloader";
import { Book } from "../models/book";
import { Book as BookType } from "../types/book";

export const createBookLoader = () => {
  return new DataLoader(async (authorids: readonly string[]) => {
    const books = await Book.findAll({
      where: {
        author_id: authorids,
      },
    });

    const bookMap = books.reduce((map, book) => {
      //@ts-expect-error - TS doesn't know about the id property on Book
      if (Array.isArray(map[book.author_id])) map[book.author_id].push(book);
      //@ts-expect-error - TS doesn't know about the id property on Book
      else map[book.author_id] = [book];
      return map;
    }, {} as Record<string, BookType>);

    return authorids.map((id) => bookMap[id] || null);
  });
};
