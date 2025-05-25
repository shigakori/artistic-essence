import React, { useRef, useEffect, useState } from 'react';
import './SubmitModal.css';
import gsap from 'gsap';
import ScrambleText from '../ScrambleText/ScrambleText';

const Toast = ({ message, onClose }) => {
  const toastRef = useRef(null);
  useEffect(() => {
    gsap.fromTo(toastRef.current, { x: 80, opacity: 0 }, { x: 0, opacity: 1, duration: 0.5, ease: 'power3.out' });
    const timer = setTimeout(() => {
      gsap.to(toastRef.current, { x: 80, opacity: 0, duration: 0.5, ease: 'power3.in', onComplete: onClose });
    }, 2500);
    return () => clearTimeout(timer);
  }, [onClose]);
  return (
    <div className="submit-modal__toast" ref={toastRef}>{message}</div>
  );
};

const SubmitModal = ({ onClose }) => {
  const modalRef = useRef(null);
  const scrambleRef = useRef(null);
  const [toast, setToast] = useState(false);

  useEffect(() => {
    gsap.fromTo(
      modalRef.current,
      { opacity: 0, scale: 0.85, y: 80, filter: 'blur(8px)' },
      { opacity: 1, scale: 1, y: 0, filter: 'blur(0px)', duration: 0.7, ease: 'power3.out' }
    );
    return () => {
      gsap.to(modalRef.current, { opacity: 0, scale: 0.9, y: 60, filter: 'blur(8px)', duration: 0.4, ease: 'power3.in' });
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setToast(true);
    setTimeout(() => {
      setToast(false);
      onClose();
    }, 3000);
  };

  return (
    <div className="submit-modal__overlay" onClick={onClose}>
      <div className="submit-modal__window" ref={modalRef} onClick={e => e.stopPropagation()}>
        <button className="submit-modal__close" onClick={onClose} data-pointer="hover">&times;</button>
        <h3 className="submit-modal__title">Submit your work</h3>
        <form className="submit-modal__form" onSubmit={handleSubmit}>
          <label>
            Name
            <input type="text" name="name" required autoComplete="off" />
          </label>
          <label>
            Email
            <input type="email" name="email" required autoComplete="off" />
          </label>
          <label>
            Why should we choose you?
            <textarea name="desc" rows={3} required placeholder="Tell us about your art, your vision, and why you want to join..." />
          </label>
          <button 
          type="submit" 
          className="submit-modal__btn" 
          data-pointer="hover"
          onMouseEnter={() => scrambleRef.current && scrambleRef.current.scramble()}
          >
            <ScrambleText ref={scrambleRef} text="Send application" />
          </button>
        </form>
        {toast && <Toast message="Application sent!" onClose={() => setToast(false)} />}
      </div>
    </div>
  );
};

export default SubmitModal; 