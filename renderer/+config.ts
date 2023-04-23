import { Config } from "vite-plugin-ssr/types";

export default {
  passToClient: [
    "pageProps",
    "documentProps",
    "headers",
    "redirectTo",
    "routeParams",
  ],
  clientRouting: true,
  hydrationCanBeAborted: true,
  includeAssetsImportedByServer: true,
} satisfies Config;
