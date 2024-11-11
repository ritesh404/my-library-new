export const authorType = `
 type Author {
    id: ID!
    name: String!
    biography: String
    born_date: String
    books: [Book]
  }`;

export const paginatedAuthorType = `
  type PaginatedAuthors {
    authors: [Author!]!
    count: Int!
  }
`;

export const authorQuery = `
authors(limit: Int, offset: Int, id: ID, name: String, born_year: String): PaginatedAuthors`;

export const authorMutation = `
  createAuthor(name: String!, biography: String, born_date: String): Author
  updateAuthor(id: ID!, name: String, biography: String, born_date: String): Author
  deleteAuthor(id: ID!): Author
`;
