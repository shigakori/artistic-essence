"use client";

import React from 'react';
import styles from './ArtProject.module.css';
import ParallaxImg from '../ParallaxImg/ParallaxImg';
import artProjects from '@/data/art';
import { useAnimatedNavigate } from '@/hooks/useAnimatedNavigate';

const ArtProject = ({ project }) => {
  const animatedNavigate = useAnimatedNavigate();
  const currentSlug = project.slug;
  const allProjects = artProjects;
  const currentIndex = allProjects.findIndex(p => p.slug === currentSlug);
  const nextIndex = (currentIndex + 1) % allProjects.length;
  const nextProject = allProjects[nextIndex];

  const handleNext = () => {
    animatedNavigate(`/projects/${nextProject.slug}`);
  };

  const formatId = idx => String(idx + 1).padStart(2, '0');

  return (
    <section className={styles.estSection}>
      <div className={styles.heroTitleBlock}>
        <p className={styles.heroSubtitle}>artistic essence</p>
        <h1 className={styles.heroTitle}>{project.title}</h1>
      </div>
      <div className={styles.heroImageBlock}>
        <ParallaxImg
          src={project.image}
          alt={project.title}
          className={styles.heroImage}
          scale={1.05}
        />
      </div>
      <div className={styles.estDescWrap}>
        <div className={styles.estSubtitle}>{project.subtitle}</div>
        <div className={styles.estDesc}>{project.description}</div>
        <div className={styles.estInfoRow}>
          <span>{project.year}</span>
          <span>{project.medium}</span>
          <span>{project.dimensions}</span>
        </div>
        {Array.isArray(project.tags) && project.tags.length > 0 && (
          <div className={styles.estTags}>
            {project.tags.map((tag, idx) => (
              <span key={idx} className={styles.estTag}>{tag}</span>
            ))}
          </div>
        )}
        {Array.isArray(project.gallery) && project.gallery.length > 0 && (
          <div className={styles.estGallery}>
            {project.gallery.map((image, index) => (
              <div key={index} className={styles.estGalleryItem}>
                <ParallaxImg
                  src={image}
                  alt={`${project.title} - Gallery ${index + 1}`}
                  className={styles.estGalleryImage}
                  scale={2.1}
                />
              </div>
            ))}
          </div>
        )}
      </div>
      <div className={styles.nextArtPreviewWrap}>
        <div className={styles.nextArtLabel}>
          <span>{formatId(currentIndex)} &nbsp;–&nbsp; {formatId(nextIndex)}</span>
          <span className={styles.nextArtNext}>NEXT</span>
        </div>
        <div
          className={styles.nextArtImageWrap}
          onClick={handleNext}
          tabIndex={0}
          role="button"
          aria-label={`Go to next art: ${nextProject.title}`}
          onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && handleNext()}
          data-pointer="hover"
        >
          <ParallaxImg
            src={nextProject.image}
            alt={nextProject.title}
            className={styles.nextArtImage}
            draggable={false}
            scale={1.4}
          />
          <div className={styles.nextArtTitle}>{nextProject.title}</div>
        </div>
      </div>
    </section>
  );
};

export default ArtProject; 