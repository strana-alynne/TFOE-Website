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

interface MemberBarChartProps {
  stats?: {
    quarterly_totals: { [key: string]: number };
    monthly_totals: { [key: string]: number };
    annual_contribution: number;
  };
}

const chartConfig = {
  desktop: {
    label: "Sales",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

// Quarter mapping
const quarterLabels = {
  "1": "Jan - March",
  "2": "April - June",
  "3": "July - September",
  "4": "October - December",
};

export default function MemberBarChart({ stats }: MemberBarChartProps) {
  // Transform API data to chart format
  const chartData = stats?.quarterly_totals
    ? Object.entries(stats.quarterly_totals).map(([quarter, value]) => ({
        month:
          quarterLabels[quarter as keyof typeof quarterLabels] ||
          `Quarter ${quarter}`,
        desktop: value,
      }))
    : [
        { month: "Jan - March", desktop: 0 },
        { month: "April - June", desktop: 0 },
        { month: "July - September", desktop: 0 },
        { month: "October - December", desktop: 0 },
      ];

  // Calculate trend (simplified - you can enhance this logic)
  const totalQuarterly = Object.values(stats?.quarterly_totals || {}).reduce(
    (sum, val) => sum + val,
    0
  );
  const avgQuarterly =
    totalQuarterly / Object.keys(stats?.quarterly_totals || {}).length;

  return (
    <Card className="w-full h-full">
      <CardHeader>
        <CardTitle>My Performance</CardTitle>
        <CardDescription>2025</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="desktop" fill="var(--color-desktop)" radius={8} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          {stats?.annual_contribution ? (
            <>Total Annual: ₱{stats.annual_contribution.toLocaleString()}</>
          ) : (
            <>
              Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
            </>
          )}
        </div>
        <div className="leading-none text-muted-foreground">
          Total sales for every quarter
        </div>
      </CardFooter>
    </Card>
  );
}
