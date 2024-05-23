import { useState, useCallback } from 'react'
import React, {useEffect} from 'react'
import GridCards from '../commons/GridCards'
// import './App.css'
import { Row } from 'antd';
import MainImage from '../commons/MainImage';
import styled from 'styled-components';
import icon from './search.png'
import {debounce} from 'lodash';

const MovieList = styled.div`
height: 500px;  // 적절한 높이 설정
overflow-y: auto;  // 세로 스크롤 활성화
overfloy-x: hidden;
margin: 1rem auto;
width: 100%;  // 너비 설정
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
`

const API_URL = 'https://api.themoviedb.org/3/'
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/'
const API_KEY = '371aff56c01e4c1d3192f0545f0e9798'




function MainPage() {   
    const username = localStorage.getItem('user');
    useEffect(() => {
        console.log(username);
    }, [])
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
    const handleSearchChange = (event) => {
        const value = event.target.value;
        setSearch(value);
        debouncedSearchMovie(value);
    }

    return (
        <>
        <div style={{display: 'flex', width: '100%', height: '300px', backgroundColor: 'black', margin: '10px'
        , alignContent: 'center', justifyContent: 'center', fontWeight: 'bold'}}>
            <span style={{fontSize: '36px', color: 'white', alignContent: 'center'}}>
                {username}님, 환영합니다
            </span>
        </div>
        <div style={{display: 'flex', alignContent: 'center', justifyContent: 'center', width: '100%', margin: '10px'}}>
            <span style={{fontSize: '36px', color: 'white', fontWeight: 'bold'}}>🎥 Find your movies!</span>
        </div>
        <div style={{display: 'flex', alignContent: 'center', alignItems: 'center', 
        justifyContent: 'center', marginTop: '30px'}}>
            <input type="text" value={search} onChange={handleSearchChange}
             style={{height: '40px', width: '500px', borderRadius: '50px', paddingLeft: '30px'}}/>
             <span>🔍</span>
        </div>
        <MovieList>
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

                    
                    </MovieList>
        </>
    )
}

export default MainPage
