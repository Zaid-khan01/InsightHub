import { useState } from "react";
import { Bot, X, Send, Trash2, Paperclip } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";

const ChatbotLauncher = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [lastPreview, setLastPreview] = useState(null);
  const [fileInputKey, setFileInputKey] = useState(Date.now());

  const handleSend = async () => {
    if (input.trim() === "" && !selectedFile && !lastPreview) return;

    const newMessage = {
      type: "user",
      text: input || `📎 Uploaded file: ${selectedFile?.name}`,
      file: selectedFile?.name || null,
    };
    setMessages((prev) => [...prev, newMessage]);

    const formData = new FormData();
    if (selectedFile) {
      formData.append("file", selectedFile);
    } else if (lastPreview) {
      formData.append("preview", JSON.stringify(lastPreview));
    }

    formData.append("message", input);
    setInput("");
    setSelectedFile(null);
    setFileInputKey(Date.now());

    const csrfToken = document.cookie
      .split("; ")
      .find((row) => row.startsWith("csrftoken="))
      ?.split("=")[1];

    try {
      const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/chatbot/`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          "X-CSRFToken": csrfToken, // ✅ fix
        },
        withCredentials: true,
      });

      const botMessage = {
        type: "bot",
        text: res.data.reply || "✅ File uploaded!",
        preview: res.data.preview || null,
        fileUsed: selectedFile?.name || (res.data.preview ? "previously uploaded file" : null),
      };

      if (res.data.preview) setLastPreview(res.data.preview);

      setMessages((prev) => [...prev, botMessage]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          type: "bot",
          text: "❌ Error: " + (err.response?.data?.error || "Something went wrong"),
        },
      ]);
    }
  };

  const handleClearChat = () => {
    setMessages([]);
    setLastPreview(null);
    setFileInputKey(Date.now());
  };

  return (
    <>
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-16 right-6 sm:bottom-20 sm:right-10 z-50 bg-purple-600 hover:bg-purple-700 text-white p-4 rounded-full shadow-xl"
      >
        <Bot size={32} />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <>

            <motion.div
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />


            <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
              <motion.div
                key="chatbot"
                initial={{ opacity: 0, scale: 0.9, y: 40 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 40 }}
                transition={{ duration: 0.3 }}
                className="w-full sm:w-[85%] md:w-[70%] lg:w-[50%] xl:w-[40%] h-[75vh] bg-[#141225] text-white rounded-2xl shadow-2xl border border-white/10 flex flex-col overflow-hidden"
              >

                <div className="flex justify-between items-center px-5 py-4 border-b border-white/10 bg-white/5">
                  <h2 className="text-lg font-semibold">Ask InsightBot</h2>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={handleClearChat}
                      className="text-gray-400 hover:text-white transition"
                      title="Clear Chat"
                    >
                      <Trash2 size={20} />
                    </button>
                    <button
                      onClick={() => setIsOpen(false)}
                      className="text-gray-400 hover:text-white transition"
                      title="Close"
                    >
                      <X size={22} />
                    </button>
                  </div>
                </div>

                <div className="flex-1 px-6 py-5 overflow-y-auto text-sm space-y-4 text-gray-300">
                  {messages.length === 0 ? (
                    <p>👋 Hi! I'm InsightBot. Ask anything related to your data or uploads.</p>
                  ) : (
                    messages.map((msg, index) => (
                      <div
                        key={index}
                        className={`flex flex-col ${msg.type === "user" ? "items-end" : "items-start"}`}
                      >
                        <div
                          className={`max-w-[80%] px-4 py-2 rounded-lg ${msg.type === "user"
                            ? "bg-purple-600 text-white"
                            : "bg-white/10 text-gray-100"
                            }`}
                        >
                          {msg.file && (
                            <p>📎 Uploaded file: <strong>{msg.file}</strong></p>
                          )}
                          <p>{msg.text}</p>
                          {msg.preview && (
                            <pre className="text-xs mt-2 whitespace-pre-wrap break-words">
                              ✅ Preview: {JSON.stringify(msg.preview.slice(0, 5), null, 2)}
                            </pre>
                          )}
                        </div>
                      </div>
                    ))
                  )}
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center gap-2 px-4 py-3 bg-white/5 border-t border-white/10">
                  <div className="flex items-center gap-2">
                    <label className="cursor-pointer text-gray-400 hover:text-white">
                      <Paperclip />
                      <input
                        key={fileInputKey}
                        type="file"
                        accept=".csv,.xlsx"
                        onChange={(e) => {
                          setSelectedFile(e.target.files[0]);
                          setFileInputKey(Date.now());
                        }}
                        className="hidden"
                      />
                    </label>

                    {selectedFile && (
                      <span className="text-xs text-purple-400 sm:inline block w-full truncate sm:w-auto mb-1 sm:mb-0">
                        📎 {selectedFile.name}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-2 w-full">
                    <input
                      type="text"
                      placeholder="Type your question..."
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && handleSend()}
                      className="flex-1 px-4 py-2 rounded-lg bg-[#1d1a2e] border border-white/10 text-white placeholder-gray-500 outline-none focus:ring-2 focus:ring-purple-500 transition"
                    />
                    <button
                      onClick={handleSend}
                      className="bg-purple-600 hover:bg-purple-700 p-2 rounded-full transition"
                    >
                      <Send size={20} className="text-white" />
                    </button>
                  </div>
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatbotLauncher;
