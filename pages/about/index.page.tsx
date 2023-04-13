import { Component } from "solid-js";

const Page: Component = () => {
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
