'use client';

import Head from 'next/head';

const MetaTags = ({ 
    title, 
    description, 
    keywords, 
    ogImage, 
    ogType = 'website',
    twitterCard = 'summary_large_image'
}) => {
    const siteTitle = "Artistic Essence";
    const fullTitle = title ? `${title} | ${siteTitle}` : siteTitle;

    return (
        <Head>
            <title>{fullTitle}</title>
            <meta name="description" content={description} />
            <meta name="keywords" content={keywords} />
            
            <meta property="og:title" content={fullTitle} />
            <meta property="og:description" content={description} />
            <meta property="og:type" content={ogType} />
            {ogImage && <meta property="og:image" content={ogImage} />}
            
            <meta name="twitter:card" content={twitterCard} />
            <meta name="twitter:title" content={fullTitle} />
            <meta name="twitter:description" content={description} />
            {ogImage && <meta name="twitter:image" content={ogImage} />}
            
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <meta name="theme-color" content="#000000" />
            <link rel="canonical" href={typeof window !== 'undefined' ? window.location.href : ''} />
        </Head>
    );
};

export default MetaTags; 