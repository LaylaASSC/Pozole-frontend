import React, { useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import anime from 'animejs';
import { SECTIONS } from '../constants/sections';
import './Header.css';

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === '/';

  useEffect(() => {
    anime({
      targets: '.navbar',
      opacity: [0, 1],
      translateY: [-30, 0],
      duration: 800,
      easing: 'easeOutExpo',
    });
  }, []);

  const handleNavClick = (section) => {
    if (!isHome) {
      // Navigate home first, then scroll
      navigate('/');
      setTimeout(() => {
        const el = document.getElementById(`section-${section.id}`);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const el = document.getElementById(`section-${section.id}`);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleMouseEnter = (e) => {
    anime({ targets: e.currentTarget, scale: 1.05, duration: 250, easing: 'easeOutQuad' });
  };

  const handleMouseLeave = (e) => {
    anime({ targets: e.currentTarget, scale: 1, duration: 250, easing: 'easeOutQuad' });
  };

  return (
    <header className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">
          <button
            className="logo-btn"
            onClick={() => navigate('/')}
            aria-label="Ir al inicio"
          >
            <h1>Pozole</h1>
          </button>
        </div>

        <nav className="navbar-nav">
          {SECTIONS.map((section) => (
            <button
              key={section.id}
              className="nav-link"
              onClick={() => handleNavClick(section)}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              {section.name}
            </button>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Header;
