import { Component, For, createSignal, onMount } from "solid-js";
import { usePageContext } from "../../renderer/PageLayout";

interface Props {
  posts: any;
}

const Page: Component<Props> = (props) => {
  const pageContext = usePageContext();

  const [value, setValue] = createSignal(Math.floor(Math.random() * 101));
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
      <button onClick={() => setValue((p) => Math.floor(Math.random() * 101))}>
        Randomize
      </button>
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
