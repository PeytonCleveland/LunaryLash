import { useEffect, useState } from "react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import Calendar from "react-calendar";
import Link from "next/link";
import formatDate from "../../../utils/format-date";
import { AdminAppointmentCard } from "../../../components";

const ManageSchedule = () => {
  const [date, setDate] = useState(new Date());
  const [appointments, setAppointments] = useState<any>(null);

  const supabase = useSupabaseClient();

  useEffect(() => {
    const fetchAppointments = async () => {
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
    };

    fetchAppointments();
  }, [date, supabase]);

  return (
    <section className="w-full px-8 pt-24 pb-12 flex justify-center">
      <div className="container mx-auto flex flex-col gap-6">
        <h1 className="text-[#2a2b2a] text-xl font-primary">Manage Schedule</h1>
        <Calendar
          tileDisabled={({ date }): any => date.getDay() % 7 === 0}
          showNeighboringMonth={false}
          prev2Label={null}
          next2Label={null}
          minDate={new Date()}
          defaultValue={new Date()}
          onClickDay={(date) => setDate(date)}
        />
        <div className="flex flex-col">
          <h6 className="text-[#2a2b2a] text-lg font-primary">
            Scheduled Appointments
          </h6>
          <p className="text-sm text-gray-500 font-light">
            {date.toLocaleDateString()}
          </p>
        </div>

        {appointments?.length ? (
          <div className="flex flex-col gap-2.5">
            {appointments.map((appointment: any, index: number) => (
              <AdminAppointmentCard
                key={index}
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

        <Link
          href={`/admin/manage-schedule/new-appointment?date=${date}`}
          className="bg-[#2a2b2a] text-white px-6 py-5 flex justify-between items-center font-primary"
        >
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
        </Link>
      </div>
    </section>
  );
};

export default ManageSchedule;
