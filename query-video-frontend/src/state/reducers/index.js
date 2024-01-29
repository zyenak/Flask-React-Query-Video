import { combineReducers } from "redux";
import videoUrlReducer from "./videoUrlReducer";
import uploadCompletedReducer from "./uploadCompletedReducer";
import queryReducer from "./queryReducer";


const reducers = combineReducers ({
    videoUrl: videoUrlReducer,
    uploadCompleted: uploadCompletedReducer,
    query: queryReducer
})

export default reducers;