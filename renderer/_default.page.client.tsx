import { createSignal } from "solid-js";
import { hydrate, render as solidRender } from "solid-js/web";
import { PageLayout } from "./PageLayout";
import type { Route } from "./PageLayout";
import type { PageContextBuiltInClientWithServerRouting as PageContextBuiltInClient } from "vite-plugin-ssr/types";
import type { PageContext } from "./types";
import { PageContextProvider } from "./usePageContext";

let dispose: () => void;

const [route, setRoute] = createSignal<Route | null>(null);

async function render(pageContext: PageContextBuiltInClient & PageContext) {
  console.log("[CLIENT RENDER]");

  const content = document.getElementById("root") as HTMLElement;
  const { Page, pageProps, documentProps, headers } = pageContext;

  document.title = documentProps?.title || "Vite SSR app";

  // CLIENT SIDE ROUTING MIDDLEWARE
  // new Promise((res) =>
  //   setTimeout(() => {
  //     console.log("CLIENT", pageContext.urlOriginal);
  //     return res;
  //   }, 2000)
  // );

  setRoute({ Page, pageProps });

  if (dispose) dispose();

  if (pageContext.isHydration) {
    if (content.innerHTML === "") {
      dispose = solidRender(
        () => (
          <PageContextProvider route={() => route()} count={7}>
            <Page {...pageProps} />
          </PageContextProvider>
        ),
        content!
      );
    } else {
      dispose = hydrate(
        () => (
          <PageContextProvider route={() => route()} count={7}>
            <Page {...pageProps} />
          </PageContextProvider>
        ),
        content!
      );
    }
  } else {
    dispose = solidRender(
      () => (
        <PageContextProvider route={() => route()} count={7}>
          <Page {...pageProps} />
        </PageContextProvider>
      ),
      content!
    );
  }
}

export { render };
export const clientRouting = true;
