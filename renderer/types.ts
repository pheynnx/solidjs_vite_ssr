import { IncomingHttpHeaders } from "http";
import { Component } from "solid-js";
import type { PageContextBuiltIn } from "vite-plugin-ssr/types";

type Page = Component<PageProps>;

export type PageProps = {};

export type PageContext = PageContextBuiltIn<Page> & {
  pageProps: PageProps;
  headers: IncomingHttpHeaders;
  redirectTo?: string;
  documentProps?: {
    title?: string;
    description?: string;
  };
};
