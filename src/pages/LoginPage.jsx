import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FcGoogle } from "react-icons/fc";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { Eye, EyeOff } from "lucide-react";
import {
  UploadCloud,
  BarChart3,
  Sparkles,
} from "lucide-react";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { refreshUser } = useAuth(); // 

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const getCookie = (name) => {
    const match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));
    return match ? match[2] : null;
  };
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {

      await axios.get(`${backendUrl}/api/csrf/`);

      const csrfToken = getCookie("csrftoken");
      const res = await axios.post(`${backendUrl}/api/auth/login/`,
        { email, password },
        {
          withCredentials: true,
          headers: {
            "X-CSRFToken": csrfToken,
          },
        }
      );
      const { access, refresh } = res.data;

      localStorage.setItem("accessToken", access || "");
      localStorage.setItem("refreshToken", refresh || "");

      await refreshUser();
      alert("✅ Logged in successfully!");
      navigate("/");
    } catch (err) {
      if (!err.response) {
        navigate("/maintenance"); // backend unreachable
      }
      alert("❌ Login failed: " + (err.response?.data?.detail || err.message));
    } finally {
      setLoading(false);
    }
  };
  return (
    <section className="min-h-screen flex flex-col lg:flex-row">
      {/* Left */}
      <div className="hidden lg:flex w-1/2 bg-gradient-to-br from-[#1a1829] to-[#201d33] text-white p-12 items-center justify-center">
        <div className="text-center space-y-6 max-w-md">
          <Link
            to="/"
            className="text-5xl font-extrabold bg-gradient-to-r from-purple-400 to-pink-500 text-transparent bg-clip-text"
          >
            InsightHub
          </Link>
          <h2 className="text-2xl font-semibold">Welcome Back!</h2>
          <p className="text-base text-gray-400">
            Log in to continue exploring your data — transformed into insights.
          </p>
          <ul className="space-y-3 text-sm sm:text-base text-white text-left mx-auto w-fit">
            <li className="flex items-center gap-2">
              <UploadCloud size={18} color="#a78bfa" />
              Upload Excel/CSV files easily
            </li>
            <li className="flex items-center gap-2">
              <BarChart3 size={18} color="#f472b6" />
              AI-generated dashboards in seconds
            </li>
            <li className="flex items-center gap-2">
              <Sparkles size={18} color="#38bdf8" />
              Smart suggestions for better analysis
            </li>
          </ul>


        </div>
      </div>

      {/* Right */}
      <div className="w-full lg:w-1/2 flex items-center justify-center bg-[#0d0b1d] min-h-screen px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-8 sm:p-10 shadow-2xl"
        >
          <div className="text-center mb-8">
            <h2 className="text-3xl sm:text-4xl font-bold text-white">Log In</h2>
            <p className="text-sm text-gray-400 mt-2">
              Continue your journey with{" "}
              <span className="text-purple-400 font-medium">InsightHub</span>
            </p>
          </div>

          {/* Google Login */}
          <a
            href={`${backendUrl}/accounts/google/login/?process=login`}
            className="w-full flex items-center justify-center gap-3 border border-white/10 py-3 rounded-md text-white bg-white/10 hover:bg-white/20 transition mb-6"
          >
            <FcGoogle size={20} />
            Continue with Google
          </a>

          <div className="flex items-center gap-2 text-gray-500 text-sm mb-6">
            <hr className="flex-1 border-white/10" />
            or login with email
            <hr className="flex-1 border-white/10" />
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Email"
              className="w-full px-4 py-3 rounded-lg bg-white/10 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Password"
                className="w-full px-4 py-3 rounded-lg bg-white/10 text-white pr-12 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <div
                className="absolute right-3 top-1/2 -translate-y-1/2 text-white cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:brightness-110 transition rounded-lg text-white font-medium"
            >
              {loading ? "Logging in..." : "Log In"}
            </button>
          </form>

          <p className="text-center text-gray-400 mt-6 text-sm">
            Don’t have an account?{" "}
            <Link to="/signup" className="text-purple-400 hover:underline">
              Sign Up
            </Link>
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default LoginPage;
