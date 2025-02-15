"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";

// Define the Member type based on your MongoDB model
export type Member = {
  _id: string;
  firstName: string;
  middleName?: string | null;
  lastName: string;
  name_extension?: string | null;
  age: number;
  address: string;
  email: string;
  contact: string;
  status: string;
  position: string;
  contribution?: number | null;
  absences: number;
  profession: string;
  feedback: string;
};

// Update the column definitions to match your Member type
export const columns: ColumnDef<Member>[] = [
  {
    accessorKey: "_id",
    header: "Member ID",
  },
  {
    // accessorKey: "firstName",
    header: "Name",
    cell: ({ row }) => {
      const { firstName, middleName, lastName, name_extension } =
        row.original || {};

      const fullName =
        `${firstName || ""} ${middleName || ""} ${lastName || ""} ${name_extension || ""}`.trim();

      return fullName || "N/A"; // Return "N/A" if all values are missing
    },
  },
  {
    accessorKey: "contact",
    header: "Contact Number",
  },
  {
    accessorKey: "email",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Email
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = (row.getValue("status") as string).toLowerCase();
      return (
        <Badge
          variant={status === "active" ? "default" : "destructive"}
          className={
            status === "active"
              ? "bg-green-100 text-green-800 hover:bg-green-100"
              : "bg-red-100 text-red-800 hover:bg-red-100"
          }
        >
          {row.getValue("status")}
        </Badge>
      );
    },
  },
  {
    accessorKey: "position",
    header: "Position",
  },
  {
    accessorKey: "contribution",
    header: "Contribution",
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("contribution") ?? "0");
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount);
    },
  },
];
