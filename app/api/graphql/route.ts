import { createAuthorLoader } from "@/lib/dataloaders/authorLoader";
import { createBookLoader } from "@/lib/dataloaders/bookLoader";
import { createReviewLoader } from "@/lib/dataloaders/reviewLoader";
import { connectToMongo } from "@/lib/db/mongo";
import { connectToPostgres } from "@/lib/db/postgres";
import {
  authorBooksResolver,
  authorQueryResolver,
  createAuthorMutationResolver,
  deleteAuthorMutationResolver,
  updateAuthorMutationResolver,
} from "@/lib/resolvers/authorResolver";
import {
  bookAuthorResolver,
  bookQueryResolver,
  createBookMutationResolver,
  deleteBookMutationResolver,
  updateBookMutationResolver,
} from "@/lib/resolvers/bookResolver";
import {
  createReviewMutationResolver,
  reviewQueryResolver,
} from "@/lib/resolvers/reviewResolver";
import {
  authorMutation,
  authorQuery,
  authorType,
  paginatedAuthorType,
} from "@/lib/typeDefs/authorDef";
import {
  bookMutation,
  bookQuery,
  bookType,
  paginatedBookType,
} from "@/lib/typeDefs/bookDef";
import {
  reviewMutation,
  reviewQuery,
  reviewResponseType,
  reviewType,
} from "@/lib/typeDefs/reviewDef";
import { once } from "@/lib/util/once";
import { ApolloServer } from "@apollo/server";
import { startServerAndCreateNextHandler } from "@as-integrations/next";

const typeDefs = `
  interface Node {
    id: ID!
  }

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
  Book: {
    author: bookAuthorResolver,
  },
  Author: {
    books: authorBooksResolver,
  },
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
  const handler = startServerAndCreateNextHandler(server, {
    context: async () => {
      return {
        loaders: {
          authorLoader: createAuthorLoader(),
          bookLoader: createBookLoader(),
          reviewLoader: createReviewLoader(),
        },
      };
    },
  });
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
