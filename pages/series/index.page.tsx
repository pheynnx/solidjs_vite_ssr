import { Component } from "solid-js";
import { usePageContext } from "../../renderer/PageLayout";

const Page: Component = () => {
  const pageContext = usePageContext();

  return (
    <>
      <h1>Series</h1>
      <p>A vite-plugin-ssr app using Solid.</p>
    </>
  );
};

export { Page };

export function onBeforeRender() {
  return {
    pageContext: {
      documentProps: {
        title: "Series",
      },
    },
  };
}
