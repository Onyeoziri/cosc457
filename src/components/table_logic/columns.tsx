import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Business = {
  id: string;
  name: string;
  address: string;
  phone_number: number;
};
export function generateColumns<T extends object>(type: T): ColumnDef<T>[] {
  // First create the select column
  const selectColumn: ColumnDef<T> = {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  };

  // Then generate columns for each key
  const dataColumns: ColumnDef<T>[] = Object.keys(type).map((key) => {
    if (key === "email" || key === "name") {
      return {
        accessorKey: key,
        header: ({ column }) => (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            {key.charAt(0).toUpperCase() + key.slice(1)}
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        ),
      };
    }

    return {
      accessorKey: key,
      header: key.charAt(0).toUpperCase() + key.slice(1),
    };
  });

  // Return combined array with select column first
  return [selectColumn, ...dataColumns];
}
