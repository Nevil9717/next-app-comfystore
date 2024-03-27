import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { stripe } from "../../../lib/stripe";
import { Cart, Order, User } from "../../utils/models";

const handler = async (req) => {
  if (req.method === "POST") {
    const body = await req.text();
    const signature = headers().get("stripe-signature");
    let event;
    try {
      event = stripe.webhooks.constructEvent(
        body,
        signature,
        process.env.STRIPE_WEBHOOK_ENDPOINT_SECRET
      );
    } catch (err) {
      console.error(`Webhook Error: ${err.message}`);
      return NextResponse.json(
        { message: `Webhook Error: ${err.message}` },
        { status: 400 }
      );
    }

    // Handle the event based on its type
    if (event?.type === "checkout.session.completed") {
      const session = event?.data?.object;

      if (session.payment_status === "paid") {
        const userId = session.metadata.userId;
        const cart = await Cart.findOne({ userId });
        const addressString = session.customer_details.address;
        const shippingAddressString = `${addressString.line1} ${addressString.line2} ${addressString.city} ${addressString.state} ${addressString.postal_code} ${addressString.country}`;
        const newOrder = await Order.create({
          userId,
          paymentDetails: {
            paymentStatus: session.payment_status,
            paymentMethod: session.payment_method_types[0],
            amountTotal: session.amount_total / 100,
            currency: session.currency,
          },
          address: {
            shippingAddress: shippingAddressString,
            city: session.customer_details.address.city,
            state: session.customer_details.address.state,
            postalCode: session.customer_details.address.postal_code,
            country: session.customer_details.address.country,
          },
          customerDetails: {
            name: session.customer_details.name,
            email: session.customer_details.email,
          },
          products: cart.products,
        });

        if (newOrder) {
          await Cart.updateOne(
            { userId },
            { $set: { products: [] } },
            { new: true }
          );
          await User.updateOne(
            { _id: userId },
            { $push: { orders: newOrder._id } },
            { new: true }
          );
          return NextResponse.json({ order: newOrder }, { status: 200 });
        } else {
          return NextResponse.json(
            { message: "Order not created" },
            { status: 500 }
          );
        }
      }
    }

    return NextResponse.json({ received: true }, { status: 200 });
  } else {
    console.log("Method Not Allowed");
    NextResponse.setHeader("Allow", ["POST"]);
    return NextResponse.json(
      { message: "Method Not Allowed" },
      { status: 405 }
    );
  }
};

export { handler as POST };
