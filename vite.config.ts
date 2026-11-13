import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  envPrefix: ["VITE_", "NEXT_PUBLIC_SUPABASE_"], // la integració de Vercel amb Supabase crea variables NEXT_PUBLIC_*
  plugins: [react(), tailwindcss()],
  define: {
    __BUILD__: JSON.stringify(new Date().toISOString().slice(0, 16).replace("T", " ")),
    __VERSION__: JSON.stringify("6.0.0")
  },
  test: { environment: "node", include: ["src/**/*.test.ts"] }
});
