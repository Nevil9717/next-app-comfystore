import { Color } from "../../../utils/models";

const createColor = async (_, { input }) => {
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
const updateColor = async (_, { _id, input }) => {
  try {
    const color = await Color.findOneAndUpdate({ _id }, input, { new: true });
    if (!color) return new Error("Color not found");
    return color;
  } catch (error) {
    return new Error("Error during color update", error);
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
    updateColor,
  },
};
