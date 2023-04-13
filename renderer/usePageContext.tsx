import { createContext, useContext } from "solid-js";
import { PageContextBuiltInClientWithServerRouting as PageContextBuiltInClient } from "vite-plugin-ssr/types";
import { PageContext } from "./types";

export { PageContextProvider };
export { usePageContext };

const Context = createContext();

function PageContextProvider({
  pageContext,
  children,
}: {
  pageContext: PageContextBuiltInClient & PageContext;
  children: any;
}) {
  return <Context.Provider value={pageContext}>{children}</Context.Provider>;
}

function usePageContext() {
  const pageContext = useContext(Context);
  return pageContext;
}
