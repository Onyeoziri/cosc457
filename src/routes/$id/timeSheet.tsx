import { DataTable } from "@/components/table_logic/data-table";
import { supabase } from "@/utils/supabase";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/$id/timeSheet")({
  component: RouteComponent,
});

function RouteComponent() {
  const timeSheetType = {
    id: "",
    hoursWorked: "",
    workDate: "",
    staff_id: "",
  };

  const { data, isLoading, error } = useQuery({
    queryKey: ["timeSheet"],
    queryFn: async () => {
      const { data, error } = await supabase.from("TimeSheet").select("*");
      if (error) throw error;

      return data;
    },
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {(error as Error).message}</p>;

  return (
    <div>
      <div className="text-center mb-6">
        <h1 className="text-4xl mb-4">Purchased Items</h1>
        <p>A little Discription</p>
      </div>

      <DataTable type={timeSheetType} data={data || []} />
    </div>
  );
}
