"use client";

import { useEffect, useState } from "react";
import { DataTable } from "./data-table";
import { MembersColumns } from "./columns";
import { Toaster } from "@/components/ui/toaster";

// Define the Member type to match your data structure
type Member = {
  id: string;
  firstName: string;
  middleName?: string;
  lastName: string;
  nameExtension?: string;
  address: string;
  email: string;
  contact: string;
  birthDate: string;
  status: string;
  position: string;
  contribution?: number;
  absences: number;
  profession: string;
  feedback: string;
  dateJoined: string;
};

export default function MembersTable() {
  const [data, setData] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [rawApiResponse, setRawApiResponse] = useState<any>(null);

  // Function to fetch members data
  const fetchData = async () => {
    setLoading(true);
    setError(null);
    const token = localStorage.getItem("access_token");

    try {
      const response = await fetch(
        "https://tfoe-backend.onrender.com/admin/member",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch members");
      }

      const apiResponse = await response.json();

      // DEBUG: Log the complete API response
      console.log("=== API RESPONSE DEBUG ===");
      console.log("Full API Response:", apiResponse);
      console.log("Response type:", typeof apiResponse);
      console.log("Has 'data' property?", "data" in apiResponse);
      console.log("apiResponse.data:", apiResponse.data);
      console.log(
        "apiResponse.data is array?",
        Array.isArray(apiResponse.data)
      );
      if (apiResponse.data) {
        console.log("apiResponse.data length:", apiResponse.data.length);
        console.log(
          "Non-null items count:",
          apiResponse.data.filter((item: any) => item !== null).length
        );
      }
      console.log("===========================");

      setRawApiResponse(apiResponse);

      // Extract and process the actual data
      let processedData: Member[] = [];

      if (apiResponse && apiResponse.data && Array.isArray(apiResponse.data)) {
        // Filter out null values and transform the data
        processedData = apiResponse.data
          .filter((item: any) => item !== null && item !== undefined)
          .map((item: any) => ({
            id: item.id || item._id, // Support both field names
            firstName: item.firstName || "",
            middleName: item.middleName || "",
            lastName: item.lastName || "",
            nameExtension: item.nameExtension || item.name_extension || "",
            address: item.address || "",
            email: item.email || "",
            contact: item.contact || "",
            birthDate: item.birthDate || "",
            status: item.status || "",
            position: item.position || "",
            contribution: item.contribution || 0,
            absences: item.absences || 0,
            profession: item.profession || "",
            feedback: item.feedback || "",
            dateJoined: item.dateJoined || "",
          }));
      } else if (Array.isArray(apiResponse)) {
        // Handle case where the response is directly an array
        processedData = apiResponse
          .filter((item: any) => item !== null && item !== undefined)
          .map((item: any) => ({
            id: item.id || item._id,
            firstName: item.firstName || "",
            middleName: item.middleName || "",
            lastName: item.lastName || "",
            nameExtension: item.nameExtension || item.name_extension || "",
            address: item.address || "",
            email: item.email || "",
            contact: item.contact || "",
            birthDate: item.birthDate || "",
            status: item.status || "",
            position: item.position || "",
            contribution: item.contribution || 0,
            absences: item.absences || 0,
            profession: item.profession || "",
            feedback: item.feedback || "",
            dateJoined: item.dateJoined || "",
          }));
      }

      console.log("Final processed data:", processedData);
      console.log("Processed data length:", processedData.length);

      setData(processedData);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Error fetching members";
      setError(errorMessage);
      console.error("Fetch error:", err);
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
    return (
      <div className="flex flex-col items-center justify-center p-8">
        <div className="text-red-500 mb-4">{error}</div>
        <button
          onClick={fetchData}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Retry
        </button>
      </div>
    );
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
