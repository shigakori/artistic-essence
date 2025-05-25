"use client";

import React from 'react';
import "./Contacts.css";
import Hero from '@/components/Hero/Hero';
import Footer from '@/components/Footer/Footer';
import ContactForm from '@/components/ContactForm/ContactForm';

const Contacts = () => {
    return (
        <>
            <Hero 
                label="CONTACTS"
                title={{
                    first: "Get in",
                    emphasis: "Touch",
                    last: "With Us"
                }}
                backgroundImage="/work/work-4.jpg"
            />

            <ContactForm />
            <Footer />
        </>
    );
};

export default Contacts; 