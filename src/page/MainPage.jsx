import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { Row } from 'antd';
import { debounce } from 'lodash';
import GridCards from '../commons/GridCards';

const API_URL = 'https://api.themoviedb.org/3/';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/';
const API_KEY = '371aff56c01e4c1d3192f0545f0e9798';

const SearchInput = styled.input`
  height: 40px;
  width: 80%;
  max-width: 500px;
  border-radius: 50px;
  padding-left: 30px;
  @media (max-width: 600px) {
    width: 90%;
    border-radius: 20px;
  }
`;

const MovieList = styled.div`
  height: 500px;
  overflow-y: auto;
  overflow-x: hidden;
  margin: 1rem auto;
  width: 95%;
  @media (max-width: 600px) {
    width: 100%;
  }
  &::-webkit-scrollbar {
    width: 8px;
  }
  &::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 10px;
    &:hover {
      background: #555;
    }
  }
`;

const SearchBox = ({ search, setSearch, debouncedSearchMovie }) => {
  const handleSearchChange = (event) => {
    const value = event.target.value;
    setSearch(value);
    debouncedSearchMovie(value);
  };

  return (
    <div style={{ display: 'flex', alignContent: 'center', alignItems: 'center', 
    justifyContent: 'center', marginTop: '30px' }}>
      <SearchInput type="text" value={search} onChange={handleSearchChange}/>
      <span>🔍</span>
    </div>
  );
};

function MainPage() {
  const username = localStorage.getItem('user');

  useEffect(() => {
    console.log(username);
  }, [username]);

  const [search, setSearch] = useState("");
  const [Movies, setMovies] = useState([]);

  const searchMovie = useCallback((value) => {
    if (value.trim()) {
      fetch(`${API_URL}search/movie?query=${encodeURIComponent(value)}&api_key=${API_KEY}`)
      .then(response => response.json())
      .then(response => {
        setMovies(response.results);
      })
      .catch(error => {
        console.error(error);
        setMovies([]);
      });
    } else {
      setMovies([]);
    }
  }, []);

  const debouncedSearchMovie = useCallback(debounce((value) => searchMovie(value), 300), [searchMovie]);

  return (
    <>
      <div style={{ display: 'flex', width: '100%', height: '300px', backgroundColor: 'black', margin: '10px',
      alignContent: 'center', justifyContent: 'center', fontWeight: 'bold' }}>
        <span style={{ fontSize: '36px', color: 'white', alignContent: 'center' }}>
          {username}님, 환영합니다
        </span>
      </div>
      <div style={{ display: 'flex', alignContent: 'center', justifyContent: 'center', width: '100%', margin: '10px' }}>
        <span style={{ fontSize: '36px', color: 'white', fontWeight: 'bold' }}>🎥 Find your movies!</span>
      </div>
      <SearchBox search={search} setSearch={setSearch} debouncedSearchMovie={debouncedSearchMovie} />
      <MovieList>
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
      </MovieList>
    </>
  );
}

export default MainPage;
