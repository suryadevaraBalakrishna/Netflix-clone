import axios from 'axios'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { getPopularMovies } from '../slice/MovieSlice'

export default function usePopularMovies() {

  const dispatch = useDispatch()

  useEffect(() => {

    axios.get(
      import.meta.env.VITE_WEBSITE_GET_POPULAR_MOVIE,
      {
        headers: {
          Authorization: import.meta.env.VITE_MOVIE_TOKEN,
        }
      }
    )
    .then((result) => {
      dispatch(
        getPopularMovies(result.data.results)
      )

    })
    .catch((error) => {
      console.log(error)
    })

  }, [dispatch])
}