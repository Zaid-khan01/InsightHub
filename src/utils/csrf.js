// src/utils/csrf.js
import axios from "axios";

export const getCSRFToken = async () => {
  try {
    // ✅ Step 1: Call backend endpoint to get CSRF token
    const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/csrf/`, {
      withCredentials: true,
    });

    // ✅ Step 2: Read CSRF token directly from response (no need to parse cookies manually)
    const token = res.data?.csrfToken;

    console.log("✅ CSRF token from API response:", token);
    return token || null;
  } catch (err) {
    console.error("❌ Failed to fetch CSRF token:", err);
    return null;
  }
};
