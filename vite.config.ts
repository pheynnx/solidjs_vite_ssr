import solidPluigin from "vite-plugin-solid";
import ssr from "vite-plugin-ssr/plugin";
import { UserConfig } from "vite";
import path from "path";

const config: UserConfig = {
  resolve: {
    alias: {
      "~": __dirname,
      "@": path.resolve(__dirname, "./renderer"),
    },
  },
  plugins: [solidPluigin({ ssr: true, solid: { hydratable: true } }), ssr()],
  build: {
    // @ts-ignore
    polyfillDynamicImport: false,
  },
};

export default config;
