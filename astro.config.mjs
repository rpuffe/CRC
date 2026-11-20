import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite";

// Static output for S3 + CloudFront. `format: "file"` keeps the existing
// URLs (/projects.html) so nothing that links to the site breaks.
export default defineConfig({
  site: "https://robertpuffe.com",
  build: { format: "file" },
  integrations: [react()],
  vite: { plugins: [tailwindcss()] },
});
