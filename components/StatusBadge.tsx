import { Badge } from "@/components/ui/badge";
import { BedStatus } from "@/lib/mock-data";
import { CheckCircle2, AlertCircle, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatusBadgeProps {
  status: BedStatus;
  className?: string;
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const config = {
    available: {
      variant: "success" as const,
      label: "Available",
      icon: CheckCircle2,
      className: "bg-success/10 text-success border-success/20",
    },
    limited: {
      variant: "warning" as const,
      label: "Limited",
      icon: AlertCircle,
      className: "bg-warning/10 text-warning border-warning/20",
    },
    full: {
      variant: "danger" as const,
      label: "Full",
      icon: XCircle,
      className: "bg-danger/10 text-danger border-danger/20",
    },
  };

  const { variant, label, icon: Icon, className: statusClassName } = config[status];

  return (
    <Badge 
      variant={variant} 
      className={cn(
        "gap-1.5 px-3 py-1.5 border-2 font-semibold",
        statusClassName,
        className
      )}
    >
      <Icon className="h-4 w-4" />
      <span>{label}</span>
    </Badge>
  );
}

