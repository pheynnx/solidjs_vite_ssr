import { getRedisCache } from "~/server/db/redis";

import { PageContext } from "@/types";

async function onBeforeRender(pageContext: PageContext) {
  const cache = await getRedisCache();

  let pageProps;
  if (cache) {
    const posts = JSON.parse(cache);
    pageProps = { posts };
  }

  return {
    pageContext: {
      pageProps,
      documentProps: {
        title: "Home",
      },
    },
  };
}

export default onBeforeRender;
