import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // The design system ships TSX source; transpile it in the app build.
  transpilePackages: ["@xpndui/ui"],
};

export default nextConfig;
