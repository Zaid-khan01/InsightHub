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
    const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
    return match ? match[2] : null;
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
      const csrfRes = await axios.get(`${API}/api/csrf/`, {
        withCredentials: true,
      });

      const csrfToken =
        csrfRes.data?.csrfToken || getCookie("csrftoken");

      if (!csrfToken) {
        throw new Error("CSRF token missing.");
      }

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
