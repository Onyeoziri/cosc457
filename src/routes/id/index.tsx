import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/id/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <>
      <h2>Hello "/id/"!</h2>
    </>
  );
}
