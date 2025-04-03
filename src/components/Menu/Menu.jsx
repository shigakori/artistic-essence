"use client"
import React, { useEffect, useRef, useState} from 'react';
import "./Menu.css";
import { usePathname } from "next/navigation";

import Link from "next/link";

import {gsap} from 'gsap'

const Menu = () => {
    const pathname = usePathname();


    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [shouldDelayClose, setShouldDelayClose] = useState(false)
    const [windowWidth, setWindowWidth] = useState(0)

    const scrollPositionRef = useRef(0)
    const previousPathRef = useRef(pathname)
    const menuAnimation = useRef();
    const menuBarAnimation = useRef();
    const menuLinksAnimation = useRef()

    const lastScrollY = useRef(0)

    const menuContainer = useRef()
    const menuBarRef = useRef()

    const menuLinks = [
        { path: '/', label: 'Home' },
        { path: '/about', label: 'About' },
        { path: '/reviews', label: 'reviews' },
        { path: '/new', label: 'New' },
    ];


    const toggleBodyScroll = (disableScroll) => {
        if(disableScroll){
            scrollPositionRef.current = window.pageYOffset;
            document.body.style.overflow = 'hidden';
            document.body.style.position = 'fixed';
            document.body.style.top = `-${scrollPositionRef.current}px`;
            document.body.style.width = `100%`;
        } else {
            document.body.style.removeProperty('overflow');
            document.body.style.removeProperty('position');
            document.body.style.removeProperty('top');
            document.body.style.removeProperty('width');
            window.scrollTo(0, scrollPositionRef.current);
        }
    }

    const toggleMenu = () => {
        document.querySelector('.hamburger-icon').classList.toggle('active');
        const newMenuState = !isMenuOpen
        setIsMenuOpen(newMenuState);
        toggleBodyScroll(newMenuState);
    }

    const closeMenu = () => {
        if(isMenuOpen){
            document.querySelector('.hamburger-icon').classList.toggle('active');
            setIsMenuOpen(false)
            toggleBodyScroll(false)
        }
    }

    const handleLinkClick = (path) => {
        if(path !== pathname){
            setShouldDelayClose(true);
        }
    }

    useEffect(() => {
        if(pathname !== previousPathRef.current && shouldDelayClose){
            const timer = setTimeout(() => {
                closeMenu()
                setShouldDelayClose(false)
            }, 700)

            previousPathRef.current = pathname;
            return () => clearTimeout(timer)
        }
    }, [pathname], shouldDelayClose);

    useEffect(() => {
        if (typeof window !== "undefined") {
            setWindowWidth(window.innerWidth);

            const handleResize = () => setWindowWidth(window.innerWidth);
            window.addEventListener("resize", handleResize);

            return () => window.removeEventListener("resize", handleResize);
        }
    }, [])

    useEffect(() => {
        gsap.set('.menu-link-item-holder', { y: 125 })

        menuAnimation.current = gsap.timeline({paused: true}).to('.menu', {
            duration: 1,
            clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
            ease: 'power4.inOut',
        })

        const createMenuBarAnimation = () => {
            if(menuBarAnimation.current){
                menuBarAnimation.current.kill()
            }

            const heightValue = windowWidth < 1000 ? 'calc(100% - 2.5em)' : 'calc(100% - 4em)'

            menuBarAnimation.current = gsap
                .timeline({paused: true})
                .to('.menu-bar', {
                    duration: 1,
                    height: heightValue,
                    ease: 'power4.inOut',
                })
        }

        createMenuBarAnimation()

        menuLinksAnimation.current = gsap
            .timeline({paused: true})
            .to('.menu-link-item-holder', {
                y: 0,
                duration: 1.25,
                stagger: .075,
                ease: 'power3.inOut',
                delay: .125,
            })
    }, [windowWidth]);

    useEffect(() => {
        if(isMenuOpen){
            menuAnimation.current.play()
            menuLinksAnimation.current.play()
            menuBarAnimation.current.play()
        } else {
            menuAnimation.current.reverse()
            menuLinksAnimation.current.reverse()
            menuBarAnimation.current.reverse()
        }
    }, [isMenuOpen])

    useEffect(() => {
        const handleScroll = () => {
            if(isMenuOpen) return;

            const currentScrollY = window.scrollY;

            if(currentScrollY > lastScrollY.current){
                gsap.to('.menu-bar', {
                    y: -200,
                    duration: 1,
                    ease: 'power2.out',
                })
            } else {
                gsap.to('.menu-bar', {
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

        return (
            <div className={'menu-container'} ref={menuContainer}>
                <div className={'menu-bar'} ref={menuBarRef}>
                    <div className={'menu-bar-container'}>
                        <div className={'menu-logo'} onClick={closeMenu}>
                            <Link href="/">
                                <h4>Horizon</h4>
                            </Link>
                        </div>
                        <div className={'menu-actions'}>
                            <div className={'menu-toggle'}>
                                <button className={'hamburger-icon'} onClick={toggleMenu}></button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={'menu'}>
                    <div className={'menu-col'}>
                        <div className={'menu-sub-col'}>
                            <div className={'menu-links'}>
                                {menuLinks.map((link, index) => (
                                    <div key={index} className={'menu-link-item-holder'}>
                                        <Link
                                            className={'menu-link'}
                                            href='#'
                                            onClick={() => handleLinkClick(link.path)}
                                        >
                                            {link.label}
                                        </Link>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
}

export default Menu;