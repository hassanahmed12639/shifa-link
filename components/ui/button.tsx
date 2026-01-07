"use client";

import * as React from "react";
import { useEffect, useRef, useCallback } from "react";
import { gsap } from "gsap";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-95",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border-2 border-primary bg-background text-primary hover:bg-primary/5",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-secondary hover:text-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        emergency:
          "bg-accent text-accent-foreground hover:bg-accent/90 shadow-lg shadow-accent/30 font-bold",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-14 rounded-lg px-8 text-base font-semibold",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    const buttonRef = useRef<HTMLButtonElement | null>(null);

    // Merge refs - store ref in a ref to make it stable
    const refRef = useRef(ref);
    refRef.current = ref;

    const setRefs = useCallback(
      (node: HTMLButtonElement | null) => {
        buttonRef.current = node;
        const currentRef = refRef.current;
        if (typeof currentRef === "function") {
          currentRef(node);
        } else if (currentRef && "current" in currentRef) {
          (currentRef as React.MutableRefObject<HTMLButtonElement | null>).current = node;
        }
      },
      []
    );

    useEffect(() => {
      const button = buttonRef.current;
      if (!button) return;

      const handleMouseEnter = () => {
        const currentButton = buttonRef.current;
        if (currentButton) {
          gsap.to(currentButton, {
            scale: 1.05,
            duration: 0.2,
            ease: "power2.out",
          });
        }
      };

      const handleMouseLeave = () => {
        const currentButton = buttonRef.current;
        if (currentButton) {
          gsap.to(currentButton, {
            scale: 1,
            duration: 0.2,
            ease: "power2.out",
          });
        }
      };

      const handleMouseDown = () => {
        const currentButton = buttonRef.current;
        if (currentButton) {
          gsap.to(currentButton, {
            scale: 0.98,
            duration: 0.1,
            ease: "power2.out",
          });
        }
      };

      const handleMouseUp = () => {
        const currentButton = buttonRef.current;
        if (currentButton) {
          gsap.to(currentButton, {
            scale: 1.05,
            duration: 0.1,
            ease: "power2.out",
          });
        }
      };

      button.addEventListener("mouseenter", handleMouseEnter);
      button.addEventListener("mouseleave", handleMouseLeave);
      button.addEventListener("mousedown", handleMouseDown);
      button.addEventListener("mouseup", handleMouseUp);

      return () => {
        button.removeEventListener("mouseenter", handleMouseEnter);
        button.removeEventListener("mouseleave", handleMouseLeave);
        button.removeEventListener("mousedown", handleMouseDown);
        button.removeEventListener("mouseup", handleMouseUp);
      };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={setRefs}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
