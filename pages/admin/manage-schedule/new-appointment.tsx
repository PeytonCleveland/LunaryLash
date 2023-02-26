import { useState, useEffect, useCallback } from "react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { AdminAppointmentCard } from "../../../components";
import formatTime from "../../../utils/format-time";

const NewAppointment = () => {
  const router = useRouter();
  const { date: initialDate } = router.query;
  const [date, setDate] = useState<Date>(
    initialDate ? new Date(initialDate as string) : new Date()
  );
  const [appointments, setAppointments] = useState<any>(null);
  const { register, handleSubmit } = useForm();

  const supabase = useSupabaseClient();

  const fetchAppointments = useCallback(async () => {
    const { data, error } = await supabase
      .from("appointments")
      .select(
        "id, time, client_name, client_email, is_booked, booked_at, service(name)"
      )
      .eq("date", date.toISOString().split("T")[0]);
    if (error) {
      console.log(error);
    } else {
      setAppointments(data);
    }
  }, [date, supabase]);

  useEffect(() => {
    fetchAppointments();
  }, [date, fetchAppointments, supabase]);

  const onSubmit = async (values: any) => {
    const { error } = await supabase
      .from("appointments")
      .insert({ date: values.date, time: formatTime(values.time) });

    if (error) {
      console.log(error);
    }

    await fetchAppointments();
  };

  return (
    <section className="w-full px-8 pt-24 pb-12 flex justify-center">
      <div className="container mx-auto flex flex-col gap-6">
        <h1 className="text-[#2a2b2a] text-2xl font-primary">
          New Appointment
        </h1>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <label htmlFor="date" className="font-primary">
              Date
            </label>
            <input
              id="date"
              type="date"
              className="text-lg p-4 border-2 border-[#2a2b2a] text-[#2a2b2a]"
              value={date.toISOString().split("T")[0]}
              {...register("date")}
              onChange={(event) =>
                setDate(new Date(event.target.value as string))
              }
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="time" className="font-primary">
              Time
            </label>
            <input
              id="time"
              type="time"
              className="text-lg p-4 border-2 border-[#2a2b2a] text-[#2a2b2a]"
              {...register("time")}
            />
          </div>
          <button className="bg-[#2a2b2a] text-white px-6 py-5 flex justify-between items-center font-primary">
            Create Appointment
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
          </button>
        </form>
        <hr />
        <h6 className="text-[#2a2b2a] text-lg font-primary">
          Scheduled Appointments
        </h6>
        {appointments?.length ? (
          <div className="flex flex-col gap-2.5">
            {appointments.map((appointment: any, index: number) => (
              <AdminAppointmentCard
                key={index}
                id={appointment.id}
                time={appointment.time}
                booked={appointment.is_booked}
              />
            ))}
          </div>
        ) : (
          <div className="w-full bg-gray-100 p-6 flex items-center justify-center gap-3 border border-gray-300">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.25}
              stroke="currentColor"
              className="w-6 h-6 text-gray-500"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
              />
            </svg>

            <p className="text-center text-gray-500 font-light">
              No appointments scheduled
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default NewAppointment;
