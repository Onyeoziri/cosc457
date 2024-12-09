import { DataTable } from "@/components/table_logic/data-table";
import { supabase } from "@/utils/supabase";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/$id/owner")({
  component: RouteComponent,
});

function RouteComponent() {
  const ownerType = {
    id: "",
    LastName: "",
    RestaurantId: "",
    FirstName: "",
  };

  const { data, isLoading, error } = useQuery({
    queryKey: ["owner"],
    queryFn: async () => {
      const { data, error } = await supabase.from("Owner").select("*");
      if (error) throw error;

      return data;
    },
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {(error as Error).message}</p>;

  return (
    <div>
      <div className="text-center mb-6">
        <h1 className="text-4xl mb-4">Owners</h1>
        <p>A little Discription</p>
      </div>

      <DataTable type={ownerType} data={data || []} />
    </div>
  );
}
