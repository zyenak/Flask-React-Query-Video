const videoUrlReducer  = (state = null, action) => {
    if(action.type === 'SET_VIDEO_URL') {
        return action.payload;
    }
    else {
        return state;
    }
  };
  
  export default videoUrlReducer;