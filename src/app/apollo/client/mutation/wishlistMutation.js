import { gql } from "@apollo/client";

export const ADD_TO_WISHLIST = gql`
  mutation AddToWishlist($productId: ID) {
    addToWishlist(productId: $productId) {
      id
      userId
      products {
        _id
      }
    }
  }
`;

export const REMOVE_FROM_WISHLIST = gql`
  mutation Mutation($productId: ID) {
    deleteFromWishlist(productId: $productId) {
      id
      products {
        _id
        brand {
          brandName
          _id
        }
        category {
          catagoriesName
          _id
        }
        description
        freeShipping
        pictures
        productName
        price
        rating
        ratingCount
        sku
        stock
      }
      userId
    }
  }
`;
export const CLEAR_WISHLIST = gql`
  mutation Mutation {
    clearWishlist
  }
`;
