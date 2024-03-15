import { gql } from "@apollo/client";

export const GET_ALL_PRODUCTS = gql`
  query GetProducts {
    getProducts {
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
        _id
        catagoriesName
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
export const GET_ALL_BRANDS = gql`
  query GetBrand {
    getBrand {
      _id
      brandName
    }
  }
`;
export const GET_ALL_CATEGORIES = gql`
  query GetCatagories {
    getCatagories {
      _id
      catagoriesName
    }
  }
`;
export const GET_CART = gql`
  query GetCart {
    getCart {
      _id
      productId
      productImage
      productName
      productPrice
      productQuantity
    }
  }
`;
