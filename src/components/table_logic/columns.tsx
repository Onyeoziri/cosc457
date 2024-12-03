import { ColumnDef } from "@tanstack/react-table";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Business = {
  id: string;
  name: string;
  address: string;
  phone_number: number;
};

export function generateColumns<T extends object>(type: T): ColumnDef<T>[] {
  return Object.keys(type).map((key) => ({
    accessorKey: key,
    header: key,
  }));
}
