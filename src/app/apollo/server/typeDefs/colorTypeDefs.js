import gql from "graphql-tag";

export const colorTypeDefs = gql`
  type Color {
    _id: ID
    colorName: String
  }
  type Query {
    getColor: [Color]
    getSingleColor(_id: ID): Color
  }
  type Mutation {
    createColor(colorName: String): Color
  }
`;
