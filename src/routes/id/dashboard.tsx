import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/id/dashboard")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/id/dashboard"!</div>;
}
