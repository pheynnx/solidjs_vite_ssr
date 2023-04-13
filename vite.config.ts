import solid from "vite-plugin-solid";
import ssr from "vite-plugin-ssr/plugin";
import { UserConfig } from "vite";
import path from "path";

const config: UserConfig = {
  plugins: [solid({ ssr: true }), ssr()],
  build: {
    // @ts-ignore
    polyfillDynamicImport: false,
  },
  resolve: {
    alias: {
      "~/": path.resolve(__dirname, "./*"),
    },
  },
};

export default config;
