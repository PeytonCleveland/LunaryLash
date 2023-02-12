import { useRouter } from "next/router";

const Confirmation = () => {
  const router = useRouter();
  const { date, time, service } = router.query;
  return (
    <section className="w-full px-8 pt-36 pb-28 flex justify-center">
      <div className="container mx-auto flex flex-col gap-4">
        <h1 className="text-[#2a2b2a] text-3xl font-primary font-semibold leading-[42px] text-center">
          Appointment Confirmed
        </h1>
        <p className="text-[#5d5d5d] font-primary font-light text-center">
          Thank you for booking an appointment with Lunary Lash.
        </p>
        <div className="flex flex-col mt-1">
          <h6 className="text-center font-primary py-3 text-white bg-[#2a2b2a]">
            Appointment Details
          </h6>
          <div className="flex flex-col justify-center p-4 border-2 border-[#2a2b2a] border-t-0 gap-2">
            <p className="font-primary">{service}</p>
            <p className="font-primary">{time}</p>
            <p className="font-primary">
              {new Date(date as string).toLocaleDateString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Confirmation;
