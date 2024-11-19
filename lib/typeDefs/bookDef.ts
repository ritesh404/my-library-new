export const bookType = `
type Book implements Node {
    id: ID!
    title: String!
    description: String
    published_date: String
    author: Author
    image_url: String
  }`;

export const paginatedBookType = `
  type PaginatedBooks {
    books: [Book!]!
    count: Int!
  }
`;

export const bookQuery = `
books(limit: Int, offset: Int, id: ID, title: String, author_id: ID, published_date: String, author_name: String): PaginatedBooks`;

export const bookMutation = `
  createBook(title: String!, description: String, published_date: String, author_id: String!, image_url: String): Book
  updateBook(id: ID!, title: String, description: String, published_date: String, author_id: String, image_url: String): Book
  deleteBook(id: ID!): Book
`;
