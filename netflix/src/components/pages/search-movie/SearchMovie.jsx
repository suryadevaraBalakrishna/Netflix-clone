
import axios from 'axios';
import React, { useState } from 'react';
import MovieList from '../../movies/MovieList';
import { useSelector } from 'react-redux';
import MoviePopup from '../../movies/MoviePopup';
import useMovieById from '../../../hooks/useMovieById';

export default function SearchMovie() {
  const [search, setSearch] = useState('');
  const [searchMovie, setsearchMovie] = useState([]);

  const [selectedMovie, setSelectedMovie] = useState(null);

useMovieById(selectedMovie?.id);

const trailer = useSelector(
  (state) => state.movie.trailerMovies
);

  const handleSearch = (e) => {
    e.preventDefault();

    if (!search.trim()) return;


    axios.get(import.meta.env.VITE_WEBSITE_MOVIE_SEARCH + search, {
      headers: {
        Authorization: import.meta.env.VITE_MOVIE_TOKEN,
      }
    })
      .then((result) => {
        setsearchMovie(result?.data?.results);

      })
      .catch((error) => {
        console.log(error);
      })
  };

  return (
    <div className="min-h-screen bg-[#141414] px-4 pb-16 pt-28 text-white sm:px-8">
      <div className="mx-auto max-w-5xl">

        {/* Heading */}
        <div className="mb-8 text-center sm:text-left">
          <h1 className="text-3xl font-bold sm:text-4xl">
            Search Movies
          </h1>
          <p className="mt-2 text-sm text-gray-400 sm:text-base">
            Find your next favorite movie or TV show.
          </p>
        </div>

        {/* Search Form */}
        <form
          onSubmit={handleSearch}
          className="rounded-xl border border-white/10 bg-[#202020] p-4 shadow-xl sm:p-6"
        >
          <label
            htmlFor="movieSearch"
            className="mb-3 block text-sm font-medium text-gray-200"
          >
            Movie or TV show name
          </label>

          <div className="flex flex-col gap-3 sm:flex-row">
            <div className="flex flex-1 items-center gap-3 rounded-lg border border-white/15 bg-[#141414] px-4 focus-within:border-[#e50914]">
              <span className="text-xl text-gray-400" aria-hidden="true">
                &#128269;
              </span>

              <input
                id="movieSearch"
                type="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Enter a movie name..."
                className="w-full bg-transparent py-3.5 text-sm text-white outline-none placeholder:text-gray-500 sm:text-base"
              />
            </div>

            <button
              type="submit"
              className="rounded-lg bg-[#e50914] px-8 py-3 font-semibold text-white transition hover:bg-[#b80710] focus:outline-none focus:ring-2 focus:ring-red-400"
            >
              Search
            </button>
          </div>

          <p className="mt-3 text-xs text-gray-500">
            Search by movie title, series name, or keyword.
          </p>
        </form>

        {/* Results Placeholder */}
        <div className="mt-12">


          {searchMovie.length > 0 ? (
          <MovieList
  title="Search Results"
  movies={searchMovie}
  onMovieClick={setSelectedMovie}
/>
          ) : (
            <p className="text-gray-400">
              Search for a movie to see results.
            </p>
          )}
        </div>
      </div>
      <MoviePopup
  movie={selectedMovie}
  trailer={trailer}
  onClose={() => setSelectedMovie(null)}
/>
    </div>

    
  );
}
