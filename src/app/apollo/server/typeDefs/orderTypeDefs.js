import gql from "graphql-tag";

export const orderTypeDefs = gql`
  type Order {
    _id: ID
    customerDetails: customerDetails
    address: address
    paymentMethod: paymentMethod
    orderItems: [orderItems]
  }
  input customerDetailsInput {
    Name: String
    email: String
  }
  type customerDetails {
    Name: String
    email: String
  }
  input addressInput {
    line1: String
    line2: String
    city: String
    state: String
    postalCode: String
    country: String
  }
  type address {
    line1: String
    line2: String
    city: String
    state: String
    postalCode: String
    country: String
  }
  input paymentDetailsInput {
    paymentStatus: String
    amountTotal: String
  }
  type paymentDetails {
    paymentStatus: String
    amountTotal: String
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
