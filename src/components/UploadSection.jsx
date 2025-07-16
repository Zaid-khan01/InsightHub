import { useState } from "react";
import { FileUp, CheckCircle2, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { useDropzone } from "react-dropzone";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { useFile } from "../context/FileContext";

const UploadSection = () => {
  const [fileName, setFileName] = useState("");
  const [acceptedFiles, setAcceptedFiles] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const [isUploaded, setIsUploaded] = useState(false);
  const [previewData, setPreviewData] = useState([]);
  const [showPreview, setShowPreview] = useState(false);

  const { setFile } = useFile();
  const navigate = useNavigate();

  const onDrop = (files) => {
    const file = files[0];
    if (file) {
      setFileName(file.name);
      setAcceptedFiles([file]);
      setShowPreview(true);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [],
      "application/vnd.ms-excel": [],
      "text/csv": [],
    },

  });
  const handleConfirm = async () => {
  const file = acceptedFiles[0];
  if (!file) {
    toast.error("No file selected");
    return;
  }

  setIsUploading(true);
  const formData = new FormData();
  formData.append("file", file);

  const csrfToken = document.cookie
    .split("; ")
    .find((row) => row.startsWith("csrftoken="))
    ?.split("=")[1];

  try {
    const res = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/api/upload/`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          "X-CSRFToken": csrfToken, // ✅ FIXED
        },
        withCredentials: true,
      }
    );

    const preview = res.data.preview || [];
    toast.success("Uploaded & Processed Successfully 🎉");
    setPreviewData(preview.map((row) => Object.values(row)));
    setFile(file);
    setIsUploaded(true);
    setTimeout(() => navigate("/dashboard"), 1500);
  } catch (err) {
    console.error("Upload error: ", err);
    toast.error("Upload failed ❌ " + JSON.stringify(err.response?.data || err.message));
  } finally {
    setIsUploading(false);
  }
};

  return (
    <motion.section
      id="upload"
      className="py-20 px-6 bg-[#0d0b1d] text-white"
      initial={{ opacity: 0, y: 60 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      viewport={{ once: true }}
    >
      <div className="max-w-screen-md mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl font-bold mb-4">Upload Your Dataset</h2>
        <p className="text-gray-400 mb-10 text-sm sm:text-base">
          Supported formats: <span className="text-purple-400">.csv</span>, <span className="text-purple-400">.xlsx</span>, <span className="text-purple-400">.xls</span>
        </p>

        <div className="bg-white/5 backdrop-blur rounded-2xl p-8 shadow-xl border border-white/10 flex flex-col items-center justify-center gap-4">
          <div
            {...getRootProps()}
            className={`cursor-pointer flex flex-col items-center justify-center border-2 border-dashed rounded-xl p-6 transition ${isDragActive ? "bg-purple-600/20" : "border-purple-500 hover:bg-purple-500/10"
              }`}
          >
            <input {...getInputProps()} />
            <FileUp size={32} className="text-purple-400 mb-2" />
            <span className="text-gray-300">Click or drag file to upload</span>
          </div>

          {fileName && (
            <p className="text-green-400 text-sm font-medium">Selected file: {fileName}</p>
          )}

          <motion.button
            whileHover={{ scale: fileName ? 1.05 : 1 }}
            disabled={!fileName || isUploading || isUploaded}
            onClick={handleConfirm}
            className={`mt-4 px-6 py-3 rounded-full font-medium transition ${fileName ? "bg-purple-600 hover:bg-purple-700" : "bg-gray-500 cursor-not-allowed"
              }`}
          >
            {isUploading ? (
              <span className="flex items-center gap-2">
                <Loader2 className="animate-spin" size={18} /> Uploading...
              </span>
            ) : isUploaded ? (
              <span className="flex items-center gap-2">
                <CheckCircle2 size={18} /> Uploaded!
              </span>
            ) : (
              "Upload"
            )}
          </motion.button>
        </div>
      </div>

      {showPreview && previewData.length > 0 && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-[#1a182c] p-6 rounded-xl max-w-3xl w-full shadow-2xl border border-white/10">
            <h3 className="text-xl font-semibold text-white mb-4">📊 File Preview</h3>
            <div className="overflow-auto max-h-[300px]">
              <table className="w-full text-left text-sm text-gray-300 border border-white/10">
                <tbody>
                  {previewData.map((row, idx) => (
                    <tr key={idx} className="border-b border-white/10">
                      {row.map((cell, i) => (
                        <td key={i} className="p-2">
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="flex justify-end gap-4 mt-6">
              <button
                onClick={() => setShowPreview(false)}
                className="px-4 py-2 text-sm rounded bg-gray-600 hover:bg-gray-700 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirm}
                className="px-4 py-2 text-sm rounded bg-purple-600 hover:bg-purple-700 transition"
              >
                Continue to Dashboard
              </button>
            </div>
          </div>
        </div>
      )}
    </motion.section>
  );
};

export default UploadSection;
