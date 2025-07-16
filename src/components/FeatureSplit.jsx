// src/components/FeatureSplit.jsx
import { BarChart3, Brain, UploadCloud } from "lucide-react";
import { motion } from "framer-motion";

const featureBlocks = [
  {
    title: "Upload and Go",
    desc: "Upload Excel or CSV files effortlessly and let the system do the rest. No configs, no hassle.",
    icon: <UploadCloud size={28} className="text-purple-400" />,
    img: "/undraw_upload_cucu.svg", // use any svg/png from unDraw or yours
  },
  {
    title: "AI Insights Instantly",
    desc: "Our AI engine highlights key insights, anomalies, and suggestions within seconds.",
    icon: <Brain size={28} className="text-purple-400" />,
    img: "/undraw_document-analysis_3c0y.svg",
    reverse: true,
  },
  {
    title: "Visual Charts on Autopilot",
    desc: "Auto-generate charts without touching a single chart tool. Export directly.",
    icon: <BarChart3 size={28} className="text-purple-400" />,
    img: "/undraw_data-trends_kv5v.svg",
  },
];

const FeatureSplit = () => {
  return (
    <section className="py-24 px-6 max-w-screen-xl mx-auto">
      {featureBlocks.map((block, i) => (
        <div
          key={i}
          className={`flex flex-col lg:flex-row items-center gap-12 mb-24 ${
            block.reverse ? "lg:flex-row-reverse" : ""
          }`}
        >
          {/* Left Side - Image */}
          <motion.img
            src={block.img}
            alt={block.title}
            className="w-full lg:w-1/2 max-w-md"
            initial={{ opacity: 0, x: block.reverse ? 100 : -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            loading="lazy"
          />

          {/* Right Side - Text */}
          <motion.div
            className="lg:w-1/2"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="mb-4">{block.icon}</div>
            <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4">
              {block.title}
            </h3>
            <p className="text-gray-400">{block.desc}</p>
          </motion.div>
        </div>
      ))}
    </section>
  );
};

export default FeatureSplit;
