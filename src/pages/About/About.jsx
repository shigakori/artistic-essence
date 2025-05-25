"use client";

import React from 'react';
import "./About.css";
import Hero from '@/components/Hero/Hero';
import AboutShowcase from '@/components/AboutShowcase/AboutShowcase';
import FavoriteTools from '@/components/FavoriteTools/FavoriteTools';
import Footer from '@/components/Footer/Footer';

const About = () => {
    return (
        <>
            <Hero 
                label="ABOUT"
                title={{
                    first: "Our",
                    emphasis: "Creative",
                    last: "Journey"
                }}
                backgroundImage="/work/work-3.jpg"
            />

            <AboutShowcase />
            <FavoriteTools />

            <Footer />
        </>
    );
};

export default About; 