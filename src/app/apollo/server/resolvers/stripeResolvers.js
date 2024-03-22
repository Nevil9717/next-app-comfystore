import { Cart } from "@/app/utils/models";
import { stripe } from "../../../../lib/stripe";

const createPaymentSession = async () => {
  try {
    const cartItems = await Cart.find();
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: cartItems.map((item) => ({
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
        userId: "12345",
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
};

export const stripeResolvers = {
  Mutation: {
    createPaymentSession,
  },
};
