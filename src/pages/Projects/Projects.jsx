"use client";

import React, { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAnimatedNavigate } from '@/hooks/useAnimatedNavigate';

import "./Projects.css";
import Hero from '@/components/Hero/Hero';
import works from '@/data/works';
import Footer from '@/components/Footer/Footer';

const Projects = () => {
    const [activeProject, setActiveProject] = useState(null);
    const carouselDescriptionRef = useRef(null);
    const carouselTitleRef = useRef(null);
    const workSliderImgRef = useRef(null);
    const descriptionTextRef = useRef(null);
    const titleTextRef = useRef(null);
    const imageRef = useRef(null);
    const router = useRouter();
    const animatedNavigate = useAnimatedNavigate();

    useEffect(() => {
        if (works && works.length > 0) {
            setActiveProject(works[0]);
        }
    }, []);

    const animateCarouselInfo = (newProject) => {
        if (!newProject) return;

        const tl = gsap.timeline();

        tl.to([descriptionTextRef.current, titleTextRef.current], {
            yPercent: -100,
            duration: 0.75,
            stagger: 0.25,
            ease: "power4.in",
        });

        tl.to(
            imageRef.current,
            {
                opacity: 0,
                duration: 0.5,
                ease: "power2.in",
                onComplete: () => {
                    if (descriptionTextRef.current) descriptionTextRef.current.remove();
                    if (titleTextRef.current && titleTextRef.current.parentNode) {
                        titleTextRef.current.parentNode.remove();
                    }
                    if (imageRef.current) imageRef.current.remove();

                    const newDescriptionEl = document.createElement("p");
                    newDescriptionEl.className = "primary sm";
                    newDescriptionEl.textContent = newProject.description;

                    const titleContainer = document.createElement("div");
                    titleContainer.className = "project-title-container";
                    titleContainer.style.cursor = "pointer";

                    const newTitleEl = document.createElement("h1");
                    newTitleEl.textContent = newProject.title;

                    titleContainer.onclick = () => animatedNavigate(`/projects/${newProject.slug}`);

                    titleContainer.appendChild(newTitleEl);

                    const newImageEl = document.createElement("img");
                    newImageEl.src = newProject.image;
                    newImageEl.alt = newProject.title;

                    gsap.set(newDescriptionEl, { yPercent: 100 });
                    gsap.set(newTitleEl, { yPercent: 100 });
                    gsap.set(newImageEl, { opacity: 0 });

                    carouselDescriptionRef.current.appendChild(newDescriptionEl);
                    carouselTitleRef.current.appendChild(titleContainer);
                    workSliderImgRef.current.appendChild(newImageEl);

                    descriptionTextRef.current = newDescriptionEl;
                    titleTextRef.current = newTitleEl;
                    imageRef.current = newImageEl;

                    const inTl = gsap.timeline();

                    inTl.to(newImageEl, {
                        opacity: 1,
                        duration: 0.75,
                        ease: "power2.out",
                    });

                    inTl.to(
                        [newDescriptionEl, newTitleEl],
                        {
                            yPercent: 0,
                            duration: 0.75,
                            stagger: 0.25,
                            ease: "power4.out",
                        },
                        "-=0.5"
                    );
                    setActiveProject(newProject);
                },
            },
            "-=0.5"
        );
    };

    useEffect(() => {
        if (
            carouselDescriptionRef.current &&
            carouselTitleRef.current &&
            workSliderImgRef.current &&
            activeProject
        ) {
            descriptionTextRef.current = carouselDescriptionRef.current.querySelector("p");

            const initialTitleLink = carouselTitleRef.current.querySelector("a");
            if (initialTitleLink) {
                const titleContainer = document.createElement("div");
                titleContainer.className = "project-title-container";
                titleContainer.style.cursor = "pointer";

                const newTitle = document.createElement("h1");
                newTitle.textContent = activeProject.title;
                titleContainer.appendChild(newTitle);

                titleContainer.onclick = () => animatedNavigate(`/projects/${activeProject.slug}`);

                initialTitleLink.parentNode.replaceChild(
                    titleContainer,
                    initialTitleLink
                );

                titleTextRef.current = newTitle;
            } else {
                titleTextRef.current = carouselTitleRef.current.querySelector("h1");
            }

            imageRef.current = workSliderImgRef.current.querySelector("img");
        }
    }, [activeProject, animatedNavigate]);

    const handleWorkItemClick = (project) => {
        if (project.id !== activeProject?.id) {
            animateCarouselInfo(project);
        }
    };

    if (!activeProject) return null;

    return (
        <>
            <Hero 
                label="PROJECTS"
                title={{
                    first: "Our",
                    emphasis: "Latest",
                    last: "Works"
                }}
                backgroundImage="/work/work-8.jpg"
            />

            <div className='projects__intro'>
                <div className='projects__title big-right'>Here are some of our latest projects</div>
                <div className='projects__lead big-left'>We are a team of creative professionals who are passionate about creating beautiful and functional websites and applications.</div>
                <div className='projects__desc big-right'>Discover unique projects, original works, creative ideas, and an atmosphere of artistry. Explore the world of art, get inspired, and create with us!</div>
                <div className='projects__cta big-left'>Start your journey into the world of art today!</div>
            </div>

            <div className="page projects">
                <div className="projects__carousel">
                    <div className="projects__slider" ref={workSliderImgRef}>
                        <img src={activeProject.image} alt={activeProject.title} />
                    </div>

                    <div className="projects__preview">
                        {works.map((project) => (
                            <div
                                key={project.id}
                                className={`projects__item ${
                                    activeProject.id === project.id ? "projects__item--active" : ""
                                }`}
                                onClick={() => handleWorkItemClick(project)}
                            >
                                <img src={project.image} alt={project.title} className="projects__item-img"/>
                            </div>
                        ))}
                    </div>

                    <div className="projects__info">
                        <div className="projects__description" ref={carouselDescriptionRef}>
                            <p className="primary sm">{activeProject.description}</p>
                        </div>
                        <div className="projects__title" ref={carouselTitleRef} data-pointer="hover">
                            <Link href="/projects">
                                <h1>{activeProject.title}</h1>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </>
    );
};

export default Projects; 