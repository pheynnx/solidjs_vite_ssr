import {
  Component,
  JSX,
  JSXElement,
  createContext,
  createSignal,
  useContext,
} from "solid-js";
import { PageContextBuiltInClientWithServerRouting as PageContextBuiltInClient } from "vite-plugin-ssr/types";
import { PageContext } from "./types";

const Context = createContext<number>(0);
// const Context = createContext<PageContextBuiltInClient & PageContext>(
//   {} as PageContextBuiltInClient & PageContext
// );

function PageContextProvider(props: { count: number; route: any }) {
  const renderedRoute = () => {
    const { Page, pageProps } = props.route() ?? {};
    return Page && <Page {...pageProps} />;
  };

  return (
    <Context.Provider value={props.count}>
      <>
        <nav>
          <a class="navitem" href="/">
            Home
          </a>
          <a class="navitem" href="/about">
            About
          </a>
          <a class="navitem" href="/admin">
            Admin
          </a>
          <a class="navitem" href="/system">
            System
          </a>
        </nav>
      </>
      <Content>{renderedRoute()}</Content>
    </Context.Provider>
  );
}

// interface Props {
//   route: Accessor<Route | null>;
// }

interface Children {
  children: JSX.Element;
}

const Content: Component<Children> = (props) => {
  return <div>{props.children}</div>;
};

function usePageContext() {
  return useContext(Context);
}

export { PageContextProvider };
export { usePageContext };
