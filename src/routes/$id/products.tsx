import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/$id/products")({
  component: RouteComponent,
});

function RouteComponent() {
  const { id } = Route.useParams();

  return (
    <div>
      {" "}
      <h1 className="text-center text-4xl mb-6">Products</h1>
    </div>
  );
}
