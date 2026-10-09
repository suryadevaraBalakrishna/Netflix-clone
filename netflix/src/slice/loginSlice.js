import Cookies from "js-cookie";
import { createSlice } from "@reduxjs/toolkit";

const initialState={
    user:Cookies.get('User') ?? '',
    token:Cookies.get('token') ?? ''
}

export const loginSlice=createSlice({
    name:'login',
    initialState,
    reducers:{
        userDetails:(state,action)=>{
            state.user=action.payload.user,
            Cookies.set('User',action.payload.user);

            state.token=action.payload.token,
            Cookies.set('token',action.payload.token);
        },

        logOut:(state)=>{
            state.user='',
            Cookies.remove('User');

            state.token='',
            Cookies.remove('token');
        }
    }
})

export const{userDetails,logOut}=loginSlice.actions;
export default loginSlice.reducer;