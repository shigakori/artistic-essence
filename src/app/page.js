"use client";

import { usePathname } from "next/navigation";
import React, { useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import Home from "@/pages/Home/Home";
import About from "@/pages/About/About";
import Projects from "@/pages/Projects/Projects";
import Contacts from "@/pages/Contacts/Contacts";
import Footer from "@/components/Footer/Footer";

function ScrollToTop() {
    const pathname = usePathname();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return null;
}

function App() {
    const pathname = usePathname();

    return (
        <div className="app-container">
            <ScrollToTop />
            <main className="main-content">
                    <AnimatePresence mode="wait" initial={false}>
                        {pathname === "/" && <Home key="home" />}
                        {pathname === "/about" && <About key="about" />}
                        {pathname === "/projects" && <Projects key="projects" />}
                        {pathname === "/contacts" && <Contacts key="contacts" />}
                    </AnimatePresence>
            </main>
            <Footer />
        </div>
    );
}

export default App;
