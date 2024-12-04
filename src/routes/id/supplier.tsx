import { DataTable } from "@/components/table_logic/data-table";
import { supabase } from "@/utils/supabase";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/id/supplier")({
  component: RouteComponent,
});

function RouteComponent() {
  const supplierType = {
    id: "",
    name: "",
    contactInfo: "",
  };

  const { data, isLoading, error } = useQuery({
    queryKey: ["suppliers"],
    queryFn: async () => {
      const { data, error } = await supabase.from("Supplier").select("*");
      if (error) throw error;

      return data;
    },
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {(error as Error).message}</p>;

  return (
    <div>
      <h1>Hello "/id/suppliers"!</h1>
      <DataTable type={supplierType} data={data || []} />
    </div>
  );
}
