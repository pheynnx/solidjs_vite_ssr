import { createSignal } from "solid-js";
import { hydrate, render as solidRender } from "solid-js/web";
import type { PageContextBuiltInClientWithServerRouting as PageContextBuiltInClient } from "vite-plugin-ssr/types";
import type { PageContext } from "./types";
import { PageContextProvider, Route } from "./usePageContext";

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

  const layout = () => (
    <PageContextProvider pageContext={pageContext} route={() => route()}>
      <Page {...pageProps} />
    </PageContextProvider>
  );

  if (pageContext.isHydration) {
    if (content.innerHTML === "") {
      dispose = solidRender(() => layout(), content!);
    } else {
      dispose = hydrate(() => layout(), content!);
    }
  } else {
    dispose = solidRender(() => layout(), content!);
  }
}

export { render };
export const clientRouting = true;
