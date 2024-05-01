import React, { useState } from 'react';
import '../Nav.css'

function NavBar() {
  const [login, setLogin] = useState(true);
  const toggleLogin = () => {
    setLogin(prev => !prev);
  }
  return (
    <nav className="navbar">
      <div><a href="/#">UMC Movie</a></div>
      <div>
        <span style={{cursor: 'pointer', color: 'yellow', fontWeight: 'bold'}} onClick={toggleLogin}>{login ? '로그인' : '로그아웃'}</span>
        <a href="/popular">Popular</a>
        <a href="/now-playing">Now Playing</a>
        <a href="/top-rated">Top Rated</a>
        <a href="/up-coming">Upcoming</a>
      </div>
    </nav>
  )
}

export default NavBar