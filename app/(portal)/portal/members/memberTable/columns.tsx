"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, Trash2 } from "lucide-react";
import { useState } from "react";
import axios from "axios";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";

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

interface MembersColumnsProps {
  onRefresh?: () => void;
}

export const MembersColumns = ({ onRefresh }: MembersColumnsProps) => {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [memberToDelete, setMemberToDelete] = useState<string | null>(null);
  const { toast } = useToast();

  const handleDelete = async () => {
    if (!memberToDelete) return;

    try {
      // Make API call to delete the member
      await axios.delete(`http://localhost:3001/members/${memberToDelete}`);

      // Show success message
      toast({
        title: "Member deleted",
        description: "The member has been successfully deleted.",
        variant: "default",
      });

      // Refresh the data after deletion
      if (onRefresh) {
        onRefresh();
      }
    } catch (error) {
      console.error("Error deleting member:", error);

      toast({
        title: "Error",
        description: "Failed to delete the member. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsDeleteDialogOpen(false);
      setMemberToDelete(null);
    }
  };

  // Column definitions with the new action column
  const columns: ColumnDef<Member>[] = [
    {
      accessorKey: "_id",
      header: "Member ID",
    },
    {
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
        const status = (row.getValue("status") as string)?.toLowerCase();
        return (
          <Badge
            variant={status === "active" ? "default" : "destructive"}
            className={
              status === "active"
                ? "bg-green-100 text-green-800 hover:bg-green-100"
                : "bg-red-100 text-red-800 hover:bg-red-100"
            }
          >
            {row.getValue("status") || "N/A"}
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
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => {
        const member = row.original;

        return (
          <Button
            variant="ghost"
            size="icon"
            className="text-red-500 hover:text-red-700 hover:bg-red-100"
            onClick={(e) => {
              e.stopPropagation(); // Prevent row click event
              setMemberToDelete(member._id);
              setIsDeleteDialogOpen(true);
            }}
            data-delete-button="true" // Add this attribute for event handling
          >
            <Trash2 className="h-4 w-4" />
            <span className="sr-only">Delete</span>
          </Button>
        );
      },
    },
  ];

  return {
    columns,
    DeleteConfirmationDialog: () => (
      <AlertDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              member and remove their data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-red-500 text-white hover:bg-red-600"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    ),
  };
};

// Exporting column definitions for backwards compatibility
export const columns: ColumnDef<Member>[] = [
  {
    accessorKey: "_id",
    header: "Member ID",
  },
  {
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
      const status = (row.getValue("status") as string)?.toLowerCase();
      return (
        <Badge
          variant={status === "active" ? "default" : "destructive"}
          className={
            status === "active"
              ? "bg-green-100 text-green-800 hover:bg-green-100"
              : "bg-red-100 text-red-800 hover:bg-red-100"
          }
        >
          {row.getValue("status") || "N/A"}
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
  },
];
