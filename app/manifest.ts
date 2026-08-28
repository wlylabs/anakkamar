import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Project Sejengkal",
    short_name: "Sejengkal",
    description: "Cukup maju sedikit. Langkah kecil untuk mulai berkembang.",
    start_url: "/home",
    display: "standalone",
    orientation: "portrait",
    background_color: "#f6f0e2",
    theme_color: "#f6f0e2",
    icons: [
      { src: "/icon.svg", sizes: "any", type: "image/svg+xml", purpose: "any" },
      { src: "/icon-maskable.svg", sizes: "any", type: "image/svg+xml", purpose: "maskable" },
    ],
  };
}
