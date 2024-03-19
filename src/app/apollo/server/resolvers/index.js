import { mergeResolvers } from "@graphql-tools/merge";
import { productResolvers } from "./productResolvers";
import { brandResolvers } from "./brandResolvers";
import { catagoriesResolvers } from "./catagoriesResolvers";
import { colorResolvers } from "./colorResolvers";
import { cartResolvers } from "./cartResolvers";
import { orderResolvers } from "./orderResolvers";
import { userResolvers } from "./userResolvers";

const resolvers = mergeResolvers([
  productResolvers,
  brandResolvers,
  catagoriesResolvers,
  colorResolvers,
  cartResolvers,
  orderResolvers,
  userResolvers,
]);

export default resolvers;
