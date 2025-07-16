import axios from "axios";

export const getCSRFToken = async () => {
  try {
    // 1. Hit CSRF endpoint (must respond with Set-Cookie from backend domain)
    await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/csrf/`, {
      withCredentials: true,
    });

    // 2. Delay to ensure cookie is written
    await new Promise((res) => setTimeout(res, 100));

    // 3. ✅ NOW read cookie from correct domain (browser auto-maps it if domain correct)
    const cookies = document.cookie.split("; ");
    const csrfCookie = cookies.find(row => row.startsWith("csrftoken="));

    const token = csrfCookie?.split("=")[1];
    console.log("💡 CSRF Token (parsed):", token);

    return token || null;
  } catch (error) {
    console.error("❌ Failed to fetch CSRF token:", error);
    return null;
  }
};
