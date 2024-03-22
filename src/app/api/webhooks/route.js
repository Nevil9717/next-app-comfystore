import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { stripe } from "../../../lib/stripe";

const handler = async (req) => {
  if (req.method === "POST") {
    const body = await req.text();
    console.log("🚀 ~ handler ~ body:", body);
    const signature = headers().get("stripe-signature");
    console.log("🚀 ~ handler ~ signature:", signature);
    let event;
    try {
      event = stripe.webhooks.constructEvent(
        body,
        signature,
        process.env.STRIPE_WEBHOOK_ENDPOINT_SECRET
      );
      console.log("🚀 ~ handler ~ event: inside tryCatch", event);
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
      console.log("event.data.object", session);
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
