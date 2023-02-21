import { useState, useEffect } from "react";
import {
  AppointmentCard,
  CheckoutForm,
  ServiceCard,
  Tab,
  Tabs,
} from "../components";
import Calendar from "react-calendar";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import formatMinutes from "../utils/format-minutes";
import formatDate from "../utils/format-date";
import { Elements } from "@stripe/react-stripe-js";
import getStripe from "../utils/get-stripe";

const Appointments = () => {
  const [services, setServices] = useState<any>(null);
  const [activeTab, setActiveTab] = useState(0);
  const [selectedServiceId, setSelectedServiceId] = useState<string | null>(
    null
  );
  const [selectedServiceName, setSelectedServiceName] = useState<string | null>(
    null
  );
  const [selectedServiceCost, setSelectedServiceCost] = useState<number | null>(
    null
  );
  const [changeTab, setChangeTab] = useState<number | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [openings, setOpenings] = useState<any>([]);
  const [selectedOpening, setSelectedOpening] = useState<any>(null);
  const [selectedOpeningId, setSelectedOpeningId] = useState<string | null>(
    null
  );
  const [clientSecret, setClientSecret] = useState("");
  const supabase = useSupabaseClient();

  const handleServiceClick = (id: string, name: string, cost: number) => {
    setSelectedServiceId(id);
    setSelectedServiceName(name);
    setSelectedServiceCost(cost);
    setChangeTab(1);
  };

  const handleOpeningClick = (id: string, time: string) => {
    setSelectedOpening(time);
    setSelectedOpeningId(id);
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
    const fetchServices = async () => {
      const { data, error } = await supabase
        .from("services")
        .select("id, name, cost, time, category");
      if (error) {
        console.log(error);
      } else {
        setServices(data);
      }
    };

    fetchServices();
  }, [supabase]);

  useEffect(() => {
    const fetchOpenings = async () => {
      if (selectedDate === null) return;
      const { data, error } = await supabase
        .from("appointments")
        .select("id, time")
        .eq("date", selectedDate.toISOString().split("T")[0])
        .eq("is_booked", false);
      if (error) {
        console.log(error);
      } else {
        setOpenings(data);
      }
    };

    fetchOpenings();
  }, [selectedDate, supabase]);

  useEffect(() => {
    if (activeTab !== 2) return;
    fetch("/api/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items: [{ id: selectedServiceId }] }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab]);

  const appearance = {
    theme: "stripe",
  };
  const options: any = {
    clientSecret,
    appearance,
  };

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
              <Tab label="Date" disabled={selectedServiceId === null} />
              <Tab
                label="Payment"
                disabled={
                  selectedServiceId === null || selectedOpening === null
                }
              />
            </Tabs>
          </div>
          <div className="w-full relative pb-12">
            <div
              className={`flex flex-col w-full gap-6 transition-all duration-500 ease-in-out ${
                activeTab === 0 ? "" : "transform -translate-x-[115%]"
              }`}
            >
              <div className="flex flex-col w-full gap-2.5">
                <h5 className="font-primary">Sets</h5>
                {services?.map((service: any) => {
                  if (service.category !== "SETS") return null;
                  return (
                    <ServiceCard
                      key={service.id}
                      id={service.id}
                      name={service.name}
                      duration={formatMinutes(service.time)}
                      price={service.cost}
                      selected={selectedServiceId === service.id}
                      onClick={() =>
                        handleServiceClick(
                          service.id,
                          service.name,
                          service.cost
                        )
                      }
                    />
                  );
                })}
              </div>
              <div className="flex flex-col w-full gap-2.5">
                <h5 className="font-primary">Fills</h5>
                {services?.map((service: any) => {
                  if (service.category !== "FILLS") return null;
                  return (
                    <ServiceCard
                      key={service.id}
                      id={service.id}
                      name={service.name}
                      duration={formatMinutes(service.time)}
                      price={service.cost}
                      selected={selectedServiceId === service.id}
                      onClick={() =>
                        handleServiceClick(
                          service.id,
                          service.name,
                          service.cost
                        )
                      }
                    />
                  );
                })}
              </div>
              <div className="flex flex-col w-full gap-2.5">
                <h5 className="font-primary">Other</h5>
                {services?.map((service: any) => {
                  if (service.category !== "OTHER") return null;
                  return (
                    <ServiceCard
                      key={service.id}
                      id={service.id}
                      name={service.name}
                      duration={formatMinutes(service.time)}
                      price={service.cost}
                      selected={selectedServiceId === service.id}
                      onClick={() =>
                        handleServiceClick(
                          service.id,
                          service.name,
                          service.cost
                        )
                      }
                    />
                  );
                })}
              </div>
            </div>
            <div
              className={`flex flex-col absolute top-0 w-full gap-6 transition-all duration-500 ease-in-out ${
                activeTab === 1
                  ? "left-0"
                  : activeTab === 0
                  ? "left-[110%]"
                  : "-left-[110%]"
              }`}
            >
              <div className="flex flex-col w-full gap-2.5">
                <Calendar
                  tileDisabled={({ date }): any => date.getDay() % 7 === 0}
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
                      <AppointmentCard
                        key={index}
                        time={opening.time}
                        onClick={() =>
                          handleOpeningClick(opening.id, opening.time)
                        }
                      />
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

            <div
              className={`flex flex-col absolute top-0 w-full gap-6 transition-all duration-500 ease-in-out ${
                activeTab === 2 ? "left-0" : "left-[110%]"
              }`}
            >
              <div className="flex flex-col w-full gap-2.5">
                <h4 className="font-primary text-lg text-center bg-[#2a2b2a] py-2.5 text-white">
                  Appointment details
                </h4>
                <div className="flex flex-col gap-3 mt-3">
                  <p className="font-primary text-sm">{`$${selectedServiceCost}.00`}</p>
                  <p className="font-primary text-sm">{selectedServiceName}</p>
                  <p className="font-primary text-sm">
                    {selectedDate && formatDate(selectedDate)}
                  </p>
                  <p className="font-primary text-sm">{selectedOpening}</p>
                </div>
              </div>
              <h4 className="font-primary text-lg text-center bg-[#2a2b2a] py-2.5 text-white">
                Payment information
              </h4>
              {clientSecret && (
                <Elements options={options} stripe={getStripe()}>
                  <CheckoutForm
                    openingId={selectedOpeningId!}
                    service={selectedServiceName!}
                  />
                </Elements>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Appointments;
