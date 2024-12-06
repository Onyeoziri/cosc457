import { DataTable } from "@/components/table_logic/data-table";
import { supabase } from "@/utils/supabase";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/$id/inventory")({
  component: RouteComponent,
});

function RouteComponent() {
  const inventoryType = {
    id: "",
    restaurantId: "",
    name: "",
    LastChecked: 0,
    Quantity: "",
  };

  const { data, isLoading, error } = useQuery({
    queryKey: ["inventory"],
    queryFn: async () => {
      const { data, error } = await supabase.from("Inventory").select("*");
      if (error) throw error;

      return data;
    },
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {(error as Error).message}</p>;

  return (
    <div>
      <h1 className="text-center text-4xl mb-6">Inventory</h1>
      <DataTable type={inventoryType} data={data || []} />
    </div>
  );
}
