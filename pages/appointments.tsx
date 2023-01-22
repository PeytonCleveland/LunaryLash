import { useState, useEffect } from "react";
import Image from "next/image";
import { AppointmentCard, ServiceCard, Tab, Tabs } from "../components";
import Calendar from "react-calendar";

const services = {
  sets: [
    {
      id: "classic-set",
      name: "Classic set",
      duration: "1h 30m",
      price: 110,
    },
    {
      id: "hybrid-set",
      name: "Hybrid set",
      duration: "1h 45m",
      price: 125,
    },
    {
      id: "volume-set",
      name: "Volume set",
      duration: "2h",
      price: 145,
    },
  ],
  fills: [
    {
      id: "classic-fill",
      name: "Classic fill",
      duration: "30m",
      price: 35,
    },
    {
      id: "hybrid-fill",
      name: "Hybrid fill",
      duration: "45m",
      price: 45,
    },
    {
      id: "volume-fill",
      name: "Volume fill",
      duration: "1h",
      price: 55,
    },
  ],
  other: [
    {
      id: "lash-lift",
      name: "Lash lift",
      duration: "1h",
      price: 65,
    },
  ],
};

const Appointments = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [changeTab, setChangeTab] = useState<number | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [openings, setOpenings] = useState<any>([]);

  const handleServiceClick = (id: string) => {
    setSelectedService(id);
    setChangeTab(1);
  };

  const handleTabChange = (index: number) => {
    if (index > activeTab) {
      setTimeout(() => {
        setActiveTab(index);
        window.scrollTo({ top: 0, behavior: "smooth" });
      }, 300);
    } else {
      setActiveTab(index);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  useEffect(() => {
    setChangeTab(null);
  }, [activeTab]);

  useEffect(() => {
    async function fetchAvailability() {
      if (selectedDate) {
        const res = await fetch(`/api/appointments?date=${selectedDate}`);
        const data = await res.json();
        setOpenings(data.openings);
      }
    }
    fetchAvailability();
  }, [selectedDate]);

  return (
    <>
      <section className="w-full px-8 pt-24 pb-12 flex justify-center">
        <div className="container mx-auto flex flex-col gap-6">
          <h1 className="text-[#2a2b2a] text-3xl font-primary font-semibold leading-[42px] text-center">
            Book an appointment
          </h1>

          <div className="flex gap-3 w-full">
            <Tabs
              onChange={(index) => handleTabChange(index)}
              changeTab={changeTab}
            >
              <Tab label="Service" />
              <Tab label="Date" disabled={selectedService === null} />
              <Tab label="Payment" disabled />
            </Tabs>
          </div>
          <div className="w-full relative pb-12">
            <div
              className={`flex flex-col w-full gap-6 transition-all duration-500 ease-in-out ${
                activeTab === 0 ? "" : "transform -translate-x-[115%]"
              }`}
            >
              <div className="flex flex-col w-full gap-2.5">
                <h5 className="font-secondary-bold text-xl">Sets</h5>
                {services.sets.map((service) => (
                  <ServiceCard
                    key={service.id}
                    id={service.id}
                    name={service.name}
                    duration={service.duration}
                    price={service.price}
                    selected={selectedService === service.id}
                    onClick={(id) => handleServiceClick(id)}
                  />
                ))}
              </div>
              <div className="flex flex-col w-full gap-2.5">
                <h5 className="font-primary">Fills</h5>
                {services.fills.map((service) => (
                  <ServiceCard
                    key={service.id}
                    id={service.id}
                    name={service.name}
                    duration={service.duration}
                    price={service.price}
                    selected={selectedService === service.id}
                    onClick={(id) => handleServiceClick(id)}
                  />
                ))}
              </div>
              <h5 className="font-primary">Other</h5>
              {services.other.map((service) => (
                <ServiceCard
                  key={service.id}
                  id={service.id}
                  name={service.name}
                  duration={service.duration}
                  price={service.price}
                  selected={selectedService === service.id}
                  onClick={(id) => handleServiceClick(id)}
                />
              ))}
            </div>
            <div
              className={`flex flex-col absolute top-0 w-full gap-6 transition-all duration-500 ease-in-out ${
                activeTab === 1 ? "left-0" : "left-[110%]"
              }`}
            >
              <div className="flex flex-col w-full gap-2.5">
                <Calendar
                  tileDisabled={({ date }): any => date.getDate() === 2}
                  showNeighboringMonth={false}
                  prev2Label={null}
                  next2Label={null}
                  minDate={new Date()}
                  onClickDay={(value) => setSelectedDate(value)}
                />
              </div>
              <div className="flex flex-col w-full gap-2.5">
                <h4 className="font-primary text-lg text-center bg-[#2a2b2a] py-2.5 text-white">
                  Appointment times
                </h4>
                {selectedDate ? (
                  openings.length > 0 ? (
                    openings.map((opening: any, index: number) => (
                      <AppointmentCard key={index} time={opening.time} />
                    ))
                  ) : (
                    <p className="font-primary font-light text-center items-center text-sm text-[#2a2b2a] flex gap-3 p-5 bg-yellow-100">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="currentColor"
                        className="w-12 h-12"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
                        />
                      </svg>
                      There are no available appointments on this date
                    </p>
                  )
                ) : (
                  <p className="font-primary font-light text-center text-sm text-gray-500">
                    Please select a date to see appointment times
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Appointments;
