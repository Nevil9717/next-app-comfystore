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
  async (_, { productId }, { user }) => {
    try {
      const userWishList = await Wishlist.findOne({ userId: user._id });
      if (!userWishList) {
        const newWishlist = await Wishlist.create({
          userId: user._id,
          products: [productId],
        });
        return newWishlist;
      } else {
        const productExists = userWishList.products.find((product) => {
          return product.toString() === productId;
        });
        if (productExists) {
          throw new Error("Product already exists in wishlist");
        }
        userWishList.products.push(productId);
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
      const wishlist = await Wishlist.findOne({ userId: user._id });
      if (!wishlist) throw new Error("Wishlist not found");
      wishlist.products = wishlist.products.filter((product) => {
        return product.toString() !== productId;
      });
      await wishlist.save();
      return wishlist;
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
