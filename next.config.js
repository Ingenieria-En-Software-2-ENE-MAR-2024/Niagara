/** @type {import('next').NextConfig} */
const nextConfig = {
    async headers() {
        return [
            {
                // Match all routes
                source:"/api/:path*",
                headers: [
                    { key: "Access-Control-Allow-Origin", value: "*" },
                    { key: "Access-Control-Allow-Methods", value: "GET, POST, PUT, DELETE, OPTIONS" },
                    { key: "Access-Control-Allow-Headers", value: "X-Requested-With, Content-Type, Accept, Origin" },
                    { key: "Access-Control-Allow-Credentials", value: "true" }
                ]
            }
        ]
    }
}

module.exports = nextConfig
