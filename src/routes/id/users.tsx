import { DataTable } from "@/components/table_logic/data-table";
import { supabase } from "@/utils/supabase";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/id/users")({
  component: RouteComponent,
});

function RouteComponent() {
  const accountType = {
    id: "",
    email: "",
    password: "",
    account_type: "",
    business_affiliated: "",
    company_role: "",
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
      <h1>Hello "/id/users"!</h1>
      <DataTable type={accountType} data={data || []} />
    </div>
  );
}
