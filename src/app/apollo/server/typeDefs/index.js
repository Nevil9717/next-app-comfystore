import { mergeTypeDefs } from "@graphql-tools/merge";
import { productTypeDefs } from "./productTypeDefs";
import { brandTypeDefs } from "./brandTypeDefs";
import { catagoriesTypeDefs } from "./catagoriesTypeDefs";
// import { colorTypeDefs } from "./colorTypeDefs";
import { cartTypeDefs } from "./cartTypeDefs";
import { orderTypeDefs } from "./orderTypeDefs";
import { userTypeDefs } from "./userTypeDefs";
import { stripeTypeDefs } from "./stripeTypeDefs";
import { wishlistTypeDefs } from "./wishlistTypeDefs";

const typeDefs = mergeTypeDefs([
  productTypeDefs,
  brandTypeDefs,
  catagoriesTypeDefs,
  // colorTypeDefs,
  cartTypeDefs,
  orderTypeDefs,
  userTypeDefs,
  stripeTypeDefs,
  wishlistTypeDefs,
]);

export default typeDefs;
