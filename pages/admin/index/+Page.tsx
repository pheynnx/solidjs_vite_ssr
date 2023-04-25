import { Component } from "solid-js";

import { usePageContext } from "@/PageLayout";

const Page: Component = () => {
  const pageContext = usePageContext();

  return (
    <div class="main-container">
      <h3>Admin</h3>
      <h4>SPA</h4>
    </div>
  );
};

export default Page;
