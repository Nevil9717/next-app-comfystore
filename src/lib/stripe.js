import Stripe from "stripe";

// Replace with your Stripe test secret key (from Stripe Dashboard)
export const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY);
