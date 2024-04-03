import { combineResolvers } from "graphql-resolvers";
import { isAdmin, isCustomer } from "../../../../app/utils/auth";
import { Order } from "../../../utils/models";

const getOrdersByUser = combineResolvers(
  isCustomer,
  async (_, args, { user }) => {
    try {
      const orders = await Order.find({ userId: user._id });
      if (!orders) return new Error("Orders not found");
      return orders;
    } catch (error) {
      return new Error("Error during fetching orders", error);
    }
  }
);
const getOrdersByAdmin = async () => {
  try {
    const orders = await Order.find();
    if (!orders) return new Error("Orders not found");
    return orders;
  } catch (error) {
    return new Error("Error during fetching orders", error);
  }
};

const getSingleOrder = combineResolvers(
  isCustomer,
  async (_, { _id }, { user }) => {
    try {
      const order = await Order.findOne({ _id, userId: user._id });
      if (!order) return new Error("Order not found");
      return order;
    } catch (error) {
      return new Error("Error during fetching single order", error);
    }
  }
);
const createOrder = combineResolvers(
  isCustomer,
  async (_, { input }, { user }) => {
    try {
      const order = await Order(input);
      input.userId = user._id;
      order.save();
      return order;
    } catch (error) {
      return new Error("Error during creating order", error);
    }
  }
);

export const orderResolvers = {
  Query: {
    getOrdersByAdmin,
    getOrdersByUser,
    getSingleOrder,
  },
  Mutation: {
    createOrder,
  },
};
