import hljs from "highlight.js";
import MarkdownIt from "markdown-it";
import { default as anchorPlugin } from "markdown-it-anchor";
import { getRedisCache } from "~/server/db/redis";

import { PageContext } from "@/types";
import { Post } from "@prisma/client";

async function onBeforeRender(pageContext: PageContext) {
  const slug = pageContext.routeParams.slug;

  const cache = (await getRedisCache()) || "";

  const posts = JSON.parse(cache) as Post[];

  const post = posts.find((p) => p.slug === slug);

  let pageProps;

  const md = MarkdownIt({
    html: true,
    linkify: true,
    typographer: true,
    highlight: function (str, lang) {
      if (lang && hljs.getLanguage(lang)) {
        try {
          return hljs.highlight(str, { language: lang }).value;
        } catch (__) {}
      }

      return ""; // use external default escaping
    },
  }).use(anchorPlugin);

  if (post) {
    post.markdown = md.render(post.markdown);
    pageProps = { post };
  }

  return {
    pageContext: {
      pageProps,
    },
  };
}

export default onBeforeRender;
