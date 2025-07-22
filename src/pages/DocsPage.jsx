import { motion } from "framer-motion";
import { HelpCircle, UploadCloud, FileText, Mail } from "lucide-react";

const Section = ({ icon, title, children, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay }}
    whileHover={{ y: -5 }}
    className="relative group bg-white/5 border border-white/10 backdrop-blur p-6 sm:p-8 rounded-2xl shadow-md overflow-hidden transition-all"
  >
    <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 via-pink-500/10 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition duration-500 pointer-events-none z-0" />
    <div className="relative z-10">
      <h3 className="text-xl sm:text-2xl font-semibold text-white mb-4 flex items-center gap-2">
        <span className="p-1.5 bg-purple-700/30 rounded-full">{icon}</span>
        {title}
      </h3>
      <div className="text-gray-300 leading-relaxed">{children}</div>
    </div>
  </motion.div>
);

const DocsPage = () => {
  return (
    <section className="min-h-screen px-4 sm:px-6 py-24 max-w-screen-xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <h1 className="text-4xl sm:text-5xl font-extrabold bg-gradient-to-r from-purple-400 to-pink-500 text-transparent bg-clip-text mb-4">
          InsightHub Documentation
        </h1>
        <p className="text-gray-400 max-w-2xl mx-auto text-lg">
          Learn how to use InsightHub to convert raw data into meaningful stories — without writing code.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <Section
          title="Getting Started"
          icon={<HelpCircle size={24} className="text-purple-300" />}
        >
          <p>
            InsightHub is your AI companion for instant data exploration. Upload datasets and receive smart visuals,
            analysis, and suggestions within seconds — all powered by AI.
          </p>
        </Section>

        <Section
          title="How to Upload"
          icon={<UploadCloud size={24} className="text-purple-300" />}
          delay={0.1}
        >
          <ul className="list-disc pl-6 space-y-2">
            <li>
              ✅ Supported formats: <span className="text-purple-300">.csv</span>, <span className="text-purple-300">.xlsx</span>
            </li>
            <li>🔠 Ensure headers in the first row</li>
            <li>
              📏 File size must be under <span className="text-purple-300">5MB</span>
            </li>
            <li>🧠 Missing data is auto-handled during analysis</li>
          </ul>
        </Section>

        <Section
          title="FAQs"
          icon={<FileText size={24} className="text-purple-300" />}
          delay={0.2}
        >
          <div className="space-y-4">
            <div>
              <p className="text-white font-medium">❓ Why isn’t my file uploading?</p>
              <p>Ensure the format is .csv or .xlsx and it's smaller than 5MB.</p>
            </div>
            <div>
              <p className="text-white font-medium">📁 Can I upload multiple files?</p>
              <p>Currently, batch uploads aren't supported. One at a time.</p>
            </div>
            <div>
              <p className="text-white font-medium">🔐 Is my data stored?</p>
              <p>Nope! We process files temporarily — no permanent storage.</p>
            </div>
          </div>
        </Section>

        <Section
          title="Need Help?"
          icon={<Mail size={24} className="text-purple-300" />}
          delay={0.3}
        >
          <p className="mb-2">Facing issues? Contact our team and we’ll respond quickly.</p>
          <a
            href="mailto:itszaidkhan01@gmail.com"
            className="inline-block mt-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-full text-white text-sm font-medium transition"
          >
            📩 Email Support
          </a>
        </Section>
      </div>
    </section>
  );
};

export default DocsPage;
