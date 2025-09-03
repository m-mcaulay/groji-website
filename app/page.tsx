"use client";

import Head from "next/head";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import EmojiPainter from "@/components/emoji-painter";
import Link from "next/link";
import { Checkbox } from "@/components/checkbox";

// TODO
// - analytics
// - seo
// - a11y
// - reduce motion

type TimeLeft = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

export default function Home() {
  const [email, setEmail] = useState("");
  const [marketingConsent, setMarketingConsent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [hp, setHp] = useState(""); // honeypot

  const [targetDate, setTargetDate] = useState<Date | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return; // guard for SSR

    const storedDate = localStorage.getItem("launchTargetDate");

    if (storedDate) {
      setTargetDate(new Date(storedDate));
    } else {
      const date = new Date();
      date.setMonth(date.getMonth() + 6);

      // Ensure 6 months exactly even across month boundary (fix edge cases)
      const finalDate = new Date(date.toISOString());

      localStorage.setItem("launchTargetDate", finalDate.toISOString());
      setTargetDate(finalDate);
    }
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

    updateTimeLeft(); // initial call
    const interval = setInterval(updateTimeLeft, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !email.includes("@")) {
      toast.error("Please enter a valid email.");
      return;
    }

    try {
      setLoading?.(true); // if you have a loading state; otherwise remove

      await toast.promise(
        axios.post("/api/join-waitlist", {
          email,
          marketingConsent,
          source: "waitlist-landing",
          ts: Date.now(),
          hp,
        }),
        {
          loading: "Joining waitlist...",
          success: "You’ve been added to the waitlist!",
          error: (err) => {
            const msg =
              err?.response?.data?.error ||
              err.message ||
              "There was a problem. Please try again.";
            if (err.response?.status === 409)
              return "You're already on the waitlist.";
            return msg;
          },
        }
      );

      // Reset on success
      setEmail("");
      // setFreeTier?.(false);
      setMarketingConsent?.(false);
    } catch (err) {
      console.error("Error submitting email:", err);
    } finally {
      setLoading?.(false);
    }
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

  // colors
  // #8657ce - new purple
  // #ad95d1 - original from steves swatch
  // #6e38c0 -this one passes
  // #525a3d - this green passes
  // #6f2fcd - this one passes
  // #5b06e8
  // green border-[hsl(10 20% 100%)] bg-[#305900]

  return (
    <>
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "Groji",
              url: "https://groji-nature-kits.vercel.app/",
              description:
                "Join the waitlist for Groji, educational growing kits inspired by nature.",
            }),
          }}
        />
      </Head>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="overflow-hidden"
      >
        <main className="full-screen-height bg-[#3c27ff] px-4 overflow-hidden">
          <EmojiPainter />
          <div className="text-center flex flex-col justify-center full-screen-height z-1 max-h-screen overflow-y-hidden">
            <nav className="absolute top-5 md:top-6 md:left-6 md:right-6 left-4 right-4 flex justify-between items-center font-bold">
              <div className="flex items-center justify-center text-[hsl(280 30% 100%)] text-xl md:text-3xl">
                Groji
              </div>
              <div className="">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.97 }}
                  className="text-white cursor-pointer font-bold border border-[hsl(280 30% 100%)] bg-white/20 backdrop-blur-lg rounded-full text-sm md:text-lg px-6 py-2 md:px-8 md:py-3  hover:text-[hsl(280 30% 100%)] transition"
                >
                  <a
                    href="mailto:stephen@studiomod.uk"
                    aria-label="Send an email to stephen@studiomod.uk"
                  >
                    Get in touch<span className="sr-only"> via email</span>
                  </a>
                </motion.div>
              </div>
            </nav>

            {/* Hero Content */}
            <motion.section
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-[hsl(280 30% 100%)] mt-12  md:py-32 md:px-6 text-center rounded-3xl mx-auto z-1"
            >
              <div className="space-y-4 flex flex-col items-center justify-between h-full">
                {/* <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-[hsl(280 30% 100%)] text-sm bg-white/30 backdrop-blur-lg rounded-full border-b border-b-0.1 border-white px-4 py-1 w-fit"
              >
                1,335 People are on waitlist
              </motion.div> */}

                <motion.h1
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1, duration: 0.7 }}
                  className="text-5xl md:text-7xl font-semibold leading-[1.1] text-[hsl(280 30% 100%)] md:min-w-[100%] lg:max-w-[100%]"
                >
                  Explore, Play, <span className="italic font-serif">Grow</span>
                  .<br />
                </motion.h1>
                {/* <motion.h2>Where Curiosity Blooms.</motion.h2> */}

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                  className="text-[hsl(280 30% 100%)]/90 md:max-w-xl mx-auto text-xl md:text-2xl"
                >
                  <br />
                  We develop educational growing kits and products inspired by
                  nature. <br />
                </motion.p>

                {/* <div className="min-h-[30vh]"> */}
                {/* <p className="text-[hsl(280 30% 100%)]/70  mb-6">
                  Be amongst the first to experience Wait and launch a viral
                  waitlist. Sign up to be notified when we launch!
                </p> */}
                <form
                  onSubmit={handleSubmit}
                  className="flex flex-col items-center gap-3 mb-6 w-full md:max-w-xl mx-auto mt-6 md:mt-12"
                >
                  <div className="flex flex-col sm:flex-row justify-center items-center gap-3 w-full">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      autoComplete="email"
                      className="px-4 py-3 rounded-full bg-white/20 backdrop-blur-lg text-white border font-bold border-white w-full placeholder-white outline-none md:min-w-[400px] md:max-w-[300px]"
                    />

                    <motion.button
                      whileHover={{ scale: loading ? 1 : 1.05 }}
                      whileTap={{ scale: loading ? 1 : 0.97 }}
                      type="submit"
                      disabled={loading}
                      aria-disabled={loading}
                      className="px-6 py-3 bg-white text-black rounded-full font-medium hover:bg-white/20 hover:backdrop-blur-lg hover:text-white hover:border hover:border-white transition cursor-pointer w-full sm:w-auto disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      {loading ? "Joining…" : "Join waitlist"}
                    </motion.button>
                  </div>

                  {/* Marketing consent */}
                  <div className="w-full flex justify-center z-10 relative">
                    <Checkbox
                      label="I’d like to receive occasional updates, offers, and news (optional)."
                      checked={marketingConsent}
                      onChange={setMarketingConsent}
                    />
                  </div>

                  {/* Honeypot (hidden from users, caught by bots) */}
                  <input
                    type="text"
                    name="website"
                    value={hp}
                    onChange={(e) => setHp(e.target.value)}
                    className="hidden"
                    tabIndex={-1}
                    autoComplete="off"
                  />

                  <p
                    id="privacy-note"
                    className="text-[11px] text-[hsl(280 30% 100%)]/70 mt-2 text-center max-w-sm"
                  >
                    We’ll email you when we launch (legitimate interest).
                    Marketing emails are only sent if you opt in. Emails are
                    sent via our provider MailerLite. See our{" "}
                    <Link href="/privacy-policy" className="underline">
                      Privacy Notice
                    </Link>
                    . Unsubscribe anytime.
                  </p>
                </form>

                {/* <div className="flex justify-center text-center text-[hsl(280 30% 100%)] text-sm md:text-xl font-semibold mb-1 md:mb-2 w-full">
                  {["days", "hours", "minutes", "seconds"].map((unit) => (
                    <div key={unit} className="mx-3">
                      <div>{timeLeft[unit as keyof typeof timeLeft]}</div>
                      <div className="text-[10px] md:text-sm text-neutral-200 uppercase">
                        {unit}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="text-[10px] md:text-sm text-neutral-100 mt-0 md:mt-2">
                  📅 LEFT UNTIL LAUNCH
                </div> */}
              </div>

              {/* <button className="mt-6 px-6 py-2 bg-white text-black rounded-full font-medium hover:bg-gray-100 transition cursor-pointer">
              Get Started
            </button> */}
              {/* </div> */}
            </motion.section>
          </div>
        </main>
      </motion.div>
      <footer className="flex justify-between items-center w-full p-2 absolute bottom-0 text-sm">
        <p>© Groji 2025</p>

        <div className="flex pointer-events-auto z-10">
          <Link
            href="/privacy-policy"
            className="px-3 cursor-pointer hover:underline pointer-events-auto"
          >
            Privacy Notice
          </Link>
          <a
            href={`mailto:info@groji.co.uk`}
            className="font-bold hover:underline"
          >
            info@groji.co.uk
          </a>
        </div>
      </footer>
    </>
  );
}
