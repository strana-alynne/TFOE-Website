"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Define the Member type based on your MongoDB model
export type Member = {
  id: string;
  name: string;
  feedback: string;
};

interface MembersColumnsProps {
  onRefresh?: () => void;
}

export const MembersColumns = ({ onRefresh }: MembersColumnsProps) => {
  // Column definitions with the new action column
  const columns: ColumnDef<Member>[] = [
    {
      accessorKey: "feedback",
      header: "Feedback",
    },
  ];

  return {
    columns,
  };
};

// Exporting column definitions for backwards compatibility
export const columns: ColumnDef<Member>[] = [
  {
    accessorKey: "feedback",
    header: "Feedback",
  },
];
