import { FC } from "react";

interface AdminAppointmentCardProps {
  time: string;
  booked: boolean;
}

const AdminAppointmentCard: FC<AdminAppointmentCardProps> = ({
  time,
  booked,
}) => {
  return (
    <div className="bg-[#2a2b2a] px-4 py-6 flex justify-between">
      <div className="flex gap-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="w-6 h-6 text-white"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <p className="text-white font-primary">{time}</p>
      </div>
      <p className="text-white font-primary">{booked ? "Booked" : "Open"}</p>
    </div>
  );
};

export default AdminAppointmentCard;
