"use client";

import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-bg transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary: "bg-green-700 text-white hover:bg-green-600 hover:shadow-lift hover:ring-green-500/30 hover:ring-2 transform hover:-translate-y-[3px] transition-all duration-200 border border-green-700/20",
        matrix: "bg-gradient-to-r from-green-600 to-emerald-400 text-black hover:from-emerald-400 hover:to-green-600 hover:shadow-lg hover:shadow-emerald-400/25 transform hover:-translate-y-[3px] transition-all duration-300 font-mono border border-emerald-400/30",
        secondary: "border border-gray-600 bg-gray-800 hover:bg-gray-700 text-white hover:text-green-400 hover:border-green-700 transition-all duration-200 relative overflow-hidden group",
        ghost: "hover:bg-gray-700 hover:text-green-400 transition-colors",
        link: "text-green-400 underline-offset-4 hover:underline",
        outline: "border border-gray-600 text-white hover:bg-green-700/10 hover:border-green-700 hover:text-green-400 transition-colors",
        terminal: "bg-black border border-green-400 text-green-400 hover:bg-green-400 hover:text-black transition-all duration-200 font-mono text-xs",
      },
      size: {
        sm: "px-3 py-1.5 text-sm rounded",
        md: "px-6 py-3 text-base rounded-md",
        lg: "px-8 py-4 text-lg rounded-lg",
        icon: "h-10 w-10",
      },
      magnetic: {
        true: "cursor-pointer",
        false: "",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
      magnetic: false,
    },
  }
);

export interface ButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 
    'onDrag' | 'onDragStart' | 'onDragEnd' | 'onAnimationStart' | 'onAnimationEnd' | 'onAnimationIteration'>,
    VariantProps<typeof buttonVariants> {
  magnetic?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, magnetic = false, children, ...props }, ref) => {
    const buttonRef = useRef<HTMLButtonElement>(null);
    const [magneticPosition, setMagneticPosition] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (!magnetic || !buttonRef.current) return;

      const rect = buttonRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const deltaX = e.clientX - centerX;
      const deltaY = e.clientY - centerY;
      
      // Limit the magnetic effect to 6-8px maximum
      const maxDistance = 8;
      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
      
      if (distance < rect.width / 2 + 20) { // Activation zone
        const factor = Math.min(distance / 50, 1);
        setMagneticPosition({
          x: deltaX * factor * 0.3,
          y: deltaY * factor * 0.3,
        });
      }
    };

    const handleMouseLeave = () => {
      if (magnetic) {
        setMagneticPosition({ x: 0, y: 0 });
      }
    };

    return (
      <motion.button
        ref={(node) => {
          buttonRef.current = node;
          if (typeof ref === "function") {
            ref(node);
          } else if (ref) {
            ref.current = node;
          }
        }}
        className={cn(buttonVariants({ variant, size, magnetic, className }))}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        animate={magnetic ? magneticPosition : {}}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
        whileHover={variant === "primary" ? { y: -3 } : undefined}
        {...props}
      >
        {variant === "secondary" && (
          <span className="absolute inset-0 bg-gradient-to-r from-accent/10 to-accent/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
        )}
        <span className="relative z-10">{children}</span>
        {variant === "secondary" && (
          <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-accent group-hover:w-full transition-all duration-300" />
        )}
      </motion.button>
    );
  }
);

Button.displayName = "Button";

export { Button, buttonVariants };
