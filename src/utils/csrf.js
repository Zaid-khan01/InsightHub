import axios from "axios";

export const getCSRFToken = async () => {
  try {
    // 1. Send request to set CSRF cookie
    await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/csrf/`, {
      withCredentials: true,
    });

    // 2. Wait a bit (important for Safari sometimes)
    await new Promise((res) => setTimeout(res, 100));

    // 3. Read from document.cookie
    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("csrftoken="))
      ?.split("=")[1];

    console.log("💡 CSRF Token (parsed):", token);
    return token || null;
  } catch (error) {
    console.error("❌ Failed to fetch CSRF token:", error);
    return null;
  }
};
