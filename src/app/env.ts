export const HOST = process.env.NODE_ENV == "production" ? "https://grail.so" : "http://localhost:3000";
export const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY;
export const STRIPE_ENDPOINT_SECRET = process.env.STRIPE_ENDPOINT_SECRET;
