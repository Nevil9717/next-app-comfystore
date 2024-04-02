import { gql } from "@apollo/client";

export const GET_ALL_CATAGORIES = gql`
  query GetAllCatagories {
    getAllCatagories {
      _id
      catagoriesName
    }
  }
`;
