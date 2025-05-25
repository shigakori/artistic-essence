import ParallaxImg from '../ParallaxImg/ParallaxImg';
import styles from './FavoriteTools.module.css';
import tools from '@/data/tools';
import React, { useRef } from 'react';
import { gsap } from 'gsap';

export default function FavoriteTools() {
  const cardRefs = useRef([]);
  const titleRefs = useRef([]);
  const subtitleRefs = useRef([]);
  const overlayRefs = useRef([]);
  const imgRefs = useRef([]);

  const handleMouseEnter = idx => {
    const ctx = gsap.context(() => {
      gsap.to(titleRefs.current[idx], {
        x: '-60%',
        opacity: 0,
        duration: 0.55,
        ease: 'power3.inOut',
      });
      gsap.to(subtitleRefs.current[idx], {
        x: '60%',
        opacity: 0,
        duration: 0.55,
        ease: 'power3.inOut',
      });
      gsap.to(overlayRefs.current[idx], {
        opacity: 0,
        duration: 0.45,
        ease: 'power2.out',
      });
      gsap.to(imgRefs.current[idx], {
        scale: 1.08,
        filter: 'brightness(1.08)',
        duration: 0.6,
        ease: 'power3.inOut',
      });
    }, cardRefs.current[idx]);
    cardRefs.current[idx].__gsapCtx = ctx;
  };

  const handleMouseLeave = idx => {
    const ctx = cardRefs.current[idx].__gsapCtx;
    if (ctx) ctx.revert();
    gsap.to(titleRefs.current[idx], {
      x: '0%',
      opacity: 1,
      duration: 0.5,
      ease: 'power3.inOut',
    });
    gsap.to(subtitleRefs.current[idx], {
      x: '0%',
      opacity: 1,
      duration: 0.5,
      ease: 'power3.inOut',
    });
    gsap.to(overlayRefs.current[idx], {
      opacity: 1,
      duration: 0.4,
      ease: 'power2.out',
    });
    gsap.to(imgRefs.current[idx], {
      scale: 1,
      filter: 'brightness(0.7)',
      duration: 0.6,
      ease: 'power3.inOut',
    });
  };

  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <div className={styles.stack}>art stack</div>
        <h2 className={styles.title}>favorite arts</h2>
        <p className={styles.desc}>
            A collection of selected works, where every touch is filled with meaning and atmosphere.
        </p>
      </div>
      <div className={styles.grid}>
        {tools.map((tool, idx) => (
          <div
            className={styles.card}
            key={tool.title + idx}
            ref={el => (cardRefs.current[idx] = el)}
            onMouseEnter={() => handleMouseEnter(idx)}
            onMouseLeave={() => handleMouseLeave(idx)}
          >
            <div className={styles.imgWrap}>
              <ParallaxImg
                src={tool.image}
                alt={tool.title}
                className={styles.img}
                imgRef={el => (imgRefs.current[idx] = el)}
              />
              <div
                className={styles.overlay}
                ref={el => (overlayRefs.current[idx] = el)}
              />
              <div className={styles.texts}>
                <div
                  className={styles.toolTitle}
                  ref={el => (titleRefs.current[idx] = el)}
                >
                  {tool.title}
                </div>
                <div
                  className={styles.toolSubtitle}
                  ref={el => (subtitleRefs.current[idx] = el)}
                >
                  {tool.subtitle}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
} 