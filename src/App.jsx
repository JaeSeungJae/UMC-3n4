// src/App.jsx
import React, {useState, useEffect} from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import MainPage from './page/MainPage';
import NavBar from './commons/NavBar';
import Footer from './commons/Footer';
import PopularPage from './page/PopularPage';
import MovieDetail from './page/MovieDetail';
import NowPlayingPage from './page/NowPlayingPage';
import TopRatedPage from './page/TopRatedPage';
import UpComing from './page/UpComing';
import Loading from './components/Loading';
import LocationAwareComponent from './Sections/LocationAwareComponent'
import NotFound from './page/NotFound';
import SignupPage from './page/SignUpPage';
import Login from './page/Login';

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route index element={<><MainPage /><LocationAwareComponent /></>} />
        <Route path="popular" element={<><PopularPage /><LocationAwareComponent /></>}/>
        <Route path="/movie/:movieId" element={<><MovieDetail /><LocationAwareComponent /></>} />
        <Route path="now-playing" element={<><NowPlayingPage /><LocationAwareComponent /></>}/>
        <Route path="top-rated" element={<><TopRatedPage /><LocationAwareComponent /></>}/>
        <Route path="up-coming" element={<><UpComing /><LocationAwareComponent /></>}/>
        <Route path="/signup" element={<SignupPage />}/>
        <Route path="/login" element={<Login />}/>
        <Route path="*" element={<NotFound />} />
      </Routes>
      {/* <Footer /> */}
    </BrowserRouter>
  );
}

export default App;
