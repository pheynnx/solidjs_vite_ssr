export function onBeforeRender() {
  console.log("here");

  return {
    pageContext: {
      documentProps: {
        title: "Admin EC",
      },
    },
  };
}
