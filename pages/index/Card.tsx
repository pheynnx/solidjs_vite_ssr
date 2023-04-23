import { Post } from "@prisma/client";
import { Component, For } from "solid-js";
import date from "date-and-time";

interface Props {
  post: Post;
}

const Card: Component<Props> = (props) => {
  return (
    <div class="card">
      <div class="card-header-info">
        <div>
          <span class="card-date">
            {date.format(new Date(props.post.date), "MMMM D, YYYY")}
          </span>
        </div>
        <div class="card-header">
          <a class="card-header-anchor" href={`/blog/${props.post.slug}`}>
            <span class="card-title">{props.post.title}</span>
          </a>
        </div>
        <div>
          <span class="card-snippet">{props.post.snippet}</span>
        </div>
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
