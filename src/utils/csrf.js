import axios from "axios";

export const getCSRFToken = async () => {
  try {
    await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/csrf/`, {
      withCredentials: true,
    });

    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("csrftoken="))
      ?.split("=")[1];

    return token || null;
  } catch (error) {
    console.error("Failed to fetch CSRF token:", error);
    return null;
  }
};
