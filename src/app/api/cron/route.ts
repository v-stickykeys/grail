import { NextResponse } from "next/server";
import { EmbedBuilder, WebhookClient } from 'discord.js';
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
    const webhookClient = new WebhookClient({
      id: "1228392626689146910",
      token: "p46d3a2mvwRIkc5cwPUgOWaYPi6KB8wEfXN934DAQP5h5PsOYt9an0H948RmYBnEqFVt"
    });

    const embed = new EmbedBuilder()
      .setTitle('Order up!')
      .setColor(0x00FFFF);

    await webhookClient.send({
      content: 'Time to order a pizza',
      username: 'bitcoin-pizza-bot',
      avatarURL: 'https://i.imgur.com/AfFp7pu.png',
      embeds: [embed],
    });
  }

  return NextResponse.json({ message: "OK" });
}
