import { Component, For, createSignal, onMount } from "solid-js";
import { usePageContext } from "@/PageLayout";

interface Props {
  posts: any;
}

const Page: Component<Props> = (props) => {
  const pageContext = usePageContext();

  return (
    <div>
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
