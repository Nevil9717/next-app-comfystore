import { Cart, Order } from "../../../utils/models";

const getOrders = async () => {
  try {
    const orders = await Order.find();
    if (!orders) return new Error("Orders not found");
    return orders;
  } catch (error) {
    return new Error("Error during fetching orders", error);
  }
};
const getSingleOrder = async (_, { _id }) => {
  try {
    const order = await Order.findById(_id);
    if (!order) return new Error("Order not found");
    return order;
  } catch (error) {
    return new Error("Error during fetching single order", error);
  }
};
const createOrder = async (_, { input }) => {
  try {
    const order = await Order.create(input);
    return order;
  } catch (error) {
    return new Error("Error during creating order", error);
  }
};

export const orderResolvers = {
  Query: {
    getOrders,
    getSingleOrder,
  },
  Mutation: {
    createOrder,
  },
};
