import date from "date-and-time";
import { Component, For } from "solid-js";

import { usePageContext } from "@/PageLayout";
import { Post } from "@prisma/client";

interface Props {
  post: Post;
}

const Page: Component<Props> = (props) => {
  return (
    <div class="blog-container">
      <div class="markdown-container">
        <h3>{props.post.title}</h3>
        <h5>{date.format(new Date(props.post.date), "MMMM D, YYYY")}</h5>
        <h5>{props.post.series}</h5>
        <For each={props.post.categories} fallback={<></>}>
          {(category, index) => <span>{category}</span>}
        </For>
        <div innerHTML={props.post.markdown}></div>
      </div>
    </div>
  );
};

export default Page;
