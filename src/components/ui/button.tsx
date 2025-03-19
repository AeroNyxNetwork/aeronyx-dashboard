import * as React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "ghost" | "link";
  size?: "default" | "sm" | "lg";
  isActive?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", isActive = false, ...props }, ref) => {
    return (
      <button
        className={cn(
          "inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none",
          {
            "bg-primary text-white hover:bg-primary-dark": variant === "default" && !isActive,
            "bg-primary text-white": variant === "default" && isActive,
            "border border-input bg-transparent hover:bg-gray-800/30 hover:text-white": variant === "outline",
            "bg-transparent hover:bg-gray-800/30 hover:text-white": variant === "ghost",
            "underline-offset-4 hover:underline text-primary hover:text-primary-light": variant === "link",
            "h-10 py-2 px-4": size === "default",
            "h-8 px-3 text-sm": size === "sm",
            "h-12 px-6 text-lg": size === "lg",
          },
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";

export { Button };
