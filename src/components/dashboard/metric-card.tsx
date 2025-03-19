import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { MiniChart } from "@/components/charts/mini-chart";
import { MetricCardProps } from "@/types";
import { ArrowUpIcon, ArrowDownIcon, MinusIcon } from "lucide-react";

export function MetricCard({
  title,
  value,
  change,
  icon,
  chartData,
  isLoading = false,
}: MetricCardProps) {
  // Determine change status for styling
  const changeStatus = !change
    ? "neutral"
    : change > 0
    ? "positive"
    : "negative";

  // Format change with sign
  const formattedChange = change
    ? `${change > 0 ? "+" : ""}${change}% from previous period`
    : "No change from previous period";

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {icon}
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <>
            <Skeleton className="h-9 w-32 mb-2" />
            <Skeleton className="h-5 w-40 mb-4" />
            <Skeleton className="h-16" />
          </>
        ) : (
          <>
            <div className="text-3xl font-bold mb-1">{value}</div>
            <div className={`metric-change ${changeStatus} text-sm flex items-center gap-1.5 mb-5`}>
              {changeStatus === "positive" ? (
                <ArrowUpIcon className="h-4 w-4" />
              ) : changeStatus === "negative" ? (
                <ArrowDownIcon className="h-4 w-4" />
              ) : (
                <MinusIcon className="h-4 w-4" />
              )}
              <span>{formattedChange}</span>
            </div>
            {chartData && chartData.length > 0 && (
              <div className="h-16">
                <MiniChart data={chartData} status={changeStatus} />
              </div>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
}
