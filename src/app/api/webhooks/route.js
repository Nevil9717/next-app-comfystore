import { verifySignature } from "stripe";
const handler = async (req, res) => {
  console.log("🚀 ~ handler ~ req:", req);
  if (req.method === "POST") {
    const sig = req.headers["stripe-signature"];
    let event;
    try {
      event = stripe.webhooks.constructEvent(
        req.body,
        sig,
        process.env.STRIPE_WEBHOOK_SECRET
      );
    } catch (err) {
      console.error(`Webhook Error: ${err.message}`);
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    // Handle the event based on its type
    if (event.type === "checkout.session.completed") {
      const session = event.data.object;
      console.log("event.data.object", session);
    }

    res.status(200).json({ received: true });
  } else {
    console.log("Method Not Allowed");
    res.setHeader("Allow", ["POST"]);
    res.status(405).end("Method Not Allowed");
  }
};

export { handler as POST };
