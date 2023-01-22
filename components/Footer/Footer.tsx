import Image from "next/image";

const Footer = () => {
  return (
    <footer className="bg-[#2a2b2a] px-8 py-8">
      <div className="container mx-auto flex flex-col justify-between items-center gap-8">
        <div className="flex items-center gap-3">
          <Image src="/moon-white.png" alt="Logo" width={34} height={34} />
          <h1 className="text-white font-semibold font-primary text-lg">
            Lunary Lash
          </h1>
        </div>
        <div className="flex w-full justify-between gap-2">
          <div className="flex flex-col gap-2">
            <p className="text-white font-primary text-sm">Contact</p>
            <a
              href="tel:3342244248"
              className="text-white font-primary font-light text-xs"
            >
              334.224.4248
            </a>
            <a
              href="mailto:morgan@lunarylash.com"
              className="text-white font-primary font-light text-xs"
            >
              morgan@lunarylash.com
            </a>
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-white font-primary text-sm">Follow</p>
            <div className="flex items-center gap-2.5">
              <Image src="/ig.png" alt="Logo" width={28} height={28} />
              <Image src="/fb.png" alt="Logo" width={27} height={27} />
              <Image src="/tiktok.png" alt="Logo" width={27} height={27} />
            </div>
          </div>
        </div>
        <p className="text-white font-primary font-light text-xs mt-4">
          © 2023 All Rights Reserved
        </p>
      </div>
    </footer>
  );
};

export default Footer;
