import axios from 'axios'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { getNowPlayingMovies } from '../slice/MovieSlice'

export default function useNowPlayingMovies() {

  const dispatch = useDispatch()

  useEffect(() => {

    axios.get(
      import.meta.env.VITE_WEBSITE_GET_MOVIE,
      {
        headers: {
          Authorization: import.meta.env.VITE_MOVIE_TOKEN,
        }
      }
    )
    .then((result) => {

      dispatch(
        getNowPlayingMovies(result.data.results)
      )

    })
    .catch((error) => {
      console.log(error)
    })

  }, [dispatch])
}