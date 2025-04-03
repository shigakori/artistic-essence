import React, { useEffect, useRef} from 'react';
import workList from "@/data/workList";
import "./Home.css";
import { usePathname } from "next/navigation";

import Link from 'next/link'

import {gsap} from 'gsap'
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ReactLenis from "lenis/react";

gsap.registerPlugin(ScrollTrigger);

import AnimatedCopy from "@/components/AnimatedCopy/AnimatedCopy";
import Transition from "@/components/Transition/Transition";
import Reviews from "@/components/Reviews/Reviews";
import Parallax from "@/components/Parallax/Parallax";
import Footer from "@/components/Footer/Footer";

const Home = () => {

    const workItems = Array.isArray(workList) ? workList : [];
    const stickyTitlesRef = useRef(0)
    const titlesRef = useRef([])
    const stickyWorkHeaderRef = useRef(0)
    const homeWorkRef = useRef(0)

    useEffect(() => {
        const handleResize = () => {
            ScrollTrigger.refresh()
        }

        window.addEventListener('resize', handleResize)

        const stickySection = stickyTitlesRef.current;
        const titles = titlesRef.current.filter(Boolean);

        if(!stickySection || titlesRef.length !== 3) {
            window.removeEventListener('resize', handleResize)
        }

        gsap.set(titles[0], { opacity: 1, scale: 1, })
        gsap.set(titles[1], { opacity: 0, scale: .75, })
        gsap.set(titles[2], { opacity: 0, scale: .75, })

        const pinTrigger = ScrollTrigger.create({
            trigger: stickySection,
            start: 'top top',
            end: `+=${window.innerHeight * 3}`,
            pin: true,
            pinSpacing: true,
        })

        const masterTimeline = gsap.timeline({
            scrollTrigger: {
                trigger: stickySection,
                start: 'top top',
                end: `+=${window.innerHeight * 2}`,
                scrub: .5,
            }
        })

        masterTimeline
            .to(
                titles[0],
                {
                    opacity: 0,
                    scale: .75,
                    duration: .5,
                    ease: 'power2.out'
                },1
            )

            .to(
                titles[1],
                {
                    opacity: 1,
                    scale: 1,
                    duration: .8,
                    ease: 'power2.in'
                }, 1.25
            )

        masterTimeline
            .to(
                titles[1],
                {
                    opacity: 0,
                    scale: .75,
                    durations: .5,
                    ease: 'power2.out'
                }, 2.5
            )

            .to(
                titles[2],
                {
                    opacity: 1,
                    scale: 1,
                    duration: .8,
                    ease: 'power2.in'
                }, 2.75
            );

        const workHeaderSection = stickyWorkHeaderRef.current;
        const homeWorkSection = homeWorkRef.current;

        let workHeaderPinTrigger;
        if(workHeaderSection && homeWorkSection) {
            workHeaderPinTrigger = ScrollTrigger.create({
                trigger: workHeaderSection,
                start: 'top top',
                endTrigger: homeWorkSection,
                end: 'bottom bottom',
                pin: true,
                pinSpacing: false,
            });
        }

        return () => {
            pinTrigger.kill()
            if(workHeaderPinTrigger){
                workHeaderPinTrigger.kill()
            }
            if(masterTimeline.scrollTrigger){
                masterTimeline.scrollTrigger.kill()
            }

            masterTimeline.kill()
            window.removeEventListener('resize', handleResize)
        };
    }, []);

        return (
            <ReactLenis root>
                <div className={'page home'}>
                    <section className={'hero'}>
                        <div className={'hero-img'}>
                            <Parallax src="/home/hero.jpg" alt="Hero Image" speed={.5}/>
                        </div>
                        <div className="hero-img-overlay"></div>
                        <div className="hero-img-gradient"></div>

                        <div className={'hero-header'}>
                            <AnimatedCopy tag={'h1'} animateOnScroll={false} delay={.7}>
                                Horizon
                            </AnimatedCopy>
                            <AnimatedCopy tag={'h1'} animateOnScroll={false} delay={.8}>
                                AI
                            </AnimatedCopy>
                        </div>
                    </section>

                    <section className={'sticky-titles'} ref={stickyTitlesRef}>
                        <div className={'sticky-titles-nav'}>
                            <p className={'primary sm'}>About AI</p>
                            <p className={'primary sm'}>Let's connect</p>
                        </div>
                        <div className={'sticky-titles-footer'}>
                            <p className={'primary sm'}>The Future Of...</p>
                            <p className={'primary sm'}>...Artificial Intelligence</p>
                        </div>

                        <h2 ref={(el) => (titlesRef.current[0] = el)}>
                            Horizon AI pushes the boundaries of artificial intelligence.
                        </h2>
                        <h2 ref={(el) => (titlesRef.current[1] = el)}>
                            We develop smart solutions for a changing world.
                        </h2>
                        <h2 ref={(el) => (titlesRef.current[2] = el)}>
                            Innovation meets intelligence at Horizon AI.
                        </h2>
                    </section>

                    <section ref={stickyWorkHeaderRef} className="sticky-work-header">
                        <AnimatedCopy tag="h1" animateOnScroll="true">
                            horizon + + prompts
                        </AnimatedCopy>
                    </section>

                    <section ref={homeWorkRef} className="home-work">
                        <div className="home-work-list">
                            {workItems.map((work, index) => (
                                <Link
                                    href='#'
                                    key={work.id}
                                    className="home-work-item"
                                >
                                    <p className="primary sm">{`${String(index + 1).padStart(
                                        2,
                                        "0"
                                    )} - ${String(workItems.length).padStart(2, "0")}`}</p>
                                    <h3>{work.title}</h3>
                                    <div className="work-item-img">
                                        <img src={work.image} alt={work.title}/>
                                    </div>
                                    <h4>{work.category}</h4>
                                </Link>
                            ))}
                        </div>
                    </section>

                    <Reviews/>

                    <section className="hobbies">
                        <div className="hobby">
                            <AnimatedCopy tag="h4" animateOnScroll={true}>
                                [ + Prompts + ]
                            </AnimatedCopy>
                        </div>
                        <div className="hobby">
                            <AnimatedCopy tag="h4" animateOnScroll={true}>
                                [ + Editing + ]
                            </AnimatedCopy>
                        </div>
                        <div className="hobby">
                            <AnimatedCopy tag="h4" animateOnScroll={true}>
                                [ + Code And -
                            </AnimatedCopy>
                        </div>
                        <div className="hobby">
                            <AnimatedCopy tag="h4" animateOnScroll={true}>
                                 - Image Generator + ]
                            </AnimatedCopy>
                        </div>
                    </section>



                    {/*<ContactForm />*/}
                    <Footer />
                </div>
            </ReactLenis>
        );
};

export default Transition(Home);