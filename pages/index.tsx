import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Accordion, AccordionItem } from "../components";

export default function Home() {
  const [photo, setPhoto] = useState(0);

  const changePhoto = (index: number) => {
    if (index === -1 && photo !== 0) {
      setPhoto(photo - 1);
    }
    if (index === 1 && photo !== 2) {
      setPhoto(photo + 1);
    }
  };

  return (
    <>
      <section className="w-full px-8 pt-24 pb-12 flex justify-center">
        <div className="container mx-auto flex flex-col gap-6">
          <h1 className="text-[#2a2b2a] text-3xl font-primary leading-[42px] text-center">
            Enhance Your
            <br />
            <span className="text-[#baa7b0] font-semibold text-[34px]">
              <i>Natural Beauty</i>
            </span>
            <br />
            With Lunary Lash
          </h1>
          <div className="w-full h-[360px] relative overflow-hidden rounded-t-full border-[8px] border-[#2a2b2a]">
            <Image
              src="/hero.jpg"
              layout="fill"
              objectFit="cover"
              objectPosition="center"
              alt="Hero image"
              priority
            />
          </div>
          <Link href="/appointments" passHref legacyBehavior>
            <a className="bg-[#2a2b2a] text-white px-6 py-5 flex justify-between items-center font-primary">
              Book appointment
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2.5}
                stroke="white"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                />
              </svg>
            </a>
          </Link>
        </div>
      </section>

      <section className="w-full px-8 py-12 flex justify-center bg-[#2a2b2a]">
        <div className="container mx-auto flex flex-col gap-4">
          <div className="w-full flex flex-col gap-1 mb-2">
            <h1 className="text-white text-3xl font-primary">Services</h1>
            <p className="text-[#ddd] font-light">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
              condimentum, nisl ut ultricies lacinia, nisl nisl aliquam nisl,
              sit.
            </p>
          </div>

          <div className="flex flex-col gap-8">
            <div className="w-full flex flex-col">
              <div className="w-full h-[175px] relative">
                <Image
                  src="/hybrid.jpg"
                  layout="fill"
                  objectFit="cover"
                  objectPosition="center"
                  alt="Classic set"
                />
              </div>
              <div className="w-full p-3 bg-white flex flex-col gap-3">
                <div className="w-full flex justify-between">
                  <h6 className="text-[#2a2b2a] font-primary">Classic Set</h6>
                  <h6 className="text-[#2a2b2a] font-primary">$150</h6>
                </div>
              </div>
            </div>

            <div className="w-full flex flex-col">
              <div className="w-full h-[175px] relative">
                <Image
                  src="/hybrid.jpg"
                  layout="fill"
                  objectFit="cover"
                  objectPosition="center"
                  alt="Classic set"
                />
              </div>
              <div className="w-full p-3 bg-white flex flex-col gap-3">
                <div className="w-full flex justify-between">
                  <h6 className="text-[#2a2b2a] font-primary">Volume Set</h6>
                  <h6 className="text-[#2a2b2a] font-primary">$200</h6>
                </div>
              </div>
            </div>

            <div className="w-full flex flex-col">
              <div className="w-full h-[175px] relative">
                <Image
                  src="/hybrid.jpg"
                  layout="fill"
                  objectFit="cover"
                  objectPosition="center"
                  alt="Hybrid set"
                />
              </div>
              <div className="w-full p-3 bg-white flex flex-col gap-3">
                <div className="w-full flex justify-between">
                  <h6 className="text-[#2a2b2a] font-primary">Hybrid Set</h6>
                  <h6 className="text-[#2a2b2a] font-primary">$175</h6>
                </div>
              </div>
            </div>

            <button className="bg-[#baa7b0] text-white px-6 py-5 flex justify-between items-center font-primary">
              View all services
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2.5}
                stroke="white"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                />
              </svg>
            </button>
          </div>
        </div>
      </section>

      <section className="w-full px-8 py-16 flex justify-center">
        <div className="container mx-auto flex flex-col items-center gap-6">
          <h1 className="text-[#2a2b2a] text-3xl font-primary text-center">
            About Lunary
          </h1>
          <div className="w-[300px] h-[300px] relative overflow-hidden rounded-full border-[8px] border-[#2a2b2a]">
            <Image
              src="/hero.jpg"
              layout="fill"
              objectFit="cover"
              objectPosition="center"
              alt="Hero image"
              priority
            />
          </div>
          <p className="text-[#2a2b2a] text-center">
            Welcome to Lunary Lash, the premier lash tech company for all of
            your eyelash extension and lash lift needs. We use only the highest
          </p>
          <Link href="/about" passHref legacyBehavior>
            <a className="bg-[#2a2b2a] text-white px-6 py-5 flex justify-between items-center font-primary w-full">
              Learn more
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2.5}
                stroke="white"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                />
              </svg>
            </a>
          </Link>
        </div>
      </section>

      <section className="w-full px-8 py-16 flex justify-center bg-[#2a2b2a]">
        <div className="container mx-auto flex flex-col gap-6">
          <h1 className="text-white text-3xl font-primary">
            Frequently Asked Questions
          </h1>
          <Accordion>
            <AccordionItem
              title="What is an eyelash extension?"
              subtitle="Idk"
            />
            <AccordionItem
              title="What is an eyelash extension?"
              subtitle="Idk"
            />
            <AccordionItem
              title="What is an eyelash extension?"
              subtitle="Idk"
            />
            <AccordionItem title="Who do you love?" subtitle="P ❤️" />
          </Accordion>
        </div>
      </section>

      <section className="w-full px-8 py-16 flex justify-center">
        <div className="container mx-auto flex flex-col gap-4">
          <h1 className="text-[#2a2b2a] text-3xl">Client Photos</h1>
          {photo === 0 ? (
            <div className="w-full h-[275px] relative border-4 border-[#baa7b0] bg-[#2a2b2a]">
              <Image
                src="/hybrid-2.jpg"
                layout="fill"
                objectFit="contain"
                objectPosition="center"
                alt="Hybrid set"
              />
            </div>
          ) : (
            <div className="w-full h-[275px] relative border-4 border-[#baa7b0]">
              <Image
                src="/hybrid-3.jpg"
                layout="fill"
                objectFit="contain"
                objectPosition="center"
                alt="Hybrid set"
              />
            </div>
          )}
          <div className="w-full flex items-center gap-4">
            <button
              className="flex flex-1 justify-center items-center py-3 bg-[#baa7b0]"
              onClick={() => changePhoto(-1)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 19.5L8.25 12l7.5-7.5"
                />
              </svg>
            </button>

            <button
              className="flex flex-1 justify-center items-center py-3 bg-[#baa7b0]"
              onClick={() => changePhoto(1)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.25 4.5l7.5 7.5-7.5 7.5"
                />
              </svg>
            </button>
          </div>
        </div>
      </section>

      <section className="w-full px-8 pt-2 pb-16 flex justify-center">
        <div className="container mx-auto flex flex-col gap-2.5 bg-[#2a2b2a] p-6">
          <h1 className="text-white text-2xl font-semibold text-center font-primary">
            Sign up to save!
          </h1>
          <p className="text-gray-300 font-light text-center mb-2 text-sm">
            Join our mailing list to receive exclusive offers and updates on new
            services!
          </p>
          <input
            type="text"
            placeholder="Email Address"
            className="bg-white px-4 py-2.5 w-full mt-1.5"
          />
          <button className="bg-[#baa7b0] text-[#2a2b2a] text-xl px-6 py-2.5 font-semibold font-primary">
            Sign Up
          </button>
        </div>
      </section>
    </>
  );
}
