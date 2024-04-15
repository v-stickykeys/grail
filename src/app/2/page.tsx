"use client";

import CreatePizzaOrderButton from "@/components/Buttons/CreatePizzaOrderButton";
import PizzaOrders from "@/components/PizzaOrders";
import SuccessModal from "@/components/Modal/Success";
import { useSearchParams } from "next/navigation";

const AboutPage = () => {
  const searchParams = useSearchParams();
  const modal = searchParams.get("modal");
  return (
    <main>
      <SuccessModal text="Your order has been placed. You'll get a pizza when Bitcoin hits the threshold." opened={modal == "success"} />
      <div className="h-xl"></div>
      <div className="dark:bg-dark relative z-10 overflow-hidden pb-[60px] pt-[120px] md:pt-[130px] lg:pt-[160px]">
        <div className="from-stroke/0 via-stroke to-stroke/0 dark:via-dark-3 absolute bottom-0 left-0 h-px w-full bg-gradient-to-r"></div>
        <div className="container">
          <div className="-mx-4 flex flex-wrap items-center">
            <div className="w-full px-4">
              <div className="text-center">
              </div>
            </div>
          </div>
        </div>
      </div>
<section
      id="about"
      className="bg-gray-1 pb-8 pt-20 dark:bg-dark-2 lg:pb-[70px] lg:pt-[120px]"
    >
      <div className="container">
        <div className="wow fadeInUp" data-wow-delay=".2s">
          <div className="-mx-4 flex flex-wrap items-center">
            <div className="w-full px-4 lg:w-1/2">
              <div className="mb-12 max-w-[540px] lg:mb-0">
                <h2 className="mb-5 text-3xl font-bold leading-tight text-dark dark:text-white sm:text-[40px] sm:leading-[1.2]">
                Deliver me a pizza every time bitcoin goes above a certain price.
                </h2>
                <p className="mb-10 text-base leading-relaxed text-body-color dark:text-dark-6">
                  This idea proposed by <a href={`https://x.com/themisbahkhan`} target="_blank">@themisbahkhan</a> collected $9.50 dollars from 3 voters
                  <br /> <br />
                </p>

                <CreatePizzaOrderButton />
              </div>
            </div>

            <div className="w-full px-4 lg:w-1/2">
              <div className="-mx-2 flex flex-wrap sm:-mx-4 lg:-mx-2 xl:-mx-4">
                <div className="w-full px-2 sm:px-4 lg:px-2 xl:px-4">
                  <div
                    className={`relative mb-4 sm:mb-8 sm:h-[400px] md:h-[540px] lg:h-[400px] xl:h-[500px] `}
                  >
                    <PizzaOrders />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    </main>
  );
};

export default AboutPage;
