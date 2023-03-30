import React, { useState } from "react";
import axios from "axios";
export default function FileUpload() {
  const [file, setFile] = useState(null);
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (file) {
      const data = new FormData();
      const filename = new Date().getFullYear() + file.name;
      data.append("file_name", filename);
      data.append("file", file);
      try {
        await axios.post("http://localhost:5000/backend/uploads", data);
      } catch (err) {
        console.log(err);
      }
    }
  };
  return (
    <div className="upload">
      <form
        className="fileUploadForm flex flex-col items-center justify-center gap-8 mt-12"
        onSubmit={handleFormSubmit}
      >
        <input
          type="file"
          className="fileInput"
          onChange={(e) => setFile(e.target.files[0])}
        />
        <button
          type="submit"
          className="uploadButton bg-black text-white p-3 rounded-[0.8rem] hover:bg-gray-500"
        >
          Upload
        </button>
      </form>
    </div>
  );
}
