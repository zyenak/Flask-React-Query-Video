import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../state/index';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';

const QueryBox = () => {
    const query = useSelector((state) => state.query || "");

    const dispatch = useDispatch();
    const { setVideoUrl, setQuery } = bindActionCreators(actionCreators, dispatch);

    

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
                setQuery("")
            } catch (error) {
                console.error('Error fetching video:', error);
            }
        }
        else {
            alert("Please enter a query.");
        };
    };

    return (
        <div>
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
        </div>
    )
}

export default QueryBox
