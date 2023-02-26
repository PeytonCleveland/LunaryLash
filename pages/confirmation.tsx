import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import formatDate from "../utils/format-date";

const Confirmation = () => {
  const router = useRouter();
  const { openingId, service, email, name } = router.query;
  const [appointment, setAppointment] = useState<any>(null);
  const supabase = useSupabaseClient();

  useEffect(() => {
    if (openingId) {
      supabase
        .from("appointments")
        .select("*")
        .eq("id", openingId)
        .then(({ data, error }) => {
          if (error) {
            console.log(error);
          } else {
            setAppointment(data[0]);
          }
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openingId]);

  useEffect(() => {
    const confirmAppointment = async () => {
      const data = await fetch("/api/confirm-appointment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          openingId,
          service,
          email,
          name,
        }),
      });

      const response = await data.json();
      setAppointment(response.data);
    };

    if (openingId && service && email) {
      confirmAppointment();
    }
  }, [openingId, service, email, name]);

  return (
    <section className="w-full px-8 pt-36 pb-16 flex justify-center">
      <div className="container mx-auto flex flex-col gap-4">
        <h1 className="text-[#2a2b2a] text-3xl font-primary font-semibold leading-[42px] text-center">
          Appointment Confirmed
        </h1>
        <p className="text-[#5d5d5d] font-primary font-light text-center">
          Thank you for booking an appointment with Lunary Lash.
        </p>
        <div className="flex flex-col mt-1">
          <p className="font-primary text-center">Confirmation Code</p>
          <p className="font-primary text-center text-[#2a2b2a] text-4xl mt-1 mb-6">
            {appointment?.confirmation_number}
          </p>
          <h6 className="text-center font-primary py-3 text-white bg-[#2a2b2a]">
            Appointment Details
          </h6>

          <div className="flex flex-col justify-center p-4 border-2 border-[#2a2b2a] border-t-0 gap-4">
            <p className="font-primary">{service}</p>
            <p className="font-primary">{formatDate(appointment?.date)}</p>
            <p className="font-primary">{appointment?.time}</p>
            <p className="font-primary">
              1921 Clearbranch Drive, Deatsville, AL 36022
            </p>
          </div>
          <p className="font-primary text-center font-light text-sm text-gray-500 mt-8">
            A confirmation email has been sent to:
            <br />
            <strong className="text-[#2a2b2a]">
              {appointment?.client_email}
            </strong>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Confirmation;
