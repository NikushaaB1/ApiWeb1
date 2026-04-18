/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: 'export', // <-- ეს წაშალე!
  images: {
    // unoptimized: true, // <-- თუ Vercel-ს იყენებ, ესეც შეგიძლია წაშალო, სურათები უკეთესი იქნება
    remotePatterns: [
      { protocol: 'https', hostname: 'image.tmdb.org' },
      { protocol: 'https', hostname: 'via.placeholder.com' },
    ],
  },
}
module.exports = nextConfig