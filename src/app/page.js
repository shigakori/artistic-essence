"use client";

import "./App.css";
import { usePathname } from "next/navigation";
import React, { useEffect } from "react";

import Menu from "@/components/Menu/Menu";
import { AnimatePresence } from "framer-motion";
import Home from "@/pages/Home/Home";

function ScrollToTop() {
    const pathname = usePathname();

    useEffect(() => {
        setTimeout(() => {
            window.scrollTo(0, 0);
        }, 1400);
    }, [pathname]);

    return null;
}

function App() {
    const pathname = usePathname();

    return (
        <>
            <ScrollToTop />
            <Menu pathname={pathname} /> {/* Передаём строку как пропс */}
            <AnimatePresence mode="wait" initial={false}>
                {pathname === "/" && <Home />}
                {/* Добавь другие страницы, если нужны */}
            </AnimatePresence>
        </>
    );
}

export default App;
