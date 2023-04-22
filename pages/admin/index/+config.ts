import { Config } from "vite-plugin-ssr/types";

export default {
  meta: {
    Page: {
      env: "client-only",
    },
  },
} satisfies Config;
