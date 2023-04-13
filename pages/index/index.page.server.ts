import { PageContext } from "~/renderer/types";
import { getRedisCache } from "../../server/db/redis";

async function onBeforeRender(pageContext: PageContext) {
  // console.log(pageContext.headers);

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
        title: "Taco",
      },
    },
  };
}

export { onBeforeRender };
