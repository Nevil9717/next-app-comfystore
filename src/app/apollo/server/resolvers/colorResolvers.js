import { Color } from "../../../utils/models";

const createColor = async (_, { colorName }) => {
  try {
    const colorExists = await Color.findOne({ colorName });
    if (colorExists) return new Error("Color already exists");
    const color = await Color.create({ colorName });
    if (!color) return new Error("Error during color creation");
    return color;
  } catch (error) {
    return new Error("Error during color creation", error);
  }
};
const getColor = async () => {
  try {
    const color = await Color.find();
    if (!color) return new Error("color not found");
    return color;
  } catch (error) {
    return new Error("Error during fetching color", error);
  }
};
const getSingleColor = async (_, { _id }) => {
  try {
    const color = await Color.findOne({ _id });
    if (!color) return new Error("color not found");
    return color;
  } catch (error) {
    return new Error("Error during fetching color", error);
  }
};

export const colorResolvers = {
  Query: {
    getColor,
    getSingleColor,
  },
  Mutation: {
    createColor,
  },
};
