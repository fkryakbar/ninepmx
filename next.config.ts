import type { NextConfig } from "next";
import { projectImageBase } from "./lib/project-images";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [{
      protocol: projectImageBase.protocol === "http:" ? "http" : "https",
      hostname: projectImageBase.hostname,
      port: projectImageBase.port,
      pathname: `${projectImageBase.pathname.replace(/\/$/, "")}/**`,
      search: "",
    }],
  },
};

export default nextConfig;
