import { DataTable } from "@/components/table_logic/data-table";
import { supabase } from "@/utils/supabase";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/$id/ingredient")({
  component: RouteComponent,
});

function RouteComponent() {
  const ingredientType = {
    id: "",
    name: "",
    qauntity: "",
    unit: "",
  };

  const { data, isLoading, error } = useQuery({
    queryKey: ["ingredient"],
    queryFn: async () => {
      const { data, error } = await supabase.from("Ingredient").select("*");
      if (error) throw error;

      return data;
    },
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {(error as Error).message}</p>;

  return (
    <div>
      <h1 className="text-center text-4xl mb-6">Ingredient</h1>

      <DataTable type={ingredientType} data={data || []} />
    </div>
  );
}
