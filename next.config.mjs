/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ["images.archive-digger.com", "img-s-msn-com.akamaized.net", "content-cdn.readbakery.com","img.teknolojioku.com"],
        remotePatterns: [ {
            protocol: 'https',
            hostname: 'img.clerk.com',
            port: '',        
        },],
    },
};

export default nextConfig;
