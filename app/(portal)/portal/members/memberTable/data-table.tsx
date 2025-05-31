"use client";
import * as React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  SortingState,
  getPaginationRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  onRowClick?: (row: TData) => void;
  deleteConfirmationDialog?: React.ReactNode;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  onRowClick,
  deleteConfirmationDialog,
}: DataTableProps<TData, TValue>) {
  const router = useRouter();
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );

  // DEBUG: Log the data being passed to the table
  React.useEffect(() => {
    console.log("=== DATATABLE DEBUG ===");
    console.log("Raw data received:", data);
    console.log("Data length:", data?.length);
    console.log("Data type:", typeof data);
    console.log("Is data an array?", Array.isArray(data));

    if (data && data.length > 0) {
      console.log(
        "First non-null item:",
        data.find((item) => item !== null)
      );
      console.log("Sample data structure:", JSON.stringify(data[0], null, 2));
    }

    console.log("Columns received:", columns);
    console.log("Number of columns:", columns?.length);
    console.log("========================");
  }, [data, columns]);

  const table = useReactTable({
    data: data || [], // Ensure data is never undefined
    columns: columns || [], // Ensure columns is never undefined
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
    },
  });

  // DEBUG: Log table state
  React.useEffect(() => {
    console.log("=== TABLE STATE DEBUG ===");
    console.log("Table row count:", table.getRowModel().rows?.length);
    console.log("Table rows:", table.getRowModel().rows);
    console.log(
      "Filtered row count:",
      table.getFilteredRowModel().rows?.length
    );
    console.log("===========================");
  }, [table.getRowModel().rows]);

  const handleRowClick = (row: TData, event: React.MouseEvent) => {
    if ((event.target as HTMLElement).closest('[data-delete-button="true"]')) {
      return;
    }

    if (onRowClick) {
      onRowClick(row);
    } else {
      const id = (row as any).id || (row as any)._id;
      console.log("Row clicked, ID:", id, "Row data:", row);
      if (id) {
        router.push(`/portal/members/membersProfile/${id}`);
      }
    }
  };

  return (
    <>
      <div className="flex items-center py-4">
        <Input
          placeholder="Filter emails..."
          value={(table.getColumn("email")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("email")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  onClick={(e) => handleRowClick(row.original, e)}
                  className="cursor-pointer hover:bg-gray-100 transition-colors"
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      const mockEvent = {
                        target: e.target,
                      } as unknown as React.MouseEvent;
                      handleRowClick(row.original, mockEvent);
                    }
                  }}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  <div>
                    <p>No results.</p>
                    <p className="text-xs text-gray-500 mt-1">
                      Data length: {data?.length || 0} | Rows:{" "}
                      {table.getRowModel().rows?.length || 0}
                    </p>
                  </div>
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
      </div>

      {deleteConfirmationDialog}
    </>
  );
}
