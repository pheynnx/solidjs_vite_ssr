import { createSignal } from "solid-js";
import { hydrate, render as solidRender } from "solid-js/web";
import { PageLayout } from "./PageLayout";
import type { Route } from "./PageLayout";
import type { PageContextBuiltInClientWithServerRouting as PageContextBuiltInClient } from "vite-plugin-ssr/types";
import type { PageContext } from "./types";
import { PageContextProvider } from "./usePageContext";

let layoutReady = false;

const [route, setRoute] = createSignal<Route | null>(null);

async function render(pageContext: PageContextBuiltInClient & PageContext) {
  const content = document.getElementById("root") as HTMLElement;
  const { Page, pageProps } = pageContext;

  // CLIENT SIDE ROUTING MIDDLEWARE
  // new Promise((res) =>
  //   setTimeout(() => {
  //     console.log("CLIENT", pageContext.urlOriginal);
  //     return res;
  //   }, 2000)
  // );

  setRoute({ Page, pageProps });

  if (content.innerHTML === "" || !pageContext.isHydration) {
    if (content.innerHTML !== "") {
      if (!layoutReady) {
        hydrate(() => <PageLayout route={() => route()} />, content!);
        layoutReady = true;
      }
    } else {
      solidRender(
        () => (
          <PageContextProvider pageContext={pageContext}>
            <h3>solidRender</h3>
            <Page {...pageProps} />
          </PageContextProvider>
        ),
        content!
      );
    }
  } else {
    if (!layoutReady) {
      hydrate(() => <PageLayout route={() => route()} />, content!);
      layoutReady = true;
    }
  }
}

export { render };
export const clientRouting = true;
