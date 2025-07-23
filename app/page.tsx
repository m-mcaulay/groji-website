export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-100 via-slate-200 to-slate-900  px-4">
      <div className="text-center flex flex-col justify-between min-h-screen">
        {/* Navigation */}

        <nav className="flex justify-center p-6 text-slate-900 font-bold">
          <div className="absolute top-6 left-6">
            <div className="w-6 h-6 border border-white rounded-full flex items-center justify-center text-black">
              +
            </div>
          </div>

          {["Home", "Our Story", "FAQ", "Policies"].map((item) => (
            <a
              key={item}
              href="#"
              className="hover:underline underline-offset-4 decoration-slate-900 bg-blue-100 p-3 rounded-4xl cursor-pointer"
            >
              {item}
            </a>
          ))}
          <div className="absolute top-6 right-6">
            <button className="text-white text-xl cursor-pointer">📞</button>
          </div>
        </nav>

        {/* Hero Content */}
        <div className="space-y-4 pb-20 flex flex-col items-center">
          <div className="text-white text-sm bg-white/30 backdrop-blur-lg rounded-full border-b border-b-0.1 border-white px-4 py-1 w-fit">
            1,335 People are on waitlist
          </div>

          <h1 className="text-4xl sm:text-5xl font-semibold text-white">
            Clarity in <span className="italic font-serif">Complexity</span>
          </h1>

          <p className="text-white/70 max-w-xl mx-auto text-sm sm:text-base">
            We help you decode the noise. One insight at a time. <br />
            Transform chaos into clarity with intelligent solutions built for
            scale.
          </p>

          <button className="mt-6 px-6 py-2 bg-white text-black rounded-full font-medium hover:bg-gray-100 transition cursor-pointer">
            Get Started
          </button>
        </div>
      </div>

      {/* Email Subscription */}
    </main>
  );
}
