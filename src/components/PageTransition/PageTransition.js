'use client';

import { motion } from 'framer-motion';
import { usePathname, useRouter } from 'next/navigation';
import { createContext, useContext, useState, useEffect, useRef } from "react";
import './PageTransition.css';

export const PageTransitionContext = createContext();

export function usePageTransition() {
  return useContext(PageTransitionContext);
}

export function PageTransitionProvider({ children }) {
  const [phase, setPhase] = useState('idle');
  const [pendingPath, setPendingPath] = useState(null);
  const [hasNavigated, setHasNavigated] = useState(false);
  const router = useRouter();
  const callbackRef = useRef(null);
  const isFirstLoad = useRef(true);
  const pathname = usePathname();
  const prevPathRef = useRef(pathname);

  // Запуск анимации закрытия и перехода
  const startClosing = (nextPath, callback) => {
    setPendingPath(nextPath);
    callbackRef.current = callback;
    setHasNavigated(true);
    setPhase('closing');
  };

  // После закрытия — переход
  const handleClosed = () => {
    if (pendingPath) {
      router.push(pendingPath);
      setPendingPath(null);
    }
    if (callbackRef.current) {
      callbackRef.current();
      callbackRef.current = null;
    }
    setPhase('opening');
  };

  // После открытия — idle
  const handleOpened = () => {
    setPhase('idle');
    setHasNavigated(false);
  };

  // Отслеживаем изменения пути
  useEffect(() => {
    if (isFirstLoad.current) {
      isFirstLoad.current = false;
      prevPathRef.current = pathname;
      return;
    }

    if (pathname !== prevPathRef.current) {
      setHasNavigated(true);
      prevPathRef.current = pathname;
    }
  }, [pathname]);

  return (
    <PageTransitionContext.Provider value={{ phase, startClosing, handleClosed, handleOpened, hasNavigated }}>
      {children}
    </PageTransitionContext.Provider>
  );
}

export function PageTransitionBlocks() {
  const { phase, handleClosed, handleOpened, hasNavigated } = usePageTransition();
  const [visible, setVisible] = useState(false);
  const randomDelays = useRef([]);
  const isFirstLoad = useRef(true);

  useEffect(() => {
    if (isFirstLoad.current) {
      setVisible(false);
      isFirstLoad.current = false;
      return;
    }

    if ((phase === 'closing' || phase === 'opening') && hasNavigated) {
      setVisible(true);
      const ROWS = 8;
      const COLS = 8;
      
      // Создаем более хаотичные задержки
      randomDelays.current = Array.from({ length: ROWS }, () =>
        Array.from({ length: COLS }, () => Math.random() * 0.8)
      );
    } else {
      setVisible(false);
    }
  }, [phase, hasNavigated]);

  useEffect(() => {
    if (phase === 'closing') {
      const timer = setTimeout(() => handleClosed(), 1300);
      return () => clearTimeout(timer);
    }
    if (phase === 'opening') {
      const timer = setTimeout(() => handleOpened(), 1300);
      return () => clearTimeout(timer);
    }
  }, [phase, handleClosed, handleOpened]);

  if (!visible) return null;

  const ROWS = 8;
  const COLS = 8;

  return (
    <div className="blocks-container transition-in" style={{ pointerEvents: 'all', zIndex: 9999, position: 'fixed', inset: 0 }}>
      {Array.from({ length: ROWS }).map((_, rowIndex) => (
        <div className="row" key={rowIndex}>
          {Array.from({ length: COLS }).map((_, colIndex) => (
            <motion.div
              key={colIndex}
              className="block"
              initial={{ scaleY: phase === 'closing' ? 0 : 1 }}
              animate={{ scaleY: phase === 'closing' ? 1 : 0 }}
              transition={{
                duration: 1,
                ease: [0.22, 1, 0.36, 1],
                delay: randomDelays.current[rowIndex]?.[colIndex] ?? 0,
              }}
              style={{ willChange: 'transform' }}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

const PageTransition = ({ children }) => {
  const pathname = usePathname();
  const { hasNavigated } = usePageTransition();
  const isFirstLoad = useRef(true);

  useEffect(() => {
    if (isFirstLoad.current) {
      isFirstLoad.current = false;
    }
  }, []);

  return (
    <motion.div
      key={pathname}
      initial={isFirstLoad.current || !hasNavigated ? false : { opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 20,
        duration: 0.4
      }}
    >
      {children}
    </motion.div>
  );
};

export default PageTransition; 