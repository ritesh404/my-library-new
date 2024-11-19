"use client";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider as Provider,
} from "@apollo/client";

const client = new ApolloClient({
  uri: "/api/graphql",
  cache: new InMemoryCache(),
});

export default function ApolloProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Provider client={client}>{children}</Provider>;
}
