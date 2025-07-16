// ✅ App.jsx (Full Updated Code with FileContext)

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Routes, Route, useLocation } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// Homepage sections
import HeroSection from "./components/HeroSection";
import Features from "./components/Features";
import FeatureSplit from "./components/FeatureSplit";

// Separate pages
import UploadSection from "./components/UploadSection";
import DashboardPreview from "./components/DashboardPreview";
import DocsPage from "./pages/DocsPage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import NotFoundPage from "./pages/NotFoundPage";
import ChatbotLauncher from "./components/ChatbotLauncher";

import { FileProvider } from "./context/FileContext";

// ✅ Home Page
const Home = () => (
  <>
    <HeroSection />
    <main className="max-w-screen-xl mx-auto px-4 sm:px-6 pb-0 sm:pb-15">
      <Features />
      <FeatureSplit />

    </main>
  </>
);

// ✅ Upload Page
const UploadPage = () => (
  <main className="max-w-screen-xl mx-auto px-4 sm:px-6 py-12">
    <UploadSection />
  </main>
);

// ✅ Dashboard Page
const DashboardPage = () => (
  <main className="max-w-screen-xl mx-auto px-4 sm:px-6 py-12">
    <DashboardPreview />
  </main>
);

function App() {
  const location = useLocation();
  const hideLayout =
    location.pathname === "/login" || location.pathname === "/signup";
  const hideBot = ["/login", "/signup"].includes(location.pathname);

  return (
    <FileProvider>
      <div className="bg-[#0d0b1d] text-white font-inter overflow-x-hidden">
        {!hideLayout && <Navbar />}
        <ScrollToTop />

        {/* 🌐 All Routes */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/upload" element={<UploadPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/docs" element={<DocsPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>

        {!hideBot && <ChatbotLauncher />}
        {!hideLayout && <Footer />}

        <ToastContainer position="top-right" autoClose={2500} pauseOnHover theme="dark" />
      </div>
    </FileProvider>
  );
}

export default App;