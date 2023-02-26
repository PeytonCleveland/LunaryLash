import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useSupabaseClient } from "@supabase/auth-helpers-react";

const EditAppointment = () => {
  const [appointment, setAppointment] = useState<any>(null);

  const router = useRouter();
  const { appointmentId } = router.query;
  const supabase = useSupabaseClient();

  useEffect(() => {
    const fetchAppointment = async () => {
      const { data, error } = await supabase
        .from("appointments")
        .select("id, date, time, service(id, name), is_booked, client_email")
        .eq("id", appointmentId);

      if (error) {
        console.log(error);
        return;
      }

      if (data.length === 0) return;

      setAppointment(data[0]);
    };

    fetchAppointment();
  }, [appointmentId, supabase]);

  return (
    <section className="w-full px-8 pt-24 pb-12 flex justify-center">
      <div className="container mx-auto flex flex-col gap-6">
        <h1 className="text-[#2a2b2a] text-xl font-primary">
          Edit Appointment
        </h1>
        <p>{appointment?.date}</p>
        <p>{appointment?.time}</p>
      </div>
    </section>
  );
};

export default EditAppointment;
