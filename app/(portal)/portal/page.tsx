"use client";

import { useEffect, useState } from "react";
import DashboardBarChart from "@/components/DashbaordBarChart";
import DashboardPieChart from "@/components/DashbaordPieChart";
import { DashboardLineGraph } from "@/components/DashboardLineGraph";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
} from "@/components/ui/breadcrumb";
import { CardTitle, Card, CardHeader, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { AssignmentInd, Group } from "@mui/icons-material";
import { getStats } from "./actions";

// Define the type for your API response with nullable fields
interface StatsData {
  member_count: {
    overall_members: number | null;
    new_members: number | null;
    active_members: number | null;
    pending_members: number | null;
  } | null;
  quarterly_totals: Record<string, number> | null;
  annual_contribution: number | null;
}

export default function Page() {
  const [data, setData] = useState<StatsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("access_token");
        const statsResponse = await getStats(token || "");
        setData(statsResponse.data);
      } catch (err) {
        setError("Failed to fetch data");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Helper function to safely get member count values
  const getMemberCount = (
    key: keyof NonNullable<StatsData["member_count"]>
  ): number => {
    return data?.member_count?.[key] ?? 0;
  };

  if (loading) {
    return (
      <SidebarInset className="w-full">
        <div className="flex items-center justify-center h-64">
          <div className="text-lg">Loading...</div>
        </div>
      </SidebarInset>
    );
  }

  if (error) {
    return (
      <SidebarInset className="w-full">
        <div className="flex items-center justify-center h-64">
          <div className="text-lg text-red-500">{error}</div>
        </div>
      </SidebarInset>
    );
  }

  return (
    <SidebarInset className="w-full">
      <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4 w-full">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem className="hidden md:block">
              <BreadcrumbLink href="#">Dashboard</BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </header>
      <div className="p-4 w-full text-2xl font-bold">
        <h2>Welcome to the Dashboard</h2>
      </div>
      <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-3 p-4 w-full">
        <div className="flex justify-center lg:justify-start w-full">
          <DashboardPieChart data={data?.member_count ?? null} />
        </div>
        <div className="grid gap-4 grid-cols-2 col-span-2 w-full">
          <Card className="w-full flex-grow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Overall Members
              </CardTitle>
              <Group />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {getMemberCount("overall_members").toLocaleString()}
              </div>
              <p className="text-xs text-muted-foreground">
                {getMemberCount("overall_members") === 0
                  ? "No members registered yet"
                  : "Total registered members"}
              </p>
            </CardContent>
          </Card>
          <Card className="w-full flex-grow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Active Members
              </CardTitle>
              <AssignmentInd />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {getMemberCount("active_members").toLocaleString()}
              </div>
              <p className="text-xs text-muted-foreground">
                {getMemberCount("active_members") === 0
                  ? "No active members"
                  : "Currently active members"}
              </p>
            </CardContent>
          </Card>
          <Card className="w-full flex-grow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">New Members</CardTitle>
              <Group />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {getMemberCount("new_members").toLocaleString()}
              </div>
              <p className="text-xs text-muted-foreground">
                {getMemberCount("new_members") === 0
                  ? "No new members recently"
                  : "Recently joined members"}
              </p>
            </CardContent>
          </Card>
          <Card className="w-full flex-grow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Pending Requests
              </CardTitle>
              <AssignmentInd />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {getMemberCount("pending_members").toLocaleString()}
              </div>
              <p className="text-xs text-muted-foreground">
                {getMemberCount("pending_members") === 0
                  ? "No pending requests"
                  : "Awaiting approval"}
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
      <div className="p-4 w-full grid grid-cols-1 md:grid-cols-3 gap-4 h-full">
        <div className="h-full w-full">
          <DashboardBarChart quarterlyData={data?.quarterly_totals ?? null} />
        </div>
        <div className="md:col-span-2 h-full w-full">
          <DashboardLineGraph
            annualContribution={data?.annual_contribution ?? null}
          />
        </div>
      </div>
    </SidebarInset>
  );
}
