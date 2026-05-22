/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com", // এখানে ডোমেইনের নাম বসবে
      },
    ],
  },
};

export default nextConfig;
