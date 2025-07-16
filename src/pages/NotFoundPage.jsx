import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const NotFoundPage = () => {
  return (
   <section className="min-h-[80vh] flex flex-col items-center justify-center text-center px-4 bg-[#0d0b1d] text-white">
      <motion.h1
        className="text-6xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-500 text-transparent bg-clip-text"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
      >
        404
      </motion.h1>

      <motion.p
        className="text-gray-400 mb-6 text-lg"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        Oops! The page you're looking for doesn't exist.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <Link
          to="/"
          className="px-6 py-3 bg-purple-600 hover:bg-purple-700 transition rounded-full font-medium"
        >
          Go Back Home
        </Link>
      </motion.div>
    </section>
  );
};

export default NotFoundPage;
