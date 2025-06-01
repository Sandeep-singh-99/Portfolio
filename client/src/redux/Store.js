import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./Slice/userSlice";

const store = configureStore({
    reducer: {
        user: userReducer
    }
})



export default store;