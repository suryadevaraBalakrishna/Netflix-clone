import axios from 'axios'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { getUpcomingMovies } from '../slice/MovieSlice'

export default function useUpcomingMovies() {
 const dispatch = useDispatch()

  useEffect(() => {

    axios.get(
      import.meta.env.VITE_WEBSITE_UPCOMING_MOVIE,
      {
        headers: {
          Authorization: import.meta.env.VITE_MOVIE_TOKEN,
        }
      }
    )
    .then((result) => {
        
      dispatch(
        getUpcomingMovies(result.data.results)
      )

    })
    .catch((error) => {
      console.log(error)
    })

  }, [dispatch])
}
