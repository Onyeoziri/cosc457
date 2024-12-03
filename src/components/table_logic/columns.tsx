import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { Button } from "../ui/button";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Business = {
  id: string;
  name: string;
  address: string;
  phone_number: number;
};

export function generateColumns<T extends object>(type: T): ColumnDef<T>[] {
  return Object.keys(type).map((key) => {
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
      header: key,
    };
  });
}
