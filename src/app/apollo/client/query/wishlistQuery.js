import { gql } from "@apollo/client";

export const GET_WISHLIST_BY_USER = gql`
  query GetWishlistByUser {
    getWishlistByUser {
      id
      products {
        category {
          _id
          catagoriesName
        }
        brand {
          _id
          brandName
        }
        _id
        description
        freeShipping
        pictures
        price
        productName
        rating
        ratingCount
        sku
        stock
      }
      userId
    }
  }
`;
