'use client'

import './Works.css';
import works from '@/data/works';
import React, { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Link from 'next/link';
import { usePageTransition } from '@/components/PageTransition/PageTransition';

gsap.registerPlugin(ScrollTrigger);

export default function Works() {
    const { startClosing } = usePageTransition();
    const slideImages = useRef(null);
    const titleElement = useRef(null);
    const exploreLink = useRef(null);
    const [isMobile, setIsMobile] = useState(false);
    let firstSlideDOMElement = null;

    useEffect(() => {
        const checkMobile = () => {
            return window.innerWidth <= 768;
        };
        
        setIsMobile(checkMobile());
        
        const handleResize = () => {
            setIsMobile(checkMobile());
        };
        
        window.addEventListener('resize', handleResize);
        
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    useEffect(() => {
        try {
            if (!slideImages.current) return;

            const totalWorks = works.length;
            const stripsCount = isMobile ? 8 : 16;
            let currentTitleIndex = 0;
            let queuedTitleIndex = null;
            const titleChangeThreshold = 0.5;
            let isAnimating = false;
            
            slideImages.current.innerHTML = "";

            if (totalWorks > 0) {
                const imgContainer = document.createElement('div');
                imgContainer.className = 'img';
                imgContainer.id = 'img-1';

                const img = document.createElement('img');
                img.src = works[0].image;
                img.alt = works[0].title;
                img.loading = 'lazy';
                img.style.transform = "scale(1.25)";

                imgContainer.appendChild(img);
                slideImages.current.appendChild(imgContainer);
                firstSlideDOMElement = img;
            }

            for (let i = 1; i < totalWorks; i++) {
                const imgContainer = document.createElement('div');
                imgContainer.className = 'img-container';
                imgContainer.id = `img-container-${i + 1}`;
                imgContainer.style.opacity = '0';

                for (let j = 0; j < stripsCount; j++) {
                    const strip = document.createElement('div');
                    strip.className = 'strip';

                    const img = document.createElement('img');
                    img.src = works[i].image;
                    img.alt = works[i].title;
                    img.style.transform = 'scale(1.25)';
                    img.loading = 'lazy';

                    const stripPositionFromBottom = stripsCount - j - 1;
                    const stripLowerBound = (stripPositionFromBottom + 1) * (100 / stripsCount);
                    const stripUpperBound = stripPositionFromBottom * (100 / stripsCount);

                    strip.style.clipPath = `polygon(0% ${stripLowerBound}%, 100% ${stripLowerBound}%, 100% ${stripUpperBound - .1}%, 0% ${stripUpperBound - .1}%)`;

                    strip.appendChild(img);
                    imgContainer.appendChild(strip);
                }
                slideImages.current.appendChild(imgContainer);
            }

            const transitionCount = totalWorks - 1;
            const scrollDistancePerTransition = 600;
            const initialScrollDelay = 150;
            const finalScrollDelay = 150;

            const totalScrollDistance = transitionCount * scrollDistancePerTransition + initialScrollDelay + finalScrollDelay;

            const transitionRanges = [];
            let currentScrollPosition = initialScrollDelay;

            for (let i = 0; i < transitionCount; i++) {
                const transitionStart = currentScrollPosition;
                const transitionEnd = transitionStart + scrollDistancePerTransition;

                transitionRanges.push({
                    transition: 1,
                    startVh: transitionStart,
                    endVh: transitionEnd,
                    startPercent: transitionStart / totalScrollDistance,
                    endPercent: transitionEnd / totalScrollDistance,
                });

                currentScrollPosition = transitionEnd;
            }

            function calculateImageProgress(scrollProgress) {
                if (typeof scrollProgress !== 'number') return 0;
                
                let imageProgress = 0;

                if (scrollProgress < transitionRanges[0]?.startPercent) {
                    return 0;
                }

                if (scrollProgress > transitionRanges[transitionRanges.length - 1]?.endPercent) {
                    return transitionRanges.length;
                }

                for (let i = 0; i < transitionRanges.length; i++) {
                    const range = transitionRanges[i];
                    if (!range) continue;

                    if (scrollProgress >= range.startPercent && scrollProgress <= range.endPercent) {
                        const rangeSize = range.endPercent - range.startPercent;
                        const normalizeProgress = (scrollProgress - range.startPercent) / rangeSize;
                        imageProgress = i + normalizeProgress;
                        break;
                    } else if (scrollProgress > range.endPercent) {
                        imageProgress = i + 1;
                    }
                }

                return imageProgress;
            }

            function getScaleForImage(imageIndex, currentImageIndex, progress) {
                if (typeof imageIndex !== 'number' || typeof currentImageIndex !== 'number' || typeof progress !== 'number') {
                    return 1.25;
                }

                if (imageIndex > currentImageIndex) return 1.25;
                if (imageIndex < currentImageIndex - 1) return 1;

                let totalProgress = imageIndex === currentImageIndex ? progress : 1 + progress;
                return 1.25 - (.25 * totalProgress) / 2;
            }

            function animateTitleChange(index, direction) {
                if (typeof index !== 'number' || index === currentTitleIndex) return;
                if (index < 0 || index >= works.length) return;
                if (isAnimating) {
                    queuedTitleIndex = index;
                    return;
                }

                isAnimating = true;
                const newTitle = works[index].title;
                const newUrl = works[index].url;
                const outY = direction === 'down' ? '-120%' : '120%';
                const inY = direction === 'down' ? '120%' : '-120%';

                if (titleElement.current) {
                    gsap.killTweensOf(titleElement.current);
                }

                if (exploreLink.current) {
                    exploreLink.current.href = newUrl;
                }

                if (titleElement.current) {
                    gsap.to(titleElement.current, {
                        y: outY,
                        duration: .5,
                        ease: 'power3.out',
                        onComplete: () => {
                            if (titleElement.current) {
                                titleElement.current.textContent = newTitle;
                                gsap.set(titleElement.current, { y: inY });

                                gsap.to(titleElement.current, {
                                    y: '0%',
                                    duration: .5,
                                    ease: 'power3.inOut',
                                    onComplete: () => {
                                        currentTitleIndex = index;
                                        isAnimating = false;

                                        if (queuedTitleIndex !== null && queuedTitleIndex !== currentTitleIndex) {
                                            const nextIndex = queuedTitleIndex;
                                            queuedTitleIndex = null;
                                            animateTitleChange(nextIndex, direction);
                                        }
                                    }
                                });
                            }
                        }
                    });
                } else {
                    isAnimating = false;
                }
            }

            function getTitleIndexForProgress(imageProgress) {
                if (typeof imageProgress !== 'number') return 0;
                
                const imageIndex = Math.floor(imageProgress);
                const imageSpecificProgress = imageProgress - imageIndex;

                if (imageSpecificProgress >= titleChangeThreshold) {
                    return Math.min(imageIndex + 1, works.length - 1);
                } else {
                    return imageIndex;
                }
            }

            let lastImageProgress = 0;
            let scrollTrigger = null;

            try {
                scrollTrigger = ScrollTrigger.create({
                    trigger: '.works',
                    start: 'top top',
                    end: `+=${totalScrollDistance}vh`,
                    pin: true,
                    pinSpacing: true,
                    scrub: 0.2,
                    anticipatePin: 0,
                    fastScrollEnd: true,
                    preventOverlaps: true,
                    onUpdate: (self) => {
                        if (self.direction === 1 && self.progress === 1) {
                            gsap.set(slideImages.current, { clearProps: "all" });
                        }
                    },
                    onEnter: () => {
                        gsap.set(slideImages.current, { clearProps: "all" });
                    },
                    onLeaveBack: () => {
                        gsap.set(slideImages.current, { clearProps: "all" });
                    },
                    onUpdate: (self) => {
                        try {
                            const imageProgress = calculateImageProgress(self.progress);

                            if (typeof imageProgress === 'number') {
                                const scrollDirection = imageProgress > lastImageProgress ? 'down' : 'up';
                                const currentImageIndex = Math.floor(imageProgress);
                                const imageSpecificProgress = imageProgress - currentImageIndex;

                                const correctTitleIndex = getTitleIndexForProgress(imageProgress);

                                if (correctTitleIndex !== currentTitleIndex) {
                                    queuedTitleIndex = correctTitleIndex;

                                    if (!isAnimating) {
                                        animateTitleChange(correctTitleIndex, scrollDirection);
                                    }
                                }

                                if (firstSlideDOMElement) {
                                    const firstSlideImgScale = getScaleForImage(0, currentImageIndex, imageSpecificProgress);
                                    firstSlideDOMElement.style.transform = `scale(${firstSlideImgScale})`;
                                }

                                for (let i = 1; i < totalWorks; i++) {
                                    const imgContainer = document.getElementById(`img-container-${i + 1}`);
                                    if (!imgContainer) continue;

                                    imgContainer.style.opacity = '1';

                                    const strips = imgContainer.querySelectorAll('.strip');
                                    const images = imgContainer.querySelectorAll('img');

                                    if (i < currentImageIndex - 1 || i > currentImageIndex + 1) {
                                        strips.forEach((strip, stripIndex) => {
                                            const stripPositionFromBottom = stripsCount - stripIndex - 1;
                                            const stripUpperBound = stripPositionFromBottom * (100 / stripsCount);
                                            const stripLowerBound = (stripPositionFromBottom + 1) * (100 / stripsCount);
                                            gsap.set(strip, {
                                                clipPath: `polygon(0% ${stripLowerBound}%, 100% ${stripLowerBound}%, 100% ${stripUpperBound - .1}%, 0% ${stripUpperBound - .1}%)`,
                                                force3D: true,
                                                willChange: "clip-path"
                                            });
                                        });
                                    } else if (i === currentImageIndex) {
                                        strips.forEach((strip, stripIndex) => {
                                            const stripPositionFromBottom = stripsCount - stripIndex - 1;
                                            const stripUpperBound = stripPositionFromBottom * (100 / stripsCount);
                                            const stripLowerBound = (stripPositionFromBottom + 1) * (100 / stripsCount);
                                            const stripDelay = (stripIndex / stripsCount) * 0.3;
                                            const adjustedProgress = Math.max(0, Math.min(1, (imageSpecificProgress - stripDelay) * 2));
                                            const currentStripUpperBound = stripLowerBound - (stripLowerBound - (stripUpperBound - .1)) * adjustedProgress;
                                            gsap.set(strip, {
                                                clipPath: `polygon(0% ${stripLowerBound}%, 100% ${stripLowerBound}%, 100% ${currentStripUpperBound}%, 0% ${currentStripUpperBound}%)`,
                                                force3D: true,
                                                willChange: "clip-path"
                                            });
                                        });
                                    } else {
                                        strips.forEach((strip, stripIndex) => {
                                            const stripPositionFromBottom = stripsCount - stripIndex - 1;
                                            const stripLowerBound = (stripPositionFromBottom + 1) * (100 / stripsCount);
                                            gsap.set(strip, {
                                                clipPath: `polygon(0% ${stripLowerBound}%, 100% ${stripLowerBound}%, 100% ${stripLowerBound}%, 0% ${stripLowerBound}%)`,
                                                force3D: true,
                                                willChange: "clip-path"
                                            });
                                        });
                                    }

                                    const imgScale = getScaleForImage(i - 1, currentImageIndex, imageSpecificProgress);
                                    images.forEach((img) => {
                                        gsap.set(img, { 
                                            transform: `scale(${imgScale})`,
                                            force3D: true,
                                            willChange: "transform"
                                        });
                                    });
                                }

                                lastImageProgress = imageProgress;
                            }
                        } catch (error) {
                            console.error("Error in scroll update:", error);
                        }
                    }
                });
            } catch (error) {
                console.error("Error creating ScrollTrigger:", error);
            }

            return () => {
                if (scrollTrigger) {
                    scrollTrigger.kill();
                }
                ScrollTrigger.getAll().forEach(trigger => trigger.kill());
            };
        } catch (error) {
            console.error("Error in Works component:", error);
        }
    }, [isMobile]);

    const handleExploreClick = (e) => {
        e.preventDefault();
        window.scrollTo(0, 0);
        startClosing('/projects');
    };

    return (
        <section className='works'>
            <div className='works__images' ref={slideImages}></div>

            <div className='works__info'>
                <div className='works__title-prefix'>
                    <p className='works__desc'>Essence</p>
                </div>

                <div className='works__title'>
                    <p className='works__desc' ref={titleElement}>Whisper of Evening</p>
                </div>

                <div className='works__link'>
                    <Link 
                        href="/projects" 
                        className='works__desc' 
                        data-pointer={'hover'} 
                        ref={exploreLink}
                        onClick={handleExploreClick}
                    >
                        explore &#8599;
                    </Link>
                </div>
            </div>
        </section>
    );
}