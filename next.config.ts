import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  // 레포 이름이 portfolio라면 "/portfolio", username.github.io라면 ""
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || "",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
