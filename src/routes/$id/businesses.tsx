import { DataTable } from "@/components/table_logic/data-table";
import { accountsAtom } from "@/store/auth";
import { supabase } from "@/utils/supabase";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { useAtom } from "jotai";

export const Route = createFileRoute("/$id/businesses")({
  component: RouteComponent,
});

function RouteComponent() {
  const { id } = Route.useParams();
  const [accountsResult, refresh] = useAtom(accountsAtom);

  const businessType = {
    id: "",
    name: "",
    address: "",
    phone_number: 0,
  };

  const { data, isLoading, error } = useQuery({
    queryKey: ["businesses"],
    queryFn: async () => {
      const { data, error } = await supabase.from("Businesses").select("*");
      console.log("Data:", data);
      if (error) throw error;

      return data;
    },
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {(error as Error).message}</p>;
  return (
    <div>
      <div className="text-center mb-6">
        <h1 className="text-4xl mb-4">Businesses</h1>
        <p>Admin view only</p>
      </div>

      <DataTable type={businessType} data={data || []} onDataChange={refresh} />
    </div>
  );
}
