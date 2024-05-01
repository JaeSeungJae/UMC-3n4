import Axios from 'axios'
import React, {useEffect} from 'react'

function Favorite(props) {

    const movieId = props.movieId
    const userFrom = props.userFrom
    const movieTitle = props.MovieInfo.title
    const moviePost = props.MovieInfo.backdrop_path
    const movieRunTime = props.MovieInfo.runtime

    useEffect(() => {

        let variables = {
            userFrom,
            movieId,
        }

        Axios.post('/api/favorite/favoriteNumber', variables)
        .then(response => {
            

            if (response.data.success) {
                
            }
            else {

            }
        })
    }, [])

  return (
    <div>
        <button>Favorite</button>
    </div>
  )
}

export default Favorite
