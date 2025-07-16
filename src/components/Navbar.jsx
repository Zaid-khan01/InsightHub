import { Menu, X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import { Menu as HeadlessMenu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { useState, useEffect, Fragment } from "react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout, loading } = useAuth();
  const navigate = useNavigate();

  const navLinks = [
    { label: "Home", path: "/" },
    { label: "Upload", path: "/upload" },
    { label: "Dashboard", path: "/dashboard" },
    { label: "Docs", path: "/docs" },
  ];

 const handleLogout = async () => {
  await logout(); // ✅ Already handles navigation & reload
  setIsOpen(false); // ✅ Close mobile menu if open
};


useEffect(() => {
  if (!loading && !user && isOpen) {
    setIsOpen(false); // close dropdown if user logs out
  }
}, [user, loading]);

  const getAvatarURL = (user) => {
    if (user?.photo_url) return user.photo_url;
    const name = user?.displayName || user?.email?.split("@")[0] || "User";
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random`;
  };

  const avatarURL = user ? getAvatarURL(user) : null;

  return (
    <nav className="fixed top-0 w-full z-50 bg-black/30 backdrop-blur border-b border-white/10 shadow-md">
      <div className="max-w-screen-xl mx-auto px-6 py-4 flex justify-between items-center">
        <Link
          to="/"
          onClick={() => window.scrollTo(0, 0)}
          className="text-2xl font-extrabold bg-gradient-to-r from-purple-400 to-pink-500 text-transparent bg-clip-text"
        >
          InsightHub
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-6 text-gray-300 font-medium">
          {navLinks.map(({ label, path }) => (
            <Link key={label} to={path} className="hover:text-white transition">
              {label}
            </Link>
          ))}

          {!loading && user ? (
            <HeadlessMenu as="div" className="relative inline-block text-left">
              <div>
                <HeadlessMenu.Button className="flex items-center gap-2 focus:outline-none">
                  <div className="w-9 h-9 rounded-full border-2 border-white/20 overflow-hidden">
                    {avatarURL && (
                      <img
                        src={avatarURL}
                        alt="User Avatar"
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                      />
                    )}
                  </div>
                  <ChevronDownIcon className="w-4 h-4 text-white" />
                </HeadlessMenu.Button>
              </div>

              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform scale-95 opacity-0"
                enterTo="transform scale-100 opacity-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform scale-100 opacity-100"
                leaveTo="transform scale-95 opacity-0"
              >
                <HeadlessMenu.Items className="absolute right-0 mt-2 w-44 origin-top-right bg-white/10 backdrop-blur-md border border-white/10 divide-y divide-white/10 rounded-md shadow-lg ring-1 ring-black/10 focus:outline-none text-sm text-white">
                  <div className="px-3 py-2">
                    <span className="block font-medium">
                      {user.displayName || "My Account"}
                    </span>
                    <span className="text-xs text-gray-300">{user.email}</span>
                  </div>
                  <div className="py-1">
                    <HeadlessMenu.Item>
                      {({ active }) => (
                        <button
                          onClick={() => navigate("/dashboard")}
                          className={`${
                            active ? "bg-white/10" : ""
                          } block px-4 py-2 w-full text-left`}
                        >
                          Dashboard
                        </button>
                      )}
                    </HeadlessMenu.Item>
                    <HeadlessMenu.Item>
                      {({ active }) => (
                        <button
                          onClick={handleLogout}
                          className={`${
                            active ? "bg-white/10" : ""
                          } block px-4 py-2 w-full text-left text-red-400`}
                        >
                          Logout
                        </button>
                      )}
                    </HeadlessMenu.Item>
                  </div>
                </HeadlessMenu.Items>
              </Transition>
            </HeadlessMenu>
          ) : (
            !loading && (
              <Link
                to="/login"
                className="px-4 py-2 rounded-full bg-purple-600 hover:bg-purple-700 text-white transition font-medium"
              >
                Login / Signup
              </Link>
            )
          )}
        </div>

        {/* Mobile Toggle */}
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)} className="text-white">
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden bg-black/50 backdrop-blur px-6 pb-4"
          >
            {navLinks.map(({ label, path }) => (
              <Link
                key={label}
                to={path}
                onClick={() => setIsOpen(false)}
                className="block text-gray-300 py-2 border-b border-white/10 hover:text-white transition"
              >
                {label}
              </Link>
            ))}

            {!loading && user ? (
              <>
                <div className="flex items-center gap-3 mt-4">
                  {avatarURL && (
                    <img
                      src={avatarURL}
                      alt="User Avatar"
                      referrerPolicy="no-referrer"
                      className="w-9 h-9 rounded-full border-2 border-white/20 object-cover"
                    />
                  )}
                  <div>
                    <p className="text-sm font-medium text-white">
                      {user.displayName || "User"}
                    </p>
                    <p className="text-xs text-gray-400">{user.email}</p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    setIsOpen(false);
                    navigate("/dashboard");
                  }}
                  className="mt-4 w-full text-white bg-green-600 hover:bg-green-700 text-center py-2 rounded-full font-medium transition"
                >
                  Dashboard
                </button>
                <button
                  onClick={handleLogout}
                  className="mt-2 w-full text-white bg-red-600 hover:bg-red-700 text-center py-2 rounded-full font-medium transition"
                >
                  Logout
                </button>
              </>
            ) : (
              !loading && (
                <Link
                  to="/login"
                  onClick={() => setIsOpen(false)}
                  className="block mt-3 text-white bg-purple-600 hover:bg-purple-700 text-center py-2 rounded-full font-medium transition"
                >
                  Login / Signup
                </Link>
              )
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
