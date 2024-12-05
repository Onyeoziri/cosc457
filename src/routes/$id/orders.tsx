import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/$id/orders")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      {" "}
      <h1 className="text-center text-4xl mb-6">Businesses</h1>
    </div>
  );
}
