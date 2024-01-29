import React, { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../state/index';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';

const VideoPlayPage = () => {

    const videoUrl = useSelector((state) => state.videoUrl || null);
    const uploadCompleted = useSelector((state) => state.uploadCompleted || false);
    const query = useSelector((state) => state.query || "");

    const dispatch = useDispatch();
    const { setVideoUrl, setUploadCompleted, setQuery } = bindActionCreators(actionCreators, dispatch);

    const navigate = useNavigate();


    const handleNext = async () => {
        // Handle next step after video upload only if query is not empty
        if (query.trim() !== "") {
            console.log("Query submitted:", query);
            try {
                const response = await fetch('/submit-query', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ query: 'video' }), // Adjust query as needed
                });
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const blob = await response.blob();
                const videoObjectURL = URL.createObjectURL(blob);
                setVideoUrl(videoObjectURL);
            } catch (error) {
                console.error('Error fetching video:', error);
            }
        };
    };

    const handleBack = () => {
        // Navigate back to main page
        navigate("/");
    };

    return (
        <div>
            <div className="container mx-auto w-1/2 p-11">
                <div className="bg-white rounded-lg shadow-lg p-8 mb-4">
                    <h2 className="text-2xl font-bold mb-4">Have something to ask?</h2>
                    {uploadCompleted && (
                        <div className="flex flex-col justify-items-start border border-gray-200 border-2 p-4 mb-4 rounded-lg">
                            <div className="flex justify-row items-center mb-2">
                                <input
                                    type="text"
                                    value={query}
                                    placeholder="Enter your query"
                                    onChange={(e) => setQuery(e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-700"
                                />
                                <button
                                    onClick={handleNext}
                                    className="ml-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700 hover:text-white transition duration-300 ease-in-out"
                                >
                                    <FontAwesomeIcon icon={faPaperPlane} />
                                </button>
                            </div>
                        </div>
                    )}
                    <div className="flex flex-col">
                        {videoUrl && (
                            <div>
                                <video controls>
                                    <source src={videoUrl} type="video/mp4" />
                                    Your browser does not support the video tag.
                                </video>
                            </div>
                        )}
                    </div>
                    <div>
                            <hr className="border-t border-gray-300 my-4" />
                            <div className="flex justify-end">

                                <button
                                    onClick={handleBack}
                                    className="cursor-pointer bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700 hover:text-white transition duration-300 ease-in-out">
                                    Back
                                </button>

                            </div>
                        </div>
                    
                </div>
            </div>
        </div>

    );

}

export default VideoPlayPage;