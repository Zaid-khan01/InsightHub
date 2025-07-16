import { useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import axios from "axios";
import { Eye, EyeOff } from "lucide-react";
import {
  LayoutDashboard,
  ShieldCheck,
  Rocket,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";

const SignUpPage = () => {
  const navigate = useNavigate();
  const { refreshUser } = useAuth();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirm: "",
  });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  // Backend base URL from environment variable
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirm) {
      alert("❌ Passwords do not match!");
      return;
    }

    setLoading(true);
    try {
      // ✅ Get CSRF cookie first
      await axios.get(`${backendUrl}/api/csrf/`, { withCredentials: true });

      const csrfToken = document.cookie
        .split("; ")
        .find((row) => row.startsWith("csrftoken="))
        ?.split("=")[1];

      const res = await axios.post(
        `${backendUrl}/api/auth/registration/`,
        {
          email: formData.email,
          password1: formData.password,
          password2: formData.confirm,
          first_name: formData.name.split(" ")[0],
          last_name: formData.name.split(" ").slice(1).join(" "),
        },
        {
          withCredentials: true,
          headers: {
            "X-CSRFToken": csrfToken,
          },
        }
      );

      const { access, refresh } = res.data;
      localStorage.setItem("accessToken", access);
      localStorage.setItem("refreshToken", refresh);

      await refreshUser();
      alert("✅ Account created successfully!");
      navigate("/dashboard");
    } catch (err) {
      const msg = err.response?.data?.non_field_errors?.[0]
        || err.response?.data?.email?.[0]
        || err.response?.data?.password1?.[0]
        || err.message;
      alert("❌ Signup failed: " + msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen flex flex-col lg:flex-row">
      {/* Left Side */}
      <div className="hidden lg:block w-1/2 fixed top-0 left-0 h-screen bg-gradient-to-br from-[#1a1829] to-[#201d33] text-white p-12 overflow-y-auto z-10">
        <div className="text-center space-y-6 max-w-md mx-auto mt-20">
          <Link
            to="/"
            className="text-5xl font-extrabold bg-gradient-to-r from-purple-400 to-pink-500 text-transparent bg-clip-text"
          >
            InsightHub
          </Link>
          <h2 className="text-2xl font-semibold text-white">Create Account</h2>
          <p className="text-base text-gray-400">
            Join InsightHub and transform your data into visual insights.
          </p>
          <ul className="space-y-3 text-sm sm:text-base text-white text-left mx-auto w-fit">
            <li className="flex items-center gap-2">
              <LayoutDashboard size={18} color="#a78bfa" />
              Create dashboards with zero coding.
            </li>
            <li className="flex items-center gap-2">
              <ShieldCheck size={18} color="#34d399" /> {/* green-400 */}
              Your data stays private and secure.
            </li>
            <li className="flex items-center gap-2">
              <Rocket size={18} color="#f472b6" />
              Start analyzing in less than a minute.
            </li>
          </ul>
        </div>
      </div>

      {/* Right Side */}
      <div className="w-full lg:ml-[50%] flex justify-center items-center bg-[#0d0b1d] px-4 sm:px-6 py-12 min-h-screen">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white/5 border border-white/10 backdrop-blur-xl p-8 sm:p-10 rounded-2xl shadow-md max-w-md w-full"
        >
          <div className="text-center mb-6">
            <h2 className="text-3xl font-bold text-white">Sign Up</h2>
            <p className="text-sm text-gray-400 mt-2">
              Get started with{" "}
              <span className="text-purple-400 font-medium">InsightHub</span>
            </p>
          </div>

          {/* Google Sign Up */}
          <a
            href={`${import.meta.env.VITE_BACKEND_URL}/accounts/google/login/?process=signup`}
            className="w-full flex items-center justify-center gap-3 border border-white/10 py-3 rounded-md text-white bg-white/10 hover:bg-white/20 transition mb-6"
          >
            <FcGoogle size={20} />
            Continue with Google
          </a>

          <div className="flex items-center gap-2 text-gray-500 text-sm mb-6">
            <hr className="flex-1 border-white/10" />
            or sign up with email
            <hr className="flex-1 border-white/10" />
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <input
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              placeholder="Full Name"
              className="w-full bg-transparent border border-white/20 rounded-md px-4 py-2 text-white focus:outline-none focus:border-purple-500"
            />
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              className="w-full bg-transparent border border-white/20 rounded-md px-4 py-2 text-white focus:outline-none focus:border-purple-500"
            />

            {/* Password Field */}
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                required
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
                className="w-full bg-transparent border border-white/20 rounded-md px-4 py-2 pr-10 text-white focus:outline-none focus:border-purple-500"
              />
              <div
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </div>
            </div>

            {/* Confirm Password Field */}
            <div className="relative">
              <input
                type={showConfirm ? "text" : "password"}
                name="confirm"
                required
                value={formData.confirm}
                onChange={handleChange}
                placeholder="Confirm Password"
                className="w-full bg-transparent border border-white/20 rounded-md px-4 py-2 pr-10 text-white focus:outline-none focus:border-purple-500"
              />
              <div
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer"
                onClick={() => setShowConfirm(!showConfirm)}
              >
                {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:brightness-110 transition rounded-lg text-white font-medium"
            >
              {loading ? "Creating..." : "Sign Up"}
            </button>
          </form>

          <p className="text-sm text-center text-gray-400 mt-4">
            Already have an account?{" "}
            <Link to="/login" className="text-purple-400 hover:underline">
              Login
            </Link>
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default SignUpPage;
