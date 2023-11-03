/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
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
          {
            hostname: 'www.delish.com',
          },
          {
            hostname: 'hips.hearstapps.com',
          },
          {
            hostname: 'assets.bonappetit.com',
          },
        ],
      },
}

module.exports = nextConfig
