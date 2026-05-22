import React, { useEffect, useRef } from 'react';
import anime from 'animejs';
import './WelcomeModal.css';

const WelcomeModal = ({ onClose }) => {
  const overlayRef = useRef(null);
  const cardRef = useRef(null);

  useEffect(() => {
    // Lock scroll while welcome is shown
    document.body.style.overflow = 'hidden';

    // Entrance animation
    anime({
      targets: overlayRef.current,
      opacity: [0, 1],
      duration: 600,
      easing: 'easeOutQuad',
    });
    anime({
      targets: cardRef.current,
      opacity: [0, 1],
      translateY: [40, 0],
      scale: [0.95, 1],
      duration: 700,
      delay: 200,
      easing: 'easeOutExpo',
    });
  }, []);

  const handleClose = () => {
    // Exit animation then unmount
    anime({
      targets: cardRef.current,
      opacity: [1, 0],
      translateY: [0, -30],
      scale: [1, 0.95],
      duration: 400,
      easing: 'easeInQuad',
    });
    anime({
      targets: overlayRef.current,
      opacity: [1, 0],
      duration: 500,
      delay: 200,
      easing: 'easeInQuad',
      complete: () => {
        document.body.style.overflow = '';
        onClose();
      },
    });
  };

  return (
    <div className="welcome-overlay" ref={overlayRef}>
      <div className="welcome-card" ref={cardRef}>
        <div className="welcome-icon">🏢</div>
        <h1 className="welcome-title">Bienvenido</h1>
        <p className="welcome-subtitle">
          Sistema de gestión y acceso al edificio. Por favor, confirme su ingreso
          para continuar explorando las instalaciones.
        </p>
        <div className="welcome-divider" />
        <p className="welcome-note">
          Algunas áreas requieren un código de acceso. Tenga a mano su código
          o indique si es visitante.
        </p>
        <button className="welcome-btn" onClick={handleClose}>
          Aceptar e Ingresar
        </button>
      </div>
    </div>
  );
};

export default WelcomeModal;
