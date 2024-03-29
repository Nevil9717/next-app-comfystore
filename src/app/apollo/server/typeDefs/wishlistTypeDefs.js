import { gql } from "graphql-tag";

export const wishlistTypeDefs = gql`
  type Wishlist {
    id: ID!
    userId: ID!
    products: [Product]
  }
  type Query {
    getWishlistByUser: Wishlist
  }
  type Mutation {
    addToWishlist(productId: ID): Wishlist
    deleteFromWishlist(productId: ID): Wishlist
    clearWishlist: String
  }
`;
