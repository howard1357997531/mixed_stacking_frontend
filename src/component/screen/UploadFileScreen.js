import React, { useState } from "react";
import axios from "axios";

function UploadFileScreen() {
  const [file, setFile] = useState(null);

  const fileChangeHandler = (e) => {
    setFile(e.target.files[0]);
  };

  const fileUploadHandler = () => {
    const formData = new FormData();
    formData.append("csv_file", file);
    formData.append("csv_file_name", file.name);
    console.log(formData);
    axios.post("http://127.0.0.1:8000/api/uploadCsv/", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  };

  return (
    <div>
      <input type="file" onChange={fileChangeHandler} />
      <button onClick={fileUploadHandler}>upload</button>
    </div>
  );
}

export default UploadFileScreen;
