import React, { useRef, useEffect } from "react";
import { useLenis } from "lenis/react";

const lerp = (start, end, factor) => start + (end - start) * factor;

const Parallax = ({ src, alt }) => {
    const imageRef = useRef(null);
    const bounds = useRef(null);
    const currentTranslateY = useRef(0);
    const targetTranslateY = useRef(0);
    const rafId = useRef(null);

    useEffect(() => {
        const updateBounds = () => {
            if (imageRef.current) {
                const rect = imageRef.current.getBoundingClientRect();
                bounds.current = {
                    top: rect.top + window.scrollY,
                    bottom: rect.bottom + window.scrollY,
                    height: rect.height,
                };
            }
        };

        updateBounds();
        window.addEventListener("resize", updateBounds);

        const animate = () => {
            if (imageRef.current) {
                currentTranslateY.current = lerp(
                    currentTranslateY.current,
                    targetTranslateY.current,
                    .2
                );

                const scaleFactor = Math.min(1.5, 1 + Math.abs(currentTranslateY.current) * 0.0005);
                imageRef.current.style.transform = `translateY(${currentTranslateY.current}px) scale(${scaleFactor})`;
            }
            rafId.current = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            window.removeEventListener("resize", updateBounds);
            if (rafId.current) {
                cancelAnimationFrame(rafId.current);
            }
        };
    }, []);

    useLenis(({ scroll }) => {
        console.log("Scroll position:", scroll)
        if (!bounds.current) return;
        const relativeScroll = scroll - bounds.current.top;
        targetTranslateY.current = relativeScroll * 0.4;
    });

    return (
        <img
            ref={imageRef}
            src={src}
            alt={alt}
        />
    );
};

export default Parallax;
