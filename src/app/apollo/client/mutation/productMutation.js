import { gql } from "@apollo/client";

export const DELETE_FROM_CART = gql`
  mutation DeleteFromCart($productId: ID) {
    deleteFromCart(productId: $productId) {
      _id
      productId
      productName
      productPrice
      productImage
      productQuantity
    }
  }
`;
export const ADD_TO_CART = gql`
  mutation Mutation($input: CartInput) {
    addToCart(input: $input) {
      _id
      products {
        productQuantity
        productPrice
        productName
        productImage
        productId
      }
      userId
    }
  }
`;
export const UPDATE_CART = gql`
  mutation Mutation($productId: ID, $productQuantity: Int) {
    updateCartQuantity(
      productId: $productId
      productQuantity: $productQuantity
    ) {
      _id
      userId
      products {
        productQuantity
        productPrice
        productName
        productImage
        productId
      }
    }
  }
`;
export const CLEAR_CART = gql`
  mutation Mutation {
    clearCart
  }
`;
