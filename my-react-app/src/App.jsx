import React, { useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import ScrollButtons from './components/ScrollButtons';
import WelcomeModal from './components/WelcomeModal';
import Home from './pages/Home';
import SectionPage from './pages/SectionPage';
import './App.css';

const App = () => {
  const [showWelcome, setShowWelcome] = useState(true);
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <div className="app">
      {/* Welcome modal only on initial load of home page */}
      {showWelcome && isHome && (
        <WelcomeModal onClose={() => setShowWelcome(false)} />
      )}

      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:path" element={<SectionPage />} />
      </Routes>
      <ScrollButtons />
      <Footer />
    </div>
  );
};

export default App;