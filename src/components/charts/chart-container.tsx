import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart } from "./line-chart";
import { ChartData } from "@/types";
import { LucideIcon } from "lucide-react";

interface ChartContainerProps {
  title: string;
  icon?: React.ReactNode;
  data: ChartData;
  isLoading?: boolean;
  className?: string;
  height?: number;
}

export function ChartContainer({
  title,
  icon,
  data,
  isLoading = false,
  className = "",
  height = 300,
}: ChartContainerProps) {
  return (
    <Card className={`${className}`}>
      <CardHeader>
        <CardTitle>
          {icon}
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <LineChart 
          data={data} 
          height={height} 
          isLoading={isLoading} 
        />
      </CardContent>
    </Card>
  );
}
