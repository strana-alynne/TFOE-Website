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
const chartData = [
  { date: "January", desktop: 222, mobile: 150 },
  { date: "February", desktop: 97, mobile: 180 },
  { date: "March", desktop: 300, mobile: 120 },
  { date: "April", desktop: 242, mobile: 260 },
  { date: "May", desktop: 373, mobile: 290 },
  { date: "June", desktop: 301, mobile: 340 },
  { date: "July", desktop: 245, mobile: 180 },
  { date: "August", desktop: 409, mobile: 320 },
  { date: "September", desktop: 59, mobile: 110 },
  { date: "October", desktop: 261, mobile: 190 },
  { date: "November", desktop: 327, mobile: 350 },
  { date: "December", desktop: 292, mobile: 210 },
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
    label: "Total Sales",
  },
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

export function MemberLineGraph() {
  const [activeChart, setActiveChart] =
    React.useState<keyof typeof chartConfig>("desktop");

  const total = React.useMemo(
    () => ({
      desktop: chartData.reduce((acc, curr) => acc + curr.desktop, 0),
      mobile: chartData.reduce((acc, curr) => acc + curr.mobile, 0),
    }),
    []
  );

  return (
    <Card className="w-full h-full">
      <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
          <CardTitle>My Contribution</CardTitle>
          <CardDescription>
            Showing total sales for the year 2024
          </CardDescription>
        </div>
        <div className="flex">
          {["desktop"].map((key) => {
            const chart = key as keyof typeof chartConfig;
            return (
              <button
                key={chart}
                data-active={activeChart === chart}
                className="flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l data-[active=true]:bg-muted/50 sm:border-l sm:border-t-0 sm:px-8 sm:py-6"
                onClick={() => setActiveChart(chart)}
              >
                <span className="text-xs text-muted-foreground">
                  Total Sales
                </span>
                <span className="text-lg font-bold leading-none sm:text-3xl">
                  ₱ {total[key as keyof typeof total].toLocaleString()}
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
            data={chartData}
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
