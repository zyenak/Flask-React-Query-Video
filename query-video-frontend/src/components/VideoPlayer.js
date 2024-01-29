import React from 'react'
import { useSelector } from 'react-redux';

const VideoPlayer = () => {

    const videoUrl = useSelector((state) => state.videoUrl || null);

    return (
        <div>
            {videoUrl && (
                <div>
                    <video controls>
                        <source src={videoUrl} type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                </div>
            )}
        </div>
    )
}

export default VideoPlayer
