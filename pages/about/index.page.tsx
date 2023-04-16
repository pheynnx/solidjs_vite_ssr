import { Component } from "solid-js";
import { usePageContext } from "../../renderer/usePageContext";

const Page: Component = () => {
  const pageContext = usePageContext();
  console.log("CONTEXT", pageContext);

  return (
    <>
      <h1>About</h1>
      <p>A vite-plugin-ssr app using Solid.</p>
    </>
  );
};

export { Page };

export function onBeforeRender() {
  return {
    pageContext: {
      documentProps: {
        title: "About",
      },
    },
  };
}
