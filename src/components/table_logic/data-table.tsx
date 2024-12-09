import {
  flexRender,
  ColumnFiltersState,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  VisibilityState,
  useReactTable,
  RowSelectionState,
} from "@tanstack/react-table";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { generateColumns } from "./columns";
import { Button } from "../ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { supabase } from "@/utils/supabase";
import { useToast } from "@/hooks/use-toast";

interface DataTableProps<TData> {
  type: TData;
  data: TData[];
  onDataChange?: () => void;
}

export function DataTable<TData extends object>({
  type,
  data,
  onDataChange,
}: DataTableProps<TData>) {
  const { toast } = useToast();
  const columns = generateColumns(type);

  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,

    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  const handleDelete = async () => {
    const selectedRows = table.getFilteredSelectedRowModel().rows;

    if (selectedRows.length === 0) {
      toast({
        title: "No rows selected",
        description: "Please select at least one row to delete.",
        variant: "destructive",
      });
      return;
    }

    const selectedIds = selectedRows.map((row) => row.original.id);

    try {
      const { error } = await supabase.from("Accounts").delete().in("id", selectedIds);

      if (error) throw error;

      toast({
        title: "Success",
        description: `Successfully deleted ${selectedRows.length} row(s)`,
      });

      // Reset selection
      setRowSelection({});

      // Refresh data
      onDataChange();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete selected rows. Please try again.",
        variant: "destructive",
      });
      console.error("Delete error:", error);
    }
  };

  return (
    <div className="rounded-md border">
      <div className="flex items-center py-4">
        <Input
          placeholder={`Filter ${table.getColumn("name") ? "name" : "email"}...`}
          value={
            ((table.getColumn("email")?.getFilterValue() as string) ||
              (table.getColumn("name")?.getFilterValue() as string)) ??
            ""
          }
          onChange={(event) => {
            const column = table.getColumn("email") || table.getColumn("name");
            column?.setFilterValue(event.target.value);
          }}
          className="max-w-sm"
        />

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) => column.toggleVisibility(!!value)}
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader className="text-black">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>{" "}
      <span className="">
        <Button>Edit</Button>
        <Button>Add</Button>
        <Button
          variant="destructive"
          onClick={handleDelete}
          disabled={!table.getFilteredSelectedRowModel().rows.length}
        >
          Delete Selected ({table.getFilteredSelectedRowModel().rows.length})
        </Button>{" "}
      </span>
    </div>
  );
}
