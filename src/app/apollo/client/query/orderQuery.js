import { gql } from "@apollo/client";

export const GET_ORDER_BY_ADMIN = gql`
  query GetOrdersByAdmin {
    getOrdersByAdmin {
      _id
      address {
        postalCode
        shippingAddress
        state
        city
        country
      }
      customerDetails {
        name
        email
      }
      orderDate
      paymentDetails {
        paymentStatus
        currency
        paymentMethod
        amountTotal
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
export const GET_ORDER_BY_USER = gql`
  query GetOrdersByUser {
    getOrdersByUser {
      paymentDetails {
        paymentStatus
        paymentMethod
        currency
        amountTotal
      }
      _id
      address {
        postalCode
        city
        country
        shippingAddress
        state
      }
      customerDetails {
        name
        email
      }
      orderDate
      products {
        productQuantity
        productPrice
        productName
        productImage
        productId
      }
      userId
    }
  }
`;
