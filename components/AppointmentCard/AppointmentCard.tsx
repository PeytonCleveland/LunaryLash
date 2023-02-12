import { FC } from "react";

interface AppointmentCardProps {
  time: string;
  onClick: (time: string) => void;
}

const AppointmentCard: FC<AppointmentCardProps> = ({ time, onClick }) => {
  return (
    <button
      onClick={() => onClick(time)}
      className="border-2 border-[#2a2b2a] p-4 flex justify-center items-center font-primary font-semibold text-[#2a2b2a]"
    >
      {time}
    </button>
  );
};

export default AppointmentCard;
