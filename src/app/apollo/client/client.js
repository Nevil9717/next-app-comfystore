"use client";

import {
  ApolloClient,
  InMemoryCache,
  createHttpLink,
  split,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { createClient } from "graphql-ws";
import { getMainDefinition } from "@apollo/client/utilities";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";

const GRAPHQL_ENDPOINT = "/api/graphql";

// Create an HTTP link
const httpLink = createHttpLink({
  uri: GRAPHQL_ENDPOINT,
  credentials: "include",
});

const wsLink = new GraphQLWsLink(
  createClient({
    url: "ws://localhost:3000/api/graphql",
  })
);
const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("token") || "";
  return {
    headers: {
      ...headers,
      Authorization: token,
    },
  };
});

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  wsLink,
  authLink.concat(httpLink)
);

const client = new ApolloClient({
  link: typeof window === "undefined" ? authLink.concat(httpLink) : splitLink,
  cache: new InMemoryCache(),
});

export default client;
