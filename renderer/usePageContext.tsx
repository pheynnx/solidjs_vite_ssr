import { JSXElement, createContext, createSignal, useContext } from "solid-js";
import { PageContextBuiltInClientWithServerRouting as PageContextBuiltInClient } from "vite-plugin-ssr/types";
import { PageContext } from "./types";

const Context = createContext();

function PageContextProvider({
  value,
  children,
}: {
  value: PageContextBuiltInClient & PageContext;
  children: any;
}) {
  return <Context.Provider value={value}>{children}</Context.Provider>;
}

function usePageContext() {
  return useContext(Context);
}

export { PageContextProvider };
export { usePageContext };
