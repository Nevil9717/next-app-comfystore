import { gql } from "@apollo/client";

export const CREATE_CATEGORY = gql`
  mutation CreateCatagories($catagoriesName: String) {
    createCatagories(catagoriesName: $catagoriesName) {
      catagoriesName
      _id
    }
  }
`;
