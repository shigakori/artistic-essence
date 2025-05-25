"use client";
import { Suspense, useEffect, useState, useRef } from "react";
import Menu from "@/components/Menu/Menu";
import CustomCursor from "@/components/CustomCursor/CustomCursor";
import MusicPlayer from "@/components/MusicPlayer/MusicPlayer";
import PageTransition, { PageTransitionBlocks, usePageTransition } from "@/components/PageTransition/PageTransition";
import Preloader from "@/components/Preloader/Preloader";
import ReactLenis from "lenis/react";
import { AnimatePresence } from "framer-motion";

export default function AppShell({ children }) {
  const [showPreloader, setShowPreloader] = useState(true);
  const { phase } = usePageTransition();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (window.sessionStorage.getItem('preloaderShown')) {
        setShowPreloader(false);
      } else {
        setShowPreloader(true);
      }
    }
  }, []);

  useEffect(() => {
    if (phase !== 'idle') {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    };
  }, [phase]);

  const handlePreloaderFinish = () => {
    setShowPreloader(false);
    if (typeof window !== 'undefined') {
      window.sessionStorage.setItem('preloaderShown', 'true');
    }
  };

  return (
    <ReactLenis root options={{ lerp: 0.07, duration: 2 }}>
      <PageTransitionBlocks />
      {showPreloader && (
        <Preloader slow onFinish={handlePreloaderFinish} />
      )}
      {!showPreloader && (
        <>
          <Menu />
          <CustomCursor />
          <MusicPlayer />
          <Suspense>
            <AnimatePresence mode="wait">
              <PageTransition>
                <main id="main-content" tabIndex="-1" role="main">
                  {children}
                </main>
              </PageTransition>
            </AnimatePresence>
          </Suspense>
        </>
      )}
    </ReactLenis>
  );
} 