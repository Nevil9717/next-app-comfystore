import { Catagories } from "../../../utils/models";

const createCatagories = async (_, { catagoriesName }) => {
  try {
    const catagoriesExist = await Catagories.findOne({ catagoriesName });
    if (catagoriesExist) return new Error("Catagories already exist");
    const catagories = await Catagories.create({ catagoriesName });
    if (!catagories) return new Error("Error during catagories creation");
    return catagories;
  } catch (error) {
    return new Error("Error during catagories creation", error);
  }
};
const getAllCatagories = async () => {
  try {
    const catagories = await Catagories.find();
    if (!catagories) return new Error("catagories not found");
    return catagories;
  } catch (error) {
    return new Error("Error during fetching catagories", error);
  }
};
const getSingleCatagories = async (_, { _id }) => {
  try {
    const catagories = await Catagories.findOne({ _id });
    if (!catagories) return new Error("catagories not found");
    return catagories;
  } catch (error) {
    return new Error("Error during fetching catagories", error);
  }
};

export const catagoriesResolvers = {
  Query: {
    getAllCatagories,
    getSingleCatagories,
  },
  Mutation: {
    createCatagories,
  },
};
