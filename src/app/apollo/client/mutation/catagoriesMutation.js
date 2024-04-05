import { gql } from "@apollo/client";

export const CREATE_CATEGORY = gql`
  mutation CreateCatagories($catagoriesName: String) {
    createCatagories(catagoriesName: $catagoriesName) {
      catagoriesName
      _id
    }
  }
`;
export const UPDATE_CATEGORY = gql`
  mutation UpdateCatagories($id: ID, $catagoriesName: String) {
    updateCatagories(_id: $id, catagoriesName: $catagoriesName) {
      _id
      catagoriesName
    }
  }
`;
