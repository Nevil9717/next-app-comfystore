// import { stripePromise } from "../../api/stripe";

// async function handler(req, res) {
//   console.log("🚀 ~ handler ~ req:", req);

//   try {
//     const session = await stripePromise.checkout.sessions.create({
//       payment_method_types: ["card"],
//       line_items: [
//         {
//           price_data: {
//             currency: "usd",
//             product_data: {
//               name: "Product Name",
//             },
//             unit_amount: 1000, // in cents
//           },
//           quantity: 1,
//         },
//       ],
//       mode: "payment",
//       success_url: `${process.env.CLIENT_URL}/success`,
//       cancel_url: `${process.env.CLIENT_URL}/cancel`,
//     });
//     console.log("🚀 ~ handler ~ session:", session);

//     res.status(200).json({ sessionId: session.id });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Failed to create session" });
//   }
// }

// export { handler as POST };
