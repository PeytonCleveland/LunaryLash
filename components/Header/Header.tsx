import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import links from "./links";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const mobileNavStyles = isOpen
    ? "w-screen h-screen bg-[#2a2b2a] fixed top-0 right-0 transition-all duration-500 ease-in-out p-4"
    : "w-screen h-screen bg-[#2a2b2a] fixed top-0 -right-full transition-all duration-500 ease-in-out p-4";
  const router = useRouter();

  useEffect(() => {
    setIsOpen(false);
  }, [router.pathname]);

  return (
    <header className="w-full py-4 px-4 bg-[#2a2b2a] z-50">
      <div className={mobileNavStyles}>
        <div className="container mx-auto flex flex-col items-end">
          <div className="flex justify-between items-center w-full">
            <h1 className="text-white">Menu</h1>
            <button
              className="focus:outline-none"
              onClick={() => setIsOpen(false)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="white"
                className="w-10 h-10"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <nav className="flex flex-col gap-4 w-full text-white text-3xl mt-8">
            {links.map((link) => (
              <Link href={link.href} key={link.href}>
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>

      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-white">Lunary Lash</h1>
        <button className="focus:outline-none" onClick={() => setIsOpen(true)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="white"
            className="w-10 h-10"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          </svg>
        </button>
      </div>
    </header>
  );
};

export default Header;
