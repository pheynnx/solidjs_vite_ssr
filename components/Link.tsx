import { usePageContext } from "@/PageLayout";

export default function Link(props: any) {
  const pageContext = usePageContext();

  const className = [
    props.class,
    pageContext.urlPathname === props.href && "active",
  ]
    .filter(Boolean)
    .join(" ");

  return <a {...props} class={className} />;
}
