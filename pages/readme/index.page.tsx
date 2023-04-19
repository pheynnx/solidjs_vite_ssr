import { Component } from "solid-js";
import { usePageContext } from "@/PageLayout";

const Page: Component = () => {
  const pageContext = usePageContext();

  return (
    <>
      <h1>Readme</h1>
      <p>A vite-plugin-ssr app using Solid.</p>
    </>
  );
};

export { Page };

export function onBeforeRender() {
  return {
    pageContext: {
      documentProps: {
        title: "Readme.md",
      },
    },
  };
}
