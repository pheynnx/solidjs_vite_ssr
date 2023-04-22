import { Component } from "solid-js";
import { usePageContext } from "@/PageLayout";

const Page: Component = () => {
  const pageContext = usePageContext();

  return (
    <>
      <h1>Series</h1>
      <p>A vite-plugin-ssr app using Solid.</p>
    </>
  );
};

export default Page;
