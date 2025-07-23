"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";

const targetDate = new Date("2025-01-01T00:00:00");

const WaitlistSection = () => {
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
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      className=" text-white py-16 px-6 text-center rounded-3xl  mx-auto"
    >
      <div className="inline-flex items-center mb-4 px-4 py-1 rounded-full bg-white text-slate-900 text-sm">
        <span className="w-2 h-2 bg-slate-900 rounded-full mr-2"></span>
        AVAILABLE IN EARLY 2025
      </div>

      <h2 className="text-3xl md:text-4xl font-bold mb-4">Get early access</h2>
      <p className="text-neutral-400 mb-6">
        Be amongst the first to experience Wait and launch a viral waitlist.
        Sign up to be notified when we launch!
      </p>

      <div className="flex flex-col sm:flex-row justify-center items-center gap-3 mb-6 max-w-xl mx-auto">
        <input
          type="email"
          placeholder="Email"
          className="px-4 py-3 rounded-full bg-neutral-800 text-white placeholder-neutral-500 outline-none min-w-[400px]"
        />
        <button className="bg-slate-900 text-white px-6 py-2 rounded-full font-medium">
          Join Waitlist
        </button>
      </div>

      {/* Waitlist avatars and count */}
      {/* <div className="flex justify-center items-center gap-3 mb-6 text-neutral-400 text-sm">
        <span>Join 12,500+ others on the waitlist</span>
      </div> */}

      {/* Countdown */}
      <div className="flex justify-center text-center text-white text-xl font-semibold mb-2">
        {["days", "hours", "minutes", "seconds"].map((unit, idx) => (
          <div key={unit} className="mx-3">
            <div>{timeLeft[unit as keyof typeof timeLeft]}</div>
            <div className="text-sm text-neutral-400 uppercase">{unit}</div>
          </div>
        ))}
      </div>

      <div className="text-sm text-neutral-500 mt-2">
        📅 LEFT UNTIL FULL RELEASE
      </div>
    </motion.section>
  );
};

export default WaitlistSection;
