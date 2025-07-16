import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import CountUp from "react-countup";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, PieChart, Pie, Cell
} from "recharts";
import DownloadInsights from "./DownloadInsights";
import { useFile } from "../context/FileContext";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const COLORS = ["#a855f7", "#22d3ee", "#f97316", "#10b981", "#ef4444", "#eab308", "#3b82f6"];

const DashboardPreview = () => {
  const { file } = useFile();
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [activeTab, setActiveTab] = useState("Overview");
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isChartReady, setIsChartReady] = useState(false);

  const overviewRef = useRef(null);
  const suggestionRef = useRef(null);
  const chartRef = useRef(null);
  const pieRef = useRef(null);

  const tabs = ["Overview", "Charts", "AI Suggestions"];

  useEffect(() => {
    if (!loading && !user) {
      navigate(`/login?next=${location.pathname}`);
    }
  }, [user, loading, location.pathname, navigate]);

  // 📊 Fetch data from backend after file upload
  useEffect(() => {
    const fetchDashboardData = async () => {
      setIsLoading(true);
      const formData = new FormData();
      formData.append("file", file);

      try {
        const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/upload/`, {
          method: "POST",
          body: formData,
        });

        if (!res.ok) {
          const err = await res.json();
          throw new Error(err?.error || "Server Error");
        }

        const json = await res.json();
        const hist = json.charts?.histogram;
        const pie = json.charts?.pie_chart;

        const chartData = hist?.data?.labels?.map((label, i) => ({
          name: label,
          Sales: hist.data.values[i],
        })) || [];

        const pieChartData = pie?.data
          ? Object.entries(pie.data).map(([key, val]) => ({
              name: key,
              value: val,
            }))
          : [];

        const cleanSuggestions = (json.insights || []).filter(
          line =>
            line && line.length > 6 &&
            !line.toLowerCase().includes("give 3-5") &&
            !line.toLowerCase().startsWith("you are") &&
            !line.toLowerCase().startsWith("below is")
        );

        const totalRowInsight = (json.insights || []).find(line =>
          line.includes("Dataset has") && line.includes("rows")
        );

        let totalRows = 0;
        if (totalRowInsight) {
          const match = totalRowInsight.match(/Dataset has (\d+) rows/);
          totalRows = match ? parseInt(match[1]) : 0;
        }

        setData({
          insights: [
            { title: "Total Rows", value: json.row_count || "N/A" },
            { title: "Total Columns", value: json.column_count || "N/A" },
            { title: "Histogram Column", value: hist?.column || "N/A" },
            { title: "Pie Chart Column", value: pie?.column || "N/A" },
            {
              title: "Missing Values?",
              value: cleanSuggestions.some(msg =>
                msg.toLowerCase().includes("missing")
              )
                ? "Yes"
                : "No",
            },
          ],
          chartData,
          pieChartData,
          suggestions: cleanSuggestions,
        });

        setIsLoading(false);
      } catch (error) {
        console.error("Upload failed:", error);
        setIsLoading(false);
      }
    };

    if (file) {
      fetchDashboardData();
    }
  }, [file]);

  useEffect(() => {
    if (activeTab === "Charts") {
      const timeout = setTimeout(() => setIsChartReady(true), 300);
      return () => clearTimeout(timeout);
    } else {
      setIsChartReady(false);
    }
  }, [activeTab]);
  return (
    <section id="dashboard" className="py-16 px-4 sm:px-6 max-w-screen-xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="bg-white/5 backdrop-blur-md rounded-2xl p-4 sm:p-8 shadow-lg border border-white/10"
      >
        <div className="text-center mb-8 sm:mb-10">
          <h2 className="text-2xl sm:text-4xl font-bold mb-2 text-white">Live Dashboard Preview</h2>
          <p className="text-gray-400 max-w-xl mx-auto text-sm sm:text-base">
            Explore your data through different lenses.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-3 sm:gap-4 mb-8">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 text-sm sm:text-base rounded-full font-medium transition ${activeTab === tab
                ? "bg-purple-600 text-white"
                : "bg-white/10 text-gray-300 hover:bg-white/20"
                }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="relative min-h-[250px] sm:min-h-[300px]">
          <AnimatePresence mode="wait">
            {activeTab === "Overview" && (
              <motion.div
                key="overview"
                ref={overviewRef}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6"
              >
                {isLoading || !data
                  ? Array.from({ length: 4 }).map((_, i) => (
                    <div
                      key={i}
                      className="bg-white/10 animate-pulse rounded-xl h-[80px] border border-white/10"
                    />
                  ))
                  : data.insights.map((item, index) => (
                    <div
                      key={index}
                      className="bg-white/10 backdrop-blur rounded-xl p-4 sm:p-5 shadow-sm border border-white/10"
                    >
                      <h3 className="text-base text-gray-300 mb-1">{item.title}</h3>
                      <p className="text-lg font-semibold text-white">
                        {typeof item.value === "number" ? (
                          <CountUp end={item.value} duration={1.2} />
                        ) : (
                          item.value
                        )}
                      </p>
                    </div>
                  ))}
              </motion.div>
            )}

            {activeTab === "Charts" && (
              <motion.div
                key="charts"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="grid grid-cols-1 sm:grid-cols-2 gap-6"
              >
                {isLoading || !isChartReady || !data ? (
                  <p className="text-gray-400">Loading chart...</p>
                ) : (
                  <>
                    <div
                      ref={chartRef}
                      className="h-[300px] bg-white/5 p-4 rounded-xl border border-white/10"
                    >
                      {data.chartData.length > 0 ? (
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart data={data.chartData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                            <XAxis dataKey="name" stroke="#ccc" />
                            <YAxis stroke="#ccc" />
                            <Tooltip />
                            <Bar dataKey="Sales" fill="#a855f7" radius={[8, 8, 0, 0]} />
                          </BarChart>
                        </ResponsiveContainer>
                      ) : (
                        <p className="text-gray-400 text-center mt-12">No histogram data available</p>
                      )}
                    </div>

                    <div
                      ref={pieRef}
                      className="h-[300px] bg-white/5 p-4 rounded-xl border border-white/10"
                    >
                      {data.pieChartData.length > 0 ? (
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie
                              data={data.pieChartData}
                              cx="50%"
                              cy="50%"
                              outerRadius={100}
                              fill="#8884d8"
                              dataKey="value"
                              label
                            >
                              {data.pieChartData.map((_, i) => (
                                <Cell key={i} fill={COLORS[i % COLORS.length]} />
                              ))}
                            </Pie>
                            <Tooltip />
                          </PieChart>
                        </ResponsiveContainer>
                      ) : (
                        <p className="text-gray-400 text-center mt-12">No pie chart data available</p>
                      )}
                    </div>
                  </>
                )}
              </motion.div>
            )}

            {activeTab === "AI Suggestions" && (
              <motion.div
                key="suggestions"
                ref={suggestionRef}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="bg-white/5 border border-white/10 p-5 sm:p-6 rounded-xl text-left text-gray-300 max-w-3xl mx-auto"
              >
                <h3 className="text-lg sm:text-xl font-semibold text-white mb-4 print:text-black">Smart AI Suggestions</h3>

                {isLoading ? (
                  <div className="h-24 bg-white/10 animate-pulse rounded-lg" />
                ) : data?.suggestions.length > 0 ? (
                  <motion.div
                    className="grid grid-cols-1 sm:grid-cols-2 gap-4"
                    initial="hidden"
                    animate="visible"
                    variants={{
                      visible: {
                        transition: { staggerChildren: 0.12 },
                      },
                    }}
                  >
                    {data.suggestions.map((text, idx) => (
                      <motion.div
                        key={idx}
                        variants={{
                          hidden: { opacity: 0, y: 10 },
                          visible: { opacity: 1, y: 0 },
                        }}
                        transition={{ duration: 0.3 }}
                        className="bg-gradient-to-tr from-purple-700/20 to-purple-500/10 hover:scale-[1.02] transition-transform backdrop-blur-md border border-white/10 rounded-xl p-4 shadow-lg
                     print:!bg-white print:!text-black print:!border-gray-300 print:!shadow-none"
                      >
                        <p className="text-sm text-gray-100 leading-snug print:text-black">
                          {text.includes(":") ? (
                            <>
                              <strong className="text-white print:text-black">
                                {text.split(":")[0].replace(/\*\*/g, "").trim()}:
                              </strong>{" "}
                              {text.split(":").slice(1).join(":").trim()}
                            </>
                          ) : (
                            text.replace(/\*\*/g, "")
                          )}
                        </p>

                      </motion.div>
                    ))}
                  </motion.div>
                ) : (
                  <p className="text-gray-400 print:text-black">No suggestions available.</p>
                )}
              </motion.div>

            )}
          </AnimatePresence>
        </div>

        {!isLoading && data && (
          <>
            {activeTab === "AI Suggestions" && (
              <DownloadInsights
                suggestionRef={suggestionRef}
              />
            )}
            {activeTab === "Charts" && (
              <DownloadInsights chartRef={chartRef} pieRef={pieRef} />
            )}
          </>
        )}

      </motion.div>
    </section>
  );
};

export default DashboardPreview;
