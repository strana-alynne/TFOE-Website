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

interface MemberLineGraphProps {
  stats?: {
    quarterly_totals: { [key: string]: number };
    monthly_totals: { [key: string]: number };
    annual_contribution: number;
  };
}

// Month mapping
const monthNames = {
  "1": "January",
  "2": "February",
  "3": "March",
  "4": "April",
  "5": "May",
  "6": "June",
  "7": "July",
  "8": "August",
  "9": "September",
  "10": "October",
  "11": "November",
  "12": "December",
};

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

export function MemberLineGraph({ stats }: MemberLineGraphProps) {
  const [activeChart, setActiveChart] =
    React.useState<keyof typeof chartConfig>("desktop");

  // Transform API data to chart format
  const chartData = React.useMemo(() => {
    if (stats?.monthly_totals) {
      // Create array for all 12 months, filling with 0 for missing months
      const data = [];
      for (let i = 1; i <= 12; i++) {
        const monthName = monthNames[i.toString() as keyof typeof monthNames];
        const value = stats.monthly_totals[i.toString()] || 0;
        data.push({
          date: monthName,
          desktop: value,
          mobile: 0, // You can add mobile data if available in your API
        });
      }
      return data;
    }

    // Fallback to dummy data if no stats
    return [
      { date: "January", desktop: 0, mobile: 0 },
      { date: "February", desktop: 0, mobile: 0 },
      { date: "March", desktop: 0, mobile: 0 },
      { date: "April", desktop: 0, mobile: 0 },
      { date: "May", desktop: 0, mobile: 0 },
      { date: "June", desktop: 0, mobile: 0 },
      { date: "July", desktop: 0, mobile: 0 },
      { date: "August", desktop: 0, mobile: 0 },
      { date: "September", desktop: 0, mobile: 0 },
      { date: "October", desktop: 0, mobile: 0 },
      { date: "November", desktop: 0, mobile: 0 },
      { date: "December", desktop: 0, mobile: 0 },
    ];
  }, [stats]);

  const total = React.useMemo(
    () => ({
      desktop: chartData.reduce((acc, curr) => acc + curr.desktop, 0),
      mobile: chartData.reduce((acc, curr) => acc + curr.mobile, 0),
    }),
    [chartData]
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
