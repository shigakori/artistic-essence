"use client"

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import './Beauty.css';
import ParallaxImg from '../ParallaxImg/ParallaxImg';

const Beauty = () => {
    const sectionRef = useRef(null);
    const img2Ref = useRef(null);
    const img2ImgRef = useRef(null);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        const stickySection = sectionRef.current;
        const totalStickyHeight = window.innerHeight * 2;

        ScrollTrigger.create({
            trigger: stickySection,
            start: 'top top',
            end: () => `+=${totalStickyHeight}`,
            pin: true,
            pinSpacing: true,
            anticipatePin: 1,
            fastScrollEnd: true,
            invalidateOnRefresh: true,
            onEnter: () => {
                gsap.set(stickySection, { clearProps: "all" });
            },
            onLeaveBack: () => {
                gsap.set(stickySection, { clearProps: "all" });
            }
        });

        gsap.to(img2ImgRef.current, {
            scale: 1.125,
            ease: "none",
            scrollTrigger: {
                trigger: stickySection,
                start: 'top top',
                end: () => `+=${window.innerHeight}`,
                scrub: true,
            }
        });

        gsap.to(img2Ref.current, {
            clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
            ease: "none",
            scrollTrigger: {
                trigger: stickySection,
                start: 'top top',
                end: () => `+=${window.innerHeight}`,
                scrub: true,
                onUpdate: (self) => {
                    const progress = self.progress;
                    gsap.set(img2Ref.current, {
                        clipPath: `polygon(
                            ${gsap.utils.interpolate(34, 0, progress)}% ${gsap.utils.interpolate(19, 0, progress)}%,
                            ${gsap.utils.interpolate(60 , 100, progress)}% ${gsap.utils.interpolate(28, 0, progress)}%,
                            ${gsap.utils.interpolate(78, 100, progress)}% ${gsap.utils.interpolate(75, 100, progress)}%,
                            ${gsap.utils.interpolate(24, 0, progress)}% ${gsap.utils.interpolate(80, 100, progress)}%
                        )`
                    });
                }
            }
        });

        gsap.to('.big-left', {opacity: 1, x: 0, y: 0, duration: 1, ease: 'power3.out', delay: 0.3});
        gsap.to('.big-right', {opacity: 1, x: 0, y: 0, duration: 1, ease: 'power3.out', delay: 0.6});
        gsap.to('.beauty__desc', {opacity: 1, y: 0, duration: 1, ease: 'power3.out', delay: 0.9});
        gsap.to('.beauty__list', {opacity: 1, y: 0, duration: 1, ease: 'power3.out', delay: 1.2});
        gsap.to('.beauty__list li', {opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', stagger: 0.1, delay: 1.3});
        gsap.to('.beauty__cta', {opacity: 1, x: 0, y: 0, duration: 1, ease: 'power3.out', delay: 1.8});

        return () => {
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        };
    }, []);

    return (
        <section className="container beauty" ref={sectionRef}>
            <div className="beauty__img" ref={img2Ref}>
                <ParallaxImg
                    src="/artistic-essence/work/work-8.jpg"
                    alt="Artistic Essence Gallery Preview"
                    className="beauty__pin-img"
                    scale={1.7}
                />
            </div>
            <div className="beauty__intro">
                <div className="beauty__title big-left">Welcome to Artistic Essence</div>
                <div className="beauty__lead big-right">A digital space where modern art meets inspiration.</div>
                <div className="beauty__desc big-left">Discover unique projects, original works, creative ideas, and an atmosphere of artistry. Explore the world of art, get inspired, and create with us!</div>
                <ul className="beauty__list">
                    <li>— Curated collections from talented artists</li>
                    <li>— Inspiring stories behind every masterpiece</li>
                    <li>— Interactive galleries and creative showcases</li>
                    <li>— Events, workshops, and more</li>
                </ul>
                <div className="beauty__cta big-right">Start your journey into the world of art today!</div>
            </div>
        </section>
    );
};

export default Beauty;