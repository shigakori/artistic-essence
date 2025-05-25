"use client";

import React, { useRef, useEffect, forwardRef, useImperativeHandle } from 'react';
import './ScrambleText.css';

const ScrambleText = forwardRef(({ text, className }, ref) => {
    const textRef = useRef(null);
    const intervalRef = useRef(null);
    const originalText = text;

    useImperativeHandle(ref, () => ({
        scramble: () => {
            if (!textRef.current) return;
            
            let iteration = 0;
            const maxIterations = 3;
            const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

            clearInterval(intervalRef.current);

            intervalRef.current = setInterval(() => {
                if (!textRef.current) return;

                textRef.current.innerText = originalText
                    .split("")
                    .map((letter, index) => {
                        if (index < iteration) {
                            return originalText[index];
                        }
                        return letters[Math.floor(Math.random() * 26)];
                    })
                    .join("");

                if (iteration >= originalText.length) {
                    clearInterval(intervalRef.current);
                }

                iteration += 1 / maxIterations;
            }, 30);
        },
        reset: () => {
            if (!textRef.current) return;
            clearInterval(intervalRef.current);
            textRef.current.innerText = originalText;
        }
    }));

    useEffect(() => {
        if (textRef.current) {
            textRef.current.innerText = originalText;
        }
        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, [originalText]);

    return (
        <span ref={textRef} className={className}>
            {originalText}
        </span>
    );
});

ScrambleText.displayName = 'ScrambleText';

export default ScrambleText; 