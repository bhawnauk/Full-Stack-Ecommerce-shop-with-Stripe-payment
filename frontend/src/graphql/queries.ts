import { gql } from "@apollo/client";

export const GET_PRODUCTS = gql`
  query GetProducts {
    products {
      id
      name
      description
      price
      image
      category
    }
  }
`;

export const GET_PRODUCT = gql`
  query GetProduct($id: ID!) {
    product(id: $id) {
      id
      name
      description
      price
      image
      category
    }
  }
`;

export const CREATE_CHECKOUT_SESSION = gql`
  mutation CreateCheckoutSession(
    $items: [CheckoutItemInput!]!
  ) {
    createCheckoutSession(items: $items) {
      id
      url
    }
  }
`;

export const CREATE_PAID_ORDER = gql`
  mutation CreatePaidOrder($sessionId: ID!) {
    createPaidOrder(sessionId: $sessionId) {
      id
      status
      total
    }
  }
`;