"use client";
import { BountyType } from "@/types/bounty";
import { VoteType } from "@/types/vote";
import Image from "next/image";
import { useEffect, useState } from "react";
import CreateVoteButton from "../Buttons/CreateVoteButton";
import SingleVote from "../SingleVote";
import { Vote } from "@prisma/client";

const SingleBounty = ({ bounty, built }: { bounty: BountyType, built: boolean }) => {
  const { title, description, twitter, listNumber, createdAt } = bounty;
  const expired = new Date(createdAt).getTime() < Date.now() && !built;
  const [loading, setLoading] = useState(false);
  const [votes, setVotes] = useState<Array<Vote>>([]);
  const [total, setTotal] = useState<number>(0);
  useEffect(() => {
    getBounties();
    async function getBounties() {
      setLoading(true);
      const body = JSON.stringify({ type: "getVotes", bounty: bounty.id });
      console.log(body);
      const response = await fetch("/api/rpc", {
        method: "POST",
        body,
      });
      const json = await response.json();
      const nextVotes = json.data as Array<any>;
      const nextTotal = nextVotes.reduce((prev, curr) => {
        return prev + curr.amount;
      }, 0);
      setTotal(nextTotal);
      nextVotes.sort((a, b) => a.createdAt - b.createdAt);
      setVotes(nextVotes);
      setLoading(false);
    }
  }, []);

  function renderExpired() {
    return (
      <div className="w-full px-4 sm:w-1/2 lg:w-1/4 xl:w-1/4">
        <div className="group mb-8 rounded-xl bg-gray-400 px-5 pb-10 pt-12 shadow-testimonial dark:bg-dark dark:shadow-none">
          <div className="text-left">
            <h3 className="mb-1 text-lg font-semibold text-light dark:text-white">
              <a href={`/${listNumber}`}>
                #{listNumber} {title}
              </a>
            </h3>
            <p className="dark:text-light-6 mb-5 text-sm text-light">
              Total: ${total / 100}
            </p>
            <p className="dark:text-light-6 mb-5 text-sm text-light">
              {description}
            </p>

            <p className="dark:text-light-6 mb-5 text-sm text-light">
              <a href={twitter}>{twitter.split("/").pop()}</a> wants to see this
              built!
            </p>
            {votes.map((vote) => {
              const singleVote: VoteType = {
                id: vote.id,
                amount: vote.amount,
                twitter: `https://x.com/${vote.userId}`,
                createdAt: new Intl.DateTimeFormat("us-en", {
                  dateStyle: "medium",
                }).format(new Date(vote.createdAt)),
              };
              return <SingleVote key={vote.id} vote={singleVote} />;
            })}
            <div className="w-full">
              <div className="inline-flex w-full items-center justify-center rounded-md border px-7 py-3 text-center text-base font-medium text-white duration-300">
                <div className="label">This idea was refunded</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  function renderDefault() {
    return (
      <div className="w-full px-4 sm:w-1/2 lg:w-1/4 xl:w-1/4">
        <div className="group mb-8 rounded-xl bg-blue px-5 pb-10 pt-12 shadow-testimonial dark:bg-dark dark:shadow-none">
          <div className="text-left">
            <h3 className="mb-1 text-lg font-semibold text-light dark:text-white">
              <a href={`/${listNumber}`}>
                #{listNumber} {title}
              </a>
            </h3>
            <p className="dark:text-light-6 mb-5 text-sm text-light">
              Total: ${total / 100}
            </p>
            <p className="dark:text-light-6 mb-5 text-sm text-light">
              {description}
            </p>

            <p className="dark:text-light-6 mb-5 text-sm text-light">
              <a href={twitter}>{twitter.split("/").pop()}</a> wants to see this
              built!
            </p>
            {votes.map((vote) => {
              const singleVote: VoteType = {
                id: vote.id,
                amount: vote.amount,
                twitter: `https://x.com/${vote.userId}`,
                createdAt: new Intl.DateTimeFormat("us-en", {
                  dateStyle: "medium",
                }).format(new Date(vote.createdAt)),
              };
              return <SingleVote key={vote.id} vote={singleVote} />;
            })}
            <div className="w-full">
              {built ? (
              <a href={`/${listNumber}`} className="inline-flex w-full items-center justify-center rounded-md px-7 py-3 text-center text-base font-medium text-white duration-300 bg-blue-900 hover:bg-blue-800/80">
                <div className="label">See what was built</div>
              </a>
              ): <CreateVoteButton bountyNumber={bounty.listNumber} />}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return expired ? renderExpired() : renderDefault();
};

export default SingleBounty;
