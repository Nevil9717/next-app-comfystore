import { isCustomer } from "../../../../app/utils/auth";
import { Cart } from "../../../utils/models";
import { combineResolvers } from "graphql-resolvers";

const addToCart = async (_, { input }, { user }) => {
  try {
    if (user) {
      const productExists = await Cart.findOne({
        products: { $elemMatch: { productId: input.products.productId } },
        userId: user._id,
      });
      if (productExists) {
        productExists.products.productQuantity +=
          input.products.productQuantity;
        await productExists.save();
        return productExists;
      }
      const newCart = await Cart(input);
      newCart.userId = user._id;
      newCart.save();
      console.log("🚀 ~ addToCart ~ user newCart:", newCart);
      return newCart;
    } else {
      const productExists = await Cart.findOne({
        products: { $elemMatch: { productId: input.products.productId } },
      });
      if (productExists) {
        productExists.products.productQuantity +=
          input.products.productQuantity;
        await productExists.save();
        return productExists;
      }
      const newCart = await Cart(input);
      newCart.save();
      return newCart;
    }
  } catch (error) {
    return new Error(error);
  }
};

const getCart = async () => {
  try {
    const cart = await Cart.find();
    if (!cart) return "Cart is empty";
    return cart;
  } catch (error) {
    return new Error(error);
  }
};
const deleteFromCart = async (_, { productId }) => {
  try {
    const deletedProduct = await Cart.findOneAndDelete({ productId });
    if (!deletedProduct) return "Product not found";
    return deletedProduct;
  } catch (error) {
    return new Error(error);
  }
};
const updateCartQuantity = async (_, { productId, productQuantity }) => {
  try {
    const updatedProduct = await Cart.findOneAndUpdate(
      { productId },
      { productQuantity },
      { new: true }
    );
    if (!updatedProduct) return "Product not found";
    return updatedProduct;
  } catch (error) {
    return new Error(error);
  }
};
const clearCart = async () => {
  try {
    await Cart.deleteMany();
    return "Cart is cleared";
  } catch (error) {
    return new Error(error);
  }
};

export const cartResolvers = {
  Query: {
    getCart,
  },
  Mutation: {
    addToCart,
    deleteFromCart,
    updateCartQuantity,
    clearCart,
  },
};
