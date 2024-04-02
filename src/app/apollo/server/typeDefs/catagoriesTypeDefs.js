import gql from "graphql-tag";

export const catagoriesTypeDefs = gql`
  type Catagories {
    _id: ID
    catagoriesName: String
  }
  type Query {
    getAllCatagories: [Catagories]
    getSingleCatagories(_id: ID): Catagories
  }
  type Mutation {
    createCatagories(catagoriesName: String): Catagories
  }
`;
