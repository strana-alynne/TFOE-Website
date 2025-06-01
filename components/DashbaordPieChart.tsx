"use client";

import * as React from "react";
import { TrendingUp } from "lucide-react";
import { Label, Pie, PieChart } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

// Define the interface for the member count data
interface MemberCountData {
  overall_members: number | null;
  new_members: number | null;
  active_members: number | null;
  pending_members: number | null;
}

interface DashboardPieChartProps {
  data: MemberCountData | null;
}

const chartConfig = {
  members: {
    label: "Members",
  },
  active: {
    label: "Active",
    color: "hsl(var(--chart-1))",
  },
  new: {
    label: "New",
    color: "hsl(var(--chart-2))",
  },
  pending: {
    label: "Pending",
    color: "hsl(var(--chart-3))",
  },
  inactive: {
    label: "Inactive",
    color: "hsl(var(--chart-4))",
  },
} satisfies ChartConfig;

export default function DashboardPieChart({ data }: DashboardPieChartProps) {
  // Transform the member data into chart format
  const chartData = React.useMemo(() => {
    if (!data) {
      return [{ category: "No Data", members: 0, fill: "hsl(var(--chart-1))" }];
    }

    const activeMembers = data.active_members ?? 0;
    const newMembers = data.new_members ?? 0;
    const pendingMembers = data.pending_members ?? 0;
    const overallMembers = data.overall_members ?? 0;

    // Calculate inactive members (overall - active - new - pending)
    // Note: This assumes new members are not counted in active members
    const inactiveMembers = Math.max(
      0,
      overallMembers - activeMembers - newMembers - pendingMembers
    );

    return [
      {
        category: "Active",
        members: activeMembers,
        fill: "var(--color-active)",
      },
      {
        category: "New",
        members: newMembers,
        fill: "var(--color-new)",
      },
      {
        category: "Pending",
        members: pendingMembers,
        fill: "var(--color-pending)",
      },
      {
        category: "Inactive",
        members: inactiveMembers,
        fill: "var(--color-inactive)",
      },
    ].filter((item) => item.members > 0); // Only show categories with data
  }, [data]);

  const totalMembers = React.useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.members, 0);
  }, [chartData]);

  // Calculate growth percentage (you can modify this logic based on your needs)
  const growthPercentage = React.useMemo(() => {
    if (!data || !data.new_members || !data.overall_members) return 0;
    return (data.new_members / data.overall_members) * 100;
  }, [data]);

  return (
    <Card className="flex flex-col w-full">
      <CardHeader className="items-center pb-0">
        <CardTitle>Member Overview</CardTitle>
        <CardDescription>Current membership distribution</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="members"
              nameKey="category"
              innerRadius={60}
              strokeWidth={5}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {totalMembers.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Total Members
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        {data && data.new_members && data.new_members > 0 ? (
          <div className="flex items-center gap-2 font-medium leading-none">
            {data.new_members} new members joined{" "}
            <TrendingUp className="h-4 w-4" />
          </div>
        ) : (
          <div className="flex items-center gap-2 font-medium leading-none text-muted-foreground">
            No new members recently
          </div>
        )}
        <div className="leading-none text-muted-foreground">
          Current membership status breakdown
        </div>
      </CardFooter>
    </Card>
  );
}
