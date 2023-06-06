import React, { useState } from "react";

const UploadFile = () => {
  const [file, setFile] = useState(null);
  const [fileUrl, setFileUrl] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("http://localhost:1337/file/upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      setFileUrl(data.url);
    } catch (error) {
      console.error(error);
    }
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  return (
    <div>
      <h1>Upload File</h1>
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleFileChange} />
        <button type="submit">Upload</button>
      </form>
      {fileUrl && (
        <div>
          <h2>File Uploaded!</h2>
          <p>File URL: {fileUrl}</p>
          <a href={fileUrl} target="_blank" rel="noreferrer">
            Download File
          </a>
        </div>
      )}
    </div>
  );
};

export default UploadFile;
