"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import EmojiPainter from "@/components/emoji-painter";

// ✅ Airtable Setup Guide
// Go to airtable.com and create a base with:

// Table name: Waitlist

// Field: Email (type: email)

// Get your API key and Base ID:

// Base ID: Found in the API docs (https://airtable.com/{baseId}/api/docs)

// API Key: From your Airtable account settings

// Replace:

// ts
// Copy
// Edit
// axios.post('https://api.airtable.com/v0/appID/TableName', ...
// with:

// ts
// Copy
// Edit
// axios.post('https://api.airtable.com/v0/YOUR_BASE_ID/Waitlist', ...
// And set the correct Authorization header.

// 🧪 Notes
// You can move the Airtable POST logic into an API route (e.g., /api/waitlist) if you want to hide your API key from frontend.

// Use Environment Variables for your Airtable key

type TimeLeft = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

export default function Home() {
  const [email, setEmail] = useState("");
  const [targetDate, setTargetDate] = useState<Date | null>(null);
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    // Set target date only on the client
    const date = new Date();
    date.setMonth(date.getMonth() + 6);
    setTargetDate(date);
  }, []);

  useEffect(() => {
    if (!targetDate) return;

    const updateTimeLeft = () => {
      const now = new Date();
      const diff = Math.max(targetDate.getTime() - now.getTime(), 0);

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      setTimeLeft({ days, hours, minutes, seconds });
    };

    updateTimeLeft(); // initial
    const interval = setInterval(updateTimeLeft, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !email.includes("@")) {
      toast.error("Please enter a valid email.");
      return;
    }

    toast.promise(
      axios.post(
        "https://api.airtable.com/v0/appID/TableName",
        {
          fields: { Email: email },
        },
        {
          headers: {
            Authorization: `Bearer YOUR_AIRTABLE_API_KEY`,
            "Content-Type": "application/json",
          },
        }
      ),
      {
        loading: "Joining waitlist...",
        success: "You’ve been added to the waitlist!",
        error: "There was a problem. Please try again.",
      }
    );

    setEmail("");
  };

  useEffect(() => {
    const setViewportHeight = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty("--vh", `${vh}px`);
    };

    setViewportHeight();
    window.addEventListener("resize", setViewportHeight);
    return () => window.removeEventListener("resize", setViewportHeight);
  }, []);
  // add mouse paint different plant emoji
  // reaqcuaint myself with the email submission and what we need for that
  // remember time left until release
  // connect to my own airtable as practice - check if want to add resend later if you want to start sending emails then how easy is it
  // SEO - create a good implementation for that - its a repetitive task
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="overflow-hidden"
    >
      <main
        className="full-screen-height bg-[#0703fc] px-4
      overflow-hidden"
      >
        <EmojiPainter />
        <div className="text-center flex flex-col justify-center full-screen-height z-1 max-h-screen overflow-y-hidden">
          <nav className="flex justify-center p-6 text-slate-900 font-bold">
            <div className="absolute top-4 left-4">
              <div className="flex items-center justify-center text-white text-2xl md:text-3xl">
                Groji
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
            <div className="absolute top-6 right-4">
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                className="text-white cursor-pointer font-medium border rounded-full px-8 py-3 hover:bg-gray-300 hover:text-black transition"
              >
                Get in touch
              </motion.a>
            </div>
          </nav>

          {/* Hero Content */}
          <motion.section
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className=" text-white md:py-16 md:px-6 text-center rounded-3xl mx-auto z-1"
          >
            <div className="space-y-4 flex flex-col items-center justify-between h-full">
              {/* <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-white text-sm bg-white/30 backdrop-blur-lg rounded-full border-b border-b-0.1 border-white px-4 py-1 w-fit"
              >
                1,335 People are on waitlist
              </motion.div> */}

              <motion.h1
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.7 }}
                className="text-5xl md:text-7xl font-semibold text-white md:min-w-[80%] lg:max-w-[80%]"
              >
                Explore and grow through{" "}
                <span className="italic font-serif">serious play</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="text-white/90 md:max-w-xl mx-auto text-xl md:text-2xl"
              >
                We develop educational growing kits and products inspired by
                nature. <br />
                {/* At Groji, we are dedicated to supporting continuous learning and
                development. */}
              </motion.p>

              {/* <div className="min-h-[30vh]"> */}
              {/* <p className="text-white/70  mb-6">
                  Be amongst the first to experience Wait and launch a viral
                  waitlist. Sign up to be notified when we launch!
                </p> */}
              <form
                onSubmit={handleSubmit}
                className="flex flex-col sm:flex-row justify-center items-center gap-3 mb-6 w-full md:max-w-xl mx-auto mt-12"
              >
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="px-4 py-3 rounded-full bg-white/20 backdrop-blur-lg text--slate-900 border w-full placeholder-white outline-none md:min-w-[400px] "
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.97 }}
                  type="submit"
                  className="px-6 py-3 bg-white text-black rounded-full font-medium hover:bg-gray-300 transition cursor-pointer w-full"
                >
                  Join waitlist
                </motion.button>
              </form>

              <div className="flex justify-center text-center text-white text-xl font-semibold mb-2">
                {["days", "hours", "minutes", "seconds"].map((unit) => (
                  <div key={unit} className="mx-3">
                    <div>{timeLeft[unit as keyof typeof timeLeft]}</div>
                    <div className="text-sm text-neutral-400 uppercase">
                      {unit}
                    </div>
                  </div>
                ))}
              </div>

              <div className="text-sm text-neutral-100 mt-2">
                📅 LEFT UNTIL FULL LAUNCH
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
