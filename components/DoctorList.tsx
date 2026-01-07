"use client";

import { Doctor } from "@/lib/mock-data";
import { User, CheckCircle2, XCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface DoctorListProps {
  doctors: Doctor[];
  className?: string;
}

export function DoctorList({ doctors, className }: DoctorListProps) {
  const availableDoctors = doctors.filter((d) => d.available);
  const unavailableDoctors = doctors.filter((d) => !d.available);

  if (doctors.length === 0) {
    return null;
  }

  return (
    <div className={cn("space-y-3", className)}>
      <div className="flex items-center justify-between">
        <h4 className="text-body-sm font-semibold text-foreground flex items-center gap-2">
          <User className="h-4 w-4" />
          Available Doctors ({availableDoctors.length}/{doctors.length})
        </h4>
      </div>

      <div className="space-y-2">
        {availableDoctors.map((doctor) => (
          <div
            key={doctor.id}
            className="flex items-start justify-between p-3 rounded-lg border border-success/20 bg-success/5"
          >
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <CheckCircle2 className="h-4 w-4 text-success flex-shrink-0" />
                <span className="text-body-sm font-semibold text-foreground truncate">
                  {doctor.name}
                </span>
              </div>
              <Badge
                variant="success"
                className="text-caption font-semibold px-2 py-0.5"
              >
                {doctor.specialty}
              </Badge>
              {doctor.consultationFee && (
                <div className="mt-2 text-caption text-muted-foreground">
                  <span>PKR {doctor.consultationFee.toLocaleString()}</span>
                </div>
              )}
            </div>
          </div>
        ))}

        {unavailableDoctors.length > 0 && (
          <div className="pt-2 border-t border-border">
            <p className="text-caption text-muted-foreground mb-2">
              Currently Unavailable:
            </p>
            {unavailableDoctors.map((doctor) => (
              <div
                key={doctor.id}
                className="flex items-center gap-2 p-2 rounded-md bg-muted/50 opacity-60"
              >
                <XCircle className="h-3.5 w-3.5 text-muted-foreground flex-shrink-0" />
                <span className="text-caption text-muted-foreground truncate">
                  {doctor.name} - {doctor.specialty}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

