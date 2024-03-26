import { gql } from "@apollo/client";

export const CREATE_ORDER = gql`
  mutation Mutation($input: OrderInput) {
    createOrder(input: $input) {
      _id
      address {
        city
        country
        postalCode
        shippingAddress
        state
      }
      customerDetails {
        Name
        email
      }
      orderDate
      paymentDetails {
        amountTotal
        currency
        paymentMethod
        paymentStatus
      }
      products {
        productId
        productImage
        productName
        productPrice
        productQuantity
      }
      userId
    }
  }
`;
