import { cn } from "@/lib/utils";

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  height?: string | number;
}

export function Skeleton({
  className,
  height,
  ...props
}: SkeletonProps) {
  return (
    <div
      className={cn("skeleton rounded", className)}
      style={height ? { height: typeof height === 'number' ? `${height}px` : height } : undefined}
      {...props}
    />
  );
}
