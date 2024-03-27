import { Cart } from "../../../utils/models";
import { combineResolvers } from "graphql-resolvers";
import { isCustomer } from "../../../utils/auth";

const addToCart = async (_, { input }, { user }) => {
  try {
    if (user) {
      const userCart = await Cart.findOne({ userId: user._id });
      if (!userCart) {
        const newCart = await Cart.create({
          userId: user._id,
          products: [input],
        });
        return newCart;
      } else {
        const productExists = userCart.products.find(
          (product) => product.productId.toString() === input.productId
        );
        if (productExists) {
          productExists.productQuantity += input.productQuantity;
          await userCart.save();
          return userCart;
        }
        userCart.products.push(input);
        await userCart.save();
        return userCart;
      }
    } else {
      const productExists = await Cart.findOne({});
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

const getCart = combineResolvers(isCustomer, async (_, args, { user }) => {
  try {
    const cart = await Cart.findOne({ userId: user._id });
    if (!cart) return "Cart is empty";
    return cart;
  } catch (error) {
    return new Error(error);
  }
});
const deleteFromCart = async (_, { productId }) => {
  try {
    const deletedProduct = await Cart.findOneAndDelete({ productId });
    if (!deletedProduct) return "Product not found";
    return deletedProduct;
  } catch (error) {
    return new Error(error);
  }
};
const updateCartQuantity = async (
  _,
  { productId, productQuantity },
  { user }
) => {
  try {
    const updatedProduct = await Cart.findOneAndUpdate(
      { userId: user._id, products: { $elemMatch: { productId } } },
      { "products.$.productQuantity": productQuantity },
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
