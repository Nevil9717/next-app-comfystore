import { ApolloServer } from "@apollo/server";
import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { ApolloError } from "apollo-server-core";
import jwt from "jsonwebtoken";
import { headers } from "next/headers";
import resolvers from "../../apollo/server/resolvers";
import typeDefs from "../../apollo/server/typeDefs";
import { connectDBHandler } from "../../utils/db/connection";

import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import { useServer } from "graphql-ws/lib/use/ws";
import { createServer } from "http";
import { WebSocketServer } from "ws";

const schema = makeExecutableSchema({ typeDefs, resolvers });

const httpServer = createServer();

const wsServer = new WebSocketServer({
  server: httpServer,
  path: "/api/graphql",
});
const serverCleanup = useServer({ schema }, wsServer);

const apolloServer = new ApolloServer({
  schema,
  plugins: [
    ApolloServerPluginDrainHttpServer({ httpServer }),
    {
      async serverWillStart() {
        return {
          async drainServer() {
            await serverCleanup.dispose();
          },
        };
      },
    },
  ],
  formatError: (error) => {
    const message = error.message
      .replace("SequelizeValidationError: ", "")
      .replace("Validation error: ", "")
      .replace("Context creation failed: ", "")
      .replace("Unexpected error value: ", "");
    return { ...error, message };
  },
});

const handler = connectDBHandler(
  startServerAndCreateNextHandler(apolloServer, {
    context: async ({ req, res }) => {
      const token = headers().get("authorization");
      if (!token) return new Error("Not authenticated");
      try {
        const user = jwt.verify(
          token,
          process.env.JWT_SECRET_KEY,
          (err, res) => {
            if (err) {
              console.log("token expired");
              throw new ApolloError(
                "Invalid or expired token.",
                "UNAUTHENTICATED"
              );
            }
            return res;
          }
        );
        return { user };
      } catch (error) {
        console.log("error msg : " + error.message);
        // throw new ApolloError("Invalid or expired token.", "UNAUTHENTICATED");
      }
    },
  })
);

export { handler as GET, handler as POST };
