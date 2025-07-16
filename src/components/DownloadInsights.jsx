import html2pdf from "html2pdf.js";

const DownloadInsights = ({ suggestionRef, chartRef, pieRef }) => {
  const downloadPDF = (ref, filename = "insights.pdf") => {
    const element = ref.current;
    if (!element) return;

    const originalClasses = [];
    const textElements = element.querySelectorAll("p, h1, h2, h3, h4, span, strong, b");

    textElements.forEach((el) => {
      originalClasses.push({ el, className: el.className });
      el.classList.remove("text-gray-100", "text-gray-300", "text-white");
      el.classList.add("text-black"); 
    });

    const opt = {
      margin: 0.3,
      filename,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: {
        scale: 2,
        useCORS: true,
        backgroundColor: "#ffffff",
      },
      jsPDF: { unit: "in", format: "a4", orientation: "portrait" },
      pagebreak: { mode: ["avoid-all", "css", "legacy"] },
    };

    html2pdf()
      .set(opt)
      .from(element)
      .save()
      .then(() => {
        originalClasses.forEach(({ el, className }) => {
          el.className = className;
        });
      });
  };

  const downloadImage = (ref, filename) => {
    const element = ref.current;
    if (!element) return;

    import("html2canvas").then((html2canvas) => {
      html2canvas.default(element, {
        scale: 2,
        useCORS: true,
        backgroundColor: "#ffffff",
      }).then((canvas) => {
        const link = document.createElement("a");
        link.download = filename;
        link.href = canvas.toDataURL("image/png");
        link.click();
      });
    });
  };

  return (
    <div className="flex justify-center gap-3 mt-8 print:hidden">
      {suggestionRef && (
        <button
          onClick={() => downloadPDF(suggestionRef, "ai-suggestions.pdf")}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm"
        >
          Download Suggestions (PDF)
        </button>
      )}

      {chartRef && (
        <button
          onClick={() => downloadImage(chartRef, "bar-chart.png")}
          className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm"
        >
          Save Bar Chart (PNG)
        </button>
      )}

      {pieRef && (
        <button
          onClick={() => downloadImage(pieRef, "pie-chart.png")}
          className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg text-sm"
        >
          Save Pie Chart (PNG)
        </button>
      )}
    </div>
  );
};

export default DownloadInsights;
