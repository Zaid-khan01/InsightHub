// src/context/UploadContext.jsx
import { createContext, useState, useContext } from "react";

const UploadContext = createContext();

export const UploadProvider = ({ children }) => {
  const [uploadedFile, setUploadedFile] = useState(null);

  return (
    <UploadContext.Provider value={{ uploadedFile, setUploadedFile }}>
      {children}
    </UploadContext.Provider>
  );
};

export const useUpload = () => useContext(UploadContext);
