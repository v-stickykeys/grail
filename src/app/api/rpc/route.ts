import { NextResponse } from "next/server";
import { prisma } from "@/utils/prismaDB";

// Notice the funciton definiton:
export async function GET(req) {
  return NextResponse.json(
    { error: "Method not allowed" },
    {
      status: 405
    }
  );
}

export async function POST(request: any) {
  const body = await request.json();

  if (body.type == "getBounty") {
    const bounty = body.bounty;
    const exist = await prisma.bounty.findUnique({
      where: {
        id: bounty,
      },
    });
    return NextResponse.json({ data: exist });
  }

  if (body.type == "getBounties") {
    const bounties = await prisma.bounty.findMany();
    console.log("bounties", bounties);
    return NextResponse.json({ data: bounties });
  }

 if (body.type == "getVotes") {
    const bounty = body.bounty;
    const votes = await prisma.vote.findMany({
      where: {
        bountyId: bounty,
      },
    });
    console.log(votes);
    return NextResponse.json({ data: votes });
  }

  if (body.type == "getPizzaOrders") {
    const orders = await prisma.pizzaOrder.findMany();
    return NextResponse.json({ data: orders });
  }

  return NextResponse.json({ message: "Invalid"}, { status: 400 });
}
