import gql from "graphql-tag";

export const productTypeDefs = gql`
  type Product {
    _id: ID
    productName: String
    description: String
    rating: Int
    ratingCount: Int
    price: Int
    stock: Int
    sku: String
    brand: Brand
    #colors: [Color]
    category: Catagories
    pictures: [String]
    freeShipping: Boolean
  }
  input productInput {
    productName: String
    description: String
    price: Int
    stock: Int
    sku: String
    brand: ID
    #colors: [ID]
    category: ID
    pictures: [String]
    freeShipping: Boolean
  }

  type Query {
    getProducts: [Product]
    getSingleProduct(_id: ID): Product
  }

  type Mutation {
    createProduct(input: productInput): Product
  }

  type Subscription {
    hello: String
  }
`;
