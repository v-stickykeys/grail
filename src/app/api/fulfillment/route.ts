import { buffer } from "micro";
import { STRIPE_ENDPOINT_SECRET } from "@/app/env";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { prisma } from "@/utils/prismaDB";

export async function POST(request: NextRequest) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: "2023-10-16",
  });
  const payload = await request.text();
  const sig = request.headers.get("stripe-signature");

  let event;
  try {
    event = stripe.webhooks.constructEvent(
      payload,
      sig,
      process.env.STRIPE_ENDPOINT_SECRET,
    );
  } catch (err) {
    console.log(err);
    return NextResponse.json({ message: err }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const customFields = event.data.object["custom_fields"] as Array<{[k: string]: any}>;
    const amount = event.data.object["amount_subtotal"];
    const bountyNumber = event.data.object["metadata"]["bounty"];
    const bitcoinPizza = event.data.object["metadata"]["btcPizza"];

    if (bitcoinPizza) {
      await createBitcoinPizzaOrder({
        userId: customFields.find((field) => {
          return field.key == "twitter"
        }).text.value,
        threshold: customFields.find((field) => {
          return field.key == "threshold"
        }).numeric.value,
      })
      return NextResponse.json({ message: "OK" });
    }

    if (bountyNumber == undefined) {
      // creating a new bounty
      await createBounty({
        userId: customFields.find((field) => {
          return field.key == "twitter"
        }).text.value,
        amount,
        title: customFields.find((field) => {
          return field.key == "title"
        }).text.value,
        description: customFields.find((field) => {
          return field.key == "description"
        }).text.value,
      });
    } else {
      await createVote({
        userId: customFields.find((field) => {
          return field.key == "twitter"
        }).text.value,
        amount,
        bountyNumber: customFields.find((field) => {
          return field.key == "idea"
        }).numeric.value,
      });
    }
    return NextResponse.json({ message: "OK" });
  }
  return NextResponse.json({ message: "Unsupported type" });
}

async function createBitcoinPizzaOrder({ userId, threshold }): Promise<boolean> {
  console.log("creating order")
  await prisma.pizzaOrder.create({
    data: {
      userId,
      threshold: Number(threshold),
      sent: false
    },
  });
  return true;
}

async function createVote({ userId, amount, bountyNumber }): Promise<boolean> {
  await prisma.vote.create({
    data: {
      userId,
      amount,
      bounty: {
        connect: { shadowId: Number(bountyNumber) },
      },
    },
  });
  return true;
}

async function createBounty({
  userId,
  amount,
  title,
  description,
}): Promise<boolean> {
  // TODO: this should be more specific. not always 24 hours
  const expires = new Date();
  expires.setDate(expires.getDate() + 1);
  await prisma.bounty.create({
    data: {
      userId,
      expires,
      title,
      description,
      votes: {
        create: [
          {
            userId,
            amount,
          },
        ],
      },
    },
  });
  return true;
}
