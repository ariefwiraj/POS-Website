import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["@base-ui/react"],
  // Allow mobile device on local network to access dev server
  allowedDevOrigins: ["192.168.1.3", "localhost", "127.0.0.1"],
};

export default nextConfig;
