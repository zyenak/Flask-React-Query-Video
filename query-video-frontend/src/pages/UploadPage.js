import React, { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../state/index';
import { useNavigate } from "react-router-dom";
import axios from "axios";

const UploadPage = () => {
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);
  //const [query, setQuery] = useState("");
  //const [uploadCompleted, setUploadCompleted] = useState(false);
  //const [videoUrl, setVideoUrl] = useState(null);
  const videoUrl = useSelector((state) => state.videoUrl || null);
  const uploadCompleted = useSelector((state) => state.uploadCompleted || false);
  const query = useSelector((state) => state.query || "");

  const dispatch = useDispatch();
  const { setVideoUrl, setUploadCompleted, setQuery } = bindActionCreators(actionCreators, dispatch);

  const navigate = useNavigate();

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const selectedFile = e.dataTransfer.files[0];
    setUploadCompleted(false);
    setProgress(0);
    setFile(null);
    if (selectedFile && isValidFileType(selectedFile.type)) {
      setFile(selectedFile);
      setError(null);
    } else {
      setFile(null);
      setError("Please select a valid MP4 or WAV file.");
    }
  };

  const handleChange = (e) => {
    const selectedFile = e.target.files[0];
    setUploadCompleted(false);
    setProgress(0);
    setFile(null);
    if (selectedFile && isValidFileType(selectedFile.type)) {
      setFile(selectedFile);
      setError(null);
    } else {
      setFile(null);
      setError("Please select a valid MP4 or WAV file.");
    }
  };

  const isValidFileType = (fileType) => {
    return fileType === "video/mp4" || fileType === "audio/wav";
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a file before uploading.");
      return;
    }

    
    const formData = new FormData();
    formData.append("file", file);
    try {
      const response = await axios.post("http://localhost:5000/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (progressEvent) => {
          const { loaded, total } = progressEvent;
          const percentCompleted = Math.round((loaded * 100) / total);
          setProgress(percentCompleted);
        },
      });
      console.log("Upload successful:", response.data);
      
      setUploadCompleted(true);
      console.log()
      setError(null);
    } catch (error) {
      console.error("Error uploading file:", error);
      setError("Error uploading file.");
    }
  };


  const handleNext = async () => {
    // Navigate to VideoPlayPage
    navigate("/query-video");
  };

  return (
    <div>
      <div className="container mx-auto w-1/2 p-11">
        <div className="bg-white rounded-lg shadow-lg p-8 mb-4">
          <h2 className="text-2xl font-bold mb-4">Upload Audio/Video</h2>
          <div
            className="flex flex-col items-center justify-center border border-dashed border-blue-700 border-2 p-4 mb-4 rounded-lg"
            onDragOver={handleDragOver}
            onDrop={handleDrop}
          >
            <div className="bg-blue-100 rounded-lg p-8 mb-4 mt-4 w-38 h-38 flex flex-col items-center justify-center">
              <div className="relative w-24 h-24">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-20 h-20 rounded-full border-4 border-blue-500"></div>
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center">
                    <div className="ml-2 w-0 h-0 border-t-[20px] border-t-transparent border-l-[35px] border-l-blue-500 border-b-[20px] border-b-transparent"></div>
                  </div>
                </div>
              </div>
            </div>
            <p className="text-lg font-bold">Drag and Drop video/audio files to upload</p>
            <p className="text-base mb-4">Your videos will be private and will not be used by third-party</p>
            <label htmlFor="fileInput" className="cursor-pointer bg-transparent text-blue-700 border border-blue-700 px-4 py-2 rounded-lg hover:bg-blue-700 hover:text-white transition duration-300 ease-in-out">
              Select File
            </label>
            <input
              id="fileInput"
              type="file"
              accept=".mp4,.wav"
              onChange={handleChange}
              className="hidden"
            />

            <p className="text-sm text-red-500">{error}</p>
          </div>

          {file && (
            <div className="flex flex-col justify-items-start border border-gray-200 border-2 p-4 mb-4 rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <p className="mb-2 text-left">Selected File: {file.name}</p>
                <p className="ml-2">{progress}%</p>
              </div>
              <div className="bg-gray-200 w-full h-3 rounded-lg overflow-hidden">
                <div className="bg-blue-500 h-full" style={{ width: `${progress}%` }}></div>
              </div>
            </div>
          )}



          <hr className="border-t border-gray-300 my-4" />
          <div className="flex justify-end">
            {uploadCompleted ? (
              <button
                onClick={handleNext}
                className="cursor-pointer bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700 hover:text-white transition duration-300 ease-in-out"
              >
                Next
              </button>
            ) : (
              <button
                onClick={handleUpload}
                className="self-end cursor-pointer bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700 hover:text-white transition duration-300 ease-in-out"
              >
                Upload
              </button>
            )}
          </div>
        </div>

      </div>
    </div>
  );

}

export default UploadPage;