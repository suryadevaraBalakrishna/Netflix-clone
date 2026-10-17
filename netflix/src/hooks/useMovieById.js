import axios from 'axios';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
    getHeroTrailer,
    getPopupTrailer
} from '../slice/MovieSlice';

export default function useMovieById(id, type = "hero") {
    const dispatch = useDispatch();

    useEffect(() => {
        const setTrailer =
            type === "popup" ? getPopupTrailer : getHeroTrailer;

        if (!id) {
            dispatch(setTrailer(null));
            return;
        }

        dispatch(setTrailer(null));

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
                const videos = result?.data?.results || [];

                const trailer =
                    videos.find(
                        (item) =>
                            item.site === "YouTube" &&
                            item.type === "Trailer" &&
                            item.official
                    ) ||
                    videos.find(
                        (item) =>
                            item.site === "YouTube" &&
                            item.type === "Trailer"
                    ) ||
                    videos.find((item) => item.site === "YouTube") ||
                    null;

                dispatch(setTrailer(trailer));
            })
            .catch((error) => {
                console.log(error);
                dispatch(setTrailer(null));
            });
    }, [id, type, dispatch]);
}