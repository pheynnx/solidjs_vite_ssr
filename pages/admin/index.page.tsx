export function onBeforeRender() {
  return {
    pageContext: {
      redirectTo: "/admin/login",
      documentProps: {
        title: "Admin EC",
      },
    },
  };
}
