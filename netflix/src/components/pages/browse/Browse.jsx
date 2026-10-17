import React, { useEffect, useState } from 'react';
import useNowPlayingMovies from '../../../hooks/useNowPlayingMovies'
import usePopularMovies from '../../../hooks/usePopularMovies'
import useTopRateMovies from '../../../hooks/useTopRatedMovies'
import useUpcomingMovies from '../../../hooks/useUpcomingMovies'
import MovieList from '../../movies/MovieList'
import { useSelector } from 'react-redux'
import Video from '../../videos/Video'
import MoviePopup from '../../movies/MoviePopup';
import useMovieById from '../../../hooks/useMovieById';


export default function Browse() {
  useNowPlayingMovies()
  usePopularMovies()
  useTopRateMovies()
  useUpcomingMovies()

  const movie = useSelector((state) => state.movie)

  const [selectedMovie, setSelectedMovie] = useState(null);

useMovieById(selectedMovie?.id, "popup");

const trailer = useSelector(
    (state) => state.movie.popupTrailer
);

const handleMovieClick = (movie) => {
  setSelectedMovie(movie);
};


 const [playingMovie, setPlayingMovie] = useState(null);

useEffect(() => {
  if (movie.nowPlayingMovies?.length > 0) {
    const movies = movie.nowPlayingMovies;

    const randomIndex = Math.floor(Math.random() * movies.length);

    setPlayingMovie(movies[randomIndex]);
  }
}, [movie.nowPlayingMovies]);

  
  return (
    <>

    {/* <div class="relative min-h-[300px] bg-black">
        <div class="absolute inset-0">
          <img
            alt="Netflix background"
            class="h-full w-full object-cover"
            src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/f562aaf4-5dbb-4603-a32b-6ef6c2230136/dh0w8qv-9d8ee6b2-b41a-4681-ab9b-8a227560dc75.jpg/v1/fill/w_1192,h_670,q_70,strp/the_netflix_login_background_canada_2024__by_logofeveryt_dh0w8qv-pre.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9NzIwIiwicGF0aCI6Ii9mL2Y1NjJhYWY0LTVkYmItNDYwMy1hMzJiLTZlZjZjMjIzMDEzNi9kaDB3OHF2LTlkOGVlNmIyLWI0MWEtNDY4MS1hYjliLThhMjI3NTYwZGM3NS5qcGciLCJ3aWR0aCI6Ijw9MTI4MCJ9XV0sImF1ZCI6WyJ1cm46c2VydmljZTppbWFnZS5vcGVyYXRpb25zIl19.FScrpAAFnKqBVKwe2syeiOww6mfH6avq-DRHZ_uFVNw"
          />
        </div>
        <div class="absolute inset-0 bg-black/80"></div>
      </div> */}

      <Video title={playingMovie?.title} overview={playingMovie?.overview} id={playingMovie?.id}/>



      <div>
        <MovieList
          title="Popular Movies"
          movies={movie.PopularMovies}
         onMovieClick={handleMovieClick}
        />

        <MovieList
          title="Upcoming Movies"
          movies={movie.UpcomingMovies}
            onMovieClick={handleMovieClick}
        />

        <MovieList
          title="Now Playing Movies"
          movies={movie.nowPlayingMovies}
           onMovieClick={handleMovieClick}
        />

        <MovieList
          title="Top Rated Movies"
          movies={movie.TopRatedMovies}
           onMovieClick={handleMovieClick}
        />

        <MoviePopup
  movie={selectedMovie}
  trailer={trailer}
  onClose={() => setSelectedMovie(null)}
/>
      </div>
    </>
  )
}