import { DataTable } from "@/components/table_logic/data-table";
import { supabase } from "@/utils/supabase";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/$id/purchaseOrder")({
  component: RouteComponent,
});

function RouteComponent() {
  const purchaseOrderType = {
    id: "",
    supplierId: "",
    orderDate: "",
  };

  const { data, isLoading, error } = useQuery({
    queryKey: ["purchaseOrders"],
    queryFn: async () => {
      const { data, error } = await supabase.from("PurchaseOrder").select("*");
      if (error) throw error;

      return data;
    },
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {(error as Error).message}</p>;

  return (
    <div>
      <div className="text-center text-4xl mb-6">
        <h1>Purchased Items</h1>
        <p>A little Discription</p>
      </div>

      <DataTable type={purchaseOrderType} data={data || []} />
    </div>
  );
}
