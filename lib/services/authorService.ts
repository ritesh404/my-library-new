import { Op, WhereOptions } from "sequelize";
import {
  AuthorCreateParams,
  AuthorQueryParams,
  AuthorUpdateParams,
} from "../types/author";
import { Author } from "../models/author";

export async function getPaginatedAuthors({
  limit = 10,
  offset = 0,

  name,
  born_year,
}: AuthorQueryParams) {
  const where: WhereOptions = {};

  if (name)
    where.name = {
      [Op.iLike]: `%${name}%`,
    };

  if (born_year)
    where.born_date = {
      [Op.between]: [`${born_year}-01-01`, `${born_year}-12-31`],
    };

  const count = await Author.count({
    where,
  });

  const authors = await Author.findAll({
    where,
    limit,
    offset,
    order: [["name", "ASC"]], //TODO: enable sorting in UI
  });

  return {
    authors,
    count,
  };
}

export async function createAuthor({
  name,
  biography,
  born_date,
  image_url,
}: AuthorCreateParams) {
  const newAuthor = await Author.create({
    name,
    biography,
    born_date,
    image_url,
  });
  return newAuthor;
}

export async function updateAuthor({
  id,
  name,
  biography,
  born_date,
  image_url,
}: AuthorUpdateParams) {
  return await Author.update(
    {
      name,
      biography,
      born_date,
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

export async function deleteAuthor(id: string) {
  await Author.destroy({
    where: {
      id,
    },
  });
}
