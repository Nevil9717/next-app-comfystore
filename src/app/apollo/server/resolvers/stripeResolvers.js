import { Cart } from "@/app/utils/models";
import { stripe } from "../../../../lib/stripe";
import { combineResolvers } from "graphql-resolvers";
import { isCustomer } from "../../../utils/auth";

const createPaymentSession = combineResolvers(
  isCustomer,
  async (_, args, { user }) => {
    try {
      const cartItems = await Cart.findOne({ userId: user._id });
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: cartItems?.products?.map((item) => ({
          price_data: {
            currency: "usd",
            product_data: {
              name: item.productName,
              images: [item.productImage],
            },
            unit_amount: item.productPrice * 100, // in cents
          },
          quantity: item.productQuantity,
        })),
        mode: "payment",
        metadata: {
          userId: user._id,
        },
        // success_url: `${process.env.CLIENT_URL}/success`,
        // cancel_url: `${process.env.CLIENT_URL}/cancel`,
        success_url: `${process.env.NGROK_URL}/success`,
        cancel_url: `${process.env.NGROK_URL}/cancel`,
      });
      return { sessionId: session.id };
    } catch (error) {
      console.error(error);
      return new Error("Failed to create session");
    }
  }
);

export const stripeResolvers = {
  Mutation: {
    createPaymentSession,
  },
};
