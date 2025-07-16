import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API = import.meta.env.VITE_BACKEND_URL;

axios.defaults.withCredentials = true;
axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFToken";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
    return null;
  };

  const fetchUser = async () => {
    try {
      await axios.get(`${API}/api/csrf/`, { withCredentials: true });
      const res = await axios.get(`${API}/api/auth/user/`, { withCredentials: true });

      setUser(res.data);
    } catch (err) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      // 1. Get CSRF cookie from backend
      await axios.get(`${API}/api/csrf/`, { withCredentials: true });

      // 2. Wait a tick to ensure cookie is available
      await new Promise((res) => setTimeout(res, 200));

      // 3. Get CSRF token from cookie
      const csrfToken = getCookie("csrftoken");
      console.log("👉 CSRF token during logout:", csrfToken);

      // 4. Send logout request with CSRF token in header
      await axios.post(
        `${API}/api/auth/logout/`,
        {},
        {
          headers: {
            "X-CSRFToken": csrfToken,
          },
          withCredentials: true,
        }
      );

      setUser(null);
      localStorage.removeItem("loggedIn");

      navigate("/", { replace: true });
      window.location.reload();
    } catch (err) {
      console.error("Logout error:", err.response?.data || err.message);
    }
  };


  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, logout, refreshUser: fetchUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
