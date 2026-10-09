import React from 'react'
import MovieCard from './MovieCard'

export default function MovieList({ title, movies }) {
  return (
    <div className="my-5">

      <h2 className="mb-3 px-5 text-xl font-bold text-dark">
        {title}
      </h2>

      <div className="flex w-full gap-3 overflow-x-auto no-scrollbar px-5">
        {movies?.map((items) => (
          <MovieCard
            key={items.id}
            original_title={items.original_title}
            poster_path={`${import.meta.env.VITE_BASE_URL}${items.poster_path}`}
            vote_average={items.vote_average}
            overview={items.overview}
          />
        ))}
      </div>

    </div>
  )
}