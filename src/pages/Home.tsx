import React, { useState } from 'react';
import './Home.css';

const ChevronDownIcon = ({ className }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <polyline points="6 9 12 15 18 9"></polyline>
  </svg>
);

const Home = () => {
  const [selectedDays, setSelectedDays] = useState(3);
  const [openFAQ, setOpenFAQ] = useState(null);

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    section?.scrollIntoView({ behavior: 'smooth' });
  };

  const faqs = [
    {
      question: "Hogyan működik az edzéstervező?",
      answer: "Mesterséges intelligenciánk elemzi az erőnlétedet, céljaidat és rendelkezésre álló idődet, hogy személyre szabott edzéstervet készítsen."
    },
    {
      question: "Mennyibe kerül az alkalmazás?",
      answer: "Ingyenes alapverziót és prémium előfizetést is kínálunk, amelyek különböző funkciókat tartalmaznak."
    },
    {
      question: "Kezdőknek is alkalmas?",
      answer: "Igen! Alkalmazásunk minden fitness szinthez tud személyre szabott edzéstervet készíteni."
    }
  ];

  return (
    <div className="landing-page">
      {/* Navigáció */}
      <header className="sticky-nav">
        <nav>
          <div className="logo-container">
            <img 
              src="/api/placeholder/80/80" 
              alt="WorkoutWizard Logo" 
              className="logo-image"
            />
            <h1 className="logo-text">WorkoutWizard</h1>
          </div>
          <ul className="nav-links">
            <li onClick={() => scrollToSection('about')}>Rólunk</li>
            <li onClick={() => scrollToSection('app')}>App</li>
            <li onClick={() => scrollToSection('planner')}>Edzéstervező</li>
            <li onClick={() => scrollToSection('download')}>Letöltés</li>
            <li onClick={() => scrollToSection('faq')}>GYIK</li>
          </ul>
          <div className="profile-icon">👤</div>
        </nav>
      </header>

      {/* Főoldal bevezető */}
      <section id="about" className="hero-section">
        <div className="hero-content">
          <h2>Egyedi Edzéstervek Pillanatok Alatt</h2>
          <p>Személyre szabott edzéstervek, amelyek igazodnak céljaidhoz és életmódodhoz.</p>
          <button className="cta-button">Kezdjük!</button>
        </div>
      </section>

      {/* App funkciók - átdolgozva */}
      <section id="app" className="app-section">
        <div className="app-content">
          <div className="app-details">
            <h2>WorkoutWizard Alkalmazás</h2>
            <p className="app-description">
              Forradalmasítjuk az edzéstervezést, hogy minden felhasználónk elérhesse egyéni fitness céljait.
            </p>
            
            <div className="features-container">
              <div className="feature-tile">
                <div className="feature-icon">🎯</div>
                <div className="feature-text">
                  <h3>Személyre Szabott Tervek</h3>
                  <p>Algoritmusunk elemzi erőnlétedet és céljaidat</p>
                </div>
              </div>
              <div className="feature-tile">
                <div className="feature-icon">🕒</div>
                <div className="feature-text">
                  <h3>Rugalmas Ütemezés</h3>
                  <p>Alakítsd át edzésedet saját igényeid szerint</p>
                </div>
              </div>
              <div className="feature-tile">
                <div className="feature-icon">📊</div>
                <div className="feature-text">
                  <h3>Real-Time Nyomon Követés</h3>
                  <p>Figyeld fejlődésedet valós időben</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="app-mockup">
            <div className="mockup-device">
              <div className="mockup-screen">
                <div className="screenshot-carousel">
                  <img 
                    src="/api/placeholder/200/400" 
                    alt="App Screenshot 1" 
                    className="app-screenshot active"
                  />
                  <img 
                    src="/api/placeholder/200/400" 
                    alt="App Screenshot 2" 
                    className="app-screenshot"
                  />
                  <img 
                    src="/api/placeholder/200/400" 
                    alt="App Screenshot 3" 
                    className="app-screenshot"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Edzéstervező */}
      <section id="planner" className="planner-section">
        <h2>Próbáld ki az Edzéstervezőt</h2>
        <div className="planner-container">
          <p>Heti edzésnapok száma: {selectedDays}</p>
          <input 
            type="range" 
            min="1" 
            max="6" 
            value={selectedDays}
            onChange={(e) => setSelectedDays(Number(e.target.value))}
            className="days-slider"
          />
          <button className="generate-plan-button">Terv Generálása</button>
        </div>
      </section>

      {/* Letöltés */}
      <section id="download" className="download-section">
        <h2>Töltsd le most!</h2>
        <div className="store-buttons">
          <button className="app-store-button">App Store</button>
          <button className="google-play-button">Google Play</button>
        </div>
      </section>

      {/* GYIK */}
      <section id="faq" className="faq-section">
        <h2>Gyakran Ismételt Kérdések</h2>
        <div className="faq-container">
          {faqs.map((faq, index) => (
            <div key={index} className="faq-item">
              <div 
                className="faq-question"
                onClick={() => setOpenFAQ(openFAQ === index ? null : index)}
              >
                <h3>{faq.question}</h3>
                <ChevronDownIcon 
                  className={`faq-icon ${openFAQ === index ? 'rotate-180' : ''}`} 
                />
              </div>
              {openFAQ === index && (
                <div className="faq-answer">
                  <p>{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Lábléc */}
      <footer>
        <p>© 2024 WorkoutWizard. Minden jog fenntartva.</p>
      </footer>
    </div>
  );
};

export default Home;