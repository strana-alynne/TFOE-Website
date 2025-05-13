"use client";

import { useEffect, useState } from "react";
import { DataTable } from "./data-table";
import { MembersColumns } from "./columns";
import { Toaster } from "@/components/ui/toaster";

export default function MembersTable() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Function to fetch members data
  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:3001/members");
      if (!response.ok) throw new Error("Failed to fetch members");

      const data = await response.json();
      console.log(data);
      setData(data);
    } catch (err) {
      setError("Error fetching members");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Get columns and DeleteConfirmationDialog from our MembersColumns component
  const { columns, DeleteConfirmationDialog } = MembersColumns({
    onRefresh: fetchData, // Pass the refresh function to reload after deletion
  });

  if (loading) {
    return <div className="flex justify-center p-8">Loading members...</div>;
  }

  if (error) {
    return <div className="flex justify-center p-8 text-red-500">{error}</div>;
  }

  return (
    <div className="container mx-auto py-10">
      <DataTable
        columns={columns}
        data={data}
        deleteConfirmationDialog={<DeleteConfirmationDialog />}
      />
      <Toaster />
    </div>
  );
}
