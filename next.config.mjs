/** @type {import('next').NextConfig} */
const nextConfig = {
    output: "export",
    images: {
        unoptimized: true,
    },
    distDir: 'dist',
    basePath: '/artistic-essence',
    assetPrefix: '/artistic-essence/',
    experimental: {
        appDir: true
    }
};

export default nextConfig;
