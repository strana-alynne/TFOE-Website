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

// Updated Member type to match your actual data structure
export type Member = {
  id: string; // Changed from _id to id
  firstName: string;
  middleName?: string | null;
  lastName: string;
  nameExtension?: string | null; // Changed from name_extension to nameExtension
  address: string;
  email: string;
  contact: string;
  birthDate: string;
  status: string;
  position: string;
  contribution?: number | null;
  absences: number;
  profession: string;
  feedback: string;
  dateJoined: string;
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
      // Make API call to delete the member (using id instead of _id)
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
      accessorKey: "id", // Changed from _id to id
      header: "Member ID",
    },
    {
      header: "Name",
      cell: ({ row }) => {
        const { firstName, middleName, lastName, nameExtension } =
          row.original || {}; // Changed name_extension to nameExtension

        const fullName =
          `${firstName || ""} ${middleName || ""} ${lastName || ""} ${nameExtension || ""}`.trim();

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
      accessorKey: "profession", // Added profession column
      header: "Profession",
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
              setMemberToDelete(member.id); // Changed from member._id to member.id
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

// Utility function to filter out null values and transform data if needed
export const filterAndTransformMemberData = (data: any[]): Member[] => {
  return data
    .filter((item) => item !== null && item !== undefined) // Remove null/undefined entries
    .map((item) => ({
      ...item,
      // If your backend sends _id instead of id, uncomment the next line:
      // id: item._id || item.id,
      // If your backend sends name_extension instead of nameExtension, uncomment the next line:
      // nameExtension: item.name_extension || item.nameExtension,
    }));
};

// Exporting column definitions for backwards compatibility (updated)
export const columns: ColumnDef<Member>[] = [
  {
    accessorKey: "id", // Changed from _id to id
    header: "Member ID",
  },
  {
    header: "Name",
    cell: ({ row }) => {
      const { firstName, middleName, lastName, nameExtension } =
        row.original || {}; // Changed name_extension to nameExtension

      const fullName =
        `${firstName || ""} ${middleName || ""} ${lastName || ""} ${nameExtension || ""}`.trim();

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
    accessorKey: "profession", // Added profession column
    header: "Profession",
  },
];
