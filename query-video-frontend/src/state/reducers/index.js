import { combineReducers } from "redux";
import videoUrlReducer from "./videoUrlReducer";
import uploadCompletedReducer from "./uploadCompletedReducer";
import queryReducer from "./queryReducer";
import { fileReducer } from "./fileReducer";
import { progressReducer } from "./progressReducer";


const reducers = combineReducers ({
    videoUrl: videoUrlReducer,
    uploadCompleted: uploadCompletedReducer,
    query: queryReducer,
    file: fileReducer,
    progress: progressReducer
})

export default reducers;