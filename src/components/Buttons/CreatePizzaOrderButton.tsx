"use client";

export default function CreatePizzaOrderButton() {
  function handleClick() {
    fetch("/api/payment/pizza", {
      method: "POST",
    }).then(async (resp) => {
      const data = await resp.json();
      window.location = data.message;
    });
  }
  return (
    <button
      className="inline-flex items-center justify-center rounded-md bg-blue px-7 py-3 text-center text-base font-medium text-white duration-300 hover:bg-blue/90"
      onClick={handleClick}
    >
      <div className="label">Place an order</div>
    </button>
  );
}
