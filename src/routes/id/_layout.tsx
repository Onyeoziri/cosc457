import { Sidebar } from "@/components/ui/sidebar";
import { Outlet, createFileRoute, createRootRoute } from "@tanstack/react-router";

export const Route = createRootRoute({
  component: IdLayoutComponent,
});

function IdLayoutComponent() {
  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-grow">
        <Outlet />
      </main>
    </div>
  );
}
