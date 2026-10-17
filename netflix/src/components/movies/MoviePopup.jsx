
import React from 'react';

export default function MoviePopup({ movie, trailer, onClose }) {
  if (!movie) return null;

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center overflow-y-auto bg-black/80 p-3 backdrop-blur-sm sm:p-5"
      onClick={onClose}
    >
      <div
        className="relative my-auto max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl border border-white/15 bg-[#181818] text-white shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute right-3 top-4 z-10 flex h-8 w-8 items-center justify-center rounded-full border border-white/20 bg-black/70 text-xl text-white transition hover:bg-[#e50914]"
          aria-label="Close popup"
        >
          &times;
        </button>

        {/* Smaller trailer */}
        <div className="mx-3 mt-3 overflow-hidden rounded-xl border border-white/10 bg-black">
          <div className="aspect-video w-full">
            {trailer?.key ? (
              <iframe
                className="h-full w-full"
                src={`https://www.youtube.com/embed/${trailer.key}?autoplay=1&mute=0&playsinline=1`}
                title={movie.title || movie.original_title}
                allow="autoplay; encrypted-media; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <div className="flex h-full items-center justify-center text-sm text-gray-400">
                Trailer not available
              </div>
            )}
          </div>
        </div>

        {/* Movie details */}
        <div className="p-4 sm:p-5">
          <h2 className="line-clamp-2 text-xl font-bold tracking-wide sm:text-2xl">
            {movie.title || movie.original_title}
          </h2>

          <div className="mt-2 flex items-center gap-2 text-xs text-gray-400">
            <span className="rounded-full bg-[#e50914]/15 px-2.5 py-1 font-semibold text-red-400">
              MOVIE
            </span>
            <span>⭐ {movie.vote_average?.toFixed(1) || 'N/A'}/10</span>
          </div>

          <p className="mt-3 line-clamp-2 text-sm leading-6 text-gray-300">
            {movie.overview || 'No description available.'}
          </p>

         
        </div>
      </div>
    </div>
  );
}
