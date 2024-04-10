import { HOST } from "@/app/env";
import { NextResponse } from "next/server";
import Stripe from "stripe";

const PRICE_ID = "price_1P3xC2CT0kVaBZHZXzAdjeGT"; // customer chooses ODF21
// const PRICE_ID = "price_1P3ygDCT0kVaBZHZRtAGMbLq"; // test

export async function POST(request) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: "2023-10-16",
  });
  const data = await request.json();

  const session =
    data.bountyNumber == undefined
      ? await createBountySession(stripe)
      : await createVoteSession(stripe, { bountyNumber: data.bountyNumber });

  return NextResponse.json({ message: session.url });
}

async function createVoteSession(stripe, { bountyNumber }) {
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
        key: "idea",
        type: "numeric",
        label: {
          custom: "Idea #",
          type: "custom",
        },
      },
    ],
    metadata: {
      bounty: bountyNumber,
    },
    mode: "payment",
    success_url: `${HOST}?modal=success`,
    cancel_url: HOST,
  });
}

async function createBountySession(stripe) {
  return await stripe.checkout.sessions.create({
    line_items: [
      {
        price: PRICE_ID,
        quantity: 1,
      },
    ],
    custom_fields: [
      {
        key: "title",
        type: "text",
        label: {
          custom: "Idea title (short)",
          type: "custom",
        },
      },
      {
        key: "description",
        type: "text",
        label: {
          custom: "Idea description",
          type: "custom",
        },
      },
      {
        key: "twitter",
        type: "text",
        label: {
          custom: "Your Twitter/X handle",
          type: "custom",
        },
      },
    ],
    metadata: {},
    mode: "payment",
    success_url: `${HOST}?modal=success`,
    cancel_url: HOST,
  });
}
