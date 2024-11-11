import DataLoader from "dataloader";
import { Author } from "../models/author";
import { Author as AuthorType } from "../types/author";
import { Book } from "../models/book";

export const createAuthorLoader = () => {
  return new DataLoader(async (ids: readonly string[]) => {
    const authors = await Author.findAll({
      where: {
        id: ids,
      },
      include: [{ model: Book, as: "books" }],
    });

    const authorMap = authors.reduce((map, author) => {
      //@ts-expect-error - TS doesn't know about the id property on Author
      map[author.id] = author;
      return map;
    }, {} as Record<string, AuthorType>);
    return ids.map((id) => authorMap[id] || null);
  });
};
