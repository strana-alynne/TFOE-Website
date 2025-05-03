import { BarChart3 } from "lucide-react";

export function EmptyChartState({
  title = "No data available",
  description = "There is no data to display at this time.",
  icon = <BarChart3 className="h-12 w-12 text-muted-foreground/50" />,
}) {
  return (
    <div className="flex flex-col items-center justify-center h-full w-full p-6">
      <div className="flex flex-col items-center justify-center gap-2 py-8">
        {icon}
        <h3 className="mt-4 text-lg font-semibold">{title}</h3>
        <p className="text-sm text-muted-foreground text-center max-w-xs">
          {description}
        </p>
      </div>
    </div>
  );
}
