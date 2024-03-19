import gql from "graphql-tag";

export const orderTypeDefs = gql`
  type Order {
    _id: ID
    personalDetail: personalDetail
    shippingAddress: shippingAddress
    paymentMethod: paymentMethod
    orderItems: [orderItems]
  }
  input personalDetailInput {
    firstName: String
    lastName: String
    email: String
    phone: String
  }
  type personalDetail {
    firstName: String
    lastName: String
    email: String
    phone: String
  }
  input shippingAddressInput {
    streetAddress: String
    city: String
    state: String
    zipCode: String
  }
  type shippingAddress {
    streetAddress: String
    city: String
    state: String
    zipCode: String
  }
  input paymentMethodInput {
    cardNumber: String
    exp: String
    cvv: Int
  }
  type paymentMethod {
    cardNumber: Int
    exp: String
    cvv: Int
  }
  input orderItemsInput {
    productName: String
    productQuantity: Int
    productImage: String
    productPrice: Int
    productId: String
  }
  type orderItems {
    productName: String
    productQuantity: Int
    productImage: String
    productPrice: Int
    productId: String
  }
  input OrderInput {
    orderItems: [orderItemsInput]
    personalDetail: personalDetailInput
    shippingAddress: shippingAddressInput
    paymentMethod: paymentMethodInput
  }
  type Query {
    getOrders: [Order]
    getSingleOrder(_id: ID!): Order
  }
  type Mutation {
    createOrder(input: OrderInput): Order
  }
`;
