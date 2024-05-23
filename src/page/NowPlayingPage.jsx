import React, { useState, useEffect, useRef, useCallback } from 'react';
import GridCards from '../commons/GridCards';
import { Row } from 'antd';
import MainImage from '../commons/MainImage';
import Loading from '../components/Loading';

function NowPlayingPage() {
    const [Movies, setMovies] = useState([]);
    const [MainMovieImage, setMainMovieImage] = useState(null);
    const [CurrentPage, setCurrentPage] = useState(1);
    const API_URL = 'https://api.themoviedb.org/3/';
    const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/';
    const API_KEY = '371aff56c01e4c1d3192f0545f0e9798';
    const observer = useRef();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const endpoint = `${API_URL}movie/now_playing?api_key=${API_KEY}&language=en-US&page=1`;
        fetchMovies(endpoint);
    }, []);

    const fetchMovies = (endpoint) => {
        setLoading(true);
        fetch(endpoint)
            .then(response => response.json())
            .then(response => {
                setMovies(prevMovies => [...prevMovies, ...response.results]);
                if (CurrentPage === 1) {
                    setMainMovieImage(response.results[0]);
                }
                setCurrentPage(response.page);
                setLoading(false);
            });
    }

    const loadMoreItems = useCallback(() => {
        const endpoint = `${API_URL}movie/now_playing?api_key=${API_KEY}&language=en-US&page=${CurrentPage + 1}`;
        fetchMovies(endpoint);
    }, [CurrentPage]);

    const lastMovieElementRef = useCallback(node => {
        if (observer.current) observer.current.disconnect();
        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting) {
                loadMoreItems();
            }
        });
        if (node) observer.current.observe(node);
    }, [loadMoreItems]);

    return (
        <>
            {loading && <Loading></Loading>}
            <div style={{ width: '85%', margin: '0' }}>
                {/* {MainMovieImage &&
                    <MainImage
                        image={`${IMAGE_BASE_URL}w400${MainMovieImage.backdrop_path}`}
                        title={MainMovieImage.original_title}
                        text={MainMovieImage.overview}
                    />
                } */}

                <div style={{ width: '85%', margin: '1rem auto' }}>
                    <Row gutter={[16, 16]}>
                        {Movies && Movies.map((movie, index) => (
                            <React.Fragment key={index}>
                                <GridCards
                                    landingPage
                                    image={movie.poster_path ? `${IMAGE_BASE_URL}w300${movie.poster_path}` : null}
                                    movieId={movie.id}
                                    movieName={movie.original_title}
                                    vote={movie.vote_average}
                                    movieDes={movie.overview}
                                />
                                {Movies.length === index + 1 && <div ref={lastMovieElementRef}></div>}
                            </React.Fragment>
                        ))}
                    </Row>
                </div>
            </div>
        </>
    );
}

export default NowPlayingPage;
