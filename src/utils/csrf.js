import axios from "axios";

export const getCSRFToken = async () => {
  try {
    // 1. Request backend to set CSRF cookie
    await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/csrf/`, {
      withCredentials: true,
    });

    // 2. Small delay helps Safari sometimes
    await new Promise((res) => setTimeout(res, 100));

    // 3. Read cookie from browser
    const csrfToken = document.cookie
      .split("; ")
      .find((cookie) => cookie.startsWith("csrftoken="))
      ?.split("=")[1];

    console.log("✅ Parsed CSRF token from cookie:", csrfToken);
    return csrfToken || null;
  } catch (err) {
    console.error("❌ Error getting CSRF token:", err);
    return null;
  }
};
