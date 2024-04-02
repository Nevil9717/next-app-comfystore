import { gql } from "@apollo/client";

// change the query to get all products
export const GET_ALL_PRODUCTS = gql`
  query GetAllProducts($input: getAllProductsInput) {
    getAllProducts(input: $input) {
      _id
      productName
      description
      rating
      ratingCount
      price
      stock
      sku
      brand {
        brandName
        _id
      }
      category {
        catagoriesName
        _id
      }
      pictures
      freeShipping
    }
  }
`;

export const GET_PRODUCT_BY_ID = gql`
  query GetSingleProduct($id: ID) {
    getSingleProduct(_id: $id) {
      _id
      productName
      description
      rating
      ratingCount
      price
      stock
      sku
      brand {
        _id
        brandName
      }
      category {
        catagoriesName
        _id
      }
      pictures
      freeShipping
    }
  }
`;
export const GET_CART = gql`
  query GetCart {
    getCart {
      _id
      products {
        productName
        productImage
        productId
        productPrice
        productQuantity
      }
      userId
    }
  }
`;
