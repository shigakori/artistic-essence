"use client";

import React, { useEffect, useRef, useState } from 'react';
import './CustomCursor.css';
import { gsap } from 'gsap';
import lerp from 'lerp';
import Bowser from 'bowser';

const CustomCursor = () => {
  const cursorAreaRef = useRef(null);
  const cursorSmallRef = useRef(null);
  const cursorLargeRef = useRef(null);
  const [visible, setVisible] = useState(false);
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    const browser = Bowser.getParser(window.navigator.userAgent);
    const isMobile = ['tablet', 'mobile'].includes(browser.getPlatformType());
    const hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

    if (isMobile || hasTouch) {
      setIsTouch(true);
      return;
    }

    const handleFirstTouch = () => {
      setIsTouch(true);
    };
    window.addEventListener('touchstart', handleFirstTouch, { once: true });

    const area = cursorAreaRef.current;
    const small = cursorSmallRef.current;
    const large = cursorLargeRef.current;
    if (!area || !small || !large) return;

    let mousePos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    let largePos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    let prevMousePos = { x: mousePos.x, y: mousePos.y };
    let stretch = { x: 1, y: 1 };
    let angle = 0;
    let isHovered = false;
    let hoverScale = 1;

    const smallXSetter = gsap.quickSetter(small, 'x', 'px');
    const smallYSetter = gsap.quickSetter(small, 'y', 'px');
    const largeXSetter = gsap.quickSetter(large, 'x', 'px');
    const largeYSetter = gsap.quickSetter(large, 'y', 'px');
    const rotationSetter = gsap.quickSetter(large, 'rotate', 'deg');
    const scaleXSetter = gsap.quickSetter(large, 'scaleX');
    const scaleYSetter = gsap.quickSetter(large, 'scaleY');
    gsap.set(large, { transformOrigin: 'center center' });

    const updateLarge = () => {
      largePos.x = lerp(largePos.x, mousePos.x, 0.1);
      largePos.y = lerp(largePos.y, mousePos.y, 0.1);
      largeXSetter(largePos.x);
      largeYSetter(largePos.y);
      const dx = mousePos.x - prevMousePos.x;
      const dy = mousePos.y - prevMousePos.y;
      const velocity = Math.sqrt(dx * dx + dy * dy);
      prevMousePos.x = mousePos.x;
      prevMousePos.y = mousePos.y;
      if (velocity > 2) {
        const maxDeform = 0.6;
        const maxVelocity = 40;
        const deformFactor = Math.min(velocity / maxVelocity, 1);
        const moveAngle = Math.atan2(dy, dx) * (180 / Math.PI);
        const targetStretchX = 1 + deformFactor * maxDeform;
        const targetStretchY = 1 - deformFactor * maxDeform * 0.6; 
        stretch.x = lerp(stretch.x, targetStretchX, 0.25); 
        stretch.y = lerp(stretch.y, targetStretchY, 0.25);
        angle = lerp(angle, moveAngle, 0.25);
      } else {
        stretch.x = lerp(stretch.x, 1, 0.15);
        stretch.y = lerp(stretch.y, 1, 0.15);
        angle = lerp(angle, 0, 0.15);
      }
      if (Math.abs(stretch.x - 1) > 0.01 || Math.abs(stretch.y - 1) > 0.01 || Math.abs(angle) > 0.1) {
        scaleXSetter(stretch.x * hoverScale);
        scaleYSetter(stretch.y * hoverScale);
        rotationSetter(angle);
      } else {
        scaleXSetter(hoverScale);
        scaleYSetter(hoverScale);
        rotationSetter(0);
      }
    };

    const onMove = e => {
      mousePos.x = e.clientX;
      mousePos.y = e.clientY;
      smallXSetter(mousePos.x);
      smallYSetter(mousePos.y);
      if (!visible) setVisible(true);
    };

    const onEnter = e => {
      if (e.target.getAttribute('data-pointer') === 'hover') {
        isHovered = true;
        gsap.to(large, { opacity: 1, duration: 0.2 });
        gsap.to(small, { scale: 0, opacity: 0, duration: 0.2 });
        gsap.to({ value: hoverScale }, {
          value: .25,
          duration: .4,
          onUpdate: function() {
            hoverScale = this.targets()[0].value;
          }
        });
      }
    };

    const onLeave = () => {
      isHovered = false;
      gsap.to(large, { opacity: 1, duration: 0.2 });
      gsap.to(small, { scale: 1, opacity: 1, duration: 0.2 });
      gsap.to({ value: hoverScale }, {
        value: 1,
        duration: .4,
        onUpdate: function() {
          hoverScale = this.targets()[0].value;
        }
      });
    };

    const addEventListeners = () => {
      document.querySelectorAll('[data-pointer]').forEach(el => {
        el.addEventListener('mouseenter', onEnter);
        el.addEventListener('mouseleave', onLeave);
      });
    };

    const removeEventListeners = () => {
      document.querySelectorAll('[data-pointer]').forEach(el => {
        el.removeEventListener('mouseenter', onEnter);
        el.removeEventListener('mouseleave', onLeave);
      });
    };

    addEventListeners();

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'childList' || mutation.type === 'attributes') {
          removeEventListeners();
          addEventListeners();
        }
      });
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['data-pointer']
    });

    window.addEventListener('mousemove', onMove);
    gsap.ticker.add(updateLarge);

    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('touchstart', handleFirstTouch);
      removeEventListeners();
      gsap.ticker.remove(updateLarge);
      gsap.killTweensOf(large);
      gsap.killTweensOf(small);
      observer.disconnect();
    };
  }, []);

  if (isTouch) return null;

  return (
    <div className={`cursor${!visible ? ' cursor-hide' : ''}`} ref={cursorAreaRef}>
      <div className="cursor__circle cursor__circle--small" ref={cursorSmallRef} />
      <div className="cursor__circle cursor__circle--large" ref={cursorLargeRef} />
    </div>
  );
};

export default CustomCursor;
