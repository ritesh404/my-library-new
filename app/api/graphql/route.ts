// pages/api/graphql.js
import { connectToMongo } from "@/lib/db/mongo";
import { connectToPostgres } from "@/lib/db/postgres";
import {
  authorQueryResolver,
  createAuthorMutationResolver,
  deleteAuthorMutationResolver,
  updateAuthorMutationResolver,
} from "@/lib/resolvers/author";
import {
  bookQueryResolver,
  createBookMutationResolver,
  deleteBookMutationResolver,
  updateBookMutationResolver,
} from "@/lib/resolvers/book";
import {
  createReviewMutationResolver,
  reviewQueryResolver,
} from "@/lib/resolvers/review";
import {
  authorMutation,
  authorQuery,
  authorType,
  paginatedAuthorType,
} from "@/lib/typeDefs/author";
import {
  bookMutation,
  bookQuery,
  bookType,
  paginatedBookType,
} from "@/lib/typeDefs/book";
import {
  reviewMutation,
  reviewQuery,
  reviewResponseType,
  reviewType,
} from "@/lib/typeDefs/review";
import { once } from "@/lib/util/once";
import { ApolloServer } from "@apollo/server";
import { startServerAndCreateNextHandler } from "@as-integrations/next";

const typeDefs = `
  ${bookType}
  ${paginatedBookType}
  ${authorType}
  ${paginatedAuthorType}
  ${reviewType}
  ${reviewResponseType}

  type Query {
    ${bookQuery}
    ${authorQuery}
    ${reviewQuery}
   }
  
  type Mutation {
    ${bookMutation}
    ${authorMutation}
    ${reviewMutation}
  }
`;

const resolvers = {
  Query: {
    books: bookQueryResolver,
    authors: authorQueryResolver,
    reviews: reviewQueryResolver,
  },
  Mutation: {
    createBook: createBookMutationResolver,
    updateBook: updateBookMutationResolver,
    deleteBook: deleteBookMutationResolver,
    createAuthor: createAuthorMutationResolver,
    updateAuthor: updateAuthorMutationResolver,
    deleteAuthor: deleteAuthorMutationResolver,
    createReview: createReviewMutationResolver,
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: true,
});

const startUp = once(async function _startUp() {
  await connectToPostgres();
  await connectToMongo();
  const handler = startServerAndCreateNextHandler(server);
  return handler;
});

export async function GET(request: Request) {
  const handler = await startUp();
  return handler(request);
}

export async function POST(request: Request) {
  const handler = await startUp();
  return handler(request);
}
