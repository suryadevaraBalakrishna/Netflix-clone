import { createSlice } from "@reduxjs/toolkit";

const initialState={
   nowPlayingMovies:null,
   PopularMovies:null,
   TopRatedMovies:null,
   UpcomingMovies:null,
   trailerMovies:null
}

export const movieSlice=createSlice({
    name:"movie",
     initialState,
     reducers:{
        getNowPlayingMovies:(state,action)=>{
            state.nowPlayingMovies=action.payload
        },
        getPopularMovies:(state,action)=>{
            state.PopularMovies=action.payload;
        },
        getTopRatedMovies:(state,action)=>{
            state.TopRatedMovies=action.payload
        },
         getUpcomingMovies:(state,action)=>{
            state.UpcomingMovies=action.payload
        },
        gettrailerMovies:(state,action)=>{
            state.trailerMovies=action.payload
        }



     }
})


export const {getNowPlayingMovies,getPopularMovies,getTopRatedMovies,getUpcomingMovies,gettrailerMovies}=movieSlice.actions;

export default movieSlice.reducer;