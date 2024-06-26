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
      roleName
    }
  }
`;
export const VERIFY_USER = gql`
  mutation VerifyUser($input: verifyInput) {
    verifyUser(input: $input) {
      isVerified
      firstName
    }
  }
`;
export const RESEND_OTP = gql`
  mutation ResendOTP($email: String) {
    resendOTP(email: $email) {
      otpCode
    }
  }
`;
