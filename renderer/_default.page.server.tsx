import { generateHydrationScript, renderToStream } from "solid-js/web";
import {
  escapeInject,
  dangerouslySkipEscape,
  stampPipe,
} from "vite-plugin-ssr/server";
import type { PageContextBuiltInClientWithServerRouting as PageContextBuiltInClient } from "vite-plugin-ssr/types";
import { PageContext } from "./types";

import "./main.scss";
import { PageContextProvider } from "./usePageContext";

// See https://vite-plugin-ssr.com/data-fetching
const passToClient = ["pageProps", "documentProps", "headers"];

function render(pageContext: PageContextBuiltInClient & PageContext) {
  console.log("[SERVER RENDER]");

  const { Page, pageProps } = pageContext;

  // See https://vite-plugin-ssr.com/head
  const { documentProps, headers } = pageContext;
  const title = (documentProps && documentProps.title) || "Vite SSR app";
  const description =
    (documentProps && documentProps.description) ||
    "App using Vite + vite-plugin-ssr";

  // @ts-ignore
  // Page will be undefined is page is client side only
  if (Page) {
    const { pipe } = renderToStream(() => (
      <PageContextProvider
        pageContex={pageContext}
        route={() => ({
          Page,
          pageProps,
        })}
      >
        <Page {...pageProps} />
      </PageContextProvider>
    ));
    stampPipe(pipe, "node-stream");

    return htmlInjection(description, title, true, pipe);
  } else {
    return htmlInjection(description, title, false, "");
  }
}

// Maybe pass <noscript> some how?
const htmlInjection = (
  description: string,
  title: string,
  scripts: boolean,
  pipe: ((writable: { write: (v: string) => void }) => void) | ""
) => {
  return escapeInject`<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content="${description}" />
    <title>${title}</title>
    ${dangerouslySkipEscape(generateHydrationScript())}
  </head>
  <body>
    <div id="root">${pipe}</div>
  </body>
</html>`;
};

export { render };
export { passToClient };
