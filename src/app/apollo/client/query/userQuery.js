import { gql } from "@apollo/client";

export const ALL_USERS = gql`
  query GetUsers {
    getUsers {
      _id
      firstName
      lastName
      email
      gender
      password
      role {
        roleName
        _id
      }
      isVerified
      otpCode
    }
  }
`;
