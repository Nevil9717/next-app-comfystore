import gql from "graphql-tag";

export const brandTypeDefs = gql`
  type Brand {
    _id: ID
    brandName: String
  }
  type Query {
    getBrand: [Brand]
    getSingleBrand(_id: ID): Brand
  }
  type Mutation {
    createBrand(brandName: String): Brand
  }
`;
