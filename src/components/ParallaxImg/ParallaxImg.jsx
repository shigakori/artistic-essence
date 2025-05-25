import React, { useEffect, useRef } from 'react';
import { useLenis } from "lenis/react";
import gsap from 'gsap';

const lerp = (start, end, factor) => start + (end - start) * factor;

const ParallaxImg = ({ src, alt, className, style, scale = 1.7 }) => {
    const imgRef = useRef(null);
    const bounds = useRef(null)
    const currentTranslateY = useRef(0)
    const targetTranslateY = useRef(0)
    const rafId = useRef(null)
    const mouseOffset = useRef({ x: 0, y: 0 });

    useEffect(() => {
        const updateBounds = () => {
            if(imgRef.current){
                const rect = imgRef.current.getBoundingClientRect();
                bounds.current = {
                    top: rect.top + window.scrollY,
                    bottom: rect.bottom + window.scrollY,
                };
            }
        };

        updateBounds();
        window.addEventListener("resize", updateBounds);

        const animate = ()=>{
            if(imgRef.current){
                currentTranslateY.current = lerp(
                    currentTranslateY.current,
                    targetTranslateY.current,
                    0.1
                );
                const x = mouseOffset.current.x;
                const y = mouseOffset.current.y;
                imgRef.current.style.transform = `translate(${x}px, ${currentTranslateY.current + y}px) scale(${scale})`;
            }
            rafId.current = requestAnimationFrame(animate);
        };

        animate()

        return () => {
            window.removeEventListener('resize', updateBounds);
            if(rafId.current){
                cancelAnimationFrame(rafId.current)
            }
        };
    }, [scale]);

    useLenis(({ scroll }) => {
        if(!bounds.current) return;
        const relativeScroll = scroll - (bounds.current.top || 0);
        targetTranslateY.current = relativeScroll * 0.2
    });

    // Mouse parallax по всему экрану
    useEffect(() => {
        const handleMouseMove = (e) => {
            const w = window.innerWidth;
            const h = window.innerHeight;
            const relX = (e.clientX / w) - 0.5;
            const relY = (e.clientY / h) - 0.5;
            const maxX = 30;
            const maxY = 20;
            const x = relX * maxX * 2;
            const y = relY * maxY * 2;
            gsap.to(mouseOffset.current, {
                x,
                y,
                duration: 0.7,
                ease: 'power3.out',
                overwrite: 'auto',
            });
        };
        const handleMouseLeave = () => {
            gsap.to(mouseOffset.current, {
                x: 0,
                y: 0,
                duration: 1,
                ease: 'power3.out',
                overwrite: 'auto',
            });
        };
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseleave', handleMouseLeave);
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, []);

    return (
        <img
            ref={imgRef}
            src={src}
            alt={alt}
            className={className}
            style={{
                willChange: 'transform',
                transform: `translate(0, 0) scale(${scale})`,
                ...style
            }}
        />
    );
};

export default ParallaxImg;