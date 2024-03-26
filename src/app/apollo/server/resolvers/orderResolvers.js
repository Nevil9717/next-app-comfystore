import { isAdmin, isCustomer } from "../../../../app/utils/auth";
import { Order } from "../../../utils/models";
import { combineResolvers } from "graphql-resolvers";

const getOrders = combineResolvers(isAdmin, async () => {
  try {
    const orders = await Order.find();
    if (!orders) return new Error("Orders not found");
    return orders;
  } catch (error) {
    return new Error("Error during fetching orders", error);
  }
});
const getSingleOrder = async (_, { _id }) => {
  try {
    const order = await Order.findById(_id);
    if (!order) return new Error("Order not found");
    return order;
  } catch (error) {
    return new Error("Error during fetching single order", error);
  }
};
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
    getOrders,
    getSingleOrder,
  },
  Mutation: {
    createOrder,
  },
};
