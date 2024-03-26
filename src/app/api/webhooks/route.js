import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { stripe } from "../../../lib/stripe";
import { Cart, Order } from "../../utils/models";

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
        console.log("🚀 ~ handler ~ userId:", userId);
        const cart = await Cart.findOne({ userId });
        console.log("🚀 ~ handler ~ cart:", cart);
        // const newOrder = await Order.create({
        //   userId,
        //   paymentDetails: {
        //     paymentStatus: session.payment_status,
        //     paymentMethod: session.payment_method_types[0],
        //     amountTotal: session.amount_total,
        //     currency: session.currency,
        //   },
        //   address: {
        //     shippingAddress: session.shipping.address.line1,
        //     city: session.shipping.address.city,
        //     state: session.shipping.address.state,
        //     postalCode: session.shipping.address.postal_code,
        //     country: session.shipping.address.country,
        //   },
        //   customerDetails: {
        //     Name: session.customer_details.full_name,
        //     email: session.customer_details.email,
        //   },
        //  products: cart.products,
        // });
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
