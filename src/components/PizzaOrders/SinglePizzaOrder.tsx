"use client";
import { BountyType } from "@/types/bounty";
import { VoteType } from "@/types/vote";
import Image from "next/image";
import { useEffect, useState } from "react";
import CreateVoteButton from "../Buttons/CreateVoteButton";
import SingleVote from "../SingleVote";
import { Vote } from "@prisma/client";
import { PizzaOrderType } from "@/types/pizzaOrder";

const SinglePizzaOrder = ({ order }: { order: PizzaOrderType }) => {
  const { threshold, twitter, createdAt } = order;
  const [loading, setLoading] = useState(false);
  return (
      <div className="group mb-8 rounded-xl bg-blue px-5 pb-10 pt-12 shadow-testimonial dark:bg-dark dark:shadow-none">
        <div className="text-left">
          <h3 className="mb-1 text-lg font-semibold text-light dark:text-white">
      <a href={twitter}>{twitter.split("/").pop()}</a> gets a pizza when Bitcoin hits {threshold}
          </h3>
        </div>
    </div>
  );
};

export default SinglePizzaOrder;
