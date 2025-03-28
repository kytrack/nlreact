import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Navbar.css'; 

const Navbar: React.FC = () => {
  const navigate = useNavigate();

  const navigateToSection = (sectionId: string) => {
    if (window.location.pathname !== '/') {
      navigate('/', { state: { scrollTo: sectionId } });
    } else {
      const section = document.getElementById(sectionId);
      section?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleProfileClick = () => {
    navigate('/dashboard');
  };

  return (
    <header 
      className="sticky-nav" 
      style={{ 
        maxWidth: '1200px', 
        width: '100%', 
        margin: '0 auto', 
        padding: '0 20px',
        boxSizing: 'border-box'
      }}
    >
      <nav 
        style={{ 
          maxWidth: '1200px', 
          width: '100%', 
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}
      >
        <div className="logo-container">
          <img 
            src="https://i.imgur.com/bPgA7qr.png" 
            alt="NLLogo" 
            className="logo-image"
          />
        </div>
        <ul className="nav-links">
          <li onClick={() => navigateToSection('about')}>Rólunk</li>
          <li onClick={() => navigateToSection('app')}>App</li>
          <li onClick={() => navigateToSection('planner')}>Edzéstervező</li>
          <li onClick={() => navigateToSection('download')}>Letöltés</li>
          <li onClick={() => navigateToSection('faq')}>GYIK</li>
        </ul>
        <div 
          className="profile-icon" 
          onClick={handleProfileClick}
          style={{ cursor: 'pointer' }}
        >
          👤
        </div>
      </nav>
    </header>
  );
};

export default Navbar;