/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            hostname: 'www.allrecipes.com',
          },
          {
            hostname: 'www.bonappetit.com',
          },
          {
            hostname: 'www.seriouseats.com',
          },
        ],
      },
}

module.exports = nextConfig
