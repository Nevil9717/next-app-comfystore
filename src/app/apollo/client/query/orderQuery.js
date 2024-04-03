import { gql } from "@apollo/client";

export const GET_ORDER_BY_ADMIN = gql`
  query GetOrdersByAdmin {
    getOrdersByAdmin {
      _id
      userId
      address {
        state
        city
        shippingAddress
        postalCode
        country
      }
      customerDetails {
        email
        name
      }
      paymentDetails {
        currency
        amountTotal
        paymentMethod
        paymentStatus
      }
      products {
        productId
        productPrice 
        productImage
        productQuantity
        productName
      }
      orderDate
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

export const GET_SINGLE_ORDER = gql`
  query GetSingleOrder($id: ID!) {
    getSingleOrder(_id: $id) {
      _id
      address {
        state
        shippingAddress
        postalCode
        country
        city
      }
      customerDetails {
        email
        name
      }
      orderDate
      paymentDetails {
        paymentMethod
        currency
        amountTotal
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
