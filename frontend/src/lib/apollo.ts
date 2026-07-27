import {
  ApolloClient,
  HttpLink,
  InMemoryCache,
} from "@apollo/client";

const httpLink = new HttpLink({
  uri: "Yhttps://full-stack-ecommerce-shop-with-stripe.onrender.com",
});

export const apolloClient =
  new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache(),
  });