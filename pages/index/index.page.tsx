import { Component, For, createSignal, onMount } from "solid-js";
import { usePageContext } from "../../renderer/usePageContext";

interface Props {
  posts: any;
}

const Page: Component<Props> = (props) => {
  // console.log(props);
  const pageContext = usePageContext();
  console.log("CONTEXT", pageContext);
  console.log("CONTEXT TITLE", pageContext.documentProps?.title);

  const [value, setValue] = createSignal(1);
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
      {version()}
      <h1>{value()}</h1>
      <button onClick={() => setValue((p) => p + 1)}>Randomize</button>
      <For each={props.posts} fallback={<></>}>
        {(post, index) => (
          <div>
            <p>{post.title}</p>
            <p>{post.slug}</p>
            <p>{post.date}</p>
            <p>{post.series}</p>
          </div>
        )}
      </For>
    </div>
  );
};

export { Page };
