import React, { useState } from 'react';
import { uploadFile } from 'react-s3';

import './App.css';
window.Buffer = window.Buffer || require("buffer").Buffer;

function App() {
  const [selectedFile, setSelectedFile] = useState(null);

  const config = {
    bucketName: process.env.REACT_APP_AWS_S3_BUCKET,
    region: process.env.REACT_APP_AWS_S3_REGION,
    accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.REACT_APP_AWS_ACCESS_KEY_SECRET,
}

  const handleFileInput = (e) => {
    setSelectedFile(e.target.files[0]);
  }

  const handleUpload = async (file) => {
    uploadFile(file, config)
      .then(data => console.log(data))
      .catch(err => console.error(err))
  }

  return (
    <div className="App">
      <div>React S3 File Upload</div>
      <input type="file" onChange={handleFileInput} />
      <button onClick={() => handleUpload(selectedFile)}> Upload to S3</button>
    </div>
  );
}

export default App;
