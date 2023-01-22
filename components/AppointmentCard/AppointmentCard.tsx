import { FC } from "react";

interface AppointmentCardProps {
  time: string;
}

const AppointmentCard: FC<AppointmentCardProps> = ({ time }) => {
  return (
    <button className="border-2 border-[#2a2b2a] p-4 flex justify-center items-center font-primary font-semibold text-[#2a2b2a]">
      {time}
    </button>
  );
};

export default AppointmentCard;
