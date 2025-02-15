import { Member, columns } from "./columns";
import { DataTable } from "./data-table";

async function getData(): Promise<Member[]> {
  try {
    const response = await fetch("http://localhost:3000/api/members", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch members");
    }

    const data = await response.json();
    return data.members;
  } catch (error) {
    console.error("Error fetching members:", error);
    throw error;
  }
}

export default async function MembersTable() {
  const data = await getData();

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  );
}
