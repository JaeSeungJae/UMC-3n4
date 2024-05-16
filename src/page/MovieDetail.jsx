import React from 'react'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
// import { API_KEY, API_URL, IMAGE_BASE_URL } from '../../Config'
import MainImage from '../commons/MainImage'
import MovieInfo from '../Sections/MovieInfo'
import GridCards from '../commons/GridCards'
import { Row } from 'antd'
import Favorite from '../Sections/Favorite'

function MovieDetail(props) {
    const {movieId} = useParams();
    const API_URL = 'https://api.themoviedb.org/3/'
    const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/'
    const API_KEY = '371aff56c01e4c1d3192f0545f0e9798'
    const [movie, setMovie] = useState([])
    const [Casts, setCasts] = useState([])
    const [actorToggle, setActorToggle] = useState(false)
    const toggleActerView = () => {
        setActorToggle(!actorToggle)
    }

    useEffect(() => {
        let endpointCrew = `${API_URL}movie/${movieId}/credits?api_key=${API_KEY}`
        let endpointInfo = `${API_URL}movie/${movieId}?api_key=${API_KEY}`

        fetch(endpointInfo)
        .then(response => response.json())
        .then(response => {
            setMovie(response)
        })


        fetch(endpointCrew)
        .then(response => response.json())
        .then(response => {
            setCasts(response.cast)
        })

    }, [])

  return (
    <div>

    <MainImage
        image={`${IMAGE_BASE_URL}w400${movie.backdrop_path}`} 
        title={movie.original_title}
        text={movie.overview}
    />
      <div style={{width: '85%', margin: '1rem auto'}}>

        <div style={{display:'flex', justifyContent: 'flex-end'}}>
            <Favorite MovieInfo={movie} movieId={movieId} userFrom={localStorage.getItem('userId')} />
        </div>

        <MovieInfo 
            movie={movie}
        />
        <br></br>

        <div style={{display: 'flex', justifyContent: 'center', margin: '2rem'}}>
            <button onClick={toggleActerView}> Toggle Actor View</button>

        </div>
        {actorToggle && 
            <Row gutter={[16, 16]}>
            {Casts && Casts.map((cast, index) => (
                <React.Fragment key={index}>
                    <GridCards
                        image={cast.profile_path ?
                            `${IMAGE_BASE_URL}w300${cast.profile_path}` : null}
                        characterName={cast.name}
                        character
                    />
                </React.Fragment>
            ))}
        </Row>
        }
            
      </div>
    </div>
  )
}

export default MovieDetail
