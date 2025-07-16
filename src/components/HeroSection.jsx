import { motion } from "framer-motion";
import { useTypewriter, Cursor } from "react-simple-typewriter";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const navigate = useNavigate();
  const [text] = useTypewriter({
    words: ["No Code Required", "Instant Charts", "AI Suggestions", "Auto Cleanup"],
    loop: true,
    delaySpeed: 2000,
  });

  return (
    <section
      id="home"
      className="relative min-h-[85vh] flex flex-col items-center justify-center px-4 sm:px-6 pt-28 sm:pt-32 text-center overflow-hidden"
    >
      {/* 🟣 Single animated blur blob behind heading */}
      <motion.div
        className="absolute top-20 left-20 w-[300px] h-[300px] bg-purple-500/30 blur-[100px] rounded-full z-0 pointer-events-none -translate-x-1/2 -translate-y-1/2"
        animate={{
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Heading */}
      <motion.h1
        className="relative z-10 text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-wide 
                   bg-gradient-to-b from-sky-100 to-sky-400 text-transparent bg-clip-text 
                   antialiased mb-3"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Get Instant{" "}
        <span className="bg-gradient-to-br from-purple-400 to-pink-500 bg-clip-text text-transparent">
          Insights
        </span>{" "}
        From Your Data
      </motion.h1>

      {/* Subheading */}
      <p className="relative z-10 text-gray-400 text-lg max-w-xl mx-auto tracking-wide mb-1">
        Upload CSVs and auto-generate charts & reports.
      </p>

      {/* Typewriter */}
      <p className="relative z-10 text-base sm:text-lg text-purple-300 font-semibold mb-5">
        {text}
        <Cursor cursorStyle="|" />
      </p>

      {/* CTA */}
      <motion.button
        whileHover={{ scale: 1.05, boxShadow: "0 0 20px #a855f7" }}
        className="relative z-10 px-6 py-3 bg-purple-600 text-white rounded-full font-medium 
                   hover:bg-purple-700 transition"
        onClick={() => navigate("/upload")}
      >
        Try Now
      </motion.button>

      {/* Supported Tools */}
      <p className="relative z-10 text-gray-500 text-sm mt-8">Works with</p>
      <div className="relative z-10 flex gap-5 justify-center items-center mt-2">
        <img src="/excel.svg" className="h-10 sm:h-12" alt="Excel" />
        <img src="/csv.svg" className="h-10 sm:h-12" alt="CSV" />
        <img src="/pandas.svg" className="h-10 sm:h-12" alt="Pandas" />
      </div>
    </section>
  );
};

export default HeroSection;
