import { PeriodToggleProps, Period } from "@/types";
import { Button } from "@/components/ui/button";

export function PeriodToggle({
  currentPeriod,
  onPeriodChange,
  isLoading = false,
}: PeriodToggleProps) {
  const periods: Period[] = ["1d", "7d", "30d"];

  return (
    <div className="flex bg-gray-900/70 rounded-xl p-1 space-x-1">
      {periods.map((period) => (
        <Button
          key={period}
          variant="ghost"
          size="sm"
          isActive={currentPeriod === period}
          onClick={() => onPeriodChange(period)}
          disabled={isLoading}
          className={`min-w-16 uppercase font-semibold ${
            currentPeriod === period
              ? "bg-primary text-white"
              : "text-foreground-muted"
          }`}
        >
          {period}
        </Button>
      ))}
    </div>
  );
}
