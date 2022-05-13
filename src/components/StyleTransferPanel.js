import React, { useState } from 'react';
import ReactImageUploading from 'react-images-uploading';
import { uploadFile } from 'react-s3';
import { v4 as uuidv4 } from 'uuid';
import { saveAs } from 'file-saver';
import { ThreeDots } from 'react-loader-spinner';
import axios from 'axios';

window.Buffer = window.Buffer || require("buffer").Buffer;

function StyleTransferPanel({ filteredImage, setFilteredImage, originalImage, setOriginalImage, setSelectedFilter, filterLoading }) {
    const [selectedFile, setSelectedFile] = useState(null);
    const [styleSelectedFile, setStyleSelectedFile] = useState(null);
    const [image, setImage] = useState([]);
    const [styleImage, setStyleImage] = useState([]);
    const [imageUploading, setImageUploading] = useState(false);
    const [styleImageUploading, setStyleImageUploading] = useState(false);
    const [mixed, setMixed] = useState('');
    const [mixLoading, setMixLoading] = useState(false);

    const handleUpload = async (file) => {
        uploadFile(file, config)
            .then(data => {
                setSelectedFile(data.location);
                setFilteredImage(data.location);
                setOriginalImage(data.location);
                setSelectedFilter('Original');
                setImageUploading(false);
                setStyleImageUploading(false);
            })
            .catch(err => console.error(err))
    }

    const handleStyleImageUpload = async (file) => {
        uploadFile(file, config)
            .then(data => {
                setStyleSelectedFile(data.location);
                setStyleImageUploading(false);
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

    const onStyleImageChange = (imageList, addUpdateIndex) => {
        const file = imageList[0].file;
        const newFile = new File([file], uuidv4(), { type: file.type });
        setStyleImage([newFile]);
        setStyleImageUploading(true);
        handleStyleImageUpload(newFile);
    };

    const config = {
        bucketName: process.env.REACT_APP_AWS_S3_BUCKET,
        region: process.env.REACT_APP_AWS_S3_REGION,
        accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.REACT_APP_AWS_ACCESS_KEY_SECRET,
    }

    return (
        <div class='flex flex-row w-full'>
            <div class='w-6/12 border-r-2 border-gray-200 flex flex-col h-full justify-center items-center'>
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
                                <div class={'flex flex-col justify-center items-center'}>
                                    <h1 class={'text-lg text-gray-800 font-bold mb-2'}>The Image You Want to Apply a Different Style</h1>
                                    <button
                                        class={(isDragging ? 'bg-gray-200' : 'bg-gray-100') + ' border-dashed border-4 border-gray-400 text-gray-600 font-bold w-10/12 py-20'}
                                        onClick={onImageUpload}
                                        {...dragProps}
                                    >
                                        Click or Drop An Image Here
                                    </button>
                                </div>
                            ) : (
                                <>
                                    <div class='flex flex-col h-full justify-center items-center px-4'>
                                        <h1 class={'text-lg text-gray-800 font-bold ' + (imageUploading ? 'hidden' : '')}>The Image You Want to Apply a Different Style</h1>
                                        <img src={originalImage} alt="" class='w-7/12 relative' />
                                        {imageUploading &&
                                            (<div class='absolute'>
                                                <ThreeDots color='rgb(243,244,246)' height="100" width="100" />
                                            </div>)
                                        }
                                        <button onClick={() => onImageUpdate(0)} class={'mt-1 mb-3 px-5 py-2 rounded bg-gray-700 text-white ' + (imageUploading ? 'hidden' : '')}>
                                            Reselect An Image
                                        </button>
                                    </div>
                                </>
                            )}
                        </div>
                    )}
                </ReactImageUploading>
                <ReactImageUploading
                    value={styleImage}
                    onChange={onStyleImageChange}
                    dataURLKey="style_url"
                >
                    {({
                        onImageUpload,
                        onImageUpdate,
                        isDragging,
                        dragProps,
                    }) => (
                        <div class='w-full'>
                            {styleImage.length === 0 ? (
                                <div class={'flex flex-col justify-center items-center'}>
                                    <h1 class={'text-lg text-gray-800 font-bold my-2'}>The Image Style You Want to Transfer</h1>
                                    <button
                                        class={(isDragging ? 'bg-gray-200' : 'bg-gray-100') + ' border-dashed border-4 border-gray-400 text-gray-600 font-bold w-10/12 py-20'}
                                        onClick={onImageUpload}
                                        {...dragProps}
                                    >
                                        Click or Drop An Image Here
                                    </button>
                                </div>
                            ) : (
                                <>
                                    <div class='flex flex-col h-full justify-center items-center px-4'>
                                        <h1 class={'text-lg text-gray-800 font-bold ' + (imageUploading ? 'hidden' : '')}>The Image Style You Want to Transfer</h1>
                                        <img src={styleSelectedFile} alt="" class='w-7/12 relative' />
                                        {styleImageUploading &&
                                            (<div class='absolute'>
                                                <ThreeDots color='rgb(243,244,246)' height="100" width="100" />
                                            </div>)
                                        }
                                        <button onClick={() => onImageUpdate(0)} class={'mt-1 px-5 py-2 rounded bg-gray-700 text-white ' + (imageUploading ? 'hidden' : '')}>
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
                {mixed === '' ? (
                    <>
                        <button
                            onClick={() => {
                                setMixLoading(true);
                                console.log('transfer');
                                setMixed('123')
                                
                                // axios
                                //     .get('https://1bzw2rt9hi.execute-api.us-east-1.amazonaws.com/default/sepiafilter?name=' + originalImageName)
                                //     .then(res => {
                                //         setMixed(res.data);
                                //         setMixLoading(false);
                                //     })
                                //     .catch(err => console.log(err));
                            }}
                            class='mt-7 px-5 py-2 rounded bg-gray-700 text-white'
                        >
                            Transfer
                        </button>
                    </>
                ) : (
                    <>
                        <h1 class='text-lg text-gray-800 font-bold mb-5'>Transferred</h1>
                        <img src={mixed} alt="" class='w-full relative' />
                        {mixLoading && (
                            <div class='absolute'>
                                <ThreeDots color='rgb(243,244,246)' height="100" width="100" />
                            </div>
                        )}
                        <button
                            onClick={() => {
                                saveAs(mixed, mixed.split('/').pop() + '.jpg');
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

export default StyleTransferPanel;
