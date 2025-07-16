import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";

import { AuthProvider } from "./context/AuthContext";
import { UploadProvider } from "./context/UploadContext";
import { FileProvider } from "./context/FileContext"; // ✅ new

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <UploadProvider>
          <FileProvider> {/* ✅ Wrap App inside FileProvider */}
            <App />
          </FileProvider>
        </UploadProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);
