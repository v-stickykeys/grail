"use client";
import { BountyType } from "@/types/bounty";
import SectionTitle from "../Common/SectionTitle";
import { useEffect, useState } from "react";
import SingleBounty from "./SingleBounty";
import { Bounty, PrismaClient } from "@prisma/client";

const Bounties = () => {
  const [loading, setLoading] = useState(false);
  const [bounties, setBounties] = useState<Array<Bounty>>([]);
  useEffect(() => {
    getBounties();
    async function getBounties() {
      setLoading(true);
      const response = await fetch("/api/rpc", {
        method: "POST",
        body: JSON.stringify({ type: "getBounties" }),
      });
      const json = await response.json();
      const nextBounties = json.data as Array<any>;
      nextBounties.sort((a, b) => a.shadowId - b.shadowId);
      setBounties(nextBounties);
      setLoading(false);
    }
  }, []);
  return (
    <section
      id="team"
      className="overflow-hidden bg-gray-1 pb-12 pt-20 dark:bg-dark-2 lg:pb-[90px] lg:pt-[120px]"
    >
      <div className="container">
        <div className="mb-[60px]">
          <SectionTitle
            subtitle="Latest"
            title="Ideas"
            paragraph=""
            width="640px"
            center
          />
        </div>

        <div className="-mx-4 flex flex-wrap justify-center">
          {bounties.map((bounty) => {
            const singleBounty: BountyType = {
              id: bounty.id,
              listNumber: bounty.shadowId,
              title: bounty.title,
              description: bounty.description,
              twitter: `https://x.com/${bounty.userId}`,
              createdAt: new Intl.DateTimeFormat("us-en", {
                dateStyle: "medium",
              }).format(new Date(bounty.createdAt)),
            };
            return <SingleBounty key={bounty.id} bounty={singleBounty} />;
          })}
        </div>
                  {`If an idea doesn't get built within 24 hours, all votes are refunded.`}
      </div>

    </section>
  );
};

export default Bounties;
