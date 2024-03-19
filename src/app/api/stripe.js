import { loadStripe } from "@stripe/stripe-js";

export const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY
);

export async function createCheckoutSession() {
  const response = await fetch("/api/create-checkout-session", {
    method: "POST",
  });
  console.log("🚀 ~ createCheckoutSession ~ response:", response);

  if (!response.ok) {
    throw new Error("Failed to fetch checkout session");
  }

  return await response.json();
}

export async function redirectToCheckout(sessionId) {
  console.log("🚀 ~ redirectToCheckout ~ sessionId:", sessionId);
  const stripe = await stripePromise;
  console.log("🚀 ~ redirectToCheckout ~ stripe:", stripe);
  const { error } = await stripe.redirectToCheckout({
    sessionId,
  });
  if (error) {
    console.error(error);
  }
}
