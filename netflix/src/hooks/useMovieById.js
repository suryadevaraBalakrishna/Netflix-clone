import axios from 'axios';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { gettrailerMovies } from '../slice/MovieSlice';

export default function useMovieById(id) {
    const dispatch = useDispatch();
    useEffect(() => {
        if (!id) return;

        axios
            .get(
                `${import.meta.env.VITE_WEBSITE_GET_VIDEO}${id}/videos`,
                {
                    headers: {
                        Authorization: import.meta.env.VITE_MOVIE_TOKEN,
                    },
                }
            )
            .then((result) => {
                const trailer = result?.data?.results?.filter((items) => {
                    return items.type == "Trailer"
                })
                dispatch(gettrailerMovies(trailer.length > 0 ? trailer[0] : result.data.results[0]));
            })
            .catch((error) => {
                console.log(error);
            });
    }, [id]);
}