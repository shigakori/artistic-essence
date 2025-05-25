"use client"; 

import React from 'react';
import './Hero.css';
import ParallaxImg from '../ParallaxImg/ParallaxImg';

const Hero = ({ 
    label = 'HOME',
    title = {
        first: 'The',
        emphasis: 'Art of',
        last: 'Painting'
    },
    backgroundImage = '/work/work-1.jpg'
}) => {
    return (
        <section className="container hero-section" translate="no">
            <div className="hero-section__bg">
                <ParallaxImg src={backgroundImage} alt="Hero background" scale={1.02} />
            </div>
            <div className="hero-section__overlay" />
            <div className="hero-section__content">
                <span className="hero-section__label">{label}</span>
                <h1 className="hero-section__title">
                    <span>{title.first}</span> <em>{title.emphasis}</em> <span>{title.last}</span>
                </h1>
                
            </div>
        </section>
    );
};

export default Hero;