import Stripe from 'stripe';

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;

if (!stripeSecretKey && process.env.NODE_ENV !== 'production') {
  console.warn('Warning: STRIPE_SECRET_KEY is not set. Stripe functionality will not work.');
}

export const stripe = stripeSecretKey ? new Stripe(stripeSecretKey, {
  apiVersion: '2025-12-15.clover',
  typescript: true,
}) : null;

export const PRODUCT_PRICE = 999; // $9.99 in cents
