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

export const Route = createFileRoute("/")({
  component: HomeComponent,
});

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

function HomeComponent() {
  return (
    <div className="p-2">
      <h2>Using this to test database connection & tables</h2>
    </div>
  );
}
