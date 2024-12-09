import { DataTable } from "@/components/table_logic/data-table";
import { accountsAtom } from "@/store/auth";
import { supabase } from "@/utils/supabase";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { useAtom } from "jotai";

export const Route = createFileRoute("/$id/wasteRecord")({
  component: RouteComponent,
});

function RouteComponent() {
  const { id } = Route.useParams();
  const [accountsResult] = useAtom(accountsAtom);

  const wasteRecordType = {
    id: "",
    IngredientId: "",
    WasteDate: "",
    Quantity: 0,
  };

  const { data, isLoading, error } = useQuery({
    queryKey: ["wasteRecordType"],
    queryFn: async () => {
      const { data, error } = await supabase.from("WasteRecord").select("*");
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
        <h1 className="text-4xl mb-4">WasteRecord</h1>
        <p>view ...</p>
      </div>

      <DataTable type={wasteRecordType} data={data || []} />
    </div>
  );
}
