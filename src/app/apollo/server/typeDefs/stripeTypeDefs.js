import { gql } from "graphql-tag";

export const stripeTypeDefs = gql`
  type PaymentSession {
    sessionId: String
  }

  type Mutation {
    createPaymentSession: PaymentSession
  }
`;
