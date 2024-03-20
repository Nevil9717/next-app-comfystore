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
          },
          unit_amount: item.productPrice * 100, // in cents
        },
        quantity: item.productQuantity,
      })),
      mode: "payment",
      success_url: `${process.env.CLIENT_URL}/api/webhooks`,
      cancel_url: `${process.env.CLIENT_URL}/cancel`,
    });
    return { sessionId: session.id };
  } catch (error) {
    console.error(error);
    return new Error("Failed to create session");
  }
};
// const webhook = async () => {
//   try {
//     const event = stripe.webhooks.constructEvent(
//       req.body,
//       req.headers["stripe-signature"],
//       process.env.STRIPE_WEBHOOK_SECRET
//     );
//     if (event.type === "checkout.session.completed") {
//       const session = event.data.object;
//       console.log(session);
//     }
//     res.json({ received: true });
//   } catch (error) {
//     console.error(error);
//     return new Error("Failed to create webhook event");
//   }
// };

export const stripeResolvers = {
  Mutation: {
    createPaymentSession,
  },
};
