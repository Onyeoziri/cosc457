import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/$id/assetMaintenance")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <h1 className="text-center text-4xl mb-6">Asset Maintance</h1>
    </div>
  );
}
