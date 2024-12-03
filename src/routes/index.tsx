import SideBar from "@/components/navigation/SideBar";
import { getBusinessesTable } from "@/utils/table";
import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { ColumnDef, flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";

import { useState, useEffect } from "react";
import { supabase } from "@/utils/supabase";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DataTable } from "@/components/table_logic/data-table";
import { columns } from "@/components/table_logic/columns";

export const Route = createFileRoute("/")({
  component: HomeComponent,
});

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

function HomeComponent() {
  const businessType = {
    id: "",
    name: "",
    address: "",
    phone_number: 0,
  };

  const accountType = {
    id: "",
    email: "",
    password: "",
    account_type: "",
    business_affiliated: "",
    company_role: "",
  };

  const { data, isLoading, error } = useQuery({
    queryKey: ["businesses"],
    queryFn: async () => {
      const { data, error } = await supabase.from("Accounts").select("*");
      console.log("Data:", data);
      if (error) throw error;

      return data;
    },
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {(error as Error).message}</p>;

  return (
    <div className="p-2">
      <h2>Using this to test database connection & tables</h2>
      <DataTable type={accountType} data={data || []} />
      <p>{JSON.stringify(data, null, 2)}</p>

      <hr />
      <SideBar />
    </div>
  );
}
