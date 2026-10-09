import React from 'react'

export default function MovieCard({ original_title, poster_path, vote_average, overview }) {
  return (
    <div className="w-[180px] flex-shrink-0 overflow-hidden rounded-md bg-black">

      {/* Poster */}
      <img
        src={poster_path}
        alt="Wonder Woman"
        className="h-[270px] w-full object-cover"
      />

      {/* Movie Details */}
      <div className="p-3">

        <h3 className="text-sm font-semibold text-white">
          {original_title}
        </h3>

        <div className="mt-2 flex items-center justify-between text-xs text-gray-400">
          <p className="line-clamp-2">
            {overview}
          </p>
        </div>

        <div className="mt-2 flex items-center gap-1 text-xs text-gray-300">
          <span>⭐</span>
          <span>{vote_average}</span>
        </div>

      </div>

    </div>
  )
}