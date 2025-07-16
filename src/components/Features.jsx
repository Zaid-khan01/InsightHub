import { Lightbulb, FileBarChart, UploadCloud, BarChart3, Brain, Download } from 'lucide-react';
import { motion } from 'framer-motion';

const features = [
  {
    icon: <UploadCloud size={28} />,
    title: "Easy Upload",
    desc: "Drag & drop your Excel or CSV file to begin.",
  },
  {
    icon: <FileBarChart size={28} />,
    title: "Auto Analysis",
    desc: "Detect missing data, correlations, trends instantly.",
  },
  {
    icon: <BarChart3 size={28} />,
    title: "Visualize Instantly",
    desc: "Auto-generate charts and visual reports.",
  },
  {
    icon: <Brain size={28} />,
    title: "AI-Powered Suggestions",
    desc: "Smart insights from your data in seconds.",
  },
  {
    icon: <Download size={28} />,
    title: "Export Reports",
    desc: "One-click download of analysis reports.",
  },
  {
    icon: <Lightbulb size={28} />,
    title: "Smart Recommendations",
    desc: "What to improve or fix in your dataset.",
  },
];

const Features = () => {
  return (
    <section id="features" className="py-20 px-6 max-w-screen-xl mx-auto">
      <h2 className="text-center text-3xl sm:text-4xl font-bold text-white mb-4">
        Powerful Features
      </h2>
      <p className="text-center text-gray-400 max-w-2xl mx-auto mb-12">
        Everything you need to get insights from your spreadsheet.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map((feat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="bg-white/5 backdrop-blur rounded-2xl p-6 text-white shadow-md hover:scale-105 transition transform border border-white/10"
          >
            <div className="mb-4 text-purple-400">{feat.icon}</div>
            <h3 className="text-xl font-semibold mb-2">{feat.title}</h3>
            <p className="text-sm text-gray-300">{feat.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Features;
