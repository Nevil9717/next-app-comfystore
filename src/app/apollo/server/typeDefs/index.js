import { mergeTypeDefs } from "@graphql-tools/merge";
import { productTypeDefs } from "./productTypeDefs";
import { brandTypeDefs } from "./brandTypeDefs";
import { catagoriesTypeDefs } from "./catagoriesTypeDefs";
import { colorTypeDefs } from "./colorTypeDefs";
import { cartTypeDefs } from "./cartTypeDefs";
import { orderTypeDefs } from "./orderTypeDefs";

const typeDefs = mergeTypeDefs([
  productTypeDefs,
  brandTypeDefs,
  catagoriesTypeDefs,
  colorTypeDefs,
  cartTypeDefs,
  orderTypeDefs
]);

export default typeDefs;
