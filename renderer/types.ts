import { IncomingHttpHeaders } from "http";
import { Component } from "solid-js";

import type { PageContextBuiltIn } from "vite-plugin-ssr/types";

type Page = Component<PageProps>;

export type PageProps = {};

export type PageContext = PageContextBuiltIn<Page> & {
  pageProps: PageProps;
  headers: IncomingHttpHeaders;
  cookies: any;
  redirectTo?: string;
  themeSetter?: {
    theme: "dark" | "light";
    color: "green" | "blue" | "red" | "orange" | "pink" | "purple";
  };
  documentProps?: {
    title?: string;
    description?: string;
  };
};

export interface Route {
  Page: Component;
  pageProps: PageProps;
}
