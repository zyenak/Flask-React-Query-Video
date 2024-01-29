import React from "react";
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../state/index';
import { useNavigate } from "react-router-dom";
import VideoPlayer from "../components/VideoPlayer";
import QueryBox from "../components/QueryBox";

const VideoPlayPage = () => {

    const uploadCompleted = useSelector((state) => state.uploadCompleted || false);

    const dispatch = useDispatch();
    const { setVideoUrl, setQuery, setUploadCompleted } = bindActionCreators(actionCreators, dispatch);

    const navigate = useNavigate();


    const handleBack = () => {
        // Navigate back to main page
        setUploadCompleted(false);
        setQuery("");
        setVideoUrl(null);
        navigate("/");
    };

    return (
        <div>
            <div className="container mx-auto w-1/2 p-11">
                <div className="bg-white rounded-lg shadow-lg p-8 mb-4">
                    <h2 className="text-2xl font-bold mb-4">Have something to ask?</h2>
                    {uploadCompleted && (
                        <QueryBox />
                    )}
                    <div className="flex flex-col">
                        < VideoPlayer />
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