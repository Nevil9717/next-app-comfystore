import { User } from "./models";
import { getRole } from "./getRole";
import { skip } from "graphql-resolvers";

export const isAdmin = async (_, args, { user }) => {
  try {
    const userData = await User.findById(user._id);
    if (!userData) return new Error("Not Authenticated");
    const roleId = await getRole("Admin");
    if (!userData.role.equals(roleId)) return new Error("Not Authorized");
    skip;
  } catch (error) {
    return new Error("Error while Authentication", error);
  }
};
export const isCustomer = async (_, args, { user }) => {
  try {
    const userData = await User.findById(user._id);
    if (!userData) return new Error("Not Authenticated");
    const roleId = await getRole("Customer");
    if (!userData.role.equals(roleId)) return new Error("Not Authorized");
    skip;
  } catch (error) {
    return new Error("Error while Authentication");
  }
};
export const isSeller = async (_, args, { user }) => {
  try {
    const userData = await User.findById(user._id, { password: 0 });
    if (!userData) return new Error("Not Authenticated");
    const roleId = await getRole("Seller");
    if (!userData.role.equals(roleId)) return new Error("Not Authorized");
    skip;
  } catch (error) {
    return new Error("Error while Authentication");
  }
};
