export const fileReducer = (state = null, action) => {
    if (action.type === 'SET_FILE') {
        return action.payload;
    }
    else {
        return state;
    }

};
