import { Brand } from "../../../utils/models";

const createBrand = async (_, { brandName }) => {
  try {
    const brandExists = await Brand.findOne({ brandName });
    if (brandExists) return new Error("Brand already exists");
    const brand = await Brand.create({ brandName });
    if (!brand) return new Error("Error during brand creation");
    return brand;
  } catch (error) {
    return new Error("Error during brand creation", error);
  }
};
const getSingleBrand = async (_, { _id }) => {
  try {
    const brand = await Brand.findOne({ _id });
    if (!brand) return new Error("brand not found");
    return brand;
  } catch (error) {
    return new Error("Error during fetching brand", error);
  }
};

const getBrand = async () => {
  try {
    const brand = await Brand.find();
    if (!brand) return new Error("brand not found");
    return brand;
  } catch (error) {
    return new Error("Error during fetching brand", error);
  }
};
export const brandResolvers = {
  Query: {
    getBrand,
    getSingleBrand,
  },
  Mutation: {
    createBrand,
  },
};
