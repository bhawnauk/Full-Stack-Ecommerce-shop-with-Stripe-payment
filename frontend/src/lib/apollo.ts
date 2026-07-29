import {
  ApolloClient,
  HttpLink,
  InMemoryCache,
} from "@apollo/client";

const httpLink = new HttpLink({
  uri: import.meta.env.DEV
    ? "http://localhost:4000/"
    : "https://full-stack-ecommerce-shop-with-stripe.onrender.com/",
});

export const apolloClient =
  new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache(),
  });
  
