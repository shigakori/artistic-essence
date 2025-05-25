"use client";

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ScrambleText from '../ScrambleText/ScrambleText';
import './Footer.css';
import Link from 'next/link';
import { useAnimatedNavigate } from "@/hooks/useAnimatedNavigate";

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
    const footerRef = useRef(null);
    const waveRef = useRef(null);
    const buttonRef = useRef(null);
    const [showSuccess, setShowSuccess] = useState(false);
    const [email, setEmail] = useState('');
    const animationTimelineRef = useRef(null);
    const scrollTriggerRef = useRef(null);
    const scrambleRefs = useRef({});
    const animatedNavigate = useAnimatedNavigate();

    const setScrambleRef = useCallback((key, element) => {
        if (element) {
            scrambleRefs.current[key] = element;
        }
    }, []);

    const handleScramble = useCallback((key) => {
        const scrambleComponent = scrambleRefs.current[key];
        if (scrambleComponent?.scramble) {
            scrambleComponent.scramble();
        }
    }, []);

    useEffect(() => {
        const waveAnimation = gsap.to(waveRef.current, {
            x: '100%',
            duration: 20,
            repeat: -1,
            ease: 'none',
        });

        const button = buttonRef.current;
        let buttonRect = button.getBoundingClientRect();
        let buttonCenterX = buttonRect.left + buttonRect.width / 2;
        let buttonCenterY = buttonRect.top + buttonRect.height / 2;

        const updateButtonPosition = () => {
            buttonRect = button.getBoundingClientRect();
            buttonCenterX = buttonRect.left + buttonRect.width / 2;
            buttonCenterY = buttonRect.top + buttonRect.height / 2;
        };

        const handleMouseMove = (e) => {
            const mouseX = e.clientX;
            const mouseY = e.clientY;
            
            const deltaX = mouseX - buttonCenterX;
            const deltaY = mouseY - buttonCenterY;
            
            const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
            const maxDistance = 150;
            
            if (distance < maxDistance) {
                const angle = Math.atan2(deltaY, deltaX);
                const force = (maxDistance - distance) / maxDistance;
                const moveX = Math.cos(angle) * force * 30;
                const moveY = Math.sin(angle) * force * 30;
                
                gsap.to(button, {
                    x: moveX,
                    y: moveY,
                    scale: 1.1,
                    duration: 0.4,
                    ease: 'power2.out'
                });
            } else {
                gsap.to(button, {
                    x: 0,
                    y: 0,
                    scale: 1,
                    duration: 0.4,
                    ease: 'power2.out'
                });
            }
        };

        const handleMouseLeave = () => {
            gsap.to(button, {
                x: 0,
                y: 0,
                scale: 1,
                duration: 0.4,
                ease: 'elastic.out(1, 0.5)'
            });
        };

        window.addEventListener('resize', updateButtonPosition);
        button.addEventListener('mousemove', handleMouseMove);
        button.addEventListener('mouseleave', handleMouseLeave);

        const tl = gsap.timeline();
        tl.to('.footer__section h3', {
            y: 0,
            opacity: 1,
            duration: 0.3,
            stagger: 0.04,
            ease: 'power2.out',
        });
        tl.to('.footer__social-link', {
            x: 0,
            opacity: 1,
            duration: 0.3,
            stagger: 0.04,
            ease: 'power2.out',
        }, '-=0.2');
        tl.to('.footer__nav-link', {
            y: 0,
            opacity: 1,
            duration: 0.3,
            stagger: 0.04,
            ease: 'power2.out',
        }, '-=0.2');
        tl.to('.footer__newsletter-form input, .footer__newsletter-form button', {
            y: 0,
            opacity: 1,
            duration: 0.3,
            stagger: 0.04,
            ease: 'power2.out',
        }, '-=0.2');
        tl.to('.footer__bottom', {
            y: 0,
            opacity: 1,
            duration: 0.3,
            ease: 'power2.out',
        }, '-=0.2');

        animationTimelineRef.current = tl;

        return () => {
            if (animationTimelineRef.current) {
                animationTimelineRef.current.kill();
            }
            
            if (scrollTriggerRef.current) {
                scrollTriggerRef.current.kill();
            }
            
            if (waveAnimation) {
                waveAnimation.kill();
            }
            
            const elements = [
                footerRef.current,
                ...Array.from(document.querySelectorAll('.footer__section h3, .footer__social-link, .footer__nav-link, .footer__newsletter-form input, .footer__newsletter-form button, .footer__bottom'))
            ].filter(Boolean);

            if (elements.length > 0) {
                gsap.killTweensOf(elements);
                gsap.set(elements, { 
                    clearProps: 'all',
                    opacity: 1,
                    visibility: 'visible'
                });
            }
            
            if (buttonRef.current) {
                gsap.killTweensOf(buttonRef.current);
            }
            
            window.removeEventListener('resize', updateButtonPosition);
            if (buttonRef.current) {
                buttonRef.current.removeEventListener('mousemove', handleMouseMove);
                buttonRef.current.removeEventListener('mouseleave', handleMouseLeave);
            }
        };
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setShowSuccess(true);
            setTimeout(() => {
                setShowSuccess(false);
            }, 3000);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <footer className="footer" ref={footerRef}>
            <div className="footer__wave" ref={waveRef}></div>
            
            <div className="footer__content">
                <div className="footer__section">
                    <h3>C o n t a c t s</h3>
                    <div className="footer__social-links">
                        <a href="#" className="footer__social-link" onClick={e => { e.preventDefault(); animatedNavigate('/'); }} onMouseEnter={() => handleScramble('instagram')} data-pointer="hover">
                            <ScrambleText 
                                ref={el => setScrambleRef('instagram', el)} 
                                text="Instagram" 
                                className="footer__link-text"
                                data-scramble-key="instagram"
                            />
                        </a>
                        <a href="#" className="footer__social-link" onClick={e => { e.preventDefault(); animatedNavigate('/'); }} onMouseEnter={() => handleScramble('twitter')} data-pointer="hover">
                            <ScrambleText 
                                ref={el => scrambleRefs.current['twitter'] = el} 
                                text="Twitter" 
                                className="footer__link-text"
                            />
                        </a>
                        <a href="#" className="footer__social-link" onClick={e => { e.preventDefault(); animatedNavigate('/'); }} onMouseEnter={() => handleScramble('linkedin')} data-pointer="hover">
                            <ScrambleText 
                                ref={el => scrambleRefs.current['linkedin'] = el} 
                                text="LinkedIn" 
                                className="footer__link-text"
                            />
                        </a>
                    </div>
                </div>

                <div className="footer__section">
                    <h3>N a v i g a t i o n</h3>
                    <div className="footer__nav-links">
                        <Link href="/" className="footer__nav-link" data-pointer="hover" onClick={e => { e.preventDefault(); animatedNavigate('/'); }} onMouseEnter={() => handleScramble('home')}>
                            <ScrambleText 
                                ref={el => scrambleRefs.current['home'] = el} 
                                text="Home" 
                                className="footer__link-text"
                            />
                        </Link>
                        <Link href="/about" className="footer__nav-link" data-pointer="hover" onClick={e => { e.preventDefault(); animatedNavigate('/about'); }} onMouseEnter={() => handleScramble('about')}>
                            <ScrambleText 
                                ref={el => scrambleRefs.current['about'] = el} 
                                text="About" 
                                className="footer__link-text"
                            />
                        </Link>
                        <Link href="/projects" className="footer__nav-link" data-pointer="hover" onClick={e => { e.preventDefault(); animatedNavigate('/projects'); }} onMouseEnter={() => handleScramble('projects')}>
                            <ScrambleText 
                                ref={el => scrambleRefs.current['projects'] = el} 
                                text="Projects" 
                                className="footer__link-text"
                            />
                        </Link>
                        <Link href="/contacts" className="footer__nav-link" data-pointer="hover" onClick={e => { e.preventDefault(); animatedNavigate('/contacts'); }} onMouseEnter={() => handleScramble('contacts')}>
                            <ScrambleText 
                                ref={el => scrambleRefs.current['contacts'] = el} 
                                text="Contacts" 
                                className="footer__link-text"
                            />
                        </Link>
                    </div>
                </div>

                <div className="footer__section">
                    <h3>N e w s l e t t e r</h3>
                    <form className="footer__newsletter-form" onSubmit={handleSubmit}>
                        <input
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <button type="submit" ref={buttonRef} data-pointer="hover" onMouseEnter={() => handleScramble('subscribe')}>
                            <ScrambleText 
                                ref={el => scrambleRefs.current['subscribe'] = el} 
                                text="Subscribe" 
                                className="footer__link-text-subscribe"
                            />
                        </button>
                    </form>
                </div>
            </div>

            <div className="footer__bottom">
                <h1>ARTISTIC ESSENCE</h1>
                <p>© 2025 All rights reserved</p>
            </div>

            {showSuccess && (
                <div className="success-message">
                    Спасибо за подписку!
                </div>
            )}
        </footer>
    );
};

export default Footer; 