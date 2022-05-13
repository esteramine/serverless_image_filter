import React, { useState } from 'react';
import ReactImageUploading from 'react-images-uploading';
import { uploadFile } from 'react-s3';
import { v4 as uuidv4 } from 'uuid';
import { saveAs } from 'file-saver';
import { ThreeDots } from 'react-loader-spinner';

window.Buffer = window.Buffer || require("buffer").Buffer;

function ImagePanel({ filteredImage, setFilteredImage, originalImage, setOriginalImage, setSelectedFilter, filterLoading }) {
    const [selectedFile, setSelectedFile] = useState(null);
    const [image, setImage] = useState([]);
    const [imageUploading, setImageUploading] = useState(false);

    const handleUpload = async (file) => {
        uploadFile(file, config)
            .then(data => {
                setSelectedFile(data.location);
                setFilteredImage(data.location);
                setOriginalImage(data.location);
                setSelectedFilter('Original');
                setImageUploading(false);
            })
            .catch(err => console.error(err))
    }

    const onChange = (imageList, addUpdateIndex) => {
        const file = imageList[0].file;
        const newFile = new File([file], uuidv4(), { type: file.type });
        setImage([newFile]);
        setImageUploading(true);
        handleUpload(newFile);
    };

    const config = {
        bucketName: process.env.REACT_APP_AWS_S3_BUCKET,
        region: process.env.REACT_APP_AWS_S3_REGION,
        accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.REACT_APP_AWS_ACCESS_KEY_SECRET,
    }

    return (
        <div class='flex flex-row w-full'>
            <div class='w-6/12 border-r-2 border-gray-200 flex h-full justify-center items-center'>
                <ReactImageUploading
                    value={image}
                    onChange={onChange}
                    dataURLKey="data_url"
                >
                    {({
                        onImageUpload,
                        onImageUpdate,
                        isDragging,
                        dragProps,
                    }) => (
                        <div class='w-full'>
                            {originalImage === '' ? (
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
                                        <h1 class={'text-lg text-gray-800 font-bold mb-5 ' + (imageUploading ? 'hidden' : '')}>Original</h1>
                                        <img src={originalImage} alt="" class='w-full relative' />
                                        {imageUploading &&
                                            (<div class='absolute'>
                                                <ThreeDots color='rgb(243,244,246)' height="100" width="100" />
                                            </div>)
                                        }
                                        <button onClick={() => onImageUpdate(0)} class={'mt-7 px-5 py-2 rounded bg-gray-700 text-white ' + (imageUploading ? 'hidden' : '')}>
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
                {filterLoading && (
                    <div>
                        <ThreeDots color='rgb(243,244,246)' height="100" width="100" />
                    </div>
                )}
                {filteredImage && (
                    <>
                        <h1 class='text-lg text-gray-800 font-bold mb-5'>Filtered</h1>
                        <img src={filteredImage} alt="" class='w-full relative' />
                        {filterLoading && (
                            <div class='absolute'>
                                <ThreeDots color='rgb(243,244,246)' height="100" width="100" />
                            </div>
                        )}
                        <button
                            onClick={() => {
                                saveAs(filteredImage, filteredImage.split('/').pop() + '.jpg');
                            }}
                            class='mt-7 px-5 py-2 rounded bg-gray-700 text-white'
                        >
                            Download
                        </button>
                    </>
                )}
            </div>
        </div>
    );
}

export default ImagePanel;
