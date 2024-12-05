import SideBar from "@/components/navigation/SideBar";
import { Outlet, createFileRoute, Navigate } from "@tanstack/react-router";
import { useAtom } from "jotai";
import { accountsAtom, isAuthenticatedAtom } from "@/store/auth";

export const Route = createFileRoute("/$id")({
  component: IdLayoutComponent,
  loader: async ({ params }) => accountsAtom,
});

function IdLayoutComponent() {
  const [isAuthenticated] = useAtom(isAuthenticatedAtom);

  // If not authenticated, redirect to login
  if (!isAuthenticated) {
    return (
      <Navigate
        to="/login"
        search={{
          returnTo: "/$id",
        }}
      />
    );
  }

  return (
    <div
      className="flex h-screen w-screen gap-2 
"
    >
      <SideBar />
      <main className="flex-grow px-10 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
}
