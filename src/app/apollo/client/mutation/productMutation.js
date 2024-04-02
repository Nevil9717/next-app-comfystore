import { gql } from "@apollo/client";

export const CREATE_PRODUCT = gql`
  mutation Mutation($input: productInput) {
    createProduct(input: $input) {
      productName
    }
  }
`;
