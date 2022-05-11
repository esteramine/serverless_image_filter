import React, { useState } from 'react';
import ReactImageUploading from 'react-images-uploading';
import { uploadFile } from 'react-s3';
import { v4 as uuidv4 } from 'uuid';

import './App.css';
import Sidebar from './components/Sidebar';
window.Buffer = window.Buffer || require("buffer").Buffer;

function App() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [image, setImage] = useState([]);
  const [filteredImage, setFilteredImage] = useState('');

  const handleUpload = async (file) => {
    uploadFile(file, config)
      .then(data => {
        setSelectedFile(data.location);
        setFilteredImage(data.location);
      })
      .catch(err => console.error(err))
  }

  const onChange = (imageList, addUpdateIndex) => {
    const newFile = { ...imageList[0], name: uuidv4() }
    setImage([newFile]);
    handleUpload(imageList[0].file);
  };

  const config = {
    bucketName: process.env.REACT_APP_AWS_S3_BUCKET,
    region: process.env.REACT_APP_AWS_S3_REGION,
    accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.REACT_APP_AWS_ACCESS_KEY_SECRET,
  }

  return (
    <div className="App" class='flex flex-row'>
      <div class='w-2/12'>
        <Sidebar />
      </div>

      <div class='flex flex-row w-10/12'>
        <div class='w-6/12 border-r-2 border-gray-200 flex h-full justify-center items-center'>
          <ReactImageUploading
            value={image}
            onChange={onChange}
            dataURLKey="data_url"
          >
            {({
              imageList,
              onImageUpload,
              onImageRemoveAll,
              onImageUpdate,
              onImageRemove,
              isDragging,
              dragProps,
            }) => (
              <div class='w-full'>
                {image.length === 0 ? (
                  <div class={'flex justify-center'}>
                    <button
                      class={(isDragging ? 'bg-gray-200' : 'bg-gray-100') + ' border-dashed border-4 border-gray-400 text-gray-600 font-bold w-10/12 py-24'}
                      onClick={onImageUpload}
                      {...dragProps}
                    >
                      Click or Drop An Image Here
                    </button>
                  </div>
                ) : (
                  <>
                    <div class='flex flex-col h-full justify-center items-center px-4'>
                      <h1 class='text-lg text-gray-800 font-bold mb-5'>Original</h1>
                      <img src={selectedFile} alt="" class='w-full' />
                      <button onClick={() => onImageUpdate(0)} class='mt-7 px-5 py-2 rounded bg-gray-700 text-white'>
                        Reselect An Image
                      </button>
                    </div>
                  </>
                )}
              </div>
            )}
          </ReactImageUploading>
        </div>
        <div class='w-6/12 flex flex-col h-full justify-center items-center px-4'>
          {filteredImage && (
            <>
              <h1 class='text-lg text-gray-800 font-bold mb-5'>Filtered</h1>
              <img src={filteredImage} alt="" class='w-full' />
              <button onClick={() => console.log('hihi')} class='mt-7 px-5 py-2 rounded bg-gray-700 text-white'>
                Download
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
