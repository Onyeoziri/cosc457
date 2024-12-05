import { createFileRoute, useParams } from "@tanstack/react-router";
import { isAuthenticatedAtom, checkAuthStatus, accountsAtom } from "@/store/auth";
import { useAtom } from "jotai";
import { atomWithQuery } from "jotai-tanstack-query";
import { supabase } from "@/utils/supabase";

export const Route = createFileRoute("/$id/")({
  component: RouteComponent,
});

function RouteComponent() {
  const { id } = Route.useParams();
  const [accounts] = useAtom(accountsAtom);
  const [accountsResult] = useAtom(accountsAtom);

  // Handle loading
  if (accountsResult.isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  // Handle error
  if (accountsResult.isError) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-red-500">Error loading user data</div>
      </div>
    );
  }

  // Handle no data
  if (!accountsResult.data) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-red-500">No user data available</div>
      </div>
    );
  }

  // Find the current user's data from the accounts query
  const currentUser = accountsResult.data.find((account) => account.id.toString() === id);
  console.log("Current User:", currentUser);

  if (!currentUser) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="px-4 py-5 sm:p-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Welcome!</h1>
          <div className="space-y-4">
            <div className="border-b border-gray-200 pb-4">
              <p className="text-sm font-medium text-gray-500">Email</p>
              <p className="mt-1 text-lg text-gray-900">{currentUser.email}</p>
            </div>
            <div className="border-b border-gray-200 pb-4">
              <p className="text-sm font-medium text-gray-500">Account Type</p>
              <p className="mt-1 text-lg text-gray-900">{currentUser.accountType}</p>
            </div>
            <div className="border-b border-gray-200 pb-4">
              <p className="text-sm font-medium text-gray-500">Company Role</p>
              <p className="mt-1 text-lg text-gray-900">{currentUser.companyRole}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Business</p>
              <p className="mt-1 text-lg text-gray-900">{currentUser.businessAffiliated}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
