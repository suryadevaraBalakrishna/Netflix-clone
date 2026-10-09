import { configureStore } from "@reduxjs/toolkit";
import loginSlice from "../slice/loginSlice";
import movieSlice  from "../slice/MovieSlice";

export const myStore=configureStore({
    reducer:{
        login:loginSlice,
        movie:movieSlice,

    }
})