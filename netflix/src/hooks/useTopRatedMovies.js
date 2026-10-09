import axios from 'axios'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { getTopRatedMovies } from '../slice/MovieSlice'

export default function useTopRatedMovies() {

      const dispatch = useDispatch()

  useEffect(() => {

    axios.get(
      import.meta.env.VITE_WEBSITE_TOP_RATED_MOVIE,
      {
        headers: {
          Authorization: import.meta.env.VITE_MOVIE_TOKEN,
        }
      }
    )
    .then((result) => {

  
      dispatch(
        getTopRatedMovies(result.data.results)
      )

    })
    .catch((error) => {
      console.log(error)
    })

  }, [dispatch])

}