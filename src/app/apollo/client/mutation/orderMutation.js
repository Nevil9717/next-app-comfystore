import { gql } from "@apollo/client";

export const CREATE_ORDER = gql`
  mutation CreateOrder($input: OrderInput) {
    createOrder(input: $input) {
      _id
      orderItems {
        productId
        productImage
        productName
        productPrice
        productQuantity
      }
      paymentMethod {
        cardNumber
        cvv
        exp
      }
      personalDetail {
        email
        firstName
        lastName
        phone
      }
      shippingAddress {
        city
        streetAddress
        state
        zipCode
      }
    }
  }
`;
