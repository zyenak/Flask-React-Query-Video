const queryReducer = (state = "", action) => {
    if (action.type === 'SET_QUERY') {
        return action.payload;
    }
    else {
        return state;
    }
};

export default queryReducer;
