import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Row } from 'antd';
import GridCards from '../commons/GridCards';
import MainImage from '../commons/MainImage';
import Loading from '../components/Loading';

const API_URL = 'https://api.themoviedb.org/3/';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/';
const API_KEY = '371aff56c01e4c1d3192f0545f0e9798';

const Container = styled.div`
  width: 85%;
  margin: 1rem auto;

  @media (max-width: 768px) {
    width: 95%;
    margin: 0.5rem auto;
  }
`;

const PageNavigation = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;

  & p {
    margin: 0 20px;
    cursor: pointer;
    color: ${(props) => props.disabled ? 'gray' : 'white'};
    &:hover {
      color: ${(props) => props.disabled ? 'gray' : '#FEC623'};
    }

    @media (max-width: 768px) {
      margin: 0 10px;
      font-size: 14px; // Smaller font size on smaller screens
    }
  }
`;

function PopularPage() {
    const [Movies, setMovies] = useState([]);
    const [MainMovieImage, setMainMovieImage] = useState(null);
    const [CurrentPage, setCurrentPage] = useState(0);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchMovies(`${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=1`);
    }, []);

    const fetchMovies = (endpoint) => {
        setLoading(true);
        fetch(endpoint)
        .then(response => response.json())
        .then(response => {
            setMovies(response.results);
            if (CurrentPage === 0) setMainMovieImage(response.results[0]);
            setCurrentPage(response.page);
            setLoading(false);
        });
    };

    const loadMoreItems = () => {
        fetchMovies(`${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=${CurrentPage + 1}`);
    };

    const loadPrevItems = () => {
        if (CurrentPage > 1) {
            fetchMovies(`${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=${CurrentPage - 1}`);
        } else {
            alert('This is the first page.');
        }
    };

    return (
        <>
            {loading && <Loading />}
            <Container>
                <Row gutter={[16, 16]}>
                    {Movies.map((movie, index) => (
                        <GridCards
                            key={index}
                            landingPage
                            image={movie.poster_path ? `${IMAGE_BASE_URL}w300${movie.poster_path}` : null}
                            movieId={movie.id}
                            movieName={movie.original_title}
                            vote={movie.vote_average}
                            movieDes={movie.overview}
                        />
                    ))}
                </Row>
                <PageNavigation>
                    <p style={{ color: CurrentPage > 1 ? 'white' : 'gray' }} onClick={loadPrevItems}>&lt;</p>
                    <p>{CurrentPage}</p>
                    <p onClick={loadMoreItems}>&gt;</p>
                </PageNavigation>
            </Container>
        </>
    );
}

export default PopularPage;
