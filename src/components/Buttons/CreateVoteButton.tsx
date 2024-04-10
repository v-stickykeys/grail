"use client";
export default function CreateVoteButton({ bountyNumber }: { bountyNumber: number }) {
  function vote() {
    fetch("/api/payment", {
      method: "POST",
      body: JSON.stringify({ bountyNumber }),
    }).then(async (resp) => {
      const data = await resp.json();
      window.location = data.message;
    });
  }
  return (
    <button
      className="w-full inline-flex items-center justify-center rounded-md bg-orange px-7 py-3 text-center text-base font-medium text-white duration-300 hover:bg-orange/90"
      onClick={vote}
    >
      <div className="label">Vote</div>
    </button>
  );
}
