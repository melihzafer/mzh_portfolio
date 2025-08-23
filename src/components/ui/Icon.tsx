import * as React from "react"
import { LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface IconProps extends React.SVGAttributes<SVGElement> {
  icon: LucideIcon
  size?: "sm" | "md" | "lg"
}

const Icon = React.forwardRef<SVGSVGElement, IconProps>(
  ({ className, icon: IconComponent, size = "md", ...props }, ref) => {
    const sizeClasses = {
      sm: "h-4 w-4",
      md: "h-6 w-6", 
      lg: "h-7 w-7",
    }

    return (
      <IconComponent
        ref={ref}
        className={cn(sizeClasses[size], className)}
        strokeWidth={1.5}
        {...props}
      />
    )
  }
)
Icon.displayName = "Icon"

export { Icon }
