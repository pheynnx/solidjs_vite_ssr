import { Post } from "@prisma/client";
import { Component, For } from "solid-js";

interface Props {
  post: Post;
}

const Card: Component<Props> = (props) => {
  return (
    <div class="card">
      <div class="card-header-info">
        <div class="card-header">
          <a class="card-header-anchor" href={`/blog/${props.post.slug}`}>
            <span class="card-title">{props.post.title}</span>
          </a>
        </div>
        <span class="card-date">
          {new Date(props.post.date).toDateString()}
        </span>
      </div>
      <span class="card-categories">
        <For each={props.post.categories} fallback={<></>}>
          {(category, _index) => (
            <a class="card-category" href={`/category/${category}`}>
              <span class="card-category-info">{category}</span>
            </a>
          )}
        </For>
      </span>
    </div>
  );
};

export default Card;
