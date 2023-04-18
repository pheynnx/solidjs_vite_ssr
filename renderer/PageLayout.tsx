import { Component, JSX, createContext, useContext } from "solid-js";
import { PageContextBuiltInClientWithServerRouting as PageContextBuiltInClient } from "vite-plugin-ssr/types";
import { PageContext } from "./types";

import "./styles/main.scss";

const Context = createContext<PageContextBuiltInClient & PageContext>(
  {} as PageContextBuiltInClient & PageContext
);

interface Props {
  pageContext: PageContextBuiltInClient & PageContext;
  navigation: boolean;
  children: JSX.Element;
}

const PageContextProvider: Component<Props> = (props) => {
  return (
    <Context.Provider value={props.pageContext}>
      {props.navigation && <Navigation />}
      {props.children}
    </Context.Provider>
  );
};

const Navigation: Component = () => {
  return (
    <nav>
      <a href="/">Home</a>
      <a href="/series">Series</a>
      <a href="/readme">Readme.md</a>
    </nav>
  );
};

function usePageContext() {
  return useContext(Context);
}

export { PageContextProvider };
export { usePageContext };
