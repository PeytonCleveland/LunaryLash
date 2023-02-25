import Link from "next/link";
import getGreeting from "../../utils/get-greeting";
import getNextAppointment from "../../api/appointments";
import { useEffect, useState } from "react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";

const AdminHome = () => {
  const [nextAppointment, setNextAppointment] = useState<any>(null);
  const supabase = useSupabaseClient();

  useEffect(() => {
    const loadNextAppointment = async () => {
      const appointment = await getNextAppointment(supabase);
      setNextAppointment(appointment);
    };

    loadNextAppointment();
  }, [supabase]);

  return (
    <section className="w-full px-8 pt-24 pb-12 flex justify-center">
      <div className="container mx-auto flex flex-col gap-6">
        <h1 className="text-[#2a2b2a] text-lg font-primary leading-[42px]">
          {getGreeting()} Morgan
        </h1>
        <div className="flex flex-col gap-2">
          <p className="font-primary text-sm text-gray-500 font-light">
            Today&apos;s Schedule
          </p>
          {nextAppointment ? (
            <div className="p-6 bg-[#e1dbde] flex justify-between">
              <p className="font-primary">Classic Set</p>
              <p className="font-primary">10:00 AM</p>
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
                No booked appointments
              </p>
            </div>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <p className="font-primary text-sm text-gray-500 font-light">
            This Week
          </p>
        </div>
        <Link
          href="/admin/manage-schedule"
          className="bg-[#2a2b2a] text-white px-6 py-5 flex justify-between items-center font-primary"
        >
          Manage Schedule{" "}
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
              d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
            />
          </svg>
        </Link>
      </div>
    </section>
  );
};

export default AdminHome;
