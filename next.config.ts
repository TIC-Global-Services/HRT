import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  async redirects() {
    return [
      {
        source: "/about",
        destination: "/about-us",
        permanent: true,
      },
      {
        source: "/insights",
        destination: "/insight",
        permanent: true,
      },
      {
        source: "/solutions",
        destination: "/solution-hub",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
