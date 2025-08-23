"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import Image from "next/image"

interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string
  alt?: string
  fallback?: string
  size?: "sm" | "md" | "lg" | "xl"
}

const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>(
  ({ className, src, alt, fallback, size = "md", ...props }, ref) => {
    const sizeClasses = {
      sm: "h-8 w-8 text-xs",
      md: "h-12 w-12 text-sm",
      lg: "h-16 w-16 text-base",
      xl: "h-32 w-32 text-xl",
    }

    const [imageError, setImageError] = React.useState(false)

    return (
      <div
        ref={ref}
        className={cn(
          "relative flex shrink-0 overflow-hidden rounded-full bg-surface ring-1 ring-border",
          sizeClasses[size],
          className
        )}
        {...props}
      >
        {src && !imageError ? (
          <Image
            src={src}
            alt={alt || "Avatar"}
            fill
            sizes="(max-width: 768px) 128px, 256px"
            className="object-cover object-center"
            onError={() => setImageError(true)}
            priority={size === "xl"}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-accent/10 text-accent font-medium">
            {fallback || alt?.charAt(0)?.toUpperCase() || "?"}
          </div>
        )}
      </div>
    )
  }
)
Avatar.displayName = "Avatar"

export { Avatar }
