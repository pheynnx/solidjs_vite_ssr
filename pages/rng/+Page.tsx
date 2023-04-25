import { Component, createSignal, onMount } from "solid-js";

import { usePageContext } from "@/PageLayout";

const Page: Component = () => {
  //   const pageContext = usePageContext();
  const [value, setValue] = createSignal(0);

  return (
    <div class="main-container">
      <h1>{value()}</h1>
      <button
        class="button"
        onClick={() => setValue((p) => Math.floor(Math.random() * 101))}
      >
        Randomize
      </button>
    </div>
  );
};

export default Page;
