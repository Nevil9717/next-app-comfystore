import { gql } from "@apollo/client";

export const CREATE_BRAND = gql`
  mutation Mutation($brandName: String) {
    createBrand(brandName: $brandName) {
      _id
      brandName
    }
  }
`;
