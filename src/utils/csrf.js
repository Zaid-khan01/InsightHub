import axios from "axios";

export const getCSRFToken = async () => {
  try {
    // Get the cookie by calling your /api/csrf/ endpoint
    await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/csrf/`, {
      withCredentials: true,
    });

    // Safely extract csrf token using regex (more reliable than split)
    const match = document.cookie.match(/csrftoken=([^;]+)/);
    const token = match ? match[1] : null;

    console.log("💡 CSRF Token (parsed):", token);
    return token;
  } catch (error) {
    console.error("❌ Failed to fetch CSRF token:", error);
    return null;
  }
};
