"use client"
import React, { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import gsap from 'gsap';

const getImageByPath = (pathname) => {
    switch (pathname) {
        case '/':
            return '/artistic-essence/work/work-5.jpg';
        case '/about':
            return '/artistic-essence/work/work-3.jpg';
        case '/projects':
            return '/artistic-essence/work/work-8.jpg';
        case '/contacts':
            return '/artistic-essence/work/work-4.jpg';
        default:
            return '/artistic-essence/work/work-5.jpg';
    }
};

const MenuParallaxImage = () => {
    const pathname = usePathname();
    const imageSrc = getImageByPath(pathname);
    const imgRef = useRef(null);
    const containerRef = useRef(null);
    const mouseOffset = useRef({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (e) => {
            const w = window.innerWidth;
            const h = window.innerHeight;
            const relX = (e.clientX / w) - 0.5;
            const relY = (e.clientY / h) - 0.5;
            const maxX = 15;
            const maxY = 10;
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

        const animate = () => {
            if (imgRef.current) {
                const x = mouseOffset.current.x;
                const y = mouseOffset.current.y;
                imgRef.current.style.transform = `translate(${x}px, ${y}px)`;
            }
            requestAnimationFrame(animate);
        };

        gsap.fromTo(containerRef.current,
            {
                opacity: 0,
                scale: 0.8,
            },
            {
                opacity: 1,
                scale: 1,
                duration: 0.8,
                ease: 'power3.out',
            }
        );

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseleave', handleMouseLeave);
        animate();

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, []);

    return (
        <div className="menu__parallax-image" ref={containerRef}>
            <div className="menu__parallax-image-inner">
                <img
                    ref={imgRef}
                    src={imageSrc}
                    alt="Menu background"
                    className="menu__parallax-image-img"
                    style={{ 
                        willChange: 'transform',
                        width: '200%',
                        height: '200%',
                        objectFit: 'cover',
                        objectPosition: 'center'
                    }}
                />
            </div>
        </div>
    );
};

export default MenuParallaxImage; 