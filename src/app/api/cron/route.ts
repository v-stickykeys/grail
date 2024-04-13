import { NextResponse } from "next/server";
import { prisma } from "@/utils/prismaDB";

export async function GET() {
  // fetch the price
  const response = await fetch("https://blockchain.info/ticker", { method: "GET" });
  const data = await response.json();
  const price = data["USD"]["15m"];
  const orders = await prisma.pizzaOrder.findMany({
    where: {
      threshold: {
        gt: Number(price) - 1
      },
      sent: false
    },
  });

  if (orders.length > 0) {
    const resp = await fetch("https://discord.com/api/webhooks/1228392626689146910/p46d3a2mvwRIkc5cwPUgOWaYPi6KB8wEfXN934DAQP5h5PsOYt9an0H948RmYBnEqFVt", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ content: "Order up!" })
    });
  }

  return NextResponse.json({ message: "OK" });
}
