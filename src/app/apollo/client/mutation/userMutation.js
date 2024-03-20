import { gql } from "@apollo/client";

export const SIGN_UP_USER = gql`
  mutation CreateUser($input: UserInput) {
    createUser(input: $input) {
      email
    }
  }
`;
export const SIGN_IN_USER = gql`
  mutation LoginUser($input: loginInput) {
    loginUser(input: $input) {
      token
    }
  }
`;

