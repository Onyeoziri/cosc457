import { DataTable } from "@/components/table_logic/data-table";
import { supabase } from "@/utils/supabase";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/$id/users")({
  component: RouteComponent,
});

function RouteComponent() {
  const { id } = Route.useParams();

  const accountType = {
    id: "",
    email: "",
    password: "",
    accountType: "",
    businessAffiliated: 0,
    companyRole: "",
  };

  const { data, isLoading, error } = useQuery({
    queryKey: ["accounts"],
    queryFn: async () => {
      const { data, error } = await supabase.from("Accounts").select("*");
      if (error) throw error;

      return data;
    },
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {(error as Error).message}</p>;

  return (
    <div>
      <div className="text-center mb-6">
        <h1 className="text-4xl mb-4">Users</h1>
        <p>Admin view only</p>
      </div>

      <DataTable type={accountType} data={data || []} />
    </div>
  );
}
