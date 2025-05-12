// components/participants-table.tsx

"use client";

import { DataTable } from "./data-table";
import { MembersColumns } from "./columns";
import { Toaster } from "@/components/ui/toaster";

interface Participant {
  id: string;
  name: string;
  feedback: string;
}

interface ParticipantsTableProps {
  participants: Participant[];
}

export default function ParticipantsTable({
  participants,
}: ParticipantsTableProps) {
  const { columns } = MembersColumns({
    onRefresh: () => {}, // Optional: implement if needed
  });

  return (
    <div className="container mx-auto">
      <DataTable columns={columns} data={participants} />
      <Toaster />
    </div>
  );
}
