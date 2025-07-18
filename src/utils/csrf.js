import axios from "axios";

export const getCSRFToken = async () => {
  try {
    const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/csrf/`, {
      withCredentials: true,
    });

    const token = res.data?.csrfToken;

    return token || null;
  } catch (err) {
    console.error("❌ Failed to fetch CSRF token:", err);
    return null;
  }
};
