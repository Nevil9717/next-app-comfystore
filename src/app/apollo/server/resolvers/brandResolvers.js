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

const getAllBrands = async () => {
  try {
    const brand = await Brand.find();
    if (!brand) return new Error("brand not found");
    return brand;
  } catch (error) {
    return new Error("Error during fetching brand", error);
  }
};
const updateBrand = async (_, { _id, brandName }) => {
  try {
    const brand = await Brand.findOneAndUpdate(
      { _id },
      { brandName },
      { new: true }
    );
    if (!brand) return new Error("brand not found");
    return brand;
  } catch (error) {
    return new Error("Error during updating brand", error);
  }
};
export const brandResolvers = {
  Query: {
    getAllBrands,
    getSingleBrand,
  },
  Mutation: {
    createBrand,
    updateBrand,
  },
};
