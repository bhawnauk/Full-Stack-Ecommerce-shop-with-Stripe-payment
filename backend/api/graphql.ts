import { ApolloServer } from "@apollo/server";
import type { VercelRequest, VercelResponse } from "@vercel/node";

import {
  typeDefs,
  resolvers,
} from "../src/graphql/schema";

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

let serverStarted = false;

export default async function handler(
  req: VercelRequest,
  res: VercelResponse,
) {
  if (!serverStarted) {
    await server.start();
    serverStarted = true;
  }

  const url = new URL(
    req.url || "/api/graphql",
    `http://${req.headers.host}`,
  );

  const httpRequest = {
    method: req.method || "GET",
    headers: req.headers as Record<
      string,
      string
    >,
    body: req.body,
  };

  const response =
    await server.executeHTTPGraphQLRequest({
      httpGraphQLRequest: {
        method: httpRequest.method as
          | "GET"
          | "POST",
        headers: new Map(
          Object.entries(
            httpRequest.headers,
          ).map(([key, value]) => [
            key,
            Array.isArray(value)
              ? value.join(",")
              : value || "",
          ]),
        ),
        search: url.search,
        body: httpRequest.body,
      },
      context: async () => ({}),
    });

  res.status(
    response.body.kind === "complete"
      ? 200
      : 200,
  );

  response.headers.forEach(
    (value, key) => {
      res.setHeader(key, value);
    },
  );

  if (
    response.body.kind === "complete"
  ) {
    res.send(response.body.string);
  }
}