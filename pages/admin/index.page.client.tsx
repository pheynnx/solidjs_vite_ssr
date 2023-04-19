import { Component, createSignal, onMount } from "solid-js";
import { usePageContext } from "@/PageLayout";

const Page: Component = (props) => {
  const pageContext = usePageContext();
  const [values, setValues] = createSignal<any[]>();

  onMount(async () => {
    const response = await fetch("/api/admin/test");
    const { data } = await response.json();
    setValues(data);
  });

  return (
    <div>
      <span>{Math.floor(Math.random() * 101)}</span>
      <span>{values()}</span>
    </div>
  );
};

export { Page };
