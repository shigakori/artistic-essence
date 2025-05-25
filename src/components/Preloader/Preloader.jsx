"use client";

import React, { useEffect, useState, useRef } from 'react';
import './Preloader.css';
import '../Hero/Hero.css';
import CustomCursor from '../CustomCursor/CustomCursor';
import ScrambleText from '../ScrambleText/ScrambleText';

const DOTS_COUNT = 20;

const Preloader = ({ onFinish, slow }) => {
  const [progress, setProgress] = useState(0);
  const [showEnter, setShowEnter] = useState(false);
  const scrambleRef1 = useRef(null);
  const scrambleRef2 = useRef(null);

  useEffect(() => {
    if (progress < 100) {
      const timeout = setTimeout(() => {
        setProgress(prev => Math.min(prev + Math.random() * (slow ? 2.5 : 7) + (slow ? 0.2 : 1), 100));
      }, slow ? 60 : 40);
      return () => clearTimeout(timeout);
    } else {
      setTimeout(() => setShowEnter(true), 600);
    }
  }, [progress, slow]);

  const handleEnter = () => {
    if (onFinish) onFinish();
  };

  const filledDots = Math.round((progress / 100) * DOTS_COUNT);

  return (
    <div className="preloader">
      <CustomCursor />
      <div className="preloader__center">
        <div className="preloader__dots">
          {Array.from({ length: DOTS_COUNT }).map((_, i) => (
            <span
              key={i}
              className={`preloader__dot${i < filledDots ? ' preloader__dot--filled' : ''}`}
            />
          ))}
        </div>
        {showEnter && (
          <button 
            className="hero-section__btn preloader__enter-btn" 
            onClick={handleEnter}
            data-pointer="hover"
            onMouseEnter={() => {
              scrambleRef1.current && scrambleRef1.current.scramble();
              scrambleRef2.current && scrambleRef2.current.scramble();
            }}
            
          >
            <ScrambleText ref={scrambleRef1} className="hero-section__btn-text" text="ENTER" data-value="ENTER" />
            <ScrambleText ref={scrambleRef2} className="hero-section__btn-text hero-section__btn-text--clone" text="ENTER" data-value="ENTER" />
          </button>
        )}
      </div>
      <div className="preloader__progress">
        {Math.floor(progress)}%
      </div>
    </div>
  );
};

export default Preloader; 