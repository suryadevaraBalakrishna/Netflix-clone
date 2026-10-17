import { createSlice } from "@reduxjs/toolkit";

const initialState={
   nowPlayingMovies:null,
   PopularMovies:null,
   TopRatedMovies:null,
   UpcomingMovies:null,
   
    // Separate trailer states
    heroTrailer: null,
    popupTrailer: null
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
        },
        getHeroTrailer: (state, action) => {
    state.heroTrailer = action.payload;
},

getPopupTrailer: (state, action) => {
    state.popupTrailer = action.payload;
}



     }
})


export const {getNowPlayingMovies,getPopularMovies,getTopRatedMovies,getUpcomingMovies,gettrailerMovies, getHeroTrailer,
    getPopupTrailer}=movieSlice.actions;

export default movieSlice.reducer;