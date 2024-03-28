import { gql } from "graphql-tag";

export const wishlistTypeDefs = gql`
  type Wishlist {
    id: ID!
    userId: ID!
    products: [Product]
  }
  input wishlistInput {
    products: ID
  }
  type Query {
    getWishlistByUser: Wishlist
  }
  type Mutation {
    addToWishlist(input: wishlistInput): Wishlist
    deleteFromWishlist(productId: ID): Wishlist
    clearWishlist: String
  }
`;
