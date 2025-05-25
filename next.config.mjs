/** @type {import('next').NextConfig} */
const nextConfig = {
    output: "export",
    images: {
        unoptimized: true,
    },
    basePath: '/artistic-essence',
    assetPrefix: '/artistic-essence/',
};

export default nextConfig;
