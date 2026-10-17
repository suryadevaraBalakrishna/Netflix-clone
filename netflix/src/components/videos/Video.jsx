import React from 'react'
import useMovieById from '../../hooks/useMovieById'
import { useSelector } from 'react-redux';

export default function Video({ title, overview, id }) {

    useMovieById(id);




    const trailer = useSelector(
    (state) => state.movie.heroTrailer
);


    return (
        <div className="relative min-h-[500px] overflow-hidden bg-black text-white">

            {/* Background YouTube Video */}
            {/* Background YouTube Video */}
            <div className="absolute inset-0 overflow-hidden">
                {trailer?.key && (
                    <iframe
                        key={trailer.key}
                        className="pointer-events-none absolute left-1/2 top-1/2 h-[56.25vw] min-h-full w-[177.78vh] min-w-full -translate-x-1/2 -translate-y-1/2"
                        src={`https://www.youtube.com/embed/${trailer.key}?autoplay=1&mute=1&controls=0&loop=1&playlist=${trailer.key}&playsinline=1`}
                        title={title || 'Movie Background Video'}
                        allow="autoplay; encrypted-media"
                        frameBorder="0"
                    />
                )}
            </div>

            {/* Dark Overlay */}
            <div className="absolute inset-0 z-[1] bg-gradient-to-r from-black via-black/60 to-transparent" />
            <div className="absolute inset-0 z-[1] bg-gradient-to-t from-black via-transparent to-black/20" />

            {/* Movie Content */}
            <div className="relative z-10 flex min-h-[500px] items-center px-5 py-12 sm:px-10 md:px-8">

                <div className="max-w-xl">

                    <h1 className="text-4xl font-bold sm:text-5xl md:text-6xl">
                        {title}
                    </h1>

                    <p className="py-4 text-sm leading-6 text-gray-200 sm:text-base">
                        {overview}
                    </p>

                    <div className="flex gap-3">

                        <button className="flex items-center gap-2 rounded bg-white px-5 py-2.5 font-semibold text-black hover:bg-gray-300">
                            ▶ Play Movie
                        </button>

                        <button className="flex items-center gap-2 rounded bg-gray-500/70 px-5 py-2.5 font-semibold text-white hover:bg-gray-500/50">
                            ℹ More Info
                        </button>

                    </div>

                </div>
            </div>

        </div>
    )
}