import { FC } from "react";

interface ServiceCardProps {
  id: string;
  name: string;
  duration: string;
  price: number;
  selected: boolean;
  onClick: (id: string) => void;
}

const ServiceCard: FC<ServiceCardProps> = ({
  id,
  name,
  duration,
  price,
  selected,
  onClick,
}) => {
  return (
    <button
      onClick={() => onClick(id)}
      className={`w-full flex justify-between items-center border-2 p-4 ${
        selected ? "border-[#87CBAC]" : "border-[#2a2b2a]"
      }`}
    >
      <div className="flex flex-col items-start justify-center">
        <div className="flex items-center gap-2">
          <h6 className="font-primary font-semibold">{name}</h6>
          {selected && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="#87CBAC"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          )}
        </div>

        <p className="font-primary text-xs text-gray-400">{duration}</p>
      </div>
      <h6 className="font-primary text-lg font-semibold">${price}</h6>
    </button>
  );
};

export default ServiceCard;
