import { combineResolvers } from "graphql-resolvers";
import { isCustomer } from "../../../../app/utils/auth";
import { Wishlist } from "../../../utils/models";

const getWishlistByUser = combineResolvers(
  isCustomer,
  async (_, args, { user }) => {
    try {
      const wishlist = await Wishlist.findOne({ userId: user._id }).populate(
        "products"
      );
      if (!wishlist) return new Error("Wishlist not found");
      return wishlist;
    } catch (error) {
      return new Error("Error during fetching wishlist", error);
    }
  }
);
const addToWishlist = combineResolvers(
  isCustomer,
  async (_, { input }, { user }) => {
    try {
      const userWishList = await Wishlist.findOne({ userId: user._id });
      if (!userWishList) {
        const newWishlist = await Wishlist.create({
          userId: user._id,
          products: [input],
        });
        return newWishlist;
      } else {
        const productExists = userWishList.products.find(
          (product) => product.productId.toString() === input.productId
        );
        if (productExists) {
          return new Error("Product already exists in wishlist");
        }
        userWishList.products.push(input);
        await userWishList.save();
        return userWishList;
      }
    } catch (error) {
      return new Error("Error during adding to wishlist", error);
    }
  }
);
const deleteFromWishlist = combineResolvers(
  isCustomer,
  async (_, { productId }, { user }) => {
    try {
      const deletedProduct = await Wishlist.findOneAndDelete({
        productId,
        userId: user._id,
      });
      if (!deletedProduct) return new Error("Product not found in wishlist");
      return deletedProduct;
    } catch (error) {
      return new Error("Error during deleting from wishlist", error);
    }
  }
);
const clearWishlist = combineResolvers(
  isCustomer,
  async (_, args, { user }) => {
    try {
      const deletedWishlist = await Wishlist.findOneAndDelete({
        userId: user._id,
      });
      if (!deletedWishlist) return new Error("Wishlist not found");
      return "Wishlist cleared successfully";
    } catch (error) {
      return new Error("Error during clearing wishlist", error);
    }
  }
);

export const wishlistResolvers = {
  Query: {
    getWishlistByUser,
  },
  Mutation: {
    addToWishlist,
    deleteFromWishlist,
    clearWishlist,
  },
};
