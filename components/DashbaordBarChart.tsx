"use client";

import { TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

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

interface DashboardBarChartProps {
  quarterlyData: Record<string, number> | null;
}

const chartConfig = {
  value: {
    label: "Sales",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

export default function DashboardBarChart({
  quarterlyData,
}: DashboardBarChartProps) {
  // Transform the quarterly data into chart format, handling null/undefined
  const chartData = quarterlyData
    ? Object.entries(quarterlyData)
        .filter(([_, value]) => value !== null && value !== undefined)
        .map(([quarter, value]) => ({
          quarter,
          value: value || 0,
        }))
    : [];

  // Default quarters with 0 values when no data is available
  const defaultChartData = [
    { quarter: "Q1", value: 0 },
    { quarter: "Q2", value: 0 },
    { quarter: "Q3", value: 0 },
    { quarter: "Q4", value: 0 },
  ];

  const displayData = chartData.length > 0 ? chartData : defaultChartData;
  const hasRealData =
    chartData.length > 0 && chartData.some((item) => item.value > 0);

  // Calculate total and trend
  const total = displayData.reduce((acc, curr) => acc + (curr.value || 0), 0);

  return (
    <Card className="w-full h-full">
      <CardHeader>
        <CardTitle>Quarterly Sales Development</CardTitle>
        <CardDescription>2025</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={displayData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="quarter"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="value" fill="var(--color-value)" radius={8} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        {hasRealData ? (
          <>
            <div className="flex gap-2 font-medium leading-none">
              Total sales: ₱{total.toLocaleString()}{" "}
              <TrendingUp className="h-4 w-4" />
            </div>
            <div className="leading-none text-muted-foreground">
              Total sales for all quarters
            </div>
          </>
        ) : (
          <>
            <div className="flex gap-2 font-medium leading-none text-muted-foreground">
              No sales data available
            </div>
            <div className="leading-none text-muted-foreground">
              {quarterlyData === null
                ? "Data is being collected"
                : "Quarterly sales will appear here when data is available"}
            </div>
          </>
        )}
      </CardFooter>
    </Card>
  );
}
