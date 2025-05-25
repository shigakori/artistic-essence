"use client";

import React from 'react';
import "./Home.css";

import {gsap} from 'gsap'
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Hero from '@/components/Hero/Hero';
import Beauty from '@/components/Beauty/Beauty';
import Works from '@/components/Works/Works';
import CtaBanner from '@/components/CtaBanner/CtaBanner';
import FavoriteTools from '@/components/FavoriteTools/FavoriteTools';

gsap.registerPlugin(ScrollTrigger);

const Home = () => {
    return (
        <>
            <Hero 
                label="HOME"
                title={{
                    first: "The",
                    emphasis: "Art of",
                    last: "Painting"
                }}
                backgroundImage="/artistic-essence/work/work-5.jpg"
            />
            <Beauty />
            <Works />
            <FavoriteTools />
            <CtaBanner />
        </>
    );
};

export default Home;