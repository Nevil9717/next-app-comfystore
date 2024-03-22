import { gql } from "graphql-tag";

export const userTypeDefs = gql`
  type User {
    _id: ID
    firstName: String
    lastName: String
    email: String
    gender: genderOptions
    password: String
    role: RoleOptions
    isVerified: Boolean
    orders: [Order]
    otpCode: Int
  }
  type RoleOptions {
    _id: ID
    roleName: String
  }
  enum genderOptions {
    male
    female
  }

  input UserInput {
    firstName: String!
    lastName: String
    email: String!
    gender: genderOptions
    password: String
  }
  input loginInput {
    email: String!
    password: String!
  }
  input verifyInput {
    email: String
    otpCode: Int
  }
  type loginResult {
    token: String
  }
  type Query {
    getUsers: [User]
  }
  type Mutation {
    loginUser(input: loginInput): loginResult
    createUser(input: UserInput): User
    verifyUser(input: verifyInput): User
    resendOTP(email: String): User
  }
`;
