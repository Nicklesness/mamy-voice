import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  serverExternalPackages: [
    "@prisma/adapter-pg",
    "@auth/prisma-adapter",
    "bcryptjs",
  ],
};

export default nextConfig;
