import React from "react";
import { AlertTriangle, Clock10 } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const MaintenancePage = () => {
  return (
    <section className="min-h-screen bg-[#0d0b1d] text-white flex flex-col items-center justify-center px-4 text-center">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="max-w-md w-full bg-white/5 backdrop-blur-lg rounded-2xl p-8 text-center shadow-xl border border-white/10"
      >
        <div className="flex justify-center mb-4">
          <AlertTriangle className="text-yellow-400 w-12 h-12 animate-pulse" />
        </div>

        <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
          We’re Under Maintenance
        </h1>

        <p className="text-gray-300 mb-6">
          Our backend (Railway) hosting has expired. <br />
          We’re actively working on getting everything back online 🚀
        </p>

        <div className="flex items-center justify-center text-sm text-gray-400 gap-2 mb-4">
          <Clock10 className="w-4 h-4" />
          <span>Estimated downtime: Few days</span>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Link
            to="/"
            className="inline-block mt-2 px-6 py-3 bg-purple-600 hover:bg-purple-700 transition rounded-full font-medium"
          >
            Go Back Home
          </Link>
        </motion.div>

        <p className="text-sm text-gray-500 mt-6">
          Thank you for your patience 💖 <br />
          — Team InsightHub
        </p>
      </motion.div>
    </section>
  );
};

export default MaintenancePage;
