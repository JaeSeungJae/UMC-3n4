import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { Row } from 'antd';
import MainImage from '../commons/MainImage';
import MovieInfo from '../Sections/MovieInfo';
import GridCards from '../commons/GridCards';
import Favorite from '../Sections/Favorite';

const API_URL = 'https://api.themoviedb.org/3/';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/';
const API_KEY = '371aff56c01e4c1d3192f0545f0e9798';

const Container = styled.div`
  width: 85%;
  margin: 1rem auto;
  @media (max-width: 768px) {
    width: 95%;
  }
`;

const Button = styled.button`
  display: flex;
  justify-content: center;
  margin: 2rem;
  padding: 0.5rem 1rem;
  font-size: 16px;
  cursor: pointer;
  background-color: #1c1c1c;
  color: white;
  border-radius: 4px;
  border: none;
  &:hover {
    background-color: #333;
  }
`;

function MovieDetail() {
    const { movieId } = useParams();
    const [movie, setMovie] = useState({});
    const [Casts, setCasts] = useState([]);
    const [actorToggle, setActorToggle] = useState(false);

    const toggleActorView = () => {
        setActorToggle(!actorToggle);
    };

    useEffect(() => {
        const endpointCrew = `${API_URL}movie/${movieId}/credits?api_key=${API_KEY}`;
        const endpointInfo = `${API_URL}movie/${movieId}?api_key=${API_KEY}`;

        fetch(endpointInfo)
        .then(response => response.json())
        .then(response => {
            setMovie(response);
        });

        fetch(endpointCrew)
        .then(response => response.json())
        .then(response => {
            setCasts(response.cast);
        });
    }, [movieId]);

    return (
        <div>
            <MainImage
                image={`${IMAGE_BASE_URL}w400${movie.backdrop_path}`}
                title={movie.original_title}
                text={movie.overview}
            />
            <Container>
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Favorite MovieInfo={movie} movieId={movieId} userFrom={localStorage.getItem('userId')} />
                </div>
                <MovieInfo movie={movie} />
                <br />
                <Button onClick={toggleActorView}>Toggle Actor View</Button>
                {actorToggle && (
                    <Row gutter={[16, 16]}>
                    {Casts.map((cast, index) => (
                        <GridCards
                            key={index}
                            image={cast.profile_path ? `${IMAGE_BASE_URL}w300${cast.profile_path}` : null}
                            characterName={cast.name}
                            character
                        />
                    ))}
                    </Row>
                )}
            </Container>
        </div>
    );
}

export default MovieDetail;