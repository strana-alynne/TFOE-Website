"use client";

import * as React from "react";
import { CartesianGrid, Line, LineChart, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

interface DashboardLineGraphProps {
  annualContribution: number | null;
}

// Default chart data - you might want to replace this with actual monthly data from your API
const chartData = [
  { date: "January", contribution: 0 },
  { date: "February", contribution: 0 },
  { date: "March", contribution: 0 },
  { date: "April", contribution: 0 },
  { date: "May", contribution: 0 },
  { date: "June", contribution: 0 },
  { date: "July", contribution: 0 },
  { date: "August", contribution: 0 },
  { date: "September", contribution: 0 },
  { date: "October", contribution: 0 },
  { date: "November", contribution: 0 },
  { date: "December", contribution: 0 },
];

const monthMap: { [key: string]: string } = {
  January: "2024-01-01",
  February: "2024-02-01",
  March: "2024-03-01",
  April: "2024-04-01",
  May: "2024-05-01",
  June: "2024-06-01",
  July: "2024-07-01",
  August: "2024-08-01",
  September: "2024-09-01",
  October: "2024-10-01",
  November: "2024-11-01",
  December: "2024-12-01",
};

const chartConfig = {
  views: {
    label: "Total Contributions",
  },
  contribution: {
    label: "Contribution",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

export function DashboardLineGraph({
  annualContribution,
}: DashboardLineGraphProps) {
  const [activeChart, setActiveChart] =
    React.useState<keyof typeof chartConfig>("contribution");

  // Handle null/undefined annual contribution
  const safeAnnualContribution = annualContribution ?? 0;
  const hasContributionData =
    annualContribution !== null && annualContribution > 0;

  // For now, we'll distribute the annual contribution evenly across months
  // You might want to modify this to use actual monthly data from your API
  const monthlyAverage = hasContributionData ? safeAnnualContribution / 12 : 0;
  const chartDataWithContribution = chartData.map((month) => ({
    ...month,
    contribution: Math.round(monthlyAverage),
  }));

  const total = React.useMemo(
    () => ({
      contribution: safeAnnualContribution,
    }),
    [safeAnnualContribution]
  );

  return (
    <Card className="w-full h-full">
      <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
          <CardTitle>Annual Contribution Development</CardTitle>
          <CardDescription>
            {hasContributionData
              ? "Showing total contributions for the year 2024"
              : "No contribution data available for 2024"}
          </CardDescription>
        </div>
        <div className="flex">
          {["contribution"].map((key) => {
            const chart = key as keyof typeof chartConfig;
            return (
              <button
                key={chart}
                data-active={activeChart === chart}
                className="flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l data-[active=true]:bg-muted/50 sm:border-l sm:border-t-0 sm:px-8 sm:py-6"
                onClick={() => setActiveChart(chart)}
              >
                <span className="text-xs text-muted-foreground">
                  {hasContributionData
                    ? "Total Contributions"
                    : "No Contributions Yet"}
                </span>
                <span className="text-lg font-bold leading-none sm:text-3xl">
                  ₱ {total[key as keyof typeof total].toLocaleString()}
                  {!hasContributionData && (
                    <span className="text-sm text-muted-foreground ml-2">
                      (No data)
                    </span>
                  )}
                </span>
              </button>
            );
          })}
        </div>
      </CardHeader>
      <CardContent className="px-2 sm:p-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <LineChart
            accessibilityLayer
            data={chartDataWithContribution}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(monthMap[value]);
                return date.toLocaleDateString("en-US", { month: "short" });
              }}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  className="w-[150px]"
                  nameKey="views"
                  labelFormatter={(value) => {
                    const date = new Date(monthMap[value]);
                    return date.toLocaleDateString("en-US", {
                      month: "short",
                      year: "numeric",
                    });
                  }}
                />
              }
            />
            <Line
              dataKey={activeChart}
              type="monotone"
              stroke={`var(--color-${activeChart})`}
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
