import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import anime from 'animejs';
import './AccessModal.css';

const ACCESS_CODE = '1234';

const AccessModal = ({ section, onClose }) => {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [shaking, setShaking] = useState(false);
  const overlayRef = useRef(null);
  const cardRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    anime({
      targets: overlayRef.current,
      opacity: [0, 1],
      duration: 300,
      easing: 'easeOutQuad',
    });
    anime({
      targets: cardRef.current,
      opacity: [0, 1],
      translateY: [30, 0],
      scale: [0.96, 1],
      duration: 450,
      easing: 'easeOutExpo',
    });
  }, []);

  const closeWithAnimation = (callback) => {
    anime({
      targets: cardRef.current,
      opacity: [1, 0],
      translateY: [0, 20],
      scale: [1, 0.96],
      duration: 300,
      easing: 'easeInQuad',
    });
    anime({
      targets: overlayRef.current,
      opacity: [1, 0],
      duration: 350,
      delay: 100,
      easing: 'easeInQuad',
      complete: callback,
    });
  };

  const handleAccess = () => {
    if (code === ACCESS_CODE) {
      closeWithAnimation(() => {
        onClose();
        navigate(`/${section.path}`);
      });
    } else {
      setError('Código incorrecto. Inténtalo de nuevo.');
      setShaking(true);
      anime({
        targets: cardRef.current,
        translateX: [-10, 10, -8, 8, -5, 5, 0],
        duration: 500,
        easing: 'easeInOutSine',
      });
      setTimeout(() => setShaking(false), 600);
    }
  };

  const handleGuest = () => {
    closeWithAnimation(() => {
      onClose();
      navigate(`/${section.path}`);
    });
  };

  const handleOverlayClick = (e) => {
    if (e.target === overlayRef.current) {
      closeWithAnimation(onClose);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleAccess();
    if (e.key === 'Escape') closeWithAnimation(onClose);
  };

  if (!section) return null;

  return (
    <div
      className="access-overlay"
      ref={overlayRef}
      onClick={handleOverlayClick}
    >
      <div className="access-card" ref={cardRef}>
        <div
          className="access-color-bar"
          style={{ background: section.gradient }}
        />

        <button
          className="access-close-btn"
          onClick={() => closeWithAnimation(onClose)}
          aria-label="Cerrar"
        >
          ✕
        </button>

        <div className="access-header">
          <div className="access-icon">🔐</div>
          <h2 className="access-title">Acceso Restringido</h2>
          <p className="access-section-name" style={{ color: section.color }}>
            {section.name}
          </p>
          <p className="access-subtitle">
            Esta área requiere autorización. Ingresa tu código o continúa como invitado.
          </p>
        </div>

        <div className="access-form">
          <label className="access-label" htmlFor="access-code-input">
            Código de Acceso
          </label>
          <input
            id="access-code-input"
            type="password"
            className={`access-input ${error ? 'has-error' : ''}`}
            placeholder="••••••••"
            value={code}
            onChange={(e) => { setCode(e.target.value); setError(''); }}
            onKeyDown={handleKeyDown}
            autoFocus
            maxLength={20}
          />
          {error && <p className="access-error">{error}</p>}
        </div>

        <div className="access-actions">
          <button
            className="access-btn-primary"
            style={{ background: section.gradient }}
            onClick={handleAccess}
          >
            Ingresar
          </button>
          <button className="access-btn-guest" onClick={handleGuest}>
            Soy invitado
          </button>
        </div>
      </div>
    </div>
  );
};

export default AccessModal;
