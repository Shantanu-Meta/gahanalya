/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        formats:['image/webp', 'image/avif'],
        remotePatterns:[
            {
                protocol:'https',
                hostname:'**'
            }
        ]
    },
    env: {
        NEXT_BASE_URL: process.env.NEXT_BASE_URL,
    }
    
};

export default nextConfig;

