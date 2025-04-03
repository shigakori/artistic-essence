"use client";
import Link from "next/link";

import "./Footer.css";

const Footer = () => {
    return (
        <>
            <footer>
                <div className="container">
                    <div className="footer-row footer-content">
                        <div className="footer-col">
                            <h3>
                                A brief journey into AI-driven artistry by shigakori © 2025 — All
                                rights reserved.
                            </h3>
                        </div>
                        <div className="footer-col">
                            <div className="footer-sub-col"></div>
                            <div className="footer-sub-col footer-links">
                                <p className="footer-col-header">[ - Archive - ]</p>
                                <Link href="#">
                                    <p>Archive 101</p>
                                </Link>
                                <Link href="#">
                                    <p>Archive 102</p>
                                </Link>
                                <Link href="#">
                                    <p>Archive 103</p>
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="footer-row footer-pattern">
                        <p>+</p>
                        <p>-</p>
                        <p>+</p>
                    </div>
                    <div className="footer-row">
                        <h1>horizon</h1>
                    </div>
                    <div className="footer-row footer-pattern">
                        <p>+</p>
                        <p>-</p>
                        <p>+</p>
                    </div>
                </div>
            </footer>
        </>
    );
};

export default Footer;
