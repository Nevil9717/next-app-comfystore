import gql from "graphql-tag";

export const colorTypeDefs = gql`
  type Color {
    _id: ID
    colorName: String
    hexCode: String
  }
  input addColorInput {
    colorName: String
    hexCode: String
  }
  type Query {
    getAllColor: [Color]
    getSingleColor(_id: ID): Color
  }
  type Mutation {
    createColor(input: addColorInput): Color
    updateColor(_id: ID, input: addColorInput): Color
  }
`;
