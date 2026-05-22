import React, { useState } from 'react';
import { SECTIONS } from '../constants/sections';
import Section from '../components/Section';
import AccessModal from '../components/AccessModal';
import './Home.css';

const Home = () => {
  const [activeModal, setActiveModal] = useState(null); // holds the section object

  const handleOpenModal = (section) => {
    setActiveModal(section);
  };

  const handleCloseModal = () => {
    setActiveModal(null);
  };

  return (
    <main className="home">
      {SECTIONS.map((section, index) => (
        <Section
          key={section.id}
          section={section}
          index={index}
          onExplore={handleOpenModal}
        />
      ))}
      {activeModal && (
        <AccessModal section={activeModal} onClose={handleCloseModal} />
      )}
    </main>
  );
};

export default Home;
