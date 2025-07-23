"use client";
import WaitlistSection from "@/components/waitlist-section";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const targetDate = new Date("2025-01-01T00:00:00");

export default function Home() {
  const [timeLeft, setTimeLeft] = useState(getTimeLeft());

  function getTimeLeft() {
    const now = new Date();
    const total = targetDate.getTime() - now.getTime();

    return {
      days: Math.floor(total / (1000 * 60 * 60 * 24)),
      hours: Math.floor((total / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((total / 1000 / 60) % 60),
      seconds: Math.floor((total / 1000) % 60),
    };
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(getTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <main
        className="min-h-screen bg-gradient-to-b from-slate-300 via-slate-600 to-slate-900 px-4
      overflow-hidden"
      >
        <div className="text-center flex flex-col justify-center min-h-screen">
          {/* Navigation */}

          <nav className="flex justify-center p-6 text-slate-900 font-bold">
            <div className="absolute top-6 left-6">
              <div className="w-6 h-6 border border-white rounded-full flex items-center justify-center text-black">
                +
              </div>
            </div>

            {/* {["Home", "Our Story", "FAQ", "Policies"].map((item) => (
              <a
                key={item}
                href="#"
                className="hover:underline underline-offset-4 decoration-slate-900 bg-blue-100 p-3 rounded-4xl cursor-pointer"
              >
                {item}
              </a>
            ))} */}
            <div className="absolute top-6 right-6">
              <button className="text-white text-xl cursor-pointer">📞</button>
            </div>
          </nav>

          {/* Hero Content */}
          <motion.section
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className=" text-white py-16 px-6 text-center rounded-3xl  mx-auto"
          >
            <div className="space-y-4  flex flex-col items-center justify-between h-full">
              <div className="text-white text-sm bg-white/30 backdrop-blur-lg rounded-full border-b border-b-0.1 border-white px-4 py-1 w-fit">
                1,335 People are on waitlist
              </div>

              <h1 className="text-7xl sm:text-7xl font-semibold text-white">
                Clarity in <span className="italic font-serif">Complexity</span>
              </h1>

              <p className="text-white/70 max-w-xl mx-auto text-sm sm:text-base">
                We help you decode the noise. One insight at a time. <br />
                Transform chaos into clarity with intelligent solutions built
                for scale.
              </p>

              {/* <div className="min-h-[30vh]"> */}
              {/* <p className="text-white/70  mb-6">
                  Be amongst the first to experience Wait and launch a viral
                  waitlist. Sign up to be notified when we launch!
                </p> */}
              <div className="flex flex-col sm:flex-row justify-center items-center gap-3  mb-6 max-w-xl mx-auto mt-12">
                <input
                  type="email"
                  placeholder="Email"
                  className="px-4 py-3 rounded-full bg-white/20 backdrop-blur-lg text--slate-900 border placeholder-white outline-none min-w-[400px]"
                />
                <button className="px-6 py-2 bg-white/70 text-black rounded-full font-medium hover:bg-gray-300 transition cursor-pointer">
                  Join Waitlist
                </button>
              </div>

              <div className="flex justify-center text-center text-white text-xl font-semibold mb-2">
                {["days", "hours", "minutes", "seconds"].map((unit, idx) => (
                  <div key={unit} className="mx-3">
                    <div>{timeLeft[unit as keyof typeof timeLeft]}</div>
                    <div className="text-sm text-neutral-400 uppercase">
                      {unit}
                    </div>
                  </div>
                ))}
              </div>

              <div className="text-sm text-neutral-500 mt-2">
                📅 LEFT UNTIL FULL RELEASE
              </div>
            </div>

            {/* <button className="mt-6 px-6 py-2 bg-white text-black rounded-full font-medium hover:bg-gray-100 transition cursor-pointer">
              Get Started
            </button> */}
            {/* </div> */}
          </motion.section>
        </div>
      </main>
    </motion.div>
  );
}
