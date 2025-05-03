"use client";

import { useEffect, useState } from "react";
import { Member, columns } from "./columns";
import { DataTable } from "./data-table";

export default function MembersTable() {
  const [data, setData] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
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
    }
    fetchData();
  }, []);

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  );
}
