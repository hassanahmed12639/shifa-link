"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { Button } from "@/components/ui/button";
import { BedStatus } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

interface FilterBarProps {
  selectedStatus: BedStatus | "all";
  onStatusChange: (status: BedStatus | "all") => void;
}

export function FilterBar({ selectedStatus, onStatusChange }: FilterBarProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const filters: { value: BedStatus | "all"; label: string }[] = [
    { value: "all", label: "All" },
    { value: "available", label: "Available" },
    { value: "limited", label: "Limited" },
    { value: "full", label: "Full" },
  ];

  useEffect(() => {
    if (!containerRef.current) return;

    // Ensure elements start visible
    gsap.set(containerRef.current.children, { opacity: 1, x: 0 });
    
    gsap.fromTo(containerRef.current.children,
      { opacity: 0, x: -20 },
      {
        opacity: 1,
        x: 0,
        duration: 0.5,
        ease: "power2.out",
        stagger: 0.1,
      }
    );
  }, []);

  return (
    <div ref={containerRef} className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
      {filters.map((filter) => (
        <Button
          key={filter.value}
          variant={selectedStatus === filter.value ? "default" : "outline"}
          size="lg"
          className={cn(
            "h-12 px-6 text-base font-semibold whitespace-nowrap flex-shrink-0",
            selectedStatus === filter.value && "shadow-md"
          )}
          onClick={() => onStatusChange(filter.value)}
        >
          {filter.label}
        </Button>
      ))}
    </div>
  );
}

