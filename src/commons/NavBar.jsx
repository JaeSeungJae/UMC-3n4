import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../Nav.css';

function NavBar() {
    const [isLogin, setIsLogin] = useState(!!localStorage.getItem('user'));
    const [menuVisible, setMenuVisible] = useState(false);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {
        const updateAuthStatus = () => setIsLogin(!!localStorage.getItem('user'));
        const handleResize = () => setWindowWidth(window.innerWidth);

        updateAuthStatus();
        window.addEventListener('storage', updateAuthStatus);
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('storage', updateAuthStatus);
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const logout = () => {
        localStorage.removeItem('user');
        setIsLogin(false);
        setMenuVisible(false);
    };

    const toggleMenu = () => {
        if (windowWidth <= 768) {
            setMenuVisible(!menuVisible);
        }
    };

    const navigate = useNavigate();

    return (
        <nav className="navbar">
            <div className="navbar-logo"><Link to="/" onClick={() => setMenuVisible(false)}>UMC Movie</Link></div>
            <div className="menu-icon" onClick={toggleMenu}>{menuVisible ? '✕' : '☰'}</div>
            {(menuVisible || windowWidth > 768) && (
                <div className={`menu ${menuVisible ? "open" : ""}`}>
                    {!isLogin ? (
                        <>
                            <Link to="/signup" onClick={() => setMenuVisible(false)}>회원가입</Link>
                            <Link to="/login" onClick={() => setMenuVisible(false)}>Login</Link>
                        </>
                    ) : (
                        <span onClick={logout}>로그아웃</span>
                    )}
                    <Link to="/popular" onClick={() => setMenuVisible(false)}>Popular</Link>
                    <Link to="/now-playing" onClick={() => setMenuVisible(false)}>Now Playing</Link>
                    <Link to="/top-rated" onClick={() => setMenuVisible(false)}>Top Rated</Link>
                    <Link to="/upcoming" onClick={() => setMenuVisible(false)}>Upcoming</Link>
                </div>
            )}
        </nav>
    );
}

export default NavBar;
