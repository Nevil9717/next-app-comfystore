import gql from "graphql-tag";

export const cartTypeDefs = gql`
  type Cart {
    _id: ID
    userId: ID
    products: [cartProductsResult]
  }
  input cartProductInput {
    products: [CartInput]
  }
  type cartProductsResult {
    productId: ID
    productName: String
    productPrice: Float
    productImage: String
    productQuantity: Int
  }
  input CartInput {
    productId: ID
    productName: String
    productPrice: Float
    productImage: String
    productQuantity: Int
  }
  type Query {
    getCart: [Cart]
  }
  type Mutation {
    addToCart(input: cartProductInput): Cart
    deleteFromCart(productId: ID): Cart
    updateCartQuantity(productId: ID, productQuantity: Int): Cart
    clearCart: String
  }
`;
