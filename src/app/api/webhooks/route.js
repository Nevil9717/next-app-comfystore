import { stripe } from "../../../lib/stripe";
const handler = async (req, res) => {
  if (req.method === "POST") {
    const rawPayload = await new Promise((resolve) =>
      req.on("data", (chunk) => resolve(chunk))
    );
    const signature = req.headers["stripe-signature"];
    console.log("🚀 ~ handler ~ signature:", signature);
    let event;
    try {
      event = stripe.webhooks.constructEvent(
        rawPayload,
        signature,
        process.env.STRIPE_WEBHOOK_ENDPOINT_SECRET
      );
      console.log("🚀 ~ handler ~ event: inside tryCatch", event);
    } catch (err) {
      console.error(`Webhook Error: ${err.message}`);
      res.status(400).send(`Webhook Error: ${err.message}`);
    }

    // Handle the event based on its type
    if (event?.type === "checkout.session.completed") {
      const session = event?.data?.object;
      console.log("event.data.object", session);
    }

    res.status(200).json({ received: true });
  } else {
    console.log("Method Not Allowed");
    res.setHeader("Allow", ["POST"]);
    res.status(405).end("Method Not Allowed");
  }
};

export { handler as POST, handler as GET };
