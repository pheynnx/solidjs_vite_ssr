import { Component, For } from "solid-js";

interface Props {
  posts: any;
}

const Page: Component<Props> = (props) => {
  // console.log(props);

  return (
    <>
      <h1>Welcome</h1>
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
    </>
  );
};

export { Page };
