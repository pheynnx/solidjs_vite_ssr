import { Component, createSignal, onMount } from "solid-js";
import { usePageContext } from "@/PageLayout";

const Page: Component = () => {
  //   const pageContext = usePageContext();
  const [value, setValue] = createSignal(0);
  const [version, setVersion] = createSignal("");

  onMount(async () => {
    const response = await fetch(
      "https://api.github.com/repos/ericarthurc/ericarthurc.com/commits"
    );
    const data = await response.json();
    setVersion(data[0].commit.message.split(" ")[0]);
  });

  return (
    <div>
      <h1>{value()}</h1>
      <button onClick={() => setValue((p) => Math.floor(Math.random() * 101))}>
        Randomize
      </button>
      {version()}
    </div>
  );
};

export { Page };

export function onBeforeRender() {
  return {
    pageContext: {
      documentProps: {
        title: "RNG",
      },
    },
  };
}
