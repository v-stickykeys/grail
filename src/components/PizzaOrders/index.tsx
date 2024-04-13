"use client";
import SectionTitle from "../Common/SectionTitle";
import { useEffect, useState } from "react";
import SinglePizzaOrder from "./SinglePizzaOrder";
import { PizzaOrder, PrismaClient } from "@prisma/client";
import { PizzaOrderType } from "@/types/pizzaOrder";

const PizzaOrders = () => {
  const [loading, setLoading] = useState(false);
  const [orders, setOrders] = useState<Array<PizzaOrder>>([]);
  useEffect(() => {
    getOrders();
    async function getOrders() {
      setLoading(true);
      const response = await fetch("/api/rpc", {
        method: "POST",
        body: JSON.stringify({ type: "getPizzaOrders" }),
      });
      const json = await response.json();
      const nextOrders = json.data as Array<any>;
      nextOrders.sort((a, b) => a.shadowId - b.shadowId);
      setOrders(nextOrders);
      setLoading(false);
    }
  }, []);
  return (
    <section
      id="team"
      className="overflow-hidden bg-gray-1 pb-12 pt-20 dark:bg-dark-2 lg:pb-[90px] lg:pt-[120px]"
    >
      <div className="container">
        <div className="mb-[30px]">
          <SectionTitle
            subtitle="Latest Orders"
            title=""
            paragraph=""
            width="640px"
          />
        </div>

        <div className="flex flex-wrap">
          {orders.map((order) => {
            const singleOrder: PizzaOrderType = {
              id: order.id,
              threshold: order.threshold,
              twitter: `https://x.com/${order.userId}`,
              createdAt: new Intl.DateTimeFormat("us-en", {
                dateStyle: "medium",
              }).format(new Date(order.createdAt)),
            };
            return <SinglePizzaOrder key={order.id} order={singleOrder} />;
          })}
        </div>
      </div>

    </section>
  );
};

export default PizzaOrders;
