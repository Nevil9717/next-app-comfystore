import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

export async function createCheckoutSession() {
  const response = await fetch("/api/create-checkout-session", {
    method: "POST",
  });
  if (!response.ok) {
    return new Error("Failed to fetch");
  }
  return await response.json();
}

export async function redirectToCheckout(sessionId) {
  const stripe = await stripePromise;
  const { error } = await stripe.redirectToCheckout({
    sessionId,
  });
  if (error) {
    console.error(error);
  }
}
