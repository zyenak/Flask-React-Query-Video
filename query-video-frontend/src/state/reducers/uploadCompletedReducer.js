const uploadCompletedReducer = (state = false, action) => {
    if (action.type === 'SET_UPLOAD_COMPLETED') {
        return action.payload;
    }
    else {
        return state;
    }
};


export default uploadCompletedReducer;
