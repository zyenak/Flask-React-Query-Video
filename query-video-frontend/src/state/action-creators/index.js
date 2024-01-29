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
