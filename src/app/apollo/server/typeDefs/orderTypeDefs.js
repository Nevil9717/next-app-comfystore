import gql from "graphql-tag";

export const orderTypeDefs = gql`
  personalDetail: {
    firstName: String,
    lastName: String,
    email: String,
    phone: String,
  },
  shippingAddress: {
    streetAddress: String,
    city: String,
    state: String,
    zipCode: String,
  },
  paymentMethod: {
    cardNumber: Number,
    exp: String,
    cvv: Number,
  },
`;
