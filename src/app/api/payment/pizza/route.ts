import { HOST } from "@/app/env";
import { NextResponse } from "next/server";
import Stripe from "stripe";

const PRICE_ID = "price_1P503GCT0kVaBZHZzk5hQFfk";
// const PRICE_ID = "price_1P509oCT0kVaBZHZ6DyvTVp8"; // test

export async function POST(request) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: "2023-10-16",
  });
  const session = await createSession(stripe);
  return NextResponse.json({ message: session.url });
}

async function createSession(stripe) {
  return await stripe.checkout.sessions.create({
    line_items: [
      {
        price: PRICE_ID,
        quantity: 1,
      },
    ],
    custom_fields: [
      {
        key: "twitter",
        type: "text",
        label: {
          custom: "Twitter/X handle",
          type: "custom",
        },
      },
      {
        key: "threshold",
        type: "numeric",
        label: {
          custom: "Bitcoin price threshold",
          type: "custom",
        },
      },
    ],
    metadata: {
      btcPizza: true
    },
    mode: "payment",
    success_url: `${HOST}/2?modal=success`,
    cancel_url: `${HOST}/2`,
    shipping_address_collection: {
      allowed_countries: ["US"]
    }
  });
}
