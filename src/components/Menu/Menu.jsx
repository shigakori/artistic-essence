"use client"
import React, { useEffect, useRef, useState} from 'react';
import "./Menu.css";
import { usePathname } from "next/navigation";
import Link from "next/link";
import {gsap} from 'gsap';
import ScrambleText from '../ScrambleText/ScrambleText';
import MenuParallaxImage from './MenuParallaxImage';
import { usePageTransition } from "@/components/PageTransition/PageTransition";
import { useAnimatedNavigate } from "@/hooks/useAnimatedNavigate";

const Menu = () => {
    const pathname = usePathname();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [windowWidth, setWindowWidth] = useState(0);
    const { phase } = usePageTransition();

    const previousPathRef = useRef(pathname);
    const menuAnimation = useRef();
    const menuBarAnimation = useRef();
    const menuLinksAnimation = useRef();
    const lastScrollY = useRef(0);
    const menuContainer = useRef();
    const menuBarRef = useRef();
    const scrambleRefs = useRef({});
    const animatedNavigate = useAnimatedNavigate(setIsMenuOpen);
    const prevPhase = useRef('idle');

    const menuLinks = [
        { path: '/', label: 'Home' },
        { path: '/about', label: 'About' },
        { path: '/projects', label: 'projects' },
        { path: '/contacts', label: 'contacts' },
    ];

    const toggleBodyScroll = (disableScroll) => {
        if(disableScroll){
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.removeProperty('overflow');
        }
    }

    const toggleMenu = () => {
        const hamburger = document.querySelector('.menu__hamburger');
        if (hamburger) {
            hamburger.classList.toggle('menu__hamburger--active');
        }
        const newMenuState = !isMenuOpen;
        setIsMenuOpen(newMenuState);
        toggleBodyScroll(newMenuState);
    }

    const closeMenu = () => {
        if(isMenuOpen){
            const hamburger = document.querySelector('.menu__hamburger');
            if (hamburger) {
                hamburger.classList.remove('menu__hamburger--active');
            }
            setIsMenuOpen(false);
            toggleBodyScroll(false);

            menuAnimation.current.reverse();
            menuBarAnimation.current.reverse();
            menuLinksAnimation.current.reverse();
            
            gsap.to('.menu__social-link', {
                y: 60,
                opacity: 0,
                duration: 0.6,
                stagger: 0.05,
                ease: 'power2.in'
            });
        }
    }

    const handleLinkClick = (path) => {
        if(path !== pathname && phase === 'idle'){
            animatedNavigate(path);
        }
    };

    useEffect(() => {
        if (
            (previousPathRef.current !== pathname && phase === 'idle') ||
            (prevPhase.current === 'opening' && phase === 'idle')
        ) {
            previousPathRef.current = pathname;
            if (isMenuOpen) {
                setIsMenuOpen(false);
                toggleBodyScroll(false);
            }
        }
        prevPhase.current = phase;
    }, [pathname, phase]);

    useEffect(() => {
        if (typeof window !== "undefined") {
            setWindowWidth(window.innerWidth);
            const handleResize = () => setWindowWidth(window.innerWidth);
            window.addEventListener("resize", handleResize);
            return () => window.removeEventListener("resize", handleResize);
        }
    }, []);

    useEffect(() => {
        gsap.set('.menu__link-item-holder', { y: 125 });

        menuAnimation.current = gsap.timeline({paused: true}).to('.menu__content', {
            duration: 1,
            clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
            ease: 'power4.inOut',
        });

        const createMenuBarAnimation = () => {
            if(menuBarAnimation.current){
                menuBarAnimation.current.kill();
            }

            const heightValue = windowWidth < 1000 ? 'calc(100% - 2.5em)' : 'calc(100% - 2em)';

            menuBarAnimation.current = gsap
                .timeline({paused: true})
                .to('.menu__bar', {
                    duration: 1,
                    height: heightValue,
                    ease: 'power4.inOut',
                });
        };

        createMenuBarAnimation();

        menuLinksAnimation.current = gsap
            .timeline({paused: true})
            .to('.menu__link-item-holder', {
                y: 0,
                duration: 1.25,
                stagger: .075,
                ease: 'power3.inOut',
                delay: .125,
            });

        return () => {
            if (menuAnimation.current) menuAnimation.current.kill();
            if (menuBarAnimation.current) menuBarAnimation.current.kill();
            if (menuLinksAnimation.current) menuLinksAnimation.current.kill();
        };
    }, [windowWidth]);

    useEffect(() => {
        if (isMenuOpen) {
            menuAnimation.current.play();
            menuBarAnimation.current.play();
            menuLinksAnimation.current.play();
        } else {
            menuAnimation.current.reverse();
            menuBarAnimation.current.reverse();
            menuLinksAnimation.current.reverse();
        }
    }, [isMenuOpen]);

    useEffect(() => {
        const handleScroll = () => {
            if(isMenuOpen) return;

            const currentScrollY = window.scrollY;

            if(currentScrollY > lastScrollY.current){
                gsap.to('.menu__bar', {
                    y: -200,
                    duration: 1,
                    ease: 'power2.out',
                })
            } else {
                gsap.to('.menu__bar', {
                    y: 0,
                    duration: 1,
                    ease: 'power2.out',
                })
            }
            lastScrollY.current = currentScrollY
        }

        window.addEventListener('scroll', handleScroll)

        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [isMenuOpen])

    useEffect(() => {
        return () => {
            if(document.body.style.position === 'fixed'){
                toggleBodyScroll(false)
            }
        }
    }, [])

    useEffect(() => {
        if (typeof window !== "undefined") {
            gsap.set('.menu__social-link', { y: 60, opacity: 0 });
            gsap.set('.menu__parallax-image-img', { 
                clipPath: 'polygon(0 100%, 100% 100%, 100% 100%, 0% 100%)'
            });
            gsap.set('.menu__link', { 
                clipPath: 'polygon(0 100%, 100% 100%, 100% 100%, 0% 100%)'
            });
        }
    }, []);

    useEffect(() => {
        if (isMenuOpen) {
            gsap.to('.menu__social-link', {
                y: 0,
                opacity: 1,
                duration: 1.1,
                stagger: 0.08,
                ease: 'power3.inOut',
                delay: 0.4,
            });

            gsap.to('.menu__parallax-image-img', {
                clipPath: 'polygon(0 0%, 100% 0%, 100% 100%, 0% 100%)',
                duration: 2.7,
                ease: 'power4.inOut',
                delay: 0
            });

            gsap.to('.menu__link', {
                clipPath: 'polygon(0 0%, 100% 0%, 100% 100%, 0% 100%)',
                duration: 1.4,
                stagger: 0.1,
                ease: 'power4.inOut',
                delay: 0.2
            });
        } else {
            gsap.to('.menu__social-link', {
                y: 60,
                opacity: 0,
                duration: 0.6,
                stagger: 0.05,
                ease: 'power2.in',
            });

            gsap.to('.menu__parallax-image-img', {
                clipPath: 'polygon(0 100%, 100% 100%, 100% 100%, 0% 100%)',
                duration: .9,
                ease: 'power2.inOut'
            });

            gsap.to('.menu__link', {
                clipPath: 'polygon(0 100%, 100% 100%, 100% 100%, 0% 100%)',
                duration: 0.7,
                stagger: 0.05,
                ease: 'power2.inOut'
            });
        }
    }, [isMenuOpen]);

    useEffect(() => {
        const menu = document.querySelector('.menu__content');
        const image = document.querySelector('.menu__parallax-image-img');
        
        if (!menu || !image) return;

        const handleMouseMove = (e) => {
            if (!isMenuOpen) return;

            const menuBounds = menu.getBoundingClientRect();
            const mouseX = (e.clientX - menuBounds.left) / menuBounds.width;
            const mouseY = (e.clientY - menuBounds.top) / menuBounds.height;

            gsap.to(image, {
                x: (mouseX - 0.5) * -40,
                y: (mouseY - 0.5) * -40,
                rotation: (mouseX - 0.5) * -7,
                duration: 1,
                ease: "power2.out"
            });
        };

        const handleMouseLeave = () => {
            gsap.to(image, {
                x: 0,
                y: 0,
                rotation: 0,
                duration: 1,
                ease: "power2.out"
            });
        };

        menu.addEventListener('mousemove', handleMouseMove);
        menu.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            menu.removeEventListener('mousemove', handleMouseMove);
            menu.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, [isMenuOpen]);

    const handleMenuLinkHover = (index) => {
        if (scrambleRefs.current[index]) {
            scrambleRefs.current[index].scramble();
        }
    };

    const handleMenuLinkLeave = (index) => {
        if (scrambleRefs.current[index]) {
            scrambleRefs.current[index].reset();
        }
    };

    const handleSocialLinkHover = (index) => {
        if (scrambleRefs.current[index]) {
            scrambleRefs.current[index].scramble();
        }
    };

    const handleSocialLinkLeave = (index) => {
        if (scrambleRefs.current[index]) {
            scrambleRefs.current[index].reset();
        }
    };

    return (
        <div className={`container menu ${isMenuOpen ? 'menu--open' : ''}`} ref={menuContainer} style={phase !== 'idle' ? { pointerEvents: 'none', overflow: 'hidden', userSelect: 'none' } : {}}>
            <div className="menu__bar container" ref={menuBarRef}>
                <div className="menu__bar-container">
                    <div className="menu__logo" onClick={closeMenu}>
                        <Link href="/">
                            <h4>Artistic Essence</h4>
                        </Link>
                    </div>
                    <div className="menu__actions">
                        <div className="menu__toggle">
                            <button className="menu__hamburger" onClick={toggleMenu} data-pointer="hover"></button>
                        </div>
                    </div>
                </div>
            </div>
            <div className={`menu__content ${isMenuOpen ? 'menu__content--open' : ''}`}>
                <div className="menu__col">
                    <div className="menu__sub-col">
                        <div className="menu__links">
                            {menuLinks.map((link, index) => (
                                <div
                                    key={index}
                                    className="menu__link-item-holder"
                                    data-pointer="hover"
                                    onMouseEnter={() => handleMenuLinkHover(`link-${index}`)}
                                    onMouseLeave={() => handleMenuLinkLeave(`link-${index}`)}
                                >
                                    <Link
                                        className="menu__link menu__main-link"
                                        href={link.path}
                                        onClick={() => handleLinkClick(link.path)}
                                    >
                                        <ScrambleText 
                                            ref={el => scrambleRefs.current[`link-${index}`] = el}
                                            text={link.label} 
                                            className="menu__link-text" 
                                        />
                                    </Link>
                                </div>
                            ))}
                        </div>

                        <div className="menu__socials">
                            <div className="menu__social-item" data-pointer="hover">
                                <ul className="menu__socials-list">
                                    {[
                                        { href: 'https://www.instagram.com/', text: 'instagram' },
                                        { href: 'https://www.x.com/', text: 'twitter' },
                                        { href: 'https://www.linkedin.com/', text: 'linkedin' }
                                    ].map((social, index) => (
                                        <li key={index}>
                                            <a 
                                                className="menu__social-link" 
                                                href={social.href} 
                                                data-pointer="hover"
                                                onMouseEnter={() => handleSocialLinkHover(`social-${index}`)}
                                                onMouseLeave={() => handleSocialLinkLeave(`social-${index}`)}
                                            >
                                                <ScrambleText 
                                                    ref={el => scrambleRefs.current[`social-${index}`] = el}
                                                    text={social.text} 
                                                    className="menu__social-link-text" 
                                                />
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                    <MenuParallaxImage />
                </div>
            </div>
        </div>
    );
};

export default Menu;