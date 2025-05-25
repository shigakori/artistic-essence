import React, { useRef } from 'react';
import styles from './ContactForm.module.css';
import ScrambleText from '../ScrambleText/ScrambleText';

const ContactForm = () => {
  const scrambleRef1 = useRef(null);
  const scrambleRef2 = useRef(null);

  const handleMouseEnter = () => {
    scrambleRef1.current && scrambleRef1.current.scramble();
    scrambleRef2.current && scrambleRef2.current.scramble();
  };



  return (
    <section className={styles.container}>
      <div className={styles.left + ' container'}>
        <div className={styles.topText}>LET'S CREATE TOGETHER</div>
        <h1 className={styles.title}>START A CONVERSATION</h1>
        <div className={styles.desc}>
          Have a story in mind? Let's bring it to life. We'd love to hear what you're working on and explore how we can collaborate.
        </div>
        <div className={styles.bottomRow}>
          <span>DO NOT BE SHY</span>
          <span>CLIENTS WORLDWIDE</span>
        </div>
      </div>
      <form className={styles.right + ' container'}>
        <input type="text" placeholder="Name" className={styles.input} />
        <input type="email" placeholder="Email" className={styles.input} />
        <textarea placeholder="Message" className={styles.textarea} rows={5} />
        <button
          type="submit"
          className={styles.button}
          onMouseEnter={handleMouseEnter}
          data-pointer="hover"
        >
          <ScrambleText ref={scrambleRef1} text="SEND MESSAGE" className={styles['button-text']} />
          <ScrambleText ref={scrambleRef2} text="SEND MESSAGE" className={styles['button-text--clone']} />
        </button>
      </form>
    </section>
  );
};

export default ContactForm; 