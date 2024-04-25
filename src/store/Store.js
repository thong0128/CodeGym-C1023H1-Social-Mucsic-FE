
import {configureStore} from "@reduxjs/toolkit";
import songReducer from "./reducer/SongSlice";
import userSlice from "./reducer/UserSlice";
export default configureStore({
    reducer:{
        Users: userSlice,
        songStore: songReducer
    }
})