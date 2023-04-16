import { generateHydrationScript, renderToStream } from "solid-js/web";
import { PageLayout } from "./PageLayout";
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

  console.log(Page);

  // @ts-ignore
  if (Page) {
    const { pipe } = renderToStream(() => (
      <PageContextProvider
        count={7}
        route={() => ({
          Page,
          pageProps,
        })}
      >
        <Page {...pageProps} />
      </PageContextProvider>
    ));
    stampPipe(pipe, "node-stream");

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
  } else {
    return escapeInject`<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="${description}" />
        <title>${title}</title>
      </head>
      <body>
        <div id="root"></div>
        <noscript>Enable JavaScript in your browser</noscript>
      </body>
    </html>`;
  }
}

export { render };
export { passToClient };
