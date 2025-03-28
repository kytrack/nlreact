import React, { useState } from 'react';
import './Home.css';
import Navbar from '../Components/Navbar';


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

  const [planData, setPlanData] = useState(null);
  
    const generatePlan = async () => {
      try {
        const response = await fetch(
          `https://nlapi.azurewebsites.net/api/GeneratePlanTrial?code=OuXi_EhdO_7NFT-2a04uFav5Nm-fjOHbCnnuB70JFdfaAzFukbllUw==&days=${selectedDays}`
        );
        const data = await response.json();
        setPlanData(data);
      } catch (error) {
        console.error('Hiba a terv generálásakor:', error);
      }
  };

  const faqs = [
    {
      question: "Hogyan működik az edzéstervező?",
      answer: "A program kiszámítja először az edzettségi szintedet és az alapján generál egy számodra megfelelő edzéstervet."
    },
    {
      question: "Mit csináljak, ha a program olyan gyarkorlatot ad amelyet nem tudok végezni?",
      answer: "Az alkalmazás részletes tájékoztatást kínál minden gyarkolathoz, így nem fog nehezedre esni a kivitelezésük. Ha viszont semmiképpen nem ideális számodra a feladat, egy gomb segítségével lecserélheted egy másikra, amely ugyanazokat az izomcsoportokat célozza."
    },
    {
      question: "Kezdőknek is alkalmas?",
      answer: "Igen! Az alkalmazásunkat kifejezetten kezdőknek ajánljuk akik nem tudják hogyan fogjanak hozzá az edzéshez, ugyanakkor a haladónak is tartogat új, izgalmas funkciókat a program."
    }
    ,
    {
      question: "Milyen edzéstípusokat támogat az alkalmazás?",
      answer: "Egyelőre csak súlyzós edzésterveket, mint például a Push Pull Leg, Bro Split és Upper Lower felosztás."
    }
    ,
    {
      question: "Szükséges-e edzőtermi eszközök a gyakorlatokhoz?",
      answer: "Erősen javasolt konditermi környezetben használni az alkalmazást, de természetesen van lehetőség saját testúlyos edzések készítésére is."
    }
    ,
    {
      question: "Hogyan követhetem nyomon a fejlődésemet?",
      answer: "Az alkalmazás lehetőséget biztosít az edzésnaplózásra, ahol rögzítheted az elvégzett edzéseket, a súlyokat és ismétléseket a fejlődésed követéséhez."
    }
    ,
    {
      question: "Milyen eszközökön érhető el az alkalmazás?",
      answer: "Az app elérhető Windows alkalmazásként, de hamarosan mobilalkalmazásként is használható lesz."
    }
  ];


  return (
    <div className="landing-page">
      {/* Navigáció */}
      <Navbar />


      {/* Főoldal bevezető */}
<section id="about" className="hero-section">
  <div className="hero-content">
    <h2>Lépj a Következő Szintre a NextLevel-el!</h2>
    <p>Személyre szabott edzéstervek, amelyek igazodnak céljaidhoz és életmódodhoz.</p>
    <a href="#planner" className="cta-button">Kezdjük!</a>
  </div>
</section>

      {/* App funkciók - átdolgozva */}
      <section id="app" className="app-section">
        <div className="app-content">
          <div className="app-details">
            <h2>NextLevel Windows Alkalmazás</h2>
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
              
                <div className="screenshot-carousel">
                  <img 
                    src="https://i.imgur.com/ZyvV2we.png" 
                    alt="App Screenshot 1" 
                    className="app-screenshot active"
                  />
                  <img 
                    src="/api/placeholder/800/470" 
                    alt="App Screenshot 2" 
                    className="app-screenshot"
                  />
                  <img 
                    src="/api/placeholder/800/470" 
                    alt="App Screenshot 3" 
                    className="app-screenshot"
                  />
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
          <button 
            className="generate-plan-button"
            onClick={generatePlan}
          >
            Terv Generálása
          </button>
          </div>

          {planData && (
            <div className="plan-table">
              <h3>Heti Edzésterv</h3>
              <table>
                <thead>
                  <tr>
                    {['Hétfő', 'Kedd', 'Szerda', 'Csütörtök', 'Péntek', 'Szombat', 'Vasárnap'].map((day) => (
                      <th key={day}>{day}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    {planData.map((dayExercises, index) => (
                      <td key={index}>
                        {dayExercises.length > 0 ? (
                          <ul>
                            {dayExercises.map((exercise, exIndex) => (
                              <li key={exIndex}>{exercise}</li>
                            ))}
                          </ul>
                        ) : (
                          <p className="rest-day">Pihenőnap</p>
                        )}
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          )}
        
      </section>

      {/* Letöltés */}
<section id="download" className="download-section">
  <h2>Töltsd le a GitHubról!</h2>
  <div className="github-buttons">
    <a 
      href="https://github.com/ddaniel-bit/NextLevel.git" 
      className="github-button"
      target="_blank" 
      rel="noopener noreferrer"
    >
      <svg height="32" aria-hidden="true" viewBox="0 0 16 16" width="32" className="github-icon">
        <path fill="white" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"></path>
      </svg>
      <span>Stabil verzió letöltése</span>
    </a>
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
        <p>© 2025 NextLevel. Minden jog fenntartva.</p>
      </footer>
    </div>
  );
};

export default Home;
