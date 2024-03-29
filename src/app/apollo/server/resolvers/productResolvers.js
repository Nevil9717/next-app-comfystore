import { Product } from "../../../utils/models";
import { PubSub } from "graphql-subscriptions";

const pubsub = new PubSub();
const createProduct = async (_, { input }) => {
  try {
    const skuExists = await Product.findOne({ sku: input.sku });
    if (skuExists) throw new Error("Product with this sku already exists");
    const product = await Product.create(input);
    if (!product) throw new Error("Error during product creation");
    return product;
  } catch (error) {
    return new Error("Error during product creation", error);
  }
};
const getProducts = async () => {
  try {
    const products = await Product.find().populate([
      { path: "category", select: "catagoriesName" },
      { path: "brand", select: "brandName" },
    ]);
    pubsub.publish("HELLO", {
      hello: {
        author: "Ali Baba",
        comment: "Open sesame",
      },
    });
    if (!products) return new Error("product not found");
    return products;
  } catch (error) {
    return new Error("Error during fetching products", error);
  }
};
const getSingleProduct = async (_, { _id }) => {
  try {
    const product = await Product.findOne({ _id }).populate([
      { path: "category", select: "catagoriesName" },
      { path: "brand", select: "brandName" },
    ]);
    if (!product) return new Error("product not found");
    return product;
  } catch (error) {
    return new Error("Error during fetching product", error);
  }
};
export const productResolvers = {
  Query: {
    getProducts,
    getSingleProduct,
  },
  Mutation: {
    createProduct,
  },
  Subscription: {
    hello: {
      subscribe: () => pubsub.asyncIterator(["HELLO"]),
    },
  },
};
