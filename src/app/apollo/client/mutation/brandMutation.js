import { gql } from "@apollo/client";

export const CREATE_BRAND = gql`
  mutation Mutation($brandName: String) {
    createBrand(brandName: $brandName) {
      _id
      brandName
    }
  }
`;
export const UPDATE_BRAND = gql`
  mutation Mutation($id: ID, $brandName: String) {
    updateBrand(_id: $id, brandName: $brandName) {
      _id
      brandName
    }
  }
`;
