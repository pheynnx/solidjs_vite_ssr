import { Component, For } from "solid-js";
import { usePageContext } from "@/PageLayout";

import { Post } from "@prisma/client";
import Card from "./Card";

interface Props {
  posts: Post[];
}

const Page: Component<Props> = (props) => {
  const pageContext = usePageContext();

  return (
    <div class="main-container">
      <div class="cards-container">
        <div class="featured-posts">
          <For each={props.posts.filter((p) => p.featured)} fallback={<></>}>
            {(post, _index) => <Card post={post} />}
          </For>
        </div>
        <For each={props.posts.filter((p) => !p.featured)} fallback={<></>}>
          {(post, _index) => <Card post={post} />}
        </For>
      </div>
    </div>
  );
};

export { Page };
