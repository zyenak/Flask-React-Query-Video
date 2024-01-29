export const setVideoUrl = (url) => {
    return (dispatch) => {
        dispatch({
            type: 'SET_VIDEO_URL',
            payload: url
        })
    }
}

export const setUploadCompleted = (status) => {
    return (dispatch) => {
        dispatch({
            type: 'SET_UPLOAD_COMPLETED',
            payload: status
        })
    }
}

export const setQuery = (query) => {
    return (dispatch) => {
        dispatch({
            type: 'SET_QUERY',
            payload: query
        })
    }
};

export const setFile = (file) => {
    return (dispatch) => {
        dispatch({
            type: 'SET_FILE',
            payload: file
        })
    }
};

export const setProgress = (progress) => {
    return (dispatch) => {
        dispatch({
            type: 'SET_PROGRESS',
            payload: progress
        })
    }
};

