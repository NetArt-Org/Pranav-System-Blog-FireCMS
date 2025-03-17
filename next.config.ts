import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    async redirects() {
        return [
            {
                source: "/",
                destination: "/cms",
                permanent: false
            }
        ]
    }
};

export default nextConfig;
