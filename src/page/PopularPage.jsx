import { useState } from 'react'
import React, {useEffect} from 'react'
import GridCards from '../commons/GridCards'
// import './App.css'
import { Row } from 'antd';
import MainImage from '../commons/MainImage';
import Loading from '../components/Loading';


function PopularPage() {
    const [Movies, setMovies] = useState([]);
    const [MainMovieImage, setMainMovieImage] = useState(null);
    const [CurrentPage, setCurrentPage] = useState(0);
    const USER_SERVER = '/api/users';
    const API_URL = 'https://api.themoviedb.org/3/'
    const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/'
    const API_KEY = '371aff56c01e4c1d3192f0545f0e9798'
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=1`;
        fetchMovies(endpoint)
        
    }, [])

    useEffect(() => {
        console.log("loading...");
    }, [loading])

    const fetchMovies = (endpoint) => {
        setLoading(true);
        fetch(endpoint)
        .then(response => response.json())
        .then(response => {

            //setMovies([...Movies, ...response.results])
            setMovies(response.results)
            {CurrentPage === 0 && setMainMovieImage(response.results[0])}
            setCurrentPage(response.page)
            setLoading(false);
        })
        
    }

    const loadMoreItems = () => {
        const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=${CurrentPage + 1}`;
        fetchMovies(endpoint)
    }
    const loadPrevItems = () => {
        if (CurrentPage > 1) {
            const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=${CurrentPage - 1}`;
            fetchMovies(endpoint)
        }
        else {
            alert('첫 번째 페이지입니다.');
        }
    }

    return (
        <>
            {loading && <Loading></Loading>}
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

                <div style={{display: 'flex', justifyContent:'center'}}>
                    <p style={{color: CurrentPage > 1 ? 'white' : 'red', marginRight: '50px', cursor: "pointer"}} onClick={loadPrevItems}>&lt;</p>
                    <p style={{color: 'white'}}>{CurrentPage}</p>
                    <p style={{color: 'white', marginLeft: '50px', cursor: "pointer"}} onClick={loadMoreItems}>&gt;</p>
                </div>
            </div>
        </>
    )
}

export default PopularPage
