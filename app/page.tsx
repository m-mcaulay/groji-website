"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";

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

// Use Environment Variables for your Airtable key.

const targetDate = new Date("2025-01-01T00:00:00");

function getTimeLeft() {
  const now = new Date();
  const total = targetDate.getTime() - now.getTime();

  return {
    days: Math.max(Math.floor(total / (1000 * 60 * 60 * 24)), 0),
    hours: Math.max(Math.floor((total / (1000 * 60 * 60)) % 24), 0),
    minutes: Math.max(Math.floor((total / 1000 / 60) % 60), 0),
    seconds: Math.max(Math.floor((total / 1000) % 60), 0),
  };
}

export default function Home() {
  const [timeLeft, setTimeLeft] = useState(getTimeLeft());
  const [email, setEmail] = useState("");

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(getTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

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
            className=" text-white md:py-16 md:px-6 text-center rounded-3xl mx-auto"
          >
            <div className="space-y-4 flex flex-col items-center justify-between h-full">
              <div className="text-white text-sm bg-white/30 backdrop-blur-lg rounded-full border-b border-b-0.1 border-white px-4 py-1 w-fit">
                1,335 People are on waitlist
              </div>

              <h1 className="text-5xl md:text-7xl font-semibold text-white">
                Clarity in <span className="italic font-serif">Complexity</span>
              </h1>

              <p className="text-white/70 md:max-w-xl mx-auto text-sm sm:text-base">
                We help you decode the noise. One insight at a time. <br />
                Transform chaos into clarity with intelligent solutions built
                for scale.
              </p>

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
                <button
                  type="submit"
                  className="px-6 py-2 bg-white/70 text-black rounded-full font-medium hover:bg-gray-300 transition cursor-pointer w-full"
                >
                  Join Waitlist
                </button>
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
