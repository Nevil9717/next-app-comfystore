import gql from "graphql-tag";

export const orderTypeDefs = gql`
  type Order {
    _id: ID
    userId: ID
    customerDetails: customerDetails
    address: address
    paymentDetails: paymentDetails
    products: [products]
    orderDate: String
  }
  input customerDetailsInput {
    name: String
    email: String
  }
  type customerDetails {
    name: String
    email: String
  }
  input addressInput {
    shippingAddress: String
    city: String
    state: String
    postalCode: String
    country: String
  }
  type address {
    shippingAddress: String
    city: String
    state: String
    postalCode: String
    country: String
  }
  input paymentDetailsInput {
    paymentStatus: String
    paymentMethod: String
    amountTotal: String
    currency: String
  }
  type paymentDetails {
    paymentStatus: String
    paymentMethod: String
    amountTotal: String
    currency: String
  }
  input productsInput {
    productName: String
    productQuantity: Int
    productImage: String
    productPrice: Int
    productId: String
  }
  type products {
    productName: String
    productQuantity: Int
    productImage: String
    productPrice: Int
    productId: String
  }
  input OrderInput {
    products: [productsInput]
    customerDetails: customerDetailsInput
    address: addressInput
    paymentDetails: paymentDetailsInput
  }
  type Query {
    getOrdersByUser: [Order]
    getOrdersByAdmin: [Order]
    getSingleOrder(_id: ID!): Order
  }
  type Mutation {
    createOrder(input: OrderInput): Order
  }
`;
