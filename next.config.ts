import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["minio.ksc036.store"], // 👈 여기에 추가
  },
  /* config options here */
};

export default nextConfig;
