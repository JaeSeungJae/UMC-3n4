import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Nav.css'

function NavBar() {
  const [login, setLogin] = useState(true);
  const toggleLogin = () => {
    setLogin(prev => !prev);
  }
  const navigate = useNavigate();

  return (
    <nav className="navbar" style={{position: 'sticky', top:'0'}}>
      <div><a href="/#">UMC Movie</a></div>
      <div>
        <span style={{cursor: 'pointer', color: 'yellow', fontWeight: 'bold'}} onClick={()=>
          {navigate('/signup');}}>회원가입</span>
        <a href="/login">Login</a>
        <a href="/popular">Popular</a>
        <a href="/now-playing">Now Playing</a>
        <a href="/top-rated">Top Rated</a>
        <a href="/up-coming">Upcoming</a>
      </div>
    </nav>
  )
}

export default NavBar