import { useState } from 'react'
import React, {useEffect} from 'react'
import GridCards from '../commons/GridCards'
// import './App.css'
import { Row } from 'antd';
import MainImage from '../commons/MainImage';


function NowPlayingPage() {
    const [Movies, setMovies] = useState([]);
    const [MainMovieImage, setMainMovieImage] = useState(null);
    const [CurrentPage, setCurrentPage] = useState(0);
    const USER_SERVER = '/api/users';
    const API_URL = 'https://api.themoviedb.org/3/'
    const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/'
    const API_KEY = '371aff56c01e4c1d3192f0545f0e9798'
    useEffect(() => {
        const endpoint = `${API_URL}movie/now_playing?api_key=${API_KEY}&language=en-US&page=1`
        fetchMovies(endpoint)
        
    }, [])

    const fetchMovies = (endpoint) => {
        fetch(endpoint)
        .then(response => response.json())
        .then(response => {

            setMovies([...Movies, ...response.results])
            {CurrentPage === 0 && setMainMovieImage(response.results[0])}
            setCurrentPage(response.page)
        })
    }

    const loadMoreItems = () => {
        const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=${CurrentPage + 1}`;
        fetchMovies(endpoint)
    }

    return (
        <>
            <div style={{width: '85%', margin: '0'}}>
            {/* {MainMovieImage &&
            <MainImage 
                image={`${IMAGE_BASE_URL}w400${MainMovieImage.backdrop_path}`} 
                title={MainMovieImage.original_title}
                text={MainMovieImage.overview}
            />} */}

                <div style={{width: '85%', margin: '1rem auto'}}>
                    {/* <h2>Movies by latest</h2> */}
                
                    <Row gutter={[16, 16]}>
                        {Movies && Movies.map((movie, index) => (
                            <React.Fragment key={index}>
                                <GridCards
                                    landingPage
                                    image={movie.poster_path ?
                                        `${IMAGE_BASE_URL}w300${movie.poster_path}` : null}
                                    movieId={movie.id}
                                    movieName={movie.original_title}
                                    vote={movie.vote_average}
                                    movieDes={movie.overview}
                                />
                            </React.Fragment>
                        ))}
                    </Row>

                    
                </div>

                {/* <div style={{display: 'flex', justifyContent:'center'}}>
                    <button onClick={loadMoreItems}>Load More</button>
                </div> */}
            </div>
        </>
    )
}

export default NowPlayingPage
