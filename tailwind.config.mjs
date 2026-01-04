/** @type {import('next').NextConfig} */
const nextConfig = {
  theme: {
    extend: {
      fontFamily: {
        quincy: ["var(--font-quincy)", "serif"],
        sans: ["var(--font-geist-sans)"],
        mono: ["var(--font-geist-mono)"],
      },
    },
  },
};

export default nextConfig;