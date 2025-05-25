import React, { useState, useRef } from 'react';
import './CtaBanner.css';
import SubmitModal from '../SubmitModal/SubmitModal';
import ScrambleText from '../ScrambleText/ScrambleText';

const CtaBanner = () => {
  const [open, setOpen] = useState(false);
  const scrambleRef = useRef(null);

  return (
    <section className="container cta-banner">
      <div className="cta-banner__bg" />
      <div className="cta-banner__row">
        <h2 className="cta-banner__title">Become a part of Artistic Essence</h2>
        <p className="cta-banner__desc">Show your talent to the world. Submit your work and join our creative community!</p>
        <button
          className="cta-banner__btn"
          onClick={() => setOpen(true)}
          data-pointer="hover"
          onMouseEnter={() => scrambleRef.current && scrambleRef.current.scramble()}
        >
          <ScrambleText ref={scrambleRef} text="Submit your work" />
        </button>
      </div>
      {open && <SubmitModal onClose={() => setOpen(false)} />}
    </section>
  );
};

export default CtaBanner; 