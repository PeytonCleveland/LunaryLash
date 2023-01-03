export default function Home() {
  return (
    <>
      <section className="w-full px-4 py-16 flex justify-center">
        <div className="container mx-auto flex flex-col gap-4">
          <div className="w-full h-[275px] bg-gray-400 rounded-tl-3xl rounded-br-3xl"></div>

          <h1 className="text-[#2a2b2a] text-3xl">
            Enhance your natural beauty with Lunary Lash.
          </h1>
          <button className="bg-[#2a2b2a] text-white text-xl px-6 py-2.5 rounded-tl-xl rounded-br-xl w-fit">
            Book Online
          </button>
        </div>
      </section>

      <section className="w-full px-4 py-12 flex justify-center bg-[#2a2b2a]">
        <div className="container mx-auto flex flex-col gap-4">
          <h1 className="text-white text-3xl">Services</h1>

          <div className="flex flex-col gap-8">
            <div className="w-full flex flex-col">
              <div className="w-full h-[200px] bg-gray-400 rounded-tl-2xl"></div>
              <div className="w-full p-3 bg-white rounded-br-2xl flex flex-col gap-3">
                <div className="w-full flex justify-between">
                  <h6 className="text-lg text-[#2a2b2a] font-semibold">
                    Classic Set
                  </h6>
                  <h6 className="text-lg text-[#2a2b2a] font-semibold">$150</h6>
                </div>
              </div>
            </div>

            <div className="w-full flex flex-col">
              <div className="w-full h-[200px] bg-gray-400 rounded-tl-2xl"></div>
              <div className="w-full p-3 bg-white rounded-br-2xl flex flex-col gap-3">
                <div className="w-full flex justify-between">
                  <h6 className="text-lg text-[#2a2b2a] font-semibold">
                    Volume Set
                  </h6>
                  <h6 className="text-lg text-[#2a2b2a] font-semibold">$200</h6>
                </div>
              </div>
            </div>

            <div className="w-full flex flex-col">
              <div className="w-full h-[200px] bg-gray-400 rounded-tl-2xl"></div>
              <div className="w-full p-3 bg-white rounded-br-2xl flex flex-col gap-3">
                <div className="w-full flex justify-between">
                  <h6 className="text-lg text-[#2a2b2a] font-semibold">
                    Lash Cleaning
                  </h6>
                  <h6 className="text-lg text-[#2a2b2a] font-semibold">$25</h6>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
