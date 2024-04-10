import { VoteType } from "@/types/vote";

export default function SingleVote({ vote }: { vote: VoteType }) {
  const { amount, twitter, createdAt } = vote;
  return (
    <p className="text-light dark:text-light-6 mb-5 text-sm">
      <a href={twitter}>{twitter.split("/").pop()}</a> voted ${amount/100}
    </p>
  )
}