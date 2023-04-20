import { Component, For, Show, createSignal, onMount } from "solid-js";
import { usePageContext } from "@/PageLayout";

interface Props {
  posts: any;
}

const Page: Component<Props> = (props) => {
  const pageContext = usePageContext();

  return (
    <div class="main-container">
      <div class="cards-container">
        <For each={props.posts} fallback={<></>}>
          {(post, _index) => (
            <div class="card">
              <div class="card-header-info">
                <div class="card-header">
                  <a class="card-header-anchor" href={`/blog/${post.slug}`}>
                    <span class="card-title">{post.title}</span>
                  </a>
                </div>
                <span class="card-date">
                  {new Date(post.date).toDateString()}
                </span>
              </div>
              <span class="card-categories">
                <For each={post.categories} fallback={<></>}>
                  {(category, _index) => (
                    <a class="card-category" href={`/category/${category}`}>
                      <span class="card-category-info">{category}</span>
                    </a>
                  )}
                </For>
              </span>
            </div>
          )}
        </For>
      </div>
    </div>
  );
};

export { Page };
