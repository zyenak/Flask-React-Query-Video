export const progressReducer = (state = 0, action) => {
    if (action.type === 'SET_PROGRESS') {
        return action.payload;
    }
    else {
        return state;
    }

};